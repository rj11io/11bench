# Breakline product research

**Research date:** 2026-07-16  
**Decision:** Build a focused continuous threat exposure management (CTEM) workflow for lean cloud security teams. Breakline turns cloud, identity, and vulnerability findings into explainable breach paths, then ranks the smallest remediation actions that break the most paths to critical assets.

## Executive synthesis

Cybersecurity teams do not lack findings. They lack a defensible way to decide which cross-domain exposure to fix first and an efficient way to persuade the owning infrastructure or identity team to fix it.

Three observations shape the product:

1. **Initial access is converging around exploitable weaknesses and identities.** Verizon's 2026 DBIR reports vulnerability exploitation as the most common initial access vector at 31%, while Mandiant's 2025 incident-response data found exploits at 33% and stolen credentials at 16%. A cloud exposure product should therefore connect software weaknesses, reachability, permissions, and critical targets instead of presenting separate vulnerability and identity queues.
2. **Severity is not risk.** FIRST explicitly says CVSS Base measures intrinsic severity, not risk, and EPSS estimates threat probability rather than impact. CISA recommends KEV as an input to prioritization and offers SSVC as a decision tree. The product must expose its inputs, data freshness, and uncertainty rather than hide them behind an opaque score.
3. **The category has largely solved visualization, but remediation remains fragmented.** Wiz, Microsoft, Tenable, and XM Cyber all market security graphs, attack paths, choke points, and contextual prioritization. Breakline should not compete as another broad scanner or graph explorer. Its wedge is the operational last mile: “control cuts” ranked by paths broken per estimated effort, a reversible what-if preview, and owner-ready remediation briefs.

## Buyer and user segments

### Segments considered

| Segment | Painful workflow | Buying trigger | Why selected / rejected |
| --- | --- | --- | --- |
| Enterprise SOC | Too many detections, context switching, false positives, investigation handoffs | Missed incident, SIEM renewal, headcount constraint | Real pain, but detection and response is saturated and requires high-volume telemetry to demo credibly. Rejected as primary wedge. |
| Vulnerability management | Large CVE backlogs, scanner duplication, weak asset context, SLA reporting | Audit failure, KEV exposure, overdue patch backlog | Strong adjacent buyer. Selected as a secondary user and data source, not the only lens. |
| Cloud security / platform security | Cloud misconfigurations, identity entitlements, exposed workloads, unclear ownership | Cloud expansion, CNAPP renewal, breach path to crown-jewel data | Selected primary user. The cross-domain cloud/identity workflow fits graph-based prioritization and owner routing. |
| IAM / identity security | Excess privilege, service principals, stale paths, hybrid identity complexity | Identity-led breach, zero-trust program, Entra/Okta cleanup | Selected secondary user because identity is often the connective tissue in breach paths. |
| CISO / security leadership | Cannot connect spend to protection outcomes; board reporting lacks defensibility | Board request, insurance renewal, material incident | Selected economic buyer and reporting consumer, but not the daily operator. |
| MSSP / vCISO | Repeated prioritization and reporting across many smaller clients | Service standardization and margin pressure | Attractive post-MVP channel; postponed because tenant operations would broaden the demo. |

### Primary user

**Cloud Security / Security Platform Engineer at a 200–5,000 employee cloud-forward company.** The team has multiple existing sources (cloud provider posture, vulnerability scanner, identity provider, asset catalog, ticketing) but no dedicated exposure-management operations staff. This user owns triage and mobilization but usually cannot make the final infrastructure or IAM change.

### Core job to be done

> When many cloud, identity, and vulnerability findings could contribute to compromise, help me choose and defend the smallest set of changes that most reduces access to our critical services, then get the correct owner to act without another research meeting.

### Supporting research on operational pain

- The **SANS 2024 SOC Survey** found lack of automation and orchestration was the most-cited SOC barrier among respondents. The product should package evidence and workflow, not stop at discovery.
- A 2025 **ACM Computing Surveys** review describes alert fatigue as a persistent SOC research and operational problem and cites low-priority alerts as a source of delayed response. Breakline will group findings into outcome-oriented paths and default to a small action queue rather than a feed.
- The **2026 SANS SOC Survey** press release describes “too many alerts that do not connect and not enough shared context to act on.” This supports graph correlation plus shared remediation context.

## Category and competitor landscape

### Category frame

Gartner describes CTEM as a continuous approach for evaluating accessibility, exposure, and exploitability, organized around threat vectors or business projects rather than isolated infrastructure components. Gartner also identifies outcome-driven metrics as a way to connect cybersecurity investment to protection level. This validates the category and the need to report outcomes such as critical assets isolated and breach paths broken, rather than raw findings closed.

Cloud security is a credible beachhead. Gartner forecast cloud security as the fastest-growing security segment in 2024, at 24%, and expected investigations involving cloud or third-party infrastructure to become a majority pattern. Breakline targets teams already purchasing cloud posture and identity tooling, reducing adoption friction by acting as an orchestration layer over existing sources.

### Representative competitors

| Product/category | Current pattern | Product implication |
| --- | --- | --- |
| **Wiz** / CNAPP | Security Graph connects cloud context; attack-path analysis prioritizes “toxic combinations”; ownership is grouped by projects/services; workflows are emphasized. | Graph correlation and ownership are table stakes. Avoid “single pane of glass” positioning. |
| **Microsoft Security Exposure Management** | Attack-path dashboard includes top choke points, targets, entry points, trends, blast radius, recommendations, hybrid paths, and permissions-aware views. Documentation warns that paths depend on data completeness and licensing. | Include completeness/freshness evidence and permission-aware redaction. Differentiation must happen after path discovery. |
| **Tenable One** / exposure management | Pairs graph analytics with MITRE ATT&CK; uses path-priority ratings; supports statuses and ticketing; packages Foundation vs Advanced and asset-based licensing. | Status and ticket workflow are expected. Packaging can start with a narrow overlay tier and expand by connected asset count. |
| **XM Cyber** / attack-path management | Centers choke points and “least cost, maximum impact” remediation, with step-by-step guidance and ticketing. | Choke-point prioritization is validated but not unique. Breakline differentiates with explicit effort estimates, what-if comparison, and change-ready briefs. |
| **Traditional VM** | Scanner-first inventory, CVSS-heavy queues, asset SLAs, patch tracking. | Integrate rather than replace. Preserve CVE/KEV/EPSS evidence while reframing around reachable outcomes. |
| **SIEM/SOAR** | Detection feeds, correlation, cases, automation. | Post-MVP integration can enrich active incidents, but Breakline's demo remains pre-breach and exposure-focused. |

### Positioning gap

Competitors increasingly offer graphs and AI summaries. A credible entrant needs a narrower promise:

> **Breakline is the remediation decision layer for cloud exposure. It proves which one change breaks the most credible paths to critical assets, previews the reduction, and gives the owner a safe implementation brief.**

This is not a claim to validate exploitability through active attack simulation in the MVP. “Path” means a modeled sequence supported by connected configuration and threat evidence. The UI must label modeled and missing evidence.

## Prioritization and trust

### Inputs

No single signal is sufficient:

- **CISA KEV** is authoritative evidence of in-the-wild exploitation and should supersede predictive probability for a matching CVE.
- **EPSS** estimates the probability of exploitation activity in the next 30 days. FIRST warns that it is not a risk score and excludes local controls and impact.
- **CVSS v4.0** Base describes intrinsic severity; Threat and Environmental metrics are required to move toward deployment-specific risk. FIRST recommends documenting environmental changes for auditability.
- **SSVC** expresses decision outcomes (Track, Track*, Attend, Act) using a decision tree and organizational impact.
- **Business criticality**, reachability, privilege, data sensitivity, compensating controls, and graph connectivity supply local environmental context.
- **MITRE ATT&CK** provides a common language for the adversary goal and technique represented at each step, but it is a knowledge base, not proof that a specific path will be used.

### Breakline score model

The product will show a 0–100 **Priority Index** but never present it as probability or actuarial loss:

- 30% reachable entry conditions;
- 25% observed/predicted threat (KEV overrides, then EPSS/available exploit evidence);
- 25% target business impact and privileges gained;
- 10% path convergence/choke-point multiplier;
- 10% evidence confidence/freshness.

Every score must open into its factors. Unknown data reduces confidence rather than silently defaulting to “safe.” Raw source values and timestamps remain visible.

The action ranking adds an independent **Control Cut** measure:

`cut value = weighted paths removed × critical targets isolated × confidence / estimated effort`

The absolute number is an ordering aid, not a promise. Effort is a human-editable estimate with a source (default rule, owner estimate, or historical median).

### Explainability and audit decisions

- Show the modeled path as entry → enabling condition → identity/privilege pivot → critical target.
- Attach evidence and last-seen time to each node/edge.
- Clearly distinguish **observed**, **inferred**, and **assumed** relationships.
- Preserve score version, source snapshot, user decisions, simulations, assignments, exceptions, and verification state.
- Never auto-close a path because a ticket is resolved; require fresh source evidence or explicit verified exception.
- Communicate gaps: Microsoft notes that attack paths can be absent or incomplete when source data, licenses, or critical-asset classification are incomplete. Breakline must surface coverage as a first-class trust metric.

## Workflow findings

### From finding to remediation

The recurring pattern across Microsoft, Tenable, Wiz, and XM Cyber is:

1. understand estate posture;
2. find high-impact paths or choke points;
3. inspect graph and supporting findings;
4. view recommendations;
5. route work through an owner/ticket;
6. rescan or re-evaluate to verify closure.

Breakline compresses steps 2–5 into a decision workspace:

1. open a ranked breach path;
2. understand “why now” and confidence;
3. compare candidate control cuts;
4. simulate selected cuts;
5. generate an owner brief with change, validation, rollback, and deadline;
6. monitor ownership and verify from refreshed evidence.

### Collaboration design

Security is often not the change owner. A useful handoff must contain:

- business outcome at risk;
- exact affected resource and relationship;
- recommended least-privilege or patch/configuration change;
- expected blast-radius reduction;
- test and rollback steps;
- evidence links and source timestamps;
- due date and reason;
- exception/acceptance path with approver and expiration.

The workflow should reduce meetings, not merely create tickets. Therefore the demo emphasizes a pre-filled, editable remediation brief and a visible decision timeline.

## Dashboard information architecture

### Primary hierarchy

1. **Attention strip:** demo-data notice, source coverage, evidence freshness, urgent change since last review.
2. **Outcome summary:** critical paths open, critical assets reachable, modeled risk movement, remediation SLA.
3. **Recommended control cuts:** a short ranked set of actions with effort and projected outcome.
4. **Breach paths:** compact operational list, filterable by target, owner, status, and evidence.
5. **Path workspace:** graph, score rationale, evidence, candidate cuts, simulation, assignment, audit timeline.
6. **Program view:** trend of paths to critical assets and verified reductions, never just total findings.

### Appropriate visualizations

- **Node-link path graph:** appropriate for a selected, small path because sequence and relationships are the task. Avoid a full-estate “hairball.”
- **Ordered bars / small horizontal meters:** compare score factors and path counts with a shared baseline.
- **Trend line:** show open critical paths and verified isolation over time, with annotations for material changes.
- **Stacked distribution:** useful for status or confidence composition when exact values are labeled.
- **Tables/lists:** best for scanning exact names, ownership, due dates, and evidence. Use semantic table markup on larger views or stacked labeled rows on mobile.
- **Avoid:** decorative donut overload, red/green-only semantics, unlabeled heatmaps, or a single “cyber score” without evidence.

## Accessibility and responsive operations

WCAG 2.2 requires that color not be the only visual means of conveying state, meaningful graphics and controls meet non-text contrast, focus is visible, and pointer targets are at least 24×24 CSS pixels or sufficiently separated. W3C's table guidance requires programmatic relationships between headers and cells.

Decisions:

- Every severity/status includes text and/or icon, not color alone.
- Keyboard users can reach navigation, filters, path rows, evidence nodes, simulation toggles, and actions in a logical order.
- Visible 2–3px focus rings; no focus hidden behind sticky regions.
- Primary controls target 40–44px height even though WCAG's minimum is smaller.
- SVG path graphics include an accessible summary and an equivalent ordered step list.
- Desktop uses a persistent rail and split workspace; mobile replaces the rail with a compact header and bottom navigation.
- At 375px, lists become cards, score factors stack, the path sequence becomes vertical, and no horizontal scrolling is required.
- Motion is limited to short opacity/transform feedback and respects `prefers-reduced-motion`.

## Market and GTM implications

### Buyer and trigger

- **Economic buyer:** CISO or VP Security.
- **Champion:** Head of Cloud Security, Security Engineering, or Vulnerability Management.
- **Users:** cloud security engineer, vulnerability manager, IAM engineer.
- **Buying triggers:** confirmed path to a crown-jewel system, cloud expansion, CNAPP consolidation, overdue remediation backlog, board demand for outcome metrics, or a failed audit showing unclear ownership.

### Land motion

Start with a 14-day “Critical Path Review”:

1. connect read-only AWS/Azure/GCP, Entra/Okta, one vulnerability source, and Jira/ServiceNow;
2. define 5–20 critical assets with business owners;
3. deliver the top ten modeled paths and top five control cuts;
4. run a cross-functional review;
5. prove time-to-owner, accepted recommendations, paths broken, and critical assets isolated.

The proof is operational value, not a larger finding count.

### Packaging hypothesis

Competitors commonly use platform tiers, quote-led sales, and asset-based capacity. Breakline should reduce pricing anxiety:

- **Team:** up to 2,500 connected cloud resources and identities, core graph, simulations, Jira/Slack, $24k annual list.
- **Business:** up to 15,000 resources, SSO/RBAC, ServiceNow, custom scoring policies, audit exports, $60k annual list.
- **Enterprise:** larger estates, data residency, premium connectors, MSSP features, custom.

Use “count once” connected entities and publish capacity bands. Do not meter users or simulations. A free static assessment can support product-led qualification, while production remains sales-assisted due to security review and integration complexity.

## Source register

All sources accessed 2026-07-16.

1. **Verizon, “2026 Data Breach Investigations Report.”**  
   URL: https://www.verizon.com/business/resources/T343/reports/2026-dbir-data-breach-investigations-report.pdf  
   Finding: vulnerability exploitation became the leading initial access vector at 31%; only 26% of critical KEV vulnerabilities were fully remediated in the dataset and median full resolution rose to 43 days.  
   Decision changed: prioritize the vulnerability-to-identity-to-target path and make remediation latency a first-class metric.

2. **Google Cloud / Mandiant, “M-Trends 2025: Data, Insights, and Recommendations From the Frontlines.”**  
   URL: https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2025  
   Finding: exploits were 33% of initial infection vectors; stolen credentials rose to 16%; attackers target centralized cloud authority such as SSO.  
   Decision changed: identity is modeled as a core pivot, not an enrichment field.

3. **NIST, “The NIST Cybersecurity Framework (CSF) 2.0.”**  
   URL: https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20  
   Finding: the framework is designed to understand, assess, prioritize, and communicate cybersecurity risk across organizations.  
   Decision changed: include business outcomes, risk decisions, and communication/audit requirements beyond technical findings.

4. **CISA, “Known Exploited Vulnerabilities Catalog.”**  
   URL: https://www.cisa.gov/known-exploited-vulnerabilities-catalog  
   Finding: CISA calls KEV the authoritative source of vulnerabilities exploited in the wild and recommends it as an input to prioritization.  
   Decision changed: KEV evidence overrides predictive exploit likelihood in the threat factor.

5. **FIRST, “EPSS User Guide.”**  
   URL: https://www.first.org/epss/user-guide.html  
   Finding: EPSS estimates exploitation probability and explicitly is not a complete risk score because it excludes environmental impact and controls.  
   Decision changed: show EPSS as a named input with probability semantics, never relabel it as risk.

6. **FIRST, “CVSS v4.0 Consumer Implementation Guide.”**  
   URL: https://www.first.org/cvss/v4.0/implementation-guide  
   Finding: CVSS Base is worst-case and system-agnostic; Threat and Environmental metrics create more defensible deployment-specific decisions.  
   Decision changed: show environmental context, threat inputs, and documented overrides in every priority explanation.

7. **CISA, “Stakeholder-Specific Vulnerability Categorization (SSVC) Guide.”**  
   URL: https://www.cisa.gov/sites/default/files/publications/cisa-ssvc-guide%20508c.pdf  
   Finding: SSVC is a decision tree with Track, Track*, Attend, and Act outcomes tied to organizational impact.  
   Decision changed: use action-oriented decision labels and escalation paths instead of relying only on numeric severity.

8. **MITRE, “Get Started with ATT&CK.”**  
   URL: https://attack.mitre.org/resources/  
   Finding: ATT&CK is a knowledge base of adversary behavior; tactics describe why and techniques describe how.  
   Decision changed: annotate path steps with ATT&CK language while avoiding claims that a modeled path proves active compromise.

9. **Gartner, “Top Cybersecurity Trends for 2024.”**  
   URL: https://www.gartner.com/en/newsroom/press-releases/2024-02-22-gartner-identifies-top-cybersecurity-trends-for-2024  
   Finding: CTEM and outcome-driven metrics are strategic trends; CTEM evaluates accessibility, exposure, and exploitability continuously.  
   Decision changed: position Breakline inside CTEM and report protection outcomes rather than finding volume.

10. **Gartner, “The Expanding Enterprise Investment in Cloud Security.”**  
    URL: https://www.gartner.com/en/newsroom/press-releases/2024-06-05-the-expanding-enterprise-investment-in-cloud-security  
    Finding: cloud security was forecast as the fastest-growing security segment in 2024.  
    Decision changed: choose cloud-first teams as the beachhead rather than attempting whole-enterprise exposure on day one.

11. **Wiz, “Cloud and AI Security Platform.”**  
    URL: https://www.wiz.io/platform  
    Finding: security graph, attack paths, context, ownership, and workflows are central platform capabilities.  
    Decision changed: treat graph discovery as table stakes and differentiate on remediation decision quality.

12. **Microsoft Learn, “Review attack paths in Microsoft Security Exposure Management.”**  
    URL: https://learn.microsoft.com/en-us/security-exposure-management/review-attack-paths  
    Finding: current IA includes trends, choke points, scenarios, targets, entry points, blast radius, and recommendations; results depend on source completeness and licenses.  
    Decision changed: include a compact path dashboard and make evidence coverage/freshness visible.

13. **Tenable, “Attack Path.”**  
    URL: https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm  
    Finding: Tenable pairs graph analytics and ATT&CK, supports top paths and custom origin/target exploration, and requires source coverage.  
    Decision changed: preserve exact graph evidence and support post-MVP custom simulations, but keep the MVP focused on recommended cuts.

14. **XM Cyber, “Attack Path Management.”**  
    URL: https://xmcyber.com/attack-path-management/  
    Finding: the product explicitly markets choke points, least-cost/maximum-impact action, remediation guidance, and ticketing.  
    Decision changed: “choke points” alone are not a differentiator; Breakline adds effort provenance, reversible simulation, and change-ready owner briefs.

15. **SANS, “2024 SOC Survey: Facing Top Challenges in Security Operations.”**  
    URL: https://www.sans.org/white-papers/sans-2024-soc-survey-facing-top-challenges-security-operations  
    Finding: lack of automation/orchestration was the most-cited barrier in the survey summary.  
    Decision changed: the core demo must complete assignment and state change, not end at an insight.

16. **ACM Computing Surveys, “Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities.”**  
    URL: https://doi.org/10.1145/3723158  
    Finding: alert fatigue and burnout remain persistent operational problems; low-value signals delay response.  
    Decision changed: default to an intentionally small queue of outcome-grouped paths and suppress decorative alerts.

17. **W3C WAI, “Web Content Accessibility Guidelines (WCAG) 2.2.”**  
    URL: https://www.w3.org/TR/WCAG22/  
    Finding: focus visibility, target size, contrast, use of color, and reflow are directly relevant to dense dashboards.  
    Decision changed: semantic states, strong focus treatment, touch-sized controls, and mobile reflow are acceptance criteria.

18. **W3C WAI, “Tables Tutorial.”**  
    URL: https://www.w3.org/WAI/tutorials/tables/  
    Finding: accessible data tables require programmatic relationships between headers and cells.  
    Decision changed: exact operational data uses semantic tables on desktop and fully labeled cards on mobile.

19. **Tenable, “Tenable One Pricing.”**  
    URL: https://www.tenable.com/products/tenable-one/pricing  
    Finding: the market uses platform tiers, quote-led buying, and asset capacity; advanced capabilities include attack-path analysis and workflow.  
    Decision changed: propose transparent connected-entity capacity bands and reserve enterprise requirements for a higher tier.

