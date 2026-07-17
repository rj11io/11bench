# Design Rationale

## Direction

The direction is an editorial technical dossier: dense, calm, evidence-first, and product-oriented. The candidate should read as a senior builder of AI/data products, not as a generic frontend engineer and not as a portfolio landing page.

This follows `research.md`:

- Harvard and Ladders pushed the design toward concise, factual, scannable structure.
- NN/g scanning research pushed the top-weighted hierarchy, left anchors, clear role headings, and compact section labels.
- LinkedIn skills-based hiring research pushed skills into a prominent but contextual matrix.
- Greenhouse and WCAG research pushed real text, simple structure, high contrast, and restrained visual treatment.

## Hierarchy

Scan order:

1. Name, headline, location, and contact links.
2. Four proof chips: product surface, core stack, leadership pattern, delivery mode.
3. Profile thesis in three short paragraphs.
4. Skills matrix and selected projects.
5. Recent experience in reverse chronological order.
6. Earlier foundation and education.

Role headers are deliberately stronger than bullets because recruiter eye-tracking research shows titles and dates are primary fixation points. Bullets are short and declarative. No invented metrics are used.

## Typography

The route uses the app's existing Inter and Geist Mono font variables from the root layout. Inter handles body copy and headings; Geist Mono is used only for labels, dates, and compact metadata. The combination creates a technical editorial tone without importing route-level global CSS or new font dependencies.

Screen paragraphs use readable measures aligned with USWDS guidance. Print text is smaller but remains readable, with stronger contrast and tighter line-height.

## Grid

Screen:

- A document stack centered in a full-width page.
- Each sheet uses a two-column content grid: narrow left section rail and flexible right content.
- The header uses a wider identity column and a compact contact column.
- At mobile widths, all grids collapse to a single column and long URLs wrap to avoid horizontal overflow.

Print:

- Two explicit A4 sheets, each 210mm by 297mm.
- Fixed internal margins and one forced page break after page one.
- No decorative background, shadows, screen controls, or color-dependent text.

## Visual Treatment

The visual system uses paper white, high-contrast ink, muted metadata, and two restrained accents: teal for product/AI signal and rust for selected dividers. The screen version includes a structured "signal" strip of proof chips instead of decorative illustration. This keeps the CV domain-appropriate and avoids making the candidate's evidence compete with ornamental graphics.

Cards are avoided except for small repeated proof chips and project rows. There are no nested cards. Sections are full-width document bands.

## Responsive Behavior

Desktop around 1440px shows the CV as two polished document sheets with generous outer space and a sticky print control. Mobile around 375px removes fixed sheet width, collapses all grids, keeps the print button reachable, and allows links and long role metadata to wrap.

## Accessibility

- Semantic `main`, `section`, `article`, headings, lists, and anchors.
- Unique title metadata in the route layout.
- Visible link text is meaningful: email, domain, GitHub URL, LinkedIn URL, and project domains.
- No important text is image-based.
- Screen contrast is designed to meet or exceed WCAG AA for normal text; print is black-on-white.
- The print button is a native button with an icon and text, and is hidden from print.

## Two-Page Print Strategy

Page one contains the fast-screening material: identity, contact, profile, proof chips, skills, selected projects, and the two most recent roles. Page two contains OMEGA onward, the substantial 2020-2021 security leadership role, compressed earlier foundation, origin note, and education. This split prevents browser fragmentation from carrying content across the first forced A4 sheet.

Implementation details:

- `@page { size: A4; margin: 0; }`
- `.sheet` elements become exact A4 boxes in print.
- The first sheet uses `break-after: page`.
- The second sheet has no forced break.
- Screen-only controls and shadows are removed.
- Print styles force white background and black text even if the app theme is dark.
