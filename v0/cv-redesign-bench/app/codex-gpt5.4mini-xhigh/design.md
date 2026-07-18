# Design

## Direction

The CV is styled as a two-sheet editorial document rather than a generic portfolio page. The screen view feels like a paper object sitting on a warm neutral surface; the print view becomes a clean black-on-white A4 resume.

This matches the research:

- Butterick's resume guidance pushed the layout toward wider margins, a smaller measure, gentler bullets, and a weaker hierarchy for headings.
- AIGA's resume guidance pushed the page toward clear typography and visual hierarchy without turning the document into an infographic.
- The ATS and accessibility sources pushed the structure toward plain text, semantic sections, real links, and linear reading order.

## Hierarchy

The top of page 1 carries:

- Name
- Headline
- Contact row
- Print control on screen only

The body then moves in this order:

1. Summary
2. Skills
3. Projects
4. Recent experience
5. Leadership experience
6. Earlier experience
7. Education

That order puts the recruiter-scan signals first: title, company names, dates, skills, and recent impact.

## Typography

I used an IBM Plex trio:

- `IBM Plex Serif` for the name and section headings
- `IBM Plex Sans` for body copy
- `IBM Plex Mono` for metadata, dates, and contact details

The serif gives the page a more editorial profile, the sans keeps the body readable, and the mono makes the dates and URLs feel intentionally technical.

## Grid And Layout

- Desktop keeps the route in a clean single-column flow on screen, with a compact nested layout inside each sheet.
- Print switches each sheet into a two-column editorial grid so the summary, skills, projects, and recent roles share the first page, while leadership, earlier history, and education share the second.
- Mobile collapses everything into a single column so the document remains readable at about 375 px wide.
- The page cards keep a comfortable reading width and avoid horizontal overflow.
- Links are allowed to wrap so long URLs do not break the layout.

## Accessibility

- The DOM order stays linear and matches the reading order in print.
- All contact items are real links.
- Contrast stays high in screen mode and becomes black-on-white in print.
- The `Download PDF` control is a real button that calls `window.print()`.
- Decorative screen-only backgrounds disappear in print.

## Print Strategy

- The print stylesheet sets `@page` to A4 explicitly.
- Page 1 and page 2 are rendered as separate page sheets in the DOM.
- Each sheet uses a two-column print grid to reduce vertical spill while preserving a linear DOM order.
- The second sheet starts with a forced page break so the browser does not invent a third page.
- Role blocks, section groups, and the column wrappers use `break-inside: avoid` so bullets do not split awkwardly.
- Shadows, background washes, and the print button are hidden in print.

The exact content split is deliberate:

- Page 1 carries the summary, skills, projects, and the two most recent roles.
- Page 2 carries the leadership roles, compressed earlier history, and education.

This keeps the strongest evidence in the first page while still fitting the full print version into exactly two A4 pages.
