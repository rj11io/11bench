# Breakline research

Access date for all sources: 2026-07-16

## Product question

What narrow cybersecurity dashboard wedge is strong enough to feel credible, strategically differentiated, and visually coherent in a frontend demo?

## Short answer

The best wedge is not a generic SOC wallboard and not another flat vulnerability list. It is an **attack-path operations dashboard for lean hybrid security teams**: a workspace that shows which few choke points break the most meaningful exposure chains, why the ranking is trustworthy, and which owner must act next.

This leads to the demo product concept:

- Product name: **Breakline**
- Category: **Exposure management / attack-path remediation**
- Primary user: **Security engineer or exposure-management lead in a 500-5,000 employee hybrid organization**
- Core promise: **Turn noisy findings into a small, defensible queue of attack chains with explicit ownership and visible “chain prevented” progress**

## Source log

| Area                            | Source                                                                                                                                                                     | Findings                                                                                                                                                                          | Decision changed                                                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Risk framework                  | NIST, _The NIST Cybersecurity Framework (CSF) 2.0_ (2024), https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20                                           | CSF 2.0 is explicitly about helping organizations “understand, assess, prioritize, and communicate” cybersecurity efforts, not just detect technical defects.                     | The dashboard should make prioritization and communication first-class, not just issue inventory.                              |
| Governance and accountability   | NIST, _Frequently Asked Questions_ (CSF 2.0), https://www.nist.gov/cyberframework/faqs                                                                                     | NIST added the Govern function to make risk tolerance, roles, responsibilities, and policy alignment more visible.                                                                | Ownership, due dates, and rationale need to be embedded in the product instead of treated as external workflow.                |
| Exploit-driven prioritization   | CISA, _Known Exploited Vulnerabilities Catalog_, https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0                                                       | CISA says organizations should use KEV as an input to vulnerability prioritization because it reflects real-world exploitation.                                                   | Demo scoring should reference exploit evidence and validation, not only severity.                                              |
| Current attacker entry trends   | Verizon, _Vulnerability exploitation top breach entry point, 2026 industry-wide DBIR finds_ (2026), https://www.verizon.com/about/news/breach-industry-wide-dbir-finds     | Verizon says vulnerability exploitation accounted for 31% of breaches and surpassed stolen credentials for the first time, while third-party exposure and shadow AI also rose.    | The wedge should connect vulnerabilities, identity, and ownership instead of choosing only one silo.                           |
| Hybrid complexity cost          | IBM / Ponemon, _Cost of a data breach 2025_ (2025), https://www.ibm.com/reports/data-breach                                                                                | IBM reports a $4.4M average breach cost, 97% of AI-related incidents lacking proper AI access controls, and higher cost from governance gaps.                                     | Trust, governance, and identity control need to be visible product themes, not optional “admin” features.                      |
| Category direction              | Microsoft, _What is Microsoft Security Exposure Management?_ (2025), https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management | Microsoft frames exposure management as a unified view across endpoints, cloud, and external attack surface, with critical assets, attack paths, connectors, and recommendations. | Confirms the chosen category is market-real and that hybrid asset context is table stakes.                                     |
| Dashboard IA for exposure tools | Microsoft, _Review attack paths in Microsoft Security Exposure Management_ (2026), https://learn.microsoft.com/en-us/security-exposure-management/review-attack-paths      | The attack-path dashboard emphasizes overview trends, top choke points, top scenarios, targets, entry points, and recommendation drill-down.                                      | The information architecture should center on queue -> path graph -> recommended fixes, not only KPI cards.                    |
| Choke-point prioritization      | Tenable, _Attack Path_ documentation, https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm                                                     | Tenable emphasizes top attack paths leading to critical assets and prioritizing the choke points that recur most across those paths.                                              | The product differentiator should be “break the fewest choke points for the largest reduction,” not “fix everything critical.” |
| Progress semantics              | Tenable, _Attack Path and Technique Statuses_, https://docs.tenable.com/exposure-management/Content/attack-path/attack-statuses.htm                                        | “Chain Prevented” is a useful intermediate state: one fixed technique can materially reduce risk before every issue is closed.                                                    | The UI should celebrate partial but meaningful risk reduction and not require all green to show progress.                      |
| Unified remediation workflow    | Wiz, _Wiz Exposure Management GA Release: Unifying UVM + ASM_ (2025), https://www.wiz.io/blog/wiz-exposure-management-now-generally-available                              | Wiz argues that unified context, exploit validation, and ownership mapping are necessary to prioritize and reduce risk.                                                           | The workflow should surface owner confidence and ownership edits directly in the dashboard.                                    |
| Operational triage patterns     | Google Cloud, _Respond to alerts and cases_ (2026), https://docs.cloud.google.com/chronicle/docs/secops/respond-cases                                                      | Personalized views, saved filters, AI summaries, and playbooks reduce noise and accelerate attention to true positives.                                                           | The demo should include filters, search, and an operator brief to show an opinionated daily workflow.                          |
| Accessibility for dense tools   | W3C WAI, _Tips and Tricks_ and _Tables Tutorial_, https://www.w3.org/WAI/tutorials/tables/tips/ and https://www.w3.org/WAI/tutorials/tables/                               | Dense tables remain valid for real data if structure is preserved; on small screens the relationships must remain intact in every responsive form.                                | The remediation table should use semantic table markup, captions, and contained overflow instead of div soup.                  |

## Market and user synthesis

### Buyer and user segments

- Enterprise SOC buyers want broad detection and response coverage, but the dashboard category is crowded and hard to differentiate credibly in a no-backend demo.
- Vulnerability-management buyers already have countless CVE dashboards; the pain is not lack of findings but lack of context, exploit evidence, and owner alignment.
- Cloud-security buyers increasingly converge on **exposure management** because they need one queue across code, cloud, endpoint, identity, and external attack surface.
- The most frustrated daily operator is a **security engineer or exposure lead** working in a lean team with fragmented ownership and too many point tools.

### Painful workflow selected

The painful workflow is:

1. Receive thousands of findings from multiple tools.
2. Try to decide which ones actually create exploitable paths to important assets.
3. Struggle to explain why one path matters more than another.
4. Hand work to teams with unclear ownership.
5. Lose confidence because “open vs closed” status hides partial progress and residual risk.

### Why this wedge is better than a generic dashboard

- It is narrow enough to feel like a product, not a collage.
- It supports concrete UI interactions: queue triage, path review, owner assignment, step status changes, and persistent notes.
- It maps well to current market language: attack paths, choke points, critical assets, validation, and unified exposure management.
- It has a GTM story: replace flat severity-based triage with business-aware, owner-aware risk reduction.

## Competitive read

### Representative competitors and category neighbors

- Microsoft Security Exposure Management
  - Strengths: unified hybrid graph, critical assets, attack surface map, connector story.
  - Gap to exploit: Microsoft’s message is platform-broad; a tighter remediation control-room experience can be sharper.
- Tenable Exposure Management
  - Strengths: attack-path analytics, choke-point logic, lifecycle statuses like Chain Prevented.
  - Gap to exploit: practitioner workflow can still feel finding-centric and technique-centric rather than owner-centric.
- Wiz Exposure Management
  - Strengths: graph context, exploit validation, ownership mapping, cloud-to-code context.
  - Gap to exploit: strongest in modern cloud-heavy orgs; a hybrid mid-market remediation workspace can feel more immediately operational.
- Google SecOps / broader SecOps tools
  - Strengths: triage queues, cases, AI summaries, saved views.
  - Gap to exploit: still incident-first; Breakline is proactive exposure reduction, not alert response.

### White space

The most defensible whitespace is not “another security graph.” It is:

- a **daily operating dashboard** for exposure work,
- centered on **breaking attack chains**,
- with **trustable explanations**,
- and **named accountability** baked into the same screen.

## Information architecture implications

The strongest operational IA is:

1. **Priority queue**
   - ranked attack paths, not individual findings
   - visible status and priority
2. **Selected path workspace**
   - explanation of why this path matters
   - compact path visualization
   - critical asset and blast-radius framing
3. **Remediation plan**
   - owner, due date, risk-cut estimate, step status
4. **Trust trail**
   - operator note, evidence bullets, recent activity
5. **Portfolio pressure**
   - owner workload and domain mix to explain why MTTR may stall

This is a better IA than “KPIs at top, charts below” because it makes an actual workflow legible.

## Metrics and visualization choices

### Metrics worth showing

- Open attack paths
- Crown-jewel paths
- Broken chains this sprint
- Near-term owner SLAs
- Exposure score and validation score
- Number of sibling paths collapsed by the same choke-point fix
- Owner workload concentration

### Visualizations that fit the wedge

- Compact stat cards for queue health
- Ranked queue cards for path selection
- A linear path visualization instead of a sprawling network hairball
- A semantic remediation table for dense operational data
- Simple bars for owner workload and exposure-domain mix

### Visualizations to avoid

- Overly abstract radar charts
- Pie charts for tiny operational differences
- Massive node-link graphs with no focal task
- Fake “live telemetry” widgets unrelated to the chosen workflow

## Trust, explainability, and collaboration decisions

- Every selected path needs a plain-language explanation of why it ranks highly.
- Validation evidence must be visible, because teams distrust severity-only prioritization.
- Ownership must be editable in the workflow, because source systems are often incomplete.
- “Chain prevented” should remain visible, because meaningful progress happens before every task is fully done.
- Closed work should stay auditable but not crowd the default queue.

## Accessibility and responsive conclusions

- Dense operational tables are acceptable if semantics are preserved.
- Search, filters, and core actions must stay usable on mobile.
- The path view should collapse into a vertical sequence on narrow screens rather than forcing page-width overflow.
- Color should support severity, but state labels must remain explicit text.

## GTM and positioning conclusions

### Positioning

Breakline should position against “flat exposure backlogs” rather than against every SIEM or CNAPP.

### Narrative

- Security teams do not need more findings.
- They need a smaller queue of attack paths that matter.
- They need confidence that the ranking is defensible.
- They need owner-visible progress before full closure.

### Buyer trigger

The likely trigger is not “we need a better dashboard.” It is:

- too many scanners,
- too many unresolved critical findings,
- poor accountability across platform teams,
- and leadership asking why the backlog is large but risk is not visibly shrinking.

## Final product decision

Build **Breakline**, an attack-path operations dashboard for hybrid organizations that:

- prioritizes a small queue of validated paths,
- focuses on crown-jewel targets and choke points,
- treats ownership as part of the product,
- and shows “chain prevented” as a credible intermediate proof of risk reduction.
