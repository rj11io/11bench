export const cv = {
  identity: {
    name: 'Ricardo Jorge',
    shortName: 'RJ',
    role: 'AI Product Engineer',
    location: 'Lisbon, Portugal',
    email: 'ricardojorgexyz@gmail.com',
    links: [
      { label: 'rj11.io', href: 'https://rj11.io' },
      { label: 'github.com/rj11io', href: 'https://github.com/rj11io' },
      { label: 'linkedin.com/in/rj11io', href: 'https://linkedin.com/in/rj11io' },
    ],
  },
  summary:
    'AI Product Engineer with a decade of professional TypeScript experience, building with React since 2016 and Next.js since 2018. First frontend hire on multiple teams: owning architecture, tooling, component libraries and delivery pipelines, then growing teams through hiring, onboarding and playbooks. Focused on data-driven dashboards, product platforms and proprietary data explorers across cybersecurity, crypto and gaming; now building AI product experiences, agent harnesses, skills and automations.',
  capabilities: [
    ['Product engineering', 'TypeScript · React · Next.js · AI SDK · Convex · Playwright · Vercel'],
    ['AI engineering', 'Agent automations · custom skills · harness engineering · Codex · Claude Code · n8n'],
    ['UI & data', 'Design systems · Storybook · Tailwind CSS · shadcn/ui · dashboards · d3 · Recharts · Nivo'],
    ['Leadership & delivery', 'Team and project management · product design · end-to-end delivery · Agile'],
  ],
  projects: [
    { name: '11io', href: 'https://rj11.io', dates: '2025 - Present', description: 'Personal brand for B2B freelancing.' },
    { name: '11ai', href: 'https://ai.rj11.io', dates: '2026 - Present', description: 'Open-source AI skills, plugins and workflows.' },
    { name: '11bench', href: 'https://bench.rj11.io', dates: '2026 - Present', description: 'Open-source AI benchmarks.' },
  ],
  experience: [
    {
      role: 'AI Product Engineer', company: 'rj11io', href: 'https://rj11.io', dates: 'Mar 2025 - Present', meta: 'B2B · Remote',
      lead: 'Hands-on AI product engineering for multiple early-stage startups, built from the ground up.',
      points: ['AI data extraction from PDFs, AI SEO analytics and a GenAI dermatopathology portal.', 'Cybersecurity dashboards, proprietary data explorers, AI chat / GPT experiences, and agent harnesses, skills and automations.'],
    },
    {
      role: 'Product / Datavis Engineer', company: 'Hunt Intelligence, Inc.', href: 'https://hunt.io', dates: 'Apr 2024 - Mar 2025', meta: 'B2B · Remote',
      lead: 'Specialized in data visualisation for a threat-intelligence product.',
      points: ['Built IP History Widget and core modules including AttackCapture™ and HuntSQL™.', 'Built a modern Next.js / shadcn/ui codebase with Playwright and GitHub Actions CI/CD; shipped an OpenAPI documentation platform designed to be friendlier than Swagger.'],
    },
    {
      role: 'Senior Frontend Engineer → Team Lead', company: 'OMEGA Systems', href: 'https://omegasys.eu', dates: 'Jun 2023 - Apr 2024', meta: 'Remote',
      lead: 'Built CORE5, OMEGA’s next-generation iGaming platform management system, with TypeScript and React; promoted to lead the frontend team.',
      points: ['Delivered Main and Social dashboards, report and configuration views, plus localisation and an internal tab system.', 'Created the New Developer onboarding experience and standards for tickets, documentation, remote / async workflows and Definition of Done.'],
    },
    {
      role: 'Senior Frontend Engineer', company: 'Phantasma Chain', href: 'https://phantasma.info', dates: 'Jan 2022 - May 2023', meta: 'Remote',
      lead: 'Built the frontend monorepo, Phantasma UI Storybook and Phantasma Explorer.',
      points: ['Established Playwright testing, GitHub Actions CI and Vercel CD; contributed improvements to the Phantasma TypeScript SDK.', 'Built in-house tooling for SDK integration, localisation, white-label theming, environment configuration and API / scripts / hooks.'],
    },
    {
      role: 'Frontend Lead', company: 'BinaryEdge · Coalition, Inc.', href: 'https://coalitioninc.com', dates: 'Feb 2020 - Oct 2021', meta: 'Remote',
      lead: 'Started as a solo frontend engineer and grew a team for customer-facing security apps and internal tools.',
      points: ['Introduced React, TypeScript, Next.js and micro frontends; led Coalition Explorer, the Customer Security Web UI component library and data visualisations.', 'Built Attack Surface Monitoring for the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control; migrated frontend CI/CD from Drone to GitHub Actions.'],
    },
  ],
  earlier: [
    ['Fullstack Engineer, Co-Founder', 'Glaiveware', 'Mar 2018 - Dec 2019', 'Bespoke web apps; project and business management.'],
    ['React Native Developer', 'Sycret.ink', 'Jan 2017 - Dec 2017', 'End-to-end encrypted mobile chat app, developed under contract.'],
    ['Full Stack JavaScript Developer', 'American Heart Association', 'Sep 2016 - Nov 2016', 'Admin dashboard for Kinect integration: data, reports and user management.'],
    ['Frontend Developer', 'NextBitt', 'Oct 2015 - Jul 2016', 'Analytics, reporting, auditing and management dashboards.'],
    ['Java Developer', 'Science4you', 'Jan 2015 - Mar 2015', 'Internship: order management, reporting and automated customer email system.'],
  ],
  education: 'IT Systems Management and Programming · Escola Profissional de Tecnologia Digital · Lisbon, Portugal · 2013 - 2016',
  note: 'Started coding by modding and reverse-engineering games and consoles; placed second nationally and reached the final four of the 2008 robotics world cup in China with LEGO Mindstorms.',
} as const
