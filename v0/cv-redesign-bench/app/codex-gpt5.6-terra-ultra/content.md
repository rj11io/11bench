# Canonical content model

## Source evidence and reconciliation

The two immutable sources are `ref/RJ_CV.pdf` (the concise two-page CV,
referred to below as **S**) and `ref/RJ_CV_max.pdf` (the extended six-page CV,
referred to below as **M**). The concise version establishes the intended
two-page prioritization; the extended version supplies exact older dates,
locations, and detailed role evidence. `content.ts` is the structured
presentation model derived from this file. The route renders only from that
structured model; there is no separate hardcoded CV copy in `page.tsx`.

| Area | Directly extracted facts | Source |
| --- | --- | --- |
| Identity | Ricardo Jorge; AI Product Engineer; Lisbon, Portugal; `ricardojorgexyz@gmail.com` | S p.1; M p.1 |
| Contact links | `https://www.rj11.io/`, `https://github.com/rj11io`, `https://www.linkedin.com/in/rj11io`, and header link `https://cv.rj11.io/` | S p.1; M p.1 |
| Career foundation | Professional since 2015; React since 2016; Next.js since 2018. S calls out a decade of professional TypeScript experience. | S p.1; M p.1 |
| Core focus | Dashboards, product platforms, and proprietary data explorers across cybersecurity, crypto, and gaming; data-driven products and visualisation. | S p.1; M p.1 |
| Team scope | Often first frontend hire; architecture, tooling, component libraries, infrastructure/pipelines; hiring, interviewing, onboarding, and playbooks. | S p.1; M p.1 |
| AI scope | Work began with early Copilot/ChatGPT releases; prompt/context engineering, agent harnesses, skills, and automations. | S p.1; M pp.1-2 |

### Roles retained in the rendered chronology

| Dates | Direct facts retained | Rendering treatment |
| --- | --- | --- |
| Mar 2025 - Present | **AI Product Engineer**, rj11io, B2B, Remote. AI PDF extraction, AI SEO analytics, GenAI dermatopathology portal, real-estate platform, cybersecurity dashboards, data explorers, AI chats/GPT experiences, n8n workflows, agent harnesses/skills/automations. | Two compressed bullets, page one. |
| Apr 2024 - Mar 2025 | **Product / Datavis Engineer**, Hunt Intelligence, Inc., B2B, Remote. Threat-intelligence data visualization; IP History Widget; AttackCapture™; HuntSQL™; TypeScript/Next.js/shadcn/ui; Vercel, Playwright, GitHub Actions; enriched OpenAPI docs. | Two compressed bullets, page one. |
| Jun 2023 - Apr 2024 | **Senior Frontend Engineer -> Team Lead**, OMEGA Systems, Remote. CORE5 TypeScript/React platform; promotion; dashboard/report/configuration views; onboarding, documentation, tickets, remote/async workflow standards. | Two compressed bullets, page one. |
| Jan 2022 - May 2023 | **Senior Frontend Engineer**, Phantasma Chain, Remote. Frontend monorepo, Phantasma Explorer, UI Storybook, SDK/shared tooling; Playwright, GitHub Actions, Vercel. | Two compressed bullets, page one. |
| Feb 2020 - Oct 2021 | **Frontend Lead**, BinaryEdge · Coalition, Inc., Remote. Began solo and grew team; introduced React, TypeScript, Next.js, micro frontends; Attack Surface Monitoring, Coalition Explorer, component/data visualization work, GitHub Actions migration. | Two compressed bullets, page two. |
| Mar 2018 - Dec 2019 | **Fullstack Engineer, Co-Founder**, Glaiveware, Lisbon, Portugal, Remote. Bespoke apps across React/Redux/Next.js/Node/AWS and product/brand work. | One source-backed compression bullet, page two. |
| Jan 2017 - Dec 2017 | **React Native Developer**, Sycret.ink, Neuchâtel, Switzerland, Remote. Contract, three-person team, encrypted serverless chat app. | Compact title/employer/date chronology, page two. |
| Sep 2016 - Nov 2016 | **Full Stack JavaScript Developer**, American Heart Association, Remote. React/Node admin dashboard for Kinect integration with data, doctor/patient, report, and superuser functions. | Compact title/employer/date chronology, page two. |
| Oct 2015 - Jul 2016 | **Frontend Developer**, NextBitt, Lisbon, Portugal. Analytics dashboards and reporting/auditing/management tools for asset and facilities-management software. | Compact title/employer/date chronology, page two. |
| Jan 2015 - Mar 2015 | **Java Developer**, Science4you, Lisbon, Portugal, internship. Java/MySQL online-store management system for orders, reports, and automated customer emails. | Compact title/employer/date chronology, page two. |

### Other direct facts retained

- **Projects:** 11io / `rj11.io` (personal brand for B2B freelancing,
  2025 - Present); 11ai / `ai.rj11.io` (open-source AI skills, plugins, and
  workflows, 2026 - Present); 11bench / `bench.rj11.io` (open-source AI
  benchmarks, 2026 - Present). S p.1; M pp.2-3.
- **Toolkit:** TypeScript, React, Next.js, AI SDK, Convex, Playwright, Vercel;
  agent automations, custom agent skills, harness engineering, Codex, Claude
  Code, n8n; Tailwind CSS, shadcn/ui, design systems, Storybook, dashboards,
  data visualisation (d3, Recharts, Nivo); delivery/product skills. S p.1;
  M p.2.
- **Education:** IT Systems Management and Programming, Escola Profissional de
  Tecnologia Digital, Lisbon, Portugal, 2013 - 2016; "Técnico de Gestão e
  Programação de Sistemas Informáticos." S p.2; M p.6.

## Editorial rewriting, not new claims

| Rendered wording | Evidence it compresses | Editorial status |
| --- | --- | --- |
| "Professional software engineer since 2015" | M names the 2015 Science4you role; S/M establish later career chronology. | Date-led synthesis, not a new credential. |
| "Often the first frontend hire... then helps teams scale" | Direct source claims about first frontend hire, ownership, hiring/interviewing/onboarding/playbooks. | Sentence structure and pronoun changed only. |
| "Build AI product foundations..." | Current role's ground-up early-stage projects and project list. | Action-led compression; no client count, metric, or result invented. |
| "Built a ... product foundation" at Hunt | Source lists the codebase, environments, testing, CI/CD, and documentation platform. | Compression of listed implementation work. |
| "Delivered ... while setting ... standards" at OMEGA | Source lists dashboard/report work and standards for onboarding, tickets, documentation, remote/async workflow. | Compression; no scope or outcome added. |
| "Co-founded ... and delivered end-to-end work" at Glaiveware | Source says co-founder, bespoke apps, broad stack, and beyond-code work. | Compression; does not imply metrics or named clients. |

Spelling and title normalization is deliberate editorial cleanup only:
`Github` becomes `GitHub`; `Datavis` is retained as the source title; the
promotion arrow becomes ASCII `->`; `AI Smart Scrapping` is not reused, so no
assumption about the intended spelling is necessary. Dates use ASCII hyphens
for print reliability.

## Uncertainties and disciplined handling

| Uncertainty | Handling |
| --- | --- |
| OMEGA ends in Apr 2024 and Hunt begins in Apr 2024. | Preserve both authored date ranges. Do not characterize the month as overlap or a same-month transfer. |
| American Heart Association Sep-Nov 2016 overlaps NextBitt Oct 2015-Jul 2016. | Preserve both authored date ranges. Do not characterize the work as concurrent or sequential. |
| S says a decade of professional TypeScript experience, while M's early 2015 role is Java and its 2015-16 role is JavaScript/.NET. | The profile attributes the decade language to S instead of independently calculating it. |
| BinaryEdge and Coalition relationship. | Preserve exact source construction "BinaryEdge · Coalition, Inc." and avoid claiming acquisition, employer sequence, or ownership. |
| rj11io and 11io likely relate but are differently named in the sources. | Preserve rj11io as current employer/role and 11io as independent project; do not equate them. |
| No degree level, phone number, certifications, language proficiency, or additional social links are supplied. | Do not add any. |

## Omissions and two-page compression choices

- Omitted from the rendered page: the personal gaming narrative, MUGEN and
  server anecdote, LEGO Mindstorms result, availability note, and lengthy
  personal voice. These are factual but less relevant than the most recent
  engineering evidence under a two-page constraint.
- Omitted from the rendered project list: Modern GitHub and Legacy GitHub;
  the current GitHub link is already present in the contact strip and the
  extra project entries duplicate it.
- Compressed rather than omitted: older roles retain their factual titles,
  employers, dates, locations/context where available, and one evidence-led
  line. Expanded feature lists, stacks, and internal platform names remain in
  the evidence record above but not in the two-page presentation.
- Skills are grouped and deduplicated. Material-UI, Refactoring UI, web
  scraping, data enrichment, and foundations such as Git/REST/HTML/CSS are
  omitted from the displayed toolkit because they are either represented in
  role evidence or lower signal than the selected senior product-engineering
  keywords.

## Rendering contract

`content.ts` is the only canonical structured data import used by the route.
`page.tsx` maps its section labels, profile, milestones, experience, projects,
skills, and education rather than restating them. Any content alteration should
first be made here, reconciled against S/M, then reflected in `content.ts`.
