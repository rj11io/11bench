# Design rationale

## Direction: an engineer’s field note

The CV is designed as a precise editorial field note: calm, evidence-dense, and
slightly technical without looking like an IDE. A warm white ground and serif
display face give the document authorship and seniority; a neutral sans-serif
body keeps product detail fast to scan. Cobalt works as a navigational accent,
not decoration.

This direction follows the research preference for visible hierarchy,
predictable role patterns, readable text, and searchable skills. It also fits
the content: Ricardo’s story combines product judgement, data interfaces,
technical foundations, and current AI systems, so the design should feel more
like a well-edited technical publication than a generic résumé template.

## Hierarchy and grid

Desktop uses two A4-proportioned sheets presented on a quiet grey canvas. Each
sheet has a 12-column internal grid:

- the header spans the full width;
- a narrow left rail carries section labels;
- the wider right field carries narrative and experience;
- experience metadata remains consistently aligned.

The top sequence is name → positioning → proof summary → capabilities →
current experience. The second page continues experience before projects,
education, and the small personal signal. Fine horizontal rules make sections
findable during a scan without boxing them into cards.

## Typography

The display stack is Georgia/Cambria and the body stack is Arial/Helvetica,
chosen because they are robust system fonts, readable, and reliably printable
as text without network font loading. Name and key headings use the serif;
body, metadata, labels, and bullets use the sans. Section locators use spaced
uppercase at a small but legible size. Numerical dates use tabular figures.

Screen copy is comfortably sized and breathes more than print. Print tightens
leading and spacing to approximately 9pt body type while preserving hierarchy.

## Responsive behaviour

At widths below 720px:

- the paper metaphor becomes a single continuous page;
- outer canvas gutters reduce to 16px;
- the label/content grid collapses to one column;
- dates move below role/company rather than squeezing titles;
- contact and capability items wrap naturally;
- physical A4 heights and folios disappear.

The DOM reading order never changes. There is no horizontal scrolling at
375px, and touch targets for the print control meet a comfortable minimum.

## Accessibility

Near-black text on warm white provides strong contrast; muted copy remains dark
grey rather than pale grey. Links have a persistent underline, so colour is not
the only signifier. Keyboard focus uses a visible cobalt outline. The page uses
`main`, `header`, `section`, headings, lists, and an address element. Decorative
marks are hidden from assistive technology. Motion is limited and disabled
under `prefers-reduced-motion`.

## Exact two-page print strategy

The print model is structural rather than hopeful:

1. The implementation contains exactly two top-level `.sheet` elements.
2. `@page` sets A4 portrait and zero external margin.
3. Each sheet is `210mm × 297mm` with internal padding of `13mm 15mm 12mm`.
4. Page one has `break-after: page`; page two has no forced trailing break.
5. Shadows, page gaps, the download control, screen-only labels, and canvas
   background disappear.
6. Ink becomes black/grey on white even if the browser or OS uses dark mode.
7. Experience entries use `break-inside: avoid`, and content is manually
   allocated between the two sheets.

The intended allocation is:

- **Page 1:** identity, summary, capabilities, rj11io, Hunt, and OMEGA.
- **Page 2:** Phantasma, BinaryEdge, compressed earlier experience, selected
  projects, education, and personal signal.

This gives both pages deliberate endings and prevents a long role from being
cut at the physical boundary. Final validation is performed from a browser
print-to-PDF at A4, followed by `pdfinfo`, text extraction, link inspection,
and visual rendering of both pages.

