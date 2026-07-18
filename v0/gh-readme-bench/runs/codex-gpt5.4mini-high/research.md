# Research

Access date for all web sources below: 2026-07-16.

## Method

- I prioritized GitHub's own documentation for supported markup, profile behavior, privacy, and constraints.
- I then inspected live profile README examples and GitHub topic pages to see what is currently common in the wild.
- I treated generator/tool repositories and topic pages as ecosystem signals, not as proof that a pattern is good.

## GitHub Docs

### About your profile

- URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile
- Finding: GitHub frames the profile README as a customizable section at the top of the profile. It also warns that public profile details are visible to all users, so anything shared there should be intentional.
- Decision: Keep the profile README specific, public-safe, and free of unnecessary personal exposure.

### Managing your profile README

- URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Finding: A profile README appears only when the username-matching repository is public and contains a non-empty `README.md`.
- Decision: Write something that stands alone as the profile itself and does not depend on hidden context.

### Quickstart for writing on GitHub

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github
- Finding: GitHub supports Markdown plus some HTML tags, including `<details>`, and explicitly documents responsive images via `<picture>`.
- Decision: Use GitHub-native Markdown and a small amount of HTML only where it improves scannability, such as a collapsed history section.

### Basic writing and formatting syntax

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Finding: GitHub supports images in Markdown and expects meaningful alt text.
- Decision: Avoid decorative remote images entirely unless they earn their keep. If images are used, they must have descriptive alt text.

### About the repository README file

- URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- Finding: GitHub truncates README content beyond 500 KiB and prefers relative links for repository-local assets.
- Decision: Keep the README short enough to stay legible and avoid unnecessary external dependencies.

### Profile reference

- URL: https://docs.github.com/en/account-and-profile/reference/profile-reference
- Finding: GitHub profile pages can show badges and achievements, but the profile itself is still a public surface.
- Decision: Do not lean on vanity metrics or badge clutter as the main narrative.

### Working with non-code files

- URL: https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files
- Finding: GitHub notes that embedded HTML can render inconsistently depending on what the renderer supports.
- Decision: Keep any HTML minimal and only use supported constructs that degrade cleanly.

### Creating screenshots

- URL: https://docs.github.com/en/contributing/writing-for-github-docs/creating-screenshots
- Finding: GitHub documents screenshots as something that can improve scannability but also increase load time, maintenance, and accessibility burden.
- Decision: Avoid screenshots and other heavy visual elements for a profile README.

### Using your GitHub profile to enhance your resume

- URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume
- Finding: GitHub suggests a concise professional bio, a profile README, and best projects that show skills and interests.
- Decision: Structure the README around a clear identity, selected projects, and a small set of credibility signals.

## Live Examples

### KazKozDev (Artem KK) - GitHub profile

- URL: https://github.com/KazKozDev
- Finding: This profile uses a sharp one-line positioning statement, a short contact block, achievements, and pinned projects. It is compact and task-focused rather than decorative.
- Decision: Lead with a strong identity line and let selected work carry the proof.

### HussainAther (Syed Hussain Ather) - GitHub profile

- URL: https://github.com/hussainather
- Finding: This profile goes maximalist: headline, about section, long professional experience table, detailed technical expertise, and research sections. It is rich, but it is also dense.
- Decision: Borrow the depth only selectively. Do not turn the README into an essay or skills wall.

### martinjc (Martin Chorley) - GitHub profile

- URL: https://github.com/martinjc
- Finding: This profile is simple: brief introduction, a few sentences of context, and pinned repositories. It remains legible and credible without extra decoration.
- Decision: Keep the top of the profile readable in one pass on a narrow screen.

### offfahad (Muhammad Fahad) - GitHub profile

- URL: https://github.com/offfahad
- Finding: This profile shows a common current pattern: role headline, one short explanatory paragraph, a "connect" line, and pinned projects.
- Decision: Use a concise role headline and one compact paragraph rather than multiple generic sections.

### KartikLabhshetwar (Kartik Labhshetwar) - GitHub profile

- URL: https://github.com/KartikLabhshetwar
- Finding: This profile combines a short opener, a compressed stack line, and a current-work list. The content is scannable and product-oriented.
- Decision: Present the stack as a compact signal, not a huge badge wall.

### sayedmohamedscu (elsayed mohamed) - GitHub profile

- URL: https://github.com/sayedmohamedscu
- Finding: This profile demonstrates the opposite extreme: many icons, a long expertise section, and a detailed experience matrix. It is informative but heavy.
- Decision: Avoid a long tool inventory and keep the README maintainable.

## Ecosystem Signals

### GitHub Topics: profile-readme

- URL: https://github.com/topics/profile-readme
- Finding: The topic page highlights active repos such as `github-readme-stats`, `metrics`, `waka-readme-stats`, `github-profile-views-counter`, `profile-readme-generator`, and `github-profile-summary-cards`.
- Decision: Dynamic stats, counters, and generator ecosystems are still common, but they should remain optional rather than central.

### GitHub Topics: github-profile-readme

- URL: https://github.com/topics/github-profile-readme
- Finding: The topic page shows profile README repos updated in 2026 and signals an ecosystem full of templates and visual generators.
- Decision: Use that ecosystem as inspiration, but keep the final README original and specific to this person.

### GitHub Topics: personal-readme

- URL: https://github.com/topics/personal-readme
- Finding: Recent profile repos often compress identity, stack, and selected projects into a short page.
- Decision: Favor a compact, human-readable summary over a template-heavy page.

## Design Constraints Derived From Research

- Start with a single clear identity line.
- Prioritize current AI/product/open-source work before older roles.
- Use compact bullets, not a badge wall.
- Keep optional or long history behind `<details>`.
- Avoid dynamic widgets that break the profile if they fail.
- Prefer local, static, and readable Markdown over flashy embeds.
- Do not use information that depends on private credentials or live services.
- Make the README coherent at mobile width and still understandable if every image fails.
- Keep the profile public-safe and avoid unnecessary privacy exposure.
