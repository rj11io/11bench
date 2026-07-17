export type CVItem = {
  role: string
  org: string
  link?: string
  place?: string
  dates: string
  summary?: string
  bullets: string[]
  source: "RJ_CV.pdf" | "RJ_CV_max.pdf" | "both" | "max" | "minified"
  note?: string
}

export const cvContent = {
  name: "Ricardo Jorge",
  title: "AI Product Engineer",
  location: "Lisbon, Portugal",
  email: "ricardojorgexyz@gmail.com",
  website: "https://www.rj11.io/",
  github: "https://github.com/rj11io",
  linkedin: "https://www.linkedin.com/in/rj11io",
  publicCv: "https://cv.rj11.io/",
  summary: [
    {
      text:
        "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. Usually the first frontend hire, responsible for architecture, tooling, component libraries, and the workflows that let new teams move quickly.",
      source: "both",
    },
    {
      text:
        "Work centers on dashboards, product platforms, and proprietary data explorers in cybersecurity, crypto, and gaming. More recent work adds AI product engineering: prompt and context engineering, agent harnesses, custom skills, and automation flows.",
      source: "both",
    },
  ],
  facts: [
    "Started coding young through game and console modding, MUGEN, and running dedicated servers for Counter-Strike and Minecraft.",
    "Built LEGO Mindstorms robots that reached a second-place national finish and the final four of the 2008 robotics world cup in China.",
    "B2B freelance work is explicitly noted in the expanded CV.",
  ],
  skills: [
    {
      group: "Core Stack",
      items: "TypeScript, React, Next.js, AI SDK, Convex, Playwright, Vercel",
      source: "both",
    },
    {
      group: "AI Engineering",
      items: "Agent automations, custom agent skills, harness engineering, Codex, Claude Code, n8n",
      source: "both",
    },
    {
      group: "UI & Data",
      items: "Tailwind CSS, shadcn/ui, Material UI, design systems, Storybook, dashboards, data visualization",
      source: "both",
    },
    {
      group: "Leadership & Delivery",
      items: "Team and project management, end-to-end product engineering, product design, Agile workflows",
      source: "both",
    },
    {
      group: "Foundations",
      items: "JavaScript, Node.js, HTML5, CSS, Git, GitHub Actions, REST APIs, CI/CD, testing",
      source: "max",
    },
  ],
  projects: [
    {
      name: "11io",
      link: "https://www.rj11.io/",
      dates: "2025 - Present",
      description: "Personal brand for B2B freelancing.",
      source: "max",
      note: undefined,
    },
    {
      name: "11ai",
      link: "https://ai.rj11.io/",
      dates: "2026 - Present",
      description: "Open source AI skills, plugins, and workflows.",
      source: "max",
      note: undefined,
    },
    {
      name: "11bench",
      link: "https://bench.rj11.io/",
      dates: "2026 - Present",
      description: "Open source AI benchmarks.",
      source: "max",
      note: undefined,
    },
    {
      name: "Modern GitHub",
      link: "https://github.com/rj11io",
      dates: "2023 - Present",
      description: "Modern GitHub for AI open source projects.",
      source: "max",
      note: undefined,
    },
    {
      name: "Legacy GitHub",
      link: "https://github.com/ricardojrmcom?tab=repositories",
      dates: "2020 - 2023",
      description: "Legacy GitHub with the open source code produced 2020-2023.",
      source: "max",
      note: "The minified CV does not list this legacy account.",
    },
  ] satisfies Array<{
    name: string
    link: string
    dates: string
    description: string
    source: CVItem["source"]
    note?: string
  }>,
  experience: [
    {
      role: "AI Product Engineer",
      org: "rj11io",
      link: "https://www.rj11.io/",
      place: "B2B, Remote",
      dates: "Mar 2025 - Present",
      summary:
        "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
      bullets: [
        "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, real estate platform work, multiple cybersecurity dashboards, and proprietary data explorers.",
        "Multiple AI chats / GPT experiences, smart scraping agents and n8n workflows, plus AI agent harnesses, skills, and automations.",
      ],
      source: "max",
      note: "The minified CV compresses these into three bullets.",
    },
    {
      role: "Product / Datavis Engineer",
      org: "Hunt Intelligence, Inc.",
      link: "https://hunt.io/",
      place: "B2B, Remote",
      dates: "Apr 2024 - Mar 2025",
      summary:
        "Went deep on data visualization for a threat-intelligence product.",
      bullets: [
        "Built a modern TypeScript codebase with Next.js and shadcn/ui, production and staging on Vercel, end-to-end tests with Playwright, CI/CD on GitHub Actions, and automated release changelogs wired to Slack.",
        "Built the IP History Widget and core modules AttackCapture and HuntSQL.",
        "Built a new API documentation platform on top of OpenAPI that was friendlier than Swagger.",
      ],
      source: "both",
    },
    {
      role: "Senior Frontend Engineer → Team Lead",
      org: "OMEGA Systems",
      link: "https://www.omegasys.eu/",
      place: "Remote",
      dates: "Jun 2023 - Apr 2024",
      summary:
        "Built the next generation of OMEGA's iGaming platform management system and later led the frontend team.",
      bullets: [
        "Data visualization for Main and Social dashboards, plus report and configuration views including Cashback, Refer-a-Friend, Pending Withdrawals, and Challenges / Leaderboards.",
        "Built the localization / internationalization module and an internal Tab System UI.",
        "As lead, built the New Developer onboarding experience, set standards for tickets, documentation, and remote / async workflows, with emphasis on Definition of Done.",
        "Gave weekly TED talks to bring the team up to speed on technology and product.",
        "Kept shipping: product-engineered new features from scratch, end to end.",
      ],
      source: "both",
    },
    {
      role: "Senior Frontend Engineer",
      org: "Phantasma Chain",
      link: "https://phantasma.info/",
      place: "Remote",
      dates: "Jan 2022 - May 2023",
      summary:
        "Built the frontend monorepo for new tools and apps, the UI Storybook, and Phantasma Explorer.",
      bullets: [
        "Tests with Playwright, CI with GitHub Actions, CD with Vercel.",
        "Contributed improvements to the Phantasma TypeScript SDK.",
        "Built in-house tools: a custom React hook for the SDK, localisation, white-label theming, environment configs, and a custom API / scripts / hooks module.",
      ],
      source: "both",
    },
    {
      role: "Frontend Lead",
      org: "BinaryEdge / Coalition, Inc.",
      link: "https://www.coalitioninc.com/",
      place: "Remote",
      dates: "Feb 2020 - Oct 2021",
      summary:
        "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools.",
      bullets: [
        "Introduced React, TypeScript, Material UI, Nivo, and Next.js, plus the concept of micro frontends.",
        "Attack Surface Monitoring on the BinaryEdge Portal, later integrated into Coalition Explorer and Coalition Control.",
        "Tech lead for Coalition Explorer 2.0, claims management, report generation, security review, Executive Risks, the Coalition Storybook, the Customer Security Web UI component library, and data visualizations.",
        "Tech lead for the RSA and Security Week marketing pages.",
        "Migrated frontend CI/CD from Drone to GitHub Actions, improving pipelines, environments, and developer experience.",
      ],
      source: "max",
      note: "The minified CV keeps only the most important three bullets.",
    },
    {
      role: "Fullstack Engineer, Co-Founder",
      org: "Glaiveware",
      place: "Lisbon, Portugal · Remote",
      dates: "Mar 2018 - Dec 2019",
      summary:
        "Built bespoke web apps above market standards and learned project and business management.",
      bullets: [
        "JavaScript and TypeScript: React, Redux, Redux-Saga, Next.js, Node.js, Express.",
        "Material UI, HTML5 + CSS3 (Bootstrap 4, SASS).",
        "Databases: MongoDB, Firebase, MySQL, SQLite.",
        "Infrastructure: AWS (EC2, S3, SES, API Gateway, Lambda), Ubuntu, nginx.",
        "Beyond code: SEO & SEM, branding & design, marketing & advertising, copywriting & content management.",
      ],
      source: "max",
    },
    {
      role: "React Native Developer",
      org: "Sycret.ink",
      place: "Neuchâtel, Switzerland · Remote",
      dates: "Jan 2017 - Dec 2017",
      summary:
        "Mobile chat app with end-to-end encryption in a serverless environment, under contract with a team of three.",
      bullets: [
        "React Native, libsignal-protocol, Android Studio.",
        "AWS (API Gateway, Lambda), SQLite.",
      ],
      source: "max",
    },
    {
      role: "Full Stack JavaScript Developer",
      org: "American Heart Association",
      place: "Remote",
      dates: "Sep 2016 - Nov 2016",
      summary:
        "Built an admin dashboard for the AHA's Kinect integration.",
      bullets: [
        "Interfaced users with collected data, connected doctors and patients, printed reports, and let superusers manage the system.",
        "Built the first web app as a full-stack JavaScript developer, using React and Node.",
      ],
      source: "max",
    },
    {
      role: "Frontend Developer",
      org: "NextBitt",
      place: "Lisbon, Portugal",
      dates: "Oct 2015 - Jul 2016",
      summary:
        "Created analytics dashboards and reporting, auditing, and management tools for asset and facilities management software.",
      bullets: [
        "JavaScript (jQuery, Angular.js), .NET (C#, MVC), HTML5 + CSS3.",
        "Heavy date/time logic and data visualization with Google Charts, dygraphs, Chart.js, d3.js, C3.js, and more.",
      ],
      source: "max",
    },
    {
      role: "Java Developer",
      org: "Science4you",
      place: "Lisbon, Portugal",
      dates: "Jan 2015 - Mar 2015",
      summary:
        "Internship; built a management system for the online store using Java and MySQL.",
      bullets: [
        "Expanded a display-and-print tool into a full application managing orders, printing reports, and sending automated emails.",
      ],
      source: "max",
    },
  ] satisfies CVItem[],
  education: [
    {
      degree: "IT Systems Management and Programming",
      school: "Escola Profissional de Tecnologia Digital",
      location: "Lisbon, Portugal",
      dates: "2013 - 2016",
      note: "The minified CV omits the Portuguese title line; the expanded CV includes it as 'Técnico de Gestão e Programação de Sistemas Informáticos.'",
      source: "both",
    },
  ],
  omissions: [
    "Fun facts were not kept in the final print-first ordering because they displace work history and skill evidence.",
    "The legacy project-style URLs and the extra GitHub account were retained in research but compressed into the project section rather than repeated in the hero.",
    "The full historical jobs from 2015-2017 are included in the canonical model but will be visually compressed on the website and in print to preserve the two-page limit.",
  ],
} as const

export type CVContent = typeof cvContent
