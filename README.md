# Whistleblower Lab website

Static site for the Whistleblower ASIC / FPGA verification lab. Its content is managed in
**Sanity**, so routine updates (news, people, publications, projects, page text, images) are made
in the dashboard and appear on the site within about a minute, with no code change or redeploy.

| What | Where |
|---|---|
| Live site | https://website.vipul-km.workers.dev |
| Editor dashboard | https://whistleblower-lab.sanity.studio |
| Code | https://github.com/Upaasak/website (`main` auto-deploys to Cloudflare) |
| Sanity project | ID `7h6avsoz`, dataset `production`, organization "Whistleblower Lab" |

For editors: see [docs/EDITING.md](docs/EDITING.md).

## How it fits together

```
 editors ──► Sanity Studio (whistleblower-lab.sanity.studio)
                 │  publish
                 ▼
            Sanity content lake ──(public, read-only CDN API)──┐
                                                               ▼
 GitHub main ──► Cloudflare Worker (static files) ──► browser: page + cms.js ──► renders content
                                                               ▲
                                    content/snapshot.json ─────┘ (fallback if Sanity is unreachable)
```

- **Pages** (`*.html`) are design exports rendered in the browser by `support.js` (generated; do not
  edit). Each page's layout and styling live in its HTML; the text, lists and images come from the CMS
  through `{{ }}`, `<sc-for>` and `<sc-if>` bindings filled by the page's `DCLogic` script.
- **`cms.js`** runs one GROQ query for all published content, caches it for the browser session
  (60 s), and falls back to `content/snapshot.json` if Sanity doesn't answer within 6 s. Pages show an
  on-brand loading line, and an error line with a retry link if both sources fail.
- **`studio/`** is the Sanity Studio (dashboard) source: schemas, sidebar structure, and scripts.
  `.assetsignore` keeps it (and these docs) off the public website.

## Security

- The dataset is **public read-only**: anyone can read *published* content, which is what the website
  shows anyway. Drafts are never visible through the public API.
- **No token or secret exists in the website code.** Writes happen only in the Studio, behind Sanity
  login. Scripts in `studio/scripts` use your own CLI login (`--with-user-token`), never a stored key.
- **CORS** only allows the live site and `localhost:5500/8080/3333` to query from a browser. Add your
  custom domain when you have one (see below).
- All CMS text is rendered as text (never HTML), and links are restricted to `https:`, `mailto:`,
  `tel:` and site-relative paths in `cms.js`.

## Configuration

The website needs no environment variables: `cms.js` holds the public project ID and dataset.

The Studio reads `studio/.env` (not committed; copy `studio/.env.example`):

| Variable | Value | Secret? |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | `7h6avsoz` | No |
| `SANITY_STUDIO_DATASET` | `production` | No |
| `SANITY_STUDIO_HOST` | `whistleblower-lab` (→ `whistleblower-lab.sanity.studio`) | No |

## Common tasks

All `npm` commands run from `studio/` (Node 20+).

```sh
cd studio
npm install            # first time only
npx sanity login       # first time on a machine
```

| Task | Command |
|---|---|
| Run the dashboard locally | `npm run dev` → http://localhost:3333 |
| Deploy dashboard changes (schemas, sidebar) | `npm run deploy` |
| Refresh the fallback snapshot | `npm run snapshot`, then commit and push `content/snapshot.json` |
| Re-run the original import (only creates missing documents) | `npm run migrate` |
| Allow a new site address (e.g. custom domain) | `npx sanity cors add https://example.org --no-credentials` |
| Invite an editor | sanity.io/manage → project → Members → Invite (role: Editor) |

Preview the site locally: from the repo root run `npx http-server . -p 5500 -c-1` and open
http://localhost:5500 (port 5500 is allowed in CORS).

### Deploying the website

Push to `main`. Cloudflare rebuilds and serves the repo root in about a minute. Content changes in
Sanity need **no** deploy; only code and design changes do.

### Changing what can be edited

1. Edit or add a schema in `studio/schemaTypes/` and register it in `schemaTypes/index.ts`.
2. `npm run dev` to check it, then `npm run deploy`.
3. If the website should show the new field, add it to the GROQ query in `cms.js` and bind it in the
   page's `renderVals()` / template.
4. `npm run snapshot` and commit, so the fallback copy includes the new field.

## Content model

| Type | Used on |
|---|---|
| Site settings (single) | Header tagline, footer, contact, home LAB.STATUS panel and tracks, intake open/closed |
| Page text (one per page) | Each page's kicker, title, intro, SEO description and named sections (CTAs, panels) |
| News item | News log and home "Latest" (type: news / event / announcement; pin to top) |
| Project | Projects grid, home featured cards, case-file page content and design |
| Queue block | "Queue" of unclaimed blocks on Projects |
| Publication | Lab reports and peer-reviewed papers (PDF upload or link) |
| Person | Roster, advisor, alumni (photo, links, research areas) |
| Research area | Research page and home teaser |
| Open position | Join page intake list and home "Queue" panel |

Page sections are addressed by a **slot** name (e.g. `cta`, `warden`, `notice`); the page's code
decides where and how each slot appears. Keep slot names as they are when editing.
