# Design Rationale

## Direction

The route uses an editorial dossier style instead of a generic portfolio or
template resume. The goal is to look deliberate, compact, and senior without
feeling overdesigned.

The visual language is:

- a serif display face for the candidate name
- a clean sans serif for the body copy and metadata
- a muted warm screen background
- monochrome print output
- strong whitespace and short, scannable blocks

This matches the research: recruiters skim quickly, ATS-safe resumes need a
clear reading order, and print output should stay text-first.

## Hierarchy

The hierarchy is designed for first-pass scanning:

1. Name
1. Title
1. Contact rail
1. Summary
1. Skills
1. Selected projects
1. Experience
1. Education

Section labels live in a small left rail on wider screens. That creates a quick
visual map without breaking the semantic order. On mobile, the layout collapses
to a single column so the page stays readable at roughly 375 px wide.

## Typography

The route uses IBM Plex Serif, IBM Plex Sans, and IBM Plex Mono.

- Serif: the name and page identity
- Sans: body copy, section labels, and utility text
- Mono: small utility details and the printed archive note

The type scale is intentionally compact so the two-page print output can carry
the full senior-level history without clipping.

## Grid And Responsive Behavior

Desktop and print use a two-column section grid:

- left rail for section labels
- right column for content blocks

That structure keeps the page compact and helps recruiters orient themselves
quickly. At smaller widths, every section collapses into one column and the
contact row wraps instead of overflowing.

The screen version is wrapped in page-like cards with subtle borders and shadow
so the two-page split is visible before printing. Those effects are removed in
print.

## Accessibility

- semantic `h1`, `h2`, and `h3` structure
- descriptive contact and project link text
- high contrast body text
- no icon-only controls
- no reliance on color for meaning
- print-safe black-on-white overrides

The Download PDF control is a real button and calls `window.print()`. It is
hidden in print so it never appears on paper.

## Two-Page Print Strategy

The print version is built as two explicit page containers from the canonical
content model:

- Page 1: summary, skills, and selected projects
- Page 2: experience and education

Print CSS uses:

- `@page { size: A4; margin: 11mm 12mm 12mm; }`
- `break-after: page` on the first page container
- screen-only chrome hidden in print
- black text on a white page with no shadows, borders, or blur

This avoids the common failure modes for browser-printed CVs: clipped content,
blank trailing pages, and dark-mode artifacts.

## Content Tradeoffs

The route intentionally compresses or omits lower-signal material:

- the long personal narrative is reduced to a concise summary
- the fun-facts section stays out of the print CV
- legacy GitHub history is folded into the current portfolio and archive links
- the first page does not repeat the full chronology; it instead prioritizes
  summary, skills, and selected projects so the print file stays at two pages

That keeps the output focused on the material a hiring manager is most likely
to need in the first scan.
