# Research

**Access date:** July 16, 2026

## Summary judgment

The strongest wedge is **exposure management for lean security teams**: a dashboard that collapses scanner noise into a ranked queue of exploitable exposures, shows why each item matters, and drives remediation handoffs into IT with ownership, due dates, and exception tracking.

This is narrower and more defensible than a generic SOC console. It aligns with current vendor positioning around risk-based prioritization, KEV-driven urgency, attack-path context, and cross-functional remediation workflows.

## 1) Buyer and user segments

| Segment | Painful workflow | Finding | Decision changed |
|---|---|---|---|
| Security leaders in mid-market and enterprise | Need a board- and ops-ready view of cyber risk without hand-assembling slides from multiple tools | NIST CSF 2.0 frames cybersecurity outcomes as a way to understand, assess, prioritize, and communicate risk across any maturity level. | Position the product as a risk communication and execution layer, not another raw findings console. |
| Vulnerability / exposure managers | Spend time deduplicating scanner output, checking exploitability, and chasing owners | CISA says the KEV Catalog is the authoritative source of vulnerabilities exploited in the wild and should be used as an input to prioritization. | Prioritization should center on exploitability and exposure, not CVSS alone. |
| SOC / SecOps analysts | Suffer alert and findings noise, especially when many signals need context before action | Microsoft notes SOCs process large alert volumes and that inconsistent triage leads to missed threats and disproportionate time spent filtering noise. | The primary interaction must be triage, explainability, and guided action, not passive KPI viewing. |
| IT / ops remediation owners | Need a concrete request, clear due date, and a way to track progress | Microsoft Defender Vulnerability Management exposes a remediation request workflow and tracks remediation activity status. | The product must include a structured handoff path into remediation, with status and ownership. |

## 2) Product categories and representative competitors

| Category | Representative products | What they emphasize | Implication |
|---|---|---|---|
| Exposure management | Wiz Exposure Management, CrowdStrike Falcon Exposure Management, Palo Alto Cortex Exposure Management, AWS Security Hub exposure findings | Correlation, exploitability, attack paths, deduplication, and business context | The demo should show correlated exposures and ranked remediation, not raw vulnerability counts. |
| Security operations platforms | Palo Alto Cortex XSIAM, ServiceNow Security Operations, Microsoft Defender XDR | Centralized operations, workflow, automation, incident response, ticketing | The UX should feel operational and collaborative, with ownership and workflow state. |
| Cloud-native risk consoles | AWS Security Hub | Prioritized risk summary, exposure findings, attack path analysis, customizable widgets | The IA should surface a summary plus drill-down lanes, with filters that preserve context. |

## 3) Dashboard and security-operations information architecture

| Finding | Source | Decision changed |
|---|---|---|
| Security Hub exposes a prioritized risk summary, automated correlation, exposure findings, and attack path analysis in a dashboard with drill-down widgets | AWS Security Hub documentation | The product should have one executive summary row, one operational queue, and one remediation panel, all linked. |
| Cortex Exposure Management Command Center is framed as useful to both executives and vulnerability management teams, with widgets that drill into filtered pages | Palo Alto docs | The dashboard needs two levels of detail: executive clarity and analyst drill-down. |
| ServiceNow’s security exposure workflows unify infrastructure, application, container, and configuration exposures and feed remediation tasks centrally | ServiceNow docs | The IA should model exposures by domain but resolve them into one queue and one remediation backplane. |

## 4) Alert fatigue, prioritization, explainability, and trust

| Finding | Source | Decision changed |
|---|---|---|
| Microsoft warns that high alert volume and inconsistent triage slow response and can delay real threats | Microsoft Learn | Default view should sort by likely actionability and show why an item is on top. |
| Wiz emphasizes deduplication, business/security context, and AI-powered remediation guidance | Wiz Exposure Management | Each prioritized item should carry an explicit “why now” explanation and a recommended next action. |
| AWS exposure findings classify severity using discoverability, exploitability, likelihood, public awareness, and impact | AWS Security Hub docs | The prioritization model should blend exploitability, asset criticality, and compensating controls. |
| ServiceNow emphasizes business-impact-based prioritization and collaboration on remediation | ServiceNow docs | The product should show owner, due date, SLA risk, and collaboration state alongside the technical exposure. |

## 5) Security metrics and visualizations

| Metric / visualization | Why it fits | Decision changed |
|---|---|---|
| Open exposures by priority band | Fast triage of backlog | Use stacked summary cards and a ranked queue instead of one big aggregate score only. |
| Time-to-remediate by severity / queue aging | Shows operational effectiveness | Include aging bands and remediation SLA risk. |
| KEV-backed exposures and internet-exposed assets | Best proxy for attacker urgency | Give KEV-tagged items and exposed external assets special visual weight. |
| Coverage by source and by domain | Shows data quality and confidence | Show scanner coverage and confidence so users know whether the queue is complete. |
| Attack-path / blast-radius style chains | Communicates why an issue matters | Include a compact chain visualization in the detail pane. |
| Ownership and task status | Drives collaboration | Include assignee, team, and remediation status as primary fields, not metadata. |

## 6) Accessibility and responsive requirements for dense tools

| Finding | Source | Decision changed |
|---|---|---|
| WCAG 2.2 requires contrast, reflow, keyboard access, and non-color-only meaning | W3C WCAG 2.2 | The UI must support keyboard use, visible focus, and responsive reflow without horizontal scrolling. |
| Dense operational screens should preserve scanability and state clarity | Inference from dashboard and SOC patterns above | Use tight card hierarchy, clear labeling, and consistent status color plus text badges. |

## 7) GTM and positioning patterns

| Pattern | Evidence | Decision changed |
|---|---|---|
| Enterprise-led motions with demos and contact forms dominate this category | Wiz, CrowdStrike, ServiceNow, Palo Alto public pages | Assume a sales-led GTM with high-touch pilot/POC rather than self-serve checkout. |
| Vendors emphasize reducing noise, prioritizing exploitable risk, and accelerating remediation | Wiz, CrowdStrike, Microsoft, AWS, ServiceNow | The product promise should be “fewer things, better decisions, faster fixes.” |
| Exposure management is increasingly positioned as a unified workflow across scanners and IT | Microsoft, ServiceNow, AWS | The wedge should integrate multi-source findings and hand off to remediation rather than trying to replace scanners. |

## 8) Source list

1. **The NIST Cybersecurity Framework (CSF) 2.0**  
   https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20
2. **Cybersecurity Framework**  
   https://www.nist.gov/cyberframework
3. **Known Exploited Vulnerabilities Catalog**  
   https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0
4. **CISA Adds Three Known Exploited Vulnerabilities to Catalog**  
   https://www.cisa.gov/news-events/alerts/2025/08/25/cisa-adds-three-known-exploited-vulnerabilities-catalog
5. **Exposure Management | Wiz**  
   https://www.wiz.io/solutions/exposure-management
6. **Exposure findings in Security Hub - AWS Security Hub**  
   https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html
7. **AWS Security Hub Documentation**  
   https://aws.amazon.com/documentation-overview/security-hub/
8. **Microsoft Security Alert Triage Agent in Microsoft Defender (Preview)**  
   https://learn.microsoft.com/en-us/defender-xdr/security-alert-triage-agent
9. **Remediate vulnerabilities with Microsoft Defender Vulnerability Management**  
   https://learn.microsoft.com/en-us/defender-vulnerability-management/tvm-remediation
10. **Microsoft Defender Vulnerability Management documentation**  
    https://learn.microsoft.com/en-us/defender-vulnerability-management/
11. **Exposure Management Command Center - Cortex XSIAM**  
    https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/Exposure-Management-Command-Center
12. **Get started with Cortex XSIAM**  
    https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-3.x-Documentation/Get-started-with-Cortex-XSIAM
13. **Security Operations Tools - ServiceNow**  
    https://www.servicenow.com/products/security-operations/secops-tools.html
14. **Security Exposure Management workflow - ServiceNow**  
    https://www.servicenow.com/docs/r/security-management/security-operations/sem-workflow.html
15. **Web Content Accessibility Guidelines (WCAG) 2.2**  
    https://www.w3.org/TR/WCAG22/
16. **Groups - MITRE ATT&CK**  
    https://attack.mitre.org/groups/
17. **Techniques - Enterprise - MITRE ATT&CK**  
    https://attack.mitre.org/techniques/

