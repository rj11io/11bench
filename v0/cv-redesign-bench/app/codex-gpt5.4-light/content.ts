export type SourceType = "extracted" | "editorial" | "inference" | "uncertain"

export type Evidence = {
  source: "RJ_CV.pdf" | "RJ_CV_max.pdf"
  note: string
}

export type Fact<T> = {
  value: T
  type: SourceType
  evidence: Evidence[]
}

export type ExperienceItem = {
  company: string
  website?: string
  title: string
  dates: string
  location?: string
  summary: Fact<string>
  bullets: Fact<string>[]
}

export type ProjectItem = {
  name: string
  url: string
  label: string
  dates?: string
  note: Fact<string>
}

export type CanonicalCv = {
  basics: {
    name: string
    title: Fact<string>
    location: Fact<string>
    email: Fact<string>
    website: Fact<string>
    github: Fact<string>
    linkedin: Fact<string>
  }
  profile: {
    headline: Fact<string>
    summary: Fact<string[]>
    differentiators: Fact<string[]>
  }
  skills: {
    label: string
    items: string[]
    type: SourceType
    evidence: Evidence[]
  }[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
  earlierExperience: Fact<string[]>
  education: {
    program: Fact<string>
    school: Fact<string>
    dates: Fact<string>
    credential: Fact<string>
  }
  notes: {
    omissions: string[]
    uncertainties: string[]
  }
}

export const cv: CanonicalCv = {
  basics: {
    name: "Ricardo Jorge",
    title: {
      value: "AI Product Engineer",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Header and current role title." },
        { source: "RJ_CV_max.pdf", note: "Header and about section." },
      ],
    },
    location: {
      value: "Lisbon, Portugal",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Header contact line." },
        { source: "RJ_CV_max.pdf", note: "Header contact line." },
      ],
    },
    email: {
      value: "ricardojorgexyz@gmail.com",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Header contact line." },
        { source: "RJ_CV_max.pdf", note: "Header contact line." },
      ],
    },
    website: {
      value: "https://rj11.io",
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Contact line lists rj11.io without protocol." },
        { source: "RJ_CV_max.pdf", note: "Contact line lists rj11.io without protocol." },
      ],
    },
    github: {
      value: "https://github.com/rj11io",
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Header lists github.com/rj11io." },
        { source: "RJ_CV_max.pdf", note: "Projects page distinguishes modern and legacy GitHub profiles." },
      ],
    },
    linkedin: {
      value: "https://linkedin.com/in/rj11io",
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Header contact line." },
        { source: "RJ_CV_max.pdf", note: "Header contact line." },
      ],
    },
  },
  profile: {
    headline: {
      value:
        "Senior AI product and frontend engineer focused on data-rich interfaces, internal platforms, and agent-enabled workflows.",
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Condenses about, skills, and project focus." },
        { source: "RJ_CV_max.pdf", note: "Confirms seniority, frontend specialization, and AI focus." },
      ],
    },
    summary: {
      value: [
        "A decade of professional TypeScript experience, with React since 2016 and Next.js since 2018.",
        "Frequently hired as the first frontend engineer, owning architecture, tooling, component systems, delivery pipelines, and team onboarding from the ground up.",
        "Most experience sits in cybersecurity, crypto, gaming, and data-heavy B2B products, especially dashboards, product platforms, and proprietary data explorers.",
        "Built with AI since the first releases of Copilot and ChatGPT, progressing from prompt and context work to custom skills, agent harnesses, and automations.",
      ],
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Directly supported by About Me section." },
        { source: "RJ_CV_max.pdf", note: "Expanded narrative reinforces the same facts." },
      ],
    },
    differentiators: {
      value: [
        "Data visualization and exploratory product design",
        "Zero-to-one product engineering in early-stage environments",
        "Frontend leadership, hiring, onboarding, and engineering standards",
        "Print-minded and workflow-minded UX for operational tools",
      ],
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Derived from repeated themes in skills and experience." },
        { source: "RJ_CV_max.pdf", note: "Derived from expanded role descriptions." },
      ],
    },
  },
  skills: [
    {
      label: "Core stack",
      items: ["TypeScript", "React", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Skills section." },
        { source: "RJ_CV_max.pdf", note: "Skills section." },
      ],
    },
    {
      label: "AI engineering",
      items: ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"],
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Skills section." },
        { source: "RJ_CV_max.pdf", note: "Skills section." },
      ],
    },
    {
      label: "UI, systems, data",
      items: ["Tailwind CSS", "shadcn/ui", "Design systems", "Storybook", "Dashboards", "Data visualization"],
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Skills section lists these categories." },
        { source: "RJ_CV_max.pdf", note: "Skills section adds Material-UI and specific data tools." },
      ],
    },
    {
      label: "Leadership & delivery",
      items: ["Team management", "Project management", "End-to-end product engineering", "Product design", "Agile workflows"],
      type: "editorial",
      evidence: [
        { source: "RJ_CV.pdf", note: "Leadership & Delivery section." },
        { source: "RJ_CV_max.pdf", note: "Leadership & Delivery section." },
      ],
    },
  ],
  projects: [
    {
      name: "rj11.io",
      url: "https://rj11.io",
      label: "Personal brand",
      dates: "2025 - Present",
      note: {
        value: "Personal brand site for B2B freelancing and current work.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Projects section labels it as personal brand for B2B freelancing." },
          { source: "RJ_CV_max.pdf", note: "Projects section adds dates." },
        ],
      },
    },
    {
      name: "ai.rj11.io",
      url: "https://ai.rj11.io",
      label: "Open source AI skills",
      dates: "2026 - Present",
      note: {
        value: "Open source AI skills, plugins, and workflows.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Projects section." },
          { source: "RJ_CV_max.pdf", note: "Projects section expands description and dates." },
        ],
      },
    },
    {
      name: "bench.rj11.io",
      url: "https://bench.rj11.io",
      label: "Open source benchmarks",
      dates: "2026 - Present",
      note: {
        value: "Open source AI benchmark work.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Projects section." },
          { source: "RJ_CV_max.pdf", note: "Projects section expands description and dates." },
        ],
      },
    },
  ],
  experience: [
    {
      company: "rj11io",
      website: "https://rj11.io",
      title: "AI Product Engineer",
      dates: "Mar 2025 - Present",
      location: "Remote",
      summary: {
        value: "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Role summary." },
          { source: "RJ_CV_max.pdf", note: "Expanded role summary." },
        ],
      },
      bullets: [
        {
          value: "Delivered AI data extraction from PDFs, AI SEO analytics, and custom chat / GPT experiences.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Lists PDF extraction, SEO analytics, dermatopathology portal, and GPT experiences." },
            { source: "RJ_CV_max.pdf", note: "Expanded project list confirms these themes." },
          ],
        },
        {
          value: "Built cybersecurity dashboards, proprietary data explorers, and agent harnesses, skills, and automations.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Role bullets." },
            { source: "RJ_CV_max.pdf", note: "Role bullets." },
          ],
        },
      ],
    },
    {
      company: "Hunt Intelligence, Inc.",
      website: "https://hunt.io",
      title: "Product / Datavis Engineer",
      dates: "Apr 2024 - Mar 2025",
      location: "Remote",
      summary: {
        value: "Focused on data visualization for a threat-intelligence product on a modern TypeScript stack.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Role summary." },
          { source: "RJ_CV_max.pdf", note: "Expanded role summary." },
        ],
      },
      bullets: [
        {
          value: "Built custom visualization components including the IP History Widget and shipped core product modules such as AttackCapture and HuntSQL.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "IP History Widget, AttackCapture, HuntSQL." },
            { source: "RJ_CV_max.pdf", note: "Expanded bullet list." },
          ],
        },
        {
          value: "Set up a modern Next.js, shadcn/ui, Playwright, Vercel, and GitHub Actions workflow, and launched a friendlier OpenAPI documentation platform.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Modern TypeScript codebase and API docs platform." },
            { source: "RJ_CV_max.pdf", note: "Expanded tooling and release workflow details." },
          ],
        },
      ],
    },
    {
      company: "OMEGA Systems",
      website: "https://omegasys.eu",
      title: "Senior Frontend Engineer -> Team Lead",
      dates: "Jun 2023 - Apr 2024",
      location: "Remote",
      summary: {
        value: "Joined to build the next generation of OMEGA's iGaming platform management system and was promoted to lead the frontend team.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Role summary." },
          { source: "RJ_CV_max.pdf", note: "Expanded role summary." },
        ],
      },
      bullets: [
        {
          value: "Built dashboard, reporting, and configuration views, including data-heavy main and social surfaces.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Main and Social dashboards, report and configuration views." },
            { source: "RJ_CV_max.pdf", note: "Expanded module list." },
          ],
        },
        {
          value: "Created onboarding and workflow standards for tickets, documentation, and remote async delivery while continuing to ship new features end to end.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Lead responsibilities." },
            { source: "RJ_CV_max.pdf", note: "Definition of Done and weekly talks add context." },
          ],
        },
      ],
    },
    {
      company: "Phantasma Chain",
      website: "https://phantasma.info",
      title: "Senior Frontend Engineer",
      dates: "Jan 2022 - May 2023",
      location: "Remote",
      summary: {
        value: "Built the frontend monorepo and shared UI foundations for a new generation of crypto tools and apps.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Role summary." },
          { source: "RJ_CV_max.pdf", note: "Expanded role summary." },
        ],
      },
      bullets: [
        {
          value: "Created the Phantasma UI Storybook, Phantasma Explorer, and internal tooling for localization, theming, environment configs, and API hooks.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Storybook, Explorer, SDK improvements." },
            { source: "RJ_CV_max.pdf", note: "Expanded in-house tools list." },
          ],
        },
        {
          value: "Established Playwright testing, GitHub Actions CI, Vercel delivery, and contributed improvements to the TypeScript SDK.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Testing, CI, CD, SDK contributions." },
            { source: "RJ_CV_max.pdf", note: "Same claims in more detail." },
          ],
        },
      ],
    },
    {
      company: "BinaryEdge / Coalition, Inc.",
      website: "https://coalitioninc.com",
      title: "Frontend Lead",
      dates: "Feb 2020 - Oct 2021",
      location: "Remote",
      summary: {
        value: "Started as a solo frontend engineer and grew a team for customer-facing security apps and internal tools.",
        type: "editorial",
        evidence: [
          { source: "RJ_CV.pdf", note: "Role summary." },
          { source: "RJ_CV_max.pdf", note: "Expanded role summary." },
        ],
      },
      bullets: [
        {
          value: "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends into the stack.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "Role bullets." },
            { source: "RJ_CV_max.pdf", note: "Role bullets." },
          ],
        },
        {
          value: "Led Attack Surface Monitoring, Coalition Explorer, the component library, and data visualization work across internal and customer tools.",
          type: "editorial",
          evidence: [
            { source: "RJ_CV.pdf", note: "ASM, Coalition Explorer, component library, data visualizations." },
            { source: "RJ_CV_max.pdf", note: "Expanded role bullets." },
          ],
        },
      ],
    },
  ],
  earlierExperience: {
    value: [
      "Co-founded Glaiveware (2018 - 2019), building bespoke web apps with React, Next.js, Node.js, AWS, and project leadership responsibilities.",
      "Built a React Native encrypted chat app at Sycret.ink (2017).",
      "Built an admin dashboard for the American Heart Association (2016).",
      "Created analytics dashboards and management tools at NextBitt (2015 - 2016).",
      "Completed a Java/MySQL internship at Science4you (2015).",
    ],
    type: "editorial",
    evidence: [
      { source: "RJ_CV.pdf", note: "Earlier roles are condensed into a single paragraph." },
      { source: "RJ_CV_max.pdf", note: "Pages 5-6 provide full detail and dates." },
    ],
  },
  education: {
    program: {
      value: "IT Systems Management and Programming",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Education section." },
        { source: "RJ_CV_max.pdf", note: "Education section." },
      ],
    },
    school: {
      value: "Escola Profissional de Tecnologia Digital",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Education section." },
        { source: "RJ_CV_max.pdf", note: "Education section." },
      ],
    },
    dates: {
      value: "2013 - 2016",
      type: "extracted",
      evidence: [
        { source: "RJ_CV.pdf", note: "Education section." },
        { source: "RJ_CV_max.pdf", note: "Education section." },
      ],
    },
    credential: {
      value: "Tecnico de Gestao e Programacao de Sistemas Informaticos",
      type: "editorial",
      evidence: [
        { source: "RJ_CV_max.pdf", note: "Portuguese credential line uses diacritics not preserved by PDF extraction." },
      ],
    },
  },
  notes: {
    omissions: [
      "The six-page CV contains more narrative voice, employer context, and project lists than can fit cleanly into a two-page print layout; those were compressed into role summaries and selected bullets.",
      "Legacy GitHub, TED-talk style internal knowledge-sharing, and several lower-priority in-house tools were omitted from the rendered route to protect scanability.",
      "Fun facts and early robotics achievements were not promoted into the main layout; they are real but lower-priority than current professional signal for this target profile.",
    ],
    uncertainties: [
      "The six-page PDF references MidJourney in the AI timeline while the two-page PDF mentions Copilot and ChatGPT; the canonical summary keeps the overlap and omits MidJourney to stay conservative.",
      "Project URLs are normalized to `https://` versions of the domains shown in the PDFs.",
      "The extracted PDF text drops Portuguese diacritics in the education credential, so the credential line is restored editorially and should be verified against the source PDF visually if exact accents matter.",
    ],
  },
}
