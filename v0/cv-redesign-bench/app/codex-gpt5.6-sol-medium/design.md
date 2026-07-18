# Design rationale

## Direction: technical field note

The CV is designed as a precise two-sheet editorial object: part product brief,
part engineering field note. It avoids the common portfolio-CV tropes of skill
meters, portraits, glass cards, icon clouds, and decorative charts. Instead,
typography, an explicit grid, section indexing, and small technical annotations
signal the candidate’s blend of product judgment and engineering rigour.

This direction follows the research:

- rapid scanning demands an obvious name/role/recent-history spine;
- current design research supports expressive typography within stripped-back
  compositions;
- ATS and accessibility guidance argue for conventional headings, ordinary
  text, native links, and a linear DOM;
- the two-page constraint rewards editorial selection rather than tiny type.

## Hierarchy and grid

Each desktop/print sheet uses an A4 proportion and a 12-column grid. A narrow
left rail contains the section index and contextual notes; the wider right
field carries the actual record. The first sheet opens with a large serif name
and a compact sans-serif positioning block. Experience entries use a consistent
three-part scan:

1. role and employer;
2. dates on the right edge;
3. two or three evidence-led bullets.

The second sheet intentionally resumes with experience so the chronology is
never mistaken for a sidebar. Projects and education follow the professional
record. Small folios (“01/02”, “02/02”) make the physical sequence deliberate.

## Typography

No route-specific external font request is required. The display face uses a
robust editorial serif stack (`Iowan Old Style`, `Baskerville`, `Times New
Roman` fallback). Body copy uses the root Inter/sans stack. Metadata and dates
use the existing Geist Mono variable.

The serif adds a human, authored counterpoint to an AI-heavy profile, while the
sans body remains highly legible for dense technical evidence. Monospace is
limited to dates, section indices, and system-like annotations; it never carries
long prose.

## Colour and material

Screen mode uses deep ink blue, warm paper, and a restrained acid-lime signal.
The lime appears only in the rule, status dot, and small labels; hierarchy never
depends on it. Sheets sit on a dark workspace with subtle shadows, presenting
the CV as a finished artefact.

Dark mode deepens the workspace and changes the sheet to charcoal while
retaining strong contrast. Print discards the screen palette and shadows
entirely: pure white paper, near-black text, grey rules, underlined links.

## Responsive behaviour

At roughly 1440 px, both A4-proportioned sheets are centred with full editorial
grid and comfortable surrounding space. Below 760 px:

- the sheet loses its fixed aspect ratio and shadow;
- the 12-column grid collapses to one column;
- dates move beneath role/employer rather than squeezing titles;
- contact links wrap as full-width touch targets;
- page-two continuation chrome is simplified;
- all content remains in source order and horizontal overflow is prohibited.

The download control remains fixed but compact and respects safe viewport
padding. At print it is removed.

## Accessibility

- Semantic `main`, `article`, `header`, `section`, headings, lists, `address`,
  and native anchors.
- One visible `h1`; every major region has an `h2`.
- Descriptive visible links plus `aria-label` where a short display URL could
  otherwise be ambiguous.
- Focus-visible outlines with sufficient contrast.
- Links are underlined on hover/focus and always underlined in print.
- Body copy and muted text meet WCAG AA contrast against their backgrounds.
- Colour is supplemental; section labels, type weight, rules, and position also
  communicate hierarchy.
- Responsive reflow avoids two-dimensional scrolling at 375 px and survives
  increased text sizing more gracefully than a fixed mobile canvas.
- No meaningful information is rendered as an image or CSS-generated content.

## Exact two-page print strategy

The React output contains exactly two top-level `.sheet` articles. In print:

- `@page { size: A4; margin: 0 }`;
- each sheet is exactly `210mm × 297mm`, including its internal padding via
  `box-sizing: border-box`;
- the first sheet has `break-after: page`; the second has no trailing break;
- all screen backgrounds, shadows, and controls are removed;
- every sheet forces a white background and black text regardless of theme;
- blocks use `break-inside: avoid`;
- margins live inside each sheet, so browser page margins cannot unexpectedly
  add a third page;
- page content is deliberately assigned in React rather than left to automatic
  flow: page one ends after OMEGA Systems; page two begins with Phantasma.

Validation requires browser-generated PDF output, `pdfinfo` confirmation of two
A4 pages, text extraction sanity checks, and rendered PNG inspection for
clipping, collisions, or an accidental blank page.
