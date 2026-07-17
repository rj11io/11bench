export type Link = {
  label: string
  href: string
  printLabel?: string
}

export type Experience = {
  role: string
  employer: string
  href?: string
  dates: string
  location?: string
  bullets: string[]
}

/**
 * Canonical render model, transcribed and editorially condensed from content.md.
 * page.tsx must render from this object rather than maintaining a second copy.
 */
export const cv = {
  displayMeta: {
    documentYear: "2026",
    recentExperienceRange: "2023 — now",
    earlierExperienceRange: "2018 — 2023",
    foundationRange: "2015 — 2023",
  },
  identity: {
    name: "Ricardo Jorge",
    role: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    emailHref: "mailto:ricardojorgexyz@gmail.com",
    website: { label: "rj11.io", href: "https://www.rj11.io/" },
    github: { label: "github.com/rj11io", href: "https://github.com/rj11io" },
    linkedin: {
      label: "linkedin.com/in/rj11io",
      href: "https://www.linkedin.com/in/rj11io",
    },
    cv: { label: "cv.rj11.io", href: "https://cv.rj11.io" },
  },
  summary:
    "AI product engineer with a decade of professional TypeScript experience; building with React since 2016 and Next.js since 2018. First frontend hire on multiple projects, owning architecture, component systems, tooling and delivery pipelines, then growing the teams around them.",
  focus:
    "Builds data-driven dashboards, product platforms and proprietary explorers across cybersecurity, crypto and gaming; now applies that product depth to AI extraction, agent harnesses, skills and automations.",
  capabilities: [
    {
      label: "Product systems",
      value:
        "TypeScript · React · Next.js · component libraries · Storybook · product design",
    },
    {
      label: "AI engineering",
      value:
        "AI SDK · agent automations · custom skills · harness engineering · Codex · Claude Code · n8n",
    },
    {
      label: "Data & delivery",
      value:
        "dashboards · d3 · Recharts · Nivo · Playwright · GitHub Actions · Vercel",
    },
  ],
  projects: [
    {
      name: "11io",
      link: { label: "rj11.io", href: "https://www.rj11.io/" },
      detail: "Personal brand for B2B freelancing",
    },
    {
      name: "11ai",
      link: { label: "ai.rj11.io", href: "https://ai.rj11.io" },
      detail: "Open-source AI skills, plugins and workflows",
    },
    {
      name: "11bench",
      link: { label: "bench.rj11.io", href: "https://bench.rj11.io" },
      detail: "Open-source AI benchmarks",
    },
  ],
  recentExperience: [
    {
      role: "AI Product Engineer",
      employer: "rj11io",
      href: "https://www.rj11.io/",
      dates: "Mar 2025 – Present",
      location: "B2B · Remote",
      bullets: [
        "Hands-on AI product engineering for multiple early-stage startups, taking projects from the ground up.",
        "Delivered AI data extraction from PDFs, SEO analytics, a GenAI dermatopathology portal, real-estate platform, AI chats and GPT experiences.",
        "Built cybersecurity dashboards, proprietary data explorers, smart-scraping agents, n8n workflows, agent harnesses, skills and automations.",
      ],
    },
    {
      role: "Product / Datavis Engineer",
      employer: "Hunt Intelligence, Inc.",
      href: "https://hunt.io",
      dates: "Apr 2024 – Mar 2025",
      location: "B2B · Remote",
      bullets: [
        "Built data visualisation for a threat-intelligence product, including the IP History Widget and core modules AttackCapture™ and HuntSQL™.",
        "Established a modern TypeScript / Next.js codebase with shadcn/ui, Vercel environments, Playwright, GitHub Actions and automated release changelogs.",
        "Created an OpenAPI-based documentation platform with an enriched, more intuitive interface than Swagger.",
      ],
    },
    {
      role: "Senior Frontend Engineer → Team Lead",
      employer: "OMEGA Systems",
      href: "https://www.omegasys.eu/",
      dates: "Jun 2023 – Apr 2024",
      location: "Remote",
      bullets: [
        "Built CORE5, OMEGA’s next-generation iGaming platform-management system, with TypeScript and React; promoted to lead the frontend team.",
        "Shipped data visualisation across Main and Social dashboards, reports and configuration views; also built the localisation module and internal Tab System.",
        "Created developer onboarding and standards for tickets, documentation and remote / async workflows; gave weekly technology and product talks.",
      ],
    },
  ] satisfies Experience[],
  earlierExperience: [
    {
      role: "Senior Frontend Engineer",
      employer: "Phantasma Chain",
      href: "https://phantasma.info",
      dates: "Jan 2022 – May 2023",
      location: "Remote",
      bullets: [
        "Built the frontend monorepo, Phantasma UI Storybook and Phantasma Explorer; contributed improvements to the TypeScript SDK.",
        "Delivered Playwright testing, GitHub Actions CI, Vercel CD and in-house tooling for SDK hooks, localisation, theming and environments.",
      ],
    },
    {
      role: "Frontend Lead",
      employer: "BinaryEdge · Coalition, Inc.",
      href: "https://www.coalitioninc.com/",
      dates: "Feb 2020 – Oct 2021",
      location: "Remote",
      bullets: [
        "Grew from solo frontend engineer to lead for customer security apps and internal tools; introduced React, TypeScript, Next.js and micro frontends.",
        "Led Attack Surface Monitoring, Coalition Explorer, a customer-security component library and data visualisations; migrated CI/CD from Drone to GitHub Actions.",
      ],
    },
    {
      role: "Fullstack Engineer, Co-Founder",
      employer: "Glaiveware",
      dates: "Mar 2018 – Dec 2019",
      location: "Lisbon, Portugal · Remote",
      bullets: [
        "Built bespoke web apps and learned project and business management across React, Next.js, Node.js, AWS, design, SEO and content.",
      ],
    },
  ] satisfies Experience[],
  foundation: [
    {
      role: "React Native Developer",
      employer: "Sycret.ink",
      dates: "Jan 2017 – Dec 2017",
      detail: "Contract work on a serverless, end-to-end encrypted mobile chat app.",
    },
    {
      role: "Full Stack JavaScript Developer",
      employer: "American Heart Association",
      dates: "Sep 2016 – Nov 2016",
      detail: "Built an admin dashboard for a Kinect integration using React and Node.",
    },
    {
      role: "Frontend Developer",
      employer: "NextBitt",
      dates: "Oct 2015 – Jul 2016",
      detail: "Created analytics, reporting, auditing and management tools for asset and facilities software.",
    },
    {
      role: "Java Developer (Internship)",
      employer: "Science4you",
      dates: "Jan 2015 – Mar 2015",
      detail: "Built an online-store management system with Java and MySQL.",
    },
  ],
  education: {
    credential: "IT Systems Management and Programming",
    institution: "Escola Profissional de Tecnologia Digital",
    detail: "Técnico de Gestão e Programação de Sistemas Informáticos",
    dates: "2013 – 2016",
    location: "Lisbon, Portugal",
  },
  fieldNote:
    "Started coding by modding and reverse-engineering games and consoles. Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
} as const
