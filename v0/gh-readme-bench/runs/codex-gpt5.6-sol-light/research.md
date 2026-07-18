# Research: contemporary GitHub profile READMEs

Access date for every source below: **2026-07-16**.

## Research questions and findings

### 1. What the profile has to communicate

**GitHub Docs — “Using your GitHub profile to enhance your resume”**  
https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume

- GitHub recommends a concise professional bio, a profile README with an introduction and skills, and a small set of relevant pinned projects.
- It explicitly warns that hiring managers may inspect projects for only a couple of minutes.
- **Decision changed:** the README opens with identity + specialty in two sentences, then puts current work and three projects before career history. It does not reproduce the CV chronologically.

**GitHub Docs — “About the repository README file”**  
https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

- A README is often the first thing a repository visitor sees. It should quickly answer what something does, why it is useful, how to start, and where to get help.
- Relative image paths are supported and remain useful in clones. GitHub truncates rendered README content beyond 500 KiB.
- **Decision changed:** project entries each state what the project is, not just its name. The only image is a small local SVG referenced with a relative path. The document stays far below the size limit.

**GitHub Docs — “Quickstart for writing on GitHub”**  
https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github

- GitHub’s own profile README tutorial uses a responsive `<picture>` element with `prefers-color-scheme`, semantic headings, tables, and `<details>`.
- **Decision changed:** use `<picture>` for locally stored light/dark artwork; use conventional headings for the actual information hierarchy. Avoid a table because project prose is more robust on narrow screens.

### 2. How visitors scan

There is no defensible universal time-to-scan metric in the reviewed sources, so none is claimed. GitHub’s job-search guidance does, however, frame review as brief and project-focused.

The useful scan path is:

1. Who is this?
2. What do they build now?
3. What can I inspect?
4. Why should I trust their judgment?
5. How do I contact them?

**Decision changed:** the README follows that exact sequence. Dense skill taxonomy and older roles are intentionally downstream.

### 3. Real profiles and current conventions

**Anurag Hazra — profile repository**  
https://github.com/anuraghazra/anuraghazra

- The profile is compact: a one-line identity, a few high-signal facts, and selected repositories.
- Its strongest technique is specificity (“Built github-readme-stats…”) rather than decoration.
- The profile also illustrates a common convention: emoji-led bullets. They are visually quick, but repeated emoji add screen-reader verbosity and can make profiles feel templated.
- **Decision changed:** keep the short, proof-led structure, but replace emoji bullets with semantic headings and ordinary Markdown lists.

**GitHub Blog — “Beginner’s guide to GitHub: Setting up and securing your profile”**  
https://github.blog/developer-skills/github/beginners-guide-to-github-setting-up-and-securing-your-profile/

- GitHub points readers to profiles by Yabellini, Levxyca, and Omariosouto as inspiration and describes the profile as a living portfolio of projects, skills, and interests.
- **Decision changed:** include one personal origin detail (games/robotics), but connect it to the engineering story instead of creating a separate hobbies collage.

**GitHub Topics — `profile-readme` and `github-profile`**  
https://github.com/topics/profile-readme  
https://github.com/topics/github-profile

- As of the access date, active tooling still centers on profile generators, view counters, activity summaries, WakaTime cards, and stat cards.
- Topic listings prove availability and continued maintenance, not that every widget is good editorial design or broadly popular. No popularity claim is inferred.
- **Decision changed:** treat widgets as an available convention, not a requirement. This profile omits them because the CV contains no public activity metrics to foreground and because external images weaken reliability.

**Anurag Hazra — `github-readme-stats` documentation**  
https://github.com/anuraghazra/github-readme-stats

- Dynamic cards support themes and light/dark variants, but the hosted service only sees public-repository data by default. Private contributions require a self-hosted instance and token.
- “Top languages” is therefore not a complete skill measure, especially for a B2B engineer whose work may be private.
- **Decision changed:** no stats or top-languages card. The README uses PDF-supported experience and skills instead of an incomplete proxy.

### 4. GitHub-compatible presentation

**GitHub Docs — “Basic writing and formatting syntax”**  
https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

- GitHub Flavored Markdown supports headings, lists, links, images, code blocks, comments, and other standard structures.
- **Decision changed:** keep the information layer in plain GFM so the profile remains readable in source view and when images fail.

**GitHub Docs — “Organizing information with collapsed sections”**  
https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections

- `<details>` and `<summary>` are supported for secondary material.
- **Decision changed:** use one collapsed section for the longer career trail. Current work and projects remain visible by default.

**GitHub Docs — “Organizing information with tables”**  
https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables

- Tables are valid GFM, but their columns impose a horizontal relationship.
- GitHub’s own documentation notes elsewhere that complex table content can overflow.
- **Decision changed:** avoid multi-column project cards and skill matrices. Stacked sections degrade more gracefully on mobile.

**GitHub repository — `github/markup`**  
https://github.com/github/markup

**GitHub Community — “GitHub Flavored Markdown doesn't render CSS styles inside a HTML block”**  
https://github.com/orgs/community/discussions/22728

- GitHub sanitizes rendered markup; scripts, inline styles, classes, and IDs cannot be treated as a dependable styling system.
- **Decision changed:** no JavaScript, iframe, embedded app, CSS-dependent layout, or fake controls. Creative work is isolated inside static SVG files.

**GitHub Docs — “Working with non-code files”**  
https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files

- GitHub displays common image types including SVG.
- **Decision changed:** use static SVG rather than raster screenshots or an externally rendered banner. It stays sharp, small, editable, and repository-owned.

### 5. Accessibility and resilience

**GitHub Blog — “5 tips for making your GitHub profile page accessible”**  
https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/

- Use descriptive link text, meaningful alt text, proper heading hierarchy, plain language, real list markup, and restrained emoji.
- **Decision changed:** one `#` title followed by `##` sections; no skipped levels; descriptive links; banner alt text conveys its meaning; no decorative emoji sequence.

**GitHub Docs — “Profile reference”**  
https://docs.github.com/en/account-and-profile/reference/profile-reference

- Public-profile details and social links are visible to everyone.
- **Decision changed:** publish only contact details already explicitly public in both CVs. Do not add a phone number, calendar integration, location precision beyond Lisbon, or inferred social accounts.

## Editorial and technical conclusions

### Patterns worth using

- A one-screen opening with identity, current focus, proof, and next action.
- A small number of hand-picked projects with explanations.
- A personal motif that reinforces the story.
- A restrained stack line or grouped skill list.
- A local, static, theme-aware SVG.
- Progressive disclosure for older career history.

### Patterns rejected

- **Badge wall:** converts meaningful capabilities into logo inventory and wraps unpredictably on narrow screens.
- **GitHub stats / streak / top-language cards:** dynamic dependency, incomplete view of private B2B work, and weak evidence of product judgment.
- **Profile-view counters:** vanity metric plus an unnecessary third-party request.
- **Typing animation / contribution snake:** motion competes with the opening and can fail independently.
- **Generic AI copy:** phrases such as “passionate developer crafting innovative solutions” do not distinguish this person.
- **Fake terminal with fake commands/output:** can imply executable interaction and often reads as a theme rather than evidence.
- **Large HTML tables:** fragile on narrow screens and awkward for long descriptions.
- **Icon-only contact links:** ambiguous without accessible names.

## Final design specification

- **Voice:** direct, technical, self-assured, lightly playful; first person.
- **Hook:** “I turn messy signals into products people can use.”
- **Narrative motif:** `signal → structure → interface → decision`; it joins PDF extraction, cybersecurity data, dashboards, and AI tooling without inventing a new claim.
- **Primary proof:** current B2B AI product work; 11ai; 11bench; rj11.io.
- **Credibility layer:** decade of TypeScript, React since 2016, Next.js since 2018; first-frontend-hire ownership; selected cybersecurity/crypto/gaming roles.
- **Visual system:** one local SVG in light/dark variants; monochrome base with blue/teal signal line; no animation.
- **Mobile rule:** single-column prose; no fixed-width text art; no layout-critical table; image has a viewBox and `width="100%"`.
- **Failure rule:** if every image and external site fails, the title, hook, projects, experience, skills, and email still tell a complete story.
- **Maintenance rule:** dates only where they add credibility; no counters or automatically changing claims.

