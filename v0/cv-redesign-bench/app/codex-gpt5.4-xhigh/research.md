# Research

Access date for all sources: July 16, 2026.

## Effective CV structure

- Source: Resumes - Career Advising & Professional Development | MIT
  URL: https://capd.mit.edu/resources/resumes/
  Finding: MIT says recruiters spend only a few seconds on a resume, so the format has to make relevant information immediately visible; it also recommends standard, consistent formatting, strong action verbs, and accomplishment-focused bullets.
  Decision changed: I front-loaded title, location, contact links, profile, and recent roles; I rewrote bullets to foreground shipped work and kept the visual structure familiar enough to scan instantly.

- Source: Harvard College Guide to Creating a Strong Resume - Harvard FAS
  URL: https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
  Finding: Harvard frames a resume as a concise, informative summary, recommends headings ordered by importance, reverse chronology, factual language, and formatting that still translates cleanly to PDF.
  Decision changed: I treated this as an editorial compression exercise rather than a full transcript, kept reverse chronology, and removed low-signal narrative filler in favor of direct, factual writing.

## Recruiter and hiring-manager scanning behavior

- Source: Eye-Tracking Study (2018) - Ladders
  URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf
  Finding: Ladders reports a 7.4-second initial screen; top-performing resumes shared clear section headers, bold job titles, a summary at the top of page one, clear fonts, short declarative accomplishment statements, and a strong first page.
  Decision changed: Page one is built around a high-signal summary, scannable section labels, obvious role titles, and short bullets; dense secondary history is pushed to page two.

## Editorial, typography, and information design

- Source: Typography - web.dev
  URL: https://web.dev/learn/design/typography
  Finding: web.dev recommends limiting line length rather than letting text run too wide, and pairing line height with measure so dense reading remains comfortable.
  Decision changed: Long-form copy is capped to readable measure, leading is slightly generous, and the page structure avoids wide uninterrupted text blocks.

- Source: Choosing Web Fonts: A Beginner's Guide - Google Design
  URL: https://design.google/library/choosing-web-fonts-beginners-guide
  Finding: Google Design emphasizes readable pairing, language support, and using less overexposed type choices when personality matters.
  Decision changed: I avoided the default SaaS font stack and used an editorial serif plus a technical sans to differentiate the route while keeping it readable on mobile and in print.

- Source: Spectral: A New Screen-First Typeface - Google Design
  URL: https://design.google/library/spectral-new-screen-first-typeface
  Finding: Spectral is described as a versatile serif intended for text-rich, screen-first, long-form reading.
  Decision changed: The redesign uses a serif display voice for headings and a sober sans for body copy, which gives the CV more authority and editorial presence without hurting legibility.

- Source: Type Trends 2025: Re:Vision - Monotype
  URL: https://www.monotype.com/type-trends
  Finding: Monotype positions contemporary typography as cultural signal and argues against empty trend-chasing or superficial sameness.
  Decision changed: The visual direction aims for a deliberate editorial dossier rather than a generic dashboard or glassmorphism resume card. Personality comes from hierarchy, pacing, and typography more than decorative chrome.

## ATS, accessibility, links, and PDF behavior

- Source: Anatomy of an ATS Friendly Resume Format (Checklist for 2026) - Jobscan
  URL: https://www.jobscan.co/blog/20-ats-friendly-resume-templates/
  Finding: Jobscan recommends clean single-column structure, standard section headers, keeping critical data out of headers and footers, and using text-based PDF or DOCX when format is not specified.
  Decision changed: The printed route keeps the reading order linear, uses standard section names, and keeps contact and career data in the main body instead of decorative edge areas.

- Source: Why ATS Tables and Columns Ruin Your Resume (And What to Do Instead) - Jobscan
  URL: https://www.jobscan.co/blog/resume-tables-columns-ats/
  Finding: Jobscan shows how grids and side-by-side columns can scramble text layers during parsing and recommends single-column flow plus parser-safe list separators.
  Decision changed: I avoided multicolumn print layouts and used straightforward bullet or pipe-separated lists instead of table-based skill blocks.

- Source: Web Content Accessibility Guidelines (WCAG) 2.2 - W3C
  URL: https://www.w3.org/TR/WCAG22/
  Finding: Core success criteria still require sufficient contrast, visible focus treatment, and clear interaction semantics.
  Decision changed: The route uses high contrast, underlined links, and focus-visible states that remain obvious on both screen and paper.

- Source: PDF11: Providing links and link text using the Link annotation and the /Link structure element in PDF documents - W3C
  URL: https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF11
  Finding: W3C's PDF technique stresses that link text and annotations need to stay programmatically available so links remain usable to keyboard and assistive-technology users.
  Decision changed: Important links are rendered as real text links, not icon-only affordances or decorative badges.

- Source: Create and verify PDF accessibility, Acrobat Pro - Adobe Help Center
  URL: https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html
  Finding: Adobe highlights tagged content, active links, correct reading order, and document metadata as core accessible-PDF concerns.
  Decision changed: The layout is semantic HTML first, with selectable text and active anchors, so the browser-generated PDF has a better chance of preserving useful structure.

- Source: @page - MDN Web Docs
  URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page
  Finding: MDN documents `@page` as the correct CSS surface for print-page dimensions and margins.
  Decision changed: Print styling uses `@page` with A4 portrait sizing instead of relying on browser defaults.

- Source: break-inside - MDN Web Docs
  URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside
  Finding: MDN recommends modern `break-*` properties for controlling pagination behavior rather than deprecated `page-break-*`.
  Decision changed: Entries and section blocks use `break-inside: avoid` and explicit page boundaries to hold the printout at exactly two pages.

## Net conclusions

- First page has to win the skim. That means a clear role identity, recent experience, and visible product themes before anything secondary.
- The design should feel more like an editorial dossier than a startup landing page. Typography, white space, and rhythm do the branding work.
- Print constraints are not an afterthought. The DOM order, section naming, link treatment, and CSS page model all need to support both human reading and machine extraction.
