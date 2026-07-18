# README research

Research date: 2026-07-16 (Europe/Lisbon)

## What a visitor needs first

I treated a profile README as an orientation layer, not a CV. A visitor should be able to answer, in roughly one screen: who is this, what do they build, what is interesting here, and where can I continue? GitHub’s own profile guidance says a profile can share interests and skills, showcase projects/contributions, and express identity; its resume guidance recommends a short bio, skills, projects, and clear examples. That supports a scan order of identity → current work → proof/selected history → contact.

## Sources and findings

| Source | Accessed | Finding | Decision changed |
|---|---:|---|---|
| [About your profile — GitHub Docs](https://docs.github.com/en/account-and-profile/concepts/personal-profile) | 2026-07-16 | The profile README is shown at the top of the profile; GitHub frames useful content as about-me, proud contributions, and community guidance. | Open with a human identity and a few useful destinations, not a skills dump. |
| [Quickstart for writing on GitHub — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-and-formatting-on-github) | 2026-07-16 | GitHub-flavored Markdown supports some HTML, tables, collapsible sections, and responsive `<picture>` examples. | Use conservative HTML (`details`, `summary`, `div`, `sub`) and Markdown; avoid CSS-dependent layout. |
| [Managing your profile README — GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) | 2026-07-16 | A profile README requires a public repository named exactly for the username and a non-empty root `README.md`. | Keep the deliverable a self-contained README and avoid setup assumptions in its content. |
| [About the repository README file — GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) | 2026-07-16 | READMEs surface useful purpose, getting started, help, and maintainer context; GitHub renders relative links and truncates content beyond 500 KiB. | Prefer short linked project cards and readable links; no giant generated asset. |
| [Profile reference — GitHub Docs](https://docs.github.com/en/account-and-profile/reference/profile-reference) | 2026-07-16 | Public profile details are visible broadly; social links are public. | Include only the contact paths already present in the source CV; no extra personal data. |
| [Andrej Karpathy’s GitHub profile](https://github.com/karpathy) | 2026-07-16 | A memorable profile can be extremely restrained: a name, one-line point of view, and a direct personal link. | Give RJ a concise point of view rather than decorative widgets. |
| [K-Dense-AI/karpathy README](https://github.com/K-Dense-AI/karpathy) | 2026-07-16 | Contemporary AI project pages lead with a plain-language role and then explain the system, setup, and constraints. | Describe RJ’s AI work in concrete system terms (skills, harnesses, automations), not generic “AI enthusiast” copy. |

## Conventions evaluated

Badges can quickly label a stack, but a wall of shields is noisy, often duplicates the pinned repositories, and can become stale. Stats cards and contribution snakes are dynamic third-party dependencies: they can fail, expose activity, or imply vanity metrics. Animated GIFs and terminal loops can add personality, but they compete with the opening and can be inaccessible or heavy. Custom SVG is useful when it communicates a real system or brand, but it is maintenance overhead and is unnecessary here.

The chosen creative device is a static, text-based “product loop” code block. It is visually distinct, legible in plain text, and narratively true to the source: product problem → data/interface → agent workflow → shipped system. A compact skills table provides searchability without a badge wall. A `<details>` section preserves career credibility for readers who want it without making the first scan feel like a six-page CV.

## Technical, accessibility, and maintenance constraints

- GitHub renders GFM and a subset of HTML; unsupported CSS, scripts, iframes, and JavaScript interactions should not be assumed.
- Headings, link text, and plain-language prose must carry meaning without color, icons, or images. Emoji are supplementary, not the only labels.
- Tables are acceptable for short grouped labels but are poor for long prose and can become awkward on narrow screens. The README uses short cells and avoids multi-column chronology.
- External cards, tracking pixels, credentialed embeds, and live activity claims were intentionally omitted. The document remains complete with network images disabled.
- Long lines are kept out of prose and code; links are descriptive; collapsible history is optional rather than required.
- Maintainability is favored over novelty: all claims are written directly from `content.md`, and no generated asset needs a refresh job.

## Failure modes avoided

The final design avoids generic AI copy, invented metrics, unsupported “currently building” claims, badge walls, excessive animation, color-only meaning, private-service widgets, and a chronological CV pasted without editorial selection. It uses the strongest differentiators available in the PDFs: early game/robotics curiosity, first-frontend-hire ownership, data visualisation, and the current move into agent systems.
