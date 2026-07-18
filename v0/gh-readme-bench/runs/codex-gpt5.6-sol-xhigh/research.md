# Research for Ricardo Jorge's GitHub profile README

Research date: 2026-07-16

## Scope and method

I researched four questions before designing the profile:

1. What must a profile README communicate immediately?
2. Which contemporary profile patterns are useful, and which are decoration without information?
3. What does GitHub reliably render?
4. How can the result remain accessible, mobile-friendly, private, and maintainable?

GitHub documentation is the authority for platform behavior. Public profile
repositories are examples, not templates: I inspected them for editorial
choices and failure modes rather than copying their wording or layout.

No claim about a pattern's popularity is based on star counts or anecdote. The
curated profile catalog below demonstrates that a pattern exists across named
categories; the individual profiles demonstrate concrete executions.

## Platform and information-design sources

### Managing your profile README - GitHub Docs

- URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Accessed: 2026-07-16
- Finding: GitHub displays a profile README when a public repository matches
  the username and contains a non-empty `README.md` at its root.
- Finding: GitHub describes the purpose simply: tell other people about
  yourself.
- Decision changed: Treat the README as the profile's front page, not as
  repository documentation. Open with identity and current work rather than
  setup instructions or a long biography.

### About the repository README file - GitHub Docs

- URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- Accessed: 2026-07-16
- Finding: A README is often the first item a repository visitor sees.
- Finding: GitHub generates an outline from headings, transforms relative
  links and image paths, and truncates content beyond 500 KiB.
- Decision changed: Use a short, meaningful heading hierarchy and relative
  paths for local artwork. Keep the file far below the truncation limit.

### Basic writing and formatting syntax - GitHub Docs

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Accessed: 2026-07-16
- Finding: GitHub recommends relative paths for repository-hosted images and
  defines alt text as a short textual equivalent of an image.
- Finding: GitHub supports the HTML `<picture>` element.
- Decision changed: Store the only visual asset in this repository, use a
  relative path, and give it meaningful alt text. Do not depend on a remote
  image host.

### Quickstart for writing on GitHub - GitHub Docs

- URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github
- Accessed: 2026-07-16
- Finding: GitHub documents `<picture>` plus
  `prefers-color-scheme` as the supported way to switch profile artwork for
  light and dark themes, with a fallback `<img>`.
- Decision changed: Create paired local light/dark SVGs and keep the light
  version as the fallback.

### GitHub Flavored Markdown Spec

- URL: https://github.github.com/gfm/
- Accessed: 2026-07-16
- Finding: GFM supports raw HTML syntax but GitHub performs additional
  sanitization after Markdown conversion.
- Finding: GFM's tag filter disallows tags including `style`, `iframe`, and
  `script`.
- Finding: HTML blocks and Markdown have non-obvious blank-line interactions.
- Decision changed: Use HTML only for the documented `<picture>` wrapper.
  Avoid layout tables, inline CSS, scripts, iframes, and HTML-heavy card
  structures. Keep the rest ordinary Markdown.

### 5 tips for making your GitHub profile page accessible - The GitHub Blog

- URL: https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/
- Accessed: 2026-07-16
- Finding: Descriptive links, meaningful alt text, sequential headings, plain
  language, real list markup, and restrained emoji improve access and
  scanning.
- Finding: Proper headings also help visual readers scan a large block of
  content.
- Decision changed: Use one H1 followed by H2 sections, descriptive link text,
  no decorative emoji bullets, and an alt description that includes the
  banner's narrative.

### About anonymized URLs - GitHub Docs

- URL: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls
- Accessed: 2026-07-16
- Finding: GitHub uses Camo to proxy images and hide browser details, but
  externally served images can still fail because of content type, caching, or
  availability.
- Decision changed: Prefer repository-hosted assets. Avoid visitor counters,
  tracking pixels, and third-party image endpoints entirely.

### Using your GitHub profile to enhance your resume - GitHub Docs

- URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume
- Accessed: 2026-07-16
- Finding: GitHub suggests a concise introduction, technical skills, interests,
  and relevant links, while emphasizing that the profile README allows more
  creativity than a short bio.
- Decision changed: Keep career history selective. Let projects, current focus,
  and a personal origin story do work that a CV chronology cannot.

## Real profiles and pattern sources

### Anthony Fu's profile README

- URL: https://github.com/antfu/antfu
- Raw README: https://raw.githubusercontent.com/antfu/antfu/main/README.md
- Accessed: 2026-07-16
- Observation: The README is essentially one compact row of descriptive
  destinations: personal site, blog, projects, talks, podcasts, community, and
  sponsorship.
- Useful lesson: Extreme brevity can work when the surrounding GitHub profile
  and linked body of work already carry identity.
- Limitation for this task: Ricardo's story needs more orientation because his
  current AI work, data-product specialty, and earlier leadership would not be
  obvious from a link row alone.
- Decision changed: Put high-value links near the opening, but follow them with
  enough narrative evidence to make the profile self-contained.

### Sebastian Raschka's profile README

- URL: https://github.com/rasbt
- Raw README: https://raw.githubusercontent.com/rasbt/rasbt/main/README.md
- Accessed: 2026-07-16
- Observation: A short domain statement names the AI specialty, the kind of
  work, and the main output modes, followed by a small link set.
- Useful lesson: Specific nouns such as LLMs, research, practical tools, books,
  and open source establish credibility faster than a generic enthusiasm
  paragraph.
- Decision changed: Ricardo's opening names AI products, data explorers,
  dashboards, agent harnesses, skills, and automations rather than using broad
  "passionate technologist" language.

### Simon Willison's profile README

- URL: https://github.com/simonw/simonw
- Raw README: https://raw.githubusercontent.com/simonw/simonw/main/README.md
- Accessed: 2026-07-16
- Observation: It begins with current projects and useful destinations, then
  shows recent releases, writing, and TIL entries as committed text.
- Useful lesson: "What I am doing now" is more useful at profile depth than a
  full employment chronology. Text remains understandable even if ancillary
  media does not load.
- Decision changed: Lead Ricardo's body with `11ai`, `11bench`, and current AI
  product work. Move the career trail below the working pattern.

### Sindre Sorhus's profile README

- URL: https://github.com/sindresorhus/sindresorhus
- Accessed: 2026-07-16
- Observation: The profile embraces a deliberately image-heavy retro-web
  identity with GIFs, novelty badges, and a visitor counter aesthetic.
- Useful lesson: A coherent visual concept can be memorable when it genuinely
  expresses the person's voice.
- Risk exposed: Image-heavy identity has weak textual fallback, introduces
  motion, and can make basic navigation compete with decoration.
- Decision changed: Use one static visual concept tied to Ricardo's story, then
  let semantic text carry every material fact.

### Awesome GitHub Profile README

- URL: https://github.com/abhisheknaiidu/awesome-github-profile-readme
- Accessed: 2026-07-16
- Observation: The catalog explicitly groups profiles into GitHub Actions,
  game, code, dynamic/realtime, descriptive, minimal, typing, GIF, image,
  badge, icon, and retro patterns.
- Observation: Its tool list includes visitor counters, dynamic stats,
  activity feeds, trophies, typing SVGs, music cards, and profile generators.
- Useful lesson: The contemporary design vocabulary is broad; animation,
  custom SVGs, code-shaped bios, generated sections, and badge systems are all
  established options.
- Decision changed: Borrow the idea of a code/system visual language, but not a
  generator-made stack wall. The visual must explain Ricardo's progression,
  not merely demonstrate that SVG exists.

### GitHub Readme Stats and public-instance rate-limit issue

- Project URL: https://github.com/anuraghazra/github-readme-stats
- Failure example: https://github.com/anuraghazra/github-readme-stats/issues/4431
- Accessed: 2026-07-16
- Finding: The project's own documentation recommends self-hosting to avoid
  public rate limits and requires a personal access token for that setup.
- Finding: A 2025 issue documents the public instance returning a GitHub API
  rate-limit error in an embedded card.
- Decision changed: Do not use a dynamic stats card. The evaluator must not
  need credentials, and current activity is already visible in GitHub's native
  profile UI.

## Synthesis: how visitors are likely to scan this profile

The following is an editorial inference from GitHub's "first item" guidance,
its heading/outline behavior, and the accessibility guidance on headings and
plain language:

1. **Identity and relevance:** Who is this, what do they build, and why should I
   keep reading?
2. **Current work:** What is alive now, and where can I inspect it?
3. **Credibility pattern:** What has this person repeatedly been trusted to do?
4. **Selected evidence:** Which employers and products substantiate that
   pattern?
5. **Tools:** Does the technical vocabulary match the work?
6. **Memory and action:** What personal detail will I remember, and how do I
   contact them?

The final README follows that order. It does not assume a visitor will read
every line.

## Technical and editorial design decisions

### Badges

- Good use: a small status or standard indicator that answers a real question.
- Bad use here: dozens of technology logos repeat the skills section, create
  visual noise, and age whenever the stack changes.
- Decision: no badge wall. Skills remain searchable, selectable text.

### Stats and cards

- Good use: a card can summarize information unavailable in the native
  interface.
- Bad use here: contribution counts, streaks, trophies, and top-language cards
  are vanity-prone, volatile, and dependent on third-party uptime and API
  quotas.
- Decision: no stats cards or contribution widgets.

### Diagrams and custom SVG

- Good use: one diagram can make a multi-stage story faster to understand.
- Risk: text inside an oversized SVG becomes tiny on mobile; artwork can also
  disappear.
- Decision: use a shallow, responsive banner with large labels, light/dark
  variants, meaningful alt text, and a complete textual opening immediately
  below it.

### Animation

- Good use: motion can demonstrate an interaction or express a strong personal
  aesthetic.
- Risk: distraction, reduced-motion concerns, file weight, and competition
  with the profile's actual work.
- Decision: no GIF or animated SVG.

### HTML

- Good use: GitHub's documented `<picture>` pattern for theme-specific images.
- Risk: sanitization, confusing Markdown/HTML parsing, and fragile layout
  tricks.
- Decision: use only `<picture>`, `<source>`, and `<img>` in the README.

### Mobile and narrow rendering

- Failure modes: wide tables, multi-column HTML, long unbroken code lines,
  fixed-width images, and dense link/button rows.
- Decision: one content column, ordinary lists, short paragraphs, wrapping
  text links, a `width="100%"` image, and no table-based layout.

### Privacy and reliability

- Failure modes: visitor counters, tracking images, credentialed widgets,
  remote badge services, and dynamic content that silently becomes an error
  card.
- Decision: all visuals are local; all material content is text; all external
  requests are user-initiated links.

### Maintainability

- Failure modes: generated blocks with unclear ownership, dozens of logos, live
  metrics, and claims tied to "today" that quickly become false.
- Decision: only the current-project dates and current role need periodic
  review. The narrative is organized around durable working patterns.

## Link verification

On 2026-07-16, read-only HTTP requests confirmed:

- `https://rj11.io` redirects to `https://www.rj11.io/` and returns HTTP 200.
- `https://ai.rj11.io` returns HTTP 200.
- `https://bench.rj11.io` returns HTTP 200.
- `https://cv.rj11.io/v1/max` returns HTTP 200.
- `https://github.com/rj11io` and
  `https://github.com/ricardojrmcom` resolve as public GitHub profiles.

The current GitHub profile was used only to verify the URL. Its live metrics,
pinned repositories, and other volatile metadata were not used as
biographical evidence.

## Final local QA

- Both SVG files passed XML validation with `xmllint`.
- The README was rendered locally as GFM-style HTML and inspected in headless
  Chrome at 1200 px and at a forced 390 px content width.
- The 1200 px preview had a readable theme-aware banner, single-column flow,
  and clear section hierarchy.
- The 390 px dark-mode preview had no horizontal overflow, clipped content, or
  unbroken long lines. The banner scaled without becoming essential to
  understanding the opening.
- The light SVG was also rendered directly at its native 800 x 280 view box
  and inspected for contrast, alignment, and clipping.
- All local image paths resolve from the README. The README contains no remote
  images, scripts, iframes, forms, tracking pixels, or dynamic cards.
