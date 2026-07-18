# PRD

## Product thesis

Build a **risk-first exposure command center** for lean security teams that need to reduce attack surface faster than their scanner backlogs grow.

The product does not try to replace scanners, SIEM, or ITSM. It sits above them, deduplicates findings, ranks exposures by exploitability and business impact, and turns the top items into structured remediation work.

## Category

Exposure management with a security-operations workflow layer.

## Positioning

**“From findings to fixed.”**  
This dashboard converts raw exposure data into a prioritized, explainable remediation queue that security and IT can act on together.

## Differentiated promise

1. Prioritization is grounded in exploitability, internet exposure, asset criticality, and compensating controls.
2. Each item explains why it is ranked, not just how severe it is.
3. Every exposure can be turned into an owned remediation task, exception, or accepted risk.
4. Execs get trend and SLA visibility; operators get drill-down and workflow.

## Primary user

**Vulnerability / exposure manager** at a mid-market or enterprise organization with a lean security team.

### Jobs to be done

- Decide what must be fixed this week.
- Explain the ranking to security leadership and IT owners.
- Assign ownership and due dates.
- Prove progress and reduce the backlog.

### Main pains

- Scanner noise and duplicates.
- CVSS-only prioritization that misorders work.
- Little confidence in which findings are actually exploitable.
- Cross-functional handoff friction.
- Difficulty showing progress and risk reduction.

## Secondary users

- **CISO / security director**: needs a board-ready risk story.
- **SOC analyst / SecOps lead**: needs a reliable way to validate and route high-risk exposures.
- **IT remediation owner**: needs concise, actionable tasks and less back-and-forth.

## Buying trigger

- A spike in KEV-backed vulnerabilities, external exposure, or audit pressure.
- A team drowning in scanner output.
- A desire to unify vulnerability response across tools and teams.

## Scope

### In scope for this product

- Unified prioritized exposure queue.
- Risk explanation and asset context.
- Ownership assignment and remediation task creation.
- Exception / accept-risk tracking.
- Portfolio views for executives.
- Trend and SLA reporting.
- Demo-ready persistence with seeded data and local state changes.

### Non-goals

- Live integrations.
- Autonomous remediation.
- Full vulnerability scanner replacement.
- Generic SIEM ingestion and alert correlation.
- Threat hunting workflow.
- Deep packet / endpoint forensic analysis.

## Core workflows

### 1. Review the exposure queue

Users land on the dashboard, see top priorities, and inspect the ranked queue.

### 2. Understand why an item is ranked

Users open a finding to inspect:

- exploitability signals,
- exposure and asset criticality,
- affected software,
- attack path,
- compensating controls,
- ownership and remediation recommendation.

### 3. Assign remediation work

Users choose a playbook:

- patch now,
- isolate / mitigate,
- rotate / revoke,
- exception / defer.

They assign an owner, due date, and status.

### 4. Track progress and exceptions

Users follow the remediation pipeline by state and aging, then review accepted risk and overdue items.

## Functional requirements

1. The dashboard must show a prioritized queue of demo exposures sorted by a risk score with explainability badges.
2. Users must be able to filter by environment, domain, status, and priority.
3. Selecting a row must reveal a contextual detail panel with attack-path reasoning and recommended action.
4. Users must be able to assign an owner, set a due date, and change remediation status.
5. Changes must persist in `localStorage` for the demo session.
6. The UI must include empty, normal, and high-attention states.
7. The interface must work at desktop and mobile widths without horizontal overflow.

## Acceptance criteria

- The route presents a coherent exposure-management product, not a generic dashboard.
- The top-level summary, queue, and detail workflow are connected.
- Risk ranking changes when filters or statuses change.
- A user can mark items acknowledged, snoozed, in progress, resolved, or accepted risk.
- Persistence survives reload.
- The demo communicates clearly that data is simulated.

## Information model

### Entities

- **Asset**: id, hostname, environment, owner team, criticality, internet exposure, business service.
- **Exposure**: id, title, category, source, severity, KEV flag, exploitability, status, due date, owner, control coverage, affected assets.
- **Finding source**: scanner or telemetry feed that contributed evidence.
- **Playbook**: recommended remediation path.
- **Task**: the action created from a prioritized exposure.
- **Exception**: time-boxed or permanent accepted risk.

### Data assumptions

- Multiple scanners feed the system.
- Records may be duplicated across sources and normalized into one exposure.
- Business context comes from a CMDB or equivalent asset inventory.
- KEV and exploit intelligence can be joined from external feeds.
- Ownership may be inferred from service mapping but is editable.

## Integrations assumption

This demo assumes connectors to:

- vulnerability scanners,
- cloud posture tools,
- CMDB / service catalog,
- ITSM or task management,
- threat intelligence / KEV feed.

## Security, privacy, permissions, auditability, trust

- Role-based access should separate executive read-only views from analyst remediation rights.
- Every state change should log who changed what and when.
- Risk explanations must show the evidence behind the score.
- Accepted risk and overrides should require a reason and expiry date.
- Exported views should redact sensitive asset detail where permissions require it.
- The product must visually distinguish demo data from real operational state.

## Onboarding and activation

### Activation path

1. Connect scanners and CMDB.
2. Import owners and service criticality.
3. Review initial deduped queue.
4. Approve one remediation workflow.
5. Assign first batch of critical exposures.

### Retention drivers

- Daily review of high-risk queue.
- Weekly remediation standup.
- Monthly risk trend review with leadership.
- Audit-ready exception history.

## Success metrics

- Reduction in duplicate findings shown to users.
- Time to first remediation assignment.
- Percentage of critical exposures with owner and due date.
- Median time to resolve KEV-tagged exposures.
- Share of queue with clear business owner.
- Overdue exposure trend.

## Analytics

- Queue opened, filtered, sorted, and assigned.
- Finding detail viewed.
- Playbook selected.
- Exception created.
- Reminder / snooze used.
- Status transitions and overdue rate.

## Packaging and pricing hypothesis

- Sell as an enterprise SaaS module layered onto existing scanner / SecOps stack.
- Price by asset count or managed exposure volume, with tiers for advanced prioritization and workflow automation.
- Lead with a 30-60 day pilot on a limited set of high-risk asset groups.

## Launch motion

- Sales-led launch with a pilot-first motion.
- Target teams with multiple scanners and visible remediation backlog.
- Demo narrative: “We reduce the queue to the exposures that are actually dangerous, then we push those into action.”

## Risks

- If prioritization is not credible, the product becomes another dashboard.
- If ownership mapping is weak, remediation stalls.
- If exception handling is too loose, the score loses trust.
- If the product depends on too much integration data, activation slows.

## Dependencies

- Scanner integrations.
- CMDB/service mapping.
- Threat intel / KEV enrichment.
- Ticketing or workflow handoff.

## Unknowns

- Best default risk formula by customer segment.
- How much of the workflow should be automated vs. human-approved.
- Which remediation templates best accelerate first value in different sectors.

## Post-demo roadmap

1. Add real-source ingestion and deduplication rules.
2. Add attack-path graph exploration.
3. Add team-level SLA policies and escalation.
4. Add executive reports and board exports.
5. Add exception approvals and review cadence.
6. Add automation for ticket creation and closure sync.

