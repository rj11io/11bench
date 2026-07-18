# Research

This document records what I looked up before designing Ricardo Jorge's CV, why it
matters, and what I changed because of it. All searches ran on **2026-07-16** (today's
date). Where a source gives a range or disagrees with another source, I say so instead
of picking one silently.

A quick note on terms: **ATS** means "applicant tracking system" — the software
companies use to store and filter resumes before a person reads them. A **CV** ("résumé"
in the US) is the document itself. I use "recruiter" for the first human reader and
"hiring manager" for the technical reviewer who reads it more closely later.

## 1. How recruiters actually read a CV

- [Resume Eye-Tracking Study: 6 Fixation Points Recruiters Hit](https://resumeheatmap.com/eye-tracking-study) (accessed 2026-07-16)
- [The 6-Second Resume Scan: Eye-Tracking Data Reveals What Recruiters Actually See](https://a4cv.app/blog/six-second-resume-scan-eye-tracking-reveals-what-recruiters-see/) (accessed 2026-07-16)
- [Eye tracking study shows recruiters look at resumes for 7 seconds — HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/) (accessed 2026-07-16)

**What I found:** A first pass over a new CV lasts roughly 6-11 seconds, and 94% of
recruiters decide whether to keep reading in under 10 seconds. Eyes move in an
"F-pattern" — a decision one study author reached by literally tracking where people's
eyes land: a sweep across the top, a scan down the left edge, a shorter sweep partway
down, and comparatively little attention to the right side or the bottom of the page.
The same research found recruiters linger on a specific line ("Built the IP History
Widget for a threat-intelligence product") over twice as long as a vague one ("Worked
on data visualisation").

**What this changed:** The first screenful has to carry the whole pitch — name, title,
years of experience, and the through-line (frontend/AI product engineer, first-hire
builder) — because a slower, fuller read may never happen. It also means every bullet
needs a concrete noun (a product name, a technology, a team outcome), not a duty
description. I front-loaded the About section with the most specific claims from both
source PDFs and pushed softer personal narrative (gaming and robotics background) into
one short supporting clause instead of its own paragraph.

## 2. Structuring a senior engineer's CV

- [Senior Software Engineer Resume Examples & Templates — Resume.io](https://resume.io/resume-examples/senior-software-engineer) (accessed 2026-07-16)
- [10 Senior Software Engineer Resume Examples — Enhancv](https://enhancv.com/resume-examples/senior-software-engineer/) (accessed 2026-07-16)
- [5 Ways to Distill 20+ Years Experience into a Two-Page Resume — Great Resumes Fast](https://greatresumesfast.com/blog/distill-20-years-experience-into-a-two-page-resume/) (accessed 2026-07-16)
- [Compress a Long Work History to One Resume Page — Resumly](https://www.resumly.ai/blog/how-to-compress-large-work-history-into-one-concise-page) (accessed 2026-07-16)

**What I found:** For someone with roughly a decade of experience, a two-page CV is
acceptable as long as it stays tight and relevant. The advice across sources agrees on
a shape: reverse-chronological order (newest job first), detailed bullets for the last
10-15 years, and older roles folded into a short, bullet-free block that keeps the
title, company, and dates but drops the detail. A senior CV should read as scope
(how big were the systems), judgment (what was decided, not just done), and influence
(what changed on the team) — not a list of duties.

**What this changed:** Ricardo's career runs from 2015 to today — almost exactly the
10-15 year window these sources call the relevant one — so nothing needed to be cut
outright. But it confirmed the shape I already saw working in the shorter of the two
source PDFs: five detailed roles from 2020 onward, and everything from 2015-2019
compressed into a single short block with no bullets. I kept that structure and only
adjusted which specific facts made it into the detailed bullets, favoring named
products (AttackCapture™, HuntSQL™, Coalition Explorer 2.0) and named decisions
(promoted to lead, set the team's "Definition of Done") over generic phrasing.

## 3. Editorial and typographic direction

- [Fontfabric: Top 10 Design & Typography Trends for 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/) (accessed 2026-07-16)
- [The graphic trends you'll want to bookmark for 2026 — It's Nice That](https://www.itsnicethat.com/features/forward-thinking-graphic-trends-2026-graphic-design-120126) (accessed 2026-07-16)
- [Best fonts for resumes: ATS-friendly picks, sizes & pairings — CandyCV](https://www.candycv.com/how-to/best-fonts-for-resumes-ats-friendly-picks-sizes-and-modern-pairings-10) (accessed 2026-07-16)
- [Best Font for a Resume — Indeed](https://www.indeed.com/career-advice/resumes-cover-letters/best-fonts-for-resume) (accessed 2026-07-16)

**What I found:** The 2026 design conversation favors an ordered grid ("Swiss" in
style: a strict column structure, one strong accent, confident use of negative space)
rather than heavy decoration, but current type is described as less rigid than
classic Swiss work — letterforms with more personality within a still-disciplined
structure. On fonts specifically: pick one font family for most of the page and use
its weights (regular, medium, bold) to build hierarchy, or pair exactly two families —
a distinct one for headings and a plain, readable one for body text. Sans-serif reads
better at small sizes on screens; serif is often used for headings to signal
authority without hurting body-text legibility.

**What this changed:** I paired a serif display face for the name and section
headings (which reads as editorial and confident, and only appears a handful of
times, so it costs nothing in body legibility) with the site's existing Inter for all
body text, and the existing monospace face for dates and tags (a small nod to the
candidate's technical identity, used sparingly). For layout, I used a two-column
grid — a narrow left column for facts that don't need sentences (contact, skills,
projects, education) and a wide right column for the parts that need to be read in
order (the About paragraph and the experience history). This is a working structure
recruiter-scanning research also supports: it puts the narrative where the F-pattern's
top-and-left attention already lands, and keeps scannable facts to the side.

## 4. ATS, links, and print/PDF handling

- [Anatomy of an ATS Friendly Resume Format — Jobscan](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/) (accessed 2026-07-16)
- [ATS Resume Format 2026: What Works (and What Doesn't) — Scale](https://scale.jobs/blog/ats-resume-format-2026-design-guide) (accessed 2026-07-16)
- [PDF Techniques — W3C WCAG 2.0](https://www.w3.org/TR/WCAG20-TECHS/pdf) (accessed 2026-07-16)
- [A Guide to WCAG Standards for PDFs — GrackleDocs](https://www.grackledocs.com/en/a-guide-to-wcag-standards-for-pdfs/) (accessed 2026-07-16)
- [Schema.org: Person](https://schema.org/Person) (accessed 2026-07-16)

**What I found:** ATS software struggles with multi-column layouts because it can
read all of one column, then all of the other, splitting a job title from its own
bullets. It also frequently fails on unusual date formats and on any text placed in a
page header/footer, which some parsers skip entirely. Separately, a PDF is only
accessible to screen-reader users if the underlying text is real, selectable text
(not a scanned image) — screen readers cannot read pixels. Adding
`schema.org/Person` structured data to a personal site is a standard, low-cost way to
tell search engines who the page is about.

**What this changed:** Three concrete decisions:
1. The two-column grid is a visual layout, not a document-order one — in the
   underlying HTML, contact information comes first, then About, then Skills, then
   every job in order, so a parser reading source order (rather than visual columns)
   still gets a clean, correctly-sequenced document.
2. All dates use one explicit, unambiguous format ("Mar 2025 - Present") and none of
   the contact information lives in a CSS `::before`/`::after` decoration or a real
   `<header>`/`<footer>` print margin — every fact is in ordinary, selectable body
   text.
3. `window.print()` produces a native browser PDF, which keeps all text real and
   selectable (nothing is rendered as an image), and I added `schema.org/Person`
   structured data with the candidate's name, title, and profile links.

## 5. Print CSS for an exact two-page result

- [CSS print styles: the complete guide for PDF generation — PDF4.dev](https://pdf4.dev/blog/css-print-styles-pdf-guide) (accessed 2026-07-16)
- [page-break — CSS-Tricks](https://css-tricks.com/almanac/properties/p/page-break/) (accessed 2026-07-16)
- [print-color-adjust — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/print-color-adjust) (accessed 2026-07-16)
- [Dark mode on printers — tailwindlabs/tailwindcss discussion](https://github.com/tailwindlabs/tailwindcss/discussions/12628) (accessed 2026-07-16)

**What I found:** `@page { size: A4; margin: 0 }` combined with a fixed-height page
container (and page spacing handled by internal padding instead of the `@page`
margin) is the most reliable way to get an exact, predictable page size, because
mixing both `@page` margin and inner padding makes the usable area harder to reason
about. `break-inside: avoid` stops an entry (a job, a bullet group) splitting across
a page boundary; `break-after: page` forces a clean break where I want one. Browsers
may quietly override light/dark colors on print, so the safest approach is to state
the print colors explicitly (plain black text, white background) rather than relying
on the on-screen theme tokens, which in this codebase can resolve to dark-mode
values.

**What this changed:** I built the print output as its own fixed-size, two-page
layout (independent from the fluid on-screen layout, though both read from the same
content data) with explicit black-on-white colors regardless of the visitor's
system/site theme, one forced page break between page one and two, and
`break-inside: avoid` on every job entry and bullet group so nothing splits awkwardly.
I verified the result by rendering the print stylesheet in the browser at the
printed page's exact pixel dimensions and checking there is no overflow and no third
page.

## Limitation

All of the above came from live web search on 2026-07-16; I did not have to fall back
to prior knowledge for any of it. Search results for "best practice" articles are
themselves marketing content from resume-tooling companies rather than peer-reviewed
studies, so I treated specific numbers (e.g., "6 seconds," "94%") as approximate and
representative of a consistent finding across many sources, not as a single precise
statistic.
