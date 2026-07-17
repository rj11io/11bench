// Canonical content for this CV. Derived 1:1 from content.md — this file
// holds no facts that aren't recorded and reasoned about there.

export type ExperienceEntry = {
  role: string
  company: string
  companyUrl?: string
  location?: string
  dates: string
  summary?: string
  bullets: string[]
}

export const identity = {
  name: "Ricardo Jorge",
  role: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  site: { label: "rj11.io", href: "https://rj11.io" },
  github: { label: "github.com/rj11io", href: "https://github.com/rj11io" },
  linkedin: {
    label: "linkedin.com/in/rj11io",
    href: "https://linkedin.com/in/rj11io",
  },
  cvUrl: "cv.rj11.io",
}

export const about = [
  "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. On most projects I was the first frontend hire — owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them through hiring, onboarding, and playbooks that let new engineers integrate seamlessly.",
  "Most of my work has been dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies, where I found a passion for data-driven products and visualisation. I've built with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to designing full agent harnesses and automations.",
]

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Core Stack",
    items: [
      "TypeScript",
      "React.js",
      "Next.js",
      "AI SDK",
      "Convex",
      "Playwright",
      "Vercel",
    ],
  },
  {
    label: "AI Engineering",
    items: [
      "Agent Automations",
      "Custom Agent Skills",
      "Harness Engineering",
      "Codex",
      "Claude Code",
      "n8n",
    ],
  },
  {
    label: "UI & Design",
    items: ["Tailwind CSS", "shadcn/ui", "Design Systems", "Storybook"],
  },
  {
    label: "Data & Visualisation",
    items: ["Dashboards", "Data Visualisation (d3, Recharts, Nivo)"],
  },
  {
    label: "Leadership & Delivery",
    items: [
      "Team & Project Management",
      "End-to-End Product Engineering",
      "Product Design",
      "Agile Methodologies",
    ],
  },
]

export const projects: {
  name: string
  href: string
  label: string
  description: string
}[] = [
  {
    name: "11io",
    href: "https://rj11.io",
    label: "rj11.io",
    description: "Personal brand for B2B freelancing",
  },
  {
    name: "11ai",
    href: "https://ai.rj11.io",
    label: "ai.rj11.io",
    description: "Open source AI skills, plugins, and workflows",
  },
  {
    name: "11bench",
    href: "https://bench.rj11.io",
    label: "bench.rj11.io",
    description: "Open source AI benchmarks",
  },
]

// Newest first. This exact split (3 entries page one / 2 + earlier +
// education page two) is the print pagination boundary — see design.md.
export const experience: ExperienceEntry[] = [
  {
    role: "AI Product Engineer",
    company: "rj11io",
    companyUrl: "https://rj11.io",
    dates: "Mar 2025 – Present",
    bullets: [
      "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up",
      "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, and custom AI chat / GPT experiences",
      "Cybersecurity dashboards, proprietary data explorers, AI smart-scraping agents and n8n workflows, and AI agent harnesses, skills, and automations",
    ],
  },
  {
    role: "Product / Datavis Engineer",
    company: "Hunt Intelligence, Inc.",
    companyUrl: "https://hunt.io",
    dates: "Apr 2024 – Mar 2025",
    bullets: [
      "Data visualisation for a threat-intelligence product, including custom components like the IP History Widget",
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase with Next.js, shadcn/ui, Playwright, and CI/CD on GitHub Actions",
      "Built a new API documentation platform on top of OpenAPI — friendlier and more intuitive than Swagger",
    ],
  },
  {
    role: "Senior Frontend Engineer → Team Lead",
    company: "OMEGA Systems",
    companyUrl: "https://omegasys.eu",
    dates: "Jun 2023 – Apr 2024",
    bullets: [
      "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team",
      "Data visualisation for the Main and Social dashboards, plus report and configuration views",
      "As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows",
    ],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Phantasma Chain",
    companyUrl: "https://phantasma.info",
    dates: "Jan 2022 – May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK",
    ],
  },
  {
    role: "Frontend Lead",
    company: "BinaryEdge · Coalition, Inc.",
    companyUrl: "https://coalitioninc.com",
    dates: "Feb 2020 – Oct 2021",
    bullets: [
      "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools",
      "Introduced React, TypeScript, Next.js, and micro-frontends; Tech Lead for Coalition Explorer, the component library, and data visualisations",
      "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control",
    ],
  },
]

export const earlierRoles =
  "Earlier: co-founder at Glaiveware, building bespoke web apps (2018–2019); React Native chat app with end-to-end encryption at Sycret.ink (2017); full-stack dashboard for the American Heart Association (2016); analytics dashboards at NextBitt (2015–2016)."

export const education = {
  program: "IT Systems Management and Programming",
  localName: "Técnico de Gestão e Programação de Sistemas Informáticos",
  school: "Escola Profissional de Tecnologia Digital",
  location: "Lisbon, Portugal",
  dates: "2013 – 2016",
}
