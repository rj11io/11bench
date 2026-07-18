# Content model

This is the single source of truth the page renders from. `page.tsx` reads
its text from `content.ts` (a typed copy of this file's decisions, not a
divergent rewrite). Anything not written here does not appear on the page.

Two source PDFs exist:
- `RJ_CV.pdf` — a tight, 2-page version ("min").
- `RJ_CV_max.pdf` — a longer, 6-page version with the same facts told in more
  words, plus a few extra items ("max").

Every line below is tagged:
- **[FACT]** — taken directly from one or both PDFs, unchanged in substance.
- **[EDIT]** — the same fact, rewritten for clarity or length. No new claim added.
- **[MERGED]** — the two PDFs said the same thing two different ways; I picked one wording.
- **[OMITTED]** — present in a source PDF but cut from this CV, and why.
- **[UNCERTAIN]** — a genuine gap or conflict I could not resolve from the source PDFs.

## Identity and contact — all [FACT]

- Name: Ricardo Jorge
- Role line: AI Product Engineer
- Location: Lisbon, Portugal
- Email: ricardojorgexyz@gmail.com
- Site: rj11.io
- GitHub: github.com/rj11io
- LinkedIn: linkedin.com/in/rj11io
- Both PDFs also print `cv.rj11.io` in the header corner. **[FACT]** Kept, since
  it's a real link to the live version of this CV, not decoration.

## About — [EDIT], merged from both versions

**[UNCERTAIN]** The two "About Me" sections differ a lot in tone and length:
`RJ_CV.pdf` is four sentences of professional summary; `RJ_CV_max.pdf` is six
paragraphs of first-person narrative (childhood coding, gaming/leadership
anecdotes, a "self-guided missile" metaphor, an explicit "open to
opportunities" call to action). Both are genuine — this isn't a factual
conflict, just two different registers for two different audiences. For a
two-page CV read by a recruiter in seconds (see `research.md` §1), I followed
the short-version register and compressed it further, since a CV isn't the
place for the full personal story. The fun facts and gaming/robotics anecdotes
are cut from the main CV for space — see Omissions below.

Rendered text:

> AI Product Engineer with a decade of professional TypeScript experience,
> building on React since 2016 and Next.js since 2018. On most projects I was
> the first frontend hire — owning architecture, tooling, component
> libraries, and pipelines from day one, then growing the team around them
> through hiring, onboarding, and playbooks that let new engineers integrate
> seamlessly.
>
> Most of my work has been dashboards, product platforms, and proprietary
> data explorers for cybersecurity, crypto, and gaming companies, where I
> found a passion for data-driven products and visualisation. I've built with
> AI since the first releases of Copilot and ChatGPT, moving from prompt and
> context engineering to designing full agent harnesses and automations.

**[EDIT]** Trimmed the second `RJ_CV.pdf` paragraph by about a fifth (cut "That's
where I found..." repetition and softened "creating suite of open-source
skills to" into the same clause) to make room on the page without dropping
any claim.

## Skills — [MERGED], [EDIT]

Both PDFs share five identical groups (Core Stack, AI Engineering, UI/Design,
Data/Visualisation, Leadership & Delivery) with near-identical entries.
`RJ_CV_max.pdf` adds one extra group, **Foundations** (JavaScript, Node.js,
HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing), and a few extra
entries inside existing groups (Material-UI, Refactoring UI, Web Scraping,
Data Enrichment).

- **[MERGED]** Used the `RJ_CV_max.pdf` group labels ("UI & Design",
  "Data & Visualisation") since they're marginally clearer, but kept the
  shorter `RJ_CV.pdf` entry lists inside "UI & Design" and "Data &
  Visualisation" — Material-UI and Refactoring UI are legacy-role
  technologies covered instead in the Experience bullets where they were
  actually used, and Web Scraping / Data Enrichment are folded into "AI Smart
  Scrapping Agents" in the current role.
- **[OMITTED]** The "Foundations" group (JavaScript, Node.js, HTML5, CSS,
  Git, GitHub Actions, REST APIs, CI/CD, Testing) is cut entirely. These are
  baseline skills implied by a decade of professional TypeScript/React work
  and by the CI/CD, testing, and Git mentions already inside Experience;
  listing them again as a stand-alone skills row would spend page-two space
  stating the obvious for a senior audience (see `research.md` §2: a senior
  CV should read as scope/judgment/influence, not a keyword list).

Rendered groups:

| Group | Items |
| --- | --- |
| Core Stack | TypeScript · React.js · Next.js · AI SDK · Convex · Playwright · Vercel |
| AI Engineering | Agent Automations · Custom Agent Skills · Harness Engineering · Codex · Claude Code · n8n |
| UI & Design | Tailwind CSS · shadcn/ui · Design Systems · Storybook |
| Data & Visualisation | Dashboards · Data Visualisation (d3, Recharts, Nivo) |
| Leadership & Delivery | Team & Project Management · End-to-End Product Engineering · Product Design · Agile Methodologies |

## Projects — [MERGED]

`RJ_CV_max.pdf` adds start years and two more repositories (Modern GitHub,
Legacy GitHub) beyond the three shared projects.

- **[FACT]** 11io — rj11.io — personal brand for B2B freelancing
- **[FACT]** 11ai — ai.rj11.io — open source AI skills, plugins, and workflows
- **[FACT]** 11bench — bench.rj11.io — open source AI benchmarks
- **[OMITTED]** Modern GitHub / Legacy GitHub entries: these are code hosts,
  not projects, and github.com/rj11io is already the header's GitHub link —
  restating it as a fourth "project" would be redundant on a page-budget CV.
- **[UNCERTAIN]** `RJ_CV_max.pdf` dates 11ai and 11bench as "2026 - Present"
  while today's date is 2026-07-16 — i.e. these are dated as starting this
  year. Kept as stated in the source; not verified against any external
  timestamp.

## Experience — [FACT] core facts, [EDIT] bullet wording, one [MERGED] gap

Both PDFs list the same seven roles in the same order with the same
employers and dates. `RJ_CV_max.pdf` adds two more bullets per recent role and
extends back to 2015 with three more historic roles that `RJ_CV.pdf`
compresses into one "Earlier:" line. Full role list rendered, newest first:

### AI Product Engineer — rj11io · rj11.io — Mar 2025 - Present
**[MERGED]** `RJ_CV.pdf` gives 3 bullets; `RJ_CV_max.pdf` gives 9 more granular
ones for the same period. Kept the shorter set's grouping, added the two
concrete deliverables the long version names that the short version doesn't
(Real Estate Platform, AI Smart Scrapping Agents / n8n Workflows) since they're
concrete facts, not padding:
- Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up
- AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, and custom AI chat / GPT experiences
- Cybersecurity dashboards, proprietary data explorers, AI smart-scraping agents and n8n workflows, and AI agent harnesses, skills, and automations

### Product / Datavis Engineer — Hunt Intelligence, Inc. · hunt.io — Apr 2024 - Mar 2025
**[FACT]/[EDIT]** kept all three bullets from `RJ_CV.pdf`, tightened wording:
- Data visualisation for a threat-intelligence product, including custom components like the IP History Widget
- Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase with Next.js, shadcn/ui, Playwright, and CI/CD on GitHub Actions
- Built a new API documentation platform on top of OpenAPI — friendlier and more intuitive than Swagger

### Senior Frontend Engineer → Team Lead — OMEGA Systems · omegasys.eu — Jun 2023 - Apr 2024
- Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team
- Data visualisation for the Main and Social dashboards, plus report and configuration views
- As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows

### Senior Frontend Engineer — Phantasma Chain · phantasma.info — Jan 2022 - May 2023
- Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer
- Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK

### Frontend Lead — BinaryEdge · Coalition, Inc. · coalitioninc.com — Feb 2020 - Oct 2021
- Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools
- Introduced React, TypeScript, Next.js, and micro-frontends; Tech Lead for Coalition Explorer, the component library, and data visualisations
- Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control

### Earlier roles — [MERGED], compressed to one line as in `RJ_CV.pdf`
`RJ_CV_max.pdf` gives each of these its own dated entry with 1-6 bullets
(Glaiveware co-founder, Sycret.ink React Native contractor, American Heart
Association scholarship project, NextBitt frontend developer, plus a Science4you
Java internship that `RJ_CV.pdf` omits entirely). All are real, dated roles —
none invented — but seven job entries dating back to a 2015 internship do not
fit a two-page senior CV whose most relevant, recent work is 2020-onward. Kept
the `RJ_CV.pdf` compression:

> Earlier: co-founder at Glaiveware, building bespoke web apps (2018-2019);
> React Native chat app with end-to-end encryption at Sycret.ink (2017);
> full-stack dashboard for the American Heart Association (2016); analytics
> dashboards at NextBitt (2015-2016).

**[OMITTED]** The Science4you Java/MySQL internship (Jan-Mar 2015) is dropped —
it is a pre-professional internship using a stack (Java) unrelated to the
candidate's frontend/TypeScript specialty, and is already outside the window
the compressed line covers.

## Education — [FACT]

- IT Systems Management and Programming, Escola Profissional de Tecnologia
  Digital, 2013-2016. `RJ_CV_max.pdf` adds the Portuguese course name
  ("Técnico de Gestão e Programação de Sistemas Informáticos") and the city
  (Lisbon, Portugal). Both kept: the Portuguese name is the actual credential
  title and shouldn't be silently dropped.

## Fun facts / personal anecdotes — [OMITTED]

Both PDFs include: modding/reverse-engineering games as a kid, building a
MUGEN fighting game, running game servers, and a 2008 LEGO Mindstorms robotics
placement. **[OMITTED]** from the two-page CV entirely — genuine and
charming, but not load-bearing for a senior hiring decision, and the two-page
budget has no room for content that doesn't advance scope/judgment/influence
(see `research.md` §1-2). This is a compression choice, not a factual dispute.

## What's on page 1 vs page 2 (compression choices)

Page 1: header, About, Skills, Projects, and the two most recent Experience
entries (AI Product Engineer, Hunt Intelligence).
Page 2: the three remaining dated Experience entries (OMEGA, Phantasma,
BinaryEdge), the compressed "Earlier" line, and Education.

This split follows recency: the roles a recruiter is most likely to weigh
first (the current role and the one before it) stay on the page they see
first, per the scanning behaviour in `research.md` §1. The exact split was
set by measuring real rendered height against A4 print dimensions (see
`design.md`), not chosen freehand — at a type size and spacing dense enough
to read comfortably, header + About + Skills + Projects already fill most of
page one, leaving room for two full job entries before the next one would
spill past the page boundary.
