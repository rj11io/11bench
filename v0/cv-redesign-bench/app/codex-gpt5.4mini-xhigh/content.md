# Canonical Content Model

## Direct extraction and reconciliation

| Field | `RJ_CV.pdf` | `RJ_CV_max.pdf` | Final decision |
| --- | --- | --- | --- |
| Name / headline / location / contact links | Present in both | Present in both | Preserve exactly |
| Summary | Short, facts-first, compact | Longer narrative with childhood, gaming, and more personality | Use the shared factual core and rewrite it for scanability |
| Skills | 4 grouped skill areas | 5 grouped skill areas, with more detail | Merge into 5 compact groups so the body stays current but readable |
| Projects | 3 personal projects | Same 3 projects plus GitHub history | Keep the 3 projects in the body; omit GitHub history from the main render |
| Experience | Recent roles and a short earlier-history line | Same recent roles plus expanded bullets and older roles | Show the 5 most relevant roles in detail, then compress the older history |
| Education | Present | Present | Preserve exactly |
| Fun facts | Present | Not present | Omit from the final CV body |

## Canonical render data

```json
{
  "identity": {
    "name": "Ricardo Jorge",
    "headline": "AI Product Engineer",
    "location": "Lisbon, Portugal",
    "email": {
      "label": "ricardojorgexyz@gmail.com",
      "href": "mailto:ricardojorgexyz@gmail.com"
    },
    "links": [
      {
        "label": "rj11.io",
        "href": "https://rj11.io"
      },
      {
        "label": "github.com/rj11io",
        "href": "https://github.com/rj11io"
      },
      {
        "label": "linkedin.com/in/rj11io",
        "href": "https://www.linkedin.com/in/rj11io"
      }
    ],
    "portfolio": {
      "label": "cv.rj11.io",
      "href": "https://cv.rj11.io"
    }
  },
  "pages": [
    {
      "id": "page-1",
      "sections": [
        {
          "kind": "summary",
          "label": "Summary",
          "paragraphs": [
            "AI Product Engineer with a decade of TypeScript experience, building on React since 2016 and Next.js since 2018. I was often the first frontend hire, owning architecture, tooling, component libraries, and delivery pipelines, then helping grow the team through hiring, onboarding, and playbooks.",
            "Most of my work has been dashboards, product platforms, and proprietary data explorers for cybersecurity, crypto, and gaming. I have built with AI since Copilot and ChatGPT, moving from prompt and context engineering to agent skills, harnesses, and automations."
          ]
        },
        {
          "kind": "skills",
          "label": "Skills",
          "groups": [
            {
              "label": "Core Stack",
              "items": [
                "TypeScript",
                "React.js",
                "Next.js",
                "Node.js",
                "Playwright",
                "Vercel"
              ]
            },
            {
              "label": "AI Engineering",
              "items": [
                "AI SDK",
                "Codex",
                "Claude Code",
                "n8n",
                "skills/plugins",
                "automations"
              ]
            },
            {
              "label": "UI & Data",
              "items": [
                "Tailwind CSS",
                "shadcn/ui",
                "Storybook",
                "d3",
                "Recharts",
                "Nivo"
              ]
            },
            {
              "label": "Delivery",
              "items": [
                "Design systems",
                "CI/CD",
                "Testing",
                "Onboarding",
                "Product Design",
                "Project management"
              ]
            },
            {
              "label": "Foundations",
              "items": [
                "JavaScript",
                "HTML5",
                "CSS",
                "Git",
                "GitHub Actions",
                "REST APIs",
                "CI/CD",
                "Testing"
              ]
            }
          ]
        },
        {
          "kind": "projects",
          "label": "Projects",
          "items": [
            {
              "name": "11io",
              "url": "https://rj11.io",
              "meta": "2025 - Present",
              "description": "B2B freelancing brand."
            },
            {
              "name": "11ai",
              "url": "https://ai.rj11.io",
              "meta": "2026 - Present",
              "description": "Open source AI skills, plugins, and workflows."
            },
            {
              "name": "11bench",
              "url": "https://bench.rj11.io",
              "meta": "2026 - Present",
              "description": "Open source AI benchmarks."
            }
          ]
        },
        {
          "kind": "roles",
          "label": "Recent experience",
          "items": [
            {
              "title": "AI Product Engineer",
              "company": "rj11io",
              "site": "rj11.io",
              "siteUrl": "https://rj11.io",
              "dates": "Mar 2025 - Present",
              "meta": ["B2B", "Remote"],
              "summary": "Hands-on AI product work for early-stage startups, from problem framing to shipping.",
              "highlights": [
                "AI data extraction from PDFs, AI SEO analytics, a GenAI dermatopathology portal, AI chats, and custom GPT experiences.",
                "Cybersecurity dashboards, proprietary data explorers, and agent harnesses, skills, and automations."
              ]
            },
            {
              "title": "Product / Datavis Engineer",
              "company": "Hunt Intelligence, Inc.",
              "site": "hunt.io",
              "siteUrl": "https://hunt.io",
              "dates": "Apr 2024 - Mar 2025",
              "meta": ["B2B", "Remote"],
              "summary": "Built data visualisation for a threat-intelligence product and modernised the stack around it.",
              "highlights": [
                "Custom data-viz components such as the IP History Widget.",
                "Latest Next.js and shadcn/ui, Vercel staging/prod, Playwright, GitHub Actions, Slack release notes, and an OpenAPI docs platform friendlier than Swagger."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "page-2",
      "sections": [
        {
          "kind": "roles",
          "label": "Leadership experience",
          "items": [
            {
              "title": "Senior Frontend Engineer -> Team Lead",
              "company": "OMEGA Systems",
              "site": "omegasys.eu",
              "siteUrl": "https://www.omegasys.eu",
              "dates": "Jun 2023 - Apr 2024",
              "meta": ["Remote"],
              "summary": "Built the next generation of CORE5 with TypeScript and React, then led the frontend team.",
              "highlights": [
                "Main and Social dashboards, report/config views, localisation/i18n, an internal Tab System UI, and New Developer onboarding standards."
              ]
            },
            {
              "title": "Senior Frontend Engineer",
              "company": "Phantasma Chain",
              "site": "phantasma.info",
              "siteUrl": "https://phantasma.info",
              "dates": "Jan 2022 - May 2023",
              "meta": ["Remote"],
              "summary": "Built the frontend monorepo for the new tools and apps.",
              "highlights": [
                "Storybook, Explorer, Playwright, GitHub Actions, Vercel, SDK improvements, and in-house tools for localisation, white-label theming, environment configs, and API/scripts/hooks."
              ]
            },
            {
              "title": "Frontend Lead",
              "company": "BinaryEdge",
              "site": "Coalition, Inc.",
              "siteUrl": "https://www.coalitioninc.com",
              "dates": "Feb 2020 - Oct 2021",
              "meta": ["Remote"],
              "summary": "Started solo and grew the frontend team for customer-facing security apps and internal tools.",
              "highlights": [
                "Introduced React, TypeScript, Next.js, Material-UI, Nivo, and micro frontends while leading Coalition Explorer, Explorer 2.0, claims management, report generation, security review, Executive Risks, Storybook, the component library, and Attack Surface Monitoring."
              ]
            }
          ]
        },
        {
          "kind": "compactRoles",
          "label": "Earlier experience",
          "items": [
            {
              "title": "Fullstack Engineer, Co-founder",
              "company": "Glaiveware",
              "dates": "Mar 2018 - Dec 2019",
              "meta": ["Lisbon, Portugal", "Remote"],
              "summary": "Built bespoke web apps with React, Redux, Redux-Saga, Next.js, Node.js, and Express while also handling SEO/SEM, branding, marketing, advertising, copywriting, and content management."
            },
            {
              "title": "React Native Developer",
              "company": "Sycret.ink",
              "dates": "Jan 2017 - Dec 2017",
              "meta": ["Neuchatel, Switzerland", "Remote"],
              "summary": "Built an end-to-end encrypted mobile chat app in a serverless environment with a team of three, using React Native, libsignal-protocol, Android Studio, AWS API Gateway/Lambda, and SQLite."
            },
            {
              "title": "Full Stack JavaScript Developer",
              "company": "American Heart Association",
              "dates": "Sep 2016 - Nov 2016",
              "meta": ["Remote"],
              "summary": "Built an admin dashboard for the Kinect integration that connected users, doctors, patients, printed reports, and superuser workflows; it was my first full-stack JavaScript app, using React and Node."
            },
            {
              "title": "Frontend Developer",
              "company": "NextBitt",
              "dates": "Oct 2015 - Jul 2016",
              "meta": ["Lisbon, Portugal"],
              "summary": "Built analytics dashboards and reporting, auditing, and management tools for asset and facilities software, with heavy date/time logic and data visualisation."
            },
            {
              "title": "Java Developer",
              "company": "Science4you",
              "dates": "Jan 2015 - Mar 2015",
              "meta": ["Lisbon, Portugal"],
              "summary": "Built an online store management system with Java and MySQL that evolved from a display-and-print tool into a full application managing orders, printing detailed reports, and sending automated emails to customers."
            }
          ]
        },
        {
          "kind": "education",
          "label": "Education",
          "items": [
            {
              "title": "IT Systems Management and Programming",
              "school": "Escola Profissional de Tecnologia Digital",
              "location": "Lisbon, Portugal",
              "dates": "2013 - 2016",
              "detail": "Técnico de Gestão e Programação de Sistemas Informáticos"
            }
          ]
        }
      ]
    }
  ],
  "notes": {
    "omissions": [
      "The fun-facts section from RJ_CV.pdf is omitted because it adds personality but not hiring signal, and the two-page limit is tighter than the source PDFs.",
      "The Modern GitHub and Legacy GitHub entries from RJ_CV_max.pdf are omitted from the main render because the header GitHub link already carries that signal.",
      "Low-signal early-role detail such as full database and infrastructure lists, weekly TED-talk commentary, and the self-guided-missile prose from the max PDF are compressed away."
    ],
    "uncertainties": [
      "The project labels in the PDFs visually read as 11io, 11ai, and 11bench with their corresponding domains, but raw text extraction can fuse the label and URL together. The final render follows the visual reading.",
      "The source uses rj11io as the practice/company label. The PDFs do not clarify whether that is a formal entity or a freelance brand, so the render preserves the label exactly instead of inferring a legal structure.",
      "The short PDF links to cv.rj11.io/v1/max as the full story. That link is treated as a pointer to the long version, not as a career claim."
    ]
  }
}
```
