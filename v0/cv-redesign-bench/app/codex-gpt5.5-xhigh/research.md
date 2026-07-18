# Research

Access date for all web sources: July 16, 2026.

## Sources and Findings

### Harvard FAS Mignone Center for Career Success, "Harvard College Guide to Creating a Strong Resume"
URL: https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/

Findings: Harvard defines a resume as a concise, informative summary of ability, education, and experience, tailored to the target role. Its quick tips emphasize specific, active, factual language, organization that is easy to skim, reverse chronological ordering within sections, and formatting that survives PDF conversion. It explicitly warns against narrative style, personal pronouns, missing contact details, and poor skim structure.

Decision changed: I rewrote the autobiographical "About me" into a compact senior-positioning profile, kept the narrative origin story out of the main scan path, used reverse chronological experience, and kept bullets active without inventing metrics.

### The Ladders, "Eye-Tracking Study" (2018)
URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf

Findings: Recruiters in the study averaged 7.4 seconds on an initial resume screen. Better-performing resumes had simple layouts, clear section and title headers, bold job titles, short accomplishment bullets, an overview at the top, and clear fonts. The study also notes that the two-page rule still works for experienced candidates if page one earns attention.

Decision changed: The print CV is exactly two pages, with page one carrying the profile, skill proof, projects, and the four most recent roles. Role titles, employers, dates, and section headers are the primary visual anchors.

### Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web"
URL: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

Findings: NN/g's eye-tracking research continues to find F-shaped scanning behavior on desktop and mobile content areas. Users concentrate on top content and left-side anchors when assessing text-heavy pages.

Decision changed: The layout uses a strong top header, left-aligned section labels, left-aligned job titles, and compact bullets rather than centered or decorative composition.

### Nielsen Norman Group, "The Layer-Cake Pattern of Scanning Content on the Web"
URL: https://www.nngroup.com/articles/layer-cake-pattern-scanning/

Findings: Descriptive, visually distinct headings and subheadings enable efficient "layer-cake" scanning. Good subheadings act like a page-level information architecture.

Decision changed: Sections use short, stable labels: Profile, Skills, Selected Work, Experience, Earlier Foundation, and Education. Each role has a compact heading block so a recruiter can scan the employment timeline without reading every bullet.

### Nielsen Norman Group, "Visual Hierarchy in UX: Definition"
URL: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

Findings: Visual hierarchy directs attention through contrast, scale, and grouping. It tells users where to focus first.

Decision changed: The design avoids equal-weight blocks. Name and headline lead, role headers are larger than bullets, metadata is muted, and skills/projects use compact grouping.

### LinkedIn Economic Graph Research Institute, "Skills-Based Hiring: Increasing Access to Opportunity" (March 2025)
URL: https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/skills-based-hiring-march-2025.pdf

Findings: LinkedIn reports that skills-based hiring can expand talent pools globally and especially in AI roles, where the modeled talent pipeline grows 8.2x globally. It frames AI roles around transferable skills rather than only prior titles.

Decision changed: Skills are not hidden after experience. The CV foregrounds transferable skill clusters: product engineering, AI systems, frontend architecture, data visualization, and delivery leadership.

### LinkedIn Talent Solutions, "The Future of Recruiting 2025"
URL: https://business.linkedin.com/hire/resources/future-of-recruiting

Findings: LinkedIn describes recruiting moving toward AI-assisted analysis of skills in resumes and role requirements. Skills need to be legible to both people and systems.

Decision changed: Keywords are used in context inside actual experience bullets, not as a stuffed keyword block. The skills matrix remains concise and mirrors the role's strongest evidence.

### Stack Overflow, "2025 Developer Survey: AI"
URL: https://survey.stackoverflow.co/2025/ai

Findings: Stack Overflow reports that 84% of respondents use or plan to use AI tools, with about 51% of professional developers using them daily. It also reports lower confidence for complex, high-responsibility tasks.

Decision changed: The CV positions AI as applied product engineering, harness work, automations, testing, and delivery rather than generic "AI enthusiasm." Reliability signals such as Playwright, CI/CD, architecture, and developer experience remain visible.

### U.S. Web Design System, "Typography"
URL: https://designsystem.digital.gov/components/typography/

Findings: USWDS recommends most lines of text stay between 45 and 90 characters, with about 66 characters as a useful target for long text.

Decision changed: Screen paragraphs are capped to readable measures. Print uses a two-column document logic only where the reading order remains natural: section rail and content body, not dense newspaper columns.

### Greenhouse Support, "Unsuccessful resume parse" and "Supported formats for resumes, cover letters and other candidate uploads"
URLs:
- https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse
- https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads

Findings: Greenhouse supports .doc, .docx, .pdf, .rtf, and .txt uploads, but parsing can fail or become partial because of file size or resume formatting issues.

Decision changed: The print CV uses selectable HTML text, standard section headings, minimal decorative imagery, no tables for core content, and no image-only text. The screen-only print button is hidden from print.

### W3C WAI, "Understanding WCAG 2.2: Contrast (Minimum)" and "Link Purpose (In Context)"
URLs:
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html

Findings: WCAG 2.2 AA requires 4.5:1 contrast for normal text and 3:1 for large text. Link purpose should be determinable from link text or programmatic context.

Decision changed: Print is black-on-white. Screen colors exceed normal text contrast targets. Contact links use visible, meaningful text such as the email address, domain, GitHub URL, and LinkedIn URL.

### W3C WAI, "WCAG 2.2 Techniques: PDF Techniques"
URL: https://www.w3.org/WAI/WCAG22/Techniques/

Findings: W3C's PDF technique index includes guidance for tagged PDFs, headings, links, and text alternatives. PDF accessibility depends on semantic structure, not only visual appearance.

Decision changed: The route uses semantic headings, lists, articles, and real anchor elements before browser printing. Decorative visual treatment is CSS, not essential text embedded in an image.

### MDN Web Docs, "@page size descriptor" and "break-after"
URLs:
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-after

Findings: CSS `@page size` defines printed page dimensions, including A4 portrait. `break-after: page` forces page breaks in paged media.

Decision changed: Print CSS sets `@page { size: A4; margin: 0; }`, models two explicit A4 sheets, and forces the page break after the first sheet only.

## Synthesis for This CV

- The candidate is senior enough for two pages, but only if page one proves relevance fast.
- The profile should sell a narrow thesis: AI product engineer with deep TypeScript/frontend architecture, data visualization, and team-building experience.
- The long personal story is useful context but too costly for print. It is compressed into an "Origins" note and not allowed to dominate the first scan.
- The role history should not be flattened into generic frontend work. Cybersecurity, crypto, gaming, proprietary data explorers, AI harnesses, and developer-experience leadership are the differentiators.
- ATS and recruiter readability point in the same direction: plain text, clear headings, concrete role metadata, and contextual skills.
