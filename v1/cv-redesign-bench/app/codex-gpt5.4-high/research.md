# Research Notes

Access date for all sources: 2026-07-16.

## Resume Structure And Scan Behavior

### 1. Harvard College Guide to Creating a Strong Resume

- URL: https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
- Finding: A resume should be concise, informative, tailored, and weighted toward
  strongest assets rather than full autobiography.
- Decision changed: I removed the conversational long-form opener and built a
  top-loaded summary plus prioritized experience structure.

### 2. Harvard Extension School Resume Samples

- URL: https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2026/02/HES-Resume-samples-combined.pdf
- Finding: Experience should start with the most recent role, use action-led
  bullet phrasing, and include a skills section earlier when the role depends on
  technical fluency.
- Decision changed: The route keeps reverse-chronological experience, places
  capability bands high on page one, and rewrites role bullets as compact
  achievement phrases instead of prose paragraphs.

### 3. Nielsen Norman Group, "Text Scanning Patterns: Eyetracking Evidence"

- URL: https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- Finding: Readers scan instead of reading linearly, and layout plus page cues
  strongly shape what gets noticed first.
- Decision changed: I used a strong top band, short section labels, obvious
  chronology, and tight blocks that reward scanning down the left edge and across
  prominent headings.

## ATS, Accessibility, Links, And PDF / Print Constraints

### 4. Indeed, "How To Write an ATS Resume (With Template and Tips)"

- URL: https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template
- Finding: ATS parsing favors simple structure, clear headings, and relevant
  keywords; overly decorative headers, tables, and graphics can reduce parsing
  reliability. Indeed also notes that `.docx` is often safest, with PDFs accepted
  variably by employer workflow.
- Decision changed: The rendered CV uses standard semantic headings and real text,
  not canvas tricks or image-based sections. The design is visually editorial,
  but the DOM remains straightforward and text-first.

### 5. W3C WCAG 2.2, "Link Purpose (In Context)"

- URL: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- Finding: Link text should make purpose clear, ideally without forcing users to
  infer destination from surrounding layout.
- Decision changed: Contact and project links are labeled with recognizable
  destinations and context, not isolated "click here"-style affordances or
  icon-only links.

### 6. W3C WCAG 2.2, "Use of Color"

- URL: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
- Finding: Authors must not depend on color alone to distinguish information, and
  text links still need sufficient contrast against the page background.
- Decision changed: Links are underlined or structurally separated in addition to
  color, and print mode forces black text on white paper.

### 7. MDN, "Printing"

- URL: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing
- Finding: `@media print` and `@page` are the standard mechanisms for designing a
  page specifically for print or PDF output.
- Decision changed: I built dedicated print rules instead of hoping the screen
  layout would incidentally print well.

### 8. MDN, "CSS paged media" and `@page size`

- URLs:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Paged_media
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40page/size
- Finding: paged media is the correct model for size, margins, and page breaks;
  the page box should be explicitly sized when exact paper output matters.
- Decision changed: Each printed sheet is authored as an A4-sized page with
  explicit `@page` sizing and deliberate page boundaries.

### 9. MDN, `page-break-after` and `page-break-inside`

- URLs:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page-break-after
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page-break-inside
- Finding: legacy `page-break-*` properties are deprecated in favor of
  `break-after` and `break-inside`.
- Decision changed: Print CSS uses modern break properties first, with the legacy
  aliases avoided rather than treated as the primary solution.

## Contemporary Editorial, Typographic, And Information-Design Direction

### 10. Monotype, "Type Trends 2025: Re:Vision"

- URL: https://www.monotype.com/type-trends
- Finding: Monotype frames contemporary typography as more than neutral utility:
  type should respond to culture, AI, emotion, and identity instead of flattening
  everything into the same corporate sans voice.
- Decision changed: I chose a warm editorial serif for the candidate name and role
  framing, paired with a pragmatic sans for dense operational content. The goal is
  to signal both human authorship and technical credibility.

### 11. Adobe Blog, "How creators are leveraging Adobe's 2026 Creative Trends"

- URL: https://blog.adobe.com/en/publish/2026/01/08/how-creators-leveraging-adobe-2026-creative-trends
- Finding: Current visual culture is rewarding work that feels tactile,
  emotionally legible, authentic, and useful rather than sterile or purely
  decorative.
- Decision changed: The screen design uses a warm paper-like surface, restrained
  texture, and a humanized editorial mood, but keeps the information architecture
  rigid enough for resume scanning and print.

## Synthesis

- This profile benefits from a hybrid approach:
  - executive clarity at the top,
  - technical credibility in the middle,
  - compressed chronology below,
  - and just enough personality to avoid looking machine-flattened.
- The research argues against two common failure modes:
  - over-designed resume art that breaks ATS and print,
  - bland utility layouts that erase differentiation for a senior product-facing
    engineer.
