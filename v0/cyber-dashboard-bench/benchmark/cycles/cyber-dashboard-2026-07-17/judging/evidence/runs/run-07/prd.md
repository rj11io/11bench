# PRD: Clearline Exposure Desk

**Status:** Demo-ready product definition  
**Category:** Exposure management / risk-based vulnerability remediation  
**Primary user:** Security lead or vulnerability-management engineer at a 500–2,500 person SaaS or digital business  
**Product thesis:** Security teams do not need another wall of findings. They need a trusted, explainable queue of the few exposures worth engineering time now, with an owner and evidence that the fix held.

## Product thesis and positioning

Clearline is a lightweight operating layer between existing security telemetry and engineering execution. It ingests findings, enriches them with threat and asset context, presents a repeatable priority recipe, routes the work to an accountable owner, and closes the loop with verification evidence.

**Differentiated promise:** “Give me the five actions that reduce the most real exposure this week—and show me why, who owns them, and how we know they are closed.”

Clearline is not a scanner, SIEM, EDR, ticketing system, or fully autonomous remediation engine. It is the remediation decision layer for a lean team that already has tools but lacks a consistent, explainable way to turn findings into verified action.

## Users, jobs, pains, and buying trigger

### Primary user: security lead / vulnerability manager

Jobs to be done:

- Decide what to fix first when scanner findings exceed available engineering capacity.
- Explain priority to an engineering owner and a security leader using evidence, not intuition.
- Track exceptions, compensating controls, and due dates without losing the original reasoning.
- Prove that remediation reduced exposure after a patch or mitigation.

Pains:

- CVSS-only queues over-prioritize theoretical severity and underweight reachability and business impact.
- Findings arrive with incomplete ownership and inconsistent asset context.
- Ticketing creates a task but not a shared understanding of risk.
- “Closed” often means a human changed a field, not that a scan or control verified the fix.

### Secondary user: engineering owner

Jobs to be done:

- See exactly which assets and services are in scope.
- Understand why the work is urgent and what safe remediation path is recommended.
- Claim or hand off the work without returning to security for basic context.
- Submit evidence or request an exception when a fix is unsafe or unavailable.

### Buying trigger

The trigger is usually a new scanner or cloud-security deployment that increases finding volume, a KEV / active exploitation event, an audit or customer-assurance request, or a security lead who must show measurable risk reduction without adding headcount.

## Scope

### MVP / demo scope

1. Import or seed normalized vulnerability observations from a scanner.
2. Map observations to assets, environments, business criticality, exposure, owners, and source freshness.
3. Calculate an explainable local priority using explicit factors: exploitation signal, public reachability, asset criticality, technical impact, age / SLA, and compensating controls.
4. Present a bounded action queue with filters for environment, owner, due status, and triage state.
5. Open an action detail view with rationale, affected scope, remediation options, ticket link placeholder, and activity history.
6. Assign an owner, create a workstream/ticket placeholder, move work through triage → assigned → fixing → awaiting verification → verified.
7. Capture a verification note and timestamp; show verified risk reduction in the dashboard.
8. Persist local demo state so a reviewer can interact with the core workflow.

### Non-goals

- Running a vulnerability scan or making a real patch change.
- Replacing a SIEM, incident-response case system, or ITSM platform.
- Automatically changing production infrastructure.
- Claiming live threat intelligence, live integrations, or production compliance evidence in the demo.
- Building a generic CISO dashboard with every framework and security metric.

## Core workflows and acceptance criteria

### Workflow A: Start-of-day prioritization

1. User lands on Exposure desk.
2. User sees demo status, source freshness, and an active exploit banner if applicable.
3. User scans the top action queue and understands why the first item is urgent from inline tags and score factors.
4. User filters to `Unassigned`, `My queue`, or `Verification due` without losing context.

Acceptance criteria:

- The first screen shows urgent exposure, top actions, unassigned work, and verification due.
- Each action row includes severity, exploit signal, asset / service, owner, due state, and action status.
- Filter state is visible and filter results are textually announced to assistive technology.

### Workflow B: Explain and route one action

1. User opens an action.
2. User sees the priority recipe: exploit signal, exposure, asset criticality, impact, and control coverage.
3. User sees the affected assets, recommended fix / mitigation, due date, source, and last-seen evidence.
4. User assigns an owner or creates a workstream placeholder.

Acceptance criteria:

- “Why this ranks here” is visible without a second product or external tab.
- Every factor has a human-readable label and source/freshness where relevant.
- Assigning an owner visibly updates the queue and persists on refresh.
- Creating a workstream increments activity and communicates that the link is demo-only.

### Workflow C: Close with proof

1. Owner moves the action to `Fix in progress`.
2. User records a verification note or selects `Awaiting verification`.
3. User clicks `Mark verified` only after the demo shows a verification source / note.
4. Dashboard risk-reduction summary updates and the activity log records the event.

Acceptance criteria:

- State transitions are constrained to a clear sequence and displayed in the detail panel.
- Verified actions no longer appear in the open queue but remain visible in the activity / summary state.
- The dashboard’s verified risk-reduction indicator changes after verification.
- A reset action restores the deterministic demo seed.

## Information and data model

### Finding / exposure

```text
Exposure {
  id, title, cve, source, sourceFreshness,
  severity, cvssBase, localPriority, ssvcOutcome,
  exploitSignal, kev, epssBand,
  assetId, assetName, environment, internetReachable,
  businessCriticality, dataClass, technicalImpact,
  ownerId, ownerName, ownerTeam,
  status, dueDate, discoveredAt, lastSeenAt,
  remediationOptions[], ticketRef?, verification?, activity[]
}
```

### Asset

```text
Asset {
  id, name, service, environment, ownerTeam,
  businessCriticality, dataClass, internetReachable,
  lastInventorySync, tags[]
}
```

### Workstream / verification

```text
Workstream { id, title, ownerId, exposureIds[], ticketRef?, status, createdAt }
Verification { method, evidenceNote, observedAt, reviewer, result }
```

### Integration assumptions

Initial connectors should be read-only and least-privilege: one VM scanner (Tenable, Rapid7, or Microsoft export), one cloud / asset inventory, and one ticketing system. Imports must be idempotent, preserve source IDs, record source freshness, and fail visibly when a source is stale. Ownership can initially be mapped from CMDB, cloud tags, directory groups, or a CSV override.

## Prioritization model and trust

Clearline does not imply that a single score is “truth.” The priority recipe is deterministic and inspectable:

1. **Exploit signal:** CISA KEV, confirmed activity, public PoC, or unknown.
2. **Exposure:** internet reachable, privileged path, or internal-only.
3. **Asset context:** business criticality, data sensitivity, customer-facing or control-plane role.
4. **Technical impact:** confidentiality, integrity, availability, and automatable / remote execution signals.
5. **Time pressure:** due date, age, SLA, and active campaign.
6. **Controls:** compensating control presence lowers urgency but never silently removes the issue.

The product must display factor provenance and last refresh. Any recommendation generated by a model must be labeled as a suggestion, expose the underlying inputs, and require a human to accept the decision. A human can override the outcome only with a reason, actor, timestamp, and review date.

## Security, privacy, permissions, auditability

- Tenant isolation is mandatory in production; the demo has no backend and contains no customer data.
- Use SSO / SCIM and role-based permissions in production: Admin, Security operator, Engineering owner, Read-only / executive.
- Default integrations to read-only. Separate permission scopes for importing, assigning, editing risk context, creating tickets, and marking verified.
- Encrypt data in transit and at rest; store secrets in a managed secret store, never in source or local storage.
- Minimize asset detail and sensitive data; field-level redaction for secrets, credentials, personal data, and customer identifiers.
- Append-only activity log records changes to priority inputs, owner, status, due date, exception reason, and verification evidence.
- Retain source identifiers and snapshots for reproducibility; show source freshness and import errors.
- In the demo, a persistent banner states that all records are seeded demo data and no action changes real infrastructure.

## Onboarding, activation, retention, and analytics

### Onboarding

1. Choose environment and business-critical asset classes.
2. Connect a read-only source or upload a normalized sample.
3. Map owners from a simple directory / tag mapping.
4. Confirm the priority policy: KEV + reachability + criticality + due date.
5. Review the first “Top 10 actions” and accept / adjust the rationale.

### Activation moment

The first session is activated when the user accepts a top action, assigns an owner, creates a workstream, and records a verification plan. This is more meaningful than merely connecting an integration.

### Retention loop

Weekly exposure review → owner handoff → remediation / mitigation → verification → risk-reduction report → updated policy / ownership mappings.

### Success metrics

- Time from first import to first assigned action: < 30 minutes.
- Median time to assign: < 1 business day.
- % of open KEV exposures with an owner and due date: > 95%.
- Median time from claimed fix to verification: < 2 business days.
- Verified priority exposure reduced per weekly review.
- % of action rows with complete rationale and source freshness.
- Weekly active security operators and engineering owners who open or update a workstream.

### Analytics events

`source_connected`, `import_completed`, `queue_filtered`, `exposure_opened`, `owner_assigned`, `workstream_created`, `status_changed`, `verification_submitted`, `verification_accepted`, `exception_requested`, `report_shared`.

## Packaging, pricing, and GTM hypothesis

### Packaging hypothesis

- **Starter:** $1,500/month for one environment, one source, 5 seats, weekly report, 1,000 assets.
- **Team:** $3,500/month for three sources, 25 seats, owner mapping, ticketing, verification evidence, and policy controls.
- **Scale:** custom pricing for multiple tenants, SSO/SCIM, retention, audit exports, API, and customer success.

Pricing should be based on managed assets / active exposures and team workflow value, not raw finding count, to avoid incentivizing noisy imports.

### Launch motion

Land with a scanner export and a “Top 10 exposure review” delivered within one working session. The champion is the security lead; the proof is a scoped engineering queue and a before/after verification report. Use content around KEV operations, CVSS context, and remediation evidence, then expand to cloud and ticketing integrations.

### GTM narrative

“You already bought the scanners. Clearline makes the output executable.” The narrative connects security and engineering: less noise for security, fewer mystery tickets for engineering, and a risk-reduction story leadership can defend.

## Risks, dependencies, unknowns

### Risks

- Source data quality and stale asset ownership undermine trust.
- “Explainable” prioritization can still be wrong when business criticality is misclassified.
- Integration breadth can turn a focused product into another platform.
- Security teams may resist a new queue if their existing ITSM system is the required system of record.
- Marking verified without a robust evidence contract can create false assurance.

### Dependencies

- Scanner export / API schemas and rate limits.
- Asset inventory or CMDB ownership data.
- CISA KEV and threat intelligence freshness.
- Ticketing APIs, SSO, directory groups, and customer data-processing agreements.

### Unknowns to validate

- Is “verified risk reduction” a strong enough buying outcome to displace spreadsheets and dashboards?
- Which initial scanner / cloud combination gives the fastest time to value?
- Will engineering prefer ticket creation, pull-request suggestions, or a shared workstream view?
- How much local policy tuning is required before the queue is trusted?

## Post-demo roadmap

1. **Pilot:** CSV/API ingestion, owner mapping, policy editor, Jira/ServiceNow link, immutable audit export.
2. **Production foundation:** tenant isolation, SSO/SCIM, RBAC, source health, retries, evidence retention, and policy versioning.
3. **Context expansion:** cloud asset graph, identity privilege, EDR exploitation signals, and VEX / package reachability.
4. **Execution:** change windows, maintenance approvals, pull-request / infrastructure-as-code suggestions, and safe remediation playbooks.
5. **Program layer:** portfolio reporting, exception review, benchmarked SLA policies, and MSSP multi-tenant workflows.
