# Editing the website

Everything on the site (text, lists, images, PDFs) is edited in the dashboard. You don't need to
touch code, and changes appear on the site about a minute after you publish.

**Dashboard:** https://whistleblower-lab.sanity.studio

## Getting in

1. Ask a project admin to invite you (sanity.io/manage → the Whistleblower Lab project → Members).
2. Accept the email invite and sign in with Google, GitHub or email.
3. Open the dashboard link above.

## The basics

- **Draft → Publish.** Every change is saved as a draft automatically. Nothing reaches the website
  until you click **Publish** (bottom right). Close the document without publishing and the live site
  is untouched.
- **Undo a published change:** open the document → the clock icon (History) → pick an earlier version
  → **Restore**, then Publish.
- **Unpublish** (⋯ menu next to Publish) hides an item from the site without deleting it.
- **Order:** most lists have an **Order** number. Lower numbers appear first.
- **Seeing your change:** reload the page. If you visited it in the last minute, open it in a new
  private window (the site caches content for 60 seconds per visit).

## Where things are

| In the sidebar | Changes on the site |
|---|---|
| **Site settings** | Contact email, GitHub, room and hours, footer line, the home page LAB.STATUS panel and "What we do" tracks, and the **Intake is open** switch |
| **Page text** | The heading, intro and buttons of each page (Home, Research, Projects, People, Publications, News, Join) |
| **News, events & announcements** | The News log and the "Latest" list on the home page |
| **Projects** | Project cards on Projects and Home, and the content of each project's case-file page |
| **Project queue** | The unclaimed blocks under "Queue" on Projects |
| **Publications** | Lab reports and peer-reviewed papers |
| **People** | Members, advisor and alumni |
| **Research areas** | The Research page and the home page teaser |
| **Open positions** | The intake list on Join and the home page "Queue" panel |

## Common jobs

**Post news.** News, events & announcements → **+** → choose the type, set the date, write a title and
body (leave a blank line between paragraphs), optionally add an image and a link → Publish. Turn on
**Pin to top** to keep it first.

**Announce an event.** Same as news, choose type **Event**, and fill in the start time and location.

**Add a publication.** Publications → **+** → choose *Lab report* or *Peer-reviewed paper*, title,
date, type label (e.g. `TECH REPORT · PDF`). Either upload the **PDF** or paste a **Link** (DOI,
ResearchGate…). If both are set, the PDF wins.

**Add or update a person.** People → open or create → name, status (Member / Advisor / Alumni), card
tag (`DV`, `RTL`…), role, short bio, research areas, optional photo and links → Publish.

**Close or open the intake.** Site settings → switch **Intake is open**. Update **Open positions** to
match.

**Add a project.** Projects → **+** → fill the *Listing card* tab (title, code, stage, tags, summary,
one-line summary, card image). Tick **Show on home page** to feature it.
To give it a page: *Case file page* tab → **Published**, then choose a **Page design**. The page uses
that design's look with your project's content.

**Edit a project page** (e.g. Power System Protocols, SENTINEL). Sidebar → **Project pages (case
files)** → open the project → **Case file page** tab → **Page content**. The sections are the page
from top to bottom; each one's **slot** name (`header`, `about`, `security`…) fixes where it sits.
- *Heading*, *small label* and *body* are the visible text. In body text a blank line starts a new
  paragraph.
- *Rows* are the lists, stats, table rows and chart bars. Drag to reorder, **+** to add. Where a row's
  value is a number (chart bars), the bar length follows it.
- Some rows use a short code word or symbol in **Value** to pick a colour or side, e.g. `holds` /
  `partial` / `open` on security cards, `→` / `←` in a message ladder, `*text*` to highlight a block.
  Reuse the words already there.
- *Images* show in the order listed; replace one by clicking it → Replace. Keep the alt text filled in.
- Deleting a section hides that part of the page. **Search & share description** (same tab) is the
  text Google and link previews show.

## Writing tips

- **Images:** upload the largest version you have; the site resizes it. Always fill in **Alt text**
  (what the image shows). Use the crop/hotspot tool to choose what stays visible.
- **Line breaks** in titles are kept. In body text, a blank line starts a new paragraph.
- **Links:** use full addresses (`https://…`), `mailto:someone@example.org`, or a site page such as
  `join.html`.
- **Slots** (in Page text → Sections and project pages) tie a section to a fixed place on the page.
  Change the text freely, but don't rename the slot.
