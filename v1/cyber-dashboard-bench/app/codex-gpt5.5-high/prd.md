# PRD: ResolvePoint Exposure Command

## Product Thesis

Security teams do not lose time because they lack another vulnerability score. They lose time because the score does not explain why a finding matters to the business, who owns it, what action will close it, and whether the fix actually reduced risk. ResolvePoint turns fragmented security findings into prioritized, owner-ready remediation action packs backed by exploit intelligence, asset criticality, attack path context, and an auditable decision trail.

## Category, Positioning, and Promise

- **Category:** risk-based exposure management and remediation workflow.
- **Positioning:** for lean security teams that need operational risk reduction without building a large vulnerability program office.
- **Differentiated promise:** "From exploited signal to verified owner action in one queue."
- **Not a generic dashboard:** ResolvePoint is deliberately centered on the daily exposure decision workflow: decide, assign, remediate, verify, and report.

## Users

### Primary User

**Exposure management lead / security engineering manager**

- Owns vulnerability and exposure reduction across cloud, endpoint, SaaS, identity, and externally exposed assets.
- Measured on critical exposure backlog, SLA attainment, exception quality, and incident-prevention posture.
- Pain: too many duplicate findings, inconsistent scoring, unclear owners, weak business context, manual ticketing, and disputes with engineering/IT teams.

### Secondary Users

- **Cloud/platform owner:** receives action packs and needs exact steps, affected assets, risk rationale, and safe scheduling guidance.
- **IT operations lead:** needs patch windows, ownership, and asset lists.
- **CISO / VP Security:** needs risk reduction trend, business-unit exposure, and audit-ready status.
- **GRC/risk partner:** needs exception rationale, review dates, and evidence of compensating controls.

## Jobs To Be Done

- When a new exploited vulnerability appears, decide within minutes whether it affects critical assets.
- When scanners produce thousands of findings, group duplicates into the smallest set of owner-ready fixes.
- When owners challenge remediation priority, explain the exploit, asset, identity, and data context.
- When remediation is deferred, record a defensible exception with review date and compensating controls.
- When a fix is complete, verify telemetry and show measurable risk reduction.

## Buying Trigger

- A KEV or ransomware-driven advisory affects the company's software stack.
- An audit flags missed patch SLA or weak vulnerability governance.
- A breach in the sector exposes the board to questions about exploitable vulnerabilities.
- Security budget is constrained and leaders need to prove which fixes lower the most risk.
- Tool consolidation pressure creates demand for a layer that reconciles scanner, CMDB, identity, and ITSM data.

## Scope

### In Scope for V1

- Ingest normalized findings from vulnerability scanners, cloud posture tools, EDR/XDR, identity systems, CMDB/asset inventory, and ITSM.
- Deduplicate findings into remediation packs by root cause, owner, asset group, and mitigation.
- Prioritize packs using KEV, EPSS, exploit maturity, internet exposure, asset criticality, identity path, sensitive data, business service, and compensating controls.
- Show a ranked action queue with explainable reasoning.
- Assign owners and create/update tickets in Jira or ServiceNow.
- Support statuses: New, In progress, Awaiting verification, Verified, Exception, Risk accepted, False positive.
- Capture comments, exception rationale, review date, compensating control, and audit events.
- Track risk reduction, SLA adherence, recurrence, and owner performance.

### Non-Goals

- Replace vulnerability scanners, SIEM, EDR, CNAPP, or ITSM systems.
- Perform live exploit testing in V1.
- Auto-patch production systems without human approval.
- Provide a complete executive risk quantification platform in the first release.
- Market as a production security control in the frontend demo; all data is demo data.

## Core Workflows

### Workflow 1: Triage Today's Highest-Risk Exposure

1. User opens the Focus Queue.
2. System ranks remediation packs by action bucket and priority score.
3. User selects a pack and reviews evidence, attack path, affected assets, SLA, owner, and recommended action.
4. User assigns owner or changes status.
5. System records audit event and persists state.

**Acceptance criteria**

- Queue sorting is deterministic and explainable.
- Each top item shows why it is prioritized.
- User can change status without leaving the view.
- User can see affected business service and owner.

### Workflow 2: Generate Owner-Ready Action Pack

1. User opens selected exposure.
2. System displays remediation steps, affected assets, expected verification source, and suggested ticket summary.
3. User assigns owner and sets status to In progress.
4. ITSM integration creates or updates a ticket in production; demo simulates state change only.

**Acceptance criteria**

- Action pack includes specific technical steps and business rationale.
- Owner can understand blast radius and deadline.
- Product labels demo data clearly.

### Workflow 3: Govern an Exception

1. User determines immediate fix is not viable.
2. User marks exposure as Exception review / Risk accepted.
3. System requires rationale, expiry/review date, compensating control, and approver in production.
4. Exception appears in risk register and does not silently disappear.

**Acceptance criteria**

- Exception state is visually distinct from verified/closed.
- Exception copy states residual risk remains.
- Audit trail records decision.

### Workflow 4: Verify and Report Risk Reduction

1. Owner reports fix complete or scanner retest detects closure.
2. System updates verification state.
3. Dashboard shows risk score reduced and SLA trend updated.
4. Executive view shows business-unit risk movement.

**Acceptance criteria**

- Verified state requires source timestamp in production.
- Demo can mark verified and persist state locally.
- Trend visualization remains readable on mobile and desktop.

## Functional Requirements

- Prioritized queue with filters for All, Act now, Unassigned, Exceptions, and Verified.
- Search across exposure title, CVE, owner, business unit, and asset.
- Detail pane with evidence chips: KEV, EPSS probability/percentile, CVSS, internet exposure, asset criticality, identity path, data sensitivity, source confidence.
- Attack-path visualization.
- Remediation action list.
- Status controls and owner assignment.
- Local persistence for demo interactions.
- Empty state when filters return no items.
- High-attention state for overdue/Act now items.
- Responsive layout from 375x812 to 1440x900.

## Data Model

### Core Entities

- **ExposurePack:** id, title, actionBucket, score, status, severity, rootCause, businessService, businessUnit, owner, SLA, tags, evidence, remediation, verification.
- **Finding:** scanner/source id, CVE/CWE/config id, severity, firstSeen, lastSeen, affected asset.
- **Asset:** id, hostname/name, type, environment, internet exposure, criticality, owner, business service, data classification.
- **IdentityPath:** principal, privilege level, reachable assets, controls.
- **RiskSignal:** KEV, EPSS, CVSS, ransomware association, exploit maturity, threat intel, detection source.
- **Action:** recommended fix, compensating control, ticket id, assignee, due date, verification method.
- **AuditEvent:** actor, timestamp, previous state, new state, comment, source.

### Integration Assumptions

- Vulnerability scanners: Tenable, Qualys, Rapid7, Snyk, Wiz.
- Cloud/security posture: AWS Security Hub, Azure Defender, GCP Security Command Center, Wiz/Orca.
- Identity: Okta, Entra ID, AWS IAM.
- Asset/CMDB: ServiceNow CMDB, Axonius, cloud inventory.
- ITSM: Jira, ServiceNow.
- Threat intelligence: CISA KEV, FIRST EPSS, vendor advisories, internal intel.

## Security, Privacy, Permissions, and Trust

- Role-based access: viewer, triager, remediation owner, risk approver, admin.
- Least-privilege integrations with read-only ingest by default.
- Write scopes separated for ticketing and status updates.
- Audit log for every status, assignment, exception, and integration change.
- Exception workflow requires rationale, expiry, approver, and compensating controls.
- Sensitive asset names can be masked in executive views.
- Data retention configurable by workspace.
- Risk model versioning: score changes must be attributable to model, signal, or asset-context changes.
- Explainability requirement: every priority must display top contributing factors and source freshness.

## Onboarding and Activation

### Onboarding Steps

1. Connect scanner and asset inventory.
2. Import business services and owner mappings.
3. Enable KEV/EPSS enrichment.
4. Map ticketing projects and assignment rules.
5. Review first generated remediation packs.

### Activation Moment

The first moment of value is when the user sees hundreds or thousands of raw findings reduced into a short list of action packs with owner, rationale, and expected risk reduction.

## Retention and Success Metrics

- Weekly active triagers.
- Number of duplicate findings collapsed into packs.
- Median time from exploited signal to assigned owner.
- Critical exposure SLA attainment.
- Verified risk reduction over 30/60/90 days.
- Exception review compliance.
- Recurrence rate after verified remediation.
- Owner acceptance rate and ticket reopen rate.

## Analytics

- Queue filter usage.
- Exposure selection and dwell time.
- Assignment action rate.
- Exception creation and expiry.
- Verification conversion.
- Search terms with no result.
- Integrations with stale data.

## Packaging and Pricing Hypothesis

- **Team:** up to a fixed asset count, scanner + ITSM integrations, prioritization queue, action packs.
- **Business:** larger asset count, business-service mapping, exception governance, risk reporting, SSO/SAML, audit export.
- **Enterprise:** custom risk model, advanced RBAC, multi-workspace, data residency, premium support, bidirectional CMDB/ITSM sync.

Pricing should be asset-based with integration tiering. The buyer value metric is reduction in exploitable exposure window, not number of users.

## Launch Motion and GTM Narrative

- **Beachhead:** mid-market and lower-enterprise companies with cloud adoption, limited SOC staffing, and formal patch SLAs.
- **Message:** "Stop arguing about scanner severity. Ship the owner-ready fixes that remove the most exploitable business risk."
- **Content:** KEV readiness checklist, exploited vulnerability tabletop, risk-based patch SLA template, exception governance guide.
- **Sales motion:** security-led proof of value using exported scanner/CMDB data, showing deduplication ratio and top 20 action packs.
- **Expansion:** add business-unit reporting, custom risk models, more integrations, and executive risk packs.

## Risks and Unknowns

- Asset ownership data may be stale or missing.
- Business criticality mapping can become political.
- Overconfident scoring can reduce trust if evidence is not transparent.
- Scanner APIs and normalization quality vary.
- IT owners may resist security-created tickets without operational context.
- Customers may ask for auto-remediation before governance is ready.

## Post-Demo Roadmap

### 0-3 Months

- Production connector framework.
- Normalized exposure pack model.
- Jira/ServiceNow ticket creation.
- KEV/EPSS enrichment.
- Basic RBAC and audit log.

### 3-6 Months

- Business-service mapping.
- Exception governance workflow.
- Verification loop with scanner retest.
- Owner performance and SLA analytics.
- Custom prioritization rules.

### 6-12 Months

- Attack-path correlation across identity, cloud, and data stores.
- Risk model versioning and simulation.
- Executive reporting packs.
- Multi-workspace enterprise controls.
- Assisted remediation drafting with strict human approval.
