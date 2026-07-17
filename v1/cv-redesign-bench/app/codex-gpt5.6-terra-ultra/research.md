# Research - senior AI product / frontend engineer CV

Research completed: 16 July 2026

## Working premise

This is a two-page industry CV for a senior engineer working across AI-enabled
products, frontend systems, data visualization, and hands-on product delivery.
It is not an academic CV. The first scan needs to expose the candidate's level,
employers, chronology, technical depth, and verifiable links without requiring
the reader to decode decoration.

## Sources, findings, and resulting decisions

| Source | Accessed | Concise finding | Decision changed |
| --- | --- | --- | --- |
| [Resumes - UC Berkeley Career Engagement](https://www.career.berkeley.edu/prepare-for-success/resumes/) | 2026-07-16 | Strong resumes foreground relevant outcomes, concise action-led phrasing, and clear work-history fields. Its ATS guidance cautions against text boxes, graphics, pictures, and nonessential decorative formatting. | Make reverse-chronological experience the dominant narrative. Keep employer, title, date, and technical claims as real text; no visual element carries essential content. |
| [Write a Resume/CV - University of Pennsylvania Career Services](https://careerservices.upenn.edu/channels/resume/) | 2026-07-16 | Important material should jump off the page through clear hierarchy, white space, and a consistent simple format. For software roles, GitHub and a personal site can be useful in the header; skills should be objective. | Put the portfolio, GitHub, LinkedIn, and email in the identity strip. Group only directly evidenced technical skills; demonstrate leadership through role bullets instead of generic soft-skill labels. |
| [TheLadders Eye-Tracking Study (2018)](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf?type=standard) | 2026-07-16 | This commercial two-stage study found an average 7.4-second initial screen and attention concentrated on job titles, the top, and the left. It favors clear headers, bold role anchors, short accomplishment bullets, and warns against clutter. | Place identity, positioning, and the three most recent roles on page one. Use strong title/date anchors and short evidence-led bullets. Treat the time figure as directional rather than universal because the study is dated and commercial. |
| [F-Shaped Pattern of Reading on the Web - Nielsen Norman Group](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) | 2026-07-16 | Time-constrained readers scan top and left areas of unformatted text. Meaningful headings, information-bearing opening words, bullets, and reduced filler improve scanability; responsive reflow changes scan behavior. | Use a left-aligned, single logical reading sequence. Start bullets with the work performed, not adjectives, and let mobile reflow preserve that sequence. |
| [Typography - U.S. Web Design System](https://designsystem.digital.gov/components/typography/) | 2026-07-16 | Readability depends on both type details and page arrangement. It recommends flush-left text, a comfortable body size, and roughly 45-90 characters per line for longer prose. | Use a restrained sans-serif editorial hierarchy with modest monospaced metadata. Set flush-left text, comfortable leading, and spacing/rules rather than dense cards, charts, or display effects. |
| [Web Content Accessibility Guidelines 2.2 - W3C](https://www.w3.org/TR/WCAG22/) | 2026-07-16 | WCAG 2.2 covers contrast, meaningful structure, visible keyboard focus, text resizing, and link purpose. | Use one `h1`, ordered section headings, real anchors with descriptive labels, visible focus rings, high-contrast text, and no color-only meaning. |
| [Printing - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing), [CSS Paged Media Module Level 3 - W3C](https://www.w3.org/TR/css-page-3/), and [break-inside - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside) | 2026-07-16 | `@media print`, `@page`, and CSS break controls enable A4-specific output, although browsers still require final verification. A4 is 210 x 297 mm. | Build two explicit A4 page groups, force only the break after page one, prevent individual role blocks from splitting, remove screen controls in print, and verify the actual browser PDF. |
| [Creating accessible PDFs - Adobe Acrobat](https://helpx.adobe.com/acrobat/using/creating-accessible-pdfs.html) and [PDF9: Providing headings by marking content with heading tags - W3C](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF9) | 2026-07-16 | PDF reading order benefits from a simple source structure, tagged headings, active links, and text rather than image-based content. Complex columns and layout tables can create poor tags or reading order. | Keep DOM order equal to the intended reading order. The wide-screen two-page spread is visual only: each page is linear semantic HTML, and the print source remains text, headings, lists, and links. |

## Research-led content structure

1. **Identity and contact strip** - full name, factual role, location, email,
   portfolio, GitHub, and LinkedIn.
2. **Two-paragraph profile** - specific career history and focus only; no
   unsupported scale, outcomes, or personality claims.
3. **Experience** - reverse chronological and visually dominant. Each role
   preserves title, employer, dates, and action-led source-backed claims.
4. **Independent work** - only three directly evidenced projects that clarify
   the candidate's current AI/open-source direction.
5. **Technical toolkit** - grouped factual inventory without self-ratings or
   proficiency bars.
6. **Education** - compact, factual, and explicitly not represented as a
   bachelor's degree.

## Contemporary visual direction

The chosen direction is a **restrained editorial product dossier**. It avoids
the generic "futuristic AI" trope and makes the evidence feel primary:

- A crisp system sans-serif does all reading work; the existing monospace
  system face is reserved for dates, URLs, page markers, and section labels.
- Hierarchy comes from weight, small scale changes, whitespace, and hairline
  rules. There are no photos, skill meters, logo grids, gradients inside the
  document, charts, or ornamental timelines.
- On a wide screen the two intentional pages appear as a quiet document
  spread. The underlying DOM is still one linear sequence and becomes stacked
  pages on small screens.
- A muted teal is a screen accent only. It never identifies information by
  itself, and print is forced to black text on white paper.

## ATS, accessibility, links, and PDF safeguards

- The browser-generated PDF is a presentation version, not a promise that
  every ATS will parse it identically. All substantive content remains in
  plain HTML text and in `content.ts`, the structured derivation of
  `content.md`.
- No name, link, heading, skill, or work history is encoded in an image, SVG
  path, background image, CSS pseudo-content, or visual reordering.
- The interface uses `main`, `header`, `section`, ordered headings, `ul` for
  experience bullets, `dl` for skills, `time` for dates, and real anchor tags.
- Visible link labels retain the actual candidate domains for print. The
  interactive button has an accessible name and is absent from print.
- The screen palette is designed for normal-text AA contrast and has visible
  keyboard focus. Mobile reflow has no horizontal scrolling and does not rely
  on hover.

## Exact two-page A4 strategy

- `@page` is set to A4 with zero browser margin; each `.sheet` is explicitly
  `210mm x 297mm` in print.
- The first sheet ends with the sole forced page break. The second does not
  request a trailing break, avoiding a blank third page.
- Page one contains the identity, profile, chronology cues, and three recent
  high-signal roles. Page two holds the remaining chronology, selected work,
  toolkit, and education.
- Role records, project rows, skill rows, and education are marked
  `break-inside: avoid`; no whole-page container is made unbreakable.
- Print strips the download control, screen shadow, and color dependency;
  active links remain visible, underlined text.
