# Research notes

Research done live via web search on 2026-07-16 for this run. Sources below are what actually shaped decisions — not a generic reading list. Each finding says what it changed in `content.md` or `design.md`.

## 1. How recruiters actually scan a CV

**Source:** Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant" — nngroup.com/articles/f-shaped-pattern-reading-web-content/ (accessed 2026-07-16)

**Finding:** People scan in an F shape — a full pass across the top, a shorter pass lower down, then a vertical scan down the left edge. They don't read line by line. Good design can loosen this pattern by giving strong left-edge anchors (headings, bold labels) so the reader doesn't have to fight the page.

**Source:** HR Dive / TheLadders eye-tracking study, reported across multiple 2026 recruiting-industry summaries (a4cv.app, resumeheatmap.com — accessed 2026-07-16, cross-checked against the original 2018 TheLadders methodology)

**Finding:** Recruiters spend roughly 6-8 seconds on a first pass and fixate on six spots: name, current title, current company, dates, previous role, education. About 80% of attention lands in the top third of the page.

**Decision this changed:** The header must carry name, title, location, and every contact link in one immediately legible block — [design.md](design.md) puts this in a fixed-height band that's identical on both screen and print, so the six fixation points are readable in the first look. Job title and company name are pulled to the left edge, bold, ahead of the date — not buried after a dash — because the left edge is where the vertical scan lands.

## 2. Content structure and length for a senior engineer

**Source:** Butterick's Practical Typography, "Résumés" — practicaltypography.com/resumes.html (accessed 2026-07-16)

**Finding:** The "must fit on one page" rule is a myth that produces cramped, illegible resumes. Two pages is fine if the first page still carries the most important facts, because some readers stop after page one. Employer and school names should be immediately visible — they're recognition anchors. Headings and decorative boxes should be smaller and quieter than the body text they introduce, not the other way around; over-styled headers waste the reader's attention budget on navigation instead of substance.

**Decision this changed:** Page one of print = identity, positioning, skills, and the two most recent/relevant roles (rj11io, Hunt Intelligence). Page two = earlier roles, education, and projects. Section labels are small-caps or uppercase micro-labels, not big styled headers, keeping the visual weight on names, titles, and bullets.

**Source:** search synthesis of 2026 senior-engineer resume guidance (resumly.ai, interviewkickstart.com, techinterviewhandbook.org — accessed 2026-07-16; treated as directional industry-consensus signal, not primary authority, since these are commercial guides)

**Finding:** Senior-level resumes should foreground scope and leadership over tool lists; AI-tool fluency in 2026 is table stakes and should show up as a bullet outcome ("built X with AI agents"), not just a skill tag. Group skills by category rather than one long comma list mixed together.

**Decision this changed:** Kept the candidate's existing category grouping (Core Stack / AI Engineering / UI & Data / Leadership & Delivery) from the source PDFs rather than inventing a new taxonomy, and made sure every AI-related bullet in Experience states an outcome, not just a tool name.

## 3. ATS and link handling

**Source:** cross-referenced 2026 ATS-formatting guides (jobscan.co, resumeadapter.com — accessed 2026-07-16)

**Finding:** ATS parsers read single-column, text-based layouts most reliably; visible URL text (not just "click here" link text) survives parsing failures; standard section headings ("Experience," "Education," "Skills") help parsers contextualize content; tables and multi-column layouts are risky.

**Decision this changed:** The DOM order is single-column and linear (header → about → skills → experience → projects → education), matching visual order, so both ATS text-extraction and screen readers get the same sequence. Every link shows its visible domain (`rj11.io`, `github.com/rj11io`) rather than a bare icon or "here," per the CV author's own existing convention in both source PDFs.

## 4. Editorial typography direction for 2026

**Source:** search synthesis of 2026 typography/design-trend coverage (printmag.com Type Report, designmonks.co, itsnicethat.com — accessed 2026-07-16)

**Finding:** Current CV/editorial direction pairs a confident serif or humanist display face for names/headings with a restrained sans or mono for body/meta text, uses a muted neutral palette with a single accent, and leans on generous whitespace and modular grids rather than color blocks or icons to create hierarchy.

**Decision this changed:** Chose a serif display face for the name/title masthead (echoing both source PDFs, which already use a serif for "Ricardo Jorge") paired with the existing Inter sans for body copy, one restrained ink-black/graphite palette for print, and a single muted accent color for screen-only chrome (the print button, section rules). No icons, no photo, no color blocks — density and rhythm carry the hierarchy. Full rationale in [design.md](design.md).

## 5. Accessibility and contrast

**Source:** WebAIM, "Contrast and Color Accessibility" and "WCAG 2.0 and Link Colors" — webaim.org/articles/contrast/, webaim.org/blog/wcag-2-0-and-link-colors/ (accessed 2026-07-16)

**Finding:** Body text and links need ≥4.5:1 contrast against the background (3:1 for large text). If a link isn't underlined, it needs ≥3:1 contrast against surrounding body text plus a distinct focus/hover cue — underlining by default is the simplest way to satisfy this without extra states.

**Decision this changed:** Links are underlined by default (not just on hover), set in near-black on white for print and a high-contrast ink tone on screen in both light and dark mode, so no separate focus-only treatment is needed. Verified all screen text combinations meet 4.5:1 against both light and dark backgrounds.

## 6. Print pagination mechanics

**Source:** MDN, "@page" and "CSS paged media" — developer.mozilla.org/en-US/docs/Web/CSS/@page, developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media (accessed 2026-07-16)

**Finding:** `@page { size: A4; margin: ... }` sets physical page dimensions and margins for print. `break-inside: avoid` (the modern property; `page-break-inside` is the legacy alias some engines still need) keeps a block from splitting across a page boundary, and `break-before: page` forces a clean start to a new page.

**Decision this changed:** `design.md` documents the exact print stylesheet: `@page { size: A4; margin: 14mm 16mm }`, `break-inside: avoid` on every experience entry and skill group so a role never splits mid-bullet, and one explicit `break-before: page` between the page-one and page-two content blocks so pagination is deliberate rather than accidental overflow. The screen-only "Download PDF" button and any hover affordances are hidden with `@media print`.

## Limitations

Web search was available for this run, so the sources above are live results rather than fabricated citations. Several 2026-dated "resume guide" sites (resumeoptimizerpro, resumeheatmap, resumeadapter, etc.) are commercial SEO content rather than primary research — I treated their claims as directional industry consensus and cross-checked the load-bearing ones (scan time, F-pattern, contrast ratios, print CSS) against a primary source (NN/g, WebAIM, MDN, Butterick) before acting on them. No source was invented; anything I could not verify live is marked as industry-consensus synthesis above rather than presented as a single authoritative citation.
