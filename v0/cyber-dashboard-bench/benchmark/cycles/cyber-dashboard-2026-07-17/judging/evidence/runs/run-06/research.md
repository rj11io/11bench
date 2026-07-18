# Research

Access date for all sources: **July 16, 2026**

## Wedge chosen

**Exposure management for lean cloud-first security teams.**

The category pressure is not “more dashboards.” The strongest wedge is a daily remediation queue that combines:

- known exploited vulnerability signals;
- attack-path context;
- asset and identity criticality;
- remediation ownership and audit trail;
- a UI that is dense but still legible on desktop and usable on mobile.

That wedge is defensible because the market already converged on exposure management, but the trust problem remains: teams need to know **why** an item is top priority and **what changed** after the fix.

## Findings by source

| Source | URL | Key finding | Decision changed |
| --- | --- | --- | --- |
| CISA Known Exploited Vulnerabilities Catalog | [cisa.gov/known-exploited-vulnerabilities-catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0) | CISA describes KEV as the authoritative source of vulnerabilities exploited in the wild and explicitly recommends it as an input to vulnerability prioritization. | The product must treat KEV as a first-class priority signal, not a background data feed. |
| CISA KEV update bulletin | [cisa.gov news bulletin](https://www.cisa.gov/news-events/alerts/2025/08/25/cisa-adds-three-known-exploited-vulnerabilities-catalog) | CISA continues to add actively exploited CVEs and urges all organizations to prioritize timely remediation. | The demo needs a “fix-now” framing instead of generic exposure scoring. |
| NIST Cybersecurity Framework 2.0 | [nist.gov/publications/nist-cybersecurity-framework-csf-20](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | CSF 2.0 is a taxonomy of outcomes for assessing, prioritizing, and communicating cybersecurity efforts across organization sizes and maturity levels. | The PRD should position the product as risk communication and prioritization, not just technical telemetry. |
| MITRE ATT&CK | [mitre.org/focus-areas/cybersecurity/mitre-attack](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack) | ATT&CK is the common language for adversary tactics and techniques and is used to model how attacks work. | The dashboard should explain attack paths in ATT&CK-like language instead of using opaque score-only rankings. |
| MITRE ATT&CK get started | [attack.mitre.org/resources/faq](https://attack.mitre.org/resources/faq/) | ATT&CK is a knowledge base of cyber adversary behavior and a taxonomy across the attack lifecycle. | I should anchor the path view around adversary behavior, not just asset lists. |
| Microsoft Defender portal overview | [learn.microsoft.com/en-us/unified-secops/overview-defender-portal](https://learn.microsoft.com/en-us/unified-secops/overview-defender-portal) | Microsoft’s unified portal combines pre-breach exposure management and post-breach response in one place. It also highlights a single incident queue and an exposure dashboard with attack surface and attack path views. | The IA should mimic the single-queue + drill-down model, because that is how operators already think. |
| Microsoft Sentinel workbooks | [learn.microsoft.com/en-us/azure/sentinel/monitor-your-data](https://learn.microsoft.com/en-us/azure/sentinel/monitor-your-data) | Workbooks are the standard way to visualize logs and queries with tables, charts, templates, and RBAC. | The dashboard should feel like a workbook: dense, modular, filterable, and permission-aware. |
| Microsoft Defender incident queue | [learn.microsoft.com/en-us/defender-xdr/incident-queue](https://learn.microsoft.com/en-us/defender-xdr/incident-queue) | The incident queue aggregates alerts from multiple products into one incident so analysts can prioritize and make informed response decisions. | The product needs a single prioritized queue and a selected-item detail panel. |
| Microsoft Sentinel SOC metrics | [learn.microsoft.com/en-us/azure/sentinel/manage-soc-with-incident-metrics](https://learn.microsoft.com/mt-mt/azure/sentinel/manage-soc-with-incident-metrics) | SOC managers need incident metrics such as severity, MITRE tactics, mean time to triage, and mean time to resolve. | The dashboard should include operational metrics, not just exposure counts. |
| Tenable attack path documentation | [docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm](https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm) | Attack paths are presented with graph analytics and MITRE ATT&CK context; fixing the underlying issue removes the path from view. | The UI should show both the path and the fix, and should hide resolved items from the default active queue. |
| Tenable attack path statuses | [docs.tenable.com/exposure-management/Content/attack-path/attack-statuses.htm](https://docs.tenable.com/exposure-management/Content/attack-path/attack-statuses.htm) | Built-in statuses synchronize across paths and techniques to support actionable collaboration. | The demo needs workflow states like queued, in progress, review, accepted, and done. |
| Tenable 2026 release notes | [docs.tenable.com/release-notes/Content/exposure-management/2026.htm](https://docs.tenable.com/release-notes/Content/exposure-management/2026.htm) | The 2026 notes emphasize collaboration, inbox-zero handling, risk acceptance with mandatory reasons, and permanent audit history. | The PRD should require an auditable acceptance flow and visible history. |
| ISC2 Cybersecurity Workforce Study 2025 | [isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study](https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study) | Security teams are under budget and skills pressure; the report highlights skills shortages and workload strain. | The primary user should be a lean team, not a huge SOC with spare analysts. |
| CrowdStrike Exposure Management | [crowdstrike.com/en-us/platform/exposure-management](https://www.crowdstrike.com/en-us/platform/exposure-management/) | The product story centers on exploitable vulnerabilities, misconfigurations, and attack paths, prioritized with adversary intelligence. | The GTM story should promise “what attackers can exploit” rather than “another posture score.” |
| WCAG 2.2 | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | WCAG covers accessibility on desktop and mobile, including low vision, color vision deficiency, keyboard support, and predictable presentation. | The implementation must avoid color-only meaning, keep contrast high, and stay usable on a small screen. |
| W3C tables tutorial | [w3.org/WAI/tutorials/tables](https://www.w3.org/WAI/tutorials/tables/) | Proper header cells matter because screen readers rely on them to preserve row and column context. | The dense queue should use semantic table structure where it appears. |
| W3C visual abilities and barriers | [w3.org/WAI/people-use-web/abilities-barriers/visual](https://www.w3.org/WAI/people-use-web/abilities-barriers/visual/) | Users may need text resizing, custom colors, screen readers, and full keyboard support. | The design system should use scalable typography and keyboard-friendly controls throughout. |

## Synthesis

The research points to a specific product thesis:

1. Security teams need one prioritized queue across exposures, identities, and attack paths.
2. Priority must be explainable, because teams will not trust a black-box score in a remediation workflow.
3. The workflow must end in an auditable action: assign, review, accept risk, or close.
4. The category already exists as exposure management, but the differentiator is making the queue operational and collaborative rather than just descriptive.

## Buyer and user implications

- Primary buyer: VP Security, Security Director, or security lead at a cloud-first SaaS company.
- Primary daily user: exposure manager or senior analyst carrying vulnerability, cloud, and identity backlog triage.
- Secondary users: platform owner, identity admin, IT operations, and app owners who need to fix or accept the issue.

## Competitor pattern

Representative competitors converge on the same shape:

- unified security portal;
- exposure overview;
- attack surfaces and attack paths;
- workbook-style dashboards;
- remediation and acceptance statuses.

The opportunity is not to invent a new category. The opportunity is to tighten the operating loop and make the ranking, ownership, and audit trail more explicit.

