# Research

## Selected Wedge

I narrowed the product to a weekly exposure-remediation cockpit for vulnerability and exposure managers.

Why this wedge:
- The market signal is moving from raw vulnerability counts to contextual exposure management.
- The most painful workflow is not scanning; it is deciding what to fix, explaining why, assigning it, and proving closure.
- A dashboard product can be credible if it acts as the operating layer between existing scanners, CMDBs, identity systems, and ticketing.

Primary user:
- Vulnerability/exposure manager or security operations manager running a weekly review.

Secondary users:
- CISO and risk owners.
- Remediation owners in IT, cloud, identity, appsec, and network teams.
- Compliance and audit stakeholders who need evidence and exception history.

## What Changed My Mind

- I did not choose a generic SOC dashboard. Current vendor docs and standards show the stronger wedge is exposure management: risk ranking, ownership, and remediation coordination.
- I did not choose a scanner replacement. The strongest positioning is an overlay that ingests existing tools and turns them into a business-ranked queue.
- I did not choose a pure executive dashboard. The most defensible product is operational first, with an executive summary layered on top.

## Source Log

| Source | URL | Accessed | Finding | Decision changed |
|---|---|---:|---|---|
| [Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) | https://www.nist.gov/cyberframework | July 16, 2026 | NIST frames CSF 2.0 around helping organizations manage cybersecurity risk with quick-start guides, profiles, and governance-oriented resources. | The product needs to speak risk and governance, not just technical findings. |
| [The NIST Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20 | July 16, 2026 | CSF 2.0 is meant to help organizations understand, assess, prioritize, and communicate cybersecurity efforts. | The dashboard needs business-readable prioritization and communication, not only analyst tooling. |
| [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0) | https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0 | July 16, 2026 | CISA positions KEV as the authoritative source for vulnerabilities exploited in the wild and recommends using it as an input to prioritization. | I added a KEV-first priority lens and due-date semantics to the product. |
| [2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/?msockid=227143b0b7a86c9429835518b6ac6d32) | https://www.verizon.com/business/resources/reports/dbir/?msockid=227143b0b7a86c9429835518b6ac6d32 | July 16, 2026 | Verizon says 31% of breaches start with software vulnerabilities and 48% involve ransomware, with AI increasing attacker speed. | The product must prioritize exploitable exposure and third-party risk, not only severity scores. |
| [Exposure insights overview](https://learn.microsoft.com/ka-ge/security-exposure-management/exposure-insights-overview) | https://learn.microsoft.com/ka-ge/security-exposure-management/exposure-insights-overview | July 16, 2026 | Microsoft says exposure insights are for CISOs, decision makers, risk owners, and security teams, and they aggregate posture across workloads into a single pipeline. | I added a leadership-facing summary and made the dashboard role-aware. |
| [Review security recommendations in Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/security-recommendations) | https://learn.microsoft.com/en-us/security-exposure-management/security-recommendations | July 16, 2026 | Microsoft groups recommendations by asset type and exposes risk-based prioritization plus remediation steps. | The IA should be grouped by surface and drill down into remediation details. |
| [Microsoft Secure Score](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score) | https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score | July 16, 2026 | Microsoft allows risk accepted, planned, resolved through third party, and alternate mitigation statuses with score history. | I added audit-friendly status transitions and accepted-risk handling. |
| [Dashboards page in the Vulnerability Manager Workspace](https://www.servicenow.com/docs/r/security-management/vulnerability-manager-workspace/vr-ws-dashboards.html?contentId=oHuE~CrmJFBo4dLYGYu~pg) | https://www.servicenow.com/docs/r/security-management/vulnerability-manager-workspace/vr-ws-dashboards.html?contentId=oHuE~CrmJFBo4dLYGYu~pg | July 16, 2026 | ServiceNow uses role-based dashboards and defaults different views for analysts, app sec managers, and container owners. | The product needs distinct review modes for managers versus remediation owners. |
| [Vulnerability Response remediation overview](https://www.servicenow.com/docs/r/security-management/vulnerability-response/cj-common-vuln-tasks.html) | https://www.servicenow.com/docs/r/security-management/vulnerability-response/cj-common-vuln-tasks.html | July 16, 2026 | Remediation is presented as a phased process: verify import, triage, then monitor progress to completion. | I structured the workflow around queue review, owner assignment, and progress tracking. |
| [CrowdStrike Falcon Exposure Management](https://www.crowdstrike.com/en-us/platform/exposure-management/) | https://www.crowdstrike.com/en-us/platform/exposure-management/ | July 16, 2026 | CrowdStrike emphasizes exploitable vulnerabilities, attack paths, continuous monitoring, and no platform change required. | I kept the product as an overlay that plugs into existing security tools. |
| [Using risk-based metrics in an exposure management program](https://www.tenable.com/blog/how-to-use-risk-based-metrics-in-an-exposure-management-program) | https://www.tenable.com/blog/how-to-use-risk-based-metrics-in-an-exposure-management-program | July 16, 2026 | Tenable frames exposure management around discovery, prioritization, validation, and mobilization metrics. | I added a lifecycle/funnel view and stage-based metrics. |
| [Introducing Wiz for Exposure Management](https://www.wiz.io/blog/introducing-wiz-for-exposure-management) | https://www.wiz.io/blog/introducing-wiz-for-exposure-management | July 16, 2026 | Wiz highlights deduplication, CMDB enrichment, ownership mapping, and attack-path correlation. | I made explainability, ownership, and attack-path context first-class UI elements. |
| [What is alert fatigue?](https://www.ibm.com/think/topics/alert-fatigue) | https://www.ibm.com/think/topics/alert-fatigue | July 16, 2026 | IBM defines alert fatigue as operational exhaustion from too many low-priority, non-actionable alerts. | The product needs a noise-reduction promise and visible scoring rationale. |
| [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) | https://www.w3.org/WAI/standards-guidelines/wcag/ | July 16, 2026 | WCAG is the core accessibility standard for web content and mobile accessibility. | I designed for keyboard use, clear labels, and non-color redundancy. |
| [About CDC Open-Source Visualization Editor (COVE)](https://www.cdc.gov/cove/about/index.html) | https://www.cdc.gov/cove/about/index.html | July 16, 2026 | CDC’s visualization guidance emphasizes 508-compliant, mobile-friendly dashboards. | I kept charts readable on small screens and supported text-first fallbacks. |

## Research Synthesis

- Buyer segment: security leaders and exposure managers at mid-market and enterprise orgs with multiple tools and a recurring weekly review process.
- Painful workflow: every vendor agrees the work is prioritization, ownership, and remediation, not raw discovery.
- Product category: exposure management / CTEM-adjacent operational workspace.
- Differentiator: explainable prioritization plus collaboration and auditability.
- Market motion: land as an overlay on top of existing tooling, prove time-to-value fast, then expand into workflows and reporting.

## Product Decisions

- Prioritize by exploitability, business impact, KEV, and ownership gaps.
- Show a queue, not a wall of widgets.
- Keep the detail pane focused on evidence, attack path, owner, and remediation steps.
- Make accepted risk and alternate mitigation explicit, with history.
- Use readable dense visuals with text summaries and responsive layouts.

