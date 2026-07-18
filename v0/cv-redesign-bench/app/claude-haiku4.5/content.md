# Content Model: Ricardo Jorge's CV

**Last updated:** 2026-07-16  
**Source documents:** `ref/RJ_CV.pdf` (standard), `ref/RJ_CV_max.pdf` (extended)

---

## Metadata & Contact

| Field | Value | Source | Notes |
|-------|-------|--------|-------|
| Full name | Ricardo Jorge | Both | Also goes by "RJ" (noted in RJ_CV_max) |
| Title | AI Product Engineer | Both | Current professional identity |
| Location | Lisbon, Portugal | Both | Remote-capable |
| Email | ricardojorgexyz@gmail.com | Both | Primary contact |
| Website | rj11.io | Both | Personal brand / portfolio |
| GitHub | github.com/rj11io | Both | Primary modern account |
| LinkedIn | linkedin.com/in/rj11io | Both | Professional profile |

**Decision:** Use rj11.io as primary web link. Include GitHub prominently (signals open-source engagement). LinkedIn as tertiary link.

---

## About Me (Summary)

**Reconciliation note:** Both PDFs have similar About sections. RJ_CV_max is narrative-forward and personal (3 paragraphs); RJ_CV.pdf is condensed (1 paragraph + "Fun Facts").

**Extracted facts from both:**
- Started coding young (modding/reverse-engineering games and consoles) ✓
- Built own fighting game with MUGEN engine ✓
- Ran dedicated servers (Counter-Strike, Minecraft, other titles) ✓
- Placed second nationally in 2008 robotics world cup in China (LEGO Mindstorms) ✓
- Competitive gaming taught leadership (teams, guilds, clans; LAN tournament wins) — *added in max, not in standard*
- Started professional in 2015 — *explicit in max only*
- Decade of professional TypeScript — *standard says "a decade", max doesn't state duration explicitly, but context (2015–2025) confirms ~10 years*
- React since 2016 ✓
- Next.js since 2018 ✓
- Often first frontend hire; owned architecture, tooling, component libraries, pipelines, hiring/onboarding ✓
- Built dashboards, product platforms, proprietary data explorers for cybersecurity, crypto, gaming ✓
- Data-driven products and visualizations (passion) ✓
- Built with AI since first releases of Copilot and ChatGPT — *both mention this*
- Moved from prompt engineering to full agent harnesses and automations ✓
- Max version adds: "self-guided missile" metaphor, wore many hats in startups, defaults to product engineering for impact ✓
- Max version adds: "always open to exploring exceptional opportunities" ✓

**Editorial choice:** Blend standard and max versions. Open with the human story (games, robotics, competitive gaming), then pivot to professional trajectory. Keep the "self-guided missile" metaphor—it's distinctive and accurate. Compress into a single punchy About section (goal: ~150–180 words for screen, ~280 for max).

**Final About Me (canonical):**

> I'm Ricardo Jorge, an AI Product Engineer with a decade of professional TypeScript experience. I started coding young—modding games, building my own MUGEN fighting game, and running servers for Counter-Strike and Minecraft—then competitive gaming taught me leadership. By 14, I'd reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.
>
> I went professional in 2015, specializing in frontend TypeScript (React since 2016, Next.js since 2018). On most projects I was the first frontend hire: I owned architecture, tooling, component libraries, and hiring, then grew teams around them. My experience centers on dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming—where I discovered a passion for data-driven products and visual design.
>
> I've built with AI since the first releases of Copilot and ChatGPT, moving from prompt engineering to full agent harnesses and automations. I operate as a self-guided missile: point me at a target and I'll ship the solution, using everything I've learned to avoid pitfalls and drive straight to impact. I default to product engineering, where I have the biggest and most immediate effect.

*(Word count: ~170. Fits on screen; expands naturally to 250–300 in a print context with more breathing room.)*

---

## Skills

**Reconciliation:** Both CVs have identical skill categories and mostly identical entries. RJ_CV_max adds a "Foundations" tier with JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing.

**Decision:** Include all skill categories. Consolidate Foundations into Core Stack or UI & Data (they're enabling, not differentiators for a senior engineer). Keep the 5-tier structure for clarity.

**Canonical skills structure:**

```
Core Stack
  TypeScript · React.js · Next.js · AI SDK · Convex · Playwright · Vercel

AI Engineering
  Agent Automations · Custom Agent Skills · Harness Engineering · Codex · Claude Code · n8n

UI & Design
  Tailwind CSS · shadcn/ui · Design Systems · Storybook · Refactoring UI

Data & Visualisation
  Dashboards · Data Visualisation (d3 · Recharts · Nivo) · Web Scraping · Data Enrichment

Leadership & Delivery
  Team & Project Management · End-to-End Product Engineering · Product Design · Agile Methodologies

Foundations
  JavaScript · Node.js · HTML5 · CSS · Git · GitHub Actions · REST APIs · CI/CD · Testing
```

**Note:** Material-UI appears in RJ_CV_max but not in standard. Decision: include it in UI & Design (candidate's background includes Material-UI work, e.g., Coalition Explorer, NextBitt). Don't flag as discrepancy—both are true; standard version is more recent/focused.

---

## Projects

**Reconciliation note:** RJ_CV_max includes two additional project entries (Modern Github, Legacy Github) that RJ_CV.pdf does not mention. Both are real GitHub accounts; they represent different life stages of the candidate's open-source work.

**Canonical projects (with dates from RJ_CV_max for precision):**

1. **11io** · rj11.io · 2025–Present
   - Personal brand for B2B freelancing
   - *Context:* Current primary professional presence

2. **11ai** · ai.rj11.io · 2026–Present
   - Open source AI skills, plugins, and workflows
   - *Context:* Active development of AI engineering tools

3. **11bench** · bench.rj11.io · 2026–Present
   - Open source AI benchmarks
   - *Context:* Part of broader AI tooling portfolio

4. **Modern Github** · github.com/rj11io · 2023–Present
   - Modern Github for AI open source projects
   - *Context:* Current GitHub account, focus on AI-era work
   - *Decision:* Include but brief; signals intentional rebranding and focus shift

5. **Legacy Github** · github.com/ricardojrmcom · 2020–2023
   - Open source code produced 2020–2023
   - *Decision:* Omit from main CV; keep Modern Github as the primary signal. Legacy is historical; add only if space permits on page 2

**For two-page constraint:** Include 11io, 11ai, 11bench, and Modern Github. Omit Legacy Github (historical, not current brand).

---

## Experience

**Reconciliation:** Both PDFs share the same recent roles (Mar 2025–present, Apr 2024–Mar 2025, Jun 2023–Apr 2024, Jan 2022–May 2023, Feb 2020–Oct 2021). RJ_CV_max expands earlier roles with full detail; RJ_CV.pdf mentions them in a single compressed line.

**Omit from two-page constraint:** Science4you (internship, Jan–Mar 2015), NextBitt (Oct 2015–Jul 2016). Mention via a single summary line at end of experience.

**Canonical recent roles (full detail for pages 1–1.5):**

### AI Product Engineer | Mar 2025–Present
**rj11io · rj11.io · B2B · Remote**

Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up:
- AI Data Extraction from PDFs
- AI SEO Analytics
- GenAI Dermatopathology Portal
- Real Estate Platform
- Multiple Cybersecurity Dashboards
- Multiple Proprietary Data Explorers
- Multiple AI Chats / GPT Experiences
- AI Smart Scraping Agents and n8n Workflows
- AI Agent Harnesses, Skills, and Automations

*Editorial note:* The standard CV collapses this into bullets. Max version uses fuller language. Canonical version uses bullet format (scannable, ATS-safe).

### Product / Datavis Engineer | Apr 2024–Mar 2025
**Hunt Intelligence, Inc. · hunt.io · B2B · Remote**

Left OMEGA to specialize in data visualization for threat-intelligence products:
- Built modern TypeScript codebase (Next.js, shadcn/ui, Playwright, GitHub Actions CI/CD, Vercel, Slack webhooks)
- Designed and built custom data visualization components (IP History Widget)
- Built core product modules (AttackCapture™, HuntSQL™)
- Built OpenAPI-based API documentation platform (more intuitive than Swagger)

*Decision:* Consolidate the max version's detailed narrative into clear bullets. Highlight the technical infrastructure (modern stack) and the domain specialization (data visualization).

### Senior Frontend Engineer → Team Lead | Jun 2023–Apr 2024
**OMEGA Systems · omegasys.eu · Remote**

Built next-generation iGaming platform (CORE5) with TypeScript and React; promoted to frontend team lead:
- Data visualization for Main and Social dashboards, plus reports and configuration views
- Built localization / internationalization module and internal "Tab System" UI
- As lead: created developer onboarding, set standards for tickets/documentation/async workflows
- Weekly technical talks; shipped product features end-to-end

*Decision:* Include the "promotion" aspect (shows growth trajectory). Keep bullets focused on technical contribution and leadership impact.

### Senior Frontend Engineer | Jan 2022–May 2023
**Phantasma Chain · phantasma.info · Remote**

- Built frontend monorepo for all new tools and apps
- Designed and developed Phantasma UI Storybook
- Built Phantasma Explorer
- Playwright tests, GitHub Actions CI, Vercel CD; contributed SDK improvements

### Frontend Lead | Feb 2020–Oct 2021
**BinaryEdge / Coalition, Inc. · coalitioninc.com · Remote**

Started as solo frontend engineer; grew team focused on security apps and internal tools:
- Introduced React, TypeScript, Next.js, Material-UI, and micro frontends to the stack
- Attack Surface Monitoring (ASM) on BinaryEdge Portal; later integrated into Coalition Explorer and Coalition Control
- Tech Lead for Coalition Explorer, the component library, and data visualizations
- Migrated CI/CD from Drone to GitHub Actions

*Decision:* Emphasize the growth trajectory (solo → team) and the strategic technology decisions made.

**Earlier roles (summary line for compression):**

Co-founder at Glaiveware (2018–2019), React Native engineer at Sycret.ink (2017), full-stack engineer at American Heart Association (2016), frontend engineer at NextBitt (2015–2016), and Java internship at Science4you (2015).

*Decision:* Compress into a single phrase. These are real roles but historical. One line preserves the timeline; full detail is available in RJ_CV_max if requested.

---

## Education

**Both CVs agree:**
- IT Systems Management and Programming
- Escola Profissional de Tecnologia Digital · Lisbon, Portugal
- 2013–2016
- Portuguese: Técnico de Gestão e Programação de Sistemas Informáticos

**Decision:** Keep as-is. No college/university degree (vocational training). Don't invent credentialing; this is the authentic background.

---

## Content Compression Strategy for Two Pages

**Page 1 (approximately):**
- Contact/header
- About Me (full paragraph)
- Skills (all categories, but condensed into tags/short lines)
- Projects (all 4 current projects)

**Page 2:**
- Experience (last 5 roles in detail, summary line for earlier roles)
- Education

**Target word count:** ~1150–1350 words total (fits two A4 pages at 11–12px body text with standard margins).

**Omissions & Compression:**
- Legacy Github project (historical, not essential to narrative)
- Science4you and NextBitt details (internship/early career; summarized)
- Long narrative descriptions in roles (collapsed into concise bullet points)
- "Fun Facts" section from standard CV (incorporated into About Me)

---

## Uncertainties & Flags

1. **Exact duration in current role (AI Product Engineer):** Labeled Mar 2025–Present. Given today's date (2026-07-16), that's ~16 months in role. No specifics on number of startups or current workload. *Recommendation:* Render as written; assume this is accurate.

2. **11ai and 11bench dates:** Listed as "2026–Present" in RJ_CV_max. Given today is 2026-07-16, these are very recent projects (months old). *Recommendation:* Keep as written; they exist and are current.

3. **Real Estate Platform:** Mentioned in AI Product Engineer role (RJ_CV_max) but not expanded on. No company name, timeline, or details. *Recommendation:* Keep as listed in role; don't invent details.

4. **Multiple dashboards/explorers:** RJ_CV_max lists these as separate line items under AI Product Engineer. No specifics on which companies, timelines, or deliverables. *Recommendation:* Keep as written (likely confidential or under NDA); don't fabricate details.

5. **Material-UI vs Tailwind CSS:** Material-UI appears in RJ_CV_max under "UI & Design" and is mentioned in Coalition Explorer (BinaryEdge role). Standard CV lists Tailwind CSS, not Material-UI. Both are likely true (used different tools at different times). *Recommendation:* Include both in skills; note progression from Material-UI → Tailwind/shadcn/ui in recent years.

6. **"Refactoring UI" in skills:** Appears in RJ_CV_max under UI & Design. May refer to the book "Refactoring UI" (a resource the candidate has studied) rather than a tool. *Recommendation:* Keep as written (implies design literacy); don't disambiguate in CV.

---

## Voice & Tone Notes

**Established standards for content rendering:**
- Active voice: "Built X" not "X was built"
- Specific over generic: "IP History Widget" not "data visualization components"
- Impact-focused: Mention metrics, scope, or outcomes where available (e.g., "grew team from 1→5")
- No hyperbole: Claims are factual, sourced from PDFs
- Professional confidence: State accomplishments directly; avoid diminishing language ("tried to", "helped with")

---

## Canonical Content Lock

This document is the single source of truth for all content rendered on the website. Any content changes must update this file first, then the website.

**Implementation:** The website will render data from a JSON structure derived from this markdown, ensuring the screen version and the print version pull from the same source.
