# Canonical content model — Ricardo Jorge

## Authority and render contract

The immutable evidence is `ref/RJ_CV.pdf` (concise, two A4 pages) and `ref/RJ_CV_max.pdf` (extended, six A4 pages). Both were text-extracted and visually reviewed. Link annotations were inspected directly: they confirm the `https` destinations retained in the model.

`content.ts` is the structured canonical derivative of this document. `page.tsx` imports `cv` from that one module; it contains no separately authored CV strings. This file describes source status and editorial choices, while `content.ts` supplies the exact rendered fields.

## Directly extracted facts retained in the model

### Identity and live links

- **Name / title / location:** Ricardo Jorge; AI Product Engineer; Lisbon, Portugal. In both PDFs.
- **Email:** `ricardojorgexyz@gmail.com`; annotation confirms `mailto:ricardojorgexyz@gmail.com`.
- **Website:** rendered as `rj11.io`; annotation destination `https://www.rj11.io/`.
- **GitHub:** `github.com/rj11io`; annotation destination `https://github.com/rj11io`.
- **LinkedIn:** `linkedin.com/in/rj11io`; annotation destination `https://www.linkedin.com/in/rj11io`.
- **CV site:** `cv.rj11.io`; annotation destination `https://cv.rj11.io/`.
- **Projects:** 11io / rj11.io, 11ai / ai.rj11.io, and 11bench / bench.rj11.io. The source PDF visually separates each project name from its subdomain; annotations confirm `https://www.rj11.io/`, `https://ai.rj11.io/` and `https://bench.rj11.io/`.

### Professional profile and skills

- A decade of professional TypeScript experience; React since 2016; Next.js since 2018; first frontend hire on most projects; architecture, tooling, component libraries and pipelines; hiring, interviewing, onboarding and playbooks. Both PDFs.
- Experience in dashboards, product platforms and proprietary data explorers for cybersecurity, crypto and gaming; interest in data-driven products and visualisations. Both PDFs.
- AI experience from early Copilot / ChatGPT releases, progressing through prompt and context engineering, open-source skills, agent harnesses and automations. Both PDFs; the extended version additionally mentions MidJourney and an automated fleet of agents.
- Skill evidence retained: TypeScript, React, Next.js, AI SDK, Playwright, Vercel, agent automations, custom skills, harness engineering, Codex, Claude Code, n8n, component/design systems, Storybook, dashboards, d3, Recharts, Nivo, product design, team/project management and GitHub Actions. The source includes additional stack items; see compression below.

### Experience — direct source facts, rendered in compressed wording

| Position / employer | Dates retained | Direct factual anchors preserved |
| --- | --- | --- |
| AI Product Engineer, rj11io | Mar 2025 – Present | Early-stage startup work; AI PDF extraction, AI SEO analytics, GenAI dermatopathology, real estate, cyber dashboards / data explorers, AI chat / GPT experiences, scraping / n8n workflows, harnesses / skills / automations. |
| Product / Datavis Engineer, Hunt Intelligence, Inc. | Apr 2024 – Mar 2025 | Threat intelligence visualisation; IP History Widget; AttackCapture™; HuntSQL™; TypeScript / Next.js / shadcn/ui / Vercel / Playwright / GitHub Actions; OpenAPI documentation UI. |
| Senior Frontend Engineer → Team Lead, OMEGA Systems | Jun 2023 – Apr 2024 | CORE5 iGaming platform management system; TypeScript / React; promotion; Main and Social dashboard visualisation; reports/configuration; localisation; Tab System; onboarding, tickets, documentation, remote / async work and weekly talks. |
| Senior Frontend Engineer, Phantasma Chain | Jan 2022 – May 2023 | Frontend monorepo, Phantasma UI Storybook, Explorer, Playwright, GitHub Actions, Vercel and TypeScript SDK contributions. |
| Frontend Lead, BinaryEdge · Coalition, Inc. | Feb 2020 – Oct 2021 | Began solo; grew frontend team; introduced React, TypeScript, Material-UI, Nivo, Next.js and micro frontends; Attack Surface Monitoring; Coalition Explorer; Storybook / component library; CI/CD migration. |
| Fullstack Engineer, Co-Founder, Glaiveware | Mar 2018 – Dec 2019 | Bespoke web apps; project/business management; React / Next.js / Node.js / AWS and design/SEO/content work. |
| React Native Developer, Sycret.ink | Jan 2017 – Dec 2017 | Contract work on a serverless end-to-end encrypted mobile chat app. |
| Full Stack JavaScript Developer, American Heart Association | Sep 2016 – Nov 2016 | Admin dashboard for Kinect integration; React and Node. |
| Frontend Developer, NextBitt | Oct 2015 – Jul 2016 | Analytics, reporting, auditing and management tools for asset/facilities software. |
| Java Developer (internship), Science4you | Jan 2015 – Mar 2015 | Online-store management system using Java and MySQL. |

### Education and personal technical origin

- **Education:** IT Systems Management and Programming, Escola Profissional de Tecnologia Digital, 2013–2016, Lisbon, Portugal; `Técnico de Gestão e Programação de Sistemas Informáticos`. Extended PDF gives the qualification and location; concise PDF supplies the same school, programme and years.
- **Field note:** coding began by modding and reverse-engineering games/consoles; created a MUGEN fighting game; ran dedicated game servers; placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms. Both PDFs. Only the coding origin and robotics result are rendered, as a succinct human detail.

## Editorial inference and rewriting

The following are **rewrites / information architecture**, not claims of new outcomes:

- The profile’s “AI product engineer with a decade…” compresses several source sentences. “Product systems” and “Data & delivery” are editorial category labels that organise existing skill names.
- “Taking projects from the ground up,” “established a modern codebase,” “shipped,” and “led” are active-voice rewrites of explicit source statements. No performance metric, team count, revenue figure, customer number, degree, certification, employer or technology has been added.
- “Selected experience,” “Earlier experience” and “Foundation” are hierarchy labels. They do not imply that unlisted work is less true or less valuable; they are a two-page readability choice.
- The phrase “smart-scraping agents” normalises the extended PDF’s spelling “Smart Scrapping Agents.” It is not a factual expansion.
- “Data visualisation” is retained where the source uses that spelling; its American-spelling variants appear only in quoted employer product names or source descriptions.
- `https://` and the `www` hosts are not guessed: they come from PDF link annotations. Display labels intentionally match the printed, shorter domains.

## Reconciliation decisions and uncertainties

1. **Concise versus extended dates:** the concise PDF groups Glaiveware as 2018–2019 and NextBitt as 2015–2016. The extended PDF supplies month ranges, so `content.ts` uses the more specific Mar 2018–Dec 2019 and Oct 2015–Jul 2016. There is no conflict, only greater precision.
2. **rj11io / rj11.io:** the employer appears as `rj11io`, while the website is rendered `rj11.io`. They are kept distinct instead of silently “correcting” the business name.
3. **Project strings:** raw text extraction concatenates “11ai” with `ai.rj11.io` and “11bench” with `bench.rj11.io`. Visual inspection and PDF annotations establish these as separate name + domain pairs. The rendering follows that visual evidence.
4. **Employer links:** Hunt, OMEGA, Phantasma and Coalition links are confirmed annotations. The PDFs do not expose a Glaiveware or Sycret.ink annotation, so neither is fabricated as a link.
5. **Present-tense role:** “Present” is preserved verbatim. It should be manually refreshed when the role changes; no end date can be inferred from the 2026 PDF creation timestamp.
6. **Title scope:** “AI Product Engineer” is the supplied current title, not a claim that every earlier title was AI-focused.
7. **AHA name:** the source says American Heart Association; this exact organisation name is retained. The project’s specific programme / location is not supplied and is not inferred.

## Intentional omissions and compression for the exact two-page print limit

- The conversational extended “About me” sections about gaming leadership, “self-guided missile,” availability and sign-off are omitted. They are personality material, not evidence needed in an initial senior-product scan. The robotics fact survives as a single field note.
- The extended project list’s “Modern Github” and “Legacy Github” entries are omitted because the live GitHub link is already in contact information and the main three project domains establish independent work more efficiently.
- Every job remains visible, but detail is constrained: three bullets for the three most relevant recent roles; two for Phantasma and BinaryEdge; one for Glaiveware; one-line foundation cards for 2015–2017 roles. Exact employer/title/date sequence is retained.
- Omitted detail includes individual OMEGA feature names, Phantasma’s full in-house tooling list, BinaryEdge’s marketing pages and platform list, the Glaiveware database/infrastructure inventory, Sycret.ink protocol / deployment details, AHA reporting workflow, the detailed NextBitt chart-library list, and Science4you’s report/email workflow. These are compressions, not denials.
- Material-UI, Refactoring UI, Convex, JavaScript/Node/HTML/CSS/Git/REST APIs and some other foundation skills are not shown in the capability strip. The selected skills better support the target AI product/frontend profile and are substantiated by job bullets.
- The PDF’s `cv.rj11.io/v1/max` callout is not rendered as a separate prompt. The root CV link remains; the exact extended-version path is source evidence but not required for the two-page decision document.

## Final model inventory

The `cv` object in `content.ts` is the renderable canonical representation: `displayMeta`, `identity`, `summary`, `focus`, `capabilities`, `projects`, `recentExperience`, `earlierExperience`, `foundation`, `education` and `fieldNote`. All user-visible candidate content and chronology in the route is drawn from those fields; the only static words in `page.tsx` are section labels, page labels and accessibility labels documented above as editorial structure.
