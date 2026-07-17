# Design rationale

## Direction

The direction is “signal / system”: an editorial CV with a quiet ink, paper,
and acid-lime accent palette. It makes the candidate's combination of product
engineering and AI systems feel intentional without becoming a portfolio
landing page. The reference PDFs' serif display name, mono metadata, and rules
are retained, with clearer hierarchy and more deliberate density.

Research drove four constraints: front-load evidence that survives a short
scan; use standard headings and linear order; keep body copy readable with a
capped measure and line-height; and use native HTML structure so generated PDF
links and reading order have a strong source.

## Hierarchy and grid

- The masthead pairs a large serif name with the role and keeps all contact
  information in the document body. “RJ / CV” is a small editorial marker,
  not an image logo.
- Numbered uppercase labels and hairline rules start each section. Experience
  is reverse chronological, with strong role titles, employer metadata, dates,
  and two or three bullets.
- Recent roles get the most detail; older roles remain as concise entries. The
  four-item highlights strip repeats only explicit source facts: TypeScript
  decade, React 2016, Next.js 2018, and AI work.
- The screen is one document column capped at 1120px. Small metadata grids
  align labels and dates without sidebars, charts, or image-based facts.

## Typography, color, and responsive behavior

Georgia (or the browser serif fallback) carries the name and role titles; a
system sans carries body text; a mono stack is reserved for dates, URLs, and
indices. Screen body is 16px with 1.6 line-height. Print body is 9.3pt with
1.3 line-height. Near-black ink sits on warm paper, with a dark screen theme
and a print reset to black on white. Links are underlined and keep their
visible destinations in print.

At desktop widths the document has a wide masthead and aligned role metadata.
Below 760px it becomes a single column: links wrap, dates move beneath role
metadata, and highlights wrap. At about 375px the paper edge padding reduces,
URLs wrap, and body type stays readable. Print explicitly restores the desktop
role/date and four-column highlight grid even if the print viewport is narrow.

## Accessibility and interaction

Native headings, sections, lists, and anchors establish structure. The Download
PDF control is a labeled button with a visible keyboard focus ring and an
explicit `window.print()` action; it is hidden in print. Color is supplementary
and grayscale still exposes the hierarchy and link text.

## Exact two-page print strategy

`@page` sets A4 portrait at zero browser margin. Each `.printPage` is exactly
297mm tall with 14mm top/bottom and 16mm side padding using `box-sizing:
border-box`. Page 1 contains the masthead, summary, highlights, skills, the
three most recent roles, and the two concise interests bullets. Page 2 contains
Phantasma, BinaryEdge, the earlier chronology, education, and all project /
proof-of-work links.

The break keeps the most relevant scan path and small humanising note together;
page 2 starts with a complete role and ends with the remaining credential and
links. Print removes controls, shadows, colored backgrounds, and interactive
decoration. QA uses Chrome print, `pdfinfo` for exactly two A4 pages, and PNG
renders to check for clipped content, accidental blank pages, and legibility.

