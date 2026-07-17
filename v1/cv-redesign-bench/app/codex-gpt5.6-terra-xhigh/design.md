# Design rationale — “Product Systems Field Report”

## Direction

This is an editorial, technical field report rather than a generic template or a decorative portfolio. Ricardo’s source material describes a builder who moves between data visualisation, product systems, early-stage delivery and agent automation. The visual language borrows the useful parts of a systems document: an identifiable code-like rail, precise rule lines, compact operational labels and an exact pagination system. A warm off-white paper surface and a restrained Georgia display voice keep it human; Inter and Geist keep interfaces, dates and skill names crisp.

The direction follows `research.md` rather than fashion for its own sake:

- The serif / sans / mono triad acknowledges current renewed editorial type character while retaining installed, robust faces for web and print.
- White space, stable hierarchy, role-employer-date scan lines and active prose support the UC Berkeley and Harvard scanning guidance.
- The lime signal provides a screen-level product accent, but text, borders and semantic labels carry all actual meaning. In print, it becomes black so the document is safe on ordinary monochrome printers.

## Hierarchy and grid

Desktop has a 1,120 px reading surface centred on a charcoal workspace. The header proceeds from context to name to role/location to contact links. This aligns the first screen with the current title, identity and contact data that a recruiter is likely to scan first.

Each physical page is a two-column grid:

- **135 px orientation rail:** page code, thematic label and time span. It is visually memorable but contains no unique factual content.
- **Flexible content column:** semantic headings, profile, capability definition list, experience articles, lists, projects and education.

Role and dates form a single top line; employer sits immediately beneath; proof points follow as bullets. The current and two most relevant prior roles take page 1. Page 2 gives enough room for the rest of the chronology, independent work, education and one compact human “field note.” This preserves a senior trajectory while respecting the strict two-page constraint recorded in `content.md`.

## Typography and information design

- **Name:** Georgia / Times fallback, clamp-sized for a deliberately editorial opening.
- **Profile / role titles:** Georgia at smaller sizes for contrast and human narrative.
- **Operational prose:** the root-installed Inter variable, concise 11–14 px screen text and 9–11 pt equivalent print text.
- **Dates, rails and folios:** root-installed Geist Mono. Monospaced metadata makes chronology easy to compare without competing with claims.
- **Section labels:** 10 px uppercase sans with generous tracking. Their low visual weight prevents the number of categories from overwhelming the content.

Text is intentionally real HTML, not canvas or image treatment. A capability `dl` encodes label/value relations; work history uses `article`, headings and lists; the contact line is an `address`; project, profile and employer destinations are anchors.

## Responsive behaviour

- At desktop widths, the document feels like a paper object on a dark workspace with a separate print control.
- At 680 px and below, the rail becomes a compact horizontal band, title/date lines stack, experience stays in logical chronological order, foundation cards become one column and the lower grid stacks. The document has a `max-width` and `overflow-x: clip`; no horizontal page can be created by the print-sized desktop grid.
- The mobile version is continuous for comfortable reading. It deliberately uses `min-height: auto` only on screen; physical-page sizing is reserved for `@media print`.
- Keyboard focus is visible on links and the PDF control; all interactive targets have actual text labels.

## Accessibility and links

`research.md` records the WCAG 2.2 contrast / zoom basis. The implementation applies high contrast to all body text, does not rely on color to convey a category, uses native links and a native button, and offers prominent focus rings. The print control’s spoken name is “Download PDF using the browser print dialog”; it calls `window.print()` and does not claim to manufacture a separate file.

External links open in a new tab with `rel="noreferrer"`. Their destinations are the exact URIs found in the source-PDF annotations, documented in `content.md`; print keeps link text black, underlined and legible.

## Exact two-page print strategy

The print style is intentional, not a desktop page squeezed by the browser:

1. `@page` sets A4 portrait and zero browser page margin. Each `.printPage` is exactly `210mm × 297mm`, border-box sized.
2. Page one has an explicit `break-after: page`; page two resets it to `auto`, preventing a blank third page.
3. The screen-only utility bar (including **Download PDF**) is `display: none` in print. The outer background, shadow and lime accent are replaced with a white page, black ink and neutral rules.
4. Experience items have `break-inside: avoid`; page content was selectively written and sized so each deliberate A4 panel fits without clipping.
5. Fixed folios live inside the physical page (7 mm above the lower edge) and page content has reserved bottom padding.
6. Verification uses a Chromium print-to-PDF of the local route, `pdfinfo` for the count / A4 geometry, extracted text for clipping signals, and rendered PNG pages for a visual check. The verification result is reported in the final handoff after the last code change.

The implementation follows the browser-print guidance from the W3C / MDN sources recorded in `research.md`. It produces selectable, linked browser-PDF output. Formal tagged-PDF / PDF-UA certification requires a dedicated post-export accessibility check and is not represented as complete merely because the web DOM is semantic.
