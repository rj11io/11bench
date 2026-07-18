# Canonical Content Model

This file is both the editorial record and the machine-readable content source
for the route. `page.tsx` parses the JSON block between the canonical markers
below and renders from it directly.

## Source Evidence

- `RJ_CV.pdf` is the concise two-page version.
- `RJ_CV_max.pdf` is the extended six-page version.
- When the two conflict in level of detail, I prefer the more specific wording
  from `RJ_CV_max.pdf` unless the short version is clearly the more current
  framing.

<!-- CANONICAL_CONTENT_START -->
{
  "basics": {
    "name": "Ricardo Jorge",
    "headline": "AI Product Engineer",
    "location": "Lisbon, Portugal",
    "email": "ricardojorgexyz@gmail.com",
    "website": "https://www.rj11.io/",
    "linkedin": "https://www.linkedin.com/in/rj11io",
    "github": "https://github.com/rj11io",
    "legacyGithub": "https://github.com/ricardojrmcom?tab=repositories",
    "portfolioCv": "https://cv.rj11.io/"
  },
  "summary": {
    "kicker": "Senior AI product and frontend engineer",
    "paragraphs": [
      "AI product engineer with a 2015-2026 professional track record, React production work since 2016, and Next.js production work since 2018. Frequently the first frontend hire, owning architecture, tooling, design systems, CI/CD, and onboarding before scaling the team around the product.",
      "Best aligned with data-heavy software: cybersecurity dashboards, proprietary explorers, AI workflows, and product surfaces where UX clarity matters as much as technical execution. Since 2025, work has centered on hands-on AI product engineering for early-stage teams."
    ],
    "proofPoints": [
      "Built and led frontend foundations across cybersecurity, crypto, gaming, healthcare-adjacent, and B2B startup products.",
      "Pairs product engineering with strong data visualisation practice across dashboards, custom widgets, and exploratory interfaces.",
      "Operates comfortably across architecture, delivery systems, hiring, onboarding, and design-system stewardship."
    ]
  },
  "signals": [
    "Started coding through game modding, reverse engineering, and self-run game servers.",
    "Reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms after a second-place national finish."
  ],
  "skills": [
    {
      "label": "AI product engineering",
      "items": [
        "Agent automations",
        "Custom agent skills",
        "Harness engineering",
        "Codex",
        "Claude Code",
        "n8n",
        "AI SDK"
      ]
    },
    {
      "label": "Frontend systems",
      "items": [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Storybook",
        "Design systems",
        "Convex"
      ]
    },
    {
      "label": "Data and quality",
      "items": [
        "Dashboards",
        "Data visualisation",
        "d3",
        "Recharts",
        "Nivo",
        "Playwright",
        "GitHub Actions",
        "CI/CD",
        "Vercel"
      ]
    },
    {
      "label": "Leadership and delivery",
      "items": [
        "First frontend hire",
        "Hiring and onboarding",
        "Remote and async workflows",
        "Product design",
        "End-to-end product engineering",
        "Team and project management"
      ]
    }
  ],
  "projects": [
    {
      "name": "11io",
      "url": "https://www.rj11.io/",
      "dates": "2025 - Present",
      "description": "Personal brand and home base for B2B freelancing."
    },
    {
      "name": "11ai",
      "url": "https://ai.rj11.io/",
      "dates": "2026 - Present",
      "description": "Open-source AI skills, plugins, and workflows."
    },
    {
      "name": "11bench",
      "url": "https://bench.rj11.io/",
      "dates": "2026 - Present",
      "description": "Open-source AI benchmark work."
    }
  ],
  "experience": [
    {
      "role": "AI Product Engineer",
      "company": "rj11io",
      "companyUrl": "https://www.rj11.io/",
      "dates": "Mar 2025 - Present",
      "meta": "B2B freelance · Remote",
      "summary": "Hands-on AI product engineering for multiple early-stage startups.",
      "bullets": [
        "Built greenfield AI product surfaces including PDF extraction, SEO analytics, GenAI healthcare-adjacent tooling, chat experiences, and agent workflows.",
        "Delivered proprietary dashboards and data explorers for startup teams that needed product polish, not prototype-only outputs.",
        "Designed and implemented AI harnesses, custom skills, and automations around real operating workflows."
      ]
    },
    {
      "role": "Product / Datavis Engineer",
      "company": "Hunt Intelligence, Inc.",
      "companyUrl": "https://hunt.io/",
      "dates": "Apr 2024 - Mar 2025",
      "meta": "B2B · Remote",
      "summary": "Focused on data visualisation for a threat-intelligence product.",
      "bullets": [
        "Built custom data visualisation components, including the IP History Widget, for a threat-intelligence workflow.",
        "Shipped core product modules including AttackCapture and HuntSQL on a modern TypeScript and Next.js stack with shadcn/ui, Playwright, GitHub Actions, and Vercel.",
        "Replaced a generic Swagger-style experience with a more usable OpenAPI-based documentation platform."
      ]
    },
    {
      "role": "Senior Frontend Engineer -> Team Lead",
      "company": "OMEGA Systems",
      "companyUrl": "https://www.omegasys.eu/",
      "dates": "Jun 2023 - Apr 2024",
      "meta": "Remote",
      "summary": "Joined to build CORE5, then was promoted to lead the frontend team.",
      "bullets": [
        "Built dashboard, reporting, and configuration views for OMEGA's next-generation iGaming platform management system.",
        "Added localisation and internal UI primitives while continuing to ship end-to-end product features.",
        "Standardised onboarding, ticket quality, documentation, and remote workflow expectations for the frontend team."
      ]
    },
    {
      "role": "Senior Frontend Engineer",
      "company": "Phantasma Chain",
      "companyUrl": "https://phantasma.info/",
      "dates": "Jan 2022 - May 2023",
      "meta": "Remote",
      "summary": "Built the frontend platform for new Phantasma tools and apps.",
      "bullets": [
        "Built the frontend monorepo, Storybook foundation, and Phantasma Explorer.",
        "Set up Playwright testing, GitHub Actions CI, and Vercel delivery across the toolchain.",
        "Contributed SDK improvements and internal tooling for localisation, theming, configs, and shared API helpers."
      ]
    },
    {
      "role": "Frontend Lead",
      "company": "BinaryEdge / Coalition, Inc.",
      "companyUrl": "https://www.coalitioninc.com/",
      "dates": "Feb 2020 - Oct 2021",
      "meta": "Remote",
      "summary": "Started as a solo frontend engineer and grew into tech leadership across customer-security products.",
      "bullets": [
        "Introduced React, TypeScript, Next.js, Nivo, and micro-frontend thinking to the frontend stack.",
        "Led work across Attack Surface Monitoring, Coalition Explorer, internal security tooling, and the shared UI component library.",
        "Improved developer experience by moving frontend CI/CD from Drone to GitHub Actions."
      ]
    },
    {
      "role": "Fullstack Engineer, Co-Founder",
      "company": "Glaiveware",
      "companyUrl": "",
      "dates": "Mar 2018 - Dec 2019",
      "meta": "Lisbon, Portugal · Remote",
      "summary": "Built bespoke web applications while learning project and business ownership firsthand.",
      "bullets": [
        "Worked across React, Redux, Next.js, Node.js, Express, multiple databases, and AWS infrastructure.",
        "Handled a wider operating surface than code alone, including SEO, branding, design, and content."
      ]
    }
  ],
  "earlierExperience": [
    {
      "role": "React Native Developer",
      "company": "Sycret.ink",
      "dates": "Jan 2017 - Dec 2017",
      "detail": "Built an end-to-end encrypted mobile chat app in a serverless environment."
    },
    {
      "role": "Full Stack JavaScript Developer",
      "company": "American Heart Association",
      "dates": "Sep 2016 - Nov 2016",
      "detail": "Built an admin dashboard for Kinect-integrated patient and reporting workflows."
    },
    {
      "role": "Frontend Developer",
      "company": "NextBitt",
      "dates": "Oct 2015 - Jul 2016",
      "detail": "Built analytics, reporting, auditing, and management tools for asset and facilities software."
    },
    {
      "role": "Java Developer",
      "company": "Science4you",
      "dates": "Jan 2015 - Mar 2015",
      "detail": "Internship building a Java and MySQL management tool for online-store operations."
    }
  ],
  "education": [
    {
      "degree": "IT Systems Management and Programming",
      "institution": "Escola Profissional de Tecnologia Digital",
      "dates": "2013 - 2016",
      "detail": "Tecnico de Gestao e Programacao de Sistemas Informaticos"
    }
  ]
}
<!-- CANONICAL_CONTENT_END -->

## Directly Extracted Facts

- Name, role, location, contact links, employers, dates, school, and project URLs
  are direct from the PDFs.
- React since 2016 and Next.js since 2018 are direct claims from both versions.
- Current and recent role scopes, named products, and tool choices are drawn from
  the long CV when the short CV compresses them.

## Editorial Rewrites And Inference

- I rewrote the summary for recruiter scan speed and removed first-person voice.
- I changed the top-line experience claim from "a decade of professional
  TypeScript experience" to "a 2015-2026 professional track record" plus
  explicit React and Next.js dates. Reason: the career start date is clear, but
  the PDFs do not prove TypeScript use across the entire ten-year span.
- I normalized role bullets into sharper outcome-oriented language without adding
  metrics or unnamed employers.
- I compressed "AI chats / GPT experiences", "AI Smart Scrapping Agents", and
  similar list items into cleaner wording while preserving the actual categories
  of work.

## Conflicts, Reconciliation, And Duplication

- `RJ_CV.pdf` says "decade of professional TypeScript experience"; the long CV
  gives a fuller timeline that starts professionally in 2015. I treat the short
  phrasing as marketing copy and the long version as the timeline source.
- The short CV groups older experience into one paragraph; the long CV expands it
  into distinct roles. I retain the distinct roles, but compress them visually.
- The short CV labels the current work under `rj11io`; the long CV clarifies the
  mode as B2B freelance and remote. I keep both.
- The long CV includes both modern and legacy GitHub links. I preserve both in
  the artifact record, but only the current GitHub is treated as a primary
  contact link in the rendered hierarchy.

## Omissions And Compression For The Two-Page Limit

- Omitted from the rendered layout, but preserved here:
  - The long autobiographical opening about gaming leadership and "self-guided
    missile" framing.
  - Several second-order implementation details such as exact tool sublists on
    older roles, "TED talks", and named internal UI modules.
  - The legacy GitHub link from the main contact strip.
- Compressed in the rendered layout:
  - Earlier 2015-2019 roles are shown as concise one-liners.
  - Project entries are limited to three current public-facing properties.
  - Skills are grouped into four scan-friendly capability bands instead of a
    long flat list.

## Uncertainties

- The PDFs support extensive startup and freelance work, but they do not name the
  current startup clients; I do not invent them.
- Some named initiatives are trademarks or product names in the PDF
  (`AttackCapture`, `HuntSQL`, `CORE5`). I preserve them as provided.
- The current route presents a designed CV page and a print-ready version, but it
  is not itself claimed as the candidate's official `cv.rj11.io` document.
