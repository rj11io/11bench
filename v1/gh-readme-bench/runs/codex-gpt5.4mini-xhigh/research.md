# Research Notes

Access date for all web sources: 2026-07-16.

## What Good Profile READMEs Do

- They answer three questions quickly: who this person is, what they build now, and how to reach them.
- They use the profile README for narrative, while GitHub already provides pinned items, activity, bio, and achievements elsewhere on the profile page.
- They stay readable at a glance. Short headings, short paragraphs, and a few concrete project links scan better than a full resume dump.
- They treat dynamic widgets as optional decoration, not the main message.
- They remain understandable if images, cards, or embeds fail.

## Source Log

### GitHub Docs: Managing your profile README
- URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Accessed: 2026-07-16
- Findings: A profile README is shown when the repository name matches the username, the repo is public, and `README.md` exists at the root. GitHub also prepopulates the README with starter text. Profile READMEs are not available to managed user accounts.
- Decision changed: I will keep the README simple, public, and self-contained. I will not depend on any hidden setup or external service to make the profile meaningful.

### GitHub Docs: About your profile
- URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile
- Accessed: 2026-07-16
- Findings: GitHub highlights profile README, personal info, contribution activity, pinned items, status, achievements, and badges as separate profile elements. GitHub also reminds users that public profile details are visible broadly.
- Decision changed: The README should complement pinned repos and profile metadata, not duplicate them. I kept contact details limited to what is useful for a visitor.

### GitHub Docs: Profile reference
- URL: https://docs.github.com/en/account-and-profile/reference/profile-reference
- Accessed: 2026-07-16
- Findings: Profile location and time zone can be shown publicly, pinned items are a first-class part of the profile, and badges exist but are separate from the README itself. Public profile details are visible to all users.
- Decision changed: I chose not to build around vanity metrics or status-like decoration. I also avoided adding unnecessary personal detail beyond what the CV already supports.

### GitHub Docs: Quickstart for writing on GitHub
- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github
- Accessed: 2026-07-16
- Findings: GitHub supports Markdown plus some HTML tags in profile READMEs. The quickstart explicitly covers responsive images with `<picture>`, tables, collapsed sections with `<details>`, blockquotes, and hidden comments.
- Decision changed: I can use GitHub-native structure for a compact layout, but I do not need tables or extra images for this profile. A single collapsed section is enough if I want to preserve older history without clutter.

### GitHub Docs: Basic writing and formatting syntax
- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Accessed: 2026-07-16
- Findings: GitHub Markdown supports headings, links, images, lists, task lists, line breaks, and HTML comments. The docs also emphasize descriptive links, logical heading order, and alt text for images.
- Decision changed: I used a plain heading hierarchy and descriptive project links. I avoided decorative list bullets, ambiguous link text, and any image that would need heavy alt-text support.

### GitHub Docs: About the repository README file
- URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- Accessed: 2026-07-16
- Findings: GitHub automatically recognizes README files in a repository root and will truncate content beyond 500 KiB. Relative links and image paths are preferred, especially for cloned repositories. Long documentation belongs elsewhere.
- Decision changed: I kept the README short enough to read quickly and far below the size limit. I also chose links that work cleanly from GitHub without needing complex navigation.

### GitHub Docs: Creating diagrams
- URL: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams
- Accessed: 2026-07-16
- Findings: GitHub supports Mermaid, GeoJSON, TopoJSON, and ASCII STL diagrams in Markdown files. The docs also note that diagram accessibility is not guaranteed for every chart type.
- Decision changed: I did not use Mermaid or any diagram. The README already has enough structure, and text-only layout is more reliable on narrow screens.

### GitHub Docs: Using your GitHub profile to enhance your resume
- URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume
- Accessed: 2026-07-16
- Findings: GitHub recommends a short professional bio, a profile README, a few best projects, experience, skills, and achievements. It also recommends pinning 3 to 5 repos.
- Decision changed: I centered the README on current work, selected projects, and the most credible recent roles. I did not try to cram every past job into the main body.

### GitHub Blog: 5 tips for making your GitHub profile page accessible
- URL: https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/
- Accessed: 2026-07-16
- Findings: The post recommends descriptive link text, alt text that explains the meaning of images, logical heading structure, plain language, and careful use of emoji and decorative bullets.
- Decision changed: I used normal bullets, a clear heading order, and no decorative icon wall. I also avoided image-dependent meaning and kept the wording plain.

### GitHub Blog: Beginner's guide to GitHub: Setting up and securing your profile
- URL: https://github.blog/developer-skills/github/beginners-guide-to-github-setting-up-and-securing-your-profile/
- Accessed: 2026-07-16
- Findings: GitHub points readers to profile README examples from yabellini, levxyca, and omariosouto. The article reinforces that a profile README is a living portfolio, not just a bio.
- Decision changed: I used the profile README as a curated portfolio narrative, not as a text dump of every line in the CV.

### GitHub Readme Stats
- URL: https://github.com/anuraghazra/github-readme-stats
- Accessed: 2026-07-16
- Findings: The project documents stats cards, top language cards, pin cards, WakaTime cards, and self-hosting options. It also warns that the public Vercel instance is best-effort and can be unreliable because of rate limits and traffic spikes, and that private stats require self-hosting or a personal token.
- Decision changed: I did not use stats cards or visitor counters. The profile should not depend on a rate-limited third-party service to communicate basic credibility.

### GitHub Community Discussion: How do I customize my GitHub profile with a README?
- URL: https://github.com/orgs/community/discussions/169002
- Accessed: 2026-07-16
- Findings: Current community advice still mentions badges, GitHub stats, GIFs, and skill icons as common additions, but those are optional embellishments rather than requirements.
- Decision changed: I treated badges and GIFs as optional, not default. The README is better off if the main message is strong without them.

### GitHub Community Discussion: Prepping Your GitHub Profile for 2026
- URL: https://github.com/orgs/community/discussions/186153
- Accessed: 2026-07-16
- Findings: The discussion recommends lightweight profile touches such as a simple SVG header, a small number of badges, and pinned repositories that show direction. It also says one small change is enough to start.
- Decision changed: I kept the design lightweight and did not build a badge wall. If I add visual treatment at all, it should be restrained and support the story.

### GitHub Profile: omariosouto
- URL: https://github.com/omariosouto
- Accessed: 2026-07-16
- Findings: The profile combines a concise opening, social links, recent videos, a stats card, and pinned repositories. It is energetic and well known, but the stats card and media embeds add complexity.
- Decision changed: I borrowed the idea of a short opening followed by concrete links and pinned work, but I did not copy the widget-heavy style.

### GitHub Profile: jimbobbennett
- URL: https://github.com/jimbobbennett
- Accessed: 2026-07-16
- Findings: This profile uses a short intro, a more human long bio, a links section, a pictures folder, and pinned repos. The structure is specific and personal without being noisy.
- Decision changed: I used the same pattern of short intro plus useful detail, and I kept the language human rather than resume-formal.

### GitHub Profile: levxyca
- URL: https://github.com/levxyca
- Accessed: 2026-07-16
- Findings: The profile leans into community identity, blog posts, recent videos, social links, and pinned projects. It shows how a README can highlight public writing and community work.
- Decision changed: I kept the idea of public-facing links and personality, but I did not add blog/video sections because they are not central to this person's current story.

### GitHub Profile: yabellini
- URL: https://github.com/yabellini
- Accessed: 2026-07-16
- Findings: The README is community-centric and long-form, with many links, posts, videos, and pinned repos. It demonstrates how far a profile can go when the person's public output is broad.
- Decision changed: I used a much tighter scope because this person's GitHub profile should emphasize product engineering and open source, not a community-program catalog.

### GitHub Profile: beshkenadze
- URL: https://github.com/beshkenadze
- Accessed: 2026-07-16
- Findings: This is the strongest technical reference I reviewed. It uses specific current work, concrete product names, open-source contributions, products shipped, and older projects. It reads like a curated engineering narrative, not a generic AI bio.
- Decision changed: I followed this model most closely. The README now leads with specific work, then expands into selected experience and older work only as needed.

### GitHub Profile: prateeksawhney97
- URL: https://github.com/prateeksawhney97
- Accessed: 2026-07-16
- Findings: This profile is conventional: an AI-focused intro, a couple of projects, courses, and contact links. It is credible, but the project descriptions are long and repetitive.
- Decision changed: I kept the useful structure of intro + projects + contact, but I shortened the project copy so the page stays scannable.

## Failure Modes I Avoided

- Badge walls that add visual noise without adding meaning.
- Visitor counters or vanity metrics that do not improve trust.
- Dynamic cards that can fail, rate-limit, or become stale.
- Generic AI copy like "passionate about innovation" without concrete work.
- Dense tables that can become awkward on mobile.
- Animated GIFs or banners that become the whole profile instead of supporting it.
- Unsupported claims that cannot be traced back to the CV sources.

## Design Decisions Taken From The Research

- Lead with a one-sentence identity and current focus.
- Use one compact code block for flavor and technical framing.
- Keep the main story in plain text, not in widgets.
- Use a single collapsed section for older history so the top of the page stays light.
- Link to real projects and real contact paths with descriptive labels.
- Preserve accessibility by keeping the heading order simple and the copy direct.
