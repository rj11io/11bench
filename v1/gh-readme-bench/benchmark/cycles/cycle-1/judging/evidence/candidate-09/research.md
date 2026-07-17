# Research notes: a profile README that works like a good landing page

**Research date:** 2026-07-16.  
**Scope:** GitHub profile READMEs, with particular attention to an AI/product engineer whose public work is still developing.

## What a visitor needs to learn quickly

GitHub describes the profile README as a customizable section at the top of a profile, and suggests an about section, contributions with context, and guidance for getting help. That is a useful order of operations: a visitor should be able to answer **who is this person, what do they make, and where should I click next?** before they encounter a career history or a technology list.

- **Source:** [About your profile - GitHub Docs](https://docs.github.com/en/account-and-profile/concepts/personal-profile) (accessed 2026-07-16).
  - **Finding:** A profile README is explicitly a top-of-profile surface; GitHub calls out about, proud contributions/context, and community help as useful content. It can contain Markdown, emoji, images, and GIFs.
  - **Decision:** Lead with a one-sentence identity and a plain-language focus; put three real destinations directly below it; make the public work, not an exhaustive CV, the first substantial section.

- **Source:** [Managing your profile README - GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) (accessed 2026-07-16).
  - **Finding:** The README only displays when the public repository name matches the username and a root `README.md` contains content.
  - **Decision:** The artifact is self-contained in `README.md`, has no build step, and avoids any critical content that depends on a generated asset.

## Current patterns, inspected critically

I inspected the public profiles below as examples, rather than treating them as a popularity survey.

- **Source:** [rj11io on GitHub](https://github.com/rj11io) (accessed 2026-07-16).
  - **Finding:** The current profile already identifies AI SDK, TypeScript, Next.js, React, Tailwind CSS, and shadcn/ui, and pins `11ai`, `lsdb`, and `lsdb-react`. The pinned `11ai` description is “AI coding skills and workflows.”
  - **Decision:** Link the modern GitHub profile and centre the README’s public-work language on AI skills/workflows. Do **not** copy current follower, star, or repository counts into the README: they are transient and would quickly become misleading.

- **Source:** [Anurag Hazra’s profile README](https://github.com/anuraghazra) (accessed 2026-07-16).
  - **Finding:** It scans because it starts with a clear self-description, then offers a short list of concrete proof, a compact tool row, and repository links. It also uses image-based stats.
  - **Decision:** Borrow the hierarchy (identity -> proof -> projects -> contact), not the visual formula. This README uses text-native proof and real links instead of external statistic cards; cards are decorative here and can fail or distract from a smaller public body of work.

- **Source:** [Personal README topic - GitHub](https://github.com/topics/personal-readme) (accessed 2026-07-16).
  - **Finding:** Public examples span portfolios, auto-updated profiles, tool badges, and AI/automation labels. The topic page is an index, not evidence that any particular treatment is broadly effective.
  - **Decision:** Use a small, original “build loop” line as personality and navigation, while avoiding a claim that a particular animation, badge provider, or layout is popular.

## GitHub-native implementation choices

- **Source:** [Basic writing and formatting syntax - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/basic-writing-and-formatting-syntax) (accessed 2026-07-16).
  - **Finding:** GitHub Flavored Markdown supports headings, lists, links, emphasis, images, code, and allowed HTML. Basic Markdown is portable across GitHub surfaces.
  - **Decision:** Use standard headings, short paragraphs, lists, links, inline code, and one fenced `text` block. There is no inline CSS, script, iframe, or layout-critical HTML.

- **Source:** [Creating and highlighting code blocks - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks) (accessed 2026-07-16).
  - **Finding:** Fenced code blocks are supported and can be highlighted with a language identifier.
  - **Decision:** Use one language-neutral `text` block for a readable work-flow diagram. It is content, not simulated terminal output, and remains legible in monochrome or without syntax highlighting.

- **Source:** [Organizing information with tables - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables) (accessed 2026-07-16).
  - **Finding:** GitHub supports Markdown tables, but they are horizontal structures.
  - **Decision:** Avoid tables in the profile: career tables and badge grids are awkward at narrow widths. Bullets make each project and experience item independently scannable on mobile.

- **Source:** [GitHub Sanitization Filter](https://github.com/github/markup/blob/master/lib/github/markup.rb) (accessed 2026-07-16) and [display HTML badge on GitHub README - Stack Overflow](https://stackoverflow.com/questions/69594473/display-html-badge-on-github-readme) (accessed 2026-07-16).
  - **Finding:** GitHub sanitizes rendered markup; JavaScript and arbitrary CSS are not a reliable README design surface. The second source is community explanation, used only as a practical corroboration, not as GitHub policy.
  - **Decision:** Do not use interactive controls, inline scripts, custom CSS, iframes, or CSS-dependent HTML. The “interactive-looking” element is a static, semantic build-loop diagram rather than fake UI.

## Reliability, privacy, accessibility, and maintenance

1. **Static-first:** No third-party badge, visitor counter, streak card, language card, live GitHub-stat API, or tracking image is embedded. If an external site is slow, the README remains complete.
2. **Accessible text first:** The opening, project names, project explanations, work history, and contact paths are real text. Meaning does not rely on colour, motion, icons, or an image alt label. The diagram is duplicated in plain words nearby.
3. **Narrow-width first:** No tables, long unbreakable badge rows, aligned image columns, or HTML widths. Links are placed as ordinary text and bullets are short.
4. **Privacy:** No email address, visitor analytics, tracking pixels, or inferred location details are repeated. LinkedIn, website, and GitHub are the supplied public contact paths.
5. **Maintenance:** “Now” is tied to the CV’s dated role rather than a live feed. Project descriptions are short enough to update manually. No workflow or hosting dependency is introduced.

## Failure modes intentionally avoided

- **Badge wall:** tool labels without context create visual noise and tell less than a selected capability sentence.
- **Vanity metrics:** followers, stars, commits, streaks, and visitor counts are mutable and can become stale or invite comparison rather than evaluation of the work.
- **Fragile dynamic services:** externally generated stats/typing cards can rate-limit, disappear, or render inconsistently.
- **Excessive animation:** motion competes with the identity and projects, adds a dependency, and can be distracting.
- **Generic AI language:** claims such as “leveraging AI to innovate” are replaced with PDF-supported objects of work: extraction, agent harnesses, skills, automations, data explorers, and product interfaces.
- **Resume dump:** early roles and exhaustive stacks are retained only as a compact credibility trail, with the detailed CV linked rather than duplicated.

## Final design rationale

The final README has a deliberately calm “product engineer field note” feel: a compact identity, a static delivery loop, current public work, selected proof, a focused working set, and a clear invitation. Its flair is structural rather than widget-driven. Every essential message survives plain-text rendering.
