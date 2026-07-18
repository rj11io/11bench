# Design Direction

## Core Direction

The route uses an editorial-tech layout: high-contrast serif display typography
for identity, disciplined sans-serif text for dense detail, and mono labels for
navigation cues. The candidate reads as both product-minded and technically
operational, so the design avoids glossy startup cliches and avoids generic
template minimalism.

This direction comes directly from the research:

- `research.md` shows that scanning behavior rewards strong top hierarchy and
  obvious left-edge cues.
- Harvard's resume guidance supports concise, prioritized structure over
  autobiographical narrative.
- Monotype and Adobe's current design research support a more human and tactile
  surface than a default corporate UI look.

## Hierarchy

- Page 1 opens with the highest-value recruiting signals:
  - name,
  - target role,
  - contact links,
  - concise value summary,
  - current and recent experience.
- Section labels sit in a narrow rail in uppercase mono so a recruiter can skim
  down the page and find anchors instantly.
- Experience entries use a repeated pattern:
  - role,
  - company and context,
  - date range,
  - short summary,
  - three compact bullets.
- Older roles are compressed into a low-variance "Earlier Experience" list,
  preserving chronology without giving equal visual weight to 2015 work and 2025
  work.

## Typography

- Display: `Bodoni Moda`
  - Used for the candidate name, role headings, and a few high-importance titles.
  - Reason: it gives the route an editorial voice and clear contrast from typical
    SaaS resumes.
- Body: `Manrope`
  - Used for paragraphs, bullets, and most metadata.
  - Reason: it stays clean and compact at resume sizes and prints well.
- Utility: `IBM Plex Mono`
  - Used for dates, labels, and machine-like metadata.
  - Reason: it reinforces technical identity and improves scan separation.

## Grid And Layout

- Screen:
  - two stacked A4 sheets centered on a warm canvas;
  - generous margins on desktop;
  - reduced padding and stacked columns on mobile widths around 375 px.
- Inside each sheet:
  - a top masthead band;
  - a two-column content region with a narrow left rail and wider main column.
- The left rail carries summary, skills, projects, and education.
- The main column carries the chronology because that is the recruiter decision
  path.

## Accessibility

- All meaningful links are text links, not icon-only controls.
- Links remain identifiable through underline and structure, not color alone.
- The page has a unique route title via route metadata.
- The DOM stays semantic and text-first so assistive tech and ATS-like parsers do
  not depend on visual interpretation.
- Motion is effectively zero; no decorative animation is required to understand
  the content.

## Print Strategy

- The implementation prints as exactly two authored A4 sheets, not as one long
  scrolling page chopped arbitrarily by the browser.
- `@page` sets A4 sizing and zero outer browser margin.
- Each sheet is explicitly sized to A4 and separated with `break-after: page`.
- Print mode removes:
  - screen shadows,
  - warm background tint,
  - the download button,
  - extra screen spacing.
- Print mode forces black text on white backgrounds for robustness even if the
  app theme is dark elsewhere.

## Content Strategy Connection

- The long CV provided more narrative and more implementation detail than a
  two-page hiring document can reasonably sustain.
- The chosen design supports that compression by letting the page carry multiple
  information densities:
  - executive summary blocks,
  - medium-detail recent roles,
  - highly compressed early roles.
- Personality is present, but it is constrained to factual signals like robotics,
  game-modding roots, and open-source work instead of unsupported brand theater.
