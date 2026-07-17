export type LinkItem = {
  label: string
  href: string
  printLabel: string
}

export type CvRole = {
  role: string
  company: string
  companyUrl?: string
  period: string
  context?: string
  summary?: string
  bullets: string[]
}

export type CvProject = {
  name: string
  href: string
  period?: string
  description: string
}

export type CvSkillGroup = {
  label: string
  items: string[]
}

export const cvContent = {
  profile: {
    name: "Ricardo Jorge",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    website: "https://rj11.io",
    cvUrl: "https://cv.rj11.io",
    github: "https://github.com/rj11io",
    linkedin: "https://linkedin.com/in/rj11io",
    summary:
      "Senior AI product and frontend engineer with 10+ years in TypeScript, building with React since 2016 and Next.js since 2018. Usually the first frontend hire, with end-to-end ownership across architecture, design systems, delivery pipelines, hiring, onboarding, and product shaping for cybersecurity, crypto, gaming, and AI startups.",
    differentiators: [
      "Hands-on product engineer across AI extraction, SEO analytics, proprietary data explorers, and domain-heavy dashboards.",
      "Strong visualisation and interface systems focus, from exploratory tooling to polished customer-facing product surfaces.",
      "Comfortable moving between implementation, product design, technical direction, and team enablement without losing execution speed.",
    ],
    evidenceStrip: [
      "TypeScript since 2015",
      "React since 2016",
      "Next.js since 2018",
      "AI workflows since the first Copilot and ChatGPT releases",
    ],
    rootsNote:
      "Started coding by modding games, reverse-engineering consoles, and running dedicated servers; reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
  },
  links: [
    {
      label: "Website",
      href: "https://rj11.io",
      printLabel: "rj11.io",
    },
    {
      label: "CV",
      href: "https://cv.rj11.io",
      printLabel: "cv.rj11.io",
    },
    {
      label: "GitHub",
      href: "https://github.com/rj11io",
      printLabel: "github.com/rj11io",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/rj11io",
      printLabel: "linkedin.com/in/rj11io",
    },
  ] satisfies LinkItem[],
  selectedProjects: [
    {
      name: "11io",
      href: "https://rj11.io",
      period: "2025-Present",
      description: "Personal brand and consulting presence for B2B freelancing.",
    },
    {
      name: "11ai",
      href: "https://ai.rj11.io",
      period: "2026-Present",
      description: "Open-source AI skills, plugins, and workflow experiments.",
    },
    {
      name: "11bench",
      href: "https://bench.rj11.io",
      period: "2026-Present",
      description: "Open-source benchmark work around AI-agent execution quality.",
    },
  ] satisfies CvProject[],
  currentThemes: [
    "AI product engineering",
    "Agent harnesses and automations",
    "Data visualisation",
    "Design systems and Storybook",
    "Next.js product platforms",
    "Playwright and CI/CD",
  ],
  experiencePrimary: [
    {
      role: "AI Product Engineer",
      company: "rj11io",
      companyUrl: "https://rj11.io",
      period: "Mar 2025-Present",
      context: "B2B freelancing · Remote",
      summary:
        "Hands-on product engineering for multiple early-stage teams, usually from greenfield to working production tooling.",
      bullets: [
        "Built AI products spanning PDF data extraction, SEO analytics, dermatopathology, custom chat experiences, and startup web platforms.",
        "Delivered cybersecurity dashboards, proprietary data explorers, and agent-oriented tools including skills, harnesses, and automations.",
        "Operated as a senior individual contributor across product definition, UX direction, implementation, and shipping.",
      ],
    },
    {
      role: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      companyUrl: "https://hunt.io",
      period: "Apr 2024-Mar 2025",
      context: "Threat intelligence · Remote",
      summary:
        "Joined to go deep on data visualisation inside a threat-intelligence product.",
      bullets: [
        "Built custom visualisation components such as the IP History Widget and shipped core modules including AttackCapture and HuntSQL.",
        "Worked in a modern TypeScript stack with Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Created a friendlier API documentation experience on top of OpenAPI by enriching the raw schema with product-facing metadata.",
      ],
    },
    {
      role: "Senior Frontend Engineer -> Team Lead",
      company: "OMEGA Systems",
      companyUrl: "https://omegasys.eu",
      period: "Jun 2023-Apr 2024",
      context: "iGaming platform management · Remote",
      summary:
        "Helped build CORE5, then stepped into frontend leadership.",
      bullets: [
        "Built major dashboard, reporting, and configuration surfaces for the next generation of OMEGA's platform management system.",
        "Added localisation and internal UI infrastructure while continuing to deliver new product work end to end.",
        "As lead, improved onboarding, documentation standards, ticket quality, and remote / async development practices.",
      ],
    },
    {
      role: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      companyUrl: "https://phantasma.info",
      period: "Jan 2022-May 2023",
      context: "Crypto tooling · Remote",
      summary:
        "Owned the frontend foundation for new apps and shared tooling.",
      bullets: [
        "Built the frontend monorepo, Phantasma UI Storybook, and Phantasma Explorer.",
        "Set up Playwright testing, GitHub Actions CI, and Vercel delivery flows.",
        "Contributed improvements to the TypeScript SDK and built internal hooks, theming, localisation, and environment modules.",
      ],
    },
  ] satisfies CvRole[],
  experienceSecondary: [
    {
      role: "Frontend Lead",
      company: "BinaryEdge / Coalition, Inc.",
      companyUrl: "https://coalitioninc.com",
      period: "Feb 2020-Oct 2021",
      context: "Customer security products · Remote",
      summary:
        "Started as a solo frontend engineer and grew into tech-lead responsibility across customer-facing security apps and internal tools.",
      bullets: [
        "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends to the frontend stack.",
        "Led Coalition Explorer, the shared component library / Storybook, and multiple data-visualisation-heavy product surfaces.",
        "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.",
      ],
    },
    {
      role: "Fullstack Engineer, Co-Founder",
      company: "Glaiveware",
      period: "Mar 2018-Dec 2019",
      context: "Bespoke web apps · Remote",
      bullets: [
        "Co-founded a consultancy building custom web applications above market standards.",
        "Worked across React, Next.js, Node.js, AWS, databases, branding, SEO, and project delivery.",
      ],
    },
    {
      role: "React Native Developer",
      company: "Sycret.ink",
      period: "Jan 2017-Dec 2017",
      context: "Encrypted mobile chat · Remote contract",
      bullets: [
        "Built a React Native chat app with end-to-end encryption in a serverless environment.",
      ],
    },
    {
      role: "Full Stack JavaScript Developer",
      company: "American Heart Association",
      period: "Sep 2016-Nov 2016",
      context: "Healthcare dashboard · Remote",
      bullets: [
        "Built an admin dashboard connecting doctors, patients, reporting, and Kinect-collected data.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "NextBitt",
      period: "Oct 2015-Jul 2016",
      context: "Asset and facilities software · Lisbon",
      bullets: [
        "Built analytics dashboards and reporting, auditing, and management tools with heavy date / time logic and visualisation work.",
      ],
    },
    {
      role: "Java Developer",
      company: "Science4you",
      period: "Jan 2015-Mar 2015",
      context: "Internship · Lisbon",
      bullets: [
        "Built an internal order-management and reporting system using Java and MySQL.",
      ],
    },
  ] satisfies CvRole[],
  skillGroups: [
    {
      label: "Product stack",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Storybook",
        "Vercel",
      ],
    },
    {
      label: "AI and automation",
      items: [
        "AI SDK",
        "Agent automations",
        "Custom agent skills",
        "Harness engineering",
        "Codex",
        "Claude Code",
        "n8n",
      ],
    },
    {
      label: "Data and quality",
      items: [
        "Dashboards",
        "Data visualisation",
        "d3",
        "Recharts",
        "Nivo",
        "Playwright",
        "GitHub Actions",
      ],
    },
    {
      label: "Leadership",
      items: [
        "First frontend hire",
        "Team growth",
        "Hiring and onboarding",
        "Product design",
        "Technical direction",
        "Async delivery",
      ],
    },
  ] satisfies CvSkillGroup[],
  education: {
    degree: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    period: "2013-2016",
    location: "Lisbon, Portugal",
    detail: "Tecnico de Gestao e Programacao de Sistemas Informaticos",
  },
} as const

export type CvContent = typeof cvContent
