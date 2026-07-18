export type ContactLink = {
  href: string
  label: string
  printLabel: string
}

export type FocusArea = {
  title: string
  body: string
}

export type Signal = {
  label: string
  value: string
}

export type ExperienceItem = {
  id: string
  role: string
  company: string
  companyUrl?: string
  dates: string
  context?: string[]
  bullets: string[]
}

export type ProjectItem = {
  name: string
  href: string
  dates: string
  description: string
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type EarlierRole = {
  role: string
  company: string
  dates: string
  summary: string
}

export const cvContent = {
  identity: {
    name: "Ricardo Jorge",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    strapline:
      "Frontend systems, data-rich products, and agent workflows for startups that need senior hands-on delivery.",
  },
  contacts: [
    {
      href: "mailto:ricardojorgexyz@gmail.com",
      label: "ricardojorgexyz@gmail.com",
      printLabel: "ricardojorgexyz@gmail.com",
    },
    {
      href: "https://www.rj11.io/",
      label: "rj11.io",
      printLabel: "rj11.io",
    },
    {
      href: "https://github.com/rj11io",
      label: "github.com/rj11io",
      printLabel: "github.com/rj11io",
    },
    {
      href: "https://www.linkedin.com/in/rj11io",
      label: "linkedin.com/in/rj11io",
      printLabel: "linkedin.com/in/rj11io",
    },
  ] satisfies ContactLink[],
  summary: [
    "Professional history spans 2015-2026, with React work since 2016 and Next.js work since 2018. Most engagements started with standing up the frontend foundation: architecture, component systems, tooling, CI/CD, and the habits that let a product team ship reliably.",
    "The strongest through-line is data-heavy product engineering. Recent work centers on AI product surfaces, cybersecurity dashboards, proprietary data explorers, and the kinds of visual interfaces that help complex systems feel legible to end users.",
  ],
  signals: [
    {
      value: "2016",
      label: "building production React applications",
    },
    {
      value: "2018",
      label: "shipping in Next.js",
    },
    {
      value: "1st hire",
      label: "on most frontend engagements",
    },
    {
      value: "AI + data",
      label: "current concentration across product work",
    },
  ] satisfies Signal[],
  focusAreas: [
    {
      title: "AI product delivery",
      body: "Hands-on work across PDF extraction, SEO analytics, GenAI portals, AI chats, custom GPT experiences, skills, and automations.",
    },
    {
      title: "Data interface craft",
      body: "Dashboards, proprietary data explorers, and custom visualisation components shaped for cybersecurity, crypto, gaming, and B2B products.",
    },
    {
      title: "Frontend systems",
      body: "TypeScript-first application architecture, design systems, Storybook, test automation, and release pipelines built for real teams, not demos.",
    },
    {
      title: "Team enablement",
      body: "Repeatedly responsible for interviewing, onboarding, playbooks, developer experience, and the operational standards that let new engineers ramp fast.",
    },
  ] satisfies FocusArea[],
  experience: [
    {
      id: "rj11io",
      role: "AI Product Engineer",
      company: "rj11io",
      companyUrl: "https://www.rj11.io/",
      dates: "Mar 2025 - Present",
      context: ["B2B", "Remote"],
      bullets: [
        "Build AI product surfaces for early-stage startups, from PDF extraction and SEO analytics to a GenAI dermatopathology portal and custom GPT experiences.",
        "Deliver cybersecurity dashboards, proprietary data explorers, AI chats, and other data-heavy interfaces from the ground up.",
        "Design agent harnesses, custom skills, and n8n automations while operating as a hands-on independent product engineer.",
      ],
    },
    {
      id: "hunt",
      role: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      companyUrl: "https://hunt.io/",
      dates: "Apr 2024 - Mar 2025",
      context: ["B2B", "Remote"],
      bullets: [
        "Focused on data visualisation for a threat-intelligence product, including custom components such as the IP History Widget.",
        "Built core modules including AttackCapture and HuntSQL in a modern TypeScript stack with Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Shipped an OpenAPI-based documentation experience that was richer and easier to navigate than the previous Swagger output.",
      ],
    },
    {
      id: "omega",
      role: "Senior Frontend Engineer -> Team Lead",
      company: "OMEGA Systems",
      companyUrl: "https://www.omegasys.eu/",
      dates: "Jun 2023 - Apr 2024",
      context: ["Remote"],
      bullets: [
        "Joined to build CORE5, the next-generation iGaming platform management system, then was promoted to lead the frontend team.",
        "Delivered dashboard, reporting, configuration, localisation, and internal UI modules across the main and social product surfaces.",
        "Owned onboarding standards, ticketing and documentation quality, and remote-first delivery habits while continuing to ship new features end to end.",
      ],
    },
    {
      id: "phantasma",
      role: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      companyUrl: "https://phantasma.info/",
      dates: "Jan 2022 - May 2023",
      context: ["Remote"],
      bullets: [
        "Built the frontend monorepo, Phantasma UI Storybook, and Phantasma Explorer for the next wave of tools and apps.",
        "Set up Playwright testing, GitHub Actions CI, Vercel CD, and contributed improvements to the Phantasma TypeScript SDK plus internal hooks and config tooling.",
      ],
    },
    {
      id: "binaryedge",
      role: "Frontend Lead",
      company: "BinaryEdge / Coalition, Inc.",
      companyUrl: "https://www.coalitioninc.com/",
      dates: "Feb 2020 - Oct 2021",
      context: ["Remote"],
      bullets: [
        "Started as the solo frontend engineer and grew into frontend lead for customer-facing security apps and internal tools.",
        "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends across BinaryEdge and Coalition product surfaces.",
        "Led Attack Surface Monitoring, Coalition Explorer, the customer-security component library, and CI/CD improvements as the frontend practice scaled up.",
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: "11io",
      href: "https://www.rj11.io/",
      dates: "2025 - Present",
      description: "Personal brand and freelance presence.",
    },
    {
      name: "11ai",
      href: "https://ai.rj11.io/",
      dates: "2026 - Present",
      description: "Open-source AI skills and workflows.",
    },
    {
      name: "11bench",
      href: "https://bench.rj11.io/",
      dates: "2026 - Present",
      description: "Open-source AI benchmarks.",
    },
    {
      name: "Modern GitHub",
      href: "https://github.com/rj11io",
      dates: "2023 - Present",
      description: "Current home for AI-oriented open-source work.",
    },
    {
      name: "Legacy GitHub",
      href: "https://github.com/ricardojrmcom?tab=repositories",
      dates: "2020 - 2023",
      description: "Archive of earlier open-source code.",
    },
  ] satisfies ProjectItem[],
  skillGroups: [
    {
      label: "Product engineering",
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
      label: "AI and automation",
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
      label: "Leadership",
      items: [
        "Hiring",
        "Interviewing",
        "Onboarding",
        "Project management",
        "Product design",
        "Agile methodologies",
      ],
    },
  ] satisfies SkillGroup[],
  earlierExperience: [
    {
      role: "Fullstack Engineer, Co-Founder",
      company: "Glaiveware",
      dates: "Mar 2018 - Dec 2019",
      summary:
        "Built bespoke web applications with React, Next.js, Node.js, AWS, and client-delivery work spanning product, design, and operations.",
    },
    {
      role: "React Native Developer",
      company: "Sycret.ink",
      dates: "Jan 2017 - Dec 2017",
      summary:
        "Developed a serverless React Native chat app with end-to-end encryption under contract with a three-person team.",
    },
    {
      role: "Full Stack JavaScript Developer",
      company: "American Heart Association",
      dates: "Sep 2016 - Nov 2016",
      summary:
        "Built an admin dashboard in React and Node for the AHA's Kinect integration through a university scholarship.",
    },
    {
      role: "Frontend Developer",
      company: "NextBitt",
      dates: "Oct 2015 - Jul 2016",
      summary:
        "Built analytics dashboards plus reporting, auditing, and management tools for asset and facilities software.",
    },
    {
      role: "Java Developer",
      company: "Science4you",
      dates: "Jan 2015 - Mar 2015",
      summary:
        "Java and MySQL internship building back-office tooling for orders, reports, and automated emails.",
    },
  ] satisfies EarlierRole[],
  education: {
    program: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    dates: "2013 - 2016",
    credential: "Tecnico de Gestao e Programacao de Sistemas Informaticos",
  },
} as const

export const pageOneExperienceIds = [
  "rj11io",
  "hunt",
  "omega",
  "phantasma",
] as const

export const pageTwoExperienceIds = ["binaryedge"] as const
