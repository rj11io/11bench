# PRD: Strata

## Product thesis

Strata is an attack-path remediation operations workspace for cloud-native security teams. It helps a security engineering manager turn fragmented exposure findings into a short list of high-leverage remediation campaigns that reduce real attack paths to critical business services.

Category: Exposure management / attack-path operations.

Positioning: "Cut through vulnerability noise by fixing the few choke points that actually open routes to crown-jewel systems."

Differentiated promise: Strata does not stop at prioritization. It groups issues into remediation campaigns with ownership, due dates, blast-radius reduction estimates, and verifiable closure.

## Users

### Primary user

Security Engineering Manager or Exposure Management Lead at a cloud-native company with 300 to 5,000 employees.

Jobs to be done:

- Decide what the team should fix this week.
- Defend prioritization to engineering and leadership.
- Route work to the right owner with enough context to act.
- Track whether remediation actually reduced exploitable paths.

Pains:

- Thousands of findings across scanners and posture tools.
- High-severity findings that are not actually reachable.
- Ownership ambiguity across cloud, IAM, endpoint, and app teams.
- No shared system for risk rationale, SLAs, and verification.

Buying trigger:

- Backlog growth, repeated audit findings, or recent near miss tied to a known exposure.
- Leadership pressure to show measurable reduction in exploitable risk.

### Secondary users

- Cloud Security Engineer
- Vulnerability Program Manager
- Infrastructure / Platform owner receiving remediation work
- CISO or VP Security consuming roll-up metrics

## Scope

### In scope for demo / v1

- Unified dashboard of prioritized attack-path choke points
- Explainable exposure scoring using exploit evidence, asset criticality, exposure reachability, and age
- Detail panel for a selected choke point with path narrative and affected assets
- Remediation campaign creation, assignment, progress, and verification status
- Filters for environment, owner, and attention state
- Activity log and notes for trust and auditability
- Persisted local state for campaign changes and dismissals

### Non-goals

- Live scanning or detection
- Full graph exploration engine
- Real ticketing, IAM, or cloud remediation execution
- Case management for active incidents
- Full executive board reporting suite

## Core workflows

### 1. Morning prioritization

1. User lands on the route and sees compressed posture.
2. User reviews the "priority queue" ranked by impact score.
3. User opens the highest-value choke point and sees why it is ranked high.
4. User confirms recommended remediation package.

Acceptance criteria:

- User can identify the top 3 items needing action within 30 seconds.
- Each item exposes rationale without leaving the queue.

### 2. Launch remediation campaign

1. User selects a choke point.
2. User assigns owner, due date, and campaign note.
3. User starts a campaign.
4. Campaign appears in the active campaign rail with progress and expected path reduction.

Acceptance criteria:

- Campaign creation requires no navigation away from the main surface.
- Resulting state persists across reloads.

### 3. Verify or suppress

1. User marks a campaign as mitigated or dismisses a low-value item.
2. Dashboard updates posture and activity feed.
3. Suppressed items remain labeled as demo-only operational decisions, not deleted.

Acceptance criteria:

- User can move an item between queued, active, mitigated, and snoozed states.
- State changes update relevant metrics immediately.

## Functional requirements

### Prioritization

- System must score each exposure from 0 to 100.
- Score inputs must include exploit evidence, blast radius, critical asset linkage, internet reachability, and age.
- UI must expose the main reasons behind the score.

### Data model

- Exposure object: id, title, category, severity, score, exploitEvidence, businessService, owner, status, affectedAssets, pathNodes, controls, dueDate, createdAt, notes.
- Campaign object: id, exposureId, title, owner, dueDate, state, tasksCompleted, tasksTotal, projectedPathReduction, lastUpdated.
- Activity object: id, timestamp, actor, action, target.

### Campaigning

- User must be able to create a campaign from an exposure.
- Campaign must capture owner, due date, note, and projected path reduction.
- Campaign state must support queued, active, verification, and done.

### Explainability and trust

- Demo must clearly state that all data is seeded.
- Freshness timestamp and connector coverage assumptions must be visible.
- Every prioritization card must include human-readable rationale.

### Permissions and auditability

- Demo assumes role-based views: Exposure Lead, Analyst, Exec.
- Only Exposure Lead can change campaign state in the model.
- Activity log records state changes, assignments, and dismissals.

### Security and privacy

- No real tenant or secrets.
- No outbound credentials or paid APIs.
- Local persistence only for demo state.
- Notes and audit trail are demo-only and labeled accordingly.

## Integrations and assumptions

- Assumed upstream sources: cloud posture scanner, vulnerability scanner, identity exposure source, external attack surface inventory, CMDB or business-service tags, ITSM.
- Demo uses seeded normalized objects instead of live connectors.
- Remediation verification is represented as a workflow state rather than an actual rescan.

## Onboarding and activation

- First-run state opens with one high-attention choke point and one active campaign to teach the model.
- Activation event: user launches first remediation campaign or marks first item verified.
- First-value moment: user sees one fix package that collapses multiple reachable paths.

## Retention and success metrics

- Weekly active exposure managers
- Campaigns launched per week
- Percentage of critical choke points with owners
- Median time from prioritized to campaign started
- Median days to verified mitigation
- Percent reduction in exposed crown-jewel paths
- Suppression ratio with later reversal rate

## Packaging and pricing hypothesis

- Core package: up to a defined asset band, cloud + vuln + identity connectors, campaign ops, executive summary
- Add-ons: external ASM, extra connectors, automated remediation integrations, board exports
- Pricing motion: annual platform subscription, asset-band based, with connector-based expansion

## GTM narrative

Security teams do not need more findings. They need a defensible weekly operating system for reducing exploitable paths to critical services. Strata lands beside the customer’s existing scanners and posture tools, produces a prioritized action backlog in days, and proves value when one campaign removes several attacker routes at once.

## Risks and dependencies

- Trust risk: opaque scoring would make the product look like another black-box risk score.
- Data-quality risk: weak ownership or asset criticality metadata will degrade prioritization.
- Category risk: large platform vendors already sell broad exposure products.
- Adoption risk: if engineering owners cannot consume campaigns, the product becomes read-only reporting.

Dependencies:

- Asset inventory with service ownership
- Basic critical asset tagging
- At least one vuln / posture data source
- ITSM or handoff process for remediation ownership

## Post-demo roadmap

1. Real connector ingestion and mapping health.
2. Ticketing integration with Jira and ServiceNow.
3. Verification loop via scanner and cloud-control checks.
4. Team-based permissions and saved views.
5. AI-generated remediation plans with change-risk estimation.
6. Executive trend reporting and quarterly exposure-review packs.
