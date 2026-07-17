# CV redesign research

Research date / access date: 2026-07-16.

## Sources, findings, and changed decisions

### Ladders — “Keeping an eye on recruiter behavior”

URL: https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf

The 2018 eye-tracking study reports an average 7.4-second initial screen and
finds stronger performance from résumés with clear hierarchy and an organised,
predictable layout. It is a small commercial study, so the exact number is
treated as directional rather than universal.

**Decision changed:** identity, role, location, current scope, dates, employer
names, and core skills are made visually retrievable without reading prose.
Experience uses a consistent role/employer/date pattern and short bullets.

### LinkedIn Talent Blog — “How to Get Started with Skills-Based Hiring”

URL: https://www.linkedin.com/business/talent/blog/talent-acquisition/how-to-get-started-with-skills-based-hiring

LinkedIn frames skills and competencies as stronger hiring signals than
pedigree proxies and recommends matching screening criteria to skills and
evidence of mastery.

**Decision changed:** a compact “Capabilities” block appears before experience,
and role bullets pair tools with shipped product surfaces rather than listing a
large undifferentiated technology inventory.

### LinkedIn Talent Blog — “LinkedIn Data Points Out 2 Simple Ways to Improve
Skills-Based Hiring”

URL: https://www.linkedin.com/business/talent/blog/talent-acquisition/2-simple-ways-to-improve-skills-based-hiring

LinkedIn’s July 2023–June 2024 analysis says concrete skills are common in job
posts and that recruiters can search/filter explicitly by skill.

**Decision changed:** canonical names such as TypeScript, React, Next.js,
Playwright, agent harnesses, design systems, and data visualisation remain
literal text in semantic HTML. They are not replaced by icons or vague labels.

### GOV.UK Service Manual — “Writing for user interfaces”

URL: https://www.gov.uk/service-manual/design/writing-for-user-interfaces

GOV.UK notes that people scan online content rather than reading every word and
advises designing for incomplete reading.

**Decision changed:** sentences front-load the product or ownership signal,
headings use plain language, paragraphs are short, and important claims do not
depend on a long biography.

### Office for National Statistics Design System — “Typography”

URL: https://service-manual.ons.gov.uk/design-system/foundations/typography/

ONS treats typography as the primary interface and uses size and weight to
create hierarchy and legibility.

**Decision changed:** the visual system uses a restrained editorial type scale,
strong role titles, small uppercase section locators, generous leading, and
rules/spacing rather than decorative containers for separation.

### W3C WAI — WCAG 2.2 Technique G183, link contrast

URL: https://www.w3.org/WAI/WCAG22/Techniques/general/G183

Links identified by colour alone need sufficient contrast with surrounding
text and an additional visual cue; hover-only cues are insufficient.

**Decision changed:** inline links are visibly underlined (with offset) on
screen and in print. Focus-visible controls receive a high-contrast outline.

### W3C WAI — “Colors with Good Contrast”

URL: https://www.w3.org/WAI/perspectives/contrast.html

Text, icons, and controls require sufficient luminance contrast, including for
people with low contrast sensitivity.

**Decision changed:** body copy uses near-black on warm white, secondary copy
stays dark enough to remain readable, and the accent is reserved for large
display type, rules, links, and controls. Print forces black-on-white.

### Adobe Acrobat — “Accessibility features in PDFs”

URL: https://helpx.adobe.com/acrobat/using/accessibility-features-pdfs.html

Adobe identifies searchable text, Unicode-capable fonts, meaningful links,
reading order, document structure, and language as characteristics of useful
accessible PDFs.

**Decision changed:** the page is semantic text with a logical DOM order,
heading hierarchy, real anchors, no canvas/image text, and system fonts that
print as extractable text. Screen order and print order are the same.

### Adobe Acrobat — “Customize web page to PDF conversion settings”

URL: https://helpx.adobe.com/acrobat/desktop/create-documents/create-pdfs/web-to-pdf-settings.html

Adobe exposes page size, orientation, margins, link underlining, background
retention, and scaling as key web-to-PDF variables.

**Decision changed:** print CSS declares A4 portrait with zero browser page
margin, provides its own physical margins inside two fixed page containers,
underlines links, removes colour/background dependence, and prevents scaling
surprises through explicit millimetre dimensions.

## Structure conclusions for this profile

For a senior AI product/frontend engineer, the first page must answer four
questions quickly: what they are, what they build, at what level they operate,
and which current skills support that claim. Reverse-chronological experience
then supplies evidence. Projects are useful because open-source AI work is
current and directly inspectable, but they should not outrank professional
delivery. Education is necessary but low in the hierarchy for a decade-long
career.

The strongest differentiator in the source is not “frontend” or “AI” alone. It
is the combination of zero-to-one product delivery, complex data interfaces,
agent systems, and the ability to establish a team’s frontend operating
system. The rewrite therefore repeats that through different evidence rather
than through self-evaluative adjectives.

## Contemporary visual and print direction

The selected direction is a light editorial dossier: warm paper, ink-black
type, one electric-cobalt accent, fine rules, compact folios, and a disciplined
asymmetric grid. It borrows from contemporary report and independent-publishing
design without becoming magazine-like or sacrificing ATS parsing.

Avoided directions:

- skill charts and rating bars, because the sources provide no defensible scale;
- portrait photography, because it consumes space and is irrelevant to the
  evidence;
- a narrow sidebar in print, because multi-column reading and extraction can be
  fragile;
- oversized “personal brand” decoration, because the CV must remain a working
  hiring document.

## ATS, accessibility, links, and PDF checklist

- Standard section labels and reverse chronology.
- Employer, role, date, and skill terms remain literal searchable text.
- No information encoded only as an icon, colour, chart, or tooltip.
- Semantic landmarks, heading levels, lists, and address/contact markup.
- Meaningful anchor text and full href targets.
- Visible focus state, underlined inline links, and reduced-motion respect.
- Minimum screen body size of 16px on mobile; print body approximately 9pt.
- `window.print()` is isolated to a small client component; core content stays
  server-rendered.
- Two explicit `.sheet` elements become exactly two A4 pages under print CSS.
- Page breaks are deliberate; entries are protected from splitting.
- Print removes controls, shadows, dark-mode effects, and forces white paper.
- Final QA includes PDF page count, text extraction, link annotations, desktop
  and 375px screenshots, and visual inspection of every printed page.

