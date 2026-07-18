# Content Model

Structured rendering source of truth: [`content.ts`](./content.ts)

This markdown file is the canonical editorial record. The route renders from `content.ts`, which is the structured derivative of the decisions documented here.

## Source evidence used

- `ref/RJ_CV.pdf`
  Status: primary compressed baseline
  Notes: reliable for final two-page prioritization, cleaner summary of what the candidate already considered essential.

- `ref/RJ_CV_max.pdf`
  Status: expanded evidence set
  Notes: used to recover missing project dates, fuller role detail, older experience, and the longer self-description.

## Directly extracted facts retained

- Identity and contact
  - Name: Ricardo Jorge
  - Current title used in both PDFs: AI Product Engineer
  - Location: Lisbon, Portugal
  - Email: ricardojorgexyz@gmail.com
  - Links: rj11.io, github.com/rj11io, linkedin.com/in/rj11io, cv.rj11.io

- Career timeline
  - AI Product Engineer, rj11io, Mar 2025 - Present
  - Product / Datavis Engineer, Hunt Intelligence, Inc., Apr 2024 - Mar 2025
  - Senior Frontend Engineer -> Team Lead, OMEGA Systems, Jun 2023 - Apr 2024
  - Senior Frontend Engineer, Phantasma Chain, Jan 2022 - May 2023
  - Frontend Lead, BinaryEdge / Coalition, Inc., Feb 2020 - Oct 2021
  - Fullstack Engineer, Co-Founder, Glaiveware, Mar 2018 - Dec 2019
  - React Native Developer, Sycret.ink, Jan 2017 - Dec 2017
  - Full Stack JavaScript Developer, American Heart Association, Sep 2016 - Nov 2016
  - Frontend Developer, NextBitt, Oct 2015 - Jul 2016
  - Java Developer, Science4you, Jan 2015 - Mar 2015

- Skills and technology claims
  - React since 2016
  - Next.js since 2018
  - Repeated first-frontend-hire pattern
  - Experience with TypeScript, Playwright, Vercel, design systems, Storybook, dashboards, data visualisation, Codex, Claude Code, and n8n

- Project and open-source links
  - 11io / rj11.io, 2025 - Present
  - 11ai / ai.rj11.io, 2026 - Present
  - 11bench / bench.rj11.io, 2026 - Present
  - Modern GitHub / github.com/rj11io, 2023 - Present
  - Legacy GitHub / github.com/ricardojrmcom, 2020 - 2023

- Education
  - IT Systems Management and Programming
  - Escola Profissional de Tecnologia Digital
  - 2013 - 2016
  - Tecnico de Gestao e Programacao de Sistemas Informaticos

## Editorial inferences and rewrites

- Summary compression
  - Rewrite: "Professional history spans 2015-2026, with React work since 2016 and Next.js work since 2018."
  - Why this is inference: the PDFs do not phrase the full date span this way, but the dates are explicit and the rewrite is a factual condensation.

- Positioning statement
  - Rewrite: "Frontend systems, data-rich products, and agent workflows for startups that need senior hands-on delivery."
  - Why this is inference: it synthesizes repeated themes from the work history and skills sections rather than quoting either PDF.

- Focus categories
  - Categories such as "AI product delivery", "Data interface craft", "Frontend systems", and "Team enablement" are editorial grouping devices.
  - Why this is inference: the source material lists skills and bullets separately; these groupings reorganize the same facts to improve scanning.

- Bullet rewrites
  - Recent roles are rewritten into tighter action/result statements without inventing outcomes or metrics.
  - Example: Hunt's role now emphasizes threat-intelligence visualisation, named modules, and the OpenAPI documentation platform in one three-bullet block assembled from both PDFs.

## Reconciliation decisions

- `RJ_CV.pdf` vs `RJ_CV_max.pdf`
  - Decision: treat `RJ_CV.pdf` as the candidate's own compression signal and `RJ_CV_max.pdf` as the source for missing detail.
  - Effect: the final route stays closer to the tightness of the two-page CV while borrowing specificity from the six-page version.

- OMEGA role naming
  - Source forms: concise PDF uses "Senior Frontend Engineer -> Team Lead"; max PDF says promoted to lead the frontend team.
  - Decision: keep the promoted-title formulation because both sources support the progression.

- BinaryEdge / Coalition naming
  - Source forms: concise PDF compresses company naming; max PDF explains the relationship more fully.
  - Decision: render "BinaryEdge / Coalition, Inc." to preserve both names cleanly in limited space.

- GitHub presence
  - Source forms: only the extended PDF lists Modern GitHub and Legacy GitHub as project entries.
  - Decision: keep both because they provide useful hiring signal for an AI/open-source profile.

## Omissions and compression choices

- Omitted from the rendered route
  - The longer autobiographical narrative about childhood modding, competitive gaming, and "self-guided missile" framing.
  - The sign-off copy from `RJ_CV_max.pdf` ("I'm always open..." / "Have a nice day!").
  - The Modern GitHub and Legacy GitHub rows as standalone page-two entries. The main GitHub profile is still rendered in the contact links.
  - Several lower-priority technology sublists such as jQuery, Angular.js, Bootstrap 4, Sass, MongoDB, Firebase, MySQL, SQLite, and some AWS service-level detail.
  - Some OMEGA specifics such as cashback, refer-a-friend, pending withdrawals, weekly talks, and the internal "Tab System" naming.
  - Some BinaryEdge specifics such as claims management, report generation, RSA pages, and Security Week pages.
  - The "fun facts" section as a standalone section.

- Why these were omitted
  - The two-page limit rewards recent, role-relevant evidence more than personal backstory or exhaustive tooling history.
  - Older-stack detail is still represented indirectly through the earlier-roles summaries without crowding out current AI/frontend signal.
  - The stand-alone fun-facts section was lower priority than preserving named employers, dates, recent shipped work, and open-source links.

## Uncertainties and caution flags

- `RJ_CV_max.pdf` includes the phrase "AI Smart Scrapping Agents and n8n Workflows".
  - Uncertainty: this looks like a typo for "scraping", but correcting it silently would be editorial overreach.
  - Resolution: the rendered route references agent harnesses and n8n automations without reusing the disputed phrase.

- The shorthand project names `11io`, `11ai`, and `11bench`
  - Uncertainty: the branding shorthand is visible in the PDFs, but the long-form naming context is minimal.
  - Resolution: keep the shorthand plus the actual domain names and plain-English descriptions.

- No phone number appears in either PDF.
  - Resolution: none is added.

## Rendering model actually used

- Page 1
  - Identity, contact links, summary, signal cards, focus areas, and the four most recent roles.

- Page 2
  - BinaryEdge detail, three core project links, capability groups, condensed earlier roles, and education.

- Intent
  - Page 1 handles the skim.
  - Page 2 preserves continuity and technical breadth without letting older material dominate.
