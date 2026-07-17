# Canonical content source: Ricardo Jorge / RJ

This file is the editorial source for `README.md`. The final README must not introduce a material claim that is absent here. Facts below are extracted from the supplied PDFs; synthesis, voice, and ordering are explicitly labeled.

## Source handling and confidence

- **Primary evidence:** `ref/RJ_CV_max.pdf` (six-page extended CV) and `ref/RJ_CV.pdf` (two-page concise CV).
- **Precedence:** the extended CV is used for fuller detail; the concise CV is used to confirm what survives deliberate compression. Neither document is treated as permission to invent missing links, metrics, employer names, or public repos.
- **Visual check:** the PDFs were rendered and reviewed. This matters for the project rows: the visible links are `rj11.io`, `ai.rj11.io`, and `bench.rj11.io`, while text extraction can concatenate the project name and link.
- **Current as-of:** the PDFs are dated 2026-07-16 in their metadata and describe `Present` work and 2026 projects. The README uses “now” only for those source-backed current entries.

## Fact ledger

### Identity and contact

| Fact | Evidence | README use |
| --- | --- | --- |
| Name: Ricardo Jorge; preferred short name: RJ | Extended CV opening: “Hi, I'm Ricardo Jorge, but you can call me RJ.” | Use both in the title line. |
| Role: AI Product Engineer | Both PDFs title the CV and current role this way. | Use as the primary headline. |
| Location: Lisbon, Portugal | Both PDF headers; extended experience also names Lisbon for Glaiveware and earlier roles. | Include in the identity line. |
| Email: `ricardojorgexyz@gmail.com` | Both PDF headers. | Include as a `mailto:` contact link. |
| Website: `rj11.io` | Both headers and project row. | Link near the top and in the CTA. |
| Current GitHub: `github.com/rj11io` | Both headers; extended project list labels it “Modern Github,” 2023–Present. | Link near the top; label the legacy account separately only if needed. |
| LinkedIn: `linkedin.com/in/rj11io` | Both PDF headers. | Link near the top and in the CTA. |
| CV site: `cv.rj11.io` | Both headers; concise PDF also points to `cv.rj11.io/v1/max`. | Omit from the main README because a profile README is already the selected story; do not add a new CV link unless needed. |

### Professional identity and operating style

These are source-backed facts, lightly compressed for the profile:

- A decade of professional TypeScript experience.
- Built on React since 2016 and Next.js since 2018.
- Often the first frontend hire, owning architecture, tooling, component libraries, infrastructure, and pipelines from day one.
- Grew teams through hiring, interviewing, onboarding, and written playbooks.
- Built dashboards, product platforms, and proprietary data explorers, especially for cybersecurity, crypto, and gaming companies.
- Found a strong interest in data-driven products and visualisations.
- Built with AI since early releases of Copilot and ChatGPT; the extended CV also names MidJourney.
- Moved from autocomplete and prompt/context engineering into custom skills, full agent harnesses, and automations.
- Works as a hands-on B2B freelancer across multiple teams and early-stage startups.
- Defaults to end-to-end product engineering and has worn multiple startup hats.

Editorial synthesis, not a biographical quote:

> Make complex systems legible, then ship the product surface and workflow around them.

This synthesis is grounded in the repeated presence of dashboards, data visualisation, explorers, product platforms, agent systems, and end-to-end ownership across both CVs. It is the README’s hook, not a new achievement claim.

### Origin story and personal signal

Facts:

- Started coding young by modding and reverse-engineering games and consoles.
- Built a fighting game with the MUGEN engine.
- Ran dedicated servers for Counter-Strike, Minecraft, and other titles.
- At 14, a LEGO Mindstorms robotics team placed second nationally and reached the final four of the 2008 robotics world cup in China.
- The extended CV says competitive gaming included leading teams, guilds, and clans to online ladder and LAN tournament wins.

Editorial use: keep the MUGEN / servers / robotics details as a short “origin” section after the professional proof. The extended CV’s management metaphor about competitive gaming is colorful, but the README will paraphrase it rather than present it as a quantified achievement.

### Current projects

| Project | Dates | Description from the PDFs | Link |
| --- | --- | --- | --- |
| 11io | 2025–Present | Personal brand for B2B freelancing | [rj11.io](https://rj11.io) |
| 11ai | 2026–Present | Open-source AI skills, plugins, and workflows | [ai.rj11.io](https://ai.rj11.io) |
| 11bench | 2026–Present | Open-source AI benchmarks | [bench.rj11.io](https://bench.rj11.io) |
| Modern Github | 2023–Present | Modern GitHub for AI open-source projects | [github.com/rj11io](https://github.com/rj11io) |
| Legacy Github | 2020–2023 | Legacy GitHub with the open-source code produced 2020–2023 | [github.com/ricardojrmcom](https://github.com/ricardojrmcom) |

Editorial selection: the first three are the README’s public project section. The two GitHub accounts become a small “archive / current home” link only if space allows; the current GitHub URL is already a primary contact path.

Uncertainty handled explicitly: text extraction from the concise PDF visually concatenates some project labels and links. The extended PDF’s rendered project rows establish the displayed link forms used above. No repository URL is inferred from a project name.

### Skills and capabilities

The README groups the CV’s lists by what a visitor can understand, not by every named library:

1. **Core product stack:** TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel.
2. **AI engineering:** agent automations, custom agent skills, harness engineering, Codex, Claude Code, n8n.
3. **UI and design systems:** Tailwind CSS, shadcn/ui, Material-UI, design systems, Storybook, Refactoring UI.
4. **Data and visualisation:** dashboards, d3, Recharts, Nivo, web scraping, data enrichment.
5. **Foundations and delivery:** JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, testing, product design, Agile methodologies, team and project management, end-to-end product engineering.

Editorial choice: show the first four groups in the visible “build with” section and let the experience bullets carry the foundations. This prevents a badge-like tools wall while preserving the source-backed vocabulary that helps a GitHub visitor orient.

### Current role: rj11io

**AI Product Engineer — Mar 2025–Present**

Source-backed work categories:

- hands-on AI product engineering for multiple early-stage startups, building projects from the ground up;
- AI data extraction from PDFs;
- AI SEO analytics;
- a GenAI dermatopathology portal;
- a real-estate platform;
- cybersecurity dashboards;
- proprietary data explorers;
- AI chats and custom GPT experiences;
- AI smart-scraping agents and n8n workflows;
- AI agent harnesses, skills, and automations.

Editorial selection: name several representative work categories to show range, but do not imply that any of these client projects are public or linkable. The README says “selected client work” only if needed and keeps the bullets linkless.

### Selected career evidence

#### Hunt Intelligence, Inc. — Product / Datavis Engineer — Apr 2024–Mar 2025

Source facts:

- Went deep on data visualisation for a threat-intelligence product.
- Built custom components such as the IP History Widget.
- Built AttackCapture™ and HuntSQL™.
- Built a modern TypeScript codebase with Next.js and shadcn/ui, production and staging on Vercel, end-to-end tests with Playwright, and CI/CD with GitHub Actions.
- Built an OpenAPI-based API documentation platform with enriched metadata and a UI intended to be friendlier and more intuitive than Swagger.

README selection: the IP History Widget, AttackCapture™, HuntSQL™, and OpenAPI docs platform are the memorable nouns; one stack line provides technical credibility.

#### OMEGA Systems — Senior Frontend Engineer → Team Lead — Jun 2023–Apr 2024

Source facts:

- Built the next generation of OMEGA’s iGaming platform management system, CORE5, with TypeScript and React.
- Promoted to lead the frontend team.
- Built data visualisation for Main and Social dashboards plus report/configuration views.
- Built localisation/internationalisation and an internal “Tab System” UI.
- Built the “New Developer” onboarding experience and set standards for tickets, documentation, remote/async workflows, and Definition of Done.
- Gave weekly “TED” talks on technology and product.

README selection: CORE5, dashboards, promotion, and onboarding standards. Omit the detailed configuration-view list from the first pass.

#### Phantasma Chain — Senior Frontend Engineer — Jan 2022–May 2023

Source facts:

- Built a frontend monorepo for new tools and apps.
- Designed and developed the Phantasma UI Storybook.
- Built Phantasma Explorer.
- Used Playwright, GitHub Actions, and Vercel for testing/CI/CD.
- Contributed improvements to the Phantasma TypeScript SDK.
- Built internal tooling for hooks, localisation, white-label theming, environment configs, and API/scripts/hooks.

README selection: monorepo, Storybook, Explorer, delivery pipeline, and SDK contributions.

#### BinaryEdge / Coalition, Inc. — Frontend Lead — Feb 2020–Oct 2021

Source facts:

- Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools.
- Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends to the frontend stack.
- Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.
- Tech Lead for Coalition Explorer / Explorer 2.0, the Coalition Storybook, component library, and data visualisations.
- Migrated frontend CI/CD from Drone to GitHub Actions.

README selection: solo-to-team growth, security apps, Attack Surface Monitoring, Coalition Explorer, and CI/CD migration.

### Earlier career and education

Source facts:

- Glaiveware — Fullstack Engineer, Co-Founder — Mar 2018–Dec 2019; bespoke web apps and learning to manage projects and run a business.
- Sycret.ink — React Native Developer — Jan–Dec 2017; a mobile chat app with end-to-end encryption in a serverless environment.
- American Heart Association — Full Stack JavaScript Developer — Sep–Nov 2016; admin dashboard for Kinect integration, user/doctor/patient workflows, reports, and superuser management.
- NextBitt — Frontend Developer — Oct 2015–Jul 2016; analytics dashboards and reporting, auditing, and management tools.
- Science4you — Java Developer — Jan–Mar 2015; internship building a Java/MySQL online-store management system.
- Education: IT Systems Management and Programming, Escola Profissional de Tecnologia Digital, 2013–2016; Portuguese qualification text: “Técnico de Gestão e Programação de Sistemas Informáticos.”

Editorial use: keep these in one collapsed “Earlier chapters” section. Surface Sycret.ink and AHA only as compact examples if the space allows; omit the complete old library/infrastructure inventory from the visible README.

### Employers and links

Links explicitly present in the PDFs and safe to use as descriptive company links:

- [rj11.io](https://rj11.io)
- [hunt.io](https://hunt.io)
- [omegasys.eu](https://omegasys.eu)
- [phantasma.info](https://phantasma.info)
- [coalitioninc.com](https://coalitioninc.com)

The README uses company links only where they help a visitor understand the role. It does not imply endorsement, current employment, or public access to client projects beyond what the PDFs state.

## Inference and rewriting ledger

These statements are editorial voice or synthesis, not new biography:

| README phrasing | Classification | Basis / guardrail |
| --- | --- | --- |
| “I make complex systems legible.” | Editorial hook | Synthesis from dashboards, data explorers, visualisation, and product platforms; not a metric or title. |
| “Where AI becomes useful.” | Editorial hook | Reframes AI product engineering and agent work; does not claim a specific outcome. |
| “From game mods to agent systems.” | Narrative bridge | Both endpoints are in the CV; the connective phrasing is editorial. |
| “A recurring work loop: find the signal, shape the surface, automate the follow-through, keep the feedback loop open.” | Editorial model | Derived from data products, visualisation, agent automations, and end-to-end ownership; clearly introduced as a pattern I keep returning to. |
| “Systems thinker” / “product-minded” | Avoid as unsupported labels unless tied to source-backed examples | The README shows evidence instead of asserting generic traits. |
| “10+ years” | Avoid arithmetic claim | The CV says “a decade of professional TypeScript experience”; use that wording. |
| “Open source” | Use only for 11ai, 11bench, and the GitHub project descriptions where the PDFs explicitly say open source | Do not label client work or every historical repository open source. |

## Omitted material and why

- **Exhaustive library lists** (Redux, Redux-Saga, Angular.js, jQuery, .NET, C#, AWS services, databases, Bootstrap, SASS, Moment.js, older chart libraries): valid historical context but not the strongest first-scan signal for an AI/product profile. Retain only where a role needs it; do not erase the fact from this source.
- **Detailed private/client project list:** the CV names categories but does not provide public links. Summarize representative categories without pretending they are public case studies.
- **Every dashboard sub-view at OMEGA:** too granular for a profile README; CORE5, data visualisation, and onboarding are sufficient anchors.
- **Full Coalition Explorer platform inventory:** claims/report/security-review sub-products are useful CV detail but too long for the profile’s first pass.
- **Detailed Glaiveware business stack and marketing work:** interesting range, but the current product/AI direction deserves the limited attention budget.
- **The phrase “self-guided missile”:** colorful source language, but it can sound aggressive and generic in a public profile. Recast as end-to-end ownership and self-directed execution through concrete evidence.
- **Live stats, follower counts, stars, streaks, trophies, or dynamic cards:** not in the PDFs and not necessary to establish identity; omit entirely.
- **A new profile photo, banner, or generated visual asset:** no image is supplied by the PDFs, and the text/story is already the stronger asset.

## Uncertainty register

1. **Project URL extraction:** the concise PDF’s selectable text concatenates some project names and domain labels; the rendered extended PDF confirms `rj11.io`, `ai.rj11.io`, and `bench.rj11.io`. Do not create repository URLs not printed in the PDFs.
2. **Client/public status:** current AI work is described as B2B freelance work across early-stage startups. The README uses categories and no client project links; it does not silently assume public demos.
3. **AI chronology:** the concise CV says “first releases of Copilot and ChatGPT”; the extended CV also names MidJourney. Use the first two as the concise profile claim and mention MidJourney only in the long-form source, not as a headline.
4. **“Modern Github” capitalization:** preserve the underlying meaning, but style the link as “current GitHub home” in the README to avoid presenting an informal CV label as a product name.
5. **“Smart Scrapping” spelling:** retain the underlying work category as “smart-scraping agents” in the editorial rewrite; do not preserve the apparent source typo.

## Voice, hook, and CTA

### Voice

Direct, technical, lightly playful, and human. Prefer concrete nouns over AI-fashion adjectives. Use UK spelling from the CV where natural (“visualisation,” “localisation”), while keeping product and technology names exact (`TypeScript`, `Next.js`, `Playwright`, `GitHub Actions`).

### Opening hook

> I make complex systems legible — from data-rich product surfaces to agent workflows that turn AI into something people can actually use.

This is editorial voice grounded in the repeated work pattern; it is not presented as a quantified result.

### Calls to action

- Primary: visit [rj11.io](https://rj11.io) or explore [11ai](https://ai.rj11.io) and [11bench](https://bench.rj11.io).
- Collaboration: email [ricardojorgexyz@gmail.com](mailto:ricardojorgexyz@gmail.com).
- Professional context: [LinkedIn](https://www.linkedin.com/in/rj11io).
- Code context: [current GitHub](https://github.com/rj11io) and, optionally, [legacy GitHub](https://github.com/ricardojrmcom).

## Final README structure

1. Name / role / location / contact row.
2. Hook and two-sentence AI/product summary.
3. Short TypeScript identity manifest.
4. “What I’m building now” with the three public projects.
5. “The thread” with a vertical Mermaid work loop and plain-text fallback.
6. “Build with” capability groups.
7. “Selected experience” with current role and four recent employers.
8. Collapsed “Earlier chapters” with the 2015–2019 trail and education.
9. “A little history” with the personal origin signal.
10. “Let’s build” CTA.

