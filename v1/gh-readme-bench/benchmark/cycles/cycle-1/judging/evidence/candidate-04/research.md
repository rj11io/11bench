# Research Notes For GitHub Profile README

Access date for all sources: 2026-07-16.

## Goal

Understand what a strong contemporary GitHub profile README should do, what GitHub actually supports, which creative patterns still age well, and which patterns to avoid for reliability, accessibility, privacy, and maintainability.

## Sources And Decisions

| Source | URL | Findings | Decision changed |
| --- | --- | --- | --- |
| GitHub Docs: Managing your profile README | https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme | A profile README is a special public repo named after the username, surfaced at the top of the profile. It is explicitly for telling other people about yourself. | Treat the README as a profile front page, not as project docs and not as a pasted CV. |
| GitHub Docs: About your profile | https://docs.github.com/en/account-and-profile/concepts/personal-profile | The README is only one element of the profile. Visitors also see bio, pinned items, activity, and links. Public profile content is globally visible. | Avoid duplicating everything the profile already shows. Use the README to add narrative, context, and navigation. Keep personal/contact disclosure limited to what is already public in the PDFs. |
| GitHub Docs: About the repository README file | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes | A README is often the first thing visitors see. GitHub supports relative links and images. Large READMEs can be truncated at 500 KiB. | Keep the file compact, link locally to any assets, and avoid overbuilding. |
| GitHub Docs: Basic writing and formatting syntax | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax | Relative links are preferred for repository assets. Images need alt text. `<picture>` is supported. Raw HTML is possible but should stay simple. | Use a local SVG asset with descriptive alt text, but do not depend on complex HTML layout tricks or wide tables. |
| GitHub Blog: 5 tips for making your GitHub profile page accessible | https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/ | Strong READMEs use descriptive links, image alt text, proper heading hierarchy, plain language, and restrained emoji. Decorative pseudo-bullets reduce screen-reader usability. | Use normal Markdown lists, descriptive link labels, minimal emoji, and a clean heading structure. |
| GitHub Docs: Using your GitHub profile to enhance your resume | https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume | Hiring managers scan quickly. A profile should make skills and showcased projects easy to understand in a couple of minutes. | Put the current role, project focus, and next-click links near the top. Relegate deeper history to a collapsible section. |
| awesome-github-profile-readme | https://github.com/abhisheknaiidu/awesome-github-profile-readme | The ecosystem has many style archetypes: minimal, descriptive, badge-heavy, animated, retro, dynamic realtime, and more. Creativity is common, but the list also shows how easily profiles can become gimmicky. | Borrow the idea that profiles can have a visual identity, but avoid the common trap of stacking multiple widgets, GIFs, and badge walls. |
| Josh Bickett profile | https://github.com/joshbickett | A very short profile can work when the hook is clear: one-line identity, one-line company context, one easy contact path, then pinned repos do the rest. | Keep the opening tight and confident. Do not spend the first screen on life story or exhaustive skills. |
| Meysam Hadeli profile | https://github.com/meysamhadeli | A project-forward profile can successfully turn the README into a navigation layer for open-source work. The tradeoff is density if too many links appear at once. | Include a dedicated "current build surface" section, but cap it to a few high-signal destinations. |
| Simon Willison profile | https://github.com/simonw | Frequently updated, text-first profiles can feel alive without relying on flashy visuals because they foreground what the person is building right now. | Frame the README around present-tense work first, then use history only to support credibility. |
| rj11io current GitHub profile | https://github.com/rj11io | Current public profile already presents a concise stack line and pinned open-source repos such as `11ai`, `lsdb`, and `lsdb-react`. | The README should complement the live profile rather than compete with it. Use the README to explain the narrative behind the work and point visitors toward the right repositories/sites. |

## What Strong Profile READMEs Communicate

- A clear identity in the first screen: who this person is, what they build, and why a GitHub visitor should care.
- Present-tense relevance: what they are building now, not just what they did years ago.
- A fast route to proof: pinned repos, a website, a focused project list, or a concrete list of current work areas.
- Enough personality to be memorable, but not so much decoration that scanning becomes work.
- Easy next actions: visit project, read more, get in touch.

## How People Scan Them

- Top-first and link-first: headline, first paragraph, obvious links, then section headings.
- Visitors often decide in seconds whether the profile feels current and credible.
- Dense walls of technology badges make scanning worse because they flatten all priorities.
- Visitors want a short "why this person / why these repos" summary before they inspect code.

## Current Patterns Worth Using Carefully

- A strong hero section with either a short visual or a short code block.
- A "currently building" or "now" section.
- A compact project showcase with one-line positioning for each item.
- Collapsible sections for older history, setup notes, or personal trivia.
- Locally hosted visuals or simple HTML/Markdown enhancements that still leave the README readable if assets fail.

## Patterns To Avoid

- Badge walls that repeat the same information as prose or pinned repos.
- Vanity metrics, especially follower counters, contribution snakes, or third-party stats that can fail or mislead.
- Dynamic cards that become broken images, rate-limited placeholders, or dark-mode mismatches.
- Long autobiographies before any links or project context.
- Generic AI copy that says "passionate," "innovative," and "results-driven" without evidence.
- Tables for core layout. They are rigid on narrow screens and easy to overflow on mobile.
- Color-only emphasis or image-only storytelling.

## GitHub Compatibility Notes

- GitHub Flavored Markdown is the base target; simple raw HTML is acceptable but should be minimal.
- Relative asset links are safer than absolute links for repository-contained images.
- GitHub supports images, links, headings, code fences, details/summary, and simple inline HTML.
- The README should still make sense without the image loading.
- Mobile friendliness matters because wide tables, side-by-side layouts, and dense badge rows collapse poorly.

## Editorial Direction Chosen

- Text-first structure with one local SVG banner for visual identity.
- No external stats, streak cards, activity widgets, or tracking-like counters.
- Opening narrative centered on AI product engineering, dashboards/data explorers, and agent tooling.
- Current personal/open-source projects surfaced early because that is the most profile-relevant material in the PDFs.
- Career history compressed into a credibility arc, with older chapters hidden behind `<details>`.

## Final Design Principles

- One-screen answer to "who is this?"
- One-screen answer to "what is he building now?"
- Enough specificity to feel earned.
- Enough restraint to keep it credible on GitHub in 2026 and still maintainable in plain Markdown.
