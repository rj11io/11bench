export type Experience = {
  title: string
  company: string
  url?: string
  dates: string
  meta?: string
  bullets: string[]
}

export const cv = {
  name: "Ricardo Jorge",
  shortName: "RJ",
  role: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  contacts: [
    { label: "rj11.io", href: "https://rj11.io" },
    { label: "github.com/rj11io", href: "https://github.com/rj11io" },
    { label: "linkedin.com/in/rj11io", href: "https://linkedin.com/in/rj11io" },
    { label: "cv.rj11.io", href: "https://cv.rj11.io" },
  ],
  summary:
    "AI product and frontend engineer with a decade of professional TypeScript experience, React since 2016, and Next.js since 2018. Often the first frontend hire: I own architecture, tooling, component libraries, delivery pipelines, and the onboarding systems that help teams grow. My deepest product experience is in cybersecurity, crypto, gaming, dashboards, and proprietary data explorers.",
  focus: ["AI product engineering", "Frontend architecture", "Data visualisation", "Design systems", "Agent harnesses", "Team leadership"],
  skills: [
    { label: "Core stack", items: "TypeScript · React.js · Next.js · AI SDK · Convex · Playwright · Vercel" },
    { label: "AI engineering", items: "Agent automations · Custom agent skills · Harness engineering · Codex · Claude Code · n8n" },
    { label: "UI & data", items: "Tailwind CSS · shadcn/ui · Material-UI · Design systems · Storybook · d3 · Recharts · Nivo" },
    { label: "Foundations", items: "JavaScript · Node.js · HTML5 · CSS · Git · GitHub Actions · REST APIs · CI/CD · Testing" },
    { label: "Leadership", items: "Team & project management · End-to-end product engineering · Product design · Agile methodologies" },
  ],
  projects: [
    { name: "11iorj11.io", href: "https://rj11.io", detail: "Personal brand for B2B freelancing" },
    { name: "11aiai.rj11.io", href: "https://11aiai.rj11.io", detail: "Open source AI skills, plugins, and workflows" },
    { name: "11benchbench.rj11.io", href: "https://11benchbench.rj11.io", detail: "Open source AI benchmarks" },
    { name: "Modern Github", href: "https://github.com/rj11io", detail: "AI open source projects · 2023–Present" },
  ],
  experience: [
    { title: "AI Product Engineer", company: "rj11io", url: "https://rj11.io", dates: "Mar 2025 – Present", meta: "B2B · Remote", bullets: ["Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.", "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, a real estate platform, AI chats, and custom GPT experiences.", "Cybersecurity dashboards, proprietary data explorers, smart-scraping agents, n8n workflows, agent harnesses, skills, and automations."] },
    { title: "Product / Datavis Engineer", company: "Hunt Intelligence, Inc.", url: "https://hunt.io", dates: "Apr 2024 – Mar 2025", meta: "B2B · Remote", bullets: ["Went deep on data visualisation for a threat-intelligence product, including custom components such as the IP History Widget.", "Built AttackCapture™ and HuntSQL™ on TypeScript, Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions.", "Built an OpenAPI-based API documentation platform with enriched metadata and a UI friendlier and more intuitive than Swagger."] },
    { title: "Senior Frontend Engineer → Team Lead", company: "OMEGA Systems", url: "https://omegasys.eu", dates: "Jun 2023 – Apr 2024", meta: "Remote", bullets: ["Built the next-generation CORE5 iGaming platform management system with TypeScript and React; promoted to lead the frontend team.", "Delivered data visualisation for Main and Social dashboards, reports, and configuration views across Cashback, Refer-a-Friend, Pending Withdrawals, Challenges, and Leaderboards.", "Built the developer onboarding experience and set standards for tickets, documentation, remote/async workflows, and Definition of Done practices while continuing to ship end-to-end."] },
    { title: "Senior Frontend Engineer", company: "Phantasma Chain", url: "https://phantasma.info", dates: "Jan 2022 – May 2023", meta: "Remote", bullets: ["Built the frontend monorepo for new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.", "Established Playwright tests, GitHub Actions CI, Vercel CD, localisation, white-label theming, environment configuration, and SDK helpers.", "Contributed improvements to the Phantasma TypeScript SDK."] },
    { title: "Frontend Lead", company: "BinaryEdge · Coalition, Inc.", url: "https://coalitioninc.com", dates: "Feb 2020 – Oct 2021", meta: "Remote", bullets: ["Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools.", "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, its Storybook/component library, and data visualisations.", "Built Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions."] },
  ] satisfies Experience[],
  earlier: [
    { title: "Fullstack Engineer, Co-Founder", company: "Glaiveware", dates: "Mar 2018 – Dec 2019", detail: "Bespoke web apps; React, Redux, Next.js, Node.js, AWS, product delivery, and business operations." },
    { title: "React Native Developer", company: "Sycret.ink", dates: "Jan 2017 – Dec 2017", detail: "Contracted mobile chat app with end-to-end encryption in a serverless environment." },
    { title: "Full Stack JavaScript Developer", company: "American Heart Association", dates: "Sep 2016 – Nov 2016", detail: "Admin dashboard for Kinect integration, patient data, reports, and superuser workflows." },
    { title: "Frontend Developer", company: "NextBitt", dates: "Oct 2015 – Jul 2016", detail: "Analytics dashboards and reporting, auditing, and management tools." },
    { title: "Java Developer", company: "Science4you", dates: "Jan 2015 – Mar 2015", detail: "Internship; management system for an online store using Java and MySQL." },
  ],
  education: { title: "IT Systems Management and Programming", school: "Escola Profissional de Tecnologia Digital", credential: "Técnico de Gestão e Programação de Sistemas Informáticos", dates: "2013 – 2016", location: "Lisbon, Portugal" },
  facts: ["Built a fighting game with the MUGEN engine and ran dedicated servers for Counter-Strike and Minecraft.", "Placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms."],
} as const
