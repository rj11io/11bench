// Canonical, structured content for the CV route.
// This is a direct transcription of content.md — the website renders ONLY from
// this file. Do not diverge from content.md. Facts (names, employers, dates,
// links, claims) are preserved; wording is tightened without inventing facts.

export type ContactLink = {
  label: string
  href: string
  /** Short form shown in print / compact contexts. */
  display: string
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type ExperienceEntry = {
  role: string
  company: string
  /** e.g. "hunt.io" — the primary company link domain, or null. */
  siteLabel: string | null
  siteHref: string | null
  period: string
  meta: string | null // e.g. "B2B · Remote"
  bullets: string[]
}

export type EarlierEntry = {
  role: string
  company: string
  period: string
  summary: string
}

export type ProjectEntry = {
  name: string
  domain: string
  href: string
  period: string
  description: string
}

export type EducationEntry = {
  program: string
  school: string
  location: string
  period: string
  note: string | null
}

export const person = {
  name: "Ricardo Jorge",
  nickname: "RJ",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  mode: "B2B freelance · Remote",
  email: "ricardojorgexyz@gmail.com",
} as const

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:ricardojorgexyz@gmail.com", display: "ricardojorgexyz@gmail.com" },
  { label: "Website", href: "https://rj11.io", display: "rj11.io" },
  { label: "GitHub", href: "https://github.com/rj11io", display: "github.com/rj11io" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rj11io", display: "linkedin.com/in/rj11io" },
  { label: "This CV", href: "https://cv.rj11.io", display: "cv.rj11.io" },
]

// Two short paragraphs, condensed from the max + min "About Me".
export const summary: string[] = [
  "AI Product Engineer with a decade of professional experience, specialising in frontend TypeScript — React since 2016, Next.js since 2018, an early bet on the stack that became standard for both the web and AI products. On most projects the first frontend hire: owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them — hiring, onboarding, and writing the playbooks that let new engineers integrate seamlessly.",
  "Most of that work is dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies — where a passion for data-driven products and visualisation took hold. Building with AI since the first releases of Copilot and ChatGPT, moving from autocomplete to prompt and context engineering to designing full agent harnesses; today running an automated fleet of AI agents that maintain personal projects.",
]

// Compact personality strip — differentiator, not a full section.
export const personality: string[] = [
  "Started coding young for fun — modding and reverse-engineering games and consoles, a fighting game on the MUGEN engine, dedicated Counter-Strike and Minecraft servers.",
  "At 14, LEGO Mindstorms robotics: 2nd nationally and final four of the 2008 Robotics World Cup in China.",
  "Led teams, guilds, and clans to the top of online ladders and LAN wins — management training in disguise.",
]

export const skillGroups: SkillGroup[] = [
  {
    label: "Core stack",
    items: ["TypeScript", "React", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
  },
  {
    label: "AI engineering",
    items: ["Agent Automations", "Custom Agent Skills", "Harness Engineering", "Codex", "Claude Code", "n8n"],
  },
  {
    label: "UI & design",
    items: ["Tailwind CSS", "shadcn/ui", "Material-UI", "Design Systems", "Storybook", "Refactoring UI"],
  },
  {
    label: "Data & visualisation",
    items: ["Dashboards", "Data Visualisation (d3 · Recharts · Nivo)", "Web Scraping", "Data Enrichment"],
  },
  {
    label: "Leadership & delivery",
    items: ["Team & Project Management", "End-to-End Product Engineering", "Product Design", "Agile"],
  },
  {
    label: "Foundations",
    items: ["JavaScript", "Node.js", "HTML5", "CSS", "Git", "GitHub Actions", "REST APIs", "CI/CD", "Testing"],
  },
]

// Top roles get full bullets (print page one + top of page two).
export const experience: ExperienceEntry[] = [
  {
    role: "AI Product Engineer",
    company: "rj11io",
    siteLabel: "rj11.io",
    siteHref: "https://rj11.io",
    period: "Mar 2025 — Present",
    meta: "B2B · Remote",
    bullets: [
      "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
      "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, and a real-estate platform.",
      "Multiple cybersecurity dashboards and proprietary data explorers.",
      "AI chats and custom GPT experiences, smart-scraping agents and n8n workflows, and AI agent harnesses, skills, and automations.",
    ],
  },
  {
    role: "Product / Datavis Engineer",
    company: "Hunt Intelligence, Inc.",
    siteLabel: "hunt.io",
    siteHref: "https://hunt.io",
    period: "Apr 2024 — Mar 2025",
    meta: "B2B · Remote",
    bullets: [
      "Went deep on the specialty — data visualisation for a threat-intelligence product, including custom components like the IP History Widget.",
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase: Next.js, shadcn/ui, Playwright, CI/CD on GitHub Actions, prod + staging on Vercel, and automated release changelogs to Slack.",
      "Built a new API documentation platform on top of OpenAPI — friendlier and more intuitive than Swagger.",
    ],
  },
  {
    role: "Senior Frontend Engineer → Team Lead",
    company: "OMEGA Systems",
    siteLabel: "omegasys.eu",
    siteHref: "https://omegasys.eu",
    period: "Jun 2023 — Apr 2024",
    meta: "Remote",
    bullets: [
      "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team.",
      "Data visualisation for the Main and Social dashboards, plus report and configuration views (Cashback, Refer-a-Friend, Pending Withdrawals, Challenges / Leaderboards).",
      "Built the localisation module and an internal “Tab System” UI.",
      "As lead: built the “New Developer” onboarding experience, set standards for tickets, docs, and remote/async work, and gave weekly “TED” talks to level up the team.",
    ],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Phantasma Chain",
    siteLabel: "phantasma.info",
    siteHref: "https://phantasma.info",
    period: "Jan 2022 — May 2023",
    meta: "Remote",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and the Phantasma Explorer.",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK.",
      "Built in-house tools: a custom React hook for the SDK, localisation, white-label theming, environment configs, and an API/scripts/hooks module.",
    ],
  },
  {
    role: "Frontend Lead",
    company: "BinaryEdge · Coalition, Inc.",
    siteLabel: "coalitioninc.com",
    siteHref: "https://coalitioninc.com",
    period: "Feb 2020 — Oct 2021",
    meta: "Remote",
    bullets: [
      "Started as the solo frontend engineer and grew a team focused on customer-facing security apps and internal tools; introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends.",
      "Built Attack Surface Monitoring (ASM) on the BinaryEdge Portal as a micro frontend, later integrated into Coalition Explorer and Coalition Control.",
      "Tech Lead for Coalition Explorer (and Explorer 2.0), the Coalition Storybook and component library, and data visualisations — plus claims management, report generation, security review, and Executive Risks platforms.",
      "Migrated frontend CI/CD from Drone to GitHub Actions.",
    ],
  },
]

export const earlier: EarlierEntry[] = [
  {
    role: "Fullstack Engineer & Co-Founder",
    company: "Glaiveware",
    period: "2018 — 2019",
    summary:
      "Bespoke web apps above market standards; React/Redux/Next.js/Node, MongoDB · Firebase · MySQL, AWS — plus SEO/SEM, branding, and copywriting. Lisbon · Remote.",
  },
  {
    role: "React Native Developer",
    company: "Sycret.ink",
    period: "2017",
    summary:
      "End-to-end-encrypted mobile chat app (React Native, libsignal-protocol, AWS Lambda / API Gateway) with a team of three. Neuchâtel, Switzerland · Remote.",
  },
  {
    role: "Full-Stack JS Developer",
    company: "American Heart Association",
    period: "2016",
    summary:
      "Admin dashboard for the AHA's Kinect integration (React + Node), built via a university scholarship with free choice of technology. Remote.",
  },
  {
    role: "Frontend Developer",
    company: "NextBitt",
    period: "2015 — 2016",
    summary:
      "Analytics dashboards and reporting/auditing tools (jQuery, Angular.js, .NET; Google Charts, d3.js, Chart.js). Lisbon.",
  },
  {
    role: "Java Developer (Internship)",
    company: "Science4you",
    period: "2015",
    summary:
      "Order-management and reporting system for the online store (Java, MySQL), replacing manual back-office work. Lisbon.",
  },
]

export const projects: ProjectEntry[] = [
  {
    name: "11io",
    domain: "rj11.io",
    href: "https://rj11.io",
    period: "2025 — Present",
    description: "Personal brand for B2B freelancing.",
  },
  {
    name: "11ai",
    domain: "ai.rj11.io",
    href: "https://ai.rj11.io",
    period: "2026 — Present",
    description: "Open-source AI skills, plugins, and workflows.",
  },
  {
    name: "11bench",
    domain: "bench.rj11.io",
    href: "https://bench.rj11.io",
    period: "2026 — Present",
    description: "Open-source AI benchmarks.",
  },
]

export const education: EducationEntry[] = [
  {
    program: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    period: "2013 — 2016",
    note: "Técnico de Gestão e Programação de Sistemas Informáticos",
  },
]
