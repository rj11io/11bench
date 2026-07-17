# Research notes

Research done via live web search on 2026-07-16 (see access dates below). Where
a finding could not be traced to a single authoritative page, I say so instead
of inventing a citation.

## 1. How recruiters actually scan a CV

- **["The 6-Second Resume Scan: Eye-Tracking Data Reveals What Recruiters Actually See"](https://a4cv.app/blog/six-second-resume-scan-eye-tracking-reveals-what-recruiters-see/)**, A4CV, accessed 2026-07-16. **Finding:** studies that track where people's eyes land show recruiters spend about 70% of their scan time on the top third of page one. Their eyes move in the shape of a capital "F" — sweeping across the top, then dropping down the left edge — and most reviewers decide whether to keep reading within 6-10 seconds.
- **["Eye tracking study shows recruiters look at resumes for 7 seconds"](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)**, HR Dive, accessed 2026-07-16. **Finding:** confirms the ~7-second first pass and that name, most recent title, and most recent company are read first.
- **Decision this changed:** the name, role title, location, and the two or three most recent roles must be readable near the top without any scrolling or page-turning, on both screen and print. I put the name, role, and contact details on a single top band, and listed jobs newest-first so the strongest, most recent lines land in that first glance.

## 2. Structure and expectations for a senior engineer's CV

- **["Senior Software Engineer Resume Guide"](https://interviewkickstart.com/blogs/articles/how-to-structure-your-software-engineering-resume)**, Interview Kickstart, accessed 2026-07-16. **Finding:** a two-page CV is the accepted norm once someone has 8+ years of experience. Jobs should be listed newest-first. A senior CV needs to show scope (the size of the systems the person touched), judgment (the decisions they made), and influence (how they raised the level of the team), not just a list of tasks.
- **["Senior Software Engineer Resume Examples"](https://resumeworded.com/senior-software-engineer-resume-example)** and **["Senior Software Engineer Resume Guide 2026"](https://www.signalroster.com/blog/how-to-write-senior-software-engineer-resume)**, accessed 2026-07-16. **Finding:** a 3-4 sentence summary that leads with seniority, years, and domain performs better than a generic objective; AI-tool fluency (Copilot, Claude Code, agent workflows) is now expected content in a senior engineer's skills section, not a novelty.
- **Decision this changed:** kept a short "About" statement instead of a wall of text (the six-paragraph "About Me" in `RJ_CV_max.pdf` was compressed to 3-4 sentences naming seniority, years, stack, and domain focus — see `content.md`). Gave AI-engineering skills their own row instead of burying them inside "Core Stack," since research treats this as its own screened category in 2026, not a nice-to-have.

## 3. Editorial and typographic direction

- **["Typography Trends in Resume Design for 2026"](https://myresumee.com/blog/bzg-typography-trends-in-resume-design-for-2026)** and **["Typography Trends 2026"](https://www.designmonks.co/blog/typography-trends-2026)**, accessed 2026-07-16. **Finding:** 2026 resume and editorial design is moving from flat minimalism toward "geometric sans paired with a serif accent" — a restrained editorial voice rather than a template look, using type weight and scale (not colour or icons) to carry hierarchy.
- **Decision this changed:** I paired a serif typeface (the kind with small decorative strokes on each letter, like a newspaper headline) for the name and section labels with a plain, no-frills typeface for the body text and dates. Both source PDFs already do this — the name "Ricardo Jorge" is set in a serif, the rest in a plain style — and the research confirms it's a legitimate, current direction rather than an old-fashioned one. I leaned further into it: bigger size jumps between the name, role headers, and body text, and a visible rule line between sections instead of boxes or icons, since decoration competes with scanning while a clear size hierarchy doesn't.

## 4. Applicant tracking systems, links, and PDF handling

Most companies run CVs through an applicant tracking system (ATS) — software that
reads the text out of a CV before a human ever opens it, to file it and let
recruiters search and filter candidates.

- **["Anatomy of an ATS Friendly Resume Format"](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/)**, Jobscan, accessed 2026-07-16. **Finding:** modern applicant tracking systems read clean, single-column, text-based PDFs reliably. What breaks the reading is an image-only PDF, a multi-column table layout, or text hidden inside a header/footer/graphic.
- **["Can ATS Read PDF Documents?"](https://resumeworded.com/can-ats-read-pdf-documents-key-advice)**, accessed 2026-07-16. **Finding:** confirms that real, selectable text plus a standard heading structure is what matters to these systems, not the visual template.
- **Decision this changed:** the page is a single real-text column with proper HTML heading tags (not a CSS-grid layout with side rails that a parser would read out of order), all body text is real, selectable text (never text drawn as an image or inside an SVG graphic), and the print output comes from the browser's own `window.print()` on that same page — so the PDF a recruiter downloads has exactly the same text as the screen, never a separate flattened export.

## 5. Accessibility and contrast

The Web Content Accessibility Guidelines (WCAG) are the standard rules for making
web pages usable by people with low vision, colour blindness, or other
disabilities. The "AA" level is the common bar most professional sites are held to.

- **["WebAIM: Contrast and Color Accessibility"](https://webaim.org/articles/contrast/)**, accessed 2026-07-16. **Finding:** the AA level needs a brightness difference (contrast ratio) of at least 4.5-to-1 between body text and its background, and at least 3-to-1 for large text or interface controls. A link's text also needs a cue other than colour alone — normally an underline — both at rest and when focused or hovered, so a colour-blind reader can still tell it's a link.
- **["Offering a Dark Mode Doesn't Satisfy WCAG Color Contrast Requirements"](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements)**, accessed 2026-07-16. **Finding:** light and dark themes must each independently meet the contrast minimums on their own — a dark theme isn't exempt just because it exists.
- **Decision this changed:** every link is underlined (not colour-only), body text and headings use the app's shared colour tokens, which already meet the AA bar, and the print stylesheet forces black text on white paper regardless of whether the user's screen is set to dark mode (see `design.md` for the exact CSS). Printed paper has no real equivalent of "dark mode," and letting a dark theme leak into print risks grey text that's hard to read once printed.

## 6. Getting the print output to land on exactly two pages

- **["Avoiding Awkward Element Breaks in Print HTML"](https://dev.to/amruthpillai/avoiding-awkward-element-breaks-in-print-html-5goe)**, accessed 2026-07-16. **Finding:** the CSS `@page` rule (`@page { size: A4; margin: … }`) sets the physical page size and margins for anything printed. The `break-inside: avoid` rule stops a heading or a single job entry from being split awkwardly across a page boundary. If a block of content is simply too tall for one page, the browser will split it anyway — so the real fix for length is trimming the content, not adding more CSS.
- **["CSS: The Perfect Print Stylesheet"](https://www.jotform.com/blog/css-perfect-print-stylesheet-98272/)**, accessed 2026-07-16. **Finding:** keep all print-only rules inside an `@media print` block, and use it to hide anything meant only for the screen, like buttons.
- **Decision this changed:** the print stylesheet sets `@page { size: A4; margin: 11mm 14mm }`, applies `break-inside: avoid` to every job entry and section header so a role never splits mid-bullet, forces one clean break between page 1 and page 2, and hides the "Download PDF" button when printing. Because CSS alone can't force content to fit, the two-page budget was mainly enforced by trimming the content itself (see `content.md`), then double-checked by opening the browser's print preview.

## Limitations

All of the above came from live web search results (titles, URLs, and summarized findings as returned), not from fetching and re-reading every full article. Where a search snippet gave a clear, attributable finding I used it directly; I did not fabricate any source, quote, or statistic beyond what the search results returned.
