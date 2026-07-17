# Research notes

Accessed 16 July 2026. Research was conducted before content selection and
implementation. Sources were chosen for direct hiring guidance, documented
recruiter behaviour, accessibility standards, browser print behaviour, and
current type/design practice.

## Structure and writing

### UC Berkeley Career Engagement — “Resumes”

- URL: https://www.career.berkeley.edu/prepare-for-success/resumes/
- Finding: accomplishments should demonstrate skills an employer is seeking.
  Berkeley also recommends standard section titles and a conventional
  title/company/date work-history pattern for ATS compatibility.
- Decision changed: use the familiar labels **Profile**, **Experience**,
  **Selected projects**, **Capabilities**, and **Education**. Lead each role
  with the product or system built, then the ownership or technical evidence.

### UC Berkeley School of Information — “Resume Basics”

- URL: https://www.ischool.berkeley.edu/careers/guides/resume
- Finding: a short professional profile is useful as a snapshot of expertise;
  bullets should be accomplishment-driven; PDF is an appropriate delivery
  format.
- Decision changed: replace the long autobiographical “About me” with a
  three-sentence positioning statement. Preserve the personality/story only as
  a compact “signal” note, subordinate to professional evidence.

### Harvard Extension School — “How to Write a Great Resume and Cover Letter”

- URL: https://extension.harvard.edu/blog/how-to-write-a-great-resume-and-cover-letter/
- Finding: one to two pages featuring the strongest accomplishments works well.
- Decision changed: make the two-page limit an editorial constraint, not a
  reason to shrink everything. Recent and relevant work receives detail; four
  early roles become a compact career foundation.

### Harvard Business School Alumni — “Resumes & Cover Letters”

- URL: https://www.alumni.hbs.edu/careers/job-search/Pages/resumes-and-cover-letters.aspx
- Finding: skills should be supported by proof in experience, and parallel
  action-led construction improves readability.
- Decision changed: capability labels are mirrored by concrete experience:
  design systems, data visualisation, first-frontend-hire ownership, CI/CD, and
  team leadership all have evidence in role bullets.

## Scanning behaviour

### The Ladders — “Eye-Tracking Study”

- URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf
- Finding: the study reports a very short initial screen and concentrated
  attention on name, current/recent roles, dates, and education. Its sample and
  vendor origin mean the exact timing should not be treated as universal, but
  the directional lesson—make core facts immediately scannable—is useful.
- Decision changed: name, positioning, location/contact, recent chronology,
  employers, and dates form the strongest visual spine. Dates occupy a
  consistent right edge on desktop and print.

### Nielsen Norman Group — “Designing Websites to Maximize Press Relations”

- URL: https://media.nngroup.com/media/reports/free/PR_on_Websites_3rd_Edition.pdf
- Finding: people scan web content; headings, bold text, bullets, and concise
  language help them locate information.
- Decision changed: short section labels, compact bullets, meaningful bold
  leads, and generous sectional boundaries replace long prose and undifferentiated
  skill strings.

## Contemporary editorial and typographic direction

### Monotype — “2025 Type Trends Report: Re:Vision”

- URL: https://www.monotype.com/company/press-release/monotype-2025-type-trends-report
- Finding: current typography is being used as a primary carrier of identity in
  response to rapid technological change, rather than as neutral decoration.
- Decision changed: let typography and spacing carry the identity. The display
  serif gives the AI profile warmth and authorship; the sans-serif body and
  monospace metadata keep it technical. No portrait, skill bars, charts, or
  ornamental illustration.

### Adobe Express — “Graphic design trends for 2025”

- URL: https://www.adobe.com/express/learn/blog/design-trends-2025
- Finding: bold typography paired with stripped-back, simple compositions was a
  prominent direction.
- Decision changed: use one oversized name, a small lime signal, and a quiet
  modular grid. Distinctiveness comes from scale and composition, not visual
  clutter.

### Material Design — “Lists: scaling and adaptation”

- URL: https://m2.material.io/components/lists/web
- Finding: avoid excessively long lines; adapt margins or columns as containers
  expand, with roughly 40–60 characters often comfortable for reading.
- Decision changed: desktop copy is constrained inside an A4-proportioned sheet
  rather than allowed to span the viewport. Mobile collapses to one column and
  allows natural page height.

## ATS, accessibility, links, and PDF

### Greenhouse Support — “Unsuccessful resume parse”

- URL: https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse
- Finding: contact details in headers, footers, or text boxes can be parsed
  incorrectly.
- Decision changed: contact details are ordinary semantic HTML near the top of
  the document. The design uses CSS Grid, but the DOM itself is a linear,
  meaningful reading order with no text embedded in images or pseudo-elements.

### W3C WAI — “Writing for Web Accessibility”

- URL: https://www.w3.org/WAI/tips/writing/
- Finding: informative page titles, structural headings, meaningful link text,
  and clear concise writing improve accessibility.
- Decision changed: use one `h1`, descriptive `h2` section headings, native
  lists, and links whose visible/accessibility names identify their destination.

### W3C — “Web Content Accessibility Guidelines (WCAG) 2.2”

- URL: https://www.w3.org/TR/WCAG22/
- Finding: normal text requires at least 4.5:1 contrast at Level AA, content must
  survive text resizing, and information should not rely on colour alone.
- Decision changed: all body text exceeds AA contrast in both themes; links are
  underlined in addition to colour; the mobile layout reflows without horizontal
  scrolling; reduced-motion preferences are respected.

### MDN — “Printing” and “@page size”

- URLs:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size
- Finding: `@media print` can remove screen-only UI and restyle a document;
  `@page` controls physical page size and margins, including `size: A4`.
- Decision changed: render two explicit sheet elements, each exactly 210 ×
  297 mm in print, set `@page { size: A4; margin: 0 }`, force black-on-white,
  hide the download control, and place the break between sheets rather than
  relying on automatic pagination.

## Resulting research position

The CV should first answer, in seconds: who is this, what level are they, what
do they build, and where is the evidence? It should then reward a slower read
with clear product context and technical ownership. The web edition may signal
product-design taste, but the print edition must behave like a robust,
selectable-text professional document. The chosen design therefore combines a
strong editorial cover hierarchy with conservative work-history semantics.
