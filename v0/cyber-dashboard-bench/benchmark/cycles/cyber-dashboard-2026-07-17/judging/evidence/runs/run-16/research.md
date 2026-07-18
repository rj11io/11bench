# Breakline research

Accessed 2026-07-16. This research informed a focused product decision: build an integration-first exposure-remediation decision desk for lean security teams, not a scanner or a generic executive dashboard.

## Executive synthesis

The opportunity is not “find more vulnerabilities.” Established products already find, normalize, and graph large volumes of exposure data. The sharper unsolved workflow is the last operational mile: deciding which small set of exposures deserves action today, proving the decision to infrastructure owners, selecting the safest risk-reduction move, and verifying that the path is actually closed.

The primary user is a security engineering or vulnerability-management lead at a 500–5,000 employee organization. This user often has scanners and ticketing systems but lacks a dedicated exposure-management operations team. They are accountable for reducing likely business impact while depending on cloud, infrastructure, identity, and application teams to execute fixes.

The product wedge is **Breakline: the exposure decision desk**. It ingests existing findings and asset context, groups them into business-relevant attack paths, and produces a short daily queue of explainable “fix decisions.” Each decision includes evidence provenance, the reachable crown jewel, a risk calculation, alternative breakpoints, an owner, an SLA, and re-test criteria. The differentiator is a **Decision Packet**: a compact, auditable contract between security and the team that owns the fix.

## Buyer and user segments

### Segment map

| Segment | Typical buyer | Daily user | Pain | Fit for Breakline |
| --- | --- | --- | --- | --- |
| Enterprise exposure management | CISO / VP Security | Dedicated VM and exposure teams | Tool sprawl, global asset graph, program governance | Poor initial fit; incumbents are broad and entrenched |
| Mid-market security engineering | CISO / Head of Security | Security engineer or VM lead | Small team, many findings, weak ownership data, slow handoffs | **Primary segment** |
| Cloud-native product companies | VP Engineering / CISO | Cloud security engineer | Code-to-cloud ownership and safe cloud remediation | Strong secondary segment |
| MSSP / vCISO | Service owner | Multi-tenant analyst | Repeatable prioritization and client reporting | Later channel opportunity |
| Regulated critical infrastructure | Risk executive | VM and OT teams | Safety, legacy assets, compensating controls | Attractive but longer sales and integration cycles |

### Painful workflow observed

1. Findings arrive from scanners, cloud posture tools, EDR, identity tools, and external attack-surface products.
2. Severity is inconsistent across tools. CVSS alone does not express current exploitation, environmental context, reachability, or business impact.
3. Security manually reconstructs whether an exposure is reachable and what it could affect.
4. A ticket is sent to an owner with too little context or an overly broad patch list.
5. The owner asks whether the change is urgent, which component caused the issue, and what the least disruptive fix is.
6. Security follows up in chat and spreadsheets; exceptions and compensating controls become tribal knowledge.
7. Ticket closure is mistaken for risk closure until a later scan proves otherwise.

The product should compress steps 2–7 into one reviewable object and preserve the evidence behind every decision.

## Sources and decision impact

### 1. Verizon, “2026 Data Breach Investigations Report — Executive Summary”

- URL: https://www.verizon.com/business/resources/executivebriefs/2026-dbir-executive-summary.pdf
- Accessed: 2026-07-16
- Findings:
  - The report analyzes more than 31,000 incidents and more than 22,000 confirmed breaches.
  - Exploitation of vulnerabilities became the most common initial-access vector at 31%; credential abuse was 13%.
  - Only 26% of critical vulnerabilities defined by CISA KEV status were fully remediated in 2025, down from 38%.
  - Median full-resolution time rose from 32 to 43 days.
  - Small and medium organizations face many of the same threats as larger organizations with fewer resources.
- Decision changed:
  - Selected proactive exposure remediation over a generic SOC alert dashboard.
  - Made “time to verified path closure,” rather than number of findings, the principal outcome metric.
  - Chose the mid-market as the initial segment and designed a daily bounded queue.

### 2. CISA, “Reducing the Significant Risk of Known Exploited Vulnerabilities” (BOD 22-01 fact sheet)

- URL: https://www.cisa.gov/sites/default/files/publications/Reducing_the_Significant_Risk_of_Known_Exploited_Vulnerabilities_20211103.pdf
- Accessed: 2026-07-16
- Findings:
  - The KEV Catalog is a living list of vulnerabilities with evidence of exploitation.
  - CISA recommends that public and private organizations use KEV status and aggressive turnaround times to improve prioritization.
- Decision changed:
  - KEV is a first-class evidence signal and an SLA accelerator, not merely a badge.
  - Breakline records the KEV catalog observation time and source provenance.

### 3. CISA, “Stakeholder-Specific Vulnerability Categorization (SSVC) Guide”

- URL: https://www.cisa.gov/sites/default/files/publications/cisa-ssvc-guide%20508c.pdf
- Accessed: 2026-07-16
- Findings:
  - SSVC uses a decision tree to prioritize vulnerability response based on exploitation and the impact to the specific organization.
  - Outcomes such as Track, Track*, Attend, and Act communicate decisions rather than pretending that one universal score is sufficient.
- Decision changed:
  - The product presents an explicit action recommendation and the factors that produced it.
  - The UI uses “Act now / Schedule / Watch” as an operational layer over the numerical score.

### 4. FIRST, “The EPSS Model”

- URL: https://www.first.org/epss/model
- Accessed: 2026-07-16
- Findings:
  - EPSS estimates the probability that a published CVE will be exploited in the next 30 days.
  - FIRST’s example shows that a CVSS 7+ threshold can create many false positives, while an EPSS threshold changes the tradeoff among effort, coverage, and efficiency.
  - FIRST explicitly warns that example thresholds are not universal recommendations.
- Decision changed:
  - EPSS is shown as a probability with timestamp, percentile, and source—not transformed into a misleading severity label.
  - Thresholds are tenant-configurable; the demo does not imply that 10% or any other value is universally correct.

### 5. FIRST, “CVSS v4.0 Specification Document”

- URL: https://www.first.org/cvss/v4.0/specification-document
- Accessed: 2026-07-16
- Findings:
  - CVSS is an open severity framework, not a complete organizational risk score.
  - CVSS v4 separates Base, Threat, Environmental, and Supplemental groups.
  - Consumers should enrich Base values with threat and environmental context and publish the vector so the score can be understood.
- Decision changed:
  - Breakline never labels its composite value “CVSS.”
  - The risk explanation preserves CVSS version/vector and separately shows reachability, exploit evidence, control state, and business impact.

### 6. NIST, “Cybersecurity Framework 2.0”

- URL: https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20
- Accessed: 2026-07-16
- Findings:
  - CSF 2.0 adds Govern to Identify, Protect, Detect, Respond, and Recover.
  - It emphasizes informed enterprise-risk decisions, roles, supply-chain context, and communication across technical and executive audiences.
- Decision changed:
  - Ownership, decision history, exceptions, and business-service context are core data, not administrative afterthoughts.
  - Executive reporting derives from operational decisions and verified outcomes rather than a separate vanity-score dashboard.

### 7. Tenable, “Attack Path”

- URL: https://docs.tenable.com/exposure-management/Content/attack-path/attack-path.htm
- Accessed: 2026-07-16
- Findings:
  - Attack paths connect valid origins to critical assets and use graph analysis to identify common choke points.
  - Severity considers likelihood, impacted critical assets, method, and the path.
  - A path should disappear only after the underlying issue is fixed and verified by a scan.
- Decision changed:
  - A compact path view is central to each decision, but the graph is subordinate to the recommended breakpoint.
  - Verification is a required lifecycle state; “ticket done” is not “exposure closed.”

### 8. Tenable, “Vulnerability prioritization”

- URL: https://www.tenable.com/products/vulnerability-management/use-cases/prioritization
- Accessed: 2026-07-16
- Findings:
  - Current exposure-management positioning emphasizes real-world exploitability, business impact, toxic combinations, normalized risk, and progress measurement.
  - Broad platforms unify vulnerabilities, misconfigurations, permissions, and identity exposures.
- Decision changed:
  - Avoided competing as another universal discovery platform.
  - Positioned Breakline as a system of action above existing sources, with fast deployment and decision workflow as its moat.

### 9. Wiz, “Introducing Wiz for Exposure Management”

- URL: https://www.wiz.io/blog/introducing-wiz-for-exposure-management
- Accessed: 2026-07-16
- Findings:
  - Wiz has expanded from cloud security into unified exposure management across cloud, code, and on-premises.
  - Its stated value is focused prioritization through graph and attack-path context.
- Decision changed:
  - Confirmed that “graph + prioritization” alone is not differentiated.
  - Focused the product promise on cross-team decisions, safest-breakpoint comparison, ownership, and proof of closure.

### 10. Wiz, “Introducing the Green Agent: AI-Powered Remediation for the Cloud”

- URL: https://www.wiz.io/blog/introducing-wiz-green-agent
- Accessed: 2026-07-16
- Findings:
  - Remediation products are moving toward automated investigation, root-cause identification, owner context, and suggested plans.
  - The product describes the importance of contextual inputs and layer-appropriate remediation.
- Decision changed:
  - Breakline’s demo does not make an unprovable “AI fixes everything” claim.
  - Recommendations show deterministic evidence, confidence, and alternatives; future AI assistance must remain reviewable and human-approved.

### 11. Rapid7, “Exposure Command and Remediation Hub: A Clearer Path from Exposure to Patch”

- URL: https://www.rapid7.com/blog/post/em-path-from-prioritized-exposures-to-remediation-progress/
- Accessed: 2026-07-16
- Findings:
  - Remediation slows when infrastructure, cloud, endpoint, and IT teams lack executable context.
  - Asset detail, trusted status, patch/endpoint visibility, coordination, and reporting are central to moving from prioritization to progress.
- Decision changed:
  - The core object is a shareable Decision Packet rather than a row in a findings table.
  - Every packet includes change scope, rollback note, verification check, owner, due date, and evidence history.

### 12. Rapid7, “Exposure Command Packages & Pricing”

- URL: https://www.rapid7.com/products/command/pricing/
- Accessed: 2026-07-16
- Findings:
  - Exposure-management products commonly price by monitored assets, use annual subscriptions, and offer free trials/product tours while reserving exact pricing for custom quotes.
- Decision changed:
  - Adopted asset-based annual packaging for procurement familiarity.
  - Differentiated the GTM motion with a fixed-scope 14-day “shadow queue” that proves decision compression before a platform rollout.

### 13. ISC2, “2025 Cybersecurity Workforce Study”

- URL: https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study
- Accessed: 2026-07-16
- Findings:
  - The study included 16,029 practitioners and decision-makers.
  - 47% reported feeling overwhelmed by expected workload and 48% exhausted by keeping current.
  - Cloud security, risk assessment, security engineering, and communication/collaboration are prominent skill needs.
  - Skills shortages can lead to process oversights, misconfiguration, and under-secured areas.
- Decision changed:
  - Reduced the primary experience to a finite decision queue with progressive disclosure.
  - Wrote owner-facing remediation copy to transfer context without requiring every operator to be a security specialist.

### 14. ACM Computing Surveys, “Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities”

- URL: https://doi.org/10.1145/3723158
- Accessed: 2026-07-16
- Findings:
  - The 2025 survey characterizes alert fatigue as a multi-causal human and systems problem in validation and triage.
  - Effective triage requires enrichment, correlation, prioritization, and presentation—not just alert generation.
- Decision changed:
  - The product groups raw evidence into decisions and suppresses duplicate symptoms.
  - Queue metrics measure decisions and aged risk, not raw event volume.

### 15. W3C, “Web Content Accessibility Guidelines (WCAG) 2.2”

- URL: https://www.w3.org/TR/WCAG22/
- Accessed: 2026-07-16
- Findings:
  - WCAG 2.2 includes keyboard access, minimum contrast, reflow, status messages, visible focus, and minimum target-size criteria.
  - Color cannot be the sole carrier of meaning.
- Decision changed:
  - Severity always has text/icon treatment; controls have visible focus states and at least 24px targets with larger mobile hit areas.
  - Dense tables collapse into cards on small screens rather than requiring horizontal scrolling.
  - Toast/status changes use an ARIA live region.

## Competitive landscape

### Categories

- Vulnerability management: Tenable, Qualys, Rapid7, Microsoft Defender Vulnerability Management.
- Cloud-native application protection / cloud security: Wiz, Orca, Palo Alto Prisma Cloud.
- External attack-surface management: Censys, CyCognito, Palo Alto Cortex Xpanse.
- Continuous exposure management / attack-path management: Tenable One, XM Cyber, Pentera, Armis Centrix, Rapid7 Exposure Command.
- Asset intelligence / cyber asset attack-surface management: Axonius, JupiterOne.
- Ticketing and workflow systems: Jira, ServiceNow, Linear; these track work but do not independently establish exposure priority.

### Competitive gap

Incumbents have deeper discovery, proprietary sensors, and broader graphs. Breakline should not attempt to out-scan them. Its opening is:

1. Source-neutral ingestion from tools customers already own.
2. A deliberately small daily queue based on risk-reduction decisions, not findings.
3. Transparent factor-level reasoning with evidence freshness and confidence.
4. Side-by-side remediation breakpoints that expose operational tradeoffs.
5. Owner-ready packets and verified closure, with a complete decision audit.

### Defensibility hypothesis

The near-term moat is workflow data: which remediation breakpoint teams choose, who successfully owns which asset class, actual time/effort, exception patterns, verification results, and realized path reduction. Over time this can improve routing and remediation recommendations without hiding the evidence in an opaque score.

## Information architecture and visual research

### Operational hierarchy

1. **Attention state:** What changed and what requires a decision now?
2. **Decision queue:** Which action yields the greatest credible risk reduction within the available window?
3. **Decision detail:** Why it matters, how the path works, and which breakpoint is safest.
4. **Execution:** Owner, due date, ticket, change window, exception.
5. **Verification:** Re-test evidence and remaining paths.
6. **Program view:** Aging, path closure, coverage, and recurrence.

### Visualization choices

- Use a ranked list for work selection; humans compare ordered records more accurately than radial gauges.
- Use a small node-link path only for a selected decision where topology is the question.
- Use horizontal bars for risk-factor contribution and remediation impact because a common baseline supports comparison.
- Use a line/area sparkline for time trends.
- Avoid global “cyber risk” donut charts that imply unjustified precision.
- Always pair visual marks with exact values, labels, timestamps, and textual conclusions.

## Trust and explainability principles

- Separate observed facts, imported claims, calculated inferences, and analyst judgments.
- Show source and freshness for material evidence.
- Publish the composite score formula and its factor contributions.
- Do not let a score override a hard policy, such as a confirmed KEV on a reachable crown jewel.
- Preserve suppressed and superseded evidence for audit.
- Require human approval before ticket creation or automated changes.
- Express uncertainty directly (“reachability inferred; 82% confidence”).
- Track exceptions with approver, expiration, reason, and compensating control.
- Treat every integration as potentially stale or incomplete.

## Product and GTM decisions

### Positioning

**For lean security teams that own exposure outcomes but not the infrastructure, Breakline turns scattered findings into a small queue of provable fix decisions—so the right owner can break the path and security can verify the risk is gone.**

### Buying trigger

- A KEV or high-profile vulnerability creates an executive “are we exposed?” request.
- A penetration test finds an attack path despite a large vulnerability backlog.
- VM remediation SLAs are missed because tickets lack ownership or context.
- A company has multiple scanners but cannot show measurable risk reduction.

### Entry motion

1. Connect read-only scanner, cloud inventory, identity, and ticket data.
2. Run a 14-day shadow queue with no automated changes.
3. Compare existing priority/ticketing against Breakline’s top decisions.
4. Deliver an executive readout: duplicated findings compressed, owners resolved, decision time saved, and high-impact paths identified.
5. Convert to an annual asset-based subscription with guided onboarding.

### Pricing hypothesis

- Team: up to 2,500 monitored assets, 5 users, core connectors, $24k/year.
- Scale: up to 10,000 assets, unlimited viewers, SSO/SCIM, API and custom policy, $60k/year.
- Enterprise: larger environments, data residency, premium integrations and support, custom.
- A paid pilot is creditable against year one to avoid “free consulting” and qualify urgency.

## Research limits and remaining discovery

- Public competitor material emphasizes successful outcomes and cannot establish feature quality in production.
- No customer interviews were conducted for this demo. The riskiest assumptions are willingness to add an orchestration layer, availability of reliable asset ownership data, and whether infrastructure owners will engage with a new packet format.
- A production discovery phase must include 12–15 interviews across security leads, cloud/platform owners, vulnerability analysts, and security executives; retrospective analysis of at least 500 closed remediation tickets; and connector feasibility tests against two common mid-market stacks.

