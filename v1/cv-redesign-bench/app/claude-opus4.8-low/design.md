# design.md — visual direction & rationale

## Direction: quiet editorial

The profile is a senior AI product / frontend engineer whose own PDFs already
use a restrained, print-like voice (serif name, monospace meta). I kept that
spirit and sharpened it into a **quiet editorial** system: a single reading
column with a fixed left label rail, one warm accent, and lots of white space.
This maps to the research: recruiters scan in an F-shape for 6–11 seconds, and
white space + strong hierarchy read as senior and confident (see `research.md`
§2, §3).

## Hierarchy

Three type voices carry three jobs:

- **Serif (Georgia)** — the name, role titles, and project/education titles.
  This is the editorial signal and the thing the eye lands on first.
- **Sans (Inter, `--font-sans`)** — all body copy and bullets. Chosen for screen
  legibility and clean ATS text extraction (`research.md` §4).
- **Mono (`--font-mono`)** — rail labels, dates, contact links, the download
  control. Mono marks "metadata" so the eye separates it from prose without
  needing color, echoing the source PDFs.

Only the name is large. Every section heading is the same small uppercase mono
label, so nothing competes with the name and the scan can jump section to
section.

## Grid & layout

A single semantic column, laid out as a 2-column CSS grid per section:
`[8.5rem label rail | content]`. The rail gives the F-scan a stable left anchor
(`research.md` §2). It is one linear flow — label then content — so plain-text
extraction stays in order (no true multi-column parsing trap). The header spans
full width; role title and dates share a baseline row so title, employer, and
dates are catchable in one horizontal sweep.

## Color & accent

Near-black ink on white, hairline rules for section breaks, and a single warm
terracotta accent (`--accent`) used only on links and project marks. One
restrained accent is the 2026 guidance for a premium, non-gimmicky look.

## Responsive behavior

- **Desktop (~1440px):** centered sheet capped at 56rem so line length stays
  readable; the label rail sits to the left.
- **Mobile (~375px):** the section grid collapses to one column — the mono label
  becomes a small heading above its content; skill rows and project rows also
  stack. No horizontal overflow; everything wraps (`flex-wrap`, `min-width: 0`).

## Accessibility

- Real semantic structure: one `<h1>` (name), `<section>`s with mono labels,
  `<article>` per role, real `<ul>`/`<li>` bullets, real `<a>` links with
  `mailto:` and visible URLs as link text.
- Color is never the only signal — hierarchy comes from size, family, and weight.
- Theme-aware: a `.dark` override raises ink/lowers background and brightens the
  accent for contrast; print forces a separate high-contrast light palette.
- Links show human-readable URLs, so they remain useful in a printed/grayscale
  copy and in ATS text extraction.

## Two-page print strategy

Goal: **exactly two clean A4 pages**, readable black-on-white even from dark
mode.

1. `@page { size: A4; margin: 14mm }` fixes the sheet so the browser does not
   guess and downscale (`research.md` §4).
2. `@media print` forces a light palette (`--ink:#000`, `--bg:#fff`) and sets
   `print-color-adjust: exact`, so a dark-mode screen still prints correct.
3. Type is stepped down to print points (name 24pt, body ~9.4pt, detail ~8.8pt)
   so the full history fits without clipping.
4. **Page 1** holds header, About, Fun Facts, Skills, Projects. An explicit
   `break-before: page` on the Experience section (`.pageBreak`) starts
   **page 2** with Experience + Education. Content was compressed (see
   `content.md`) so each page fills without spilling to a third.
5. `break-inside: avoid` on every section, role, project, and skill row prevents
   a heading or role from splitting across the page boundary.
6. The Download PDF button and any screen chrome are `display:none` in print.

## Content ↔ design fit

The two-page budget drove the content cuts in `content.md`: five detailed roles
plus one compressed "Earlier" line, a five-group skill matrix, and a
three-paragraph About. That volume is exactly what fills two A4 pages at the
chosen type sizes with deliberate breaks and no blank third page.
