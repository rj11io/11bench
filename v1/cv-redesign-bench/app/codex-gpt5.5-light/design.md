# Design Rationale

## Direction

The CV is designed as an editorial technical-lead dossier: sober, scan-first, and print-native. The screen version sits on a warm paper surface to give the route polish, but the actual CV remains restrained enough for recruiters, hiring managers, and ATS-adjacent review.

## Hierarchy

- The first scan anchors are name, role, location, links, current positioning, skills, and recent employers/dates.
- Section labels use a small mono uppercase treatment to create a left rail without wasting space.
- Job titles are heavier than employers; employers and dates are immediately adjacent so the timeline is fast to validate.
- The profile is three short paragraphs plus six strengths, replacing the long autobiographical source narrative.

Research links:

- Harvard guidance drove the concise, tailored structure.
- recruiter scanning research drove top-left identity, clear dates, and short bullets.
- USWDS/Pimp My Type/GOV.UK typography guidance drove measured line lengths and restrained type scale.

## Typography and grid

- Uses the repository's existing Inter and Geist Mono variables from the root layout; no new fonts or dependencies.
- Desktop: two-page paper-like canvas with a 142 px label column and content column.
- Mobile: all grids collapse to one column at 760 px to avoid horizontal overflow and preserve readable text.
- Print: A4 width/height in millimetres with explicit page boxes and tighter type sizes.

## Accessibility

- Real semantic HTML: `main`, `article`, `header`, `section`, headings, lists, `address`, links, and `time`.
- Links are underlined, not color-only.
- Screen colors maintain high contrast; print forces black text on white paper.
- No text is rendered as image, and no decorative imagery is required to understand the CV.

## Print strategy

- Browser print is triggered by a visible `Download PDF` button that calls `window.print()`.
- The button is hidden with `print:hidden`.
- `@page { size: A4; margin: 0; }` delegates all margins to the `.cv-page` boxes.
- The route renders two explicit `.cv-page` containers, each `210mm x 297mm`.
- Page 1 contains identity, profile, skills, projects, and the three most recent roles.
- Page 2 contains the two remaining principal roles, earlier-career compression, education, and context.
- `.cv-page.second` disables page-break-after to prevent a blank third page.
- Content is deliberately tighter in print than screen, but each page uses real text and controlled line-height to avoid clipping.

## Palette

The screen palette uses black ink, warm off-white paper, muted taupe secondary text, and a small red-clay accent for section labels. It avoids one-note purple/blue, beige-only, or decorative gradient styles. In print the accent becomes black, ensuring readable black-on-white output even from dark mode.
