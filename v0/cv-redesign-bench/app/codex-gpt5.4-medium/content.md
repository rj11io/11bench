# Canonical content model

Render source: [cv-content.ts](/Users/ricardojorge/Desktop/archive/2026/repos/11bench/v0/cv-redesign-bench/app/codex-gpt5.4-medium/cv-content.ts)

This document explains what the rendered route keeps, rewrites, compresses, or leaves uncertain. The site and print layout are driven from the structured content source above.

## Source reconciliation

Primary source documents:

- `ref/RJ_CV.pdf` (2-page minified CV)
- `ref/RJ_CV_max.pdf` (6-page expanded CV)

Both PDFs agree on the core chronology, contact details, employer names, and major claims. The expanded CV contains fuller narrative framing, more stack detail, and more granular bullet points. The minified CV is already curated for two pages and is therefore the stronger source for compression choices, while the expanded CV is the stronger source for nuance and exact scope.

## Facts kept as facts

### Identity and positioning

- Extracted fact: Ricardo Jorge is based in Lisbon, Portugal.
- Extracted fact: Current professional title is AI Product Engineer.
- Extracted fact: Contact links include `rj11.io`, `github.com/rj11io`, and `linkedin.com/in/rj11io`.
- Extracted fact: Professional experience in TypeScript spans roughly a decade.
- Extracted fact: Built with React since 2016 and Next.js since 2018.
- Extracted fact: Most experience centers on dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, gaming, and AI-oriented work.
- Extracted fact: Often the first frontend hire, with responsibility for architecture, tooling, component libraries, pipelines, hiring, onboarding, and team playbooks.

### Current and recent work

- Extracted fact: `rj11io` freelancing work began in March 2025 and includes AI PDF extraction, AI SEO analytics, a GenAI dermatopathology portal, custom GPT/chat experiences, cybersecurity dashboards, proprietary data explorers, and AI agent harnesses / skills / automations.
- Extracted fact: Hunt Intelligence work ran from April 2024 to March 2025 and included data visualisation, IP History Widget, AttackCapture, HuntSQL, OpenAPI-based docs, Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.
- Extracted fact: OMEGA Systems work ran from June 2023 to April 2024, covered CORE5, dashboard/report/configuration views, and ended with a promotion into team lead responsibilities.
- Extracted fact: Phantasma Chain work ran from January 2022 to May 2023 and included the frontend monorepo, Storybook, Explorer, Playwright, GitHub Actions, Vercel, and TypeScript SDK contributions.
- Extracted fact: BinaryEdge / Coalition work ran from February 2020 to October 2021 and included Attack Surface Monitoring, Coalition Explorer, component-library ownership, visualisations, and frontend stack modernisation.

### Earlier experience and education

- Extracted fact: Earlier roles include Glaiveware, Sycret.ink, American Heart Association, NextBitt, and Science4you.
- Extracted fact: Education is IT Systems Management and Programming at Escola Profissional de Tecnologia Digital from 2013 to 2016.
- Extracted fact: The expanded CV names the Portuguese qualification: `Tecnico de Gestao e Programacao de Sistemas Informaticos`.

## Editorial rewrites and inferences

These are presentation improvements, not new facts.

- Editorial rewrite: The screen and print CV summary condenses the longer autobiographical introduction into a recruiter-facing value statement focused on seniority, ownership, domain mix, and execution range.
- Editorial rewrite: "Usually the first frontend hire" compresses multiple statements across both PDFs about owning architecture, tooling, pipelines, and growing the team.
- Editorial rewrite: "Hands-on product engineering for multiple early-stage teams" replaces the longer narrative of wearing many hats and working across multiple startups. This keeps the factual scope while removing self-promotional phrasing.
- Editorial rewrite: Project descriptions for `11io`, `11ai`, and `11bench` standardize the wording and add consistent noun phrases for faster scanning.
- Editorial inference: The route groups skills into `Product stack`, `AI and automation`, `Data and quality`, and `Leadership`. Those labels are mine, but every listed skill or responsibility comes from the source PDFs.

## Omissions and compression choices

These were required to preserve scanability and the exact two-page print limit.

- Omitted from rendered body, preserved here: the long autobiographical paragraphs about competitive gaming, management training in disguise, and being a "self-guided missile". The content is distinctive, but the phrasing is too expansive for a senior-industry CV and risks crowding out evidence.
- Compressed: the expanded per-client list under `rj11io` is grouped into three higher-order bullets instead of the original longer checklist.
- Compressed: Hunt Intelligence infrastructure detail about staging environments, release changelogs, and Slack integrations is shortened because the stronger hiring signal is product module ownership plus modern delivery stack.
- Compressed: OMEGA details about the "Tab System", "Definition of Done", and weekly "TED" talks are collapsed into one leadership / enablement bullet.
- Compressed: Phantasma's in-house hooks, white-label theming, configs, and scripts are grouped into one systems bullet.
- Compressed: Earlier roles from 2015 to 2019 are shorter than the recent roles because their main purpose is chronology and breadth, not full narrative detail.
- Omitted from rendered layout: the separate `Fun Facts` section from the minified CV. A single roots note preserves the strongest differentiator without dedicating a full recruiter-facing section to it.
- Omitted from rendered layout: `Modern Github` and `Legacy Github` as standalone projects. The main GitHub profile is still surfaced in the contact links, which is sufficient for this format.

## Conflicts, duplicates, and resolutions

- Duplicate content: Both PDFs describe the same recent roles with different levels of detail. Resolution: use the minified CV for section priority and the expanded CV for bullet precision.
- Title wording difference: some sections say `UI & Data`, others split `UI & Design` and `Data & Visualisation`. Resolution: the rendered CV does not reproduce the original skills-section taxonomy verbatim; it re-groups the same factual items into clearer buckets.
- BinaryEdge naming: the expanded CV frames the role as work across BinaryEdge and Coalition. The rendered version keeps `BinaryEdge / Coalition, Inc.` to preserve the relationship without overstating any corporate distinction not explained in the source.

## Uncertainties not silently resolved

- Uncertain exact month/day for when "a decade of professional TypeScript experience" becomes numerically `10+ years`. The PDFs support the claim directionally, so the rendered copy uses `10+ years` rather than a more precise count.
- Uncertain whether `AI Product Engineer` is a long-running external market title or the exact self-branding used only on the current CV. The rendered route preserves it as the headline because both PDFs use it consistently.
- Uncertain whether all listed personal projects are still actively maintained. The rendered route preserves the source date ranges and avoids implying more than `2025-Present` or `2026-Present`.
