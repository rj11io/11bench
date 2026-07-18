# Research notes

Low-effort pass: quick, decision-linked notes, not a literature review. No web search tool was available in this session, so no external URLs are cited below — this is reasoned from general, widely-known practice rather than fresh sources. That limitation is stated here rather than faking citations.

## How a senior AI product/frontend engineer's CV should be structured
A hiring manager wants three things fast: what you are (title + one-line pitch), what you've shipped recently (last 2-3 roles carry the most weight), and proof of range (stack, leadership, ownership). Reverse-chronological experience stays the standard because it matches how recruiters scan for recency and career trajectory.

**Decision this drove:** put a short "About" pitch and skills up top, then a reverse-chronological experience list with the most recent, most relevant role (AI Product Engineer) given the most space, and let older roles (pre-2020) compress into a single dense block rather than getting equal treatment.

## Recruiter scanning behavior
Recruiters spend very little time on a first pass and scan for keywords, job titles, and dates before reading prose. Bullets beat paragraphs for the experience section; a dense paragraph is fine for the "About" section since it's read once, closely, if the candidate clears the first scan.

**Decision this drove:** experience entries use short, verb-first bullets (kept from the source bullets, tightened). The About section stays prose because it's a differentiator, not a scan target.

## Contemporary editorial/typographic print design
Current CV/resume design trends favor a confident, editorial feel: one strong serif or high-contrast display face for name/headings paired with a clean grid sans for body text, generous whitespace, and a single accent color rather than multiple decorative elements. Two-column layouts (a narrow sidebar for skills/contact + a wide main column for experience) are common because they let dense content (skills, contact, projects) sit beside the timeline without competing for the same horizontal space.

**Decision this drove:** a two-column grid — a slim left rail (identity, contact, skills, education, projects) and a wide right column (about + experience) — with one serif display font for the name/section labels and one sans for body copy, and a single ink-black accent, no color.

## ATS / accessibility / print considerations
Plain semantic HTML (headings, lists) reads reliably by both ATS parsers and screen readers; avoid content baked into images, avoid multi-column PDF exports that scramble reading order for ATS parsers (though since this is a web/print CV rather than a machine-submitted export, this is a lighter concern than for a Word/PDF upload). For print, browsers default to `@media print` and the `size` CSS property to control page dimensions; A4 is 210mm × 297mm, so hitting two pages exactly means budgeting line-height and section spacing tightly and cutting content rather than shrinking text below ~9pt.

**Decision this drove:** semantic `<h1>`–`<h3>`, `<ul>`/`<li>` markup throughout, single-column reading order (the two-column screen grid still reads top-to-bottom in DOM order), `prefers-color-scheme` ignored in print (force black-on-white), explicit `@page { size: A4; margin: ... }`, and trimming to the highest-signal facts to hit exactly two printed pages (see design.md for the exact page-break plan).
