# Design

This explains the visual direction for the CV at `/claude-sonnet5-xhigh`, and how
each choice traces back to `research.md` (what I learned) and `content.md` (what has
to fit on the page).

## Direction in one sentence

An editorial, grid-based "dossier" layout: a narrow left column of facts that don't
need full sentences (contact, skills, projects, education) next to a wide right
column for the two things that need to be read in order (the About paragraph and
the job history) — with a quiet serif name/heading treatment against a plain,
highly legible body face.

## Why this direction

`research.md` section 1 found that recruiters read in an "F-pattern" — a sweep
across the top, then down the left edge, with the right side of the page getting
comparatively little attention on a first pass. Two consequences drove the layout:

1. **The content that most needs to be read in sequence goes where sequential
   reading already happens** — top-and-center, not squeezed into a sidebar. That's
   why About and the job history sit in the wide main column, not the narrow one.
2. **The content that's fine to be skimmed out of order goes in the sidebar.**
   Skills, contact links, project names, and education are all lookup facts, not
   narrative — a recruiter's eye can land anywhere in that column and still get the
   fact. Putting them there also does the job `research.md` section 2 recommends for
   a decade-plus career: it shortens the main column instead of stretching every
   section to full page width, which is what let five detailed jobs plus a
   compressed "earlier experience" block fit in two pages without feeling cramped.

`research.md` section 3 found that current editorial direction favors a disciplined
grid with one confident accent rather than heavy decoration, and that font pairing
works best as either one family across several weights, or two families with a clear
division of labor. I used a serif display face (Source Serif 4, loaded locally in
this route) for the candidate's name and the all-caps section labels, and the site's
existing Inter for every sentence of body text. The serif only appears a handful of
times per page, so it adds a distinct, editorial voice without ever being the
typeface someone has to read a paragraph in. Dates and the sidebar's tag-like skill
items use the site's existing monospace face — a small, functional reference to the
candidate being an engineer, used only where it doesn't compete with reading.

## Hierarchy

Reading order, same on every breakpoint:

1. Name (large, serif) + title + one-line origin clause + contact row
2. About (one paragraph)
3. Sidebar: Skills → Projects → Education (screen: below About on mobile, beside it
   on desktop; print: left column of page one only — this content doesn't repeat on
   page two, since all of it is already spent by the end of page one; page two's
   left margin carries a small running head, name and page number, for visual
   continuity, not a repeated sidebar)
4. Experience, newest first, each with a title/company/dates line and 3-4 bullets
5. Earlier experience, compressed to one line per role, no bullets

This is also the **HTML source order** — the two-column look is done with CSS grid
placement, not by reordering the underlying markup. `research.md` section 4 notes
that a real ATS (a company's resume-screening software) can fail to reconnect a job
title with its bullets when a layout uses visual multi-column tables; keeping source
order equal to reading order means anything that extracts this page's text — an ATS,
a screen reader, a browser's "reader mode" — gets the same correct sequence a human
does, even though sighted readers see two columns.

## Typography and color

- **Serif (name, section labels):** Source Serif 4, loaded via `next/font/google` in
  this route's own `layout.tsx` (the shared root layout is untouched).
- **Sans (everything else read as a sentence):** the site's existing Inter, inherited
  from the root layout — no new dependency, no divergence in body legibility.
- **Mono (dates, sidebar tags):** the site's existing Geist Mono, same reasoning.
- **Color, on screen:** the existing design-token palette (`background`,
  `foreground`, `muted-foreground`, `border`) already wired up for light and dark
  mode by the shared `ThemeProvider` — so the CV matches whichever theme the visitor
  has chosen, with no separate theme logic of its own.
- **Color, in print:** overridden to plain black text on white, regardless of the
  visitor's screen theme. `research.md` section 5 found that a browser may quietly
  reinterpret theme colors when printing, and that dark-mode CSS variables should
  not be trusted to resolve to a printable value — so the print stylesheet sets
  literal black/white rather than reusing the on-screen tokens.

## Responsive behavior

- **Mobile (~375px and up):** single column. Sidebar content (skills, projects,
  education) renders as its own block, stacked after About and before the
  experience list, using the same source order described above. Contact links wrap
  onto multiple lines rather than truncating or shrinking below a legible size.
- **Desktop (~1440px, and generally ≥ the `lg` breakpoint):** two-column grid, ~30%
  sidebar / ~70% main column, with a vertical rule between them. The layout has a
  max content width so it doesn't stretch into uncomfortably long line lengths on a
  wide screen — line length for body text stays in a normal reading range at any
  viewport width.
- No horizontal scrolling or overflow at either size; long URLs and technology lists
  wrap normally instead of being clipped.
- One small, deliberate difference between the two renderings: on screen, an
  employer's name is itself the link (underline and color already signal that it's
  clickable, so showing the raw URL too would be redundant). In print, the
  employer's name is followed by its plain-text URL as a second, separate link —
  print offers no hover state to signal interactivity, so spelling the URL out
  makes the page useful on paper, not only on screen.

## Accessibility

- Semantic structure: one `<h1>` (name), `<h2>` per major section, `<h3>` per job
  title — a screen reader's heading navigation mirrors the visual hierarchy.
- The screen version is the one accessible-technology users get: the print-only
  layout is marked `aria-hidden="true"` and removed from the tab order, so a screen
  reader never reads the CV twice.
- All contact links are real `<a href>` elements with descriptive, visible text
  (the URL or handle itself, not "click here"), so link purpose is clear out of
  context — including to assistive technology and to a plain list of links.
- Color contrast: body text and headings use the existing token palette's
  foreground-on-background pairing already relied on elsewhere in this codebase,
  which meets standard contrast minimums in both light and dark mode; print uses
  pure black on white, the maximum possible contrast.
- `<html lang="en">` is inherited from the root layout; this page adds no
  non-English body content (the one Portuguese program name from `content.md` is
  intentionally left out of the rendered page, exactly as recorded there).

## Print strategy: exactly two A4 pages

- `@page { size: A4; margin: 0 }` — the page size is fixed, and all spacing is done
  with padding inside each page container rather than the browser's page margin, so
  the usable content area is one number I control directly instead of two
  interacting ones (`research.md` section 5).
- The print layout is a **separate, fixed-size rendering** from the fluid on-screen
  layout — both are built from the same `content.ts` data, but the print version
  uses two explicit page containers sized to the A4 content box (210mm × 297mm,
  minus the internal padding), rather than trying to force one fluid, responsive
  layout to also happen to paginate correctly. This was the single highest-leverage
  decision for hitting "exactly two pages, no clipping, no blank third page":
  fighting a fluid grid into fixed pagination is fragile; building the print
  version as its own fixed-size component is not.
- Page 1: header, About, Skills, Projects, Education (sidebar), and the two most
  recent roles (AI Product Engineer at rj11io, and Product/Datavis Engineer at Hunt
  Intelligence).
- Page 2: the remaining three detailed roles (OMEGA, Phantasma Chain, and
  BinaryEdge/Coalition) and the compressed "Earlier experience" block.
- This split, and the type sizes around it, were tuned empirically, not guessed. I
  temporarily forced the `@media print` rules to apply on-screen (a runtime-only
  CSSOM patch for measurement, never saved to the source) and read each page's
  actual content height against the 297mm budget. The first attempt put three
  roles on page one; once the type was sized for comfortable reading, that
  overflowed the page by more than 30mm. Moving the third role back to page two
  and trimming bullet spacing by a few tenths of a millimetre per line fixed it:
  in the final version, page one's content leaves 15.6mm of margin at the bottom
  of its printable area, and page two leaves 11.6mm — both comfortably inside the
  page, with no clipping and no overflow onto a third page.
- `break-inside: avoid` is set on every job entry and on the sidebar's card-like
  groups, so a job's title, dates, and bullets can never be split by a page
  boundary; a manual, deliberate break sits only between page 1 and page 2.
- The on-screen-only "Download PDF" button (which calls `window.print()`) and any
  other screen affordance are marked `print:hidden` so the printed result contains
  nothing but the CV itself.
- I verified the exact two-page result by rendering the print stylesheet at the
  browser viewport size that matches A4's printable pixel dimensions and confirming
  page 1 and page 2 each fill their box without overflow, and that no content
  spills into a third page.

## What I deliberately did not do

- No photo, no icon set, no illustration — `content.md`'s two-page budget and
  `research.md`'s scanning findings both argue for spending the space on verifiable
  claims, not decoration.
- No second accent color — one serif/sans/mono type system and the existing
  neutral token palette carry the whole hierarchy, in keeping with the "one
  confident structure, not many decorations" direction from `research.md` section 3.
