export type ContactLink = {
  label: string
  display: string
  href: string
}

export type ExperienceRole = {
  title: string
  organization: string
  organizationUrl?: string
  context?: readonly string[]
  dateLabel: string
  startDate: string
  bullets: readonly string[]
  displayDetail?: boolean
}

type SkillGroup = {
  label: string
  items: readonly string[]
}

type Project = {
  name: string
  href: string
  dateLabel: string
  description: string
}

export type CvContent = {
  documentLabel: string
  identity: {
    name: string
    role: string
    location: string
    email: string
    contacts: readonly ContactLink[]
  }
  profile: readonly string[]
  milestones: readonly {
    value: string
    detail: string
  }[]
  sectionLabels: {
    profile: string
    experience: string
    earlierExperience: string
    selectedWork: string
    skills: string
    education: string
  }
  sectionNotes: {
    recentExperience: string
  }
  experience: {
    firstPage: readonly ExperienceRole[]
    secondPage: readonly ExperienceRole[]
  }
  projects: readonly Project[]
  skills: readonly SkillGroup[]
  education: {
    program: string
    school: string
    location: string
    dateLabel: string
    qualification: string
  }
}

/**
 * Structured rendering model derived from content.md. Keep factual changes in
 * content.md first, then update this concise presentation model to match.
 */
export const cvContent: CvContent = {
  documentLabel: "Professional profile",
  identity: {
    name: "Ricardo Jorge",
    role: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    contacts: [
      {
        label: "Portfolio",
        display: "rj11.io",
        href: "https://www.rj11.io/",
      },
      {
        label: "GitHub profile",
        display: "github.com/rj11io",
        href: "https://github.com/rj11io",
      },
      {
        label: "LinkedIn profile",
        display: "linkedin.com/in/rj11io",
        href: "https://www.linkedin.com/in/rj11io",
      },
    ],
  },
  profile: [
    "Professional software engineer since 2015, with a decade of professional TypeScript experience; building with React since 2016 and Next.js since 2018. Builds dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies.",
    "Often the first frontend hire, owning architecture, tooling, component libraries, and pipelines, then scaling teams through hiring, onboarding, and playbooks. AI work spans prompt and context engineering, open-source skills, agent harnesses, and automations.",
  ],
  milestones: [
    { value: "2015", detail: "Professional software engineering" },
    { value: "2016", detail: "Building with React" },
    { value: "2018", detail: "Building with Next.js" },
  ],
  sectionLabels: {
    profile: "Profile",
    experience: "Experience",
    earlierExperience: "Earlier experience",
    selectedWork: "Selected independent work",
    skills: "Technical toolkit",
    education: "Education",
  },
  sectionNotes: {
    recentExperience: "Selected recent roles",
  },
  experience: {
    firstPage: [
      {
        title: "AI Product Engineer",
        organization: "rj11io",
        organizationUrl: "https://www.rj11.io/",
        context: ["B2B", "Remote"],
        dateLabel: "Mar 2025 - Present",
        startDate: "2025-03",
        bullets: [
          "Build AI product foundations for multiple early-stage startups, including PDF data extraction, AI SEO analytics, a GenAI dermatopathology portal, a real-estate platform, and AI chats / custom GPT experiences.",
          "Develop cybersecurity dashboards and proprietary data explorers, plus AI agent harnesses, custom skills, and n8n workflows and automations.",
        ],
      },
      {
        title: "Product / Datavis Engineer",
        organization: "Hunt Intelligence, Inc.",
        organizationUrl: "https://hunt.io",
        context: ["B2B", "Remote"],
        dateLabel: "Apr 2024 - Mar 2025",
        startDate: "2024-04",
        bullets: [
          "Specialized in threat-intelligence data visualization; built the IP History Widget and core product modules AttackCapture™ and HuntSQL™.",
          "Built a TypeScript, Next.js, and shadcn/ui product foundation with Vercel environments, Playwright tests, GitHub Actions CI/CD, and enriched OpenAPI documentation.",
        ],
      },
      {
        title: "Senior Frontend Engineer -> Team Lead",
        organization: "OMEGA Systems",
        organizationUrl: "https://omegasys.eu",
        context: ["Remote"],
        dateLabel: "Jun 2023 - Apr 2024",
        startDate: "2023-06",
        bullets: [
          "Built the next generation of the CORE5 iGaming platform management system in TypeScript and React; promoted to lead the frontend team.",
          "Delivered dashboard and report visualization while setting onboarding, documentation, ticket, and remote / async workflow standards.",
        ],
      },
      {
        title: "Senior Frontend Engineer",
        organization: "Phantasma Chain",
        organizationUrl: "https://phantasma.info",
        context: ["Remote"],
        dateLabel: "Jan 2022 - May 2023",
        startDate: "2022-01",
        bullets: [
          "Built the frontend monorepo, Phantasma Explorer, and the Phantasma UI Storybook; contributed to the TypeScript SDK and shared tooling.",
          "Used Playwright testing, GitHub Actions CI, and Vercel CD across new tools and applications.",
        ],
      },
    ],
    secondPage: [
      {
        title: "Frontend Lead",
        organization: "BinaryEdge · Coalition, Inc.",
        organizationUrl: "https://coalitioninc.com",
        context: ["Remote"],
        dateLabel: "Feb 2020 - Oct 2021",
        startDate: "2020-02",
        bullets: [
          "Started as a solo frontend engineer and grew a team focused on customer-facing security applications and internal tools; introduced React, TypeScript, Next.js, and micro frontends.",
          "Led Attack Surface Monitoring, Coalition Explorer, component-library, and data-visualization work; migrated frontend CI/CD to GitHub Actions.",
        ],
      },
      {
        title: "Fullstack Engineer, Co-Founder",
        organization: "Glaiveware",
        context: ["Lisbon, Portugal", "Remote"],
        dateLabel: "Mar 2018 - Dec 2019",
        startDate: "2018-03",
        bullets: [
          "Co-founded a bespoke web-app business and delivered end-to-end work across React, Next.js, Node.js, AWS, and product / brand work.",
        ],
      },
      {
        title: "React Native Developer",
        organization: "Sycret.ink",
        context: ["Neuchâtel, Switzerland", "Remote"],
        dateLabel: "Jan 2017 - Dec 2017",
        startDate: "2017-01",
        displayDetail: false,
        bullets: [
          "Contract role on a three-person team building an end-to-end encrypted, serverless mobile chat app.",
        ],
      },
      {
        title: "Full Stack JavaScript Developer",
        organization: "American Heart Association",
        context: ["Remote"],
        dateLabel: "Sep 2016 - Nov 2016",
        startDate: "2016-09",
        displayDetail: false,
        bullets: [
          "Built a React and Node admin dashboard for its Kinect integration, covering data, doctor / patient connection, reports, and superuser management.",
        ],
      },
      {
        title: "Frontend Developer",
        organization: "NextBitt",
        context: ["Lisbon, Portugal"],
        dateLabel: "Oct 2015 - Jul 2016",
        startDate: "2015-10",
        displayDetail: false,
        bullets: [
          "Created analytics dashboards and reporting, auditing, and management tools for asset and facilities-management software.",
        ],
      },
      {
        title: "Java Developer",
        organization: "Science4you",
        context: ["Lisbon, Portugal", "Internship"],
        dateLabel: "Jan 2015 - Mar 2015",
        startDate: "2015-01",
        displayDetail: false,
        bullets: [
          "Built a Java and MySQL online-store management system for orders, reports, and automated customer emails.",
        ],
      },
    ],
  },
  projects: [
    {
      name: "11io",
      href: "https://www.rj11.io/",
      dateLabel: "2025 - Present",
      description: "Personal brand for B2B freelancing",
    },
    {
      name: "11ai",
      href: "https://ai.rj11.io/",
      dateLabel: "2026 - Present",
      description: "Open-source AI skills, plugins, and workflows",
    },
    {
      name: "11bench",
      href: "https://bench.rj11.io/",
      dateLabel: "2026 - Present",
      description: "Open-source AI benchmarks",
    },
  ],
  skills: [
    {
      label: "Core stack",
      items: ["TypeScript", "React", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
    },
    {
      label: "AI engineering",
      items: ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"],
    },
    {
      label: "UI & data",
      items: ["Tailwind CSS", "shadcn/ui", "Design systems", "Storybook", "Dashboards", "Data visualization (d3, Recharts, Nivo)"],
    },
    {
      label: "Delivery",
      items: ["Team & project management", "End-to-end product engineering", "Product design", "Agile methodologies"],
    },
  ],
  education: {
    program: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    dateLabel: "2013 - 2016",
    qualification: "Técnico de Gestão e Programação de Sistemas Informáticos",
  },
}
