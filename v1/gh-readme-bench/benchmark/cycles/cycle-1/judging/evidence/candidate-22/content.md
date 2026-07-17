# Canonical content and editorial record

This file is the source of truth for the final profile README. The two supplied
PDFs are the only biographical authorities:

- `ref/RJ_CV.pdf` - concise two-page CV.
- `ref/RJ_CV_max.pdf` - extended six-page CV.

Public web research informed presentation and compatibility, not biography.
Live URL checks were used only to confirm that links resolve.

## Source handling

Both PDFs were text-extracted and every page was rendered to an image for
visual verification. The concise CV is treated as the primary summary. The
extended CV supplies detail, voice, project dates, and older experience where
it does not conflict with the concise version.

Labels used below:

- **Fact:** directly stated in at least one PDF.
- **Reconciled fact:** combines non-conflicting wording from both PDFs.
- **Editorial synthesis:** a truthful organizing idea derived from facts, not
  a new biographical claim.
- **Omitted/uncertain:** intentionally excluded or flagged.

## Identity and contact facts

| Item | Status | PDF evidence | Canonical use |
| --- | --- | --- | --- |
| Name: Ricardo Jorge | Fact | Both PDF headers | H1 |
| Preferred name: RJ | Fact | Extended CV, "you can call me RJ" | Opening sentence |
| Role: AI Product Engineer | Fact | Both PDF headers and current role | Subtitle/opening |
| Location: Lisbon, Portugal | Fact | Both PDF headers | Contact/context line |
| B2B and remote work | Fact | Extended current roles; extended summary | Context and CTA |
| Website: `rj11.io` | Fact | Both headers/project list | Primary contact link |
| Email: `ricardojorgexyz@gmail.com` | Fact | Both headers | `mailto:` CTA |
| GitHub: `github.com/rj11io` | Fact | Both headers; extended projects | Current account context |
| LinkedIn: `linkedin.com/in/rj11io` | Fact | Both headers | Contact link |
| Full CV: `cv.rj11.io/v1/max` | Fact | Concise CV footer | Secondary detail link |
| Legacy GitHub: `github.com/ricardojrmcom` | Fact | Extended CV projects | Secondary archive link |

Link verification on 2026-07-16:

- `https://rj11.io` -> HTTP 200 (canonicalized to `https://www.rj11.io/`).
- `https://ai.rj11.io` -> HTTP 200.
- `https://bench.rj11.io` -> HTTP 200.
- `https://cv.rj11.io/v1/max` -> HTTP 200.
- Both GitHub account pages loaded publicly.
- LinkedIn returned its nonstandard crawler response (`999`), so the URL is
  preserved exactly from both PDFs rather than treated as invalid.

## Core professional story

### Direct facts

- A decade of professional TypeScript experience.
- React since 2016 and Next.js since 2018.
- On most projects, the first frontend hire.
- Owned architecture, tooling, component libraries, infrastructure/pipelines
  from day one.
- Hired, interviewed, onboarded, and wrote playbooks for team growth.
- Most experience is in dashboards, product platforms, and proprietary data
  explorers for cybersecurity, crypto, and gaming companies.
- Strong interest/specialty in data-driven products and data visualisation.
- AI work developed from early Copilot/ChatGPT use through prompt/context
  engineering to open-source skills, agent harnesses, and automation.
- Current B2B work spans multiple early-stage startups and products built from
  the ground up.

### Editorial synthesis used in the README

> I turn messy inputs into reliable products.

This is not a quoted achievement. It compresses the following source-backed
pattern:

- inputs: PDFs, OpenAPI data, cybersecurity data, scraped/enriched data;
- systems: extraction, agents, workflows, harnesses, pipelines;
- surfaces: dashboards, data explorers, documentation, chat/GPT experiences;
- delivery: tests, CI/CD, design systems, onboarding, product polish.

The more specific opening sentence,
"I work where AI systems meet data-rich interfaces," is also editorial
synthesis. It describes the overlap of the sourced work without claiming a new
title, result, or metric.

## Current projects

### 11io

- **Fact, concise CV:** `rj11.io`; personal brand for B2B freelancing.
- **Fact, extended CV:** 2025-present.
- **Fact, current experience:** hands-on AI product engineering for multiple
  early-stage startups, building projects from the ground up.
- **Canonical wording:** "B2B product engineering for early-stage teams."
  This is a concise rewrite of the above, not a claim that 11io is a separate
  incorporated employer.

### 11ai

- **Fact, concise CV:** open-source AI skills and plugins.
- **Fact, extended CV:** open-source AI skills, plugins, and workflows;
  2026-present.
- **Canonical wording:** "Open-source AI skills, plugins, and workflows."
- Preserve the spelling "open-source" as an adjective in prose.

### 11bench

- **Fact, both CVs:** open-source AI benchmarks.
- **Fact, extended CV:** 2026-present.
- **Canonical wording:** "Open-source benchmarks for testing AI work."
  "for testing AI work" is explanatory editorial wording; no claim is made
  about benchmark methodology, coverage, or results.

### Ordering

11ai and 11bench come before 11io in the README because the task asks to
prioritize current AI and open-source work. This is editorial order, not a
statement of importance or size.

## Current B2B work: supported detail

Extended CV list, reconciled with the concise CV:

- AI data extraction from PDFs.
- AI SEO analytics.
- GenAI dermatopathology portal.
- Real estate platform.
- Multiple cybersecurity dashboards.
- Multiple proprietary data explorers.
- Multiple AI chats / GPT experiences.
- AI smart scraping agents and n8n workflows.
- AI agent harnesses, skills, and automations.

The extended CV says "Smart Scrapping"; this is treated as a typographical
error and rewritten as "smart scraping." The final README selects only a subset
to avoid turning confidential or unnamed client work into a catalogue. No
client names, impact metrics, user counts, or medical claims are added.

## Selected career evidence

### Hunt Intelligence, Inc. - Product / Datavis Engineer

- **Dates:** Apr 2024-Mar 2025.
- Went deep on data visualisation for a threat-intelligence product.
- Built a modern TypeScript/Next.js/shadcn/ui codebase.
- Production and staging on Vercel.
- End-to-end tests with Playwright; CI/CD with GitHub Actions.
- Built the IP History Widget.
- Built core product modules AttackCapture(TM) and HuntSQL(TM).
- Built an API documentation platform on OpenAPI, enriching `openapi.json`
  with metadata and creating a UI described as friendlier and more intuitive
  than Swagger.

**README selection:** IP History Widget, AttackCapture, HuntSQL, and the
OpenAPI documentation platform. Tooling appears in the stack section. The
subjective Swagger comparison is omitted.

### OMEGA Systems - Senior Frontend Engineer to Team Lead

- **Dates:** Jun 2023-Apr 2024.
- Built the next generation of CORE5 with TypeScript and React.
- Promoted to lead the frontend team.
- Data visualisation for Main and Social dashboards and report/configuration
  views.
- Built localisation/internationalisation and an internal Tab System.
- Built the new-developer onboarding experience.
- Set standards for tickets, documentation, remote/async workflows, and
  Definition of Done.
- Gave weekly talks on technology and product.
- Continued shipping features end to end.

**README selection:** CORE5, promotion to lead, onboarding, and async delivery
standards. The detailed feature list and weekly-talk detail are omitted for
focus.

### Phantasma Chain - Senior Frontend Engineer

- **Dates:** Jan 2022-May 2023.
- Built a frontend monorepo for new tools/apps.
- Designed and developed Phantasma UI Storybook.
- Built Phantasma Explorer.
- Playwright tests, GitHub Actions CI, Vercel CD.
- Contributed improvements to the Phantasma TypeScript SDK.
- Built hooks, localisation, theming, environment configuration, and internal
  modules.

**README selection:** monorepo, Storybook, Explorer, and TypeScript SDK
contributions.

### BinaryEdge / Coalition, Inc. - Frontend Lead

- **Dates:** Feb 2020-Oct 2021.
- Started as a solo frontend engineer and grew a team focused on
  customer-facing security apps and internal tools.
- Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends.
- Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated
  into Coalition Explorer and Coalition Control.
- Tech lead for Coalition Explorer / Explorer 2.0, the component library, and
  data visualisations.
- Migrated frontend CI/CD from Drone to GitHub Actions.

**README selection:** solo engineer to team, Attack Surface Monitoring,
Coalition Explorer, component library, and data visualisations.

### Earlier work

- Glaiveware, Fullstack Engineer and Co-Founder, Mar 2018-Dec 2019.
- Sycret.ink, React Native Developer, Jan-Dec 2017; end-to-end encrypted
  mobile chat in a serverless environment.
- American Heart Association, Full Stack JavaScript Developer, Sep-Nov 2016;
  admin dashboard for a Kinect integration connecting collected data,
  doctors, patients, reports, and administration.
- NextBitt, Frontend Developer, Oct 2015-Jul 2016; analytics dashboards and
  reporting/auditing/management tools.
- Science4you, Java Developer internship, Jan-Mar 2015; management system for
  online-store operations.

**README selection:** one compressed sentence covering co-founding,
encrypted chat, health-data tooling, and analytics dashboards. Science4you is
omitted from the final README because the profile already establishes the 2015
start and the role adds less to the current product-engineering thesis.

## Skills ledger

### Core product stack

**Facts:** TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel.

### AI engineering

**Facts:** agent automations, custom agent skills, harness engineering, Codex,
Claude Code, n8n.

### UI and data

**Facts:** Tailwind CSS, shadcn/ui, Material-UI, design systems, Storybook,
dashboards, d3, Recharts, Nivo, web scraping, data enrichment.

### Leadership and delivery

**Facts:** team and project management, end-to-end product engineering,
product design, Agile methodologies, CI/CD, testing, GitHub Actions.

### Editorial selection

The final README uses four compact lines rather than icons or badges:

1. product stack;
2. AI systems;
3. interfaces/data;
4. delivery/leadership.

Foundational items such as HTML, CSS, JavaScript, Node.js, Git, REST, and every
historical database/cloud service are omitted. They are true but do not improve
differentiation for a senior profile.

## Personal story

### Facts

- Started coding young for fun by modding and reverse-engineering games and
  consoles.
- Built a fighting game with the MUGEN engine.
- Ran dedicated Counter-Strike, Minecraft, and other game servers.
- At 14, a LEGO Mindstorms team placed second nationally and reached the final
  four of the 2008 robotics world cup in China.
- Led gaming teams, guilds, and clans; the extended CV frames this as early
  practice in recruiting, coaching, and remote coordination.

### Canonical use

This story appears inside `<details>` after the professional evidence. It is a
memory hook, not the lead. The wording "management training in disguise" is
retained as editorial voice because the extended CV explicitly makes that
connection.

The extended CV's "self-guided missile" metaphor is omitted. It is vivid but
aggressive and less inclusive than the rest of the intended voice.

## Reconciliation notes and uncertainties

1. **Professional start vs TypeScript duration:** the extended CV says
   professional work began in 2015 and the concise CV says a decade of
   professional TypeScript. The final uses the PDF's conservative "a decade"
   rather than calculating a larger number from the current date.
2. **AI start date:** both PDFs describe use since early Copilot/ChatGPT
   releases but give no calendar date. No year is invented.
3. **Current clients:** unnamed in both PDFs. They remain unnamed.
4. **Project repository URLs:** the PDFs provide project websites but not
   individual repository URLs. The final links to the supplied websites only.
5. **Modern and legacy GitHub names:** the extended CV calls the accounts
   "Modern Github" and "Legacy Github." The final corrects the brand
   capitalization to "GitHub" and labels the older account as an archive.
6. **AHA scholarship wording:** the extended CV says the work was acquired
   through a university scholarship, while the education entry names a
   professional technology school. This unexplained wording is omitted.
7. **Robotics event naming:** preserve the PDF's generic "2008 robotics world
   cup in China"; do not infer the official competition name or city.
8. **Product outcomes:** the PDFs describe what was built, not revenue,
   adoption, latency, accuracy, or team size. No outcome metrics are invented.

## Intentionally omitted material

- Complete CV chronology and every bullet: too long for a profile.
- Education: valid but less relevant than current work after a decade of
  experience; available in the full CV.
- Full historical tool inventory: would become a badge wall in text form.
- GitHub followers, stars, repository counts, contribution streaks, top
  languages, or activity: dynamic, not supplied by the PDFs, and not a reliable
  proxy for skill.
- Claims that the work is "cutting-edge," "world-class," "innovative," or
  "high-impact": generic and unsupported.
- The automated "fleet of AI agents" sentence: supported by the extended PDF
  but omitted because the more concrete 11ai/11bench/harness descriptions are
  clearer and less theatrical.
- Client names and confidential implementation details: unavailable.
- X and Substack links visible on the live GitHub profile: not present in the
  PDFs, so they are not introduced as biographical sources.

## Voice and message architecture

### Voice

- First person.
- Direct, specific, quietly confident.
- Technical without performing jargon.
- British spelling where it appears in the source (`visualisation`), while
  product and technology names retain official spelling.
- One playful personal section; no emoji-heavy branding.

### Opening hook

**"I turn messy inputs into reliable products."**

Followed by:

> I work where AI systems meet data-rich interfaces: extraction, agents and
> automation behind the scenes; dashboards, explorers and documentation in
> front of people.

The first sentence is memorable. The second makes it concrete.

### Calls to action

Primary:

- Visit `rj11.io`.
- Email `ricardojorgexyz@gmail.com`.

Secondary:

- Inspect 11ai and 11bench.
- Read the full CV.
- Visit LinkedIn.
- Browse the 2020-2023 legacy GitHub archive.

### Final section order

1. Name, role, hook, context, contact.
2. Product-engineering flow visual.
3. Current open-source and B2B projects.
4. Working principles.
5. Selected career evidence.
6. Compact stack.
7. Optional origin story.
8. Collaboration CTA and archival links.

This ordering is the canonical story. The final README should not introduce
claims that are absent from this file.
