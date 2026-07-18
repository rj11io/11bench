# Research

Access date: 2026-07-16

## Findings

### 1) Resume structure and scanning behavior

- Source: Nielsen Norman Group, "Effective Resumes for UX Career Changers"
- URL: https://www.nngroup.com/articles/resumes-ux-career-changers/
- Accessed: 2026-07-16
- Finding: Hiring managers do not read resumes carefully; they often scan in a fast, F-shaped pattern and spend only seconds on the first pass.
- Decision changed: The CV should lead with role, impact, and keywords in a compact summary, then surface the strongest recent experience first. Decorative layout is less important than clear hierarchy and predictable scanning.

- Source: Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant"
- URL: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Accessed: 2026-07-16
- Finding: People scan in an F-shaped pattern when content is dense or familiar.
- Decision changed: The route uses a narrow reading column, strong section labels, and compact bullet blocks so the first words of each line carry meaning.

- Source: Jobscan, "How to Write a Resume That Lands Interviews"
- URL: https://www.jobscan.co/blog/ats-resume/
- Accessed: 2026-07-16
- Finding: Standard section headings, chronological or hybrid structure, and keyword alignment matter for ATS parsing and recruiter search.
- Decision changed: The canonical model keeps conventional headings such as Experience, Skills, and Education, even though the visual design is editorial.

- Source: Jobscan, "ATS Friendly Resume Format (Checklist for 2026)"
- URL: https://www.jobscan.co/blog/20-ats-friendly-resume-templates/
- Accessed: 2026-07-16
- Finding: Tables, columns, and decorative structures can complicate ATS parsing.
- Decision changed: The screen layout can still feel designed, but the print structure stays simple, linear, and text-first.

### 2) Accessibility, links, and PDF considerations

- Source: W3C, "PDF11: Providing links and link text using the Link annotation"
- URL: https://www.w3.org/TR/WCAG20-TECHS/PDF11.html
- Accessed: 2026-07-16
- Finding: Links in PDF should have meaningful link text and correct tagging / reading order.
- Decision changed: All visible links are written as descriptive text, not naked URLs, and the print version avoids hidden or screen-only link labels.

- Source: W3C, "PDF3: Ensuring correct tab and reading order in PDF documents"
- URL: https://www.w3.org/TR/WCAG-TECHS/PDF3.html
- Accessed: 2026-07-16
- Finding: Reading order must follow the logical structure of the document.
- Decision changed: The route mirrors the reading order with a single top-to-bottom document flow and explicit page breaks.

- Source: Adobe Help Center, "Creating accessible PDFs in Adobe Acrobat"
- URL: https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html
- Accessed: 2026-07-16
- Finding: Tagged PDFs and structured authoring produce better results than post-hoc fixes.
- Decision changed: The implementation keeps semantic HTML and predictable heading structure so the exported PDF is likely to preserve order cleanly.

- Source: W3C, "Understanding Success Criterion 1.4.3: Contrast (Minimum)"
- URL: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Accessed: 2026-07-16
- Finding: Sufficient contrast is required for readability.
- Decision changed: The print CSS forces black-on-white output, and the screen palette stays restrained.

### 3) Contemporary editorial / typographic direction

- Source: Adobe Help Center, "Accessible PDFs in InDesign"
- URL: https://helpx.adobe.com/indesign/desktop/interactive-elements-and-forms/forms-and-pdfs/accessible-pdfs.html
- Accessed: 2026-07-16
- Finding: Structured, readable PDFs depend on clear hierarchy and tagged content.
- Decision changed: The design uses editorial hierarchy rather than dense two-column ornamentation.

- Source: NNGroup, "Effective Resumes for UX Career Changers"
- URL: https://www.nngroup.com/articles/resumes-ux-career-changers/
- Accessed: 2026-07-16
- Finding: Hiring readers want quick orientation, not art-direction tricks.
- Decision changed: The visual direction is restrained, but with deliberate typographic contrast for name, role, section labels, and dates.

## Design implications

- Use a hybrid chronological resume, but visually compress older roles so the strongest recent work dominates the first scan.
- Keep section names conventional for ATS and recruiter search.
- Prefer a clean editorial page with one primary column, a small meta rail, and explicit hierarchy.
- Preserve readable URLs and contact methods in visible text.
- Treat print as the source of truth for the PDF export: black on white, no hidden controls, and predictable page breaks.
