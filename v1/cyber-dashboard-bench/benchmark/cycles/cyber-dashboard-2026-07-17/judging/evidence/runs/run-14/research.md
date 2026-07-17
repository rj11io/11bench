# Cinder research

**Research focus.** Cinder is a narrow remediation-operations product for security teams at 100–1,000-person SaaS companies. It normalizes high-value findings from cloud, identity, endpoint, and developer tools into a small, explainable queue of work. The user is not buying another scanner; they are trying to decide what deserves engineering time, get it owned, and prove the risk changed.

**Access date for all sources below:** 2026-07-16.

## Buyer and user segments

The most attractive initial segment is a lean security team (one security lead plus platform or IT partners) in a growing B2B SaaS company. The economic buyer is usually the CISO, VP Engineering, or COO; the day-to-day operator is a security engineer or security program manager; the person who must make the change is usually a platform, IT, or application owner. This segment has enough asset and vendor complexity to feel the pain, but not enough staff to operate a full SIEM/SOAR or a large exposure-management program.

The buying trigger is a customer security review, a new compliance obligation, a material cloud migration, an audit finding, or a newly exploited vulnerability in a production dependency. The common job is not “see more alerts.” It is “make a defensible decision about the next fix and get it through the team’s existing work system.”

## Sources and decisions

### 1. NIST Cybersecurity Framework 2.0

- **Source:** [NIST Releases Version 2.0 of Landmark Cybersecurity Framework](https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework)
- **Finding:** CSF 2.0 is intended for organizations of all sizes, adds Govern, and emphasizes communication across security, enterprise risk, and supply-chain stakeholders. Its six functions are Govern, Identify, Protect, Detect, Respond, and Recover.
- **Decision changed:** Cinder’s top-level model includes a governance-friendly “risk closed” narrative, owner/accountability fields, audit history, and an exportable proof packet—not only an analyst view. The product focuses on operationalizing Identify/Protect/Govern rather than becoming a full incident-detection console.

### 2. NIST SP 800-61 Rev. 3

- **Source:** [SP 800-61 Rev. 3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- **Finding:** The April 2025 revision folds incident-response recommendations into CSF 2.0 risk management and stresses preparation, communication, and improvement. It explicitly notes that detailed response activities vary too much by technology to live in one static document.
- **Decision changed:** Cinder links each decision to evidence and a human owner, captures a timeline, and supports a “verified” state. It does not claim to execute containment or replace an incident-response platform; those actions remain with the customer’s tools and playbooks.

### 3. CISA Known Exploited Vulnerabilities Catalog

- **Source:** [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- **Finding:** CISA calls the KEV catalog an authoritative source of vulnerabilities exploited in the wild and recommends using it as an input to a vulnerability-prioritization framework. Entries include an action and due date.
- **Decision changed:** “Known exploited” is a first-class risk signal in the queue and the evidence rail. Cinder uses KEV as one factor, not as an automatic verdict; business criticality, reachability, blast radius, and ownership still affect priority.

### 4. Microsoft Defender incident queue documentation

- **Source:** [Prioritize incidents in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/incident-queue)
- **Finding:** A mature incident queue combines signals across devices, users, mailboxes, and resources. Microsoft documents priority scoring that considers severity, threat analytics, MITRE techniques, asset criticality, alert rarity, and high-profile threats, and explains the reasoning behind the score.
- **Decision changed:** Cinder shows the inputs to its score beside the score (“reachable,” “business critical,” “KEV,” “blast radius”) and makes the queue sortable/filterable. The experience intentionally avoids a mysterious single-number risk score.

### 5. Microsoft on SOC alert fatigue and metrics

- **Source:** [6 strategies to reduce cybersecurity alert fatigue in your SOC](https://www.microsoft.com/security/blog/2021/02/17/6-strategies-to-reduce-cybersecurity-alert-fatigue-in-your-soc/)
- **Finding:** Microsoft cites an ESG study that 44% of alerts went uninvestigated, and recommends filtering low-quality signals, correlation, automation, and metrics that help teams improve rather than create another checklist.
- **Decision changed:** The home screen is a “shortest path to lower risk” queue instead of an alert-volume wall. Cinder reports time to owner, time to verified remediation, queue aging, and risk closed; it does not celebrate raw alert count.

### 6. Microsoft Defender for Cloud alert documentation

- **Source:** [Security alerts and incidents - Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview)
- **Finding:** Alerts provide affected resources, issue details, severity, and remediation steps. Correlating low-fidelity signals into incidents is explicitly presented as a way to reduce alert fatigue; alerts can stream to SIEM, SOAR, and ITSM tools.
- **Decision changed:** Every Cinder work item has a concise remediation statement, a named asset, a confidence label, and a destination-ticket field. The intended architecture is complementary to existing detection and ITSM systems, not a rip-and-replace.

### 7. Wiz attack-path analysis

- **Source:** [What is Attack Path Analysis?](https://www.wiz.io/academy/detection-and-response/attack-path-analysis)
- **Finding:** Wiz describes attack-path analysis as mapping exploitable sequences to critical assets, with graph relationships among resources, permissions, vulnerabilities, and data. It warns that treating all “critical” vulnerabilities equally creates noise.
- **Decision changed:** Cinder’s differentiator is “evidence-backed remediation briefs”: compact proof of reachability and business impact, expressed as a readable chain (“public entry → role → production data”). The demo includes a lightweight path visualization rather than an unreadable full graph.

### 8. Tenable One exposure-management positioning

- **Source:** [Tenable One Exposure Management Platform](https://www.tenable.com/products/tenable-one)
- **Finding:** Tenable positions exposure management around broad attack-surface visibility, analytics to prioritize remediation, and communication of cyber risk. It combines many product domains and emphasizes a small set of vulnerabilities likely to be exploited.
- **Decision changed:** Cinder deliberately narrows the wedge to remediation coordination for lean teams and interoperates with scanners and cloud/security platforms. “Broad visibility” is an input; the product promise is the work packet that follows.

### 9. Rapid7 InsightVM documentation

- **Source:** [Welcome to Vulnerability Management (InsightVM)](https://help.rapid7.com/insightvm/en-us/index.html)
- **Finding:** InsightVM’s core workflow includes identifying risk, organizing assets, prioritizing remediation, and generating top-remediation reports. It also uses asset tags and business context to adjust risk.
- **Decision changed:** Cinder’s asset model includes owner, environment, data class, and criticality. The dashboard visualizes the change in risk after verification so a security lead can explain why a small number of fixes mattered.

### 10. GitHub code-scanning workflow

- **Source:** [Manage code scanning alerts - GitHub Enterprise Cloud Docs](https://docs.github.com/en/enterprise-cloud@latest/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts)
- **Finding:** GitHub supports viewing, fixing, dismissing, linking alerts to issues, and delegated dismissal. Dismissals require a reason and can include a comment that becomes part of the alert timeline.
- **Decision changed:** Cinder includes a governed “accept risk / dismiss” path with required rationale and reviewer audit. It treats “not exploitable” and “accepted until date” as decisions to preserve, not as silent deletion.

### 11. Atlassian Jira API documentation

- **Source:** [Jira Cloud platform REST API: Issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/)
- **Finding:** Jira’s issue API supports creating and updating issues, requires project/issue metadata and permissions, and supports issue links. That makes Jira a credible first remediation destination for an integration-driven product.
- **Decision changed:** The demo’s primary call to action is “Create Jira ticket,” with a preview of the issue title, acceptance criteria, and owner. Production would use least-privilege OAuth and explicit project mapping; the demo only simulates the action.

### 12. WCAG 2.2

- **Source:** [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- **Finding:** WCAG 2.2 requires keyboard access, reflow, non-color-only meaning, visible focus, and a 4.5:1 minimum contrast ratio for normal text at AA.
- **Decision changed:** Status badges pair color with text/icon, buttons have labels and focus styles, the desktop table becomes cards on narrow screens, and the drawer can be opened and closed from the keyboard.

## Category map and positioning

| Category | Representative products | Strength | Gap for the initial segment |
| --- | --- | --- | --- |
| SIEM/XDR and incident queue | Microsoft Defender, Sentinel, Splunk | Detection correlation and response | High setup/operation burden; a lean team still needs a cross-tool remediation queue |
| Vulnerability management / exposure management | Tenable One, Rapid7 InsightVM | Coverage, scanning, risk-based prioritization | Often optimized for security operators; owner-ready context can still be fragmented |
| CNAPP / cloud security | Wiz, Prisma Cloud | Cloud graph, attack paths, code-to-cloud context | Cloud-first; less useful as a neutral work layer across endpoint, identity, SaaS, and engineering tools |
| Application security | GitHub code scanning, Snyk | Developer-native finding and issue workflows | Scope is code-centric; business risk and cross-domain context are limited |
| ITSM / ticketing | Jira, ServiceNow | Ownership, workflow, SLA, audit trail | Knows the work but not the security evidence or risk logic |

Cinder sits in the gap between “finding” and “finished work.” It is an evidence and decision layer that can consume existing findings and then hand off into Jira/Linear/ServiceNow while preserving the reasoning and proof.

## Visualization and metric decisions

- **Priority queue:** a sortable, filterable table is the right primary visualization because each row is an action with an owner, deadline, evidence, and next step.
- **Priority score:** show a 0–100 score only as a compact index, then expose the factors that moved it. Avoid a gauge; a score without explanation damages trust.
- **Risk trend:** a simple line chart with a highlighted target is enough for a weekly trend. The audience needs direction and a decision, not a decorative chart.
- **Risk mix:** a ring is appropriate for a few mutually exclusive workflow states (open, in progress, verified), but it must have a text legend and not be the only encoding.
- **Operational metrics:** risk closed per week, median time to owner, median time to verified, SLA breach count, and percentage of items with fresh evidence. Alert volume is a diagnostic, not a success metric.

## Product decisions summary

1. Primary user: security program lead / security engineer in a lean SaaS security team.
2. Narrow wedge: turn high-signal exposures into evidence-backed, owner-ready remediation work.
3. Core loop: ingest → normalize/dedupe → rank with transparent factors → assign → create work item → verify → retain proof.
4. Differentiation: every prioritized item tells the operator why it matters, who owns the change, and what evidence will count as fixed.
5. Trust posture: the system recommends; humans approve, assign, accept risk, and verify. Integrations and live state are explicit.
