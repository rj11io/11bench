# Research — CV redesign for Ricardo Jorge

Run: `claude-opus5-high`. All web sources accessed **25 July 2026** unless noted.

This file records what I looked up, what each source actually says, and which
decision it changed. If a source only confirmed something I already planned, I
say so rather than dressing it up as a discovery.

**A note on source quality.** The CV/resume advice market is full of pages
written to rank in search engines rather than to be true. I split the sources
into two piles:

- **Primary or expert** — the people who ran the study, wrote the standard, or
  set the typographic convention. These carry the weight: the Ladders
  eye-tracking study, Nielsen Norman Group, the W3C accessibility guidelines,
  MDN (Mozilla's browser documentation), Butterick's *Practical Typography*.
- **Secondary trade commentary** — resume-tool blogs and vendor guides. I used
  these only for the general direction of the market, never as the sole basis
  for a decision, and I flag them as weak where I cite them.

I also ran my own checks on the finished file instead of trusting claims about
what browsers do. Those are in §8.

---

## 1. How recruiters actually read a CV

### 1.1 The seven-second first pass

**Source:** "Eye tracking study shows recruiters look at resumes for 7
seconds", *HR Dive*, 14 Nov 2018 —
<https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/>
(accessed 25 Jul 2026). Reports the Ladders 2018 eye-tracking study, which
updated the same firm's 2012 study. Eye-tracking means the researchers
recorded where recruiters' eyes actually landed, rather than asking them.

I tried to read the study PDF directly at
`theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf`
and got HTTP 403 Forbidden, so I am relying on the trade-press report of it and
the press release below. Flagging that as a gap: I could not verify the sample
size.

**Supporting:** "Ladders Updates Popular Recruiter Eye-Tracking Study…", PR
Newswire, 14 Nov 2018 —
<https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html>
(accessed 25 Jul 2026).

**Findings:**

- Recruiters spend about **7.4 seconds** on the first look at a CV, up from
  about 6 seconds in 2012.
- Their eyes go to **current job title and employer first**, then the previous
  one, then across to the **dates**, then down to **education**.
- CVs that held attention had plain layouts, clear section headings, bold
  titles, and bulleted results.
- CVs that lost attention were crowded, short on white space, used **multiple
  columns**, ran long sentences, hid job headers, or gave the eye no downward
  path.

**Decisions this changed:**

1. The first thing under the name is the **current role, employer, and dates**,
   set at the largest size any job entry gets. I had originally planned to open
   with the profile paragraph; the profile now sits *beside* the header rather
   than pushing the first job below the fold.
2. **Dates sit in a fixed right-hand column, vertically aligned down the whole
   page.** The study's finding that eyes move right to the dates means dates
   should be findable by position alone, not hunted for inside a sentence.
3. **Job title is the loudest line in each entry** — heavier and larger than
   the employer. Every job entry has an explicit header; none are implied.
4. I rejected a genuine **two-column** layout for the body. What I use instead
   is a narrow left rail that holds only section labels and a single content
   column — one reading order, no competing column. See §5.2 for why this also
   matters for machine reading.

### 1.2 The F-shaped scan and how to break it

**Source:** Kara Pernice, "F-Shaped Pattern of Reading on the Web:
Misunderstood, But Still Relevant (Even on Mobile)", Nielsen Norman Group —
<https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/>
(accessed 25 Jul 2026). NN/g is a usability research firm; this is their own
eye-tracking work.

**Findings:**

- People scan in an F: a sweep across the top, a shorter sweep lower down, then
  straight down the left edge. The **first words on the left of each line get
  the most looks**; the right side of a column gets skipped.
- The F-scan appears when text is long and unformatted, the reader is in a
  hurry, and they are not invested enough to read properly. That is exactly a
  recruiter with a stack of CVs.
- It is a *failure mode*, not a target: readers miss content simply because of
  where it sits on the line.
- Fixes: front-load the important words, use headings that state their point in
  their first two words, bold key terms, use lists, and cut text.

**Decisions this changed:**

1. **Every bullet leads with the thing built, not the framing.** I rewrote
   bullets that started with "Built a…" or "Went deep on…" so the noun a
   recruiter is scanning for comes first — for example "AttackCapture™ and
   HuntSQL™ — core product modules…" instead of "Built core product modules
   AttackCapture™ and HuntSQL™".
2. **Section labels live in the far-left rail**, on the exact vertical line the
   F-scan runs down. This is the strongest argument for the rail and it is why
   I kept it rather than putting labels above their sections.
3. **One bolded phrase per bullet, at the start.** Bolding scattered through a
   bullet would fight the left-edge scan; bolding the opening term reinforces
   it.
4. **Measure (line length) is capped.** NN/g's point that the right side of a
   long line gets skipped is a direct argument for a narrower column — see
   §4.2.

---

## 2. Length: two pages is right for this candidate

**Source:** "ResumeGo: Hiring managers prefer candidates with two-page
resumes", CNBC, 19 Dec 2018 —
<https://www.cnbc.com/2018/12/19/resumego-hiring-managers-prefer-candidates-with-two-page-resumes.html>
(accessed 25 Jul 2026). Reports a ResumeGo study of 482 recruiters, hiring
managers, HR staff, and C-suite executives comparing one- and two-page CVs for
otherwise-matched candidates.

**Findings:**

- For **manager-level** roles, reviewers picked the two-page CV **74% of the
  time** — 2.9 times as often as the one-pager.
- Reviewers spent **4 min 5 s** on two-page CVs versus **2 min 24 s** on
  one-pagers, and rated the two-pagers about **21% higher** on communicating
  credentials.
- Weaker secondary corroboration: a 2026 vendor survey reporting 68.6% of
  recruiters now prefer two pages —
  <https://www.gainrep.com/resources/one-page-resume-or-two/> (accessed 25 Jul
  2026). Treat the exact number as marketing; the direction matches the study.

**Decisions this changed:**

The two-page limit is set by the task, so this did not change the page count.
It changed how I *use* the pages. I had been tempted to compress hard toward
one dense page and let the second breathe. The finding that reviewers give a
two-pager nearly twice the reading time — and rate it higher — says the second
page is genuinely read, not skimmed and discarded. So:

1. I put **real content on page 2**, not leftovers: two full senior roles, the
   condensed early career, and education.
2. I **spend space on white space** rather than cramming a third of page 2 with
   filler. The Ladders finding on crowding (§1.1) and this finding on reading
   time both point the same way.
3. Page 2 opens with a **running head** naming the candidate and "Page 2 of 2",
   because a printed page 2 often gets separated from page 1 on a desk.

---

## 3. What a senior AI product engineer's CV needs to prove

### 3.1 Seniority signals

**Sources (secondary trade guides — used for market direction only):**

- "10 Staff Software Engineer Resume Examples & Guide for 2026", Enhancv —
  <https://enhancv.com/resume-examples/staff-software-engineer/> (accessed 25
  Jul 2026).
- "Senior Software Engineer Resume Examples for 2026", Resume Worded —
  <https://resumeworded.com/senior-software-engineer-resume-example> (accessed
  25 Jul 2026).

**Findings:**

- Reviewers look for **promotion and growing scope** shown explicitly on the
  page, not inferred.
- At senior and above, the differentiator is **system-level work**:
  architecture, trade-offs, migrations, standards set, engineers mentored — not
  the list of frameworks.
- Job descriptions in 2026 now routinely ask for **experience with AI coding
  tools**.
- They push hard for **quantified impact** (latency, throughput, incident
  counts).

**Decisions this changed:**

1. The OMEGA Systems entry is titled **"Senior Frontend Engineer → Team Lead"**
   with the arrow kept, because the promotion is the point. Same for the
   Coalition entry, where I kept "started as the solo frontend engineer and grew
   a team" as a scope-growth sentence rather than cutting it for space.
2. I gave each senior role a **one-line framing sentence above its bullets**
   that states the mandate ("Joined to build the next generation of…"), so the
   bullets read as evidence for a mandate rather than as a task list.
3. I promoted **"first frontend hire on most projects"** into the profile's
   opening, because it is the strongest single seniority signal in the source
   material and it was buried in paragraph four of the long CV.
4. **On quantified impact I deliberately did not comply.** The guides want
   numbers; the source PDFs contain almost none, and inventing them is
   forbidden and would be dishonest. Instead I used the countable facts that
   *are* in the sources — years on each technology (React since 2016, Next.js
   since 2018), a decade of professional TypeScript, named shipped modules,
   named platforms. `content.md` records this as a known weakness of the
   resulting CV rather than papering over it. This is the one place where I
   consciously scored worse against generic advice in order to stay truthful.

### 3.2 AI-engineering signals

**Sources (secondary):**

- "Ultimate Guide to AI Engineering Portfolios", DataExpert.io —
  <https://www.dataexpert.io/blog/ultimate-guide-ai-engineering-portfolios>
  (accessed 25 Jul 2026).
- "How to Create a Winning AI Engineer Resume for 2026", Interview Query —
  <https://www.interviewquery.com/p/ai-engineer-resume> (accessed 25 Jul 2026).

**Findings:**

- Reviewers want **shipped systems**, not tutorial reproductions, and they read
  the choice of problem as evidence of judgement.
- **Prompt engineering on its own no longer counts** — it has to connect to a
  pipeline, an evaluation, or a product feature.
- Recruiters reportedly engage far more with **runnable code or live demos**
  than with prose. (Percentage claims in these posts are unsourced; I take the
  direction, not the number.)

**Decisions this changed:**

1. **Projects moved up onto page 1**, above the older jobs. The three
   `rj11.io` / `ai.rj11.io` / `bench.rj11.io` properties are live, public, and
   AI-specific — exactly the evidence type these sources say gets engagement.
   In the short source PDF, projects also sit before experience, so this
   respects the candidate's own ordering.
2. Each project line carries its **live URL as visible text**, so the URL
   survives print (§7).
3. In the profile I kept the specific **progression** — "prompt and context
   engineering → open-source agent skills → full agent harnesses and
   automations" — rather than the flat phrase "built with AI". A harness here
   means the scaffolding around a model that lets it run tools and complete
   work on its own. The progression answers the "prompt engineering alone is not
   enough" objection using only facts already in the source.
4. The skills block leads with a dedicated **AI Engineering** row rather than
   burying AI tools inside a general stack list.

---

## 4. Typography and visual direction

### 4.1 Contemporary editorial direction

**Sources:**

- "Font Trends 2026: The 12 Type Movements Shaping Design This Year", Made
  Good Designs — <https://madegooddesigns.com/font-trends-2026/> (accessed 25
  Jul 2026).
- "Web Design Trends 2026: Brutalist UX & Invisible Logic", Fireart Studio —
  <https://fireart.studio/blog/the-best-web-design-trends/> (accessed 25 Jul
  2026).
- "Swiss Style graphic design", Envato Elements —
  <https://elements.envato.com/learn/swiss-style-graphic-design> (accessed 25
  Jul 2026), for the background on the grid tradition.

**Findings:**

- Type is being treated as the main structure of a page rather than as
  decoration, partly for looks and partly to keep pages light.
- The current editorial mode favours **exposed grids** — visible columns,
  margins, and typographic rhythm — and **active white space**, where the empty
  areas do work instead of being leftover.
- A recognisable 2026 pairing is an **expressive serif with a plain
  monospace** (a monospace is a typewriter-style font where every character
  takes the same width); the sources name Fraunces with JetBrains Mono or
  Fragment Mono as the reference example.
- "Brutalist" now reads as plainness and honesty rather than rebellion.

**Decisions this changed:**

1. I chose a **three-voice type system** instead of the all-sans default that
   most engineering CVs use:
   - **Newsreader** (a variable serif, loaded through `next/font`) for the
     name, the opening standfirst sentence, every job title, and the education
     course. It gives editorial authority and holds up small in print.
   - **Inter** for body text — already loaded by the app's root layout, and a
     reliable workhorse at 9–10pt.
   - **Geist Mono** — also already loaded by the root layout — for section
     labels, every date, the page-2 running head, and the footer.
     I picked the two fonts the app already loads plus exactly one new one, so
     the page costs one extra font file rather than three.
     A side effect worth naming: because **everything in mono is metadata**,
     dates become findable by texture alone, which is what the eye-tracking
     finding about scanning right to the dates asks for (§1.1).
2. I made the **grid visible**: a full-width hairline above each section, and a
   continuous vertical hairline — the spine — separating the label rail from the
   content column. This is the "exposed grid" idea, and it doubles as the
   downward eye path the Ladders study says CVs need (§1.1). The rail's labels
   are right-aligned so they sit flush against the spine, which keeps them on
   one vertical line just left of all content.
3. I used **white space as structure** — generous space between roles, tight
   space within a role — so grouping is done by proximity instead of by boxes,
   borders, or background fills.
4. I rejected the loud end of the trend: no viewport-scaled giant type, no
   deliberately unstyled look. A CV is a document read under time pressure by
   someone judging your judgement. The trend informed the *vocabulary* (serif +
   mono, exposed grid, active white space) but not the volume.

### 4.2 Measure and point size

**Sources:** Matthew Butterick, *Practical Typography* —
<https://practicaltypography.com/line-length.html> and
<https://practicaltypography.com/point-size.html> (both accessed 25 Jul 2026).
Butterick is a typographer and lawyer; this is the standard free reference.

**Findings:**

- **Line length: 45–90 characters including spaces.** Longer lines force the
  eye to travel further from the end of one line to the start of the next,
  which makes it harder to track down the page. The quick test is fitting two
  to three alphabets on a line.
- **Point size: 10–12pt for print.** Nearly every book, newspaper, and
  magazine sets body text below 12pt; 12pt is a typewriter habit, not a
  reading requirement. 10.5 and 11.5 are legitimate sizes.
- **Web: 15–25px**, because screens are read from further away and benefit
  from more pixels.

**Decisions this changed:**

1. Print body text is set below 10pt deliberately, because the task fixes the
   page count at two and this candidate has eleven years of history. I checked
   it against Butterick's own reasoning: a small size is readable when the
   measure is short, so the counter-measure is point 2.
   **Revised after measuring.** I planned 9.6pt at 1.34 line spacing. The
   printed result was four A4 pages, and closing that gap took **9.4pt at
   1.30**. `design.md` §2 and §8 record the full retune and the measurements
   behind it.
2. **Revised after measuring.** I planned to cap every line at 72–86 characters
   in print. The real numbers, measured on the produced PDF:
   - continuous prose (the profile, and Beyond) — **82–90 characters**, inside
     Butterick's range. This is the block where a long line actually hurts, so
     it carries its own narrower cap.
   - bullets, framing lines, and rows — **~92 characters**, marginally over the
     ceiling. Narrowing the column costs vertical space the two-page budget does
     not have. The mitigation is that bullets are short, usually one or two
     lines, so the eye rarely makes the long return sweep the ceiling exists to
     prevent. Recorded as a trade-off in `design.md` §3 and §12 rather than
     hidden.
3. Screen body text is **16px on desktop and 15px on a phone**, inside the
   15–25px web range. The document scales up at desktop width instead of the
   measure getting wider: desktop prose lands at **75 characters**. At 375px the
   measure is forced down to **47 characters** — just inside Butterick's floor,
   and the best available at that width, since the alternative is a smaller
   font.

---

## 5. Machine reading (applicant tracking systems)

An **applicant tracking system**, or ATS, is the software a company uses to
store, search, and rank job applications.

### 5.1 What actually goes wrong

**Sources:**

- "The ATS Resume Rejection Myth: Why the '75% of Resumes Never Get Seen'
  Claim is Wrong", The Interview Guys —
  <https://blog.theinterviewguys.com/ats-resume-rejection-myth/> (accessed 25
  Jul 2026).
- "Common ATS Resume Formatting Mistakes", Santa Clara University Career
  Center (summarising Jobscan) —
  <https://www.scu.edu/careercenter/toolkit/job-scan-common-ats-resume-formatting-mistakes/>
  (accessed 25 Jul 2026). A university career centre is a more trustworthy
  voice here than a resume-tool vendor.
- "Are Two-Column Resumes ATS Friendly? 2026 Test & Fixes", Resumemate —
  <https://www.resumemate.io/blog/two-column-resumes-ats-tests-workarounds-and-examples/>
  (accessed 25 Jul 2026). Vendor content; used only for the two-column point,
  which matches the university source.

**Findings:**

- The famous claim that ATS software silently bins 75% of CVs traces back to a
  2012 marketing line from a company that shut down in 2013, with no published
  research behind it. These systems mostly **sort and rank**; a human still
  looks at the filtered pool. A low score means you appear further down a
  search result, not that you were deleted.
- The real damage is **parsing**: complex layouts, tables, text boxes, page
  headers and footers, and graphics can make the parser misfile or drop whole
  sections. As one source puts it, most rejected CVs were **misread rather
  than judged**.
- **Non-standard section names** can make a parser miss a section entirely.
  Conventional names — Experience, Education, Skills — are safest.
- **Single-column, reverse-chronological** layouts parse most reliably.
  Two-column PDFs sometimes get the right-hand column shuffled into the wrong
  place.
- Hidden white keyword text is now actively flagged as manipulation.

**Decisions this changed:**

1. Section labels use the **conventional words** — Profile, Skills, Projects,
   Experience, Earlier, Education, Beyond. I dropped my earlier idea of styling
   them as numbered chapter marks like "01 / ORIGIN" or renaming Experience to
   something more editorial. The visual system carries the personality; the
   words stay boring on purpose. Page 2's continuation label is
   "Experience (cont.)", which still contains the word a parser looks for.
2. **No tables, no text boxes, no images, no icon fonts, no page-header or
   page-footer margin boxes** carrying real information. Every fact is normal
   flowing text in the document body. The `@page` margin-box feature would have
   been the elegant way to do the page-2 running head, but it is also exactly
   the construct these sources say parsers mishandle — and MDN confirms browser
   support is thin anyway (§6). So the running head is an ordinary element.
3. The left label rail is built with **CSS grid, with the label before its
   content in the document order**. Grid items paint in document order, so the
   extracted text reads "Experience → AI Product Engineer → …" rather than all
   labels first and all content after. §8.1 is the test where I verified this
   on the real printed file instead of assuming it.
4. **One column of content, reverse chronological, dates as `Mon YYYY`** with
   an en dash between them, formatted identically in every entry.
5. Nothing is hidden for machines. There are no invisible keyword blocks. The
   only text that differs between screen and print is *presentational* — the
   page-2 running head appears in print, and the "Download PDF" button does
   not.
6. **One deliberate departure from the advice.** These sources recommend simple
   bullet characters (`•` or `-`). My markers are drawn in CSS and contain no
   text at all, so the extracted PDF has **no marker character** — each bullet
   is simply its own line. I chose that because a real character would also be
   announced by a screen reader as a meaningless symbol, and because line breaks
   already separate list items for a parser. I verified the extracted result
   rather than assuming it (§8.1). If a parser did depend on seeing a bullet
   glyph, this would be the decision to revisit.

### 5.2 The tension I had to resolve

The Ladders study says multiple columns lose recruiters; the ATS sources say
multiple columns lose parsers. Both point away from a real two-column CV. But
the candidate's own PDFs use a left label column, and it is genuinely the
strongest possible support for the F-scan (§1.2).

**Resolution:** the rail holds **only section labels** — five words total on
page 1. It carries no facts, no dates, no bullets. If a parser flattened the
rail into the wrong place, the worst outcome is the word "Experience" landing
oddly; no evidence moves. And a human reading the page has one content column
to follow, top to bottom. This is the single most consequential design decision
in the run, and it came directly out of holding these two source sets against
each other.

---

## 6. Print mechanics

**Sources (MDN — Mozilla's browser reference):**

- `break-inside` — <https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside>
  (accessed 25 Jul 2026).
- `@page` — <https://developer.mozilla.org/en-US/docs/Web/CSS/@page> (accessed
  25 Jul 2026).

**Findings:**

- `break-inside: avoid` stops a page break inside a box; it applies to
  block-level boxes and is not inherited. Where a break can happen is decided
  by three properties together — the previous element's `break-after`, the next
  element's `break-before`, and the container's `break-inside`. A forced break
  wins over an `avoid`, and any `avoid` at a candidate break point prevents the
  break there.
- The old `page-break-*` properties are kept only as aliases for the modern
  `break-*` ones.
- `@page` reliably supports **`size`, `margin`, and `page-orientation`** and
  nothing else. Colours, backgrounds, borders, and fonts are in the
  specification but **no major browser supports them**. Viewport units such as
  `vh` are unreliable inside `@page`. Margin boxes such as `@top-right` with
  `counter(pageNumber)` exist in the specification, with the same weak support.

**Decisions this changed:**

1. `@page { size: A4; margin: 0 }`, with the page padding applied to my own
   sheet element instead. This keeps all spacing under my control, in
   millimetres, and avoids the browser's default margins and its
   header/footer furniture.
2. I get exactly two pages with **one forced break** — `break-after: page` on
   the first sheet element — and **no fixed sheet heights**. I had first
   planned fixed `height: 297mm` sheets, which is the common recipe. I dropped
   it: a box exactly as tall as the page can round up by a fraction of a
   millimetre and produce a blank third page, and any content overflow gets
   silently clipped. With a forced break and naturally-flowing content, the
   only way to get a third page is genuine overflow, which I can measure and
   tune (§8.2).
3. `break-inside: avoid` on every job entry, project row, and skill row, so a
   role's title never ends up stranded at the bottom of page 1 away from its
   bullets. The MDN note that a forced break beats an avoid is what makes it
   safe to combine this with the forced break in point 2.
4. **No `@page` margin boxes** and no reliance on `counter(pageNumber)`. "Page
   2 of 2" is written as literal text in an ordinary element, since there are
   exactly two pages and both are authored by hand. This also keeps the
   information out of a construct parsers mishandle (§5.1).
5. Print colour is forced to **black on white in the stylesheet itself**, not
   left to the browser. Because `@page` cannot set colour, the light-mode
   values have to be re-declared on my own elements inside `@media print`,
   overriding dark mode. See §7.

Supplementary, on forcing backgrounds to print: several practitioner guides
recommend `print-color-adjust: exact` to stop browsers dropping background
colours to save ink — e.g. *CSS: The Perfect Print Stylesheet*, Jotform,
<https://www.jotform.com/blog/css-perfect-print-stylesheet-98272/> (accessed 25
Jul 2026). **I decided against using it.** My print design has no background
fills to preserve, and forcing exact colour would work against the ink-light,
black-on-white result I want.

---

## 7. Links in print and in the PDF

**Finding (mixed evidence):** whether a browser's "Print to PDF" keeps links
clickable is genuinely unsettled in the sources. Search results on this
question were dominated by low-quality SEO pages contradicting each other, so I
am not citing them as authority. Rather than guess, I tested it.

**Answer, measured on the produced file: it does.** All **15** links in the
finished CV survive as PDF link annotations — the clickable rectangles a PDF
stores over its text — 11 on page 1 and 4 on page 2, with every target matching
`content.md` §1 exactly, `mailto:` included. Method and full result in §8.1 and
`design.md` §9.

That result does **not** change the decisions below. It makes the clickable
layer a bonus rather than the mechanism: the document still has to work
printed on paper, and a different browser or a PDF pipeline that flattens the
page would drop the annotations without warning.

**Decisions:**

1. **Every link's URL is visible as text in print**, so it works when read on
   paper or when the clickable layer is lost. The contact line prints as
   `rj11.io · github.com/rj11io · linkedin.com/in/rj11io` in full rather than
   as words like "GitHub" hiding a destination.
2. Employer domains print as visible text on their job entries, matching what
   the source PDFs do.
3. I do **not** use the CSS trick of appending `content: " (" attr(href) ")"`
   after every link. On this document the visible text is already the URL, so
   that would print each address twice and eat page space.
4. On screen, links are underlined and change colour and underline thickness on
   hover and focus, so they are not distinguished by colour alone (§9).

---

## 8. First-party checks

Claims about what browsers do are worth less than measurements, and my own
output is the thing being judged. So:

### 8.1 Extraction test on my own printed PDF

I printed the finished route to PDF with headless Chrome, pulled the text back
out with a PDF library, and read it in order. This is a direct proxy for what a
parser sees, and it tested the two things I reasoned about above.

**Result on reading order (§5.1 decision 3): the rail keeps document order** —
the extracted text reads `Experience → AI Product Engineer → Mar 2025 – Present
→ rj11io → …`, label before content, throughout both pages.

**But the test also caught a bug I would never have found by looking at the
page.** My first bullet markers were absolutely positioned inside
`position: relative` list items — the standard technique. Positioned boxes paint
after in-flow boxes, so **every bullet on page 2 was landing at the end of that
page's text order**, after the Education section. The page looked perfect. Any
parser reading the file would have detached the OMEGA, Phantasma, and Coalition
bullets from their jobs entirely. Fixed by dropping positioning
(`design.md` §3). This is the single strongest argument in the run for testing
the artifact instead of trusting the design.

**Result on links (§7): all 15 survive** as clickable annotations.

### 8.2 Page-count check

The same headless print gives a real page count, so "exactly two A4 pages" is
verified against a produced file rather than eyeballed in a preview. Iterating
on it is what set the final type sizes and spacing — the first print was
**four** pages.

I also measured the **headroom**, by raising the page's bottom margin until a
third page appeared. The tighter of the two pages holds about **8mm** spare,
roughly two lines, so the two-page result is a designed margin rather than a
coincidence.

### 8.3 Overflow and dark-mode checks

I loaded the route at 375px and 1440px and compared every element's bounding box
to the viewport, so horizontal overflow is measured rather than guessed. **This
caught a real bug at 375px**: the sticky bar's label is a flex item, and flex
items default to `min-width: auto`, so it refused to shrink and widened the
whole document past the viewport.

For dark mode I printed the route twice, under both `prefers-color-scheme`
values, and compared the PDFs' fill colours: identical — white paper, black
text (§6, decision 5). I then sampled the background pixel of a screenshot
under each value to confirm dark mode really was active (`#12110f` versus
`#fbfaf8`), so the print test is testing what I think it is rather than passing
because the flag did nothing.

---

## 9. Accessibility

**Sources (W3C — the body that writes the web accessibility guidelines):**

- Understanding SC 1.4.3 Contrast (Minimum) —
  <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
  (accessed 25 Jul 2026).
- Understanding SC 1.4.1 Use of Color —
  <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html> (accessed 25
  Jul 2026).

**Findings:**

- **Contrast:** at least **4.5:1** between text and background for normal
  text, and **3:1** for large text, where large means 18pt or 14pt bold —
  roughly 24px, or 18.5px when bold. Purely decorative or invisible text is
  exempt.
- **Colour is never allowed to be the only signal.** For links inside a block
  of text, the documented technique (G183) is a **3:1 contrast against the
  surrounding text** *plus* an extra visible change on hover or focus.

**Decisions this changed:**

1. Body text on the light theme is a warm near-black on a warm off-white, and
   the muted grey used for secondary lines was chosen to clear 4.5:1 rather
   than by eye. The same is checked on the dark theme.
2. The accent colour is used for links, the rules, and small marks — never as
   the only way to tell one thing from another, and never for body text.
3. Links are **underlined at rest**, not only coloured, which satisfies 1.4.1
   more simply and robustly than relying on the 3:1-against-surrounding-text
   route. Hover and focus thicken the underline and shift the colour, which is
   the extra cue G183 asks for.
4. Focus rings are visible and offset, and I did not remove the browser default
   without replacing it.
5. Beyond the two guidelines above: the page uses one `h1` and real `h2`/`h3`
   headings in reading order, the "Download PDF" control is a real `<button>`
   reachable by keyboard, decorative rules are drawn with CSS rather than
   characters so a screen reader does not read them, and the job-title arrow
   `→` is given a text alternative so it is not announced as a stray symbol.

---

## 10. Decision log

Every row is a decision I can trace to a source above.

| # | Decision | Driven by |
|---|---|---|
| 1 | Current role, employer, dates directly under the name | §1.1 |
| 2 | Dates in a fixed right-hand column, aligned down the page | §1.1 |
| 3 | Job title is the heaviest line in each entry | §1.1 |
| 4 | No true two-column body; label rail only | §1.1, §5.1, §5.2 |
| 5 | Bullets front-load the built thing | §1.2 |
| 6 | Section labels in the far-left rail, on the F-scan line | §1.2 |
| 7 | One bolded phrase per bullet, at the start | §1.2 |
| 8 | Real content on page 2, with white space kept | §1.1, §2 |
| 9 | "Page 2 of 2" running head, as ordinary text | §2, §5.1, §6 |
| 10 | Promotion arrows and scope-growth kept | §3.1 |
| 11 | One framing line above each senior role's bullets | §3.1 |
| 12 | "First frontend hire" promoted into the profile opening | §3.1 |
| 13 | No invented metrics; countable facts used instead; gap disclosed | §3.1 |
| 14 | Projects on page 1, above older roles, with visible URLs | §3.2, §7 |
| 15 | AI progression stated, not flattened to "built with AI" | §3.2 |
| 16 | Dedicated AI Engineering skills row, listed first | §3.2 |
| 17 | Serif + sans + mono, one new font only | §4.1 |
| 18 | Exposed grid: hairline rules, visible rail | §4.1 |
| 19 | Grouping by white space, not boxes or fills | §4.1 |
| 20 | Trend vocabulary adopted, trend volume rejected | §4.1 |
| 21 | Print body **9.4pt** at 1.30, deliberately below the 10pt floor | §4.2 |
| 22 | Print prose capped at **82–90** characters; bullets ~92 and flagged | §4.2, §1.2 |
| 23 | Screen body 16px desktop / 15px phone; document scales, measure does not widen | §4.2 |
| 24 | Conventional section names; editorial renaming dropped | §5.1 |
| 25 | No tables, text boxes, images, or `@page` margin boxes | §5.1, §6 |
| 26 | Label precedes content in document order | §5.1, §8.1 |
| 27 | Uniform `Mon YYYY – Mon YYYY` dates | §5.1 |
| 28 | No hidden keyword text | §5.1 |
| 29 | `@page { size: A4; margin: 0 }`, padding on my own sheet | §6 |
| 30 | One forced break, no fixed sheet heights | §6 |
| 31 | `break-inside: avoid` on entries, rows, and projects | §6 |
| 32 | Print forced black-on-white in CSS, overriding dark mode | §6 |
| 33 | `print-color-adjust: exact` rejected | §6 |
| 34 | URLs visible as text in print; no `attr(href)` duplication | §7 |
| 35 | Contrast 4.5:1 body / 3:1 large, checked not guessed | §9 |
| 36 | Links underlined at rest, with hover and focus changes | §9 |
| 37 | Page count, headroom, and extraction verified on a produced PDF | §8 |
| 38 | Bullet markers drawn as a border, not a background or a character | §6, §8.1 |
| 39 | No positioned list items — they corrupt the printed text order | §8.1 |
| 40 | Skills use run-in labels rather than a label column | §4.1, §8.2 |

---

## 11. Limits of this research

- I could not read the Ladders study PDF directly (403 Forbidden), so the
  7.4-second figure and the layout findings come from trade-press reporting of
  it. Sample size unverified.
- Both landmark studies — Ladders eye-tracking and ResumeGo length — are from
  2018. I found no comparably rigorous newer replacement. Everything published
  since that I found on these questions is vendor content.
- The ATS parsing claims come from career-centre and vendor summaries, not from
  the vendors' own published specifications. Greenhouse and Lever do not
  publish how their parsers behave. Treat specific per-platform accuracy
  percentages in those posts as unverified.
- I ran no user testing and no ATS testing against a real system. My §8 checks
  test the produced PDF, which is a proxy, not the systems themselves.
- I did not look at any other run folder in this repository, per the task
  rules.
