# Changelog

Each round of work is one or more commits plus a **tag**, so any earlier state can be restored.
To see a version: `git checkout <tag>`. To roll the live site back: see "Rolling back" in the README.

| Tag | Date | What changed |
|---|---|---|
| `v0-original` | 2026-09-25 | Original static site (design-tool exports, hard-coded content). What was live until 2026-11-15. |
| `v1-cms` | 2026-10-13 | Sanity CMS added: Studio (`studio/`), content import, `cms.js` loader with snapshot fallback. Every main page (Home, Research, Projects, People, Publications, News, Join) reads its text, lists and images from the CMS. Contact email set to `whistleblowerlabs@gmail.com`; GitHub links removed from main pages; nav wraps on narrow screens. |
| `v2-polish` | 2026-10-13 | Round 2: faster loading (image sizes and priorities, preconnect), accessibility fixes (contrast, labels, focus), SEO descriptions, layout fixes across all pages. Review: `dev/reviews/round2/round2-review.html`. |
| `v2.1-tracker` | 2026-10-13 | SENTINEL page: embedded RASO IMM Console replay (widthmissmatch.github.io/Tracker) in the UKF + IMM section. |
| `v2.2-mobile` | 2026-10-13 | Phones: two-column grids that clipped content now stack. |
| — | 2026-11-15 | Repository organized: development history moved into `dev/` (kept off the website), docs added. No change to any page. |
| — | 2026-11-15 | Netlify hosting: `netlify.toml` publishes only the website files (studio, dev, docs stay private) and adds basic security headers. Went live on `main` at https://whistle-blower-labs.netlify.app; Sanity CORS allows it and its branch/preview URLs. |

## Next (round 3, planned)

- Wire the 8 project case-file pages to the CMS and remove their GitHub links.
- Make the SENTINEL embed address a CMS field.
- Open Graph / link-preview tags.
- Bring `docs/EDITING.md` fully in line with the dashboard (e.g. it still mentions a GitHub field in Site settings).
- Optional: menu button for phones.
