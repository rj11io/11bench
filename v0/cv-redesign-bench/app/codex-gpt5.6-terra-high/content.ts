/**
 * Canonical render model, derived from content.md in this run folder.
 * Source notes in content.md distinguish evidence from editorial rewrites.
 */
export const cv = {
  identity: {
    name: "Ricardo Jorge",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    website: "rj11.io",
    github: "github.com/rj11io",
    linkedin: "linkedin.com/in/rj11io",
    cv: "cv.rj11.io",
  },
  intro:
    "AI Product Engineer with a decade of professional TypeScript experience, building with React since 2016 and Next.js since 2018. I create data-rich product platforms, dashboards, and proprietary explorers - and lead the architecture, component systems, tooling, and delivery practices that make them durable.",
  focus: [
    "AI product engineering",
    "Data visualisation",
    "Frontend architecture",
    "Design systems & delivery",
  ],
  skills: [
    { label: "Core", items: "TypeScript · React · Next.js · AI SDK · Convex · Playwright · Vercel" },
    { label: "AI", items: "Agent automations · Custom agent skills · Harness engineering · Codex · Claude Code · n8n" },
    { label: "UI & data", items: "Tailwind CSS · shadcn/ui · Design systems · Storybook · Dashboards · d3 · Recharts · Nivo" },
    { label: "Leadership", items: "Team & project management · End-to-end product engineering · Product design · Agile delivery" },
  ],
  roles: [
    {
      title: "AI Product Engineer",
      company: "rj11io",
      url: "rj11.io",
      date: "Mar 2025 - Present",
      context: "B2B · Remote",
      bullets: [
        "Hands-on product engineering for multiple early-stage startups, taking projects from the ground up.",
        "Delivered AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, real-estate platform, AI chats, and custom GPT experiences.",
        "Built cybersecurity dashboards, proprietary data explorers, and AI agent harnesses, skills, and automations.",
      ],
    },
    {
      title: "Product / Datavis Engineer",
      company: "Hunt Intelligence, Inc.",
      url: "hunt.io",
      date: "Apr 2024 - Mar 2025",
      context: "B2B · Remote",
      bullets: [
        "Specialised in data visualisation for a threat-intelligence product, including the IP History Widget.",
        "Built core product modules AttackCapture™ and HuntSQL™ in a modern TypeScript / Next.js codebase with shadcn/ui, Playwright, Vercel, and GitHub Actions.",
        "Created an OpenAPI-based API documentation platform that enriched raw openapi.json with metadata and shipped a friendlier interface than Swagger.",
      ],
    },
    {
      title: "Senior Frontend Engineer → Team Lead",
      company: "OMEGA Systems",
      url: "omegasys.eu",
      date: "Jun 2023 - Apr 2024",
      context: "Remote",
      bullets: [
        "Built CORE5, OMEGA’s next-generation iGaming platform management system, with TypeScript and React; promoted to lead the frontend team.",
        "Created data visualisations for main and social dashboards, reports, and configuration views; built localisation and internal UI systems.",
        "Established onboarding, ticket, documentation, and remote / async delivery standards while continuing to ship end-to-end features.",
      ],
    },
    {
      title: "Senior Frontend Engineer",
      company: "Phantasma Chain",
      url: "phantasma.info",
      date: "Jan 2022 - May 2023",
      context: "Remote",
      bullets: [
        "Built the frontend monorepo for new tools and apps, Phantasma UI Storybook, and Phantasma Explorer.",
        "Established Playwright testing, GitHub Actions CI, and Vercel CD; contributed improvements to the Phantasma TypeScript SDK.",
      ],
    },
    {
      title: "Frontend Lead",
      company: "BinaryEdge · Coalition, Inc.",
      url: "coalitioninc.com",
      date: "Feb 2020 - Oct 2021",
      context: "Remote",
      bullets: [
        "Started as a solo frontend engineer and grew a team for customer-facing security applications and internal tools.",
        "Introduced React, TypeScript, Next.js, and micro frontends; tech lead for Coalition Explorer, the component library, data visualisations, and Attack Surface Monitoring.",
        "Migrated frontend CI/CD from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
      ],
    },
  ],
  earlier: [
    { date: "2018 - 2019", role: "Fullstack Engineer, Co-Founder", company: "Glaiveware", note: "Bespoke web apps; React, Next.js, Node.js, AWS." },
    { date: "2017", role: "React Native Developer", company: "Sycret.ink", note: "End-to-end encrypted mobile chat app." },
    { date: "2016", role: "Full Stack JavaScript Developer", company: "American Heart Association", note: "Admin dashboard for Kinect integration." },
    { date: "2015 - 2016", role: "Frontend Developer", company: "NextBitt", note: "Analytics, reporting, and management dashboards." },
    { date: "2015", role: "Java Developer (Internship)", company: "Science4you", note: "Online-store management system." },
  ],
  projects: [
    { name: "11iorj11.io", url: "https://11iorj11.io", detail: "Personal brand for B2B freelancing · 2025 - Present" },
    { name: "11aiai.rj11.io", url: "https://11aiai.rj11.io", detail: "Open-source AI skills, plugins, and workflows · 2026 - Present" },
    { name: "11benchbench.rj11.io", url: "https://11benchbench.rj11.io", detail: "Open-source AI benchmarks · 2026 - Present" },
  ],
  education: {
    title: "IT Systems Management and Programming",
    school: "Escola Profissional de Tecnologia Digital",
    date: "2013 - 2016",
    detail: "Técnico de Gestão e Programação de Sistemas Informáticos · Lisbon, Portugal",
  },
  note: "Started coding through game modding and reverse engineering; placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.",
} as const
