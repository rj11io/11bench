# Design

## Direction

The route is styled as a restrained editorial dossier: warm paper background on screen, black-on-white in print, a strong serif masthead, monospace utility text, and a narrow left rail for section labels. That direction follows the scanning and typography research:

- Recruiters skim top-left first, so the name, title, and contact line are immediate.
- Section labels stay visually stable for fast scanning.
- The print version is intentionally simpler than the screen version so the PDF is deterministic and readable.

## Hierarchy

1. Masthead: large name, italic role title, compact site marker.
2. Contact row: direct links grouped on one line with visible separators.
3. Summary: two concise paragraphs before any deep detail.
4. Skills and selected work: compact proof points before the longer experience history.
5. Experience: reverse chronological, with dates aligned right.
6. Education: brief closing block.

## Typography

- Display font: `Source Serif 4` for the name, role titles, and project names.
- Body font: `IBM Plex Sans` for paragraphs, bullets, and metadata.
- Mono font: `IBM Plex Mono` for URLs, dates, section labels, and small utility text.
- The mix is deliberate: editorial enough to feel designed, but plain enough to remain legible in a browser-generated PDF.

## Grid And Rhythm

- Desktop and print use a two-column section grid: left label rail plus right content column.
- The content column stays relatively narrow to preserve comfortable line length and reduce scan fatigue.
- Skills and project entries use nested compact grids to keep labels aligned without wasting vertical space.
- Rules separate sections instead of heavy boxes, which keeps the page calm and improves legibility.

## Responsive Behavior

- On desktop, the route renders as two stacked paper pages with visible depth.
- On mobile, the same content collapses to a single-column flow and removes unnecessary visual chrome.
- Contact links and role dates are allowed to wrap, but the layout avoids horizontal scrolling.

## Accessibility

- Native headings, lists, and anchors are used throughout.
- Links have visible text, not icon-only affordances.
- The print button is a real button that calls `window.print()`.
- The print styles force black text on white paper even if the screen theme is dark.
- Strong contrast and simple reading order make the page easier for assistive tech and for browser PDF extraction.

## Two-Page Print Strategy

- The route is split into two explicit page containers, not left to the browser to paginate automatically.
- `@page` is set to A4 with zero page margin.
- Each page container is sized to A4 and padded internally so content stays inside the printable area.
- Page 1 holds identity, summary, skills, selected work, and the two most recent roles.
- Page 2 holds the remaining roles and education.
- The page content was compressed to fit this exact split, with fun facts and lower-priority project surfaces removed.
- Screen-only controls and shadows are hidden in print.

## Why This Works For The Candidate

- The candidate's strongest differentiator is senior frontend/product ownership plus AI product execution, so the layout foregrounds experience and the AI summary.
- The data-heavy background benefits from a disciplined, editorial structure rather than a flashy portfolio style.
- The result should read as a serious CV first and a polished personal site second.
