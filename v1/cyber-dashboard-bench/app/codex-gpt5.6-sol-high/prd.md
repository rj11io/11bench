# Product requirements document — Breakline

**Status:** Demo-ready product definition  
**Date:** 2026-07-16  
**Owner:** Product  
**Category:** Cloud-first Continuous Threat Exposure Management (CTEM) / exposure remediation orchestration

## 1. Product thesis

Cloud security teams already have scanners, posture tools, identity data, and ticketing systems. Their failure mode is not a lack of findings; it is an inability to decide which cross-domain change will reduce the most material risk and mobilize the team that owns that change.

**Breakline turns existing cloud, identity, vulnerability, and asset context into explainable breach paths. It ranks “Control Cuts”—the smallest changes expected to break the most credible paths to critical assets—then previews the effect and generates an owner-ready remediation brief.**

### Differentiated promise

Within the first review session, a cloud security engineer can answer:

- Which critical service is reachable and how?
- Why is this path urgent now?
- Which single change creates the most defensible reduction?
- What evidence or assumptions could change that decision?
- Who needs to act, by when, and exactly what should they do?

### Positioning

For cloud security teams that are buried in cross-domain findings, Breakline is the remediation decision layer that proves which change breaks the most breach paths and gets it safely into an owner's hands. Unlike scanner-first vulnerability management or broad CNAPP dashboards, Breakline begins with critical business outcomes and optimizes the last mile from exposure evidence to verified change.

### Product principles

1. **Outcomes over findings:** count paths broken and critical targets isolated.
2. **Evidence over authority:** every recommendation shows its source, freshness, and assumptions.
3. **Minimum effective change:** rank the smallest control change that produces the largest modeled reduction.
4. **Owner empathy:** remediation must be implementable, testable, and reversible by the team receiving it.
5. **Verification over ticket closure:** only fresh evidence or approved time-bound acceptance resolves exposure.
6. **No fake precision:** the Priority Index is an ordering tool, never a breach probability.

## 2. Users and buying context

### Primary user

**Cloud Security / Security Platform Engineer**

- Works in a 200–5,000 employee organization.
- Supports AWS/Azure/GCP plus Entra ID or Okta.
- Has 2–8 people across cloud security and security engineering.
- Consumes several posture and vulnerability sources.
- Can investigate and recommend but often cannot make the production change.

**Jobs**

- Identify critical cloud breach paths before they become incidents.
- Defend remediation priority with technical and business evidence.
- Reduce review time and duplicate tickets.
- Route exact work to cloud, identity, and application owners.
- Verify that a change truly removed reachability.

**Pains**

- Thousands of findings with inconsistent scores.
- A vulnerability and an entitlement look unrelated in separate tools.
- Critical asset labels are incomplete.
- Ticket owners ask for context already available elsewhere.
- Security scores move without explaining the actual protection outcome.
- “Resolved” tickets remain observable in source data.

### Secondary users

**Vulnerability Manager**

- Needs KEV/EPSS/CVSS and SLA evidence.
- Wants to know which vulnerable assets participate in meaningful paths.

**IAM / Identity Engineer**

- Needs exact identity, role, policy, and inherited-permission evidence.
- Wants a least-privilege change and rollback guidance.

**Cloud / Platform Owner**

- Receives a remediation brief.
- Needs resource names, blast radius, safe sequence, tests, and due-date rationale.

**CISO / VP Security**

- Economic buyer.
- Needs protection outcomes, ownership, overdue risk decisions, coverage, and audit evidence.

### Buying trigger

- Confirmed or suspected access path to a critical system.
- CNAPP or vulnerability-management renewal/consolidation.
- Cloud migration expands accounts, subscriptions, or identity complexity.
- Board or audit request for defensible remediation prioritization.
- Material remediation backlog or repeated SLA misses.
- Incident exposes a failure in critical-asset ownership.

## 3. Scope

### MVP / production v1 scope

- Read-only ingestion from:
  - AWS, Azure, and GCP asset/configuration inventories;
  - Entra ID and Okta identity/permission relationships;
  - one or more vulnerability sources;
  - CMDB/service catalog and criticality labels;
  - Jira and ServiceNow for workflow.
- Normalize entities and relationships into an exposure graph.
- Identify modeled paths from plausible entry conditions to critical targets.
- Rank breach paths using transparent factors.
- Generate candidate Control Cuts.
- Simulate the modeled effect of one or more cuts without changing production.
- Create/edit an owner-ready remediation brief.
- Assign, set due date, route to ticketing, and track state.
- Refresh evidence and verify closure.
- Record exceptions, approvers, reasons, expiration, and compensating controls.
- Provide outcome, SLA, coverage, and audit reporting.

### Demo scope

The frontend demo uses seeded, explicitly labeled data and no external services. It demonstrates:

- high-attention, normal, and clear/empty estate scenarios;
- ranked breach paths;
- explainable path scoring and evidence;
- candidate Control Cuts and what-if risk reduction;
- assigning a remediation owner and moving it into progress;
- persisted local workflow state;
- a decision timeline and demo-data/source-coverage notice;
- desktop and mobile layouts.

### Non-goals

- No live scanning, exploitation, penetration testing, or active validation.
- No claim to block attacks or enforce cloud configuration.
- No SIEM replacement, incident-response case management, or alert triage feed.
- No autonomous production changes in v1.
- No universal quantitative cyber-risk or loss model.
- No full CMDB, identity-governance, or patch-management replacement.
- No board portal in the initial demo.
- No generative AI as a required dependency; summaries must be reproducible from structured evidence.

## 4. Core workflows

### Workflow A — Daily priority review

1. User opens Mission Control.
2. System shows source coverage/freshness and changes since the last review.
3. User sees no more than five recommended Control Cuts and the highest-attention breach paths.
4. User filters by critical target, owner, status, environment, or evidence confidence.
5. User selects a path.
6. System displays path sequence, urgency, score factors, evidence state, and candidate cuts.

**Acceptance criteria**

- The top path names a critical target and entry condition.
- Each ranking factor can be inspected.
- KEV, EPSS, CVSS, reachability, criticality, and confidence retain distinct labels.
- Unknown or stale data lowers confidence and is visible.
- Filters are keyboard operable and preserve the current selection when possible.

### Workflow B — Compare and simulate a Control Cut

1. System proposes 1–3 remediation options for the selected path.
2. Each option shows owner domain, estimated effort, evidence, paths broken, critical targets isolated, change type, and reversibility.
3. User toggles a proposed cut into the simulation.
4. System recalculates the modeled before/after state.
5. User can combine cuts or reset.

**Acceptance criteria**

- Simulation is visibly labeled “modeled preview; no production change.”
- Before/after values include open critical paths and reachable critical assets.
- Selecting a cut highlights the path edge/node it addresses.
- Effort includes provenance and can be edited by an authorized user in production.
- No option claims guaranteed prevention.

### Workflow C — Mobilize an owner

1. User selects the preferred Control Cut.
2. System generates a brief containing outcome, evidence, exact resource, requested change, test, rollback, due-date rationale, and verification method.
3. User selects an owner and due date.
4. User creates a ticket or records an internal assignment.
5. State becomes Planned or In progress and is visible in the path list.

**Acceptance criteria**

- Required fields: title, owner, due date, requested change, validation, rollback, source snapshot.
- Duplicate open work for the same control is detected.
- State and assignment changes appear in the audit timeline.
- The demo persists state in `localStorage`.
- The UI never implies that the demo created an external ticket.

### Workflow D — Verify or accept

1. Integration refresh detects changed evidence.
2. Path is re-evaluated.
3. If the enabling relationship is absent, state becomes Awaiting verification and then Verified.
4. If still present, state returns to In progress with an explanation.
5. Authorized approver can accept risk with rationale, compensating control, and expiration.

**Acceptance criteria**

- Ticket closure alone does not verify a path.
- Verification records source version and timestamp.
- Accepted risk always has approver and expiration.
- Expired acceptance returns the path to attention.

## 5. Functional requirements

### FR1. Critical asset model

- Import and manually define critical assets.
- Record business service, owner, data sensitivity, availability tier, environment, and regulatory tags.
- Show classification source and confidence.
- Allow protected manual overrides with audit history.

### FR2. Exposure graph

Node types:

- external entry / internet-facing service;
- workload or endpoint;
- software vulnerability;
- secret / credential;
- human identity;
- workload identity / service principal;
- group / role / policy;
- data store;
- business service / critical target;
- security control.

Edge types:

- exposed to;
- runs / contains;
- vulnerable to;
- authenticates as;
- can assume / can impersonate;
- member of / inherits;
- can read / write / administer;
- reaches;
- mitigated by;
- owned by.

Each relationship stores source, first seen, last seen, observed/inferred/assumed state, confidence, and evidence reference.

### FR3. Breach-path generation

- Start from plausible, externally or internally reachable entry conditions.
- End at classified critical targets.
- Support software, configuration, secret, and identity enabling steps.
- Deduplicate materially equivalent paths.
- Bound displayed path length and provide collapsed steps where necessary.
- Map applicable steps to MITRE ATT&CK tactics/techniques.
- Exclude a path if data conclusively shows a blocking control; lower confidence if control evidence is unknown.

### FR4. Priority Index

Display and version these factor groups:

- reachability (30%);
- threat evidence (25%);
- business impact (25%);
- convergence (10%);
- evidence confidence/freshness (10%).

Rules:

- KEV evidence supersedes EPSS prediction for exploit-state labeling.
- EPSS stays a probability with source date.
- CVSS Base stays severity; Environmental/Threat values are shown if supplied.
- Missing data cannot produce a “low risk” result by default.
- Score changes must show which factor changed.

### FR5. Control Cuts

- Generate candidate changes at one or more steps in the path.
- Estimate paths removed, targets isolated, effort, owner domain, and rollback complexity.
- Rank by expected weighted reduction per effort.
- Merge duplicate control changes that affect multiple paths.
- Explain why lower-ranked options are less efficient or less certain.

### FR6. Simulation

- Apply candidate cuts to a copy of the graph.
- Recompute path reachability and outcome measures.
- Preserve a comparison snapshot.
- Never write to connected controls.
- Export/share a simulation link in production.

### FR7. Workflow and audit

Statuses:

- Needs decision;
- Planned;
- In progress;
- Awaiting verification;
- Verified;
- Accepted until;
- Dismissed as invalid.

Audit events:

- path created/changed;
- score factor changed;
- user viewed evidence;
- simulation created;
- cut selected;
- owner/due date changed;
- ticket linked;
- exception proposed/approved/expired;
- evidence refreshed;
- verification outcome.

### FR8. Search, filter, and saved views

- Search by asset, identity, CVE, business service, owner, or ticket.
- Filter by priority, status, critical target, cloud, environment, owner, KEV, confidence, and overdue state.
- Save personal and shared views.
- Default views: Needs decision, My team, KEV paths, Critical assets, Awaiting verification.

### FR9. Notifications

- Notify on new critical path, material priority increase, owner assignment, overdue decision, failed verification, and expiring acceptance.
- Digest by default; immediate notification only for policy-defined high-attention changes.
- Support Slack/Teams, email, Jira, and ServiceNow in production.

### FR10. Analytics and reporting

Operational:

- median time from path creation to owner;
- median time to decision;
- median time to verified reduction;
- acceptance/decline rate of recommended cuts;
- overdue work;
- verification failure rate.

Outcome:

- open critical paths;
- critical targets reachable;
- weighted paths broken;
- critical targets isolated;
- recurring control causes;
- coverage and freshness.

Trust:

- percentage of relationships observed vs inferred;
- source freshness SLA;
- critical assets with confirmed owner;
- recommendations with complete rollback/validation.

## 6. Data and integration assumptions

### Data model

Core objects:

- `Entity`
- `Relationship`
- `Finding`
- `CriticalAssetProfile`
- `BreachPath`
- `PathStep`
- `Evidence`
- `PrioritySnapshot`
- `ControlCut`
- `Simulation`
- `RemediationBrief`
- `Assignment`
- `Exception`
- `Verification`
- `AuditEvent`

### Integration assumptions

- Connections are read-only by default and use least-privilege roles.
- Cloud graph sources refresh at least every 4 hours; identity at least hourly where APIs allow; vulnerability/threat data daily or event-driven.
- Ticketing writes are optional and separately scoped.
- Breakline stores normalized metadata and evidence references, not workload content or secrets.
- Raw credentials, tokens, and sensitive payloads are never ingested.
- A connector health record includes last success, partial failure, permissions, object counts, and schema version.
- Production supports regional processing and customer-defined retention.

## 7. Security, privacy, permissions, and trust

### Security requirements

- Encryption in transit and at rest.
- Tenant isolation with automated authorization tests.
- SSO/SAML/OIDC and SCIM for Business tier and above.
- Short-lived connector credentials; cloud role assumption where possible.
- Secrets stored in a managed secrets service and never shown after creation.
- Signed audit export and immutable security-event retention.
- Secure SDLC, dependency scanning, penetration testing, and incident-response plan.
- No production control writes in v1.

### RBAC

- **Viewer:** view permitted paths and reports.
- **Analyst:** investigate, simulate, comment.
- **Remediation manager:** assign, create tickets, edit briefs.
- **Risk approver:** approve time-bound acceptance.
- **Integration admin:** configure connectors.
- **Tenant admin:** roles, policies, retention.

Object-level permissions must respect cloud account/subscription/project and business-service boundaries. Sensitive identity and data-store details may be redacted while preserving enough path structure to explain priority.

### Privacy

- Data minimization: store identifiers and configuration evidence needed for the path, not file contents.
- Pseudonymize user display where a role view does not require personal identity.
- Support access/export/delete workflows for applicable personal data.
- Configurable retention for evidence and audit history.
- No customer data used to train shared models without explicit opt-in.

### Trust requirements

- Show coverage, freshness, confidence, and relationship state.
- Publish score methodology and version.
- Keep source values distinct from Breakline-derived values.
- Let authorized users dispute an edge/finding and record the outcome.
- Explain changed rankings.
- Never label a modeled preview as validated, remediated, or live.

## 8. Onboarding, activation, and retention

### Onboarding

1. Create tenant and select region.
2. Connect one cloud and one identity provider read-only.
3. Connect/import a vulnerability source.
4. Import services/owners or define critical assets manually.
5. Review connector coverage and fix permissions.
6. Generate first path set.
7. Conduct a guided Critical Path Review.
8. Connect ticketing after read-only value is proven.

### Activation

An account is activated when, within 14 days:

- at least one cloud and identity source are healthy;
- at least five critical assets have confirmed owners;
- a user reviews evidence for a critical path;
- a Control Cut is simulated;
- one remediation brief is assigned.

### Retention loop

- New/changed path appears.
- Team reviews the most efficient cut.
- Owner acts.
- Breakline verifies the graph change.
- Outcome report shows fewer reachable critical assets.
- Recurring root cause informs policy-as-code or platform hardening.

## 9. Success metrics and analytics

### North-star metric

**Verified critical-path reduction:** weighted breach paths to critical assets removed through verified control changes per active customer per month.

### Leading metrics

- time to first critical path;
- time to first simulation;
- percentage of recommendations assigned;
- median time to owner;
- percentage of briefs accepted without clarification;
- weekly active remediation reviewers;
- number of connected sources with healthy freshness.

### Quality guardrails

- recommendation dispute rate;
- failed verification rate;
- reopened/recurring path rate;
- stale source rate;
- percentage of low-confidence critical paths;
- support tickets about score inconsistency;
- duplicate ticket rate.

### Demo analytics events

- `scenario_changed`
- `path_selected`
- `filter_changed`
- `evidence_expanded`
- `cut_toggled`
- `simulation_reset`
- `owner_changed`
- `remediation_started`
- `workflow_reset`

The demo does not send analytics externally; these events define production instrumentation.

## 10. Packaging and GTM

### Pricing hypothesis

- **Team — $24k/year:** 2,500 connected entities, 5 users, core Control Cuts, Jira, Slack, 90-day audit.
- **Business — $60k/year:** 15,000 entities, unlimited users, SSO/SCIM/RBAC, ServiceNow, custom policies, one-year audit.
- **Enterprise — custom:** higher capacity, data residency, premium connectors, multi-tenant/MSSP, extended retention, support SLA.

Entities are counted once even if observed by multiple sources. Simulations and viewers are not metered.

### Launch motion

**Critical Path Review**, a time-boxed 14-day proof:

- customer identifies 5–20 crown-jewel assets;
- Breakline connects read-only sources;
- joint review validates top paths and recommended cuts;
- customer assigns at least one remediation;
- success report compares time-to-decision and modeled reduction.

### GTM narrative

“You already know you have too many findings. Breakline shows the few changes that actually disconnect attackers from the services your business cannot lose—and gives each owner a change they can safely ship.”

### Channels

- direct sales to cloud-forward mid-market;
- cloud security and vulnerability-management consultants;
- MSSP/vCISO after multi-tenant roadmap;
- co-sell/integration marketplaces after connector maturity.

## 11. Risks, dependencies, and unknowns

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Incomplete graph creates false reassurance | Critical | Coverage meter, confidence, no “all clear” without policy threshold, connector health gates. |
| Customers dispute path validity | High | Evidence at every edge, observed/inferred labels, dispute workflow, score versioning. |
| Remediation estimates are wrong | High | Show provenance, allow owner edits, learn from historical medians, never guarantee duration. |
| Incumbents copy workflow | High | Focus on cross-vendor neutrality, owner brief quality, verification history, and fast time-to-value. |
| Integration breadth delays product | High | Start with AWS/Azure, Entra/Okta, one VM source, Jira/ServiceNow. |
| Security teams cannot identify critical assets | High | Guided import from service catalog, usage heuristics, explicit confidence and owner confirmation. |
| Graph visualization becomes complex | Medium | Show task-sized paths, collapse repeated steps, use an equivalent ordered list. |
| “AI” expectation creates trust risk | Medium | Structured deterministic summaries by default; label any model-produced content and preserve sources. |

Unknowns to validate:

- Will owners accept effort estimates from security?
- Is simulation persuasive enough to change remediation priority?
- Which source combination yields a credible first path fastest?
- Does the buyer prefer connected-entity capacity or protected-critical-asset pricing?
- How much path detail can be exposed across organizational permissions?

## 12. Roadmap

### Demo

- Seeded Mission Control.
- Three estate states.
- Path investigation, score explanation, evidence.
- Control Cut simulation.
- Owner assignment and persisted workflow state.

### v1 — 0–6 months

- AWS, Azure, Entra, Okta, one vulnerability source.
- Critical asset onboarding.
- Graph and Priority Index.
- Control Cuts, briefs, Jira/ServiceNow.
- Evidence refresh, verification, RBAC, audit.

### v1.5 — 6–12 months

- GCP, GitHub, Kubernetes, secrets managers.
- Shared simulations and policy customization.
- Slack/Teams review.
- Recurrence analysis and platform-control campaigns.
- Executive outcome reporting.

### v2 — 12–24 months

- Hybrid/on-prem identity.
- Detection/incident context enrichment.
- Safe validation integrations.
- Historical effort learning.
- MSSP multi-tenancy.
- Policy-as-code pull requests with human approval.

