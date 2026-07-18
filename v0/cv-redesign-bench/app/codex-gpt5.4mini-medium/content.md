# Content Model

This file is the canonical editorial model for the route. The implementation renders the structured data in `content.ts`; this document explains how the source PDFs were merged and what was compressed for the two-page limit.

## Identity

- Name: Ricardo Jorge
- Title: AI Product Engineer
- Location: Lisbon, Portugal
- Email: ricardojorgexyz@gmail.com
- Website: rj11.io
- GitHub: github.com/rj11io
- LinkedIn: linkedin.com/in/rj11io
- CV URL: cv.rj11.io

## Provenance legend

- `[direct]` copied or lightly normalized from one PDF
- `[merged]` combines matching facts from both PDFs
- `[editorial]` rewritten for clarity without changing meaning
- `[compressed]` intentionally shortened to fit the page budget

## Page 1

### About

- `[merged]` AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018.
- `[merged]` On most projects, first frontend hire who owned architecture, tooling, component libraries, and pipelines from day one, then helped grow the team through hiring, interviewing, onboarding, and playbooks.
- `[merged]` Most experience is building dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies.
- `[merged]` Built with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to open-source skills, agent harnesses, and automations.

### Skills

- Core stack: TypeScript, React, Next.js, AI SDK, Convex, Playwright, Vercel
- AI engineering: Agent automations, Custom agent skills, Harness engineering, Codex, Claude Code, n8n
- UI and data: Tailwind CSS, shadcn/ui, Design systems, Storybook, Dashboards, Data visualisation
- Leadership and delivery: Team and project management, End-to-end product engineering, Product design, Agile methodologies

### Selected work

- `11io` - https://rj11.io - Personal brand for B2B freelancing.
- `11ai` - https://ai.rj11.io - Open source AI skills, plugins, and workflows.
- `11bench` - https://bench.rj11.io - Open source AI benchmarks.

### Experience

#### AI Product Engineer

- Company: rj11io
- Link: rj11.io
- Dates: Mar 2025 - Present
- Location: Remote

Bullets:

- `[direct]` Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.
- `[merged]` Delivered AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, AI chats, custom GPT experiences, and real-estate and cybersecurity products.
- `[merged]` Built AI agent harnesses, skills, and automations, including smart-scraping workflows and personal-project maintenance agents.

#### Product / Datavis Engineer

- Company: Hunt Intelligence, Inc.
- Link: hunt.io
- Dates: Apr 2024 - Mar 2025
- Location: Remote

Bullets:

- `[merged]` Focused on threat-intelligence visualisation, including custom components such as the IP History Widget.
- `[merged]` Built AttackCapture and HuntSQL on a modern TypeScript codebase with the latest Next.js, shadcn/ui, Playwright, GitHub Actions, and Vercel.
- `[merged]` Shipped a friendlier API documentation site on top of OpenAPI, aimed to be clearer than Swagger.

## Page 2

### Experience

#### Senior Frontend Engineer -> Team Lead

- Company: OMEGA Systems
- Link: omegasys.eu
- Dates: Jun 2023 - Apr 2024
- Location: Remote

Bullets:

- `[merged]` Built CORE5, the next generation of OMEGA's iGaming platform management system, with TypeScript and React.
- `[merged]` Owned data visualisation for the Main and Social dashboards, plus report and configuration views.
- `[merged]` As lead, shaped developer onboarding, ticket standards, documentation, and remote and async workflows.

#### Senior Frontend Engineer

- Company: Phantasma Chain
- Link: phantasma.info
- Dates: Jan 2022 - May 2023
- Location: Remote

Bullets:

- `[merged]` Built the frontend monorepo for new tools and apps, plus the Phantasma UI Storybook and Phantasma Explorer.
- `[merged]` Set up Playwright testing, GitHub Actions CI, and Vercel CD, and contributed improvements to the Phantasma TypeScript SDK.
- `[merged]` Added in-house utilities for localisation, white-label theming, environment config, and API/scripts/hooks orchestration.

#### Frontend Lead

- Company: BinaryEdge / Coalition, Inc.
- Link: coalitioninc.com
- Dates: Feb 2020 - Oct 2021
- Location: Remote

Bullets:

- `[merged]` Started as the solo frontend engineer and grew a team around customer-facing security apps and internal tools.
- `[merged]` Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, the component library, and data visualisations.
- `[merged]` Built Attack Surface Monitoring for the BinaryEdge Portal and later integrated it into Coalition Explorer and Coalition Control.

#### Earlier roles

- Company set: Glaiveware, Sycret.ink, American Heart Association, NextBitt, Science4you
- Dates: 2015 - 2019
- Location: Lisbon, Portugal and Remote

Bullets:

- `[compressed]` Co-founder at Glaiveware building bespoke web apps; React Native chat app with end-to-end encryption at Sycret.ink; full-stack dashboard work for the American Heart Association; analytics dashboards at NextBitt; Java and MySQL internship work at Science4you.

### Education

- `[direct]` IT Systems Management and Programming
- `[direct]` Escola Profissional de Tecnologia Digital
- `[direct]` 2013 - 2016

## Omissions and compression

- `[compressed]` The fun-facts section from the minified PDF is omitted from the rendered CV.
- `[compressed]` The detailed "Modern Github" and "Legacy Github" project entries from the max PDF are omitted.
- `[compressed]` The max PDF's extra narrative about gaming, self-guided-missile working style, and current AI agent fleet is reduced to one professional summary paragraph.
- `[compressed]` The earlier roles after BinaryEdge are collapsed into one line so the two-page limit remains stable.
- `[editorial]` No metrics were invented. Phrases like "friendlier than Swagger" and "first frontend hire" remain as qualitative claims because they appear in the source PDFs.

## Uncertainties

- The PDFs clearly show `rj11io` as the freelance/company brand and `rj11.io` as the website. I have preserved that distinction.
- The max PDF contains a few line-wrap artifacts in extracted text. The canonical URLs were inferred from the rendered output where the line breaks split the visible strings.
