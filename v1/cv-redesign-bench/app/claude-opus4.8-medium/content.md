# Content model

Canonical content for the CV. The website renders from
[`content.ts`](./content.ts), which is a structured transcription of this file.
This document is the source of truth; `content.ts` must not diverge from it.

## Legend

- **[F]** — *Fact* extracted directly from `ref/RJ_CV.pdf` (min) and/or
  `ref/RJ_CV_max.pdf` (max). Names, employers, dates, links, and claims are
  preserved verbatim in substance.
- **[R]** — *Rewrite* — same fact, clearer/tighter wording. No new facts.
- **[I]** — *Inference / editorial framing* — a small connective or ordering
  judgment, no invented facts.
- **[⚠]** — *Uncertainty / conflict* between sources, flagged not silently
  resolved.
- **[✂]** — *Compression / omission* choice forced by the two-page limit.

Both PDFs share an identical header/contact block, so those facts are
high-confidence.

---

## Header & contact

- **[F]** Name: **Ricardo Jorge** (goes by **RJ** — max only).
- **[F]** Title: **AI Product Engineer** (both PDFs, verbatim).
- **[F]** Location: **Lisbon, Portugal**.
- **[F]** Email: **ricardojorgexyz@gmail.com**.
- **[F]** Links: `rj11.io` · `github.com/rj11io` · `linkedin.com/in/rj11io` ·
  `cv.rj11.io`.
- **[F]** Working mode: **B2B freelance, remote** (max: "hands-on B2B freelancer
  across multiple teams"; roles tagged "B2B · Remote").

---

## Summary / About

Rendered summary (screen + print), **[R]** condensed from the max "About Me" and
min "About Me":

> **[R]** AI Product Engineer with a decade of professional experience,
> specialising in frontend TypeScript — React since 2016, Next.js since 2018, an
> early bet on the stack that became standard for both the web and AI products.
> On most projects the first frontend hire: owning architecture, tooling,
> component libraries, and pipelines from day one, then growing the team around
> them — hiring, onboarding, and writing the playbooks that let new engineers
> integrate seamlessly.
>
> **[R]** Most of that work is dashboards, product platforms, and proprietary
> data explorers for cybersecurity, crypto, and gaming companies — where a
> passion for data-driven products and visualisation took hold. Building with AI
> since the first releases of Copilot and ChatGPT, moving from autocomplete to
> prompt and context engineering to designing full agent harnesses; today
> running an automated fleet of AI agents that maintain personal projects.

- **[⚠]** The min CV states "a decade of professional **TypeScript** experience".
  The max CV states he "went professional in **2015**" and *then* specialised in
  frontend TypeScript, with React from 2016. His 2015–2016 roles (NextBitt,
  Science4you, AHA) used JavaScript/Angular/.NET/Java, not TypeScript. So
  "decade of professional experience" (from 2015) is exact; "decade of
  *TypeScript*" is the candidate's own rounding. The rewrite says "a decade of
  professional experience, specialising in frontend TypeScript" to stay true to
  both without overclaiming. Dates React-2016 / Next-2018 are preserved verbatim.
- **[✂]** The max "self-guided missile", "wearing every hat", "learned what
  separates a polished product from a prototype", and sign-off ("Have a nice
  day!") are cut from the summary — voice, not signal — but the *first frontend
  hire / grew the team* and *data-driven products* throughlines are kept.

---

## Personality strip ("Before code")

A compact differentiator line, **[R]** from min "Fun Facts" and max "About":

- **[F]** Started coding young for fun — modding and reverse-engineering games
  and consoles; built a fighting game on the **MUGEN** engine; ran dedicated
  servers for **Counter-Strike, Minecraft**, and other titles.
- **[F]** At 14, **LEGO Mindstorms** robotics: **2nd nationally** and **final
  four of the 2008 Robotics World Cup in China**.
- **[F]** Led teams, guilds, and clans to the top of online ladders and LAN
  wins — **[R]** "management training in disguise" (recruiting, coaching,
  keeping a remote roster aligned).
- **[✂]** Rendered as a short single strip, not a full section, so it adds
  personality without costing the two-page budget.

---

## Skills

Merged from both; max is the fuller superset. **[F]** for all listed items;
grouping/labels **[R]**.

- **Core stack** — TypeScript · React · Next.js · AI SDK · Convex · Playwright ·
  Vercel
- **AI engineering** — Agent Automations · Custom Agent Skills · Harness
  Engineering · Codex · Claude Code · n8n
- **UI & design** — Tailwind CSS · shadcn/ui · Material-UI · Design Systems ·
  Storybook · Refactoring UI
- **Data & visualisation** — Dashboards · Data Visualisation (d3 · Recharts ·
  Nivo) · Web Scraping · Data Enrichment
- **Leadership & delivery** — Team & Project Management · End-to-End Product
  Engineering · Product Design · Agile
- **[✂] Foundations** (max only — JavaScript · Node.js · HTML5 · CSS · Git ·
  GitHub Actions · REST APIs · CI/CD · Testing) is kept as a single condensed
  line; these are assumed at senior level, so it is compressed rather than
  expanded.
- **[⚠]** Min labels one group "UI & Data" and folds Dashboards/Datavis there;
  max splits "UI & Design" and "Data & Visualisation". The max split is used —
  it is cleaner and the superset.

---

## Experience

Reverse-chronological. **[F]** for all titles, employers, links, and dates
(verbatim from the PDFs, max preferred where it has more bullets). Bullets are
**[R]** — tightened from the max text, no new facts. Print page-one holds the
top roles; older roles compress onto page two.

### 1. AI Product Engineer — rj11io · rj11.io — Mar 2025 – Present · B2B · Remote
- **[R]** Hands-on AI product engineering for multiple early-stage startups,
  building projects from the ground up.
- **[F]** AI data extraction from PDFs · AI SEO analytics · GenAI
  dermatopathology portal · real-estate platform.
- **[F]** Multiple cybersecurity dashboards and proprietary data explorers.
- **[F]** AI chats / custom GPT experiences · smart-scraping agents and n8n
  workflows · AI agent harnesses, skills, and automations.

### 2. Product / Datavis Engineer — Hunt Intelligence, Inc. · hunt.io — Apr 2024 – Mar 2025 · B2B · Remote
- **[R]** Went deep on the specialty — data visualisation for a
  threat-intelligence product.
- **[F]** Built custom datavis components, including the **IP History Widget**.
- **[F]** Built core product modules **AttackCapture™** and **HuntSQL™** on a
  modern TypeScript codebase (Next.js, shadcn/ui, Playwright, CI/CD on GitHub
  Actions; prod + staging on Vercel; automated release changelogs to Slack).
- **[F]** Built a new API documentation platform on top of **OpenAPI** —
  friendlier and more intuitive than Swagger.

### 3. Senior Frontend Engineer → Team Lead — OMEGA Systems · omegasys.eu — Jun 2023 – Apr 2024 · Remote
- **[F]** Built the next generation of OMEGA's iGaming platform management system
  (**CORE5**) with TypeScript and React; **promoted to lead the frontend team**.
- **[F]** Data visualisation for the Main and Social dashboards, plus report and
  configuration views (Cashback, Refer-a-Friend, Pending Withdrawals,
  Challenges / Leaderboards).
- **[F]** Built the localisation/internationalisation module and an internal
  "Tab System" UI.
- **[R]** As lead: built the "New Developer" onboarding experience; set standards
  for tickets, documentation, and remote/async work with a strong "Definition of
  Done"; gave weekly "TED" talks to level up the team.

### 4. Senior Frontend Engineer — Phantasma Chain · phantasma.info — Jan 2022 – May 2023 · Remote
- **[F]** Built the frontend **monorepo** for all new tools and apps, the
  **Phantasma UI Storybook**, and the **Phantasma Explorer**.
- **[F]** Tests with Playwright, CI with GitHub Actions, CD with Vercel;
  contributed improvements to the **Phantasma TypeScript SDK**.
- **[R]** Built in-house tools: a custom React hook for the SDK, localisation,
  white-label theming, environment configs, and a custom API/scripts/hooks
  module.

### 5. Frontend Lead — BinaryEdge · Coalition, Inc. · coalitioninc.com — Feb 2020 – Oct 2021 · Remote
- **[R]** Started as the solo frontend engineer and grew a team focused on
  customer-facing security apps and internal tools; introduced React,
  TypeScript, Next.js, Material-UI, Nivo, and micro frontends.
- **[F]** Built **Attack Surface Monitoring (ASM)** on the BinaryEdge Portal as
  a micro frontend, later integrated into Coalition Explorer and Coalition
  Control.
- **[F]** Tech Lead for **Coalition Explorer** (and Explorer 2.0), the Coalition
  **Storybook** / Customer-Security component library, and data visualisations;
  claims management, report generation, security review, and Executive Risks
  platforms.
- **[R]** Migrated frontend CI/CD from Drone to GitHub Actions.
- **[✂]** RSA / Security Week marketing pages dropped (minor scope).

### Earlier — condensed
- **[F][✂]** **Fullstack Engineer & Co-Founder — Glaiveware** (Lisbon · Remote),
  Mar 2018 – Dec 2019 — bespoke web apps; React/Redux/Next.js/Node, MongoDB /
  Firebase / MySQL, AWS; also SEO/SEM, branding, copywriting.
- **[F][✂]** **React Native Developer — Sycret.ink** (Neuchâtel, Switzerland ·
  Remote), 2017 — end-to-end-encrypted mobile chat app (React Native,
  libsignal-protocol, AWS Lambda/API Gateway) with a team of three.
- **[F][✂]** **Full-Stack JS Developer — American Heart Association** (Remote),
  2016 — admin dashboard for the AHA's Kinect integration (React + Node), via a
  university scholarship.
- **[F][✂]** **Frontend Developer — NextBitt** (Lisbon), 2015–2016 — analytics
  dashboards and reporting/auditing tools (jQuery, Angular.js, .NET; Google
  Charts, d3.js, Chart.js).
- **[F][✂]** **Java Developer (Internship) — Science4you** (Lisbon), 2015 —
  order-management + reporting system for the online store (Java, MySQL).
- **[✂]** The five earliest roles are compressed into one "Earlier" block (each a
  single line) because they are >6 years old and lower-signal for a senior AI
  role; full detail lives in the max CV at `cv.rj11.io`.

---

## Projects

**[F]** all. The three `11*` projects are shown as cards; the two GitHub profiles
are surfaced as links in the header/footer rather than as full cards.

- **[F]** **11io** — `rj11.io` — personal brand for B2B freelancing — 2025–Present
- **[F]** **11ai** — `ai.rj11.io` — open-source AI skills, plugins, and workflows
  — 2026–Present
- **[F]** **11bench** — `bench.rj11.io` — open-source AI benchmarks — 2026–Present
- **[F][✂]** **Modern GitHub** — `github.com/rj11io` (2023–Present) and **Legacy
  GitHub** — `github.com/ricardojrmcom` (2020–2023): surfaced as links, not
  cards, to save space.

---

## Education

- **[F]** **IT Systems Management and Programming** — Escola Profissional de
  Tecnologia Digital, Lisbon, Portugal — 2013–2016.
- **[F]** Portuguese title: *Técnico de Gestão e Programação de Sistemas
  Informáticos*.

---

## Global reconciliation notes

1. **Two source PDFs, one truth.** The max CV is the fuller superset; the min is
   a compressed selection with the footer "Read the full story at
   `cv.rj11.io/v1/max`". Where they differ in *detail*, max wins; where they
   differ in *framing*, the tighter wording is used. No fact appears in only the
   min that contradicts the max.
2. **Science4you** appears only in the max CV; the min folds 2015–2016 into an
   "Earlier" sentence that omits it. It is **kept** (max is authoritative) in the
   condensed Earlier block.
3. **No invented metrics.** Both PDFs are nearly metric-free. Impact is conveyed
   through scope/ownership ("first frontend hire", "grew the team", named shipped
   systems), never fabricated numbers — per the hard rules and the research note
   on integrity.
4. **Trademarks preserved** — AttackCapture™, HuntSQL™ kept verbatim.
5. **Uncertainties flagged, not resolved silently:** the "decade of TypeScript"
   nuance (see Summary) and the min/max skills-grouping difference are the only
   two, both handled above.
