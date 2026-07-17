# Design Rationale

## Direction

The route uses an editorial product-sheet direction rather than a generic startup portfolio. The candidate's profile sits between senior frontend engineering, AI product work, and data visualization, so the design needs both personality and operational clarity.

The visual language combines:

- a high-contrast serif masthead for authorial presence;
- structured sans-serif body copy for speed-scanning;
- panelized modules that echo dashboards and documentation systems;
- warm paper tones on screen, with hard black-on-white print output.

This choice follows the research in `research.md`: strong hierarchy, short scan paths, and a layout that feels intentional without sacrificing recruiter speed.

## Hierarchy

Page 1 carries the strongest hiring signal:

- title and contact block;
- concise profile summary;
- differentiators;
- four most recent roles.

Page 2 carries supporting depth:

- core skills;
- projects;
- education;
- BinaryEdge / Coalition leadership role;
- compact earlier experience.

That split reflects likely review order: recent fit first, supporting breadth second.

## Typography

- Display: `Fraunces` for the name and major hierarchy.
- Body: the app's existing sans stack from the root layout.
- Labels: uppercase micro-headings with tighter tracking for scannable structure.

This avoids an interchangeable SaaS look while keeping long-form reading comfortable. The serif is limited to major moments so the page does not become ornamental.

## Grid and responsive behavior

- Mobile: single-column stacking with preserved section order.
- Desktop: asymmetric editorial grids.
  - Page 1: summary rail plus experience main column.
  - Page 2: skills/projects rail plus supporting narrative main column.
- No horizontal overflow: cards and metadata wrap, and role headers collapse vertically on small screens.

The asymmetry makes the screen version feel designed rather than templated, but the underlying DOM order stays sensible for accessibility and print.

## Accessibility choices

- Links are explicit destinations, not vague labels.
- Contact information appears near the top and remains readable in print.
- Important hierarchy is not color-dependent.
- Print mode removes gradients, shadows, and accent-only distinctions.
- Body sizes and spacing are conservative enough for A4 output.

## Two-page print strategy

The print layout is not left to browser pagination.

- Two explicit `.page` sections are rendered in the DOM.
- Print CSS applies `@page { size: A4; margin: 10mm; }`.
- Each page section is constrained to `190mm` width and `277mm` height, matching the printable area after margins.
- The first section forces a page break; the second does not.
- The print button and screen framing are hidden in print.
- Backgrounds collapse to white and links render in black.

This strategy is deliberate: exact two-page control is easier when content is authored against two fixed page containers rather than hoping automatic flow lands correctly.

## Content-design fit

The content model and layout were designed together:

- The candidate has strong breadth, so uncontrolled detail would easily spill into a third page.
- The long CV includes more narrative than the print target can support.
- The chosen design rewards concise role summaries and lets selected bullets carry the highest-value facts.

That is why the route emphasizes recurring patterns of work instead of exhaustive chronology detail.
