# Research — what a good GitHub profile README does, and what GitHub will actually render

Run: `runs/claude-opus5-high`
All web sources accessed **2026-07-25**.

This file records what I looked up, what I found, and what each finding changed in
the final README. Where a source made a claim I could not verify, I say so and I do
not use it.

---

## 1. How I checked compatibility

Most advice about "what HTML works in a GitHub README" is secondhand and out of
date. Instead of trusting it, I rendered test files through **GitHub's own Markdown
rendering API** (`POST https://api.github.com/markdown`), which returns the
sanitised HTML GitHub actually produces. Two test files covered every device I was
considering.

| Device tested | Result from GitHub's renderer | Consequence |
| :--- | :--- | :--- |
| `<div align="center">`, `<p align="center">`, `<h3 align="center">` | `align` **survives** | Safe to centre the header |
| `<img width="…">` / `height="…"` | Survives, and GitHub **adds** `style="max-width:100%; height:auto"` | Images are responsive for free; no extra work needed for narrow screens |
| `style="…"` on a `<div>` | **Stripped** | No inline CSS anywhere |
| Inline `<svg>…</svg>` in Markdown | **Stripped completely** (rendered as an empty `<p></p>`) | Custom vector art must be a separate `.svg` file referenced by `<img>` — this ruled out my first idea |
| `<picture>` + `<source media="(prefers-color-scheme: dark)">` | Survives, wrapped in GitHub's `<themed-picture>` element | Light/dark banner is viable |
| `<details>` / `<summary>` | Survives; Markdown inside renders | Used to collapse the older career history |
| Markdown inside `<td>` (headings, links, lists, nested `<details>`) | Renders, as long as blank lines surround it | Table layout is possible — but see §5 for why I mostly avoided it |
| `<kbd> <samp> <sub> <sup> <ins> <mark> <span>` | All survive | Available, used sparingly |
| `loading="lazy"` on `<img>` | **Stripped** | Do not bother |
| `title="…"` on `<img>` | Survives | Not used — tooltips are not accessible on touch devices |
| Tables | Wrapped in `<markdown-accessiblity-table>` with `role="table"` | GitHub adds accessibility markup and a horizontal scroll container |
| Footnotes `[^1]` | Render with `aria-describedby` and back-links | Available; not needed |
| ` ```mermaid ` block | Returned as a **syntax-highlighted code block** by the API | Confirms Mermaid renders client-side only — it degrades to readable text |

I also checked that the diagram actually parses, rather than assuming it. GitHub renders
Mermaid in the browser, so a syntax error shows up as an error box on the live page and
nowhere else. I rendered the exact diagram source from the README through a Mermaid
renderer (`mermaid.ink`) and got a valid SVG back, which also gave me its true pixel
dimensions — the number that decides whether it survives a phone screen (§5).

Two notes on that table:

- The API did **not** convert `> [!NOTE]` into an alert box. GitHub's own formatting
  documentation says alerts are supported in Markdown files, so this looks like a
  limitation of the API endpoint rather than of README rendering. Because I could not
  confirm it first-hand, I did not build anything that depends on alerts.
- A widely-shared community reference
  ([HTML Tags You Can Use on GitHub](https://gist.github.com/seanh/13a93686bf4c2cb16e658b3cf96807f2),
  accessed 2026-07-25) claims the `align` attribute no longer works and that `style`
  on `<img>` does work. My test showed the opposite on both counts. **Testing beat
  the popular reference.** I trust my test.

---

## 2. First-party GitHub documentation

**Managing your profile README** — GitHub Docs
<https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme>
(accessed 2026-07-25)

- The repository must be **public** and named **exactly** the account username, with
  a non-empty `README.md` at the root.
- The README vanishes from the profile if the file is emptied, the repo is made
  private, or the username stops matching.

*Changed:* the README is written for the repo `rj11io/rj11io`, and I noted that in an
HTML comment at the top of the file so whoever maintains it knows where it belongs.

**Basic writing and formatting syntax** — GitHub Docs
<https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax>
(accessed 2026-07-25)

Confirms alerts (`> [!NOTE]` and four siblings), footnotes, task lists, relative
image paths, `<picture>`, and auto-generated heading anchors. GitHub builds a table
of contents from the headings in a Markdown file.

*Changed:* I used a small number of real `##` headings with plain, meaningful names,
so GitHub's auto table of contents is useful rather than a list of emoji.

**Organizing information with collapsed sections** — GitHub Docs
<https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections>
(accessed 2026-07-25)

`<details>` with `<summary>`; `open` shows it expanded; a blank line before the
Markdown body helps it render. The documented purpose is content "that may not be
relevant or interesting to every reader" — explicitly *not* for content everyone
needs.

*Changed:* only the 2015–2019 career history and the education line go inside
`<details>`. Nothing a visitor needs — identity, current work, contact — is hidden.

**Specify theme context for images in Markdown** — GitHub Changelog
<https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/>
and the 2022 GA note
<https://github.blog/changelog/2022-08-15-specify-theme-context-for-images-in-markdown-ga/>
(both accessed 2026-07-25)

The original method was a URL fragment (`#gh-dark-mode-only`). GitHub deprecated it
in favour of `<picture>` with `prefers-color-scheme`, because the `<picture>` element
is standard HTML and therefore portable to anything else that renders the file.

*Changed:* the header banner uses `<picture>` with two local SVG files, and a plain
`<img>` fallback inside it. Any renderer that ignores `<picture>` still shows one
correct image. I avoided the deprecated fragment syntax entirely.

**Include diagrams in your Markdown files with Mermaid** — GitHub Blog
<https://github.blog/developer-skills/documentation-and-writing/include-diagrams-markdown-files-mermaid/>
(accessed 2026-07-25)

Mermaid diagrams are written as a ` ```mermaid ` code block. GitHub wraps the block
and renders it in an iframe **only if JavaScript is available**; otherwise the reader
sees the original text. The post calls this "progressive degradation".

*Changed:* I used exactly one Mermaid diagram, and I wrote the sentence immediately
above it to state the same thing in words. If the diagram never renders, the reader
loses nothing but a picture. I kept it to three nodes so it stays readable when
scaled down on a phone.

**About anonymized image URLs (Camo)** — GitHub Docs
<https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls>
(accessed 2026-07-25)

GitHub proxies every externally hosted image through Camo. Two consequences: the
image host never sees who viewed the page, and **Camo caches**, so images that are
generated fresh on each request do not refresh reliably.

*Changed:* this is the strongest technical argument against live stats cards, and it
pushed me to zero external images (see §4). It also means a "visitor counter" badge
cannot see individual visitors anyway — it is decoration pretending to be data.

**5 tips for making your GitHub profile page accessible** — GitHub Blog
<https://github.blog/developer-skills/github/5-tips-for-making-your-github-profile-page-accessible/>
(accessed 2026-07-25)

1. Write descriptive link text — assistive technology reads links out of context, so
   "click here" is useless.
2. Give images alt text that explains their purpose, briefly.
3. Use real heading levels; this also helps readers with ADHD or dyslexia scan.
4. Use plain language.
5. Go easy on emoji — screen readers read the full name aloud, and several in a row
   is jarring. Emoji used as bullet characters stop a list being announced as a list.

*Changed, and this shaped the README more than anything else:*

- Every link says where it goes ("read the two-page CV", not "here").
- The banner has alt text carrying the same information as the picture.
- Headings are `##`, in order, with plain names.
- **No emoji anywhere.** Not one. Real `-` bullets so lists are announced as lists.
- Nothing is signalled by colour alone. Colour in the banner is decorative; every
  fact it shows is repeated in text below it.

---

## 3. Real profile READMEs, read critically

I fetched the raw Markdown of real profile READMEs rather than reading listicles
about them. All accessed 2026-07-25.

**Charlie Marsh** — <https://raw.githubusercontent.com/charliermarsh/charliermarsh/main/README.md>
Five sentences. No images, no badges, no tables. Says who he is, where he works,
what he built, what he is trying to do, and then — separately — **the best way to
follow his work and the best way to contact him**. Those are two different calls to
action and he names both explicitly.

*Changed:* proof that a profile can be almost entirely prose and still be the most
credible thing on the page. It set my length target and convinced me to separate
"look at my work" from "get in touch" instead of dumping every link in one row.

**Sebastián Ramírez (tiangolo)** — <https://raw.githubusercontent.com/tiangolo/tiangolo/main/README.md>
Short prose, then a plain list of places to find him — including his own GitHub
profile labelled "(you are here)".

*Changed:* confirmed a plain bulleted link list beats a row of social badges. It is
accessible, never fails to load, and reads faster.

**Jeremiah Lowin** — <https://raw.githubusercontent.com/jlowin/jlowin/main/README.md>
Uses shell-prompt headings: `## $ whoami`, `## $ ping`. A creative, developer-native
device with **zero** external dependencies.

*Changed:* it convinced me that the cheapest creativity is typographic and structural,
not a widget. I did not copy the shell-prompt gag — it is his — but I did commit to
finding flair inside plain Markdown plus one local asset.

**Eugene Yan** — <https://raw.githubusercontent.com/eugeneyan/eugeneyan/master/README.md>
and **Simon Willison** — <https://raw.githubusercontent.com/simonw/simonw/main/README.md>
Both keep freshness with GitHub Actions: a workflow rewrites the file between HTML
comment markers (`<!-- writing starts -->`) and commits the result. Simon's uses a
three-column `<table>` for recent releases, blog posts and TILs.

*Changed — an important distinction.* This is the durable form of "dynamic": the
content is **committed to the repository**, so it renders with no third-party service
at request time. Request-time widgets are the fragile form. I have no authority to
create workflows on RJ's account and no way to invent his recent activity, so I did
neither — but I designed the README so nothing in it goes stale on its own, and I
recorded the Actions pattern in `content.md` as the correct way to add freshness
later.

**Anurag Hazra** — <https://raw.githubusercontent.com/anuraghazra/anuraghazra/master/README.md>
The author of the most-used stats card. His own profile leans on
`github-readme-stats.vercel.app` for a stats card, a language card and two pinned
repo cards, laid out in a two-column Markdown table, plus a stack of `align="right"`
icons.

*Changed — this was the most useful negative example I found.* If that one service is
slow or rate-limited, most of the page becomes broken image icons, and the table
layout collapses. His profile also states "50m+ hits, 50K stars" as prose, which no
reader can check. Both are exactly the failure modes I was told to avoid, on the
profile of the person who built the tool. It settled the badge question for me.

---

## 4. The reliability case against stats cards and badges

**github-readme-stats** — <https://github.com/anuraghazra/github-readme-stats>
(accessed 2026-07-25)

The project's own README says the shared public instance "is best-effort and can be
unreliable due to rate limits and traffic spikes", and recommends self-hosting or
GitHub Actions for reliable cards. Default caches run from 24 hours to 10 days.

**shields.io** — <https://shields.io/badges> (accessed 2026-07-25)
Documents static badge URLs, five styles, simple-icons logos, and a `cacheSeconds`
parameter. It also links out to its own uptime monitors — a service that publishes
status pages is a service that has outages.

**Decision: the README makes zero external requests.**

The only images are two local SVG files in `assets/`. No shields.io, no stats card,
no streak counter, no trophy case, no visitor counter, no typing animation, no
activity graph. The reasoning, in order of weight:

1. **It cannot break.** The brief requires the profile to stay coherent when dynamic
   images fail. The most reliable way to satisfy that is to have none.
2. **Badges carry almost no information.** A row of coloured rectangles saying
   "TypeScript" and "React" says less than one line of grouped text, takes more
   vertical space, and reads badly on a phone.
3. **The metrics are unverifiable or misleading.** Commit streaks and trophies
   measure habit, not skill, and reward noisy commits. RJ's own CV says a fleet of
   AI agents maintains his personal projects — so a contribution-based stat on his
   profile would be measuring his automation, not him. Publishing it as a personal
   achievement would be quietly dishonest.
4. **Privacy.** Camo already blocks a third party from seeing individual viewers, so
   a counter badge cannot honestly report visitors. Removing external images removes
   the question entirely.

I am recording this as a deliberate, argued choice rather than an omission. Badges do
earn their place on *project* READMEs, where a build-passing or package-version badge
reports live, checkable, useful state. A personal profile has no equivalent.

---

## 5. Narrow and mobile rendering

My API test showed GitHub wraps every table in `<markdown-accessiblity-table>`. That
wrapper scrolls horizontally — which means a multi-column table does **not** stack on
a phone, it becomes a sideways-scrolling box. This is why so many profile READMEs
with side-by-side "project cards" are unusable on mobile.

GitHub also injects `max-width: 100%; height: auto` onto every `<img>`, so images
scale down on their own.

*Changed:*

- **No multi-column table layout for content.** Every section is a single column that
  reflows. The only table in the deliverable is the compatibility table in this
  research file.
- Side-by-side information is expressed as **bold lead-in lists** (`- **Core** — …`),
  which wrap cleanly at any width and are still announced as a list.
- The banner SVG is sized so it survives scaling. I got this wrong on the first
  attempt and caught it by measuring. My first draft used a `900 × 200` viewBox; in a
  343 px content column that scales by 0.38, putting the role line at about **9.9 px**,
  which is too small to read comfortably. I retuned the geometry to a `780 × 180`
  viewBox, which scales by 0.44 in the same column — name about 21 px, role line about
  11.4 px. Both legible. The declared `width="900"` on the `<img>` does not affect
  this, because GitHub's injected `max-width: 100%` caps the rendered width to the
  column either way; it only makes the banner scale *up* on a wide screen.
- **Every word in the banner is repeated as text below it**, so even if it renders
  small, or not at all, nothing is lost. I confirmed this by rendering the page with
  the image path broken: the alt text takes its place as the first line and the profile
  still reads correctly from the top.
- The one Mermaid diagram is `flowchart TD`, not `LR`, for the same reason. I rendered
  both and measured them: the left-to-right version came out **755 px wide**, which a
  narrow column shrinks to about 45% — dropping its 16 px labels to around 7 px. The
  top-down version is **276 px wide**, narrow enough to render at full size in a phone
  column, so its labels stay at 16 px. It costs vertical space on a wide screen and
  buys legibility everywhere.
- No long unbroken strings, so nothing forces the page itself to scroll sideways.

**Rejected technique.** Scalar's engineering write-up
(<https://blog.scalar.com/p/how-we-created-an-animated-responsive>, accessed
2026-07-25) achieves a genuinely responsive, animated README by putting HTML and CSS
media queries inside an SVG `<foreignObject>` and serving it as an image. It is
clever and it works. I rejected it because it depends on GitHub's SVG sanitiser
leaving `foreignObject` alone, it gives assistive technology nothing, and it cannot
honour a reader's reduced-motion preference (see §6). The cost is high and the payoff
is decoration.

---

## 6. Custom SVG: what survives, and why mine is static

- Inline `<svg>` in Markdown is **stripped** (my own test, §1). Custom art must be a
  file loaded through `<img>`.
- SVG files referenced from a README are sanitised when served. A long-standing
  report — [github/markup#1160](https://github.com/github/markup/issues/1160),
  accessed 2026-07-25 — shows `dominant-baseline` being removed from `<text>`, which
  silently breaks text alignment.
- [community discussion #151372](https://github.com/orgs/community/discussions/151372)
  (accessed 2026-07-25) confirms GitHub only supports SVG via `<img>`, never
  `<object>` or `<embed>`, so SVG interactivity and hover states never work. There is
  no official reply in the thread; I treat it as community consensus, not policy.
- Animation inside an SVG loaded as an image generally does play — that is how the
  popular typing-animation banners work.

*Changed — the banner is deliberately conservative:*

- **Presentation attributes only.** No `<style>` block, no `<defs>`, no gradients, no
  `dominant-baseline`. Text is positioned with explicit `x`/`y` and `text-anchor`, so
  the one attribute I know the sanitiser removes is not load-bearing.
- **No animation.** GitHub honours the reader's system reduced-motion setting for its
  own interface, but motion inside an SVG served as an image is outside that control —
  a reader who has asked for less motion cannot switch it off. A profile header is
  the wrong place to override that, and the brief lists excessive animation as a
  failure mode.
- **System font stacks**, because an SVG rendered as an image can only use fonts the
  reader already has.
- **GitHub's own palette** for the light and dark files (`#ffffff`/`#1f2328` and
  `#0d1117`/`#e6edf3`, with GitHub's border greys), so the header looks native to the
  page instead of pasted onto it.
- A `<title>` and `<desc>` inside each file for anyone who opens it directly. GitHub
  turns every README image into a link to the file, so that happens.
- **No numbers, no chart, no grid.** An abstract bar chart or contribution-style grid
  in a header reads as a statistic. Since it would not be measuring anything, it
  would be an invented metric. The banner is typographic only.

---

## 7. What current write-ups say, and what I refused to reuse

Searching for 2026 guidance returns mostly search-optimised blog posts from tools
that sell README generators. Several make specific popularity claims — for example
that 78–87% of technical recruiters review GitHub profiles, and that visitors decide
in under 30 seconds. I could not trace any of these to a named study.

**I am not repeating those numbers as fact and I did not use them to justify any
decision.** They are listed here only to record that I read them and rejected them.
Sources surveyed, all accessed 2026-07-25:
<https://codeboards.io/blog/github-profile-readme-guide>,
<https://devbio.me/blogs/github-profile-readme-guide>,
<https://www.markdownstudios.com/blog/github-profile-readme-guide>,
<https://githubcard.com/blog/github-profile-readme-ideas>,
<https://app.unilink.us/blog/github-readme-templates-2026>.

Their qualitative advice does agree with what I saw in the real READMEs in §3, and
with GitHub's own accessibility post, so I treat these two points as sound because
they are independently supported, not because a blog asserted them:

- Keep it short and scannable; a profile is a landing page, not a CV.
- Decorative badges dilute the credible ones and signal a template.

**awesome-github-profile-readme** — <https://github.com/abhisheknaiidu/awesome-github-profile-readme>
(accessed 2026-07-25) is a genuinely useful map of the *conventions*: it sorts
profiles into styles including "Typing Mode", "Anime", "GIFs", "Badges", "Fancy
Fonts", "Retro", "Minimalistic" and "Simple but Innovative", and catalogues the tool
ecosystem — stats cards, streak stats, trophies, typing SVG, capsule-render headers,
skill icons, visitor badges, Spotify now-playing cards.

*Changed:* seeing the tools listed as a menu made the failure mode obvious. Most of
these answer "what widget can I add?" rather than "what does a visitor need to know?"
I picked the "Simple but Innovative" end of that list and derived the one custom
asset from RJ's own brand mark instead of reaching for a generator.

---

## 8. Decisions carried into the README

| Decision | Driven by |
| :--- | :--- |
| Zero external images; two local SVGs only | §4 reliability, §2 Camo caching, brief's degradation requirement |
| `<picture>` with `prefers-color-scheme`, `<img>` fallback inside | §2 GitHub changelog, §1 verified |
| No emoji at all; real `-` bullets | §2 GitHub accessibility post |
| Descriptive link text on every link | §2 GitHub accessibility post |
| Single-column layout; bold lead-in lists, no layout tables | §5 tables scroll sideways on narrow screens |
| One Mermaid diagram, top-down, with the same point written above it | §2 Mermaid degrades to text; §1 syntax verified; §5 top-down measured at 276 px so it does not shrink on a phone |
| `<details>` for 2015–2019 history and education only | §2 collapse only what not every reader needs |
| Static, gradient-free, `<style>`-free banner SVG | §6 sanitiser behaviour and reduced-motion |
| No stats, streaks, trophies or visitor counters | §4, plus RJ's agents maintain his repos, so activity stats would misattribute automation to him |
| Prose-first opening, two separate calls to action | §3 Charlie Marsh, Sebastián Ramírez |
| No dated "last updated" line, no counts that need refreshing | maintainability: nothing in the file rots on its own |

---

## 9. Honest limitations of this research

- I could not confirm GitHub alert rendering first-hand (§2). I relied on GitHub's
  documentation and then built nothing that needs it.
- I could not test how GitHub's SVG sanitiser treats my specific files, because that
  happens when the file is served from a real repository. I mitigated it by using only
  the most basic SVG features, and by making sure the banner carries no information
  that is not also in the text.
- I confirmed the Mermaid source parses and measured its size, but I could not confirm
  it against GitHub's own Mermaid version, which may differ from the renderer I used.
  `flowchart` is the oldest and most stable diagram type, and I used no recent syntax,
  so the risk is small. If it ever fails, the fallback is the sentence above it.
- The rendered previews I checked were built from GitHub's own sanitised HTML output,
  styled to match GitHub's typography and spacing. That is close, not identical: I could
  not check the real profile page, where the README column is narrower than a repository
  README because of the sidebar. That direction is safe — a narrower column is the case
  I tuned for.
- I inspected six real profile READMEs. That is a sample, not a survey, and I have not
  claimed otherwise. I chose them because they belong to working engineers in
  developer tooling and AI whose profiles I could read at source.
- I did not verify RJ's live sites, repositories or third-party pages. Every URL in the
  README is taken from the link annotations embedded in the two reference PDFs, exactly
  as written there.
