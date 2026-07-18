# Breakline product requirements document

Status: Demo-ready product definition  
Owner: Product  
Last updated: 2026-07-16

## 1. Product thesis

### Product

**Breakline — the exposure decision desk**

### Category

Exposure remediation operations. Breakline is an integration-first system of action that sits above vulnerability, cloud, identity, asset, and ticketing tools.

### Thesis

Security teams do not fail because they lack findings. They fail to convert noisy, differently scored findings into a defensible sequence of changes that infrastructure owners can execute and security can verify. A product that compresses this decision and handoff loop can reduce material exposure faster than another detection surface.

### Positioning

For 500–5,000 employee organizations with lean security teams and multiple security tools, Breakline turns scattered exposure evidence into a small daily queue of provable fix decisions. Unlike scanners and broad exposure platforms, Breakline is source-neutral and optimizes the cross-team decision: why now, which breakpoint, who owns it, what could break, and how closure will be proven.

### Differentiated promise

**Five decisions, not five thousand findings. Break the path. Prove it closed.**

The product guarantees neither breach prevention nor exploit detection. It provides decision support and workflow orchestration based on connected evidence.

## 2. Users and jobs to be done

### Primary user: Security engineering / vulnerability-management lead

- Context: 3–12 person security team; accountable for exposure outcomes; lacks authority to make most production changes.
- Jobs:
  - Tell the team what must be fixed today and defend the priority.
  - Answer “are we exposed?” using current, attributable evidence.
  - Choose a risk-reduction action that fits operational constraints.
  - Route work to the correct owner without a long chat thread.
  - Prove that a closed ticket actually removed the exposure.
- Pains:
  - Scanner severity conflicts.
  - Missing asset owner and business context.
  - Duplicate findings across tools.
  - Manual path reconstruction and spreadsheets.
  - Tickets bounce between teams.
  - Exceptions have no expiry or re-evaluation.

### Secondary user: Platform / cloud / infrastructure owner

- Jobs:
  - Understand why a change is urgent.
  - See the smallest safe change and alternatives.
  - Estimate scope, downtime, rollback, and validation.
  - Ask for an exception without losing context.
- Pain:
  - Generic tickets contain CVE text but not the actual reachable service, business consequence, or safe implementation path.

### Secondary user: Head of Security / CISO

- Jobs:
  - Know whether the program is reducing likely business impact.
  - See aged unowned exposure, exception debt, and closure evidence.
  - Explain investment and accountability to executives.

### Buying trigger

- Emergency response to a new KEV/high-profile vulnerability.
- Failed audit, penetration test, or tabletop reveals a reachable crown jewel.
- Remediation SLA misses and high ticket reopen rates.
- Renewal/consolidation of vulnerability or exposure tools.
- Board request for evidence of risk reduction rather than counts.

## 3. Product principles

1. Decisions over findings.
2. Evidence before authority.
3. Business paths over isolated severities.
4. Breakpoint alternatives over one-size-fits-all patching.
5. Verified closure over ticket closure.
6. Human approval over silent automation.
7. Bounded attention over infinite feeds.

## 4. Scope

### MVP scope

- Read-only ingestion from:
  - Vulnerability scanner.
  - Cloud asset/configuration inventory.
  - Identity directory/IAM graph.
  - CMDB or asset owner source.
  - Jira or ServiceNow.
  - CISA KEV and FIRST EPSS public intelligence.
- Entity normalization and source provenance.
- Critical business-service and crown-jewel designation.
- Reachability/relationship graph.
- Decision clustering and prioritization.
- Daily queue with Act now, Schedule, and Watch states.
- Explainable Decision Packet:
  - Summary and recommendation.
  - Attack path.
  - Factor-level score explanation.
  - Evidence ledger with freshness/confidence.
  - Alternative breakpoints.
  - Change scope, rollback, and verification plan.
  - Owner, due date, ticket, comments, and exceptions.
- Re-test workflow and verified closure.
- Program dashboard for path closure, aging, ownership, and evidence coverage.
- RBAC, SSO, export, and audit history.

### Demo scope

- Seeded read-only “Northstar Health” environment.
- Overview and decision queue.
- Three normal/high-attention decisions plus lower-priority watch items.
- Select a decision, compare breakpoints, assign an owner, create a fix packet, and persist state locally.
- Simulate an empty/cleared queue via a filter state.
- Show stale-evidence and high-attention treatment.
- Show demo labeling at all times.

### Non-goals

- Native vulnerability scanning, EDR, SIEM, CSPM, or penetration testing.
- Autonomous production changes.
- Incident response case management.
- Universal monetary cyber-risk quantification.
- Replacing Jira/ServiceNow.
- A consumer-grade security score.
- Claiming that a graph path proves exploitability; paths remain hypotheses with stated confidence.

## 5. Core workflows

### Workflow A: Review the daily decision queue

1. User opens Today.
2. Product shows at most five primary decisions, ordered by policy and risk-reduction opportunity.
3. User filters by action state, owner gap, service, or evidence freshness.
4. User opens a decision and sees a plain-language conclusion before technical evidence.

Acceptance criteria:

- Queue item includes action state, impacted business service, recommended breakpoint, owner/status, due time, and key evidence labels.
- Default ordering is deterministic and explainable.
- Duplicate underlying findings are represented as one decision with a count.
- No raw-finding count is presented as a success metric.
- Empty filters show a recovery action and preserved filter context.

### Workflow B: Evaluate and select a breakpoint

1. User reads the recommended action and business consequence.
2. User reviews the attack path from origin to crown jewel.
3. User opens “Why this is ranked” to inspect factor contributions and source freshness.
4. User compares remediation options by path reduction, effort, disruption, reversibility, and verification.
5. User selects a preferred option or records an alternate.

Acceptance criteria:

- Every factor has a value, source, observation time, and plain-language meaning.
- CVSS, EPSS, KEV, business criticality, and reachability remain distinct.
- At least one non-patch breakpoint can be represented.
- Recommendation confidence and missing evidence are visible.
- Keyboard users can select and compare all options.

### Workflow C: Create and route a Decision Packet

1. User selects owner/team and due date.
2. Product composes a packet with scope, rationale, steps, rollback, and verification.
3. User reviews before creating/updating a ticket.
4. Product records the external reference and audit event.

Acceptance criteria:

- No ticket or message is created without explicit confirmation.
- Owner changes, selected breakpoint, due date, and edits are audited.
- Packet uses owner-facing language and links to technical evidence.
- Missing owner is a visible queue condition.
- Demo simulates creation locally and clearly labels it as not sent.

### Workflow D: Verify closure

1. Ticket enters Awaiting verification.
2. Breakline waits for or requests the relevant re-scan/re-evaluation.
3. Product compares the before/after graph and evidence.
4. Decision is Closed only if the selected path is no longer reachable under policy.
5. If the path remains, the decision reopens with changed evidence highlighted.

Acceptance criteria:

- Ticket status alone cannot produce Verified closed.
- Verification records source, time, result, and graph delta.
- Compensating controls can close or downgrade a decision only under an approved policy.
- Reopened decisions retain the full prior history.

## 6. Prioritization model

### Action policy

Hard policy gates are evaluated before the composite score:

- Act now: confirmed KEV plus validated/inferred reachable path to a Tier 0/1 service; active exploitation telemetry; or a policy-defined catastrophic exposure.
- Schedule: credible path and meaningful impact without an immediate hard gate.
- Watch: incomplete path, effective compensating control, low exploit likelihood, or stale evidence that needs refresh.

### Composite Decision Priority (0–100)

The composite is a transparent ranking aid, not a breach probability:

- 25% exploit evidence: KEV, EPSS, exploit maturity, observed attempts.
- 25% path confidence: external reachability, permissions, graph completeness, runtime validation.
- 25% business impact: service tier, data class, blast radius, recovery requirement.
- 15% control gap: EDR/IPS/WAF/segmentation state and confidence.
- 10% urgency: exposure age, SLA, evidence change, campaign context.

Each contribution is stored separately. Tenant policy can change weights within constrained ranges. Hard policy gates always remain visible.

### Ranking tie-breakers

1. Highest action state.
2. Highest estimated path reduction from the preferred breakpoint.
3. Nearest SLA.
4. Oldest unowned decision.

## 7. Data model

### Core entities

- `Organization`
- `User`, `Team`, `Role`
- `Integration`, `SyncRun`, `SourceRecord`
- `Asset`, `Identity`, `DataStore`, `BusinessService`
- `Finding` (vulnerability, misconfiguration, identity, exposure, control)
- `Relationship` (network reach, permission, deployment, ownership, service dependency)
- `AttackPath`, `PathStep`, `CrownJewel`
- `Evidence` (observed, imported, calculated, analyst)
- `Decision`, `PriorityFactor`, `BreakpointOption`
- `DecisionPacket`, `ExternalWorkItem`
- `Exception`, `CompensatingControl`
- `VerificationRun`, `AuditEvent`

### Important fields

- Stable source identifier and connector.
- Observed-at, ingested-at, expires-at.
- Confidence and confidence basis.
- Sensitivity classification and service tier.
- Owner provenance (CMDB, repository, cloud tag, manual).
- CVSS version/vector and EPSS score/percentile/date.
- KEV membership/date-added/due-date where present.
- Path origin, target, steps, confidence, and last evaluated time.
- Decision policy version and complete factor snapshot.

### Assumptions

- MVP graph recomputation can be eventual, with a target under 30 minutes after source sync.
- Ownership will be incomplete; manual assignment and learning are required.
- Source records may conflict. Breakline retains source-specific values and marks the chosen canonical value.
- Integrations are least-privilege and read-only by default. Ticket write access is a separate opt-in credential.

## 8. Functional requirements

### Ingestion and normalization

- FR-1: Deduplicate assets using source IDs plus cloud instance ID, hostname/FQDN, account, and bounded heuristics.
- FR-2: Preserve all source records and merge rationale.
- FR-3: Flag stale, failing, and partial integrations.
- FR-4: Allow analysts to correct ownership/business context without overwriting source truth.

### Decisions

- FR-5: Cluster findings that share path, root cause, and breakpoint.
- FR-6: Cap the default daily queue at five; overflow remains accessible.
- FR-7: Re-rank on meaningful evidence change and log why.
- FR-8: Show hard policy gates separately from weighted factors.

### Remediation

- FR-9: Support patch, configuration, permission, segmentation, disable/isolate, and compensating-control breakpoints.
- FR-10: Compare impact, effort, disruption, reversibility, and verification.
- FR-11: Generate editable packet content from structured fields.
- FR-12: Prevent silent external writes.

### Verification

- FR-13: Map each breakpoint to one or more verification tests.
- FR-14: Require fresh evidence after the claimed change.
- FR-15: Reopen failed verifications and notify the owner/security lead.

### Reporting

- FR-16: Report verified paths closed, median decision time, median closure time, unowned aging, exception debt, and evidence coverage.
- FR-17: Allow drill-down from every aggregate to decisions and evidence.

## 9. Security, privacy, and trust

- SSO with SAML/OIDC; SCIM in Scale tier.
- Roles:
  - Viewer: read program and decisions.
  - Operator: triage, select breakpoint, assign.
  - Approver: approve exceptions and external writes.
  - Admin: integrations, policies, roles.
- Fine-grained service/environment scoping for operators.
- Encryption in transit and at rest; customer-managed key roadmap.
- Connector secrets in a dedicated secrets service, never exposed in UI/logs.
- Read-only connector templates by default.
- Immutable audit trail for evidence, policy, ownership, exception, and packet changes.
- Configurable regional data residency and retention.
- Data minimization: ingest metadata needed for path reasoning; avoid workload content and secrets.
- Evidence export includes timestamps, provenance, confidence, and policy version.
- Recommendation language must distinguish facts from inferences.
- No model training on customer data by default. Any future AI feature has tenant controls, redaction, evaluation, and human approval.
- Availability target: 99.9%; RPO 1 hour; RTO 4 hours for control-plane metadata.
- Production threat model covers connector compromise, confused deputy, cross-tenant access, poisoned source data, graph denial-of-service, and malicious packet content.

## 10. Onboarding and activation

### Onboarding

1. Define two critical business services and owners.
2. Connect one finding source and one asset/context source.
3. Validate entity merge and data freshness.
4. Review the first shadow queue.
5. Configure action policy and SLA.
6. Connect ticketing with writes disabled.
7. Approve the first Decision Packet.

### Activation definition

Within 7 days:

- Two critical services modeled.
- At least 70% of their supporting assets have an owner or owning team.
- At least three decisions reviewed.
- One packet accepted by an infrastructure owner.
- One verification completed or scheduled.

### Retention loops

- Daily: evidence changes and bounded decisions.
- Weekly: overdue/unowned review and verified closure digest.
- Monthly: service-level risk-reduction and recurring-root-cause review.
- Event-driven: new KEV, failed integration, reopened path, expiring exception.

## 11. Success metrics and analytics

### North-star metric

**Verified critical paths closed per 1,000 monitored assets per month.**

### Leading metrics

- Median time from qualifying evidence to analyst decision.
- Decision acceptance rate by owner.
- Percentage of primary decisions with a confirmed owner.
- Percentage of packets requiring clarification.
- Median time to selected breakpoint execution.
- Verification pass rate and reopen rate.
- Duplicate findings compressed per decision.
- Evidence freshness coverage.

### Guardrails

- False-urgent rate: packets downgraded because material evidence was wrong.
- Disruptive-change incidents linked to a recommendation.
- Exception count and average age.
- Queue override rate.
- Integration freshness failures.
- Users reporting that prioritization is not understandable.

### Product analytics events

`queue_viewed`, `decision_opened`, `factor_expanded`, `breakpoint_compared`, `breakpoint_selected`, `owner_assigned`, `packet_previewed`, `packet_created`, `exception_requested`, `verification_started`, `verification_passed`, `decision_reopened`, `source_opened`.

Analytics exclude sensitive asset names by default and use tenant-scoped opaque IDs.

## 12. Packaging and GTM

### Packaging hypothesis

- Team — $24k/year: 2,500 assets, 5 operators, unlimited viewers, core connectors.
- Scale — $60k/year: 10,000 assets, unlimited operators, SSO/SCIM, API, custom policies.
- Enterprise — custom: volume, residency, premium support, custom connectors, private networking.

Asset definition and ratios must be explicit in order forms. KEV/EPSS intelligence and ticket integration are included, not add-ons.

### Launch motion

- Founder/product-led enterprise sales to Heads of Security and security engineering.
- 14-day paid “shadow queue” using read-only connectors.
- Proof report compares current workflow with Breakline:
  - findings compressed;
  - owner gaps found;
  - decision time;
  - high-impact paths;
  - projected path reduction.
- Co-sell/implementation relationships with vCISOs and cloud consultancies after repeatability.

### GTM narrative

“You already bought the scanners. Breakline makes their evidence executable.”

Land with a single urgent service or KEV response, expand to more sources/services, then standardize exception and verification governance.

## 13. Risks, dependencies, and unknowns

### Risks

- Incumbents copy packet/workflow features.
- Weak source data produces false confidence.
- Customers resist another interface.
- Asset pricing creates procurement ambiguity.
- Recommended changes could cause outages if context is incomplete.
- A daily cap could hide important work if policy is poorly configured.

### Mitigations

- Deep bidirectional workflow and outcome learning, not a thin dashboard.
- Confidence/freshness, source conflict visibility, and safe defaults.
- Email/chat/ticket surfaces in roadmap; Breakline remains evidence system of record.
- Contractual asset definitions and in-product meter.
- Human approval, rollback fields, blast-radius notes, and no autonomous changes.
- Hard gates, overflow indicators, and policy simulation.

### Dependencies

- Reliable scanner/cloud/identity APIs.
- Accurate KEV and EPSS ingestion.
- Graph computation and entity resolution.
- Customer participation in business-service and ownership modeling.
- Security review and connector permission templates.

### Unknowns to validate

- Minimum source set that produces a trustworthy first queue.
- Whether owners prefer a ticket-native packet or a linked Breakline view.
- Acceptable false-urgent rate.
- Best asset unit across hybrid cloud and identity.
- How much policy customization mid-market teams need.

## 14. Roadmap

### Demo

- Seeded queue, decision evidence, breakpoint comparison, owner assignment, locally persisted packet creation.

### 0–3 months: design partners

- Tenable/Qualys, AWS, Entra ID, Jira connectors.
- Service/crown-jewel modeling.
- Deterministic decision policy and packet workflow.
- Verification from re-scan.
- SSO, RBAC, audit.

### 3–6 months: operational scale

- ServiceNow, Wiz, Rapid7, GCP/Azure connectors.
- Exception governance, Slack/Teams approvals, scheduled campaigns.
- Policy simulation and queue quality analytics.
- Executive/program reporting.

### 6–12 months: learning system

- Owner inference from historical outcomes.
- Change-window and effort prediction.
- Recurring root-cause campaigns.
- Recommendation assistance with citations and evaluations.
- MSSP multi-tenancy and API ecosystem.

