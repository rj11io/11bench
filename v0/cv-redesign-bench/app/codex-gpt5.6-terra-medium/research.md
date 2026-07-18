# Research log

Accessed 16 July 2026. This research informed an editorial, semantic HTML CV rather than a graphic-heavy portfolio page.

| Source | Finding | Decision changed |
|---|---|---|
| [NN/g, “F-Shaped Pattern of Reading on the Web”](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) | People frequently scan the top and left of web content; unformatted text exacerbates it. | Put role, location and contact at the top; use short section labels, a strong left edge and small, parallel project/experience entries. |
| [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Normal text needs 4.5:1 contrast at AA; text should resize without loss of content/function. | High-contrast ink/paper palette, visible keyboard focus, real text rather than image text, and a one-column mobile reflow. |
| [WebAIM, HTML Semantics and Accessibility Cheat Sheet](https://webaim.org/resources/htmlcheatsheet/) | Links need descriptive contents and a visible focus indicator; semantic elements convey function. | Use heading hierarchy, sections, lists, time elements and fully labelled contact links; the print control is a button. |
| [WebAIM, PDF Accessibility](https://webaim.org/techniques/acrobat/) | Tagged structure is essential to a genuinely accessible PDF; functional links improve usefulness. | Preserve a semantic HTML source and actual anchors so browser-generated PDFs retain useful structure and links where supported. |
| [MDN, `@page`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page) and [`break-before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-before) | CSS paged media controls sheet size/margins; page breaks are explicitly controllable. | Use two fixed A4 sections, `@page { size: A4 portrait; margin: 0 }`, and forced break-after only on page one. |

## Editorial and visual direction

The profile calls for an editorial technical CV: an off-white sheet, dark ink, restrained teal navigation accents, a serif display face for the name and summary, and compact sans-serif operational detail. This avoids a generic “AI neon” treatment while echoing the candidate’s work in data products: hierarchy is measured, structured and legible. The design deliberately privileges recency, named systems and leadership scope rather than attempting to reproduce the longer narrative.

## ATS, links and print

The reading order is ordinary DOM order, with recognizable experience headings, employers, dates and skills in text. No critical detail lives in an image, canvas or decorative icon. URLs are functional anchors and remain underlined/black in print. Browser print is a presentation aid, not claimed as a fully remediated accessible PDF; the HTML page remains the accessible canonical representation. The print sheet uses black on white, resilient 9-15px print typography, controlled breaks, and avoids splitting an experience entry.
