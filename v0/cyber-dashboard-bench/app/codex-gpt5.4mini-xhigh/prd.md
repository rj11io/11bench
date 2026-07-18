# Product Requirements Document

## Product Thesis

Exposure Desk is a weekly exposure-management workspace for security teams that need to turn scanner, cloud, identity, SaaS, and CMDB signals into a prioritized, auditable remediation plan.

It is not a scanner and not a SIEM. It is the decision layer between those systems and the people who must fix the risk.

## Category and Positioning

- Category: exposure management / CTEM-inspired operational workspace.
- Positioning: the fastest way to convert noisy findings into a business-ranked remediation plan with ownership, evidence, and status history.
- Differentiated promise: in one weekly review, a security manager can see what matters, explain why it matters, assign it, and record the decision trail.

## Primary and Secondary Users

### Primary user

- Vulnerability/exposure manager or security operations manager.

### Secondary users

- CISO or risk owner.
- Remediation owners in cloud, identity, endpoint, appsec, and network teams.
- GRC/compliance users who need exception history and evidence.

### Jobs To Be Done

- Decide which exposures get attention this week.
- Explain why an item is prioritized over the rest.
- Assign the right owner and due date.
- Track whether remediation is progressing or the risk is being accepted.
- Produce a clean brief for leadership and audit.

## Pain Points

- Scanner output is too noisy to manage in spreadsheets.
- CVSS alone does not explain business impact.
- Ownership is missing or ambiguous.
- Remediation handoffs are slow and hard to audit.
- Exceptions are often undocumented or stale.
- Leaders need a concise summary, not a raw findings dump.

## Buying Trigger

The product becomes urgent when any of the following happens:
- A known-exploited vulnerability lands in the environment.
- A board or audit request demands proof of remediation progress.
- Multiple security tools produce conflicting risk views.
- Critical items are repeatedly deferred because no owner is clear.
- The team is spending more time curating dashboards than closing risk.

## Scope

### In scope

- Prioritized weekly exposure queue.
- Surface and lens filters.
- Explainable risk scoring.
- Owner assignment and status changes.
- Collaboration notes.
- Accepted-risk and resolved history.
- Trend and queue-mix analytics.
- Leadership-friendly summary state.

### Out of scope

- Scanning, exploit research, or detection generation.
- Live ticketing or workflow engine replacement in the demo.
- SOAR/SIEM incident response orchestration.
- Full RBAC admin console in the demo.
- Live authentication, paid API integrations, or external credentials.

## Core Workflows

1. Open the weekly review and see the posture summary.
2. Filter to critical, due-soon, unowned, accepted, or resolved items.
3. Inspect an item’s evidence, attack path, and risk drivers.
4. Reassign ownership or update status.
5. Add a collaboration note.
6. Copy or export a briefing for leadership.

## Functional Requirements

### Queue and prioritization

- The workspace must sort exposures by priority, risk, due date, or owner.
- The workspace must support search across asset, owner, business unit, source, and tags.
- The workspace must expose at least four lenses: critical, due soon, unowned, accepted, resolved.

Acceptance criteria:
- A user can narrow the queue to a specific risk lens in one click.
- The visible queue updates immediately when the user changes filters.

### Detail and explainability

- Each selected exposure must show risk score, score drivers, evidence, attack path, and recommended actions.
- Each item must show current owner and status.
- Accepted risk and resolved items must remain visible in history.

Acceptance criteria:
- The user can answer “why is this prioritized?” from the detail panel without leaving the page.
- The user can see the evidence behind the score, not just the score itself.

### Collaboration and remediation

- Users must be able to change status, reassign owner, and add notes.
- The workspace must maintain a local audit trail for each item.
- A copyable briefing summary must be available for the selected exposure.

Acceptance criteria:
- State changes persist on reload for the session.
- New notes appear in the activity log for the selected item.
- The selected item remains clearly highlighted in the queue.

### Analytics

- Show the queue mix by status.
- Show a trend line for exposure pressure over time.
- Show a lifecycle/funnel view from discovery to mobilization.

Acceptance criteria:
- The user can read the dashboard as a management summary at a glance.
- The analytics are readable on desktop and mobile.

## Information Model

### Core entities

- Asset
- Exposure
- Owner
- Source feed
- Risk driver
- Evidence item
- Attack path step
- Note
- Status transition
- Exception / accepted risk

### Example data relationships

- One asset can have many exposures.
- One exposure can have many evidence items, notes, and timeline entries.
- One exposure has one current owner and one current status.
- A source feed can contribute findings to many exposures.

### Integration assumptions

- Scanner feeds: Tenable, Qualys, Microsoft, CrowdStrike, or similar.
- Cloud exposure feeds: Wiz or similar CNAPP/exposure tool.
- Identity context: Entra or equivalent identity directory.
- CMDB: ServiceNow or equivalent asset ownership system.
- Ticketing: Jira or ServiceNow for future roadmap.

## Security, Privacy, Permissions, Auditability, Trust

- Role-based access is required.
- The UI must not display raw secrets, exploit payloads, or credentials.
- Every status change should be auditable.
- Every accepted-risk decision should include owner, rationale, and expiry.
- Evidence must be source-tagged so users can trust where a finding came from.
- Exports should be restricted to appropriate roles.
- The product should default to least-privilege access and clear provenance.

## Onboarding, Activation, Retention, and Success Metrics

### Onboarding

- Connect at least one exposure source.
- Map owners to business units.
- Set the default review lens and due-date policy.
- Generate the first prioritized queue.

### Activation

A workspace is activated when all of the following happen:
- At least one exposure source is ingested.
- At least one exposure is assigned to an owner.
- At least one status change or note is recorded.

### Retention

- Weekly active review rate.
- Repeat note creation and owner assignment.
- Reopened item rate.
- Expiry compliance on accepted risks.

### Success metrics

- Time to first owned exposure.
- Percent of active exposures with an owner.
- Percent of critical items due within SLA.
- Median time to move an exposure from open to planned.
- Remediation throughput per week.
- Reduction in accepted-risk backlog.

## Packaging, Pricing, and Launch Motion

### Pricing hypothesis

- Offer a team package priced by asset band or active exposure volume.
- Add enterprise tiers for multiple business units, audit exports, and advanced role views.
- Keep the wedge narrow enough to land before expanding into broader exposure management workflows.

### Launch motion

- Lead with a demo of the weekly remediation meeting.
- Sell to security leadership and vulnerability managers first.
- Expand to IT, appsec, and identity owners after the queue proves useful.

### GTM narrative

“Make the weekly vulnerability meeting decisive.”

Support the narrative with three proof points:
- Fewer items in the queue.
- Better ownership coverage.
- Faster movement from open to planned to resolved.

## Risks, Dependencies, Unknowns, and Roadmap

### Risks

- Risk scoring may not be trusted if the rationale is opaque.
- Ownership mapping can be wrong when CMDB data is stale.
- Too many filters can recreate the same overwhelm the product is meant to solve.

### Dependencies

- Asset ownership data.
- Source feed normalization.
- Remediation workflow integration.
- Exception expiry policies.

### Unknowns

- Exact weighting for exploitability versus business impact.
- Whether the first customer expects vulnerability-only or broader exposure coverage.
- The best default lens for a new workspace.

### Post-demo roadmap

1. Saved views and scheduled reports.
2. Ticket sync with Jira or ServiceNow.
3. Exception approval workflow with expiry.
4. Evidence export and immutable audit history.
5. Multi-user comments and mention notifications.
6. Attack-path graph and cross-item dependency view.
7. Permissioned executive summary and BU-level comparison.

