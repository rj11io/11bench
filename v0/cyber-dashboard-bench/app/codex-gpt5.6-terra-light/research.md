# Research — Terra Exposure Command

Accessed 16 July 2026. Terra is a concept demo; its data and integration status are fictional.

| Source | Finding | Product decision changed |
|---|---|---|
| [NIST SP 800-61r3: Incident Response Recommendations](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf) (Apr 2025) | Incident response should be integrated with organization-wide cyber risk management, with improvement activities and relevant context available through the lifecycle. | Chose an exposure-to-remediation workflow, not a generic SIEM. The brief includes ownership, evidence, and a decision record. |
| [CISA BOD 22-01: Reducing the Significant Risk of KEVs](https://www.cisa.gov/sites/default/files/publications/Reducing_the_Significant_Risk_of_Known_Exploited_Vulnerabilities_20211103.pdf) (Nov 2021) | Establishes a curated catalog of vulnerabilities known to be exploited and time-bound remediation expectations for covered agencies. | KEV is a prominent, explainable risk signal—not simply one more CVSS attribute. |
| [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) (accessed 16 Jul 2026) | CISA positions KEV as an authoritative prioritization input and urges organizations to prioritize timely remediation. | “Known exploited + reachable” drives the top recommendation and the daily decision callout. |
| [Microsoft: Empower analysts to reduce SOC burnout](https://www.microsoft.com/en-us/security/blog/2020/07/28/empower-analysts-reduce-burnout-isecurity-operations-center/) (Jul 2020) | Microsoft tracks time to acknowledgement for high-confidence alerts and highlights workload/burnout. | Avoided an unbounded alert wall; queue is deliberately small, ranked and action-led. Track acknowledgement/fix measures. |
| [Microsoft: 6 strategies to reduce cybersecurity alert fatigue](https://www.microsoft.com/en-us/security/blog/2021/02/17/6-strategies-to-reduce-cybersecurity-alert-fatigue-in-soc/) (Feb 2021) | Contextual threat intelligence, integration, and automation reduce repetitive analyst workload. | Every queue row opens a compact evidence explanation rather than asking analysts to stitch consoles together. |
| [CISA Asset Inventory Guidance for OT Owners](https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_topics%3A68&page=0) (accessed 16 Jul 2026) | CISA’s advisory library emphasizes the importance of actionable asset context. | Asset identity, reachability, service ownership, and business tier are explicit model inputs. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) (accessed 16 Jul 2026) | Operational interfaces need perceivable state, keyboard-operable controls, sufficient contrast, and responsive reflow. | Color never carries status alone; textual labels, focus treatment, large tap areas, and one-column mobile reflow are specified. |

## Market and wedge

Representative categories are vulnerability/exposure management (Tenable, Rapid7, Qualys), attack-surface management (Microsoft Defender EASM, CyCognito), CNAPP (Wiz, Palo Alto Prisma Cloud), and SecOps/XDR (Microsoft Sentinel, CrowdStrike Falcon). Their common buyer is the security leader who needs fewer material risks; the daily user is often a vulnerability manager or lean SecOps lead coordinating infrastructure and application owners.

The defensible wedge is **remediation command for externally reachable, business-critical KEVs** at 250–3,000 employee regulated organizations. This avoids competing as a scanner. Terra consumes existing scanner, EASM, CMDB, ticket, and threat-intelligence data, resolves it into a transparent “why now” brief, and closes the ownership loop. The buyer message is: *turn exposure data into fixes that can be defended to leadership and auditors.*

## Information architecture research conclusion

The operational home should answer three questions in descending order: what needs a decision now, why it is prioritized, and who will act by when. A daily signal strip, constrained ranked queue, and evidence-rich detail panel serve that path. Trend and executive reporting are secondary destinations, not first-screen widgets. Metrics shown—open KEVs, affected crown-jewel assets, exposure risk, and median time to fix—are operationally actionable and avoid claiming generic “security score” precision.
