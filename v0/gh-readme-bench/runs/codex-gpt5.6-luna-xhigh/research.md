# Research: a high-signal GitHub profile README

Access date for every web source below: **2026-07-16**. The two local references were `ref/RJ_CV.pdf` and `ref/RJ_CV_max.pdf`; both were extracted with the bundled PDF runtime and visually reviewed after rendering to PNG.

## Working brief

A profile README is a fast orientation layer, not a complete CV. A visitor should be able to answer four questions quickly:

1. Who is this person and what kind of work do they do?
2. What are they building now?
3. What evidence can I inspect next?
4. How do I contact or collaborate with them?

The source material makes Ricardo “RJ” Jorge distinctive through a useful combination: an early tinkerer’s origin story, a decade of TypeScript product engineering, a sustained specialty in data-rich interfaces, and current work on AI products, agent systems, open-source skills, and benchmarks. That combination is more memorable than a long tools list, so the README will lead with the through-line and use the career history as supporting evidence.

## How visitors scan

The practical model is “layer cake plus spotted scanning,” not a promise that every reader follows a literal F. Nielsen Norman Group’s eye-tracking review describes several common patterns: people often read the first lines, scan headings and subheadings, and then hunt for distinctive words, links, dates, or numbers. Its recommended antidotes are exactly the useful profile-README moves: put the important points in the first two paragraphs, use information-rich headings, group related material, use bullets, make links descriptive, and cut unnecessary content.

That changes the information order to:

- a direct name / role / location line;
- a short hook that explains the person’s value;
- current projects and contact links;
- a compact capability map;
- selected experience with dates and recognizable project nouns;
- older history and the personal origin story only after the work is clear.

The README therefore avoids an opening wall of prose, puts the current projects before the full timeline, and gives each section a heading that carries meaning on its own.

## What GitHub itself recommends

GitHub’s own profile guidance is unusually specific enough to anchor the content model. It names an introduction, skills, professional experience, best projects, and achievements as useful profile-README material. Its resume-oriented tutorial also recommends pinning 3–5 projects and making the work understandable quickly. The profile README is displayed at the top of the profile, so it is a layer that complements the profile’s pinned repositories and contribution activity rather than repeating them.

The README follows those conventions, with editorial compression:

- **Identity:** name, “AI Product Engineer,” Lisbon, and a one-sentence positioning statement.
- **Proof of current direction:** 11io, 11ai, and 11bench, all linked to the URLs present in the CV.
- **Proof of range:** Hunt Intelligence, OMEGA Systems, Phantasma Chain, and BinaryEdge / Coalition.
- **Human signal:** game modding, MUGEN, dedicated servers, and LEGO Mindstorms robotics.
- **Action:** website, GitHub, LinkedIn, and email are visible near the top and repeated in the closing CTA.

## Current examples and conventions

These are observations of real public GitHub profile pages, not claims that they are universally “the best” profiles.

### [Andrej Karpathy](https://github.com/karpathy)

As accessed on 2026-07-16, the profile uses an extremely short README line — “I like deep neural nets.” — while the pinned items carry the technical proof with clear descriptions such as `nanoGPT`, `nanochat`, and `llm.c`. The lesson is that brevity can work when the account’s repository surface is strong and the positioning is unmistakable. It changed this design by keeping the opening hook to a few sentences and by avoiding a full résumé dump.

### [Sebastian Raschka](https://github.com/rasbt)

The current profile presents a two-paragraph AI-research identity, a small links section, and a focused set of pinned repositories with specific descriptions. It gives a reader a narrative and then a short path to evidence. The lesson is to explain the kind of work before listing tools, and to use project descriptions that say what the visitor will find. It changed this design by making the public projects the main “now” section rather than a decorative list of names.

### [swyx](https://github.com/swyxio)

The profile combines a strong current-work paragraph and a useful link hub with a much denser collection of older endorsement images and legacy material. The useful part is the explicit “what I am doing now” and the clear destinations; the clutter is a maintainability warning. It changed this design by keeping current work visible, omitting endorsement graphics, and moving older history behind a native collapsed section.

### Common contemporary pattern

Across these examples, the durable pattern is not a particular badge pack or theme. It is a high-signal first viewport: a role, a point of view, a few destinations, and repositories/projects that make the claims inspectable. The README will use a small code block and a Mermaid flow to create a visual identity, but the text remains complete without either rendering trick.

## Pattern evaluation

| Pattern | Useful when | Risk | Decision for RJ’s README |
| --- | --- | --- | --- |
| Static badges | Showing a real build, release, license, package, or CI state | Badge walls turn evidence into decoration; dynamic sources can stale or fail | Use none; the CV does not provide badge-worthy public metrics, and links are stronger evidence |
| GitHub stats / streak / language cards | A public profile has a maintained reason to show activity | Third-party endpoints can hit API or hosting limits; counts are vanity signals and time-sensitive | Do not use; GitHub’s own contribution and pinned surfaces already show activity |
| Project cards / pinned repositories | Showing a few concrete things with descriptions | Repetition if the README merely mirrors the profile | Use linked project blurbs with purpose, not duplicate numeric cards |
| Mermaid | Explaining a process, architecture, or relationship in a text-native way | Rendering quirks, narrow layouts, and imperfect screen-reader support | Use one small vertical “work loop,” plus a plain-text explanation |
| Animated GIF | Demonstrating a UI or interaction that benefits from motion | Motion distracts, increases load, and becomes inaccessible or stale | Do not use; no project demo asset is supplied by the PDFs |
| Custom SVG | A stable diagram or logo with a real narrative role | SVG rendering differences; GitHub does not support inline scripting or animation in SVG views | Do not use an asset; Mermaid and Markdown are easier to maintain |
| HTML layout | Small semantic enhancements such as `<details>` or `<picture>` | Unsupported tags, sanitizer behavior, and mobile overflow | Use one `<details>` block only; avoid CSS, scripts, iframes, and wide layout tables |
| Code block | A compact “identity manifest” or genuine command/example | Decorative code can read as gimmicky or imply unsupported facts | Use one short TypeScript-flavoured manifest; label it as a self-description |
| Interactive-looking controls | Collapsed sections and internal links that help navigation | Fake buttons, hover-only meaning, and inaccessible gimmicks | Use native headings, links, and `<details>`; no fake interaction |

## GitHub-compatible Markdown and HTML

The compatibility baseline is GitHub Flavored Markdown plus only documented, semantic HTML:

- GitHub’s [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) documents headings, lists, links, images with alt text, tables, and the supported `<picture>` element.
- GitHub’s [Quickstart for writing on GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github) demonstrates responsive `<picture>` markup and `<details>` sections in a profile README.
- The [GitHub Flavored Markdown specification](https://github.github.com/gfm/) notes that GitHub performs post-processing and sanitization, and its disallowed raw HTML list filters `<script>`, `<style>`, `<iframe>`, and related tags. The design therefore does not depend on CSS, JavaScript, embedded video, or iframe behavior.
- GitHub supports [Mermaid diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) in Markdown files. A Mermaid diagram is still treated as an enhancement: the adjacent prose explains the relationship without needing the diagram.
- GitHub’s [working with non-code files](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files) guidance says common image formats render, but SVGs do not support inline scripting or animation in GitHub’s image views, and not all Mermaid charts are accessibility compliant. This is another reason to keep the README text-first and the single diagram simple.

The final README uses headings, paragraphs, lists, links, one fenced code block, one Mermaid block, and one `<details>` section. It does not use raw tables for the main content, because tables are likely to become cramped on narrow screens.

## Accessibility, narrow rendering, privacy, and maintenance

### Accessibility

- Every essential fact is plain text; no fact is conveyed by color, an icon, an image, or a badge alone.
- Links use destination names such as “website,” “GitHub,” and “LinkedIn,” rather than “click here.”
- The Mermaid block is preceded and followed by a prose description of the same idea.
- There are no moving images, flashing elements, tiny logo-only badges, or image-based paragraphs.
- No custom image asset is necessary, so there is no alt-text debt.

### Mobile and narrow widths

- The first viewport uses short paragraphs and a vertical rhythm rather than a side-by-side layout.
- Project and experience entries are stacked lists, not multi-column HTML tables.
- The Mermaid flow is vertical (`flowchart TD`) and has short node labels.
- The code block is deliberately short; it should wrap only on very narrow screens and remains readable as source text.
- The older timeline is collapsed, keeping the scan path short without deleting the information.

### Load reliability and privacy

GitHub supports images and GIFs, but this README does not require an image request to communicate. Shields.io is a legitimate service for concise project badges, while the [github-readme-stats project](https://github.com/anuraghazra/github-readme-stats) documents API-rate-limit concerns and its public-instance issue history includes rate-limit failures. Those are reasonable services for a maintained project README when a status is meaningful, but not a good dependency for a personal identity page that must remain legible if a remote endpoint is unavailable.

The README contains no tracking pixel, profile-view counter, dynamic stats endpoint, credentialed integration, or personal client detail. GitHub’s [profile reference](https://docs.github.com/en/account-and-profile/reference/profile-reference) and [About your profile](https://docs.github.com/en/account-and-profile/concepts/personal-profile) both emphasize that public profile details are visible to all GitHub users, so the design shares only the contact and career facts already supplied in the CV.

### Maintainability

The profile should age gracefully. Dates and project names are written as explicit text; there is no “currently trending” number, generated image, or automated activity claim to become stale. The content can be updated by editing a few short sections: “What I’m building now,” the capability list, and the selected experience.

## Failure modes to avoid

- **Badge wall:** many logos make a stack look broad but make actual strengths hard to see.
- **Vanity metrics:** stars, streaks, follower counts, and profile views are volatile and do not explain product judgment.
- **Broken dynamic services:** a 403, 429, timeout, or stale cache should not turn the first viewport into a stack of broken images.
- **Excessive animation:** movement competes with the opening hook and harms scanability.
- **Generic AI copy:** claims such as “passionate innovator” are less useful than the concrete work nouns in the CV: AI PDF extraction, threat-intelligence visualisation, agent harnesses, AttackCapture, HuntSQL, and Storybook.
- **Visual noise:** decorative separators, excessive emoji, or dense icon grids bury the through-line.
- **CV duplication:** a profile should select and contextualize evidence, not repeat every library and every historical bullet.
- **Privacy leakage:** client names, confidential project details, or tracking images would exceed the supplied evidence and the purpose of a public profile.

## Research decisions carried into the final README

1. Lead with “AI Product Engineer” and a plain-language hook about making complex systems useful and legible.
2. Put public projects and contact paths above the full career trail.
3. Treat TypeScript, React, Next.js, data visualisation, and AI agent systems as connected capabilities, not a wall of logos.
4. Use a small TypeScript-flavoured identity manifest for personality, not as a fake live integration.
5. Use one vertical Mermaid flow to express the recurring work pattern, with a text fallback.
6. Keep the selected experience concrete and dated, then move older history into `<details>`.
7. Include the robotics/game origin story as a short personal anchor, not as a separate “awards” wall.
8. Use no third-party image, badge, stats, counter, animation, tracking pixel, or private integration.

## Sources

All sources below were accessed on **2026-07-16**.

1. [Managing your profile README — GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) — establishes the username-repository/public/root-`README.md` requirements and the README’s profile placement. **Changed:** preserve a self-contained root README and avoid assumptions about repository setup.
2. [Using your GitHub profile to enhance your resume — GitHub Docs](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) — recommends a brief introduction, skills, professional experience, best projects, achievements, and pinning 3–5 projects. **Changed:** order the README around identity, current work, selected experience, and a short origin story.
3. [About your profile — GitHub Docs](https://docs.github.com/en/account-and-profile/concepts/personal-profile) — describes the profile README, pinned items, contribution activity, and public visibility. **Changed:** do not duplicate activity metrics that GitHub already supplies elsewhere, and keep public claims intentional.
4. [Profile reference — GitHub Docs](https://docs.github.com/en/account-and-profile/reference/profile-reference) — explains public visibility and the role of pinned items and badges. **Changed:** treat the README as public, inspectable identity content, not a private résumé.
5. [Basic writing and formatting syntax — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) — documents headings, lists, descriptive links, alt text, relative images, and `<picture>`. **Changed:** use semantic headings/lists and descriptive links; avoid image-only meaning.
6. [Quickstart for writing on GitHub — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github) — demonstrates profile README tables, responsive images, and collapsed `<details>` sections. **Changed:** use one native collapsed section and no bespoke layout CSS.
7. [GitHub Flavored Markdown specification](https://github.github.com/gfm/) — defines GFM and documents post-processing/sanitization plus disallowed raw HTML. **Changed:** avoid scripts, styles, iframes, and fragile HTML tricks.
8. [Creating diagrams — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) — confirms Mermaid rendering in Markdown files. **Changed:** use a small Mermaid flow as the only diagrammatic flourish.
9. [Working with non-code files — GitHub Docs](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files) — notes supported image formats, SVG limitations, Mermaid accessibility issues, and static notebook rendering. **Changed:** avoid external images and animated/custom SVG dependencies; keep prose fallbacks.
10. [F-shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile) — Nielsen Norman Group](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) — discusses F, layer-cake, spotted, marking, bypassing, and commitment scanning patterns and recommends front-loading, headings, bullets, descriptive links, and cutting content. **Changed:** design for scanning rather than a six-page CV pasted into Markdown.
11. [Andrej Karpathy’s GitHub profile](https://github.com/karpathy) — current example of minimal positioning paired with strong pinned-project descriptions. **Changed:** keep the hook compact and let concrete projects carry proof.
12. [Sebastian Raschka’s GitHub profile](https://github.com/rasbt) — current AI-research example with a concise identity, links, and focused pinned work. **Changed:** make project descriptions specific and put work before generic tool lists.
13. [swyx’s GitHub profile](https://github.com/swyxio) — current AI/devtools example with useful current links alongside visibly accumulated legacy/endorsement material. **Changed:** keep current work visible and collapse older material.
14. [Shields.io documentation](https://shields.io/docs/) — explains badges as a service for concise project status/metadata. **Changed:** reserve badges for facts that need status display; omit them here because no such status is necessary.
15. [github-readme-stats README](https://github.com/anuraghazra/github-readme-stats) and [public Vercel instance rate-limit issue](https://github.com/anuraghazra/github-readme-stats/issues/4431) — document the appeal of dynamic stats and the API-rate-limit failure mode. **Changed:** no dynamic stats cards or public-instance dependencies.

