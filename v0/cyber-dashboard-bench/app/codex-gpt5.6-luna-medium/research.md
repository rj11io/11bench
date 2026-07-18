# Research — Luna Exposure Triage

Access date for all sources: 2026-07-16.

## Market and workflow signals

| Source | Finding | Product decision changed |
| --- | --- | --- |
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | CSF 2.0 frames cybersecurity as a risk-management system and adds Govern to Identify, Protect, Detect, Respond, and Recover. | The product must connect technical findings to business context and an explicit owner, rather than present a severity-only list. |
| [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | CISA calls KEV an authoritative input to vulnerability prioritization because it represents vulnerabilities exploited in the wild. | Active exploitation is a first-class signal in triage. The score must show its evidence and not hide behind an opaque AI label. |
| [Verizon 2025 DBIR](https://www.verizon.com/about/news/2025-data-breach-investigations-report) | Verizon analyzed 22,000+ incidents and reports credential abuse (22%) and vulnerability exploitation (20%) as leading initial access vectors. | The wedge focuses on internet-facing exposure and identity/asset criticality, not only internal CVE hygiene. |
| [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/pubs/sp/800/61/r2/final) | Incident response is a lifecycle of preparation, detection/analysis, containment/eradication/recovery, and post-incident activity. | The queue needs a durable state history and collaboration handoff, even though Luna is not a full SOAR. |
| [FIRST EPSS](https://www.first.org/epss/) | EPSS estimates the probability a vulnerability will be exploited in the wild in the next 30 days. | Show EPSS as one evidence chip alongside KEV and asset exposure; never conflate prediction with observed exploitation. |
| [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html) | Authentication guidance emphasizes phishing-resistant options and clear, risk-based assurance. | Identity findings should name the affected control and owner; the UI avoids pretending a finding itself proves compromise. |
| [Google SRE Workbook — Monitoring](https://sre.google/workbook/monitoring/) | Monitoring should serve a purpose, with signals selected for meaningful action and a distinction between symptoms and causes. | Use a small set of action metrics (open critical, SLA risk, exposure trend) instead of a noisy “everything” dashboard. |
| [OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/) | Testing guidance is organized by trust boundaries and concrete verification activities. | Finding detail includes affected surface, verification note, and remediation recipe so an engineer can act. |

## Buyer and user choice

The primary user is a security lead at a 100–1,000 person SaaS company who owns vulnerability management but does not have a 24/7 SOC. Their daily job is to decide what must happen today, explain why to engineering, and prove that risk is moving. A secondary user is the platform/IT owner who needs a scoped, low-friction remediation ticket with evidence and a deadline. The economic buyer is the VP Engineering or CISO who needs an honest weekly risk narrative.

Representative categories and competitors include VM platforms (Tenable, Qualys, Rapid7), exposure management (Cortex Xpanse, Randori), cloud security posture/CNAPP (Wiz, Orca), SIEM/SOC platforms (Microsoft Sentinel, Splunk), and application security platforms (Snyk). These categories are powerful but frequently create a new aggregation surface for a small team. Luna’s defensible wedge is the “decision layer” between scanners and engineering: fewer, explainable, business-aware work items with a built-in handoff.

## Information architecture and dashboard judgment

The dashboard hierarchy is intentionally: (1) what is urgent and why, (2) what changed, (3) who owns the next action, (4) supporting evidence. The main queue is a ranked worklist, not a grid of vendor counts. A selected finding opens a persistent evidence panel with business impact, signals, affected assets, owner, due date, and the next remediation step. A compact trend chart answers whether exposure is improving; it does not attempt to visualize every event.

Useful metrics are open critical findings, findings breaching SLA in seven days, internet-facing critical assets, mean time to remediate by severity, remediation throughput, and stale evidence rate. Counts need a time window and a definition. “Risk score” is a decision aid, not a probability of breach.

## Trust, fatigue, collaboration

Alert fatigue is managed through deduplication by root cause, explicit priority factors, confidence/evidence labels, and a manageable queue. Luna avoids claims of autonomous verdicts. Every recommendation is traceable to facts: KEV membership, EPSS, asset exposure, business tier, and compensating controls. Every state change records actor, timestamp, old/new state, and note. Assigning a finding creates a shareable remediation brief; it does not silently execute a patch.

## Accessibility and responsive behavior

Dense operational tools need keyboard-visible focus, semantic buttons and headings, text labels in addition to color, and charts with a textual summary. At 375px the sidebar becomes a compact top bar, the queue and evidence panel stack, and tables become labeled cards. Touch targets are at least 44px. Motion is limited to small state feedback and respects reduced-motion preferences.

## Positioning and GTM pattern

The launch motion is bottom-up: a read-only connector or CSV import produces a 15-minute “first decision” report, then a shared remediation brief invites the engineering owner. The sales narrative is “turn scanner output into the three actions your team can defend this week.” Package by managed assets and active findings, with a free single-workspace trial and paid collaboration/audit features. Initial ICP is security leads at cloud-native SaaS companies with existing scanners but no dedicated vulnerability program manager.

