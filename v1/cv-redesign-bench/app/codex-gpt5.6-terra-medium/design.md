# Design rationale

## Direction and hierarchy

The CV uses a “field report” editorial direction: warm paper, ink-black type, a restrained teal index color, serif for the candidate’s identity/point of view and neutral sans-serif for operational facts. It is intentionally not a dark AI landing page. The first scan answers identity, specialty, availability/location, contact and current work; the second page is a chronology with the most consequential roles given the most room. This applies the scanning guidance logged in `research.md`.

## Grid and type

On wide screens each sheet is a 1120px editorial canvas. Page one moves from a full-width masthead to a 150px label rail and reading column; projects use three compact columns and capabilities use two. Page two makes a simple continuous reading column, then compresses older history to a three-field ledger. On small screens the route becomes one column; every group reflows, links remain tappable and no fixed content width is retained.

## Accessibility

The source is semantic HTML: header, sections, heading levels, lists, `time`, `dl` and meaningful anchors. Focus is explicit for the interactive print control. The screen palette uses dark text on pale paper, and the print style overrides every link to black underlined text. Decorative treatment is CSS only; all important content is selectable text. The choices map to the WCAG and WebAIM sources documented in `research.md`.

## Exact two-page print strategy

The render is two `.sheet` elements, each sized to 210 × 297mm inside `@page A4` with 13/14/11mm content padding. The first sheet has a forced page break; only the second is permitted to end the document. The print stylesheet removes the screen-only download control, resets the surface to white/black, suppresses sheet overflow and tightens typography/spacing. Experience cards use `break-inside: avoid` so an entry cannot be divided. The fixed per-page composition is deliberate: page one holds profile/capabilities/current role; page two holds the remaining chronology, selected earlier roles, education and note.
