# Research

Accessed 16 July 2026.

| Source | Finding | Design/content decision changed |
|---|---|---|
| [NN/g, F-Shaped Pattern of Reading on the Web](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) | Visitors usually scan, especially when content is dense; descriptive headings and visual chunking help. | Put role, contact details, compact profile, skills, and recent experience in predictable reading order; use short bullets and strong job headers. |
| [NN/g, Strategic Design for FAQs](https://media.nngroup.com/media/reports/free/Strategic_Design_for_Frequently_Asked_Questions.pdf) | Proper heading structure helps readers and screen-reader users skim; grayscale testing reveals weak hierarchy. | Semantic h1/h2/h3 structure, rules and type hierarchy instead of colour-only grouping; print is black on white. |
| [W3C, Understanding WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) | Normal text needs at least 4.5:1 contrast. | Dark ink on warm paper and black print; the coral accent never carries meaning alone. |
| [MDN, @page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page) | `@page` controls printed page dimensions and margins. | A4 page rule plus two fixed, explicit print page containers and a deliberate break. |
| [ATS Friendly, ATS Resume Checker guidance](https://www.atsfriendly.com/) | Standard section names, simple readable text, and avoiding graphic-only information improve machine parsing. | Real HTML text, standard section labels, literal role/company/dates, visible URLs, and no progress bars or skill charts. |

Contemporary direction: an editorial “field notes” treatment, rather than a generic dashboard UI. A restrained serif display face gives the profile a considered product/editorial tone while a robust system sans keeps scanning and PDF rendering dependable. Fine rules, one vermilion accent, generous desktop whitespace, and a strict print grid support an experienced AI/frontend profile without visual noise.

PDF/link considerations: all key destinations are ordinary anchor links with meaningful visible labels; print removes decorative colour and the screen-only action. The browser print dialogue creates the PDF, preserving selectable text and links where the browser supports them. The layout has been designed against an A4 `@page` size with an explicit page boundary.
