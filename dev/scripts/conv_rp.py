import os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

def common(s, title, desc, kicker, what, page):
    old = '<script src="./support.js"></script>\n<title>Whistleblower Lab — %s</title>' % title
    assert s.count(old) == 1, 'head'
    s = s.replace(old,
        '<script src="./cms.js"></script>\n<script src="./support.js"></script>\n<title>Whistleblower Lab — %s</title>\n'
        '<meta name="description" content="%s">\n<link rel="preconnect" href="https://7h6avsoz.apicdn.sanity.io" crossorigin="">' % (title, desc))
    k = '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n</style>'
    assert s.count(k) == 1, 'style'
    s = s.replace(k, '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n  .cms-cursor { animation: blink 1s steps(1) infinite; }\n</style>')
    ob = '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">Student-run ASIC / FPGA hardware verification lab.</div>'
    om = '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:lab@whistleblower.dev">lab@whistleblower.dev</a></div>'
    assert s.count(ob) == 1 and s.count(om) == 1, 'footer'
    s = s.replace(ob, '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">{{ site.footerBlurb }}</div>')
    s = s.replace(om, '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:{{ site.email }}">{{ site.email }}</a></div>')
    states = '''  <sc-if value="{{ loading }}">
    <section data-screen-label="Loading" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0; min-height: 60vh; font-size: 12px; letter-spacing: 0.2em; color: #7AAE91;">
      <div>%s</div>
      <div style="margin-top: 22px;">&gt; FETCHING %s <span class="cms-cursor" style="color: #39FF88;">▌</span></div>
    </section>
  </sc-if>

  <sc-if value="{{ failed }}">
    <section data-screen-label="Error" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0; min-height: 60vh;">
      <div style="border: 1px dashed #ffb000; padding: 14px 16px; font-size: 12.5px; letter-spacing: 0.1em; line-height: 1.8; color: #ffb000;">ERR · %s UNAVAILABLE — the content service did not answer. <a href="%s.html">[ ▸ RETRY ]</a></div>
    </section>
  </sc-if>

  <sc-if value="{{ ready }}">
''' % (kicker, what, what, page)
    return s, states


def splice(s, start_marker, end_marker, new):
    a = s.index(start_marker)
    b = s.index(end_marker)
    return s[:a] + new + s[b:]


FOOT = '  <div style="max-width: 1520px; margin: 74px auto 0; padding: 0 28px;">'
HEAD_H1 = ('<h1 style="font-family: \'IBM Plex Mono\', monospace; font-weight: 600; margin: 0 0 20px; font-size: clamp(32px, 4.6vw, 56px); '
           'font-weight: 800; letter-spacing: 0.02em; color: #D7E0E6; line-height: 1.05; white-space: pre-line;">{{ page.title }}</h1>')
KICK = '<div style="font-size: 12px; letter-spacing: 0.3em; color: #00D9FF; margin-bottom: 18px;">{{ page.kicker }}</div>'

CTA = '''  <section data-screen-label="CTA" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0;">
    <div style="border: 1px solid #39FF88; padding: 26px 24px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; align-items: center;">
      <div style="font-size: 15px; color: #D7E0E6; letter-spacing: 0.06em;">{{ cta.heading }}</div>
      <sc-for list="{{ cta.links }}" as="l">
        <a href="{{ l.href }}" style="border: 1px solid #39FF88; padding: 11px 20px; font-size: 13px; letter-spacing: 0.16em; font-weight: 700;">{{ l.label }}</a>
      </sc-for>
    </div>
  </section>
  </sc-if>

'''


def logic(page, body):
    return '''<script type="text/x-dc" data-dc-script>
class Component extends DCLogic {
  state = { data: null, failed: false };

  componentDidMount() {
    WB.load().then(
      (data) => { this.setState({ data }); WB.setDescription(WB.page(data, '%s').seo); },
      () => this.setState({ failed: true })
    );
  }

  renderVals() {
    const d = this.state.data;
    const s = (d && d.settings) || {};
    const site = { footerBlurb: s.footerBlurb || 'Student-run ASIC / FPGA hardware verification lab.', email: s.email || 'lab@whistleblower.dev' };
    if (!d) return { loading: !this.state.failed, failed: this.state.failed, ready: false, site };

    const page = WB.page(d, '%s');
    const cta = page.slot.cta || { links: [] };
%s
  }
}
</script>
''' % (page, page, body)


import re
# ---------- research ----------
s = open('research.html', encoding='utf-8').read()
RESEARCH_DONE = 'cms.js' in s
if RESEARCH_DONE: s = None
else:
  pass
if not RESEARCH_DONE:
 s = open('research.html', encoding='utf-8').read()
s, states = common(s, 'Research',
                   'The six research areas of Whistleblower, a student-run ASIC / FPGA hardware verification lab: verification, DSP, timing closure, open silicon, lab infrastructure and pedagogy.',
                   '▚▚ 02 / RESEARCH ▞▞', 'AREAS', 'research')
body = states + '''  <section data-screen-label="Research header" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0;">
    ''' + KICK + '''
    ''' + HEAD_H1 + '''
    <sc-for list="{{ page.paras }}" as="p">
      <p style="max-width: 68ch; font-size: 14px; line-height: 1.9; color: #A8B3BD; margin: 0 0 8px;">{{ p }}</p>
    </sc-for>
  </section>

  <section data-screen-label="Areas" style="max-width: 1520px; margin: 0 auto; padding: 46px 28px 0;">
    <div style="display: grid; gap: 16px;">

      <sc-for list="{{ areas }}" as="a">
      <div style="border: 1px solid #163D2A;" style-hover="border-color: #39FF88;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 14px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;"><span>{{ a.header }}</span><span>{{ a.status }}</span></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0;">
          <div style="padding: 22px 20px; border-right: 1px solid #182027; display: grid; gap: 12px; align-content: start;">
            <sc-for list="{{ a.paras }}" as="p">
              <p style="margin: 0; font-size: 13.5px; line-height: 1.9; color: #A8B3BD; max-width: 58ch;">{{ p }}</p>
            </sc-for>
          </div>
          <div style="padding: 22px 20px; display: grid; gap: 8px; align-content: start; font-size: 12.5px;">
            <div style="color: #66727D; letter-spacing: 0.16em; font-size: 11px;">{{ a.sideLabel }}</div>
            <sc-for list="{{ a.sideItems }}" as="x">
              <div style="color: #D7E0E6;">{{ x }}</div>
            </sc-for>
            <sc-for list="{{ a.related }}" as="l">
              <a href="{{ l.href }}" target="{{ l.target }}" rel="noopener">{{ l.label }}</a>
            </sc-for>
          </div>
        </div>
      </div>
      </sc-for>

    </div>
  </section>

''' + CTA
s = splice(s, '  <section data-screen-label="Research header"', FOOT, body)
s = s.replace('</x-dc>\n', '</x-dc>\n' + logic('research', '''    const areas = (d.areas || []).map((a) => ({
      header: [a.code, a.title].filter(Boolean).join(' · '),
      status: a.status,
      paras: WB.paras(a.description),
      sideLabel: a.sideLabel,
      sideItems: (a.sideItems || []).filter(Boolean),
      related: (a.related || []).map((l) => {
        const href = WB.href(l.href);
        return { label: l.label, href, target: WB.isExternal(href) ? '_blank' : undefined };
      }).filter((l) => l.href),
    }));

    return { loading: false, failed: false, ready: true, site, page, cta, areas };'''), 1)
open('research.html', 'w', encoding='utf-8', newline='\n').write(s)

# ---------- projects ----------
s = open('projects.html', encoding='utf-8').read()
s, states = common(s, 'Projects',
                   'Every block Whistleblower is building or verifying, from spec to signoff, plus the queue of unclaimed blocks.',
                   '▚▚ 03 / PROJECTS ▞▞', 'PROJECTS', 'projects')
BAR = '<span style="flex: 1; color: #11626F; overflow: hidden; white-space: nowrap;">' + '░' * 100 + '</span>'
assert BAR in s, 'bar'
body = states + '''  <section data-screen-label="Projects header" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0;">
    ''' + KICK + '''
    ''' + HEAD_H1 + '''
    <sc-for list="{{ page.paras }}" as="p">
      <p style="max-width: 68ch; font-size: 14px; line-height: 1.9; color: #A8B3BD; margin: 0;">{{ p }}</p>
    </sc-for>
  </section>

  <section data-screen-label="Active" style="max-width: 1520px; margin: 0 auto; padding: 46px 28px 0;">
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 22px;">
      <span style="color: #05070A; background: #39FF88; padding: 6px 9px; font-size: 9px; font-weight: 400; letter-spacing: 0.04em; font-family: 'Silkscreen', monospace;">A</span>
      <span style="font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 600; letter-spacing: 0.18em; color: #D7E0E6;">PROJECTS</span>
      ''' + BAR + '''
      <span style="font-size: 12px; color: #66727D;">{{ countLabel }}</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 18px;">

      <sc-for list="{{ projects }}" as="p">
      <div style="border: 1px solid #163D2A; display: flex; flex-direction: column;" style-hover="border-color: #39FF88;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;"><span>{{ p.code }}</span><span style="color: {{ p.stageColor }};">{{ p.stage }}</span></div>
        <div style="position: relative; height: 300px; background: #05070A; overflow: hidden;">
          <sc-if value="{{ p.image }}">
            <img src="{{ p.image }}" alt="{{ p.imageAlt }}" loading="lazy" style="display: block; width: 100%; height: 100%; object-fit: contain;" />
          </sc-if>
          <div style="position: absolute; inset: 0; display: grid; gap: 12px; align-content: end; padding: 22px 20px; background: linear-gradient(to top, rgba(5,7,10,0.97) 0%, rgba(5,7,10,0.92) 55%, rgba(5,7,10,0.72) 100%); opacity: 0; transition: opacity 200ms;" style-hover="opacity: 1;">
            <div style="font-size: 17px; font-weight: 700; letter-spacing: 0.05em; color: #D7E0E6; line-height: 1.3;">{{ p.title }}</div>
            <div style="font-size: 11px; letter-spacing: 0.14em; color: #7AAE91;">{{ p.tags }}</div>
            <p style="margin: 0; font-size: 13px; line-height: 1.85; color: #A8B3BD;">{{ p.summary }}</p>
            <sc-if value="{{ p.caseFileHref }}">
              <a href="{{ p.caseFileHref }}" style="font-size: 11.5px; letter-spacing: 0.12em; align-self: start;">[ ▸ OPEN CASE FILE ]</a>
            </sc-if>
            <sc-if value="{{ !p.caseFileHref }}">
              <div style="font-size: 11.5px; letter-spacing: 0.12em; color: #66727D;">CASE FILE PENDING</div>
            </sc-if>
          </div>
        </div>
      </div>
      </sc-for>

    </div>
  </section>

  <section data-screen-label="Queue" style="max-width: 1520px; margin: 0 auto; padding: 56px 28px 0;">
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 22px;">
      <span style="color: #05070A; background: #7AAE91; padding: 6px 9px; font-size: 9px; font-weight: 400; letter-spacing: 0.04em; font-family: 'Silkscreen', monospace;">B</span>
      <span style="font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 600; letter-spacing: 0.18em; color: #D7E0E6;">{{ queueSlot.heading }}</span>
      ''' + BAR + '''
      <span style="font-size: 12px; color: #66727D;">{{ queueSlot.kicker }}</span>
    </div>
    <sc-for list="{{ queueSlot.paras }}" as="x">
      <p style="max-width: 68ch; font-size: 13.5px; line-height: 1.9; color: #7AAE91; margin: 0 0 22px;">{{ x }}</p>
    </sc-for>
    <div style="display: grid; gap: 0; border-top: 1px solid #182027;">
      <sc-for list="{{ queue }}" as="q">
      <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr) 130px; gap: 20px; align-items: baseline; padding: 16px 4px; border-bottom: 1px solid #182027; font-size: 13.5px;">
        <span style="color: #D7E0E6; letter-spacing: 0.06em;">{{ q.title }}</span>
        <span style="color: #A8B3BD;">{{ q.description }}</span>
        <span style="color: #7AAE91; font-size: 12px;">{{ q.tag }}</span>
      </div>
      </sc-for>
    </div>
  </section>

''' + CTA
s = splice(s, '  <section data-screen-label="Projects header"', FOOT, body)
s = s.replace('</x-dc>\n', '</x-dc>\n' + logic('projects', '''    // Hand-built case-file pages are named project-<design>.html
    const DESIGNS = ['hft', 'ipdft', 'power', 'pqc', 'secondbrain', 'sentinel', 'swarm', 'tcpip'];
    const projects = (d.projects || []).filter((p) => p.listed !== false).map((p) => ({
      code: p.code, stage: p.stage,
      stageColor: p.stage === 'SPEC' || p.stage === 'PAUSED' ? '#ffb000' : '#39FF88',
      image: p.cardImage && WB.img(p.cardImage.url, 900),
      imageAlt: (p.cardImage && p.cardImage.alt) || p.title,
      title: p.title, tags: p.tags, summary: p.summary,
      caseFileHref: p.caseFile === 'live' && DESIGNS.indexOf(p.design) !== -1 ? 'project-' + p.design + '.html' : undefined,
    }));
    const q = page.slot.queue || {};
    const queueSlot = { heading: q.heading || 'QUEUE', kicker: q.kicker, paras: q.paras || [] };
    const queue = (d.queue || []).map((x) => ({ title: x.title, description: x.description, tag: x.tag }));

    return {
      loading: false, failed: false, ready: true, site, page, cta, projects, queue, queueSlot,
      countLabel: 'HOVER FOR DETAIL · ' + projects.length + (projects.length === 1 ? ' ENTRY' : ' ENTRIES'),
    };'''), 1)
open('projects.html', 'w', encoding='utf-8', newline='\n').write(s)
print('ok')
