# Breakline product research

Access date for all web sources: **2026-07-16**. This document distinguishes
published evidence from product judgment. Competitor claims are treated as
claims about positioning and workflow, not independently verified efficacy.

## Executive conclusion

The strongest wedge is not another dashboard that discovers more cloud
findings. It is a **remediation command center for lean cloud security teams**
that turns correlated exposure data into a small queue of explainable
“missions”: the minimum fixes that break the most reachable attack paths to
business-critical assets.

The primary user is a cloud security or security engineering lead at a
cloud-native organization with roughly 500–5,000 employees. This user normally
has scanners, a CNAPP, ticketing, and cloud inventory, yet still spends time
reconciling conflicting severity scores, proving why an issue matters, finding
an owner, translating a finding into safe work, and checking whether the risk
was actually removed.

The selected product, **Breakline**, sits between exposure discovery and IT/engineering
execution. It does not replace a scanner or CNAPP in v1. Its differentiated
promise is:

> Fix the one control that breaks the most real attack paths, with evidence every
> owner can verify.

The demo therefore prioritizes remediation leverage, evidence provenance,
ownership, status, and verification over total finding counts.

## Source log and decisions

| Source | URL | Finding | Decision changed |
|---|---|---|---|
| NIST, “NIST Releases Version 2.0 of Landmark Cybersecurity Framework” | https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework | CSF 2.0 adds Govern and frames cyber work as continuous outcomes across Govern, Identify, Protect, Detect, Respond, and Recover. | Avoided a detection-only product. Breakline reports operational risk reduction and governance evidence, while its initial workflow sits mainly in Identify/Protect. |
| CISA, “Known Exploited Vulnerabilities Catalog” | https://www.cisa.gov/known-exploited-vulnerabilities-catalog | CISA calls KEV the authoritative source of vulnerabilities known to be exploited in the wild and recommends it as an input to prioritization. | KEV is a visible, source-attributed prioritization signal and policy trigger, never a hidden score ingredient. |
| FIRST, “EPSS User Guide” | https://www.first.org/epss/user-guide.html | EPSS estimates exploitation probability, not total risk; accessibility, asset purpose, and impact must also be considered. | The score explanation separates exploit likelihood from reachability, privilege, and business impact. The UI labels EPSS as probability rather than “risk.” |
| FIRST, “Exploit Prediction Scoring System (EPSS)” | https://www.first.org/epss/ | EPSS is refreshed daily and estimates the probability of exploitation in the next 30 days. | Signal freshness and observed-at timestamps are part of the data model and trust UI. |
| CISA, “Stakeholder-Specific Vulnerability Categorization (SSVC) Guide” | https://www.cisa.gov/sites/default/files/publications/cisa-ssvc-guide%20508c.pdf | SSVC uses a decision tree and action outcomes to prioritize vulnerability response based on exploitation and stakeholder impact. | Breakline produces action decisions—Act, Schedule, Track—rather than only numeric severity. Each decision shows the factors that produced it. |
| NIST SP 800-40 Rev. 4, “Guide to Enterprise Patch Management Planning” | https://csrc.nist.gov/pubs/sp/800/40/r4/final | Patch management includes identifying, prioritizing, acquiring, installing, and verifying; it also requires alignment between business owners and security/technology teams. | “Verified” is distinct from “done.” A mission includes owner context, implementation guidance, compensating controls, and post-change evidence. |
| NIST SP 800-55 Vol. 2, “Measurement Guide for Information Security” | https://csrc.nist.gov/pubs/sp/800/55/v2/final | Security measurement should be a purposeful program supporting technical and high-level decisions, not a collection of vanity metrics. | The home view uses decision metrics: reachable critical paths, paths broken, ownership coverage, and verification time. Raw finding count is secondary. |
| Verizon, “2026 Data Breach Investigations Report” | https://www.verizon.com/business/resources/reports/dbir/ | Verizon reports that 31% of breaches in its 2026 dataset began with software vulnerability exploitation, making it the top initial-access vector; the SMB summary reports a 43-day median to full resolution of a critical vulnerability. | Vulnerability-to-critical-asset paths are a high-value initial use case, and time-to-verified-remediation is a core KPI and buying narrative. |
| Google Cloud/Mandiant, “M-Trends 2025” | https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2025/ | Exploits were the most common initial infection vector in Mandiant’s 2024 investigations; the report recommends vulnerability management, least privilege, and stronger cloud controls. | Seeded paths combine public exploitation, identity privilege, and cloud data impact rather than treating CVEs in isolation. |
| ISC2, “2025 Cybersecurity Workforce Study” | https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study | The study describes increased workloads and disruption; ISC2’s release reports 47% feeling overwhelmed and 48% exhausted by keeping current. | The primary persona is a constrained team lead. The default queue is intentionally small and action-oriented; the product must remove coordination work rather than add analysis screens. |
| Alahmadi et al., “Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities” | https://doi.org/10.1145/3723158 | The 2025 ACM Computing Surveys article treats alert fatigue as a persistent socio-technical SOC problem, not just a filtering problem. | Breakline correlates raw findings into shared remediation missions and suppresses duplicate work when one fix breaks many paths. |
| Wiz, “Wiz Security Graph” | https://www.wiz.io/lp/wiz-security-graph | Wiz positions graph context and attack-path analysis as a way to connect assets, identities, exposure, and data. | Graph context is table stakes. Breakline does not compete on graph novelty; it competes on the handoff from graph evidence to minimum-change remediation and verification. |
| Orca Security, “Attack Path Analysis” | https://orca.security/resources/product-info/orca-bytes-attack-path-analysis/ | Orca argues that combining vulnerabilities, misconfigurations, trust, and data reduces many findings to a smaller number of critical paths. | The product aggregates multi-signal exposures and shows a path narrative, but the unit of work is the “break point” fix rather than the path itself. |
| Tenable, “Attack Path” | https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm | Tenable emphasizes choke points that recur across paths and lead to critical assets. | “Paths broken” is the primary benefit measure attached to a fix. The queue sorts by leverage constrained by exploit evidence, impact, and effort. |
| Tenable, “Exposure Management 2026 Release Notes” | https://docs.tenable.com/release-notes/Content/exposure-management/2026.htm | 2026 updates added lifecycle statuses, risk acceptance with reasons and audit history, security-control annotations, and “chain prevented” logic. | These capabilities validate demand but also raise the bar: Breakline includes explicit lifecycle states, compensating-control evidence, reasoned acceptance, and immutable audit concepts in the PRD. |
| Rapid7, “Remediate Risk / Remediation Hub” | https://docs.rapid7.com/exposure-command/remediation-hub/ | Rapid7 groups prioritized updates into remediations and reports expected findings and assets affected. | The dashboard is action-first, but Breakline reports reachable paths removed rather than bulk findings closed, which better expresses attack-chain leverage. |
| Rapid7, “Exposure Command Packages & Pricing” | https://www.rapid7.com/products/command/pricing/ | Exposure platforms are commonly annual, asset-priced, tiered, and sold through demos; attack-path analysis tends to sit in higher packages. | GTM starts with a bounded AWS proof of value and transparent cloud-resource bands, then expands by environment and workflow—not an opaque all-platform purchase. |
| Microsoft, “Microsoft Defender portal overview – Unified security operations” | https://learn.microsoft.com/en-us/unified-secops/overview-defender-portal | Microsoft uses a single prioritized queue and correlated incident story with associated alerts, entities, evidence, and recommendations. | Breakline uses a single mission queue with a consistent drill-down story: why now, path, break point, owner, evidence, and timeline. |
| Grafana, “Dashboard best practices” | https://grafana.com/docs/grafana/latest/visualizations/dashboards/build-dashboards/best-practices/ | A dashboard should answer a question, progress from general to specific, reduce cognitive load, and avoid unnecessary or misleading charts. | The home question is “what should we fix next, and what will it buy us?” Visual hierarchy leads from attention state to leverage metrics to the mission queue. |
| W3C, “Web Content Accessibility Guidelines (WCAG) 2.2” | https://www.w3.org/TR/WCAG22/ | WCAG 2.2 requires programmatic relationships, sufficient contrast, visible focus, non-obscured focus, usable target sizes, and content that survives text resizing. | Color never carries status alone; controls have text labels and focus rings; dense rows become cards on mobile; the drawer becomes a full-screen dialog; charts have textual summaries. |
| AWS, “SecurityAudit – AWS Managed Policy” | https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html | AWS defines SecurityAudit as access to read security configuration metadata for audit software. | Initial AWS onboarding is read-only and metadata-first. Any future write/remediation permission is separate, scoped, short-lived, and opt-in. |
| MITRE ATT&CK, “Exploit Public-Facing Application (T1190)” and “Valid Accounts (T1078)” | https://attack.mitre.org/techniques/T1190/ and https://attack.mitre.org/techniques/T1078/ | ATT&CK describes how public-facing exploitation and valid cloud accounts support initial access and privilege movement, with concrete mitigations. | Path steps use ATT&CK technique labels to provide a common practitioner vocabulary, while remediation guidance remains concrete and asset-specific. |

## Buyer and user segmentation

### Segments considered

| Segment | Pain intensity | Existing spend | Workflow access | Why selected / rejected |
|---|---:|---:|---:|---|
| Fortune 500 security operations center | Very high | Very high | Hard: complex procurement and entrenched SIEM/SOAR | Attractive later, but a new product would face long replacement cycles and many bespoke integrations. |
| Cloud-native mid-market, 500–5,000 employees | High | High enough | Good: AWS, GitHub, Jira, and a small set of scanners are common | **Selected.** Fast cloud change, lean teams, and visible remediation ownership make a focused overlay credible. |
| Small business without dedicated security engineering | High consequence, lower workflow maturity | Low/variable | Mixed | Needs a managed service or auto-remediation product, not the collaboration-heavy first version. |
| Regulated enterprise vulnerability management | High | High | Moderate | Strong secondary market, but hybrid/on-prem asset complexity would broaden the demo beyond a coherent wedge. |
| MSSP/MDR provider | High volume | High | Good but multi-tenant | Strong future channel; requires tenant isolation, delegated administration, and service reporting not appropriate for v1. |
| Executive cyber-risk buyer | High visibility, lower daily pain | High | Indirect | Secondary user. Executives need trends and accountability, but an executive-only dashboard would not solve the operational bottleneck. |

### Primary user

**Maya Chen, Cloud Security Lead**

- Leads three to eight security engineers.
- Protects a primarily AWS estate with Kubernetes, managed databases, SaaS
  identity, GitHub, a CNAPP/scanner, and Jira.
- Is measured on critical exposure reduction and audit readiness, but depends on
  platform and application teams to make changes.
- Starts each day deciding which risk deserves organizational interruption.
- Distrusts unexplained “AI risk scores” and must defend priorities to owners who
  understand uptime better than security.

### Secondary users

- **Platform engineering owner:** needs a narrowly scoped change, affected
  resources, rollback guidance, and proof that the work matters.
- **VP Security/CISO:** needs the trend, overdue decisions, accepted risk, and
  accountable ownership without reading finding-level detail.
- **GRC/risk partner:** needs policy provenance, approval history, evidence, and
  exception expiry.

### Jobs to be done

1. When thousands of cloud findings refresh, tell me the few changes that reduce
   the most reachable business risk.
2. When I interrupt an engineering team, give me evidence they can challenge and
   a change they can safely execute.
3. When work crosses teams, preserve responsibility, status, decisions, and
   service-level expectations.
4. When someone claims a fix is complete, verify the relevant edge disappeared
   from the path.
5. When leadership asks whether risk is improving, show risk removed and work
   blocked—not a declining count caused by rescans or suppressions.

### Buying trigger

- A breach, penetration test, or audit demonstrates that a known issue remained
  open because no team owned the full path.
- CNAPP renewal exposes low utilization outside the security team.
- Critical/KEV remediation SLAs are repeatedly missed.
- The CISO cannot explain which engineering work reduced material exposure.
- Cloud scale or acquisition creates more accounts than the security team can
  manually coordinate.

## Category and competitor synthesis

The market has converged around CNAPP and exposure management platforms that
combine asset inventory, vulnerability/configuration findings, identity, data,
external exposure, and attack-path graphs. Representative products include Wiz,
Orca Security, Tenable One, Rapid7 Exposure Command, and Microsoft Security
Exposure Management.

Their shared strengths are broad telemetry, graph context, and risk
prioritization. Their shared product gravity is toward a suite. Breakline should
not claim better universal visibility with a fraction of the integrations.
Instead it should ingest the useful conclusions from those systems and own the
last mile:

| Workflow stage | Incumbent strength | Breakline opportunity |
|---|---|---|
| Discover assets/findings | Strong | Integrate; do not rebuild first. |
| Correlate attack paths | Strong and becoming expected | Retain enough graph context to explain decisions. |
| Rank “critical” issues | Common, often proprietary | Make policy and source factors inspectable. |
| Find the minimum break point | Emerging | Make this the default unit of work and quantify paths removed. |
| Translate to owner-ready change | Uneven | Package scope, implementation, rollback, evidence, and affected services. |
| Coordinate and verify | Split across security tool and ticketing | Own lifecycle, sync outward, and verify graph-edge removal. |
| Prove program outcome | Often finding/risk-score based | Report reachable paths removed, time to owner, time to verified fix, and accepted-risk debt. |

### Positioning boundary

Breakline is an **Exposure Remediation Command** product, not:

- a scanner;
- a SIEM or incident-response system;
- a cloud runtime protection agent;
- a universal GRC platform;
- an autonomous remediation bot;
- or a graph visualization product sold on aesthetics.

## Prioritization, explainability, and trust

### Why “highest CVSS first” is insufficient

FIRST explicitly cautions that EPSS is only the threat component. CISA KEV adds
observed exploitation, but neither says whether an asset is reachable, whether
the exposed principal can move, or whether the target matters to this business.
Breakline therefore uses a transparent policy decision with four evidence
groups:

1. **Threat:** CISA KEV, EPSS probability/freshness, exploit intelligence.
2. **Reachability:** internet exposure, network path, runtime or control
   evidence.
3. **Privilege and path:** identity permissions, trust edges, secrets, lateral
   movement.
4. **Impact:** asset criticality, data class, environment, recovery tier.

Effort, change risk, and number of paths broken determine which remediation is
recommended; they do not quietly inflate “risk.”

### Trust requirements found in the research

- Show source and observation time beside a signal.
- Preserve raw source values and the normalized decision.
- Explain what is known, inferred, stale, or missing.
- Let users change business criticality and record who did so.
- Treat “accepted” as an expiring, reasoned decision with an approver.
- Require verification evidence before a mission is resolved.
- Keep AI-generated summaries clearly labeled and grounded in cited evidence;
  v1 can work without generative AI.
- Expose scoring-policy versions so historic decisions remain reproducible.

## Collaboration and remediation workflow

The operational object should be a **mission**, not an alert. A mission groups:

- the attack paths affected;
- the recommended break point;
- why it is prioritized now;
- owner/team and affected service;
- proposed change, alternatives, rollback, and maintenance constraints;
- lifecycle status and SLA;
- external ticket link(s);
- verification query and evidence;
- comments, decisions, and audit events.

The lifecycle is:

`Proposed → Triaged → In progress → In review → Verified`

Side exits are `Accepted until <date>`, `Blocked`, `False positive`, and
`Superseded`. “Verified” means the expected graph edge or condition is absent in
a fresh observation. A closed Jira ticket alone is not proof.

## Metrics and visualization research

### Metrics worth promoting

- **Reachable critical paths:** current attack paths from plausible origin to
  tier-0/tier-1 asset.
- **Paths broken:** verified paths removed during a period.
- **Remediation leverage:** paths expected to be broken per recommended change.
- **Time to owner:** first assignment from mission creation.
- **Time to action / time to verify:** phase-specific, because security may not
  control implementation time.
- **Ownership coverage:** percentage of active critical paths with a responsible
  service/team.
- **SLA decision coverage:** percentage acted on, accepted, or rejected before
  policy deadline.
- **Accepted-risk debt:** active accepted paths weighted by impact, with expiry.
- **Reopen rate:** verified missions whose exposure returns.
- **Signal freshness/coverage:** percentage of relevant accounts and evidence
  sources within freshness policy.

### Metrics deliberately demoted

- Total findings as a hero KPI.
- An unexplained composite “cyber risk score.”
- Pie/donut charts of many severity categories.
- Mean time metrics without percentiles or phase boundaries.
- “Tickets closed” without verification.
- Compliance percentage as a proxy for exploitability.

### Visualization choices

- A small trend line for reachable critical paths because direction and target
  matter more than exact point comparison.
- Ranked mission rows/cards because the user must compare benefit, urgency,
  effort, owner, and status.
- A node-link path only in detail, where topology answers “how can this happen?”
  It is not used as homepage decoration.
- Horizontal factor bars for explainability because common baseline comparison
  is easier than radial gauges.
- A simple team workload list rather than a decorative heat map.
- Text summaries and exact values alongside every chart.

## Accessibility and responsive implications

Dense security tools fail on small screens when they preserve desktop tables by
adding horizontal scroll. Breakline instead changes representation:

- desktop mission rows become stacked mobile cards;
- secondary columns collapse into labeled metadata;
- the right-side detail drawer becomes a full-screen sheet;
- navigation becomes a four-item bottom bar;
- charts retain a textual summary and hide nonessential ticks;
- path graphs become a vertical sequence on narrow screens.

Status always combines icon/shape, label, and color. Risk colors are reserved:
coral for action-policy breach, amber for approaching deadline, teal for
verified/reduced, blue for neutral information. Keyboard focus is high contrast,
dialogs restore focus, 44px touch targets are used for primary mobile controls,
and reduced-motion preferences remove decorative transitions.

## GTM and packaging implications

### Entry motion

1. Offer a **14-day AWS proof of value** using read-only metadata and imports
   from an existing scanner/CNAPP.
2. During onboarding, nominate 3–10 crown-jewel services and map cloud tags or
   repository ownership.
3. Produce a first “break plan” within one business day: top five changes,
   paths removed, owners, and missing evidence.
4. Run one remediation sprint with the customer and deliver an executive
   before/after report.

The champion is the cloud security lead; the economic buyer is the VP
Security/CISO; platform engineering is the required co-sponsor. The message is
not “find more.” It is “turn tools you already bought into verified risk
reduction.”

### Pricing hypothesis

- **Team:** up to 5,000 cloud resources, 5 users, AWS + one finding source,
  USD 18k/year.
- **Scale:** up to 50,000 resources, unlimited viewers, Jira/Slack/GitHub,
  SSO/SCIM, policy customization, USD 48k/year.
- **Enterprise:** multi-cloud, private data plane, advanced RBAC, data residency,
  audit exports, and premium support, custom annual contract.

Resource bands are easier to forecast than per-finding pricing. The product
should display metered resources and exclusions in-product. A partner/MSSP
edition can follow after tenant isolation exists.

## Product decisions carried into the demo

1. Default to a high-attention but controlled state: one overdue policy, four
   priority missions, and clear data freshness.
2. Lead with “4 fixes can break 23 paths,” not “1,842 critical findings.”
3. Allow scenario switching between high attention, normal, and all clear so
   evaluation covers critical and empty states.
4. Make every mission open into the same evidence story: why now, path, fastest
   break, owner, and verification.
5. Persist mission lifecycle changes locally.
6. Label all records as seeded demo data and all external actions as simulated.
7. Use an explicit demo signal snapshot rather than presenting research data as
   live threat intelligence.

