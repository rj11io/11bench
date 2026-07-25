# Content model — Ricardo Jorge CV

Run: `claude-opus5-high`. This is the **canonical content model**: every word the
website and the printed pages show is defined here, with its source.

`content.ts` in this folder is the machine-readable version of this file, and it
is the only thing the page reads. Nothing is typed straight into the components.
If the two ever disagree, this file wins and `content.ts` is the bug.

---

## How to read the labels

| Label | Meaning |
|---|---|
| **[S]** | Taken directly from `ref/RJ_CV.pdf` (the two-page CV). Page number follows. |
| **[M]** | Taken directly from `ref/RJ_CV_max.pdf` (the six-page CV). Page number follows. |
| **[S+M]** | Present in both, in agreement. |
| **[ED]** | My editorial rewrite. Same facts, different words. No new information. |
| **[CUT]** | Present in a source, deliberately not rendered. Reason given. |
| **[INF]** | My inference. Says whether it is rendered or held back. |
| **[?]** | Genuine uncertainty. Flagged, not resolved. |

Rule I held myself to: **no fact, date, employer, number, credential, or link
appears on the page unless it appears in a source PDF.** Where the two PDFs
disagree, I say so rather than quietly picking one.

---

## 1. Extraction method

I pulled text from both PDFs with the `pypdf` library, then pulled the link
targets separately out of the PDFs' link annotations — the invisible clickable
rectangles a PDF stores alongside its text. Reading link annotations matters
because the visible text says `rj11.io` while the annotation says
`https://www.rj11.io/`; without checking, I would have guessed at the `www.`
and the trailing slash.

Extraction was clean. Both files are A4 (595 × 842 pt). No page came back empty
and no text was garbled, so I did not need to fall back on reading page images.

Two mechanical artefacts of extraction, worth naming so nobody mistakes them
for source content:

- Headers run together, e.g. `Ricardo JorgeAI Product Engineer` and
  `11iorj11.io`. These are separate visual elements sitting side by side, not
  one string.
- Bullets come through as an en dash `–` at the start of a line.

### Link targets, exactly as stored in the PDFs

| Visible text | Actual target | Source |
|---|---|---|
| `ricardojorgexyz@gmail.com` | `mailto:ricardojorgexyz@gmail.com` | [S+M] |
| `rj11.io` | `https://www.rj11.io/` | [S+M] |
| `github.com/rj11io` | `https://github.com/rj11io` | [S+M] |
| `linkedin.com/in/rj11io` | `https://www.linkedin.com/in/rj11io` | [S+M] |
| `cv.rj11.io` | `https://cv.rj11.io/` | [S+M] |
| `ai.rj11.io` | `https://ai.rj11.io/` | [S] p1, [M] p2 |
| `bench.rj11.io` | `https://bench.rj11.io/` | [S] p1, [M] p2 |
| `github.com/ricardojrmcom` | `https://github.com/ricardojrmcom?tab=repositories` | [M] p3 |
| `hunt.io` | `https://hunt.io/` | [S] p2, [M] p3 |
| `omegasys.eu` | `https://www.omegasys.eu/` | [S] p2, [M] p4 |
| `phantasma.info` | `https://phantasma.info/` | [S] p2, [M] p4 |
| `coalitioninc.com` | `https://www.coalitioninc.com/` | [S] p2, [M] p5 |
| `cv.rj11.io/v1/max` | `https://cv.rj11.io/v1/max` | [S] p2 |

Every one of these is rendered. I dropped the `?tab=repositories` query on the
legacy GitHub link, since it is a view preference rather than part of the
address. **[ED]**

---

## 2. Identity and contact

| Field | Value | Source |
|---|---|---|
| Name | Ricardo Jorge | [S+M] |
| Title | AI Product Engineer | [S+M] |
| Location | Lisbon, Portugal | [S+M] |
| Email | ricardojorgexyz@gmail.com | [S+M] |
| Site | rj11.io | [S+M] |
| GitHub | github.com/rj11io | [S+M] |
| LinkedIn | linkedin.com/in/rj11io | [S+M] |
| CV | cv.rj11.io | [S+M] |

**[CUT]** "Hi, I'm Ricardo Jorge, but you can call me RJ." **[M]** p1. The
nickname is warm but it costs a line and the `rj11` brand already carries it
across the site, the GitHub handle, the LinkedIn handle, and all three project
names. Dropped from the heading; the `rj11` initials do the work.

**[?]** The long CV says "For the past few years I've been working as a
hands-on B2B freelancer" **[M]** p2, but dates the current freelance role
`Mar 2025 – Present` **[S+M]** — about sixteen months as of July 2026. The
earlier Glaiveware co-founder role (2018–2019) **[M]** p5 was also
client-facing contract work, which may be what "a few years" is counting. I
did not render "a few years"; I render the dates, which are unambiguous.

---

## 3. Positioning line (standfirst)

**Rendered:**

> Ten years building the frontend, most of it as the first frontend hire.
> Now building AI products.

**[ED]** — this sentence does not exist in either PDF. It is assembled entirely
from claims that do, with no new information:

- "a decade of professional TypeScript experience" **[S]** p1
- "On most projects I was the first frontend hire" **[S]** p1, **[M]** p1
- "AI Product Engineer" as current title **[S+M]**

I added it because both source CVs open with a paragraph, and the eye-tracking
research says the space directly under the name is the most-read real estate on
the page (see `research.md` §1.1). A paragraph wastes it. One sentence that
states the whole career shape does not.

**[?] — the one factual tension I could not resolve.** The short CV claims "a
decade of professional TypeScript experience" **[S]** p1. Checking that against
the long CV's own role details:

- Career starts **Jan 2015** at Science4you **[M]** p6 — that is eleven years to
  July 2026, and that role was **Java**, not TypeScript.
- NextBitt, Oct 2015 – Jul 2016, lists "JavaScript (jQuery, Angular.js), .NET
  (C#, MVC)" **[M]** p6 — no TypeScript.
- The earliest role that names TypeScript is **Glaiveware, Mar 2018** **[M]**
  p5 — about eight years.

So "a decade of professional TypeScript" is not supported by the role-level
detail in the candidate's own longer CV. It is his claim and I preserved it
rather than silently correcting it downward, because correcting it would be
inventing a different claim. But I chose not to build the headline on it: the
standfirst says "ten years building the frontend", which the roles do support
(React from 2016, continuous frontend work from 2015). **A reviewer should ask
the candidate to confirm the TypeScript start year.**

Two neighbouring claims *do* check out against role detail, which is why I kept
them:

- "building on React since 2016" **[S]** p1, **[M]** p1 — the American Heart
  Association role, Sep–Nov 2016, says "I built my first web app … using React
  and Node" **[M]** p6. ✓
- "Next.js since 2018" **[S]** p1, **[M]** p1 — Glaiveware, from Mar 2018,
  lists Next.js **[M]** p5. ✓

---

## 4. Profile

Both PDFs cover the same ground at wildly different lengths: the long CV spends
roughly 500 words over a page and a half **[M]** pp1–2; the short CV compresses
it to two paragraphs **[S]** p1. I compressed further, to three short
paragraphs, and reordered so the strongest claim comes first.

### Rendered paragraph 1

> AI Product Engineer with a decade of professional TypeScript, building on
> **React since 2016** and **Next.js since 2018**. On most projects I was the
> **first frontend hire** — owning architecture, tooling, component libraries,
> and pipelines from day one, then growing the team around them: hiring,
> interviewing, onboarding, and writing the playbooks that let new engineers
> integrate seamlessly.

**[S]** p1, near-verbatim. I removed "professional TypeScript experience" →
"professional TypeScript" and cut "and pipelines from day one, then growing the
team around them" from a second sentence into the same one. **[ED]** Nothing
added.

### Rendered paragraph 2

> Most of that work is **dashboards, product platforms, and proprietary data
> explorers** for cybersecurity, crypto, and gaming companies — where I found a
> passion for data-driven products and visualisation, and learned what separates
> a polished product from a prototype.

Merges **[S]** p1 ("Most of my experience is building dashboards, product
platforms and proprietary data explorers for cybersecurity, crypto, and gaming
companies. That's where I found a passion for data-driven products and
visualisations.") with the clause the short CV dropped: "and where I learned
what separates a polished product from a prototype" **[M]** p1. **[ED]** for
the join; both halves are source text.

I restored that clause on purpose. It is the only line in either CV that states
a *standard* rather than an activity, and for a senior hire that is the more
interesting claim.

### Rendered paragraph 3

> I've built with AI since the first releases of Copilot and ChatGPT, moving
> from prompt and context engineering to **open-source agent skills** to
> designing **full agent harnesses and automations**. Today an automated fleet
> of AI agents maintains my personal projects.

Sources: **[S]** p1 for the progression; **[M]** p2 for "Today I run an
automated fleet of AI agents that maintain my personal projects" and for
MidJourney being in the original list.

Two edits:

- **[CUT]** MidJourney, listed in **[M]** p2 alongside Copilot and ChatGPT. An
  image generator does not support an AI *engineering* claim, and the line
  reads stronger with two names than three.
- **[ED]** "creating suite of open-source skills" **[S]** p1 → "open-source
  agent skills". The source phrase is missing an article and "suite" is vague;
  "agent skills" matches what the `ai.rj11.io` project actually is per **[M]**
  p2 ("Open source AI skills, plugins, and workflows").

### What I cut from the profile, and why

| Cut | Source | Why |
|---|---|---|
| The full childhood story — modding and reverse-engineering games and consoles, the MUGEN fighting game, running dedicated servers | **[M]** p1, **[S]** p1 "Fun Facts" | Kept, but moved to a single line at the end of page 2 (§9). It is personality, not qualification, so it should not occupy the most-read part of the page. |
| Competitive gaming as management training — leading teams, guilds, and clans to the top of online ladders and LAN wins, "recruiting, coaching, and keeping a roster of hyperactive remote teenagers aligned on one strategy" | **[M]** p1 | Kept in compressed form in §9. The best line in either CV, but it is a *story* about leadership and there is direct evidence of leadership in the job history. |
| "I went professional in 2015 and quickly specialized in frontend TypeScript applications … an early bet on the stack that became the standard for both the web and AI products." | **[M]** p1 | The self-assessment ("an early bet") adds no verifiable information; the date is carried by the job history. |
| "I operate as a self-guided missile: point me at a target and I'll figure out how to hit it on my own … In practice, that has meant wearing every hat a startup has (officially and unofficially), though I default to product engineering, where I have the biggest and most immediate impact." | **[M]** p1 | Memorable, and genuinely useful to an early-stage hiring manager. But it is a claim about temperament with no evidence attached, and it costs three lines. **This is my most debatable cut** — a startup founder might rate it above a bullet. |
| "I've worked with companies across many industries" | **[M]** p1 | The employer list demonstrates it. |
| "For the past few years I've been working as a hands-on B2B freelancer across multiple teams, putting my technical skills to full use, sharing what I know, and learning from the best in their fields." | **[M]** p2 | The current role entry states the freelance arrangement with real dates. See the **[?]** in §2 about "a few years". |
| "I'm always open to exploring exceptional opportunities. Reach out if you're keen on working together. Have a nice day!" | **[M]** p2 | A cover-letter closing. The contact line is the call to action. |

---

## 5. Skills

**The two PDFs use different groupings.** This is the largest structural
conflict between them.

| **[M]** p2 — six rows | **[S]** p1 — four rows |
|---|---|
| Core Stack | Core Stack (identical) |
| AI Engineering | AI Engineering (identical) |
| UI & Design | folded into "UI & Data" |
| Data & Visualisation | folded into "UI & Data" |
| Leadership & Delivery | Leadership & Delivery (identical) |
| Foundations | dropped entirely |

Compressing to four rows is the candidate's own choice for a two-page format,
so I followed it — but I did not copy his four rows exactly. Two changes:

1. I renamed `UI & Data` to **`UI & Data Visualisation`**. "Data" alone is
   vague next to a row of UI tools; the row's actual contents are all about
   visualising data.
2. I restored a compressed **`Foundations`** row. The long CV has it, the short
   CV drops it, and I brought it back because it is the row that answers "can
   this person work outside React?" — a fair question for a candidate whose
   other four rows are all frontend and AI. It also carries the plain keywords
   an applicant tracking system searches for.

### Rendered rows

**Core Stack** — TypeScript · React · Next.js · AI SDK · Convex · Playwright ·
Vercel
**[S+M]**, verbatim. **[ED]** `React.js` → `React`, matching the project's own
naming.

**AI Engineering** — Agent Automations · Custom Agent Skills · Harness
Engineering · Codex · Claude Code · n8n
**[S+M]**, verbatim.

**UI & Data Visualisation** — Tailwind CSS · shadcn/ui · Material-UI · Design
Systems · Storybook · Dashboards · Data Visualisation (d3 · Recharts · Nivo)
Merges **[M]** p2 `UI & Design` and `Data & Visualisation`. **[CUT]**
"Refactoring UI" (a book, not a skill), "Web Scraping" and "Data Enrichment"
(both covered by the current role's scraping-agents bullet). **[ED]** Restored
`Material-UI` from **[M]**, which **[S]** drops — it appears in three separate
job entries (Coalition, Glaiveware) so dropping it left the CV inconsistent
with itself.

**Leadership & Delivery** — Team & Project Management · End-to-End Product
Engineering · Product Design · Agile
**[S+M]**. **[ED]** `Agile Methodologies` → `Agile`. Dropping the second word
reclaimed a whole printed line (§12); "Agile" alone carries the same meaning
and is the more common keyword.

**Foundations** — JavaScript · Node.js · HTML5 · CSS · Git · GitHub Actions ·
REST APIs · CI/CD · Testing
**[M]** p2, verbatim.

---

## 6. Projects

| Project | Dates | Description | Source |
|---|---|---|---|
| **11io** · rj11.io | 2025 – Present | Personal brand for B2B freelancing | **[S]** p1 desc, **[M]** p2 dates |
| **11ai** · ai.rj11.io | 2026 – Present | Open-source AI skills, plugins, and workflows | **[M]** p2 |
| **11bench** · bench.rj11.io | 2026 – Present | Open-source AI benchmarks | **[S]** p1, **[M]** p2 |
| Legacy open-source archive · github.com/ricardojrmcom | 2020 – 2023 | (rendered as a single trailing note) | **[M]** p3 |

Reconciliation notes:

- The short CV lists three projects with descriptions but **no dates**; the long
  CV gives the same three **with dates**. I merged: descriptions from whichever
  is fuller, dates from the long CV. For 11ai the long CV's "skills, plugins,
  and workflows" is fuller than the short CV's "skills and plugins", so I used
  the long one.
- **[?]** The long CV dates 11ai and 11bench `2026 – Present` **[M]** p2. The
  benchmark repository this CV is being built inside is dated July 2026, so
  that is consistent, but a 2026 start date means both projects are at most
  seven months old. I render the dates as given and make no claim about
  maturity.
- **[CUT]** `Modern Github · github.com/rj11io · 2023 – Present · "Modern
  Github for AI open source projects"` **[M]** p3. Dropped as a *project* entry
  because the same address is already in the contact line — listing it twice
  wastes a row. Its date range is not rendered anywhere; that is a small,
  accepted loss.
- **[?]** `github.com/rj11io` is dated `2023 – Present` **[M]** p3, but the
  `11io` brand it belongs to is dated `2025 – Present` **[M]** p2. The GitHub
  account predates the brand. Not a contradiction — accounts get renamed — but
  worth knowing before anyone reads the dates as a single story.
- The legacy GitHub archive is rendered as one low-emphasis line under the
  projects rather than as a fourth project row. It covers 2020–2023 open-source
  output, which is real and otherwise invisible, but it is an archive, not
  active work, and the visual weight should say so.

---

## 7. Experience

Reverse chronological. Dates are identical in both PDFs for every role — I
checked each one — so there are **no date conflicts anywhere in the work
history**. The differences are all about how much detail each PDF carries.

Each entry renders: job title, employer, employer domain (visible as text),
working arrangement, dates, one framing line, then bullets.

---

### 7.1 AI Product Engineer — rj11io

- Domain: rj11.io · **[S+M]**
- Arrangement: B2B · Remote · **[M]** p3
- Dates: Mar 2025 – Present · **[S+M]**

**Framing line (rendered):**
> Hands-on AI product engineering for multiple early-stage startups, built from
> the ground up.
**[M]** p3. **[ED]** "building projects from the ground up" → "built from the
ground up", to fit one printed line (§12).

**The conflict here is coverage.** The long CV lists **nine** project types
**[M]** p3; the short CV folds them into three bullets **[S]** p1 and in doing
so **loses two of the nine**: `Real Estate Platform` and the `n8n Workflows`
half of `AI Smart Scrapping Agents and n8n Workflows`.

I kept all nine, grouped into three bullets by theme. Grouping costs nothing;
dropping a whole industry does.

**Rendered bullets:**

1. **AI product builds** — data extraction from PDFs, SEO analytics, a GenAI
   dermatopathology portal, AI chat and custom GPT experiences, and a real
   estate platform
2. **Cybersecurity dashboards and proprietary data explorers**, across several
   clients
3. **Agent harnesses, custom skills, and automations** — plus scraping agents
   and n8n workflows

Notes:

- **[ED]** Source writes "AI Smart Scrapping Agents" **[M]** p3. `Scrapping`
  is a typo for `Scraping`. Corrected. Recording it because correcting spelling
  in a source is still a change. I also dropped `Smart`, which is marketing
  filler, to fit one printed line (§12).
- **[ED]** The long CV prefixes three items with "Multiple" (`Multiple
  Cybersecurity Dashboards`, `Multiple Proprietary Data Explorers`, `Multiple
  AI Chats / GPT Experiences`). Rendered once as "across several clients" rather
  than three times, which reads as a list of one client's work repeated.
- **[ED]** `GenAI Dermatopathology Portal` — kept exactly. Dermatopathology is
  the study of skin disease under a microscope. It is a specific, verifiable,
  unusual domain and it is the single most credible AI-product claim in the CV.
  I resisted simplifying it to "medical imaging".
- **[?]** No client is named for any of these nine. That is normal for B2B
  contract work under confidentiality, but a hiring manager will ask. Not
  something I can fix from the sources.

---

### 7.2 Product / Datavis Engineer — Hunt Intelligence, Inc.

- Domain: hunt.io · **[S+M]**
- Arrangement: B2B · Remote · **[M]** p3
- Dates: Apr 2024 – Mar 2025 · **[S+M]**

**Framing line (rendered):**
> Data visualisation for a threat-intelligence product — my specialty, and the
> reason I took the role.

**[ED]**. The long CV says "Left OMEGA to go deep on my specialty, data
visualisation for a threat-intelligence product" **[M]** p3; the short CV says
"Went deep on my specialty: data visualisation for a threat-intelligence
product" **[S]** p2. I dropped "Left OMEGA" — a CV should not spend words on
why the previous job ended, and the dates already show the move — while keeping
the motive, which is the useful part.

**[?]** "Threat intelligence" means collecting and analysing data about active
online attackers. The CV does not spell this out. I left the term as-is because
it is standard vocabulary in the security industry this role targets, and
explaining it inside the entry would patronise the reader who matters.

**Rendered bullets:**

1. **AttackCapture™ and HuntSQL™** — built core product modules
2. **IP History Widget** and other custom data-visualisation components
3. **New API documentation platform on OpenAPI** — enriched the raw
   `openapi.json` with metadata and shipped a UI friendlier than Swagger
4. **Modern TypeScript foundation** — latest Next.js and shadcn/ui, production
   and staging on Vercel, Playwright end-to-end tests, CI/CD on GitHub Actions,
   release changelogs into Slack

All four are **[M]** p3 verbatim in substance. Two things the short CV dropped
and I restored:

- "production and staging environments on Vercel … and automated release
  changelogs hooked up to Slack" **[M]** p3. Release automation into a team
  channel is a delivery-discipline signal, not a tool list.
- "enriched the raw openapi.json with metadata" **[M]** p3. Without it, "built
  a documentation platform" is vague; with it, the actual engineering is
  visible.

**[ED]** Bullet order changed. The long CV leads with the TypeScript
foundation; I moved it last and led with the named product modules, because
`AttackCapture™` and `HuntSQL™` are the shipped things a reader recognises and
the research says the first words of a bullet are what gets read
(`research.md` §1.2). **[ED]** "friendlier and more intuitive than Swagger"
→ "friendlier than Swagger" — "more intuitive" says the same thing twice.

---

### 7.3 Senior Frontend Engineer → Team Lead — OMEGA Systems

- Domain: omegasys.eu · **[S+M]**
- Arrangement: Remote · **[M]** p4
- Dates: Jun 2023 – Apr 2024 · **[S+M]**
- Title with the promotion arrow: **[S+M]** verbatim, including the `→`.

**Framing line (rendered):**
> Joined to build the next generation of OMEGA's iGaming platform management
> system (CORE5) with TypeScript and React. Promoted to lead the frontend team.
**[M]** p4, verbatim.

**Rendered bullets:**

1. **Data visualisation for the Main and Social dashboards**, plus report and
   configuration views — Cashback, Refer-a-Friend, Pending Withdrawals,
   Challenges / Leaderboards
2. **Localisation module and an internal "Tab System" UI**
3. **As lead: developer onboarding experience**, and standards for tickets,
   documentation, and remote / async work, with a strong emphasis on the
   Definition of Done
4. **Weekly "TED" talks** to bring the whole team up to speed on technology and
   product

All from **[M]** p4. The short CV keeps only a compressed version of bullets 1
and 3 **[S]** p2.

Restored on purpose:

- The **named report views**. The short CV says "report and configuration
  views"; the long CV names four. Named artefacts beat categories.
- The **localisation module and Tab System**. Concrete shipped internal
  systems.
- The **"Definition of Done"** emphasis and the **weekly talks**. These two are
  the clearest evidence in the whole CV of leadership *practice* rather than
  leadership *title* — which is exactly what a senior hire is screened on.

**[CUT]** "Kept shipping: product-engineered new features from scratch, end to
end" **[M]** p4. True and relevant, but it restates the job title. The four
bullets above are more specific.

**[ED]** "localisation / internationalisation module" → "localisation module".
The two words mean the same thing here and the source uses both.

**[?]** iGaming means online gambling and betting. Kept as-is: it is the
industry's own word and a reader in that industry expects it.

---

### 7.4 Senior Frontend Engineer — Phantasma Chain

- Domain: phantasma.info · **[S+M]**
- Arrangement: Remote · **[M]** p4
- Dates: Jan 2022 – May 2023 · **[S+M]**

**Framing line (rendered):**
> Frontend for a blockchain platform: monorepo, design system, and public block
> explorer.

**[ED]** — neither PDF has a framing line for this role; both go straight to
bullets. I wrote one from the bullets' own contents so this entry matches the
structure of the entries around it. It introduces two words not in the source:
"blockchain" and "design system". Justification: the long CV names the employer
"Phantasma Chain" and the short CV's profile lists "crypto" among his
industries **[S]** p1, so blockchain is stated, not inferred. "Design system"
describes a Storybook — a tool for building and documenting a library of UI
components — and Storybook plus "Design Systems" both appear in the skills list
**[S+M]**. Still, this is the most editorial line in the document and I am
flagging it as such.

**Rendered bullets:**

1. **Frontend monorepo** for all new tools and apps
2. **Phantasma UI Storybook** — designed and developed the component library
3. **Phantasma Explorer** — the public block explorer
4. **In-house tooling** — SDK React hook, localisation, white-label theming,
   env configs
5. **Contributed improvements to the Phantasma TypeScript SDK**; Playwright
   tests, CI and CD

Bullets 1–3 and 5 are **[S+M]**; bullet 4 is **[M]** p4 only, dropped by the
short CV.

**[ED]** "the public block explorer" is my gloss on `Phantasma Explorer`
**[S+M]**. A block explorer is the website that lets anyone look up
transactions on a blockchain. Without the gloss, "Explorer" is unreadable to a
non-crypto reviewer. It is a description of a named product, not a new claim.

**[ED]** I merged the SDK contribution with the testing and CI/CD line, which
are separate bullets in the source. Both are "quality and tooling"; separately
they were the two thinnest bullets in the entry.

**[?]** The long CV lists "Designed and developed the Phantasma UI Storybook"
**[M]** p4 — "designed" could mean visual design or software design. I rendered
"designed and developed" without resolving it.

---

### 7.5 Frontend Lead — BinaryEdge · Coalition, Inc.

- Domain: coalitioninc.com · **[S+M]**
- Arrangement: Remote · **[M]** p5
- Dates: Feb 2020 – Oct 2021 · **[S+M]**

**[?] Employer naming.** Both PDFs write the employer as two names with one
domain: `BinaryEdge · Coalition, Inc. · coalitioninc.com` **[S]** p2, **[M]**
p5. The long CV adds "Frontend Engineer and Tech Lead for BinaryEdge and
Coalition's Customer Security team" **[M]** p5. **[INF]** The obvious reading is
that BinaryEdge was acquired by or merged into Coalition during or before this
role — that would explain one domain, two names, and a "Customer Security team"
spanning both. **I did not render that inference.** I render both names exactly
as the sources write them and let the reader draw their own conclusion. Stating
an acquisition would be inventing a corporate event.

**Framing line (rendered):**
> Tech lead for BinaryEdge and Coalition's Customer Security team. Started as
> the solo frontend engineer and grew a team; introduced React, TypeScript,
> Next.js, Nivo, and micro frontends.

**[M]** p5, compressed. **[ED]** "plus the concept of micro frontends" folded
into the same list; "around customer-facing security apps and internal tools"
and `Material-UI` cut to fit two printed lines (§12). Material-UI still appears
in the Skills block, so it is not lost from the document.

Micro frontends means splitting one web application into separately built and
deployed pieces. I let the term stand: the audience for this line is technical.

**Rendered bullets:**

1. **Attack Surface Monitoring (ASM)** on the BinaryEdge Portal as a micro
   frontend, later integrated into Coalition Explorer and Coalition Control
2. **Tech lead for Coalition Explorer** and Explorer 2.0 — critical internal
   tools for the whole company: claims management, report generation, security
   review, Executive Risks
3. **Tech lead for the Coalition Storybook**, the Customer Security web UI
   component library
4. **Migrated frontend CI/CD from Drone to GitHub Actions**, improving pipelines
   and environments

All **[M]** p5. The short CV keeps only compressed versions of 1 and part of 2
**[S]** p2.

Restored on purpose:

- **Coalition Explorer 2.0** and the four platforms inside Explorer. This is
  the largest-scope work in the CV — internal tooling for a whole company — and
  the short CV loses almost all of it.
- **The Drone → GitHub Actions migration.** A named infrastructure migration is
  exactly the senior signal the research says reviewers screen for
  (`research.md` §3.1), and it is the only migration named anywhere in the CV.

**[CUT]** "Tech Lead for the RSA and Security Week marketing pages" **[M]**
p5. Real work, but marketing pages are the least senior item in an entry that
already has three "tech lead for…" bullets, and this entry has to fit
alongside two others on page 2. **[ED]** I also collapsed three separate "Tech
Lead for…" bullets into two, since the repetition was doing the work of
emphasis without adding facts.

---

### 7.6 Earlier career — condensed

The long CV gives these five roles a full entry each **[M]** pp5–6. The short
CV compresses **four of them** into one running sentence **[S]** p2 — and
**drops the fifth entirely**.

**The omission:** `Java Developer · Science4you · Lisbon, Portugal · Jan 2015 –
Mar 2015` **[M]** p6 appears nowhere in the short CV. It is his first
professional role — an internship building an order-management system for an
online store in Java and MySQL, which grew from a print tool into a full
application handling orders, reports, and automated customer emails.

**I restored it.** Two reasons. It is the start date that makes "went
professional in 2015" **[M]** p1 true, so without it the timeline has an
unexplained gap. And it is the only non-JavaScript, non-frontend role in the
history, which is worth one line.

I also verified every earlier date across both PDFs. The short CV's parenthetical
years agree with the long CV's months in every case:

| Role | Long CV **[M]** | Short CV **[S]** p2 | Agree? |
|---|---|---|---|
| Glaiveware | Mar 2018 – Dec 2019 | (2018 – 2019) | ✓ |
| Sycret.ink | Jan 2017 – Dec 2017 | (2017) | ✓ |
| American Heart Association | Sep 2016 – Nov 2016 | (2016) | ✓ |
| NextBitt | Oct 2015 – Jul 2016 | (2015 – 2016) | ✓ |
| Science4you | Jan 2015 – Mar 2015 | *absent* | omission |

**Rendered as five one-line entries** (title · employer · dates · one clause),
not as a running sentence. A sentence hides the dates inside prose; five aligned
lines keep the timeline scannable, which the research says is how dates get read
(`research.md` §1.1). It costs about four extra lines of height.

| Rendered line | Source |
|---|---|
| **Fullstack Engineer, Co-Founder** · Glaiveware · Mar 2018 – Dec 2019 — Co-founded a studio building bespoke web apps; React, Redux, Node, Express, AWS — plus the business | **[M]** p5 |
| **React Native Developer** · Sycret.ink · Jan 2017 – Dec 2017 — Mobile chat app with end-to-end encryption, serverless, under contract with a team of three | **[M]** p6 |
| **Full Stack JavaScript Developer** · American Heart Association · Sep 2016 – Nov 2016 — Admin dashboard for the AHA's Kinect integration; won on a university scholarship | **[M]** p6 |
| **Frontend Developer** · NextBitt · Oct 2015 – Jul 2016 — Analytics dashboards, reporting, auditing, and management tools for facilities management software | **[M]** p6 |
| **Java Developer** · Science4you · Jan 2015 – Mar 2015 — Internship: order-management system for the online store in Java and MySQL, replacing manual work | **[M]** p6 |

Each note is trimmed to **one printed line**. That constraint set their exact
length, and §12 records what each one lost.

Compression notes:

- **[ED]** Glaiveware's five-bullet technology list **[M]** p5 — React, Redux,
  Redux-Saga, Next.js, Node, Express, Material-UI, HTML5/CSS3 (Bootstrap 4,
  SASS), MongoDB, Firebase, MySQL, SQLite, AWS (EC2, S3, SES, API Gateway,
  Lambda), Ubuntu, nginx, plus SEO/SEM, branding, marketing, copywriting — is
  compressed to a representative handful. A 2018 tool list does not earn
  fifteen lines on a 2026 CV. **[CUT]** the non-engineering half
  (SEO/SEM, branding, marketing, copywriting) — real, but it dilutes the
  engineering read and the profile already covers the "every hat" ground.
- **[ED]** "A great learning experience that taught me how to manage projects
  and run a business creating bespoke web apps above market standards" **[M]**
  p5 → "plus the business around them". Same fact, one-tenth the words, and it
  drops the self-assessment "above market standards".
- **[CUT]** "Learned a lot about encryption protocols and mobile app
  deployment" and the tool list `React Native, libsignal-protocol, Android
  Studio, AWS (API Gateway, Lambda), SQLite` **[M]** p6. `libsignal-protocol`
  is the strongest single detail here and losing it is a real cost; "end-to-end
  encryption" carries the substance.
- **[CUT]** From the AHA entry: "printed reports, and let superusers manage the
  whole system … with free choice of technology, so I built my first web app as
  a full-stack JavaScript developer, using React and Node" **[M]** p6. The
  React-in-2016 fact this line supports is stated in the profile instead, where
  it does more work. Kept "won through a university scholarship" — it is a
  small competitive credential.
- **[CUT]** NextBitt's technology detail: "JavaScript (jQuery, Angular.js),
  .NET (C#, MVC), HTML5 + CSS3", "Heavy date/time logic (Moment.js, date
  pickers) and data visualisation (Google Charts, dygraphs, Chart.js, d3.js,
  C3.js, and more)" **[M]** p6. **Notable loss:** this is where the
  data-visualisation specialisation demonstrably starts, in 2015, with six named
  libraries. It is the deepest root of the CV's central claim. But it is also
  eleven years old and the stack is obsolete, and the same claim is proved by
  three recent roles.
- **[CUT]** Science4you's detail about the system growing from a
  display-and-print tool into a full application "which all were previously
  done by hand" **[M]** p6 — partly kept as "replacing a manual back-office
  process", which is the one line of business impact in that entry.

---

## 8. Education

**Rendered:**

> **IT Systems Management and Programming** · 2013 – 2016
> Escola Profissional de Tecnologia Digital · Lisbon, Portugal
> Técnico de Gestão e Programação de Sistemas Informáticos

- Course, school, dates: **[S+M]** — no conflict.
- Location `Lisbon, Portugal`: **[M]** p6 only.
- Portuguese qualification name: **[M]** p6 only, kept verbatim including
  accents. It is the official name of the qualification and it is what a
  Portuguese employer or a credential check will look for. The short CV drops
  it; restoring it costs one line.

**[?]** Neither PDF says the qualification was completed, or names a grade or a
degree level. The type — *Escola Profissional*, a Portuguese vocational
secondary school — implies a secondary-level technical qualification rather
than a university degree. **[INF] Not rendered.** I state the school and course
exactly as given and make no claim about level, completion, or grade. There is
no university degree listed in either PDF; the American Heart Association entry
mentions "a university scholarship" **[M]** p6, which is not the same as a
degree and which I did not stretch into one.

---

## 9. Beyond work

**Rendered as one compact block:**

> **2008 robotics world cup** — second nationally and a final-four finish in
> China, programming LEGO Mindstorms at 14. Led teams and clans to the top of
> online ladders and to LAN tournament wins: recruiting, coaching, and keeping a
> remote roster on one strategy — management training in disguise. Before that:
> modding and reverse-engineering games and consoles, and a fighting game built
> on MUGEN.

Sources: robotics from **[S]** p1 and **[M]** p1 (the "at 14" and "science
class" detail is **[M]** only); gaming leadership from **[M]** p1; modding,
MUGEN, and servers from **[S]** p1 and **[M]** p1.

Decisions:

- **Kept, and kept last.** The short CV gives this a full "Fun Facts" section
  near the top of page 1 **[S]** p1; the long CV opens with it **[M]** p1. I
  moved it to the end of page 2. It is genuinely differentiating — a robotics
  world cup placement is a real competitive result, and the gaming-leadership
  line is the most memorable thing in either document — but nothing here is a
  professional qualification, so it must not occupy the space where a recruiter
  spends their first seven seconds.
- **[ED]** "a roster of hyperactive remote teenagers" **[M]** p1 → "a remote
  roster". The original is funnier. I cut it because the joke depends on
  calling the people he managed hyperactive teenagers, which reads differently
  on a CV than in a personal essay, and the management point survives without
  it. **A reasonable person could put the original back** — it is the line most
  likely to be remembered.
- **[ED]** "management training in disguise" **[M]** p1 restored. It is the
  clause that explains why gaming is on an engineering CV at all, and without
  it the sentence is just a list of hobbies.
- **[CUT]** The dedicated game servers — "Counter-Strike, Minecraft, and half
  the titles I grew up on" **[M]** p1, "Counter-Strike, Minecraft, and other
  titles" **[S]** p1. Cut to fit the section into four printed lines (§12).
  Running game servers is the most infrastructure-flavoured item in the
  childhood story, so this is the loss I like least in §12.
- **[INF] Not rendered:** "At 14" **[M]** p1 plus the 2008 world cup date
  implies a birth year around 1993–1994, and therefore an age. I did not
  compute, state, or imply an age anywhere. Age is not a CV fact and it is
  protected information in hiring.

---

## 10. Footer

**Rendered:**

> This is the short version. The full story: **cv.rj11.io/v1/max** — Updated
> July 2026

- The pointer to the long version is **[S]** p2: "This is the minified version
  of my CV. Read the full story at cv.rj11.io/v1/max". **[ED]** "minified" →
  "short". Minified is a build-tool word for stripped-down code; on a CV read
  by a recruiter it is jargon for no benefit.
- **[INF] "Updated July 2026"** is mine, from the repository's own date, not
  from either PDF. It is a fact about the document rather than about the
  candidate, and a dated CV is more trustworthy than an undated one. Flagging
  it because it is the only rendered string with no PDF source.

---

## 11. Two-page budget

What is on which page, and why.

**Page 1** — masthead and contacts · standfirst · profile · skills · projects ·
Experience: rj11io, Hunt Intelligence

**Page 2** — running head · Experience continued: OMEGA, Phantasma,
BinaryEdge/Coalition · earlier career · education · beyond work · footer

The split puts the two most recent roles — the AI work and the
data-visualisation work, the two things the CV is selling — on page 1 with the
profile, skills, and live projects. Page 2 carries the depth that proves it.
Anyone who reads only page 1 gets the complete current picture.

The break falls between two whole job entries, never inside one. Page 2 opens
with a running head naming the candidate and "Page 2 of 2", because a printed
page 2 gets separated from page 1 on a desk.

### Net effect of my choices versus the short CV

**Restored** (in the long CV, dropped by the short CV, back in mine):
Science4you as a real entry · the four named OMEGA report views · the OMEGA
localisation module and Tab System · the Definition of Done emphasis · the
weekly team talks · Phantasma's in-house tooling bullet · Coalition Explorer
2.0 and its four internal platforms · the Drone → GitHub Actions migration ·
Hunt's Vercel environments and Slack changelogs · the OpenAPI metadata
enrichment · Material-UI in the skills · the Foundations skills row · project
dates · the legacy GitHub archive · education location and Portuguese
qualification name · "what separates a polished product from a prototype" ·
`Real Estate Platform` and `n8n workflows` from the current role.

**Cut** (in a source, not in mine): the self-guided-missile passage · the
"exceptional opportunities" closing · MidJourney · Refactoring UI · the RSA and
Security Week marketing pages · "Kept shipping" at OMEGA · Glaiveware's full
fifteen-item stack and its marketing/SEO half · Sycret.ink's tool list
including `libsignal-protocol` · NextBitt's six named charting libraries ·
`Modern Github` as a separate project row · the "RJ" nickname · the "few years
freelancing" phrasing.

**The trade in one sentence:** I spent the space the long CV wastes on
temperament and obsolete tool lists, and bought named shipped systems, named
internal platforms, and a migration — the things a senior reviewer screens for.

Everything above describes the first editing pass. Once the route was built and
printed, the result measured **four** A4 pages, and a second pass was needed to
reach two. Every wording change that pass made — and what each one cost — is in
§12.

### Known weaknesses of the result

- **No quantified outcomes.** Not one percentage, user count, latency figure,
  or revenue number, because neither source PDF contains one and inventing them
  is out. Current hiring advice weights quantified impact heavily
  (`research.md` §3.1), so this is the CV's biggest gap against the market.
  **Fixing it needs the candidate, not an editor.** Concretely: how many
  engineers reported to him at OMEGA and Coalition; roughly how many users or
  customers Coalition Explorer and AttackCapture™ serve; what the Drone →
  GitHub Actions migration did to build times.
- **No named clients for the current role**, covering sixteen months and nine
  project types. Understandable under contract confidentiality, and it will
  still be asked about.
- **The "decade of TypeScript" claim is unverified** by the candidate's own
  role details (§3), and unresolvable from the sources.
- **Project maturity is thin.** Two of the three flagship open-source projects
  started in 2026 (§6).

---

## 12. Second compression pass — the print fit

The content above was written first, then the route was built, then the printed
result was **measured**. It came out at four A4 pages. Getting to exactly two
took a second editing pass, and because that pass changed wording, it belongs
in the audit trail rather than in the design notes only.

Roughly half the gap closed through typography (smaller type, tighter leading
and gaps — `design.md` §8). The other half is the wording changes below.

### How the cuts were chosen

I pulled the text back out of the printed PDF line by line and looked at the
**length of each line**. That exposed bullets ending in a nearly-empty line —
`"n8n workflows"` (13 characters), `"Executive Risks"` (15), `"its data
visualisations"` (23), `"and developer experience"` (24), `"GitHub Actions, CD
on Vercel"` (28). Cutting a handful of words from those bullets reclaimed a
whole line each at almost no cost in meaning, which is why most of the space
came from tightening rather than from deleting content.

Where a cut did lose information, it is listed below with where that
information still survives.

### The ledger

| Where | Cut or changed | Information lost | Still stated? |
|---|---|---|---|
| Skills | `Agile Methodologies` → `Agile` | none | — |
| rj11io framing | "building projects from the ground up" → "built from the ground up" | none | — |
| rj11io bullet 3 | `Smart` dropped from "smart scraping agents" | none — marketing filler | — |
| Hunt bullet 4 | "end-to-end tests with Playwright" → "Playwright end-to-end tests"; "automated release changelogs" → "release changelogs" | the word "automated" | implied by "release changelogs into Slack" |
| Phantasma bullet 4 | dropped "a custom API / scripts / hooks module", and "a custom React hook for the Phantasma SDK" → "SDK React hook" | one named in-house module | no — a real loss, the smallest item in the entry |
| Phantasma bullet 5 | "CI on GitHub Actions, CD on Vercel" → "CI and CD" | the two tool names | yes — both named in the Hunt entry and in Skills |
| Coalition framing | dropped "Frontend engineer and", "around customer-facing security apps and internal tools", and `Material-UI` | what the team worked on | partly — the four bullets show it; Material-UI is in Skills |
| Coalition bullet 2 | dropped "the more ambitious", "housing" | a judgement, not a fact | — |
| Coalition bullet 3 | dropped "and its data visualisations" | one instance of the data-vis claim | yes — profile, Hunt, OMEGA, and Skills all carry it |
| Coalition bullet 4 | dropped "and developer experience" | none material | — |
| Earlier × 5 | every note trimmed to one line | Glaiveware "above market standards" framing; Sycret.ink "in a serverless environment" → "serverless"; AHA "connecting doctors, patients, and collected data"; NextBitt "asset and"; Science4you "back-office" | mostly no — these are the thinnest lines in the document, which is why they were chosen |
| Beyond | dropped the dedicated game servers (Counter-Strike, Minecraft); "teams, guilds, and clans" → "teams and clans"; restored "management training in disguise" | the game-server detail | no — see §9 |

### What was *not* cut, under pressure

Listing these because refusing a cut is also a decision:

- **Science4you** stayed, even though it is a three-month internship from 2015
  and cutting it would have saved two lines. Without it the "went professional
  in 2015" timeline has an unexplained gap (§7.6).
- **The Definition of Done emphasis and the weekly team talks** at OMEGA stayed.
  They are the clearest evidence of leadership practice rather than leadership
  title (§7.3).
- **The Drone → GitHub Actions migration** stayed. It is the only named
  migration in the CV and exactly the senior signal reviewers screen for
  (`research.md` §3.1).
- **The Foundations skills row** stayed, despite being the row the candidate's
  own short CV drops (§5).
- **The Portuguese qualification name** stayed (§8).
- **No metric was invented** to fill the gap the research says matters most
  (§11).

### Slack, so this is repeatable

The final layout holds **about 8mm of headroom** on the tighter of the two
pages — roughly two lines of body text — measured by raising the page's bottom
margin until a third page appeared (`design.md` §8). So a small future edit will
not silently push the CV onto three pages, and there is room to restore one of
the cuts above if the candidate would rather have it back.
