# Research: Clearline Exposure Desk

Access date for all sources: 2026-07-16.

## Product decision

The chosen wedge is a focused exposure-management workbench for lean security teams: turn high-volume vulnerability findings into a small, explainable queue of actions, route those actions to the right engineering owner, and collect proof that the exposure was actually closed.

The primary user is a security lead or vulnerability-management engineer at a 500–2,500 person SaaS or digital business. They usually own the risk narrative but depend on platform, cloud, and application teams to make the fix. The secondary user is the engineering owner who needs a scoped task, an evidence-backed reason to act, and a clean verification loop.

The product is intentionally not a SIEM, EDR, scanner, or generic executive scorecard. It assumes findings arrive from existing tools and focuses on the decision and remediation handoff between “we found it” and “we can prove it is gone.”

## 1. Buyer and user segments; painful workflows

### Segment map

| Segment | User / buyer | Current job | Pain that matters to Clearline | Buying trigger |
| --- | --- | --- | --- | --- |
| Lean internal security team | Security lead, vulnerability manager, cloud-security engineer | Decide what to fix first across scanners and cloud accounts | Many findings, weak ownership metadata, unclear business impact, and no reliable “done” state | New scanner, audit finding, KEV event, ransomware concern, or a security leader asked to show risk reduction |
| Platform / infrastructure | SRE, platform lead, endpoint or network owner | Patch or mitigate systems without breaking production | Security tickets arrive without scope, urgency rationale, or safe remediation guidance | Escalation from security, a critical asset exposure, or an expiring SLA |
| Engineering leadership | VP Engineering, head of platform | Allocate a small amount of engineering time to the highest-risk work | Cannot compare a queue of CVEs to customer impact or understand whether the fix worked | Board / customer assurance request, incident, or quarterly risk review |
| MSSP / vCISO (secondary market) | Security consultant managing multiple clients | Produce an actionable weekly risk review | Client data is fragmented and reporting is repetitive | Standardized client operating cadence or need to prove service value |

### The repeated workflow failure

1. A scanner emits a large finding set, often with duplicate observations across assets.
2. Security filters by CVSS severity because it is available, even when the score is not deployment-specific.
3. An analyst researches exploit activity and asset criticality in separate tabs.
4. The finding is copied into a ticket with a vague “please patch” request, or remains in a spreadsheet.
5. Engineering asks what is reachable, what breaks, and why this item is ahead of another.
6. A ticket is closed after a claimed patch, but verification waits for a later scan or lacks evidence entirely.
7. Leadership sees a count of vulnerabilities rather than a trustworthy statement about risk reduced.

This is the narrow problem Clearline solves. The product’s output is not another inventory; it is a bounded, explainable action queue and an auditable closure record.

## 2. Category landscape and representative competitors

| Category | Representative products | What they are good at | Opportunity / constraint for Clearline |
| --- | --- | --- | --- |
| VM / RBVM | Tenable One, Rapid7 InsightVM, Microsoft Defender Vulnerability Management | Deep discovery, broad telemetry, vulnerability intelligence, risk-based prioritization, remediation automation | These products are broad platforms. A smaller overlay can be easier to adopt when the buyer already has a scanner but lacks an explainable, cross-team operating ritual. |
| Exposure management / CTEM | Tenable One, XM Cyber, Rapid7 Exposure Command, Wiz | Attack paths, toxic combinations, asset context, reachability, continuous exposure views | The market is moving toward “exposure,” but many offerings lead with platform breadth. Clearline should lead with the last mile: decision rationale, ownership, and verification. |
| SIEM / SecOps | Microsoft Sentinel, Splunk, Elastic Security | Detection, investigation, correlation, incident response | These optimize for event/incident response; vulnerability remediation is usually a downstream workflow. Clearline can complement them rather than compete on detection. |
| ITSM / GRC | ServiceNow Vulnerability Response, Jira / Linear with security workflows | Ticket routing, workflow, audit trails, enterprise controls | They are strong at process plumbing but often need a security-specific prioritization layer and evidence model. Clearline should integrate with, not replace, the system of record. |
| Cloud security | Wiz, Prisma Cloud, Orca | Cloud asset graph, posture, identity, runtime context | Cloud context is a useful first integration and differentiator, but the MVP should not become a full CNAPP. |

Representative source findings:

- Tenable positions Tenable One around “visibility, insight, action,” with exposure data, attack-path visualization, predictive prioritization, remediation, and business-aligned metrics. This validates the category direction but also shows that a new entrant should pick a much smaller job than “unify the attack surface.” Source: [Tenable One Exposure Management Platform](https://www.tenable.com/products/tenable-one).
- Rapid7’s Remediation Hub groups prioritized updates by remediation and risk reduction, and its remediation projects explicitly assign, communicate, track, and verify work. This validates “remediation as a first-class object” and influenced Clearline’s workstream and verification states. Sources: [Remediation Hub](https://docs.rapid7.com/insightvm/remediation-hub) and [Remediation Projects](https://docs.rapid7.com/insightvm/remediation-workflow/).
- Microsoft Defender Vulnerability Management describes a prioritized recommendation view that combines CVEs, exposed devices, emerging exploitation, active-breach signals, business-critical applications, and remediation requests to IT. This validates an owner-oriented recommendation queue, while Clearline narrows the promise to explainability and proof of closure. Source: [Microsoft Defender Vulnerability Management](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management).

## 3. Standards and prioritization research

### Scores are inputs; decisions should be contextual

NIST SP 800-40 Rev. 4 defines enterprise patch management as identifying, prioritizing, acquiring, installing, and verifying patches, updates, and upgrades. It explicitly frames patching as preventive maintenance and calls out the divide between business/mission owners and security/technology management. Decision: Clearline’s top-level success metric is verified risk reduction, not the number of findings ingested. Source: [NIST SP 800-40 Rev. 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final).

FIRST’s CVSS v4.0 specification separates Base, Threat, Environmental, and Supplemental metrics. It states that a numerical score becomes more useful when the relevant metrics are included, and that local threat and environmental context belongs with the consumer. Decision: display CVSS as labeled context (for example, `CVSS-BE 9.6`) but pair it with a local priority recipe instead of treating it as the queue order. Source: [CVSS v4.0 Specification Document](https://www.first.org/cvss/v4.0/specification-document).

CISA maintains the KEV catalog as an authoritative source of vulnerabilities exploited in the wild and says organizations should use it as an input to their vulnerability-prioritization framework. Decision: KEV membership is a visible, high-signal reason in the queue and a trigger for an “active exploit” banner; the product must show the source and last refresh rather than imply its own threat-intelligence authority. Source: [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog).

CISA’s SSVC guide describes a decision-tree approach that prioritizes remediation based on exploitation, technical impact, and the impact on the particular organization, with outcomes such as Track, Track*, Attend, and Act. Decision: the core “Why this ranks here” panel uses explicit decision points and an action outcome rather than a mysterious AI score. Source: [CISA SSVC Guide](https://www.cisa.gov/sites/default/files/publications/cisa-ssvc-guide%20508c.pdf).

CISA’s vulnerability-response playbook says actively exploited vulnerabilities should be remediated on the catalog timeline, while mitigations such as access restriction, isolation, configuration changes, or monitoring can be used when patches are unavailable; it also says to keep track of status as systems are remediated. Decision: the workflow supports `Fix`, `Mitigate`, and `Awaiting verification`, with an evidence trail for each. Source: [Cybersecurity Incident & Vulnerability Response Playbooks](https://www.cisa.gov/sites/default/files/publications/Cybersecurity_Incident_Vulnerability_Response_Playbooks_508C.pdf).

### Alert fatigue and collaboration

The SANS 2024 SOC Survey reports lack of automation and orchestration as the most-cited SOC barrier, ahead of staffing challenges. Decision: the dashboard should collapse repetitive findings into prioritized work and make the next action obvious, without pretending autonomous remediation is safe. Source: [SANS 2024 SOC Survey](https://www.sans.org/white-papers/sans-2024-soc-survey-facing-top-challenges-security-operations).

An ACM Computing Surveys review published in 2025 describes alert fatigue as a research and practice problem and organizes mitigation around automation, augmentation, and collaboration. It also cites low-priority alerts and false positives as causes of delayed response. Decision: Clearline’s collaboration surface is deliberately compact—owner, rationale, remediation steps, comment count, ticket ID, and verification evidence—so handoffs reduce cognitive load instead of creating another chat stream. Source: [Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities](https://doi.org/10.1145/3723158).

NIST finalized SP 800-61 Rev. 3 in April 2025 and emphasizes integrating incident response across cybersecurity risk management and organizational operations. Decision: Clearline records changes and supports links to ticketing / incident systems, but it remains a remediation workbench, not a replacement for incident response case management. Source: [NIST Revises SP 800-61](https://www.nist.gov/news-events/news/2025/04/nist-revises-sp-800-61-incident-response-recommendations-and-considerations).

## 4. Information architecture and dashboard patterns

The strongest operational pattern is progressive disclosure:

- **At-a-glance:** risk exposure, urgent actions, unassigned work, verification due.
- **Prioritized list:** a bounded queue of actions sorted by exploit evidence, reachability, asset criticality, impact, and due date.
- **Reasoning:** a detail drawer that shows exactly which inputs changed the rank.
- **Coordination:** assignment, workstream/ticket, remediation guidance, and status transitions.
- **Evidence:** last seen, verification result, and activity history.

This avoids the common anti-pattern of a wall of charts. A chart is only useful when it supports a decision: a trend answers “are we reducing exposure?”; a breakdown answers “where is work stuck?”; the queue answers “what should I do next?”

Information hierarchy for the demo:

1. Active exploit / urgent attention strip.
2. Exposure summary with explicit time window and “demo data” status.
3. Action queue, with the first row visually dominant and rationale chips visible.
4. Risk-reduction trend and queue composition.
5. Activity and integration freshness.
6. Deep detail in a drawer to preserve scanability.

## 5. Metrics and visualization choices

### Product metrics

- **Priority exposure:** weighted sum of open actions using local context, not a raw CVSS total.
- **Top-action coverage:** estimated share of priority exposure covered by the first N remediation actions.
- **KEV backlog:** count of open KEV findings in the environment; track age and SLA state.
- **Mean time to assign:** detection to an accountable owner.
- **Mean time to verify:** remediation claimed to evidence accepted.
- **Verified risk reduced:** priority exposure closed or mitigated after verification.
- **Coverage / freshness:** asset inventory and source age, because stale data damages trust.

### Visualization decisions

- Large KPI values for the few decisions a security lead makes weekly.
- A 30-day area/line trend for verified risk reduction: time series is appropriate for progress over time, with a clear “demo” label.
- A horizontal stacked bar for queue composition by priority: easier to compare the small number of bands than a donut with many slices.
- Compact table/list rows for actions: exact labels, owners, due dates, status, and rationale need textual precision.
- A small priority recipe bar in the detail drawer: sequential factors show causality and support explainability.

## 6. Accessibility and responsive considerations

WCAG 2.2 is the baseline. It includes minimum target-size guidance for pointer inputs and requires non-text UI components and graphical objects to have sufficient contrast. Decision: interactive controls are at least 40–44px on touch, status is conveyed with text plus color, focus rings are visible, and charts include text summaries. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [Understanding Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast?level=0).

Dense operational tools still need a readable scan path. The demo uses a high-contrast light canvas with a dark navigation rail, 14–16px body type, consistent row height, restrained borders, and no color-only severity encoding. On narrow screens, the rail becomes a compact top bar and bottom navigation; KPI cards stack; the queue becomes full-width; and the detail drawer becomes a bottom sheet with one primary action visible.

Loading, empty, error, and stale states are written into the design: `Syncing`, `No actions match this view`, `Couldn’t refresh source`, and a visible source freshness line. The demo uses deterministic seeded data and makes the non-live nature explicit.

## 7. Positioning and GTM patterns

The market language is moving from “vulnerability count” to “exposure,” “attack path,” “risk reduction,” and “remediation.” Tenable and Rapid7 both lead with broad platform consolidation and context-rich prioritization. Clearline can be differentiated as a lightweight overlay that gets a team from existing scanner output to a defensible weekly operating cadence in one afternoon.

### Positioning statement

For lean security teams that have findings but cannot reliably turn them into closed, verified work, Clearline is the explainable exposure desk that ranks the few actions most likely to reduce business risk, routes them to owners, and keeps proof of closure. Unlike a scanner or an all-in-one exposure platform, Clearline is the thin operating layer between “found” and “verified fixed.”

### GTM implications

- Land with a read-only CSV / API import from one existing scanner, plus asset criticality and owner mapping.
- Run a 30-minute “top 10 exposure review” that produces a before/after queue and a written rationale for each item.
- Expand into ticketing, cloud, EDR, and asset inventory connectors only after the team has adopted the weekly review habit.
- Sell to the security lead with an engineering-friendly artifact: a scoped fix list and a verification report.
- Prove value with time-to-assign, verified risk reduction, and KEV SLA performance—not “AI accuracy” or raw alert volume.

## Source log and decisions

| Source | URL | Finding used | Decision changed |
| --- | --- | --- | --- |
| NIST SP 800-40 Rev. 4 | https://csrc.nist.gov/pubs/sp/800/40/r4/final | Patch management includes prioritize and verify; business/security divide is real | Make verification and owner handoff first-class; focus the wedge on the last mile |
| FIRST CVSS v4.0 specification | https://www.first.org/cvss/v4.0/specification-document | Base, Threat, Environmental context all matter; scores alone are limited | Show labeled CVSS context but rank with local decision factors |
| CISA KEV Catalog | https://www.cisa.gov/known-exploited-vulnerabilities-catalog | KEV is a living source of exploited vulnerabilities and a prioritization input | Put KEV evidence in the queue and require source freshness labels |
| CISA SSVC Guide | https://www.cisa.gov/sites/default/files/publications/cisa-ssvc-guide%20508c.pdf | Decision trees produce actions tied to organizational impact | Build “Why this ranks here” with explicit factors and outcome |
| CISA Incident & Vulnerability Response Playbooks | https://www.cisa.gov/sites/default/files/publications/Cybersecurity_Incident_Vulnerability_Response_Playbooks_508C.pdf | Patch, mitigate, track status, verify | Support remediation paths beyond patching and a verifiable state machine |
| SANS 2024 SOC Survey | https://www.sans.org/white-papers/sans-2024-soc-survey-facing-top-challenges-security-operations | Automation/orchestration and staffing are major SOC barriers | Keep the queue bounded and action-oriented; avoid another event wall |
| ACM Computing Surveys, 2025 | https://doi.org/10.1145/3723158 | Alert fatigue needs automation, augmentation, and collaboration | Add compact collaboration context and human-controlled prioritization |
| NIST SP 800-61 Rev. 3 announcement | https://www.nist.gov/news-events/news/2025/04/nist-revises-sp-800-61-incident-response-recommendations-and-considerations | Response should integrate with broader risk operations | Keep integrations and audit trail, but stay scoped to exposure remediation |
| Tenable One | https://www.tenable.com/products/tenable-one | Broad exposure platforms lead with visibility, insight, action | Choose the smaller “action + proof” wedge rather than a platform clone |
| Rapid7 Remediation Hub / Projects | https://docs.rapid7.com/insightvm/remediation-hub and https://docs.rapid7.com/insightvm/remediation-workflow/ | Remediations and projects are actionable, assignable, and verifiable | Model workstreams, assignments, and verification explicitly |
| Microsoft Defender Vulnerability Management | https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management | Prioritization combines threat, asset importance, and remediation requests | Put exploitability, reachability, business criticality, and owner in the same view |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Target size, contrast, and focus need explicit attention | Use accessible touch targets, visible focus, text labels, and responsive density |
