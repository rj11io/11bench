# Research log

Access date for all web sources: 2026-07-16

## 1. Recruiter scanning behavior and structure

### The Ladders, "Eye-Tracking Study" (2018)

- URL: <https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf>
- Finding: recruiters spent an average of 7.4 seconds on the initial screen, favored clear section and title headers, focused heavily on job titles, and responded better to short declarative accomplishment statements than paragraph blocks. The study also says a second page is acceptable for experienced candidates when page one earns continued attention.
- Decision changed: I front-loaded role identity, years/stack context, and recent experience; kept the print CV to exactly two pages; used bold-ish role hierarchy and short bullets instead of paragraph descriptions for experience.

### Nielsen Norman Group, "Effective Resumes for UX Career Changers" (2022)

- URL: <https://www.nngroup.com/articles/resumes-ux-career-changers/>
- Finding: hiring managers scan resumes quickly; ATS systems can misread complex layouts, artistic fonts, tables, or columns; PDFs are useful for human review while Word files remain more universal for ATS intake; hyperlinks should remain functional and text selectable.
- Decision changed: the design avoids decorative complexity that would obscure the reading order, keeps the content in a straightforward semantic HTML flow, preserves selectable text and working links, and avoids multi-column gimmicks in the actual print reading order.

## 2. Typography, editorial hierarchy, and information design

### Matthew Butterick, "Line length"

- URL: <https://practicaltypography.com/line-length.html>
- Finding: comfortable body-text line length is about 45-90 characters per line; shorter lines improve readability and professionalism.
- Decision changed: desktop text blocks are capped rather than allowed to span the full page width, and print columns are designed as narrow editorial measures instead of full-width slabs.

### Matthew Butterick, "Line spacing"

- URL: <https://practicaltypography.com/line-spacing.html>
- Finding: effective line spacing for most text is about 120%-145% of point size.
- Decision changed: body copy and bullets use moderate leading instead of tight resume-default spacing, which helps both screen and print legibility without wasting too much vertical space.

### Matthew Butterick, "Headings"

- URL: <https://practicaltypography.com/headings.html>
- Finding: headings work best as signposts; underlining is discouraged; spacing above and below is often the strongest emphasis tool.
- Decision changed: section hierarchy relies on spacing, size, weight, and case rather than decorative rules or underlines. Links are underlined, headings are not.

### Alma Hoffmann, Smashing Magazine, "Typographic Hierarchies" (2022)

- URL: <https://www.smashingmagazine.com/2022/10/typographic-hierarchies/>
- Finding: hierarchy is the visual organization of content by relative importance; type choice, size, weight, and spacing interact systemically rather than independently.
- Decision changed: I used a deliberate two-family system with a high-contrast display serif for identity and a clean sans for body copy, plus restrained accents and spacing-led hierarchy rather than many competing visual treatments.

### web.dev, "Typography"

- URL: <https://web.dev/learn/design/typography>
- Finding: text fitting the viewport is not the same as text being comfortable to read; font size should adapt across screen sizes with media queries.
- Decision changed: the route uses different scale behavior on mobile versus desktop instead of treating the print composition as a fixed shrunken screen card.

## 3. Print implementation and exact A4 control

### MDN, "Printing"

- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing>
- Finding: print-specific CSS should use `@media print`; `@page` can control printed page dimensions and margins; screen-only UI should be hidden in print.
- Decision changed: the Download PDF control is screen-only, the printed route uses `@page` with A4 sizing, and each page card becomes a fixed print sheet with print-specific spacing and color adjustments.

### MDN, "`page-break-after`"

- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page-break-after>
- Finding: `page-break-after` is legacy; modern CSS should use `break-after`.
- Decision changed: deliberate page separation uses `break-after: page` on the first sheet rather than relying on deprecated properties alone.

## 4. ATS, links, accessibility, and PDF concerns

### W3C, "Web Content Accessibility Guidelines (WCAG) 2.1"

- URL: <https://www.w3.org/TR/WCAG21/>
- Finding: pages need meaningful titles and headings; link purpose should be determinable from the link text or context.
- Decision changed: the route has route-specific metadata, a clear `h1`, and descriptive visible link labels instead of ambiguous bare "click here" style affordances.

### W3C, "PDF Techniques for WCAG 2.0"

- URL: <https://www.w3.org/TR/WCAG20-TECHS/pdf>
- Finding: correct reading order matters in PDFs, and complex multi-column layouts can become unreadable to assistive technology if not properly tagged.
- Decision changed: the print version keeps a simple source order and avoids relying on visually clever but structurally risky column choreography for critical reading order.

### Jobscan, "Anatomy of an ATS Friendly Resume Format (Checklist for 2026)"

- URL: <https://www.jobscan.co/blog/20-ats-friendly-resume-templates/>
- Finding: text-based PDF and Word files remain the safest ATS-friendly formats when a job description does not specify otherwise.
- Decision changed: the page is built from real text and links, not canvas or image rendering, so the browser-generated PDF remains text-based and selectable.

## 5. Design direction synthesized from the research

The current evidence points toward a specific balance:

- Strong hierarchy matters more than novelty.
- Senior candidates can justify two pages, but page one still carries the burden of attention.
- Text density must be controlled through grouping and editorial omission, not tiny type.
- Print fidelity should come from explicit A4 rules, not hoping the screen layout happens to print well.
- Accessibility and ATS concerns push against fragile decorative layouts and toward semantic order, readable links, and selectable text.

That synthesis led to an editorial-paper design: distinct identity typography, strict content prioritization, compact but readable cards, and a print mode that becomes two deliberate A4 sheets instead of a generic long webpage.
