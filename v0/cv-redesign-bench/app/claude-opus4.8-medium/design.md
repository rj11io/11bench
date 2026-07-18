# Design

Visual and technical rationale for the CV route at
`/claude-opus4.8-medium`. Every decision traces to
[`research.md`](./research.md) and the constraints in [`content.md`](./content.md).

## Direction: editorial modernism, engineer's register

The research converges on one look for this profile: **modernist restraint —
strong typographic hierarchy, generous white space, one accent, a single legible
column** ([research.md §3](./research.md)). The design commits to that, then
gives it an *editorial* voice to match a senior person whose story is as much
about ownership and taste as about code.

Three type registers map to three sides of the candidate:

- **Serif** (name + section markers) → editorial voice, the "story".
- **Sans** (body, bullets) → substance, clean and scannable.
- **Mono** (dates, URLs, tags, section numbers) → the engineer register.

This is a deliberate three-voice system, not decoration: it lets hierarchy come
from *contrast of style*, so heading **sizes stay small** (Butterick/Toptal —
[research.md §3](./research.md)) while the eye still separates label from
content.

## Type & scale

- Serif: **Fraunces** (optical, editorial) for the name and the compact section
  labels. Sans: **Inter** (already the app's `--font-sans`) for body. Mono:
  **Geist Mono** (already `--font-mono`) for metadata. Fonts load via
  `next/font/google` in the route's own `layout.tsx`, scoped to the route.
- Body 15–16px on screen / **10–10.5pt in print** (inside the ATS-safe 10–12pt
  band — [research.md §4](./research.md)). Line length capped so text columns
  stay in the comfortable ~60–75-character range (Butterick).
- Hierarchy is weight + tracking + colour, **not size**: section labels are
  small-caps-style, letter-spaced, and muted/accented; job titles are the
  heaviest text in each entry; dates are mono and muted.

## Colour & accent

- Base is the app theme's near-black-on-white (`--foreground` on
  `--background`), which already clears WCAG AA comfortably. Dark mode inverts
  via the existing `.dark` tokens.
- **One accent**, used sparingly: section numbers, the active link underline, and
  the left rule. It is applied only to large/non-text elements or where it clears
  4.5:1, so contrast rules hold ([research.md §4](./research.md)). All
  body/metadata text uses theme tokens that already pass AA.
- The accent is defined as a local CSS variable in the route's CSS module (not in
  global CSS), with a light and dark value, so nothing outside the route is
  touched.

## Grid & layout (screen)

- Desktop (~1440px): a **two-track editorial grid** — a narrow left rail
  (~150px) holds the mono section number + serif label; the main column holds
  content. Max content width ~880–920px, centred, generous margins. This gives
  the editorial feel without a *content* sidebar (the parser-breaking pattern the
  research warns against — the rail holds only labels, and it disappears in print
  and on mobile).
- The header is a full-width band: name (serif, large), title + location, and a
  row of contact links; a **Download PDF** button sits top-right.
- Sections: Summary, a one-line personality strip, Skills (label/value rows),
  Experience (the spine), Projects (compact cards), Education. Order follows
  [research.md §1](./research.md).
- Mobile (~375px): the rail collapses; everything stacks to a **single column**;
  section label sits above its content; contact links wrap; no horizontal
  overflow (all rows use flex-wrap and `min-w-0`, tags wrap, long URLs use the
  human label). Tap targets ≥ 40px.

## Accessibility

- Semantic landmarks: one `<main>`, `<header>`, `<section>` per block with an
  `aria-labelledby` heading; a visually-hidden "skip to content" is unnecessary
  for a single-screen doc but heading order is strict `h1 → h2 → h3`.
- Links are **always underlined**, have a visible **focus ring**, and use
  descriptive text (never "click here") — [research.md §4](./research.md). The
  Download control is a real `<button>`.
- Reading order in the DOM matches the visual order (rail label precedes content
  in source), so screen-reader flow matches sight flow.
- Contrast verified against AA for body and metadata in both themes.

## Print strategy — exactly two A4 pages

The print layout is a **separate visual mode driven from the same DOM**, using
`@media print` in the route's CSS module. Approach:

1. **`@page { size: A4; margin: 12mm 14mm; }`** — fixed A4 geometry.
2. **Collapse to one ATS-safe column.** The left rail is removed; section labels
   move inline above content; the two-track grid becomes a single stream —
   single-column, standard headings, contact links in the body
   ([research.md §4](./research.md)).
3. **Force black-on-white** regardless of dark mode: print rules hard-set
   `color: #000` / `background: #fff` and `print-color-adjust: exact` on the
   accent rules so nothing depends on the screen theme.
4. **Deliberate page break.** A single forced `break-before: page` is placed
   after the Projects/experience-page-one boundary so page one ends on a clean
   section edge and page two carries older roles + projects + education. Every
   experience and project entry gets **`break-inside: avoid`** so no entry splits
   across the fold ([research.md §4](./research.md)).
5. **Hide screen-only chrome** — Download button, theme-dependent affordances,
   and the decorative rail — via `@media print { display: none }`.
6. **Two-page fit is engineered, not hoped for.** Print font-size, line-height,
   and section spacing are tuned specifically in the print block; content volume
   in [`content.ts`](./content.ts) was compressed (the "Earlier" block, single-
   line older roles) to land the second page comfortably full but **not
   overflowing to a third**. No blank trailing page: the last element carries no
   forced break and total flow is kept just under 2×A4.
7. **Links legible on paper.** Links stay underlined and dark; where the label
   isn't itself the URL, the domain is shown so a printed copy stays actionable.

## Why this beats the source PDFs

The originals are competent but dense, size-driven, and split across 2 (min) /
6 (max) pages. This redesign keeps every fact, adds real hierarchy, makes the
senior story legible in the 6-second scan, and produces a screen experience and
a strict two-page print from **one** content source — the reconciliation the two
PDFs never did for the reader.
