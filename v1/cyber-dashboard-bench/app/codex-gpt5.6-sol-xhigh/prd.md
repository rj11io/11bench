# Breakline product requirements document

**Product:** Breakline  
**Category:** Exposure Remediation Command  
**Release definition:** Interactive benchmark demo plus production v1 definition  
**Primary market:** Cloud-native organizations with 500–5,000 employees  
**Primary user:** Cloud Security Lead / Security Engineering Manager  
**Economic buyer:** VP Security or CISO

## 1. Product thesis

Organizations do not primarily fail because they lack security findings. They
fail because the security team cannot consistently turn correlated exposure
evidence into an owned, safe, verified change before the threat changes.

Existing CNAPP and exposure-management products increasingly identify attack
paths. Ticketing systems track work. Neither is optimized around the smallest
change that prevents the greatest number of reachable paths and proves the
condition is gone.

Breakline ingests cloud, vulnerability, identity, data, and ownership context;
models plausible paths to named critical assets; and creates a short queue of
**remediation missions**. Each mission recommends a break point, quantifies how
many active paths it removes, explains the source signals, assigns an owner,
packages the change and rollback context, and verifies closure from fresh
evidence.

### Positioning

For lean cloud security teams that already own scanners but struggle to get
high-impact fixes shipped, Breakline is an exposure remediation command center
that converts attack-path evidence into owner-ready, verifiable missions.
Unlike broad CNAPP suites or generic ticket automation, Breakline optimizes for
the minimum change that breaks the most reachable business risk and shows every
factor behind the decision.

### Differentiated promise

> Fix the one control that breaks the most real attack paths, with evidence every
> owner can verify.

### Product principles

1. **Action over inventory:** the default object is a mission, not a finding.
2. **Leverage over severity:** rank the change that removes the most meaningful
   paths, not the longest list of critical CVEs.
3. **Evidence over magic:** show signals, sources, freshness, missing data, and
   policy version.
4. **Verification over closure:** a ticket status cannot remove a graph edge.
5. **Shared language over security jargon:** owners get service impact, change,
   rollback, and proof; practitioners can still inspect ATT&CK/CVE detail.
6. **Assist, do not surprise:** no production mutation without separate,
   explicit, least-privileged authorization and human confirmation.

## 2. Users, jobs, and pains

### Primary: Cloud Security Lead

**Profile**

- Manages a small team across hundreds of AWS accounts or projects.
- Uses a CNAPP/scanner, cloud-native security services, Jira, Slack, GitHub, and
  an identity provider.
- Can recommend but rarely executes most production changes.

**Jobs**

- Decide which exposure deserves attention now.
- Explain urgency and business impact to an engineering owner.
- Find a low-risk break point and coordinate remediation.
- Track policy deadlines and accepted risk.
- Verify the exposure was removed and report outcomes to leadership.

**Pains**

- Duplicated findings and scores that disagree.
- Attack-path graphs that are informative but not a work plan.
- Missing or stale ownership tags.
- Copy/paste between security tools and tickets.
- “Fixed” tickets that remain exploitable after a rescan.
- Leadership metrics that reward finding closure rather than risk reduction.

### Secondary: Platform or application owner

**Jobs**

- Understand why a security request outranks planned reliability work.
- See affected resources and dependencies.
- Choose the safest change or compensating control.
- Provide implementation and verification evidence.

**Pains**

- Generic “patch immediately” tickets.
- No path from issue to service or customer impact.
- Security scores without source data.
- Unclear rollback, maintenance-window, or validation guidance.

### Secondary: VP Security / CISO

**Jobs**

- Know whether material exposure is trending down.
- Identify overdue decisions, teams blocked by capacity, and accepted-risk debt.
- Prove governance to auditors and the board.

**Pains**

- Large numbers without business meaning.
- Risk scores that cannot be reproduced.
- Status reporting assembled manually from multiple systems.

### Buying trigger

At least one of:

- a known exposure remained open through a breach, pen test, or audit;
- KEV/critical remediation SLAs are repeatedly missed;
- a CNAPP has strong detection but poor engineering adoption;
- cloud/account growth outpaces the security team;
- the CISO cannot connect engineering work to verified exposure reduction.

## 3. Goals and success definition

### Customer outcomes

- Reduce the active set of reachable tier-0/tier-1 attack paths.
- Reduce median time from mission creation to accountable owner.
- Reduce median time from owner assignment to verified break.
- Increase the percentage of critical paths with a valid owner and policy
  decision.
- Reduce duplicate remediation tickets and reopened exposure.

### Business outcomes

- Prove value inside a 14-day AWS proof of value.
- Convert 35% of qualified proofs of value to annual contracts.
- Reach first verified mission within seven days of connection.
- Achieve weekly active use by both security and at least one engineering team.
- Expand from one cloud/business unit to a second within six months for 30% of
  customers.

### North-star metric

**Verified critical paths removed per active customer per month**, with a
guardrail that each removal has fresh evidence and an auditable mission.

## 4. Scope

### Production v1 in scope

- Read-only AWS organization/account integration.
- Import of findings from one or more supported sources (initially AWS Security
  Hub and a normalized CSV/API adapter for a CNAPP or scanner).
- AWS asset, network, IAM, tag, and relationship graph sufficient for selected
  path templates.
- Customer-defined critical assets/services and business-impact tiers.
- Ownership resolution from cloud tags, GitHub CODEOWNERS/team mappings, and
  manual overrides.
- Transparent policy engine combining threat, reachability, privilege/path, and
  impact evidence.
- Break-point enumeration and remediation-leverage ranking.
- Mission queue, filters, saved views, details, lifecycle, comments, due dates,
  assignments, and acceptance.
- Jira bidirectional synchronization and Slack notifications.
- Verification from a fresh collection or explicit evidence query.
- Executive and operational outcome views.
- SSO, SCIM, role-based permissions, audit log, retention controls, and exports.

### Demo scope

- A high-fidelity seeded AWS environment.
- Command dashboard and priority mission queue.
- High-attention, normal, and all-clear scenarios.
- Mission detail with evidence factors, path graph, recommended break point,
  implementation plan, and verification requirement.
- Lifecycle transitions persisted in `localStorage`.
- Simulated assignment, review, and verification. No external system is called.
- Integration-health view with normal, stale, and not-connected states.

### Non-goals

- Native vulnerability scanning or runtime EDR.
- SIEM alert triage, incident response, or threat hunting.
- Fully autonomous production remediation.
- A complete multi-cloud graph in v1.
- Replacement of Jira, Slack, or an existing CNAPP.
- Compliance evidence management beyond mission-relevant controls.
- Quantitative loss modeling or board-level financial risk.
- Arbitrary user-authored graph queries in v1.

## 5. Core workflows

### Workflow A: Daily prioritization

1. User opens Command.
2. System states source freshness and whether any policy deadline is breached.
3. Hero summary shows the small number of changes and total paths they can
   break.
4. Mission queue ranks Act-now items, then scheduled work, using expected path
   reduction, business impact, evidence confidence, deadline, effort, and change
   constraints.
5. User filters by owner, environment, status, policy, or critical asset.

**Outcome:** the user can choose the next action without interpreting every raw
finding.

### Workflow B: Explain and assign a mission

1. User opens a mission.
2. “Why now” shows policy decision, individual factors, source, observed time,
   and confidence/missing evidence.
3. Path view shows origin, exploitable/reachable steps, identities, and target.
4. Recommended break point shows expected paths removed, estimated effort,
   affected services, alternative fixes, and change/rollback notes.
5. User assigns an owner or resolves a missing owner.
6. System creates/syncs a ticket and records mission/ticket links.

**Outcome:** an engineering owner receives a scoped and defensible change, not a
generic finding.

### Workflow C: Execute and verify

1. Owner moves the mission to In progress.
2. Owner records implementation evidence and optionally selects an alternative
   break point.
3. Owner submits for verification.
4. Breakline waits for a fresh relevant collection or runs a read-only
   verification query.
5. If the condition/edge is absent, the mission becomes Verified and associated
   paths become Prevented.
6. If present, the mission reopens with failed evidence and a specific reason.

**Outcome:** “done” reflects changed exposure, not administration.

### Workflow D: Accept risk

1. Authorized user selects Accept risk.
2. They provide reason, compensating control, expiry, approver, and scope.
3. Breakline recalculates the mission decision and schedules reminders.
4. Expired acceptances return to the active queue.

**Outcome:** exceptions are explicit, time-bounded, reviewable decisions.

### Workflow E: Leadership review

1. Leader selects time range/business unit.
2. View shows opening/closing reachable critical paths, verified paths removed,
   overdue decisions, time-to-owner/time-to-verify percentiles, accepted-risk
   debt, and data coverage.
3. Leader drills into a team or mission without losing the selected scope.

**Outcome:** leadership sees decisions and outcomes tied to evidence.

## 6. Functional requirements and acceptance criteria

### FR-1: Data connection and freshness

- Connect AWS through a customer-created cross-account role with documented
  read-only permissions.
- Show account coverage, last successful collection, next collection, stale
  threshold, and connector errors.
- Support revocation and credential rotation without support intervention.

**Acceptance**

- A connection test distinguishes permission, network, throttling, and invalid
  configuration errors.
- No write permission is required for inventory, path analysis, or verification.
- A source beyond its freshness threshold is labeled stale everywhere it affects
  a decision.

### FR-2: Asset and relationship graph

- Normalize resources, identities, network exposure, data stores, findings,
  controls, ownership, and business context.
- Preserve source-specific identifiers and timestamps.
- Support versioned snapshots and path recomputation.

**Acceptance**

- Every path node links to a source-backed entity detail.
- A deleted or inaccessible source entity is tombstoned rather than silently
  removed from historic decisions.
- Duplicate entities can be merged with reversible provenance.

### FR-3: Critical asset definition

- Let authorized users mark services/resources as tier 0, 1, 2, or standard.
- Ingest tags and permit manual overrides with reason.
- Allow a service to include multiple cloud resources and repositories.

**Acceptance**

- Manual changes record actor, previous value, new value, reason, and time.
- Ranking updates after a criticality change.
- Missing criticality is visible as missing evidence, not treated as “low.”

### FR-4: Explainable policy decision

- Produce Act, Schedule, or Track using versioned policy.
- Show independent evidence groups: threat, reachability, privilege/path, impact.
- Show confidence, stale sources, and missing inputs.
- Preserve raw values and normalized values.

**Acceptance**

- A user can answer “why is this above that?” from the UI without documentation.
- EPSS is labeled as exploit probability and never presented alone as risk.
- Replaying the same evidence and policy version reproduces the decision.
- Policy changes do not rewrite historic audit events.

### FR-5: Break-point recommendation

- Enumerate one or more changes that break the path.
- Rank by paths removed, critical targets protected, evidence confidence,
  estimated effort, change risk, and customer policy.
- Identify shared choke points across multiple paths.

**Acceptance**

- The recommended change displays the exact path edges/conditions it is expected
  to remove.
- Alternatives explain why they rank lower.
- Users can select an alternative and must record a reason when its expected
  protection is lower.

### FR-6: Mission queue

- Provide filters for action decision, status, owner, service, environment,
  target, signal, deadline, confidence, and freshness.
- Support sorting, saved views, deep links, keyboard navigation, and bulk
  assignment.
- Prevent duplicate active missions for the same break point and scope.

**Acceptance**

- Default view loads the top actionable missions in under two seconds at p95 for
  100k active paths.
- Empty results state names the active filters and offers a one-click reset.
- Queue rows show decision, paths removed, impact, effort, owner, status, and
  deadline without opening detail.

### FR-7: Mission lifecycle and collaboration

- Statuses: Proposed, Triaged, In progress, In review, Verified, Blocked,
  Accepted, False positive, Superseded.
- Comments support mentions and attachments/links.
- Assign to user/team; due dates follow policy but can be overridden with reason.
- Sync to Jira and post scoped notifications to Slack.

**Acceptance**

- Every state change is audited.
- Conflicting Jira and Breakline changes are resolved deterministically and
  surfaced.
- A user without approval rights cannot accept tier-0 risk.
- “Verified” cannot be set manually unless an authorized exception workflow
  records why automated verification is unavailable.

### FR-8: Verification

- Define a verification predicate for each recommended break point.
- Run after a fresh source update or on demand within rate limits.
- Record pass/fail evidence, observation time, collector version, and scope.

**Acceptance**

- Passing verification prevents associated path(s) in the current graph.
- Failed verification returns the mission to In progress with an actionable
  reason.
- If evidence is stale or partial, state is “Verification blocked,” not passed.
- Recurrence opens a linked mission and increments reopen rate.

### FR-9: Risk acceptance

- Require reason, compensating control, expiry, scope, and approver.
- Support role/policy-specific maximum duration.
- Notify before expiry and automatically reactivate after expiry.

**Acceptance**

- Acceptance does not remove the path from inventory or outcome reporting.
- Leadership view reports accepted paths separately from prevented paths.
- Approval and expiry are present in exportable audit records.

### FR-10: Analytics and reports

- Operational: paths by action/status, leverage, SLA, owner coverage, source
  health, and queue aging.
- Outcome: paths opened/prevented/reopened, time-to-owner, time-to-action,
  time-to-verify, accepted-risk debt.
- Segment by business unit, service, environment, and target tier.

**Acceptance**

- All metrics include definition, population, time window, and last calculated
  time.
- Percentile metrics expose p50 and p90.
- Suppressed, accepted, and prevented paths are not conflated.
- Reports link to underlying missions and evidence.

### FR-11: Demo scenario controls

- Demo users can switch High attention, Normal, and All clear.
- Mission changes persist locally.
- Reset restores the seeded state.

**Acceptance**

- High attention includes one policy breach and urgent missions.
- Normal shows a controlled active queue and no breached deadline.
- All clear shows no active urgent mission and a useful empty state.
- A permanent “Seeded demo data” label remains visible.

## 7. Information and data model

### Core entities

**Organization**

- `id`, `name`, `region`, `retention_policy`, `policy_set_id`

**SourceConnection**

- `id`, `type`, `scope`, `status`, `permission_profile`, `last_success_at`,
  `last_attempt_at`, `freshness_sla`, `error_code`

**Observation**

- `id`, `source_id`, `entity_external_id`, `observed_at`, `ingested_at`,
  `collector_version`, `payload_hash`, `raw_reference`

**Asset**

- `id`, `type`, `provider`, `account`, `region`, `name`, `environment`,
  `service_id`, `criticality`, `data_classes`, `owner_id`, `tags`, `lifecycle`

**Identity**

- `id`, `type`, `provider`, `name`, `owner_id`, `privilege_summary`,
  `last_used_at`

**Relationship**

- `id`, `from_entity`, `to_entity`, `relationship_type`, `effective_access`,
  `condition`, `evidence_ids`, `valid_from`, `valid_to`

**Finding**

- `id`, `source_key`, `type`, `asset_id`, `cve`, `cvss`, `epss_probability`,
  `kev_status`, `severity`, `first_seen`, `last_seen`, `state`

**CriticalService**

- `id`, `name`, `tier`, `business_unit`, `owner_id`, `asset_ids`,
  `recovery_tier`, `data_classes`

**AttackPath**

- `id`, `origin_id`, `target_id`, `step_ids`, `techniques`, `state`,
  `first_seen`, `last_seen`, `confidence`, `policy_decision`

**BreakPoint**

- `id`, `condition_or_edge`, `remediation_template_id`, `affected_path_ids`,
  `expected_paths_removed`, `estimated_effort`, `change_risk`,
  `verification_predicate`

**Mission**

- `id`, `break_point_id`, `title`, `decision`, `priority`, `status`,
  `owner_id`, `service_ids`, `due_at`, `created_at`, `policy_version`,
  `external_links`, `acceptance_id`

**Evidence**

- `id`, `kind`, `source`, `source_ref`, `value`, `observed_at`, `fresh_until`,
  `confidence`, `interpretation`

**VerificationRun**

- `id`, `mission_id`, `predicate_version`, `started_at`, `completed_at`,
  `result`, `evidence_ids`, `failure_reason`

**AuditEvent**

- `id`, `organization_id`, `actor`, `action`, `entity_type`, `entity_id`,
  `before_hash`, `after_hash`, `timestamp`, `request_id`

### Data assumptions

- Cloud provider APIs and imported security findings are eventually consistent.
- A path is a defensible model of plausible reachability, not proof of active
  compromise.
- A missing relationship can reflect missing telemetry, so confidence and
  coverage must travel with the path.
- Ownership is many-to-many at source but resolves to one responsible team and
  optional contributors for a mission.
- Estimated effort is a policy/customer input, not generated truth.
- Verification evaluates the recommended condition, not every possible
  adversarial path.

## 8. Integration assumptions

### Initial production integrations

- **AWS Organizations / IAM / resource APIs:** asset and relationship metadata
  through a cross-account read-only role.
- **AWS Security Hub:** normalized findings.
- **FIRST EPSS and CISA KEV:** server-side threat enrichment with snapshot and
  license/provenance preservation.
- **GitHub:** repository/service ownership and deployment/change links; webhook
  payloads validated and minimal scopes requested.
- **Jira Cloud:** ticket creation and bidirectional field/status synchronization.
- **Slack:** notifications and deep links, not the system of record.
- **Identity provider:** SAML/OIDC SSO and SCIM.

### Later

- Azure, GCP, Kubernetes, ServiceNow, Linear, PagerDuty, additional CNAPP/VM
  sources, CMDB/service catalog, and CI/CD verification.

## 9. Security, privacy, permissions, auditability, and trust

### Security requirements

- Tenant isolation at application, query, cache, object storage, and encryption
  key boundaries.
- TLS 1.2+ in transit and AES-256 or equivalent at rest.
- Customer secrets stored in a managed secret store, never logs or analytics.
- No inbound customer network access required for SaaS integrations.
- Least-privileged, external-ID protected AWS cross-account roles.
- Separate optional remediation executor if write actions are introduced.
- Webhook signature validation, replay protection, idempotency, and audit.
- Dependency scanning, SAST, secret scanning, penetration testing, incident
  response, vulnerability disclosure, and secure SDLC.
- Availability target: 99.9% monthly for the SaaS control plane.
- RPO ≤ 24h and RTO ≤ 8h for metadata and collaboration state; source data can
  be recollected.

### Privacy requirements

- Collect configuration metadata, security findings, ownership identifiers, and
  limited collaboration content; do not ingest workload/customer payload data
  by default.
- Data map and subprocessor list available before purchase.
- Configurable retention for raw observations, mission data, and audit records.
- Customer-controlled deletion with legal/audit retention exceptions disclosed.
- EU and US data residency in Enterprise.
- Analytics use pseudonymous organization/user IDs and exclude cloud resource
  names, comments, finding payloads, and secrets.

### Roles

- **Viewer:** read reports and missions.
- **Contributor:** comment, attach evidence, update permitted mission states.
- **Mission Owner:** manage assigned mission and submit verification.
- **Security Analyst:** triage, assign, change break point, run verification.
- **Risk Approver:** accept risk within policy scope.
- **Policy Admin:** change criticality, policy, and integrations.
- **Organization Admin:** users, roles, retention, export, and organization
  configuration.

Tier-0 acceptance requires Risk Approver plus a second approver in Enterprise.

### Auditability

- Append-only audit stream for authentication, role, policy, criticality,
  mission, acceptance, integration, export, and verification events.
- Time, actor, request ID, source IP/session, before/after hash, and relevant
  reason.
- Policy and remediation-template versions referenced by every decision.
- Export to JSON/CSV and optional customer SIEM.

### Trust UX

- Persistent source/freshness labels.
- “Inferred” and “missing” are first-class states.
- No unlabeled generated text.
- Every recommendation includes alternatives and expected verification.
- Product language says “plausible path” and “expected paths removed,” not
  “breach prevented.”
- Demo always says seeded/simulated and never claims live integrations.

## 10. Onboarding and activation

### Onboarding sequence

1. Create organization and select region/retention.
2. Connect AWS read-only role; validate permissions.
3. Import Security Hub or normalized finding source.
4. Nominate critical services and confirm inferred assets.
5. Map ownership from tags and repository teams.
6. Review evidence coverage and missing-source warnings.
7. Preview top missions before enabling Jira/Slack.
8. Invite a platform owner and start the first mission.

### Activation definition

An organization is activated when, within seven days:

- at least one cloud scope is healthy;
- at least three critical services have owners;
- at least one mission is assigned to a non-security owner;
- and one mission reaches Verified or a reasoned Accepted state.

### Time-to-value target

- First asset inventory: < 30 minutes after valid connection.
- First prioritized path set: < 4 hours for 50k resources.
- First owner-ready mission: same business day.
- First verified mission: < 7 days.

## 11. Retention loops

- Daily queue changes when new evidence raises or lowers decisions.
- Weekly remediation planning view for security and platform leads.
- Deadline and stale-evidence notifications.
- Verification and recurrence reopen workflow.
- Monthly leadership outcome review.
- Quarterly policy/critical-service and accepted-risk review.

The product should not manufacture engagement. Notifications are batched by
mission and suppressed when another action already prevents the same path.

## 12. Product analytics

### Funnel

- Organization created
- AWS connection attempted/succeeded
- Critical service confirmed
- Ownership mapping ≥ 80%
- First mission opened
- First mission assigned
- First external collaborator active
- First verification run
- First verified path

### Usage and outcome events

- `mission_viewed`, `factor_expanded`, `path_inspected`
- `owner_assigned`, `ticket_synced`, `status_changed`
- `alternative_breakpoint_selected`, `acceptance_requested`
- `verification_started`, `verification_passed`, `verification_failed`
- `saved_view_created`, `report_exported`

### Guardrails

- False-positive/incorrect-path rate.
- Recommendation override rate and reason.
- Mission reopen rate.
- Stale-source decision rate.
- Notification mute/unsubscribe rate.
- Percentage of verified missions later found to have an equivalent active path.

No raw resource names, comments, or security payloads enter behavioral
analytics.

## 13. Packaging and pricing hypothesis

### Team — USD 18k/year

- Up to 5,000 cloud resources.
- AWS, Security Hub, normalized file/API import.
- 5 full users, unlimited mission assignees by secure link or Jira.
- Standard policies and 90-day raw observation retention.

### Scale — USD 48k/year

- Up to 50,000 cloud resources.
- Unlimited viewers; 25 full users.
- Jira, Slack, GitHub, SSO/SCIM.
- Custom policies, one-year history, executive reports, API.

### Enterprise — custom

- Multi-cloud and business-unit isolation.
- Advanced RBAC, dual approval, private connectivity/data plane.
- Data residency, customer-managed keys, SIEM export, premium support.

Metered resource usage and exclusions are visible. Proofs of value are
time-limited but use the production data path. The product does not price by
finding or mission because successful use should reduce both.

## 14. Launch motion and GTM narrative

### Narrative

**Problem:** You already know more than your organization can fix. Critical
findings remain open because security priority, engineering ownership, and
verification live in different systems.

**Reframe:** The right unit is not a finding; it is the smallest change that
breaks a meaningful attack chain.

**Promise:** Breakline gives security and platform teams one evidence-backed
queue of those changes and proves which paths disappeared.

**Proof:** In a 14-day proof of value, identify the top five break points, assign
owners, and verify at least one path reduction using the customer’s existing
tooling.

### Initial acquisition

- Founder/field-led sales to cloud security leaders.
- AWS and cloud-security consulting partners.
- Practitioner content: “The verified remediation benchmark,” break-point
  teardown examples, KEV-to-owner workflow templates.
- Product-led artifact: a read-only “Break Plan” report, followed by guided proof
  of value.

### Sales qualification

- ≥ 5,000 cloud resources or ≥ 20 AWS accounts.
- Existing scanner/CNAPP and a ticketing workflow.
- Dedicated security engineering/cloud security owner.
- Willing platform-engineering co-sponsor.
- Known remediation-SLA or ownership pain.

### Launch proof points

- Median time to first break plan.
- Percentage of imported critical findings compressed into missions.
- Paths expected removed per mission.
- First verified mission time.
- Security and engineering user participation.

## 15. Risks, dependencies, and unknowns

| Risk / unknown | Impact | Mitigation / decision gate |
|---|---|---|
| Path false positives erode trust | Critical | Start with narrow, testable AWS path templates; expose evidence/confidence; measure override and verification failure. |
| Incumbents add equivalent workflows | High | Own cross-vendor remediation and evidence portability; differentiate on break-point economics and verification quality. |
| Ownership data is missing | High | Treat owner coverage as onboarding work; combine tags, repositories, service catalog, and manual accountable-team decisions. |
| Read-only metadata cannot prove runtime reachability | High | Label modeled vs observed evidence; add optional runtime/control telemetry later; never hide uncertainty. |
| Engineering teams reject generated fixes | High | Use versioned, reviewed remediation templates; include alternatives/rollback; do not require generative AI. |
| Jira sync becomes the product | Medium | Keep mission/evidence as system of record; sync a deliberate field subset with deterministic conflict rules. |
| Customers demand autonomous remediation | Medium | Introduce opt-in, scoped executor only after approval, preview, rollback, and verification controls are mature. |
| Resource-based price is hard across serverless/data resources | Medium | Publish counting rules, in-product meter, annual true-up caps, and value validation during proof of value. |
| Sensitive metadata concerns block SaaS | High | Minimize collection, offer regional storage, encryption, documented fields, and Enterprise private-data-plane roadmap. |
| “Paths removed” can be gamed by path enumeration changes | High | Version path engine, report comparable cohorts, show model changes, and pair metric with critical targets protected. |

### Key dependencies

- Reliable AWS graph collection and normalization.
- CISA KEV/FIRST EPSS snapshot ingestion and licensing compliance.
- Reviewed remediation-template library.
- Jira/GitHub/Slack application approvals.
- Customer participation in critical-service and ownership mapping.
- A stable verification predicate per supported break-point type.

### Discovery questions before production build

- Which three AWS path templates produce the best trust/coverage tradeoff?
- Is the champion willing to buy an overlay without replacing a CNAPP?
- Which outcome wins budget: SLA compliance, reduced engineering coordination,
  or executive proof?
- Do platform owners prefer Breakline UI, Jira, or Slack for collaboration?
- What resource-count model feels predictable to serverless-heavy customers?
- How often is “one break point prevents many paths” actionable versus merely
  descriptive in real customer graphs?

## 16. Roadmap

### Demo

- Seeded command dashboard.
- Explainable mission details and path.
- Lifecycle persistence.
- Scenario/empty/error states.

### 0–3 months: Design partners

- AWS read-only inventory.
- Security Hub/normalized import.
- Three path templates: public workload to sensitive data, over-privileged
  workload identity, exposed secret to privileged cloud identity.
- Manual critical-service/owner mapping.
- Mission lifecycle and read-only verification.

### 3–6 months: Sellable v1

- Jira, Slack, GitHub, SSO/SCIM.
- Versioned policy engine and acceptance.
- Outcome analytics and audit export.
- 14-day proof-of-value workflow.
- SOC 2 Type I readiness.

### 6–12 months: Scale

- Azure and Kubernetes.
- ServiceNow and leading CNAPP/VM connectors.
- Private connectivity, regional deployment, advanced RBAC.
- Control coverage and alternative break-point simulation.
- SOC 2 Type II and ISO 27001 program.

### 12–18 months: Controlled automation

- Optional in-account executor for a small set of reversible changes.
- Change preview, approval policies, maintenance windows, rollback, and automatic
  verification.
- MSSP multi-tenant edition.
- Benchmarking based on anonymized, opt-in outcome cohorts.

## 17. Demo release acceptance

- Route loads at `/codex-gpt5.6-sol-xhigh`.
- “Seeded demo data” is continuously visible.
- Desktop at 1440×900 communicates the thesis without scrolling past the main
  decision queue.
- Mobile at 375×812 has no horizontal page overflow and preserves the full core
  workflow.
- User can switch scenarios, search/filter missions, open a mission, inspect
  factors and path, change lifecycle state, and reset demo state.
- Lifecycle changes survive reload through local storage.
- High-attention, normal, all-clear, missing-owner, stale-source, and disconnected
  integration states are represented.
- Charts include exact text summaries; color is never the only status signal.
- No action claims to modify a live cloud or ticketing system.
- No console errors.
- Lint, typecheck, and production build pass.

