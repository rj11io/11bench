# PRD

## Product

**BreakChain** is a cybersecurity exposure management dashboard for lean cloud-first security teams. It prioritizes exploited vulnerabilities, identity drift, and cloud misconfigurations by attack-path risk, then converts that priority into an auditable remediation queue.

## Thesis

Most security dashboards describe the problem. BreakChain turns the problem into a daily work queue that answers four questions:

1. What can an attacker actually reach?
2. Why is this item at the top?
3. Who owns the fix?
4. What happened after the team acted?

## Category and positioning

- Category: exposure management / security operations workflow.
- Positioning: “The remediation queue for what attackers can exploit now.”
- Differentiated promise: explainable prioritization with attack-path context, ownership, and acceptance history.

## Users

### Primary user

Security lead, exposure manager, or senior analyst at a cloud-first SaaS company with a small security team.

### Secondary users

- Platform owner responsible for patching or configuration changes.
- Identity administrator responsible for access and policy hygiene.
- IT operations lead responsible for edge appliances and endpoints.
- Executive stakeholder who needs a concise risk summary.

## Jobs to be done

### Primary JTBD

When the team is short-staffed and the queue is noisy, I need to know which exposures to fix first and why, so I can reduce breach likelihood without wasting time on low-impact items.

### Secondary JTBDs

- Assign each issue to the right owner without losing context.
- Track whether an exposure is in progress, reviewed, accepted, or resolved.
- Produce a defensible explanation for leadership or audit review.

## Pain points

- Alert fatigue from too many technical findings.
- Low trust in scores without evidence or attack-path context.
- Ownership ambiguity between security, platform, and identity teams.
- Risk acceptance buried in tickets instead of visible in the workflow.
- Time wasted reassembling context across tools.

## Buying trigger

- A known exploited vulnerability lands on an internet-facing asset.
- A board or audit request asks for exposure reduction evidence.
- The security lead has too little headcount to manually triage multiple tools.
- An incident postmortem exposes weak prioritization or missing ownership.

## Scope

### In scope

- prioritized exposure queue;
- attack-path detail view;
- remediation state machine;
- ownership and collaboration notes;
- accepted-risk audit trail;
- daily metrics for exposure reduction and SLA tracking;
- executive-friendly summary view.

### Out of scope

- live connectors or backend ingestion;
- authentication and tenant administration;
- automatic remediation execution;
- full SIEM/SOAR alert handling;
- endpoint agent management;
- vulnerability scanning engine implementation.

## Core workflows

1. Review the top queue and inspect why an exposure is ranked highly.
2. Drill into the attack path and evidence bundle.
3. Update the item status to in progress, review, accepted, or done.
4. Add a note explaining the change.
5. Keep accepted risk visible and auditable.
6. Switch to metrics to see queue health and trend movement.

## Functional requirements

### Queue

- Sort by priority score by default.
- Filter by work state, search text, and severity.
- Surface asset, owner, team, due date, evidence, and attack-path summary in the list.
- Highlight critical items and items with overdue due dates.

### Detail panel

- Show the selected exposure’s business impact, why-now rationale, controls, and fixes.
- Present attack-path context in a compact visual path.
- Allow state changes from the detail pane.
- Allow note entry and local audit trail updates.

### Collaboration and audit

- Record every state change with timestamp and reason.
- Keep accepted risks visible rather than hiding them by default.
- Support a note trail for owner feedback and validation updates.

### Metrics

- Show open exposures, critical paths, remediation SLA, and accepted risks.
- Show a trend line for exposure reduction over time.

## Acceptance criteria

- The queue renders seeded data and can be filtered and searched.
- Selecting an item updates the detail panel.
- Status changes persist through reload using localStorage.
- Notes persist through reload using localStorage.
- An empty-state view appears when the filter/search combination yields no results.
- The design works at desktop and mobile widths without broken layout or horizontal page overflow.
- The route conveys that the data is demo data only.

## Data model

### Exposure

- id
- title
- type
- asset
- team
- owner
- severity
- priorityScore
- exposureScore
- due
- status
- businessImpact
- attackPath
- whyNow
- evidence[]
- controls[]
- recommendedFixes[]
- path[]
- notes[]

### Supporting entities

- TrendPoint for risk reduction history.
- Metric for top-line KPI cards.
- Note for audit and collaboration.

## Integration assumptions

The production product would ingest:

- CISA KEV and vendor advisories;
- cloud posture and asset inventory;
- identity and privilege signals;
- EDR / endpoint coverage;
- ticketing or case management;
- executive reporting.

For the demo, all data is seeded locally and treated as illustrative only.

## Security, privacy, and trust

- Read-only by default for most users.
- RBAC should scope by team, business unit, and asset class.
- Accepted risks need mandatory reason text and review date.
- Audit history should be immutable once saved.
- Explanations should be visible so users understand why an item is prioritized.
- Demo content must not imply live detection, live remediation, or live integrations.

## Onboarding and activation

### Onboarding

- Connect data sources.
- Identify crown-jewel assets.
- Map first owners for the top backlog.
- Confirm which items can be accepted and which require patching.

### Activation event

The user reaches activation once they can triage the first high-priority exposure, assign it, and save a note or acceptance reason.

## Retention and success metrics

- First priority review completed within the first session.
- First remediation state change made within 15 minutes.
- Percentage of critical items with explicit ownership.
- Percentage of accepted risks with a reason and review date.
- Time to first remediation packet exported or shared.
- Weekly reduction in high-priority open exposures.

## Analytics

- Queue opened
- Exposure selected
- State change performed
- Note added
- Acceptance reason saved
- Briefing copied
- Filter/search used
- Metrics tab viewed

## Packaging and pricing hypothesis

- Base platform priced by protected asset band.
- Add-on for executive reporting and audit exports.
- Higher tier for attack-path analysis and risk acceptance workflow.
- Trial motion should center on the first prioritized queue review, not on raw scan volume.

## GTM motion

- Land with a security leader who needs better prioritization.
- Use a “top 10 exposures this week” review as the entry point.
- Expand to platform and identity owners once ownership mapping is in place.
- Sell the product as a way to reduce risk with fewer analysts, not as another telemetry portal.

## GTM narrative

“BreakChain shows the exposures attackers can actually chain into an incident, explains why they matter, and keeps every fix or exception auditable.”

## Risks and dependencies

- Risk scoring can lose trust if explanations are weak.
- Too broad a scope would collapse the wedge back into generic security posture management.
- Connectors are a dependency in production, but they must not block the demo thesis.
- If accepted risk is too easy, the product becomes a ticketing tool; if too hard, it becomes unusable.

## Post-demo roadmap

1. Live connector ingestion.
2. Ticket sync with Jira or ServiceNow.
3. Automatic path recalculation after validation scans.
4. Ownership inference from IAM and CMDB data.
5. Executive report export.
6. Suggested compensating controls when patching is not immediate.
7. Multi-team views and portfolio rollups.

