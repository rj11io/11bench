# Design rationale - restrained editorial product dossier

## Direction and hierarchy

The design treats the CV as a compact product dossier, not an AI-themed
marketing page. It uses the evidence hierarchy established in `research.md`:
the reader should find Ricardo Jorge's name, factual role, contact links,
career timeline, and current high-signal work before any supporting detail.

The result has two intentional paper sheets:

1. **Page one** holds identity, a two-paragraph evidence-led profile, three
   career anchors, and four recent roles: rj11io, Hunt Intelligence, OMEGA,
   and Phantasma.
2. **Page two** begins with BinaryEdge/Coalition's leadership evidence, then
   supplies the complete compact earlier chronology, independent work,
   technical toolkit, and education.

This reflects the source material's own concise two-page ordering while moving
experience above skills. It implements the research guidance to make job title,
employer, date, and current relevance immediately scannable.

## Typography and visual language

- The route reuses the root's existing Inter-style sans and Geist Mono
  variable fonts rather than adding a web-font dependency. The sans carries all
  reading text; monospace is limited to dates, URLs, labels, and page numbers.
- Large name, compact role line, thin rules, left-aligned text, and a modest
  teal accent create hierarchy. The accent is never the sole way to convey
  meaning.
- The only screen decoration is a restrained neutral canvas and paper shadow.
  Document surfaces remain near-white, with no photo, logos, skill bars,
  dashboards, gradients inside a page, or ornamental timeline.
- Role titles are the strongest scan anchors; employer/context and dates are
  secondary; bullets use source-backed verbs and short measures. This gives a
  recruiter a reliable reading path without forcing a card-based layout.

## Grid and semantic order

At desktop widths of 64rem and wider, the pages become a two-sheet spread with
the correct A4 proportion. At smaller widths, the sheet cards stack in document
order. The mobile rule also lets role title/date, contact items, skills, and
education reflow rather than inducing horizontal scroll or microscopic text.

Each sheet is a linear `article` containing semantic `header` and `section`
elements. Sections use `h2`; roles use `h3`; role evidence uses real lists;
skills use a `dl`; and dates use `time`. The three independent-work entries
form a compact wide-screen strip, but remain one ordered list in the DOM and
stack on a phone. The visual spread does not use a sidebar or CSS ordering that
could change the source/assistive-technology reading sequence. This follows the
PDF and ATS guidance from `research.md`.

## Accessibility and links

- Text and links use dark foreground colors against a light paper surface, and
  focusable links/control have an explicit high-contrast focus ring.
- Contact and professional URLs are anchors with descriptive `aria-label`s;
  their literal domains remain visible so printed copies are useful.
- The Download PDF button is a small client component so the document itself
  remains server-rendered semantic HTML. It calls `window.print()` and is
  hidden in print.
- There are no icon-only navigational links, hover-only content, or color-only
  status markers. Mobile uses wrapping/stacking rules and the shell clips
  horizontal overflow at the page boundary.

## Exact two-page print strategy

The scoped CSS module contains `@page { size: A4; margin: 0; }`. In print:

- the shell becomes a plain white document;
- each sheet is exactly `210mm x 297mm` with fixed internal millimetre
  padding;
- the first sheet alone uses `break-after: page` / `page-break-after: always`;
- page two has no forced trailing break;
- page two retains its natural top alignment and uses a fixed `20mm` grid-row
  interval between its four supporting sections, balancing its lower-density
  archival material without compressing it into a sidebar;
- role records, project rows, skill rows, and education use
  `break-inside: avoid`;
- shadows, screen canvas, accent dependence, and Download PDF control are
  removed; all sheet text and links are forced black on white.

The content budget is intentional: stronger current roles receive two bullets,
Glaiveware retains one concise evidence-backed bullet, and the earliest four
roles preserve factual title/employer/date chronology without repeating their
long-form implementation detail. Lower-signal anecdotes are recorded in
`content.md` but omitted from the print surface.
## Verification record

The final production route was rendered through installed Headless Chrome into
`print-validation/ricardo-jorge-cv.pdf` with browser headers/footers disabled.
`pdfinfo` reports **2 pages** at **594.96 x 841.92 pt (A4)**. Both pages were
rendered to `print-validation/page-1.png` and `page-2.png` and visually
inspected: all headings, bullets, links, the oldest role chronology, toolkit,
and education are present; there is no clipping, blank third page, or screen
control. `pypdf` extraction also finds OMEGA Systems, Science4you, 11bench,
and the Portuguese education qualification in the two-page PDF, confirming the
important content remains selectable text.
