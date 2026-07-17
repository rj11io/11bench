# Design — "Quiet editorial"

The direction, in one sentence: a text-first, editorial page — big serif
name, calm sans body, monospace metadata, one restrained accent — that
reads like a well-set magazine profile on screen and collapses to a strict
black-on-white two-page A4 document in print.

Every choice below traces back to [research.md](./research.md) (the
findings) and [content.md](./content.md) (the material and its budget).

## Why this direction

- The research on personal-site trends (Typewolf, Design Shack, Colorlib —
  see research.md §3) converges on typography-led minimalism: type as the
  hero, near-black/near-white plus one accent, serif headlines for an
  editorial voice.
- The candidate's own PDFs already speak this language (serif display
  name, mono contact line, letterspaced section labels). Refining an
  existing identity is stronger than replacing it — recruiters who saw the
  PDF recognize the site, and vice versa.
- The eye-tracking research (research.md §1) rewards exactly what this
  layout does: strong top band, labels on the left edge where the
  F-pattern stem lands, bold role+employer lines, front-loaded bullets.

## Typography

| Use | Face | Why |
| --- | --- | --- |
| Name, role titles, project names | Newsreader (serif, loaded via `next/font` in this folder's `layout.tsx`) | Editorial voice; designed for on-screen text; echoes the PDFs' serif display. |
| Body, bullets, skills | Inter (`--font-sans`, already provided by the root layout) | Neutral, highly legible at small print sizes. |
| Dates, URLs, section labels, metadata | Geist Mono (`--font-mono`, from the root layout) | Tabular feel for dates/links; the PDFs use mono for the same jobs. |

Scale (screen): name `clamp(2.4rem → 3.6rem)`, section labels 0.72rem
uppercase letterspaced, role titles 1.12rem, body 0.95rem with 1.6 line
height, ~68ch max measure. Scale (print): set in `pt` for predictable
output — body 9.2pt/1.42, role titles 11pt, name 25pt, labels 7pt.
Butterick's rules (research.md §2): headings sized down, visual weight on
employer/role names, generous margins over crammed lines.

## Color and theming

- Screen light: near-black ink `oklch(0.18 0 0)` on warm white; muted ink
  `oklch(0.45 0 0)` for dates/notes (≥ 4.5:1 AA, research.md §4).
- Screen dark: same structure inverted (`.dark` class from the app's theme
  provider), ink `oklch(0.93 0 0)` on `oklch(0.16 0 0)`, muted at AA.
- One accent — a burnt sienna `oklch(0.55 0.16 40)` (light) /
  `oklch(0.75 0.12 45)` (dark) — used only for links, the name's terminal
  mark, and small markers. Nothing depends on it: in print it drops to
  black with underlined links, so no information is carried by color
  alone (WCAG 1.4.1).
- Print: explicit black-ish `#111` on white regardless of screen theme;
  `color-scheme: light` and hard overrides inside `@media print` so dark
  mode never leaks into the PDF.

## Grid and hierarchy

- Desktop (~1440px): a centered column (max ~56rem) with a two-column
  grid per section — a 10rem left rail holding the letterspaced section
  label, content on the right. This puts labels exactly on the F-pattern
  stem (research.md §1) and reproduces the structure both PDFs use.
- Each experience entry: serif bold title + employer link on one line
  (the credibility anchors Butterick says readers judge by), mono date
  range right-aligned on desktop, lead sentence, then 2–3 front-loaded
  bullets. "Earlier" roles compress to single lines — role, employer,
  date, one clause — honoring the content budget in content.md.
- Document outline for ATS and screen readers: one `h1` (name), `h2` per
  section with standard names (Profile, Skills, Experience, Projects,
  Education), `h3` per role. Real text throughout, no text-in-images,
  no content in positioned header/footer boxes (research.md §4).

## Responsive behavior

- Mobile (~375px): the label rail collapses; section labels sit above
  their content, dates drop under the title instead of right-aligned,
  contact links wrap as a row of chips. Single column, no horizontal
  overflow; long URLs are allowed to break (`overflow-wrap`).
- Desktop (~1440px): the rail grid engages at the `md` breakpoint; the
  header shows name left, contact block right.
- Implemented with Tailwind utilities plus one CSS module
  (`cv.module.css`) scoped to this folder for print rules and the few
  things utilities express poorly (page breaks, `@page`).

## Accessibility

- Landmarks: `<header>`, `<main>`, `<section>` with `aria-labelledby`
  pointing at real headings.
- Contrast at or above AA for all text in both themes (research.md §4).
- Links are real anchors with visible, human-readable URLs (recruiters
  click them — research.md §4); `focus-visible` rings kept from the app
  baseline; the Download PDF control is a real `<button>`.
- Reduced motion: no animation is used, so nothing to gate.

## Print: the exact two-page strategy

Target: exactly two A4 pages, deliberate break, no clipping, no blank
third page, no screen-only controls (brief, plus research.md §4).

1. `@page { size: A4; margin: 12mm 14mm; }` — absolute units only.
2. The DOM is one flow, but the Experience section is rendered as two
   grid parts; the first part (which is also the last element of print
   page 1) carries `break-after: page` in print, so the break point is
   chosen by us, not by the browser. On screen the two parts read as one
   continuous section; in print the second part opens page 2 with a small
   "Experience — cont." rail label.
   - **Page 1:** header (name, title, contacts), Profile, Skills, and the
     two most recent — most AI-relevant — roles (rj11io, Hunt).
     Page one carries the strongest material (research.md §2).
   - **Page 2:** OMEGA, Phantasma, BinaryEdge, the Earlier one-liners,
     Projects, Education, Beyond work, and a one-line footer pointing at
     cv.rj11.io.
3. `break-inside: avoid` on every entry, plus `orphans`/`widows: 3`, so
   nothing tears mid-entry even if metrics shift slightly across print
   engines.
4. Font sizes switch to `pt`; spacing tightens (the screen's editorial
   whitespace would overflow the budget); the label rail narrows to 22mm
   but keeps the same two-column anatomy as desktop.
5. `@media print` hides the Download PDF button and theme-dependent
   styling; colors hard-set to `#111`-on-white; links render as dark
   underlined text with their visible URL (no `href` expansion needed
   since URLs are already the link text).
6. Verification (not just theory): the route is rendered to PDF with
   headless Chromium and the page count of the output is checked to be
   exactly 2; both pages are then visually inspected. Results are part of
   the final report.

## Component structure

```
app/claude-fable5-high/
  layout.tsx        — loads Newsreader, sets route metadata
  page.tsx          — server component; renders everything from content.ts
  print-button.tsx  — tiny client component calling window.print()
  content.ts        — structured transcription of content.md
  cv.module.css     — typography helpers, print rules, @page
  research.md / content.md / design.md — process artifacts
```

`page.tsx` contains no copy of its own beyond section labels; every fact
comes from `content.ts`, which mirrors content.md — the single-source rule
from the brief.
