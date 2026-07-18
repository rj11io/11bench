# PRD

## Product thesis

**Aegis Exposure Board** is a cloud exposure prioritization workspace for security teams that need to reduce exploitable risk faster than their current scanners, posture tools, and ticket queues allow.

The product promise is narrow and defensible:

- unify exposure signals into one prioritized remediation queue;
- explain why each item matters now;
- route it to an owner with an auditable trail;
- show leadership whether the backlog is shrinking.

This is an **exposure management** product, not a SIEM, SOAR, or general cyber platform.

## Category and positioning

- Category: cloud exposure management / risk-based vulnerability management.
- Positioning: “what should we fix this week, and why?”
- Differentiated promise: a queue built around active exploitation, internet reachability, asset criticality, and ownership quality, with a report-ready explanation for every ranked item.

## Users

### Primary user

**Cloud security engineer / exposure analyst**

- JTBD: decide which findings deserve immediate remediation, route them to the right owner, and verify closure.
- Pain: scanner noise, conflicting scores, unclear ownership, and too much manual correlation.

### Secondary user

**CISO / security leader**

- JTBD: understand whether the organization is reducing exploitable risk and where the team is stuck.
- Pain: counts without context, inability to defend prioritization, and opaque remediation progress.

### Tertiary user

**Service or application owner**

- JTBD: understand what to fix, by when, and what evidence proves it is safe to close.
- Pain: security tickets without enough context or a clear next step.

## Buying trigger

The strongest buying trigger is a combination of:

- cloud growth outpacing manual triage;
- public exposure or a known exploited vulnerability appearing in the estate;
- too many findings to route confidently;
- leadership pressure for a defensible, auditable reduction plan.

## Scope

### In scope

- ranked exposure queue with filters and search;
- explainable prioritization score and score breakdown;
- owner assignment and remediation status changes;
- evidence, audit trail, and remediation checklist;
- executive summary metrics and trend views;
- demo persistence using localStorage.

### Non-goals

- live scanning or agent deployment;
- authentication or enterprise SSO;
- ticketing backend;
- SOAR playbooks or automated containment;
- full compliance management platform;
- threat hunting or SIEM correlation.

## Core workflow

1. Ingest exposure data from scanners, posture tools, and ownership metadata.
2. Rank exposures by exploitability, reachability, asset criticality, and SLA pressure.
3. Review the queue and open the highest-confidence item.
4. Inspect evidence and understand why it outranks the rest.
5. Assign the item to the correct owner, set a due date, and attach notes.
6. Mark the state as in progress, suppressed, or resolved.
7. Review the backlog, trend, and audit trail to confirm progress.

## Functional requirements

1. The dashboard must show a ranked list of exposures with title, asset, owner, score, signals, due date, and state.
2. The dashboard must explain ranking with a human-readable score breakdown.
3. The dashboard must support filters for active exploitation, internet exposure, no owner, and SLA pressure.
4. The dashboard must allow a user to select an exposure and see evidence, remediation steps, and audit history.
5. The dashboard must allow changing ownership and remediation status from the detail view.
6. The dashboard must persist triage state locally for the demo.
7. The dashboard must clearly indicate that the data is synthetic and the controls are demo-only.
8. The dashboard must remain usable on desktop and mobile widths.

## Acceptance criteria

- The queue always sorts to show the highest-risk unresolved exposure first.
- Selecting an item updates the detail panel without a page reload.
- Owner changes, status updates, and notes persist after refresh.
- Filter combinations can produce an empty state with a useful recovery action.
- A critical or overdue state is visibly represented without relying on color alone.
- No horizontal overflow occurs at 375 px width.
- The UI includes at least one table-like data surface and one chart-based trend surface.
- The route passes lint, typecheck, and production build.

## Data and integrations

### Assumed inputs

- vulnerability scanner findings: CVE, severity, first seen, last seen;
- exploit intelligence: KEV membership, EPSS probability, public exploit notes;
- asset context: environment, internet reachability, criticality, blast radius;
- ownership metadata: team, approver, on-call owner, ticket queue;
- remediation metadata: due date, state, notes, audit trail.

### Integration assumptions

- scanner sources: Tenable, Defender for Cloud, Prisma Cloud, Rapid7, or similar;
- exploit signals: CISA KEV and FIRST EPSS;
- ownership source: CMDB, tags, or asset inventory;
- workflow source: Jira or ServiceNow for later roadmap phases.

## Security, privacy, permissions, and auditability

- Read-only by default.
- Role-based access should distinguish analysts, owners, and executives.
- Audit logs should record who changed priority, owner, state, and notes.
- Evidence should avoid secrets and should redact sensitive details by default.
- Exports should be scoped and stamped with timestamp, user, and filter context.
- The UI should never imply that demo data is live telemetry.

## Onboarding, activation, retention, and success metrics

### Onboarding

- connect the first scanner or import;
- map ownership tags or teams;
- choose the exposure policy baseline;
- review the first ranked queue.

### Activation

- first meaningful action: select an item, assign an owner, or suppress a false positive;
- first value moment: a user can explain why the top item outranks the rest.

### Retention

- users return to clear the queue, verify fixes, and review backlog burn-down;
- leadership returns for reporting and trend review.

### Success metrics

- time to first triage;
- time from discovery to owner assignment;
- percent of critical items with named owners;
- percent of KEV-linked items remediated inside SLA;
- reduction in overdue high-risk items;
- weekly active analysts and owners.

## Packaging and pricing hypothesis

- Product should be sold as a focused module inside a broader exposure platform.
- Pricing hypothesis: per managed asset band or per monitored cloud environment, not per dashboard seat.
- Starter motion: one cloud, one scanner, one ownership source.
- Expansion motion: more clouds, more business units, compliance exports, and richer attack-path analytics.

## Launch motion and GTM narrative

The best launch motion is design-partner-led:

- target cloud-first SaaS companies with lean security teams;
- sell the promise of reducing the exploitable backlog, not buying another dashboard;
- demo using imported scanner output and ownership metadata;
- show how the product explains priority and routes work to owners in one pass.

Narrative:

> Stop triaging every finding. Fix the exposures that are already exploitable, externally reachable, and attached to critical assets.

## Risks, dependencies, unknowns

- False confidence if the scoring model is too opaque.
- Poor asset ownership data will reduce queue quality.
- If scanner and CMDB data are inconsistent, priority explanations become brittle.
- Customers may expect automated remediation that is out of scope for the first release.
- Executive buyers may ask for compliance reporting before the product is ready for it.

## Post-demo roadmap

1. Add real integrations for scanner imports and ownership sync.
2. Add ticket creation and bidirectional status sync.
3. Add attack-path graph views for a selected exposure.
4. Add SLA policy configuration and exception management.
5. Add executive exports and scheduled reports.
6. Add API access for programmatic queue review.

