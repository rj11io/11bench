# Research

Access date: 2026-07-16.

## Effective Structure For A Senior AI Product / Frontend Engineer

1. Harvard Extension School, "HES: Create Impactful Resumes and Cover Letters"  
   URL: https://careerservices.fas.harvard.edu/resources/hes-create-impactful-resumes-and-cover-letters/  
   Finding: Harvard's guidance emphasizes concise, impact-oriented experience entries with action verbs and clear sectioning. It also supports prioritizing relevant professional experience over autobiographical detail.  
   Decision changed: rewrote the long personal narrative into a short senior positioning summary, used action-led bullets, and kept recent experience dominant.

2. CareerOneStop, "Resumes" and "Resume Guide"  
   URL: https://www.careeronestop.org/JobSearch/Resumes/resumes-and-applications.aspx  
   URL: https://www.careeronestop.org/JobSearch/Resumes/ResumeGuide/introduction.aspx?frd=true  
   Finding: Public workforce guidance frames a resume as targeted evidence for a role and recommends using role-relevant keywords from the target position.  
   Decision changed: kept explicit keywords for TypeScript, React, Next.js, AI SDK, agent automations, dashboards, data visualization, Playwright, Vercel, and team leadership.

3. Google Operations Center, "How We Hire"  
   URL: https://googleoperationscenter.com/how-we-hire/  
   Finding: Google's hiring guidance says resume/CV materials should be current, match skills and experience to the job description, and be specific about accomplishments.  
   Decision changed: compressed older roles and put the current AI/product/frontend evidence before personality-led content.

## Recruiter And Hiring-Manager Scanning Behavior

1. Nielsen Norman Group, "Text Scanning Patterns: Eyetracking Evidence"  
   URL: https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/  
   Finding: People scan text using patterns such as F-pattern, spotted pattern, and layer-cake pattern; clear headings and visible structure help users decide what to read.  
   Decision changed: built strong left-edge anchors, compact section labels, clear company/date rows, and short bullet clusters.

2. Nielsen Norman Group, "How People Read Online: New and Old Findings"  
   URL: https://www.nngroup.com/articles/how-people-read-online/  
   Finding: Users scan more than they read; front-loaded headings, subheadings, bullets, and emphasized keywords improve comprehension.  
   Decision changed: front-loaded "AI Product Engineer", role dates, companies, and technical keywords; removed long paragraphs from experience.

3. HR Dive, "Eye tracking study shows recruiters look at resumes for 7 seconds"  
   URL: https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/  
   Finding: Reporting on TheLadders' 2018 study says initial resume review averaged 7.4 seconds and successful resumes used simple layouts, clear headings, and E/F-pattern organization.  
   Decision changed: avoided decorative layouts, large hero sections, or novelty sections that would compete with job title, company, dates, and skills.

## Editorial, Typographic, Information-Design, And Print Direction

1. Baymard Institute, "Readability: The Optimal Line Length"  
   URL: https://baymard.com/blog/line-length-readability  
   Finding: Baymard recommends roughly 50-75 characters for readable body text and warns that overly long lines reduce readability.  
   Decision changed: constrained content columns, used a two-column desktop grid only where lines remain short, and switched to one column on mobile.

2. IBM Carbon Design System, "Typography" and IBM Design Language data visualization basics  
   URL: https://carbondesignsystem.com/guidelines/typography/overview  
   URL: https://www.ibm.com/design/language/data-visualization/design/basics  
   Finding: Carbon's product design language treats typography as hierarchy and organization, while IBM's data visualization guidance stresses accessibility, harmony, and faster recognition.  
   Decision changed: chose an editorial/product-document aesthetic: restrained color, dense but legible typography, rule lines, and small signal bands instead of marketing-style cards.

3. MDN Web Docs, "`@page` size descriptor"  
   URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size  
   Finding: `@page size` defines the page box for printed output and can be set to absolute page sizes such as A4.  
   Decision changed: print CSS uses `@page { size: A4; margin: 0; }` and two explicit A4 page containers.

4. MDN Web Docs, "`page-break-inside` CSS property"  
   URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page-break-inside  
   Finding: legacy `page-break-*` properties are superseded by `break-*` properties, though older aliases still exist.  
   Decision changed: print CSS uses `break-inside: avoid` and explicit `break-after: page`, with legacy aliases only as compatibility support.

## ATS, Accessibility, Link, And PDF Considerations

1. U.S. Department of Labor, "Understanding Resume Essentials"  
   URL: https://www.dol.gov/sites/dolgov/files/VETS/files/OBTT-PG-UnderstandingResumeEssentials-JAN2022.pdf  
   Finding: ATS tools can scan for keywords, former employers, years of experience, and education.  
   Decision changed: kept standard section names, visible dates, employer names, education, and keyword-rich skills in text rather than images.

2. Indeed, "How To Write an ATS Resume (With Template and Tips)"  
   URL: https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template  
   Finding: Indeed recommends clear section labels, simple formatting, common fonts, and avoiding tables/graphics that can confuse parsers.  
   Decision changed: the printed CV uses semantic text, no tables, no image-only contact information, and simple text separators.

3. W3C, "Web Content Accessibility Guidelines (WCAG) 2.2"  
   URL: https://www.w3.org/TR/WCAG22/  
   Finding: WCAG 2.2 defines contrast and non-text contrast requirements; readable contrast and non-color-only cues remain baseline accessibility needs.  
   Decision changed: all print text is black-on-white, links are underlined, and the screen palette maintains high contrast.

4. WebAIM, "Defining PDF Accessibility"  
   URL: https://webaim.org/techniques/acrobat/  
   Finding: accessible PDFs depend on tags and logical structure, not just visual appearance.  
   Decision changed: the HTML uses semantic headings, lists, and anchors so browser-generated PDFs preserve a reasonable text order.

5. Adobe Help Center, "Create and verify PDF accessibility"  
   URL: https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html  
   Finding: accessible PDF links should remain active and correctly tagged.  
   Decision changed: contact and project links are real anchors with visible URLs/labels and remain underlined in print.

6. MDN Web Docs, "Window: print() method" and "Printing"  
   URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/print  
   URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing  
   Finding: `window.print()` opens the browser print dialog; print-specific CSS is preferred for changing printed presentation.  
   Decision changed: added a visible screen-only Download PDF control that calls `window.print()` and hides itself in print CSS.
