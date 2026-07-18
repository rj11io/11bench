# Research

Access date: 2026-07-16

## Resume structure for a senior AI product/frontend engineer

### LinkedIn - Resume Scanning Methods for Recruiters
- URL: https://www.linkedin.com/top-content/career/resume-tips/resume-scanning-methods-for-recruiters/
- Finding: recruiters skim for job titles, company names, dates, skills, and measurable impact rather than reading every line.
- Decision: put the headline, contact info, recent roles, and keyword-rich skills in the first screenful and keep the structure simple enough to scan in seconds.

### LinkedIn - What Recruiters Look for in Resumes
- URL: https://www.linkedin.com/top-content/career/resume-tips/what-recruiters-look-for-in-resumes/
- Finding: recruiters prioritize clear formatting, relevant experience, measurable achievements, and role-specific customization.
- Decision: keep the layout direct, reverse chronological, and tuned to the target role instead of trying to be clever with structure.

### Indeed - How Long Do Hiring Managers Look at a Resume?
- URL: https://www.indeed.com/career-advice/resumes-cover-letters/how-long-do-employers-look-at-resumes
- Finding: a resume is easier to scan when it is short and precise, and Indeed recommends one or two pages at most.
- Decision: hard-limit the print version to two A4 pages and compress lower-signal history instead of letting the CV sprawl.

### AIGA Baltimore - Resume Writing: Guidance for Designers
- URL: https://baltimore.aiga.org/category/aiga-baltimore/page/2/
- Finding: design leaders value a clean, well-organized resume; the content should stay the hero, while typography, hierarchy, and readability still matter.
- Decision: use a polished editorial layout, but keep it restrained and professional rather than infographic-like.

## Typography, information design, and contemporary print direction

### Butterick's Practical Typography - Resumes
- URL: https://practicaltypography.com/resumes.html
- Finding: better resumes use larger margins, smaller line lengths, gentler bullets, smaller headings, and push nonessential material to page 2.
- Decision: use a narrow text measure, subtle section labels, light bullets, and move low-value material out of the main flow.

### AIGA Baltimore - Resume Writing: Guidance for Designers
- URL: https://baltimore.aiga.org/category/aiga-baltimore/page/2/
- Finding: resume typography and visual hierarchy are part of the evaluation, but the message should stay clear and easy to read.
- Decision: pair a serif headline with a sober sans body and mono metadata, then keep the hierarchy crisp and uncluttered.

## ATS, accessibility, link, and PDF considerations

### Indeed - 18 Tips To Pass Automated Screening Resume Software
- URL: https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume
- Finding: ATS tools can misread charts, boxes, columns, graphics, and other unusual formatting; exact job language helps.
- Decision: keep the final route text-first, avoid visual gimmicks in print, and preserve the role/company/date vocabulary from the source PDFs.

### W3C - WCAG 2.2
- URL: https://www.w3.org/TR/WCAG22/
- Finding: text needs sufficient contrast, and the content should remain readable when resized.
- Decision: keep strong foreground/background contrast on screen and force black-on-white print output.

### W3C - PDF3: Ensuring correct tab and reading order in PDF documents
- URL: https://www.w3.org/TR/WCAG-TECHS/PDF3.html
- Finding: PDF reading order is governed by the logical tag order; multi-column layouts can create confusing reading order if the structure is not consistent.
- Decision: preserve a linear DOM order and avoid print layouts that depend on visual columns for meaning.

### WebAIM - PDF Accessibility: Defining PDF Accessibility
- URL: https://webaim.org/techniques/acrobat/
- Finding: tagged structure exposes headings, links, lists, and tables to assistive technologies.
- Decision: keep the web CV semantic, use real links, and avoid converting text into decorative graphics.

### MDN - @page size
- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size
- Finding: the `@page` size descriptor is the correct way to define the printed page dimensions.
- Decision: set the print output to A4 explicitly instead of relying on browser defaults.

### MDN - break-inside
- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside
- Finding: `break-inside` controls how page breaks behave inside an element.
- Decision: keep role blocks, project blocks, and section groups intact so the two-page print stays clean.

## What this changed

- I chose a two-page, reverse-chronological CV with a compact summary, a skills block, selected projects, recent roles in full, and older roles compressed into a smaller second-page history block.
- I dropped the fun-facts section and the extra GitHub-history detail from the main body because they are lower value than the job evidence.
- I kept the visual language editorial and restrained: high-contrast text, a serif/sans/mono type system, simple separators, and no infographic treatment.
