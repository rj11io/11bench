// Canonical content model for this run's CV.
// Every string here is a direct transcription of the final wording decided in
// ./content.md — that file documents what was extracted, compressed, rewritten,
// or omitted, and why. Both the screen and print renderings import from this file;
// neither hardcodes a divergent copy of the CV's text.

export type Link = {
  label: string
  href: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type Project = {
  name: string
  link: Link
  period: string
  description: string
}

export type ExperienceEntry = {
  title: string
  company: string
  companyLink?: Link
  meta?: string
  period: string
  bullets: string[]
}

export type EarlierEntry = {
  title: string
  company: string
  location: string
  period: string
  note: string
}

export const person = {
  name: "Ricardo Jorge",
  nickname: "RJ",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
} as const

export const contactLinks: Link[] = [
  { label: "ricardojorgexyz@gmail.com", href: "mailto:ricardojorgexyz@gmail.com" },
  { label: "rj11.io", href: "https://rj11.io" },
  { label: "github.com/rj11io", href: "https://github.com/rj11io" },
  { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
]

export const origin =
  "Started coding young modding games and consoles, building a MUGEN fighting game, and running dedicated game servers — then placed 2nd nationally and reached the final four of the 2008 LEGO Mindstorms robotics world cup in China, at 14."

export const about =
  "AI Product Engineer with a decade of professional TypeScript experience — on React since 2016, on Next.js since 2018, professional since 2015. On most projects I've been the first frontend hire: owning architecture, tooling, and pipelines from day one, then growing and onboarding the team around them. Most of that decade has gone into dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies, which is where data-driven products and visualisation became the specialty. I've built with AI since the first Copilot and ChatGPT releases — prompt and context engineering, then open-source agent skills, then full agent harnesses. An automated fleet of those agents now maintains my own projects."

export const skills: SkillGroup[] = [
  {
    category: "Core Stack",
    items: [
      "TypeScript",
      "React",
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
    category: "UI & Data Visualisation",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Design Systems",
      "Storybook",
      "d3",
      "Recharts",
      "Nivo",
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
    title: "AI Product Engineer",
    company: "rj11io",
    companyLink: { label: "rj11.io", href: "https://rj11.io" },
    meta: "B2B · Remote",
    period: "Mar 2025 – Present",
    bullets: [
      "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, and a real estate platform",
      "Multiple cybersecurity dashboards and proprietary data explorers, end to end",
      "AI chat and custom GPT experiences, smart-scraping agents, and n8n workflows",
      "AI agent harnesses, custom skills, and automations",
    ],
  },
  {
    title: "Product / Datavis Engineer",
    company: "Hunt Intelligence, Inc.",
    companyLink: { label: "hunt.io", href: "https://hunt.io" },
    meta: "B2B · Remote",
    period: "Apr 2024 – Mar 2025",
    bullets: [
      "Left OMEGA to go deep on my specialty: data visualisation for a threat-intelligence product",
      "Built a modern TypeScript codebase on Next.js and shadcn/ui, with production and staging on Vercel, Playwright end-to-end tests, and CI/CD on GitHub Actions with automated release changelogs to Slack",
      "Built custom data-visualisation components — including the IP History Widget — and the core product modules AttackCapture™ and HuntSQL™",
      "Built a new API documentation platform on top of OpenAPI: enriched the raw schema with metadata and shipped a UI friendlier and more intuitive than Swagger",
    ],
  },
  {
    title: "Senior Frontend Engineer → Team Lead",
    company: "OMEGA Systems",
    companyLink: { label: "omegasys.eu", href: "https://omegasys.eu" },
    meta: "Remote",
    period: "Jun 2023 – Apr 2024",
    bullets: [
      "Joined to build the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team",
      "Data visualisation for the Main and Social dashboards, plus report and configuration views (cashback, refer-a-friend, withdrawals, leaderboards)",
      "Built the localisation/internationalisation module and an internal \"Tab System\" UI",
      "As lead: built the developer-onboarding experience, set standards for tickets, documentation, and remote/async workflows around a clear \"Definition of Done,\" and gave weekly \"TED\" talks to keep the team current",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Phantasma Chain",
    companyLink: { label: "phantasma.info", href: "https://phantasma.info" },
    meta: "Remote",
    period: "Jan 2022 – May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK",
      "Built in-house tooling: a custom React hook for the SDK, localisation, white-label theming, and environment configs",
    ],
  },
  {
    title: "Frontend Lead",
    company: "BinaryEdge · Coalition, Inc.",
    companyLink: { label: "coalitioninc.com", href: "https://coalitioninc.com" },
    meta: "Remote",
    period: "Feb 2020 – Oct 2021",
    bullets: [
      "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools; introduced React, TypeScript, Next.js, and micro frontends",
      "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control",
      "Tech Lead for Coalition Explorer and Explorer 2.0 — claims management, report generation, security review, and Executive Risks tooling for the whole company",
      "Tech Lead for the Coalition Storybook and component library; migrated CI/CD from Drone to GitHub Actions",
    ],
  },
]

export const earlierExperience: EarlierEntry[] = [
  {
    title: "Fullstack Engineer, Co-Founder",
    company: "Glaiveware",
    location: "Lisbon, Portugal · Remote",
    period: "Mar 2018 – Dec 2019",
    note: "Bespoke web apps above market standard",
  },
  {
    title: "React Native Developer",
    company: "Sycret.ink",
    location: "Neuchâtel, Switzerland · Remote",
    period: "Jan 2017 – Dec 2017",
    note: "End-to-end encrypted mobile chat app, serverless",
  },
  {
    title: "Full Stack JavaScript Developer",
    company: "American Heart Association",
    location: "Remote",
    period: "Sep 2016 – Nov 2016",
    note: "Admin dashboard for a Kinect-data integration",
  },
  {
    title: "Frontend Developer",
    company: "NextBitt",
    location: "Lisbon, Portugal",
    period: "Oct 2015 – Jul 2016",
    note: "Analytics dashboards for asset & facilities management software",
  },
  {
    title: "Java Developer, Intern",
    company: "Science4you",
    location: "Lisbon, Portugal",
    period: "Jan 2015 – Mar 2015",
    note: "Management system for an online store",
  },
]

export const projects: Project[] = [
  {
    name: "11io",
    link: { label: "rj11.io", href: "https://rj11.io" },
    period: "2025 – Present",
    description: "Personal brand for B2B freelancing",
  },
  {
    name: "11ai",
    link: { label: "ai.rj11.io", href: "https://ai.rj11.io" },
    period: "2026 – Present",
    description: "Open-source AI skills, plugins, and workflows",
  },
  {
    name: "11bench",
    link: { label: "bench.rj11.io", href: "https://bench.rj11.io" },
    period: "2026 – Present",
    description: "Open-source AI benchmarks",
  },
]

export const education = {
  program: "IT Systems Management and Programming",
  school: "Escola Profissional de Tecnologia Digital",
  location: "Lisbon, Portugal",
  period: "2013 – 2016",
} as const
