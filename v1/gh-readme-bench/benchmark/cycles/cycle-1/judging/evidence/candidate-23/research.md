# Research

Access date for all sources: 2026-07-16.

## Method

I treated the two PDFs in `ref/` as the only biographical sources. For the GitHub README research, I used GitHub Docs as the primary source for platform behavior and a small set of live profile README examples as critical references for current conventions.

I avoided claims that depend on popularity, follower counts, or dynamic widgets. The main goal was to learn what GitHub actually supports, what reads well on a profile page, and which common profile tropes are worth avoiding.

## Sources and findings

| Source | URL | Finding | Decision changed |
| --- | --- | --- | --- |
| GitHub Docs: About your profile | https://docs.github.com/en/account-and-profile/concepts/personal-profile | A profile README is one of the key customizable elements of a GitHub profile, and it is visible publicly unless the profile is private. GitHub explicitly warns that public profile details are visible to all users. | Keep the README professional, avoid oversharing, and use only facts already public in the CV. |
| GitHub Docs: Managing your profile README | https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme | A profile README appears when the repository name matches the username, the repo is public, and the root contains `README.md`. | Keep the README self-contained and static. Do not rely on hidden setup or private context. |
| GitHub Docs: Quickstart for writing on GitHub | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github | GitHub Flavored Markdown supports advanced formatting, and GitHub recommends adding images, tables, quotes, and collapsed sections only as needed. | Use only a small amount of markup: headings, bullets, links, one `<details>` block, and no decorative clutter. |
| GitHub Docs: Basic writing and formatting syntax | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax | Markdown on GitHub supports images, lists, tables, alerts, relative links, and some HTML such as `<picture>`. | Prefer plain Markdown over HTML. Use HTML only where it improves scanability, not as decoration. |
| GitHub Docs: About the repository README file | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes | README files are often the first thing visitors see, and content beyond 500 KiB is truncated. | Front-load the identity and keep the README compact so it stays legible on profile load. |
| GitHub Docs: Organizing information with tables | https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables | Tables are supported, but the docs emphasize correct syntax and readable formatting. | Avoid tables in the final profile README because they can become cramped on mobile. Bullets are safer. |
| Profile example: KazKozDev | https://github.com/KazKozDev | The profile is concise, with a clear identity line and a direct explanation of the person’s AI focus. | Use a strong one-line positioning statement instead of a generic greeting. |
| Profile example: HussainAther | https://github.com/hussainather | The profile combines a clear professional identity with a visible open-source/AI framing. | Keep the narrative specific and credible, centered on engineering work rather than personality-only copy. |
| Profile example: Lum1104 | https://github.com/Lum1104 | The profile makes current interests and contact paths easy to find at a glance. | Make contact paths explicit and easy to scan near the top or in a dedicated contact section. |
| Profile example: TheDyXer | https://github.com/TheDyXer | Some profiles lean heavily on casual greeting text and opinionated persona lines. | Avoid generic hello-world openings and opinion-only identity statements. |
| Sample pattern collection: zluvsand/github_profile | https://github.com/zluvsand/github_profile | Common profile README tropes include badges, stats cards, banners, and curated snippets. | Avoid badge walls and vanity metrics. The README should still work when external widgets fail. |

## Practical conclusions

- The README should read cleanly without any external images or dynamic cards.
- The best structure for this profile is: strong identity line, current work, selected capabilities, compact background, contact paths.
- A single collapsed section is useful for preserving career depth without turning the page into a CV dump.
- Links should be direct and obvious. No tracking pixels, no visitor counters, no credentialed services.
- The page should remain understandable on a narrow GitHub viewport, so short sections and bullets are preferable to dense tables.

## Failure modes to avoid

- Badge walls that add noise without adding signal.
- Dynamic stats cards that can break, load slowly, or make the profile depend on third-party uptime.
- Generic AI copy such as "passionate developer" or "love building cool things" without a concrete working model.
- Overlong career lists that bury the current story.
- Color-only meaning or visual devices that collapse on mobile.
- Anything that depends on private credentials, tracked analytics, or user-specific services.

## Research-informed design choices

- Open with a specific role and location.
- Put current AI/product/open-source work before older history.
- Use a code block only as a small stylistic accent, not as a gimmick.
- Use `<details>` to keep older experience available without making the first screen overwhelming.
- Keep the visual system static and GitHub-native so the README degrades gracefully.
