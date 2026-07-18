# Content model

Legend: **[FACT]** = stated directly in one or both source PDFs. **[REWRITE]** = same fact, tightened wording. **[MERGE]** = combined from both PDFs, no new claim. **[CUT]** = present in a source PDF but left out of the rendered CV, with the reason. **[UNCERTAIN]** = a real ambiguity I did not silently resolve.

Sources: `ref/RJ_CV.pdf` ("short," 2 pages) and `ref/RJ_CV_max.pdf` ("long," 6 pages). Both are dated the same underlying CV; the long one is explicitly framed on its own last line as the fuller version of the short one, not a different résumé.

The website reads this file directly for section order and editorial framing; the actual strings rendered are in [`content.ts`](content.ts), which is a structured transcription of the decisions below. Nothing in `content.ts` says anything this file doesn't already say.

## Identity block — [FACT], no conflict

| Field | Value | Source |
|---|---|---|
| Name | Ricardo Jorge | both |
| Title | AI Product Engineer | both |
| Location | Lisbon, Portugal | both |
| Email | ricardojorgexyz@gmail.com | both |
| Site | rj11.io | both |
| GitHub | github.com/rj11io | both |
| LinkedIn | linkedin.com/in/rj11io | both |

**[UNCERTAIN]** Both PDFs also print `cv.rj11.io` in the top-right corner of page 1, and the short PDF's closing line points to `cv.rj11.io/v1/max` as "the full story." I read this as a watermark/self-reference to the two source documents being compared in this benchmark, not a third contact channel meant to sit next to email/GitHub/LinkedIn. **Decision:** left out of the contact rail. Not fabricated, not contradicted — just not carried forward, since including it would imply this website is hosted at that address, which I can't confirm.

## About — [MERGE] + [REWRITE]

Both PDFs describe the same professional identity at very different lengths:

- **Short PDF:** two tight paragraphs — TypeScript/React/Next.js tenure, "first frontend hire" pattern (architecture, tooling, hiring, playbooks), then dashboards/data-explorer specialization in cybersecurity/crypto/gaming, then the AI journey (Copilot/ChatGPT era → prompt engineering → open-source skills → agent harnesses).
- **Long PDF:** a six-paragraph narrative covering the same ground plus a personal origin story (modding/reverse-engineering games, MUGEN fighting-game engine, dedicated game servers, LEGO Mindstorms robotics at 14), a competitive-gaming leadership analogy, the "self-guided missile" self-description, and a closing "open to opportunities" line.

**Decision:** the website's About section uses the short PDF's professional paragraph almost verbatim (it is already tightly written and matches how a senior engineer's CV should read per [research.md](research.md) — dense, scannable, no padding), tightened further in a few clauses for rhythm. The personal origin story and gaming-leadership material are real facts from the long PDF, not invented, but a full narrative retelling would cost too much of the two-page budget for a senior-level audience that (per [research.md](research.md)) fixates on title/company/dates first. **Compression choice:** the origin story survives as a compact "Fun facts" aside (see below) instead of prose, and the "self-guided missile" line and the "open to opportunities" closing sentence are cut entirely — real quotes, but the two-page budget doesn't have room for a self-description flourish once the AI Product Engineer role has three bullets and everything back through 2020 has to fit on page two.

Rendered About (two sentences per paragraph, tightened from the short PDF, no facts added):

1. "AI Product Engineer with roughly a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. First frontend hire on most teams — owning architecture, tooling, and pipelines from day one, then hiring and onboarding the engineers who grew around them."
2. "Most of that work has been dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies, which is where the pull toward data-driven products and visualisation started. Building with AI since the first Copilot and ChatGPT releases — from prompt and context engineering to open-source agent skills and full harness design."

**[UNCERTAIN]** "roughly a decade" reconciles the short PDF's "a decade of professional TypeScript experience" with the long PDF's "I went professional in 2015" (2015→2026 is 11 years). Neither PDF gives an exact year count; I did not invent one — "roughly a decade" is the candidate's own rounding, kept as-is rather than computed into a harder number like "11 years."

### Fun facts — [FACT], compressed to one line

Both PDFs carry the same three facts (short PDF as a dedicated section; long PDF folded into prose): modding/reverse-engineering games and consoles for fun, building a fighting game on the MUGEN engine, running dedicated Counter-Strike/Minecraft servers, and reaching the final four of the 2008 LEGO Mindstorms robotics world cup in China (with a second-place national finish). Rendered as a single small italic line rather than a full section, since it's a differentiator, not core evidence — per [research.md](research.md) it earns a caption, not a section header competing with Experience for attention.

## Skills — [MERGE] with one deliberate cut

The short and long PDFs group skills differently:

| Category | Short PDF | Long PDF |
|---|---|---|
| Core Stack | TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel | identical |
| AI Engineering | Agent Automations, Custom Agent Skills, Harness Engineering, Codex, Claude Code, n8n | identical |
| UI (& Data in short) | Tailwind CSS, shadcn/ui, Design Systems, Storybook, Dashboards, Data Visualisation (d3, Recharts, Nivo) | split into "UI & Design" (adds Material-UI, Refactoring UI) and "Data & Visualisation" (adds Web Scraping, Data Enrichment) |
| Leadership & Delivery | Team & Project Management, End-to-End Product Engineering, Product Design, Agile Methodologies | identical |
| Foundations | — | JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing |

**Decision:** rendered Skills keeps the short PDF's four-category structure (it's the candidate's own more-curated edit, and matches [research.md](research.md)'s finding that senior resumes should avoid over-listing baseline tools). **[CUT]** the long PDF's "Foundations" row (JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing) — not because it's false, but because it's implied by a decade of TypeScript/React seniority and is independently evidenced inside the Experience bullets (GitHub Actions CI/CD shows up in three separate roles below). **[CUT]** Material-UI and Refactoring UI from the UI category, and Web Scraping / Data Enrichment from Data — these are real (Material-UI shows up again correctly, contextually, inside the BinaryEdge and Glaiveware experience entries; the AI Product Engineer bullets already carry "AI Smart Scrapping Agents") but listing them a second time in the skills grid would dilute the higher-signal items for a 6-8 second scan.

## Projects — [MERGE], dates from long PDF

The short PDF lists three projects with no dates; the long PDF adds start years and two more GitHub-index entries.

| Project | Link | Description | Dates | Source |
|---|---|---|---|---|
| 11io | rj11.io | Personal brand for B2B freelancing | 2025 - Present | dates from long PDF only |
| 11ai | ai.rj11.io | Open source AI skills, plugins, and workflows | 2026 - Present | wording + dates from long PDF (short PDF: "Open source AI skills and plugins", no workflows) |
| 11bench | bench.rj11.io | Open source AI benchmarks | 2026 - Present | dates from long PDF only |

**[CUT]** "Modern Github" (github.com/rj11io, 2023-Present) and "Legacy Github" (github.com/ricardojrmcom, 2020-2023) from the long PDF only. Real facts, but they describe the same GitHub account already linked in the contact rail plus a retired account with no further context — low signal relative to the space cost on a two-page CV. The current `github.com/rj11io` link already in the header covers the useful pointer.

## Experience — reconciled role by role

Every role below appears in both PDFs with the same title, employer, and dates unless noted. Bullets are tightened from the longer of the two versions without adding new claims; anything cut for space is listed explicitly so it's auditable.

### AI Product Engineer — rj11io · rj11.io · Mar 2025 - Present

Both PDFs agree on scope. Long PDF adds "B2B · Remote" and expands the bullet list to nine granular items where the short PDF summarizes into three. Two items are new information not present in the short PDF: **Real Estate Platform**, and **AI Smart Scrapping Agents and n8n Workflows**.

Rendered (3 bullets, short PDF's structure, enriched with the two new long-PDF facts folded in rather than added as separate lines):
- Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up — AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, and a real estate platform
- AI chats and custom GPT experiences, plus AI smart-scraping agents and n8n workflows
- Cybersecurity dashboards, proprietary data explorers, and AI agent harnesses, skills, and automations

### Product / Datavis Engineer — Hunt Intelligence, Inc. · hunt.io · Apr 2024 - Mar 2025

Long PDF adds: production/staging environments on Vercel, automated release changelogs to Slack, and frames the move as "left OMEGA to go deep on my specialty." No conflicts.

Rendered (3 bullets):
- Went deep on a specialty: data visualisation for a threat-intelligence product, including custom components like the IP History Widget
- Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase — Next.js, shadcn/ui, Playwright, CI/CD on GitHub Actions, staging/production on Vercel, and automated release changelogs to Slack
- Built a new API documentation platform on top of OpenAPI — friendlier and more intuitive than Swagger

### Senior Frontend Engineer → Team Lead — OMEGA Systems · omegasys.eu · Jun 2023 - Apr 2024

Long PDF adds: which specific dashboard views (Cashback, Refer-a-Friend, Pending Withdrawals, Challenges/Leaderboards), a localisation module and internal "Tab System" UI, "Definition of Done" emphasis, and weekly "TED" talks. No conflicts, only more detail.

Rendered (3 bullets):
- Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team
- Data visualisation for the Main and Social dashboards, report views, and configuration screens (cashback, referrals, withdrawals, leaderboards), plus a localisation module
- As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows, with a strong "Definition of Done"

### Senior Frontend Engineer — Phantasma Chain · phantasma.info · Jan 2022 - May 2023

Long PDF splits the same work into more granular bullets and adds one new detail: in-house tools (custom React hook for the Phantasma SDK, localisation, white-label theming, environment configs). No conflicts.

Rendered (2 bullets):
- Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer
- Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK and built in-house tooling (custom SDK hook, localisation, white-label theming)

### Frontend Lead — BinaryEdge · Coalition, Inc. · coalitioninc.com · Feb 2020 - Oct 2021

**[UNCERTAIN]** minor wording difference: short PDF says "Introduced React, TypeScript, Next.js, and micro frontends"; long PDF says "Introduced React, TypeScript, Material-UI, Nivo, and Next.js to the frontend stack, plus the concept of micro frontends." Not a contradiction — the long version is simply more complete about which libraries were introduced alongside the stack. Long PDF also adds: "Coalition Explorer 2.0" as a named expansion, specific platforms inside it (claims management, report generation, security review, Executive Risks), Tech Lead credit for RSA/Security Week marketing pages, and a CI/CD migration from Drone to GitHub Actions.

Rendered (3 bullets):
- Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools; introduced React, TypeScript, Next.js, and micro frontends
- Tech Lead for Coalition Explorer and Coalition Explorer 2.0 — claims management, report generation, security review, and Executive Risks platforms — plus the component library and data visualisations
- Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions

### Earlier roles (pre-2020) — [MERGE], one real discrepancy resolved

The short PDF compresses everything before 2020 into a single line: "Earlier: co-founder at Glaiveware, building bespoke web apps (2018-2019); React Native chat app with end-to-end encryption at Sycret.ink (2017); full-stack dashboard for the American Heart Association (2016); analytics dashboards at NextBitt (2015-2016)."

The long PDF gives each of those a full entry, **plus one role the short PDF omits entirely**: a Java Developer internship at Science4you (Jan-Mar 2015), building an order-management system in Java/MySQL. **[UNCERTAIN → resolved]**: this isn't a conflict, it's a real omission in the short PDF. The long PDF's dates confirm it doesn't overlap awkwardly with NextBitt (Science4you ends Mar 2015; NextBitt starts Oct 2015), so the timeline is consistent once both are counted.

**Decision:** the rendered CV keeps the short PDF's one-line compression for this stretch (matching how the candidate himself chose to fit a two-page version), because page-two space is needed for Projects and Education. **[CUT]** Science4you specifically — it's the earliest, shortest (3 months), and least senior-relevant entry (an internship, not a professional role), so it's the right thing to drop under a hard length constraint; it is documented here so the omission is auditable rather than silent.

Rendered (1 line, under an "Earlier" sub-heading):
"Co-founder at Glaiveware, building bespoke web apps (2018-2019) · React Native chat app with end-to-end encryption at Sycret.ink (2017) · full-stack dashboard for the American Heart Association (2016) · analytics dashboards at NextBitt (2015-2016)"

## Education — [MERGE]

Both PDFs agree: "IT Systems Management and Programming," Escola Profissional de Tecnologia Digital, 2013-2016. Long PDF adds the location (Lisbon, Portugal) and the official Portuguese credential name ("Técnico de Gestão e Programação de Sistemas Informáticos"). Rendered with both, since the Portuguese name is the actual credential title, not editorializing.

## Two-page space accounting

Page one: header, About (2 short paragraphs + fun-facts caption), Skills (4 categories), AI Product Engineer, Hunt Intelligence.
Page two: OMEGA, Phantasma, BinaryEdge, Earlier-roles line, Projects, Education.

This mirrors the short PDF's own page break almost exactly (its page 1 ends mid-way through the Hunt Intelligence bullets; page 2 starts at OMEGA) — a useful sanity check that this is an achievable, not arbitrary, split.
