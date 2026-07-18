export type SourceDoc = "RJ_CV.pdf" | "RJ_CV_max.pdf"

export type Provenance = "direct" | "merged" | "editorial" | "compressed"

export type TextBlock = {
  text: string
  provenance: Provenance
  sources: SourceDoc[]
  note?: string
}

export type SkillGroup = {
  label: string
  items: string[]
  provenance: Provenance
  sources: SourceDoc[]
}

export type ProjectItem = {
  name: string
  url: string
  description: string
  provenance: Provenance
  sources: SourceDoc[]
}

export type RoleBullet = {
  text: string
  provenance: Provenance
  sources: SourceDoc[]
}

export type Role = {
  title: string
  company: string
  companyUrl: string
  location?: string
  dates: string
  bullets: RoleBullet[]
  provenance: Provenance
  sources: SourceDoc[]
}

export type EducationEntry = {
  title: string
  school: string
  dates: string
  provenance: Provenance
  sources: SourceDoc[]
}

export type PageSection =
  | {
      type: "intro"
      label: string
      paragraphs: TextBlock[]
    }
  | {
      type: "skills"
      label: string
      groups: SkillGroup[]
    }
  | {
      type: "projects"
      label: string
      items: ProjectItem[]
    }
  | {
      type: "experience"
      label: string
      roles: Role[]
    }
  | {
      type: "education"
      label: string
      entries: EducationEntry[]
    }

export type CVContent = {
  identity: {
    name: string
    title: string
    location: string
    email: string
    website: string
    github: string
    linkedin: string
    cvUrl: string
  }
  pages: Array<{
    index: number
    sections: PageSection[]
  }>
  notes: string[]
}

export const cvContent: CVContent = {
  identity: {
    name: "Ricardo Jorge",
    title: "AI Product Engineer",
    location: "Lisbon, Portugal",
    email: "ricardojorgexyz@gmail.com",
    website: "rj11.io",
    github: "github.com/rj11io",
    linkedin: "linkedin.com/in/rj11io",
    cvUrl: "cv.rj11.io",
  },
  pages: [
    {
      index: 1,
      sections: [
        {
          type: "intro",
          label: "About",
          paragraphs: [
            {
              text:
                "AI Product Engineer with a decade of professional TypeScript experience, building on React since 2016 and Next.js since 2018. On most projects I was the first frontend hire, owning architecture, tooling, component libraries, and pipelines from day one, then growing the team around them through hiring, interviewing, onboarding, and playbooks.",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              text:
                "Most of my experience is building dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming companies. I have also worked with AI since the first releases of Copilot and ChatGPT, moving from prompt and context engineering to open-source skills, agent harnesses, and automations.",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
          ],
        },
        {
          type: "skills",
          label: "Skills",
          groups: [
            {
              label: "Core stack",
              items: ["TypeScript", "React", "Next.js", "AI SDK", "Convex", "Playwright", "Vercel"],
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              label: "AI engineering",
              items: ["Agent automations", "Custom agent skills", "Harness engineering", "Codex", "Claude Code", "n8n"],
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              label: "UI and data",
              items: ["Tailwind CSS", "shadcn/ui", "Design systems", "Storybook", "Dashboards", "Data visualisation"],
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              label: "Leadership and delivery",
              items: ["Team and project management", "End-to-end product engineering", "Product design", "Agile methodologies"],
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
          ],
        },
        {
          type: "projects",
          label: "Selected work",
          items: [
            {
              name: "11io",
              url: "https://rj11.io",
              description: "Personal brand for B2B freelancing.",
              provenance: "direct",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              name: "11ai",
              url: "https://ai.rj11.io",
              description: "Open source AI skills, plugins, and workflows.",
              provenance: "direct",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
            {
              name: "11bench",
              url: "https://bench.rj11.io",
              description: "Open source AI benchmarks.",
              provenance: "direct",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
          ],
        },
        {
          type: "experience",
          label: "Experience",
          roles: [
            {
              title: "AI Product Engineer",
              company: "rj11io",
              companyUrl: "https://rj11.io",
              location: "Remote",
              dates: "Mar 2025 - Present",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up.",
                  provenance: "direct",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Delivered AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, AI chats, custom GPT experiences, and real-estate and cybersecurity products.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Built AI agent harnesses, skills, and automations, including smart-scraping workflows and personal-project maintenance agents.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
            {
              title: "Product / Datavis Engineer",
              company: "Hunt Intelligence, Inc.",
              companyUrl: "https://hunt.io",
              location: "Remote",
              dates: "Apr 2024 - Mar 2025",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Focused on threat-intelligence visualisation, including custom components such as the IP History Widget.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Built AttackCapture and HuntSQL on a modern TypeScript codebase with the latest Next.js, shadcn/ui, Playwright, GitHub Actions, and Vercel.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Shipped a friendlier API documentation site on top of OpenAPI, aimed to be clearer than Swagger.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      index: 2,
      sections: [
        {
          type: "experience",
          label: "Experience",
          roles: [
            {
              title: "Senior Frontend Engineer -> Team Lead",
              company: "OMEGA Systems",
              companyUrl: "https://omegasys.eu",
              location: "Remote",
              dates: "Jun 2023 - Apr 2024",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Built CORE5, the next generation of OMEGA's iGaming platform management system, with TypeScript and React.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Owned data visualisation for the Main and Social dashboards, plus report and configuration views.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "As lead, shaped developer onboarding, ticket standards, documentation, and remote and async workflows.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
            {
              title: "Senior Frontend Engineer",
              company: "Phantasma Chain",
              companyUrl: "https://phantasma.info",
              location: "Remote",
              dates: "Jan 2022 - May 2023",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Built the frontend monorepo for new tools and apps, plus the Phantasma UI Storybook and Phantasma Explorer.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Set up Playwright testing, GitHub Actions CI, and Vercel CD, and contributed improvements to the Phantasma TypeScript SDK.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Added in-house utilities for localisation, white-label theming, environment config, and API/scripts/hooks orchestration.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
            {
              title: "Frontend Lead",
              company: "BinaryEdge / Coalition, Inc.",
              companyUrl: "https://coalitioninc.com",
              location: "Remote",
              dates: "Feb 2020 - Oct 2021",
              provenance: "merged",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Started as the solo frontend engineer and grew a team around customer-facing security apps and internal tools.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends; led Coalition Explorer, the component library, and data visualisations.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
                {
                  text:
                    "Built Attack Surface Monitoring for the BinaryEdge Portal and later integrated it into Coalition Explorer and Coalition Control.",
                  provenance: "merged",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
            {
              title: "Earlier roles",
              company: "Glaiveware, Sycret.ink, American Heart Association, NextBitt, Science4you",
              companyUrl: "",
              location: "Lisbon, Portugal and Remote",
              dates: "2015 - 2019",
              provenance: "compressed",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
              bullets: [
                {
                  text:
                    "Co-founder at Glaiveware building bespoke web apps; React Native chat app with end-to-end encryption at Sycret.ink; full-stack dashboard work for the American Heart Association; analytics dashboards at NextBitt; Java and MySQL internship work at Science4you.",
                  provenance: "compressed",
                  sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
                },
              ],
            },
          ],
        },
        {
          type: "education",
          label: "Education",
          entries: [
            {
              title: "IT Systems Management and Programming",
              school: "Escola Profissional de Tecnologia Digital",
              dates: "2013 - 2016",
              provenance: "direct",
              sources: ["RJ_CV.pdf", "RJ_CV_max.pdf"],
            },
          ],
        },
      ],
    },
  ],
  notes: [
    "The professional history is reconciled from both PDFs. The minified CV establishes the senior summary, current roles, and compact earlier-role line; the max CV supplies the richer bullets, remote/B2B context, and extra project surfaces.",
    "Fun facts from the max CV were intentionally omitted from the print CV because they do not improve recruiter scan efficiency and would displace work history on a two-page limit.",
    "The separate Modern Github and Legacy Github project entries from the max CV were also omitted from the rendered CV to keep the public-work section focused on current portfolio properties that better support the target role.",
    "No metrics or new achievements were invented. All rewritten bullets preserve the original claims while tightening the prose for scanability.",
  ],
}
