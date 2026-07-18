# Research: contemporary GitHub profile READMEs

Access date for all web sources: **2026-07-16**.

## Research questions and method

The goal was not to collect widgets. It was to understand what a profile README needs to communicate in its first screen, what contemporary profiles use to create identity, and what survives GitHub’s renderer, narrow widths, dark/light themes, accessibility tools, and external service failures.

The research combined:

1. GitHub’s current documentation for profile placement and supported formatting.
2. A current curated profile gallery to map the convention space.
3. Critical inspection of real profiles with different editorial strategies.
4. Primary documentation from a popular dynamic-stat service to test reliability assumptions.
5. W3C accessibility guidance for images, reflow, and motion.

No popularity claim is made unless a source directly reports it. Repository star counts were not used as an editorial proxy for quality.

## Source log: findings and changed decisions

### 1. GitHub Docs — “Managing your profile README”

- URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Finding: GitHub renders the root `README.md` of a public repository that matches the username directly on the profile.
- Decision changed: Treat the README as the profile’s opening surface, not as repository documentation. Put identity, current work, projects, and contact paths before career history.

### 2. GitHub Docs — “About your profile”

- URL: https://docs.github.com/en/account-and-profile/concepts/personal-profile
- Findings: GitHub describes the profile as a showcase of work, contributions, and chosen public information. It specifically suggests an about section, proud contributions with context, and community/help guidance. The README is public even in some private-profile configurations.
- Decisions changed: Prioritize contextualised work over a skill inventory. Avoid unnecessary personal data and treat every line as deliberately public.

### 3. GitHub Docs — “Basic writing and formatting syntax”

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Findings: GitHub Flavored Markdown supports heading hierarchy, code blocks, lists, relative links/images, and some HTML. GitHub recommends relative paths for repository assets and supports `<picture>`.
- Decisions changed: Use ordinary headings and lists as the information backbone. Reference the custom SVG with a relative path. Do not build layout around fragile HTML/CSS tricks.

### 4. GitHub Docs — “Quickstart for writing on GitHub”

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github
- Findings: GitHub documents `<details>` for collapsed content and `<picture>` for theme-aware imagery.
- Decisions changed: Keep the main narrative open and scannable. Use `<details>` only for optional career depth; collapsed content should never hide the core identity or contact path.

### 5. GitHub Docs — “Working with non-code files”

- URL: https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files
- Findings: GitHub displays PNG, JPG, GIF, and SVG, but SVGs do not support inline scripting or animation; Firefox rendering can be imperfect. Some embedded HTML is supported and some, such as video embeds, is not.
- Decisions changed: Make the hero a static, script-free SVG. Repeat its semantic message in live Markdown so the profile remains complete if the image does not render. Avoid embedded video and pseudo-interactive SVG controls.

### 6. Abhishek Naidu — “Awesome GitHub Profile README”

- URL: https://github.com/abhisheknaiidu/awesome-github-profile-readme
- Findings: The current collection spans GitHub Actions, game/code modes, dynamic realtime content, minimal profiles, GIFs, badges, icons, and retro treatments. Its tools section includes visitor counters, stats, streaks, typing SVGs, Spotify cards, feeds, jokes, trophies, and more.
- Decisions changed: Contemporary convention permits a wide creative range, but the quantity of available widgets is not evidence that they serve this person’s story. Borrow the idea of a memorable “mode” or visual system, not the gallery’s widget accumulation. The selected mode is a static product-engineering signal path.

### 7. Simon Willison — profile repository `simonw/simonw`

- URL: https://github.com/simonw/simonw
- Findings: The opening sentence says what he is currently working on and immediately links outward. The profile then exposes recent releases, writing, and TILs through automation. The hierarchy is current focus → fresh evidence → deeper channels.
- Decisions changed: Lead with “now” and make each project link explain why it matters. Do not imitate the live feed: RJ’s PDFs do not establish a public publishing cadence, and a generated feed would add maintenance and failure modes.

### 8. Shawn Wang (swyx) — profile repository `swyxio/swyxio`

- URL: https://github.com/swyxio/swyxio
- Findings: A strong current-role paragraph and a dense link rail establish identity quickly, while playful generated “endorsements” create personality. The latter also creates considerable visual and conceptual noise.
- Decisions changed: Keep the confident first-person current-role framing and a compact link rail. Reject joke widgets and generated badge density because RJ already has a stronger personal differentiator in games/robotics and a credible project story.

### 9. Sindre Sorhus — profile repository `sindresorhus/sindresorhus`

- URL: https://github.com/sindresorhus/sindresorhus
- Findings: The profile uses a deliberately retro, image-heavy web aesthetic, very little prose, and two direct current links. It is memorable because the treatment is coherent rather than because any single GIF is informative.
- Decisions changed: Give the README one coherent visual language. Use one local hero and restrained symbols rather than mixing unrelated badge, card, and animation styles.

### 10. Caneco — profile repository `caneco/caneco`

- URL: https://github.com/caneco/caneco
- Findings: A compact “day/night” identity, a few specific activities, daily file types, and a “ping me about” line communicate role, community, skills, and invitation in very little space.
- Decisions changed: Add a crisp “bring me…” call to action and keep the toolbox compact. Specific nouns outperform generic claims such as “passionate developer.”

### 11. GitHub Readme Stats — project README

- URL: https://github.com/anuraghazra/github-readme-stats
- Findings: The project currently warns that it is no longer maintained in favour of a successor. It also warns that its public Vercel instance is best-effort and can be unreliable because of rate limits and traffic spikes, recommending self-hosting or generated cards for reliability.
- Decisions changed: Do not use GitHub stats, language cards, ranks, or external live cards. This avoids a dependency that can fail, a dated maintenance burden, and metrics that do not explain product judgement.

### 12. GitHub Readme Streak Stats — project README

- URL: https://github.com/DenverCoder1/github-readme-streak-stats
- Findings: The project supports external live cards or a GitHub Actions workflow that commits a local SVG; it exposes animation-disable options. Local generation is more reliable but requires scheduled automation and write permissions.
- Decisions changed: Even the more reliable local-generation route adds machinery for a vanity metric. Omit streaks entirely. If dynamic evidence is added later, prefer generated repository-owned artifacts and disable animation.

### 13. W3C WAI — “Images Tutorial”

- URL: https://www.w3.org/WAI/tutorials/images/
- Findings: Informative images need text alternatives conveying essential information; decorative images should have null alt text; images of text should generally be avoided; complex diagrams need equivalent text.
- Decisions changed: The hero receives concise alt text, and its message is repeated as Markdown immediately below. Project and contact links remain text, never icon-only. The image is enhancement, not the only carrier of identity.

### 14. W3C WAI — “Understanding Success Criterion 1.4.10: Reflow”

- URL: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- Findings: Content should remain usable at a viewport equivalent to 320 CSS pixels without unnecessary two-dimensional scrolling; tables and grids are exceptions only where their layout is essential.
- Decisions changed: Avoid multi-column HTML tables for project cards and skills. Use vertical headings and bullets that naturally reflow. Keep the SVG responsive with no fixed HTML width.

### 15. W3C WAI — “Understanding Success Criterion 2.2.2: Pause, Stop, Hide”

- URL: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- Findings: Moving, blinking, or auto-updating content presented alongside other content needs a way to pause, stop, or hide when it persists; short or essential motion has narrower exceptions.
- Decisions changed: No typing animation, marquee, looping GIF, flashing terminal cursor, or animated stats. Static flair is enough.

## How visitors scan a profile

This is an editorial synthesis from the placement described in GitHub’s docs and the inspected examples:

1. **Identity:** Who is this, and what kind of work do they do now?
2. **Relevance:** Is their current focus connected to what I care about?
3. **Evidence:** What can I click, inspect, or ask about?
4. **Depth:** What career pattern makes the current claim credible?
5. **Action:** Where do I go next?

The README therefore uses progressive disclosure:

- First screen: visual signature, one-line hook, identity, and links.
- Next: three current project doors.
- Then: evidence clusters and a compact toolbox.
- Last: selected career trail, origin story, and invitation.

## Contemporary patterns: value and risk

| Pattern | When it helps | Common failure | Decision for this README |
|---|---|---|---|
| Badges | A few statuses or compatibility facts | Badge wall; tiny type; external calls; duplicated skill list | No badges. Use readable text. |
| Stats/rank cards | When public activity itself is the product | Vanity metrics, rate limits, misleading language percentages, downtime | Omit. |
| Repository cards | Fast visual links to stable public repos | External generator dependency; stale descriptions | Use named text links and descriptions instead. |
| Custom SVG | Coherent identity, local ownership, low weight | Text too small on mobile; theme mismatch; unsupported script/animation | One static local SVG with redundant live text. |
| GIF/typing animation | Strongly characterful motion used sparingly | Distraction, accessibility burden, slow load, generic template feel | Omit. |
| Code block | Native developer voice and compact structure | Fake code, horizontal overflow, gimmickry | Use one short “operating system” block with conservative line lengths. |
| Diagram | Explains a genuine system or through-line | Decorative complexity; text illegible on narrow screens | Hero uses a simple signal-path metaphor; the prose carries the meaning. |
| `<details>` | Optional history or FAQ depth | Important content becomes invisible | Only optional career detail is collapsed. |
| HTML layout | Alignment and responsive imagery | Sanitized attributes, desktop-only columns, hard-to-maintain markup | Minimal centered intro only; no side-by-side tables. |
| Live feeds | Fresh proof for active writers/releasers | Token/API/action complexity; stale or broken jobs | Omit until there is a demonstrated public cadence. |

## GitHub compatibility and maintainability decisions

- Use GFM headings, paragraphs, lists, links, code fences, and `<details>`.
- Use a repository-relative SVG path: `./assets/signal-path.svg`.
- No inline CSS, JavaScript, iframe, canvas, video embed, form, or credentialed service.
- No third-party image requests, tracking pixels, visitor counters, or API tokens.
- No fixed-width table or manually spaced pseudo-columns.
- No color-dependent labels; all categories are named in text.
- No invented “currently listening,” activity feed, uptime, contribution, or language data.
- External links are ordinary HTTPS URLs supplied by the PDFs; email uses `mailto:`.
- The asset is static and hand-maintainable. If removed, the README still begins with the full identity and hook.

## Failure-mode checklist applied

- **Badge wall:** avoided.
- **Vanity metrics:** avoided.
- **Broken dynamic services:** no dynamic images or cards.
- **Excessive animation:** no animation.
- **Generic AI copy:** replaced with named project types, technologies, and systems from the source PDFs.
- **Visual noise:** one visual system, four main sections, one optional disclosure.
- **CV pasted into Markdown:** career is compressed into a trail; work is reorganized by present relevance.
- **Mobile overflow:** no wide cards/tables in the README; code lines are short; hero scales to container width.
- **Privacy leakage:** only contact/location details explicitly published in both CVs are used.
- **Maintenance drift:** no counters, “latest” feeds, computed tenure, or hard-coded repository activity.

## Final design brief

The profile should feel like an experienced product engineer’s control surface: calm, precise, and slightly playful. The custom “signal path” graphic connects the career’s recurring inputs and outputs — dense data on one side, usable systems on the other — with RJ as the product-engineering layer in the middle. It supports rather than replaces the content.

The test for every element is: does it help a GitHub visitor understand what RJ builds, why he is credible, or where to go next? If not, it is excluded.
