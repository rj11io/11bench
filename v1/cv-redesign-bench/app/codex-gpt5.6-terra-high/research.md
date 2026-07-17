# Research notes

Accessed 2026-07-16. This research informs a responsive web CV and its two-page printed counterpart; it does not replace the two frozen CV PDFs as factual evidence.

## Structure and scanning

| Source | Finding | Decision changed |
| --- | --- | --- |
| [Harvard FAS, *Harvard College Guide to Creating a Strong Resume*](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) | A resume is read by people and systems that scan quickly. | Put role, employer, dates, capabilities, and contact details in predictable text rather than relying on a visual timeline or hidden interaction. Lead with a short role-specific profile. |
| [UC Berkeley Career Engagement, *Resumes*](https://www.career.berkeley.edu/prepare-for-success/resumes/) | Effective resumes make results and relevance clear; use readable type, restrained emphasis, and space. A second page is appropriate for substantial relevant experience. | Use a two-page, experience-forward structure: the strongest current roles receive bullets; legacy roles become a compact ledger. Rewrites foreground scope and technical product ownership, not unsupported outcomes. |
| [Harvard Extension School, *Create Impactful Resumes and Cover Letters*](https://careerservices.fas.harvard.edu/resources/hes-create-impactful-resumes-and-cover-letters/) | Readability, a quick scan, and a balance of text and white space are common failure points. | Establish a repeated date / title / employer / evidence pattern with generous screen whitespace and controlled print density. |

### Interpretation for this profile

The evidence supports positioning Ricardo first as an AI product engineer, then substantiating that claim through the durable through-lines: React/Next.js, data-rich interfaces, frontend architecture, and team-enabling delivery. The most recent three roles are given the clearest scan path; BinaryEdge remains selected because it substantiates leadership and security-platform work. A separate skills block supplies relevant keywords without becoming a keyword cloud.

## Contemporary editorial and information-design direction

| Source | Finding | Decision changed |
| --- | --- | --- |
| [W3C WAI, *Designing for Web Accessibility*](https://www.w3.org/WAI/tips/designing/) | Design should use sufficient contrast, headings and spacing to group content, identifiable controls, and layouts that adapt to viewport size. | Use a calm paper ground, near-black text, visible section rules, semantic headings, real links, and a simple responsive collapse instead of a decorative dashboard treatment. |
| [W3C WAI, *Understanding SC 1.4.1: Use of Color*](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Color cannot be the only carrier of information; text links also need sufficient contrast. | The acid-lime screen accent is only a control-state flourish. Dates, hierarchy, link status, and section grouping survive in monochrome through labels, rules, underline, position, and weight. |
| [W3C WAI, *Understanding SC 1.4.3: Contrast (Minimum)*](https://www.w3.org/WAI/WCAG20/Understanding/contrast-minimum.html) | Normal text needs robust foreground/background contrast; thin or unusual type can reduce perceived readability. | Use a robust system sans for body text and monospace only for short metadata labels. Avoid low-contrast editorial gray for body copy. |

The visual direction is a restrained technical editorial: a large compact nameplate, monospace metadata, a Swiss-like grid, fine rules, and an off-white page. It signals product craft and data-interface fluency without competing with the CV. This is intentionally more legible than a portfolio site and more contemporary than a conventional word-processor resume.

## ATS, links, accessibility, and PDF / print

| Source | Finding | Decision changed |
| --- | --- | --- |
| [UC Berkeley Career Engagement, *Resumes*](https://www.career.berkeley.edu/prepare-for-success/resumes/) | For ATS uploads, standard headings, fonts, work-history fields, and avoidance of text boxes, complex tables, pictures, and graphics are safest. | Preserve an HTML-first, single-column reading order within each section; use standard text headings and no information-bearing imagery. This bespoke webpage should be printed to PDF for human review, while the source hierarchy remains machine-readable. |
| [W3C WAI, *Understanding SC 2.4.4: Link Purpose (In Context)*](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Link text or its programmatically determinable context should identify its purpose. | Visible email, site, GitHub, LinkedIn, employer, and project link labels identify destinations. Icon-only links are avoided. |
| [W3C, *PDF Techniques for WCAG 2.0*](https://www.w3.org/TR/WCAG-TECHS/pdf.html) | PDF links and link text need meaningful authoring; accessible source markup before conversion is the safer path. | Retain semantic `<a>` elements and descriptive visible text in the print source. `window.print()` delegates the final PDF to the user’s browser, so tagged-PDF behaviour is browser-dependent and should be checked in the chosen print dialog. |

Print-specific implementation: `@page` declares A4 portrait with zero browser margin; each `.sheet` is exactly `210mm × 297mm`, has an explicit page break after it, and the final sheet suppresses that break. Screen-only toolbar controls are hidden. The print palette is forced to black on white and every content block is sized and authored to fit within each sheet. Browser print settings must keep scale at 100% and browser headers/footers disabled to preserve the two-page result.

## Source discipline

No design implementation from other benchmark runs was inspected or used. Claims and dates come only from `RJ_CV.pdf` and `RJ_CV_max.pdf`; their reconciliation and all editorial choices are recorded in `content.md`.
