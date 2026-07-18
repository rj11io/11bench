export type LinkItem = {
  label: string
  href: string
}

export type ExperienceItem = {
  role: string
  company: string
  companyUrl?: string
  period: string
  context?: string
  bullets: readonly string[]
}

export const cvContent = {
  identity: {
    name: "Ricardo Jorge",
    shortName: "RJ",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    contacts: [
      {
        label: "ricardojorgexyz@gmail.com",
        href: "mailto:ricardojorgexyz@gmail.com",
      },
      { label: "rj11.io", href: "https://www.rj11.io/" },
      { label: "github.com/rj11io", href: "https://github.com/rj11io" },
      {
        label: "linkedin.com/in/rj11io",
        href: "https://www.linkedin.com/in/rj11io",
      },
      { label: "cv.rj11.io", href: "https://cv.rj11.io/" },
    ] satisfies readonly LinkItem[],
  },
  profile: [
    "AI product engineer with a frontend foundation, working professionally since 2015 and building with React since 2016 and Next.js since 2018.",
    "Often the first frontend hire: owns architecture, tooling, design systems, and delivery, then helps grow the team through hiring, onboarding, and engineering playbooks.",
    "Specialises in AI products, agent systems, dashboards, and proprietary data explorers across cybersecurity, crypto, gaming, and early-stage startups.",
  ],
  signals: [
    { value: "2015", label: "Professional start" },
    { value: "2016", label: "Building with React" },
    { value: "2018", label: "Building with Next.js" },
    { value: "0 → 1", label: "Product and team foundations" },
  ],
  experience: {
    recent: [
      {
        role: "AI Product Engineer",
        company: "rj11io",
        companyUrl: "https://www.rj11.io/",
        period: "Mar 2025 – Present",
        context: "B2B · Remote",
        bullets: [
          "Build AI products end to end for multiple early-stage startups, taking projects from the ground up.",
          "Product work spans PDF data extraction, SEO analytics, a GenAI dermatopathology portal, cybersecurity dashboards, proprietary data explorers, and AI chat / GPT experiences.",
          "Design agent harnesses, custom skills, automations, smart-scraping agents, and n8n workflows.",
        ],
      },
      {
        role: "Product / Datavis Engineer",
        company: "Hunt Intelligence, Inc.",
        companyUrl: "https://hunt.io/",
        period: "Apr 2024 – Mar 2025",
        context: "B2B · Remote",
        bullets: [
          "Specialised in data visualisation for threat intelligence, including custom components such as the IP History Widget.",
          "Built AttackCapture™ and HuntSQL™ on a TypeScript / Next.js codebase with shadcn/ui, Playwright, Vercel, and GitHub Actions CI/CD.",
          "Created an OpenAPI-based documentation platform, enriching raw schema metadata and shipping a UI designed to be more intuitive than Swagger.",
        ],
      },
      {
        role: "Senior Frontend Engineer → Team Lead",
        company: "OMEGA Systems",
        companyUrl: "https://www.omegasys.eu/",
        period: "Jun 2023 – Apr 2024",
        context: "Remote",
        bullets: [
          "Joined to build CORE5, OMEGA’s next-generation iGaming platform management system, and was promoted to lead the frontend team.",
          "Delivered dashboards, reports, configuration views, localisation / internationalisation, and an internal Tab System UI.",
          "Built the developer onboarding experience and set standards for tickets, documentation, async workflows, and the Definition of Done.",
        ],
      },
    ] satisfies readonly ExperienceItem[],
    continued: [
      {
        role: "Senior Frontend Engineer",
        company: "Phantasma Chain",
        companyUrl: "https://phantasma.info/",
        period: "Jan 2022 – May 2023",
        context: "Remote",
        bullets: [
          "Built the frontend monorepo for new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
          "Implemented Playwright testing, GitHub Actions CI, and Vercel delivery; contributed improvements to the Phantasma TypeScript SDK.",
          "Created shared tooling for SDK integration, localisation, white-label theming, environment configuration, and API / scripts / hooks.",
        ],
      },
      {
        role: "Frontend Lead",
        company: "BinaryEdge / Coalition, Inc.",
        companyUrl: "https://www.coalitioninc.com/",
        period: "Feb 2020 – Oct 2021",
        context: "Remote",
        bullets: [
          "Started as a solo frontend engineer and grew a team focused on customer-facing security products and internal tools.",
          "Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends; served as tech lead for Coalition Explorer, the component library, and data visualisations.",
          "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions.",
        ],
      },
    ] satisfies readonly ExperienceItem[],
    earlier: [
      {
        role: "Fullstack Engineer, Co-Founder",
        company: "Glaiveware",
        period: "Mar 2018 – Dec 2019",
        summary:
          "Co-founded a studio delivering bespoke web apps across React, Next.js, Node.js, AWS infrastructure, project management, design, and marketing.",
      },
      {
        role: "React Native Developer",
        company: "Sycret.ink",
        period: "Jan 2017 – Dec 2017",
        summary:
          "Built an end-to-end encrypted React Native chat app under contract in a three-person team.",
      },
      {
        role: "Full Stack JavaScript Developer",
        company: "American Heart Association",
        period: "Sep 2016 – Nov 2016",
        summary:
          "Built a React / Node admin dashboard for Kinect data, doctor-patient workflows, reports, and system administration.",
      },
      {
        role: "Frontend Developer",
        company: "NextBitt",
        period: "Oct 2015 – Jul 2016",
        summary:
          "Created analytics, reporting, auditing, and management dashboards for asset and facilities management software.",
      },
      {
        role: "Java Developer",
        company: "Science4you",
        period: "Jan 2015 – Mar 2015",
        summary:
          "Internship; expanded a Java / MySQL back-office tool into an order-management, reporting, and customer-email application.",
      },
    ],
  },
  projects: [
    {
      name: "11io",
      urlLabel: "rj11.io",
      url: "https://www.rj11.io/",
      period: "2025 – Present",
      description: "Personal brand for B2B freelancing.",
    },
    {
      name: "11ai",
      urlLabel: "ai.rj11.io",
      url: "https://ai.rj11.io/",
      period: "2026 – Present",
      description: "Open-source AI skills, plugins, and workflows.",
    },
    {
      name: "11bench",
      urlLabel: "bench.rj11.io",
      url: "https://bench.rj11.io/",
      period: "2026 – Present",
      description: "Open-source AI benchmarks.",
    },
  ],
  skills: [
    {
      label: "Core engineering",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "JavaScript",
        "Node.js",
        "Convex",
        "REST APIs",
      ],
    },
    {
      label: "AI product",
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
      label: "UI and data",
      items: [
        "Tailwind CSS",
        "shadcn/ui",
        "Design systems",
        "Storybook",
        "Dashboards",
        "d3",
        "Recharts",
        "Nivo",
      ],
    },
    {
      label: "Delivery and leadership",
      items: [
        "Playwright",
        "GitHub Actions",
        "CI/CD",
        "Vercel",
        "Team and project management",
        "Product design",
      ],
    },
  ],
  education: {
    programme: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    period: "2013 – 2016",
    credential:
      "Técnico de Gestão e Programação de Sistemas Informáticos",
  },
  distinction:
    "Second nationally and final four at the 2008 robotics world cup in China, programming LEGO Mindstorms.",
} as const

