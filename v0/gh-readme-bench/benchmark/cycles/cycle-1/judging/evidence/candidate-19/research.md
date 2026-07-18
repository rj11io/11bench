# Research notes - GitHub profile README

**Research date:** 2026-07-16

## What a profile README needs to do

GitHub places a qualifying profile README at the top of a profile, before the visitor reaches activity and pinned work. That makes the first screen a routing layer, not a replacement CV: it should quickly answer who this person is, what they make now, and where to inspect or contact them. GitHub's own job-search guide recommends an introduction, skills, relevant experience, selected projects, and achievements; it also says reviewers may look at projects for only a couple of minutes.

| Source | Accessed | Finding | Decision it changed |
| --- | --- | --- | --- |
| [Managing your profile README - GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) | 2026-07-16 | A README displays only when it is in the root of a public repository whose name matches the username. | Treat this file as the top-of-profile landing content; keep its opening immediately useful. |
| [Using your GitHub profile to enhance your resume - GitHub Docs](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) | 2026-07-16 | GitHub suggests a short bio, project commentary, and 3-5 relevant pins; it cautions that reviewers inspect quickly. | Lead with one sentence, direct project paths, and a short selected-history section rather than reproduce the CV. |
| [About your profile - GitHub Docs](https://docs.github.com/en/enterprise-cloud%40latest/account-and-profile/concepts/personal-profile) | 2026-07-16 | A profile combines the README, personal information, contribution activity, pins, status, and achievement badges. | Do not duplicate contribution charts or claim activity in the README; use it to supply context that those native profile elements cannot. |

### Scanning model used

The intended scan is: **identity -> current focus -> project destinations -> proof of practice -> contact**. Headings make the outline useful in GitHub's README UI. Short paragraphs, a concise code block, and bullet lists preserve that route on a narrow screen. The README has no table-dependent layout, side-by-side card grid, or paragraph-length bio.

## Contemporary patterns, inspected critically

Profile READMEs commonly use a prominent illustration or animated header, technology-icon rows, GitHub-stat cards, project cards, and occasionally automated "now" sections. These are tools rather than requirements. Two public profile repositories illustrate useful extremes:

| Example | What it demonstrates | What I keep / avoid |
| --- | --- | --- |
| [sindresorhus/sindresorhus](https://github.com/sindresorhus/sindresorhus) | A playful, highly visual profile with GIFs, a current app link, and a latest-post link. | Keep the lesson that a distinctive personal motif can route visitors to work. Avoid many animated image dependencies and a design that loses its message without them. |
| [anuraghazra/anuraghazra](https://github.com/anuraghazra/anuraghazra) | A concise identity statement, named projects, technology icons, statistic images, and top-repository area. | Keep the concise introduction and named work. Avoid importing live statistic images: they are not necessary evidence for this profile and can fail or distract. |

These are observations of the cited repositories on the access date, not claims about popularity. GitHub's github-profile-readme and readme topic pages are useful discovery indexes, but do not establish that a visual pattern is better or more popular. See [github-profile-readme topic](https://github.com/topics/github-profile-readme) and [readme topic](https://github.com/topics/readme).

### Creative choices for this README

- A small, plain-text **build log** replaces a hero image. It is original, readable in source and render, works in light/dark themes, and keeps a product-engineering narrative without a remote asset.
- A **currently building in public** section puts 11ai and 11bench ahead of older employment history, matching the current work described in the CV.
- A collapsed **selected route so far** gives career credibility without forcing every visitor through it.
- The profile uses ordinary links rather than logo badges. Link labels name the destination, so a visitor and a screen reader both have a useful fallback.

## GitHub compatibility and reliability

| Source | Accessed | Finding | Decision it changed |
| --- | --- | --- | --- |
| [Quickstart for writing on GitHub - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github) | 2026-07-16 | GitHub supports Markdown plus some HTML, including picture and details; images need meaningful alternative text. | Use standard GFM and one native details disclosure. Do not require a banner; therefore no image or alt-text burden is introduced. |
| [About repository README files - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) | 2026-07-16 | GitHub creates an outline from headings; relative links are recommended for in-repository files; README content beyond 500 KiB is truncated. | Use a small heading hierarchy and no local-link dependency or bulky embed. |
| [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) | 2026-07-16 | GFM supports tables, task lists, footnotes, and raw HTML parsing, but GitHub additionally sanitizes rendered HTML. | Do not rely on CSS, scripts, iframes, or custom interactive UI. The only HTML is the widely documented details disclosure. |
| [Managing accessibility settings - GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings) | 2026-07-16 | GitHub users can control animation and link underlining. | Avoid animation as information; use visible descriptive link text and meaning that does not depend on colour. |
| [Using the content linter - GitHub Docs](https://docs.github.com/en/contributing/collaborating-on-github-docs/using-the-content-linter) | 2026-07-16 | GitHub’s own documentation linter requires meaningful image alt text and discourages generic link text. | Use descriptive text links; omit decorative images entirely. |

## Failure modes intentionally avoided

- **Badge wall:** Icons can create false precision and visual noise. Skills are grouped by the kind of work they support, in text.
- **Vanity metrics:** No follower, star, streak, language-rank, or contribution total is asserted. Those values change and are not evidence of product impact.
- **Fragile live services:** No third-party stats, visitor counter, typing SVG, feed, calendar, or external image is required. The README is complete when offline.
- **Excess motion:** No GIF or auto-updating animation. The build-log motif is textual and therefore respects reduced-motion preferences by default.
- **Generic AI language:** The copy names concrete work categories from the CV (agent harnesses, skills, automations, data products) instead of claiming vague "AI passion" or unverifiable outcomes.
- **Overlong CV:** Earlier work is compressed inside a disclosure; the canonical detailed history remains available from the CV site supplied in the PDFs.
- **Privacy and maintenance traps:** No tracking pixel, no credentialed feed, and no complex generated asset. External links are only the person's stated sites, profile, LinkedIn, and email from the PDFs.

## Final implementation checklist

- Valid GFM with a small amount of documented HTML (details).
- No assets are required; assets/ is intentionally empty.
- Short lines and no Markdown table in the final README, reducing narrow-screen horizontal-scroll risk.
- The opening, project descriptions, dates, employer names, skills, and contact paths trace back to content.md, which in turn records their PDF source.

