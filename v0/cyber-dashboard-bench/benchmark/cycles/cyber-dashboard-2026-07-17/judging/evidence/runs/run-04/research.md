# Research: Chokepoint

## Executive summary

I selected a narrow wedge inside exposure management: **campaign-based exposure operations for lean, cloud-native security teams**. The product is not another detector. It sits after discovery and prioritization, compressing fragmented findings into a small set of accountable remediation campaigns that break the attack paths most likely to matter.

Why this wedge won:

- It matches a real buyer pain: too many findings, too many tools, unclear ownership, and weak proof that remediation changed risk.
- It benefits from dashboard-native workflows: prioritization, ownership, deadlines, change windows, evidence, and proof of closure.
- It avoids pretending a no-backend benchmark demo is a live SOC or live protection layer.

## Wedge decision

**Chosen category:** exposure management / vulnerability response  
**Primary user:** security engineering manager or vulnerability / exposure program owner at a 500-5,000 employee cloud-native company  
**Core promise:** turn fragmented findings into a few high-confidence remediation campaigns that break attack paths and prove measurable risk reduction

## Research log

| Source | URL | Accessed | Findings | Decision changed |
| --- | --- | --- | --- | --- |
| The NIST Cybersecurity Framework (CSF) 2.0 | https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20 | July 16, 2026 | NIST frames cybersecurity as risk management that must be understood, assessed, prioritized, and communicated across functions and stakeholders, not just detected. | The product must connect operational dashboards to governance language and business communication, not just technical severity. |
| CISA Adds One Known Exploited ConnectWise Vulnerability, CVE-2024-1709, to Catalog | https://www.cisa.gov/news-events/alerts/2024/02/22/cisa-adds-one-known-exploited-connectwise-vulnerability-cve-2024-1709-catalog | July 16, 2026 | CISA explicitly urges organizations to prioritize KEV remediation because these are frequent attack vectors with significant risk. | KEV presence becomes a first-class input in the scoring model and a visible badge in the UI. |
| EPSS User Guide | https://www.first.org/epss/user-guide.html | July 16, 2026 | EPSS estimates probability of exploitation, but FIRST warns it is only one factor and should not be treated as the full risk score; asset accessibility and value still matter. | The product should explain the score composition and never present EPSS as a standalone truth. |
| Introducing Wiz for Exposure Management | https://www.wiz.io/blog/introducing-wiz-for-exposure-management | July 16, 2026 | Wiz describes the market shift from siloed CVE management to exposure management, emphasizing fragmented findings, disconnected tools, unclear ownership, and loss of context. | Confirms the market wedge is current, but also shows the category is crowded. Our differentiator must be workflow and proof, not “single pane” rhetoric alone. |
| Exposure management solutions | https://www.tenable.com/exposure-management | July 16, 2026 | Tenable positions exposure management around connecting assets, identities, misconfigurations, and attack paths so teams can prioritize what matters and act confidently. | Reinforced that attack path context and identity relationships should be core entities in the data model. |
| Using risk-based metrics in an exposure management program | https://www.tenable.com/blog/how-to-use-risk-based-metrics-in-an-exposure-management-program | July 16, 2026 | Risk-based programs need discovery, assessment, prioritization, validation, and mobilization metrics; remediation SLA and exposure trend tracking matter. | The dashboard needs proof metrics, SLA tracking, reopened work, and validation status, not just a ranked list. |
| Exploring the Vulnerability Response application | https://www.servicenow.com/docs/r/security-management/vulnerability-response/c_VulnerabilityResponse.html | July 16, 2026 | ServiceNow states the job is split across security teams handling huge vulnerability data volumes and operations teams tasked with fixing them, with workflow automation between integration, investigation, and resolution. | The product must serve a cross-functional workflow. Security prioritizes; platform / IT executes; both need shared state and auditability. |
| Security Exposure Management workflow | https://www.servicenow.com/docs/r/security-management/security-operations/sem-workflow.html?contentId=JVpSuUvmmuHqnDQ4geIS0w | July 16, 2026 | Modern exposure workflows ingest from multiple scanners, deduplicate, correlate, prioritize, launch remediation tasks, and monitor progress from one workspace. | The frontend demo should show a unified workspace with deduped exposures feeding campaigns and tasks. |
| Write investigation guides | https://www.elastic.co/docs/solutions/security/detect-and-alert/write-investigation-guides | July 16, 2026 | Analysts move faster when guidance is embedded in-context instead of forcing them to leave the record. | Every critical exposure in the demo should include “why now” and “fix path” guidance in the detail panel. |
| 6 strategies to reduce cybersecurity alert fatigue in your SOC | https://www.microsoft.com/en-us/security/blog/2021/02/17/6-strategies-to-reduce-cybersecurity-alert-fatigue-in-your-soc/ | July 16, 2026 | Microsoft cites tool sprawl, alert volume, grouping, automation, watchlists, and contextualization as practical alert-fatigue reducers. | I intentionally did not build a classic SOC alert console. The better demo opportunity is upstream prioritization and downstream remediation where grouping and accountability matter more. |
| Release notes | https://help.runzero.com/docs/release-notes/ | July 16, 2026 | runZero’s 2026 exposure dashboard emphasizes default prioritized landing views, “new / resolved / worsened” re-orientation, MTTR, reopened issues, and graceful empty states. | The UX should re-orient returning users quickly and represent normal, quiet, and high-attention states explicitly. |
| Data visualizations | https://designsystem.digital.gov/components/data-visualizations/ | July 16, 2026 | Accessible charts should state the message in text, use simple familiar chart forms, and provide accessible equivalents for screen readers. | The dashboard will use restrained chart types, visible written summaries, and hidden tables where appropriate. |
| Tables Tutorial | https://www.w3.org/WAI/tutorials/tables/ | July 16, 2026 | Dense operational tools still need proper table structure with `<th>`, `<td>`, captions, and scope relationships. | The remediation queue will be a real accessible table, not div soup. |

## Buyer and workflow synthesis

### Likely buyer and user

- The practical economic buyer is usually the security leader who needs measurable reduction in exposure backlog and cleaner executive reporting.
- The hands-on primary user is the security engineering manager or exposure lead who has to arbitrate between scanner output and engineering capacity.
- The secondary operational user is the platform / infrastructure owner who receives remediation work and needs context, change windows, and proof requirements.

### Painful workflow

The recurring workflow problem is not “finding one more issue.” It is:

1. Findings arrive from multiple tools.
2. Security cannot tell which combinations create a plausible breach path.
3. Ownership is diffuse across platform, identity, cloud, and application teams.
4. Tickets get created without enough context.
5. Leadership sees vulnerability counts, not credible reduction in business risk.

This is where a dashboard product can be differentiated: not by more telemetry, but by compressing decisions into a manageable operating cadence.

## Category and competitor synthesis

### Relevant categories

- CNAPP / cloud security posture products: broad visibility, strong context, often detection-led.
- Exposure management platforms: connect findings, identities, assets, and attack paths.
- Vulnerability response / ITSM-linked tools: stronger workflow and assignment mechanics.
- SOC / SIEM / XDR tools: excellent for live detection and investigation, but a weaker fit for proving exposure remediation outcomes.

### Representative competitors

- Wiz: strong context graph and attack-path framing.
- Tenable: mature exposure-management language, metrics, and broad attack-surface framing.
- ServiceNow: strong workflow, ownership, and auditability for remediation operations.
- runZero: notable attention to operator re-orientation, empty states, and remediation verification workflows.

### Strategic implication

A benchmark demo should not try to beat Wiz on scanner breadth or Microsoft on SOC depth. The strongest wedge is a **remediation operating system** that turns prioritization into coordinated campaigns and outcome proof.

## Information architecture implications

The research consistently points to the same IA pattern:

- Start with a prioritized landing view.
- Group low-level findings into a smaller number of exposures or attack paths.
- Show evidence and explainability inline.
- Map each exposure to an owner, SLA, and remediation vehicle.
- Track verification, reopened work, and business-facing outcome metrics.

That led directly to the product structure:

- `Operate`: attack-path inbox and remediation queue
- `Campaigns`: grouped remediation programs with owners and deadlines
- `Proof`: trends, SLA posture, reopened work, and audit evidence

## Metrics and visualization implications

Metrics that matter for this wedge:

- Open critical exposures
- KEV-backed exposures
- Attack paths to crown-jewel services
- Campaign coverage and progress
- MTTR
- Reopened items
- SLA breach risk
- Verified closures

Visualization choices that fit:

- compact scorecards for orientation
- bar and strip comparisons for backlog composition
- trend bars for exposure change over time
- explicit tables for work queues
- written summaries attached to every chart

## Trust, explainability, and collaboration implications

The scoring model must be explainable. Sources strongly argue against black-box prioritization:

- CISA highlights exploited-in-the-wild urgency.
- FIRST warns that exploit probability is not the whole risk picture.
- Elastic shows embedded guidance reduces investigation friction.
- ServiceNow shows the workflow spans security and operations, so evidence must travel with the record.

That means:

- every priority score should decompose into understandable factors
- every suppression or deferment should require a reason and expiry
- every closure should preserve evidence and support reopen
- AI-style recommendations, if present at all, should remain advisory and transparent

## Accessibility and responsive implications

Operational density is unavoidable, but it cannot break usability:

- charts need text summaries and accessible alternatives
- queues should remain semantic tables
- mobile should prioritize progressive disclosure instead of shrinking every panel at once
- empty and surge states need the same structural integrity as the default state

## GTM implications

The selected wedge supports a credible go-to-market motion:

- Land where existing tools already exist; do not require rip-and-replace.
- Integrate into the customer’s current scanner and ticketing stack.
- Sell measurable burn-down of high-risk exposure paths, not vague “visibility.”
- Use a pilot motion that proves fewer active breach paths, faster assignment, and cleaner reporting within 30 days.

This is more credible than claiming a new platform can replace CNAPP, SIEM, ITSM, and workflow tooling at once.

## Final research conclusion

The strongest defensible product here is **Chokepoint**, an exposure-operations workspace focused on the moment where prioritization becomes execution. The product’s dashboard should make operators faster at three things:

1. deciding which exposure paths matter now,
2. converting them into accountable campaigns,
3. proving that remediation changed risk.
