# Canonical editorial source

This file is the fact and editorial basis for `README.md`.

## Source key and extraction method

- **[C]** `ref/RJ_CV.pdf`, concise two-page CV.
- **[X]** `ref/RJ_CV_max.pdf`, extended six-page CV.
- **[B]** stated consistently in both PDFs.
- **[E]** editorial synthesis or wording, not a new biographical fact.
- **[U]** uncertainty or source tension that must not be silently resolved.

Both PDFs were:

1. inspected with `pdfinfo`;
2. rendered page-by-page to PNG with Poppler;
3. visually reviewed across all eight pages; and
4. text-extracted with `pdfplumber` for reconciliation.

Visual review was authoritative where extraction flattened columns or spacing.

## Identity and contact facts

- **[B]** Name: Ricardo Jorge.
- **[X]** Preferred short name: RJ ("you can call me RJ").
- **[B]** Current title: AI Product Engineer.
- **[B]** Location: Lisbon, Portugal.
- **[B]** Email: `ricardojorgexyz@gmail.com`.
- **[B]** Main site / B2B identity: `https://rj11.io`.
- **[B]** Current GitHub: `https://github.com/rj11io`.
- **[X]** Legacy GitHub:
  `https://github.com/ricardojrmcom`, described as open-source work produced
  from 2020 to 2023.
- **[B]** LinkedIn: `https://www.linkedin.com/in/rj11io`.
- **[B]** CV: `https://cv.rj11.io`.
- **[B]** Extended CV: `https://cv.rj11.io/v1/max`.
- **[X]** Open to exploring exceptional opportunities and invites contact
  about working together.

## Core professional story

- **[C]** A decade of professional TypeScript experience.
- **[B]** Building with React since 2016 and Next.js since 2018.
- **[B]** On most projects Ricardo was the first frontend hire.
- **[B]** Repeated responsibilities: architecture, tooling, component
  libraries, infrastructure/pipelines, hiring, interviewing, onboarding, and
  playbooks that help new engineers integrate.
- **[B]** Most experience is in dashboards, product platforms, and proprietary
  data explorers for cybersecurity, crypto, and gaming companies.
- **[B]** Strong interest and specialization in data-driven products and data
  visualisation.
- **[B]** Built with AI since early Copilot and ChatGPT releases.
- **[B]** Progressed from prompt and context engineering to open-source skills,
  agent harnesses, and automations.
- **[X]** Also names MidJourney among the early AI tools and says an automated
  fleet of agents maintains personal projects.
- **[X]** Has worked as a hands-on B2B freelancer across multiple teams for the
  past few years.

### Editorial synthesis used in the README

- **[E]** "I build control surfaces for complex systems: first for data, now
  for AI." This compresses the supported progression from dashboards/data
  explorers to current AI products/agent systems. It is a framing line, not a
  quoted historical claim.
- **[E]** Three recurring working patterns:
  1. zero-to-one frontend/product foundations;
  2. making complex data operable through interfaces and visualisation; and
  3. strengthening the team through standards, onboarding, and playbooks.
- **[E]** "From games and robotics to data products to AI systems" is the
  visual narrative. Each stage is supported below; the arrow is an editorial
  chronology.

## Personal origin

- **[B]** Started coding young for fun by modding and reverse-engineering games
  and consoles.
- **[B]** Built a fighting game with the MUGEN engine.
- **[B]** Ran dedicated servers for Counter-Strike, Minecraft, and other games.
- **[X]** At 14, LEGO Mindstorms work in science class led to a second-place
  national finish and the final four of the 2008 robotics world cup in China.
- **[C]** The same robotics result appears without the age/class context.
- **[X]** Led competitive gaming teams, guilds, and clans to high online ladder
  placements and LAN tournament wins; describes this as early recruiting,
  coaching, and remote-team experience.

### Selection

The README keeps the modding, MUGEN, server, and robotics material because it
is specific, memorable, and connects naturally to later building and
leadership. It omits the competitive ladder/LAN claim to keep the origin
section concise and avoid turning it into a second biography.

## Current projects

- **[X]** `11io` - `https://rj11.io` - 2025 to present - personal brand for B2B
  freelancing.
- **[B]** `11ai` - `https://ai.rj11.io` - open-source AI skills and plugins.
- **[X]** `11ai` dates: 2026 to present; extended description adds workflows.
- **[B]** `11bench` - `https://bench.rj11.io` - open-source AI benchmarks.
- **[X]** `11bench` dates: 2026 to present.
- **[X]** Current GitHub identity dates: 2023 to present.

### Selection and order

The README orders `11ai`, `11bench`, then `11io`. This is editorial, not
chronological: an open-source visitor is most likely to care about the AI work
and benchmarks first, while `11io` is the commercial home base.

## Experience facts and reconciliation

### rj11io - AI Product Engineer

- **[B]** March 2025 to present.
- **[X]** B2B, remote.
- **[B]** Hands-on AI product engineering for multiple early-stage startups,
  building from the ground up.
- **[X]** Named work:
  - AI data extraction from PDFs;
  - AI SEO analytics;
  - GenAI dermatopathology portal;
  - real-estate platform;
  - multiple cybersecurity dashboards;
  - multiple proprietary data explorers;
  - multiple AI chats / GPT experiences;
  - AI smart "scrapping" agents and n8n workflows;
  - AI agent harnesses, skills, and automations.
- **[U]** The source says "scrapping"; this is likely intended to mean
  "scraping", but the README does not use the disputed word.

### Hunt Intelligence, Inc. - Product / Datavis Engineer

- **[B]** April 2024 to March 2025; remote/B2B in the extended CV.
- **[B]** Specialized in data visualisation for a threat-intelligence product.
- **[X]** Built a modern TypeScript codebase with Next.js and shadcn/ui,
  production/staging on Vercel, Playwright end-to-end tests, GitHub Actions
  CI/CD, and automated release changelogs connected to Slack.
- **[B]** Built custom components such as the IP History Widget.
- **[B]** Built core modules AttackCapture™ and HuntSQL™.
- **[B]** Built an API documentation platform on OpenAPI, enriching the raw
  `openapi.json` with metadata and creating an interface described as friendlier
  and more intuitive than Swagger.

### OMEGA Systems - Senior Frontend Engineer to Team Lead

- **[B]** June 2023 to April 2024; remote in the extended CV.
- **[B]** Built the next generation of the CORE5 iGaming platform management
  system with TypeScript and React.
- **[B]** Promoted to lead the frontend team.
- **[B]** Built data visualisation for Main and Social dashboards plus report
  and configuration views.
- **[X]** Built localisation/internationalisation and an internal Tab System UI.
- **[B]** Built the new-developer onboarding experience and standards for
  tickets, documentation, and remote/async work.
- **[X]** Strong emphasis on Definition of Done; gave weekly technology/product
  talks; continued shipping end-to-end features.

### Phantasma Chain - Senior Frontend Engineer

- **[B]** January 2022 to May 2023; remote in the extended CV.
- **[B]** Built a frontend monorepo for new tools and apps.
- **[B]** Designed/developed the Phantasma UI Storybook and built Phantasma
  Explorer.
- **[B]** Used Playwright, GitHub Actions, and Vercel.
- **[B]** Contributed improvements to the Phantasma TypeScript SDK.
- **[X]** Built a custom SDK React hook, localisation, white-label theming,
  environment configs, and custom API/scripts/hooks tooling.

### BinaryEdge / Coalition, Inc. - Frontend Lead

- **[B]** February 2020 to October 2021; remote in the extended CV.
- **[B]** Started as a solo frontend engineer and grew a team for
  customer-facing security apps and internal tools.
- **[B]** Introduced React, TypeScript, Next.js, and micro frontends.
- **[X]** Extended source also names Material-UI and Nivo.
- **[B]** Built Attack Surface Monitoring on the BinaryEdge Portal, later
  integrated into Coalition Explorer and Coalition Control.
- **[B]** Tech lead for Coalition Explorer, the component library, and data
  visualisations.
- **[X]** Also led Explorer 2.0, several internal risk/claims/reporting tools,
  RSA/Security Week pages, and a Drone-to-GitHub-Actions CI/CD migration.

### Glaiveware - Fullstack Engineer, Co-Founder

- **[B]** 2018 to 2019; extended dates are March 2018 to December 2019.
- **[B]** Built bespoke web applications.
- **[X]** Learned project management and business operations.
- **[X]** Worked across React/Redux/Next.js/Node/Express, multiple databases,
  AWS infrastructure, design/branding, SEO/SEM, marketing, copywriting, and
  content management.

### Sycret.ink - React Native Developer

- **[B]** 2017; extended dates are January to December.
- **[B]** Built a React Native chat app with end-to-end encryption.
- **[X]** Serverless environment; contract team of three; libsignal-protocol,
  Android Studio, AWS API Gateway/Lambda, and SQLite.

### American Heart Association - Full Stack JavaScript Developer

- **[B]** 2016; extended dates are September to November.
- **[B]** Built a full-stack dashboard.
- **[X]** The dashboard supported a Kinect integration, connected doctors and
  patients, exposed collected data, printed reports, and managed users.
- **[X]** First full-stack JavaScript web app using React and Node, obtained
  through a scholarship.

### NextBitt - Frontend Developer

- **[B]** 2015 to 2016; extended dates are October 2015 to July 2016.
- **[B]** Built analytics dashboards.
- **[X]** Also built reporting, auditing, and management tools for asset and
  facilities management; used JavaScript/Angular.js/jQuery, .NET, date/time
  tools, and several charting libraries including d3.

### Science4you - Java Developer

- **[X]** January to March 2015 internship.
- **[X]** Built a Java/MySQL online-store management system that grew from a
  display/print tool into order management, detailed reporting, and automated
  customer emails.
- Omitted from the final README because the selected timeline already reaches
  the professional starting point through NextBitt/AHA, and this role is least
  relevant to the current profile focus.

### Timeline tension

- **[U]** Adjacent roles overlap at month granularity:
  OMEGA ends April 2024 while Hunt starts April 2024; Hunt ends March 2025
  while rj11io starts March 2025.
- Resolution: preserve the exact month ranges when shown. Do not infer exact
  handoff days or describe the roles as non-overlapping.

## Education

- **[B]** IT Systems Management and Programming, 2013 to 2016.
- **[B]** Escola Profissional de Tecnologia Digital, Lisbon, Portugal.
- **[X]** Portuguese title: Técnico de Gestão e Programação de Sistemas
  Informáticos.

Education is omitted from the final README because it does not help a GitHub
visitor understand current work as quickly as the project and product trail.
It remains available through the linked full CV.

## Skills inventory

### Directly listed

- **[B]** TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel.
- **[B]** Agent automations, custom agent skills, harness engineering, Codex,
  Claude Code, n8n.
- **[B]** Tailwind CSS, shadcn/ui, design systems, Storybook.
- **[B]** Dashboards, d3, Recharts, Nivo.
- **[B]** Team/project management, end-to-end product engineering, product
  design, agile methodologies.
- **[X]** Material-UI, Refactoring UI, web scraping, data enrichment.
- **[X]** JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs,
  CI/CD, testing.

### Selection

The README groups skills by how they are used rather than presenting every
technology as an equal badge:

1. product foundations;
2. agent systems;
3. interface and data work; and
4. delivery and leadership.

Older or role-specific technologies remain in this canonical file but are not
all promoted in the profile.

## Voice and opening

### Intended voice

- Direct, specific, calm, and technically credible.
- First person, with short sentences and concrete nouns.
- A little playful in the personal origin, but not quirky at the expense of
  clarity.
- No generic "passionate about technology", "ninja", "wizard", or
  AI-generated superlatives.

### Opening hook

> I build control surfaces for complex systems: first for data, now for AI.

This is **[E]** and is followed immediately by sourced facts: title, location,
TypeScript tenure, React/Next.js dates, and current AI product scope.

## Calls to action

Primary:

- Explore `11ai`.
- Explore `11bench`.
- Email Ricardo about product work or an exceptional opportunity.

Secondary:

- Visit `11io`.
- Read the extended CV.
- Connect on LinkedIn.
- Inspect the legacy GitHub profile for 2020-2023 open-source work.

## Material intentionally omitted

- Full CV chronology and every bullet: too dense for profile scanning.
- Live GitHub stars, followers, contribution totals, pinned-repository state,
  language statistics, and streaks: volatile and not sourced by the PDFs.
- Automated-agent-fleet claim: supported by the extended CV but likely to read
  as hype without a project explanation; the stronger, more verifiable
  harness/skill/automation wording remains.
- Competitive gaming ladders and LAN wins: memorable but secondary to the more
  concise modding/servers/robotics origin.
- Every named tool from older roles: creates a technology inventory rather
  than a present-tense profile.
- Education: valid but lower-value at profile depth; linked CV preserves it.
- Quantified business outcomes: none are stated in the PDFs, so none are
  invented.
