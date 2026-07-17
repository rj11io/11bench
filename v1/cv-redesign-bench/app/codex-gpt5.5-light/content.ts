export const cv = {
  name: "Ricardo Jorge",
  role: "AI Product Engineer",
  location: "Lisbon, Portugal",
  contacts: [
    { label: "ricardojorgexyz@gmail.com", href: "mailto:ricardojorgexyz@gmail.com" },
    { label: "rj11.io", href: "https://rj11.io" },
    { label: "github.com/rj11io", href: "https://github.com/rj11io" },
    { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
  ],
  summary: [
    "Senior AI product and frontend engineer with a decade of professional TypeScript experience, React work since 2016, and Next.js work since 2018.",
    "Often the first frontend hire: owning architecture, tooling, design systems, component libraries, CI/CD, and onboarding before growing teams around the work.",
    "Strongest domain depth in cybersecurity, crypto, gaming, dashboards, proprietary data explorers, and AI-assisted product systems.",
  ],
  strengths: [
    "AI product engineering",
    "Frontend architecture",
    "Data visualisation",
    "Design systems",
    "Agent harnesses",
    "Team leadership",
  ],
  skills: [
    {
      label: "Core",
      items: ["TypeScript", "React.js", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
    },
    {
      label: "AI engineering",
      items: ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"],
    },
    {
      label: "UI and data",
      items: ["Tailwind CSS", "shadcn/ui", "Material-UI", "Design systems", "Storybook", "d3", "Recharts", "Nivo"],
    },
    {
      label: "Delivery",
      items: ["Team management", "Project management", "Product design", "Agile methodologies", "CI/CD", "Testing"],
    },
  ],
  projects: [
    { name: "11io", url: "https://rj11.io", label: "rj11.io", description: "Personal brand for B2B freelancing." },
    { name: "11ai", url: "https://ai.rj11.io", label: "ai.rj11.io", description: "Open source AI skills, plugins, and workflows." },
    { name: "11bench", url: "https://bench.rj11.io", label: "bench.rj11.io", description: "Open source AI benchmarks." },
  ],
  experience: [
    {
      title: "AI Product Engineer",
      company: "rj11io",
      url: "https://rj11.io",
      meta: "B2B · Remote",
      dates: "Mar 2025 - Present",
      bullets: [
        "Hands-on AI product engineering for multiple early-stage startups, building products from the ground up.",
        "Delivered AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, real estate work, AI chats, and custom GPT experiences.",
        "Built cybersecurity dashboards, proprietary data explorers, AI smart-scraping agents, n8n workflows, agent harnesses, skills, and automations.",
      ],
    },
    {
      title: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      url: "https://hunt.io",
      meta: "B2B · Remote",
      dates: "Apr 2024 - Mar 2025",
      bullets: [
        "Focused on data visualisation for a threat-intelligence product, including custom components such as the IP History Widget.",
        "Built core product modules AttackCapture and HuntSQL on a modern TypeScript stack with Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Shipped an OpenAPI-based documentation platform with enriched metadata and a product UI intended to be friendlier than Swagger.",
      ],
    },
    {
      title: "Senior Frontend Engineer -> Team Lead",
      company: "OMEGA Systems",
      url: "https://omegasys.eu",
      meta: "Remote",
      dates: "Jun 2023 - Apr 2024",
      bullets: [
        "Built the next generation of OMEGA's iGaming platform management system, CORE5, with TypeScript and React; promoted to lead the frontend team.",
        "Created data visualisation and configuration surfaces for Main, Social, Cashback, Refer-a-Friend, Pending Withdrawals, Challenges, and Leaderboards.",
        "Led onboarding, ticket standards, documentation, remote workflows, Definition of Done practices, and weekly technical talks while continuing to ship product features.",
      ],
    },
    {
      title: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      url: "https://phantasma.info",
      meta: "Remote",
      dates: "Jan 2022 - May 2023",
      bullets: [
        "Built the frontend monorepo for new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
        "Added Playwright tests, GitHub Actions CI, Vercel CD, localisation, white-label theming, environment configuration, and in-house SDK helpers.",
        "Contributed improvements to the Phantasma TypeScript SDK.",
      ],
    },
    {
      title: "Frontend Lead",
      company: "BinaryEdge · Coalition, Inc.",
      url: "https://coalitioninc.com",
      meta: "Remote",
      dates: "Feb 2020 - Oct 2021",
      bullets: [
        "Started as a solo frontend engineer and grew a team for customer-facing security apps and internal tools.",
        "Introduced React, TypeScript, Material-UI, Nivo, Next.js, and micro frontends; led Coalition Explorer, Coalition Storybook, Customer Security Web UI, and data visualisations.",
        "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions.",
      ],
    },
  ],
  earlier: [
    "Co-founded Glaiveware, building bespoke web apps and learning project/business management (Mar 2018 - Dec 2019).",
    "Built a React Native encrypted chat app for Sycret.ink (Jan 2017 - Dec 2017).",
    "Built a React/Node dashboard for the American Heart Association (Sep 2016 - Nov 2016).",
    "Created analytics dashboards at NextBitt (Oct 2015 - Jul 2016); Java/MySQL internship at Science4you (Jan 2015 - Mar 2015).",
  ],
  education: {
    title: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    location: "Lisbon, Portugal",
    dates: "2013 - 2016",
    credential: "Técnico de Gestão e Programação de Sistemas Informáticos",
  },
  additional: [
    "Started coding by modding and reverse-engineering games and consoles; built a MUGEN fighting game and ran dedicated game servers.",
    "Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
  ],
} as const
