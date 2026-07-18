// Content model derived from content.md. Single source of truth for page.tsx.

export const identity = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  site: "rj11.io",
  github: "github.com/rj11io",
  linkedin: "linkedin.com/in/rj11io",
}

export const about =
  "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. On most projects I was the first frontend hire, owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them: hiring, interviewing, onboarding, and writing the playbooks that let new engineers integrate seamlessly. Most of my experience is building dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies — that's where I found a passion for data-driven products and visualisation. I've built with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to designing full agent harnesses and automations."

export const funFacts = [
  "Started coding young modding and reverse-engineering games and consoles; built a fighting game with the MUGEN engine and ran dedicated servers for Counter-Strike, Minecraft, and others.",
  "Placed second nationally and reached the final four of the 2008 robotics World Cup in China with LEGO Mindstorms.",
]

export const skills = [
  { label: "Core Stack", items: "TypeScript, React.js, Next.js, AI SDK, Convex, Playwright, Vercel" },
  { label: "AI Engineering", items: "Agent Automations, Custom Agent Skills, Harness Engineering, Codex, Claude Code, n8n" },
  { label: "UI & Design", items: "Tailwind CSS, shadcn/ui, Material-UI, Design Systems, Storybook, Refactoring UI" },
  { label: "Data & Visualisation", items: "Dashboards, Data Visualisation (d3, Recharts, Nivo), Web Scraping, Data Enrichment" },
  { label: "Leadership & Delivery", items: "Team & Project Management, End-to-End Product Engineering, Product Design, Agile Methodologies" },
  { label: "Foundations", items: "JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, Testing" },
]

export const projects = [
  { name: "11io", url: "rj11.io", desc: "Personal brand for B2B freelancing", years: "2025 - Present" },
  { name: "11ai", url: "ai.rj11.io", desc: "Open source AI skills, plugins, and workflows", years: "2026 - Present" },
  { name: "11bench", url: "bench.rj11.io", desc: "Open source AI benchmarks", years: "2026 - Present" },
  { name: "Modern GitHub", url: "github.com/rj11io", desc: "Modern GitHub for AI open source projects", years: "2023 - Present" },
  { name: "Legacy GitHub", url: "github.com/ricardojrmcom", desc: "Legacy GitHub, open source code 2020-2023", years: "2020 - 2023" },
]

export const education = {
  program: "IT Systems Management and Programming",
  altName: "Técnico de Gestão e Programação de Sistemas Informáticos",
  school: "Escola Profissional de Tecnologia Digital, Lisbon, Portugal",
  years: "2013 - 2016",
}

export type ExperienceEntry = {
  title: string
  org: string
  years: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: "AI Product Engineer",
    org: "rj11io · rj11.io",
    years: "Mar 2025 - Present",
    bullets: [
      "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up",
      "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, AI chats and custom GPT experiences",
      "Cybersecurity dashboards, proprietary data explorers, AI smart-scraping agents and n8n workflows, and AI agent harnesses, skills, and automations",
    ],
  },
  {
    title: "Product / Datavis Engineer",
    org: "Hunt Intelligence, Inc. · hunt.io",
    years: "Apr 2024 - Mar 2025",
    bullets: [
      "Went deep on data visualisation for a threat-intelligence product, including custom components like the IP History Widget",
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase (Next.js, shadcn/ui, Playwright, CI/CD on GitHub Actions)",
      "Built a new API documentation platform on top of OpenAPI, friendlier and more intuitive than Swagger",
    ],
  },
  {
    title: "Senior Frontend Engineer → Team Lead",
    org: "OMEGA Systems · omegasys.eu",
    years: "Jun 2023 - Apr 2024",
    bullets: [
      "Built the next generation of OMEGA's iGaming platform management system (CORE5); promoted to lead the frontend team",
      "Data visualisation for the Main and Social dashboards, plus report and configuration views",
      "As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    org: "Phantasma Chain · phantasma.info",
    years: "Jan 2022 - May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK",
    ],
  },
  {
    title: "Frontend Lead",
    org: "BinaryEdge · Coalition, Inc. · coalitioninc.com",
    years: "Feb 2020 - Oct 2021",
    bullets: [
      "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools",
      "Introduced React, TypeScript, Next.js, and micro frontends; Tech Lead for Coalition Explorer, the component library, and data visualisations",
      "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control",
    ],
  },
]

export const earlier =
  "Earlier: co-founder at Glaiveware, building bespoke web apps (2018 - 2019); React Native chat app with end-to-end encryption at Sycret.ink (2017); full-stack dashboard for the American Heart Association (2016); analytics dashboards at NextBitt (2015 - 2016)."
