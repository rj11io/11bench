# Research

Access date for all sources: 2026-07-16.

## Effective CV Structure For A Senior AI Product / Frontend Engineer

### U.S. Bureau of Labor Statistics, Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers

URL: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm

Finding: The role category emphasizes designing applications or systems, analyzing user needs, recommending upgrades, and working with developers, analysts, and stakeholders. Senior software candidates should therefore show product judgment, implementation ownership, and collaboration, not only language lists.

Decision changed: The summary leads with product engineering, architecture, design systems, CI/CD, and zero-to-launch ownership. Skills are grouped by work surface instead of a flat keyword cloud.

### O*NET OnLine: Software Developers

URL: https://www.onetonline.org/link/summary/15-1252.00

Finding: O*NET emphasizes analyzing user needs, software design, testing, documentation, collaboration, and technical problem solving. It also lists JavaScript, web platform work, databases, version control, and testing among common work activities/tools.

Decision changed: Experience bullets preserve testing, CI/CD, documentation/onboarding, SDK work, and product modules because those are stronger senior signals than a long foundations list.

### GitHub Docs: About READMEs / Communicating Project Context

URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

Finding: GitHub recommends clear project context, purpose, and useful links. For an engineer whose open-source and AI work is part of the pitch, project entries should say what each property is for, not just name URLs.

Decision changed: Projects are rendered as compact cards with name, URL, date span, and one role-defining line.

## Recruiter And Hiring-Manager Scanning Behavior

### Nielsen Norman Group: F-Shaped Pattern of Reading on the Web

URL: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/

Finding: Users often scan pages in horizontal passes near the top, then move down the left side looking for cues. Dense text must use strong anchors, headings, and front-loaded phrases.

Decision changed: The CV uses left-side section rails, clear role titles, right-aligned dates, and bullets whose first words carry the claim: Built, Delivered, Shipped, Tech lead, Created.

### Nielsen Norman Group: How People Read Online: New and Old Findings

URL: https://www.nngroup.com/articles/how-people-read-online/

Finding: Web readers scan and pick out headings, summaries, and meaningful formatting more than they read every word in sequence.

Decision changed: The web version uses a visible hierarchy and keeps the summary to two paragraphs. The print version avoids dense autobiography and gives recruiters an immediate “AI/Product/Frontend/Data UI” map.

### The Ladders: Eye-Tracking Study

URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf

Finding: The study is widely cited for very short first-pass resume reviews and attention to name, current title/company, previous title/company, dates, and education.

Decision changed: Each role header is standardized: title, company/link/context, dates. The current role and contact links appear on page one above the fold/sheet break.

## Editorial, Typographic, Information-Design, And Print Direction

### GOV.UK Service Manual: Content Design

URL: https://www.gov.uk/service-manual/design/writing-for-user-interfaces

Finding: Interface writing should be concise, specific, and front-loaded with what users need. Even though this is a CV, the same rule applies to recruiter scanning.

Decision changed: The long “About Me” narrative was rewritten into a compact positioning statement. Personal details became a short origin signal rather than a full story.

### IBM Carbon Design System: Typography

URL: https://carbondesignsystem.com/elements/typography/overview/

Finding: Product interfaces benefit from clear typographic roles, restrained scale, and consistent hierarchy. Dense technical content needs legible body sizes and predictable labels.

Decision changed: The design uses a small but deliberate type scale, monospaced labels for metadata, and a restrained two-column grid that converts to one column on mobile.

### Material Design 3: Color System

URL: https://m3.material.io/styles/color/overview

Finding: Color should support hierarchy and meaning, not decoration. Neutral surfaces with limited accent colors improve focus.

Decision changed: The palette uses warm paper, dark ink, and one teal accent for links/section rails. Print removes color dependence and becomes black-on-white.

### Paged Media / CSS `@page`, MDN

URL: https://developer.mozilla.org/en-US/docs/Web/CSS/@page

Finding: CSS paged media allows page size and margins to be controlled for print, while page breaks must still be tested in browser print output.

Decision changed: The implementation uses two explicit `.sheet` elements sized to A4 with `@page { size: A4; margin: 0; }`, fixed print padding, and `break-after` only between the two sheets.

## ATS, Accessibility, Links, And PDF Considerations

### W3C WCAG 2.2: Contrast Minimum

URL: https://www.w3.org/TR/WCAG22/#contrast-minimum

Finding: Normal text needs sufficient contrast, and non-text styling should not be the only means of comprehension.

Decision changed: Body copy and print are high contrast. Links have text labels and meaningful URLs; print does not depend on teal color.

### W3C WCAG 2.2: Resize Text

URL: https://www.w3.org/TR/WCAG22/#resize-text

Finding: Content should remain usable when text is resized. Fixed-format print can be controlled, but screen layouts must reflow.

Decision changed: The screen layout switches to one column at mobile width, avoids horizontal overflow with `minmax(0, 1fr)` and `overflow-wrap`, and keeps the A4 sheet visual only as a max-width on screen.

### WebAIM: Links and Hypertext

URL: https://webaim.org/techniques/hypertext/

Finding: Link text should be meaningful and understandable in context. Repeated “click here” style links are weak for accessibility and scanning.

Decision changed: Contact and project links display their real destinations. Print retains the visible URL text.

### Jobscan: ATS-Friendly Resume Formatting

URL: https://www.jobscan.co/blog/20-ats-friendly-resume-templates/

Finding: ATS-safe resumes favor standard headings, readable text, clear date formatting, and avoiding content embedded only in graphics.

Decision changed: The route uses semantic HTML text, standard section names, real anchors, and no image-only content. The creative treatment comes from CSS, not from hiding content in decorative graphics.

## Summary Of Design Decisions From Research

- Use reverse chronological experience as the main spine.
- Put current AI/product positioning, links, and skills on page one.
- Preserve enough early experience to prove a decade-long frontend/data arc, but compress older jobs.
- Avoid invented metrics; prioritize concrete shipped systems, platforms, and responsibilities.
- Use a screen design with editorial polish but a conservative print layer.
- Use semantic HTML and visible link URLs so printed PDF and ATS extraction remain useful.
