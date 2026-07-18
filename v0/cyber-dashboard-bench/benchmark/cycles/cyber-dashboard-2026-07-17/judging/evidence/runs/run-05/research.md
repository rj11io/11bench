# Terra research notes

Accessed 2026-07-16. Terra is an exposure-to-remediation command center for a lean security team supporting cloud-native B2B SaaS. It is intentionally not a SIEM, EDR, or generic executive dashboard.

| Source | Finding | Product decision changed |
|---|---|---|
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | CSF 2.0 frames risk management across Govern, Identify, Protect, Detect, Respond, and Recover. | The dashboard has a decision-ready risk posture and evidence/audit trail, rather than a raw scanner feed; remediation ownership supports Govern/Identify/Protect. |
| [CISA KEV Catalog guidance](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | KEV is CISA’s curated evidence of exploitation in the wild; CISA urges timely remediation as part of vulnerability management. | Confirmed exploitation is a first-class reason, above severity alone, and appears in every urgent exposure explanation. |
| [CISA, Reducing Significant Risk of KEVs (BOD 22-01)](https://www.cisa.gov/sites/default/files/publications/Reducing_the_Significant_Risk_of_Known_Exploited_Vulnerabilities_20211103.pdf) | The directive establishes a curated KEV list to drive continuous prioritization and remediation deadlines. | The core workflow is a short, owned remediation plan with an explicit due date and acknowledgement—not an infinite alert queue. |
| [CISA Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals) | CISA calls for patching or mitigating KEVs in internet-facing systems in a risk-informed timeframe, prioritizing critical assets. | Prioritization combines exploit evidence, external reachability, asset criticality and blast radius; the UI makes the “why now” legible. |
| [FIRST EPSS](https://www.first.org/epss/) | EPSS estimates the probability that a published CVE will be exploited in the next 30 days. | EPSS is supporting evidence, rendered as a probability, never a magical verdict. Users can see inputs and override rationale. |
| [CISA Vulnerability Response Playbook](https://www.cisa.gov/resources-tools/resources/vulnerability-response-playbook) | Vulnerability response needs coordinated discovery, analysis, mitigation and communication. | A single exposure holds owner, response path, linked ticket, verification and an append-only activity timeline. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Operational UIs must support keyboard access, visible focus, contrast and non-color cues. | Risk labels pair color with text/icon, controls are semantic buttons, dense tables collapse safely on small screens. |

## Market and wedge judgment

The surrounding market is crowded: Rapid7 InsightVM and Tenable Vulnerability Management concentrate on discovery/prioritization; Wiz and Palo Alto Prisma Cloud emphasize cloud exposure; ServiceNow connects enterprise workflows. The practical gap for a 100–1,000-person SaaS company is not another scanner. It is the handoff from “this could matter” to a credible, auditable decision owned by the team that can fix it.

Terra’s wedge is **exposure decisioning for product-security teams**: a small daily queue of internet-reachable, exploitable paths, expressed in product/service language and packaged into a remediation brief. The buyer is a Head of Security / security engineering lead who must prove risk is being reduced without a 24/7 SOC. A lightweight, connector-led land motion starts with AWS, GitHub and a vulnerability scanner, then expands through Jira and cloud accounts. The GTM proof point is faster time from newly seen high-confidence exposure to an accountable mitigation, not “more alerts detected.”

## Information architecture conclusions

The home surface should answer four questions in order: Is there an urgent decision? Why is it urgent? Who owns the next action? Is the chosen action moving risk? Consequently the desktop design leads with a single active decision and a risk-reduction trend, then exposes a compact queue and a focused drawer. Charts are used for trend and distribution only; the decision itself is plain-language evidence, ownership, deadline and next step. Demo values are synthetic and visibly labeled.
