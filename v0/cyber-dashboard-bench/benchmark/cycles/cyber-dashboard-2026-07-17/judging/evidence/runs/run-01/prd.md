# Harbor — product requirements document

**Status:** demo-ready product definition · **Date:** 2026-07-16 · **Category:** exposure remediation operations

## Thesis, positioning, and differentiated promise

Cloud security products are good at producing evidence of exposure and increasingly good at modeling attack paths. Lean security teams still lose time translating a path into a decision that an engineering owner will accept and complete. **Harbor turns each verified, business-relevant exposure path into an explainable remediation commitment.**

Harbor is the operating layer for vulnerability and cloud-exposure remediation at cloud SaaS companies. It ingests credible paths from existing security systems, applies transparent business context, proposes the smallest interruption, and makes every path have an owner, deadline, decision history, and verification record.

It is positioned as “the path-to-owner workspace,” not a replacement scanner, CNAPP, SIEM, ticket tracker, or incident-response platform. Its differentiated promise is: **from evidence to a named, verified path interruption in one decision packet.**

## Users, jobs, and triggers

| User | Job to be done | Primary pain |
| --- | --- | --- |
| Security generalist / vulnerability lead (primary) | Decide which exposures deserve immediate attention; obtain and verify a remediation commitment. | Thousands of decontextualized findings, uncertain exploitability, owner hunting, weak closure evidence. |
| Platform/SRE or application owner | Understand the request, execute the smallest safe change, and surface blocks. | Security asks are vague, interruptive, and lack service context or acceptance criteria. |
| Engineering manager / service owner | Keep service risk and commitments visible without security-console expertise. | No trusted view of commitments, deadlines, exceptions, and verified outcomes. |
| CISO / CTO (economic buyer) | Demonstrate that material attack routes are governed and improving. | Posture scores and ticket counts cannot prove accountability or priority. |

**Buying trigger:** a KEV-driven escalation, customer/board risk review, enterprise questionnaire, cyber-insurance renewal, or repeat discovery of unattended “critical” findings. Initial ICP: 200–2,000 employee B2B SaaS firms on AWS with Entra/Okta, Jira or Linear, and an existing cloud/security telemetry source.

## Scope and non-goals

### MVP scope

- Ingest finding/path, asset, service-catalog, identity, and ticket metadata from selected connectors.
- Normalize one path into a decision packet: entry point, transitions, crown-jewel target, evidence, source freshness, path confidence, signal reasons, and recommended interruption.
- Provide a triage queue, filterable by lane, service, state, owner, deadline, and source.
- Let authorized users acknowledge, assign/reassign, set a target date, choose a remediation or compensating-control plan, add a note, mark blocked, request an exception, and mark ready for verification.
- Sync linked ticket state where supported; maintain the Harbor commitment even if ticket sync is delayed.
- Verify outcome from a new connector observation or reviewer-supplied evidence; retain immutable decision/audit events.
- Provide a service-level and executive summary of urgent paths, ownership, aging, and verified interruptions.

### Non-goals

- Asset discovery, vulnerability scanning, network scanning, incident containment, EDR response, or full attack-graph computation.
- Replacing Jira/Linear, cloud IAM, CMDB, SIEM, CNAPP, VM, or GRC.
- Autonomously patching assets or making production configuration changes.
- Claiming that every imported path is an imminent attack or that a score is an objective measure of risk.

## Core workflow and acceptance criteria

### Workflow: triage a path to an owned interruption

1. An analyst opens the urgent queue and selects a path.
2. Harbor shows why it was prioritized: source evidence, path route, exploit signal, reachable asset, service tier, confidence, assumptions, and source freshness.
3. The analyst chooses the recommended interruption or a documented alternative, assigns a service owner, sets a deadline, and adds an instruction/note; Harbor optionally creates or links a ticket.
4. The owner acknowledges, moves the plan through active/blocked/ready-to-verify, and attaches evidence or a reason for an exception.
5. A security reviewer verifies that a fresh observation no longer supports the route, or records a time-bounded compensating control and expiry.

| Requirement | Acceptance criteria |
| --- | --- |
| Explainable triage | Selecting any path shows source, last observed time, path nodes, affected assets, path confidence, evidence signals, and a human-readable “why now” summary. No path is prioritized solely by a severity word. |
| Assignment | An Analyst or Security Lead can select an owner and due date. The current owner, status, due date, linked ticket, and acknowledgement are visible in the queue and inspector. Assignment creates an audit event and a notification. |
| Remediation plan | An owner can choose Patch, IAM hardening, Network isolation, or Compensating control and record step text. The plan displays whether it blocks the entry, transition, or target and its estimated blast-radius effect. |
| Blocking and exception | An owner can mark blocked with a reason. A Security Lead can create an exception with scope, compensating control, approver, and mandatory expiry; expired exceptions return to urgent review. |
| Verification | Only a Security Reviewer/Lead can verify. Closure requires fresh source evidence or a manually-attached verification artifact; the event log retains the old and new state. |
| Queue operations | Filters never silently hide urgent work: applied filter count and matching row count are visible. Empty filter state offers “clear filters”; true no-work state says there are no verified urgent paths. |
| Demo behavior | The frontend labels all seeded inputs as “Demo workspace / simulated data.” Assignment, plan status, selected item, and filters work without backend credentials and persist locally. |

## Information and integration model

**Core entities:**

- **ExposurePath:** ID, organization, state, priority lane, confidence, first/last observed, source, entry node, ordered path edges, target service, target criticality, affected assets, primary finding(s), recommendation, risk factors, SLA, and linked commitment.
- **Finding/Evidence:** source record ID, CVE/configuration/identity issue, CVSS (if supplied), KEV flag, EPSS value/as-of, reachability evidence, scanner timestamp, source URL/deep link, raw snapshot hash, and normalized confidence.
- **Asset:** provider resource/device, owner team, environment, public-reachability label, tags, and asset/service relation.
- **Service:** service ID, business criticality, data classification, owner group, on-call alias, dependency graph reference, and crown-jewel designation approval.
- **Commitment:** owner, contributor(s), plan type, plan text, target date, status, ticket link, acknowledgement, blocker, exception, evidence, verifier, and outcome.
- **DecisionEvent:** timestamp, actor, action, before/after fields, rationale, attachment hash, and connector correlation ID.

**Integration assumptions:** initial read-only connectors are AWS Security Hub / Inspector (or selected CNAPP), a service catalog (Backstage, OpsLevel, or CSV), identity context, and Jira/Linear. KEV and EPSS are enrichment inputs. Connector imports are idempotent, source snapshots are retained, and UI displays source freshness. Path computation may be supplied by a connected exposure product; Harbor does not assume it can infer all network paths itself.

## Security, privacy, permissions, and trust

- Tenant isolation, SSO (SAML/OIDC), SCIM provisioning, MFA through the identity provider, least-privilege OAuth scopes, encrypted transport and storage, key rotation, and regional data-residency options are production requirements.
- Store only necessary security metadata; redact secrets, tokens, packet contents, and sensitive personal data before persistence. Enforce retention policy and configurable export/deletion.
- RBAC: Viewer (read), Contributor/Owner (update owned commitments), Analyst (triage/assign), Security Lead (policy, exception, verification), Admin (integrations/RBAC). Service ownership can constrain assignment scope.
- All priority inputs, source times, data gaps, human overrides, plan choices, exceptions, and verification events must be auditable, exportable, and immutable to ordinary users.
- Scores and recommendations carry their provenance, assumptions, confidence, and last refresh. The product clearly labels a **potential** path; it makes no live-attack or automatic-remediation claim.
- Connector outages and stale confidence suppress automation, surface a warning, and avoid silently declaring a path resolved.

## Onboarding, activation, retention, and analytics

**Onboarding:** connect one source read-only; map 10–25 critical services and owners; select policy defaults; import the first 25 candidate paths; run a 45-minute triage with security and platform leads.

**Activation event:** within 14 days, the customer assigns an owner and a target date to at least five verified paths, and verifies at least one path interruption using connector evidence.

**Retention loop:** a daily owner queue, time-bounded commitments, expired-exception review, weekly security/service review, and a monthly executive evidence export make Harbor habit-forming without spam.

**Product metrics:** time-to-owner; percent of urgent paths acknowledged within 24 hours; time to first risk-reducing action; verified path-interruption rate; overdue commitment rate; exception-expiry rate; source freshness; weekly active triagers and owners; activation and 90-day retained workspace rate. Measure click-through and completion for each stage, never track sensitive evidence content in generic product analytics.

## Packaging, launch, and GTM

**Packaging hypothesis:** a 30-day guided “Path-to-owner” pilot is priced by protected production service tier with a base platform fee, including a limited number of connectors and 25 high-priority paths/month. Growth adds workflow/ticketing connectors, custom policies, and more services. Enterprise adds SCIM, audit export, data residency, and premium support. Avoid pricing on raw findings, which rewards noise.

**Launch motion:** founder-led/field-led design partners from lean cloud SaaS teams; a fixed-scope pilot starting with one security source, a service catalog, and one platform team; prove baseline versus post-pilot time-to-owner and verified interruption. Content and sales narrative: “Your scanner already finds issues. Who owns the one path that reaches payments?” Sell to the security leader, earn adoption from the security generalist, and reduce friction for platform teams with concise decision packets.

## Risks, dependencies, unknowns, and roadmap

| Area | Risk / dependency | Mitigation or decision |
| --- | --- | --- |
| Path accuracy | Incomplete asset, identity, or service tags create false confidence. | Show freshness/confidence and assumptions; require critical-service attestation; allow dispute; do not auto-close. |
| Signal quality | KEV/EPSS/context may still generate noisy work. | Keep inputs distinct, let analysts tune policy, measure accepted-versus-dismissed paths. |
| Adoption | Engineers may treat security commitments as another ticket queue. | Integrate into existing tracker, minimize request scope, make ownership and evidence useful in service review. |
| Integration scope | Each CNAPP/VM source models assets and paths differently. | Start with a normalized canonical model and two reference connectors; preserve source deep links. |
| Liability / trust | A recommendation could be incomplete or harmful if acted on blindly. | Contextual warning, reviewer workflow, reversible action templates, approval gates, audit trail; no automatic changes. |
| Business semantics | “Crown jewel” labels can become stale or political. | Quarterly attestation and explicit service-owner approval; version labels. |

**Post-demo roadmap:**

1. **0–6 months:** AWS Security Hub/Inspector + service catalog + Jira integration, policy editor, evidence collection, review queue, audit export.
2. **6–12 months:** CNAPP import, identity graph context, semantic deduplication, exception expiry automation, Slack/Teams digest, service scorecards.
3. **12–18 months:** multi-cloud path normalization, contextual compensating-control library, change-management verification hooks, API/webhooks, and role-based executive portfolio reporting.
