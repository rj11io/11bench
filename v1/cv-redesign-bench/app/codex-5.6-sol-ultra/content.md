# Canonical CV content

This is the editorial source of truth for the route. The typed rendering model
in `content.ts` is the structured derivative used by `page.tsx`; JSX does not
contain a second copy of the candidate’s CV prose.

## Evidence notation

- **[E] Extracted** — directly present in one or both source PDFs.
- **[R] Rewritten** — wording compressed or clarified without changing the
  factual claim.
- **[I] Editorial inference** — a cautious synthesis supported by multiple
  extracted facts; never a new metric, employer, credential, or outcome.
- **[U] Uncertain** — evidence is incomplete, internally tensioned, or not
  specific enough to resolve silently.
- **[D] Decision** — prioritisation, omission, or compression for this version.

## Source reconciliation rules

1. `RJ_CV_max.pdf` is the fullest chronology and supplies project years, older
   role dates, and detailed role evidence.
2. `RJ_CV.pdf` is the candidate’s own two-page edit and is treated as evidence
   of priority, not as a complete record.
3. Exact names, employers, dates, product names, URLs, and claims are retained.
4. Where the short PDF compresses a detailed list, the detailed PDF is used to
   check the rewrite.
5. No external profile, company page, or search result is used to fill personal
   facts.
6. “Present” is preserved because neither PDF gives a later end date.

## Reconciled identity and links

- **[E] Name:** Ricardo Jorge
- **[E] Preferred short form used in the long narrative:** RJ
- **[E] Professional title:** AI Product Engineer
- **[E] Location:** Lisbon, Portugal
- **[E] Email:** `ricardojorgexyz@gmail.com`
- **[E] Website:** <https://www.rj11.io/>
- **[E] GitHub:** <https://github.com/rj11io>
- **[E] LinkedIn:** <https://www.linkedin.com/in/rj11io>
- **[E] CV site:** <https://cv.rj11.io/>
- **[D] No phone number is rendered because neither PDF provides one.**
- **[D] The legacy GitHub link is omitted.** The current GitHub is already a
  primary contact; a second repository identity would compete with more relevant
  work evidence.

## Canonical rendered positioning

> **[R←E]** AI product engineer with a frontend foundation, working
> professionally since 2015 and building with React since 2016 and Next.js since
> 2018.

Basis: the long PDF says “I went professional in 2015” and explicitly gives the
React and Next.js years.

> **[R←E]** Often the first frontend hire: owns architecture, tooling, design
> systems, and delivery, then helps grow the team through hiring, onboarding,
> and engineering playbooks.

Basis: both PDFs say that on most projects Ricardo was the first frontend hire,
owned architecture/tooling/component libraries/infrastructure/pipelines from
day one, and grew teams through hiring, onboarding, and playbooks. “Often” is a
slightly more cautious rewrite of “on most projects.” “Design systems” is the
canonical modern label for the extracted component-library and design-system
work.

> **[R←E]** Specialises in AI products, agent systems, dashboards, and
> proprietary data explorers across cybersecurity, crypto, gaming, and
> early-stage startups.

Basis: both PDFs name these product types and industries.

### Career signals rendered

- **[E] 2015 — Professional start**
- **[E] 2016 — Building with React**
- **[E] 2018 — Building with Next.js**
- **[I] 0 → 1 — Product and team foundations**

The final signal is editorial shorthand for “building projects from the ground
up,” “first frontend hire,” owning foundations from day one, and growing teams.
It does not add a company count or performance claim.

## Canonical rendered experience

### AI Product Engineer — rj11io

**[E] Mar 2025 – Present · B2B · Remote**  
Link: <https://www.rj11.io/>

- **[R←E]** Build AI products end to end for multiple early-stage startups,
  taking projects from the ground up.
- **[R←E]** Product work spans PDF data extraction, SEO analytics, a GenAI
  dermatopathology portal, cybersecurity dashboards, proprietary data
  explorers, and AI chat / GPT experiences.
- **[R←E]** Design agent harnesses, custom skills, automations, smart-scraping
  agents, and n8n workflows.

Notes:

- “Smart scraping” corrects the apparent source typo “smart scrapping.”
- The expanded PDF also lists a real-estate platform. **[D] It is omitted from
  the rendered bullet** because it is less differentiating for the target
  profile and space is fixed.
- No client names, metrics, or outcomes are inferred.

### Product / Datavis Engineer — Hunt Intelligence, Inc.

**[E] Apr 2024 – Mar 2025 · B2B · Remote**  
Link: <https://hunt.io/>

- **[R←E]** Specialised in data visualisation for threat intelligence,
  including custom components such as the IP History Widget.
- **[R←E]** Built AttackCapture™ and HuntSQL™ on a TypeScript / Next.js codebase
  with shadcn/ui, Playwright, Vercel, and GitHub Actions CI/CD.
- **[R←E]** Created an OpenAPI-based documentation platform, enriching raw
  schema metadata and shipping a UI designed to be more intuitive than Swagger.

Notes:

- The factual title “Product / Datavis Engineer” is preserved even though “data
  visualisation engineer” would be more conventional.
- “Designed to be more intuitive” preserves the candidate’s comparative claim
  while avoiding an unverified objective assertion that it was universally
  better than Swagger.
- Automated Slack changelog detail is omitted for space.

### Senior Frontend Engineer → Team Lead — OMEGA Systems

**[E] Jun 2023 – Apr 2024 · Remote**  
Link: <https://www.omegasys.eu/>

- **[R←E]** Joined to build CORE5, OMEGA’s next-generation iGaming platform
  management system, and was promoted to lead the frontend team.
- **[R←E]** Delivered dashboards, reports, configuration views, localisation /
  internationalisation, and an internal Tab System UI.
- **[R←E]** Built the developer onboarding experience and set standards for
  tickets, documentation, async workflows, and the Definition of Done.

**[D] Omitted/compressed:** named report screens, weekly internal “TED” talks,
and the generic “kept shipping” statement. The promotion, products, and team
enablement carry the senior signal more efficiently.

### Senior Frontend Engineer — Phantasma Chain

**[E] Jan 2022 – May 2023 · Remote**  
Link: <https://phantasma.info/>

- **[R←E]** Built the frontend monorepo for new tools and apps, the Phantasma UI
  Storybook, and Phantasma Explorer.
- **[R←E]** Implemented Playwright testing, GitHub Actions CI, and Vercel
  delivery; contributed improvements to the Phantasma TypeScript SDK.
- **[R←E]** Created shared tooling for SDK integration, localisation,
  white-label theming, environment configuration, and API / scripts / hooks.

### Frontend Lead — BinaryEdge / Coalition, Inc.

**[E] Feb 2020 – Oct 2021 · Remote**  
Link: <https://www.coalitioninc.com/>

- **[R←E]** Started as a solo frontend engineer and grew a team focused on
  customer-facing security products and internal tools.
- **[R←E]** Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro
  frontends; served as tech lead for Coalition Explorer, the component library,
  and data visualisations.
- **[R←E]** Built Attack Surface Monitoring on the BinaryEdge Portal, later
  integrated into Coalition Explorer and Coalition Control; migrated frontend
  CI/CD from Drone to GitHub Actions.

Notes:

- The PDFs present the employer as “BinaryEdge · Coalition, Inc.” The rendered
  slash makes the relationship legible without asserting a different corporate
  history.
- **[D] Omitted/compressed:** detailed internal platform list, Explorer 2.0,
  marketing pages, and separate repetition of each tech-lead responsibility.

## Canonical earlier chronology

All earlier employers and dates remain visible; each is compressed to one
sentence so that the full history survives the two-page limit.

### Fullstack Engineer, Co-Founder — Glaiveware

**[E] Mar 2018 – Dec 2019**

> **[R←E]** Co-founded a studio delivering bespoke web apps across React,
> Next.js, Node.js, AWS infrastructure, project management, design, and
> marketing.

### React Native Developer — Sycret.ink

**[E] Jan 2017 – Dec 2017**

> **[R←E]** Built an end-to-end encrypted React Native chat app under contract
> in a three-person team.

### Full Stack JavaScript Developer — American Heart Association

**[E] Sep 2016 – Nov 2016**

> **[R←E]** Built a React / Node admin dashboard for Kinect data,
> doctor-patient workflows, reports, and system administration.

### Frontend Developer — NextBitt

**[E] Oct 2015 – Jul 2016**

> **[R←E]** Created analytics, reporting, auditing, and management dashboards
> for asset and facilities management software.

### Java Developer — Science4you

**[E] Jan 2015 – Mar 2015**

> **[R←E]** Internship; expanded a Java / MySQL back-office tool into an
> order-management, reporting, and customer-email application.

## Canonical open-source projects

### 11io

- **[E] Period:** 2025 – Present
- **[E] URL:** <https://www.rj11.io/>
- **[R←E] Description:** Personal brand for B2B freelancing.

### 11ai

- **[E] Period:** 2026 – Present
- **[E] URL:** <https://ai.rj11.io/>
- **[R←E] Description:** Open-source AI skills, plugins, and workflows.

### 11bench

- **[E] Period:** 2026 – Present
- **[E] URL:** <https://bench.rj11.io/>
- **[R←E] Description:** Open-source AI benchmarks.

## Canonical technical range

Skills are grouped for scanning, but every rendered term appears in the PDFs.

- **Core engineering [E]:** TypeScript · React · Next.js · JavaScript · Node.js
  · Convex · REST APIs
- **AI product [E]:** AI SDK · Agent automations · Custom agent skills · Harness
  engineering · Codex · Claude Code · n8n
- **UI and data [E]:** Tailwind CSS · shadcn/ui · Design systems · Storybook ·
  Dashboards · d3 · Recharts · Nivo
- **Delivery and leadership [E]:** Playwright · GitHub Actions · CI/CD · Vercel
  · Team and project management · Product design

**[D] Omitted from the rendered skill list:** HTML5, CSS, Git, testing as a
generic term, Material-UI duplication, Agile methodologies, Refactoring UI, web
scraping, and data enrichment. They are either foundational, already evidenced
inside roles, lower priority for the target profile, or redundant under the
space constraint.

## Canonical education and distinction

### Education

- **[E] Programme:** IT Systems Management and Programming
- **[E] School:** Escola Profissional de Tecnologia Digital
- **[E] Location:** Lisbon, Portugal
- **[E] Period:** 2013 – 2016
- **[E] Original credential:** Técnico de Gestão e Programação de Sistemas
  Informáticos

No academic degree equivalence is inferred.

### Earlier distinction

> **[R←E]** Second nationally and final four at the 2008 robotics world cup in
> China, programming LEGO Mindstorms.

**[U]** Neither PDF names the competition formally. The source wording
“robotics world cup” is therefore preserved rather than silently normalised to
a guessed event name.

## Conflicts and uncertainties

1. **“A decade of professional TypeScript experience.” [U]** The concise PDF
   makes this explicit claim, but the detailed chronology names Java in early
   2015, JavaScript/jQuery/Angular/.NET in 2015–2016, and does not explicitly
   evidence TypeScript until later work. The claim is recorded here but not used
   as the headline. The defensible rendered statement is “working
   professionally since 2015.”
2. **AI start date. [U]** The PDFs say Ricardo has built with AI since the first
   releases of Copilot, ChatGPT, and MidJourney, but provide no exact date.
   Nothing in the rendered CV converts that into a numeric duration.
3. **Current freelance client details. [U]** Project domains are named, clients
   and metrics are not. None are invented.
4. **Robotics competition name. [U]** Kept in source wording, as described
   above.
5. **British/US spelling. [D]** The sources mainly use British spelling
   (“visualisation”, “localisation”). That convention is retained.

## Global omissions for the two-page edition

- The long autobiographical opening, competitive-gaming management analogy,
  “self-guided missile” metaphor, greeting, and availability paragraph.
- The MUGEN and dedicated-game-server anecdotes.
- Repeated foundation skills already demonstrated by experience.
- Exhaustive technology inventories for Glaiveware, Sycret.ink, NextBitt, and
  Science4you.
- Legacy GitHub.
- Product lists whose important signal is already represented by stronger
  examples.
- Any objective statement, references, portrait, proficiency meter, or invented
  quantitative achievement.

The robotics result is the only “fun fact” retained because it is technical,
specific, and unusually memorable.

