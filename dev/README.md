# dev/ — working files (not part of the website)

Everything here is development history: before/after checks, audits and the one-off scripts used to
convert the original design exports to the CMS. `.assetsignore` keeps this folder off the live site.
Nothing in the website depends on it; you can delete any of it without breaking a page.

| Folder | What it holds |
|---|---|
| `reviews/round2/` | `round2-review.html`: self-contained before/after review of round 2 (open it in a browser). `template.html` + `imgs.json` built it; the JPEGs are the phone/desktop captures it shows. |
| `screenshots/round1/` | Live site vs. local CMS version, page by page, taken while wiring each page to Sanity (round 1). |
| `screenshots/round2/` | Full-page live vs. local captures of every page after round 2, plus phone strips (`m-*`). |
| `lighthouse/round1/`, `lighthouse/round2/` | Lighthouse JSON reports (performance, accessibility, SEO) before and after round 2. Open with https://googlechrome.github.io/lighthouse/viewer/ (drag the file in). |
| `captures/round1/` | Rendered DOM / page-body dumps used to rebuild pages with CMS bindings (`*-dom.html`, `*_body.html`). |
| `captures/js-off-test/` | Check of how Home and Join render with and without JavaScript (`hj-*`), with the site copy it was run against (`site-copy/`, assets omitted: they are the same as `/assets`). |
| `scripts/` | One-off Python converters that turned the static exports into CMS-bound pages (`conv_*.py`, `splice_pubs.py`). Already applied; kept for reference. Paths are relative to the repo root. |
| `reference/` | Web-performance guidance notes consulted during round 2 (image priority, text wrapping). |

New working files (screenshots, reports, notes) go in the matching folder here, one subfolder per round.
