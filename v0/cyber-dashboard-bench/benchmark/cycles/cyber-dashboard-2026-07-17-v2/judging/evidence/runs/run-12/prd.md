# PRD — Luna Exposure Triage

## Thesis and positioning

Luna is an exposure triage workspace for lean security teams. It turns scanner output into a small, explainable set of business-prioritized remediation decisions. Category: risk-based vulnerability/exposure management. Promise: “Know the three security actions your team can defend this week.” Differentiator: a transparent prioritization recipe plus owner-ready remediation brief, not another opaque risk score or data lake.

## Users, jobs, trigger

Primary: security lead / security engineer at a 100–1,000 person SaaS company. JTBD: after a new scan or exploit signal, decide what matters, justify the order, and get the right engineering owner moving. Pain: thousands of findings, unclear asset criticality, weak handoff, and executive reporting that confuses volume with risk. Secondary: platform engineer who needs one reproducible fix path and scope. Buyer: VP Engineering/CISO triggered by a new KEV, audit deadline, cyber-insurance question, or a scanner renewal that has not improved remediation.

## Scope and non-goals

In scope: asset inventory import; finding normalization/deduplication; transparent priority factors; queue filters; evidence detail; assignment/due date; status transitions; remediation brief export/share; audit history; weekly exposure trend.

Non-goals: patch deployment, endpoint detection, full SIEM/SOAR, exploit execution, compliance certification, or a production guarantee that a finding is exploitable.

## Core workflows and requirements

1. **Orient:** user sees the current open-critical count, SLA risk, change since last review, and ranked queue.
2. **Triage:** user selects a finding, reviews the factor breakdown and evidence, and can accept the recommendation, snooze with a reason, or mark as risk accepted.
3. **Handoff:** user assigns an owner, sets a due date, copies a remediation brief, and changes status to In progress.
4. **Close the loop:** owner marks Fixed; security lead verifies evidence and closes, with immutable event history.

Acceptance criteria: a finding’s priority is explainable in under 30 seconds; every open item has an owner or an explicit Unassigned state; status changes persist for the session and local browser; demo data is visibly labeled; no action implies a live patch; queue and evidence remain usable on 375px width; empty, normal, and high-attention states are represented.

## Data model and integrations

Core entities: Workspace, Asset(id, hostname, environment, businessTier, internetFacing, owner), Finding(id, title, cve, severity, status, firstSeen, dueDate, score, signals[], affectedAssets[], recommendation, assignee), Evidence(source, observedAt, confidence, url), and Activity(actor, action, timestamp, note). Demo seed represents normalized records from a vulnerability scanner, cloud inventory, and CISA/EPSS enrichment. A production connector contract would use least-privilege read scopes, signed webhook ingestion, idempotency keys, and source timestamps.

## Security, privacy, permissions, trust

Roles: Admin (connectors, policy, members), Analyst (triage and assignment), Viewer (read/export). Tenant isolation, encryption in transit/at rest, secrets in a managed vault, SSO/SAML for paid plans, SCIM later, and configurable retention are required. Evidence URLs and asset names may be sensitive. Audit logs cover read/export and every mutation; logs are append-only and exportable. Scores expose factors and source freshness; stale or conflicting evidence is shown as such. The demo is illustrative and makes no production security claim.

## Onboarding, activation, retention, analytics

Onboarding: select asset criticality policy → import CSV/read-only connector → map owners → review first three recommendations. Activation is “first finding assigned with a due date” within 15 minutes. Retention loops are Monday review, owner reminders, and weekly shareable risk brief. Track time-to-first-decision, percent of findings with owner/due date, recommendation acceptance, SLA-risk reduction, MTTRemediate, weekly active workspaces, and export/share events. Do not collect secrets or raw customer payloads in product analytics.

## Packaging and GTM hypothesis

Free trial: one workspace, 50 assets, one connector, 14-day history. Team: $1,200/month up to 500 assets, collaboration, exports, audit log, and three connectors. Scale: negotiated, SSO/SCIM, retention, API, and support. Lead with a read-only “first decision” assessment and security-community content around KEV/EPSS triage; convert when a team shares its first remediation brief. Expansion is additional asset volume and engineering workspaces.

## Risks, dependencies, roadmap

Risks: asset criticality is subjective; source freshness can mislead; integrations compete with incumbents; customers may expect patch automation. Dependencies: scanner/cloud APIs, CISA/EPSS feeds, identity provider, ticketing API, and a robust normalization layer. Unknowns: ideal score calibration, acceptable evidence freshness by connector, and willingness to pay for a decision layer.

Post-demo roadmap: v0.2 Jira/Linear brief creation and CSV import; v0.3 policy simulator and evidence freshness alerts; v0.4 read-only AWS/Azure/GitHub connectors plus historical trend; v0.5 SSO, SCIM, API, and analyst calibration feedback; later add incident linkage and exception expiry workflows.

