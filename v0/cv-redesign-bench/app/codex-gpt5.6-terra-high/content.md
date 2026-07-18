# Canonical content model

The structured render model is [`content.ts`](./content.ts), derived from this document. It is the only data source consumed by `page.tsx`; the page does not maintain a second copy of CV content. "Direct" means present in one or both frozen PDFs. "Editorial" means a non-factual rewrite, ordering, grouping, or compression of direct evidence.

## Reconciliation ledger

| Topic | Evidence | Editorial resolution / uncertainty |
| --- | --- | --- |
| Name and headline | Both PDFs: Ricardo Jorge, AI Product Engineer. | Direct. Heading retained. |
| Location and contact | Both PDFs: Lisbon, Portugal; `ricardojorgexyz@gmail.com`; `rj11.io`; `github.com/rj11io`; `linkedin.com/in/rj11io`; `cv.rj11.io`. | Direct. Website and profile strings become HTTPS links for the web CV; no extra contact fields inferred. |
| Current freelancer role | Both: AI Product Engineer at rj11io, Mar 2025 - Present. Max adds B2B / Remote and detailed project categories. | Direct facts. “Multiple early-stage startups” and “from the ground up” retained. The experience bullets combine related project categories to save space. |
| Hunt | Both: Product / Datavis Engineer, Hunt Intelligence, Apr 2024 - Mar 2025. Max details Vercel, release changelogs, Slack and enriched OpenAPI. | Direct. Short PDF’s “API platform on top of OpenAPI” reconciled with max PDF. The final wording does not claim measurable improvement. |
| OMEGA | Both: Senior Frontend Engineer → Team Lead, Jun 2023 - Apr 2024. Max confirms remote and detailed feature / leadership responsibilities. | Direct. Team-lead promotion and CORE5 are retained. “Continued to ship end-to-end features” is an editorially tightened paraphrase of direct text. |
| Phantasma | Both: Senior Frontend Engineer, Jan 2022 - May 2023. | Direct. Detailed in-house tooling is omitted for space, not denied. |
| BinaryEdge / Coalition | Both: Frontend Lead, Feb 2020 - Oct 2021. Max explains dual-company product scope and CI/CD migration. | Direct. Employer display preserves both names and `coalitioninc.com`, as in the source. |
| Earlier roles | Max PDF supplies Glaiveware, Sycret.ink, American Heart Association, NextBitt, and Science4you with dates and detail. Concise PDF lists all except Science4you in an “Earlier” sentence. | Direct. Retained as compact, date-visible ledger. No invented employer URLs. |
| Education | Both: IT Systems Management and Programming, Escola Profissional de Tecnologia Digital, 2013 - 2016. Max adds Portuguese qualification and Lisbon. | Direct. Full Portuguese qualification retained as supporting detail. |
| Projects | Concise PDF lists 11iorj11.io, 11aiai.rj11.io, 11benchbench.rj11.io without dates; max adds 2025 / 2026 - Present dates and “workflows” for 11aiai. | Direct. These are listed separately as independent work and linked only to the exact published URLs. Current-year dates are source claims, not recalculated. |
| Professional summary | Both PDFs describe a decade of TypeScript, React since 2016, Next.js since 2018, first-frontend-hire scope, dashboards/platforms/explorers, and AI work since early Copilot/ChatGPT. | Editorial summary compresses these claims and avoids the source’s informal “self-guided missile” language. “Durable” is a stylistic characterization of architecture/tooling/delivery ownership, not a performance claim. |
| Origin story | Both mention game modding/reverse engineering and second national / final-four 2008 robotics world cup result in China. | Direct, compressed into one optional note. The source uses “the 2008 robotics world cup”; its formal event name is not supplied, so none is invented. |

## Rendered copy and provenance

### Profile — editorial rewrite of direct evidence

> AI Product Engineer with a decade of professional TypeScript experience, building with React since 2016 and Next.js since 2018. I create data-rich product platforms, dashboards, and proprietary explorers - and lead the architecture, component systems, tooling, and delivery practices that make them durable.

Every technical milestone and scope in this paragraph is directly evidenced. “Data-rich” and the final sentence are compression / synthesis; neither adds an employer, metric, client, or accomplishment.

### Capabilities — direct, regrouped

The four groups in `content.ts` preserve the skill names from the PDFs, with small normalization only: `React.js` becomes `React`; `Data Visualisation (d3, Recharts, Nivo)` becomes discrete labels; “Agent Automations” becomes lower-case sentence style. The max-PDF-only Material-UI, Refactoring UI, web scraping, data enrichment, foundations, and legacy infrastructure list are omitted to keep a current, target-role-specific capability block.

### Experience — direct facts, tightened writing

`content.ts` contains the exact factual title, employer, dates, and associated supplied URL for each selected role. Bullet rules:

- Keep named products exactly as provided: AttackCapture™, HuntSQL™, CORE5, IP History Widget, Phantasma Explorer, Coalition Explorer, Attack Surface Monitoring.
- Begin with scope or action, not an invented outcome.
- Combine source bullets only when they concern the same system or practice.
- Do not add headcount, revenue, adoption, performance, customers, degree names, or dates not present in the PDFs.

### Omissions and compression required by the two-page limit

- Long personal narrative about gaming, clan leadership, AI chronology, availability, and sign-off is compressed to a single origin note or omitted; it is personality-rich but lower priority for an initial senior-engineering scan.
- The role-by-role technology inventories are represented by the capability block plus the most diagnostic technologies in role bullets.
- Hunt release changelogs / Slack, OMEGA weekly “TED” talks and many named views, Phantasma in-house utilities, detailed BinaryEdge project list, and Glaiveware’s infrastructure / marketing list are omitted for density.
- The project descriptions are one line each. Legacy GitHub is omitted because the current GitHub link is more useful, while its 2020–2023 existence remains source evidence.
- The source’s only direct language is English. No language proficiency, work authorization, phone number, photo, or portfolio claims are inferred.

## Uncertainties intentionally preserved

- `rj11io` / `rj11.io` is rendered exactly as provided; the PDFs do not state a registered employer name or legal structure.
- “Present” is preserved as a source date state rather than converted into a date calculated from the current day.
- `11aiai.rj11.io` and `11benchbench.rj11.io` have 2026 start dates in the max PDF, despite the concise PDF omitting dates; the max PDF is used for these direct dates.
- The supplied employer sites are rendered as HTTPS web links for usability. The PDFs show domain strings but do not explicitly state URL protocol or whether every historic domain remains live.

## Content-to-code contract

`content.ts` is the structured, canonical derivative of this document. `page.tsx` imports `cv` and maps roles, skills, earlier experience, and projects directly. A change to rendered prose must be made in this document and then reflected in `content.ts`; a separate hardcoded content copy in the JSX is prohibited and absent.
