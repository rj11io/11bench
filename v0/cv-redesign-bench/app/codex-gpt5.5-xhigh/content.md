# Content Model

This file is the canonical content source for the route. The implementation reads the `cv-model` JSON block below at render time.

## Source Extraction Notes

Primary source evidence:

- `ref/RJ_CV.pdf`: concise two-page A4 CV, useful as the existing compression baseline.
- `ref/RJ_CV_max.pdf`: extended six-page CV, useful for dates, locations, role details, project dates, and early career recovery.

Directly extracted facts preserved:

- Name: Ricardo Jorge.
- Headline: AI Product Engineer.
- Location: Lisbon, Portugal.
- Email and links: `ricardojorgexyz@gmail.com`, `rj11.io`, `github.com/rj11io`, `linkedin.com/in/rj11io`, `cv.rj11.io`, `ai.rj11.io`, `bench.rj11.io`.
- Current and past employers, dates, and URLs exactly as shown in the PDFs.
- React since 2016, Next.js since 2018, professional TypeScript/front-end positioning, first-frontend-hire pattern, team growth, dashboards, product platforms, proprietary data explorers, cybersecurity, crypto, gaming, AI harnesses, skills, and automations.
- Current freelance work categories: PDF data extraction, AI SEO analytics, GenAI dermatopathology portal, real estate platform, cybersecurity dashboards, proprietary data explorers, AI chats/GPT experiences, smart scraping agents, n8n workflows, AI agent harnesses, skills, and automations.
- Role details for Hunt, OMEGA, Phantasma, BinaryEdge/Coalition, Glaiveware, Sycret.ink, American Heart Association, NextBitt, Science4you, and education.
- Origin details: game modding/reverse engineering, MUGEN fighting game, dedicated game servers, LEGO Mindstorms robotics second national place and final four at the 2008 robotics world cup in China.

Editorial rewrites and inferences:

- The phrase "AI Product Engineer" is kept as the headline because both PDFs use it and the recent work supports it.
- The profile is rewritten in third-person-style resume language without "I" because current resume guidance favors concise, factual, scannable writing.
- "Senior" is inferred from role titles, leadership scope, and over ten years of professional history, but the rendered headline stays with the source title "AI Product Engineer" to avoid adding a new job title.
- The design elevates AI/product/frontend/data visualization as the thesis because those themes repeat across both PDFs and the current role.
- Bullets are compressed and re-ordered for scan value. No metrics were invented.

Reconciliation choices:

- `RJ_CV.pdf` omits project dates and early Science4you details; `RJ_CV_max.pdf` includes them. The route includes current project dates where space-efficient and compresses Science4you into the earlier foundation block.
- `RJ_CV_max.pdf` includes Modern Github and Legacy Github as projects. The rendered CV keeps the modern GitHub as a contact/professional link and omits the legacy GitHub from the visible projects to preserve space and focus current positioning.
- `RJ_CV_max.pdf` includes a long autobiographical About section and gaming leadership story. The visible CV compresses this into a short Origins note because it differentiates the candidate but should not displace recent professional evidence.
- `RJ_CV_max.pdf` includes Material-UI, Refactoring UI, web scraping, data enrichment, JavaScript, Node.js, REST APIs, CI/CD, and testing. The rendered skills keep the most role-relevant clusters and include foundational items only where they support senior product engineering.

Omissions and compression for the two-page limit:

- Omitted: "Have a nice day", broad availability phrasing, competitive gaming team/guild details, most technology laundry lists from Glaiveware, and separate Modern/Legacy GitHub project rows.
- Compressed: all roles before 2020 into an Earlier Foundation section, with dates and core contribution preserved.
- Compressed: current freelance client/project list into three bullets that group AI products, cybersecurity/data products, and agent infrastructure.
- Compressed after print testing: page one keeps only the two most recent roles to prevent browser fragmentation overlap; OMEGA and Phantasma move to page two with tighter bullets.
- Compressed: education to one line plus the Portuguese credential in the canonical model.

Uncertainties flagged:

- The current B2B clients are not named in the PDFs; the CV keeps categories only.
- The exact start date of TypeScript use is not independently separated from general professional frontend work; the PDFs state "a decade of professional TypeScript experience" and the model keeps that as a source claim.
- "First releases of Copilot, ChatGPT, and MidJourney" is not given as dates; the route avoids converting it into specific years.
- "AI Smart Scrapping Agents" appears in `RJ_CV_max.pdf`; this is likely a typo for "scraping", but the rendered CV uses "smart scraping agents" as an editorial correction.
- The AHA role says it was acquired through a university scholarship; the exact program is not named, so it is omitted from the rendered bullet.

```json cv-model
{
  "candidate": {
    "name": "Ricardo Jorge",
    "headline": "AI Product Engineer",
    "location": "Lisbon, Portugal",
    "email": "ricardojorgexyz@gmail.com",
    "site": "cv.rj11.io",
    "sourceClaim": "AI Product Engineer with a decade of professional TypeScript experience, React since 2016, and Next.js since 2018."
  },
  "links": [
    {
      "label": "Email",
      "text": "ricardojorgexyz@gmail.com",
      "href": "mailto:ricardojorgexyz@gmail.com",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "label": "Web",
      "text": "rj11.io",
      "href": "https://rj11.io",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "label": "GitHub",
      "text": "github.com/rj11io",
      "href": "https://github.com/rj11io",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "label": "LinkedIn",
      "text": "linkedin.com/in/rj11io",
      "href": "https://linkedin.com/in/rj11io",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    }
  ],
  "profile": [
    "AI product engineer focused on TypeScript products, data-heavy interfaces, and agent-enabled workflows. Professional frontend engineering since 2015, React since 2016, Next.js since 2018, and a source-stated decade of TypeScript experience.",
    "Often the first frontend hire: owns architecture, tooling, design systems, CI/CD, component libraries, onboarding, and the playbooks that let teams scale around the product.",
    "Strongest domain pattern: dashboards, product platforms, proprietary data explorers, cybersecurity products, crypto tooling, gaming platforms, and AI harnesses that turn messy data and workflows into usable software."
  ],
  "highlights": [
    {
      "label": "Product surface",
      "value": "AI products, dashboards, data explorers"
    },
    {
      "label": "Core stack",
      "value": "TypeScript, React, Next.js, Playwright"
    },
    {
      "label": "Leadership pattern",
      "value": "First frontend hire, team lead, onboarding"
    },
    {
      "label": "Delivery mode",
      "value": "End-to-end product engineering"
    }
  ],
  "origins": "Started by modding and reverse-engineering games, building a MUGEN fighting game, running dedicated servers, and reaching second nationally plus the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
  "skills": [
    {
      "label": "Core stack",
      "items": ["TypeScript", "React.js", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"]
    },
    {
      "label": "AI engineering",
      "items": ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"]
    },
    {
      "label": "UI and data",
      "items": ["Tailwind CSS", "shadcn/ui", "Material-UI", "Design systems", "Storybook", "Dashboards", "d3", "Recharts", "Nivo"]
    },
    {
      "label": "Delivery",
      "items": ["Team leadership", "Project management", "Product design", "Agile delivery", "CI/CD", "Testing", "Developer onboarding"]
    }
  ],
  "projects": [
    {
      "name": "11io",
      "url": "https://rj11.io",
      "label": "rj11.io",
      "dates": "2025 - Present",
      "description": "Personal brand for B2B freelancing.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "name": "11ai",
      "url": "https://ai.rj11.io",
      "label": "ai.rj11.io",
      "dates": "2026 - Present",
      "description": "Open-source AI skills, plugins, and workflows.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "name": "11bench",
      "url": "https://bench.rj11.io",
      "label": "bench.rj11.io",
      "dates": "2026 - Present",
      "description": "Open-source AI benchmarks.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    }
  ],
  "experience": [
    {
      "title": "AI Product Engineer",
      "company": "rj11io",
      "url": "https://rj11.io",
      "urlLabel": "rj11.io",
      "dates": "Mar 2025 - Present",
      "meta": "B2B, Remote",
      "printPage": 1,
      "bullets": [
        "Build AI products for early-stage startups, including PDF data extraction, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, and custom AI chat/GPT experiences.",
        "Ship cybersecurity dashboards and proprietary data explorers that combine product design, frontend architecture, and data visualization.",
        "Design AI agent harnesses, custom skills, automations, smart scraping agents, and n8n workflows."
      ],
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Product / Datavis Engineer",
      "company": "Hunt Intelligence, Inc.",
      "url": "https://hunt.io",
      "urlLabel": "hunt.io",
      "dates": "Apr 2024 - Mar 2025",
      "meta": "B2B, Remote",
      "printPage": 1,
      "bullets": [
        "Built a modern TypeScript codebase with Next.js, shadcn/ui, Vercel production/staging, Playwright end-to-end tests, GitHub Actions CI/CD, and Slack-linked release changelogs.",
        "Built threat-intelligence product modules and visualizations, including AttackCapture(TM), HuntSQL(TM), and the IP History Widget.",
        "Created an OpenAPI documentation platform by enriching openapi.json metadata and shipping a UI friendlier and more intuitive than Swagger."
      ],
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Senior Frontend Engineer / Team Lead",
      "company": "OMEGA Systems",
      "url": "https://omegasys.eu",
      "urlLabel": "omegasys.eu",
      "dates": "Jun 2023 - Apr 2024",
      "meta": "Remote",
      "printPage": 2,
      "bullets": [
        "Built CORE5, the next generation iGaming platform management system, with TypeScript and React; promoted to lead the frontend team.",
        "Delivered dashboards, report/configuration views, localization, internationalization, an internal Tab System UI, new-developer onboarding, and standards for tickets, documentation, remote/async workflows, and Definition of Done."
      ],
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Senior Frontend Engineer",
      "company": "Phantasma Chain",
      "url": "https://phantasma.info",
      "urlLabel": "phantasma.info",
      "dates": "Jan 2022 - May 2023",
      "meta": "Remote",
      "printPage": 2,
      "bullets": [
        "Built the frontend monorepo, Phantasma UI Storybook, and Phantasma Explorer; added Playwright tests, GitHub Actions CI, Vercel CD, SDK improvements, hooks, localization, theming, environment configs, and API/scripts/hooks modules."
      ],
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Frontend Lead",
      "company": "BinaryEdge / Coalition, Inc.",
      "url": "https://coalitioninc.com",
      "urlLabel": "coalitioninc.com",
      "dates": "Feb 2020 - Oct 2021",
      "meta": "Remote",
      "printPage": 2,
      "bullets": [
        "Started as a solo frontend engineer, grew a team, and introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends.",
        "Tech lead for Coalition Explorer, Coalition Storybook, the Customer Security Web UI library, data visualizations, and Attack Surface Monitoring across BinaryEdge Portal, Coalition Explorer, and Coalition Control.",
        "Built claims management, report generation, security review, and Executive Risks platforms; migrated frontend CI/CD from Drone to GitHub Actions."
      ],
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    }
  ],
  "earlier": [
    {
      "title": "Fullstack Engineer, Co-Founder",
      "company": "Glaiveware",
      "dates": "Mar 2018 - Dec 2019",
      "description": "Co-founded a bespoke web-app studio across React, Next.js, Node.js, databases, AWS, SEO, branding, design, marketing, copywriting, and content management.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "React Native Developer",
      "company": "Sycret.ink",
      "dates": "Jan 2017 - Dec 2017",
      "description": "Contracted on a serverless end-to-end encrypted chat app with React Native, libsignal-protocol, AWS, and SQLite.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Full Stack JavaScript Developer",
      "company": "American Heart Association",
      "dates": "Sep 2016 - Nov 2016",
      "description": "Built a React and Node admin dashboard for Kinect data, doctor/patient connections, reports, and superuser management.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Frontend Developer",
      "company": "NextBitt",
      "dates": "Oct 2015 - Jul 2016",
      "description": "Created analytics dashboards plus reporting, auditing, and management tools for asset and facilities management software.",
      "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
    },
    {
      "title": "Java Developer Intern",
      "company": "Science4you",
      "dates": "Jan 2015 - Mar 2015",
      "description": "Built a Java/MySQL back-office system for orders, reports, and automated customer emails.",
      "source": ["RJ_CV_max.pdf"]
    }
  ],
  "education": {
    "title": "IT Systems Management and Programming",
    "school": "Escola Profissional de Tecnologia Digital",
    "location": "Lisbon, Portugal",
    "dates": "2013 - 2016",
    "credential": "Técnico de Gestão e Programação de Sistemas Informáticos",
    "source": ["RJ_CV.pdf", "RJ_CV_max.pdf"]
  }
}
```
