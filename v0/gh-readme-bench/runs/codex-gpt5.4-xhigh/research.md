# Research Notes

Access date for all web sources: 2026-07-16

## Working Conclusions

- The top screen matters most. Across the GitHub docs and the live profiles I inspected, the effective pattern is: clear identity, current focus, immediate links, then optional depth.
- GitHub-native reliability is a design constraint, not an afterthought. Unsupported styling, brittle third-party cards, or badge-heavy layouts make a profile feel more like a dashboard than a person.
- For this README, the strongest move is a writing-first profile with one local visual accent, zero required external widgets, and a compact career narrative that lets pinned repositories do part of the proof.

## Official GitHub Sources

### 1. Managing your profile README

- Source: [Managing your profile README](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)
- Finding:
  - A profile README appears when the repository name matches the username, is public, and contains a root `README.md`.
- Decision changed:
  - Keep the final deliverable fully self-contained in one root `README.md` with no setup assumptions or hidden dependencies.

### 2. About the repository README file

- Source: [About the repository README file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes?source=post_page-----808c1dff7a9c----------------------)
- Findings:
  - A README is often the first thing a visitor sees.
  - GitHub generates an Outline menu from headings.
  - Relative links and image paths are recommended for repository assets.
  - Content past 500 KiB is truncated.
- Decision changed:
  - Use meaningful headings that scan well in the Outline.
  - Keep the README lightweight and avoid any layout that needs absolute asset URLs.
  - Keep assets local and the document comfortably small.

### 3. Basic writing and formatting syntax

- Source: [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax?source=post_page-----db62d6057a0c----------------------)
- Findings:
  - GitHub supports standard Markdown headings, links, code blocks, images, footnotes, alerts, and some HTML.
  - The `<picture>` element is supported.
  - For images stored in the repo, GitHub recommends relative links.
- Decision changed:
  - Use plain Markdown first, not HTML-heavy layout tricks.
  - If I use an image, keep it local and referenced relatively.
  - Avoid tables for core content because they are less forgiving on narrow screens.

### 4. Quickstart for writing on GitHub

- Source: [Quickstart for writing on GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)
- Findings:
  - GitHub explicitly teaches profile READMEs with images, tables, collapsed sections, quotes, and comments.
  - The quickstart shows `<picture>` as the official way to swap images by light/dark mode.
  - The docs frame profile READMEs as a place for “advanced formatting,” but still inside GitHub’s native constraints.
- Decision changed:
  - Use one simple visual accent, but keep the profile understandable without it.
  - Use a collapsed section for lower-priority career detail instead of making the main flow longer.

### 5. Organizing information with collapsed sections

- Source: [Organizing information with collapsed sections](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections?apiVersion=2022-11-28)
- Findings:
  - `<details>` and `<summary>` are supported.
  - Markdown inside `<details>` still renders normally.
- Decision changed:
  - Put earlier-career material in a collapsed section so the top-level README stays focused on current AI/product work.

### 6. Creating diagrams

- Source: [Creating diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams)
- Findings:
  - Mermaid is officially supported inside fenced code blocks.
  - GitHub warns that third-party Mermaid plugins may cause errors.
- Decision changed:
  - Do not make Mermaid essential to the profile. It is supported, but not necessary for this narrative and can be one more thing to fail or render unexpectedly.

### 7. Working with non-code files

- Source: [Working with non-code files](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files)
- Findings:
  - GitHub documents Mermaid rendering issues, including extra padding in some diagrams.
  - GitHub also notes that not all Mermaid charts are fully accessible.
- Decision changed:
  - Prefer a static local SVG accent over Mermaid for the hero visual, and keep all essential meaning in text.

### 8. GitHub Markup

- Source: [github/markup](https://github.com/github/markup)
- Findings:
  - GitHub sanitizes rendered HTML, stripping items such as scripts, inline styles, and `class` / `id` attributes.
  - GitHub then adds its own filters for things such as emoji, task lists, anchors, image caching, and autolinking.
- Decision changed:
  - Avoid any design that depends on custom CSS or layout classes.
  - Keep the README portable and robust under GitHub’s sanitizer.

### 9. 5 tips for making your GitHub profile page accessible

- Source: [5 tips for making your GitHub profile page accessible](https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/)
- Findings:
  - Links should make sense on their own.
  - Images need concise alt text.
  - Heading hierarchy helps both assistive tech and visual scanning.
  - Emoji should be used sparingly.
- Decision changed:
  - Use descriptive link labels such as “Full CV” or site names.
  - Add alt text to the local SVG.
  - Keep the heading structure shallow and avoid emoji entirely.

### 10. Using your GitHub profile to enhance your resume

- Source: [Using your GitHub profile to enhance your resume](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume)
- Findings:
  - GitHub recommends a short introduction, skills, professional experience, notable projects, and achievements.
  - The profile README should complement pinned projects rather than replace them.
  - Hiring managers scan quickly.
- Decision changed:
  - Put identity, working focus, and project links high.
  - Summarize career history rather than dumping a full CV.
  - Keep the README useful for both collaborators and hiring-style visitors.

## Live Profile Examples

These are observations from the specific profiles below, not universal claims about all GitHub profiles.

### 11. Mattt

- Source: [mattt (Mattt) · GitHub](https://github.com/mattt)
- What works:
  - The intro is short, specific, and human.
  - Credibility comes from concise writing and strong pinned repositories, not layout tricks.
  - The profile feels editorially confident because it does not try to say everything.
- What breaks or risks:
  - The README assumes the visitor will infer technical depth from prior reputation or pinned repos.
- Decision changed:
  - Borrow the restraint, not the sparseness: keep the intro tight, but add more explicit current-work context because RJ is positioning as an active AI/product engineer.

### 12. Kartik Labhshetwar

- Source: [KartikLabhshetwar (Kartik Labhshetwar) · GitHub](https://github.com/KartikLabhshetwar)
- What works:
  - The “current work” list is immediately useful.
  - The profile is clear about builder identity and preferred stack.
  - Social links are easy to find.
- What breaks or risks:
  - The project list is long enough that the profile starts competing with the pinned repos instead of teeing them up.
- Decision changed:
  - Include a “working on” section, but cap it to the three clearest public destinations from the PDFs.

### 13. Andrew Maguire

- Source: [andrewm4894 (Andrew Maguire) · GitHub](https://github.com/andrewm4894)
- What works:
  - The profile is highly concrete: specific projects, talks, plugins, and blog posts.
  - It reads like an active practitioner rather than a generic resume.
- What breaks or risks:
  - The long bullet inventory becomes dense and harder to scan on a narrow screen.
  - There is less of a unifying personal story at the top.
- Decision changed:
  - Keep RJ’s README project-forward, but organize it around narrative buckets instead of a long undifferentiated list.

### 14. Safi Shamsi

- Source: [safishamsi (Safi) · GitHub](https://github.com/safishamsi)
- What works:
  - Strong positioning around research, open source, and domain focus.
  - Clear proof-minded instinct: publications, products, and areas of expertise are explicit.
- What breaks or risks:
  - The profile becomes metric-heavy quickly: badges, charts, coverage lists, and viral claims compete with the human introduction.
  - It raises maintenance cost and increases the chance that stale external graphics dominate the page.
- Decision changed:
  - Do not use star charts, dynamic stats, or social-proof badges in the final README.

### 15. Moinul Moin

- Source: [moinulmoin (Moinul Moin) · GitHub](https://github.com/moinulmoin)
- What works:
  - The profile quickly signals stack and contact information.
  - The tone is approachable.
- What breaks or risks:
  - The generic “about me + tech stack badges + contributed repo card” pattern feels interchangeable.
  - The image-heavy stack wall takes up prime space without adding much narrative specificity.
- Decision changed:
  - Avoid badge walls. Use a short, shaped code block plus prose instead of a grid of logo images.

## Pattern Synthesis From The Example Set

- Profiles that feel strongest do not try to replace the rest of GitHub. They introduce the person, frame the current work, and point visitors at the right next click.
- For developer and AI-engineer profiles, the clearest modern convention in my sample is “current build surface first, deep history second.”
- Personal voice matters most when it is anchored to concrete work. Vague “passionate about innovation” copy is weaker than a short line tied to actual projects, products, or systems.
- Decorative elements work best when they are static, local, and non-essential. Once a profile depends on live metrics or third-party images, failure modes start to show.

## Final Design Decisions For This Run

- Use one local SVG as a narrative accent, not as an information container.
- Keep the first screen to identity, short story, current focus, and project links.
- Use a code block for compact technical flavor instead of badges or widgets.
- Use a collapsed section for earlier roles.
- Keep all core meaning in text so the README still works if the SVG does not load.
