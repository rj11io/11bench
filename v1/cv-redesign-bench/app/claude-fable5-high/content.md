# Content model — Ricardo Jorge, AI Product Engineer

This file is the canonical content for the CV site. The website renders from
[`content.ts`](./content.ts), which is a direct structured transcription of
the "Canonical content" section below — same facts, same wording. If the two
ever disagree, this file wins and `content.ts` must be fixed.

## Sources and labels

Two reference PDFs, both treated as immutable evidence:

- **MIN** — `ref/RJ_CV.pdf`, the candidate's own 2-page condensed CV.
- **MAX** — `ref/RJ_CV_max.pdf`, the full 6-page version ("Read the full
  story at cv.rj11.io/v1/max").

Every item below carries one of these labels:

- **[extracted]** — stated verbatim (or near-verbatim) in at least one PDF.
- **[rewritten]** — the fact comes from the PDFs; the wording is mine,
  changed only for clarity, brevity, or scan order. No new facts.
- **[inferred]** — an editorial judgment (ordering, grouping, emphasis),
  never a new fact, date, metric, or claim.

## Reconciliation between MIN and MAX

| Topic | MIN | MAX | Resolution |
| --- | --- | --- | --- |
| Experience length | "a decade of professional TypeScript experience" | "went professional in 2015" | Consistent (2015 → 2025/26 ≈ a decade+). Use "professional since 2015; React since 2016, Next.js since 2018" — both PDFs agree on those three anchors. |
| Skills grouping | 4 groups; "UI & Data" merged | 6 groups; splits "UI & Design" and "Data & Visualisation", adds "Foundations" | Use MIN's tighter 4-group model for space, but restore MAX's split naming inside two groups where it scans better. Foundations group omitted (see omissions). |
| Projects list | 3 projects, no dates | 5 projects with dates (adds Modern/Legacy GitHub) | Keep the 3 flagship projects with MAX's dates. The two GitHub profiles are represented by the github.com/rj11io contact link; the legacy profile is omitted (see omissions). |
| 11ai description | "Open source AI skills and plugins" | "Open source AI skills, plugins, and workflows" | Use MAX's fuller wording — it is a superset. |
| rj11io role bullets | 3 condensed bullets | 9 itemized project types | Merge: keep MIN's grouping, restore the MAX items it dropped (real-estate platform, scraping agents / n8n workflows) so nothing material is lost. |
| Science4you internship | Omitted | Full entry (Jan–Mar 2015) | Include in the compressed "Earlier" line: it is the true start of "professional since 2015". |
| Early roles (2015–2019) | One "Earlier:" paragraph | Full entries | Compressed one-liners per role (two-page budget), keeping employer, role, dates, and the one defining fact each. |
| Education | Name + school + years | Adds Lisbon and the Portuguese diploma title | Keep school, years, location. Portuguese title omitted (see omissions). |
| About / fun facts | Two short paragraphs + 3 fun-fact bullets | Nine-paragraph personal essay | Compress to a 3-sentence profile plus a one-line "Beyond work" note (see rewrites). |

**Date consistency check [inferred]:** the two PDFs agree on every
overlapping employment date. Timeline: Science4you Jan–Mar 2015 → NextBitt
Oct 2015–Jul 2016 → AHA Sep–Nov 2016 → Sycret.ink 2017 → Glaiveware Mar
2018–Dec 2019 → BinaryEdge/Coalition Feb 2020–Oct 2021 → Phantasma Jan
2022–May 2023 → OMEGA Jun 2023–Apr 2024 → Hunt Apr 2024–Mar 2025 → rj11io
Mar 2025–present. Small gaps (mid-2015, Nov–Dec 2021) exist in both PDFs and
are preserved, not papered over.

## Uncertainties (flagged, not silently resolved)

1. **"AI Smart Scrapping Agents" (MAX)** — almost certainly a typo for
   "scraping" (MAX's skills list says "Web Scraping"). Rendered as
   "scraping". If "Scrapping" were intentional product naming, this would
   be wrong; flagged here for the candidate to confirm.
2. **Project dates in the future-relative sense** — MAX dates 11ai and
   11bench "2026 – Present" while 11io is "2025 – Present". Preserved
   as printed.
3. **"decade of professional TypeScript experience" (MIN)** — the timeline
   supports ~10–11 years of professional work since 2015, but the earliest
   roles were Java/jQuery/Angular, not TypeScript. I use the safer,
   PDF-anchored formulation "professional since 2015 … TypeScript
   specialist" instead of repeating "a decade of TypeScript".
4. **BinaryEdge vs Coalition employer naming** — both PDFs write
   "BinaryEdge · Coalition, Inc.". BinaryEdge was the product/team inside
   Coalition; kept exactly as the PDFs print it.
5. **cv.rj11.io** — appears in both PDFs as the CV's own URL. Rendered in
   the header as the canonical CV link.

## Omissions and compression (two-page budget)

Cut entirely, with reasons:

- **MAX "Foundations" skill group** (JavaScript, Node.js, HTML5, CSS, Git,
  GitHub Actions, REST APIs, CI/CD, Testing) — implied by seniority and by
  tool mentions inside the experience bullets; lowest information value per
  line for a senior profile.
- **Legacy GitHub profile** (github.com/ricardojrmcom, 2020–2023) — the
  active GitHub link covers discovery; a second, retired profile does not
  earn a line.
- **MAX essay passages**: competitive-gaming leadership backstory,
  "self-guided missile" metaphor, "wearing every hat", "Have a nice day!",
  the open-to-opportunities paragraph (folded into one short availability
  line), Material-UI / Refactoring UI skill mentions, OMEGA's "TED talks"
  and "Tab System", Phantasma in-house tooling detail, Glaiveware
  tech-stack list, per-role "Remote" tags (kept once in the header as
  "Remote-first" would be an invention — instead omitted; see note below).
- **"Remote" work-mode tags** — MAX marks most roles "Remote". Rather than
  tag every entry (space) or invent a summary label, remote-ness is kept
  only where it is part of the story (Sycret.ink contract for a Swiss
  company, AHA scholarship work) — otherwise omitted. This is a
  compression choice, not a contradiction.
- **Portuguese diploma title** ("Técnico de Gestão e Programação de
  Sistemas Informáticos") — duplicate of the English program name.
- **MUGEN/fun-facts detail** — compressed into one "Beyond work" line;
  the robotics result and the game-modding origin survive, the server
  hosting list ("Counter-Strike, Minecraft") is kept short.

Compressed but kept: the five 2015–2019 roles become one-line entries under
"Earlier"; every employer, role title, and date range from the PDFs is
preserved.

---

# Canonical content

## Identity [extracted]

- Name: **Ricardo Jorge** (goes by RJ — MAX)
- Title: **AI Product Engineer**
- Location: Lisbon, Portugal
- Email: ricardojorgexyz@gmail.com
- Website: rj11.io (https://rj11.io)
- GitHub: github.com/rj11io (https://github.com/rj11io)
- LinkedIn: linkedin.com/in/rj11io (https://linkedin.com/in/rj11io)
- This CV online: cv.rj11.io (https://cv.rj11.io)

## Profile [rewritten — from MIN "About me" + MAX essay; no new facts]

AI Product Engineer, professional since 2015 — building on TypeScript and
React since 2016 and Next.js since 2018, an early bet on the stack that
became the standard for the web and for AI products. Usually the first
frontend hire: owns architecture, tooling, component libraries, and
pipelines from day one, then grows the team around them — hiring,
onboarding, and writing the playbooks. Deepest experience is dashboards,
product platforms, and proprietary data explorers for cybersecurity,
crypto, and gaming companies, where a passion for data-driven products and
visualisation took hold. Building with AI since the first releases of
Copilot and ChatGPT: prompt and context engineering, open-source agent
skills, and full agent harnesses and automations — today an automated fleet
of AI agents maintains his personal projects.

Availability line [rewritten from MAX]: "Hands-on B2B freelancer across
multiple teams — always open to exceptional opportunities."

## Skills [extracted; grouping per reconciliation note]

- **Core stack:** TypeScript · React · Next.js · AI SDK · Convex ·
  Playwright · Vercel
- **AI engineering:** Agent automations · Custom agent skills · Harness
  engineering · Codex · Claude Code · n8n
- **UI & data:** Tailwind CSS · shadcn/ui · Design systems · Storybook ·
  Dashboards · Data visualisation (d3, Recharts, Nivo)
- **Leadership & delivery:** Team & project management · End-to-end product
  engineering · Product design · Agile methodologies

## Projects [extracted; dates from MAX]

- **11io** — rj11.io — Personal brand for B2B freelancing (2025 – Present)
- **11ai** — ai.rj11.io — Open-source AI skills, plugins, and workflows
  (2026 – Present)
- **11bench** — bench.rj11.io — Open-source AI benchmarks (2026 – Present)

## Experience

### AI Product Engineer — rj11io · rj11.io · Mar 2025 – Present [extracted]

Lead line [rewritten]: Hands-on AI product engineering for multiple
early-stage startups, building projects from the ground up.

- [rewritten, merges MIN+MAX] AI products end to end: PDF data extraction,
  AI SEO analytics, a GenAI dermatopathology portal, AI chats and custom
  GPT experiences, and a real-estate platform.
- [rewritten, merges MIN+MAX] Cybersecurity dashboards and proprietary
  data explorers for client teams.
- [rewritten, merges MIN+MAX] AI agent harnesses, skills, and automations,
  plus smart scraping agents and n8n workflows.

### Product / Datavis Engineer — Hunt Intelligence, Inc. · hunt.io · Apr 2024 – Mar 2025 [extracted]

Lead line [rewritten from MAX]: Went deep on his specialty — data
visualisation for a threat-intelligence product.

- [extracted] Built core product modules AttackCapture™ and HuntSQL™ on a
  modern TypeScript codebase: Next.js, shadcn/ui, Playwright end-to-end
  tests, CI/CD on GitHub Actions, and automated release changelogs wired
  to Slack.
- [extracted] Built custom data-visualisation components such as the IP
  History Widget.
- [extracted] Built a new API documentation platform on top of OpenAPI —
  enriched the raw spec with metadata and shipped a UI friendlier than
  Swagger.

### Senior Frontend Engineer → Team Lead — OMEGA Systems · omegasys.eu · Jun 2023 – Apr 2024 [extracted]

Lead line [rewritten]: Built the next generation of OMEGA's iGaming
platform management system (CORE5) with TypeScript and React; promoted to
lead the frontend team.

- [extracted] Data visualisation for the Main and Social dashboards, plus
  report and configuration views (Cashback, Refer-a-Friend, Pending
  Withdrawals, Challenges / Leaderboards).
- [rewritten from MAX] Built the localisation / internationalisation
  module and kept shipping product features end to end.
- [extracted] As lead: built the new-developer onboarding experience and
  set standards for tickets, documentation, and remote / async workflows,
  with a strong emphasis on the "Definition of Done".

### Senior Frontend Engineer — Phantasma Chain · phantasma.info · Jan 2022 – May 2023 [extracted]

- [extracted] Built the frontend monorepo for all new tools and apps, the
  Phantasma UI Storybook, and Phantasma Explorer.
- [extracted] Tests with Playwright, CI with GitHub Actions, CD with
  Vercel; contributed improvements to the Phantasma TypeScript SDK.

### Frontend Lead — BinaryEdge · Coalition, Inc. · coalitioninc.com · Feb 2020 – Oct 2021 [extracted]

Lead line [rewritten from MAX]: Started as the solo frontend engineer and
grew the team behind Coalition's customer-facing security apps and internal
tools.

- [extracted] Introduced React, TypeScript, Next.js, and micro frontends;
  Tech Lead for Coalition Explorer (and Explorer 2.0), the component
  library, and data visualisations.
- [extracted] Built Attack Surface Monitoring on the BinaryEdge Portal,
  later integrated into Coalition Explorer and Coalition Control.
- [rewritten from MAX] Migrated frontend CI/CD from Drone to GitHub
  Actions, improving pipelines, environments, and developer experience.

### Earlier — 2015 – 2019 [rewritten one-liners; all facts from MAX (MIN corroborates all but Science4you)]

- **Co-Founder, Fullstack Engineer** — Glaiveware · Mar 2018 – Dec 2019 —
  ran a bespoke web-app studio; learned to manage projects and run a
  business.
- **React Native Developer** — Sycret.ink (Neuchâtel, Switzerland) · 2017 —
  end-to-end-encrypted mobile chat app (libsignal) on serverless AWS, in a
  team of three.
- **Full Stack JavaScript Developer** — American Heart Association ·
  Sep – Nov 2016 — admin dashboard for the AHA's Kinect integration,
  connecting doctors with patient data; won through a university
  scholarship.
- **Frontend Developer** — NextBitt · Oct 2015 – Jul 2016 — analytics
  dashboards and reporting / auditing tools for asset & facilities
  management software.
- **Java Developer (Internship)** — Science4you · Jan – Mar 2015 — built an
  order-management system that replaced manual back-office work.

## Education [extracted]

- **IT Systems Management and Programming** — Escola Profissional de
  Tecnologia Digital, Lisbon · 2013 – 2016

## Beyond work [rewritten — from MIN fun facts + MAX essay]

Started coding by modding and reverse-engineering games and consoles —
built a fighting game on the MUGEN engine and ran dedicated Counter-Strike
and Minecraft servers. At 14, took a LEGO Mindstorms team to a
second-place national finish and the final four of the 2008 robotics
world cup in China.
