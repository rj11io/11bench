export type Link = {
  label: string
  href: string
}

export type Experience = {
  role: string
  organisation: string
  organisationHref?: string
  period: string
  context: string
  bullets: readonly string[]
}

export const cv = {
  identity: {
    name: "Ricardo Jorge",
    role: "AI Product Engineer",
    location: "Lisbon, Portugal",
    availability: "B2B · Remote",
  },
  contacts: [
    {
      label: "ricardojorgexyz@gmail.com",
      href: "mailto:ricardojorgexyz@gmail.com",
    },
    { label: "rj11.io", href: "https://www.rj11.io/" },
    { label: "cv.rj11.io", href: "https://cv.rj11.io/" },
    { label: "GitHub", href: "https://github.com/rj11io" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rj11io" },
  ] satisfies readonly Link[],
  summary:
    "AI Product Engineer with 10+ years building TypeScript products, including React since 2016 and Next.js since 2018. Often the first frontend hire, taking products from architecture and tooling through design systems, delivery pipelines, hiring, and onboarding. Specialises in data-heavy interfaces across cybersecurity, crypto, and gaming; now applies that product-engineering foundation to AI extraction, analytics, agent harnesses, skills, and automations.",
  signals: [
    {
      value: "10+ years",
      label: "Professional product engineering",
    },
    { value: "React", label: "Building since 2016" },
    { value: "Next.js", label: "Building since 2018" },
    { value: "First FE hire", label: "Architecture to team" },
  ],
  focus: [
    {
      title: "AI product systems",
      body: "PDF extraction, SEO analytics, GenAI portals, chat/GPT experiences, agent harnesses, reusable skills, smart-scraping agents, and n8n workflows.",
    },
    {
      title: "Data-rich interfaces",
      body: "Threat-intelligence products, proprietary data explorers, dashboards, and custom visualisations across cybersecurity, crypto, and gaming.",
    },
    {
      title: "Frontend platforms",
      body: "TypeScript, React, and Next.js architecture; design systems; Playwright testing; CI/CD; and Vercel delivery.",
    },
    {
      title: "Team enablement",
      body: "Hiring, interviewing, onboarding, documentation, technical standards, and remote/async delivery practices.",
    },
  ],
  skills: [
    {
      title: "AI & agents",
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
      title: "Product frontend",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Convex",
        "Tailwind CSS",
        "shadcn/ui",
        "Design systems",
        "Storybook",
      ],
    },
    {
      title: "Data & UI",
      items: [
        "Dashboards",
        "Data visualisation",
        "d3",
        "Recharts",
        "Nivo",
        "Web scraping",
        "Data enrichment",
      ],
    },
    {
      title: "Quality & delivery",
      items: [
        "Playwright",
        "GitHub Actions",
        "Vercel",
        "CI/CD",
        "End-to-end product engineering",
        "Product design",
        "Team & project management",
      ],
    },
  ],
  projects: [
    {
      name: "11io",
      href: "https://www.rj11.io/",
      period: "2025–Present",
      description: "Personal brand for B2B freelancing",
    },
    {
      name: "11ai",
      href: "https://ai.rj11.io/",
      period: "2026–Present",
      description: "Open-source AI skills, plugins, and workflows",
    },
    {
      name: "11bench",
      href: "https://bench.rj11.io/",
      period: "2026–Present",
      description: "Open-source AI benchmarks",
    },
  ],
  experience: [
    {
      role: "AI Product Engineer",
      organisation: "rj11io",
      organisationHref: "https://www.rj11.io/",
      period: "Mar 2025–Present",
      context: "B2B · Remote",
      bullets: [
        "Build early-stage products end to end across PDF data extraction, AI SEO analytics, GenAI dermatopathology, real estate, cybersecurity dashboards, proprietary data explorers, and AI chat/GPT experiences.",
        "Design agent harnesses, reusable skills, smart-scraping agents, n8n workflows, and automations for multiple startup teams.",
      ],
    },
    {
      role: "Product / Datavis Engineer",
      organisation: "Hunt Intelligence, Inc.",
      organisationHref: "https://hunt.io/",
      period: "Apr 2024–Mar 2025",
      context: "B2B · Remote",
      bullets: [
        "Owned product and data-visualisation engineering for a threat-intelligence product, including the IP History Widget, AttackCapture™, and HuntSQL™.",
        "Established a modern TypeScript delivery stack with Next.js, shadcn/ui, Vercel environments, Playwright E2E tests, GitHub Actions CI/CD, and automated release changelogs.",
        "Turned OpenAPI source data into a metadata-enriched documentation UI designed to be friendlier and more intuitive than Swagger.",
      ],
    },
    {
      role: "Senior Frontend Engineer → Team Lead",
      organisation: "OMEGA Systems",
      organisationHref: "https://www.omegasys.eu/",
      period: "Jun 2023–Apr 2024",
      context: "Remote",
      bullets: [
        "Built CORE5, the next generation of OMEGA’s iGaming platform management system, then earned promotion to lead the frontend team.",
        "Shipped Main and Social dashboards, report/configuration flows, localisation, and an internal tab-system UI.",
        "Created developer onboarding and standards for tickets, documentation, Definition of Done, and remote/async work; ran weekly technology and product talks while continuing to ship features end to end.",
      ],
    },
    {
      role: "Senior Frontend Engineer",
      organisation: "Phantasma Chain",
      organisationHref: "https://phantasma.info/",
      period: "Jan 2022–May 2023",
      context: "Remote",
      bullets: [
        "Built the frontend monorepo, Phantasma UI Storybook, and Phantasma Explorer; contributed improvements to the TypeScript SDK.",
        "Added Playwright tests, GitHub Actions CI, Vercel delivery, white-label theming, localisation, environment tooling, and custom SDK hooks/modules.",
      ],
    },
    {
      role: "Frontend Lead",
      organisation: "BinaryEdge · Coalition, Inc.",
      organisationHref: "https://www.coalitioninc.com/",
      period: "Feb 2020–Oct 2021",
      context: "Remote",
      bullets: [
        "Joined as the solo frontend engineer and grew a team for customer-facing security products and internal tools; introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends.",
        "Tech led Coalition Explorer, the component library, and data visualisations; built Attack Surface Monitoring, later integrated into Coalition Explorer and Coalition Control.",
        "Led the frontend CI/CD migration from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
      ],
    },
  ] satisfies readonly Experience[],
  earlierExperience: [
    {
      role: "Fullstack Engineer, Co-Founder",
      organisation: "Glaiveware",
      period: "Mar 2018–Dec 2019",
      context: "Lisbon · Remote",
      body: "Co-founded a studio building bespoke web apps and learned project management and business operations across engineering, infrastructure, design, SEO/SEM, and content.",
    },
    {
      role: "React Native Developer",
      organisation: "Sycret.ink",
      period: "Jan–Dec 2017",
      context: "Neuchâtel · Remote",
      body: "Built a React Native chat app with end-to-end encryption in a serverless environment under contract with a three-person team.",
    },
    {
      role: "Full Stack JavaScript Developer",
      organisation: "American Heart Association",
      period: "Sep–Nov 2016",
      context: "Remote",
      body: "Built a React/Node admin dashboard for a Kinect integration, connecting data, doctors and patients, reports, and superuser workflows through a university scholarship.",
    },
    {
      role: "Frontend Developer",
      organisation: "NextBitt",
      period: "Oct 2015–Jul 2016",
      context: "Lisbon",
      body: "Built analytics dashboards plus reporting, auditing, and management tools for asset and facilities-management software.",
    },
    {
      role: "Java Developer",
      organisation: "Science4you",
      period: "Jan–Mar 2015",
      context: "Lisbon",
      body: "Internship: grew a Java/MySQL back-office display-and-print tool into an order-management application with reports and automated customer emails.",
    },
  ],
  education: {
    qualification: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    period: "2013–2016",
  },
  origins: [
    "Started coding through game and console modding, a MUGEN fighting game, and dedicated game servers.",
    "Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
  ],
} as const
