# README research

Access date for all sources: 2026-07-16.

## Working thesis

A GitHub profile README is a front door, not a second resume. A visitor is likely to scan the first screen for three answers: who this is, what they build, and where to go next. The strongest examples make that answer visible in a short opening, then use projects, links, and a small amount of personality as proof. A longer career history can exist, but it should be compressed and optional.

I treated live profiles as qualitative examples rather than evidence of popularity. The goal was to learn recurring information patterns and inspect their tradeoffs, not to copy a template or make unsupported claims about what is trending.

## Sources and findings

### GitHub documentation

1. **Managing your profile README**  
   URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme  
   Finding: GitHub displays a profile README when a public repository matches the username, contains a non-empty `README.md`, and is visible to the account.  
   Decision changed: The artifact is written as a self-contained profile README and does not assume a separate portfolio page will be read first.

2. **About the repository README file**  
   URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes  
   Finding: GitHub describes a README as a place to explain purpose, usefulness, getting started, help, and maintainership. It also says rendered README content beyond 500 KiB is truncated and recommends relative links for repository-local content.  
   Decision changed: The profile leads with purpose and destinations, stays far below the size limit, and uses a relative path for its only local image.

3. **Basic writing and formatting syntax**  
   URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax  
   Finding: GitHub Flavored Markdown supports headings, links, lists, fenced code, images, and the `<picture>` element. GitHub specifically recommends relative links for images stored in the repository.  
   Decision changed: The README uses conventional headings and links, one short code block for a toolchain sketch, and a local SVG with an alt description instead of remote widget images.

4. **Quickstart for writing on GitHub**  
   URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github  
   Finding: GitHub demonstrates responsive theme-aware images with `<picture>` and collapsible sections with `<details>`; it also calls out alt text and tables as useful building blocks.  
   Decision changed: The long career trail is placed in a collapsed section, while core identity and projects remain visible. I did not use a theme-dependent hero because the profile can communicate clearly without a dark/light asset pair.

5. **5 tips for making your GitHub profile page accessible**  
   URL: https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/  
   Finding: GitHub recommends descriptive link text, meaningful alt text, sequential headings, plain language, and restraint with emoji because screen readers announce emoji names. It also notes that good structure helps visual scanning.  
   Decision changed: Links say what they open, the SVG has meaningful alt text and an internal description, headings do not skip levels, and the README uses no emoji as layout scaffolding.

6. **Managing accessibility settings**  
   URL: https://docs.github.com/en/account-and-profile/how-tos/account-settings/managing-accessibility-settings  
   Finding: GitHub exposes a reduced-motion preference that can control animated GIFs.  
   Decision changed: No animated GIF, typing effect, or auto-refreshing image is used. The profile's visual interest comes from a static diagram that has a complete text equivalent.

7. **Working with non-code files**  
   URL: https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files  
   Finding: GitHub can display common image formats including SVG, while noting that SVG rendering has browser-specific caveats.  
   Decision changed: The SVG is optional decoration, not the carrier of any essential fact; the same story is stated in text immediately around it.

8. **Adding a workflow status badge**  
   URL: https://docs.github.com/en/actions/how-tos/monitor-workflows/add-a-status-badge  
   Finding: A status badge is a useful way to expose the state of a specific GitHub Actions workflow when that workflow exists.  
   Decision changed: No badge was added because this profile task provides no workflow to report. This avoids a decorative or misleading status signal.

9. **GitHub Community discussion: GitHub Flavored Markdown doesn't render CSS styles inside a HTML block**  
   URL: https://github.com/orgs/community/discussions/22728  
   Finding: GitHub sanitizes HTML in Markdown and removes unsafe constructs such as scripts, inline styles, and class/id attributes. This is a community discussion rather than normative documentation, but it is useful practical evidence about the rendering boundary.  
   Decision changed: No CSS-dependent layout, JavaScript, iframe, or interactive widget is used. Layout relies on Markdown, a small amount of supported HTML, and a responsive SVG viewBox.

### Live profile examples

10. **simonw profile and `simonw/README.md`**  
    URL: https://github.com/simonw  
    Finding: The visible profile combines a one-sentence current focus with links, then a compact stream of recent releases, blog posts, and TIL entries before pinned repositories. It reads like a maintained work index rather than a static biography.  
    Decision changed: The README puts current AI product work and three live projects ahead of the career history. I used a stable project list instead of a dynamic feed because no feed source was supplied and a broken feed would weaken the profile.

11. **Yanina Bellini Saibene profile and `yabellini/README.md`**  
    URL: https://github.com/yabellini  
    Finding: The README is an explicit “where to find me” map: current roles, community work, writing/talks, and pinned projects are all named in plain language.  
    Decision changed: Contact paths and project destinations are treated as first-class content, not footer afterthoughts.

12. **Leticia `levxyca` profile and `levxyca/README.md`**  
    URL: https://github.com/levxyca  
    Finding: The profile has a strong personal voice, a recognizable opening, concise identity bullets, social destinations, and a stream of recent content. The personality is specific to the person rather than generated from generic tech slogans.  
    Decision changed: The opening uses RJ's own game-modding and robotics history as a memorable origin, but keeps the copy concise and avoids generic AI-superlative language.

13. **Mario Souto `omariosouto` profile and `omariosouto/README.md`**  
    URL: https://github.com/omariosouto  
    Finding: The profile pairs a personal statement with a current role, a clear external channel, recent videos, and pinned projects. It also includes a GitHub stats image. The useful pattern is the content cadence and destination clarity; the stats image is a dependency and is not necessary for comprehension.  
    Decision changed: The README uses a narrative signal and direct project links, not a stats-card wall or vanity metrics.

14. **GitHub organization profile README**  
    URL: https://github.com/github/.github/blob/main/profile/README.md  
    Finding: GitHub's own profile README uses a clear opening, one thematic image, short sections, links to maintained projects, and a contribution-oriented call to action. It also demonstrates that a visual can serve a story when the surrounding text remains useful.  
    Decision changed: The README gets one thematic static diagram, not a collage of banners, badges, or animations.

## Design decisions for this profile

### Scan order

1. Name and role.
2. One-sentence promise and direct contact.
3. A visual through-line: game systems -> data products -> agent systems.
4. Current work and the three public projects named in the PDFs.
5. Tooling grouped by job rather than a badge wall.
6. Selected career proof.
7. Personal signals and an explicit invitation to reach out.

### Creative patterns used

- A local, static SVG is the only visual asset. It is a narrative diagram, not a dashboard or metric display.
- A short fenced text block shows the build surface as a memorable code-shaped artifact.
- `<details>` keeps earlier history available without making the first screen feel like a CV.
- Links are descriptive and point to the exact destinations available in the PDFs: `rj11.io`, `ai.rj11.io`, `bench.rj11.io`, GitHub, LinkedIn, and email.

### Patterns deliberately avoided

- Badge walls: they turn a skill list into noise and are hard to keep current.
- GitHub stats, streaks, contribution graphs, and dynamic cards: no verified metric is needed to understand RJ's work, and third-party image services create load and maintenance risk.
- Tracking pixels or visitor counters: they add privacy and reliability costs without helping a visitor decide whether to collaborate.
- Animated banners and typing effects: they increase motion and load, can be distracting, and are not needed for the story.
- Color-only meaning: every diagram label is textual and the README does not rely on color to distinguish sections.
- Invented outcomes, client names, repository URLs, follower counts, or current activity: the source PDFs do not provide them, so they are not added.

### Narrow rendering and maintainability

The layout avoids wide tables, multi-column HTML, fixed-width images, and long unbroken link lines. The SVG scales through its `viewBox`; the same narrative appears as prose; and the README has no credentials, build step, external image service, or generated feed to maintain.

## Review checklist

- [x] Strong identity and opening hook.
- [x] Current AI/product/open-source work appears before older experience.
- [x] Projects and contact paths are easy to scan.
- [x] Local asset path is relative and resolves under `assets/`.
- [x] Essential information survives if the SVG fails to load.
- [x] No stats, badges, tracking pixels, credentials, or invented activity.
- [x] Headings and link labels are descriptive and sequential.
- [x] Markdown/HTML choices are limited to GitHub-compatible constructs.
