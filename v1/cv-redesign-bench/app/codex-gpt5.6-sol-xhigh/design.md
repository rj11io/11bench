# Design rationale

## Direction: technical editorial dossier

The CV combines two qualities that often fight each other: editorial presence
and operational clarity. Ricardo's name and current role should feel
distinctive enough for a product engineer who works close to design, while the
career evidence should read like a disciplined technical document.

The result uses:

- an oversized name and signal-orange accent for identity;
- neutral Inter body text for dense reading;
- Geist Mono for dates, labels, section numbers, and compact metadata;
- warm paper sheets on a quiet canvas;
- precise rules, alignment, and repeated role anatomy rather than decorative
  illustrations, charts, or skill meters.

This follows the Carbon distinction between expressive and productive
typography and the USWDS guidance on legible measure, flush-left alignment,
and visible grouping.

## Information hierarchy

### First scan

The first viewport / first print page exposes:

1. Ricardo Jorge
2. AI Product Engineer
3. location and direct contact routes
4. a one-paragraph hybrid positioning statement
5. four proof-oriented scan signals
6. current skills, projects, and the two most recent roles

Job title, employer, and date positions repeat consistently because recruiter
research shows these are high-value scan anchors.

### Deep read

Page two continues the same role anatomy for OMEGA, Phantasma, and
BinaryEdge, then compresses the earlier career without dropping any employer
or date. Education and two concise origin facts close the document.

The visual section-number gutter is deliberately narrow. It acts as a scan
rail, not as a second content column. DOM order remains linear:
heading → content → next heading.

## Typography

- **Display:** Inter, 800–900 weight, very tight tracking. The large name is
  the sole expressive gesture.
- **Body:** Inter, regular/medium. Screen body copy targets a comfortable
  16–18 px; print uses a compact but readable 8.4–9 pt depending on element.
- **Metadata:** Geist Mono for dates, folios, labels, and project years. It
  signals engineering context without turning paragraphs into code.
- **Measure:** Main prose is constrained to roughly 55–80 characters where
  practical. Role bullets can run slightly longer because they are short,
  separated statements.
- **Case:** Uppercase is limited to short labels and uses increased
  letterspacing, following USWDS guidance.

## Grid and spacing

Screen:

- maximum sheet width: 1120 px;
- generous responsive page padding;
- 112 px label rail plus flexible content at desktop;
- 2×2 focus matrix, two-column skill groups, three project cards;
- 8 px-derived spacing rhythm, with larger editorial jumps at section
  boundaries.

Mobile:

- at 720 px and below, the label rail collapses above the content;
- all matrices become one column;
- name size scales with `clamp()`;
- date blocks move under role titles;
- long URLs use wrapping and the route has no horizontal overflow;
- page shadows/borders disappear so the CV reads as one continuous document.

## Colour and states

Light screen:

- warm off-white paper;
- near-black ink;
- charcoal-muted metadata;
- orange-red accent;
- cool gray canvas behind the sheets.

Dark screen:

- near-black canvas;
- deep green-black paper;
- warm white ink;
- lighter muted metadata;
- brighter orange accent.

All text combinations are chosen to clear WCAG AA normal-text contrast. Links
are underlined, not identified by colour alone. Keyboard focus uses a visible
2 px outline with offset. The “Download PDF” control includes text, a simple
icon, and an explicit accessible label.

Print:

- all screen and dark-mode variables are overridden to black/gray on white;
- accent blocks become white with black rules;
- links remain underlined and show their human-readable host/text;
- shadows, rounded page edges, canvas, and controls are removed.

## Semantic and ATS strategy

- A single `h1`, followed by logical `h2` and `h3` levels.
- Experience is made of semantic `article` elements and real unordered lists.
- Contact information uses an `address` with real anchors.
- No layout tables, canvas text, icons standing in for words, visual skill
  ratings, or image-based text.
- Source order matches reading order at every breakpoint.
- Employer, date, title, and skill terms remain literal text for extraction.
- The website imports all rendered content from `content.ts`, the structured
  projection of `content.md`.

## Exact two-page print strategy

The print document is not allowed to paginate accidentally. The component
contains exactly two `.sheet` elements corresponding to two editorially
planned pages.

Print CSS:

1. `@page { size: A4; margin: 0; }`
2. each sheet is `210mm × 297mm` with `box-sizing: border-box`;
3. internal padding supplies the safe page margin;
4. page one uses `break-after: page`;
5. page two uses `break-after: auto`;
6. role and project units use `break-inside: avoid`;
7. the route and body lose all screen padding/background;
8. the toolbar and screen-only helper text are hidden;
9. fixed print typography/spacing prevent OS dark-mode changes from altering
   pagination;
10. final verification prints through Chromium to PDF, checks page count with
    `pdfinfo`, extracts text, renders both pages to PNG, and inspects them for
    clipping, overlap, or a blank third page.

The page split is content-driven:

- **Page 1:** identity, positioning, focus, skills, projects, rj11io, Hunt.
- **Page 2:** OMEGA, Phantasma, BinaryEdge, earlier career, education, origins.

No CSS `overflow: hidden` is used to fake the page count in the final
verification state; the content must genuinely fit inside both fixed A4 page
boxes.
