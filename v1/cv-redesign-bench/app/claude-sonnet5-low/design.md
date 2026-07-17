# Design notes

## Visual direction
Editorial, quiet, confident: black ink on white/near-white, one serif display face for the name and section labels, one clean sans for body text, no color accent beyond black/gray. This matches research.md's note that current CV design favors one strong display face + a clean grid sans over multi-color decoration, and keeps the print version trivially "black text on white" with no extra work.

## Typography
- Display/serif (name, section labels): `Source Serif 4` via `next/font/google` — a print-friendly serif with good x-height at small sizes.
- Body/sans: `Inter` (already used site-wide per root `app/layout.tsx`, so it's already loaded — reusing it avoids a second font-loading cost and keeps consistency).
- Scale: name ~28px, section labels ~13px uppercase tracked, body ~14.5px, meta/dates ~12px. On print these drop further (see print section).

## Grid / layout
Two-column grid on screen (≥768px): a ~30% left rail (photo-free identity block, contact, skills, projects, education) and a ~70% right column (about + experience), because research.md notes this pattern keeps dense reference info (skills/contact) out of the way of the scannable timeline. Below 768px it collapses to a single column, rail first, in the same DOM order (so reading order for screen readers/ATS never changes — only the CSS grid template changes).

## Responsive behavior
- Mobile (~375px): single column, comfortable padding (1rem), font sizes step down slightly, no horizontal scroll (grid uses `1fr`, images/none used, long URLs wrap via `break-words`).
- Desktop (~1440px): content is capped at `max-w-[860px]` and centered, so line length stays readable rather than stretching edge-to-edge.
- Verified structurally (no separate browser device testing was run in this session — see Verification below); layout uses only fluid Tailwind units (`%`, `rem`, `fr`) so it should not overflow at either width.

## Accessibility
- Semantic HTML: one `h1` (name), `h2` for major sections, `h3` for job titles, real `ul`/`li` for bullets, a real `<a href="mailto:...">` for the email.
- Color contrast: black/near-black text on white/off-white background exceeds WCAG AA at every size used.
- The "Download PDF" button is a real `<button>` with visible focus styling and calls `window.print()`; it's excluded from print output via `@media print { display: none }` alongside any other screen-only chrome.
- Respects system dark mode on screen (dark background version) but forces light/black-on-white in print regardless of OS theme, per the task's print requirement.

## Print strategy (target: exactly 2 A4 pages)
- `@page { size: A4; margin: 12mm 14mm; }` inside a print-only style block — gives ~186mm usable width and ~273mm usable height per page (2 pages ≈ 546mm of usable height budget).
- In print, the two-column screen grid collapses to a single column (print doesn't need the rail/column split — it needs density), with the identity/contact/skills header condensed into a compact top strip, freeing the rest of the page for experience.
- Print font sizes drop: body ~9.5pt, section labels ~9pt uppercase, name ~18pt — small enough to be dense, still comfortably legible (research.md's ~9pt floor).
- Explicit break control: `break-inside: avoid` on each experience entry (job title + bullets never splits mid-entry across a page boundary) and `break-after: avoid` on headings so a heading never lands alone at the bottom of a page. No hardcoded `break-before` page-1/page-2 split is used — instead content is trimmed (per content.md's cuts: compressed "Earlier" line, no Science4you entry, tightened bullets) so that natural flow lands at almost exactly two pages, and `break-inside: avoid` prevents an awkward partial 3rd page from one orphaned entry.
- The "Fun facts" section is shown on screen (it's a nice differentiator when browsing) but hidden in print (`print:hidden`) — with six jobs, skills, projects, and education already filling two pages tightly, fun facts are the lowest-signal content for a recruiter's first pass and the easiest cut to protect the page budget, per research.md's scanning-behavior note.
- Page count was reasoned about via character/line budgeting (not visually confirmed in a real print preview, since no browser tool was used in this pass): About (~5 lines) + Fun facts (2 bullets) + Skills (6 rows) + Projects (5 lines) + Education (2 lines) in a condensed header block ≈ half of page 1; six experience entries at 3-4 lines each ≈ fills the remainder of page 1 into page 2. This is a best-effort estimate; if it runs slightly long or short, the highest-leverage adjustment is the print body font-size variable (`--print-body-size`) and the "Earlier" line's verbosity, both isolated at the top of the print styles for easy tuning.
