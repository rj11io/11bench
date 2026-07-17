# CV redesign research

Accessed: 2026-07-16

## Research frame

The target reader is a recruiter or hiring manager assessing a senior AI product/frontend engineer. The artifact also has to work as a responsive web page, survive printing to exactly two A4 pages, and remain useful when its PDF text is extracted or read with assistive technology.

## Sources, findings, and decisions

### Structure and senior-level content

1. **Stanford Graduate School of Business — “Resumes & Cover Letters”**  
   URL: https://www.gsb.stanford.edu/alumni/career-resources/job-search/resumes  
   Finding: A resume is a targeted marketing document, not a biography. Stanford recommends that experienced professionals lead with their professional story, place education after experience, and use a summary to communicate a core brand and competencies. It also recommends repeating the name on page two.  
   Decision changed: Lead with a concise positioning statement, then capabilities and reverse-chronological experience. Place education late and repeat the candidate identity on the second print page.

2. **MIT Career Advising & Professional Development — “Resumes”**  
   URL: https://capd.mit.edu/channels/resumes/  
   Finding: A resume should be dense and fact-based while showcasing achievements, relevant experience, and top skills. MIT emphasizes relevance, strong bullet descriptions, and tailoring.  
   Decision changed: Keep the broad career history, but give detail in proportion to relevance and recency. Current AI/product work and data-heavy frontend leadership receive most space; 2015-2017 roles become a compact early-career sequence.

3. **Harvard University — “Resumes and Cover Letters: Resume Template I”**  
   URL: https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2024/07/resume-bullets.pdf  
   Finding: Begin bullets with action verbs; describe experience, skills, and outcomes; quantify where possible; avoid personal pronouns.  
   Decision changed: Rewrite narrative passages into action-led bullets. No metrics are added because the source PDFs do not supply them.

### Scanning behavior

4. **The Ladders — “Eye-Tracking Study” (2018 update)**  
   URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf?type=standard  
   Finding: The study reports an average 7.4-second initial recruiter screen and attention to name, current title/company, prior title/company, dates, and education. This is a small commercial study, so the exact duration should not be treated as a universal law; its stronger implication is that hierarchy and predictable placement matter.  
   Decision changed: Make name, positioning, dates, employers, and role progression immediately distinguishable. Use consistent job anatomy instead of decorative cards with changing layouts.

5. **Nielsen Norman Group — “F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant”**  
   URL: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/  
   Finding: People use several scan patterns. Walls of text encourage inefficient F-scanning; meaningful headings, front-loaded wording, bullets, grouping, bold emphasis, and cutting unnecessary content help readers find information.  
   Decision changed: Replace the long “About me” narrative with a short summary, use information-bearing section labels, front-load bullets with verbs, and keep important terms near the left edge.

## Editorial, typographic, and information-design direction

6. **IBM Carbon Design System — “Typography: Style strategies”**  
   URL: https://carbondesignsystem.com/elements/typography/style-strategies/  
   Finding: Productive typography favors compact, task-focused density; expressive typography supports scanning and editorial moments. Carbon recommends blending the two intentionally while keeping type styles consistent within a region.  
   Decision changed: Use an expressive display treatment only for the identity and page openers, then shift to compact, consistent “productive” typography for experience and skills.

7. **GOV.UK Design System — “Layout”**  
   URL: https://design-system.service.gov.uk/styles/layout/  
   Finding: Start with a single-column small-screen layout and constrain desktop line length; GOV.UK recommends no more than roughly 75 characters per line for typical content.  
   Decision changed: Mobile is a true single column. Desktop uses a bounded editorial sheet and narrower text measures rather than allowing lines to span the viewport.

8. **GOV.UK Design System — “Type scale”**  
   URL: https://design-system.service.gov.uk/styles/type-scale/  
   Finding: A limited, tested type scale and a consistent vertical rhythm improve scanning and resizing. Relative units help zoom and magnification.  
   Decision changed: Use a small set of type sizes, predictable spacing tokens, relative units on screen, and a separate point-based print scale.

The visual direction is therefore **technical editorial**: an ink-dark screen canvas with paper-like CV sheets, a restrained signal-green accent, monospaced metadata, and serif display moments. It suggests an engineer who works comfortably across product systems, data interfaces, and AI tooling without turning the resume into a dashboard or portfolio collage.

## ATS, accessibility, links, and PDF

9. **Indeed — “How To Write an ATS Resume (With Template and Tips)”**  
   URL: https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template  
   Finding: ATS-friendly documents use clear conventional headings, simple formatting, readable fonts, and job-relevant terms. Tables, graphics, text boxes, and content in headers/footers may parse poorly.  
   Decision changed: Use semantic headings and lists; keep all important content in the document body; avoid tables, charts, skill meters, photos, and icon-only labels. The visual grid is CSS presentation over a linear DOM.

10. **W3C WAI — “Understanding Success Criterion 1.4.3: Contrast (Minimum)”**  
    URL: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum  
    Finding: Normal text needs at least 4.5:1 contrast and large text at least 3:1.  
    Decision changed: Use near-black/near-white primary pairs and a dark green accent that remains readable on white. Muted text is kept well above faint “designer gray.”

11. **W3C WAI — “G91: Providing link text that describes the purpose of a link”**  
    URL: https://www.w3.org/WAI/WCAG21/Techniques/general/G91  
    Finding: Link text should identify its destination or purpose, including when links are encountered out of context.  
    Decision changed: Contact links expose meaningful labels or recognizable addresses, receive visible underlines/focus states, and do not rely on icons.

12. **Adobe Acrobat — “Create and verify PDF accessibility”**  
    URL: https://helpx.adobe.com/in/acrobat/using/create-verify-pdf-accessibility.html  
    Finding: Accessible PDFs need meaningful reading order, tagged structure, and active, correctly tagged links. Complex columns and irregular alignment can make automatic tagging less reliable.  
    Decision changed: Preserve semantic HTML and a single DOM reading sequence. Keep columns shallow and structural rather than interleaving unrelated content. Use real anchors so browser-generated PDFs retain active links where supported.

13. **MDN — “Printing”**  
    URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing  
    Finding: `@media print` can remove screen controls and restyle content; `@page` controls paper size and margins.  
    Decision changed: Provide a dedicated print layer that removes canvas decoration and the download control, forces black-on-white, and defines A4 with zero browser margins.

14. **W3C — “CSS Paged Media Module Level 3” and “CSS Fragmentation Module Level 3”**  
    URLs: https://www.w3.org/TR/css-page-3/ and https://www.w3.org/TR/css-break-3/  
    Finding: Paged media defines page size and boxes; fragmentation controls forced and avoided breaks.  
    Decision changed: Render two explicit page containers, each exactly `210mm × 297mm` in print, force a break before page two, and avoid internal fragmentation of experience entries.

## Resulting design criteria

- The first screen/print-page scan must reveal: name, AI Product Engineer positioning, location/contact, seniority, core stack, current work, and the latest two employers.
- The second page must complete the leadership and frontend story, retain the full employer/date chronology in compressed form, and close with independent projects and education.
- No unverifiable metrics, proficiency bars, portrait, or decorative data visualization.
- Screen can be expressive; print is conservative, monochrome-dominant, and self-contained.
- The Download PDF control invokes the browser print dialog rather than pretending to provide a static file.
