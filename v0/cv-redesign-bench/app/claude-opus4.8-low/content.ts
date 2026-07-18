// Canonical content model for the CV, derived directly from content.md.
// This is the single source of truth the route renders from.

export type LinkItem = { label: string; href: string }

export const profile = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  contacts: [
    { label: "rj11.io", href: "https://rj11.io" },
    { label: "github.com/rj11io", href: "https://github.com/rj11io" },
    { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
    { label: "cv.rj11.io", href: "https://cv.rj11.io" },
  ] as LinkItem[],
}

export const about: string[] = [
  "AI Product Engineer with a decade of professional TypeScript, building on React since 2016 and Next.js since 2018 — an early bet on the stack that became the standard for both the web and AI products.",
  "On most projects I was the first frontend hire, owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them through hiring, onboarding, and the playbooks that let new engineers integrate seamlessly.",
  "Most of my work is dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies — where I found a passion for data-driven products and visualisation. I have built with AI since the first Copilot and ChatGPT releases, moving from prompt and context engineering to full agent harnesses, and today run an automated fleet of agents that maintain my projects.",
]

export const funFacts: string[] = [
  "Started coding young for fun, modding and reverse-engineering games and consoles.",
  "Built a fighting game on the MUGEN engine and ran dedicated Counter-Strike and Minecraft servers.",
  "Placed second nationally and reached the final four of the 2008 LEGO Mindstorms robotics world cup in China.",
]

export type SkillGroup = { label: string; items: string[] }
export const skills: SkillGroup[] = [
  {
    label: "Core Stack",
    items: ["TypeScript", "React.js", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
  },
  {
    label: "AI Engineering",
    items: ["Agent Automations", "Custom Agent Skills", "Harness Engineering", "Codex", "Claude Code", "n8n"],
  },
  {
    label: "UI & Design",
    items: ["Tailwind CSS", "shadcn/ui", "Material-UI", "Design Systems", "Storybook", "Refactoring UI"],
  },
  {
    label: "Data & Visualisation",
    items: ["Dashboards", "d3", "Recharts", "Nivo", "Web Scraping", "Data Enrichment"],
  },
  {
    label: "Leadership & Delivery",
    items: ["Team & Project Management", "End-to-End Product Engineering", "Product Design", "Agile"],
  },
]

export type Project = { name: string; href: string; label: string; period: string; blurb: string }
export const projects: Project[] = [
  { name: "11io", href: "https://rj11.io", label: "rj11.io", period: "2025 – Present", blurb: "Personal brand for B2B freelancing." },
  { name: "11ai", href: "https://ai.rj11.io", label: "ai.rj11.io", period: "2026 – Present", blurb: "Open-source AI skills, plugins, and workflows." },
  { name: "11bench", href: "https://bench.rj11.io", label: "bench.rj11.io", period: "2026 – Present", blurb: "Open-source AI benchmarks." },
]

export type Role = {
  title: string
  org: string
  link?: LinkItem
  meta?: string
  period: string
  bullets: string[]
}

export const experience: Role[] = [
  {
    title: "AI Product Engineer",
    org: "rj11io",
    link: { label: "rj11.io", href: "https://rj11.io" },
    meta: "B2B · Remote",
    period: "Mar 2025 – Present",
    bullets: [
      "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
      "Shipped AI PDF data extraction, AI SEO analytics, a GenAI dermatopathology portal, a real-estate platform, and AI chat / custom GPT experiences.",
      "Built cybersecurity dashboards, proprietary data explorers, smart scraping agents with n8n, and AI agent harnesses, skills, and automations.",
    ],
  },
  {
    title: "Product / Datavis Engineer",
    org: "Hunt Intelligence, Inc.",
    link: { label: "hunt.io", href: "https://hunt.io" },
    meta: "B2B · Remote",
    period: "Apr 2024 – Mar 2025",
    bullets: [
      "Went deep on data visualisation for a threat-intelligence product, including custom components like the IP History Widget.",
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern Next.js, shadcn/ui, Playwright, and GitHub Actions stack.",
      "Shipped a new OpenAPI-based API documentation platform, friendlier and more intuitive than Swagger.",
    ],
  },
  {
    title: "Senior Frontend Engineer → Team Lead",
    org: "OMEGA Systems",
    link: { label: "omegasys.eu", href: "https://omegasys.eu" },
    meta: "Remote",
    period: "Jun 2023 – Apr 2024",
    bullets: [
      "Built the next generation of OMEGA's iGaming platform management system (CORE5) in TypeScript and React; promoted to lead the frontend team.",
      "Data visualisation for the Main and Social dashboards, plus report and configuration views.",
      "As lead: built the developer onboarding experience and set standards for tickets, documentation, and remote / async workflows.",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    org: "Phantasma Chain",
    link: { label: "phantasma.info", href: "https://phantasma.info" },
    meta: "Remote",
    period: "Jan 2022 – May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK.",
    ],
  },
  {
    title: "Frontend Lead",
    org: "BinaryEdge · Coalition, Inc.",
    link: { label: "coalitioninc.com", href: "https://coalitioninc.com" },
    meta: "Remote",
    period: "Feb 2020 – Oct 2021",
    bullets: [
      "Grew from solo frontend engineer to team lead for customer-facing security apps and internal tools; introduced React, TypeScript, Next.js, and micro frontends.",
      "Tech Lead for Coalition Explorer, the component library, and data visualisations; built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.",
    ],
  },
]

export const earlier =
  "Co-founder and full-stack engineer at Glaiveware, building bespoke web apps (2018–2019); React Native end-to-end-encrypted chat app at Sycret.ink (2017); full-stack Kinect dashboard for the American Heart Association (2016); analytics dashboards at NextBitt (2015–2016); Java back-office system as an intern at Science4you (2015)."

export const education = {
  title: "IT Systems Management and Programming",
  school: "Escola Profissional de Tecnologia Digital, Lisbon",
  period: "2013 – 2016",
  note: "Técnico de Gestão e Programação de Sistemas Informáticos",
}
