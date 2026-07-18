# Design Direction

## Concept

The route uses an editorial dossier direction instead of a generic SaaS resume card. The candidate's strongest signal is not "polished frontend engineer" in the abstract; it is the combination of senior product judgment, data-heavy interface craft, and hands-on AI delivery. The design therefore leans closer to a printed feature profile:

- serif-led identity for authority and memory;
- a technical sans for body clarity and density;
- narrow section rails and obvious titles for left-to-right scanning;
- restrained color and line work so the content carries the page.

## Typography

- Display face: Spectral
  - Reason: Google Design explicitly positions Spectral as a screen-first serif for text-rich reading, which supports a more editorial tone without becoming brittle in print.

- Body face: IBM Plex Sans
  - Reason: it complements the serif heading voice with a technical, neutral body rhythm that suits product and engineering content.

- Mono accents: inherited app monospace variable
  - Reason: dates and metadata benefit from machine-like precision without stealing attention from the main narrative.

## Hierarchy and layout

- Overall structure
  - Two deliberate A4 sheets on screen and in print.
  - Page 1 is the "skim page": role identity, contact, summary, focus, and the most recent work.
  - Page 2 is the "depth page": remaining major role, open-source signal, capabilities, compressed earlier roles, and education.

- Section system
  - Each section uses a narrow uppercase label rail and a wider content column.
  - On mobile, the label rail collapses above the content to avoid width pressure.

- Scanning choices
  - Role titles are prominent and serif-led.
  - Companies and context sit immediately below the role.
  - Dates are right-aligned in mono so chronology stays easy to scan without dominating the layout.
  - Bullets are short and visually separated, following the Ladders recommendation for declarative, skim-friendly accomplishments.

## Color and surface

- Screen
  - Warm paper base with subtle copper and blue-gray atmospheric gradients.
  - This avoids a flat white slab while keeping the page serious and printable.

- Print
  - Forced black on white with decorative texture removed.
  - The design does not rely on accent color for meaning.

## Responsive behavior

- Desktop
  - Faux-paper presentation with shadow, strong margins, and full two-sheet composition.

- Mobile
  - Sheets become compact stacked cards.
  - The masthead, label rail, date alignment, and focus grid all collapse to one column or simplified grids.
  - Contact links wrap naturally to avoid overflow at approximately 375 px.

## Accessibility choices

- Semantic HTML sections and headings.
- Visible text links instead of icon-only controls.
- Underlined anchors with preserved link text for screen and PDF output.
- Focus-visible affordances on the print button.
- Comfortable line length and leading for dense reading.
- Reduced-motion respect for the sheet entrance animation.

## ATS and PDF strategy

- Keep the print DOM linear and avoid multicolumn text regions in the exported PDF.
- Use standard section names and keep critical data in the body instead of decorative headers/footers.
- Preserve selectable text and live anchors so the browser-generated PDF remains useful to both humans and machines.

## Exact two-page print strategy

- CSS print model
  - `@page { size: A4 portrait; margin: 0; }`
  - Each sheet becomes `210mm x 297mm`.
  - The first sheet forces a page break after itself; the second does not.

- Pagination control
  - Major entries use `break-inside: avoid`.
  - Decorative screen elements are removed in print.
  - Print spacing is tighter than screen spacing and uses dedicated point-based type sizing.

- Content budgeting
  - Page 1 gets the strongest recent experience because first-page quality matters more than symmetry.
  - Older roles are compressed into one-line summaries so the full professional arc fits without producing a blank third page or clipped content.

## Tradeoffs accepted

- The route is less visually experimental than a portfolio landing page because the artifact still needs to survive as a recruitable two-page PDF.
- Some personal-story material from the extended CV is deliberately omitted to preserve role relevance and print cleanliness.
- The design favors editorial confidence over ATS-pure plainness, but the print DOM order and section naming still aim to keep parsing sane.
