// Structured transcription of content.md ("Canonical content" section).
// content.md is the source of truth; edit it first, then mirror here.

export interface ContactLink {
  label: string
  href: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Project {
  name: string
  url: string
  href: string
  description: string
  dates: string
}

export interface Role {
  title: string
  company: string
  companyUrl?: string
  companyHref?: string
  dates: string
  lead?: string
  bullets: string[]
}

export interface EarlierRole {
  title: string
  company: string
  dates: string
  note: string
}

export const identity = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  cvUrl: "cv.rj11.io",
  cvHref: "https://cv.rj11.io",
}

export const contacts: ContactLink[] = [
  { label: "ricardojorgexyz@gmail.com", href: "mailto:ricardojorgexyz@gmail.com" },
  { label: "rj11.io", href: "https://rj11.io" },
  { label: "github.com/rj11io", href: "https://github.com/rj11io" },
  { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
]

export const profile = [
  "AI Product Engineer, professional since 2015 — building on TypeScript and React since 2016 and Next.js since 2018, an early bet on the stack that became the standard for the web and for AI products. Usually the first frontend hire: owns architecture, tooling, component libraries, and pipelines from day one, then grows the team around them — hiring, onboarding, and writing the playbooks.",
  "Deepest experience is dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies, where a passion for data-driven products and visualisation took hold. Building with AI since the first releases of Copilot and ChatGPT: prompt and context engineering, open-source agent skills, and full agent harnesses and automations — today an automated fleet of AI agents maintains his personal projects.",
]

export const availability =
  "Hands-on B2B freelancer across multiple teams — always open to exceptional opportunities."

export const skills: SkillGroup[] = [
  {
    name: "Core stack",
    items: ["TypeScript", "React", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
  },
  {
    name: "AI engineering",
    items: [
      "Agent automations",
      "Custom agent skills",
      "Harness engineering",
      "Codex",
      "Claude Code",
      "n8n",
    ],
  },
  {
    name: "UI & data",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Design systems",
      "Storybook",
      "Dashboards",
      "Data visualisation (d3, Recharts, Nivo)",
    ],
  },
  {
    name: "Leadership & delivery",
    items: [
      "Team & project management",
      "End-to-end product engineering",
      "Product design",
      "Agile methodologies",
    ],
  },
]

export const projects: Project[] = [
  {
    name: "11io",
    url: "rj11.io",
    href: "https://rj11.io",
    description: "Personal brand for B2B freelancing",
    dates: "2025 – Present",
  },
  {
    name: "11ai",
    url: "ai.rj11.io",
    href: "https://ai.rj11.io",
    description: "Open-source AI skills, plugins, and workflows",
    dates: "2026 – Present",
  },
  {
    name: "11bench",
    url: "bench.rj11.io",
    href: "https://bench.rj11.io",
    description: "Open-source AI benchmarks",
    dates: "2026 – Present",
  },
]

export const roles: Role[] = [
  {
    title: "AI Product Engineer",
    company: "rj11io",
    companyUrl: "rj11.io",
    companyHref: "https://rj11.io",
    dates: "Mar 2025 – Present",
    lead: "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
    bullets: [
      "AI products end to end: PDF data extraction, AI SEO analytics, a GenAI dermatopathology portal, AI chats and custom GPT experiences, and a real-estate platform.",
      "Cybersecurity dashboards and proprietary data explorers for client teams.",
      "AI agent harnesses, skills, and automations, plus smart scraping agents and n8n workflows.",
    ],
  },
  {
    title: "Product / Datavis Engineer",
    company: "Hunt Intelligence, Inc.",
    companyUrl: "hunt.io",
    companyHref: "https://hunt.io",
    dates: "Apr 2024 – Mar 2025",
    lead: "Went deep on his specialty — data visualisation for a threat-intelligence product.",
    bullets: [
      "Built core product modules AttackCapture™ and HuntSQL™ on a modern TypeScript codebase: Next.js, shadcn/ui, Playwright end-to-end tests, CI/CD on GitHub Actions, and automated release changelogs wired to Slack.",
      "Built custom data-visualisation components such as the IP History Widget.",
      "Built a new API documentation platform on top of OpenAPI — enriched the raw spec with metadata and shipped a UI friendlier than Swagger.",
    ],
  },
  {
    title: "Senior Frontend Engineer → Team Lead",
    company: "OMEGA Systems",
    companyUrl: "omegasys.eu",
    companyHref: "https://omegasys.eu",
    dates: "Jun 2023 – Apr 2024",
    lead: "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team.",
    bullets: [
      "Data visualisation for the Main and Social dashboards, plus report and configuration views (Cashback, Refer-a-Friend, Pending Withdrawals, Challenges / Leaderboards).",
      "Built the localisation / internationalisation module and kept shipping product features end to end.",
      "As lead: built the new-developer onboarding experience and set standards for tickets, documentation, and remote / async workflows, with a strong emphasis on the “Definition of Done”.",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Phantasma Chain",
    companyUrl: "phantasma.info",
    companyHref: "https://phantasma.info",
    dates: "Jan 2022 – May 2023",
    bullets: [
      "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
      "Tests with Playwright, CI with GitHub Actions, CD with Vercel; contributed improvements to the Phantasma TypeScript SDK.",
    ],
  },
  {
    title: "Frontend Lead",
    company: "BinaryEdge · Coalition, Inc.",
    companyUrl: "coalitioninc.com",
    companyHref: "https://coalitioninc.com",
    dates: "Feb 2020 – Oct 2021",
    lead: "Started as the solo frontend engineer and grew the team behind Coalition's customer-facing security apps and internal tools.",
    bullets: [
      "Introduced React, TypeScript, Next.js, and micro frontends; Tech Lead for Coalition Explorer (and Explorer 2.0), the component library, and data visualisations.",
      "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.",
      "Migrated frontend CI/CD from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
    ],
  },
]

export const earlierRoles: EarlierRole[] = [
  {
    title: "Co-Founder, Fullstack Engineer",
    company: "Glaiveware",
    dates: "Mar 2018 – Dec 2019",
    note: "Ran a bespoke web-app studio; learned to manage projects and run a business.",
  },
  {
    title: "React Native Developer",
    company: "Sycret.ink (Neuchâtel, Switzerland)",
    dates: "2017",
    note: "End-to-end-encrypted mobile chat app (libsignal) on serverless AWS, in a team of three.",
  },
  {
    title: "Full Stack JavaScript Developer",
    company: "American Heart Association",
    dates: "Sep – Nov 2016",
    note: "Admin dashboard for the AHA's Kinect integration, connecting doctors with patient data; won through a university scholarship.",
  },
  {
    title: "Frontend Developer",
    company: "NextBitt",
    dates: "Oct 2015 – Jul 2016",
    note: "Analytics dashboards and reporting / auditing tools for asset & facilities management software.",
  },
  {
    title: "Java Developer (Internship)",
    company: "Science4you",
    dates: "Jan – Mar 2015",
    note: "Built an order-management system that replaced manual back-office work.",
  },
]

export const education = {
  program: "IT Systems Management and Programming",
  school: "Escola Profissional de Tecnologia Digital, Lisbon",
  dates: "2013 – 2016",
}

export const beyondWork =
  "Started coding by modding and reverse-engineering games and consoles — built a fighting game on the MUGEN engine and ran dedicated Counter-Strike and Minecraft servers. At 14, took a LEGO Mindstorms team to a second-place national finish and the final four of the 2008 robotics world cup in China."
