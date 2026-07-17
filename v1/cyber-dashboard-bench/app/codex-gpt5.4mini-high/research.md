# Research

## Selected wedge

**Aegis Exposure Board** is positioned as a **cloud exposure prioritization workspace** for cloud-first security teams at mid-market and enterprise SaaS companies.

The product is not a generic SOC console. The strongest opportunity from the research is a workflow that:

- ingests vulnerability, cloud posture, and identity exposure signals;
- prioritizes the small set of exposures that are both exploitable and business-critical;
- explains exactly why each item is on top;
- routes remediation to an owner with an audit trail.

That wedge is better supported by current market categories and workflows than a broad incident response or executive-risk dashboard.

## Research findings

### 1) Security teams are drowning in noise, so prioritization has to be explicit

- SANS and Splunk sources consistently describe alert overload, false positives, and missed true positives as the operational pain in security operations.
- The practical implication for a dashboard is that severity alone is not credible. The interface has to show why an item is prioritized and what changed its rank.

### 2) Vulnerability severity is not enough; active exploitation signals matter more

- CISA’s KEV catalog is an authoritative list of vulnerabilities confirmed as exploited in the wild.
- FIRST’s EPSS model estimates the probability that a CVE will be exploited in the next 30 days.
- Together, they support a prioritization model that is materially more defensible than CVSS-only dashboards.

### 3) Exposure management has become the dominant product category for this wedge

- Tenable, CrowdStrike, Palo Alto Networks, Rapid7, and Microsoft all frame the problem around exposure, prioritization, attack paths, and remediation rather than raw vulnerability counts.
- The common dashboard pattern is: posture summary, prioritized queue, drill-down evidence, and remediation workflow.
- The implication is that Aegis should look like a finite remediation board, not a chart-heavy platform homepage.

### 4) Ownership and collaboration are not optional

- NIST incident-handling guidance emphasizes coordination among system owners, mission owners, legal, HR, operations, and procurement when incidents or high-risk issues require action.
- Microsoft Defender for Cloud shows remediation recommendations, control-level drill-down, and audit-style reporting.
- The implication is that each finding needs an owner, a due date, evidence, and an action trail.

### 5) Dashboards in this category rely on drill-down tables and report-ready views

- Microsoft Defender for Cloud’s regulatory compliance dashboard centers on controls, scopes, remediation recommendations, and downloadable reports.
- Tenable’s dashboard docs show that users expect widget-to-list drill-down, SLA progress, and a way to compare severity, exploitability, and age.
- The implication is that the core screen should be optimized for scanning and triage, with tables for the canonical list and charts only where they make the prioritization legible.

### 6) Accessibility and dense data presentation matter

- W3C guidance for tables stresses proper table semantics, clear header relationships, captions, and responsive behavior.
- For an operational security dashboard, the queue must remain readable on small screens, support keyboard navigation, and preserve meaning without relying on color alone.
- The implication is to make the queue and backlog surfaces semantic tables or table-like structures with strong labels and status text.

### 7) GTM patterns in this market are consistent

- Competitor pages consistently use a land-expand motion: demonstrate current visibility, show prioritization value, then connect to remediation and reporting.
- They emphasize that teams can start with existing scanners or cloud telemetry rather than replacing the whole stack.
- The implication is a packaging story around one cloud, one prioritization engine, and one remediation queue, then expansion to more data sources and more business units.

## Source log

| Source | URL | Access date | Findings | Decision changed |
| --- | --- | --- | --- | --- |
| CISA Known Exploited Vulnerabilities Catalog | https://www.cisa.gov/known-exploited-vulnerabilities-catalog | 2026-07-16 | CISA positions KEV as the authoritative exploited-in-the-wild list and urges prioritizing remediation around it. | Use KEV as a top-tier signal, not just a badge on a finding. |
| FIRST EPSS SIG | https://www.first.org/epss/ | 2026-07-16 | EPSS scores the probability of exploitation in the next 30 days and publishes daily data and API access. | Make probability explicit and sortable in the queue. |
| FIRST EPSS FAQ | https://www.first.org/epss/faq | 2026-07-16 | EPSS is intended for commercial use and should be attributed; model updates are periodic and data changes over time. | Treat EPSS as an input feed that can change, not a static label. |
| FIRST EPSS probability/percentile guidance | https://www.first.org/epss/articles/prob_percentile_bins | 2026-07-16 | FIRST recommends communicating probability and percentile together when possible. | Show probability and rank context together in the detail panel. |
| Microsoft Defender for Cloud regulatory compliance | https://learn.microsoft.com/en-ie/azure/defender-for-cloud/concept-regulatory-compliance-standards | 2026-07-16 | Defender uses standards, controls, compliance state, remediation steps, and downloadable reports. | Add report-ready evidence and control-level drill-down. |
| Microsoft Learn: regulatory compliance dashboard | https://learn.microsoft.com/en-us/azure/defender-for-cloud/regulatory-compliance-dashboard | 2026-07-16 | The dashboard highlights gaps, supports manual and automated assessments, and links recommendations to resources. | Include both machine-derived and human-attested states. |
| Tenable vulnerability management dashboard | https://docs.tenable.com/vulnerability-management/Content/vulnerability-management/VulnerabilityManagementOverview.htm | 2026-07-16 | Tenable’s dashboard uses VPR, SLA progress, age, exploitability, and drill-down widgets. | Use a finite queue with exploitability, age, and SLA status surfaced together. |
| Tenable One vulnerability management | https://www.tenable.com/products/vulnerability-management | 2026-07-16 | Tenable frames exposure management as discover, prioritize, remediate. | Align product language and navigation to that sequence. |
| Tenable prioritization page | https://www.tenable.com/products/vulnerability-management/use-cases/prioritization | 2026-07-16 | The company highlights exploitability, business impact, and attack surface normalization. | Build a combined score from exploitability, exposure, and business context. |
| CrowdStrike Falcon Exposure Management | https://www.crowdstrike.com/en-us/platform/exposure-management/ | 2026-07-16 | CrowdStrike emphasizes exploitable vulnerabilities, misconfigurations, attack paths, and remediation workflows. | Make attack-path explanation visible in the selection detail. |
| Palo Alto Networks CDEM | https://www.paloaltonetworks.com/prisma/cloud/cloud-discovery-exposure-management | 2026-07-16 | Palo Alto frames external exposure discovery, attack-surface blind spots, and unmanaged assets. | Include internet exposure and unknown-asset style risk signals. |
| Rapid7 risk-based vulnerability management | https://www.rapid7.com/solutions/vulnerability-management/ | 2026-07-16 | Rapid7 stresses that vulnerability data alone lacks context and remediation alignment. | Add ownership, blast radius, and remediation steps as first-class fields. |
| NIST SP 800-61r3 community profile | https://www.nist.gov/publications/incident-response-recommendations-and-considerations-cybersecurity-risk-management-csf | 2026-07-16 | Incident response should improve preparedness, detection, response, and recovery across the program. | Treat the dashboard as an operational workflow, not just reporting. |
| W3C tables tutorial | https://www.w3.org/WAI/tutorials/tables/ | 2026-07-16 | Accessible tables need proper header/data relationships and alternatives for complex layouts. | Use semantic tables for backlog and keep metadata obvious on mobile. |
| W3C tables tips | https://www.w3.org/WAI/tutorials/tables/tips/ | 2026-07-16 | Responsive tables should preserve relationships and avoid over-complexity. | Keep dense data narrow, scannable, and progressively disclosed. |

