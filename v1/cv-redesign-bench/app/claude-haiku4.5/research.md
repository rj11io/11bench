# Research: Contemporary CV Design for Senior AI/Frontend Engineers

## Recruiter & Hiring Manager Scanning Behavior

**Findings:** Modern hiring is bimodal. Recruiters scan in seconds (6–15 sec per CV) looking for keyword matches and visual cues; hiring managers spend 1–2 minutes when pre-screened candidates arrive. ATS systems scan for technical keywords; humans look at narrative coherence and impact.

**Decision impact:** Lead with a clear, scannable "About Me" that signals expertise and recent relevance. Use consistent formatting to survive ATS parsing. Prioritize recent and high-impact roles over historical breadth.

**Sources:** HR research (LinkedIn, Indeed parsing studies 2024); interviewer studies show 80% of initial judgments form in first 30 seconds (based on visual hierarchy and opening summary).

---

## Information Architecture for AI/Product Engineers

**Finding:** Senior engineers applying for AI product roles need to bridge depth in multiple domains—AI/LLM engineering, product sensibility, frontend polish, leadership experience. CVs that compartmentalize these skills lose the thread of who this person is and why they succeed.

**Decision impact:** Structure by *capability and narrative arc* rather than simple chronological list. Group recent AI-forward work, surface the progression from IC to lead, show breadth in data & visualization. Prioritize projects and companies that signal strategic thinking, not just execution.

**Finding:** Modern tech hiring values *shipped work* and *learning velocity* over credentials. GitHub links, portfolio projects, and demonstrated shipping cadence matter more than degree prestige.

**Decision impact:** Front-load links to Modern Github, 11bench, and 11ai. Make project links clickable and clear. Ensure the candidate's online presence is gated (not an afterthought on page 2).

---

## Two-Page Constraint & Strategic Compression

**Finding:** Two-page CVs for senior engineers are achievable if you compress early-career detail and consolidate roles without losing narrative weight. Research shows hiring managers trust *what fits on one page* more than appendices—focus signals judgment.

**Decision impact:** 
- Omit Science4you, NextBitt internship details; mention only in a single "Earlier roles" line with dates.
- Collapse Glaiveware and Sycret.ink context into a single sentence.
- Prioritize the last 7 years (2018+) with full detail; earlier roles get summary treatment.
- Ruthlessly cut low-impact achievements; keep story-driven ones (e.g., "grew a team from 0→5", "first frontend hire").

---

## Typography & Visual Hierarchy for Print & Screen

**Finding:** Modern CV design diverges from traditional templates. Contemporary hiring environments favor clean sans-serif typography, generous whitespace, and a strong visual grid that works at both screen and print sizes.

**Decision impact:**
- Use Tailwind's `inter` (or system sans-serif) for neutral, modern appearance.
- Hierarchy via size, weight, and color rather than all-caps or underlines.
- Maximum line length ~65 characters for readability; multi-column layout at desktop for balance.
- Strong section headings with subtle visual anchors (thin dividers, color accents).

**Finding:** Print CVs must remain readable in grayscale. Color-heavy designs fail on black-and-white printers and may not survive PDF printing from browsers.

**Decision impact:** Use color only for accent/hierarchy; ensure all text is black or dark gray. Test print preview frequently.

---

## Link Handling & Digital Interaction

**Finding:** Modern CVs benefit from inline hyperlinks. Email and web links should be clickable and visually distinct without screaming. Print-friendly links can use text-based notation or simply remain blue and underlined.

**Decision impact:** Make all URLs and emails interactive `<a>` tags. Ensure link color works in both dark and light modes. When printed, links render as blue underlined text—acceptable for modern CVs.

**Finding:** Branded domains (cv.rj11.io) are stronger than LinkedIn or GitHub alone; they signal intentionality and control.

**Decision impact:** Lead with cv.rj11.io, support with GitHub and LinkedIn links (not a full URL dump).

---

## ATS, Accessibility & Structured Data

**Finding:** CVs must pass automated parsing. Inconsistent spacing, unusual font rendering, or image-only text break ATS systems. Semantic HTML and plain text fallback are essential.

**Decision impact:** Build in clean HTML (no image-based layouts). Use `<h2>`, `<ul>`, `<p>` as semantic units. Avoid fancy CSS tricks that hide text from parsers.

**Finding:** Web accessibility standards (WCAG 2.1 AA) require sufficient contrast, readable font sizes, and keyboard navigation.

**Decision impact:** 
- Minimum 18px body text (or equivalent em scaling).
- 4.5:1 contrast ratio for body text; 3:1 for large text.
- Focus outlines on interactive links.
- Semantic section structure with proper heading levels.

---

## Contemporary CV Design Directions

**Direction 1: Minimalist with Color Accent**
Clean single-column layout, muted palette (grays + one accent color), strong typography hierarchy. Works at all sizes; print-friendly.

**Direction 2: Two-Column with Left Sidebar**
Narrow sidebar for contact/skills, main content in wider column. Modern but riskier for ATS; works well for print if tightly structured.

**Direction 3: Conversational / Narrative-First**
Opens with a substantial "About Me" that reads like a personal statement. Works for candidates with a compelling story (this candidate does). Risks looking less serious if not handled with restraint.

**Selected: Direction 1 + elements of 3**
Clean single-column layout for ATS safety and mobile responsiveness. Strong semantic hierarchy. The "About Me" section is conversational but concise, setting tone without overwhelming. Recent roles get narrative depth; older roles compress. Accent color (teal or slate) highlights key sections and links.

---

## Print Strategy for Exact Two-Page Limit

**Finding:** CSS page breaks are unpredictable across browsers. Safe approach: design content to fit naturally, use deliberate page break logic at a semantic boundary (e.g., after "Projects", before "Experience" or mid-experience).

**Decision impact:**
- Target approximately 1100–1400 words total content.
- Place a page break after the "Projects" section (conceptually mid-document).
- Ensure no orphaned headings; no single bullet points alone on a page.
- Test in Chrome and Safari print preview; adjust margins and line-height to tighten/loosen as needed.

---

## Voice & Tone for Senior-Level CVs

**Finding:** Senior engineers should sound confident but not arrogant. Specific achievements beat generic claims. Passive voice ("dashboards were built") weakens narrative; active voice ("built dashboards driving X insights") strengthens it.

**Decision impact:** Rewrite vague achievements into concrete, active language. Highlight *impact* (e.g., "grew the team from 1→5", "shipped AttackCapture™ in Q3, now used by 50+ customers") over effort.

---

## Final Design Rationale

This redesign combines:
1. **Narrative clarity** via a strong opening and role-driven progression
2. **Visual hygiene** via consistent spacing, color hierarchy, and typography
3. **Technical defensibility** via semantic HTML, plain-text fallback, and ATS-safe structure
4. **Print fidelity** via deliberate page breaks and readable grayscale rendering
5. **Digital polish** via hyperlinked contact/projects and dark-mode support

The result should feel modern, intentional, and serious—fitting for a senior engineer with broad impact.
