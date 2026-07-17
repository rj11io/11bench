# Content Source

This file is the canonical editorial source for `README.md`.

Input PDFs:

- `ref/RJ_CV.pdf`: concise two-page CV.
- `ref/RJ_CV_max.pdf`: extended six-page CV.

Extraction method:

- `pdfinfo` confirmed `RJ_CV.pdf` has 2 pages and `RJ_CV_max.pdf` has 6 pages.
- `pdftotext` was not available locally.
- Text was extracted with bundled Python `pdfplumber`.
- Embedded links were checked with bundled Python `pypdf`.

## Extracted Facts

### Identity And Contact

Facts from both PDFs:

- Name: Ricardo Jorge.
- Also uses: RJ.
- Role: AI Product Engineer.
- Location: Lisbon, Portugal.
- Email: `ricardojorgexyz@gmail.com`.
- Website: `https://www.rj11.io/`.
- GitHub: `https://github.com/rj11io`.
- LinkedIn: `https://www.linkedin.com/in/rj11io`.
- CV site: `https://cv.rj11.io/`.

### Opening Story

Facts from the concise CV:

- Started coding young for fun by modding and reverse-engineering games and consoles.
- Built a fighting game with the MUGEN engine.
- Ran dedicated servers for Counter-Strike, Minecraft, and other titles.
- Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.

Additional facts from the extended CV:

- At 14, LEGO Mindstorms in science class took the team to the second-place national finish and final four of the 2008 robotics world cup in China.
- Competitive gaming involved leading teams, guilds, and clans to top online ladders and LAN tournament wins.
- The extended CV frames this as early management training: recruiting, coaching, and aligning remote teams.

Editorial use:

- Keep this as one memorable line, not a long childhood section.
- Use it to explain why systems, teams, and products are part of the identity.

### Professional Summary

Facts from both PDFs:

- Professional since 2015.
- A decade of professional TypeScript experience is claimed in the concise CV.
- Building with React since 2016.
- Building with Next.js since 2018.
- Often the first frontend hire on projects.
- Owned architecture, tooling, component libraries, infrastructure, and pipelines from day one.
- Grew teams through hiring, interviewing, onboarding, and playbooks.
- Most experience is in dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies.
- Strong interest in data-driven products and visualisations.
- Built with AI since the first releases of Copilot and ChatGPT; the extended CV also mentions MidJourney.
- Progressed from prompt/context engineering to custom open-source skills, agent harnesses, and automations.
- Extended CV says he runs an automated fleet of AI agents that maintain his personal projects.
- Extended CV describes current B2B freelance work across multiple teams.

Reconciliation:

- The concise CV says "creating suite of open-source skills"; extended CV says "Open source AI skills, plugins, and workflows" under `11ai`.
- Use "open-source AI skills, plugins, and workflows" for precision.
- "Past few years" of B2B freelancing appears in the extended narrative, but the explicit `rj11io` role starts in Mar 2025. In the README, say "currently" rather than dating freelancing back beyond the role date.

### Skills

Facts from both PDFs:

- Core stack: TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel.
- AI engineering: agent automations, custom agent skills, harness engineering, Codex, Claude Code, n8n.
- UI and data/design: Tailwind CSS, shadcn/ui, design systems, Storybook, dashboards, data visualisation with d3, Recharts, and Nivo.
- Leadership and delivery: team and project management, end-to-end product engineering, product design, agile methodologies.

Additional facts from extended CV:

- Material-UI, Refactoring UI.
- Web scraping and data enrichment.
- Foundations: JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, testing.

Editorial use:

- Group into four readable clusters:
  - Product AI: AI SDK, agent harnesses, automations, custom skills, n8n.
  - Web product: TypeScript, React, Next.js, Convex, Vercel.
  - Interfaces: Tailwind CSS, shadcn/ui, design systems, Storybook, data visualisation.
  - Reliability: Playwright, GitHub Actions, CI/CD, testing.
- Do not imply every listed tool was used in every project.

### Projects

Facts from both PDFs:

- `11io`: `https://www.rj11.io/`; personal brand for B2B freelancing; 2025 - Present in extended CV.
- `11ai`: `https://ai.rj11.io/`; open-source AI skills, plugins, and workflows; 2026 - Present in extended CV.
- `11bench`: `https://bench.rj11.io/`; open-source AI benchmarks; 2026 - Present in extended CV.

Facts from extended CV:

- Modern GitHub: `https://github.com/rj11io`; 2023 - Present; modern GitHub for AI open-source projects.
- Legacy GitHub: `https://github.com/ricardojrmcom?tab=repositories`; 2020 - 2023; legacy GitHub with open-source code produced 2020-2023.

Editorial use:

- Feature `11io`, `11ai`, and `11bench`.
- Include modern and legacy GitHub links as small context, not a major section.
- Do not claim repository stars, adoption, users, benchmark results, or integrations.

### Experience

Facts from both PDFs:

- AI Product Engineer, `rj11io`, Mar 2025 - Present, B2B, remote.
  - Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.
  - Work includes AI data extraction from PDFs, AI SEO analytics, GenAI dermatopathology portal, real estate platform, cybersecurity dashboards, proprietary data explorers, AI chats/GPT experiences, AI smart scraping agents and n8n workflows, AI agent harnesses, skills, and automations.
- Product / Datavis Engineer, Hunt Intelligence, Inc., Apr 2024 - Mar 2025, remote.
  - Threat-intelligence data visualisation product.
  - Built modern TypeScript/Next.js/shadcn/ui codebase, Vercel production/staging, Playwright tests, GitHub Actions CI/CD, automated release changelogs to Slack.
  - Built IP History Widget, AttackCapture, HuntSQL, and an OpenAPI-based documentation platform.
- Senior Frontend Engineer -> Team Lead, OMEGA Systems, Jun 2023 - Apr 2024, remote.
  - Built CORE5 iGaming platform management system with TypeScript and React.
  - Promoted to lead frontend team.
  - Built data visualisations for dashboards and reports; localisation/internationalisation module; internal Tab System UI.
  - Built onboarding, ticket/documentation standards, remote/async workflows, "Definition of Done", weekly talks.
- Senior Frontend Engineer, Phantasma Chain, Jan 2022 - May 2023, remote.
  - Built frontend monorepo, Phantasma UI Storybook, Phantasma Explorer.
  - Playwright tests, GitHub Actions CI, Vercel CD.
  - Contributed improvements to Phantasma TypeScript SDK.
- Frontend Lead, BinaryEdge / Coalition, Inc., Feb 2020 - Oct 2021, remote.
  - Started solo and grew team for customer-facing security apps and internal tools.
  - Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends.
  - Worked on Attack Surface Monitoring, Coalition Explorer, component library, data visualisations, GitHub Actions migration.

Earlier facts from the concise and extended CV:

- Fullstack Engineer, Co-Founder at Glaiveware, Mar 2018 - Dec 2019, Lisbon/remote; bespoke web apps and business/project management.
- React Native Developer at Sycret.ink, Jan 2017 - Dec 2017, Neuchatel/remote; mobile chat app with end-to-end encryption using React Native and libsignal-protocol.
- Full Stack JavaScript Developer for American Heart Association, Sep 2016 - Nov 2016, remote; admin dashboard for Kinect integration, doctors/patients/data/reports.
- Frontend Developer at NextBitt, Oct 2015 - Jul 2016, Lisbon; analytics dashboards and asset/facilities management tools.
- Java Developer internship at Science4you, Jan 2015 - Mar 2015, Lisbon; online store management system with Java and MySQL.

Editorial use:

- The README should not paste the timeline.
- Use experience as proof clusters: AI product builds, threat intelligence/data visualisation, iGaming platform/team lead, crypto explorer/storybook, cybersecurity attack surface tools, early analytics dashboards.
- Mention selected employers in a compact "career compression" section.

### Education

Facts from both PDFs:

- IT Systems Management and Programming, Escola Profissional de Tecnologia Digital, 2013 - 2016, Lisbon, Portugal.
- Portuguese title in extended CV: Tecnico de Gestao e Programacao de Sistemas Informaticos.

Editorial use:

- Omit from final README unless needed for a fuller CV link. The profile already links to the CV site.

## Inferences And Rewriting

Supported editorial inference:

- "Turns ambiguous, data-heavy product problems into working interfaces and agent systems" is a rewrite of current AI product work, data extractors, dashboards, data explorers, and agent harnesses. It is not a separate factual claim.
- "Product from zero" is supported by multiple lines saying he builds projects from the ground up and was often the first frontend hire.
- "Data-heavy interfaces" is supported by dashboards, data visualisation, proprietary data explorers, cybersecurity, crypto, and gaming work.
- "AI-native tooling" is a framing of AI SDK, agent skills, harness engineering, Codex, Claude Code, n8n, and AI automations.

Avoided inference:

- No claims about revenue, users, scale, stars, open-source adoption, benchmark quality, or number of maintained agents.
- No claim that public GitHub activity fully represents the work, because much of the CV describes proprietary B2B/client work.
- No claim that `11bench` has published specific benchmark results.
- No claim that `11ai` includes particular named plugins beyond "skills, plugins, and workflows."

## Omitted Material

- Detailed early job bullets from Science4you, NextBitt, American Heart Association, Sycret.ink, and Glaiveware: omitted to avoid CV paste; referenced only as "earlier analytics, full-stack, mobile, and bespoke web app work" where useful.
- Education: omitted because the profile is stronger with current AI/product/open-source work and a CV link covers formal history.
- Weekly OMEGA talks, "self-guided missile" phrase, "Have a nice day!" and other CV voice: omitted because some wording is too CV-specific or could read abrasive in a GitHub profile.
- Full list of every technology: compressed into clusters to avoid a badge wall.
- Live GitHub follower/star counts and pinned repo stats: omitted because they are outside the PDFs and can change.

## Voice

Target voice:

- Direct, technical, personal, and slightly playful.
- Senior product engineer, not job seeker boilerplate.
- Specific enough for founders, engineering leads, and open-source visitors.

Opening hook:

- "I build AI products where the hard parts are messy inputs, data-rich interfaces, and agentic workflows that need to survive contact with real users."

Calls to action:

- Explore `11ai` for open-source AI skills/plugins/workflows.
- Explore `11bench` for AI benchmarks.
- Visit `rj11.io` for B2B product engineering.
- Contact via email or LinkedIn.
