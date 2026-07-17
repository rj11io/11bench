# CV research log

Access date for all sources: 2026-07-16.

## Structure, writing, and scanning

### Harvard College Guide to Creating a Strong Resume

https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/

Finding: clear sections, concise bullets, and action verbs make fit easier to
understand. Decision: the CV opens with a plain-language summary, then
standard Skills and reverse-chronological Experience sections; bullets lead
with active verbs.

### GSAS CV & Cover Letter Guide

https://careerservices.fas.harvard.edu/resources/gsas-cv-cover-letter-guide-2/

Finding: start bullets with active verbs, use sentence fragments, and avoid
unnecessary personal pronouns. Decision: the expanded PDF's first-person
narrative became concise, neutral bullets; personal voice remains in the
summary and interests note.

### Why do recruiters spend only 7.4 seconds on resumes? - The Ladders

https://www.theladders.com/career-advice/why-do-recruiters-spend-only-7-4-seconds-on-resumes

Finding: its eye-tracking study describes a short initial scan focused on the
upper area, headings, dates, titles, and employers. This is directional, not a
universal law. Decision: the first page front-loads title, contact links,
summary, capability keywords, and the three most recent roles.

## ATS, accessibility, links, and PDF

### ATS-Friendly Resume: 18 Tips - Indeed Editorial Team

https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume

Finding: ATS implementations vary, but standard headings, readable text,
simple bullets, consistent dates, body-flow contact information, and a linear
layout are safer; headers, footers, tables, graphics, and columns may parse
inconsistently. Decision: the route uses Summary, Skills, Experience,
Education, and Projects; no charts, icons, text boxes, or visual-only facts.

### Web Content Accessibility Guidelines (WCAG) 2.2 - W3C

https://www.w3.org/TR/WCAG22/

Finding: meaningful headings and labels, visible keyboard focus, understandable
link purpose, reflow, and 4.5:1 contrast for normal text are core requirements.
Decision: semantic headings/sections/lists/anchors, visible focus rings, and a
high-contrast ink/paper pairing; color is never the only cue.

### PDF Techniques - W3C

https://www.w3.org/TR/WCAG-TECHS/pdf.html

Finding: authoring-time link annotations and context-independent link text are
important for accessible PDFs. Decision: contact and project destinations are
real anchors and their visible URLs remain in print.

### Creating accessible PDFs in Adobe Acrobat

https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html

Finding: the source HTML's logical reading order determines how well a PDF can
be tagged and reflowed. Decision: content is authored top-to-bottom with native
headings and lists; no CSS-generated content contains a fact.

### Printing - CSS and `size` - MDN

https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing

https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size

Finding: `@media print`, `@page`, A4 sizing, and explicit page breaks are the
right primitives. Decision: print CSS sets A4 portrait, hides controls, uses
two fixed `.printPage` wrappers, and is checked with `pdfinfo` plus rendered
page images.

## Contemporary editorial, typographic, and information design

### Typography - U.S. Web Design System

https://designsystem.digital.gov/components/typography/

Finding: use a comfortable body size, left alignment, tuned line-height, and a
45-90 character measure. Decision: screen copy has a capped measure and more
generous leading; print uses a tighter but readable measure. A restrained serif
display face contrasts with a neutral sans body.

### Type scale and Layout - GOV.UK Design System

https://design-system.service.gov.uk/styles/type-scale/

https://design-system.service.gov.uk/styles/layout/

Finding: a tested type scale and consistent rhythm help legibility across
devices; small screens should begin single-column and limit line length.
Decision: the route collapses to one column at mobile widths, scales the
masthead instead of shrinking body copy, and caps the desktop document width.

### Typography / Social - GOV.UK Brand Guidelines

https://brand.design-system.service.gov.uk/typography/social/

Finding: hierarchy can come from scale and weight; body text should prioritize
line spacing, contrast, and left alignment. Decision: the name is the only
oversized display moment; section labels use tracking and rules; lime is only a
small navigation cue.

## Research limits

Recruiter eye-tracking evidence is directional, and employer ATS behavior is
proprietary. The design therefore stays conservative in structure while using
typography, spacing, and a restrained accent for distinction.

