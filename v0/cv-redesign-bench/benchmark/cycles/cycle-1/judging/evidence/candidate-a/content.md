# Content Model

Access date for source PDFs: 2026-07-16.

Sources:
- `ref/RJ_CV.pdf`: two-page compressed CV titled "Ricardo Jorge: AI Product Engineer CV".
- `ref/RJ_CV_max.pdf`: six-page expanded CV with fuller narrative, project dates, role details, and earlier career entries.

## Extraction Discipline

Directly extracted facts are names, dates, employers, locations, links, job titles, technologies, project names, and claims that appear in at least one PDF. Editorial rewriting changes wording and prioritization only. It does not add metrics, credentials, clients, dates, employers, or achievements.

## Reconciliation

- Name, current title, location, email, portfolio, GitHub, LinkedIn, and route link are consistent across both PDFs.
- The short PDF has the best two-page prioritization. The long PDF has the richer evidence for current projects, project dates, role context, and earlier roles.
- Current `rj11io` role: both sources agree on March 2025 to present. The long PDF adds B2B and remote context plus a longer project list. The rendered copy compresses those examples into three bullets.
- Hunt Intelligence: both sources agree on April 2024 to March 2025, product/data visualization work, AttackCapture, HuntSQL, OpenAPI docs, shadcn/ui, Playwright, GitHub Actions, and Vercel. The rendered copy keeps the architecture and product scope but drops Slack changelog detail.
- OMEGA Systems: both sources agree on June 2023 to April 2024 and promotion to team lead. The rendered copy keeps CORE5, dashboards, onboarding, standards, async workflow, and end-to-end shipping. It omits the weekly "TED" talks and several named view examples to preserve space.
- Phantasma Chain: both sources agree on January 2022 to May 2023. The rendered copy keeps monorepo, Storybook, Explorer, Playwright/GitHub Actions/Vercel, SDK improvements, and internal tooling in compressed form.
- BinaryEdge / Coalition: both sources agree on February 2020 to October 2021. The rendered copy keeps first frontend hire/team growth, React/TypeScript/Next.js adoption, micro frontends, ASM, Coalition Explorer, component library, and CI/CD migration. It compresses the long list of internal tools.
- Earlier career: the short PDF compresses Glaiveware, Sycret.ink, American Heart Association, and NextBitt; the long PDF also includes Science4you. The rendered copy groups these as "Earlier selected work" so early experience is preserved without competing with recent AI/product/frontend scope.
- Education: both sources agree on IT Systems Management and Programming at Escola Profissional de Tecnologia Digital from 2013 to 2016. The long PDF adds Lisbon, Portugal and the Portuguese credential name.

## Omissions And Compression

- The long autobiographical opening is rewritten into a short senior-positioning summary.
- "Fun facts" become a compact "Technical origins" note. This preserves robotics, game modding, and server-running context without spending a full section on novelty.
- The long project list is narrowed to `11io`, `11ai`, `11bench`, and GitHub links because those are current, public, and relevant to AI/product engineering.
- Earlier roles before 2020 are grouped to keep the print version exactly two pages.
- No quantified impact has been added because the PDFs do not provide metrics.

## Uncertainties

- The PDFs do not name the early-stage startups or clients in the current freelance role.
- The current role examples are project categories, not independently dated deliverables.
- `Modern Github` and `Legacy Github` are rendered as public-code links rather than formal projects because their source descriptions are repository-era labels.
- `Science4you` is retained only as a compact internship line in earlier selected work.

## Canonical Render Model

The application reads the JSON block below at build/runtime. This is the source of truth for rendered content.

<!-- CANONICAL_CONTENT_START -->
```json
{
  "person": {
    "name": "Ricardo Jorge",
    "preferredName": "RJ",
    "title": "AI Product Engineer",
    "location": "Lisbon, Portugal",
    "email": "ricardojorgexyz@gmail.com",
    "links": [
      { "label": "cv.rj11.io", "href": "https://cv.rj11.io" },
      { "label": "rj11.io", "href": "https://rj11.io" },
      { "label": "github.com/rj11io", "href": "https://github.com/rj11io" },
      { "label": "linkedin.com/in/rj11io", "href": "https://linkedin.com/in/rj11io" }
    ]
  },
  "summary": [
    "AI Product Engineer with a decade of professional TypeScript experience, building with React since 2016 and Next.js since 2018. Often the first frontend hire, owning architecture, tooling, component libraries, delivery pipelines, and the hiring/onboarding playbooks that let teams scale.",
    "Specializes in data-heavy product platforms for cybersecurity, crypto, gaming, and early-stage AI products: dashboards, proprietary data explorers, API documentation, AI extraction workflows, custom GPT experiences, and agent harnesses."
  ],
  "focus": [
    "Product-grade AI interfaces and agent workflows",
    "Frontend architecture for data-rich B2B products",
    "Design systems, dashboards, and visualization",
    "Technical leadership from zero-to-one through team scale"
  ],
  "technicalOrigins": "Started by modding and reverse-engineering games and consoles, building a MUGEN fighting game, running dedicated servers, and placing second nationally with a LEGO Mindstorms team that reached the final four of the 2008 robotics world cup in China.",
  "skills": [
    { "group": "Core stack", "items": ["TypeScript", "React.js", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"] },
    { "group": "AI engineering", "items": ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"] },
    { "group": "UI and data", "items": ["Tailwind CSS", "shadcn/ui", "Material-UI", "Design systems", "Storybook", "Dashboards", "Data visualization", "d3", "Recharts", "Nivo"] },
    { "group": "Delivery", "items": ["Team leadership", "Project management", "End-to-end product engineering", "Product design", "Agile methodologies"] },
    { "group": "Foundations", "items": ["JavaScript", "Node.js", "HTML5", "CSS", "Git", "GitHub Actions", "REST APIs", "CI/CD", "Testing"] }
  ],
  "projects": [
    { "name": "11io", "href": "https://rj11.io", "dates": "2025 - Present", "description": "Personal brand for B2B freelancing." },
    { "name": "11ai", "href": "https://ai.rj11.io", "dates": "2026 - Present", "description": "Open source AI skills, plugins, and workflows." },
    { "name": "11bench", "href": "https://bench.rj11.io", "dates": "2026 - Present", "description": "Open source AI benchmarks." },
    { "name": "Modern GitHub", "href": "https://github.com/rj11io", "dates": "2023 - Present", "description": "Open source code for current AI and product projects." },
    { "name": "Legacy GitHub", "href": "https://github.com/ricardojrmcom", "dates": "2020 - 2023", "description": "Open source code produced before the current rj11io GitHub era." }
  ],
  "experience": [
    {
      "title": "AI Product Engineer",
      "company": "rj11io",
      "href": "https://rj11.io",
      "context": "B2B, Remote",
      "dates": "Mar 2025 - Present",
      "bullets": [
        "Build early-stage AI products from the ground up across multiple startup teams, covering product shape, frontend architecture, workflows, and delivery.",
        "Shipped AI PDF extraction, AI SEO analytics, a GenAI dermatopathology portal, real estate platform work, AI chats, and custom GPT experiences.",
        "Built cybersecurity dashboards, proprietary data explorers, smart scraping agents, n8n workflows, AI agent harnesses, custom skills, and automations."
      ]
    },
    {
      "title": "Product / Datavis Engineer",
      "company": "Hunt Intelligence, Inc.",
      "href": "https://hunt.io",
      "context": "B2B, Remote",
      "dates": "Apr 2024 - Mar 2025",
      "bullets": [
        "Focused on data visualization for a threat-intelligence product, including custom components such as the IP History Widget.",
        "Built core modules including AttackCapture and HuntSQL on a modern TypeScript stack with Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Created an OpenAPI-based documentation platform that enriched the raw specification with metadata and shipped a clearer product documentation UI."
      ]
    },
    {
      "title": "Senior Frontend Engineer to Team Lead",
      "company": "OMEGA Systems",
      "href": "https://omegasys.eu",
      "context": "Remote",
      "dates": "Jun 2023 - Apr 2024",
      "bullets": [
        "Built the next generation of OMEGA's iGaming platform management system, CORE5, with TypeScript and React, then moved into frontend team leadership.",
        "Delivered data visualization for main and social dashboards, reporting, configuration views, localization, and an internal tab-system UI.",
        "Established developer onboarding, ticket and documentation standards, remote/asynchronous workflow practices, and Definition of Done expectations."
      ]
    },
    {
      "title": "Senior Frontend Engineer",
      "company": "Phantasma Chain",
      "href": "https://phantasma.info",
      "context": "Remote",
      "dates": "Jan 2022 - May 2023",
      "bullets": [
        "Built the frontend monorepo for new tools and apps, designed and developed Phantasma UI Storybook, and built Phantasma Explorer.",
        "Set up Playwright testing, GitHub Actions CI, Vercel delivery, environment configuration, localization, white-label theming, and custom app tooling.",
        "Contributed improvements to the Phantasma TypeScript SDK and built in-house React hooks and API/scripts modules around it."
      ]
    },
    {
      "title": "Frontend Lead",
      "company": "BinaryEdge / Coalition, Inc.",
      "href": "https://coalitioninc.com",
      "context": "Remote",
      "dates": "Feb 2020 - Oct 2021",
      "bullets": [
        "Started as the solo frontend engineer and grew a customer-security team building customer-facing security apps and internal platforms.",
        "Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends; led Coalition Explorer, Coalition Storybook, component libraries, and visualizations.",
        "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control, and migrated frontend CI/CD from Drone to GitHub Actions."
      ]
    }
  ],
  "earlier": {
    "title": "Earlier selected work",
    "items": [
      "Fullstack Engineer and Co-Founder at Glaiveware, building bespoke web apps and learning project/business management (Mar 2018 - Dec 2019).",
      "React Native Developer at Sycret.ink on an end-to-end encrypted mobile chat app with a serverless environment (Jan 2017 - Dec 2017).",
      "Full Stack JavaScript Developer for the American Heart Association, building a React/Node admin dashboard for a Kinect integration (Sep 2016 - Nov 2016).",
      "Frontend Developer at NextBitt, creating analytics dashboards and asset/facilities-management tooling (Oct 2015 - Jul 2016).",
      "Java Developer intern at Science4you, building a Java/MySQL online-store management system for orders, reports, and automated customer emails (Jan 2015 - Mar 2015)."
    ]
  },
  "education": {
    "program": "IT Systems Management and Programming",
    "school": "Escola Profissional de Tecnologia Digital",
    "location": "Lisbon, Portugal",
    "dates": "2013 - 2016",
    "credential": "Técnico de Gestão e Programação de Sistemas Informáticos"
  }
}
```
<!-- CANONICAL_CONTENT_END -->
