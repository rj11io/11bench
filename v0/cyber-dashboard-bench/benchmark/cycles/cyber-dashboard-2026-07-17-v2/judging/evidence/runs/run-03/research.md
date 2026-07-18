# Research: BreachPath Command

Access date for all sources: July 16, 2026.

## Research Scope

The dashboard category is broad, so I evaluated security operations, vulnerability management, cloud security posture, exposure management, incident response, and executive risk. The strongest product wedge is a focused exposure-remediation workbench for lean security engineering teams that own vulnerability prioritization but depend on cloud, IT, and application owners to actually fix issues.

The selected product is **BreachPath Command**: a dashboard and workflow that turns scanner, cloud, identity, threat-intel, and business-context signals into a small set of explainable fix packages, each with ranked reasoning, owner routing, and a remediation receipt.

## Source Notes And Decisions

| Source | URL | Findings | Decisions changed |
| --- | --- | --- | --- |
| Verizon, "Vulnerability exploitation top breach entry point, 2026 industry-wide DBIR finds" | https://www.verizon.com/about/news/breach-industry-wide-dbir-finds | Verizon reported that software flaw exploitation was the top breach entry point in the 2026 DBIR, at 31% of breaches, and that faster exploitation compresses the defender window. Third-party involvement also rose sharply. | Move away from generic SOC widgets and toward a product that helps teams decide which exploitable weaknesses need action now. |
| Google Cloud / Mandiant, "M-Trends 2025: Data, Insights, and Recommendations From the Frontlines" | https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2025/ | Exploits were the most common initial infection vector in Mandiant investigations at 33%; stolen credentials were second at 16%; Mandiant recommends vulnerability management, least privilege, hardening, logging, cloud security assessment, and privileged MFA. | Combine vulnerability, identity, cloud, and asset context into one workbench rather than treating CVEs as isolated rows. |
| CISA, "Known Exploited Vulnerabilities Catalog" | https://www.cisa.gov/known-exploited-vulnerabilities-catalog | CISA maintains KEV as an authoritative source of vulnerabilities exploited in the wild and recommends using it as an input to vulnerability prioritization. | Make KEV presence a top-ranking signal and a visible explanation chip, but not the only signal. |
| FIRST / Risk Based Prioritization, "Introduction to EPSS" | https://riskbasedprioritization.github.io/epss/Introduction_to_EPSS/ | EPSS estimates the probability a CVE will be exploited in the wild and is updated daily. The guide stresses that EPSS should be used with other measures of risk, and exploitation-based prioritization reduces cost and risk. | Use EPSS as a likelihood input and expose it as a probability, not as a mysterious AI score. |
| NVD, "Vulnerability Metrics" | https://nvd.nist.gov/vuln-metrics | NVD states that CVSS provides a qualitative severity measure and is not a measure of risk. It supports CVSS v2, v3.x, and v4.0, with CVSS v4 adding threat, environmental, and supplemental groups. | Avoid "critical CVE count" as the primary dashboard. Use CVSS as one component next to exploitation likelihood, reachability, asset criticality, and business impact. |
| CERT/CC, "What is SSVC?" | https://certcc.github.io/SSVC/tutorials/ssvc_overview/ | SSVC is stakeholder-specific, uses decision models, and prioritizes by risk to the concerned stakeholder. Suggested deployer outcomes include Defer, Scheduled, Out-of-cycle, and Immediate. | Model the UX around a transparent action decision: Immediate, Attend, Scheduled, or Defer/Accept, with visible reasons. |
| CIS, "CIS Critical Security Control 7: Continuous Vulnerability Management" | https://www.cisecurity.org/controls/continuous-vulnerability-management | CIS Control 7 calls for continuously assessing and tracking vulnerabilities on enterprise assets to remediate them and minimize attackers' window of opportunity. | Include age, due-date, and remediation-progress metrics. The product must track work closure, not just discovery. |
| NIST, "Cybersecurity Framework" | https://www.nist.gov/cyberframework | CSF 2.0 supports organizations reducing cybersecurity risk through Govern, Identify, Protect, Detect, Respond, and Recover outcomes and profiles. | Make the product support operational users while producing executive-ready risk posture evidence. |
| NIST SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management" | https://csrc.nist.gov/pubs/sp/800/61/r3/final | NIST positions incident response as part of broader cybersecurity risk management and emphasizes improving detection, response, and recovery effectiveness. | Include auditability and decision receipts so exposure response can feed incident readiness and post-incident review. |
| MITRE ATT&CK FAQ | https://attack.mitre.org/resources/faq/ | ATT&CK is a knowledge base of adversary behavior, with tactics as "why" and techniques as "how"; it applies to enterprise IT, cloud, SaaS, identity providers, and more. | Map attack-path steps to ATT&CK-style techniques for analyst trust and common language. |
| Microsoft Learn, "Overview of attack paths in Microsoft Security Exposure Management" | https://learn.microsoft.com/en-us/security-exposure-management/work-attack-paths-overview | Attack paths combine assets and techniques to show end-to-end routes from entry points to critical assets. The dashboard shows attack paths, choke points, and critical assets; choke points help focus remediation. | Use attack-path and choke-point language, but differentiate by emphasizing owner-ready fix packages and a stateful workflow. |
| Tenable Docs, "Attack Path" | https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm | Tenable pairs data with graph analytics and MITRE ATT&CK, defines top paths to critical assets, and says top techniques are remediation priorities. It also requires vulnerability, identity, cloud, and ASM data. | Competitor set validates the category. The demo must show graph context, critical assets, and required data freshness. |
| Wiz, "Exposure Management" | https://www.wiz.io/solutions/exposure-management | Wiz positions exposure management as unifying cloud, code, on-prem, and tool findings; validating exploitability; deduplicating findings; assigning owners; and reducing MTTR. | Do not compete on "single pane of glass" alone. The differentiated promise is decision explainability plus remediation accountability. |
| Palo Alto Networks, "Cortex Xpanse" | https://docs-cortex.paloaltonetworks.com/p/XPANSE | Xpanse focuses on internet-facing asset discovery, active learning, risk prioritization, and active response playbooks that resolve exposures or identify owners and business context. | External attack surface discovery is adjacent, but the wedge should integrate external exposure as a signal rather than become an ASM product. |
| Microsoft Learn, "Create scheduled analytics rules in Microsoft Sentinel" | https://learn.microsoft.com/en-us/azure/sentinel/create-analytics-rules | Sentinel supports entity mapping, alert thresholds, event grouping, incident grouping, automation, and tuning to reduce noise. | Borrow incident-grouping lessons: group many alerts into fix packages by shared owner, choke point, or critical asset. |
| SANS, "The State of Automation in Security Operations: A SANS Survey" | https://www.sans.org/white-papers/state-automation-security-operations-sans-survey | SANS reported that 59% of SOCs use more than 10 tools, 53% cite the growing attack surface as a major challenge, engineering effort is the top SOAR barrier, and MTTD/MTTR are leading KPIs. | Product should avoid a heavy SOAR build requirement. Provide guided, lightweight workflows and ITSM handoff instead. |
| Forrester, "Announcing The Forrester Wave: Unified Vulnerability Management Solutions, Q3 2025" | https://www.forrester.com/blogs/announcing-the-forrester-wave-unified-vulnerability-management-wave-q3-2025/ | Forrester frames UVM as more than aggregation: it unifies remediation across systems and teams. It also says remediation remains a persistent challenge even as prioritization improves. | Make remediation ownership, progress, and exception governance core product surfaces, not afterthoughts. |
| Forrester, "The Real Future Of Proactive Security Isn't Finding Exposures - It's Fixing Them" | https://www.forrester.com/blogs/the-real-future-of-proactive-security-isnt-finding-exposures-its-fixing-them/ | Forrester reduces proactive security to three durable principles: visibility, prioritization, and remediation. | Use this as the product narrative: connect visibility to prioritization to accountable remediation. |
| GitHub Docs, "Security overview dashboard metrics" | https://docs.github.com/en/code-security/reference/security-at-scale/overview-dashboard-metrics | GitHub separates detection, remediation, and prevention metrics; includes alert age, closed alerts over time, mean time to remediate, net resolve rate, and introduced-vs-prevented vulnerabilities. | Include age, SLA, net risk reduction, and owner load instead of only raw critical counts. |
| W3C, "Web Content Accessibility Guidelines (WCAG) 2.2" | https://www.w3.org/TR/WCAG22/ | WCAG 2.2 includes guidance on contrast, reflow, keyboard access, focus visibility, target size, status messages, and robust semantics across devices. | Design must use semantic controls, visible focus, non-color-only status, responsive reflow, and no horizontal overflow on mobile. |

## Buyer And User Segments

Primary users:

- Security engineering lead or vulnerability management lead at a 300-5,000 person cloud-heavy company.
- Small SecOps manager responsible for board-visible exposure metrics but without enough analysts to manually chase every scanner result.

Secondary users:

- Cloud/platform owners who receive remediation work.
- Application owners who need fix context without opening five security tools.
- CISO or security director who needs defensible risk reduction reporting.
- GRC/audit stakeholders who need evidence that high-risk exposures were triaged and governed.

Painful workflows found across sources:

- Too many disconnected tools: SANS reports more than 10 SOC tools is common.
- Severity is not risk: CVSS alone does not include business context, reachability, current exploit activity, or compensating controls.
- Alert grouping and correlation are necessary, but grouped incidents still need an owner-ready fix.
- Attack-path tools show what could happen, but remediation owners often still receive a vague ticket.
- Security teams need to explain why a fix beats hundreds of other "critical" items.
- Exceptions and risk acceptance need audit trails, because unowned deferrals become silent risk debt.

## Product Category And Competitors

Relevant categories:

- Exposure management / Continuous Threat Exposure Management (CTEM).
- Unified Vulnerability Management (UVM).
- Cloud Native Application Protection Platform (CNAPP) exposure modules.
- External Attack Surface Management (EASM/ASM).
- Security operations and SIEM incident management.
- ITSM/SOAR remediation orchestration.

Representative competitors:

- Tenable One / Tenable Exposure Management: broad exposure management, attack path analytics, ATT&CK mapping, vulnerability and identity data.
- Microsoft Security Exposure Management: exposure graph, attack paths, choke points, critical assets.
- Wiz Exposure Management: cloud/code/on-prem context, exploitability validation, owner routing, remediation guidance.
- Palo Alto Cortex Xpanse: internet-facing discovery, risk scoring, active response.
- Rapid7, Qualys, CrowdStrike, and ServiceNow also compete around vulnerability risk, exposure, ticketing, and SecOps workflow.

Market gap:

Broad platforms sell unified visibility. The defensible wedge for this demo is narrower: **explainable remediation command for the top 10 fix packages that reduce breach paths fastest**, with ownership and decision receipts built in. This is credible as a land-and-expand product because it can ingest existing scanners instead of replacing them.

## Dashboard And Information Architecture Implications

The dashboard should answer four questions in order:

1. What needs action before the next exploitation/SLA window closes?
2. Why is this exposure ranked above the rest?
3. Who can fix it and what exact work should they do?
4. What risk reduction will we get, and what evidence will we retain?

Dashboard hierarchy:

- Top strip: exposure debt, immediate fix packages, risk due this week, forecasted MTTR.
- Primary queue: ranked fix packages grouped by critical asset, owner, and choke point.
- Detail pane: attack path, business impact, scoring explanation, evidence freshness.
- Action pane: assign, create fix brief, mark fixed, accept risk, add note.
- Trend pane: risk burndown, owner load, exceptions, freshness.

## Prioritization Logic

The product should not invent a black-box "cyber score." It should compute a transparent action decision from:

- Exploitation: KEV, active exploitation evidence, EPSS probability, exploit availability.
- Exposure: internet-facing, reachable from untrusted networks, public cloud posture, identity reachability.
- Impact: critical asset, data sensitivity, blast radius, business service tier.
- Choke-point reduction: number of paths reduced by one fix.
- Remediation reality: owner, fix effort, safe compensating controls, SLA.
- Confidence: source freshness and coverage.

Suggested action tiers:

- Immediate: active/known exploited or high EPSS plus open exposure and critical asset path.
- Attend: high-impact path with exploitability or high business value, but less immediate threat evidence.
- Scheduled: important but not currently exposed or exploitable enough to interrupt planned work.
- Accepted/Defer: documented exception with expiry, approver, and compensating control.

## Visualization Choices

- Ranked queue: best for operational triage and comparison.
- Attack-path graph: best for explaining how an attacker reaches impact.
- Signal chips: show KEV/EPSS/CVSS/exposure/identity/business inputs without hiding logic.
- Risk burndown line/area: shows whether actions are reducing exposure debt over time.
- Owner load bars: prevents dumping all work on one platform team.
- SLA timeline: makes due dates and exception expiry visible.

Avoid:

- Pie charts for alert severity; they do not help decide the next action.
- Single aggregate risk score without explanation.
- Novel 3D attack maps; dense operational users need scanability and trust.

## Accessibility And Responsive Considerations

- Use semantic headings, buttons, labels, tables/lists, and status text.
- Pair color with text labels and icons.
- Maintain visible focus and keyboard-operable controls.
- Avoid horizontal overflow at 375px; stack queue, detail, and action panes.
- Keep charts readable with short labels and text alternatives.
- Provide empty states for filtered/search views and high-attention states for immediate exposures.
- Avoid tiny tap targets and hover-only disclosure.

## GTM Implications

Ideal initial customer:

- Cloud-heavy mid-market or lower-enterprise company with existing scanners, Jira/ServiceNow, and a small security engineering team.
- Triggered by a KEV scramble, failed patch SLA, board pressure after a breach in the sector, cyber insurance questionnaire, or a tool consolidation initiative.

Positioning:

- "Turn exploit-ready exposure into owner-ready fix packages."
- Land on top-risk remediation and risk reporting, then expand to more integrations and continuous controls.

Packaging hypothesis:

- Team tier by protected assets and integrations.
- Enterprise tier adds SSO/SAML, RBAC, audit exports, ServiceNow/Jira bidirectional sync, custom decision models, and executive reporting.

Key proof in demo:

- User can select a top exposure, see why it matters, assign the owner, generate a fix brief, mark it fixed or accept risk, and see risk debt change.

