# Research: GitHub Profile README Direction

Access date for all web sources: 2026-07-16.

## Method

- Read both reference PDFs independently, then used this research only for README design conventions and GitHub rendering constraints.
- Favored GitHub documentation and real profile repositories over generator marketing.
- Treated third-party blog posts as taste signals only, not as evidence for biographical facts or unsourced popularity claims.
- Did not inspect any other benchmark run.

## Sources And Findings

| Source | URL | Findings | Decision changed |
| --- | --- | --- | --- |
| GitHub Docs, "About your profile" | https://docs.github.com/en/account-and-profile/concepts/personal-profile | GitHub describes the profile README as a customizable section at the top of the profile. It suggests content such as an about section, proud contributions, and guidance for getting help. It also warns that public profile details are visible to all GitHub users. | Make the first screen self-contained: identity, current work, projects, contact. Use only contact details already present in the PDFs. |
| GitHub Docs, "Managing your profile README" | https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme | A profile README appears when the public repository name matches the username and has a root `README.md`. | Keep the final file as a normal root-style `README.md`, without setup assumptions or private services. |
| GitHub Docs, "Basic writing and formatting syntax" | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax | GitHub supports headings, links, images, relative paths, tables, alerts, and the `<picture>` element. It recommends relative links for repository images and notes that multi-line link text can fail. | Keep links simple and single-line. Do not use remote image badges. No local assets are needed. |
| GitHub Docs, "Quickstart for writing on GitHub" | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github | GitHub's profile README guide uses images, tables, and `<details>` as supported profile README features. | Use one compact project table and a collapsed timeline so the profile scans before the full CV history appears. |
| GitHub Docs, "Creating diagrams" | https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams | Markdown files on GitHub can render Mermaid, GeoJSON, TopoJSON, and ASCII STL. Mermaid is created through fenced code blocks. | Use a small Mermaid flowchart as optional narrative structure, with labels clear enough to remain meaningful if displayed as code. |
| GitHub Flavored Markdown Spec | https://github.github.com/gfm/ | GFM aims to remove ambiguity from Markdown parsing, but GitHub.com still post-processes and sanitizes rendered HTML for security and consistency. | Avoid custom CSS, scripts, raw SVG tricks, iframes, and layout that depends on unsupported HTML. |
| anuraghazra/github-readme-stats | https://github.com/anuraghazra/github-readme-stats | Dynamic GitHub stats cards are common, but the project warns that the public Vercel instance is best-effort and can be unreliable due to rate limits and traffic spikes; private stats require self-hosting or a token. | Do not include stats, streak, trophy, visitor, or language cards. The README should remain complete with no third-party dynamic image service. |
| abhisheknaiidu/awesome-github-profile-readme | https://github.com/abhisheknaiidu/awesome-github-profile-readme | Curated examples are grouped into patterns such as GitHub Actions, game mode, code mode, dynamic realtime, descriptive, minimalistic, GIFs, badges, icons, and retro. | Borrow the idea that profiles can have a concept, but avoid adopting a novelty category that is not grounded in Ricardo's story. |
| Ileriayo/markdown-badges | https://github.com/Ileriayo/markdown-badges | Badge collections are large and useful for branding, but they encourage long rows of logos when used indiscriminately. | Present skills as readable inline code chips instead of a badge wall. |
| tandpfun/skill-icons | https://github.com/tandpfun/skill-icons | Skill icon services make stack rows easy and visually consistent, but they are remote generated images. | Avoid icon dependency. Plain text stack labels are more reliable and accessible. |
| lowlighter/metrics | https://github.com/lowlighter/metrics | Metrics generators can render rich SVG/Markdown/PDF/JSON infographics with many plugins and options. | Do not use generated metrics because the task forbids invented activity and the profile should not imply unavailable GitHub activity. |
| GitSkins, "GitHub Profile README Examples: What Good Developer Profiles Include" | https://www.gitskins.com/blog/github-profile-readme-examples | Recommends a reliable structure: identity, focus, proof, context, and action. Differentiates senior profiles by judgment, systems thinking, and outcomes. | Structure the final README as identity -> current work -> project map -> stack -> selected proof -> personal hook -> contact. |
| Quillly/Devbio, "GitHub Profile README Examples 2026: What the Best Profiles Actually Do" | https://devbio.me/blogs/github-profile-readme-examples-2026 | Critiques repetitive README compositions built from stats widgets, streak counters, badge rows, and generic quotes. | Use fewer components and make every element support the AI/product/data narrative. Ignore unsourced recruiter-stat claims from the article. |
| antfu/antfu profile README | https://raw.githubusercontent.com/antfu/antfu/main/README.md | A very compact profile can work as a hub of important links when the person has strong external project surfaces. | Use a compact centered link row at the top, but add enough context for a visitor who does not already know Ricardo. |
| sindresorhus/sindresorhus profile README | https://raw.githubusercontent.com/sindresorhus/sindresorhus/main/readme.md | A playful, retro, GIF-heavy profile is memorable but highly image-dependent and idiosyncratic. | Add personality through the origin story and operating-loop language rather than animated GIFs. |
| swyxio/swyxio profile README | https://raw.githubusercontent.com/swyxio/swyxio/master/README.md | Strong profile READMEs can make current work and calls to action obvious, but dense generated sections and many images can become noisy. | Keep current work prominent and collapse career details. |

## Design Conclusions

- A strong GitHub profile README should answer, above the fold: who this is, what they build now, why a technical visitor should care, and where to go next.
- For senior/product-oriented engineers, project context and judgment beat raw lists of technologies.
- Creative GitHub-native presentation works best when it makes scanning faster. Tables, code blocks, `<details>`, and Mermaid can be tasteful; badge walls, counters, streaks, and oversized generated cards can hide the story.
- Dynamic third-party image services create reliability, privacy, and accuracy risks. They are especially weak for this task because the PDFs do not support claims about GitHub activity metrics.
- Mobile/narrow rendering favors short paragraphs, two-column or narrower tables, wrapping inline code labels, and collapsible history.
- Accessibility favors real text over image-only text, meaningful link labels, no color-only meaning, and avoiding animation unless it is essential.
- Maintainability favors plain Markdown and a small amount of allowed HTML, with no build step or credentialed service.

## Failure Modes To Avoid

- Pasting the CV into Markdown without a GitHub-specific hierarchy.
- Inventing repository activity, stars, users, client outcomes, or metrics.
- Badge walls that make every tool look equally important.
- Third-party cards that rate-limit, break, track visitors, or imply private activity.
- Generic AI copy such as "passionate developer building the future" without concrete project proof.
- Overly wide tables, ASCII art, or images that overflow on mobile.
- Color-only status indicators or image-only headers with no text fallback.
- Excessive animation that distracts from contact paths and projects.
