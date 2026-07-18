# Research — Signalroom

Accessed 22 October 2024. The product wedge is explainable exposure triage for lean cloud teams: fewer, owner-ready decisions rather than another alert console.

| Source | Finding | Decision changed |
|---|---|---|
| [Verizon 2024 DBIR](https://www.verizon.com/business/resources/reports/2024-dbir-data-breach-investigations-report.pdf) | Vulnerability exploitation remains a major breach path; basic exposure and patch velocity matter. | Make reachability, asset criticality and age first-class ranking inputs. |
| [NIST CSF 2.0](https://www.nist.gov/cyberframework) | Govern/Identify/Protect/Detect/Respond/Recover gives buyers a shared risk language. | Use “owner, action, evidence” in every finding, not only severity. |
| [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Exploited-in-the-wild status is an actionable prioritization signal. | Reserve critical treatment for evidence-backed urgency, not raw CVSS alone. |
| [NIST SP 800-61r2](https://csrc.nist.gov/pubs/sp/800/61/r2/final) | Incident work benefits from clear roles, documentation and coordinated response. | Add assignment, activity/audit trail and next-best action to the triage object. |
| [Google SRE: Monitoring](https://sre.google/sre-book/monitoring/) | Useful operational dashboards emphasize a small set of signals and avoid vanity metrics. | Overview uses four decision metrics and a ranked queue. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Dense tools need keyboard access, contrast, non-color cues and responsive reflow. | Every state has text labels, focusable controls and a mobile single-column layout. |
| [Microsoft Defender for Cloud overview](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction) | Cloud posture products combine recommendations, asset context and remediation. | Compete on cross-source reasoning and accountable ownership, not breadth. |
| [Wiz Security Graph](https://www.wiz.io/platform/security-graph) | Graph/context is a category expectation for understanding attack paths. | Show “why prioritized” context and source coverage in the compact demo. |

## Market and workflow synthesis

Buyers are security leaders accountable for risk and engineering leaders accountable for delivery. Users are typically a security lead, cloud/platform engineer, and application owner. Their painful loop is: ingest findings from CSPM/CNAPP, identity, code and ticketing; deduplicate; determine blast radius; find a credible owner; create a fix; prove closure. SIEM/SOAR tools optimize event investigation, CSPM tools optimize posture recommendations, and CNAPP platforms optimize broad context. A small team still needs a decision layer across those systems.

Alert fatigue is not solved by hiding volume. Trust comes from an explicit reason, evidence, freshness, affected asset and reversible workflow state. Collaboration needs owner assignment, status, due date, comments and audit events. Useful metrics are risk score trend, open/closed flow, SLA health, mean time to remediate, coverage and overdue critical exposures; a pie chart of total alerts is not useful.

## Positioning decision

Signalroom is intentionally not a SIEM, ticketing system, vulnerability scanner, or autonomous remediation agent. It is the daily “what should we do next?” layer for 20–200-person cloud-native teams. The demo therefore makes the queue and detail rationale dominant, labels all data as demo, and uses no live integrations or security claims.
