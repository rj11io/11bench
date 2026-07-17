# Breakline PRD

## 1. Product thesis

### Product name

**Breakline**

### Category

**Exposure management / attack-path remediation**

### Thesis

Security teams are overwhelmed by siloed findings, severity inflation, and unclear ownership. Breakline replaces flat lists of issues with a small, prioritized queue of attack paths that lead to meaningful assets, shows the fewest choke points that break those paths, and keeps ownership visible until risk is measurably reduced.

### Differentiated promise

**Break the chain, not the analyst.**

Breakline does not promise “complete visibility.” It promises:

- a defensible shortlist of attack paths,
- explainable prioritization,
- explicit ownership,
- and visible intermediate progress through **chain prevented** states.

## 2. Positioning

### For

- mid-market and upper-mid-market hybrid organizations
- security teams with 3-20 practitioners
- environments spread across endpoint, identity, cloud, CI/CD, and external attack surface tools

### Unlike

- generic SIEM dashboards,
- flat vulnerability backlogs,
- and broad posture tools that stop at issue inventory,

### Breakline

- packages risk around **attack paths**,
- ranks by **business impact + validation + choke-point leverage**,
- and provides a remediation workspace designed for cross-functional follow-through.

## 3. Users

### Primary user

**Exposure Management Lead / Security Engineer**

Jobs to be done:

- decide what to work first
- explain why it matters
- hand off actions to owning teams
- prove risk is falling before every ticket is fully closed

Pains:

- too many disconnected findings
- no confidence that a “critical” item is truly urgent
- ownership ambiguity across cloud, identity, endpoint, and app teams
- hard to communicate progress to leadership

### Secondary users

**SecOps Manager / Security Architect**

Jobs to be done:

- review queue quality
- watch owner bottlenecks
- understand crown-jewel exposure trends

**Leadership / CISO**

Jobs to be done:

- understand whether exposure work is reducing meaningful business risk
- see whether accountability is improving

## 4. Buying trigger

Breakline is bought when an organization has:

- too many scanners or disconnected finding sources,
- an expanding “critical” backlog,
- repeated escalations about stale ownership,
- or leadership asking why risk is not visibly shrinking despite continuous triage.

## 5. Scope

### In scope for v1 and the demo

- prioritized list of seeded attack paths
- selected-path detail workspace
- compact path visualization
- exploit and business-context explanation
- editable remediation plan with owner and status controls
- path status derived from step state
- persistent operator notes
- filters for environment, scope, crown-jewel focus, and search
- portfolio summary of owner pressure and domain mix

### Explicit non-goals

- live telemetry ingestion
- real authentication or role enforcement
- SOAR execution
- ticket creation in Jira or ServiceNow
- raw graph exploration of the entire environment
- full incident response or alert-case workflow

## 6. Core workflows

### Workflow A: Daily prioritization

1. User opens Breakline.
2. User sees portfolio stats and a ranked queue of attack paths.
3. User narrows by environment, crown-jewel focus, or search.
4. User selects the most urgent path and reviews the “why this wins attention” rationale.

Acceptance criteria:

- the queue sorts to a plausible high-priority order
- filters update results immediately
- empty state is handled clearly

### Workflow B: Path review and explanation

1. User inspects the path visualization.
2. User reads validation, blast radius, and evidence bullets.
3. User confirms whether the top fix is credible.

Acceptance criteria:

- the path structure is readable on desktop and mobile
- the explanation is plain-language, not just score output
- critical paths visibly differ from routine ones

### Workflow C: Remediation coordination

1. User edits owner assignment for a remediation step.
2. User changes step status.
3. Path status updates automatically.
4. Notes persist across refresh.

Acceptance criteria:

- step status and owner changes persist with `localStorage`
- path status updates without page reload
- derived states include `Open`, `In progress`, `In review`, `Chain prevented`, `Accepted`, and `Resolved`

### Workflow D: Progress communication

1. User reviews owner pressure and exposure mix.
2. User references the operator brief and recent activity.
3. User uses the derived status to explain progress to stakeholders.

Acceptance criteria:

- portfolio components reflect edited state
- closed work remains auditable
- chain-prevented work remains distinct from fully closed work

## 7. Functional requirements

### Queue and filtering

- The system must show a ranked queue of attack paths.
- Each path must display priority, derived status, summary, environment, and key scores.
- Users must be able to search by title, asset, or service.
- Users must be able to filter by environment and scope.
- Users must be able to toggle crown-jewel-only view.

### Path detail

- The system must show title, narrative, target asset, blast radius, entry point, and last-updated metadata.
- The system must show a compact attack path map.
- The system must show evidence bullets and a plain-language executive summary.

### Remediation workspace

- The system must expose editable remediation steps.
- Each step must include owner, due date, domain, risk-cut estimate, and status.
- Path status must be derived from step state.
- Users must be able to trigger meaningful state changes quickly with CTA buttons.

### Persistence

- UI state and edited remediation state must persist locally in the browser.
- Reset must restore seeded demo data.

### Trust and auditability

- The product must clearly label data as demo data.
- Closed paths must remain available under broader filters.
- An activity/timeline section must exist for the selected path.

## 8. Path status model

- `Open`: all steps still to do
- `In progress`: at least one step in progress, none done or accepted
- `In review`: at least one step in review, none done or accepted
- `Chain prevented`: at least one step done, but path not fully closed
- `Accepted`: risk accepted or compensated where no done step supersedes it
- `Resolved`: all steps done

This status model is core to the product thesis and not incidental UI language.

## 9. Data model assumptions

### Primary entities

- Attack path
- Remediation step
- Asset / node in the path
- Owner team
- Critical asset flag
- Evidence / validation claim
- Operator note
- Activity event

### Key attack-path attributes

- ID
- title and summary
- priority
- business service
- target asset
- entry point
- environment
- crown-jewel boolean
- exposure score
- validation score
- sibling path count
- steps
- explanation / narrative

### Integration assumptions for a real product

- CMDB or asset ownership source
- IAM / identity graph
- vulnerability and external exposure scanners
- cloud posture data
- endpoint inventory
- ticketing system for downstream workflow

The demo does not implement these integrations, but the data model assumes them.

## 10. Security, privacy, permissions, and trust requirements

- Demo must visibly indicate that all content is seeded and not live security telemetry.
- Product must support least-privilege editing in production; for demo, permissions are represented conceptually.
- Path explanations must avoid false precision and show why the recommendation exists.
- Operator notes must persist only in browser local storage for demo purposes.
- Auditability requires that resolved paths remain reviewable.

## 11. Onboarding, activation, and retention

### Onboarding hypothesis

The fastest activation path is to ingest a few signal sources, identify crown jewels, and map ownership well enough to generate a first ranked queue.

### Activation moment

The user sees that one fix can collapse multiple attack paths to a critical asset and can immediately assign the owner without exporting data elsewhere.

### Retention loop

Users return because Breakline becomes the daily queue for:

- exposure review,
- owner follow-up,
- and evidence-backed progress reporting.

## 12. Success metrics

### Product metrics

- weekly active security practitioners
- percent of open paths with confident owner mapping
- median time from detection to owner assignment
- median time to first chain-preventing action
- percent of crown-jewel paths addressed within SLA

### Demo success metrics

- route feels coherent and product-like
- status changes are meaningful
- state persists after refresh
- empty, normal, and high-attention states are visible

## 13. Analytics events

- `queue_filtered`
- `path_selected`
- `step_owner_changed`
- `step_status_changed`
- `path_note_updated`
- `quick_action_used`
- `demo_reset`

## 14. Packaging and pricing hypothesis

### Starter

- up to a defined asset / identity footprint
- core attack-path queue
- ownership and note workflow

### Growth

- broader connectors
- richer ownership mapping
- SLA reporting and executive rollups

### Enterprise

- advanced connector breadth
- policy controls
- ticketing and collaboration integrations
- custom scoring and governance workflows

Pricing should align to asset and identity graph scale, not seat-heavy procurement.

## 15. Launch motion and GTM narrative

### Narrative

- Stop patching by spreadsheet.
- Stop measuring progress only by backlog size.
- Break the smallest number of attack paths that reach the assets the business actually cares about.

### Initial motion

- sell to security engineering / vulnerability leadership
- expand upward into security architecture and CISO reporting
- expand sideways into platform teams through ownership workflows

### Why this narrative is credible

- it aligns with current exposure-management category language
- it focuses on operational pain rather than abstract “single pane of glass” claims
- it avoids pretending to replace SIEM, CNAPP, and ITSM all at once

## 16. Risks, dependencies, and unknowns

### Risks

- “Exposure management” is becoming crowded; positioning must stay narrow.
- Without clean ownership data, prioritization loses credibility.
- A graph-heavy product can become visually noisy if it stops being workflow-first.

### Dependencies

- accurate critical asset tagging
- enough source data to validate paths
- a path-ranking model that users can explain to others

### Unknowns

- how much automation buyers want before human approval
- whether users prefer issue-centric or team-centric queue defaults
- what minimum connector set wins mid-market deployments fastest

## 17. Post-demo roadmap

### Next 1-2 releases

- owner-confidence scoring
- Jira / ServiceNow export
- saved views and team-specific worklists
- path comments and approval mentions

### Later roadmap

- change-risk preview before remediation
- SLA and trend reporting by business service
- exploit and compensating-control validation depth
- guided onboarding for crown-jewel tagging

## 18. Demo build requirements traceability

- Coherent thesis: yes, attack-path operations
- Meaningful interactions: yes, filters, selection, status edits, owner edits, notes, quick actions
- Persistence: yes, local storage
- Empty state: yes, filterable queue with no-result state
- High-attention state: yes, critical banner
- Mobile and desktop: required in implementation
