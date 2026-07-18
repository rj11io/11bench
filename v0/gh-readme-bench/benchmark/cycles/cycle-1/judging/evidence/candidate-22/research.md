# Research: a contemporary GitHub profile README

Access date for every web source below: **2026-07-16**.

## Scope and method

The goal was not to find a template to imitate. I reviewed GitHub's own
documentation first, then inspected a deliberately varied set of live public
profiles: terse, project-first, feed-driven, highly visual, and deliberately
playful. These are examples, not a popularity ranking. I did not infer quality
from follower, star, or repository counts.

The research questions were:

1. What must a visitor understand in the first screenful?
2. What kinds of proof belong on a profile rather than in a CV?
3. Which visual devices survive GitHub's renderer, dark mode, narrow screens,
   image failure, and time?
4. What should be omitted even when it is fashionable?

## Source log and decisions

| Source | Findings | Decision changed |
| --- | --- | --- |
| [Managing your profile README - GitHub Docs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) | A public repository matching the username, with a non-empty root `README.md`, is the profile mechanism. The README is explicitly meant to tell others about the person. | Treat the file as the profile's front door, not as repository documentation or a duplicate CV. |
| [About your profile - GitHub Docs](https://docs.github.com/en/account-and-profile/concepts/personal-profile) | GitHub surfaces the profile README at the top of the profile. GitHub suggests an about section, contributions the person is proud of, and guidance for getting help. It also warns that public-profile details are globally visible. | Put identity, present focus, selected work, and contact paths before career chronology. Include only contact information already intentionally public in the PDFs. |
| [About the repository README file - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) | READMEs are often the first thing visitors see. GitHub supports relative links and image paths and truncates rendered content beyond 500 KiB. Longer documentation should live elsewhere. | Keep the profile short, use relative local assets, and link to the full CV rather than reproducing it. |
| [Quickstart for writing on GitHub - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github) | GitHub documents `<picture>` with `prefers-color-scheme` for light/dark responsive images and requires meaningful alt text. | Use local light/dark desktop and mobile SVG variants through `<picture>`, with an `<img>` fallback and descriptive alt text. |
| [Basic writing and formatting syntax - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) | Headings create navigable structure and links should use meaningful labels. | Use one H1, sequential H2/H3 headings, and link text such as "full CV" or a project name instead of "click here." |
| [5 tips for making your GitHub profile page accessible - The GitHub Blog](https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/) | GitHub recommends descriptive links, concise alt text, correct heading hierarchy, plain language, real list markup, and restrained emoji. Proper structure also improves scanning for visual readers. | No emoji bullets, icon-only contacts, skipped headings, or text embedded only in images. The diagram repeats an idea already stated in prose. |
| [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) | GFM is a CommonMark superset, but GitHub applies additional sanitization. Raw HTML is parsed, while tags such as `script`, `style`, and `iframe` are filtered in GFM output. | Use only conservative HTML (`picture`, `source`, `img`, `details`, `summary`) and no inline scripts, iframes, or interactive claims. |
| [About anonymized URLs - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls) | GitHub proxies uploaded images through Camo to hide visitor browser details, but remote media can still fail because of content type, caching, authentication, or host availability. | Prefer repository-owned assets. Do not use tracking pixels, credentialed media, or a visual whose failure removes factual content. |
| [GitHub Readme Stats - project README](https://github.com/anuraghazra/github-readme-stats) | The project's own documentation calls the public endpoint best-effort and potentially unreliable under rate limits or traffic spikes. It also warns that "Top Languages" is a code-composition metric, not a measure of skill. | Omit stats, streaks, ranks, and language cards. They are weaker proof than named products and introduce a live dependency. |
| [README Typing SVG - project README](https://github.com/DenverCoder1/readme-typing-svg/blob/main/README.md) | The project recommends self-hosting for better uptime and control. Typing SVGs require width tuning and repeat motion by default. | Do not use a typing headline. A static sentence is faster to scan, motion-free, and maintenance-free. |
| [Josh Bickett's profile](https://github.com/joshbickett) | A very short profile can work when the role, company, product domain, contact route, and pinned repositories already carry the proof. Its limitation is that it gives little context for judgment or breadth. | Preserve the directness of a short intro, but add enough selected evidence to explain Ricardo's unusual AI + datavis + product-leadership combination. |
| [Artem KK's profile](https://github.com/KazKozDev) | Uses a terse AI thesis ("Making LLMs do what they're told") while concrete pinned projects explain the actual work: agentic generation, translation, evaluation, and tooling. The specificity comes from projects rather than a large skill inventory. | Give Ricardo a short AI/product thesis, then substantiate it immediately with 11ai, 11bench, current B2B systems, and named shipped work. |
| [Yanina Bellini Saibene's profile](https://github.com/yabellini) | A current-roles list makes a multi-hyphenate career legible and sends visitors to specific destinations. The long list becomes link-dense quickly. | Use compact, named project entries and a small number of contact destinations; do not create a directory of every activity. |
| [Leticia's profile](https://github.com/levxyca) | A code-block opening creates a distinct voice, while recent posts make the page feel alive. The feed also increases length and ongoing maintenance. | Keep the sense of personality but avoid a generated feed or faux-terminal biography. Ricardo's game/robotics story is more distinctive than a generic code-as-bio device. |
| [DenverCoder1's profile README](https://github.com/DenverCoder1/DenverCoder1) | Demonstrates the upper end of cards, badges, sponsor panels, tool icons, dynamic activity, stats, and generated media. It is feature-rich but visually dense and highly dependent on images/services. | Use this as a failure-mode boundary: no badge wall, tool-logo inventory, automated activity feed, sponsor block, or redundant cards. |
| [Sindre Sorhus's profile README](https://github.com/sindresorhus/sindresorhus) | A coherent retro-web joke can be memorable even when it intentionally breaks contemporary restraint. Its success depends on the authorial concept; copied without that context, the GIFs and counters would be noise. | Allow one personal visual concept, but make it native to Ricardo's work: a product-engineering flow diagram rather than decorative animation. |
| [Mario Souto's profile](https://github.com/omariosouto) | Combines a personal origin detail, current role, contact badges, recent media, a stats card, and pinned work. The human detail is sticky; the generated modules compete with it. | Keep one memorable origin detail and let GitHub's own pinned-repository area handle repository metrics. |

## What a strong profile communicates

GitHub does not publish a profile-README eye-tracking study in the sources
reviewed. The following scanning model is therefore an **editorial inference**,
not an empirical claim:

1. **Identity:** name, role, location/context, and a specific point of view.
2. **Present tense:** what the person is building now.
3. **Proof:** a few named projects or shipped systems, not adjective-heavy
   self-description.
4. **Pattern:** the kind of problems the person repeatedly solves.
5. **Action:** where to inspect more work or start a conversation.

This inference follows from GitHub placing the README at the top of the profile,
its recommendation to show work and contributions, and its accessibility
guidance that headings help people scan and navigate. It changed the final
order to: hook -> current work -> working pattern -> selected evidence -> tools
-> personal note -> contact.

For a senior AI/product engineer, credibility comes from showing both sides of
the role:

- AI systems: extraction, agent harnesses, skills, automation, workflows.
- Product surfaces: dashboards, data explorers, documentation, design systems.
- Delivery: architecture, tests, CI/CD, onboarding, and team growth.

A long skill list without these connections would make the profile less
credible, not more.

## Contemporary conventions, assessed

### Badges

Badges are useful when they encode a small, exact property such as build status,
package version, or license. A personal profile rarely needs dozens of those
properties. Social badges also repeat links that can be written accessibly in
one line.

**Decision:** no badges. The profile uses descriptive text links.

### Stats and repository cards

They provide quick visual density, but contribution streaks reward a narrow
behavior, "top language" cards can be misread as competence, and public card
services can be rate-limited. GitHub already renders pinned repositories below
the profile README.

**Decision:** no third-party stats or duplicate repository cards. Named work is
the proof.

### Diagrams and custom SVG

A diagram is justified when it compresses a repeated relationship that would
otherwise take several sentences. A repository-local SVG is deterministic,
versioned, cacheable, and inspectable. Text inside an SVG must not carry unique
information because screen readers and failed images may not expose it.

**Decision:** include one static, four-stage diagram:
`raw signal -> AI systems -> product surfaces -> shipped product`. The prose
immediately above it states the same idea.

### Animation

Animation can create delight, but looped typing, contribution snakes, and GIF
headers delay comprehension, distract some readers, and add motion or service
dependencies. `prefers-reduced-motion` is difficult to guarantee across
third-party rendered images.

**Decision:** no animation.

### HTML and code blocks

HTML is useful for `<picture>` and collapsible secondary detail. Layout tables,
manual pixel widths, and alignment tricks are brittle on narrow screens. A
code-as-biography block can be charming but is now a common visual idiom and
often wastes vertical space.

**Decision:** HTML only for light/dark art and the optional origin story. No
multi-column tables or faux code object.

### Interactive-looking presentation

GitHub README content cannot safely become a real application: scripts and
iframes are filtered, and controls that merely look clickable are misleading.
`<details>` is a genuine native disclosure element and degrades to readable
content.

**Decision:** one honest `<details>` disclosure, no fake terminal, tabs,
buttons, or form controls.

## GitHub compatibility and rendering constraints

- One H1 followed by H2 and H3 levels; no skipped hierarchy.
- Relative paths (`assets/...`) for local images.
- `<picture>` sources for dark/light and wide/narrow variants; the `<img>` is
  the fallback.
- No inline CSS, JavaScript, iframe, canvas, embedded credential, or external
  API call.
- No fixed-width content wider than the README column.
- The SVG uses a flexible `viewBox`; the HTML image uses `width="100%"`.
- No Markdown table in the final README, because wide tables do not reflow into
  stacked cards on narrow screens.
- No line relies on color alone: every stage in the diagram has a numbered
  label and plain text.
- The README remains far below GitHub's 500 KiB truncation threshold.

## Accessibility, privacy, reliability, and maintenance checklist

### Accessibility

- Meaningful image alt text describes the diagram's purpose.
- Visible prose repeats the image's core message.
- Link labels identify their destination.
- Lists use Markdown list syntax.
- Emoji are not used as bullets or section labels.
- The origin story is optional rather than blocking the professional narrative.
- Light and dark SVG variants retain high contrast.

### Mobile and narrow rendering

- One-dimensional document flow; no columns.
- Short project headings and paragraphs.
- No badge row that can overflow.
- A stacked diagram variant is selected below 600 px so labels remain
  readable; the adjacent prose still communicates the model if images fail.

### Load reliability and privacy

- Local SVGs only.
- No visitor counter, tracking pixel, live music status, generated feed, or
  remote dynamic image.
- No token, credential, private integration, or service account.
- Contact links are already public in the supplied CVs.

### Maintainability

The only dated content is project/employment chronology supported by the PDFs.
The most likely update points are clearly localized: "Now", "Selected work",
and contact links. There is no workflow to debug and no third-party theme
configuration.

## Failure modes explicitly avoided

- **CV pasted into Markdown:** replaced by a point of view and selected proof.
- **Badge wall:** skills are grouped in four readable lines.
- **Vanity metrics:** no followers, stars, streaks, ranks, or commit counts.
- **Broken dynamic services:** no generated cards or feeds.
- **Generic AI copy:** named products and concrete systems replace claims such
  as "passionate innovator."
- **Excessive animation:** none.
- **Visual noise:** one meaningful visual, no logo cloud.
- **Misleading interactivity:** no fake controls.
- **Unsupported claims:** no client names, business results, scale metrics, or
  GitHub activity beyond the source PDFs.
- **Color-only meaning:** numbered and named diagram stages.

## Resulting design brief

Create a profile that feels like a product engineer designed it:

- opening thesis: turn messy inputs into reliable products;
- current emphasis: 11ai, 11bench, and rj11io;
- signature intersection: AI systems + data-rich interfaces + delivery;
- proof: named systems from Hunt, OMEGA, Phantasma, and
  BinaryEdge/Coalition;
- human memory hook: games, servers, and LEGO Mindstorms;
- visual language: quiet, local, technical, dark/light aware;
- call to action: inspect the work, read the full CV, or email about an
  exceptional product problem.
