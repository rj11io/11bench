export type Experience = {
  role: string
  employer: string
  period: string
  url: string
  displayUrl: string
  bullets: string[]
}

export const cv = {
  identity: {
    name: "Ricardo Jorge",
    shortName: "RJ",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    site: { label: "rj11.io", url: "https://rj11.io" },
    github: { label: "github.com/rj11io", url: "https://github.com/rj11io" },
    linkedin: {
      label: "linkedin.com/in/rj11io",
      url: "https://linkedin.com/in/rj11io",
    },
  },
  positioning:
    "Product-minded frontend specialist, now building AI products, agent harnesses, skills, and automations.",
  profile: [
    "AI Product Engineer with a decade of professional TypeScript experience, building with React since 2016 and Next.js since 2018.",
    "Specialises in data-rich product platforms for cybersecurity, crypto, and gaming, spanning architecture, design systems, visualisation, testing, and delivery.",
    "Often the first frontend hire: establishes the product foundation, then grows the team, standards, and onboarding around it.",
  ],
  capabilities: [
    {
      label: "Product engineering",
      items: ["TypeScript", "React", "Next.js", "Product design"],
    },
    {
      label: "AI systems",
      items: ["AI SDK", "Agent harnesses", "Custom skills", "n8n"],
    },
    {
      label: "Data & interface",
      items: ["Dashboards", "d3 / Recharts / Nivo", "Design systems", "Storybook"],
    },
    {
      label: "Delivery",
      items: ["Team leadership", "Playwright", "GitHub Actions", "Vercel"],
    },
  ],
  experience: [
    {
      role: "AI Product Engineer",
      employer: "rj11io",
      period: "Mar 2025—Present",
      url: "https://rj11.io",
      displayUrl: "rj11.io",
      bullets: [
        "Builds early-stage products from the ground up across AI data extraction from PDFs, AI SEO analytics, GenAI dermatopathology, and custom AI chat / GPT experiences.",
        "Delivers cybersecurity dashboards and proprietary data explorers alongside agent harnesses, reusable skills, automations, and n8n workflows.",
        "Works hands-on across multiple startup teams as a B2B product-engineering partner.",
      ],
    },
    {
      role: "Product / Datavis Engineer",
      employer: "Hunt Intelligence, Inc.",
      period: "Apr 2024—Mar 2025",
      url: "https://hunt.io",
      displayUrl: "hunt.io",
      bullets: [
        "Built threat-intelligence visualisation and core product modules including the IP History Widget, AttackCapture™, and HuntSQL™.",
        "Established a modern Next.js and shadcn/ui product codebase with Vercel environments, Playwright end-to-end tests, and GitHub Actions CI/CD.",
        "Turned an OpenAPI specification into an enriched API documentation product designed to be friendlier and more intuitive than Swagger.",
      ],
    },
    {
      role: "Senior Frontend Engineer → Team Lead",
      employer: "OMEGA Systems",
      period: "Jun 2023—Apr 2024",
      url: "https://omegasys.eu",
      displayUrl: "omegasys.eu",
      bullets: [
        "Built CORE5, the next generation of OMEGA’s iGaming platform management system, with TypeScript and React; promoted to lead the frontend team.",
        "Shipped data-rich dashboards, reports, configuration views, localisation / internationalisation, and an internal tab system.",
        "Created developer onboarding and standards for tickets, documentation, definition of done, and remote / async delivery.",
      ],
    },
    {
      role: "Senior Frontend Engineer",
      employer: "Phantasma Chain",
      period: "Jan 2022—May 2023",
      url: "https://phantasma.info",
      displayUrl: "phantasma.info",
      bullets: [
        "Built the frontend monorepo for new tools and apps, designed and developed the Phantasma UI Storybook, and built Phantasma Explorer.",
        "Added Playwright tests, GitHub Actions CI, and Vercel delivery; contributed improvements to the Phantasma TypeScript SDK.",
        "Created shared hooks and modules for the SDK, localisation, white-label theming, environment configuration, and APIs / scripts.",
      ],
    },
    {
      role: "Frontend Lead",
      employer: "BinaryEdge · Coalition, Inc.",
      period: "Feb 2020—Oct 2021",
      url: "https://coalitioninc.com",
      displayUrl: "coalitioninc.com",
      bullets: [
        "Joined as the solo frontend engineer and grew a team for customer security products and internal tools.",
        "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, its component library, and data visualisation.",
        "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions.",
      ],
    },
  ] satisfies Experience[],
  earlier: [
    {
      role: "Fullstack Engineer, Co-Founder",
      employer: "Glaiveware",
      period: "Mar 2018—Dec 2019",
      detail: "Bespoke web apps; project and business management.",
    },
    {
      role: "React Native Developer",
      employer: "Sycret.ink",
      period: "Jan—Dec 2017",
      detail: "End-to-end encrypted serverless mobile chat app.",
    },
    {
      role: "Full Stack JavaScript Developer",
      employer: "American Heart Association",
      period: "Sep—Nov 2016",
      detail: "React / Node admin dashboard for a Kinect integration.",
    },
    {
      role: "Frontend Developer",
      employer: "NextBitt",
      period: "Oct 2015—Jul 2016",
      detail: "Analytics dashboards, reporting, auditing, and management tools.",
    },
    {
      role: "Java Developer",
      employer: "Science4you",
      period: "Jan—Mar 2015",
      detail: "Internship; Java / MySQL online-store management application.",
    },
  ],
  projects: [
    {
      name: "11io",
      url: "https://rj11.io",
      displayUrl: "rj11.io",
      period: "2025—Present",
      description: "Personal brand for B2B freelancing.",
    },
    {
      name: "11ai",
      url: "https://ai.rj11.io",
      displayUrl: "ai.rj11.io",
      period: "2026—Present",
      description: "Open-source AI skills, plugins, and workflows.",
    },
    {
      name: "11bench",
      url: "https://bench.rj11.io",
      displayUrl: "bench.rj11.io",
      period: "2026—Present",
      description: "Open-source AI benchmarks.",
    },
  ],
  education: {
    programme: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    period: "2013—2016",
  },
  personalSignal:
    "Started by modding and reverse-engineering games; later placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
} as const
