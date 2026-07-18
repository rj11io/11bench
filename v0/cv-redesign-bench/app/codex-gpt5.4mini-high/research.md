# Research Notes

Access date for all web sources below: 2026-07-16.

## 1. Recruiter Scan Behavior

### TheLadders Eye Tracking Study

- Title: *TheLadders EyeTracking Study*
- URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf
- Finding: recruiters spend only a few seconds on the first pass and anchor on
  the candidate name, title, company, and recent experience rather than deep
  prose.
- Decision changed: the route puts the current role, contact details, and the
  highest-signal recent work above everything else, and it compresses the long
  personal narrative into short summary lines.

### Jobscan ATS Resume Format Guidance

- Title: Jobscan resume format and ATS guidance
- URL: https://www.jobscan.co/resume-formats
- Finding: ATS-friendly resumes use standard headings, a chronological or
  hybrid structure, and avoid graphics, tables, and decorative layout tricks
  that can interfere with parsing.
- Decision changed: the route uses semantic headings, a strict reading order,
  plain link text, and no icons, charts, or skill bars.

### Jobscan ATS File-Type Guidance

- Title: Jobscan ATS-friendly resume file guidance
- URL: https://www.jobscan.co/blog/ats-resume-pdf/
- Finding: PDFs are acceptable when they are text-based and simple; the
  important part is readable structure rather than visual decoration.
- Decision changed: the print output stays text-first, with a clean PDF-safe
  layout and no rasterized content.

## 2. Typography and Information Design

### Adobe Typography Basics

- Title: Adobe Express typography and hierarchy guidance
- URL: https://www.adobe.com/express/learn/blog/typography-basics
- Finding: readable hierarchy depends more on size, weight, spacing, and
  contrast than on ornament; the strongest documents keep the visual system
  disciplined.
- Decision changed: the route uses a serif display face for the name, a clean
  sans for body copy, and restrained spacing rather than flashy color or
  decoration.

### Adobe Resume Font Guidance

- Title: Adobe Express resume font guidance
- URL: https://www.adobe.com/express/learn/blog/best-font-for-resume
- Finding: the safest resume fonts are legible, professional, and consistent
  across screen and print.
- Decision changed: the route avoids novelty fonts and keeps the page readable
  in both browser and print contexts.

## 3. Accessibility and Link Semantics

### W3C Writing for Web Accessibility

- Title: W3C WAI - Writing for Web Accessibility
- URL: https://www.w3.org/WAI/tips/writing/
- Finding: content should be clear, concise, and organized with descriptive
  headings and link text that tells users where a link goes.
- Decision changed: section labels are explicit, bullets are short, and link
  text shows the real destination instead of generic labels like "click here".

### W3C Link Purpose

- Title: W3C WAI - Link Purpose (In Context)
- URL: https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html
- Finding: adjacent context should make link destinations clear and usable.
- Decision changed: every contact link is rendered with its actual name or URL
  so the page remains understandable to screen readers and in print.

## 4. Print and Paged Media

### MDN CSS Paged Media

- Title: MDN - CSS paged media
- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media
- Finding: `@page` controls sheet size and margins, and print-specific rules are
  the right place to manage page geometry.
- Decision changed: the route uses explicit A4 print geometry and removes the
  screen chrome from print output.

### MDN break-after

- Title: MDN - break-after
- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
- Finding: `break-after` is the modern way to force a page break; legacy
  page-break properties are compatibility fallbacks.
- Decision changed: the page containers are split deliberately into two print
  pages and the first page forces a page break.

### MDN @page

- Title: MDN - @page
- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/@page
- Finding: `@page` is the right primitive for A4 sizing and print margins.
- Decision changed: the final PDF is tuned against A4, not screen ratio, so the
  printed result is exactly two pages.

## 5. Applied Design Direction

The research points toward an editorial dossier rather than a decorative
portfolio page:

- strong typographic hierarchy
- a compact, recruiter-friendly reading order
- semantic section headings and descriptive links
- text-first print output with explicit A4 page control

That became the basis for the route's two-page layout: a refined serif/sans
pair, a left-side section rail on larger screens, and a print sheet model that
maps directly to the final two A4 pages.

