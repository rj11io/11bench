# Research: GitHub Profile README

Access date for all external sources: 2026-07-16.

## Goal

Research what strong GitHub profile READMEs communicate, what GitHub actually supports, and which patterns are worth using for an AI/product engineer profile without falling into the usual failure modes.

## Sources

### 1. GitHub Docs: About your profile
URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile

Findings:
- GitHub describes the profile README as the customizable section at the top of a profile.
- GitHub explicitly frames it as a place for "about me", work the person is proud of, and guidance for visitors.
- Public profile details are visible to everyone, so profiles should avoid oversharing.

Decision changed:
- The README should act like a front door, not a dump of every credential.
- Contact and identity will be present, but not overloaded with personal detail.

### 2. GitHub Docs: Managing your profile README
URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

Findings:
- A profile README appears only when it is in a public repository whose name matches the username.
- The feature itself is simple; the content has to do the real work.

Decision changed:
- Keep the README self-contained and profile-specific, not written like a normal project README.

### 3. GitHub Docs: Using your GitHub profile to enhance your resume
URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume

Findings:
- GitHub recommends an introduction, skills, professional experience, and commentary around best projects.
- It also recommends pinning 3-5 repositories separately, which means the profile README does not need to duplicate every repo detail.
- GitHub notes that hiring managers often scan quickly.

Decision changed:
- Use a fast-scanning structure: opening hook, what he builds, selected work, compact background, contact.
- Project section should explain why each link matters, not just list URLs.

### 4. GitHub Docs: Basic writing and formatting syntax
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Findings:
- GitHub supports headings, images, links, lists, code fences, relative links, and some HTML.
- GitHub auto-generates a file outline from headings.
- Relative links are recommended for files and images inside the repository.
- The `<picture>` element is supported.

Decision changed:
- Use plain heading hierarchy so the README is easy to scan in GitHub's outline.
- Keep assets local and referenced relatively.
- Avoid HTML tricks that depend on styling GitHub will sanitize away.

### 5. GitHub Docs: Quickstart for writing on GitHub
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github

Findings:
- GitHub explicitly encourages images, tables, collapsed sections, quotes, and comments for profile READMEs.
- Advanced formatting is acceptable when it improves readability.

Decision changed:
- Use one tasteful visual asset and optionally one collapsed section.
- Avoid tables because they often degrade on narrow screens.

### 6. GitHub Docs: Organizing information with collapsed sections
URL: https://docs.github.com/en/enterprise-cloud%40latest/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections

Findings:
- `<details>` and `<summary>` are officially supported on GitHub.
- Collapsed sections can contain headings, text, images, and code blocks.

Decision changed:
- Put older career history in a collapsed section so the current AI/product work stays above the fold.

### 7. GitHub Docs: Organizing information with tables
URL: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables

Findings:
- GitHub supports Markdown tables, but tables are fixed grid structures.

Decision changed:
- Do not use tables for core content because profile READMEs are often viewed on narrow screens and tables wrap badly.

### 8. GitHub Blog: 5 tips for making your GitHub profile page accessible
URL: https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/

Findings:
- Use descriptive link text, proper heading order, real list markup, plain language, and restrained emoji usage.
- Decorative bullets made from arbitrary symbols hurt assistive technology.
- Image alt text matters.

Decision changed:
- Avoid emoji-led headings and decorative symbol walls.
- Use descriptive links such as "AI skills and plugins" instead of repeating raw URLs only.
- Any image asset must have useful alt text.

### 9. GitHub Docs: About the repository README file
URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

Findings:
- READMEs are first-contact documents.
- GitHub truncates rendered README content beyond 500 KiB.
- GitHub highlights README content prominently when it is well placed.

Decision changed:
- Keep the profile README compact enough to scan comfortably and far below the truncation limit.

### 10. Real example: MartinHeinz/MartinHeinz
URL: https://github.com/MartinHeinz/MartinHeinz

Findings:
- The profile uses a branded header image, short intro paragraph, tools section, external writing section, and dynamic GitHub stats cards.
- It is easy to understand at a glance because the opening identity statement is short.
- The dynamic stats section adds visual density and depends on third-party uptime.

Decision changed:
- Borrow the idea of a clear branded opening.
- Avoid third-party stats cards because the task explicitly asks for coherence even when dynamic services fail.

### 11. Real example: WaylonWalker/WaylonWalker
URL: https://github.com/WaylonWalker/WaylonWalker

Findings:
- The profile leans into a personal thesis ("learning in public"), mixes visuals with narrative sections, and includes calls to support/contact.
- It feels personal because it is organized around a point of view, not a generic skill inventory.
- It also includes multiple remote images/widgets, which create fragility and visual sprawl.

Decision changed:
- Center the README on a strong personal angle: AI product engineering for data-heavy products, with open-source AI work as the current focus.
- Keep the visual system local and minimal rather than widget-heavy.

### 12. Real example: jh3y/jh3y
URL: https://github.com/jh3y/jh3y

Findings:
- This profile is extremely visual and image-led.
- It is memorable, but much of its personality depends on assets rendering correctly.

Decision changed:
- Use flair, but make sure the README still reads well as plain text if the image does not load.

## Synthesis

### What strong profile READMEs communicate

- Who the person is in one sentence.
- What they build now, not only what they built years ago.
- Why a visitor should click the linked work.
- Enough technical specificity to sound credible.
- A point of view or working style that feels individual.

### How people scan them

- Top-down, fast.
- First pass: name, role, hook, current focus.
- Second pass: projects and proof.
- Third pass: background, stack, contact.

Decision:
- The README should put current AI/product/open-source work first, with earlier experience compressed below.

### Current conventions worth using

- Branded opening visual or banner.
- Short intro paragraph.
- Curated project links with one-line explanations.
- Compact stack summary.
- Collapsed section for less critical detail.

Decision:
- Use all of the above, but avoid auto-updating metrics and dependency-heavy decorations.

### Patterns to avoid

- Badge walls.
- "Typing SVG" or heavy animation for its own sake.
- Vanity metrics without context.
- Generic AI copy that could belong to anyone.
- Too many external images or status cards.
- Dense tables that break on mobile.

Decision:
- No shields wall, no animated typing banner, no stats cards, no large tables.

### GitHub compatibility limits that matter here

- GitHub supports Markdown plus some HTML, but not custom CSS/JS.
- Relative asset paths are the reliable choice for local images.
- `<details>` is safe and documented.

Decision:
- Build around GitHub-native Markdown/HTML only.

### Accessibility, privacy, maintainability

- Descriptive links and alt text improve navigation.
- Avoid color-only meaning.
- Keep copy readable without relying on images.
- Prefer local static assets over third-party generators.
- Limit exposed personal info to what is already in the CV and clearly intended for contact.

Decision:
- One local SVG banner only.
- Text must stand on its own.

## Final design direction

- A static local SVG header to add identity without external dependencies.
- A concise opening that positions RJ as an AI Product Engineer with deep TypeScript/React/Next.js roots and a bias toward data-heavy products.
- A "what I build" section focused on current AI and product engineering.
- A curated "selected work" section that explains the three current project links from the CV.
- A compact proof section covering stack, domains, and leadership traits.
- A collapsed "Earlier chapters" section for older roles, preserving credibility without burying the current story.
