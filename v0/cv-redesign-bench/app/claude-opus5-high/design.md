# Design — "The Ledger"

Run: `claude-opus5-high`. Route: `/claude-opus5-high`.

Every number in this file is the number that is actually in
`cv.module.css`, and every claim about the printed output was measured on a
real PDF produced by headless Chrome, not estimated. The measurements are in
§8.

Reads alongside `research.md` (why these choices) and `content.md` (what is
being set).

---

## 1. The direction, in one paragraph

A **ledger**: a narrow left rail carrying nothing but section labels, a single
hairline running down the page beside it, and one column of content. The rail
plus the hairline make the grid visible rather than implied — the current
editorial mode that `research.md` §4.1 describes — while keeping exactly one
reading order for a human and one linear text order for a machine
(`research.md` §5.2). The source PDFs already use a left label column, so this
keeps the candidate's own structure and rebuilds it properly.

Three deliberate refusals:

- **No sidebar.** A real second column of content loses recruiters (Ladders,
  `research.md` §1.1) and confuses parsers (§5.1). The rail holds five words a
  page and no facts.
- **No boxes, chips, badges, cards, progress bars, or skill ratings.** Grouping
  is done with white space and hairlines. Nothing decorative competes with the
  text.
- **No trend volume.** The trend supplied the vocabulary — serif with mono,
  exposed grid, active white space. It did not supply viewport-filling display
  type or a deliberately unstyled look. This is a document someone reads in
  seven seconds while judging the author's judgement.

---

## 2. Type: three voices

One new font on top of the two the app's root layout already loads, so the page
costs one extra font file rather than three.

| Voice | Face | Used for |
|---|---|---|
| **Display** | Newsreader (variable serif, loaded here via `next/font`) | the name, the standfirst, every job title, the education course |
| **Text** | Inter (already loaded by the root layout) | all body copy, bullets, employer lines, skills |
| **Micro** | Geist Mono (already loaded by the root layout) | section labels, every date, the running head, the footer, the Download button |

Why this split rather than all-sans. The serif does the two jobs a sans does
badly at once: it carries a masthead at 21.5pt and stays distinct at 10.6pt in
a job title, so titles read as titles without needing to be bigger or bolder
than the layout can afford. The mono is doing information design, not
decoration: **everything set in mono is metadata** — a label, a date, a page
marker. Once a reader notices that, dates become findable by texture alone,
which is what the eye-tracking finding about scanning right to the dates asks
for (`research.md` §1.1).

The standfirst is the one italic in the document. It is a deck, in the
magazine sense: one sentence stating the whole career shape, in the most-read
space on the page.

### Sizes

Screen sizes are in `rem` (16px root). Print sizes are in points, because the
target is paper.

| Token | Mobile ≤ 640px | Desktop ≥ 1024px | Print |
|---|---|---|---|
| name | `clamp(2.375rem, 8vw, 3.25rem)` → 38px | → 52px | 21.5pt |
| standfirst | `clamp(1.0625rem, 3.4vw, 1.3125rem)` → 17px | → 21px | 10.4pt |
| job title | 17px | 19px | 10.6pt |
| body | 15px | 16px | **9.4pt** |
| small (employer, skills, notes) | 14px | 15px | 8.3pt |
| date (mono) | 12px | 12.5px | 7.6pt |
| section label (mono) | 9.6px | 10px | 6.8pt |
| line height (body) | 1.55 | 1.55 | **1.30** |

**Print body is 9.4pt, below Butterick's 10pt floor.** This is deliberate and
it is the main typographic concession in the run. The page count is fixed at
two and the candidate has eleven years of history; the alternative was deleting
a senior role. Butterick's own argument is that a small size is readable when
the measure is short, so the counter-measure is in §3: continuous prose is set
at 86 characters, not at the full column width. `research.md` §4.2 records the
original 9.6pt intent and this revision.

---

## 3. Grid and measure

```
print   |← 14mm →|← rail 25mm →|│|← content column 152.5mm →|← 14mm →|
screen  |         rail 10rem   |│|  content column 40rem              |
                                ↑ the spine: one hairline, full height
```

The rail is right-aligned so its labels sit flush against the spine. That puts
every label on one vertical line immediately left of all content — the line the
F-shaped scan runs down (`research.md` §1.2) — and it makes the spine read as a
drawn edge rather than as a stray border.

### Measured line lengths

Butterick's range is 45–90 characters (`research.md` §4.2).

| Surface | Block | Width | Characters |
|---|---|---|---|
| Print | profile + Beyond prose | 142mm | **82–90** (measured on the PDF) |
| Print | bullets, framing lines, rows | 152.5mm | ~92 |
| Desktop | profile prose | 576px | **75** (measured in the browser) |
| Desktop | bullets, rows | 640px | ~83 |
| Mobile 375px | everything | 339px | **47** |

Two honest notes:

- **Print bullets run to ~92 characters, marginally over Butterick's ceiling.**
  Narrowing the column costs vertical space, and the two-page budget has none
  to give. The mitigation is that bullets are *short* — most are one or two
  lines — so the eye rarely has to make the long return sweep that the ceiling
  exists to prevent. Continuous prose, where that sweep actually happens, is
  capped at 142mm instead. That split is why `.prose` carries its own
  `max-width` in the print block.
- **Mobile lands at 47 characters**, just inside the floor. At 375px with a
  usable side margin there is nowhere else to go; the alternative is a smaller
  font, which trades a real problem for a worse one.

### Vertical rhythm

Grouping is by proximity, not by boxes. Space between roles is roughly three
times the space inside a role, so a role reads as one object:

| Gap | Screen (desktop) | Print |
|---|---|---|
| between sections | 1.9rem | 3.1mm |
| between roles | 1.3rem | 2.4mm |
| between bullets | 0.32rem | 0.7mm |
| between paragraphs | 0.7rem | 1.4mm |

Three weights of hairline carry the structure: the spine and section rules at
full strength, entry and row separators at 62% opacity, and the page-2 running
head underlined in the stronger rule so it reads as furniture rather than
content.

### Bullet markers

A 6px × 1px dash in the accent colour, drawn as a **`border-top` on an
inline-block `::before`**, with a hanging indent from
`padding-left` + negative `text-indent`.

Three constraints forced this exact construction, and each one broke a simpler
version first:

1. **Not a character.** A typed `–` or `•` gets announced by screen readers and
   lands in the extracted text of the printed PDF.
2. **Not a `background`.** Browsers drop background colours when printing
   unless the user enables background graphics, so a background-drawn marker
   disappears on paper. Borders are always printed. `research.md` §6 records
   why forcing backgrounds on with `print-color-adjust: exact` was rejected
   instead.
3. **Not `position: relative` + `position: absolute`.** This is the standard
   way to place a marker and it silently corrupted the printed document.
   Positioned boxes paint after in-flow boxes in the same stacking context, so
   making every `<li>` relative pushed **every bullet on page 2 to the end of
   the page's text order** — after the Education section. Visually the page
   looked correct, which is why only reading the PDF's text back caught it. Any
   parser reading that file would have attributed the OMEGA, Phantasma, and
   Coalition bullets to nothing at all. Fixed by removing positioning
   entirely.

---

## 4. Hierarchy: what is loud, and in what order

Reading order on both surfaces is identical, and matches the printed order:

1. **Name** — the largest thing on the page, by a wide margin.
2. **Role**, in accent mono caps.
3. **Standfirst** — one italic serif sentence.
4. **Contact line** — every address spelled out (§6).
5. **Profile → Skills → Projects → Experience** (page 1)
6. **Experience continued → Earlier → Education → Beyond → footer** (page 2)

Inside a job entry the order is fixed and the emphasis is deliberate:

```
Senior Frontend Engineer → Team Lead              Jun 2023 – Apr 2024   ← serif 10.6pt · mono date, right
OMEGA Systems · omegasys.eu · Remote                                    ← 8.3pt, employer at 500 weight
Joined to build the next generation of OMEGA's iGaming platform …       ← the mandate, in muted ink
–  Data visualisation for the Main and Social dashboards, plus …        ← evidence, bolded lead phrase
```

- The **title is the loudest line** in the entry, above the employer — the
  eye-tracking order (`research.md` §1.1).
- **Dates are right-aligned in their own column** on every entry, project, and
  row, in tabular mono figures, so they form a scannable right edge instead of
  hiding in prose.
- **One bolded phrase per bullet, at the start.** Bolding scattered mid-bullet
  would fight the left-edge scan (`research.md` §1.2).
- The **promotion arrow is the only place the accent appears inside a heading**,
  because the promotion is the point.
- Skills use **run-in labels** (`Core Stack — TypeScript · React · …`) rather
  than a label column. The label still anchors the left edge where the eye
  scans, and every row gets the full measure — which removed two wrapped lines
  from page 1. The first version used a 32mm label column and `UI & Data
  Visualisation` wrapped onto two lines inside it, which looked like a mistake.

---

## 5. Colour

One accent, used for links, bullet markers, the role line, and the promotion
arrow. Never for body text, and never as the only way to tell two things apart.
Warm paper and warm ink rather than pure white and black: less clinical on
screen, and the warmth survives a cheap office printer better than a cool grey.

Ratios below are computed against that theme's own background, not eyeballed.
WCAG 2.2 asks 4.5:1 for normal text and 3:1 for large text
(`research.md` §9).

| Role | Light | Ratio | Dark | Ratio |
|---|---|---|---|---|
| paper | `#fbfaf8` | — | `#12110f` | — |
| body ink | `#171614` | **17.8:1** | `#f2efe9` | **17.6:1** |
| secondary | `#4a4843` | **8.8:1** | `#c3bfb6` | **10.4:1** |
| muted (labels, dates) | `#6e6b64` | **5.1:1** | `#938f86` | **5.9:1** |
| accent (links) | `#a8391b` | **6.2:1** | `#e8825c` | **7.1:1** |

Everything clears 4.5:1, including the smallest type in the document. The
muted greys were picked to hit that number rather than chosen by eye and
checked afterwards.

**Print is a third theme, not a filter.** Because `@page` cannot set colour
(`research.md` §6), the print block re-declares the custom properties on the
route's own elements: paper `#fff`, ink `#000`, rules in mid greys, and the
accent collapsed to black. The selector is written twice —

```css
.root, :global(.dark) .root { … }
```

— because `next-themes` leaves `.dark` on `<html>` while printing, so a
single-class print rule would lose the specificity contest to the dark theme
and print white text on white paper. Verified by printing under both
`prefers-color-scheme` values; §8.

---

## 6. Links

- **Underlined at rest**, in the accent, with the underline thickening and
  darkening on hover and focus. Underlining satisfies WCAG 1.4.1 more simply
  than relying on a 3:1 contrast against surrounding text (`research.md` §9).
- **Every address is visible as text**, on screen and on paper: the contact
  line prints `rj11.io · github.com/rj11io · linkedin.com/in/rj11io`, not the
  word "GitHub" hiding a destination. Employer domains print on their entries.
  So the document works when printed on paper or photocopied.
- Because the visible text is already the URL, the usual print trick of
  appending `content: " (" attr(href) ")"` is **not** used — it would print
  every address twice and eat page space.
- In print, links go black with a grey underline. They stay identifiable as
  links without spending colour.
- Chrome's print-to-PDF **does** keep them clickable — measured, not assumed:
  all 15 survive as PDF link annotations (§8).

---

## 7. Responsive behaviour

Two breakpoints, and the rail is the thing that moves.

**Mobile (≤ 640px).** The rail folds up: each section label becomes a row above
its own content, left-aligned, and the spine disappears. Dates drop below their
titles as a mono line. The sticky bar keeps the name and drops the job title.
Reading order is unchanged — which is the point of building the rail as a grid
with the label first in the document, rather than as a floated or absolutely
positioned sidebar.

**Desktop (≥ 1024px).** The rail widens to 10rem, the spine to 2rem, section
gaps open up, and the whole type scale steps up one notch (body 15px → 16px,
titles 17px → 19px). The document is capped at 52rem and centred.

The desktop layout deliberately does **not** use the full 1440px. Widening the
measure past ~80 characters would make it worse, and filling the margins with
invented sidebar content would contradict §1. The extra width goes to symmetric
margins, and the full-width sticky bar grounds the composition so the centred
column reads as a set document rather than as an unfinished one.

**No horizontal overflow at either width** — measured by comparing every
element's bounding box to the viewport, not by looking (§8). One real bug was
found this way: the bar's name label is a flex item, and flex items default to
`min-width: auto`, so it refused to shrink. `min-width: 0` fixes it; the
comment in the CSS says so, because it is the kind of line someone deletes as
noise.

---

## 8. Exact two-page print strategy

### The mechanism

```css
@page { size: A4; margin: 0; }          /* browser margins and furniture off  */
.sheet   { width: 210mm; padding: 11mm 14mm 12mm; }   /* margins are mine     */
.sheetOne { break-after: page; }        /* the only break in the document     */
.entry, .row, .skillRow, .eduBlock { break-inside: avoid; }
```

Two decisions carry it.

**Margins live on my own element, not on `@page`.** `@page` reliably supports
only `size`, `margin`, and `page-orientation` (`research.md` §6), so putting
`margin: 0` there and the real padding on `.sheet` keeps every measurement in
one place and removes the browser's own header and footer.

**No fixed sheet heights.** The common recipe is a `height: 297mm` sheet. I
built that first and dropped it: a box exactly as tall as the page can round up
by a fraction of a millimetre and emit a blank third page, and any content that
overruns a fixed box is clipped silently — the worst possible failure, because
it looks fine until someone reads the PDF. Instead the two sheets flow
naturally with one forced break between them. The only way to get a third page
is genuine overflow, which is measurable. MDN's note that a forced break beats
an `avoid` (`research.md` §6) is what makes it safe to combine the forced break
with `break-inside: avoid` on every entry, so no role is ever split from its
bullets.

**The page-2 running head is an ordinary element**, not an `@page` margin box
with `counter(pageNumber)`. Browser support for margin boxes is thin, and they
are exactly the construct parsers mishandle (`research.md` §5.1). There are
exactly two pages and both are authored by hand, so "Page 2 of 2" is literal
text, `display: none` on screen.

### The page budget

**Page 1** — masthead and contacts · standfirst · Profile · Skills · Projects ·
Experience (rj11io, Hunt Intelligence)
**Page 2** — running head · Experience (cont.) (OMEGA, Phantasma,
BinaryEdge/Coalition) · Earlier · Education · Beyond · footer

The break falls between two whole job entries. Anyone who reads only page 1
gets the complete current pitch: who he is, what he uses, what is live, and the
two most recent roles. `content.md` §11 records the reasoning and what was
compressed to make it fit.

### How the fit was reached

Getting from "too long" to exactly two pages was measurement, not guesswork.
Each round printed the route with headless Chrome, counted pages, and pulled
the text back out line by line to see **which** lines had overflowed:

| Round | Pages | What the measurement showed | What I changed |
|---|---|---|---|
| 1 | **4** | Each sheet spilled about a third of a page | Tightened the whole print scale: body 9.6 → 9.4pt, leading 1.34 → 1.30, gaps and margins in |
| 2 | **3** | Only the Hunt entry and the Beyond tail spilled | Skills to run-in labels; trimmed five `Earlier` notes to one line each |
| 3 | **3** | 3 lines over on page 2; page 1 exactly full, zero slack | Removed **orphan tail-lines** — bullets whose last line held 13–28 characters |
| 4 | **2** | Fit, with slack | Set the bottom margin from the measured break point |

Round 3 is the useful lesson. Reading line lengths out of the PDF showed
several bullets ending in a nearly-empty line — `"n8n workflows"` (13
characters), `"Executive Risks"` (15), `"its data visualisations"` (23),
`"and developer experience"` (24). Cutting a few words from each reclaimed a
whole line per bullet at almost no cost in meaning. That is where most of the
space came from, not from deleting content.

### Slack, measured

A layout that lands on two pages by accident is not finished. I found the
breaking point by raising the sheet's bottom margin until a third page
appeared:

| Bottom margin | Pages |
|---|---|
| 12mm ← **shipped** | 2 |
| 14, 16, 18mm | 2 |
| 22mm and above | 3 |

So the tighter of the two pages has roughly **8mm of headroom** — about two
lines of body text — at the 12mm bottom margin that ships. Enough to absorb a
font-metric difference between browsers without falling onto a third page.

---

## 9. Verification log

Every line below is a measurement on the built route, not an inspection.

| Check | Method | Result |
|---|---|---|
| Page count | headless Chrome print-to-PDF, `pypdf` page count | **exactly 2** |
| Page size | `pypdf` mediabox | 594.96 × 841.92 pt — **A4**, identical to both reference PDFs |
| Nothing clipped, no blank page | full text extraction of both pages | page 2 ends on the footer; no page 3 |
| Slack | swept the bottom margin to the break point | ~8mm on the tighter page (§8) |
| Reading order for parsers | read the extracted text in order | `Experience → AI Product Engineer → Mar 2025 – Present → rj11io → …`, labels before content throughout |
| Bullet paint-order bug | same extraction | **caught and fixed**: all page-2 bullets were landing after Education (§3) |
| Links clickable in the PDF | `pypdf` link annotations | **all 15** — 11 on page 1, 4 on page 2 |
| Link targets correct | compared annotation URIs to `content.md` §1 | exact match, including `mailto:` |
| Bullet markers actually print | counted fill rectangles in the PDF content stream | 7 rects of 6 × 1px on page 1 = the 7 bullets there |
| Print readable when screen is dark | printed twice under `preferredColorScheme=0` and `=1` | identical: white paper, black text, grey rules |
| Dark mode really was active | sampled the background pixel of a screenshot under each flag | `#12110f` dark / `#fbfaf8` light — the flag works, so the print test is real |
| No screen-only controls in print | searched the extracted text | no "Download PDF" |
| Horizontal overflow | compared every element's bounding box to the viewport, at 375px and 1440px | none at either width |
| Measure | measured rendered width ÷ canvas-measured average character width | 47 chars at 375px, 75 at desktop, 82–90 in print |
| Heading structure | queried the DOM | one `h1`, eight `h2` in reading order, six `h3` |
| Console | read console messages | no errors or warnings from the route |
| `npm run lint` | — | clean |
| `npm run typecheck` | — | clean |
| `npm run build` | — | compiled; `/claude-opus5-high` prerendered as static |

---

## 10. Accessibility, concretely

- One `h1` (the name), `h2` per section, `h3` per role and for the education
  course. Reading order matches visual order on every surface, because the rail
  is a grid column rather than a positioned sidebar.
- The promotion arrow is `role="img"` with `aria-label="promoted to"`, so it is
  announced as words instead of as a stray symbol — and no hidden text is added
  to do it.
- Bullet markers are drawn in CSS with no text content, so nothing decorative
  is read aloud (§3).
- **Download PDF** is a real `<button>`, keyboard reachable, with a visible
  focus ring offset from its edge. Its icon is `aria-hidden`; the label is real
  text.
- Links are underlined at rest and change both colour and underline thickness
  on hover and focus, so they are never distinguished by colour alone.
- All text clears 4.5:1 in both themes (§5).
- `prefers-reduced-motion: reduce` removes the two colour transitions. There is
  no other motion on the page.
- `main` wraps both sheets; the sticky bar sits outside it.

---

## 11. Implementation

```
app/claude-opus5-high/
  research.md        sources, findings, and the decisions each one changed
  content.md         canonical content model — every fact, with its source
  design.md          this file
  content.ts         machine-readable form of content.md; the only copy the page reads
  layout.tsx         loads Newsreader, sets route metadata
  page.tsx           composition: sheets, sections, entries, JSON-LD
  print-button.tsx   the one client component — calls window.print()
  rich.tsx           renders the `**bold**` lead phrase from content.ts
  cv.module.css      the whole design system, scoped to this route
```

- **No CV copy is hardcoded in a component.** Everything renders from
  `content.ts`, which is the machine-readable form of `content.md`. Which roles
  print on which page is one exported slice (`pageOneRoles`, `pageTwoRoles`), so
  the page budget is a data decision rather than something buried in markup.
- **CSS Modules, not Tailwind**, for this route. The design is mostly
  millimetre-precise print rules, custom-property theme switching, and
  fragmentation control — none of which utility classes express well. Nothing
  global is imported and nothing leaks out.
- **One client component.** The page is otherwise a server component and builds
  as static HTML.
- `schema.org/Person` JSON-LD is generated from the same `content.ts`, so the
  structured data cannot drift from the visible page.
- Only files inside this folder were touched.

---

## 12. Trade-offs I would revisit

- **9.4pt print body and ~92-character bullets.** Both sit at or just past the
  typographic comfort line, bought to fit eleven years onto two A4 pages
  without deleting a role (§2, §3). Given a third page, both go back first.
- **`Experience` and `Experience (cont.)` both appear on screen.** On a
  continuous scroll the continuation label has no page to continue from, so it
  reads slightly oddly for a moment. I kept it because it makes the screen
  document and the printed artifact structurally identical, which is the whole
  premise; hiding it on screen would buy a small gain and cost that.
- **The desktop layout leaves real empty margin at 1440px.** A deliberate
  choice (§7), but a reviewer expecting the viewport to be filled may read it
  as underuse rather than restraint.
- **No quantified outcomes anywhere in the CV.** Not a design decision — the
  source PDFs contain no metrics and inventing them is out. `content.md` §11
  records it as the document's biggest gap against current hiring advice, and
  lists the specific questions only the candidate can answer.
