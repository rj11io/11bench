# Research

Access date for all web sources: 2026-07-16

## What I looked for

- Effective CV structure for a senior AI product/frontend engineer.
- How recruiters and hiring managers actually scan resumes.
- Contemporary typography, editorial hierarchy, and print layout guidance.
- ATS, accessibility, link, and PDF requirements that affect a web CV and its print output.

## Sources and findings

### 1. Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant"
- URL: <https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/>
- Finding: Readers scan top-heavy and left-heavy content first. The first words in a block and the left edge get the most attention.
- Decision changed: The CV now starts with name, title, and direct contact links, then uses a left-anchored section label column to support fast scanning.

### 2. Indeed, "How Long Do Hiring Managers Look at a Resume?"
- URL: <https://www.indeed.com/career-advice/resumes-cover-letters/how-long-do-employers-look-at-resumes>
- Finding: Employers may spend only seconds on an initial pass; Indeed cites an average of 7.4 seconds from a 2018 Ladders study.
- Decision changed: I compressed the long-form narrative and moved the strongest signals to the top of page 1.

### 3. Indeed, "How to Read an Applicant Resume: Resume Review Tips"
- URL: <https://www.indeed.com/hire/c/info/how-to-read-a-resume>
- Finding: Reviewers start with a quick scan, then inspect skills, qualifications, employment, and dates.
- Decision changed: Skills, current role, and date ranges are displayed in a compact, standardized way. I kept date formats consistent as `Month YYYY - Month YYYY`.

### 4. Greenhouse, "What is an applicant tracking system (ATS)?"
- URL: <https://www.greenhouse.com/resources/glossary/what-is-an-applicant-tracking-system-ats>
- Finding: An ATS is a shared workspace used by recruiting teams to manage applications and hiring data.
- Decision changed: I avoided decorative information architecture that would make the CV harder to parse by humans and by text-extraction tools.

### 5. W3C WAI, "How to Meet WCAG (Quick Reference)"
- URL: <https://www.w3.org/WAI/WCAG22/quickref/>
- Finding: WCAG techniques for PDFs cover headings, links, reading order, and consistent page numbering.
- Decision changed: The route uses native headings, lists, and link elements rather than simulated text blocks.

### 6. Adobe Help Center, "Create and verify PDF accessibility, Acrobat Pro"
- URL: <https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html>
- Finding: Accessible PDF links should be active and correctly tagged; tagging helps preserve structure and reading order.
- Decision changed: All contact items and public URLs are real anchor links with visible text.

### 7. W3C WAI, "Understanding Success Criterion 1.4.3: Contrast (Minimum)"
- URL: <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- Finding: Contrast matters more for normal-sized text than for large text, and larger text can be lower contrast while remaining readable.
- Decision changed: Screen accents are restrained, while print is forced to black-on-white for maximum legibility.

### 8. Material Design 3, "Typography - Applying type"
- URL: <https://m3.material.io/styles/typography/applying-type>
- Finding: A clear typographic hierarchy improves readability and scanability.
- Decision changed: The design uses a strong hierarchy: display name, italic title, compact section labels, and regular-weight body copy.

### 9. Material Design 2, "Understanding layout"
- URL: <https://m2.material.io/design/layout/understanding-layout.html>
- Finding: Readable text blocks benefit from an ideal line length of about 40-60 characters.
- Decision changed: The main content column stays relatively narrow on desktop print pages, with generous margins and a left rail for labels.

### 10. Butterick's Practical Typography, "Court opinions"
- URL: <https://practicaltypography.com/court-opinions.html>
- Finding: Better page margins, readable body fonts, and spacing over heavy decoration improve dense reading material.
- Decision changed: I chose a restrained editorial layout with whitespace, thin rules, and minimal visual chrome instead of a flashy CV template.

## Synthesis

- Use a hybrid structure: concise summary, skills, selected public work, then reverse-chronological experience.
- Keep the print version visually editorial, but structurally boring enough for ATS and fast human scanning.
- Avoid tables and icons that hide meaning. Use real links, headings, lists, and explicit date formats.
- Make the screen version feel intentional, but make the print version materially simpler: monochrome, black text, no controls, no shadows, no dark-mode inversion.
- Design the route as two explicit A4 pages so the print output is deterministic rather than dependent on browser pagination heuristics.
