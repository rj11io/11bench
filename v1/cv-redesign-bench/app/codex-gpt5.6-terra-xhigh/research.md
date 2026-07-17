# Research log — Ricardo Jorge CV redesign

Accessed 2026-07-16. This research informed a two-page industry resume / CV for a senior AI product and frontend engineer, rather than an academic CV.

## Resume structure and scanning

1. [Resumes — UC Berkeley Career Engagement](https://www.career.berkeley.edu/prepare-for-success/resumes/) — accessed 2026-07-16.
   - Recommends a simple, readable format; standard section titles; role, employer and date work-history fields; and reverse-chronological experience. Its ATS guidance warns against headers, footers, text boxes, tables, pictures and graphics in application files because ATS capabilities vary.
   - **Decision changed:** the information is semantic HTML in ordinary source order, with visible `Experience`, employer, role and date text. The print composition uses CSS grid only for visual placement; there are no image-based words, decorative charts or content hidden in a visual-only sidebar.

2. [HES: Create Impactful Resumes and Cover Letters — Harvard FAS Mignone Center for Career Success](https://careerservices.fas.harvard.edu/resources/hes-create-impactful-resumes-and-cover-letters/) — accessed 2026-07-16.
   - Advises clear, direct, fact-based writing; quick scanning; action-led impact; reverse chronology; consistent hierarchy; and an intentional balance of text and white space. It calls out organization, concision and skimmability as common weaknesses.
   - **Decision changed:** one short profile establishes the proposition; the highest-relevance work is first; scope is expressed with concrete products and tools instead of generic adjectives; and the long source CV is edited into selected evidence rather than repeated chronology.

3. [Is it true that recruiters reject a resume in six seconds? — The Ladders](https://www.theladders.com/career-advice/is-it-true-that-recruiters-reject-a-resume-in-six-seconds) — accessed 2026-07-16.
   - A commercial, older eye-tracking report, so it is used as directional evidence rather than a universal timing claim. It reports attention moving through current title/company, prior role, dates and education.
   - **Decision changed:** every role opens with title, employer and a right-aligned date range; page 1 begins with current / recent work; page 2 preserves education and early foundation rather than silently dropping them.

## Contemporary editorial, typographic and information-design direction

4. [Breaking rules and bringing joy: top typography trends for 2026 — Creative Bloq](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026) — accessed 2026-07-16.
   - A contemporary design-industry survey, not a usability standard. It describes a move away from generic stripped-back sans-only identity toward more characterful type, including elegant serif display faces and versatile variable families.
   - **Decision changed:** the design uses a restrained editorial serif for the name, summary and role titles, paired with the installed Inter / Geist system sans and mono faces. It gives the candidate an authored voice without sending a network font, using a novelty typeface, or compromising A4 reliability. It is intentionally *not* a trend collage.

5. [Variable fonts: possible impacts for information design in digital media and the typography area — InfoDesign](https://www.infodesign.org.br/infodesign/article/view/1087) — accessed 2026-07-16.
   - Explains that variable-font systems can hold width, weight, slant and other variations in a single font resource, connecting typographic flexibility to information design.
   - **Decision changed:** a responsive type scale and a small, disciplined weight palette do the practical job here. Existing local font variables avoid an additional delivery risk while the layout keeps the responsive, type-led hierarchy associated with this direction.

6. [The CV — Part 1 Overview — UC Berkeley Career Engagement](https://career.berkeley.edu/grad-students-postdocs/academic-job-search/the-cv-part-1-overview/) — accessed 2026-07-16.
   - Advocates concise, unambiguous language, selective information, white space, consistent formatting and restrained use of visual emphasis so readers can find essentials without effort.
   - **Decision changed:** one strong horizontal rule, a narrow letterspaced rail, controlled serif contrast and grouped micro-lists create an editorial “field report” character. The left rail carries orientation only; it never contains indispensable details.

## ATS, accessibility, links and PDF / print

7. [Web Content Accessibility Guidelines (WCAG) 2.2 — W3C](https://www.w3.org/TR/WCAG22/) — accessed 2026-07-16.
   - WCAG 2.2 specifies at least 4.5:1 contrast for normal text at AA and supports text resizing up to 200% without loss of content or functionality.
   - **Decision changed:** text is ink-on-paper with high contrast; the lime signal is never the sole carrier of information; text remains text; focus styles are visible; and the layout collapses before mobile widths rather than creating horizontal scrolling.

8. [Creating accessible PDFs in Adobe Acrobat — Adobe](https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html) — accessed 2026-07-16.
   - Explains that tagged PDFs preserve a logical structure / reading order and can correctly retain links when tagging occurs during conversion. It cautions that complex columns and irregular alignment are difficult to repair after export.
   - **Decision changed:** the print view is a normal DOM reading sequence with real headings, lists, addresses and links. Its two columns are simple grid regions and the rail is ancillary. Browser print-to-PDF will preserve selectable text and active anchors; anyone needing formal PDF/UA conformance should run the exported file through a tagged-PDF checker because browser output is not guaranteed to be PDF/UA.

9. [CSS Paged Media Module Level 3 — W3C](https://www.w3.org/TR/css-page-3/) and [break-before — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-before) — accessed 2026-07-16.
   - The CSS paged-media specification defines A4 as 210 × 297 mm and lets `@page` set size and margins. `break-before` / its legacy aliases provide deliberate page boundaries.
   - **Decision changed:** the screen document is explicitly two A4-sized sections in print, with `@page { size: A4 portrait; margin: 0 }`, a forced break after page 1, `break-inside: avoid` on experience entries, and no forced break after page 2. This is verified from browser-generated PDF page count and rendered pages, not assumed from CSS alone.

## Research boundary

The sources guide hierarchy, accessibility and format rather than assert facts about Ricardo Jorge. Candidate claims, dates, employers and URLs originate solely in `ref/RJ_CV.pdf` and `ref/RJ_CV_max.pdf`; their reconciliation is recorded in `content.md`.
