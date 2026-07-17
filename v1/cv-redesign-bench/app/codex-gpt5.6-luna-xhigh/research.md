# Research log

Access date for all web sources: 2026-07-16 (Europe/Lisbon).

## 1. CV structure for a senior AI product / frontend engineer

### Sources

- [Resume Structure and Format, Indeed Career Guide](https://www.indeed.com/career-advice/resume-structure-and-format) - current guidance groups a resume around a clear header, summary, work history, skills, and education, with content tailored to the target role. Accessed 2026-07-16.
- [How To Write an ATS Resume, Indeed Career Guide](https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template) - recommends standard section headings, contextual keywords, a simple layout, and avoiding graphics, tables, columns, and header/footer-only contact details. Accessed 2026-07-16.
- [ATS-Friendly Resume: 18 Tips to Pass Applicant Tracking Systems, Indeed Career Guide](https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume) - advises using exact, honest role language, putting keywords in context, spelling out acronyms once, checking the plain-text reading order, and following the employer's requested file type. Accessed 2026-07-16.
- [The Ladders Eye-Tracking Study](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf) - primary eye-tracking research from 2018, reported as an average 7.4-second initial screen. The study is a useful scanability signal, not a universal law for every hiring process. Accessed 2026-07-16.

### Findings and decisions

- The first page has to establish role, seniority, domain, and relevant keywords immediately. The implementation therefore starts with a visible title, a short profile, capability groups, selected work, and the first two recent roles before the page break.
- Reverse chronology is the most legible default for this candidate because the most relevant work is recent and continuous. Earlier roles remain visible as a compressed timeline rather than disappearing.
- A senior profile benefits more from evidence of scope and ownership than from a long tool inventory. Recent experience gets product context, systems, and leadership evidence; the skills section is grouped to support quick keyword matching.
- The source PDFs contain no verified metrics. Bullets use concrete products, platforms, tools, and scope, but do not add invented percentages, team sizes, users, revenue, or impact numbers.

## 2. Recruiter and hiring-manager scanning behavior

### Sources

- [Why do recruiters spend only 7.4 seconds on resumes?, The Ladders](https://www.theladders.com/career-advice/why-do-recruiters-spend-only-7-4-seconds-on-resumes) - summarizes the eye-tracking study and notes that experienced candidates can justify a second page when the first page is compelling; it also recommends relevant keywords in context. Accessed 2026-07-16.
- [Understanding users: How people read online, Office for National Statistics](https://service-manual.ons.gov.uk/content/writing-for-users/how-people-read-online) - describes F-pattern, layer-cake, and spotted scanning patterns and recommends front-loading important information. Accessed 2026-07-16.
- [How to format your content, Government Commercial Agency style guide](https://www.gca.gov.uk/government-commercial-agency-style-guide/formatting) - connects meaningful headings, short blocks, bullets, and front-loaded headings to scanability and comprehension. Accessed 2026-07-16.

### Findings and decisions

- Scanning behavior rewards strong left-edge anchors: section labels, role titles, employer names, and dates. The visual design uses a narrow editorial rail for section names and a consistent job header with dates aligned to the right.
- A hiring manager needs to distinguish product engineering, frontend architecture, data visualization, AI systems, and team enablement without reading every bullet. The profile and capability labels use that vocabulary directly.
- The two-page format is intentionally asymmetric: page 1 is the pitch and recent work; page 2 is the complete professional record and education. This follows the study's warning that page two depends on page one earning attention.
- The scan study is dated and laboratory-based, so it changed emphasis and hierarchy, not factual claims about how every recruiter behaves.

## 3. Editorial, typographic, information-design, and print direction

### Sources

- [Typography, U.S. Web Design System](https://designsystem.digital.gov/components/typography/) - recommends readable text, flush-left alignment, a 45-90 character measure for most running text, appropriate line-height, meaningful whitespace, and restraint with uppercase. Accessed 2026-07-16.
- [Page Structure Tutorial, W3C Web Accessibility Initiative](https://www.w3.org/WAI/tutorials/page-structure/) - recommends landmarks, meaningful elements, and logically nested headings so users can scan and navigate by structure. Accessed 2026-07-16.
- [How to write accessible web content: headings and structure, Nottinghamshire County Council](https://www.nottinghamshire.gov.uk/global-content/how-to-create-accessible-content/how-to-write-accessible-web-content/headings-and-structure-in-web-content) - explains that headings and lists help people scan, use small screens, and navigate with assistive technology. Accessed 2026-07-16.

### Findings and decisions

- The selected direction is "technical editorial": warm paper, near-black ink, a restrained lime marker, a serif display name, a sans-serif body, mono metadata, and hairline rules. It feels authored and contemporary while retaining the predictable information structure of a professional CV.
- A two-column visual rhythm is used only as a label rail plus content column. The DOM remains sequential, with real headings, paragraphs, lists, articles, and links; there are no tables, charts, images, or decorative icons carrying meaning.
- On screen, the paper is centered on a deep ink canvas and becomes a single column at small widths. The print stylesheet removes the canvas, accent fills, shadows, controls, and dark-mode dependency so the output is black-on-white.
- Body text is 16px on screen for comfortable reading and around 8.5–9.1pt in print, with compact but non-condensed line-height to fit the requested two pages. The content is edited before typography is compressed.

## 4. ATS, accessibility, link, and PDF considerations

### Sources

- [Web Content Accessibility Guidelines (WCAG) 2.2, W3C](https://www.w3.org/TR/WCAG22/) - provides the relevant requirements for contrast, text resizing, semantic relationships, focus visibility, headings, link purpose, and meaningful sequence. Accessed 2026-07-16.
- [PDF Accessibility: Defining PDF Accessibility, WebAIM](https://webaim.org/techniques/acrobat/) - explains that a PDF has visual, content, and tags layers; tagged headings, links, lists, and reading order matter for assistive technology and reflow. Accessed 2026-07-16.
- [PDF Accessibility: Reviewing and Repairing Accessibility in Acrobat, WebAIM](https://webaim.org/techniques/acrobat/reviewing) - emphasizes heading structure, reading order, and correctly tagged list and link content. Accessed 2026-07-16.
- [@page CSS at-rule, MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page) and [Printing, MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing) - document A4 page sizing, print media styles, `window.print()`, and deliberate `break-after: page` usage. Accessed 2026-07-16.

### Findings and decisions

- The page uses common section names: Profile, Capabilities, Selected work, Experience, Earlier experience, and Education. Skills appear in context in experience rather than as a keyword wall.
- Contact information is in the document body, not only a header/footer. URLs are visible as text and are also real anchors with meaningful labels; the email uses a `mailto:` link.
- The HTML uses one `h1`, nested `h2` section headings, `h3` job titles, `main`, `header`, `section`, `article`, `ul`, and `footer`. The print version is generated from the same live text rather than a screenshot or canvas.
- Link underlines remain visible. Ink and muted text colors are chosen for high contrast on the screen, with print forcing `#111111` and `#ffffff`.
- `:focus-visible` is explicit, the print button has an accessible name, the skip link is keyboard-visible, and there is no motion that is required to understand the content.
- The stylesheet sets `@page { size: A4 portrait; margin: 0; }`, makes each of two page sections exactly one A4 page, and uses `break-after: page` only between them. A browser PDF pass will verify page count, dimensions, and visual overflow.

## Research boundary

This research supports hierarchy, scanability, semantics, and print mechanics. It does not claim that a particular visual style guarantees hiring outcomes, that all ATS products parse layouts identically, or that the 2018 Ladders sample represents every current recruiter workflow.
