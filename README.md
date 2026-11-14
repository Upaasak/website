# Whistleblower Lab website

Static site for the Whistleblower ASIC / FPGA verification lab. Its content is managed in
**Sanity**, so routine updates (news, people, publications, projects, page text, images) are made
in the dashboard and appear on the site within about a minute, with no code change or redeploy.

| What | Where |
|---|---|
| Live site | https://whistle-blower-labs.netlify.app (Netlify); old host: https://website.vipul-km.workers.dev |
| Editor dashboard | https://whistleblower-lab.sanity.studio |
| Code | https://github.com/Upaasak/website (Netlify deploys the production branch automatically) |
| Sanity project | ID `7h6avsoz`, dataset `production`, organization "Whistleblower Lab" |

For editors: see [docs/EDITING.md](docs/EDITING.md). History of changes: [docs/CHANGELOG.md](docs/CHANGELOG.md).

## Repository layout

```
/                    the website (Netlify copies these files to _site/ and publishes that)
├─ *.html            one file per page (home = index.html, case files = project-*.html)
├─ cms.js            loads content from Sanity (falls back to content/snapshot.json)
├─ support.js        design runtime that renders the pages (generated; do not edit)
├─ assets/           brand marks, project card images, case-file images
├─ content/          snapshot.json: offline copy of all CMS content
├─ studio/           Sanity Studio (dashboard) source            ┐
├─ docs/             EDITING.md (for editors), CHANGELOG.md       │ not published
├─ dev/              screenshots, audits, review pages, scripts   │ (not copied by
└─ README.md                                                      ┘  the build)
netlify.toml         Netlify build + headers settings
```

## Branches and versions

- **`main`** is the live site: every push deploys on Netlify in about a minute.
- **`preview`** holds work that is backed up on GitHub but not live yet. Going live = merge it into `main`.
- **Tags** (`v0-original`, `v1-cms`, `v2-polish`, …) mark each finished round; see the changelog.

### Rolling back

To put the live site back to an earlier version without losing history:

```sh
git checkout main
git revert --no-edit <tag>..HEAD    # undo everything after <tag> as new commits
git push origin main
```

## How it fits together

```
 editors ──► Sanity Studio (whistleblower-lab.sanity.studio)
                 │  publish
                 ▼
            Sanity content lake ──(public, read-only CDN API)──┐
                                                               ▼
 GitHub main ──► Netlify (static files, _site/) ────► browser: page + cms.js ──► renders content
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
- **CORS** only allows listed site addresses and `localhost:5500/8080/3333` to query from a browser.
  Add the Netlify address and any custom domain (see below); unlisted sites fall back to the snapshot.
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
| Load a project page's content from `content/projects/<slug>.json` (skips pages already filled) | `npm run seed-projects` (`-- --force <slug>` to overwrite) |
| Allow a new site address (e.g. custom domain) | `npx sanity cors add https://example.org --no-credentials` |
| Invite an editor | sanity.io/manage → project → Members → Invite (role: Editor) |

Preview the site locally: from the repo root run `npx http-server . -p 5500 -c-1` and open
http://localhost:5500 (port 5500 is allowed in CORS).

### Deploying the website

Push to `main`. Netlify runs the build in `netlify.toml` (it only copies the website files into
`_site/`; no install, no secrets) and publishes in about a minute. Content changes in Sanity need
**no** deploy; only code and design changes do.

First-time Netlify setup:

1. Netlify → **Add new site → Import an existing project → GitHub** → `Upaasak/website`.
2. Leave build settings empty; `netlify.toml` provides them. Production branch: `main`.
3. Allow the new address in Sanity so pages load live content:
   `npx sanity cors add https://<site-name>.netlify.app --no-credentials` (from `studio/`).
   For branch and deploy-preview URLs also add `https://*--<site-name>.netlify.app`.
4. Optional: Site settings → Domain management → add a custom domain, then add it to CORS too.

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
