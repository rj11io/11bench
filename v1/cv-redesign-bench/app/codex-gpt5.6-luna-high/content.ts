export type ResumeRole = {
  title: string
  company: string
  companyUrl?: string
  location?: string
  dates: string
  bullets: string[]
}

export type ResumeLink = {
  label: string
  href: string
  display: string
}

export const resume = {
  name: "Ricardo Jorge",
  shortName: "RJ",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  links: [
    { label: "Website", href: "https://rj11.io", display: "rj11.io" },
    {
      label: "GitHub",
      href: "https://github.com/rj11io",
      display: "github.com/rj11io",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/rj11io",
      display: "linkedin.com/in/rj11io",
    },
    { label: "CV site", href: "https://cv.rj11.io", display: "cv.rj11.io" },
  ] satisfies ResumeLink[],
  summary: [
    "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018.",
    "I build data-heavy products from first architecture to shipped experience: dashboards, proprietary explorers, AI chats, agent harnesses, skills, and automations. Often the first frontend hire, I have owned tooling, component libraries, delivery pipelines, hiring, onboarding, and the playbooks that help teams move quickly.",
  ],
  highlights: [
    { value: "10+", label: "years professional TypeScript" },
    { value: "2016", label: "React in production" },
    { value: "2018", label: "Next.js in production" },
    { value: "AI", label: "products, agents, automations" },
  ],
  skills: [
    {
      label: "Core stack",
      items: ["TypeScript", "React.js", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
    },
    {
      label: "AI engineering",
      items: ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"],
    },
    {
      label: "UI & data",
      items: ["Tailwind CSS", "shadcn/ui", "Design systems", "Storybook", "Dashboards", "Data visualisation (d3, Recharts, Nivo)"],
    },
    {
      label: "Leadership & delivery",
      items: ["Team & project management", "End-to-end product engineering", "Product design", "Agile methodologies"],
    },
    {
      label: "Foundations",
      items: ["JavaScript", "Node.js", "HTML5", "CSS", "Git", "GitHub Actions", "REST APIs", "CI/CD", "Testing"],
    },
  ],
  roles: [
    {
      title: "AI Product Engineer",
      company: "rj11io",
      companyUrl: "https://rj11.io",
      location: "B2B · Remote",
      dates: "Mar 2025 - Present",
      bullets: [
        "Build AI products from the ground up for multiple early-stage startups, across data extraction, SEO analytics, dermatopathology, real estate, cybersecurity, and proprietary data exploration.",
        "Design AI chats and custom GPT experiences, smart scraping agents, n8n workflows, and agent harnesses, skills, and automations.",
      ],
    },
    {
      title: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      companyUrl: "https://hunt.io",
      location: "B2B · Remote",
      dates: "Apr 2024 - Mar 2025",
      bullets: [
        "Built core threat-intelligence modules AttackCapture™ and HuntSQL™ on a TypeScript / Next.js product stack with shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Created custom data-visualisation components, including the IP History Widget, and an OpenAPI-based documentation platform designed to be more intuitive than Swagger.",
      ],
    },
    {
      title: "Senior Frontend Engineer to Team Lead",
      company: "OMEGA Systems",
      companyUrl: "https://omegasys.eu",
      location: "Remote",
      dates: "Jun 2023 - Apr 2024",
      bullets: [
        "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React; promoted to lead the frontend team.",
        "Shipped dashboard visualisations, report and configuration views, localisation / internationalisation, and an internal Tab System UI.",
        "Built the new-developer onboarding experience and set standards for tickets, documentation, remote / async workflows, and Definition of Done; gave weekly technology and product talks.",
      ],
    },
    {
      title: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      companyUrl: "https://phantasma.info",
      location: "Remote",
      dates: "Jan 2022 - May 2023",
      bullets: [
        "Built the frontend monorepo for new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
        "Established Playwright testing, GitHub Actions CI, and Vercel CD; contributed improvements to the Phantasma TypeScript SDK and in-house localisation, theming, environment, API, and hooks tooling.",
      ],
    },
    {
      title: "Frontend Lead",
      company: "BinaryEdge · Coalition, Inc.",
      companyUrl: "https://coalitioninc.com",
      location: "Remote",
      dates: "Feb 2020 - Oct 2021",
      bullets: [
        "Started as a solo frontend engineer and grew a team for customer-facing security applications and internal tools; introduced React, TypeScript, Next.js, micro frontends, and data visualisation to the stack.",
        "Tech lead for Coalition Explorer, its 2.0 evolution, the Customer Security Storybook, and products spanning attack-surface monitoring, claims, report generation, security review, and executive risk.",
        "Migrated frontend CI/CD from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
      ],
    },
    {
      title: "Fullstack Engineer, Co-Founder",
      company: "Glaiveware",
      location: "Lisbon, Portugal · Remote",
      dates: "Mar 2018 - Dec 2019",
      bullets: [
        "Built bespoke web apps with React, Redux, Next.js, Node.js, Express, Material-UI, MongoDB, Firebase, MySQL, SQLite, and AWS while managing projects and the business.",
        "Also covered SEO / SEM, branding and design, marketing, copywriting, and content management.",
      ],
    },
    {
      title: "React Native Developer",
      company: "Sycret.ink",
      location: "Neuchâtel, Switzerland · Remote",
      dates: "Jan 2017 - Dec 2017",
      bullets: [
        "Built a serverless mobile chat app with end-to-end encryption under contract with a team of three; worked with React Native, libsignal-protocol, Android Studio, AWS, and SQLite.",
      ],
    },
    {
      title: "Full Stack JavaScript Developer",
      company: "American Heart Association",
      location: "Remote",
      dates: "Sep 2016 - Nov 2016",
      bullets: [
        "Built a React and Node admin dashboard for a Kinect integration: connecting users, doctors, and patients; printing reports; and managing the system for superusers.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "NextBitt",
      location: "Lisbon, Portugal",
      dates: "Oct 2015 - Jul 2016",
      bullets: [
        "Created analytics dashboards plus reporting, auditing, and management tools for asset and facilities management software, with heavy date / time logic and data visualisation.",
      ],
    },
    {
      title: "Java Developer",
      company: "Science4you",
      location: "Lisbon, Portugal",
      dates: "Jan 2015 - Mar 2015",
      bullets: [
        "Built a Java and MySQL management system for an online store internship, evolving a display-and-print back-office tool into order management, reporting, and automated email workflows.",
      ],
    },
  ] satisfies ResumeRole[],
  projects: [
    { name: "11io", href: "https://rj11.io", note: "Personal brand for B2B freelancing", dates: "2025 - Present" },
    { name: "11ai", href: "https://11aiai.rj11.io", note: "Open source AI skills, plugins, and workflows", dates: "2026 - Present" },
    { name: "11bench", href: "https://11benchbench.rj11.io", note: "Open source AI benchmarks", dates: "2026 - Present" },
    { name: "Modern GitHub", href: "https://github.com/rj11io", note: "Open source projects for the AI era", dates: "2023 - Present" },
    { name: "Legacy GitHub", href: "https://github.com/ricardojrmcom", note: "Open source code produced 2020 - 2023", dates: "2020 - 2023" },
  ],
  education: {
    title: "IT Systems Management and Programming",
    institution: "Escola Profissional de Tecnologia Digital",
    detail: "Técnico de Gestão e Programação de Sistemas Informáticos",
    location: "Lisbon, Portugal",
    dates: "2013 - 2016",
  },
  interests: [
    "Started coding young by modding and reverse-engineering games and consoles; built a fighting game with the MUGEN engine and ran dedicated servers for Counter-Strike and Minecraft.",
    "Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
  ],
} as const

