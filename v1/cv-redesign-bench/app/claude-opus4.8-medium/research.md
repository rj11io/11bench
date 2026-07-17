# Research

Research supporting the redesign of Ricardo Jorge's CV as a one-route website
plus an exact two-page A4 print version. Target profile: **senior AI product /
frontend engineer**, ~10 years' experience, freelance/B2B, remote.

All sources accessed **2026-07-16**. Web search was available. Where a claim
below drives a design or content decision, the decision is stated in
*Decision:* lines.

---

## 1. Effective CV structure for a senior AI product / frontend engineer

**What the sources say**

- Recruiters at senior level no longer screen for raw coding ability; they look
  for evidence of **autonomy, good technical decisions at scale, and raising the
  level of the team**. The work-experience section carries the most weight —
  it's where impact, scope, and progression show up.
  ([Resume Worded — Senior Software Engineer Resume Examples](https://resumeworded.com/senior-software-engineer-resume-example),
  [Tech Interview Handbook — Resume guide](https://www.techinterviewhandbook.org/resume/))
- A **hybrid** structure works best: a short summary, a technical-skills block,
  then reverse-chronological experience, then education. Show **depth over
  breadth** — lead with the strongest stack and how it was used to build, scale,
  or maintain production systems.
  ([Resume Worded](https://resumeworded.com/senior-software-engineer-resume-example),
  [Leland — Software Engineer Resume guide](https://www.joinleland.com/library/a/how-to-craft-an-effective-software-engineering-resume))
- Two pages is acceptable and normal for senior/specialised profiles with
  extensive project work; the average resume is already ~1.6 pages.
  ([Resume.io — Senior Software Engineer examples](https://resume.io/resume-examples/senior-software-engineer),
  [Jobscan — ATS anatomy](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/))
- Include a GitHub / portfolio link with a short description of what's there.
  ([Resume Worded](https://resumeworded.com/senior-software-engineer-resume-example))

**Decisions**

- Order: **Header → Summary → Skills → Experience → Projects → Education**, with
  experience given the most vertical space. This is the section order the
  content model and layout both follow.
- Lead the summary with tenure and the "first frontend hire → built and grew the
  team" story, because that is the senior-signal (autonomy + leadership) the
  sources say matters most.
- Keep the two source PDFs' *fun facts* (robotics world cup, game modding) but
  demote them — they are personality/differentiator, not senior-signal, so they
  get a compact treatment, not prime real estate.

---

## 2. Recruiter & hiring-manager scanning behaviour

**What the sources say**

- Eye-tracking research puts the **initial scan at roughly 6–11 seconds** before
  a keep/pass decision (TheLadders 2018: ~7.4s; later data 6s unaided, ~11s with
  AI-assisted tools). Resumes that pass the first screen then get ~67 seconds of
  real reading; quick rejections average ~5 seconds.
  ([TheLadders eye-tracking study 2018 (PDF)](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf),
  [HR Dive summary](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/),
  [InterviewPal data study](https://www.interviewpal.com/blog/how-long-recruiters-actually-spend-reading-your-resume-data-study))
- Recruiters fixate on name/title, current company and title, and dates first;
  they spend **~0.9s on vague bullets vs ~2.1s on specific ones** — specificity
  literally buys attention.
  ([A4CV — six-second scan](https://a4cv.app/blog/six-second-resume-scan-eye-tracking-reveals-what-recruiters-see/),
  [Wonsulting — hidden eye tracker](https://www.wonsulting.com/job-search-hub/hidden-eye-tracker-how-recruiters-actually-read-resumes))

**Decisions**

- Design a strong **F-pattern anchor**: name + title + location + contact must
  resolve in the top band; each experience entry leads with **title, company,
  dates** in a fixed, high-contrast slot.
- Put the most important content — the senior story and the current AI role —
  **on page one**, since page two may not be read (also echoed by Butterick).
- Front-load bullets with the concrete artifact ("Built AttackCapture™ and
  HuntSQL™…") rather than soft framing, to win the 2.1s-vs-0.9s fixation.
- Every date/company gets a consistent, glanceable slot rather than being buried
  mid-sentence — directly addresses what the eye lands on first.

---

## 3. Editorial, typographic, and information-design direction

**What the sources say**

- The modern resume is **converging on the modernist ideal**: less ornament,
  more typographic discipline, more white space, one restrained accent colour.
  A single strong column with clear hierarchy "reads as current, not dated."
  ([NeuraCV — CV design 2026](https://neuracv.com/resources/blog/the-ultimate-guide-to-elevating-your-cv-design-in-2026),
  [Resume Optimizer Pro — modern templates](https://resumeoptimizerpro.com/blog/modern-resume-template))
- Hierarchy comes from **contrast in size, weight, and style** — headings only
  slightly larger than body, job titles bolder than dates; establish the **grid
  first** to keep decisions consistent.
  ([Toptal — Typographic hierarchy](https://www.toptal.com/designers/typography/typographic-hierarchy),
  [Fiveable — Editorial design: hierarchy & layout](https://fiveable.me/editorial-design/unit-4/typographic-hierarchy-layout/study-guide/y0WHJN3IP46bMTIu))
- Butterick's *Practical Typography*: **wider margins, shorter line length**,
  professional typefaces over system fonts, **scale headings down** so substance
  (employer/school names) is what's immediately visible, and keep the most
  important content on page one. Good typography survives as PDF.
  ([Butterick — Résumés](https://practicaltypography.com/resumes.html))

**Decisions**

- Visual direction: **editorial / modernist**. One accent colour, generous
  margins, restrained rules, a clear baseline rhythm. No decorative sidebars.
- Type: pair a refined **serif for the name and section headers** (editorial
  voice) with a clean **sans for body**, plus a **mono** for metadata (dates,
  URLs, tags) to give the "engineer" register. This maps the three registers of
  the person: editorial (voice), sans (substance), mono (technical).
- Headings scaled *down* and set in small-caps/tracked labels rather than large
  bold blocks — hierarchy through weight/tracking/colour, not size, per
  Butterick and Toptal.
- Establish an explicit grid: a **label / content two-track grid** on desktop
  (section label in a narrow left rail, content in the main column) collapsing to
  a single stacked column on mobile and in print.

---

## 4. ATS, accessibility, links, and PDF considerations

**What the sources say**

- ATS: **single-column, standard section headings** ("Professional Summary",
  "Work Experience", "Skills"), no multi-column/table/text-box layouts (they
  scramble parsing), **contact details in the body not the header/footer**
  (~25% of systems miss header contact info), web-safe fonts 10–12pt body /
  14–16pt headings, quantify achievements. Two pages is not penalised.
  ([Jobscan — ATS anatomy](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/),
  [scale.jobs — 10 ATS tips 2025](https://scale.jobs/blog/10-tips-for-ats-friendly-resumes-in-2025),
  [Pitt Career Central — ATS tips](https://careercentral.pitt.edu/blog/2025/02/12/resume-and-cv-writing-tips-applicant-tracking-systems-ats/))
- Left-sidebar "modern" templates are **modern to the eye, broken to the
  parser** — a recurring warning.
  ([NeuraCV](https://neuracv.com/resources/blog/the-ultimate-guide-to-elevating-your-cv-design-in-2026))
- Accessibility (WCAG 2.1 AA): **4.5:1** contrast for normal text, **3:1** for
  large text and UI components; keep **underlines on links** or provide a
  non-colour cue plus 3:1 link/body contrast and a visible focus state; link
  text must be descriptive (never "click here"); reading order must match visual
  order for screen readers.
  ([WebAIM — Contrast & color](https://webaim.org/articles/contrast/),
  [MDN — Color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast))
- Print CSS: define `@page { size: A4; margin: … }`; use `@media print` to hide
  screen-only UI; control flow with `break-before/after: page` and
  `break-inside: avoid` on entries so blocks don't split; test with real
  content. Black-on-white PDF is bullet-proof and prints regardless of paper.
  ([DocuSeal — CSS print styling](https://www.docuseal.com/blog/css-print-page-style),
  [dev.to — Avoiding awkward element breaks](https://dev.to/amruthpillai/avoiding-awkward-element-breaks-in-print-html-5goe),
  [Butterick](https://practicaltypography.com/resumes.html))

**Decisions**

- The *print* layout is a **single linear column, black-on-white**, standard
  headings, contact links in the body — ATS-safe and parser-safe even though the
  on-screen layout uses a decorative left rail. The visual two-track rail is a
  screen affordance only; print collapses to one column.
- Links: always underlined on screen and in print, with a visible focus ring and
  descriptive text; print shows the human label and (where useful) the bare
  domain so a paper copy stays actionable.
- Contrast: primary text uses the theme's near-black on white; the one accent is
  chosen/used only where it clears 4.5:1 (or reserved for large text / non-text
  cues). Muted metadata still clears AA against its background.
- Print strategy: `@page { size: A4 }`, explicit forced break between the two
  pages, `break-inside: avoid` on every experience/project entry, all
  screen-only controls (Download button, theme affordances) hidden via
  `@media print`. Force black-on-white regardless of dark mode.

---

## Cross-cutting decisions this research changed

1. **Two visual modes, one content source.** Screen gets an editorial two-track
   layout; print collapses to a single ATS-safe column. Both render from the
   same content model — the research on parser failures made the collapse
   non-negotiable rather than cosmetic.
2. **Page-one triage.** Summary + skills + the two most recent roles live on
   print page one; older roles, projects, and education flow to page two. Driven
   by the "may not reach page two" + "6-second scan" findings.
3. **Hierarchy by weight/tracking/colour, not size.** Section labels are small,
   tracked, and coloured rather than large — Butterick + Toptal.
4. **Specific-first bullets.** Rewrites lead with the concrete built artifact,
   because specificity measurably increases fixation time.
5. **No invented metrics.** The sources push "quantify achievements", but the
   source PDFs contain almost no numbers. Rather than fabricate metrics (a hard
   rule and an integrity risk), impact is conveyed through **scope and
   ownership** language ("first frontend hire", "built and grew the team", named
   shipped systems) — the senior-signal the same sources value.
