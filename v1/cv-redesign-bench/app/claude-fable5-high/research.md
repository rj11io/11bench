# Research — CV redesign for a senior AI product / frontend engineer

All sources were accessed on 2026-07-17 via live web search and page fetches.
Each entry lists what the source says in plain words and what decision it
changed in this project. "ATS" means applicant tracking system — the software
recruiters use to store and search resumes. "A4" is the standard European
paper size, 210 × 297 mm.

## 1. How recruiters actually read resumes

**Ladders 2018 eye-tracking study** (30 recruiters, eye-tracking hardware,
hundreds of resumes) — via
[HR Dive summary](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/),
[the study PDF](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf), and
[Ladders press release](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html).

- The first pass lasts about 7.4 seconds. Recruiters scan the top of the
  page, then the left edge, occasionally reading rightward — an "F" shape.
- Resumes that held attention had simple layouts, clear section labels,
  bold job titles, and bulleted achievements. Dense, cluttered, or
  multi-column-gimmick resumes lost the reader.

**Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web"** —
[nngroup.com](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).

- People scan in the F shape only when the text gives them no signposts.
  Countermeasures: put the most important facts first, use visually
  distinct headings, start headings with their key words, bold the words
  that matter, cut clutter.

**Decisions changed:**
- Identity, title, location, and contact links all live in the top band —
  the zone that gets read in every pass.
- Section labels sit on the left edge (desktop and print), exactly where
  the F-pattern stem lands. This mirrors the structure the candidate's own
  minified CV already uses, which the eye-tracking data validates.
- Every experience entry leads with a bold job title + employer line, and
  each bullet front-loads the outcome or artifact ("Built Attack Surface
  Monitoring…" rather than "Was responsible for…").

## 2. Length and structure for a senior engineer

**One page vs. two** — via
[techinterview.org](https://www.techinterview.org/post/3233474607/engineering-resume-one-page-vs-two/),
[CoreCV](https://blog.corecv.ai/one-page-or-two-the-real-answer-for-tech-professionals/), and
[SWE Resume](https://www.sweresume.app/articles/one-page-tech-resume-template/).

- Two pages is the accepted norm for senior engineers and leads; the real
  rule is content density. Reviewers punish padding and reward quantified,
  concrete evidence. Page one must carry the strongest material.

**Butterick's Practical Typography, "Résumés"** —
[practicaltypography.com/resumes.html](https://practicaltypography.com/resumes.html).

- Don't cram to one page; two pages with generous margins beats one dense
  page. Put critical information on page one.
- Shrink oversized headings and decoration; shift visual weight to the
  names readers judge you by — employers and roles.
- Keep line length moderate, margins generous, bullets refined.

**Decisions changed:**
- The brief demands exactly two A4 pages, and the research supports it:
  page 1 carries identity, profile, skills, and the two most recent
  (most AI-relevant) roles; page 2 carries the remaining roles, early
  career, projects, and education. Recency = relevance for this profile.
- Company names and role titles get the strongest type on the page after
  the candidate's name. Decorative elements stay minimal.
- The long first-person "About me" essay from the max CV is compressed to
  a short third-person-free profile: the eye-tracking data says nobody
  reads six paragraphs in a 7-second pass, so the personality survives in
  one tight paragraph plus a small "Beyond work" note instead.

## 3. Editorial, typographic, and print direction

**Typography-led minimalism** — via
[Typewolf portfolio roundup](https://www.typewolf.com/portfolio-sites),
[Design Shack portfolio trends](https://designshack.net/articles/trends/portfolio-design/), and
[Colorlib portfolio trends](https://colorlib.com/wp/portfolio-design-trends/).

- The current direction for developer/designer personal sites is
  text-first minimalism: large type as the hero, a restrained palette
  (near-black / near-white plus one accent), serif headlines for an
  editorial voice over sans-serif body text, and whitespace instead of
  decoration.
- Both reference PDFs already use this exact language (serif display name,
  mono contact line, letterspaced small-cap labels), so the redesign
  refines the candidate's existing identity rather than replacing it —
  a deliberate continuity choice, not a copy of any other implementation.

**Decisions changed:**
- Design direction: "quiet editorial" — a serif display face for the name
  and role headings, a humanist sans for body, a monospace face for dates,
  URLs, and metadata. One accent color used sparingly for links and
  markers, so print can drop to pure black without losing structure.
- Hierarchy is built from size, weight, and letterspaced labels, not from
  boxes, sidebars with background fills, or icons (which also parse badly
  in ATS and print poorly).

## 4. ATS, links, accessibility, and PDF behavior

**ATS parsing reality check** — via
[Enhancv's ATS myth testing](https://enhancv.com/blog/busting-ats-myths/),
[Rezi's ATS experiments](https://www.rezi.ai/posts/ats-myths), and
[ResuFit PDF guide](https://resufit.com/blog/do-ats-systems-like-pdfs-a-complete-guide-to-pdf-resumes-and-ats-compatibility/).

- Modern ATS read text-based PDFs fine; image-based PDFs fail. No system
  auto-rejects a format, but content in headers/footers, text boxes, and
  complex tables is often skipped. Standard section names ("Experience",
  "Education", "Skills") parse most reliably. A few strategic hyperlinks
  are fine; showing the visible URL text is safer than hiding it behind
  a label.

**Hyperlinks in resume PDFs** —
[airesume.guru](https://airesume.guru/blog/hyperlinks-in-resume-pdfs-the-secret-weapon-recruiters-actually-click).

- Recruiters do click portfolio/GitHub/LinkedIn links; keep them in the
  contact header and display the human-readable URL.

**WCAG contrast** — [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/).

- AA requires 4.5:1 for normal text, 3:1 for large text; AAA requires 7:1.

**Print CSS** — via
[MDN `@page` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@page),
[PDF4.dev print-CSS guide](https://pdf4.dev/blog/css-print-styles-pdf-guide),
[SitePoint printer-friendly pages](https://www.sitepoint.com/css-printer-friendly-pages/), and
[Smashing Magazine, "Designing for Print with CSS"](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/).
(A further guide, didoesdigital.com/blog/print-styles, returned HTTP 403 and
could not be read.)

- `@page { size: A4; margin: … }` works in Chromium-based browsers; use
  absolute units (mm/pt), never viewport units, in print rules.
- Use modern `break-after: page` / `break-inside: avoid` to place breaks
  deliberately; hide screen-only controls with `@media print`; force
  black-on-white with explicit print colors rather than relying on the
  browser; text set in `pt` sizes prints more predictably than `px`.
- Test in actual print preview; a stray margin or 1px overflow creates a
  blank trailing page.

**Decisions changed:**
- The page renders as real HTML text (server component, no images of
  text), with standard section names, so both ATS parsers and screen
  readers get a clean document outline (`h1` name → `h2` sections → `h3`
  roles).
- Contact links show their human-readable URL (`rj11.io`,
  `github.com/rj11io`) and are real anchors on screen; in print they stay
  visible as text at AA-contrast black.
- Print strategy: `@page { size: A4 }` with margins tuned so the content
  splits at one deliberate `break-after: page` between two explicit page
  groups; `break-inside: avoid` on each entry; all screen chrome
  (theme-dependent colors, the Download PDF button) removed in
  `@media print`; explicit near-black-on-white print palette independent
  of dark mode.

## 5. What I deliberately did not do

- No third-party CV templates or other candidates' implementations were
  consulted; rule 5 of the brief forbids looking at sibling run folders,
  and the design derives from the sources above plus the candidate's own
  reference PDFs.
- Trend listicles (Colorlib, Design Shack, Muzli) were used only to
  confirm the broad direction (typographic minimalism, serif/mono
  pairing); no specific layout was copied.
