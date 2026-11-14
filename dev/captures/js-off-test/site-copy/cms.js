// cms.js — loads the lab's published content from Sanity for every page.
//
// Pages call `WB.load()` from their DCLogic componentDidMount and shape the
// result in renderVals(). The whole dataset is small, so one query serves all
// pages and is cached for the browser session. If Sanity can't be reached, the
// snapshot committed at content/snapshot.json is used instead.
//
// Only published content is readable here: the dataset is public read-only and
// no token is ever sent from the browser.
(function () {
  'use strict';

  var CONFIG = {projectId: '7h6avsoz', dataset: 'production', apiVersion: '2025-02-19'};
  var TIMEOUT_MS = 6000;
  var CACHE_KEY = 'wb-cms-v1';
  var CACHE_TTL_MS = 60 * 1000;

  var img = '{alt, caption, "url": asset->url}';
  var section = '{..., "images": images[]' + img + '}';
  var QUERY = '{' +
    '"settings": *[_id == "siteSettings"][0],' +
    '"pages": *[_type == "pageCopy"]{..., "sections": sections[]' + section + '},' +
    '"posts": *[_type == "post"] | order(pinned desc, date desc){..., "image": image' + img + '},' +
    '"projects": *[_type == "project"] | order(order asc){..., "slug": slug.current, "cardImage": cardImage' + img +
      ', "sections": sections[]' + section + '},' +
    '"queue": *[_type == "queueItem"] | order(order asc),' +
    '"publications": *[_type == "publication"] | order(date desc){..., "pdfUrl": pdf.asset->url},' +
    '"people": *[_type == "person"] | order(order asc){..., "photo": photo' + img + ', "areas": areas[]->code},' +
    '"areas": *[_type == "researchArea"] | order(order asc),' +
    '"positions": *[_type == "openPosition"] | order(order asc)' +
  '}';

  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () { reject(new Error('timeout')); }, ms);
      promise.then(function (v) { clearTimeout(t); resolve(v); }, function (e) { clearTimeout(t); reject(e); });
    });
  }

  function getJson(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
      return r.json();
    });
  }

  function fromSanity() {
    var url = 'https://' + CONFIG.projectId + '.apicdn.sanity.io/v' + CONFIG.apiVersion +
      '/data/query/' + CONFIG.dataset + '?query=' + encodeURIComponent(QUERY);
    return withTimeout(getJson(url), TIMEOUT_MS).then(function (body) { return body.result; });
  }

  function readCache() {
    try {
      var hit = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      return hit && Date.now() - hit.at < CACHE_TTL_MS ? hit.data : null;
    } catch (e) { return null; }
  }

  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({at: Date.now(), data: data})); } catch (e) { /* storage blocked */ }
  }

  var pending = null;
  function load() {
    if (pending) return pending;
    var cached = readCache();
    if (cached) return (pending = Promise.resolve(cached));
    pending = fromSanity()
      .then(function (data) { writeCache(data); return data; })
      .catch(function (err) {
        console.warn('[cms] Sanity unavailable, using snapshot:', err.message);
        return getJson('content/snapshot.json');
      });
    return pending;
  }

  // ---- helpers for renderVals() -------------------------------------------

  // Blank-line separated text → array of paragraphs.
  function paras(text) {
    return String(text || '').split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  }

  // Only allow web, mail and same-site links (never javascript: and friends).
  function href(url) {
    var u = String(url || '').trim();
    if (!u) return undefined;
    if (/^(https?:|mailto:|tel:|#)/i.test(u) || !/^[a-z][a-z0-9+.-]*:/i.test(u)) return u;
    return undefined;
  }

  function isExternal(url) { return /^https?:/i.test(String(url || '')); }

  // Resized, modern-format image from Sanity's image CDN.
  function imgUrl(url, width) {
    if (!url) return undefined;
    return url.indexOf('cdn.sanity.io') === -1 ? url : url + '?w=' + (width || 800) + '&auto=format&fit=max';
  }

  // The page-text document for one page, with sections addressable by slot key.
  function page(data, name) {
    var doc = ((data && data.pages) || []).filter(function (p) { return p.page === name; })[0] || {};
    var bySlot = {};
    (doc.sections || []).forEach(function (s) {
      bySlot[s.key] = {
        kicker: s.kicker, heading: s.heading, body: s.body, paras: paras(s.body),
        items: s.items || [], images: s.images || [],
        links: (s.links || []).map(function (l) { return {label: l.label, href: href(l.href)}; }),
      };
    });
    return {
      kicker: doc.kicker, title: doc.title, intro: doc.intro, paras: paras(doc.intro),
      seo: doc.seoDescription, slot: bySlot,
    };
  }

  // Mirrors the page's <meta name="description"> to the CMS value once loaded.
  function setDescription(text) {
    if (!text) return;
    var m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.content = text;
  }

  window.WB = {
    load: load, paras: paras, href: href, isExternal: isExternal, img: imgUrl, page: page,
    setDescription: setDescription, config: CONFIG, query: QUERY,
  };
})();
