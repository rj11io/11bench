# Design rationale

## Direction: technical editorial

The CV combines two modes that match the profile:

- **Editorial:** a strong nameplate, serif display type, generous opening space, and deliberate pacing communicate judgment and product taste.
- **Technical:** monospaced metadata, a restrained grid, compact capability indexes, and consistent experience anatomy communicate systems thinking.

This responds directly to the research. Stanford and MIT favor a focused professional story; Nielsen Norman Group favors strong scan cues and cut copy; IBM Carbon supports blending expressive and productive type moments. The result should feel authored, but the content should remain easier to scan than the original.

## Hierarchy and reading order

The semantic DOM remains linear:

1. identity and contact;
2. positioning summary;
3. capability index;
4. reverse-chronological experience;
5. independent projects;
6. education and personal origin.

CSS creates visual columns only within related regions. It never reorders the content. Every job repeats the same anatomy: date marker, role, employer, then action-led bullets. This supports the fast initial scan described by Stanford and The Ladders without treating a single time statistic as universal.

Page one answers “Who is this, what is the level, and what is the recent fit?” Page two answers “How deep is the frontend/leadership record, what came before, and what does this person build independently?”

## Typography

The existing application supplies Inter and Geist Mono. No network dependency or new font asset is introduced.

- **Inter:** body, summaries, bullets, and labels; neutral and highly readable.
- **Georgia:** name and role headlines; a selective editorial contrast that remains available as a system font.
- **Geist Mono:** dates, page folios, URLs, and compact metadata.

The screen scale is fluid but limited. Print uses explicit point sizes to make pagination deterministic. Text is left aligned, line length is constrained, and body leading is kept open enough for dense content. These choices follow GOV.UK's line-length/mobile guidance and Carbon's distinction between expressive and productive type.

## Grid and composition

On desktop, two A4-proportioned sheets sit on a dark “workbench” canvas. The sheets use a 12-column mental model:

- the hero spans the full width;
- the summary is roughly 8/4;
- capability groups form a four-column index;
- experience uses a narrow date rail plus a wide content column;
- page-two closing material uses two balanced columns.

Thin rules and small coordinate-like folios provide structure without competing with content. Signal green appears in tiny labels, links, and a vertical marker rather than in large decorative fields.

At roughly 375 px, all regions collapse to one column. Dates move above roles, capabilities stack, links wrap, and A4 simulation is removed. Mobile uses the full viewport without horizontal scrolling.

## Color and accessibility

Screen:

- near-black navy canvas;
- warm white sheets;
- near-black text;
- muted slate supporting text;
- dark green accent that meets readable contrast on the warm white sheet.

Print:

- pure white background;
- near-black text;
- gray rules;
- dark accent converted to black/dark gray.

Links are underlined rather than identified by color alone. Focus-visible states use a clear outline. The Download PDF control has a text label and icon; decorative icons are hidden from assistive technology. Headings, articles, addresses, and lists are semantic. The route does not use skill meters, charts, photo content, or text embedded in images.

## Responsive behavior

- **Below 700 px:** one-column flow, 20-24 px edge padding, no fixed paper height, no page shadow, dates above roles, full-width print button.
- **700-1099 px:** paper metaphor retained with flexible width; capability grid becomes two columns.
- **1100 px and above:** two A4-proportioned sheets at a readable display width, generous canvas spacing, sticky print control.

The sheets appear sequentially rather than side by side. Side-by-side pages would shrink body text at common laptop widths and produce a weaker reading experience.

## Exact two-page A4 print strategy

The print DOM contains exactly two top-level `.sheet` articles.

- `@page { size: A4; margin: 0; }`
- Each sheet is `210mm × 297mm` with `box-sizing: border-box`.
- Each sheet uses fixed internal padding and `overflow: hidden` only after content has been fitted and visually verified.
- Page two has `break-before: page`.
- Jobs and closing blocks use `break-inside: avoid`.
- The screen canvas, shadow, folio decoration that does not help on paper, and Download PDF control are removed or simplified.
- All colors are explicitly reset to black/dark gray on white, independent of application dark mode and browser background-print settings.
- No generated trailing element follows page two, preventing an accidental blank third sheet.

The implementation is tuned against Chromium print-to-PDF, then the resulting PDF is checked for an exact page count and rendered to PNG for clipping and balance review.

## Content/design coupling

The two-page limit is solved primarily through editorial prioritization, not tiny type:

- page one contains summary, selected capabilities, and the three newest roles;
- page two contains the deeper frontend leadership record, a compact early-career timeline, projects, education, and one humanizing origin note;
- detailed feature inventories from the six-page PDF are removed after their strongest evidence is retained;
- every employer and date survives somewhere in the two-page version.
