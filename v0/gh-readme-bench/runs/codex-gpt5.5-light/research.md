# Research: GitHub Profile README

Access date for all web sources: 2026-07-16.

## Scope

The final README is for a GitHub profile, not a CV. I researched official GitHub behavior first, then current profile conventions and failure modes. I treated external examples as inspiration only; no wording or layout was copied.

## Sources And Findings

### GitHub Docs: About your profile

URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile

Findings:

- GitHub describes the profile README as the customizable section at the top of a public profile.
- Suggested useful content includes an about section, contributions the person is proud of, and guidance for contacting or getting help.
- GitHub highlights that public profile details are visible to all users, making privacy and intentional disclosure part of the design.

Decisions changed:

- Put the identity and current work at the top, before career history.
- Use only contact links already present in the PDFs.
- Avoid sensitive or unnecessary personal details beyond Lisbon, public email, site, GitHub, and LinkedIn.

### GitHub Docs: Managing your profile README

URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

Findings:

- A profile README renders when a public repository matching the username contains a non-empty `README.md`.
- The README is positioned as a way to tell others about yourself.

Decisions changed:

- Treat the file as the first screen of a profile rather than an exhaustive document.
- Make the README self-contained so it still works if a visitor does not open the CV.

### GitHub Docs: Basic writing and formatting syntax

URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Findings:

- GitHub supports Markdown headings, links, images, lists, tables, task lists, footnotes, comments, and some HTML.
- GitHub recommends relative links for repository assets because they work across branches and clones.
- Alt text is expected for images.
- The `<picture>` element is supported.

Decisions changed:

- Use relative links for the local SVG asset.
- Give the SVG a meaningful accessible title/description and the Markdown image descriptive alt text.
- Avoid complex HTML that would be hard to maintain or unpredictable in GitHub's renderer.

### GitHub Flavored Markdown Spec

URL: https://github.github.com/gfm/

Findings:

- GitHub Flavored Markdown is a strict superset of CommonMark.
- Raw HTML support exists, but tags such as `script`, `style`, `iframe`, `textarea`, and related elements are filtered by the tagfilter extension.
- GitHub performs additional sanitization after Markdown conversion.

Decisions changed:

- Do not rely on scripts, iframes, CSS, embedded styles, or custom layout behavior.
- Prefer durable Markdown sections, tables, and one static SVG asset.

### GitHub Community Discussion: CSS in GitHub Markdown

URL: https://github.com/orgs/community/discussions/22728

Findings:

- Inline CSS and style attributes are removed as part of GitHub sanitization.
- Alignment hacks may work, but broad CSS customization should not be assumed.

Decisions changed:

- Do not use `style` attributes.
- Use Markdown-native layout and simple HTML only where optional.

### Awesome GitHub Profile README

URL: https://github.com/abhisheknaiidu/awesome-github-profile-readme

Findings:

- Common contemporary profile patterns include GitHub Actions-updated sections, game mode, code mode, dynamic realtime widgets, typing animations, GIFs, badges, icons, retro designs, and minimal profiles.
- The breadth of categories shows that personality matters, but the collection also demonstrates how easily profiles can become visually noisy.

Decisions changed:

- Use a "console panel" motif because it fits Ricardo's engineering/storytelling style and avoids a generic AI-engineer template.
- Keep animation out of the final README to improve reliability and reduce distraction.

### GitHub Readme Stats

URL: https://github.com/anuraghazra/github-readme-stats

Findings:

- Dynamic stats cards can show public GitHub statistics and language cards.
- Private stats require self-hosting and a GitHub token.
- The project documents caching behavior and self-hosting to avoid public-service limits.

Decisions changed:

- Avoid dynamic stats entirely because the PDFs do not provide accurate GitHub activity metrics and public cards can fail, cache stale values, or imply vanity proof.
- Do not invent repository popularity or activity.

### GitHub Readme Stats Issue: service limit/outage example

URL: https://github.com/anuraghazra/github-readme-stats/issues/4658

Findings:

- Dynamic profile services can hit hosting/API limits or return error SVGs.
- Users may need to self-host to avoid outages.

Decisions changed:

- Make the README coherent without dynamic third-party images.
- Use a local SVG asset rather than external generated cards.

### Gitskins: GitHub Profile README Examples

URL: https://www.gitskins.com/blog/github-profile-readme-examples

Findings:

- A practical structure for developer profiles is identity, focus, proof, context, and action.
- Senior profiles should emphasize judgment, systems thinking, and outcomes rather than a long list of technologies.

Decisions changed:

- Structure the final README around identity, current work, selected projects, operating style, stack, and contact.
- Compress career history into a "proof" timeline rather than pasting experience bullets.

### SitePoint: Create an impressive GitHub profile README

URL: https://www.sitepoint.com/github-profile-readme/

Findings:

- GitHub sanitizes converted HTML and ignores tags/attributes such as `script`, `style`, and `style` attributes.
- Badges and GIFs are common but should be used intentionally.

Decisions changed:

- Keep badges sparse and factual.
- Avoid GIFs and external tracking-like media.

### Real Example: swyx GitHub/Gist profile

URL: https://gist.github.com/swyxio

Findings:

- Strong technical profiles can be terse and link-rich, using a clear current focus and a few high-signal destinations instead of a comprehensive biography.
- The profile works because it connects identity, current topics, and projects quickly.

Decisions changed:

- Use concise current-focus lines near the top.
- Link to 11io, 11ai, 11bench, GitHub, and LinkedIn as clear next steps.

## Current Conventions Observed

- Profile READMEs often begin with a greeting or identity line, but stronger ones quickly explain what the person builds.
- Skill badges are common; the best profiles use them as wayfinding, not inventory.
- Dynamic cards, streak counters, trophies, and WakaTime widgets are popular but fragile and sometimes self-promotional without context.
- Code-block "terminal" sections and retro/game motifs remain common, especially for developers with a playful technical identity.
- AI-engineer profiles often foreground agents, LLM tooling, workflow automation, evaluations, and product prototypes; credibility improves when paired with concrete product history.

## Failure Modes To Avoid

- Badge walls that bury the person's actual story.
- Dynamic stats that fail, require tokens, leak private data, or imply proof not supported by the source material.
- Generic AI-copy phrases such as "passionate about innovation" without specific projects.
- Excessive animation or GIFs that distract, fail on slow connections, or make the page uncomfortable.
- Color-only meaning without text labels.
- Wide tables or images that overflow on mobile.
- A pasted CV that forces visitors to decode chronology before understanding current value.

## Final README Design Decisions

- Open with a local SVG console panel and a plain-text identity paragraph immediately below it, so the profile remains understandable if the image fails.
- Use three project cards in a Markdown table for `11io`, `11ai`, and `11bench` because these are current and directly relevant to GitHub visitors.
- Keep previous employers in a compact credibility trail instead of a full CV.
- Include the robotics/game origin story as a small human hook, not the main narrative.
- Use a small number of Shields badges for contact and stack signals only.
- Use no live stats, no visitor counters, no tracking pixels, and no credentialed services.
