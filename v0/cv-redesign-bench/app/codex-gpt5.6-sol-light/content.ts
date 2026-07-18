export type Link = { label: string; href: string }
export type Role = {
  title: string
  company: string
  companyUrl?: string
  dates: string
  context: string
  bullets: string[]
}

export const cv = {
  name: "Ricardo Jorge",
  shortName: "RJ",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  headline:
    "Building data-rich products, frontend foundations, and agent systems.",
  profile:
    "AI Product Engineer with a decade of professional TypeScript experience, working with React since 2016 and Next.js since 2018. I build data-rich products and AI systems from first architecture through delivery, then create the tooling, standards, and onboarding that help teams scale them.",
  contact: [
    { label: "ricardojorgexyz@gmail.com", href: "mailto:ricardojorgexyz@gmail.com" },
    { label: "rj11.io", href: "https://rj11.io" },
    { label: "GitHub", href: "https://github.com/rj11io" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rj11io" },
  ] satisfies Link[],
  capabilities: [
    {
      label: "Product engineering",
      value: "TypeScript · React · Next.js · Product design · Playwright · Vercel · CI/CD",
    },
    {
      label: "AI systems",
      value: "AI SDK · Agent harnesses · Custom skills · Automations · Codex · Claude Code · n8n",
    },
    {
      label: "Data interfaces",
      value: "Dashboards · Data visualisation · d3 · Recharts · Nivo · Design systems · Storybook",
    },
    {
      label: "Technical leadership",
      value: "Frontend architecture · Hiring · Onboarding · Team & project management · Remote/async delivery",
    },
  ],
  pageOneRoles: [
    {
      title: "AI Product Engineer",
      company: "rj11io",
      companyUrl: "https://rj11.io",
      dates: "Mar 2025 — Present",
      context: "B2B · Remote",
      bullets: [
        "Hands-on product engineering for multiple early-stage startups, taking new products from first architecture to working software.",
        "Delivered AI-assisted PDF extraction, SEO analytics, a GenAI dermatopathology portal, AI chat/GPT experiences, and smart-scraping workflows.",
        "Built cybersecurity dashboards, proprietary data explorers, and agent harnesses, skills, and automations.",
      ],
    },
    {
      title: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      companyUrl: "https://hunt.io",
      dates: "Apr 2024 — Mar 2025",
      context: "B2B · Remote",
      bullets: [
        "Specialised in data visualisation for a threat-intelligence product, including the custom IP History Widget.",
        "Built core modules AttackCapture™ and HuntSQL™ in a TypeScript/Next.js codebase with shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Created an OpenAPI documentation product by enriching the raw specification with metadata and a more approachable interface than Swagger.",
      ],
    },
    {
      title: "Senior Frontend Engineer → Team Lead",
      company: "OMEGA Systems",
      companyUrl: "https://omegasys.eu",
      dates: "Jun 2023 — Apr 2024",
      context: "Remote",
      bullets: [
        "Built CORE5, the next generation of OMEGA’s iGaming platform management system, with TypeScript and React; promoted to lead the frontend team.",
        "Shipped visualisation-heavy dashboards, reporting, and configuration workflows, plus localisation and an internal tab system.",
        "Defined onboarding, ticket and documentation standards, Definition of Done, and remote/async working practices.",
      ],
    },
  ] satisfies Role[],
  pageTwoRoles: [
    {
      title: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      companyUrl: "https://phantasma.info",
      dates: "Jan 2022 — May 2023",
      context: "Remote",
      bullets: [
        "Established the frontend monorepo for new tools and apps; designed and built Phantasma UI Storybook and Phantasma Explorer.",
        "Added Playwright tests, GitHub Actions CI, and Vercel delivery; contributed improvements to the Phantasma TypeScript SDK.",
      ],
    },
    {
      title: "Frontend Lead",
      company: "BinaryEdge / Coalition, Inc.",
      companyUrl: "https://coalitioninc.com",
      dates: "Feb 2020 — Oct 2021",
      context: "Remote",
      bullets: [
        "Joined as the solo frontend engineer and grew a team for customer-facing security products and internal tools.",
        "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, its component library, and data visualisations.",
        "Built Attack Surface Monitoring for the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.",
      ],
    },
  ] satisfies Role[],
  earlier: [
    ["2018—19", "Glaiveware", "Fullstack Engineer & Co-Founder — bespoke web applications; business and project management."],
    ["2017", "Sycret.ink", "React Native Developer — end-to-end encrypted, serverless chat app."],
    ["2016", "American Heart Association", "Full Stack JavaScript Developer — admin dashboard for a Kinect integration."],
    ["2015—16", "NextBitt", "Frontend Developer — analytics dashboards and reporting, auditing, and management tools."],
  ],
  projects: [
    { name: "11io", url: "https://rj11.io", label: "rj11.io", dates: "2025—Now", description: "B2B product engineering" },
    { name: "11ai", url: "https://ai.rj11.io", label: "ai.rj11.io", dates: "2026—Now", description: "Open-source AI skills, plugins & workflows" },
    { name: "11bench", url: "https://bench.rj11.io", label: "bench.rj11.io", dates: "2026—Now", description: "Open-source AI benchmarks" },
  ],
  education: {
    course: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    dates: "2013 — 2016",
  },
  personalSignal:
    "Started by modding and reverse-engineering games; later placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
}

