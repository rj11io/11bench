# Design rationale

## Direction

The visual direction is an editorial dossier rather than a startup landing page or a conventional ATS template. Ricardo Jorge's profile is strongest when it reads as senior, deliberate, and systems-minded: typography first, restrained color, clear scanning landmarks, and enough visual identity to feel crafted without undermining recruiter utility.

The screen version uses warm paper tones, a high-contrast serif headline, and compact cards that suggest assembled case notes. The print version removes atmospheric treatment and collapses to clean black-on-white A4 sheets.

## Hierarchy and typography

- Identity and role are the dominant elements because research showed recruiters fixate on titles and top-of-page orientation.
- A serif display face carries name recognition and editorial character; a sans body face keeps dense experience bullets readable on both screen and print.
- Section labels use uppercase micro-headings and accent color on screen, then retain the same structure in grayscale for print.
- Text measures are deliberately constrained so summary copy and bullets do not become wide, tiring lines.

This directly follows the research from The Ladders, Butterick, Smashing Magazine, and web.dev: strong scanning cues, moderate line lengths, spacing-led hierarchy, and device-aware text scaling.

## Grid and responsive behavior

- On screen, the route is a stacked sequence of two page cards centered in the viewport.
- At mobile width, everything becomes a single readable flow with no horizontal overflow and no assumptions about wide sidebars.
- At tablet and desktop widths, the layout opens into paired columns for summary/supporting content and projects/focus areas.
- Recent roles stay in one vertical reading column because chronology matters more than visual novelty there.
- Earlier roles are allowed into a denser responsive grid because they carry less narrative weight and benefit from compression.

## Accessibility and link handling

- Route-specific metadata gives the page a meaningful document title.
- The page has a single prominent `h1` and consistent section headings.
- All important contact and portfolio links are visible as real text, not icons only.
- Link labels remain understandable in print because the actual domain strings are shown.
- The print stylesheet forces black text on white paper and hides the screen-only print button.

## Two-page print strategy

The print strategy is explicit rather than aspirational:

- The route renders as exactly two `article` sheets.
- In print, each sheet is fixed to A4 dimensions with `@page { size: A4; margin: 0; }`.
- The first sheet uses `break-after: page`, so the browser creates exactly one forced page break.
- Spacing, card padding, and type sizes are reduced in print mode to fit the content intentionally rather than by browser shrink-to-fit heuristics.
- `break-inside: avoid` is applied to cards so experience blocks and skill groups do not split awkwardly across pages.
- The screen toolbar is removed in print, preventing a stray third page or header spill.

Content was also shaped around the print limit: recent roles get fuller treatment, earlier roles are compressed, and autobiographical narrative is reduced to one concise roots note.

## Why this fits the candidate

This profile is not best served by a generic monochrome engineering resume or by a visually loud portfolio page. The chosen design balances three things the source material repeatedly signals:

- senior technical breadth,
- product-and-interface taste,
- and self-directed execution across ambiguous environments.

The resulting route reads quickly, preserves factual density, and still feels authored rather than templated.
