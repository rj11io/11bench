# PRD: Breachline Exposure Command

## Product Thesis

Breachline Exposure Command is an exploit-aware exposure operations dashboard for mid-market security teams. It converts noisy vulnerability and alert signals into a small, explainable set of business-critical remediation decisions.

Category: exposure management workflow layer.

Positioning: "The daily command center for CISA KEV and active-exploit remediation across assets, owners, and evidence."

Differentiated promise: Instead of ranking every vulnerability by scanner severity, Breachline explains which exposures are being exploited, where they touch critical business services, who owns them, what evidence supports the decision, and what remediation or exception action is required today.

## Users, Jobs, and Buying Trigger

Primary user: security operations or vulnerability-management lead.

Jobs to be done:
- Decide which exploited exposures require action today.
- Explain urgency to application and infrastructure owners.
- Assign remediation with clear evidence and due dates.
- Defend accepted exceptions with auditable rationale.
- Report reduction of exploitable business risk to leadership.

Secondary users:
- Service owners who need precise patch or mitigation tasks.
- Incident responders who need to know whether an exploited weakness is present.
- CISOs and GRC teams who need credible risk and SLA reporting.

Buying triggers:
- A public exploited CVE affects the company's stack.
- Leadership asks for exposure status after a breach headline.
- Remediation SLAs are missed because ownership and priority are unclear.
- Audit, customer, FedRAMP, cyber-insurance, or SOC 2 evidence is requested.

## Scope

In scope for v1:
- Ingest normalized demo-equivalent signals from vulnerability scanners, cloud asset inventory, EDR/XDR, ticketing, CMDB, CISA KEV, NVD, and threat-intel feeds.
- Rank exposures by exploit evidence, asset exposure, business criticality, control coverage, owner readiness, and due-date pressure.
- Provide an evidence panel for each exposure.
- Allow analyst dispositions: assign remediation, mark mitigated, accept temporary exception, or mark not exploitable with evidence.
- Persist local demo actions in the frontend.
- Show operational and executive metrics.
- Represent integration/source health.

Non-goals:
- No scanning engine, EDR, SIEM replacement, or live production security control in the demo.
- No automated patching.
- No authentication or backend.
- No fabricated live integrations.

## Core Workflow

1. Analyst opens Command and sees exploited exposure posture, overdue KEVs, and source freshness.
2. Analyst filters the triage queue by high attention, business service, or owner.
3. Analyst selects the top exposure and reviews why it is ranked: KEV status, active exploitation, internet exposure, asset count, service criticality, ATT&CK tactic, and compensating controls.
4. Analyst chooses a disposition.
5. Product updates status, owner workload, metrics, and the local activity timeline.

## Functional Requirements

- FR1: Display all demo data as explicitly simulated.
- FR2: Calculate a visible priority score with a factor breakdown.
- FR3: Provide filters for attention level, owner, service, and status.
- FR4: Show normal, empty, and high-attention states.
- FR5: Persist analyst dispositions and notes in `localStorage`.
- FR6: Support responsive desktop and mobile layouts.
- FR7: Avoid horizontal overflow at 375px width.
- FR8: Provide keyboard-accessible buttons, tabs, selects, and text fields.
- FR9: Show source freshness and trust/confidence for each exposure.
- FR10: Include audit-style activity history.

## Acceptance Criteria

- A user can identify the highest priority exposure within 10 seconds.
- A user can explain why it is urgent from the detail panel without opening another page.
- A user can assign remediation or record an exception and see the UI update.
- A user can filter to an empty state and recover.
- Mobile users can complete the same triage action.
- The route builds without lint, type, or console errors.

## Data Model

Exposure:
- id, title, cve, vendor, product, summary
- severity, kev, dueDate, exploitStatus, exploitMaturity
- affectedAssets, internetFacingAssets, businessServices
- owner, team, ticket, status, disposition
- priorityScore and factor scores
- attackPath and MITRE ATT&CK tactics
- evidence events with source, timestamp, confidence
- remediation recommendation
- exception requirements

Integrations assumed:
- CISA KEV and NVD for CVE and exploitation metadata.
- Scanner/CNAPP for vulnerable assets and cloud exposure.
- EDR/XDR/SIEM for detection and exploit telemetry.
- CMDB/service catalog for business criticality and owner.
- Jira/ServiceNow for ticket status.
- Slack/Teams for owner notifications.

## Security, Privacy, Permissions, and Trust

- Least-privilege read connectors for scanners and inventories.
- Write permissions separated for ticket creation, notifications, and disposition updates.
- Every analyst action emits an immutable audit event.
- Exceptions require rationale, expiration date, owner, and evidence.
- Product must show data freshness and source lineage.
- AI-assisted summaries, if added later, must cite evidence and be reviewable.
- Demo data must never be described as live.

## Onboarding and Activation

Activation path:
1. Connect CISA/NVD enrichment and one scanner.
2. Import service catalog or upload owner map.
3. Connect ticketing.
4. Review first 10 ranked exploited exposures.
5. Assign or close 3 items.

Activation metric: first owner-accepted remediation or evidence-backed exception within 48 hours.

Retention drivers:
- Weekly exploited exposure review.
- Due-date and overdue reminders.
- Executive report exports.
- Saved SLA evidence for audits and customer requests.

## Success Metrics

Product metrics:
- Weekly active security leads.
- Percentage of KEV exposures with owner and due date.
- Time from KEV ingestion to owner assignment.
- Time from assignment to remediation.
- Exception percentage and exception aging.
- Reduction in overdue exploited exposure count.

Business metrics:
- Trial-to-paid conversion after first urgent CVE event.
- Number of connected integrations per account.
- Expansion from VM team to cloud/security operations teams.

## Packaging and GTM

Packaging hypothesis:
- Team: up to 2 scanners, 2,000 assets, KEV workflow, ticketing, basic reports.
- Business: unlimited scanners, service catalog, custom SLA policy, audit exports.
- Regulated: FedRAMP/SOC 2 evidence packs, advanced RBAC, exception approvals, retention policies.

Launch motion:
- Founder-led and security-practitioner-led demos around recent exploited CVEs.
- Content wedge: "What is truly exposed to CVE-X in your environment?"
- Integrations-led marketplace listings for scanners and ticketing.
- Land with vulnerability management, expand to SOC and GRC reporting.

## Risks and Unknowns

- Data quality: owner mapping and asset identity are hard.
- Trust: analysts may reject black-box prioritization.
- Workflow adoption: remediation owners may stay in ticketing tools.
- Competition: large platforms can add similar views.
- Unknown: best commercial packaging unit, asset count vs connector count vs user seat.

## Roadmap

Post-demo:
- Real connector framework and identity resolution.
- SLA policy builder by business unit and asset class.
- Exception approval workflows.
- Jira/ServiceNow writeback.
- ATT&CK-path simulations from exposure clusters.
- Executive report export.
- Evidence-cited AI remediation briefs.
