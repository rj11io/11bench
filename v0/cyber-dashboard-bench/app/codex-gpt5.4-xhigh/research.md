# Research - Chokepoint

## Selected wedge

Chosen product wedge: an attack-path remediation workspace for lean cloud security teams.

Why this wedge won:

- The market already has broad CNAPP and exposure-management platforms for finding risk.
- The repeat pain is turning fragmented findings into a small number of owner-ready remediation decisions.
- The strongest demoable dashboard is not a generic SOC wallboard. It is a decision surface that shows why a cloud exposure matters, who must fix it, and whether risk is actually burning down.

Primary user hypothesis:

- Cloud security engineer or exposure-management lead inside a 500 to 3,000 employee cloud-native company.
- Typical security team size is small, cross-functional, and already drowning in disconnected findings.
- They usually inherit scanners, CSPM, identity alerts, ticketing, and spreadsheets, but not a clean operating layer for remediation.

## Executive synthesis

- The product should prioritize toxic combinations and attack paths, not raw finding counts or CVSS alone.
- It must clearly separate simulated exposure from live threat activity to preserve trust.
- It must turn security context into owner context: business service, crown-jewel impact, likely choke point, recommended fix bundle, due date, and audit trail.
- It should land as an overlay on top of existing tools, not as a rip-and-replace security platform.
- Visualizations should stay conservative and operational: ranked lists, bar and line trends, path diagrams, SLA queues, and accessible tables.

## Research log

### 1. SANS Institute - "24% of Cyber Leaders Cite Lack of Enterprise-Wide Visibility as the Biggest Barrier to SOC Effectiveness, the 2026 SANS SOC Survey Finds"

- URL: https://www.sans.org/press/announcements/24-of-cyber-leaders-cite-lack-of-enterprise-wide-visibility-as-the-biggest-barrier-to-soc-effectiveness-the-2026-sans-soc-survey-finds
- Accessed: July 16, 2026
- Findings:
  - Security operations practitioners describe "too many alerts that do not connect and not enough shared context to act on."
  - The release says the survey draws on 444 practitioner responses plus 69 CISOs and senior security executives.
  - The top reported barrier is enterprise-wide visibility, above staffing shortfalls and automation gaps.
- Decisions changed:
  - The product cannot just rank alerts. It needs a shared context model across findings, assets, identities, and owners.
  - The dashboard should emphasize connection, blast radius, and owner-ready context over feed volume.

### 2. SANS Institute - "SANS 2024 SOC Survey: Facing Top Challenges in Security Operations"

- URL: https://www.sans.org/white-papers/sans-2024-soc-survey-facing-top-challenges-security-operations
- Accessed: July 16, 2026
- Findings:
  - The most common SOC size remains 2 to 10 people.
  - Cloud-based architecture overtook the classic single central SOC model.
  - AI and ML analysis tooling ranked at the bottom of SOC technology satisfaction.
- Decisions changed:
  - Target a lean team, not a giant staffed command center.
  - Keep the experience dense but fast to scan for a small team that covers many surfaces.
  - AI suggestions should be advisory and evidence-backed, never opaque or auto-closing.

### 3. Google Cloud - "Cloud Threat Horizons Report H1 2026"

- URL: https://cloud.google.com/security/report/resources/cloud-threat-horizons-report-h1-2026
- Accessed: July 16, 2026
- Findings:
  - Google says identity compromise underpinned 83% of compromises.
  - The report says the window between disclosure and exploitation collapsed from weeks to days in the second half of 2025.
  - The report recommends more automatic defenses and stronger identity controls.
- Decisions changed:
  - Identity pivots and excessive permissions need to be first-class attack-path elements.
  - Internet-exposed software plus exploitable vulnerability plus privilege pivot should receive an aggressive SLA.
  - The UI should highlight chokepoints where one permission or edge control collapses multiple paths.

### 4. NIST - "Prioritizing Cybersecurity Risk for Enterprise Risk Management" (NIST IR 8286B-upd1)

- URL: https://www.nist.gov/publications/prioritizing-cybersecurity-risk-enterprise-risk-management-0
- Accessed: July 16, 2026
- Findings:
  - NIST says risk priorities must be set in light of impact on enterprise objectives.
  - The publication ties risk response and response cost to the cybersecurity risk register and the overall enterprise risk register.
- Decisions changed:
  - Every mission needs business-service context, impact narrative, and explicit response option.
  - The dashboard should show risk reduction in business terms, not just finding counts.

### 5. NIST - "Likely Exploited Vulnerabilities: NIST Publishes Cybersecurity White Paper 41"

- URL: https://www.nist.gov/news-events/news/2025/05/likely-exploited-vulnerabilities-nist-publishes-cybersecurity-white-paper
- Accessed: July 16, 2026
- Findings:
  - NIST says organizations need a clear metric for predicting and responding to vulnerabilities most susceptible to active exploitation.
  - The paper proposes a metric to estimate expected exploitation and use it to improve prioritization.
- Decisions changed:
  - Do not equate severity with urgency.
  - The product score model should explicitly separate exploit likelihood from business impact and path reachability.

### 6. CISA - "Known Exploited Vulnerabilities Catalog"

- URL: https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0
- Accessed: July 16, 2026
- Findings:
  - CISA describes the KEV catalog as the authoritative source of vulnerabilities exploited in the wild.
  - CISA explicitly says organizations should use KEV as an input to their vulnerability-management prioritization framework.
- Decisions changed:
  - KEV presence should appear as a visible trust signal in the scorecard, not buried in metadata.
  - The product should provide a "KEV on path" badge for faster triage.

### 7. Wiz - "Attack Path Analysis (APA) Explained"

- URL: https://www.wiz.io/academy/detection-and-response/attack-path-analysis
- Accessed: July 16, 2026
- Findings:
  - The page says most "critical" vulnerabilities are not exploitable in practice, so treating all alerts equally creates noise.
  - Wiz frames attack-path analysis as graph-based modeling across resources, permissions, vulnerabilities, and toxic combinations.
  - The article positions the goal as surfacing the paths that actually matter.
- Decisions changed:
  - The product object should be a mission around a toxic combination, not a single scanner finding.
  - The main detail view should explain the path chain visually, not only numerically.

### 8. Wiz - "Wiz Security Graph: How It Works, Benefits, Use Cases"

- URL: https://www.wiz.io/lp/wiz-security-graph
- Accessed: July 16, 2026
- Findings:
  - Wiz positions the graph as a shared context layer for security, engineering, and compliance.
  - The page emphasizes code-to-cloud correlation, ownership mapping, blast radius, and faster cross-team work.
- Decisions changed:
  - The demo should show shared ownership context and engineering handoff, not only analyst triage.
  - The right level of differentiation is remediation operations with ownership clarity.

### 9. Google Cloud Documentation - "Overview of attack exposure scores and attack paths"

- URL: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-learn
- Accessed: July 16, 2026
- Findings:
  - Google explicitly says attack paths represent possibilities and do not prove an attack is in progress.
  - The system centers on high-value resources and simulated attack paths.
  - Simulations run about every six hours and at least daily.
- Decisions changed:
  - The product must label exposure paths as simulated or validated, with a clear distinction from threat detections.
  - The dashboard should focus scoring on crown-jewel resources and refresh cadence, not "real-time" theater.

### 10. Microsoft Learn - "Review attack paths in Microsoft Security Exposure Management"

- URL: https://learn.microsoft.com/en-us/security-exposure-management/review-attack-paths
- Accessed: July 16, 2026
- Findings:
  - Microsoft highlights attack path trends over time, top choke points, top targets, and top entry points.
  - Microsoft notes users may see an empty attack-path page by design when there is no externally driven exploitable path.
  - The workflow includes blast-radius review and recommendations.
- Decisions changed:
  - The overview should include choke points, entry points, and targets as first-class summary objects.
  - Empty state needs to be meaningful and reassuring, not a missing-data failure.

### 11. AWS Security Hub - "Setting the workflow status of findings in Security Hub CSPM"

- URL: https://docs.aws.amazon.com/securityhub/latest/userguide/findings-workflow-status.html
- Accessed: July 16, 2026
- Findings:
  - AWS distinguishes `NEW`, `NOTIFIED`, `SUPPRESSED`, and `RESOLVED`.
  - `NOTIFIED` explicitly means a resource owner was informed because someone else must intervene.
  - `NOTIFIED` and `RESOLVED` can revert to `NEW` when the issue becomes active again.
- Decisions changed:
  - Collaboration state should reflect owner handoff, not only analyst state.
  - The product should support reopen logic and auditability because remediation is not always permanent.

### 12. Rapid7 - "Exposure Command: Hybrid Exposure Management"

- URL: https://www.rapid7.com/products/command/exposure-management/
- Accessed: July 16, 2026
- Findings:
  - Rapid7 emphasizes exploit likelihood, reachability, severity, and business context.
  - The page positions remediation workflows, SLAs, toxic combinations, and existing-stack integrations as core.
  - The product is sold demo-first with packages and a high number of integrations.
- Decisions changed:
  - The wedge should be positioned as overlay remediation operations, not independent discovery.
  - Mission SLAs, ITSM handoff, and integration assumptions belong in the PRD and the UI.

### 13. Rapid7 Documentation - "Exposure Command Overview"

- URL: https://docs.rapid7.com/exposure-command/exposure-command/
- Accessed: July 16, 2026
- Findings:
  - Rapid7 describes aggregating native and third-party sources into shared exposure context.
  - The documentation explicitly calls out blast radius, downstream controls, remediation guidance, and live dashboards.
- Decisions changed:
  - The dashboard must surface compensating controls and blast radius together.
  - The product category is validated as exposure-management workflow, but the opportunity is still the operator-facing remediation layer.

### 14. Tenable - "Tenable One exposure management platform"

- URL: https://www.tenable.com/products/tenable-one
- Accessed: July 16, 2026
- Findings:
  - Tenable frames the category around visibility, insight, and action across the full attack surface.
  - The page explicitly says teams should direct remediation toward critical attack paths and toxic combinations affecting sensitive systems and data.
- Decisions changed:
  - The PRD should stay narrow: attack-path-driven remediation, not generic reporting.
  - The demo should always tie risk to sensitive data and business service context.

### 15. Palo Alto Networks - "Cortex Exposure Management"

- URL: https://www.paloaltonetworks.com/cortex/exposure-management
- Accessed: July 16, 2026
- Findings:
  - Palo Alto promises to cut vulnerability noise and prioritize high-risk exploitable issues with complete context.
  - The page pushes plain-language summaries and automated remediation.
- Decisions changed:
  - Explainability matters as much as scoring.
  - Summaries in the UI should state why the issue is prioritized in plain language, backed by evidence chips.

### 16. U.S. Web Design System - "Data visualizations"

- URL: https://designsystem.digital.gov/components/data-visualizations/
- Accessed: July 16, 2026
- Findings:
  - USWDS recommends common chart types, a single central message per chart, careful color use, and equivalent access for assistive tech.
  - It recommends textual summaries and accessible alternatives for chart data.
- Decisions changed:
  - Use simple ranked bars, trend lines, and segmented status bars instead of exotic cyber charts.
  - Pair each chart with a plain-language summary and accessible data representation.

### 17. W3C WAI - "Tables Tutorial"

- URL: https://www.w3.org/WAI/tutorials/tables/
- Accessed: July 16, 2026
- Findings:
  - Accessible data tables need correct `th` and `td` markup and explicit relationships where needed.
  - Captions are recommended to identify the topic of a table.
- Decisions changed:
  - The mission queue should be a real table on desktop, not a div-based fake grid.
  - Responsive table fallbacks still need preserved semantics.

### 18. W3C APG - "Grid (Interactive Tabular Data and Layout Containers) Pattern"

- URL: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
- Accessed: July 16, 2026
- Findings:
  - ARIA grids require substantial focus management and keyboard behavior.
  - For tabular content, authors should choose carefully between grid and table patterns.
- Decisions changed:
  - The first version should avoid a faux spreadsheet interaction model.
  - Focus should remain on reliable table semantics, buttons, and drawers rather than keyboard-heavy custom grids.

## Category synthesis

Representative category players:

- Wiz
- Tenable One
- Rapid7 Exposure Command
- Palo Alto Cortex Exposure Management
- Microsoft Security Exposure Management
- Google Cloud Security Command Center attack-exposure features

Shared patterns across the category:

- Graph-based correlation across assets, identities, vulnerabilities, and data
- Attack-path or toxic-combination prioritization
- Business-context or criticality overlays
- Remediation guidance and workflow hooks
- Heavy reliance on integrations and demo-led enterprise sales

Where the gap still exists:

- Most products are broad platforms.
- The operator pain is often the last mile: converting risk context into a small number of accountable remediation missions, tracking owner response, and proving burn-down without conflating exposure with incident.

## Resulting product decisions

- Build a remediation-operations product, not another scanner.
- Focus on cloud attack paths that combine internet exposure, identity misuse, and crown-jewel data access.
- Make "owner notified", "fix in progress", "resolved", and "accepted exception" visible workflow states.
- Show why the mission matters using exploitability, blast radius, business service, KEV status, and control gaps.
- Treat all demo content as simulated data and label it clearly.
- Use accessible, conservative visualizations that support dense operational scanning on desktop and remain usable on mobile.
