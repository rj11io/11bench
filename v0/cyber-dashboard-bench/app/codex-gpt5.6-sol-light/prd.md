# Patchline — product requirements document

**Status:** Demo specification / product hypothesis  
**Owner:** Product  
**Target launch:** design-partner beta, Q4 2026

## 1. Thesis and positioning

Patchline is a remediation command center for lean security teams that already own scanners. It converts fragmented vulnerability findings into a capacity-aware daily queue of explainable decisions and owner-ready fix briefs.

- **Category:** remediation command / risk-based vulnerability management.
- **Positioning:** between scanner dashboards and enterprise exposure-management platforms.
- **Promise:** “Know the few exposures to fix now, why they outrank the rest, and who can close them.”
- **Differentiation:** transparent decision bands, evidence freshness, capacity-aware prioritization, and a complete cross-team handoff. Patchline does not claim that a proprietary number represents risk truth.

## 2. Users and jobs

### Primary: Security lead / vulnerability owner

At a 200–2,000 employee company, owns vulnerability outcomes with limited staff.

- **Job:** decide what the organization can safely defer and mobilize owners on what cannot wait.
- **Pains:** duplicate findings, severity-only queues, missing business context, manual ticket writing, disputed priorities, unknown owners, stale exceptions.
- **Buying trigger:** breach or near miss, board/insurance question, audit finding, or rapidly growing backlog.

### Secondary

- **Infrastructure / engineering owner:** needs a precise, credible fix brief, affected assets, safe validation, and a realistic deadline.
- **CISO / IT director:** needs evidence that limited capacity is reducing consequential risk.
- **Auditor / risk approver:** needs policy, approvals, exceptions, and immutable decision history.

## 3. Product principles

1. Decisions before dashboards.
2. Explain every prioritization factor and its freshness.
3. Route work to the owner’s existing system.
4. Verify remediation from source evidence.
5. Treat missing context as visible uncertainty.
6. Optimize scarce capacity, not finding-count vanity.

## 4. Scope

### MVP

- ingest findings from two scanner classes plus CISA KEV and EPSS;
- normalize CVE/asset/finding records and deduplicate by fix;
- enrich with internet reachability, asset criticality, environment, owner, and compensating controls;
- calculate Act now / Attend / Track action bands under a versioned policy;
- daily capacity-aware queue;
- exposure detail with reason chain and “what would change this”;
- assign owner, set status, create owner-ready fix brief, and model ticket sync;
- SLA timers, exceptions with approver/expiry, activity audit trail;
- re-scan state and verified closure;
- portfolio metrics and campaign grouping.

### Non-goals

- scanning, EDR, SIEM, patch deployment, or exploit execution;
- autonomous remediation;
- universal financial risk quantification;
- full attack-surface graph;
- incident response case management;
- replacing Jira/ServiceNow or CMDB.

## 5. Core workflow

1. Security lead opens **Today** and sees 3–10 decisions sized to weekly capacity.
2. They inspect an Act-now item. Patchline explains: KEV evidence, EPSS, reachable path, affected crown-jewel service, controls, confidence, and freshness.
3. They confirm/adjust owner, review the generated fix brief, and send it to the modeled work queue.
4. Item moves from “Needs decision” to “In progress”; the dashboard updates immediately and persists.
5. Owner records mitigation or completion. A subsequent scan verifies closure; ticket closure alone is not sufficient.
6. If remediation is impossible, an authorized approver grants a time-bounded exception with controls and review date.

## 6. Functional requirements and acceptance criteria

### FR1 — Decision queue

- Rank by action band, deadline, business consequence, evidence change, and fix-effort fit.
- Never rank solely by CVSS.
- Show why-now summary, affected asset count, owner, effort, due time, and status.

**Accept:** A user identifies the top action and its reason within 10 seconds; filtering can produce normal, high-attention, and empty states without page reload.

### FR2 — Explainable evidence

- Show factor name, value, source, observed time, confidence, and direction.
- Show policy rule that produced the action band.
- Show missing/stale evidence and what change would alter the decision.

**Accept:** Every Act-now item has at least one exploitation signal, exposure evidence, impact context, and policy version. No UI calls EPSS a total risk score.

### FR3 — Attack path

- Show a compact path from entry point through vulnerable asset to business impact.
- Provide a text equivalent.

**Accept:** User can distinguish “internet reachable” from “internal only” without relying on color.

### FR4 — Remediation handoff

- Generate fix brief with owner, due date, affected assets, safe remediation, validation, rollback/mitigation, and source links.
- Persist owner and status changes locally in demo; production syncs bidirectionally to Jira/ServiceNow.

**Accept:** Clicking “Start remediation” changes item status, activity, queue counts, and button feedback. State remains after reload.

### FR5 — Exceptions

- Require reason, compensating control, approver, expiry, and next review.
- Re-open on expiry or material threat/exposure change.

**Accept:** No permanent exception; only Risk Approver role can approve.

### FR6 — Metrics

- urgent exposure days, Act-now SLA adherence, capacity coverage, unowned urgent items, verified closure, and exception debt.

**Accept:** Metrics reconcile with visible records and distinguish verified from reported closure.

## 7. Data model

- **Asset:** id, source ids, hostname, type, environment, internet exposure, criticality, data class, service, owner/team, last observed.
- **Vulnerability:** CVE, CVSS/vector, CWE, vendor/product, patch/mitigation, KEV state/dates, EPSS probability/percentile/date.
- **Finding:** scanner, asset, vulnerability, first/last seen, state, port/package, evidence.
- **Exposure decision:** grouped findings, action band, reason factors, confidence, policy version, calculated time, SLA/due date, effort.
- **Attack path:** ordered nodes/edges with evidence and last validation.
- **Work item:** owner, ticket id/status, campaign, timestamps, validation state.
- **Exception:** scope, rationale, controls, approver, approved/expiry/review times.
- **Audit event:** actor, action, before/after, source, timestamp.

### Integration assumptions

Read-only scanner connectors (Tenable/Qualys/Rapid7/cloud-native), CISA KEV JSON, FIRST EPSS API/feed, AWS/Azure/GCP tags, optional CMDB, and Jira/ServiceNow. Production uses incremental sync, source timestamps, connector health, scoped credentials, and deterministic identity matching with a review queue.

## 8. Security, privacy, permission, and trust

- SSO/SAML/OIDC, SCIM, MFA inherited from IdP.
- Roles: Viewer, Security Operator, Remediation Owner, Risk Approver, Admin.
- Tenant isolation; encryption in transit and at rest; managed key option later.
- Least-privilege, read-only scanner scopes; ticket write scope separated.
- Secrets held in a managed secret store and never returned to browser clients.
- Immutable audit trail for policy, decision, assignment, status, and exception changes.
- Configurable data retention; asset metadata minimization; regional residency roadmap.
- Export and deletion controls; subprocessors and DPA before GA.
- Model-derived summaries are labeled, source-linked, and editable. No autonomous risk acceptance or patch execution.
- Decision engine provides version, factor provenance, freshness, and deterministic replay.

## 9. Onboarding and lifecycle

### Onboarding / activation

1. Connect scanner or upload export.
2. Connect cloud/CMDB context and map critical services.
3. Set weekly remediation capacity and policy tolerance.
4. Resolve top unknown owners.
5. Review first 10 decisions and create first fix brief.

**Activation:** within 24 hours, customer has ≥80% asset ownership coverage and sends one high-confidence remediation brief.

### Retention loop

Daily changed-evidence digest → weekly queue planning → owner remediation → verified re-scan → monthly policy/outcome review.

### Success metrics

- North star: urgent exposure days avoided per month.
- Activation rate and time to first owner-ready brief.
- % Act-now within SLA.
- Median time from decision to accepted ownership.
- Verified closure rate.
- Owner coverage and decision freshness.
- Queue efficiency: verified consequential closures / items prioritized.
- 90-day connected-workspace retention.

Analytics events include connector_added, policy_published, decision_viewed, evidence_expanded, owner_changed, brief_created, remediation_started, exception_requested/approved, rescan_verified, and decision_overridden with reason. No raw sensitive asset data enters product analytics.

## 10. Packaging and GTM

### Pricing hypothesis

- **Team:** $18k/year up to 5,000 managed assets, 3 connectors, Jira, 10 users.
- **Scale:** $36k/year up to 25,000 assets, unlimited viewers, ServiceNow, SSO/SCIM, custom policies.
- **Enterprise:** custom for higher scale, residency, advanced audit, and support.

Price by assets, not findings. Free 14-day guided proof uses one backlog export and read-only sources.

### Launch motion

- Design partners through vCISO firms, regional security consultancies, cyber-insurance readiness partners, and scanner resellers.
- Proof narrative: “Bring last week’s backlog; leave with the 10 decisions your team can defend and execute.”
- Content: KEV response benchmark, remediation-capacity calculator, and board-ready exposure-day template.
- Expansion: more asset scope, teams, automated campaigns, exception governance, executive evidence.

## 11. Risks, dependencies, unknowns

- **Garbage context:** inaccurate ownership/criticality undermines trust. Mitigate with confidence, provenance, review queue, and gradual enrichment.
- **False reassurance:** prioritization can hide tail risk. Show coverage/effort trade-off and never claim complete protection.
- **Vendor overlap:** platforms may bundle workflow. Win on speed, neutrality, transparency, and mid-market packaging.
- **Integration fragility:** schema/rate changes. Build connector contracts, replayable imports, health telemetry.
- **Organizational bottleneck:** routing cannot create patch windows. Measure accepted ownership and blocked reasons; support campaigns.
- Unknown: willingness to pay versus scanner add-ons; optimal capacity model; minimum graph depth that adds value.

## 12. Roadmap

- **Demo:** Today queue, evidence detail, attack path, filters, persisted owner/status, activity.
- **Beta:** CSV + one scanner, KEV/EPSS, Jira, AWS tags, policy versioning, exceptions, rescan verification.
- **GA:** additional scanners/clouds, ServiceNow, SSO/SCIM, audit exports, campaigns, connector health.
- **Post-GA:** control-aware mitigation validation, owner portal, benchmarked SLAs, API/webhooks, regional hosting.
- **Later:** safe AI assistance for evidence summarization and fix-brief drafting, always source-linked and human-approved.

