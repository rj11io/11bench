# Research Notes

Access date: 2026-07-16

## What a strong GitHub profile README communicates

Source: GitHub Docs, "Managing your profile README"
URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

Findings:
- A profile README appears on the profile page when the repository name matches the username, the repo is public, and `README.md` exists in the root.
- GitHub positions the README as a place to tell people about yourself.

Decision impact:
- The final README should feel profile-native, not like a pasted CV, and it should remain valid even if the repo is mirrored or opened outside GitHub.

Source: GitHub Docs, "About your profile"
URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile

Findings:
- GitHub frames the profile as a place to showcase work, contributions, and information you choose to share publicly.
- GitHub explicitly suggests an "About me" section, contributions you are proud of, and help/contact guidance.

Decision impact:
- The README should emphasize a short identity statement, current focus, proof of credibility, and clear contact paths.

Source: GitHub Docs, "Using your GitHub profile to enhance your resume"
URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume

Findings:
- GitHub recommends a concise bio plus a profile README for more flexibility and creativity.
- Suggested content includes an introduction and skills.

Decision impact:
- Use a compact top section for immediate scanning, then a fuller narrative and a skills map.

Source: GitHub Docs, "About the repository README file"
URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

Findings:
- READMEs are often the first thing a visitor sees.
- GitHub automatically generates an outline from headings.
- Relative links and image paths should be used for repository-local assets.
- Content above 500 KiB is truncated.

Decision impact:
- Keep the README short enough to scan, with clear headings and no reliance on giant media assets.

## Markdown, HTML, and layout constraints

Source: GitHub Docs, "Quickstart for writing on GitHub"
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github

Findings:
- GitHub Markdown supports images, tables, collapsed sections, quotes, and limited HTML.
- GitHub explicitly shows `<picture>` as a way to provide theme-aware images.

Decision impact:
- Use only GitHub-compatible Markdown/HTML and avoid custom scripts or complex client-side behavior.

Source: GitHub Docs, "Organizing information with collapsed sections"
URL: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections

Findings:
- `<details>` blocks can hold markdown, images, and code blocks.

Decision impact:
- A collapsed section can hold a concise longer-form summary without overwhelming the default view.

Source: GitHub Docs, "Basic writing and formatting syntax"
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Findings:
- HTML comments can hide content from rendering.
- Images need meaningful alt text.

Decision impact:
- Use descriptive alt text if any image is added; avoid decorative-only assets unless they support the narrative.

Source: GitHub Docs, "Managing accessibility settings"
URL: https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings

Findings:
- GitHub supports reduced motion behavior for animated images.

Decision impact:
- Avoid autoplay-heavy or motion-dependent designs; the README must read cleanly with images blocked or motion reduced.

## Current examples and conventions observed

Source: GitHub Topics, "github-profile-readme"
URL: https://github.com/topics/github-profile-readme

Findings:
- The topic page surfaces many profile-README-related repositories and tool projects such as badge collections, stats generators, header generators, summary cards, and animated contribution visuals.

Decision impact:
- These patterns are common enough to be recognizable, but the final README should use them sparingly and only when they support a real narrative.

Source: GitHub Topics, "readme"
URL: https://github.com/topics/readme

Findings:
- The topic page includes generator and template repositories focused on badges, stats, and profile beautification.

Decision impact:
- Resist generator-style sameness; keep the layout bespoke and grounded in the person's actual work.

Source: GitHub Topics, "profile-readme"
URL: https://github.com/topics/profile-readme

Findings:
- The topic page shows that profile READMEs frequently mix intro copy, badges, and lightweight visual assets.

Decision impact:
- Include a small amount of visual structure, but avoid a badge wall.

Source: GitHub Discussion, "How do I customize my GitHub profile with a README?"
URL: https://github.com/orgs/community/discussions/169002

Findings:
- The discussion reflects common community patterns: badges, stats, GIFs, icons, and links to projects.

Decision impact:
- Treat these as familiar conventions, not mandatory elements. Include only the ones that survive without external services.

Source: GitHub Topic results, "github-profile-readme"
URL: https://github.com/topics/github-profile-readme

Findings:
- Many example repos are generators or curated lists rather than strong narrative profiles.

Decision impact:
- The README should read like a personal homepage for collaborators, not a display rack of widgets.

## Failure modes to avoid

Source: GitHub Docs, "About the repository README file"
URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

Findings:
- Long READMEs can be truncated.
- README content should stay practical and readable.

Decision impact:
- Keep the content focused and avoid long decorative sections that dilute the core message.

Source: GitHub Docs, "About your profile"
URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile

Findings:
- Public profile details are visible broadly.

Decision impact:
- Avoid oversharing private information and keep the README professional.

Source: GitHub Docs, "Managing accessibility settings"
URL: https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings

Findings:
- Motion and contrast preferences can vary by user.

Decision impact:
- Avoid designs that rely on animation, color-only meaning, or contrast-sensitive microelements.

Practical failure modes identified:
- Badge walls that add noise without adding signal.
- Vanity metrics and streak cards that can break, mislead, or age poorly.
- Dynamic services that depend on third-party uptime or rate limits.
- Excessive animation that hurts mobile readability and accessibility.
- Generic AI copy that erases the person's actual specialties.

## Editorial direction decided

- Use one strong opening sentence that says what the person does now.
- Add a short "current focus" list, because GitHub visitors scan for relevance first.
- Preserve career credibility through a concise timeline, not a full CV dump.
- Surface selected projects: personal brand, open-source AI skills/plugins, open-source benchmarks, and a few high-signal prior roles.
- Include a direct contact route and a short invitation to collaborate.
- Keep the design text-first, with one optional collapsible detail area if needed.

