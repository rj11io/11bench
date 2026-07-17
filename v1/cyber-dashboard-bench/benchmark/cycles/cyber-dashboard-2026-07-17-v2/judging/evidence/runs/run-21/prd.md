# Patchline Exposure Command PRD

## Product Thesis

Patchline turns vulnerability and exposure noise into a trusted, owner-ready remediation queue. It correlates scanner findings, KEV/EPSS threat context, asset criticality, internet exposure, sensitive data, identity reachability, and ownership data so security teams can defend why an exposure is urgent and mobilize the right team.

Category: exposure mobilization for CTEM programs.

Positioning: Patchline sits between vulnerability scanners/CNAPPs and ticketing systems. It does not replace detection tools; it makes their findings actionable.

Differentiated promise: "Every top exposure includes an attack path, score rationale, owner, recommended fix, and validation requirement before it becomes a ticket."

## Users and Jobs

Primary user: vulnerability-management lead or security engineer.

Job: decide what must be fixed this week, explain priority to engineering, and track remediation without manually reconciling scanner exports.

Pains:

- Thousands of high/critical findings with weak context.
- Engineering teams reject tickets that lack proof, owner relevance, or fix detail.
- KEV or ransomware emergencies trigger spreadsheet war rooms.
- Risk acceptance is scattered across Slack, Jira, and email.

Secondary users:

- Service owner: needs concise, specific fix guidance.
- SOC manager: needs exposure context during active incidents.
- CISO: needs trend and risk-reduction evidence.

Buying trigger: critical exploited vulnerability on an internet-facing asset, audit failure around vulnerability SLAs, board pressure after a peer breach, or cyber-insurance questions about exposure management maturity.

## Scope

In scope for v1:

- Import normalized findings from vulnerability scanners and cloud posture tools.
- Enrich with KEV, EPSS, asset criticality, internet exposure, data sensitivity, identity blast radius, and owner data.
- Produce explainable exposure score.
- Provide ranked queue with filters by urgency, owner, service, exposure type, SLA, and status.
- Show evidence, attack path, recommended remediation, and validation steps.
- Create or update Jira/ServiceNow tickets with evidence attached.
- Track status, accepted risk, owner changes, comments, and audit history.
- Report operational metrics: critical open, owner coverage, SLA risk, MTTR, validation pass rate.

Non-goals:

- No endpoint detection, SIEM ingestion at full event scale, or live incident response automation.
- No autonomous patch deployment.
- No replacement for CMDB, scanner, CNAPP, or ticketing.
- No executive-only GRC dashboard as the primary experience.

## Core Workflow

1. Security lead opens the prioritized exposure queue.
2. Patchline ranks exposures by active exploitation, exploit probability, external reachability, business service criticality, sensitive data, identity path, compensating controls, and confidence.
3. User selects an exposure and reviews evidence, attack path, score drivers, and recommendation.
4. User assigns owner, adds context or exception rationale, and prepares the handoff.
5. Patchline creates/updates a ticket and tracks state through triaged, assigned, mitigated, validated, or accepted risk.
6. Metrics update to show open critical risk, owner coverage, and remediation progress.

## Functional Requirements

- The queue must show risk score, title, affected asset, owner, status, and due date.
- Selecting a queue row must reveal evidence and recommended action without navigating away.
- Risk score rationale must be visible and include at least four drivers.
- Users must be able to change owner and status.
- Users must be able to record a decision note.
- Accepted risk must remain auditable and filterable.
- Empty states must explain how to recover from over-filtering.
- Demo data must be clearly labeled as demo-only.
- State changes in the demo persist locally.

## Acceptance Criteria

- A user can identify the highest-priority exposure in less than 10 seconds.
- A user can answer "why this first?" from visible evidence without opening another tool.
- A user can assign an owner and prepare a handoff from the selected exposure.
- Mobile at 375x812 has no horizontal overflow and preserves the same workflow.
- Desktop at 1440x900 shows queue, evidence, and action controls together.
- Demo contains normal, empty, and high-attention states.

## Data Model

Core entities:

- Exposure: id, title, affected assets, service, risk score, status, due date, confidence.
- Finding: scanner source, CVE or configuration issue, severity, first/last seen.
- Asset: hostname/resource id, environment, internet exposure, owner, business service, criticality.
- Threat context: KEV, EPSS, ransomware association, exploit availability.
- Attack path: ordered relationship from attacker starting point to impacted system/data.
- Remediation: recommendation, validation check, ticket id, owner, SLA.
- Decision: note, actor, timestamp, status change, acceptance reason.

Integration assumptions:

- Scanner input from Tenable, Qualys, Rapid7, Wiz, or cloud-native posture tools.
- CMDB ownership from ServiceNow or tags.
- Ticket writeback to Jira or ServiceNow.
- Threat context from CISA KEV, FIRST EPSS, vendor advisories, and commercial threat feeds.

## Security, Privacy, Trust

- Read-only scanner imports by default.
- Ticket writeback requires scoped integration permissions.
- Role-based access: viewer, triager, owner, admin.
- All status, owner, note, ticket, and acceptance changes are audit logged.
- AI summaries, if enabled, must cite source fields and preserve raw evidence.
- Customer asset names, vulnerability details, and notes are tenant-isolated and encrypted in transit/at rest.
- Risk score versions are retained so historical decisions remain explainable.
- Product must label confidence and stale data; stale integrations lower trust and can block automated handoff.

## Onboarding and Activation

Onboarding:

1. Connect one scanner read-only.
2. Connect owner source or upload owner mapping CSV.
3. Select crown-jewel services and SLA policy.
4. Preview the top 50 exposures before ticket writeback.
5. Connect Jira/ServiceNow with limited project/table scope.

Activation event: first exposure is assigned with evidence and validation criteria, then accepted by an engineering owner.

Retention loop: weekly exposure review, KEV emergency digest, owner SLA nudges, and monthly risk-reduction report for leadership.

## Metrics and Analytics

Product metrics:

- Time from import to first owner-ready handoff.
- Percentage of top exposures with owners.
- Weekly active triagers and service owners.
- Handoff acceptance rate.
- Remediation validation pass rate.
- Risk accepted without compensating control.

Customer success metrics:

- Reduced MTTR for critical exposures.
- Reduced count of internet-facing KEV exposures.
- Reduced duplicate scanner tickets.
- Higher SLA compliance for crown-jewel services.
- Lower unowned asset percentage.

## Packaging and GTM

Packaging hypothesis:

- Team: up to 5 integrations, 5,000 assets, Jira writeback.
- Business: more assets, ServiceNow, custom scoring policy, audit exports.
- Enterprise: SSO/SAML, private threat feeds, data residency, advanced RBAC, premium support.

Pricing hypothesis: annual subscription by asset band plus premium integration tier. Start with a 30-day paid pilot around top internet-facing exposures.

Launch motion:

- Security-engineering pilot offer: "Find and mobilize your top 50 exploitable exposures in one week."
- Content-led wedge around KEV response, scanner backlog reduction, and CTEM operationalization.
- Partner with boutique security consultancies that run vulnerability-management maturity programs.

## Risks and Unknowns

- Risk scoring may be distrusted if sources or weights are opaque.
- CMDB ownership data may be stale or missing.
- Scanner normalization can consume significant engineering effort.
- Existing CNAPP vendors may expand into this workflow.
- Engineering teams may resist another queue unless Jira/ServiceNow handoff is excellent.
- Legal review needed for risk acceptance and audit-export language.

## Post-Demo Roadmap

Near term:

- Real filterable queue with source freshness and confidence.
- Jira/ServiceNow ticket preview and writeback.
- Validation checklist per exposure type.
- Owner mapping rules and exceptions.

Next:

- Custom scoring policy per business service.
- Bulk KEV emergency workflow.
- Slack/Teams owner nudges.
- Historical score and decision audit.

Later:

- Attack-path graph imports from CNAPP/identity tools.
- Control validation integrations.
- Executive risk review pack.
- Governed AI evidence synthesis with citations and approval workflow.
