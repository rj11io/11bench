# Research: Exploit-Aware Exposure Command

Access date for all sources: 2026-07-16.

## Sources and Findings

### NIST Cybersecurity Framework 2.0
- Source: "The NIST Cybersecurity Framework (CSF) 2.0", NIST, https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20
- Finding: CSF 2.0 frames cybersecurity as continuous outcomes across Govern, Identify, Protect, Detect, Respond, and Recover, and emphasizes prioritizing and communicating cyber risk rather than prescribing one process.
- Decision changed: The product should not be a raw vulnerability scanner. It should translate exposure signals into risk decisions, owners, response status, and executive-ready evidence.

### CISA Known Exploited Vulnerabilities Catalog
- Source: "Known Exploited Vulnerabilities Catalog", CISA, https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- Finding: CISA positions KEV as an authoritative input to vulnerability-management prioritization and lists exploited CVEs with due dates and required action.
- Decision changed: KEV presence and due-date pressure become first-class prioritization factors in the demo, ahead of CVSS-only sorting.

### CISA KEV bulletin and BOD 22-01 context
- Source: "CISA Adds Two Known Exploited Vulnerabilities to Catalog", CISA GovDelivery, https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3e4788a
- Finding: CISA states that known exploited vulnerabilities are frequent attack vectors and pose significant risk; BOD 22-01 requires federal agencies to remediate by due date and CISA urges all organizations to prioritize KEVs.
- Decision changed: The PRD includes SLA tracking, due-date breach warnings, and a remediation queue usable by non-federal commercial teams adopting the pattern voluntarily.

### NVD Vulnerability APIs
- Source: "Vulnerability APIs", NIST NVD, https://nvd.nist.gov/developers/vulnerabilities
- Finding: NVD supports KEV filters such as `hasKev`, KEV date windows, and vulnerable CPE filtering.
- Decision changed: The data model assumes enrichment from scanners, asset inventory, NVD, and CISA KEV rather than manual CVE tagging.

### NIST NVD operational prioritization
- Source: "NIST Updates NVD Operations to Address Record CVE Growth", NIST, https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth
- Finding: NIST reported enriching nearly 42,000 CVEs in 2025 and prioritizing KEV, federal software, and critical software records for enrichment starting April 15, 2026.
- Decision changed: The product must expose source freshness and confidence because public enrichment can lag and users need to know what evidence is current.

### MITRE ATT&CK Enterprise
- Source: "Tactics - Enterprise", MITRE ATT&CK, https://attack.mitre.org/tactics/
- Finding: ATT&CK organizes adversary behavior by tactical goals such as Initial Access, Credential Access, Lateral Movement, Exfiltration, and Impact.
- Decision changed: Exposure items are mapped to likely attack paths and ATT&CK tactics so an analyst can understand why an exposure matters, not just that a CVE exists.

### SANS 2026 SOC Survey press release
- Source: "24% of Cyber Leaders Cite Lack of Enterprise-Wide Visibility as the Biggest Barrier to SOC Effectiveness, the 2026 SANS SOC Survey Finds", SANS Institute, https://www.sans.org/press/announcements/24-of-cyber-leaders-cite-lack-of-enterprise-wide-visibility-as-the-biggest-barrier-to-soc-effectiveness-the-2026-sans-soc-survey-finds
- Finding: SANS reports security teams have too many unconnected alerts and not enough shared context; 24% of leaders cite lack of enterprise-wide visibility as the top SOC effectiveness barrier.
- Decision changed: The core differentiator is correlation: exploit intelligence plus asset context plus owner workflow, not another alert console.

### SANS 2025 SOC Survey page and public summary
- Source: "SANS 2025 SOC Survey", SANS Institute, https://www.sans.org/white-papers/sans-2025-soc-survey
- Source: "SANS 2025 SOC Survey Exposes Critical Gaps and What Top Teams Are Doing Right", GlobeNewswire/SANS, https://www.globenewswire.com/news-release/2025/07/01/3108422/0/en/SANS-2025-SOC-Survey-Exposes-Critical-Gaps-and-What-Top-Teams-Are-Doing-Right.html
- Finding: Public SANS summary states 85% of analysts cite endpoint alerts as a primary response trigger and 42% of SOCs send all incoming data to a SIEM without a defined retrieval or analysis strategy.
- Decision changed: The demo avoids a SIEM-style event stream. It summarizes evidence into decision cards with explicit recommended action and supporting signals.

### SANS SOC Metrics Cheat Sheet
- Source: "SOC Metrics Cheat Sheet", SANS Institute, https://www.sans.org/posters/soc-metrics-cheat-sheet
- Finding: SOC metrics should connect to mission and security goals instead of only bottom-up operational counts.
- Decision changed: Dashboard metrics use exploitable exposure burn-down, SLA risk, owner throughput, and business-service risk instead of generic alert volume.

### CISA SBOM and VEX resources
- Source: "SBOM Resources Library", CISA, https://www.cisa.gov/topics/cyber-threats-and-advisories/sbom/sbomresourceslibrary
- Finding: VEX helps suppliers clarify whether a vulnerability actually affects a product; CISA highlights minimum VEX requirements and use cases.
- Decision changed: The product includes "not exploitable here" and "compensating control" dispositions with required evidence, reducing noisy remediation work.

### Cisco global security operations report
- Source: "Global State of Security Report Reveals Critical Need for Connected Security Operations", Cisco Newsroom, https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m05/global-state-of-security-report-reveals-critical-need-for-connected-security-operations.html
- Finding: Cisco reports disconnected tools, too many alerts, false positives, and data management gaps as major SOC inefficiencies.
- Decision changed: The UI includes integration health and source lineage, and makes cross-tool correlation visible in each exposure.

### FedRAMP 2026 Vulnerability Detection and Response rules
- Source: "Vulnerability Detection and Response - FedRAMP Consolidated Rules for 2026", FedRAMP, https://www.fedramp.gov/2026/providers/20x/rules/vulnerability-detection-and-response/
- Finding: FedRAMP rules reference remediation of KEVs according to CISA due dates.
- Decision changed: GTM can credibly target SaaS vendors and cloud service providers facing customer or authorization pressure around vulnerability evidence.

## Buyer and User Segments

Primary user: security operations or vulnerability-management lead in a 500-5,000 employee SaaS, fintech, healthtech, or B2B software company. This person owns triage, remediation pressure, and reporting but does not directly patch every system.

Secondary users: application owners, infrastructure owners, GRC/security leadership, and incident responders. Buyers are CISOs, heads of security engineering, and infrastructure leaders who need provable risk reduction without adding another alert queue.

Painful workflows:
- CVSS-first vulnerability queues miss exploitation context and business impact.
- SIEM, EDR, cloud inventory, ticketing, and scanner data rarely agree on ownership or urgency.
- Analysts spend time proving why a team must patch rather than coordinating the patch.
- Exceptions are accepted in chat or tickets without reusable evidence.
- Leaders ask for "are we safe from the thing in the news?" and teams answer manually.

## Competitor and Category Scan

Representative categories:
- Exposure management: Tenable Exposure Management, Rapid7, Qualys, Wiz, Palo Alto Cortex Exposure Management.
- Vulnerability management and attack surface: Qualys VMDR, Tenable Vulnerability Management, Rapid7 InsightVM, Microsoft Defender Vulnerability Management.
- CNAPP/cloud security: Wiz, Orca, Lacework/FortiCNAPP, Prisma Cloud.
- SIEM/XDR/SOAR: Microsoft Sentinel/Defender, Splunk, CrowdStrike, Palo Alto Cortex XDR/XSOAR.
- Executive cyber-risk: Bitsight, SecurityScorecard, Axio, Balbix.

Positioning gap: broad platforms identify many risks, but mid-market teams still need an opinionated daily workflow that converts exploited exposure into owner-specific action with trustworthy evidence and deferral controls.

## Information Architecture Implications

The product should be organized around the work:
- Command: current exploited exposure posture and SLA pressure.
- Triage Queue: ranked, explainable items requiring analyst decision.
- Exposure Detail: evidence, affected assets, attack path, ownership, recommended action, and disposition history.
- Remediation: owner assignments, due dates, ticket status, and exception review.
- Intelligence: KEV/trending exploit changes and source health.
- Reports: executive and audit-ready narratives.

## Metrics and Visualizations

Useful metrics:
- KEV exposures by due-date state: overdue, due soon, on track, mitigated.
- Exploit-aware risk score trend and burn-down.
- Affected business services and internet-facing asset count.
- Mean time to owner acceptance and mean time to remediation.
- Exception aging and evidence completeness.
- Source freshness and correlation confidence.

Visualization choices:
- Prioritized queue table for operational action.
- Risk decomposition bar for explainability.
- Timeline for exploit/detection/remediation events.
- Matrix for business service by exposure class.
- Compact sparklines for burn-down and SLA trend.

## Accessibility and Responsive Considerations

Dense operational tools need keyboard-reachable controls, visible focus states, semantic headings, table alternatives on small screens, adequate contrast for severity colors, and non-color labels for status. Mobile should preserve the core triage workflow with stacked cards and sticky high-attention context rather than shrinking a desktop table.

## GTM Relevance

Initial wedge: "CISA KEV and active exploit remediation command for security teams that need provable prioritization across scanners, cloud, endpoint, and ticketing." Buying triggers include newly disclosed exploited CVEs, board/customer questions, failed SLA reporting, cyber insurance reviews, FedRAMP/SOC 2 pressure, and post-incident remediation programs.
