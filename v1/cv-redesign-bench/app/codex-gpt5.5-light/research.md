# Research

Access date: 2026-07-16.

## Effective senior AI product/frontend CV structure

- Harvard College Mignone Center for Career Success, "Create a Strong Resume" - https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
  - Finding: a resume should be concise, tailored, and highlight strongest assets, skills, and experience rather than act as a full autobiography.
  - Decision changed: compressed the long six-page narrative into a senior profile, strengths, skills, projects, five principal roles, earlier-career summary, and education.
- Harvard College resume examples PDF via APSA mirror, "Handout 4 - Harvard Resume Examples" - https://apsanet.org/Portals/54/web/Handout%204%20-%20Harvard%20Resume%20Examples.pdf
  - Finding: for non-academic work, a resume is usually 1-2 pages and gives more space to experience than academic-style detail.
  - Decision changed: preserved only the highest-value career evidence for a two-page product-engineering reader; moved early roles into one compressed section.

## Recruiter and hiring-manager scanning behavior

- Spectacle Talent Partners, "Is the 6-Second Resume Scan a Myth?" - https://spectacletalentpartners.com/is-the-6-second-resume-scan-a-myth/
  - Finding: TheLadders' updated eye-tracking work is commonly summarized as a 7.4-second first pass, with attention on name, current role/company/dates, prior role/company/dates, and education.
  - Decision changed: made name, role, contact links, dates, employers, section labels, and recent experience strong left-to-right scan anchors.
- Nielsen Norman Group research is referenced indirectly by current resume-scanning discussion and directly in web-reading literature as supporting F-pattern scanning for dense text.
  - Decision changed: avoided centered decorative structure; used left-aligned headings, dates in a consistent right column, and short bullets.
- Wonsulting, "Hidden Eye Tracker: How Recruiters Actually Read Resumes" - https://www.wonsulting.com/job-search-hub/hidden-eye-tracker-how-recruiters-actually-read-resumes
  - Finding: recruiter eye-tracking summaries emphasize F-shaped reading, very short first-pass attention, and skipping dense paragraphs.
  - Decision changed: reduced "About me" from story prose to three compact profile claims plus chip-like strengths.

## Editorial, typographic, information-design, and print direction

- GOV.UK Design System, "Type scale" - https://design-system.service.gov.uk/styles/type-scale/
  - Finding: type scale and line height should be tested across devices for readability and accessibility.
  - Decision changed: used restrained type scale, no viewport-scaled body text, and a mobile layout that collapses grids before text becomes cramped.
- U.S. Web Design System, "Typography" - https://designsystem.digital.gov/components/typography/
  - Finding: most readable lines are approximately 45-90 characters, with about 66 characters a strong target.
  - Decision changed: capped summary measure and used two-column information design only where the content is discontinuous and scannable.
- Pimp My Type, "The ideal line length & line height in web design" - https://pimpmytype.com/line-length-line-height/
  - Finding: long-form text typically benefits from 60-80 characters and line-height around 1.5-1.6, while short lines can be tighter.
  - Decision changed: screen summary uses more generous line-height; print bullets use tighter line-height because they are short, discontinuous statements.
- Material Design 3, "Applying type" - https://m3.material.io/styles/typography/applying-type
  - Finding: hierarchy should be expressed through type roles and consistent scale, not arbitrary styling.
  - Decision changed: used one display name style, one section-label style, one job-title style, and compact body styles.

## ATS, accessibility, links, and PDF considerations

- W3C, "Web Content Accessibility Guidelines (WCAG) 2.2" - https://www.w3.org/TR/WCAG22/
  - Finding: accessible web content depends on perceivable text, navigable structure, and robust markup.
  - Decision changed: implemented semantic headings, address/contact links, lists, readable text contrast, and real text rather than image text.
- W3C WAI, "Understanding Success Criterion 1.4.3: Contrast (Minimum)" - https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
  - Finding: normal text needs at least 4.5:1 contrast, with lower minimums only for large text.
  - Decision changed: screen palette uses high-contrast ink on warm paper; print forces black-on-white.
- WebAIM, "Understanding WCAG 2 Contrast and Color Requirements" - https://webaim.org/articles/contrast/
  - Finding: contrast and color use are essential for users with visual disabilities.
  - Decision changed: links are underlined, not color-only; accent color is removed in print.
- W3C, "PDF Techniques for WCAG 2.0" - https://www.w3.org/TR/WCAG20-TECHS/pdf
  - Finding: PDF accessibility depends on text extraction/reflow and reader support; browser print from semantic HTML is preferable to screenshot-based PDFs.
  - Decision changed: the Download PDF control calls `window.print()` and the print stylesheet preserves real selectable text and visible URLs/labels.

## Current design conclusion

The strongest fit is an editorial technical-lead CV, not a portfolio landing page. The reader should see seniority, AI/product focus, and domain depth within seconds, then find enough evidence to trust the claim. The final design therefore uses a sober print-first grid with a warm editorial screen wrapper, compact section labels, consistent date placement, no decorative imagery, and an exact two-page A4 print layout.
