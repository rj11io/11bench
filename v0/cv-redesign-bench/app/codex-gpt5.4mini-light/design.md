# Design

## Direction

The CV uses an editorial resume treatment: large serif nameplate, compact mono-accent metadata, and a single clean reading column with a small left label rail. The goal is to look intentional and senior without becoming decorative or ATS-hostile.

## Why this direction

- Recruiters scan quickly, so the layout keeps the most important signals in the first viewport: name, target role, location, links, summary, then recent experience.
- The content is dense and technical, so the design favors hierarchy, whitespace, and conventional section names over visual novelty.
- The print version must be exactly two A4 pages, so the structure is built around two controlled page panes rather than a free-flowing long page.

## Typography

- Name and job title use a serif-led editorial treatment to separate identity from utility.
- Supporting text uses the inherited sans stack for readability.
- Dates and URLs use a mono style for quick parsing.
- Section labels are uppercase and spaced out to create a strong scan path.

## Grid and hierarchy

- Desktop uses a two-column rhythm: narrow section labels on the left, content on the right.
- Mobile collapses to one column with labels above content to avoid horizontal overflow.
- Recent experience comes first, older work is compressed in shorter blocks, and projects are grouped to avoid repeating links.
- Summary and skills stay above the fold on screen and within page one in print.

## Accessibility

- All important links are visible text links with descriptive labels.
- The document flow is semantic and linear, which helps screen readers and PDF reading order.
- Print colors are forced to black-on-white, so dark mode cannot produce a reversed or low-contrast PDF.

## Print strategy

- The route renders two explicit print panes that map to two A4 pages.
- Page 1 contains identity, summary, skills, projects, and the first two experience entries.
- Page 2 contains the remaining experience and education.
- The print stylesheet hides the download button and any other screen-only controls.
- Page breaks are enforced with CSS so the browser does not invent a third page.

## Compression choices

- Fun facts are removed from the final layout because they are less important than the career story.
- The older career history remains in the canonical model but is visually tightened.
- Duplicate links are avoided where the surrounding section already names the employer or project.

