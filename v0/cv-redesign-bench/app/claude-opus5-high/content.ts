/**
 * Canonical content for the CV route.
 *
 * This file is the machine-readable form of `content.md` in the same folder.
 * `content.md` is the source of truth: it records where every fact came from
 * (`RJ_CV.pdf` or `RJ_CV_max.pdf`), which wording is an editorial rewrite, what
 * was cut to fit two pages, and which claims are uncertain.
 *
 * Nothing here may be edited without updating `content.md` to match. No
 * component in this folder hardcodes CV copy — everything renders from here.
 *
 * `**double asterisks**` mark the one bolded lead phrase per paragraph or
 * bullet. See `research.md` §1.2 for why bolding sits at the start of a line.
 */

export type Link = {
  /** What the reader sees. Printed as-is so the address survives on paper. */
  readonly label: string
  readonly href: string
}

export type Role = {
  readonly title: string
  /** Second title held in the same role, shown after a promotion arrow. */
  readonly promotedTo?: string
  readonly employer: string
  /** Second employer name, exactly as both source PDFs write it. */
  readonly employerAlt?: string
  readonly site?: Link
  /** Working arrangement, e.g. "B2B · Remote". */
  readonly arrangement?: string
  readonly dates: string
  /** One sentence stating the mandate, above the bullets. */
  readonly framing?: string
  readonly bullets: readonly string[]
}

export const person = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  /** content.md §3 — assembled from source claims, no new facts. */
  standfirst:
    "Ten years building the frontend, most of it as the first frontend hire. Now building AI products.",
} as const

export const email: Link = {
  label: "ricardojorgexyz@gmail.com",
  href: "mailto:ricardojorgexyz@gmail.com",
}

export const contacts: readonly Link[] = [
  { label: "rj11.io", href: "https://www.rj11.io/" },
  { label: "github.com/rj11io", href: "https://github.com/rj11io" },
  { label: "linkedin.com/in/rj11io", href: "https://www.linkedin.com/in/rj11io" },
  { label: "cv.rj11.io", href: "https://cv.rj11.io/" },
]

export const profile: readonly string[] = [
  "AI Product Engineer with a decade of professional TypeScript, building on **React since 2016 and Next.js since 2018**. On most projects I was the first frontend hire — owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them: hiring, interviewing, onboarding, and writing the playbooks that let new engineers integrate seamlessly.",
  "Most of that work is **dashboards, product platforms, and proprietary data explorers** for cybersecurity, crypto, and gaming companies — where I found a passion for data-driven products and visualisation, and learned what separates a polished product from a prototype.",
  "I've built with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to **open-source agent skills** to designing full agent harnesses and automations. Today an automated fleet of AI agents maintains my personal projects.",
]

export const skills: readonly { label: string; items: readonly string[] }[] = [
  {
    label: "Core Stack",
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
    label: "UI & Data Visualisation",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Material-UI",
      "Design Systems",
      "Storybook",
      "Dashboards",
      "Data Visualisation (d3 · Recharts · Nivo)",
    ],
  },
  {
    label: "Leadership & Delivery",
    items: [
      "Team & Project Management",
      "End-to-End Product Engineering",
      "Product Design",
      "Agile",
    ],
  },
  {
    label: "Foundations",
    items: [
      "JavaScript",
      "Node.js",
      "HTML5",
      "CSS",
      "Git",
      "GitHub Actions",
      "REST APIs",
      "CI/CD",
      "Testing",
    ],
  },
]

export const projects: readonly {
  name: string
  site: Link
  dates: string
  description: string
}[] = [
  {
    name: "11io",
    site: { label: "rj11.io", href: "https://www.rj11.io/" },
    dates: "2025 – Present",
    description: "Personal brand for B2B freelancing",
  },
  {
    name: "11ai",
    site: { label: "ai.rj11.io", href: "https://ai.rj11.io/" },
    dates: "2026 – Present",
    description: "Open-source AI skills, plugins, and workflows",
  },
  {
    name: "11bench",
    site: { label: "bench.rj11.io", href: "https://bench.rj11.io/" },
    dates: "2026 – Present",
    description: "Open-source AI benchmarks",
  },
]

export const projectsNote = {
  text: "Earlier open-source archive, 2020 – 2023:",
  site: {
    label: "github.com/ricardojrmcom",
    href: "https://github.com/ricardojrmcom",
  } satisfies Link,
}

export const roles: readonly Role[] = [
  {
    title: "AI Product Engineer",
    employer: "rj11io",
    site: { label: "rj11.io", href: "https://www.rj11.io/" },
    arrangement: "B2B · Remote",
    dates: "Mar 2025 – Present",
    framing:
      "Hands-on AI product engineering for multiple early-stage startups, built from the ground up.",
    bullets: [
      "**AI product builds** — data extraction from PDFs, SEO analytics, a GenAI dermatopathology portal, AI chat and custom GPT experiences, and a real estate platform",
      "**Cybersecurity dashboards and proprietary data explorers**, across several clients",
      "**Agent harnesses, custom skills, and automations** — plus scraping agents and n8n workflows",
    ],
  },
  {
    title: "Product / Datavis Engineer",
    employer: "Hunt Intelligence, Inc.",
    site: { label: "hunt.io", href: "https://hunt.io/" },
    arrangement: "B2B · Remote",
    dates: "Apr 2024 – Mar 2025",
    framing:
      "Data visualisation for a threat-intelligence product — my specialty, and the reason I took the role.",
    bullets: [
      "**AttackCapture™ and HuntSQL™** — built core product modules",
      "**IP History Widget** and other custom data-visualisation components",
      "**New API documentation platform on OpenAPI** — enriched the raw openapi.json with metadata and shipped a UI friendlier than Swagger",
      "**Modern TypeScript foundation** — latest Next.js and shadcn/ui, production and staging on Vercel, Playwright end-to-end tests, CI/CD on GitHub Actions, release changelogs into Slack",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    promotedTo: "Team Lead",
    employer: "OMEGA Systems",
    site: { label: "omegasys.eu", href: "https://www.omegasys.eu/" },
    arrangement: "Remote",
    dates: "Jun 2023 – Apr 2024",
    framing:
      "Joined to build the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React. Promoted to lead the frontend team.",
    bullets: [
      "**Data visualisation for the Main and Social dashboards**, plus report and configuration views — Cashback, Refer-a-Friend, Pending Withdrawals, Challenges / Leaderboards",
      "**Localisation module and an internal “Tab System” UI**",
      "**As lead: developer onboarding experience**, and standards for tickets, documentation, and remote / async work, with a strong emphasis on the Definition of Done",
      "**Weekly “TED” talks** to bring the whole team up to speed on technology and product",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    employer: "Phantasma Chain",
    site: { label: "phantasma.info", href: "https://phantasma.info/" },
    arrangement: "Remote",
    dates: "Jan 2022 – May 2023",
    framing:
      "Frontend for a blockchain platform: monorepo, design system, and public block explorer.",
    bullets: [
      "**Frontend monorepo** for all new tools and apps",
      "**Phantasma UI Storybook** — designed and developed the component library",
      "**Phantasma Explorer** — the public block explorer",
      "**In-house tooling** — SDK React hook, localisation, white-label theming, env configs",
      "**Contributed improvements to the Phantasma TypeScript SDK**; Playwright tests, CI and CD",
    ],
  },
  {
    title: "Frontend Lead",
    employer: "BinaryEdge",
    employerAlt: "Coalition, Inc.",
    site: { label: "coalitioninc.com", href: "https://www.coalitioninc.com/" },
    arrangement: "Remote",
    dates: "Feb 2020 – Oct 2021",
    framing:
      "Tech lead for BinaryEdge and Coalition's Customer Security team. Started as the solo frontend engineer and grew a team; introduced React, TypeScript, Next.js, Nivo, and micro frontends.",
    bullets: [
      "**Attack Surface Monitoring (ASM)** on the BinaryEdge Portal as a micro frontend, later integrated into Coalition Explorer and Coalition Control",
      "**Tech lead for Coalition Explorer** and Explorer 2.0 — critical internal tools for the whole company: claims management, report generation, security review, Executive Risks",
      "**Tech lead for the Coalition Storybook**, the Customer Security web UI component library",
      "**Migrated frontend CI/CD from Drone to GitHub Actions**, improving pipelines and environments",
    ],
  },
]

export const earlier: readonly {
  title: string
  employer: string
  dates: string
  note: string
}[] = [
  {
    title: "Fullstack Engineer, Co-Founder",
    employer: "Glaiveware",
    dates: "Mar 2018 – Dec 2019",
    note: "Co-founded a studio building bespoke web apps; React, Redux, Node, Express, AWS — plus the business",
  },
  {
    title: "React Native Developer",
    employer: "Sycret.ink",
    dates: "Jan 2017 – Dec 2017",
    note: "Mobile chat app with end-to-end encryption, serverless, under contract with a team of three",
  },
  {
    title: "Full Stack JavaScript Developer",
    employer: "American Heart Association",
    dates: "Sep 2016 – Nov 2016",
    note: "Admin dashboard for the AHA's Kinect integration; won on a university scholarship",
  },
  {
    title: "Frontend Developer",
    employer: "NextBitt",
    dates: "Oct 2015 – Jul 2016",
    note: "Analytics dashboards, reporting, auditing, and management tools for facilities management software",
  },
  {
    title: "Java Developer",
    employer: "Science4you",
    dates: "Jan 2015 – Mar 2015",
    note: "Internship: order-management system for the online store in Java and MySQL, replacing manual work",
  },
]

export const education = {
  course: "IT Systems Management and Programming",
  dates: "2013 – 2016",
  school: "Escola Profissional de Tecnologia Digital",
  location: "Lisbon, Portugal",
  /** Official Portuguese name of the qualification. content.md §8. */
  original: "Técnico de Gestão e Programação de Sistemas Informáticos",
} as const

export const beyond =
  "**2008 robotics world cup** — second nationally and a final-four finish in China, programming LEGO Mindstorms at 14. Led teams and clans to the top of online ladders and to LAN tournament wins: recruiting, coaching, and keeping a remote roster on one strategy — management training in disguise. Before that: modding games and consoles, and a fighting game built on MUGEN."

export const footer = {
  text: "This is the short version. The full story:",
  site: { label: "cv.rj11.io/v1/max", href: "https://cv.rj11.io/v1/max" } satisfies Link,
  /** Not from either PDF — a fact about the document. content.md §10. */
  updated: "Updated July 2026",
} as const

/**
 * Which roles print on which A4 page. content.md §11 explains the split: the
 * two roles that carry the current pitch stay with the profile on page 1.
 */
export const pageOneRoles = roles.slice(0, 2)
export const pageTwoRoles = roles.slice(2)
