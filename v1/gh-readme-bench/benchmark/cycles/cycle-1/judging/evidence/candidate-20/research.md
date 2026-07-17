# Research

Access date for web sources: 2026-07-16. The final profile uses this research for structure and rendering decisions only; biographical claims come from the two PDFs in `ref/`.

## Sources And Findings

### GitHub Docs: "About your profile"

URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile

Findings:

- GitHub describes the profile as a public showcase of work, contributions, and chosen personal information.
- GitHub explicitly lists profile README, personal info, contribution activity, pinned items, status, achievements, and badges as profile elements.
- Suggested README content includes an about section, contributions the person is proud of, and guidance for how visitors can get help or make contact.
- Privacy matters because public profile details are visible to all GitHub users.

Decisions changed:

- Treat the README as the top-of-profile orientation layer, not a complete CV.
- Put identity, current focus, selected work, and contact paths near the top.
- Avoid over-sharing personal history beyond the story that supports technical identity.

### GitHub Docs: "Managing your profile README"

URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

Findings:

- A profile README appears when the user has a public repository matching their username and a root `README.md`.
- GitHub's template is only a starting point; the README can be customized as public profile content.

Decisions changed:

- Make the final file a standalone root-style `README.md` suitable for `rj11io/rj11io`.
- Do not include benchmark process notes or source citations inside the final profile.

### GitHub Docs: "Basic writing and formatting syntax"

URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Findings:

- GitHub Markdown supports headings, lists, links, images, relative image paths, HTML line breaks, custom anchors, and the `<picture>` element.
- GitHub recommends relative links for repository images because GitHub transforms them correctly across branches and clones.
- Link text should stay on one line.
- Images require alt text.

Decisions changed:

- Use relative asset paths for the local SVG header.
- Keep section headings conventional so GitHub's outline remains useful.
- Use regular Markdown tables/lists instead of complex HTML layouts where possible.

### GitHub Docs: "Creating diagrams"

URL: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams

Findings:

- GitHub renders Mermaid, GeoJSON, TopoJSON, and ASCII STL diagrams inside Markdown files.
- Mermaid diagrams are authored as fenced code blocks and rendered by GitHub.

Decisions changed:

- Considered a Mermaid flow for the person's career path, but rejected it for the final README because a code block fallback would be visually noisy and a custom static SVG better matches a profile header.

### GitHub Docs: "Working with non-code files"

URL: https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files

Findings:

- GitHub can show some embedded HTML in Markdown previews, but some embedded HTML cannot render.
- GitHub notes that SVGs do not currently support inline scripting or animation in this context.
- Rendered and source views should both be checked when embedded HTML is used.

Decisions changed:

- Use a simple static SVG with no script and no animation.
- Avoid relying on advanced embedded HTML for layout.

### GitHub Blog: "Include diagrams in your Markdown files with Mermaid"

URL: https://github.blog/developer-skills/github/include-diagrams-markdown-files-mermaid/

Findings:

- GitHub added Mermaid support so maintainers can keep diagrams as text in Markdown.
- The blog explains that Mermaid rendering is progressive: non-JavaScript contexts still expose the original Markdown.

Decisions changed:

- Confirmed that Mermaid has a reasonable fallback, but still kept the final README simpler because the profile should read cleanly even outside GitHub's renderer.

### GitHub repository: `anuraghazra/github-readme-stats`

URL: https://github.com/anuraghazra/github-readme-stats

Findings:

- The project provides dynamic GitHub stats cards through a hosted Vercel service.
- Its README warns that public cards show public-only statistics by default.
- It discusses GitHub API limits, self-hosting, tokens, cache timing, whitelists, and privacy-related exclusions for private repositories.

Decisions changed:

- Do not use dynamic stats cards. They would add a dependency, can fail or rate-limit, and could imply performance metrics not provided by the PDFs.

### GitHub repository: `abhisheknaiidu/awesome-github-profile-readme`

URL: https://github.com/abhisheknaiidu/awesome-github-profile-readme

Findings:

- This curated list groups examples into patterns such as GitHub Actions, dynamic realtime, code mode, typing mode, badges, icons, retro, GIFs, and minimalistic profiles.
- It shows that creative profiles often become pattern libraries, making overused effects feel generic.

Decisions changed:

- Use only one original visual motif, not a mix of typing SVGs, GIFs, trophy cards, badge walls, and stats cards.
- Borrow the idea of "code mode" presentation because it suits a developer profile and degrades well as plain text.

### Real example inspected: `sindresorhus/sindresorhus`

URL: https://github.com/sindresorhus/sindresorhus/blob/main/readme.md

Findings:

- The README is short and highly personal.
- It uses playful images and concise links rather than a full resume.
- The surrounding GitHub profile and pinned repositories carry much of the proof.

Decisions changed:

- Keep the final README compact and selective.
- Let selected projects and the user's pinned repositories do some of the proof work instead of repeating every employer.

### Real example inspected: `anuraghazra/anuraghazra`

URL: https://github.com/anuraghazra/anuraghazra/blob/master/README.md

Findings:

- The profile opens with a clear self-description, then an "About me" list, technology icons, dynamic stats, and top repository cards.
- The strongest part is the clear identity and direct proof of projects; the riskiest part for this task is dependency on external images/stats.

Decisions changed:

- Use the identity -> proof -> stack -> contact order.
- Replace third-party cards with static project links and text.

### Real example inspected: `swyxio/swyxio`

URL: https://github.com/swyxio/swyxio/blob/master/README.md

Findings:

- The profile has a strong personal voice, current focus, and direct calls to relevant audiences.
- It also demonstrates a failure mode: many images and novelty sections make narrow scanning harder and increase external dependencies.

Decisions changed:

- Use voice and specificity, but keep the visual system restrained.
- Add calls to action for collaborators without turning the page into a link farm.

### GitHub profile inspected: `rj11io`

URL: https://github.com/rj11io

Findings:

- The public GitHub profile currently shows the short bio "AI SDK - Typescript - Next.js - React - Tailwind CSS - Shadcn/UI" and links to `rj11.io`, LinkedIn, X, and Substack.
- Pinned public repositories include `11ai`, `lsdb`, and `lsdb-react` at the time of access.

Decisions changed:

- The final README keeps the stack aligned with the current GitHub bio and PDF skills.
- I did not use follower counts, stars, or extra repository claims from the live profile because the task asks for material profile claims to be supported by the PDFs unless clearly editorial.

## Current Conventions Worth Using

- Strong opening: name, role, and current focus in the first screen.
- Scannable proof: a small set of selected projects or domains rather than a chronological CV dump.
- Personal signal: one memorable origin story, operating principle, or taste marker.
- Lightweight stack: grouped technologies rather than a wall of logo badges.
- Contact paths: portfolio, GitHub, LinkedIn, email, and relevant project links.
- GitHub-native rendering: Markdown sections, links, small tables, local images, and text that survives image failure.

## Patterns To Avoid

- Badge walls that list every technology ever touched.
- Dynamic widgets for stats, streaks, trophies, profile views, Spotify, WakaTime, or generated activity unless there is a clear reason and a maintained fallback.
- Unverified metrics or popularity claims.
- Generic AI copy like "passionate about innovation" without concrete work.
- Excessive animation or GIFs that distract, load slowly, or harm accessibility.
- Layouts that depend on fixed-width HTML tables and overflow on mobile.
- Color-only meaning in diagrams or labels.
- Images without alt text, or hero graphics that contain all meaningful content with no text fallback.

## Final Design Decisions

- Use one local, static SVG hero: it adds craft and narrative without third-party dependencies.
- Follow with a plain-text "operating mode" code block because it is GitHub-native and readable everywhere.
- Present three project tracks: `11io`, `11ai`, and `11bench`, all from the PDFs.
- Use compact grouped stack sections with `<code>` tags, not external badges.
- Keep career history as a credibility strip by domain and role, not a full timeline.
- Close with contact links from the PDFs.
