# Design rationale

## Direction: technical editorial

The visual direction treats the CV as a small, high-signal editorial document: warm paper, near-black ink, a narrow acid-lime marker, a serif display name, sans-serif reading text, and mono metadata. It is more distinctive than a default template but keeps the information model recognizable to ATS software and a human hiring manager.

The direction follows the research in `research.md`:

- The Ladders and ONS findings make the top of page one a scan path: title, profile, capability labels, selected work, and the most recent roles are all visible before the first deliberate page break.
- USWDS guidance informs the left alignment, line length, restrained uppercase labels, readable screen size, and whitespace between content groups.
- W3C and WebAIM guidance informs the semantic document structure, live text, headings, lists, link purpose, contrast, focus state, and print-safe output.
- MDN's paged-media guidance informs the A4 page sizing and explicit page break between the two document sections.

## Hierarchy and grid

- The masthead is the strongest visual moment: Ricardo Jorge, the exact role title, the CV URL, and contact links sit in the first scan band.
- Each section uses a 7.25rem editorial rail for a small uppercase label and a flexible content column. Section rules are thin and low contrast, separating groups without creating card noise.
- Experience uses a consistent job header: role first, employer and context second, dates aligned to the far edge, then short evidence-led bullets.
- Dates stay visually stable and right-aligned on desktop/print so a reader can scan career progression down one edge. On mobile they move below the employer line without horizontal overflow.
- The lime accent is only a marker and selected-work index. It is not the only carrier of meaning and is removed from print.

## Typography

- Display: Georgia with a slightly tight heading line-height, chosen for an editorial contrast with the source's technical content and because it remains available without a new dependency.
- Body: the root Inter variable, already provided by the application layout, for clear screen reading and compact print text.
- Metadata and dates: the root Geist Mono variable, already provided by the application layout, for a technical register and stable numeric alignment.
- Screen body text is 1rem with a 1.55 line-height. Print body text is kept around 8.5–9.1pt with controlled leading; the content is edited and grouped before this size reduction.
- Headings use sentence case for the job titles and restrained small uppercase only for section labels. Links remain underlined.

## Responsive behavior

- At desktop widths, the route shows two centered A4-like paper sheets on an ink canvas with a small screen-only toolbar above them.
- At widths around 375px, the paper becomes edge-to-edge, the rail stacks above the content, the masthead wraps intentionally, contacts become a tidy multi-line list, and dates move to their own line.
- No element relies on fixed viewport width. Long URLs wrap with `overflow-wrap: anywhere`, and the skills groups wrap as text rather than becoming horizontal chips.
- The print breakpoint is independent from the screen breakpoint: screen styling can remain dark while print always uses white paper and black ink.

## Accessibility and ATS choices

- The page has one `h1`, sequential `h2` section headings, `h3` job titles, landmark elements, real lists for bullets, and a skip link.
- The download control is a native button with a visible label and `window.print()` behavior. It is hidden in print.
- Focus-visible outlines use the lime accent against ink. The accent never stands in for link semantics; URLs are visible, underlined anchors with descriptive labels.
- The copy is live text in the document body. There are no images of text, tables, charts, decorative icon buttons, or header/footer-only contact details.
- The visual rail is CSS grid only. Source order is the same as reading order, which keeps the page useful to assistive technology and plain-text extraction.

## Exact two-page print strategy

- `@page` is explicitly `A4 portrait` with zero browser margin. Each `.printPage` is exactly `210mm x 297mm`, including padding via `box-sizing: border-box`.
- The first section is page one and contains the masthead, profile, capabilities, selected work, and the first two recent roles. The second section begins with an `EXPERIENCE CONTINUED` marker and contains the remaining recent roles, earlier experience, education, and beyond-work notes.
- `break-after: page` is applied only to page one. Page two has `break-after: auto` so no blank third page is created.
- Print removes the canvas background, shadows, rounded corners, screen toolbar, lime fills, and dark-mode colors. It keeps hairlines, black text, live URLs, and page numbers so the result is readable on a basic printer.
- The browser verification pass checks A4 page dimensions, `pageCount === 2`, page screenshots for clipping, and the mobile/desktop route screenshots for overflow.
