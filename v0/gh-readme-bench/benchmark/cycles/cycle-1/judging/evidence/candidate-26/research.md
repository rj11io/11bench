# Research: designing a profile README that earns its space

**Research window:** 16 July 2026  
**Scope boundary:** This file uses external sources only to guide the information design and technical implementation. All biographical statements in `README.md` are grounded in `content.md`, which in turn is grounded only in the two supplied CV PDFs.

## The short version

A profile README is the introduction at the top of a GitHub profile, not an alternate CV or a dashboard of personal telemetry. Its first screen should answer four things quickly: who this person is, what they work on now, what proves the claim, and where a visitor should go next. The durable design choice here is therefore text-first, static, and project-linked: a concise opening, a current-work section, a focused capability map, selected career evidence, and clear contact routes.

The only visual is a local SVG that explains the editorial idea of an end-to-end product loop. It is a static, labelled diagram rather than a decorative header, activity graph, or external card. Every important point is also available in surrounding text.

## Sources, findings, and decisions

| Source | URL | Accessed | Finding | Decision changed |
|---|---|---:|---|---|
| **Managing your profile README** - GitHub Docs | https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme | 16 Jul 2026 | A README displays on a profile when a public repository has the exact username and a non-empty root `README.md`. | Treat this deliverable as the root README of the eventual profile repository; use standard repository-relative asset paths. |
| **About your profile** - GitHub Docs | https://docs.github.com/en/account-and-profile/concepts/personal-profile | 16 Jul 2026 | GitHub positions the profile README at the top of the profile and suggests an about section, contributions with context, and community guidance. It also cautions that public profile details are visible to everyone. | Put identity/current work before chronology; include only the contact information the CV itself makes public, and omit unnecessary personal detail. |
| **Using your GitHub profile to enhance your resume** - GitHub Docs | https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume | 16 Jul 2026 | GitHub recommends a brief introduction, skills, professional experience, and best projects; it recommends pinning 3-5 relevant projects and making them quickly understandable. | The README names and explains the three current public initiatives and deliberately leaves repository selection to the profile’s pinning UI. It does not repeat a full chronological CV. |
| **Quickstart for writing on GitHub** - GitHub Docs | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github | 16 Jul 2026 | Markdown and some HTML are available; GitHub documents `<picture>` and `<details>` as supported ways to enrich or compact a README. | Use ordinary Markdown for the core, and only one conservative HTML `<img>` for the local SVG. No fragile layout table, custom CSS, or interactive pretence is needed. |
| **Basic writing and formatting syntax** - GitHub Docs | https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax | 16 Jul 2026 | Headings provide a navigable hierarchy. Relative image paths in Markdown files are rewritten for the branch being viewed; the `<picture>` element is supported. | Use semantic headings and `./assets/product-engineering-loop.svg`, avoiding an external image host. Do not use a multi-column table that would become cramped on a narrow screen. |
| **GitHub Flavored Markdown Spec** | https://github.github.com/gfm/ | 16 Jul 2026 | GFM is GitHub’s Markdown dialect. GitHub adds post-processing and sanitization. The tag filter explicitly blocks `script`, `style`, `iframe`, `textarea`, and other unsafe raw HTML. | The visual is a normal image file, not inline script/CSS. There are no embedded apps, iframes, custom JavaScript, or claimed interactivity. |
| **Working with non-code files** - GitHub Docs | https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files | 16 Jul 2026 | GitHub displays common image formats including SVG, while noting that SVG rendering can be problematic in Firefox. | Make the SVG optional and modest; retain a complete plain-text explanation and do not place essential navigation or claims only in the image. |
| **Profile reference** - GitHub Docs | https://docs.github.com/en/account-and-profile/reference/profile-reference | 16 Jul 2026 | Pinned repositories replace the popular-repositories section and are a native way to foreground work. Public profile information remains broadly visible. | Direct visitors to the named projects in prose and recommend the appropriate repositories be pinned; do not recreate GitHub’s own contribution/achievement displays. |
| **Awesome GitHub Profile README** - Abhishek Naidu | https://github.com/abhisheknaiidu/awesome-github-profile-readme | 16 Jul 2026 | This large curated catalogue groups public profile patterns into actions, dynamic/realtime content, code, typing, minimal, badges, retro, GIFs, and more. It demonstrates range, not a quality ranking or evidence that any pattern is universally appropriate. | Borrow the idea that a profile can have personality, but choose one original, static visual instead of mixing multiple pattern families. Avoid visitor counters, random jokes, music, and novelty widgets. |
| **anuraghazra profile README** | https://github.com/anuraghazra/anuraghazra | 16 Jul 2026 | The public profile uses a clear greeting, compact role/project bullets, skill icons, and generated statistic cards. Specific work is easy to scan before the cards. | Preserve the strong, direct opening and project specificity; reject the stats-card pattern because the supplied evidence does not support live metrics and third-party image availability should not determine readability. |
| **lowlighter profile README** | https://github.com/lowlighter/lowlighter | 16 Jul 2026 | This profile explicitly describes itself as auto-generated with metrics and renders largely as a collection of SVG infographics. The implementation is a useful demonstration of an automation-led profile, but much of its content depends on images loading. | Mention automation as real work in readable text instead of making the profile itself an automated metric surface. The local SVG here supplements prose rather than replacing it. |
| **Sindre Sorhus profile README** | https://github.com/sindresorhus/sindresorhus | 16 Jul 2026 | A deliberately maximal, animated personal style can be memorable and coherent when it matches the author’s established public persona. It is image-heavy by design. | Use a quieter kind of memorability that fits a product engineer: a clear systems diagram and an origin note, without animation or a novelty aesthetic. |
| **SaurabhSSB profile README** (AI/data-adjacent example) | https://github.com/SaurabhSSB/SaurabhSSB | 16 Jul 2026 | The profile makes current learning/work and contact routes explicit, but combines a broad self-description with numerous social, activity, stats, and image elements. The page demonstrates how signal can get diluted when every common profile widget is included. | Keep the useful “now” and contact concepts, but replace general self-promotion with CV-supported work; cap technology presentation at short text lists and eliminate profile/visitor/streak stats. |
| **TareqAlKushari profile README** (AI-labelled developer example) | https://github.com/TareqAlKushari/TareqAlKushari | 16 Jul 2026 | It has familiar sections for introduction, skills, projects, learning goals, contact, and GitHub stats. Its generic aspirational phrasing and long icon rows make the key evidence slower to find. | Use the same basic information architecture in a much tighter form: current work and named projects before skills, project evidence before career backfill, and no generic “always learning” copy. |

## How visitors are likely to scan this profile

There is no claim here about a universal attention span. The sequence below is an editorial inference from GitHub’s placement of the profile README at the top of the profile, its advice to foreground projects, and the realities of a narrow, scrollable page.

1. **Identity:** name, role, location, and a one-sentence point of view must be visible without any image.
2. **Current relevance:** visitors should see present AI/product/open-source work before earlier roles.
3. **Proof, not adjective:** named projects, responsibilities, technologies, and selected product chapters should carry credibility. Empty claims such as “passionate,” “driven,” or “expert” are not substitutes.
4. **Route forward:** project/site/GitHub/LinkedIn/email links should be ordinary text links with meaningful labels.
5. **Optional depth:** the career timeline can follow after the current story; it should add evidence rather than reproduce every CV bullet.

This sequence drives the final section order: opening -> current/public work -> capability map -> selected product chapters -> origin story -> contact.

## Creative patterns considered

| Pattern | Appropriate use | Risk | Final treatment |
|---|---|---|---|
| Badges / icon rows | A few semantic links or certifications can be compact. | Badge walls reduce scanning, repeat brand names, have weak text alternatives, and often invite tracking/count metrics. | No external badges. Technologies appear as readable inline code and prose. |
| Live statistic cards / visitor counters | Useful only when an author intentionally owns the data source and can defend the metric. | Network failure, stale or misleading data, privacy/tracking concerns, and visual emphasis on vanity metrics. | Excluded. No contribution, streak, star, follower, visitor, language-share, or activity claims. |
| Dynamic generated SVGs / Actions | Can demonstrate automation when the result is substantive, maintained, and has a text fallback. | Broken tokens, rate limits, stale scheduled workflows, and accessibility loss when content is image-only. | Excluded. The README says what RJ builds; it does not require a job to run in order to say it. |
| Custom SVG | Good for a small, explanatory diagram or visual signature that remains legible when copied as a standalone file. | May fail to render in some contexts; decorative images can obscure the message. | One committed, text-labelled SVG with a `<title>`, `<desc>`, `alt` text, high contrast, no animation, no external resources, and a nearby plain-language explanation. |
| Animation / typing SVG | Can support an artist’s or playful personal identity. | Motion competes with content, may be distracting, and adds a service/asset dependency. | Excluded. The story has enough character without simulated typing. |
| Diagram | Useful if it explains a relationship that prose alone makes harder to scan. | A diagram that merely restates a skills list is visual noise. | Used once to connect data/domain understanding, interface work, delivery, and team foundations - the distinctive cross-functional story in the CV. |
| Code block | Useful for a runnable or genuinely explanatory technical artifact. | Fake “developer object” snippets are generic decoration and can age badly. | Excluded. This is a profile introduction, not an API or a terminal demo. |
| Collapsed sections | Useful for optional reference material. | Important information becomes hidden and less likely to be read. | Excluded from the final: the selected history is short enough to remain visible. |

## Technical compatibility, accessibility, and maintenance checklist

### GitHub compatibility

- The README uses GFM headings, paragraphs, block quotes, bullet lists, inline code, standard links, and a single `<img>` element - all conservative, documented choices.
- It avoids layout-dependent HTML tables, inline styles, scripts, iframes, and unsupported interactive behaviour. GFM’s tag filtering is an explicit reason not to use an embedded demo.
- The asset uses a relative path, `./assets/product-engineering-loop.svg`. GitHub documents that relative image paths in Markdown resolve against the viewed branch.
- The image has no network dependencies, generated query strings, credentials, or remote font requirements.

### Accessibility and narrow screens

- Headings establish a meaningful reading order. Lists remain one-column, so they wrap rather than overflow on mobile.
- No colour alone conveys meaning: every SVG step is labelled in text, the center has text, arrows are redundant with the left-to-right reading order, and the surrounding prose supplies the same idea.
- The SVG supplies both internal `<title>`/`<desc>` and Markdown-facing `alt` text.
- No automatic motion, flashing, hover-only content, tiny icon-only links, or mouse-dependent interaction is used.
- The real content remains coherent if SVG rendering, images, or external sites fail. The only image is explanatory, not required for navigation or claims.

### Privacy and reliability

- No tracking pixel, visitor counter, external activity service, social embed, or dynamic profile API is included.
- There are no invented current metrics, claimable GitHub activity, certification badges, or repository/star counts.
- The email is included because it appears as a public contact route in both supplied CVs. The README does not add a phone number, address, date of birth, or other personal data.
- The public URLs copied from the CV were checked on 16 Jul 2026: `rj11.io`, `ai.rj11.io`, and `bench.rj11.io` returned successful HTTP responses after redirects. The LinkedIn profile is linked as printed in the CV and is also linked from the public `github.com/rj11io` profile; LinkedIn returned an anti-bot HTTP 999 response to a direct automated HEAD check, so that response is not treated as evidence that the human-facing link is invalid.

### Maintenance

- Update the three current-project bullets when their scope changes; the rest of the README should not need frequent churn.
- Refresh “Selected product chapters” only when a new chapter is more relevant than one of the existing four.
- Keep the SVG static. If the product loop no longer describes the work, edit the SVG and its nearby plain-language sentence together.
- Prefer adding a genuinely useful project link over another technology token or visual element.

## Deliberate failure-mode avoidance

- **Not a badge wall:** technology names appear in readable text, grouped by the work they support.
- **Not a vanity dashboard:** no contributor chart, streak, visitor count, follower count, star count, language percentage, or activity snake.
- **Not generic AI copy:** the opening is an editorial metaphor, then immediately narrows to CV-supported projects, roles, and methods.
- **Not a résumé dump:** the extended CV’s full employer/task inventory is preserved in `content.md`, but only the career evidence that reinforces the current AI/product story appears in the README.
- **Not a fragile microsite:** no external readme-card service, browser script, authenticated endpoint, or automated commit workflow is required for a useful render.
- **Not a visual puzzle:** no animated header, custom font, or colour-coded-only meaning; the custom graphic has a narrow explanatory job and text fallback.
