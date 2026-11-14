
--- Guide for improve-text-layout-and-legibility ---
# Improve Text Layout and Legibility

The layout of text, particularly at the ends of lines and ends of paragraphs, can impact the legibility and aesthetic appeal of a page. CSS provides several text wrapping options that can improve specific use cases.

For short text blocks like headings, use `text-wrap: balance`. This property instructs the browser to distribute text as evenly as possible across lines, creating a more symmetrical appearance.

The `text-wrap: pretty` CSS property allows you to improve the typographic quality of body text by enabling a more sophisticated wrapping algorithm. It is specifically designed to prevent "orphans" (single words on the last line of a paragraph) and create a more pleasing visual "rag" for long blocks of text.

## Implementation

### 1. **Identify text elements**: 

For `text-wrap: balance`, select short text blocks like headings and table headers. Avoid elements that have visible boxes such as borders or backgrounds, as this can create unexpected visually empty areas in the layout.

For `text-wrap: pretty`, select elements potentially containing long runs of text where orphaned words (runts) or poor line breaks are most noticeable. This includes the following elements:
  - `<p>`
  - `<blockquote>`
  - `<li>`
  - Any other element potentially containing long runs of text.

#### Choosing the Right Wrapping Method

| Criteria | `text-wrap: balance` | `text-wrap: pretty` | `text-wrap: wrap` (Default) |
| :--- | :--- | :--- | :--- |
| **Best For** | Short blocks (Headings, Titles) | Long blocks (Paragraphs, Lists) | Performance-critical content |
| **Visual Goal** | Symmetrical line lengths | Avoiding orphans ("runts") | Fast, standard wrapping |
| **Line Constraints** | Up to 6–10 lines (algorithm limit) | Best for 3 to many lines | No limit |
| **Perf Cost** | **High**: Binary search algorithm | **Medium**: Look-back algorithm | **Low**: Standard greedy algorithm |

### 2. **Apply the chosen wrapping**: 

Apply `text-wrap: balance` specifically to short, multi-line elements such as headings (`h1`-`h6`), subheadings, or pullquotes.

```css
/* Target specific heading elements for balanced wrapping */
h1, h2, h3, h4, h5, h6 {
  /* Enables balanced line-breaking logic */
  text-wrap: balance;
}
```

Use `text-wrap: pretty` to enable an optimized algorithm that evaluates the last few lines of a paragraph to find the best break points.

```css
/* Apply to multi-line text blocks to prevent orphaned words */
p, blockquote, li, .pretty-text {
  /* Enables pretty line-breaking logic for body copy */
  text-wrap: pretty;
}
```

### Critical Constraints and Performance

#### text-wrap: balance

*   **Line Limit:** Browsers impose a limit on the number of lines they will attempt to balance to maintain performance (typically **6 lines** in Chromium and **10 lines** in Firefox). If the text exceeds this limit, the browser reverts to standard `wrap` behavior. Avoid using `text-wrap: balance` on text blocks that are likely to exceed these limits.
*   **Targeted Application:** DO NOT apply `text-wrap: balance` globally (e.g., `* { text-wrap: balance; }`). The iterative "binary search" algorithm used by browsers is computationally expensive. Limit its use to specific, short text elements.
*   **Interaction with Width:** `text-wrap: balance` does not change the container's width (`inline-size`). It only affects how text wraps *within* that width. This can leave empty space at the end of the container, which may affect layouts relying on full-width text blocks.

#### text-wrap: pretty

*   **Performance vs. Quality**: MANDATORY: `text-wrap: pretty` is more computationally expensive than the default `wrap` (greedy) algorithm because it evaluates multiple lines (typically the last four) to optimize the break points. Avoid applying it globally to every element if your page has an extreme amount of text content.
*   **Best for multi-line text**: The benefits of `pretty` are most apparent in paragraphs of three or more lines. It has little to no effect on short, single-line text.
*   **Browser-specific behavior**: Be aware that implementation details vary. Chromium-based browsers typically focus on the last four lines, while other engines may evaluate the entire paragraph.

### Fallback strategies

Baseline status for text-wrap: balance: Newly available. It's been Baseline since 2024-05-13.
Supported by: Chrome 114 (May 2023), Edge 114 (Jun 2023), Firefox 121 (Dec 2023), and Safari 17.5 (May 2024).

Browser support for text-wrap: pretty: Limited availability.
Supported by: Chrome 117 (Sep 2023), Edge 117 (Sep 2023), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

In browsers that do not support `text-wrap: balance` or `text-wrap: pretty`, the property is ignored, and the text will wrap using the default `wrap` behavior. This is a progressive enhancement that gracefully degrades to standard typography. This ensures that your content remains perfectly readable across all browsers while providing a superior experience to those that support it.

For critical layouts where refined text layout is a requirement, use a JavaScript library, but be aware that this may be slow and cause performance issues.

--- Guide for accessibility ---
# Accessibility Coding Guidelines

This guide provides actionable DOs and DON'Ts for AI coding agents to ensure web applications are accessible to all users, including those using assistive technologies.

Keep these principles in mind throughout:

- **Accessibility is the minimum, not the ceiling.** Conformance to standards is the floor; aim for genuine usability.
- **Patterns are use-case specific.** No checklist replaces real testing — including testing with disabled users — to confirm a given implementation is actually accessible in context.

Contents:

- [1. Content Navigability and Structure](#1-content-navigability-and-structure)
  - [Landmarks](#landmarks)
  - [Headings](#headings)
  - [Lists and tables](#lists-and-tables)
  - [Skip links](#skip-links)
- [2. Semantic HTML and ARIA](#2-semantic-html-and-aria)
  - [Prefer native HTML](#prefer-native-html)
  - [ARIA roles and states](#aria-roles-and-states)
- [3. Accessible Names and Descriptions](#3-accessible-names-and-descriptions)
  - [Naming mechanisms](#naming-mechanisms)
  - [Choosing the name](#choosing-the-name)
  - [Descriptions](#descriptions)
  - [Code Example: Visually Hidden Utility](#code-example-visually-hidden-utility)
- [4. Document Metadata and Language](#4-document-metadata-and-language)
  - [Language](#language)
  - [Titles](#titles)
  - [Iframes](#iframes)
- [5. Keyboard and Focus Management](#5-keyboard-and-focus-management)
  - [Tab order and focusability](#tab-order-and-focusability)
  - [Keyboard handlers](#keyboard-handlers)
  - [Focus indicators](#focus-indicators)
  - [Touch targets](#touch-targets)
- [6. Alternate Text and Media](#6-alternate-text-and-media)
  - [Images](#images)
  - [Inline SVGs](#inline-svgs)
  - [Complex images and charts](#complex-images-and-charts)
  - [Audio and video](#audio-and-video)
  - [CSS generated content](#css-generated-content)
  - [Content Visibility Decision Matrix](#content-visibility-decision-matrix)
- [7. Forms and Input Controls](#7-forms-and-input-controls)
  - [Labels and hints](#labels-and-hints)
  - [Input assistance and validation](#input-assistance-and-validation)
- [8. Live Regions](#8-live-regions)
  - [Live Region Urgency Table](#live-region-urgency-table)
  - [When to announce](#when-to-announce)
  - [Managing announcements](#managing-announcements)
- [9. Color](#9-color)
- [10. Typography](#10-typography)
- [11. Motion and Preferences](#11-motion-and-preferences)
- [12. Modals and Native Dialogs](#12-modals-and-native-dialogs)
  - [Native `<dialog>`](#native-dialog)
  - [Custom overlays](#custom-overlays)
- [13. Testing Validations](#13-testing-validations)
  - [Automated checks](#automated-checks)
  - [Manual testing](#manual-testing)


## 1. Content Navigability and Structure

### Landmarks

- **Place all content within landmarks**: Wrap each relevant part of the page in `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` elements so assistive-tech users can jump between regions.
- **Don't overuse landmarks**: Too many landmarks dilute their value. In particular, avoid labeling a `<section>` (which turns it into a `region` landmark) — `region` should be a last resort when no other landmark fits.

### Headings

- **Structure main content with headings**: Use `<h1>`–`<h6>` sequentially (no jumping `<h1>` → `<h4>`) so screen-reader users get a navigable outline.
- **Don't use fake headings**: Never style `<div>` or `<span>` to look like headings without standard `<h1>`–`<h6>` tags.
- **Don't place headings inside `<summary>`, and avoid relying on headings inside `<details>` content**: Headings inside `<summary>` may be hidden from screen-reader heading lists and heading-navigation shortcuts entirely; headings inside `<details>` content are only reachable via heading navigation when the disclosure is open.
  - **Caveat**: If a heading must act as a disclosure trigger, use a more robust alternative to `<details>`/`<summary>` instead, e.g. an accordion or a disclosure implemented with ARIA where the heading wraps the button.

### Lists and tables

- **Use lists for repeated, contiguous content**: `<ul>`/`<ol>` give assistive tech a count up front and let users skip the entire group.
- **Semantic Tables**: Use `<caption>` and `<th scope="col">` (or `<th scope="row">`) for data tables.
- **Don't use tables for layout**: Use CSS Grid/Flexbox for visual layouts.

### Skip links

- **Provide skip links** prior to repeated content like site headers with navigation or long/infinite lists, so that keyboard users can easily bypass them. Make sure the target is focusable (e.g. `<main id="content" tabindex="-1">`).

```html
<!-- Good: Skip to main content -->
<a href="#content" class="skip-link">Skip to main content</a>
<main id="content" tabindex="-1">...</main>
```

```html
<!-- Good: Semantic landmarks, heading hierarchy, skip link -->
<header>
  <a href="#content" class="skip-link visually-hidden">Skip to content</a>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main id="content" tabindex="-1">
  <h1>Platform Dashboard</h1>
  <section>
    <h2>User Statistics</h2>
    <table>
      <caption>Monthly active users</caption>
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Users</th>
      </tr>
      <tr>
        <td>January</td>
        <td>12,000</td>
      </tr>
    </table>
  </section>
</main>
```

## 2. Semantic HTML and ARIA

### Prefer native HTML

- **Prefer HTML elements and attributes to ARIA**: A native element comes with the right role and behavior. `<button>` already implies `role="button"`; `required` already implies `aria-required`.
- **Don't use ARIA when native HTML exists**: Avoid `<div role="button">` or `<a role="button">` if `<button>` works.
- **Don't add redundant ARIA roles or properties**: Avoid `<ul role="list">`, `<nav role="navigation">`, or `<input required aria-required="true">`.
  - **Caveat**: Safari removes list semantics from `<ul>`/`<ol>` outside `<nav>` when `list-style: none` or `display: flex`/`grid` is applied. In that case `role="list"` is required to restore them.

### ARIA roles and states

- **Match ARIA implementations to actual behavior**: If you set `role="tab"`, the element must behave like a tab — including keyboard interactions. Many ARIA patterns can't be implemented in CSS alone and need JavaScript.
- **Manage Toggle States**: Utilize `aria-expanded` and `aria-pressed` to communicate toggle states for custom controls.
- **Be deliberate about `disabled` vs `aria-disabled`**: `disabled` removes the element from the focus order entirely (and `tabindex="0"` won't bring it back), which is often wrong for toolbar buttons or links. `aria-disabled="true"` keeps the element focusable so users can land on it and learn it's disabled.
- **Don't hide interactive elements from screen readers**: Avoid `aria-hidden="true"` or `role="presentation"` on elements that can receive focus.
- **Don't assume custom elements have no ARIA**: Custom elements can attach ARIA via `ElementInternals`, which some automated test tools can't see — so the absence of `role`/`aria-*` attributes in markup doesn't prove the element has no semantics. Verify with the browser's accessibility-tree inspector.

## 3. Accessible Names and Descriptions

Every interactive element and some landmarks need an accessible name, and many benefit from an accessible description. Names are short and identify the element; descriptions add context.

### Naming mechanisms

- **Prefer native naming mechanisms**: `<label>` for form controls, `<caption>` for `<table>`, `<legend>` for `<fieldset>`, `<figcaption>` for `<figure>`.
- **Explicitly associate `<label>` with its control via `for`/`id`**, even when nesting the input inside the label — explicit association improves assistive-tech support.
- **Prefer `aria-labelledby` over `aria-label` when a visible label exists**: avoids duplication, improves maintainability, and translates better.
- **Don't use `title` or `placeholder` as a naming mechanism.**
- **Don't put `aria-label`/`aria-labelledby` on elements that shouldn't be named** — e.g. plain `<div>`, `<span>`, or custom elements without a role. Custom elements may have an implicit role set via `ElementInternals`, so the absence of a `role` attribute isn't conclusive.

### Choosing the name

- **Prefer to reuse the same accessible name for hyperlinks that share an `href`.**
- **Use visually hidden text to disambiguate controls** that look identical visually but do different things (e.g. multiple "Edit" buttons in a list).
- **Don't reuse an accessible name across controls with different effects in the same view** (close buttons for two different open dialogs are fine because only one is reachable at a time; multiple “Edit” buttons for different content is not).
- **Don't reuse an accessible name across hyperlinks pointing to different `href`s.**
- **Don't pack descriptions, error messages, or instructions into the label.**
- **Don't repeat state already exposed via ARIA** (`aria-expanded`, `aria-checked`, `aria-selected`, `aria-pressed`) inside the accessible name — it creates redundancy and ambiguity.
- **Don't include the role name in the label**: `<nav aria-label="Primary navigation">` reads as "Primary navigation navigation."

### Descriptions

- **Don't include interactive elements in an `aria-describedby` target** unless their text content reads sensibly as a description on its own (e.g. if a link’s text is the same as how it’s labelled elsewhere, it can be included within a description).

### Code Example: Visually Hidden Utility

A `.visually-hidden` utility lets you provide text for screen readers without rendering it visually. It's commonly used for skip links, additional context on icon-only buttons, and supplementary labels.

```css
/* Hides content visually but keeps it in the accessibility tree.
   :focus-within / :active opt elements out — useful for skip links and
   any focusable content wrapped in this class. */
.visually-hidden:where(:not(:focus-within, :active)) {
  position: absolute !important;
  clip-path: inset(50%) !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  border: 0 !important;
  white-space: nowrap !important;
}
```

When the hidden content is focusable (skip links, focus-receiving wrappers), the `:focus-within`/`:active` exception lets it become visible. Style the visible state per situation, e.g. a skip link to the main content typically wants fixed positioning at the top-left of the viewport so the rest of the page doesn't shift.

## 4. Document Metadata and Language

### Language

- **Declare Visual Language**: Always set `<html lang="en">` (or appropriate code).
- **Inline Language Switches**: Use `lang="..."` for block quotes or text in different languages.

### Titles

- **Unique Page Titles**: Front-load unique context in `<title>` (e.g., `Page Topic | Site Name`).
- **Update document title on Page Transitions in SPAs**: Shift focus to updated titles.

### Iframes

- **IFrame Titles**: Always provide a descriptive `title="..."` for `<iframe>` elements.
- **Don't Disable iframe Scrolling**: Avoid `scrolling="no"` (deprecated) or `overflow: hidden` on iframes. Users who zoom in or enlarge text need to scroll to reach content that overflows.

```html
<!-- Good: Distinct title and language declaration -->
<html lang="en">
<head>
  <title>Analytics Reports | Guidance Platform</title>
</head>
<body>
  <p>The motto is <span lang="la">"Carpe diem"</span>.</p>
  <iframe title="Interactive Sales Chart" src="/chart"></iframe>
</body>
</html>
```

## 5. Keyboard and Focus Management

### Tab order and focusability

- **Logical Tab Order**: Ensure tab order matches visual layouts (top-to-bottom).
- **Use `tabindex` deliberately**: Anything focusable — by keyboard or programmatically — should have an implicit or explicit ARIA role, so don't make every element focusable. When focus is needed, choose `tabindex="0"` to add the element to the tab order or `tabindex="-1"` to make it programmatically focusable only (e.g., a skip-link target).
- **Don't use Positive Tabindex values**: Never use `tabindex="1"` or greater.

### Keyboard handlers

- **Custom Trigger Keyboards**: Attach Enter/Space handlers for custom simulated interactive elements. When implementing a custom keyboard handler for button-like elements, `Enter` should be a `keydown` handler and `Space` should be a `keyup` handler (matching native `<button>` behavior where `Enter` repeats and `Space` triggers on release).

```javascript
// Good: Keyboard handlers for complex custom widgets (e.g., Tree items, tabs).
// NOTE: This pattern applies ONLY to non-standard UI where no native HTML tag exists.
// Always prioritize native <button> or <input> elements for standard interactions.
// Elements MUST have the appropriate ARIA role (e.g., role="treeitem" or role="tab").
customWidget.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleWidgetState();
  }
  if (e.key === ' ') {
    e.preventDefault(); // Prevent page scrolling on Spacebar keydown
  }
});

customWidget.addEventListener('keyup', (e) => {
  if (e.key === ' ') {
    toggleWidgetState();
  }
});

function toggleWidgetState() {
  // E.g., Manage toggle/expanded states for custom controls
  const isExpanded = customWidget.getAttribute('aria-expanded') === 'true';
  customWidget.setAttribute('aria-expanded', !isExpanded);
}
```

### Focus indicators

- **Visible Focus Indicators**: Always style `:focus-visible` states (not `:focus`) explicitly. If disabling defaults, provide overrides with sufficient contrast.
- **Don't disable outlines without replacements**: Avoid `outline: none` without styling alternatives.
- Prefer `outline` over other properties (e.g. `box-shadow`) for focus rings. If you must rely on `box-shadow` for focus rings, provide an `outline`-based fallback for High Contrast Mode using the `forced-colors` media query.
- Pair focus outlines with `outline-offset` to visually separate the ring from the element.

```css
/* Good: High contrast focus border */
:where(a:any-link, button):focus-visible {
  outline: 3px solid #ff0055;
  outline-offset: 3px;
}
```

### Touch targets

- Interactive elements should be at least 24×24 CSS pixels (WCAG 2.5.8 AA). Enforce with `min-block-size` / `min-inline-size` or padding rather than `width` / `height`, so content can grow the target but not shrink it.
- Bump targets up on coarse pointers: `@media (pointer: coarse) { ... }`.
- **DON'T** use `touch-action: none` for custom gestures — it disables page scrolling through the element. Scope to the axis you actually need: `pan-y` for horizontal swipes (page still scrolls vertically), `pan-x` for vertical ones. Reserve `none` for elements where no native touch behavior makes sense (e.g. a drawing canvas).

## 6. Alternate Text and Media

### Images

- **Informative Visual Descriptions**: Describe the purpose of the image (e.g., "Search", not "Magnifying glass").
- **Empty Alt properties for decorative visuals**: Use `alt=""` to remove decorative images from the accessibility tree so they aren't announced.
- **Don't use clichéd prefixes**: Avoid "Image of..." or "Picture of...".
- **Don't use underscores in filenames**: Use dashes if the filename might be announced as fallback.

```html
<!-- Decorative -->
<img src="divider.png" alt="">

<!-- Informative (Functional) -->
<a href="/search">
  <img src="glass.png" alt="Search the platform">
</a>
```

### Inline SVGs

- **Informative View Descriptions for inline SVGs**: Apply `role="img"` and a nested `<title>` tag for informative visuals.
- **Decorative SVGs removal**: Apply `aria-hidden="true"` to remove decorative SVGs from reading flows.

```html
<!-- Inline Decorative SVG (remove from tab flow) -->
<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>
```

### Complex images and charts

- **Long descriptions for complex images**: Use `<figure>`/`<figcaption>` or `aria-describedby` for charts and infographics.
- **Provide data tables as alternatives**: Consider providing semantic data tables as accessible alternatives for charts and other complex data visualizations.

```html
<!-- Complex graph with figcaption -->
<figure>
  <img src="chart.png" alt="Sales growth graph 2024.">
  <figcaption>Sales grew 20% in Q3 due to new platform launch.</figcaption>
</figure>
```

### Audio and video

- **Synchronous Captions for videos**: Supply WebVTT captions for video tracks.
- **Transcripts for audio**: Provide text transcripts for purely audio podcasts.

```html
<!-- Video with Captions tracks -->
<video controls>
  <source src="intro.mp4" type="video/mp4">
  <track src="caps.vtt" kind="captions" srclang="en" label="English">
</video>

<!-- Audio with expandable transcript details -->
<audio controls src="podcast.mp3" aria-details="podcast-transcript"></audio>
<details id="podcast-transcript">
  <summary>View Transcript</summary>
  <div class="transcript-content">
    Welcome to the show...
  </div>
</details>
```

### CSS generated content

- **Alt text for CSS generated content**: Use the alternative text argument of `content` (e.g. `content: url(icon.svg) / "Save";`) and keep meaningful text in the DOM. See `accessible-generated-content` (via `npx -y modern-web-guidance@latest retrieve "accessible-generated-content"`) for more details.

### Content Visibility Decision Matrix

| Intent | Visual | Screen Reader | Focusable | Structural Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **Visible to all** | Yes | Yes | Yes | Standard rendering |
| **Screen Reader only** | No | Yes | Yes (if interactive) | Visually hidden utility (e.g. `.visually-hidden`) |
| **Visual only** | Yes | No | No | `aria-hidden="true"` / `role="presentation"` |
| **Hidden for all** | No | No | No | `hidden` attribute / `display: none` |

**Heuristic Rule**: If an element can receive keyboard focus, it must not be hidden via `aria-hidden="true"`.

## 7. Forms and Input Controls

### Labels and hints

- **Connect Labels Programmatically**: Use `<label for="id">` linked to `<input id="id">`.
- **Don't use placeholders as labels**: Placeholders are not persistent labels.
- **Link hints to inputs via `aria-describedby`**: Associate help text with inputs, and place the hint above the input so autocomplete popovers don't cover it during editing.

```html
<!-- Good: Semantic forms with hints for passwords -->
<form>
  <label for="pwd">Password:</label>
  <span id="pwd-hint">Must contain at least 8 characters.</span>
  <input id="pwd" type="password" aria-describedby="pwd-hint" autocomplete="current-password" required>
</form>
```

### Input assistance and validation

- **Use Autocomplete**: Set valid standard `autocomplete` options (e.g., `"email"` or `"given-name"`) for user profiles.
- **Provide form validation constraints**: Use `required` (or `aria-required="true"` only when `required` isn't applicable) to signal mandatory inputs.
- **Don't trigger context shifts on focus changes**: Avoid auto-submitting forms or jumping pages on focus change events alone.


## 8. Live Regions

Live regions let assistive tech announce content updates that aren't tied to navigation or focus changes. They're easy to misuse — too many regions, or noisy ones, quickly become spam for screen-reader users.

### Live Region Urgency Table

| Urgency | Visual Analogue | `aria-live` Value | Behavioral Impact | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | Modal / Alert | `assertive` (or `role="alert"`) | Interrupts immediately, clears speech queue | Session timeout, API failure |
| **Standard**| Toast / Banner | `polite` | Announces at next graceful break | Search results, "Saved" status |
| **Passive**  | Silent text | `off` | Only if user navigates to it | Live character count |

**Heuristic Rule**: Use `assertive` only for critical, time-sensitive updates that require immediate attention or prevent safe continuation (e.g., data loss, session timeouts, or network drops).

### When to announce

- **Announce dynamic errors via live regions**: Use `aria-live` or shift focus to error lists.
- **Don't use live regions for interstitial states** like "Loading…" or "Updating…" unless they're meaningfully informative — they usually just create noise.

```html
<!-- Session Timeout Warning with controls -->
<div role="alert" class="timeout-warning">
  Your session will expire in 2 minutes.
  <button type="button" onclick="extendSession()">Extend Session</button>
</div>
```

### Managing announcements

- **Centralize live regions for non-visible announcements**: A single `polite` region and a single `assertive` region per page (with whatever `aria-atomic` configuration you need) keeps announcements consistent and easier to maintain. Many frameworks ship their own announcer abstraction — use it.
- **Debounce frequently-changing regions**: If a region can update many times per second (e.g. a combobox's result count as the user types), debounce so users aren't spammed.
- **Delay slightly when other announcements may collide**: When the user is typing or focus is being managed, a small delay before announcing keeps live-region updates from overlapping other speech.
- **Don't add live-region updates to inert DOM**: When dialogs open or sections become `inert`, queued or debounced messages can end up unannounced — or announced from DOM the user can't reach. Coordinate live-region updates with dialog/inert state changes.

## 9. Color

See `color` (via `npx -y modern-web-guidance@latest retrieve "color"`) for accessible color (contrast requirements, light and dark color schemes, Forced Colors Mode, etc).

## 10. Typography

See `typography` (via `npx -y modern-web-guidance@latest retrieve "typography"`) for readable typography.

## 11. Motion and Preferences

See `motion` (via `npx -y modern-web-guidance@latest retrieve "motion"`).

## 12. Modals and Native Dialogs

Modern browsers provide native solutions for creating modal dialogs which avoid the need for focus traps, managing the accessibility of outside content, ensuring the content is on top, and dimming the background content — all of which can be error prone and require heavy JavaScript event tracking to maintain.

### Native `<dialog>`

- **Use the Native `<dialog>` Element**: Invoke the dialog using the `.showModal()` method to open it in a modal state. When in a modal state, the browser sets outside content as inert (i.e. the outside content is hidden from the accessibility tree and cannot be interacted with nor be focused).
- **Don't implement focus traps for native modal dialogs**: When a `<dialog>` element is opened in a modal state, browsers set outside content as inert which is sufficient for ensuring only the dialog’s content can be focused.

**HTML & JS: Native `<dialog>` with standard close events**
```html
<!-- Dialog opens natively with showModal() and locks focus -->
<button id="open-btn">Open Dialog</button>

<dialog id="accessible-modal" aria-labelledby="title-id">
  <h2 id="title-id">Account Settings</h2>
  <p>Update your details here.</p>
  <button onclick="this.closest('dialog').close()">Close Dialog</button>
</dialog>

<script>
  document.getElementById('open-btn').addEventListener('click', () => {
    document.getElementById('accessible-modal').showModal();
  });
</script>
```

### Custom overlays

- **Use the `inert` Attribute for Custom Overlays**: When `<dialog>` cannot be used (e.g., some non-modal overlays, framework constraints, or layouts where `<dialog>`'s top-layer/positioning behavior conflicts with the design), apply `inert` to outside content to ensure it cannot be interacted with by keyboard, pointer, or assistive technology. This requires structuring elements in such a way that the custom overlay is not a descendant of the element with `inert` set on it.


## 13. Testing Validations

### Automated checks

- **Run Automated checks via axe-core or Lighthouse audits**: Catch missing alt texts or low contrasts (e.g., via Lighthouse in Chrome DevTools MCP).
- **Don't rely purely on scores**: A 100% score does not guarantee real usability.

### Manual testing

- **Validate Sequential Navigations using keyboards alone**: Using only keyboard shortcuts, such as Tab/Shift+Tab, arrow keys, Enter, Space, and Esc, confirm every interactive element is reachable and operable, and that focus never gets stuck.
- **Test on Screen Readers with calibrated browsers**: Rely on standard bindings (e.g., JAWS with Chrome, NVDA with Firefox, Narrator with Edge, VoiceOver with Safari on macOS and iOS, TalkBack with Chrome for Android).


--- Guide for performance ---
# Performance

## Critical Rendering Path (CRP) Optimization

The Critical Rendering Path dictates how quickly the browser converts HTML, CSS, and JavaScript into painted pixels. 

### DOs
*   **DO inline critical CSS**: Extract styles necessary for above-the-fold content and inject them directly into the HTML `<head>`. Defer the rest of the stylesheet.
*   **DO use `async` or `defer` for all non-critical scripts**: Prevent JavaScript from blocking the DOM parser. Use `defer` for scripts that depend on the DOM or each other, and `async` for independent scripts. `type="module"` is preferred for modern JavaScript and is deferred by default so no need to have an explicit `defer` attribute but you can use `async` on independent module scripts.
*   **DO split CSS by media queries**: Use the `media` attribute on `<link>` tags so the browser downloads unused stylesheets (e.g., print styles or desktop styles on mobile) without blocking the render.
*   **DO utilize resource hints**: Add `preconnect` or `dns-prefetch` for essential third-party domains (e.g., font foundries or API endpoints) to establish early TLS handshakes.

### DON'Ts
*   **DON'T use `@import` in CSS**: This creates sequential request chains that delay the CSS Object Model (CSSOM) construction.
*   **DON'T place large, non-critical JavaScript in the `<head>`**: This halts DOM construction until the script is downloaded, parsed, and executed.
*   **DON'T load invisible or unreachable CSS/JS**: Ensure build tools apply tree-shaking and CSS minification to drop unreachable code before deployment.

### Code Examples

**HTML: Deferring Non-Critical CSS & Scripts**
```html
<!-- Inline critical styles directly in head -->
<style>
  body { margin: 0; font-family: system-ui; }
  .hero { min-height: 100vh; }
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="non-critical.css"></noscript>

<!-- Load CSS conditionally based on viewport -->
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">

<!-- Defer JavaScript execution -->
<script defer src="app-bundle.js"></script>
```

### The Resource Hint Navigator

| Hint | Tool Use Case | Example |
| :--- | :--- | :--- |
| `preconnect` | Resolve TLS/DNS for known third-party APIs | API endpoints, font services |
| `dns-prefetch` | Lean fallback for non-critical third-party origins | Ad servers, analytics fallbacks |
| `preload` | Same-origin asset needed *now* for rendering | Hero images, render-blocking fonts |
| `prefetch` | Assets needed for next-page navigation | Next-page bundle, detail views |

**Single-Sentence Mental Model**: "Preconnect for domains, Preload for viewport, Prefetch for futures."

## Largest Contentful Paint (LCP) & Resource Fetching

LCP measures the time required to render the largest visible text or image block within the viewport. Optimize LCP by prioritizing visible elements and prepolishing.

### DOs
*   **DO declare the LCP image in standard HTML**: Ensure LCP images are present in the raw HTML response so the preload scanner discovers it immediately. This can be be via an `<img>` element (preferred) or a `<link rel="preload" as="image">` (where the image resource is loaded due to JavaScript or CSS). Avoid relying on JavaScript or CSS to be the only source of the image resource.
*   **DO use `fetchpriority="high"` on the LCP images**: Images are not downloaded initially while the browser prioritizes render-blocking resources like CSS and JavaScript and can perform layout to discover if the images are in the viewport or not. Use `fetchpriority="high"` to signal to the browser's heuristic engine to start downloading the LCP image earlier. This should be on the `<img>` element (`<img fetchpriority="high">`) and any preload (`<link rel="preload" as="image" fetchpriority="high">`).
*   **DO use `fetchpriority="low"` to demote competing elements that are not in the initial viewport**: Lower the priority of large images or carousels that are *not* the primary LCP element and do *not* appear in the initial viewport, but may still be downloaded if near the viewport or hidden with CSS (for example `overflow:scroll` for carousels). Images with `fetchpriority="low"` will still be downloaded but start after higher-priority resources the browser has queued.
*   **DO use `loading="lazy"` to avoid loading competing elements that are far out of the initial viewport**: Images, iframes, and video and audio media which are well outside of the viewport should be lazy-loaded to avoid fetching these at all. Images with `loading="lazy"` will not be downloaded at all when well outside the viewport but will download when in, or near, the viewport (depending on browser heuristics and connection settings),.

### DON'Ts
*   **DON'T lazy-load the LCP image**: Never apply `loading="lazy"` to above-the-fold images. This purposefully delays the fetch until layout calculation is complete, severely degrading LCP.
*   **DON'T overuse `fetchpriority="high"`**: Prioritization is a zero-sum mechanism. Elevating too many resources creates network contention and negates the benefit.
*   **DON'T implement complex JavaScript loaders for the hero section**: Client-side rendering of the LCP element introduces substantial request chains (HTML -> JS -> Execution -> Image Request).

### Code Examples

**HTML: LCP Image Optimization**
```html
<!-- Standard LCP Image -->
<img 
  src="/images/hero.webp" 
  alt="Hero Product" 
  fetchpriority="high" 
  width="1200" 
  height="600"
>

<!-- Preloading a CSS-based LCP background -->
<link rel="preload" as="image" href="/images/bg-hero.webp" fetchpriority="high" type="image/webp">

<!-- Demoting an above-the-fold non-LCP carousel image -->
<img src="/images/carousel-2.webp" fetchpriority="low" loading="lazy" alt="Slide 2">
```

## Interaction to Next Paint (INP) & Main Thread Unblocking

INP measures the latency of all interactive events across the page's lifecycle. Poor INP is caused by long-running JavaScript tasks blocking the main thread. 

### DOs
*   **DO break up long tasks**: Any JavaScript execution exceeding 50ms should be split. Yield to the main thread frequently so the browser can process pending user inputs.
*   **DO use `scheduler.yield()` with a fallback**: Utilize the modern `scheduler.yield()` API to place task continuations at the *front* of the queue, falling back to `setTimeout` wrapped in a Promise for unsupported browsers.
*   **DO debounce or throttle rapid event listeners**: Limit the execution frequency of handlers attached to `scroll`, `resize`, or rapid `input` events.
*   **DO separate UI updates from heavy computations**: Update the UI synchronously to provide immediate visual feedback, then push background processing to a Web Worker or deferred task.

### DON'Ts
*   **DON'T rely solely on `setTimeout(..., 0)` for continuous yielding**: Standard `setTimeout` places continuations at the *back* of the task queue, potentially causing long delays if other tasks are pending. Use `scheduler.yield()` where available.
*   **DON'T cause layout thrashing**: Avoid interleaving DOM reads (`offsetHeight`, `getBoundingClientRect`) and writes (`style.height`) within the same loop. Batch DOM reads, then batch DOM writes.
*   **DON'T block the thread with recurring timers**: Avoid heavy polling with `setInterval` that starves the main thread.

### Code Examples

**JS: `scheduler.yield` Polyfill and Usage**
```javascript
// Polyfill for yielding to main thread
async function yieldToMain() {
  if ('scheduler' in window && 'yield' in scheduler) {
    return await scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

// Processing a large array without blocking user input
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    
    // Yield every 50 iterations to allow rendering/interaction
    if (i % 50 === 0) {
      await yieldToMain();
    }
  }
}
```

### Main Thread Task Slicing Heuristic

**The 50ms Rule for INP**:
- **< 50ms**: Execute synchronously.
- **50ms - 250ms**: Slice tasks and yield with `scheduler.yield()`.
- **> 250ms**: Offload to a Web Worker.

## Third-Party Script Management

Third-party scripts (analytics, ads, chat widgets) are the primary source of main thread congestion.

### DOs
*   **DO avoid third-party scripts blocking main content**: Use `defer` with all third-party scripts unless critical to the page load and load them in the footer of the page, rather than the `<head>`.
*   **DO self-host critical third-party dependencies**: Reduce DNS lookups and enforce custom `Cache-Control` logic by hosting third-party libraries on the origin domain.

### Code Examples

**HTML: Third-Party Script Execution**
```html
<!-- 1. Place third-party scripts near the end of the page with the defer attribute -->
<script defer src="http://www.example.com/third-party.js"></script>
```

## CSS Rendering & Containment Optimization

Rendering involves Layout, Style, Paint, and Compositing calculations. CSS Containment limits the scope of these calculations which is useful on large, complex pages where such calculations can cause performance problems.

### DOs
*   **DO use `content-visibility: auto` on off-screen sections on large, complex pages**: Instruct the browser to skip layout and paint calculations for entire subtrees until they approach the viewport.
*   **DO pair `content-visibility` with `contain-intrinsic-size`**: Prevent layout shifts and scrollbar jumping by providing a placeholder height/width for unrendered containers.
*   **DO derive `contain-intrinsic-size` from the content**: When setting `contain-intrinsic-size` use the `auto` keyword and a value that's derived from what is known about the contents (i.e. text size, spacing, size of graphics, character count). Preferably use units such as `rem`, `lh`, `cap`, or `ch` that match values used for the elements within the contents rather than `px`. If the content for items in a group is not consistently sized, then use an average size.
*   **DO apply explicit CSS containment (`contain`)**: For isolated UI components (like modals or widgets), use `contain: layout style paint` to prevent internal changes from triggering page-wide reflows.

### DON'Ts
*   **DON'T apply `content-visibility: auto` on smaller, simpler pages**: The gains will be negligible and there are risks of side effects with content jumping.
*   **DON'T apply `content-visibility: auto` to above-the-fold content**: The browser will still evaluate it, but forcing it through the containment engine unnecessarily adds slight overhead to visible elements.
*   **DON'T overuse `will-change` globally**: Indiscriminately applying `will-change: transform` to multiple elements consumes excessive VRAM, causing GPU crashes or sluggish rendering.
*   **DON'T forget accessibility when hiding elements**: `content-visibility: auto` keeps elements in the DOM for screen readers. If content should be truly hidden from assistive technology when off-screen, manage `aria-hidden` attributes manually.

### Code Examples

**CSS: Content Visibility and Containment**
```css
/* Optimize a long list of articles below the fold */
.article-list-item {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px; /* Provides a 600px placeholder */
}

.row {
  --row-gap: .4rem;
  --title-height: 1lh;
  --description-height: 0.85lh;

  display: grid;
  row-gap: var(--row-gap);
  content-visibility: auto;
  /* The sum of the title height, row gap, and description height should be the size of the contents when skipped for rendering. */
  contain-intrinsic-block-size: auto calc(var(--title-height) + var(--row-gap) + var(--description-height));
}

/* Scope a complex widget to prevent layout thrashing */
.isolated-widget {
  contain: layout style paint;
}

/* Hardware accelerate an animation only on hover */
.interactive-button:hover {
  will-change: transform;
  transform: scale(1.05);
}
```

## Modern Image & Media Optimization

Images typically represent the largest payload on a given web page. Optimization requires format negotiation, responsive sizing, and layout stabilization.

### DOs
*   **DO serve modern formats (AVIF / WebP / JPEG XL)**: Use the `<picture>` element to offer AVIF or JPEG XL (best compression), falling back to WebP, and finally JPEG/PNG for legacy browsers.
*   **DO apply explicit `width` and `height` attributes**: Setting native attributes allows the browser to compute the aspect ratio immediately, reserving space and eliminating CLS. Image dimensions may be set either as HTML attributes or CSS properties.
*   **DO utilize `loading="lazy"` on all below-the-fold images**: Utilize native browser lazy loading to defer network requests for images outside the initial viewport.
*   **DO implement responsive images with `srcset` and `sizes`**: Serve tailored resolutions based on screen density and viewport width to prevent mobile devices from downloading desktop-sized images.

### DON'Ts
*   **DON'T lazy load above-the-fold images**: This directly harms LCP. Visible images must use `loading="eager"` (the default).
*   **DON'T delete necessary dimensions**: Failing to specify width/height on lazy loaded images causes layout shifts.
*   **DON'T omit the `sizes` attribute when using `srcset`**: Without `sizes`, the browser assumes `100vw` and downloads the largest available image.

### Code Examples

**HTML: Comprehensive Responsive Image Component**
```html
<picture>
  <!-- Modern Formats with Source Negotiation -->
  <source type="image/avif" srcset="hero-400w.avif 400w, hero-800w.avif 800w" sizes="(max-width: 600px) 100vw, 50vw">
  <source type="image/webp" srcset="hero-400w.webp 400w, hero-800w.webp 800w" sizes="(max-width: 600px) 100vw, 50vw">
  
  <!-- Fallback + Dimensions + Priority for Above-The-Fold -->
  <img 
    src="hero-800w.jpg" 
    alt="Descriptive text" 
    width="800" 
    height="600"
    fetchpriority="high"
    loading="eager"
  >
</picture>

<!-- Below-The-Fold Image -->
<img 
    src="footer-icon.png" 
    alt="Footer Logo" 
    width="100" 
    height="100"
    loading="lazy"
>

<!-- DO: Use native lazy loading for below the fold iframes -->
<iframe src="https://example.com/map" width="800" height="600" loading="lazy" title="Example Map"></iframe>
```

## Service Workers & Caching Strategies

Client-side caching via Service Workers allows applications to bypass the network entirely, serving resources from disk/memory.

### DOs
*   **DO use a `CacheFirst` strategy for static, versioned assets**: Immutable files (fonts, JS/CSS bundles with hash strings) should be served directly from the cache to guarantee instant loading.
*   **DO use `StaleWhileRevalidate` for dynamic, non-critical resources**: For API calls where slight staleness is acceptable, serve immediately from cache while silently updating the cache in the background.
*   **DO implement a `NetworkFirst` strategy for HTML documents**: Ensure the user always receives the latest application shell and manifest, falling back to cache only if offline.
*   **DO restrict cache sizes and expiry**: Use expiration plugins to prevent the Service Worker from exhausting the device's storage quota.

### DON'Ts
*   **DON'T cache opaque responses blindly**: Responses from third-party domains lacking CORS headers are "opaque". Caching them heavily consumes quota and fails silently. Only cache them using `NetworkFirst` or `StaleWhileRevalidate`.
*   **DON'T cache POST requests**: Service workers cannot cache non-GET requests natively. Implement background sync queues for offline submissions.
*   **DON'T bypass versioning**: Failing to update asset hashes/versions will trap users in infinite cache loops.
*   **DON'T use `Cache-Control: no-store` for non-sensitive resources**: This directive prevents the browser from storing the page in the **Back-Forward Cache (bfcache)**, leading to significantly slower perceived performance. Use it only for truly private data, and use `Cache-Control: no-cache` or `Cache-Control: max-age=0` for pages that simply need to serve up-to-date content.

### Code Examples

**JS: Service Worker Caching via Workbox**
```javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 1. HTML Documents: Network First
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages-cache' })
);

// 2. Static Assets (JS, CSS, Fonts): Cache First
registerRoute(
  ({ request }) => ['style', 'script', 'font'].includes(request.destination),
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })
    ]
  })
);

// 3. API Responses: Stale While Revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/v1/content'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);
```

## Web Fonts Optimization

Web fonts are a common source of render blocking. Optimizing them reduces the Flash of Invisible Text (FOIT) and speeds up initial rendering.

### DOs
*   **DO preload critical fonts**: Use `<link rel="preload" as="font" type="font/woff2" crossorigin>` for fonts seen above the fold. Do include the `crossorigin` attribute for all fonts (even same origin fonts).
*   **DO subset fonts**: Trim font weights and glyph variations to include only the characters your application requires.

### DON'Ts
*   **DON'T preload all fonts**: Over-preloading leads to network contention that starves other critical assets.
*   **DON'T use `fetchpriority="high"` on fonts**: Fonts are loaded with a high priority by default so there is no need to specify `fetchpriority="high"`.

### Code Examples

**CSS: Font Loading Face**
```css
@font-face {
  font-family: 'Modern Sans';
  src: url('/fonts/modern-sans.woff2') format('woff2');
}
```

**HTML: Critical Font Preload**
```html
<!-- Always use crossorigin for fonts even if on the same origin -->
<link rel="preload" href="/fonts/modern-sans.woff2" as="font" type="font/woff2" crossorigin>
```

## Video Performance & Metrics

Video payloads are among the heaviest assets. Optimization focuses on reducing bandwidth stall and preserving Cumulative Layout Shift (CLS) stability.

### DOs
*   **DO specify explicit `width` and `height` attributes**: Setting native dimensions reserves layout space and prevents CLS.
*   **DO provide a `poster` image fallback**: Display a lightweight image placeholder while the video buffers to improve perceived performance.
*   **DO use `<link rel="preload" as="image" fetchpriority="high">` for poster images where the video is the LCP element**: This ensures the image is downloaded as quickly as possible.
*   **DO use `preload="none"` for non-critical videos**: Delay bandwidth consumption for below-the-fold or non-autoplaying videos.
*   **DO serve modern formats via source negotiation**: Offer WebM (better compression ratio) alongside standard MP4 formats.
*   **DO use `loading="lazy"` for offscreen videos**: Lazy-loading videos allow `poster` and `preload` downloads to be deferred until the video is in or near the viewport.

### DON'Ts
*   **DON'T auto-play video files blindly**: Rely on user intent or use progressive enhancement streams.
*   **DON'T auto-play large video files at all**: Rely on user intent before downloading large files.

### Code Examples

**HTML: Accessible and Dynamic Video Loader**
```html
<video 
  controls 
  width="1200" 
  height="675"
  poster="/images/video-poster.webp" 
  preload="none"
  loading="lazy"
>
  <source src="/videos/intro.webm" type="video/webm">
  <source src="/videos/intro.mp4" type="video/mp4">
  <!-- Include accessibility tracks -->
  <track src="/video-caps.vtt" kind="captions" srclang="en" label="English">
</video>
```

## JavaScript Code-Splitting

Heavy monolithic bundles block main thread parse times on low-end devices. Splitting ensures we only download bytes required for the immediate viewport.

### DOs
*   **DO use dynamic imports**: Split routes or heavy UI libraries using standard `import()` specifications.
*   **DO configure bundler asset chunking**: Use Vite or Webpack rollup directives to split third-party vendors from runtime application logic.

### DON'Ts
*   **DON'T ship a single, enormous `app.js` bundle**: It increases parse time and memory consumption for initial views.

### Code Examples

**JS: Route based Dynamic Splitting**
```javascript
// Dynamic import of heavy module only when button is clicked
document.getElementById('heavy-btn').addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
});
```

