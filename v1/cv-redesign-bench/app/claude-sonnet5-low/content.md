# Content model

Source: `ref/RJ_CV.pdf` (short/"minified" version) and `ref/RJ_CV_max.pdf` (long/"max" version, explicitly labeled by the short CV as "the full story"). Both are by the same person and agree on every fact that appears in both — the max version simply adds detail the short one compressed. Nothing below is invented; anything that isn't a direct lift is marked as editorial.

## Identity (directly extracted, both PDFs agree)
- Name: Ricardo Jorge
- Title: AI Product Engineer
- Location: Lisbon, Portugal
- Email: ricardojorgexyz@gmail.com
- Site: rj11.io
- GitHub: github.com/rj11io
- LinkedIn: linkedin.com/in/rj11io
- CV site: cv.rj11.io

## About (editorial: merged from both, cut for length)
Both PDFs' About sections tell the same story at different lengths. The short one is a tight professional summary; the max one adds the personal origin story (gaming/robotics background, "self-guided missile" line, freelance framing). For a two-page CV, editorial choice: keep the short version's professional framing almost verbatim (it's already tight and accurate) and fold in one line about the AI trajectory (Copilot/ChatGPT → agent harnesses) since that's a differentiator for an "AI Product Engineer" title. The personal/gaming narrative from the max version is cut from the About prose — it survives only as compressed "Fun facts" bullets (present in the short PDF too), since a two-page professional CV can't afford a multi-paragraph personal narrative next to a decade of experience.

## Fun facts (directly extracted from short PDF; max PDF has the same facts woven into prose)
- Started coding young modding/reverse-engineering games and consoles; built a fighting game with the MUGEN engine; ran dedicated servers for Counter-Strike, Minecraft, and others.
- Placed second nationally and reached the final four of the 2008 robotics World Cup in China with LEGO Mindstorms.

## Skills (reconciled: union of both, deduplicated)
The max PDF has two extra rows the short one omits (Foundations; and it splits "UI & Data" into "UI & Design" + "Data & Visualisation"). Kept the max PDF's superset since skills sections are scanned/keyword-matched and cutting them loses ATS signal; compressed to fit column width.
- **Core Stack:** TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel
- **AI Engineering:** Agent Automations, Custom Agent Skills, Harness Engineering, Codex, Claude Code, n8n
- **UI & Design:** Tailwind CSS, shadcn/ui, Material-UI, Design Systems, Storybook, Refactoring UI
- **Data & Visualisation:** Dashboards, Data Visualisation (d3, Recharts, Nivo), Web Scraping, Data Enrichment
- **Leadership & Delivery:** Team & Project Management, End-to-End Product Engineering, Product Design, Agile Methodologies
- **Foundations:** JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing

## Projects (reconciled: max PDF adds dates + two extra entries)
- **11io** — rj11.io — Personal brand for B2B freelancing (2025 - Present)
- **11ai** — ai.rj11.io — Open source AI skills, plugins, and workflows (2026 - Present)
- **11bench** — bench.rj11.io — Open source AI benchmarks (2026 - Present)
- **Modern GitHub** — github.com/rj11io — Modern GitHub for AI open source projects (2023 - Present)
- **Legacy GitHub** — github.com/ricardojrmcom — Legacy GitHub with open source code produced 2020-2023

Kept all five for the design (they fit compactly as a list); the short PDF's version (three entries, no dates) is the same underlying facts, just less complete.

## Experience (directly extracted; bullets tightened for length, no facts added)
Both PDFs agree on every job title, company, and date range. The max PDF has substantially more bullets per role; the short PDF already compresses old roles into one "Earlier:" line. For two pages, editorial choice: keep full bullet detail for the three most recent/relevant roles (AI Product Engineer, Hunt Intelligence, OMEGA/Phantasma/BinaryEdge get 2-4 tightened bullets each), and compress everything before BinaryEdge (Glaiveware, Sycret.ink, American Heart Association, NextBitt, Science4you) into one dense "Earlier" paragraph, matching the short PDF's own compression strategy — this is the same editorial call the source CV already made, applied consistently.

1. **AI Product Engineer** — rj11io · rj11.io — Mar 2025 - Present
   - Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up
   - AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, AI chats and custom GPT experiences
   - Cybersecurity dashboards, proprietary data explorers, AI smart-scraping agents and n8n workflows, and AI agent harnesses, skills, and automations
2. **Product / Datavis Engineer** — Hunt Intelligence, Inc. · hunt.io — Apr 2024 - Mar 2025
   - Went deep on data visualisation for a threat-intelligence product, including custom components like the IP History Widget
   - Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase (Next.js, shadcn/ui, Playwright, CI/CD on GitHub Actions)
   - Built a new API documentation platform on top of OpenAPI, friendlier and more intuitive than Swagger
3. **Senior Frontend Engineer → Team Lead** — OMEGA Systems · omegasys.eu — Jun 2023 - Apr 2024
   - Built the next generation of OMEGA's iGaming platform management system (CORE5); promoted to lead the frontend team
   - Data visualisation for the Main and Social dashboards, plus report and configuration views
   - As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows
4. **Senior Frontend Engineer** — Phantasma Chain · phantasma.info — Jan 2022 - May 2023
   - Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer
   - Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK
5. **Frontend Lead** — BinaryEdge · Coalition, Inc. · coalitioninc.com — Feb 2020 - Oct 2021
   - Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools
   - Introduced React, TypeScript, Next.js, and micro frontends; Tech Lead for Coalition Explorer, the component library, and data visualisations
   - Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control
6. **Earlier** (compressed, matches short PDF's own compression): Co-founder at Glaiveware, building bespoke web apps (2018-2019); React Native chat app with end-to-end encryption at Sycret.ink (2017); full-stack dashboard for the American Heart Association (2016); analytics dashboards at NextBitt (2015-2016).

**Cut for space:** the max PDF's Science4you internship (Java Developer, Jan-Mar 2015) is a real line item that the short PDF's own "Earlier" compression already dropped. Kept dropped here for consistency with the source's own prioritization and because two pages don't have room for an 11-year-old internship once five more recent, more relevant roles are already compressed into one line. Flagged here rather than silently vanished.

## Education (directly extracted, both agree)
- IT Systems Management and Programming — Escola Profissional de Tecnologia Digital, Lisbon, Portugal — 2013 - 2016
- (Max PDF gives the Portuguese official name: "Técnico de Gestão e Programação de Sistemas Informáticos" — included as a secondary line since it's the literal credential name, not editorializing.)

## Uncertainties / flags
- The short PDF's tagline "This is the minified version of my CV. Read the full story at cv.rj11.io/v1/max" is a meta-reference to the source CV's own site, not a fact about the candidate's career — not carried into this redesign since it describes the old CV, not this one.
- No metrics/numbers beyond dates and product names appear in either source (no revenue figures, team sizes, or percentages) — none were invented to fill that gap.
