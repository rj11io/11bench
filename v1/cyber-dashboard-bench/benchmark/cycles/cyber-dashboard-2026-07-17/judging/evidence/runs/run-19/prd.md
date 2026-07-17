# PRD: BreachPath Command

## Product Thesis

Security teams do not need another dashboard that counts alerts. They need a defensible way to decide which exposures to fix now, explain the decision to infrastructure and application owners, and prove that risk was reduced.

**BreachPath Command** is an exposure-remediation dashboard for lean cloud and security engineering teams. It converts scanner, cloud, identity, threat-intel, and business-context signals into ranked fix packages with transparent reasoning, owner routing, and an auditable decision receipt.

## Category And Positioning

Category:

- Primary: Exposure remediation command center.
- Adjacent: Exposure management, UVM, CTEM, vulnerability risk management, SecOps workflow.

Positioning statement:

For security engineering teams drowning in vulnerability, cloud, and identity findings, BreachPath Command ranks the few fix packages most likely to reduce breach paths this week and gives every owner the context to act. Unlike broad exposure platforms that emphasize visibility, BreachPath Command makes prioritization explainable and remediation accountable.

Differentiated promise:

- Every ranked item answers: "Why this, why now, who owns it, what changes, and what evidence proves closure?"

## Users

Primary user:

- Security engineering lead / vulnerability management lead.
- Jobs: prioritize the weekly fix queue, explain risk, coordinate owners, keep SLA evidence, report progress.
- Pains: scanner noise, CVSS-only prioritization, owner disputes, vague tickets, stale exceptions, board pressure.

Secondary users:

- Cloud/platform owner: needs clear fix steps, blast radius, and safe rollout context.
- Application owner: needs service impact and exact dependency/context.
- CISO/security director: needs trend and risk-reduction evidence.
- GRC/audit stakeholder: needs policy-aligned decisions and audit history.

Buying trigger:

- Recent exploited vulnerability scramble.
- Missed patch SLA or audit finding.
- New cloud or identity incident.
- Tool sprawl/cost review.
- Cyber insurance or board demand for measurable risk reduction.

## Scope

In scope for MVP:

- Import normalized demo-like data from vulnerability scanners, cloud posture tools, identity sources, CMDB/business-service tags, threat intel, and ITSM.
- Correlate findings into fix packages.
- Rank by transparent decision logic inspired by KEV, EPSS, CVSS, exposure, asset criticality, blast radius, owner, and fix effort.
- Show attack path and choke-point reasoning.
- Assign owner, create fix brief, update status, risk accept with expiry, and record notes.
- Track risk burndown, owner load, age, SLA, and decision receipts.
- Export or sync remediation evidence to ITSM/GRC in production.

Non-goals:

- Replace SIEM, EDR, scanner, CNAPP, or ITSM systems.
- Perform live exploit testing in the MVP.
- Auto-patch production systems without human approval.
- Claim fake demo data is live.
- Provide compliance attestation by itself.

## Core Workflows

1. Triage the weekly queue
   - User opens dashboard.
   - Reviews top fix packages and high-attention states.
   - Filters by immediate, assigned, fixed, or search.
   - Selects an exposure.

2. Understand why it is ranked
   - User reviews score drivers, attack path, blast radius, source freshness, and recommended action.
   - Product shows a concise decision receipt.

3. Route the fix
   - User selects owner.
   - Creates fix brief with summary, asset path, technical fix, validation plan, and due date.
   - Status persists.

4. Close or govern risk
   - Owner remediates and marks fixed after verification, or security accepts risk with expiry and compensating control.
   - Dashboard updates risk debt, queue status, and audit trail.

5. Report progress
   - User reviews burndown, MTTR forecast, owner load, and exception risk.
   - Exports evidence in production roadmap.

## Functional Requirements

- FR1: Display ranked fix packages with priority, score, owner, due date, risk delta, and workflow status.
- FR2: Selection updates detail, attack path, evidence, recommended action, and workflow controls.
- FR3: Ranking explanation must show all material input signals.
- FR4: User can assign owner from allowed owners.
- FR5: User can create a fix brief and persist state locally in the demo.
- FR6: User can mark an exposure fixed and see risk debt reduce.
- FR7: User can risk accept an exposure and see it leave immediate work while retaining visible exception state.
- FR8: User can add a note and retain it in localStorage.
- FR9: Dashboard includes normal, high-attention, and empty states.
- FR10: Demo clearly labels all data as seeded demo data.
- FR11: Route works at `/codex-gpt5.5-xhigh`.
- FR12: Route remains usable at 1440x900 and 375x812 without horizontal overflow.

## Acceptance Criteria

- Selecting a queue item changes the details and action panel.
- Assigning owner, creating fix brief, marking fixed, risk accepting, and editing notes persist after refresh.
- Fixed items reduce open risk debt in top metrics.
- Empty state appears when search/filter has no matching packages.
- High-attention state appears for Immediate items due within 72 hours or KEV-driven exposures.
- No external API, credentials, backend, or paid service required.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- Browser console has no route errors in a smoke test.

## Data Model

Core entities:

- ExposurePackage
  - id, rank, title, summary, businessService, environment, priority, workflowStatus
  - score, riskDelta, dueDate, lastSeen, confidence
  - recommendedFix, validationPlan, compensatingControl
  - owner, ownerOptions
  - signals: KEV, EPSS, CVSS, externalExposure, assetCriticality, pathCount, chokePoint, identityReach
  - blastRadius: services, assets, identities, records
  - path nodes and edge labels
  - evidence source freshness
  - audit events

- Owner
  - name, team, load, openRisk, preferredSystem

- DecisionReceipt
  - exposureId, actionTier, signals, explanation, actor, timestamp, status changes, notes, exception expiry.

Assumed production integrations:

- Vulnerability scanners: Tenable, Qualys, Rapid7, Defender Vulnerability Management.
- Cloud/CNAPP: Wiz, Defender for Cloud, Prisma Cloud, AWS Security Hub.
- Identity: Entra ID, Okta, Active Directory, IAM analyzer data.
- Asset/business context: CMDB, tags, service catalog, ownership registry.
- Threat intel: CISA KEV, FIRST EPSS, vendor intel, internal exploit observations.
- Workflow: Jira, ServiceNow, Slack/Teams, email.

## Security, Privacy, Permissions, Trust

Security requirements:

- SSO/SAML/OIDC and SCIM in enterprise.
- RBAC for viewer, analyst, remediation owner, risk approver, admin.
- Least-privilege integrations with read-only defaults; write permissions scoped to ticket creation/status sync.
- Secrets stored in managed vault, never exposed client-side.
- Tenant isolation and encryption in transit/at rest.
- Audit log for ranking inputs, assignment, status changes, risk acceptance, exports, and integration actions.
- No silent auto-remediation in MVP.
- Explicit demo/live data labeling.

Privacy requirements:

- Minimize personal data. User and owner identity is limited to work identity and role.
- Redact secrets and sensitive record samples in UI and exported briefs.
- Configurable retention for evidence and audit artifacts.

Trust requirements:

- Every score must have visible factors and timestamps.
- Data freshness shown per source.
- Confidence lowered when required data is stale or missing.
- Risk acceptance requires owner, reason, expiry, and compensating control.

## Onboarding And Activation

Onboarding:

1. Connect scanner and cloud source.
2. Import asset ownership from CMDB or tags.
3. Connect threat intel feeds.
4. Connect ticketing.
5. Define critical services and SLA policy.
6. Review first ranked fix queue.

Activation moment:

- User creates the first owner-ready fix brief for a top exposure and sees a measurable projected risk reduction.

Retention drivers:

- Weekly remediation review.
- SLA and exception reminders.
- Executive risk burndown export.
- ITSM feedback loop showing what actually closed.
- Decision receipts for audits and incident reviews.

## Metrics And Analytics

Product success metrics:

- Time from ingestion to first fix brief.
- Percent of top-10 fix packages assigned within 24 hours.
- Net risk reduction per week.
- Mean time to remediate Immediate packages.
- Reopened exposure rate.
- Exception expiry compliance.
- Owner dispute rate.
- Source freshness coverage.
- Weekly active security and owner users.

Business metrics:

- Activation rate after first connector.
- Trial-to-paid conversion.
- Expansion by asset count/integration count.
- Gross retention and net revenue retention.
- Support tickets per integration.

## Packaging And Pricing Hypothesis

Team:

- Up to 5,000 assets, 3 integrations, Jira sync, standard ranking model.
- Priced by protected asset tier.

Business:

- Up to 25,000 assets, 8 integrations, Jira/ServiceNow, SSO, custom SLA policy, executive report.

Enterprise:

- Unlimited scale, custom decision models, advanced RBAC, audit exports, data residency, private deployment options, premium support.

## Launch Motion And GTM Narrative

Initial beachhead:

- Cloud-heavy companies with existing scanners and a small security engineering team.
- Sell to security engineering director and CISO; expand through platform teams.

Launch narrative:

- "Your scanners found thousands of issues. BreachPath tells you which fixes collapse the most realistic breach paths this week, gives owners the right context, and keeps proof."

Channels:

- Practitioner content on KEV/EPSS/SSVC-based triage.
- Incident-retrospective templates.
- Cloud security and vulnerability management communities.
- Partner integrations with Jira, ServiceNow, and scanner marketplaces.

## Risks And Unknowns

- Data quality: ownership and asset criticality are often stale.
- Ranking trust: users may reject scoring if logic is unclear.
- Integration complexity: ITSM and scanner schemas vary.
- Liability: product must not overclaim exploitability or risk reduction.
- Workflow adoption: owners may live in Jira/ServiceNow, not the dashboard.
- Competitive pressure from CNAPP and exposure platforms.

Mitigations:

- Start with transparent factors and editable policies.
- Show confidence and missing inputs.
- Meet owners in existing ticketing tools.
- Keep remediation suggestions human-reviewed.
- Build exportable decision receipts.

## Post-Demo Roadmap

0-3 months:

- Jira/ServiceNow sync.
- CISA KEV and EPSS ingestion.
- Asset tag and CMDB import.
- Custom SLA policy.
- CSV/API import for scanner data.

3-6 months:

- Bidirectional ticket status.
- Exception governance.
- Executive reporting.
- Role-based views.
- Ranking policy simulator.

6-12 months:

- Attack-path validation integrations.
- Detection telemetry enrichment.
- Safe remediation playbooks with approval gates.
- Multi-tenant MSP mode.
- Historical decision replay for audit and incident review.

