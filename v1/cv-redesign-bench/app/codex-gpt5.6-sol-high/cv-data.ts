export type LinkItem = {
  label: string
  value: string
  href: string
  kind: "location" | "email" | "website" | "github" | "linkedin"
}

export type Experience = {
  role: string
  company: string
  dates: string
  href?: string
  context?: string
  bullets: string[]
}

export const cvData = {
  identity: {
    name: "Ricardo Jorge",
    role: "AI Product Engineer",
    kicker: "AI product · frontend systems · data interfaces",
    cvSite: {
      value: "cv.rj11.io",
      href: "https://cv.rj11.io",
    },
    summary:
      "AI Product Engineer turning ambiguous product problems into production TypeScript systems. Building software professionally since 2015, with React since 2016 and Next.js since 2018. Frequently the first frontend hire: owning architecture, design systems, testing, delivery, and the onboarding practices that help a team grow. Specialises in data-rich products across cybersecurity, crypto, and gaming; now builds AI extraction, analytics, agent workflows, and harnesses.",
  },
  contact: [
    {
      label: "Location",
      value: "Lisbon, Portugal",
      href: "",
      kind: "location",
    },
    {
      label: "Email",
      value: "ricardojorgexyz@gmail.com",
      href: "mailto:ricardojorgexyz@gmail.com",
      kind: "email",
    },
    {
      label: "Website",
      value: "rj11.io",
      href: "https://rj11.io",
      kind: "website",
    },
    {
      label: "GitHub",
      value: "github.com/rj11io",
      href: "https://github.com/rj11io",
      kind: "github",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rj11io",
      href: "https://linkedin.com/in/rj11io",
      kind: "linkedin",
    },
  ] satisfies LinkItem[],
  signals: [
    {
      value: "2015",
      label: "building production software",
    },
    {
      value: "2016",
      label: "shipping with React",
    },
    {
      value: "2018",
      label: "building on Next.js",
    },
  ],
  capabilities: [
    {
      title: "Product engineering",
      items: [
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "AI SDK",
        "Convex",
      ],
    },
    {
      title: "AI systems",
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
      title: "Interface & data",
      items: [
        "Tailwind CSS",
        "shadcn/ui",
        "Design systems",
        "Storybook",
        "d3",
        "Recharts",
        "Nivo",
      ],
    },
    {
      title: "Delivery & leadership",
      items: [
        "Playwright",
        "GitHub Actions",
        "Vercel",
        "CI/CD",
        "Team & project management",
        "Product design",
      ],
    },
  ],
  experiencePageOne: [
    {
      role: "AI Product Engineer",
      company: "rj11io",
      dates: "Mar 2025 — Present",
      href: "https://rj11.io",
      context: "Independent B2B practice · Remote",
      bullets: [
        "Ship AI product work for early-stage startups from discovery through production, spanning PDF data extraction, SEO analytics, a GenAI dermatopathology portal, AI chat/GPT experiences, cybersecurity dashboards, and proprietary data explorers.",
        "Design agent harnesses, custom skills, and automations; build AI-powered data workflows with n8n.",
      ],
    },
    {
      role: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      dates: "Apr 2024 — Mar 2025",
      href: "https://hunt.io",
      context: "Threat intelligence · B2B · Remote",
      bullets: [
        "Built a modern TypeScript product foundation with Next.js and shadcn/ui, Vercel environments, Playwright tests, GitHub Actions CI/CD, and automated release changelogs connected to Slack.",
        "Delivered the IP History Widget, AttackCapture™, and HuntSQL™, then built an API documentation platform that enriched OpenAPI metadata and presented it through a clearer interface than raw Swagger.",
      ],
    },
    {
      role: "Senior Frontend Engineer → Team Lead",
      company: "OMEGA Systems",
      dates: "Jun 2023 — Apr 2024",
      href: "https://omegasys.eu",
      context: "iGaming platform · Remote",
      bullets: [
        "Built CORE5’s React/TypeScript frontend and data visualisation across dashboards, reporting, and configuration views; promoted to lead the frontend team.",
        "Created developer onboarding and set standards for tickets, documentation, definition of done, and remote/async delivery while continuing to ship features end to end.",
      ],
    },
  ] satisfies Experience[],
  experiencePageTwo: [
    {
      role: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      dates: "Jan 2022 — May 2023",
      href: "https://phantasma.info",
      context: "Blockchain product · Remote",
      bullets: [
        "Built the frontend monorepo for new tools and apps, designed and developed Phantasma UI Storybook, and shipped Phantasma Explorer.",
        "Established Playwright tests, GitHub Actions CI, and Vercel delivery; contributed improvements to the Phantasma TypeScript SDK.",
      ],
    },
    {
      role: "Frontend Lead",
      company: "BinaryEdge · Coalition, Inc.",
      dates: "Feb 2020 — Oct 2021",
      href: "https://coalitioninc.com",
      context: "Customer security · Remote",
      bullets: [
        "Started as the solo frontend engineer and grew a team for customer-facing security products and internal tools; introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends.",
        "Led Coalition Explorer, its Storybook component library, and data visualisations; built Attack Surface Monitoring, later integrated into Coalition Explorer and Coalition Control.",
        "Migrated frontend CI/CD from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
      ],
    },
    {
      role: "Fullstack Engineer, Co-Founder",
      company: "Glaiveware",
      dates: "Mar 2018 — Dec 2019",
      context: "Product studio · Lisbon / Remote",
      bullets: [
        "Co-founded a studio delivering bespoke web applications with React, Next.js, Node.js, databases, and AWS while managing projects and the business around them.",
      ],
    },
  ] satisfies Experience[],
  earlyExperience: [
    {
      role: "React Native Developer",
      company: "Sycret.ink",
      dates: "2017",
      detail: "End-to-end encrypted mobile chat · Contract team of three",
    },
    {
      role: "Full Stack JavaScript Developer",
      company: "American Heart Association",
      dates: "2016",
      detail: "React/Node admin dashboard for a Kinect integration",
    },
    {
      role: "Frontend Developer",
      company: "NextBitt",
      dates: "2015 — 2016",
      detail: "Analytics, reporting, auditing, and asset-management tools",
    },
    {
      role: "Java Developer",
      company: "Science4you",
      dates: "2015",
      detail: "Internship · online-store operations system",
    },
  ],
  projects: [
    {
      name: "11io",
      dates: "2025 — Present",
      href: "https://rj11.io",
      url: "rj11.io",
      description: "Independent B2B product-engineering practice.",
    },
    {
      name: "11ai",
      dates: "2026 — Present",
      href: "https://ai.rj11.io",
      url: "ai.rj11.io",
      description: "Open-source AI skills, plugins, and workflows.",
    },
    {
      name: "11bench",
      dates: "2026 — Present",
      href: "https://bench.rj11.io",
      url: "bench.rj11.io",
      description: "Open-source AI benchmarks.",
    },
  ],
  education: {
    program: "IT Systems Management and Programming",
    credential: "Técnico de Gestão e Programação de Sistemas Informáticos",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    dates: "2013 — 2016",
  },
  origin:
    "Started programming through game and console modding. Later placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
} as const
