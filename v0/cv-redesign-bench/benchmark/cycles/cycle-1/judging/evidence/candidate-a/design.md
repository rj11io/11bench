# Design Rationale

Access date: 2026-07-16.

## Direction

The CV is designed as a senior product-engineering brief: editorial, compact, and evidence-first. The source PDFs already point toward a sober typographic document; the redesign tightens it into a product/data profile rather than a personal essay.

Research connections:
- NN/g scanning research informed the left-edge section labels, prominent role/date rows, and short bullets.
- Harvard and CareerOneStop guidance informed the prioritization of recent evidence, action-led bullets, and role-relevant keywords.
- Baymard line-length guidance informed the constrained text columns and single-column mobile layout.
- IBM Carbon and IBM Design Language influenced the restrained product-system aesthetic: high contrast, measured rules, compact metadata, and minimal decorative color.

## Hierarchy

The hierarchy is:
1. Candidate identity, title, location, and contact links.
2. Two-line professional summary.
3. Focus signals and skills for fast matching.
4. Public projects and current work.
5. Reverse-chronological experience.
6. Earlier selected work and education.

The screen layout presents the CV as two document pages with a fixed action bar. The print layout removes the action bar and prints only the two A4 pages.

## Typography And Grid

The route uses the root Inter/Geist setup from the application, avoiding new font dependencies. The main grid is a narrow left label rail plus a flexible content column. Role headers use a compact two-column title/date row so company, title, and dates are visible during scanning.

Screen:
- Desktop: centered A4-like pages with a two-column internal grid.
- Mobile: one-column flow, no horizontal overflow, contact links wrap naturally, and the page container loses the visual paper metaphor where necessary.

Print:
- A4 page size, zero browser margin, controlled internal page padding.
- Exactly two `.page` elements, each `210mm x 297mm`.
- Page 1 contains identity, summary, focus, skills, projects, and the first three recent roles.
- Page 2 contains Phantasma, BinaryEdge / Coalition, earlier selected work, and education.

## Accessibility

- Semantic headings, sections, lists, and anchors are used throughout.
- Links are not color-only; they are underlined on screen hover/focus and in print.
- Print is forced to black text on white background, independent of dark mode.
- Focus states are visible for links and the Download PDF button.
- No important content is encoded as an image.

## ATS And PDF Strategy

The print version keeps simple section names, plain text, visible dates, real anchors, and no tables. The layout is visually two-column in places but represented with semantic text flow and headings. The Download PDF button calls `window.print()`; print CSS handles the actual PDF layout so browser output is deterministic and testable.

## Content Constraints

The six-page source has enough material for a fuller portfolio, but the two-page CV needs strict compression. Older roles are grouped because they establish the career arc without competing with the current AI/product work. The "fun facts" become "Technical origins" because robotics and game/server work are relevant origin signals, but not senior hiring evidence.
