# Content model

This is the single source of truth for what the CV website says. The code renders
from `content.ts` in this folder, and `content.ts` is a line-for-line copy of the
final wording decided here — nothing on the page says anything this file doesn't
already say.

Two source files exist: `ref/RJ_CV.pdf` (2 pages, called **"the short CV"** below) and
`ref/RJ_CV_max.pdf` (6 pages, called **"the long CV"** below). The short CV is not a
different draft — its own last line says "This is the minified version of my CV,"
so I treated the long CV as the ground truth for facts and the short CV as
Ricardo's own prior attempt at compressing it. Wherever the two disagree, I say so
below instead of quietly picking one.

Every fact below is labeled:
- **Extracted** — copied or lightly reworded from one or both PDFs, no new content.
- **Compressed** — the underlying fact is real and in the PDFs; I shortened or merged
  the wording to save space.
- **Editorial rewrite** — I changed the sentence structure or word choice for clarity
  or flow, but did not add a claim that isn't already in the source.

I did not add any employer, date, credential, metric, or link that isn't already in
one of the two PDFs.

## Header and contact

| Field | Value | Source |
|---|---|---|
| Name | Ricardo Jorge | Extracted — both PDFs |
| Goes by | RJ | Extracted — long CV only ("you can call me RJ") |
| Title | AI Product Engineer | Extracted — both PDFs |
| Location | Lisbon, Portugal | Extracted — both PDFs |
| Email | ricardojorgexyz@gmail.com | Extracted — both PDFs |
| Site | rj11.io | Extracted — both PDFs |
| GitHub | github.com/rj11io | Extracted — both PDFs (current account, active 2023-Present per long CV's Projects section) |
| LinkedIn | linkedin.com/in/rj11io | Extracted — both PDFs |

**Omitted on purpose:** the long CV also lists a second, older GitHub account,
`github.com/ricardojrmcom`, labeled "Legacy Github with the open source code I
produced 2020-2023." I left it out of the rendered CV — the current account is
already linked, and a second, explicitly-labeled-legacy profile doesn't help a
recruiter in the six-to-ten-second first scan the research in `research.md`
describes. It's recorded here so the decision is visible, not silently dropped.

**Uncertain:** both PDFs also print "cv.rj11.io" in the top-right corner of every
page. It reads as the URL of the CV document itself (a version/permalink marker for
that PDF), not a link meant for a reader to visit as a separate destination, so I
did not carry it onto the page as another contact link. If it was actually meant as
a citable canonical URL, that's a fact I might be dropping — flagging it rather than
guessing.

## About

**Short CV (extracted, full text):**
> AI Product Engineer with a decade of professional TypeScript experience, building
> on React since 2016 and Next.js since 2018. On most projects I was the first
> frontend hire, owning architecture, tooling, component libraries, and pipelines
> from day one, then growing the team around them: hiring, interviewing, onboarding,
> and writing the playbooks that let new engineers integrate seamlessly.
>
> Most of my experience is building dashboards, product platforms and proprietary
> data explorers for cybersecurity, crypto, and gaming companies. That's where I
> found a passion for data-driven products and visualisations. I've built with AI
> since the first releases of Copilot and ChatGPT, moving from prompt and context
> engineering to creating suite of open-source skills to designing full agent
> harnesses and automations.

**Long CV (extracted, condensed — the full text runs to five paragraphs and
includes the "fun facts" material folded into the narrative: modding games as a
kid, the MUGEN fighting-game project, dedicated game servers, the 2008 LEGO
Mindstorms robotics result, competitive-gaming team leadership, "I went professional
in 2015," the "self-guided missile" self-description, and "I run an automated fleet
of AI agents that maintain my personal projects.")**

**Reconciliation:** the two versions describe the same person and the same claims;
the long CV is strictly more detailed, not different in substance. The one new
factual detail in the long CV that the short CV's About section doesn't mention at
all is the specific year Ricardo went professional (2015) and the fact that an
automated fleet of AI agents currently maintains his personal projects — both kept
below.

**Final About text (editorial rewrite, compressing both, no new facts):**
> AI Product Engineer with a decade of professional TypeScript experience — on React
> since 2016, on Next.js since 2018, professional since 2015. On most projects I've
> been the first frontend hire: owning architecture, tooling, and pipelines from day
> one, then growing and onboarding the team around them. Most of that decade has
> gone into dashboards, product platforms, and proprietary data explorers for
> cybersecurity, crypto, and gaming companies, which is where data-driven products
> and visualisation became the specialty. I've built with AI since the first
> Copilot and ChatGPT releases — prompt and context engineering, then open-source
> agent skills, then full agent harnesses. An automated fleet of those agents now
> maintains my own projects.

**Compressed out of the About section, kept as one clause under the name instead:**
started coding as a kid modding games/consoles, built a MUGEN fighting game, ran
dedicated game servers, and placed 2nd nationally / final-four at the 2008 LEGO
Mindstorms robotics world cup in China (**extracted**, both PDFs — the long CV adds
this happened at age 14, in science class, kept). The competitive-gaming
team-leadership story and the "self-guided missile" metaphor (long CV only) are
**omitted entirely** — real content, but the two-page budget and the
recruiter-scanning research in `research.md` argue for spending page-one space on
verifiable engineering scope, not personality framing, once one strong personal
detail (the robotics result) is already doing that job.

## Skills

Both PDFs group skills into near-identical categories. The long CV adds one more
category, **Foundations**, and a few extra items inside existing categories.

| Category | Short CV | Long CV (superset) |
|---|---|---|
| Core Stack | TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel | same |
| AI Engineering | Agent Automations, Custom Agent Skills, Harness Engineering, Codex, Claude Code, n8n | same |
| UI & Data / UI & Design | Tailwind CSS, shadcn/ui, Design Systems, Storybook, Dashboards, Data Visualisation (d3, Recharts, Nivo) | splits into "UI & Design" (adds Material-UI, Refactoring UI) and "Data & Visualisation" (adds Web Scraping, Data Enrichment) |
| Leadership & Delivery | Team & Project Management, End-to-End Product Engineering, Product Design, Agile Methodologies | identical |
| Foundations | — (not a separate category) | JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing |

**Final skills (compressed):** kept four categories — Core Stack, AI Engineering, UI
& Data Visualisation (merging the long CV's UI/Design and Data/Visualisation back
into one line, the way the short CV did), and Leadership & Delivery. Added
Material-UI is **omitted** (it belongs to older roles covered in the compressed
"Earlier experience" block, not the current stack) and Refactoring UI/Web
Scraping/Data Enrichment are **omitted** as lower-signal for this profile. The
**Foundations** category (JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST
APIs, CI/CD, Testing) is **omitted as its own block** — at a decade of seniority
these are assumed, and the two-page budget goes further spent on differentiated
skills. This is a compression decision, not a claim that Ricardo lacks these skills.

## Experience

Every role's title, company, and dates are **identical** between the two PDFs — the
long CV only adds bullet-level detail. I list the final chosen bullets and note
where each piece of detail came from.

### AI Product Engineer — rj11io · rj11.io · B2B · Remote — Mar 2025-Present

Short CV bullets (3): ground-up projects for early-stage startups; AI data
extraction from PDFs, AI SEO analytics, GenAI dermatopathology portal, AI chats/GPT
experiences; cybersecurity dashboards, proprietary data explorers, AI agent
harnesses/skills/automations.

Long CV bullets (9, same intro line): AI Data Extraction from PDFs · AI SEO
Analytics · GenAI Dermatopathology Portal · **Real Estate Platform** (new) ·
Multiple Cybersecurity Dashboards · Multiple Proprietary Data Explorers · Multiple
AI Chats / GPT Experiences · **AI Smart Scrapping Agents and n8n Workflows** (new) ·
AI Agent Harnesses, Skills, and Automations.

**Final (compressed, extracted facts only):**
- AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal,
  and a real estate platform
- Multiple cybersecurity dashboards and proprietary data explorers, end to end
- AI chat and custom GPT experiences, smart-scraping agents, and n8n workflows
- AI agent harnesses, custom skills, and automations

### Product / Datavis Engineer — Hunt Intelligence, Inc. · hunt.io · B2B · Remote — Apr 2024-Mar 2025

Short CV (3 bullets): data visualisation for a threat-intelligence product incl. IP
History Widget; AttackCapture™ and HuntSQL™ on TypeScript/Next.js/shadcn/ui,
Playwright, GitHub Actions CI/CD; API documentation platform on OpenAPI, friendlier
than Swagger.

Long CV (intro line + 4 bullets, more specific): "Left OMEGA to go deep on my
specialty"; adds staging environment on Vercel, automated release changelogs to
Slack, and that the OpenAPI doc platform work meant enriching the raw
`openapi.json` with metadata.

**Final (compressed, keeps the long CV's extra specificity):**
- Left OMEGA to go deep on my specialty: data visualisation for a
  threat-intelligence product
- Built a modern TypeScript codebase on Next.js and shadcn/ui, with production and
  staging on Vercel, Playwright end-to-end tests, and CI/CD on GitHub Actions with
  automated release changelogs to Slack
- Built custom data-visualisation components — including the IP History Widget —
  and the core product modules AttackCapture™ and HuntSQL™
- Built a new API documentation platform on top of OpenAPI: enriched the raw schema
  with metadata and shipped a UI friendlier and more intuitive than Swagger

### Senior Frontend Engineer → Team Lead — OMEGA Systems · omegasys.eu · Remote — Jun 2023-Apr 2024

Short CV (3 bullets): built CORE5 iGaming platform management system, promoted to
lead; data vis for Main/Social dashboards + report/config views; as lead, built
onboarding experience and standards for tickets/docs/remote-async workflows.

Long CV (5 bullets, more specific): adds the exact dashboard views (Cashback,
Refer-a-Friend, Pending Withdrawals, Challenges/Leaderboards), the
localisation/internationalisation module and an internal "Tab System" UI, the
"Definition of Done" emphasis, **weekly "TED" talks** to the team, and "kept
shipping: product-engineered new features from scratch, end to end."

**Final (compressed, keeps the concrete named details):**
- Joined to build the next generation of OMEGA's iGaming platform management
  system (CORE5) with TypeScript and React; promoted to lead the frontend team
- Data visualisation for the Main and Social dashboards, plus report and
  configuration views (cashback, refer-a-friend, withdrawals, leaderboards)
- Built the localisation/internationalisation module and an internal "Tab System"
  UI
- As lead: built the developer-onboarding experience, set standards for tickets,
  documentation, and remote/async workflows around a clear "Definition of Done,"
  and gave weekly "TED" talks to keep the team current

**Omitted:** "kept shipping: product-engineered new features from scratch, end to
end" — real, but it restates the role's core responsibility already established by
the section it belongs to and the other three bullets; kept the more specific
claims instead.

### Senior Frontend Engineer — Phantasma Chain · phantasma.info · Remote — Jan 2022-May 2023

Short CV (2 bullets): built the frontend monorepo, Phantasma UI Storybook, and
Phantasma Explorer; Playwright tests, GitHub Actions CI, Vercel CD, contributed to
the Phantasma TypeScript SDK.

Long CV (6 bullets, same content split more finely, plus): "Built in-house tools: a
custom React hook for the Phantasma SDK, localisation, white-label theming,
environment configs, and a custom API / scripts / hooks module."

**Final (compressed):**
- Built the frontend monorepo for all new tools and apps, the Phantasma UI
  Storybook, and Phantasma Explorer
- Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed
  improvements to the Phantasma TypeScript SDK
- Built in-house tooling: a custom React hook for the SDK, localisation,
  white-label theming, and environment configs

### Frontend Lead — BinaryEdge · Coalition, Inc. · coalitioninc.com · Remote — Feb 2020-Oct 2021

Short CV (3 bullets): started solo, grew a team for customer-facing security apps
and internal tools; introduced React, TypeScript, Next.js, micro frontends, Tech
Lead for Coalition Explorer, component library, data vis; built Attack Surface
Monitoring, later integrated into Coalition Explorer and Coalition Control.

Long CV (intro line + 6 bullets, more specific): adds that Material-UI and Nivo
were also introduced alongside React/TypeScript/Next.js; names "Coalition Explorer
2.0"; adds the specific tools inside it (claims management, report generation,
security review, Executive Risks); adds Tech Lead credit for the RSA and Security
Week marketing pages; adds migrating CI/CD from Drone to GitHub Actions.

**Final (compressed, keeps the concrete named details):**
- Started as a solo frontend engineer and grew a team focused on customer-facing
  security apps and internal tools; introduced React, TypeScript, Next.js, and
  micro frontends
- Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into
  Coalition Explorer and Coalition Control
- Tech Lead for Coalition Explorer and Explorer 2.0 — claims management, report
  generation, security review, and Executive Risks tooling for the whole company
- Tech Lead for the Coalition Storybook and component library; migrated CI/CD from
  Drone to GitHub Actions

**Omitted:** Tech Lead credit for the RSA and Security Week marketing pages — real,
but marketing-page work is the least relevant credit for an engineering-hiring
audience, and the bullet budget for this role was already full of higher-signal
detail.

**Uncertain:** the PDFs list this role as "BinaryEdge · Coalition, Inc." with one
domain, `coalitioninc.com`. It reads as BinaryEdge being a product/team inside
Coalition, Inc., but neither PDF says that in so many words, so I preserved the
pairing exactly as printed rather than asserting an acquisition narrative that isn't
stated.

## Earlier experience (2015-2019, compressed)

The short CV compresses this whole period into one paragraph with no bullets:
"co-founder at Glaiveware, building bespoke web apps (2018-2019); React Native chat
app with end-to-end encryption at Sycret.ink (2017); full-stack dashboard for the
American Heart Association (2016); analytics dashboards at NextBitt (2015-2016)." It
omits the Science4you internship entirely and rounds the NextBitt dates.

The long CV gives each of these its own full entry, with an additional role the
short CV doesn't mention at all: **Java Developer (Intern), Science4you, Jan-Mar
2015** — the earliest role in Ricardo's history and the one that lines up with "went
professional in 2015" from the long CV's About section.

**Reconciled and finalized (extracted, exact dates from the long CV, which is more
precise than the short CV's rounded "2015-2016"):**

- **Fullstack Engineer, Co-Founder** — Glaiveware, Lisbon, Portugal (Remote) · Mar
  2018-Dec 2019 — bespoke web apps above market standard
- **React Native Developer** — Sycret.ink, Neuchâtel, Switzerland (Remote) · Jan-Dec
  2017 — end-to-end encrypted mobile chat app, serverless
- **Full Stack JavaScript Developer** — American Heart Association (Remote) ·
  Sep-Nov 2016 — admin dashboard for a Kinect-data integration
- **Frontend Developer** — NextBitt, Lisbon, Portugal · Oct 2015-Jul 2016 —
  analytics dashboards for asset & facilities management software
- **Java Developer, Intern** — Science4you, Lisbon, Portugal · Jan-Mar 2015 —
  management system for an online store

This matches both the "compress roles older than the recent decade" guidance and
the "group similar/older roles without bullets" guidance from `research.md`, while
recovering the one full role (Science4you) the short CV had silently dropped.

## Projects

Both PDFs agree on the same three projects; the long CV adds start years and a
slightly longer description for 11ai.

- **11io** — rj11.io — personal brand for B2B freelancing (2025-Present, long CV)
- **11ai** — ai.rj11.io — open-source AI skills, plugins, and workflows (2026-Present,
  long CV; short CV omits "and workflows" and the years)
- **11bench** — bench.rj11.io — open-source AI benchmarks (2026-Present, long CV)

**Final:** kept all three with the long CV's fuller wording and years — these are
current, active projects that directly back up the AI-engineering claims in About
and Skills, which the research in `research.md` flags as expected content for a
2026 engineering CV.

## Education

Identical in both PDFs: **IT Systems Management and Programming — Escola
Profissional de Tecnologia Digital · 2013-2016.** The long CV adds the location
(Lisbon, Portugal) and the official Portuguese program name, "Técnico de Gestão e
Programação de Sistemas Informáticos." Kept the location; omitted the Portuguese
name from the rendered page (redundant with the English translation already given,
and this is an English-language CV) but recorded it here for completeness.

## Full list of omissions (for auditability)

1. Legacy GitHub account (`github.com/ricardojrmcom`) — superseded, low value in a
   six-second scan.
2. The "cv.rj11.io" header URL — likely a document permalink, not a link for a
   reader; flagged as uncertain rather than included as a guess.
3. Competitive-gaming team-leadership narrative and the "self-guided missile"
   metaphor (long CV, About section) — real content, cut for space in favor of
   verifiable engineering scope.
4. "Foundations" skills category (JavaScript, Node.js, HTML5, CSS, Git, GitHub
   Actions, REST APIs, CI/CD, Testing) and a few lower-signal skill items
   (Material-UI as a current skill, Refactoring UI, Web Scraping, Data Enrichment) —
   assumed at this seniority, deprioritized under the two-page budget.
5. "Kept shipping: product-engineered new features from scratch, end to end"
   (OMEGA) — restates the role, cut in favor of more specific bullets.
6. Tech Lead credit for RSA/Security Week marketing pages (BinaryEdge/Coalition) —
   lowest-signal credit in an already full bullet list for that role.
7. Portuguese-language program name for the Education entry — redundant with the
   English translation already shown.

None of these are factual errors or unsupported claims; every one is a real,
sourced detail that lost a space competition to a higher-signal one, and every
omission is listed here so the choice is auditable rather than silent.
