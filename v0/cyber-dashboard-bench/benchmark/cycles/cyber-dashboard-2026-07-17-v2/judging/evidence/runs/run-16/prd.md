# PRD - Chokepoint

## 1. Product summary

Product name: Chokepoint

Category:

- Exposure management
- Cloud attack-path remediation operations

Product thesis:

Cloud-native mid-market companies already own enough discovery tooling to know they have risk. What they lack is an operating layer that turns scattered exposure findings into a small number of owner-ready remediation missions with defensible priority, clear blast radius, and measurable risk burn-down.

Differentiated promise:

- Turn toxic combinations into owner-ready remediation missions in one sprint.

Positioning:

- Chokepoint is not a CNAPP, SIEM, scanner, or ticketing replacement.
- It sits on top of existing cloud exposure, identity, and vulnerability signals.
- It tells a lean security team what to fix first, why it matters, who should fix it, and whether the risk is really going down.

## 2. Users and buying context

### Primary user

Cloud Security Engineer or Exposure Management Lead

- Works inside a 2 to 10 person security team
- Owns triage across cloud posture, identity, and vulnerability findings
- Needs to defend priorities to engineering and leadership

### Secondary users

- Platform Engineering Manager
- Identity or Infrastructure Owner
- Director of Security
- CISO or executive viewer

### Jobs to be done

- Reduce thousands of findings into a ranked set of real remediation decisions.
- Explain why one exposure matters more than another.
- Hand off the right fix package to the right owner without losing context.
- Track SLA, reopen risk if it regresses, and report burn-down to leadership.

### Core pains

- Severity-only prioritization produces too many false priorities.
- Attack-path context is trapped inside different tools or dashboards.
- Ownership is ambiguous across cloud, identity, and engineering boundaries.
- Analysts must manually rewrite technical findings into owner-ready work.
- Leadership sees counts, not defensible business-risk reduction.

### Buying trigger

- The company has adopted cloud security tooling but still cannot answer "what do we fix this sprint?"
- A recent audit, board request, KEV-driven scramble, or near miss exposed weak prioritization and ownership tracking.
- Security wants an overlay that improves existing tool ROI faster than replacing the platform stack.

## 3. Scope

### In scope for v1

- Ingested exposure missions built from multiple signals
- Attack-path-centric prioritization
- Mission queue with filters, SLA state, and owner assignment
- Evidence-rich mission detail
- Workflow states for notify, progress, resolve, reopen, and accepted exception
- Risk burn-down and choke-point summaries
- Audit trail for trust and accountability

### Non-goals

- Live incident response
- Endpoint or network telemetry collection
- Vulnerability scanning
- Ticketing-system replacement
- Automated patch execution
- Full executive GRC reporting platform

## 4. Product principles

- Prioritize combinations, not isolated findings.
- Separate simulated exposure from active attack.
- Default to explainability over magic.
- Optimize for the lean operator first, executive reporting second.
- Make owner handoff as important as analyst triage.

## 5. Core workflows

### Workflow A: Morning triage

1. Security operator opens the overview and sees the highest-risk open missions.
2. They confirm why a mission is top-ranked using exploitability, path, data impact, and control-gap evidence.
3. They decide whether to notify an owner, suppress as accepted exception, or mark as already in progress.

### Workflow B: Owner handoff

1. Operator opens a mission.
2. They review recommended fix bundle, blast radius, and business service.
3. They assign a primary owner and move the mission to "Owner notified" or "Fix in progress."
4. The system records the state change in the audit trail.

### Workflow C: Burn-down verification

1. Operator reviews open versus resolved risk over time.
2. They check whether the same business service or choke point keeps reopening.
3. They escalate breached SLAs or confirm resolution.

### Workflow D: Exception handling

1. Operator documents why a mission is accepted or suppressed.
2. The system retains the decision and reviewer in audit history.
3. If the exposure reopens or evidence changes, the mission can return to active review.

## 6. Functional requirements

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| FR-1 | The system must present a ranked mission queue. | Missions can be sorted and filtered by state, owner, and risk. Highest-risk missions appear first by default. |
| FR-2 | Every mission must show path-aware prioritization. | Detail view includes exploitability, entry point, choke point, target asset or data, and business-service context. |
| FR-3 | Every mission must clearly indicate whether it is simulated exposure or active threat. | Exposure missions are explicitly labeled as demo or simulated exposure; the UI never implies a live security control. |
| FR-4 | Operators must be able to assign ownership. | User can assign a predefined owner team and see the assignment reflected in the queue and detail view. |
| FR-5 | Operators must be able to move missions through workflow states. | User can move a mission into owner notified, fix in progress, resolved, or accepted exception states. |
| FR-6 | The product must preserve workflow state. | State changes persist via localStorage across refreshes in the demo. |
| FR-7 | The product must produce an auditable timeline. | Each state change adds a timestamped event with actor and summary. |
| FR-8 | The product must show burn-down and load distribution. | Overview includes current risk load, status mix, and trend summaries derived from mission state. |
| FR-9 | The product must support empty and high-attention states. | At least one filter path shows an empty queue; at least one seeded mission is SLA-breached and called out visibly. |
| FR-10 | The product must support mobile and desktop use. | At 375x812 no horizontal overflow occurs and all primary actions remain reachable. |
| FR-11 | The product must support accessible dense data review. | The queue uses semantic table markup on desktop, accessible labels, keyboard-reachable controls, and text alternatives for chart meaning. |
| FR-12 | The product must make remediation actionable. | Detail panel includes a concrete fix bundle with owner-ready steps rather than only raw findings. |

## 7. Demo-specific feature set

### Must-demo features

- Risk overview with active, breached, and resolved counts
- Mission queue with search and state filters
- Mission detail panel with path diagram and evidence
- Owner assignment and workflow actions
- Audit trail with appended events
- Reset demo state

### Nice-to-have, not required for v1 demo

- Write-back to Jira or GitHub
- True notifications
- Real integration settings
- Custom scoring model builder

## 8. Data model

### Core objects

#### ExposureMission

- `id`
- `title`
- `summary`
- `riskScore`
- `severity`
- `workflowState`
- `ownerTeam`
- `businessService`
- `crownJewel`
- `slaStatus`
- `dueDate`
- `lastValidatedAt`
- `findingCount`
- `controlGapSummary`

#### AttackPath

- `entryPoint`
- `pathNodes[]`
- `chokePoint`
- `target`
- `targetType`
- `simulatedOrValidated`

#### EvidenceSignal

- `type` such as KEV, external exposure, excessive privilege, secret exposure, sensitive data, no MFA
- `label`
- `impactOnScore`

#### RemediationBundle

- `steps[]`
- `expectedRiskReduction`
- `ownerDependencies`
- `rollbackRisk`

#### OwnerTeam

- `id`
- `name`
- `domain`
- `contact`
- `coverageConfidence`

#### AuditEvent

- `id`
- `timestamp`
- `actor`
- `action`
- `details`

## 9. Integration assumptions

Required upstream inputs for production:

- Cloud posture and attack-path data from CNAPP or CSPM tools
- Vulnerability context including KEV or exploit-likelihood signals
- Identity and entitlement context
- Asset criticality or service catalog mapping
- Ticketing or work-management destination

Expected early integrations:

- AWS Security Hub
- Microsoft Defender or Security Exposure Management
- Google Security Command Center
- Wiz, Tenable, or Rapid7
- Jira or ServiceNow
- GitHub for code-owner context

Production assumption:

- Chokepoint is an overlay. Customers will not buy it to replace scanners.

## 10. Security, privacy, permissions, auditability, and trust

### Security and privacy requirements

- Least-privilege read-first integrations by default
- Clear separation between imported source facts and Chokepoint-generated summaries
- No customer data used to train shared models without explicit opt-in
- Redaction support for sensitive identifiers in exported executive views

### Roles

- Security Operator: triage, assign, progress, resolve
- Security Lead: all operator rights plus exception approval
- Engineering Owner: view assigned missions and remediation bundle
- Executive Viewer: read-only rollups and mission summaries

### Trust requirements

- Every priority score must be decomposable into visible factors.
- Simulated attack-path data must never be labeled as an active attack.
- Accepted exceptions must store approver and rationale.
- Reopened issues must visibly preserve previous history.

## 11. Onboarding, activation, retention, and analytics

### Onboarding

- Connect one cloud exposure source
- Map business services and owners for the top ten critical services
- Validate first prioritized mission list

### Activation milestone

- User reviews top five missions
- Assigns at least three to owners
- Moves at least one to fix in progress

### Retention loop

- Weekly exposure review
- Daily triage of new high-risk missions
- Monthly executive review of burn-down and repeat choke points

### Success metrics

- Median time from mission creation to owner notification
- Median time to remediation for high-risk missions
- Percentage of open risk contained in top ten missions
- Reopen rate within 30 days
- Percentage of missions with mapped owner and business service
- Risk score reduced per sprint

### Product analytics

- Filter usage
- Detail-panel opens
- Owner assignments
- Workflow transitions
- Time spent on top-risk missions
- Reset and revisit frequency for unresolved breached items

## 12. Packaging and pricing hypothesis

Packaging:

- Core platform fee based on connected cloud accounts and active identity surface
- Includes a fixed number of operator seats and executive viewers
- Expansion lever is workflow depth and additional integration packs

Pilot motion:

- 90-day pilot
- Connect one exposure source plus one ticketing destination
- Measure owner notification time, first-sprint remediation throughput, and risk concentration reduction

Pricing hypothesis:

- Enterprise annual subscription with services-assisted onboarding
- Land as a focused remediation-operations purchase under the security leader or cloud-security budget

## 13. GTM narrative

Core narrative:

- "You already know you have too many findings. Chokepoint tells your team what to fix first and gets the right owner moving."

Ideal first customers:

- Cloud-native mid-market firms using at least one CNAPP, CSPM, or exposure-management tool already
- Security teams that report into a CISO but depend heavily on platform engineering

Why they buy:

- Faster triage
- Better engineering handoff
- Defensible risk-reduction reporting
- Better return on existing security-tool spend

Sales motion:

- Demo-led
- Integration-led proof of value
- Security buyer with engineering stakeholder validation

## 14. Risks, dependencies, and unknowns

### Risks

- Poor upstream data quality can weaken path trust.
- Owner mapping may be incomplete in many customer environments.
- Customers may compare the product against broader exposure platforms and expect more discovery breadth.
- AI summaries may lose trust if they omit evidence.

### Dependencies

- Reliable ingestion from upstream tools
- Business-service and owner metadata
- At least one workflow destination or source-of-truth system

### Unknowns

- Whether customers prefer mission objects or path objects as the primary record
- How much automation buyers will allow before human approval
- Whether pricing should track assets, identities, or connected sources

## 15. Post-demo roadmap

### Next 2 quarters

- Jira and ServiceNow write-back
- Reopen-on-drift logic from source systems
- Owner-confidence scoring
- Saved views for executive and engineering personas
- Ticket bundling by shared choke point

### Next 3 to 4 quarters

- Runtime validation to distinguish likely exploitable versus merely reachable
- GitHub pull-request context and code-owner mapping
- Exception expiry and review policies
- Benchmarking against peer remediation speed and mission mix
- Multi-team collaboration and approval routing
