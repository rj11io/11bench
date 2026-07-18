# research.md — CV redesign for a senior AI product / frontend engineer

All sources accessed **2026-07-16**. Where web research below is summarized, it
reflects current (2025–2026) recruiter and design guidance. I did not copy any
other candidate implementation.

## 1. CV structure for a senior AI product / frontend engineer

**Findings**

- The first pass is a fit / no-fit gate of roughly 6–11 seconds. Roughly 80% of
  that time lands on six things: name, current title + company, previous title +
  company, the dates for both, and education. Everything else is read only if
  the top third earns it.
- Reverse-chronological order is still the default for an experienced engineer.
  It answers the recruiter's real question — "what are you doing now and who
  trusted you with it?" — fastest.
- A short summary at the very top (title + specialism + years) is prime real
  estate. Bury it and the scan misses it.
- Bullets should lead with a strong verb (Built, Led, Introduced) and state a
  concrete outcome, not "responsible for".

**Decisions changed**

- Header carries name, title, location, and all contact links in the first ~3cm
  so the six scan-targets are all above the fold.
- Experience is reverse-chronological. The five most recent roles get bullets;
  seven older roles collapse into one "Earlier" line so the scan is not diluted.
- The About block was cut from ~8 paragraphs (extended PDF) to 3 tight ones so
  the summary is readable in the 6-second window.

Sources:
- [The 6-second scan: 2026 resume filter — College Recruiter](https://www.collegerecruiter.com/blog/2026/03/06/the-6-second-scan-how-to-pass-the-2026-resume-filter)
- [The 6-Second Rule: What the research shows — Careerflow](https://www.careerflow.ai/blog/6-second-rule-resume)
- [2026 resumes: what employers look for — Indeed Flex](https://indeedflex.com/blog/for-flexers/2026-resumes-what-employers-look-for/)

## 2. Recruiter / hiring-manager scanning behavior

**Findings**

- Eye-tracking shows an F-shaped scan, not top-to-bottom reading. The left edge
  and the first words of each line carry the load.
- Consistent heading sizes and clear section boundaries let the eye jump between
  sections. Creative or inconsistent headers slow this down.
- White space reads as confident and premium; it is invisible to parsers, so it
  costs nothing to spend.

**Decisions changed**

- A fixed left label rail (ABOUT, SKILLS, EXPERIENCE …) gives the F-scan a stable
  left anchor. Role title and dates sit on the same line so title, company, and
  dates are all catchable in one horizontal sweep.
- Section headings share one size and weight; only the name is larger.

Sources:
- [Recruiters Scan Your Resume in 6 Seconds — Leon Consulting](https://leonstaff.com/blogs/recruiter-resume-6-second-scan/)
- [11 Things Recruiters Look For in a 6-Second Scan — CareerKit](https://www.careerkit.me/blog/11-things-recruiters-look-for-6-second-resume-scan-2026)

## 3. Editorial, typographic, and information-design direction

**Findings**

- 2026 CV design leans "editorial yet professional": a serif or display face for
  the name / headings, a humanist sans for the body, and typography that guides
  rather than decorates.
- If a serif is used, restrict it to headings; body stays sans for screen
  readability. Georgia / Cambria / Garamond are safe serifs on screen.
- Size hierarchy: ~10–11pt body, 12–14pt headings, 16–18pt name. One or two
  fonts total.

**Decisions changed**

- Three-voice type system: a serif (Georgia stack) for the name and role titles
  (editorial signal), Inter for body (screen + parser safe), and the mono face
  already loaded by the app for meta labels and dates (rail labels, date ranges,
  links) — echoing the source PDF's own restrained mono accents.
- One restrained accent color; the rest is near-black on white.

Sources:
- [CV Design 2026: Typography & Layout — NeuraCV](https://neuracv.com/resources/blog/the-ultimate-guide-to-elevating-your-cv-design-in-2026)
- [Best Resume Fonts for 2026 — StylingCV](https://stylingcv.com/blog/best-resume-fonts-2026-professional-typography-guide/)
- [Typography Trends in Resume Design 2026 — Resumee](https://myresumee.com/blog/bzg-typography-trends-in-resume-design-for-2026)

## 4. ATS, accessibility, links, and PDF

**Findings**

- Single-column, text-selectable layout parses most reliably. Multi-column
  layouts, tables, and text-in-graphics scramble or drop content.
- Standard section headers (Experience, Skills, Education) help the parser find
  boundaries. System / common fonts are safest.
- Real, text-based links (not image buttons) stay clickable and legible; in
  print they must remain readable, so print the URL, not just a colored word.
- For print color fidelity: `@page { size: A4 }`, `print-color-adjust: exact`,
  `break-inside: avoid` on blocks, and a forced black-on-white palette so a
  dark-mode screen still prints legibly.

**Decisions changed**

- The layout is a single semantic column. The left label rail is one CSS grid
  column of the same flow — it reads top-to-bottom as label → content, so linear
  text extraction stays in order.
- Section headers use plain words. The name is a real `<h1>`; roles are `<h3>`.
- Contact and project links show their human-readable URL as the link text, so
  they survive both ATS extraction and grayscale print.
- Print CSS: A4 `@page`, forced light palette, `print-color-adjust: exact`,
  `break-inside: avoid` on every role and section, an explicit page break before
  the Experience section so page 2 starts clean, and all screen-only controls
  hidden.

Sources:
- [Anatomy of an ATS-Friendly Resume Format (2026) — Jobscan](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/)
- [PDF vs DOCX for Resumes 2026 — Resumemate](https://www.resumemate.io/blog/pdf-vs-docx-for-resumes-in-2025-what-recruiters-ats-really-prefer/)
- [@page size descriptor — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page/size)
- [Building a printable A4 resume — DEV](https://dev.to/coopercodes/building-an-a4-resume-to-add-to-your-website-and-making-it-printable-1la8)

## 5. Note on limitations

Web search was available and used. Findings are paraphrased, not quoted at
length. The design decisions above are mine; sources informed them but no
external template was reproduced.
