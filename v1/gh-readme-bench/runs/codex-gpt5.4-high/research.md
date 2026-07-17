# Research for GitHub Profile README

Access date for all sources: 2026-07-16

## Goal

Understand what a strong modern GitHub profile README should do, what GitHub actually supports, which creative patterns are worth using, and which common patterns introduce noise, fragility, or credibility problems.

## Source Log

### 1. About your profile - GitHub Docs
- URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile
- Findings:
  - A profile README is only one layer of a GitHub profile; pinned repositories, profile bio, location/time zone, status, and achievements also shape first impressions.
  - GitHub explicitly warns that public profile details are visible to everyone.
  - GitHub frames the profile README as a place for useful context, contributions, and guidance, not just biography.
- Decisions changed:
  - Treat the README as the narrative layer, not a duplicate of every profile surface.
  - Keep public contact details intentional and limited to links already exposed in the PDFs.
  - Write the README so it complements pinned repositories instead of competing with them.

### 2. Managing your profile README - GitHub Docs
- URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Findings:
  - The profile README must be a root `README.md` in a public repository whose name matches the username.
  - There is no build step requirement or special runtime; the profile depends on ordinary GitHub rendering.
- Decisions changed:
  - Prefer a single static `README.md` plus local assets over generated content.
  - Avoid anything that requires credentials, scheduled jobs, or external services to look complete.

### 3. About the repository README file - GitHub Docs
- URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- Findings:
  - README files are a visitor's first stop.
  - GitHub auto-generates an outline from headings.
  - Relative links and image paths are supported.
  - README rendering truncates content beyond 500 KiB.
- Decisions changed:
  - Use real heading structure so the outline becomes useful.
  - Keep assets local and referenced with relative paths.
  - Keep the README tight; no giant HTML blocks, no oversized art, no filler sections.

### 4. Quickstart for writing on GitHub - GitHub Docs
- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github
- Findings:
  - GitHub explicitly supports images, tables, quotes, comments, and collapsed sections with `<details>`.
  - The guide positions these as enhancements for profile READMEs, not core requirements.
- Decisions changed:
  - Use one local image and one `<details>` section where they improve scanning.
  - Avoid tables in the final README because they are more brittle on narrow widths than lists.

### 5. Basic writing and formatting syntax - GitHub Docs
- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Findings:
  - GitHub supports headings, code fences, images, footnotes, alerts, comments, and the `<picture>` element.
  - GitHub warns to use alerts sparingly and not stack them.
- Decisions changed:
  - Lean on standard Markdown and a compact code block for personality.
  - Skip alerts and footnotes in the final README; they add structure cost without helping profile visitors much.
  - Avoid complicated responsive image constructs because one SVG banner is enough.

### 6. Using your GitHub profile to enhance your resume - GitHub Docs
- URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume
- Findings:
  - GitHub recommends a concise introduction, skills, professional context, selected projects, and pinned repositories.
  - The guidance assumes hiring managers scan quickly.
- Decisions changed:
  - Prioritize current identity, selected work, and projects over chronology.
  - Structure the README so someone can understand the story in under a minute.

### 7. 5 tips for making your GitHub profile page accessible - The GitHub Blog
- URL: https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/
- Findings:
  - Links should make sense out of context.
  - Images need meaningful alt text.
  - Heading hierarchy, plain language, and real list markup improve scanning for everyone.
  - Emoji should be used sparingly.
- Decisions changed:
  - Use descriptive link labels like `11ai`, `legacy GitHub account`, and `full CV` instead of vague `here`.
  - Give the banner a real alt description.
  - Avoid emoji bullets and decorative overload.

### 8. GitHub Flavored Markdown Spec
- URL: https://github.github.com/gfm/
- Findings:
  - Raw HTML is broadly supported in GFM, but dangerous tags such as `script`, `style`, and `iframe` are filtered.
  - HTML support is useful for layout helpers like `<details>`, but not for embedding an app inside the README.
- Decisions changed:
  - No embedded widgets, scripts, iframes, or pseudo-app UI.
  - If HTML is used, keep it minimal and readable in source form.

### 9. Lee Reilly (`leereilly`) GitHub profile
- URL: https://github.com/leereilly
- Findings:
  - The profile works because it has a strong voice, a fast identity statement, and curated project groupings.
  - It does not depend on third-party stats cards to communicate credibility.
  - The project sections feel authored, not auto-generated.
- Decisions changed:
  - Build the README around authored curation and selected highlights, not metrics.
  - Use section labels that help a technical visitor decide where to click next.

### 10. Gift Egwuenu (`lauragift21`) GitHub profile
- URL: https://github.com/lauragift21
- Findings:
  - A short link strip plus a few well-written paragraphs can feel more confident than a heavy layout.
  - The profile stays human by including a personal note without losing professional clarity.
- Decisions changed:
  - Keep the contact section simple.
  - Include one memorable personal thread from the PDFs so the README does not read like generic AI-engineer copy.

### 11. GitHub Blog: Beginner's guide to GitHub: Setting up and securing your profile
- URL: https://github.blog/developer-skills/github/beginners-guide-to-github-setting-up-and-securing-your-profile/
- Findings:
  - GitHub presents the profile as a living portfolio.
  - The article points readers to standout GitHub profiles for inspiration rather than to a single canonical template.
- Decisions changed:
  - Favor a personal editorial structure over a template-shaped one.
  - Avoid the default `Hi there` / `I am currently learning` starter format.

### 12. GitHub Topics: `readme`, `personal-readme`, and `profile-readme`
- URLs:
  - https://github.com/topics/readme
  - https://github.com/topics/personal-readme
  - https://github.com/topics/profile-readme
- Findings:
  - GitHub surfaces many generators, counters, metrics dashboards, streak cards, and animated profile experiments.
  - The ecosystem clearly supports aggressive decoration, but topic pages also show how easily profile READMEs can drift into tool-demo territory.
- Decisions changed:
  - Do not use badge walls, visit counters, streak widgets, or dynamic stat cards.
  - Keep any visual flair local, static, and secondary to the written story.

## Synthesis

Strong profile READMEs communicate five things quickly:

1. Who the person is now.
2. What kind of work they ship.
3. Which projects are worth clicking.
4. Why their track record is credible.
5. How to contact them.

People scan profile READMEs in layers:

1. Heading / banner / first sentence.
2. Link cluster and current-focus section.
3. Selected projects and selected work history.
4. Optional collapsed detail if they are still interested.

Current conventions worth borrowing:

- A clear opening identity statement.
- A compact "current focus" or "what I'm building" section.
- Selected projects with one-line explanations.
- One authored visual element, if it still reads well when the image fails.
- A small amount of HTML such as `<details>` when it reduces clutter.

Patterns worth avoiding:

- Badge walls that make the README feel like a parts catalog.
- Vanity metrics without context.
- Dynamic third-party cards that can fail, rate-limit, or misrepresent activity.
- Overwide tables and side-by-side layouts that collapse poorly on mobile.
- Heavy animation that distracts from actual work.
- Generic AI-engineer prose that could belong to anyone.

## Final design principles for this run

- Open with current AI/product/open-source identity, not early-career chronology.
- Preserve the game-modding and robotics thread because it makes the profile memorable and specific.
- Show credibility through selected shipped work, not statistics.
- Use static assets only.
- Keep the README legible with or without the banner image.
- Keep everything compatible with plain GitHub rendering and narrow screens.
