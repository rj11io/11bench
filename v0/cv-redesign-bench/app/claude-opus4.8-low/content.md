# content.md — canonical content model

This is the reconciled, editorial content model. The website renders from
[`content.ts`](./content.ts), which is a direct, structured transcription of
what is decided here. Nothing is rendered that is not grounded below.

**Legend** — `[F]` fact extracted verbatim/near-verbatim from a PDF ·
`[R]` rewritten for clarity/impact, same facts · `[I]` editorial inference from
PDF material · `[?]` flagged uncertainty. `CV` = RJ_CV.pdf (concise, 2pp),
`MAX` = RJ_CV_max.pdf (extended, 6pp).

## Sources reconciled

Both PDFs describe the same person and history. CV is a compression of MAX. Where
they differ it is in *depth*, not in fact; MAX adds earlier roles (2015–2017),
more bullets, and project dates. This model keeps CV's two-page discipline but
pulls a few higher-impact details forward from MAX.

## Identity & contact — all `[F]`

- Name: **Ricardo Jorge** (goes by **RJ**, per MAX About). Title: **AI Product Engineer**.
- Location: Lisbon, Portugal.
- Email: ricardojorgexyz@gmail.com · Site: rj11.io · GitHub: github.com/rj11io ·
  LinkedIn: linkedin.com/in/rj11io · CV: cv.rj11.io.
- Both PDFs carry the "cv.rj11.io" mark and the same contact line. No conflict.

## About — `[R]` compressing MAX's 8 paragraphs into 3

Facts preserved: decade of professional TS (pro since 2015 `[F, MAX]`), React
since 2016, Next.js since 2018; first frontend hire owning architecture →
growing/onboarding teams; dashboards / data explorers for cybersecurity, crypto,
gaming; building with AI since first Copilot/ChatGPT (MAX adds MidJourney), now
runs an automated fleet of agents; hands-on B2B freelancer.

- Compression choice: the "self-guided missile", "competitive gaming as
  management training", and "have a nice day" passages from MAX are cut for the
  two-page limit; the robotics/gaming origin survives as **Fun Facts** (from CV).
- `[I]` "a decade of professional TypeScript experience" (CV wording) is
  reconciled with MAX's "went professional in 2015" — 2015→2026 ≈ a decade. Kept.

## Fun facts — `[F]` from CV (verbatim facts, `[R]` wording)

- Started coding young by modding and reverse-engineering games and consoles.
- Built a fighting game on the MUGEN engine; ran dedicated Counter-Strike,
  Minecraft, and other servers.
- Second nationally and final four at the 2008 LEGO Mindstorms robotics world
  cup in China. (MAX adds "at 14"; kept.)

## Skills — merged from CV + MAX `[F]` (categories reconciled)

Conflict: CV has four groups (Core Stack, AI Engineering, UI & Data, Leadership &
Delivery). MAX has six (adds Foundations; splits UI & Data into "UI & Design" and
"Data & Visualisation"). Decision: keep five groups — richer than CV, tighter
than MAX — dropping only the lowest-signal "Foundations" list to save space `[I]`.

- **Core Stack** — TypeScript · React.js · Next.js · AI SDK · Convex · Playwright · Vercel
- **AI Engineering** — Agent Automations · Custom Agent Skills · Harness Engineering · Codex · Claude Code · n8n
- **UI & Design** — Tailwind CSS · shadcn/ui · Material-UI · Design Systems · Storybook · Refactoring UI
- **Data & Visualisation** — Dashboards · d3 · Recharts · Nivo · Web Scraping · Data Enrichment
- **Leadership & Delivery** — Team & Project Management · End-to-End Product Engineering · Product Design · Agile

## Projects — `[F]`, dates from MAX

- **11io** — rj11.io — 2025–Present — Personal brand for B2B freelancing.
- **11ai** — ai.rj11.io — 2026–Present — Open-source AI skills, plugins, and workflows.
- **11bench** — bench.rj11.io — 2026–Present — Open-source AI benchmarks.
- Omitted for space `[I]`: "Modern Github" and "Legacy Github" project entries
  (MAX only) — they are GitHub profiles, already covered by the contact link.

## Experience — reverse-chronological

Top five roles keep bullets (`[R]` on wording, facts from MAX where richer than
CV). All dates, employers, and links are `[F]`.

1. **AI Product Engineer** — rj11io (rj11.io) · Remote — Mar 2025–Present.
   Hands-on AI product engineering for multiple early-stage startups, from the
   ground up: AI PDF data extraction; AI SEO analytics; a GenAI dermatopathology
   portal; cybersecurity dashboards and proprietary data explorers; AI chat / GPT
   experiences; agent harnesses, skills, and automations. (MAX also lists a real
   estate platform and n8n scraping agents — folded into the same bullets.)
2. **Product / Datavis Engineer** — Hunt Intelligence, Inc. (hunt.io) · Remote —
   Apr 2024–Mar 2025. Data visualisation for a threat-intelligence product,
   including the custom IP History Widget; core modules AttackCapture™ and
   HuntSQL™ on a modern Next.js / shadcn/ui / Playwright / GitHub Actions stack;
   a new OpenAPI-based API docs platform friendlier than Swagger.
3. **Senior Frontend Engineer → Team Lead** — OMEGA Systems (omegasys.eu) ·
   Remote — Jun 2023–Apr 2024. Built the next-gen iGaming platform management
   system (CORE5) in TypeScript + React; promoted to lead. Data-vis for Main /
   Social dashboards + report/config views; built the developer onboarding
   experience and set ticket / docs / async standards.
4. **Senior Frontend Engineer** — Phantasma Chain (phantasma.info) · Remote —
   Jan 2022–May 2023. Built the frontend monorepo, the Phantasma UI Storybook,
   and Phantasma Explorer; Playwright + GitHub Actions + Vercel; contributed to
   the Phantasma TypeScript SDK.
5. **Frontend Lead** — BinaryEdge · Coalition, Inc. (coalitioninc.com) · Remote —
   Feb 2020–Oct 2021. Grew from solo frontend engineer to team lead for
   customer-facing security apps; introduced React, TypeScript, Next.js, and
   micro-frontends; Tech Lead for Coalition Explorer, the component library, and
   data visualisations; built Attack Surface Monitoring on the BinaryEdge Portal.

**Earlier** (one compressed line, `[F]` from MAX) — Co-founder/full-stack at
Glaiveware (2018–2019); React Native E2E-encrypted chat app at Sycret.ink (2017);
full-stack AHA Kinect dashboard (2016); analytics dashboards at NextBitt
(2015–2016); Java back-office system intern at Science4you (early 2015).

## Education — `[F]`

- **IT Systems Management and Programming** — Escola Profissional de Tecnologia
  Digital, Lisbon — 2013–2016. (Técnico de Gestão e Programação de Sistemas
  Informáticos.)

## Uncertainties flagged `[?]`

- No quantified metrics exist in either PDF (no %, revenue, user counts). Per the
  no-invention rule, none are added; impact is conveyed by scope and ownership
  wording only.
- Exact start-of-career month for "a decade of TS" is not stated; treated as
  ~2015–2016 professional start, consistent with the NextBitt/Science4you dates.
- Trademark glyphs (™) on AttackCapture / HuntSQL are reproduced as written.

## Compression summary (two-page budget)

Cut vs MAX: 5 About paragraphs, the Foundations skill group, two GitHub "project"
entries, per-role sub-detail (Glaiveware stack lists, Sycret/AHA/NextBitt/
Science4you full bullets → one Earlier line), and OMEGA/Phantasma minor bullets.
Nothing factual is contradicted; only depth is reduced.
