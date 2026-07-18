export type SkillGroup = {
  name: string
  items: string[]
}

export type ProjectItem = {
  name: string
  href: string
  dates: string
  description: string
  source: string[]
}

export type ExperienceItem = {
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
  source: string[]
}

export type PageSection =
  | {
      kind: "summary"
      title: string
      paragraphs: string[]
      source: string[]
    }
  | {
      kind: "skills"
      title: string
      groups: SkillGroup[]
      source: string[]
    }
  | {
      kind: "projects"
      title: string
      items: ProjectItem[]
      source: string[]
    }
  | {
      kind: "experience"
      title: string
      items: ExperienceItem[]
      source: string[]
    }
  | {
      kind: "education"
      title: string
      items: {
        school: string
        degree: string
        dates: string
        location: string
        source: string[]
      }[]
      source: string[]
    }

export type ResumeModel = {
  identity: {
    name: string
    title: string
    location: string
    email: string
    website: string
    github: string
    linkedin: string
    archive: string
  }
  pages: {
    id: string
    sections: PageSection[]
  }[]
  notes: {
    included: string[]
    omitted: string[]
    uncertainties: string[]
  }
}

export const resume: ResumeModel = {
  identity: {
    name: "Ricardo Jorge",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    website: "rj11.io",
    github: "github.com/rj11io",
    linkedin: "linkedin.com/in/rj11io",
    archive: "cv.rj11.io/v1/max",
  },
  pages: [
    {
      id: "page-1",
      sections: [
        {
          kind: "summary",
          title: "About",
          paragraphs: [
            "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018.",
            "On most projects I was the first frontend hire, owning architecture, tooling, component libraries, and pipelines from day one, then helping grow the team around them through hiring, interviewing, onboarding, and playbooks.",
            "Most of my experience is building dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies. I have also built with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to open-source skills and full agent harnesses and automations.",
          ],
          source: [
            "RJ_CV.pdf p1",
            "RJ_CV_max.pdf p1",
            "RJ_CV_max.pdf p2",
          ],
        },
        {
          kind: "skills",
          title: "Skills",
          groups: [
            {
              name: "Core stack",
              items: [
                "TypeScript",
                "React",
                "Next.js",
                "AI SDK",
                "Convex",
                "Playwright",
                "Vercel",
              ],
            },
            {
              name: "AI engineering",
              items: [
                "Agent automations",
                "Custom agent skills",
                "Harness engineering",
                "Codex",
                "Claude Code",
                "n8n",
              ],
            },
            {
              name: "UI & data",
              items: [
                "Tailwind CSS",
                "shadcn/ui",
                "Design systems",
                "Storybook",
                "Dashboards",
                "Data visualisation",
              ],
            },
            {
              name: "Leadership & delivery",
              items: [
                "Team management",
                "Project management",
                "End-to-end product engineering",
                "Product design",
                "Agile methodologies",
              ],
            },
          ],
          source: [
            "RJ_CV.pdf p1",
            "RJ_CV_max.pdf p2",
          ],
        },
        {
          kind: "projects",
          title: "Selected projects",
          items: [
            {
              name: "11iorj11.io",
              href: "https://11iorj11.io",
              dates: "2025 - Present",
              description: "Personal brand for B2B freelancing.",
              source: ["RJ_CV_max.pdf p2"],
            },
            {
              name: "11aiai.rj11.io",
              href: "https://11aiai.rj11.io",
              dates: "2026 - Present",
              description: "Open source AI skills, plugins, and workflows.",
              source: ["RJ_CV_max.pdf p2"],
            },
            {
              name: "11benchbench.rj11.io",
              href: "https://11benchbench.rj11.io",
              dates: "2026 - Present",
              description: "Open source AI benchmarks.",
              source: ["RJ_CV_max.pdf p2"],
            },
          ],
          source: ["RJ_CV.pdf p1", "RJ_CV_max.pdf p2"],
        },
      ],
    },
    {
      id: "page-2",
      sections: [
        {
          kind: "experience",
          title: "Experience",
          items: [
            {
              role: "AI Product Engineer",
              company: "rj11io · rj11.io",
              location: "B2B · Remote",
              dates: "Mar 2025 - Present",
              bullets: [
                "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
                "Delivered PDF extraction, AI SEO analytics, a GenAI dermatopathology portal, AI chats and custom GPT experiences, plus cybersecurity dashboards, proprietary data explorers, and agent harnesses, skills, and automations.",
              ],
              source: ["RJ_CV.pdf p1", "RJ_CV_max.pdf p3"],
            },
            {
              role: "Product / Datavis Engineer",
              company: "Hunt Intelligence, Inc. · hunt.io",
              location: "B2B · Remote",
              dates: "Apr 2024 - Mar 2025",
              bullets: [
                "Went deep on my specialty: data visualisation for a threat-intelligence product, including custom components such as the IP History Widget.",
                "Built AttackCapture and HuntSQL on a modern TypeScript stack with Next.js, shadcn/ui, Playwright, and GitHub Actions, plus a new OpenAPI-based documentation platform that was friendlier than Swagger.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p3"],
            },
            {
              role: "Senior Frontend Engineer -> Team Lead",
              company: "OMEGA Systems · omegasys.eu",
              location: "Remote",
              dates: "Jun 2023 - Apr 2024",
              bullets: [
                "Built the next generation of OMEGA's iGaming platform management system (CORE5) with TypeScript and React, then moved into frontend leadership.",
                "Delivered dashboards, report and configuration views, and the developer onboarding experience; set standards for tickets, documentation, and remote async workflows.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p4"],
            },
            {
              role: "Senior Frontend Engineer",
              company: "Phantasma Chain · phantasma.info",
              location: "Remote",
              dates: "Jan 2022 - May 2023",
              bullets: [
                "Built the frontend monorepo for all new tools and apps, the Phantasma UI Storybook, and Phantasma Explorer.",
                "Set up Playwright tests, GitHub Actions CI, Vercel CD, and contributed improvements to the Phantasma TypeScript SDK.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p4"],
            },
            {
              role: "Frontend Lead",
              company: "BinaryEdge · Coalition, Inc. · coalitioninc.com",
              location: "Remote",
              dates: "Feb 2020 - Oct 2021",
              bullets: [
                "Started as a solo frontend engineer and grew a team focused on customer-facing security apps and internal tools.",
                "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, the component library, and data visualisations.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p5"],
            },
            {
              role: "Fullstack Engineer, Co-Founder",
              company: "Glaiveware · Lisbon, Portugal",
              location: "Remote",
              dates: "Mar 2018 - Dec 2019",
              bullets: [
                "Built bespoke web apps as a co-founder and learned the full business side of product delivery.",
              ],
              source: ["RJ_CV_max.pdf p5"],
            },
            {
              role: "React Native Developer",
              company: "Sycret.ink · Neuchâtel, Switzerland",
              location: "Remote",
              dates: "Jan 2017 - Dec 2017",
              bullets: [
                "Built a mobile chat app with end-to-end encryption in a serverless environment, developed under contract with a team of three.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p6"],
            },
            {
              role: "Full Stack JavaScript Developer",
              company: "American Heart Association",
              location: "Remote",
              dates: "Sep 2016 - Nov 2016",
              bullets: [
                "Built an admin dashboard for the AHA's Kinect integration, connecting users, doctors, patients, reports, and superuser controls.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p6"],
            },
            {
              role: "Frontend Developer",
              company: "NextBitt · Lisbon, Portugal",
              location: "",
              dates: "Oct 2015 - Jul 2016",
              bullets: [
                "Created analytics dashboards and reporting, auditing, and management tools for asset and facilities software.",
              ],
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p6"],
            },
            {
              role: "Java Developer",
              company: "Science4you",
              location: "",
              dates: "Jan 2015 - Mar 2015",
              bullets: [
                "Internship: built a management system for the online store that evolved from a display-and-print tool into a fuller order, report, and email workflow.",
              ],
              source: ["RJ_CV_max.pdf p6"],
            },
          ],
          source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p5-p6"],
        },
        {
          kind: "education",
          title: "Education",
          items: [
            {
              school: "Escola Profissional de Tecnologia Digital",
              degree: "IT Systems Management and Programming",
              dates: "2013 - 2016",
              location: "Lisbon, Portugal",
              source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p6"],
            },
          ],
          source: ["RJ_CV.pdf p2", "RJ_CV_max.pdf p6"],
        },
      ],
    },
  ],
  notes: {
    included: [
      "Preserved the canonical contact details, current title, dates, employers, project names, and skill groups from both PDFs.",
      "Rewrote long prose into short declarative summary lines and role bullets to improve scanability.",
      "Separated the current work and earlier work so the first page can carry the highest-signal material for a recruiter skim.",
    ],
    omitted: [
      "The max CV's extended personal narrative and 'open to exceptional opportunities' closing line were omitted to save space and keep the print version professional.",
      "The fun-facts section about gaming, robotics, and early modding was not rendered in the final CV because the two-page limit gives priority to work history and skills.",
      "The legacy GitHub history and the duplicate full-story links were compressed into the active portfolio links and archive URL.",
    ],
    uncertainties: [
      "The source PDFs present some labels in slightly different levels of detail, so the final wording normalizes them while keeping the underlying facts unchanged.",
      "The role title 'Senior Frontend Engineer -> Team Lead' was preserved as a progression note because that is how it appears in the source.",
    ],
  },
}
