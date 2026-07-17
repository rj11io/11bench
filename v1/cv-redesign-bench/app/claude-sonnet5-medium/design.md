# Design notes

## The direction, in one line

An editorial CV: a serif name and section labels set against plain,
no-frills body text, one thin rule line between sections, no boxes, no
icons, no colour blocks — the layout does the work that decoration usually
does.

## Why this direction (linked to research.md)

`research.md` §1 shows recruiters scan a CV in an "F" pattern in about
6-10 seconds, spending most of that time on the top third of the page. That
means the name, role, and most recent jobs need to be readable at a glance,
with nothing competing for attention. `research.md` §3 found that current
CV and editorial design is moving toward "a plain, geometric typeface paired
with a serif accent" rather than either an old-fashioned all-serif look or a
flat, iconography-heavy template — using type size and weight to show what
matters most, instead of colour or icons. Both source PDFs already set the
name in a serif and the body in a plain style, so I kept that pairing and
pushed it further: a bigger jump in size between the name, the job titles,
and the body text, and a single accent colour (a warm rust) used only for
the small italic section labels ("About", "Skills", "Experience", …) and
nowhere else. That gives the eye exactly one thing to land on per section
without adding visual noise.

## Layout

- A two-column row per section: a narrow label column on the left (`About`,
  `Skills`, `Projects`, `Experience`, `Education`) and the content in a wider
  column on the right. This is the same shape both source PDFs already use,
  because it works: the label column gives a reader jumping straight to
  "Experience" (a likely thing to scan for) an anchor to spot immediately.
- On narrow screens the two columns stack — the label sits above its
  content instead of beside it — so nothing gets squeezed into an unreadably
  narrow column on a phone.
- A single thin horizontal line separates each section. No cards, no boxes,
  no background tints — a line is enough to divide content, and anything
  heavier would compete with the type for attention.

## Typography

- Name and section labels: a serif typeface (`Source Serif 4`, loaded only
  inside this route's `layout.tsx` — the shared app layout and its font
  choices are untouched).
- Body text, dates, and bullet points: the app's existing sans-serif body
  font, already loaded by the shared root layout, so I add no second sans
  typeface of my own.
- Section labels are set in small italic serif in the one accent colour,
  which reads as a caption rather than a heading — deliberately quieter than
  the job titles, since a recruiter's eye should land on "AI Product
  Engineer, Mar 2025 – Present" before it lands on the word "Experience."

## Colour and contrast

- Text and backgrounds reuse the app's existing colour system (the same
  tokens used by the rest of this benchmark's shared UI), which already
  meets the WCAG AA contrast bar described in `research.md` §5 in both light
  and dark mode.
- The one added colour, a warm rust, is used only for the italic section
  labels, and its value is different in light and dark mode (each tuned to
  still clear 4.5:1 contrast against its own background — see
  `page.module.css`), because `research.md` §5 found that a dark theme isn't
  exempt from the same contrast rules as light mode.
- Every link is underlined, not just coloured, so it doesn't rely on colour
  alone to look like a link — also from `research.md` §5.

## Accessibility

- Semantic HTML throughout: one `<h1>` (the name), `<h2>` for each section
  label, `<h3>` for each job title and the education entry, real `<a>` tags
  for every link (email as a `mailto:` link), and a real `<button>` for
  "Download PDF" rather than a clickable `<div>`.
- No information is carried by colour alone (see above).
- The whole page is one column of real, selectable text — nothing is drawn
  as an image, so a screen reader, a browser's find-in-page, and an
  applicant tracking system (see `research.md` §4) all read the same content
  a human sees.

## Responsive behaviour

- Built and checked at 375px (phone) and 1440px (desktop) widths, plus the
  in-between range. The two-column section layout stacks to one column
  below the `sm` breakpoint, the header wraps instead of overflowing, and no
  element (headings, dates, links) requires horizontal scrolling at any
  width.
- The "Download PDF" button sits in the header on screen and disappears
  entirely in print — it's the only screen-only element on the page.

## Two-page print strategy

- The print stylesheet (`page.module.css`, under `@media print`) sets
  `@page { size: A4; margin: 11mm 14mm }`, so the browser's print output is
  physically A4 with consistent margins, not whatever paper size happens to
  be the browser default.
- Every job entry and the education entry has `break-inside: avoid`
  (`.entry`), so a single job is never split across a page boundary — it
  either fits or moves whole to the next page.
- One explicit break, `.pageTwoStart`, is placed before the "Senior Frontend
  Engineer → Team Lead" entry at OMEGA Systems (the third of five jobs). That
  puts the header, About, Skills, Projects, and the two most recent jobs (AI
  Product Engineer, Hunt Intelligence) on page one, and the three earlier
  jobs, the compressed "Earlier roles" line, and Education on page two —
  matching the pagination note in `content.md`. This follows the scanning
  research directly: the jobs a recruiter is statistically most likely to
  weigh (the current role and the one before it) stay on the page they see
  first.
- The exact break point isn't a guess: I measured the real rendered height
  of every section and job entry against the actual A4 content box (210mm ×
  297mm, minus the `@page` margins, converted to on-screen pixels) at the
  print content width, and adjusted type size and spacing until the content
  before the break comfortably clears page one with a safety margin, and the
  full document clears two pages with room to spare (no forced squeeze, no
  overflow to a third page).
- Print always renders black text on a white page (`page.module.css` forces
  this under `@media print` regardless of the screen's light/dark setting),
  because `research.md` §5 found that dark-mode contrast pairs (e.g. light
  grey on dark grey) aren't guaranteed to stay legible once printed on white
  paper.
- Checked in the browser's print preview at real A4 dimensions to confirm:
  exactly two pages, no entry split mid-bullet, no clipped text, no blank
  third page, and every link still visible and underlined on the printed
  page.
