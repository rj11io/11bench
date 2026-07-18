// Structured transcription of the editorial decisions recorded in `content.md`.
// Every string here traces back to a fact or an explicit, documented rewrite in that file —
// this module renders the CV; it does not add or resolve anything content.md hasn't already decided.

export interface ContactLink {
  label: string
  href: string
}

export interface Identity {
  name: string
  title: string
  location: string
  email: string
  links: ContactLink[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  company: string
  companyHref?: string
  dates: string
  bullets: string[]
  /** Force this entry to start a fresh print page (see design.md, print strategy). */
  printBreakBefore?: boolean
}

export interface Project {
  name: string
  href: string
  description: string
  dates: string
}

export const identity: Identity = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  links: [
    { label: "rj11.io", href: "https://rj11.io" },
    { label: "github.com/rj11io", href: "https://github.com/rj11io" },
    { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
  ],
}

export const about: string[] = [
  "AI Product Engineer with roughly a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. First frontend hire on most teams — owning architecture, tooling, and pipelines from day one, then hiring and onboarding the engineers who grew around them.",
  "Most of that work has been dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies, which is where the pull toward data-driven products and visualisation started. Building with AI since the first Copilot and ChatGPT releases — from prompt and context engineering to open-source agent skills and full harness design.",
]

export const funFacts =
  "Started out modding and reverse-engineering games for fun, built a fighting game on the MUGEN engine, ran dedicated Counter-Strike and Minecraft servers, and reached the final four of the 2008 LEGO Mindstorms robotics world cup in China."

export const skills: SkillGroup[] = [
  {
    category: "Core Stack",
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
    category: "AI Engineering",
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
    category: "UI & Data",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Design Systems",
      "Storybook",
      "Dashboards",
      "Data Visualisation (d3, Recharts, Nivo)",
    ],
  },
  {
    category: "Leadership & Delivery",
    items: [
      "Team & Project Management",
      "End-to-End Product Engineering",
      "Product Design",
      "Agile Methodologies",
    ],
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: "AI Product Engineer",
    company: "rj11io",
    companyHref: "https://rj11.io",
    dates: "Mar 2025 – Present",
    bullets: [
      "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up — AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, and a real estate platform",
      "AI chats and custom GPT experiences, plus AI smart-scraping agents and n8n workflows",
      "Cybersecurity dashboards, proprietary data explorers, and AI agent harnesses, skills, and automations",
    ],
  },
  {
    role: "Product / Datavis Engineer",
    company: "Hunt Intelligence, Inc.",
    companyHref: "https://hunt.io",
    dates: "Apr 2024 – Mar 2025",
    bullets: [
      "Went deep on a specialty: data visualisation for a threat-intelligence product, including custom components like the IP History Widget",
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase — Next.js, shadcn/ui, Playwright, CI/CD on GitHub Actions, staging/production on Vercel, and automated release changelogs to Slack",
      "Built a new API documentation platform on top of OpenAPI — friendlier and more intuitive than Swagger",
    ],
  },
  {
    role: "Senior Frontend Engineer → Team Lead",
    company: "OMEGA Systems",
    companyHref: "https://omegasys.eu",
    dates: "Jun 2023 – Apr 2024",
    printBreakBefore: true,
    bullets: [
      "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team",
      "Data visualisation for the Main and Social dashboards, report views, and configuration screens (cashback, referrals, withdrawals, leaderboards), plus a localisation module",
      "As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote/async workflows, with a strong “Definition of Done”",
    ],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Phantasma Chain",
    companyHref: "https://phantasma.info",
    dates: "Jan 2022 – May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK and built in-house tooling (custom SDK hook, localisation, white-label theming)",
    ],
  },
  {
    role: "Frontend Lead",
    company: "BinaryEdge · Coalition, Inc.",
    companyHref: "https://coalitioninc.com",
    dates: "Feb 2020 – Oct 2021",
    bullets: [
      "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools; introduced React, TypeScript, Next.js, and micro frontends",
      "Tech Lead for Coalition Explorer and Coalition Explorer 2.0 — claims management, report generation, security review, and Executive Risks platforms — plus the component library and data visualisations",
      "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions",
    ],
  },
]

export const earlierRoles =
  "Co-founder at Glaiveware, building bespoke web apps (2018–2019) · React Native chat app with end-to-end encryption at Sycret.ink (2017) · full-stack dashboard for the American Heart Association (2016) · analytics dashboards at NextBitt (2015–2016)"

export const projects: Project[] = [
  {
    name: "11io",
    href: "https://rj11.io",
    description: "Personal brand for B2B freelancing",
    dates: "2025 – Present",
  },
  {
    name: "11ai",
    href: "https://ai.rj11.io",
    description: "Open source AI skills, plugins, and workflows",
    dates: "2026 – Present",
  },
  {
    name: "11bench",
    href: "https://bench.rj11.io",
    description: "Open source AI benchmarks",
    dates: "2026 – Present",
  },
]

export const education = {
  program: "IT Systems Management and Programming",
  credential: "Técnico de Gestão e Programação de Sistemas Informáticos",
  school: "Escola Profissional de Tecnologia Digital",
  location: "Lisbon, Portugal",
  dates: "2013 – 2016",
}
