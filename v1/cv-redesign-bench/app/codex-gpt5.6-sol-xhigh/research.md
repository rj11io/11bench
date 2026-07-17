# CV redesign research

Research date: 2026-07-16  
Candidate target: senior AI product engineer / frontend product engineer  
Deliverables affected: responsive HTML CV and exactly two A4 print pages

## Research method and limits

I reviewed current guidance from hiring platforms, career-services teams,
accessibility standards, design systems, and browser documentation. The source
PDFs remain the only evidence for the candidate's history; web research was
used only to decide structure, writing, hierarchy, accessibility, and print
execution.

The well-known recruiter "7.4 seconds" figure comes from a vendor-run 2018
study rather than a peer-reviewed hiring study. I use it as directional
evidence for fast scanning, not as a universal or current timing guarantee.

## Sources and decisions

### 1. Harvard Business School Alumni — “Resumes & Cover Letters”

- URL: https://www.alumni.hbs.edu/careers/job-search/Pages/resumes-and-cover-letters.aspx
- Accessed: 2026-07-16
- Finding: A resume should be succinct, targeted to the employer's needs, and
  show prior evidence of value. HBS recommends chronological structure when a
  candidate has a consistent record that shows progression; parallel
  construction and action-led phrases improve readability.
- Decision changed: Use reverse chronology because Ricardo's history shows a
  legible progression from developer to frontend lead to product/AI engineer.
  Keep action-led bullets and remove the extended PDF's narrative repetition.

### 2. Harvard FAS Mignone Center — “Harvard Griffin GSAS Master’s Resume &
Cover Letter Guide”

- URL: https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/08/MASTERS-RESUME-COVER-LETTER-GUIDE.pdf
- Accessed: 2026-07-16
- Finding: A resume is a brief, informative summary that highlights the
  strongest assets and should be tailored to the skills valued by the target
  role.
- Decision changed: Lead with the combined AI product + frontend platform
  proposition. Projects, selected skills, and current work precede older
  experience. Do not give equal space to every technology or job.

### 3. LinkedIn Talent Blog — “Why It’s Important to List Skills on Your
LinkedIn Profile”

- URL: https://www.linkedin.com/business/talent/blog/talent-acquisition/skills-on-linkedin-profile
- Accessed: 2026-07-16
- Finding: LinkedIn reports that skills are increasingly part of hiring and
  matching, while hiring teams also want context for how a skill was used.
  Specific skills are more differentiating than broad umbrella labels.
- Decision changed: Keep a compact skills index for matching, but reinforce
  important skills inside experience bullets (Next.js at Hunt, React and
  TypeScript at OMEGA and BinaryEdge, Playwright/GitHub Actions/Vercel at Hunt
  and Phantasma).

### 4. The Ladders — “Eye-Tracking Study” and “Why do recruiters spend only
7.4 seconds on resumes?”

- URLs:
  - https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf
  - https://www.theladders.com/career-advice/why-do-recruiters-spend-only-7-4-seconds-on-resumes
- Accessed: 2026-07-16
- Finding: In the study, top-performing resumes used clear section headings,
  prominent job titles, short accomplishment statements, simple fonts, and
  whitespace. Recruiters scanned job titles heavily. The report also supports
  two pages for experienced candidates when page one earns attention.
- Decision changed: Put title, employer, and dates on a consistent first line;
  use short bullets; give page one the current proposition and most recent
  work; make page two an intentional continuation rather than overflow.

### 5. U.S. Web Design System — “Typography”

- URL: https://designsystem.digital.gov/components/typography/
- Accessed: 2026-07-16
- Finding: Flush-left type gives readers a stable starting point. Readable
  measure is generally 45–90 characters; hierarchy depends on both
  microtypography and macrotypography. Neutral sans-serif faces work well for
  interfaces, headings should sit closer to the content they introduce, and
  small uppercase text benefits from extra letterspacing.
- Decision changed: Use the existing Inter face for legible body copy, Geist
  Mono only for labels/metadata, a constrained reading measure, flush-left
  alignment, and spacing that visibly binds headings to their sections.

### 6. Carbon Design System — “Typography: style strategies”

- URL: https://carbondesignsystem.com/elements/typography/style-strategies/
- Accessed: 2026-07-16
- Finding: Carbon distinguishes productive typography for dense product use
  from expressive typography for editorial pages, and recommends juxtaposing
  the two to establish hierarchy.
- Decision changed: The visual direction mixes an expressive oversized name
  with compact, productive experience typography. The result should feel like
  an engineered editorial dossier rather than either a generic ATS template or
  a marketing landing page.

### 7. Greenhouse Support — “Supported formats for resumes, cover letters and
other candidate uploads”

- URL: https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads
- Accessed: 2026-07-16
- Finding: Greenhouse accepts PDF, DOC, DOCX, RTF, and TXT candidate uploads
  (article updated 2025-10-27). PDF is therefore a normal ATS input, but the
  content still needs to be extractable and logically ordered.
- Decision changed: Deliver selectable HTML-derived PDF text, not a flattened
  image. Keep one semantic reading order and conventional section labels. Do
  not use charts, skill bars, canvas text, or layout tables.

### 8. W3C — WCAG 2.2, “Headings,” and “Link Purpose (In Context)”

- URLs:
  - https://www.w3.org/TR/WCAG22/
  - https://www.w3.org/WAI/tutorials/page-structure/headings/
  - https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- Accessed: 2026-07-16
- Finding: WCAG 2.2 requires at least 4.5:1 contrast for normal text, supports
  reflow without two-dimensional scrolling at narrow widths, and expects
  descriptive headings and links whose purpose is understandable in context.
- Decision changed: Use semantic `h1`/`h2`/`h3`, visible underlined links,
  keyboard focus styles, descriptive accessible names, and a mobile layout
  that collapses to one column well above 320 px. Color never carries meaning
  on its own.

### 9. Adobe Acrobat — “Creating accessible PDFs in Adobe Acrobat”

- URL: https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html
- Accessed: 2026-07-16
- Finding: PDF accessibility depends on tags, logical source reading order,
  headings, and correctly preserved links. Adobe warns that complex columns
  and irregular alignment can cause incorrect automated reading order.
- Decision changed: Source order matches visual order. The small label gutter
  never contains parallel body content, every URL is a real anchor, and the
  PDF is generated from semantic HTML. Browser-generated tagging is checked
  where tooling exposes it, while the HTML remains the accessible primary
  version.

### 10. MDN — “Printing” and `break-after`

- URLs:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-after
- Accessed: 2026-07-16
- Finding: `@media print` can replace screen styling, `@page` controls paper
  size/margins, and break properties control deliberate page boundaries.
- Decision changed: Build two explicit page containers sized to A4, set
  `@page { size: A4; margin: 0; }`, force a break after page one, hide the
  download control, and replace all dark-mode colors with black-on-white.

## Synthesized content strategy

1. **Identify the candidate in one scan.** Name, “AI Product Engineer,” Lisbon,
   contact links, and the 10+ year TypeScript / React / Next.js progression sit
   at the top.
2. **Show the hybrid, not two competing identities.** AI systems are the
   current layer; frontend architecture, data products, delivery, and team
   enablement are the durable foundation.
3. **Make evidence chronological and contextual.** Skills appear both in a
   concise index and in the roles where they were applied.
4. **Give recent work disproportionate space.** rj11io, Hunt, OMEGA,
   Phantasma, and BinaryEdge carry the strongest evidence for the target.
5. **Compress rather than erase the foundation.** 2015–2019 roles remain as a
   compact progression block. They establish the claimed decade of experience
   without displacing current work.
6. **Retain one memorable human signal.** The robotics result and early
   game-modding origin are concise, sourced differentiators; the longer gaming
   leadership story is omitted.

## Visual direction selected

The chosen direction is a **technical editorial dossier**:

- an oversized, expressive name for immediate identity;
- neutral, compact body typography for dense evidence;
- monospaced labels and dates as “system metadata”;
- a strict left label gutter that creates a repeatable scan rail without
  introducing a competing reading column;
- warm paper and signal-orange accents on screen;
- pure black, gray, and white in print.

This direction is contemporary without depending on fashion effects, works
with a senior technical profile, exposes hierarchy under fast scanning, and
degrades safely to semantic text for ATS and assistive technology.
