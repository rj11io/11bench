# Research notes — GitHub profile README

Research completed 2026-07-16. Sources are recorded so the design choices can be checked independently. This is research for a profile README, not evidence for biographical claims; those claims live in `content.md`.

## What a profile README has to do

| Source | Accessed | Finding | Decision it changed |
| --- | --- | --- | --- |
| [Managing your profile README — GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) | 2026-07-16 | A README appears on a profile when it is in the root of a public repository named exactly after the account. GitHub frames it as a place to tell people about oneself. | Treat the first screen as the profile's introduction: name, precise role, focus, and one clear route into the work. |
| [About repository READMEs — GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) | 2026-07-16 | README visitors need to understand what something is, why it is useful, how to get started, where to get help, and who maintains it. GitHub also truncates rendered README content beyond 500 KiB. | Borrow the scanning logic—identity, useful proof, context, next action—rather than reproduce a CV. Keep it compact and plain-text meaningful. |
| [5 tips for making your GitHub profile page accessible — GitHub Blog](https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/) | 2026-07-16 | Descriptive links, a proper heading hierarchy, plain language, considered emoji, and useful alt text improve access and scanning. | Use one `#`, then `##`; label destination links explicitly; avoid emoji-only labels; describe the one visual in text and alt text. |
| [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) | 2026-07-16 | GFM supports tables, task lists, strikethrough, autolinks, code fences, and raw HTML, but GitHub applies post-processing and sanitization. The spec filters tags such as `script`, `style`, and `iframe`. | Use ordinary GFM, a fenced code block, links, and a simple image. Do not rely on JavaScript, iframes, custom CSS in the README, or fragile HTML layout. |
| [standard-readme](https://github.com/RichardLitt/standard-readme) | 2026-07-16 | Its guidance calls badges visual cues and explicitly warns that too many make a README cluttered and reduce readability. | No badge wall. The profile gets one local narrative illustration instead of technology-logo decoration. |

## Current patterns inspected critically

Search was used to sample current profile-README discussion, then claims were treated as editorial patterns—not as universal facts or popularity statistics.

| Example / source | Accessed | Useful pattern | Caution / resulting choice |
| --- | --- | --- | --- |
| [GitHub Profile README Examples: What Good Developer Profiles Include — Gitskins](https://www.gitskins.com/blog/github-profile-readme-examples) | 2026-07-16 | A useful sequence is identity → focus → proof → next step; senior profiles should foreground judgment and systems thinking. | Use the sequence, but ground proof only in CV-supported work. Avoid generic assertions and unverified performance metrics. |
| [GitHub Profile README Examples 2026: What Works — Quillly](https://devbio.me/blogs/github-profile-readme-examples-2026) | 2026-07-16 | It argues that repeated stats cards, streak counters, and long technology rows often make profiles visually interchangeable; it favors one clear next destination. | Use `rj11.io` as the primary call to action, while retaining GitHub and LinkedIn as plainly named alternate paths. Its numerical/recruiting claims were not used. |
| [How to Build a GitHub Profile README That Feels Like You — buthonestly](https://buthonestly.io/web/how-to-build-a-github-profile-readme-that-feels-like-you/) | 2026-07-16 | Contemporary profile writing benefits from being personal rather than performative. | Keep the origin story to one factual, human sentence; let projects and career snapshots do the credibility work. |

## Design and engineering conclusions

### Reading and information design

Visitors scan before they read. The README therefore puts the role and current focus in the opening paragraph, project destinations immediately afterwards, and a concise career trail later. The heading labels are descriptive, and the project descriptions state what each destination is rather than merely naming it.

The visual is a local, static SVG that maps the three factual themes present in the CV—AI systems, product interfaces, and data visualisation—to the editorial idea of shipped work. It is decorative reinforcement, not evidence. The same idea is stated in the surrounding prose, so a failed image does not remove meaning.

### Compatibility and reliability

The final README uses ordinary links, headings, lists, a fenced `text` block, and a relative SVG image. All work without a third-party image host, an API token, JavaScript, or a live activity service. The SVG has a title, description, explicit dimensions, a narrow-friendly `viewBox`, and light/dark color preferences. Its text is supplementary; it is not the only expression of any claim.

Avoided: animated typing banners, contribution/streak or visitor counters, GitHub-stat cards, tracking pixels, generated skill-logo matrices, external badge services, and embedded dashboards. These can be noisy, rate-limited, privacy-invasive, misleading, or unavailable to evaluators. No metrics are claimed because the source CV does not supply verified public metrics.

### Accessibility and narrow screens

The README uses a single top-level heading and sequential second-level headings. Links are descriptive in isolation. The local image has meaningful alt text and stays within its container due to its `viewBox`; below it, prose restates the diagram. Lists wrap naturally on narrow screens. The code block is short and contains no long unbreakable command or URL. Meaning does not depend on color, animation, or an image.
