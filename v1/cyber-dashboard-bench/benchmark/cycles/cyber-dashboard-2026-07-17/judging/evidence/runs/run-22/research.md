# Research: Exposure Remediation Command Center

Access date for all sources: July 16, 2026.

## Research Goal

The broad dashboard category was narrowed to a product wedge after reviewing security operations, vulnerability management, exposure management, cloud security, asset intelligence, and incident-response sources. The strongest opportunity is not another alert dashboard; it is an operator-grade exposure remediation command center for lean security teams that need to decide what to fix today, prove why, route it to the right owner, and verify that risk dropped.

## Selected Wedge

**Product category:** risk-based exposure management and remediation workflow.

**Primary user:** vulnerability/exposure management lead at a 500-5,000 employee company with mixed cloud, SaaS, endpoint, and identity systems, but without a large SOC or dedicated remediation program office.

**Why this wedge:** current market leaders emphasize broad visibility, risk scores, and attack-surface aggregation. Practitioners still struggle with duplicate alerts, tool sprawl, ownership ambiguity, business-context gaps, and manual coordination. The demo therefore focuses on an evidence-backed "fix queue" that translates exploit intelligence and asset context into owner-ready remediation action packs.

## Source Findings and Product Decisions

### 1. CISA Known Exploited Vulnerabilities Catalog

- Source: "Known Exploited Vulnerabilities Catalog," CISA, https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0
- Finding: CISA describes KEV as an authoritative input for vulnerability prioritization and includes concrete remediation actions, date added, due date, ransomware-known flag, affected vendor/product, and CVE identifiers.
- Decision changed: The product must elevate "known exploited" above generic severity and show a due-date/SLA posture. KEV is modeled as a primary priority factor and as explainable evidence rather than a hidden score input.

### 2. CISA SSVC Guidance

- Source: "CISA Releases SSVC Methodology to Prioritize Vulnerabilities," CISA, https://content.govdelivery.com/accounts/USDHSCISA/bulletins/337377d
- Finding: CISA's SSVC approach prioritizes vulnerability response based on exploitation status, safety impact, and prevalence, producing action-oriented decisions rather than only numeric severity.
- Decision changed: The product uses action buckets such as `Act now`, `Schedule`, `Investigate`, and `Exception review` instead of relying on a single severity queue. The UI explains the decision path beside the remediation action.

### 3. FIRST EPSS User Guide and FAQ

- Sources:
  - "EPSS User Guide," FIRST, https://www.first.org/epss/user-guide.html
  - "EPSS Frequently Asked Questions," FIRST, https://www.first.org/epss/faq
  - "Probability, Percentiles, and Binning - How to understand and interpret EPSS Scores," FIRST, https://www.first.org/epss/articles/prob_percentile_bins
- Finding: EPSS predicts probability of exploitation in the next 30 days and should not be treated as a full risk score. FIRST recommends showing probability with percentile where possible.
- Decision changed: EPSS appears as one evidence chip with probability and percentile, while asset criticality, internet exposure, identity path, and business impact remain separate. The dashboard avoids presenting EPSS as "risk."

### 4. NIST Cybersecurity Framework 2.0

- Source: "The NIST Cybersecurity Framework (CSF) 2.0," NIST, https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20
- Finding: CSF 2.0 frames cybersecurity as risk governance and risk management outcomes, not only technical controls. It supports prioritization and communication across stakeholders.
- Decision changed: The product includes executive/business-unit risk rollups and explicit "risk accepted vs. risk reduced" states. The GTM story positions the product as reducing risk windows and making risk decisions auditable.

### 5. NIST Computer Security Incident Handling Guide

- Source: "SP 800-61 Rev. 2, Computer Security Incident Handling Guide," NIST CSRC, https://csrc.nist.gov/pubs/sp/800/61/r2/final
- Finding: Incident handling requires preparation, detection/analysis, containment/eradication/recovery, and post-incident activity, including prioritization and coordination.
- Decision changed: Even though the wedge is exposure management rather than IR, the workflow borrows incident-response discipline: triage, assign, contain/mitigate, verify, and record the decision trail.

### 6. NCSC Vulnerability Management Guidance

- Source: "4. Carry out assessments by triaging and prioritising," UK National Cyber Security Centre, https://www.ncsc.gov.uk/collection/vulnerability-management/guidance/carry-out-assessments
- Finding: NCSC recommends consolidating issues, grouping similar findings, considering business impact and external exposure, and categorizing outcomes as fix, acknowledge, or investigate. It also stresses exception lists with rationale and review dates.
- Decision changed: The product groups duplicate findings into remediation packs, includes external exposure and business impact in prioritization, and makes "acknowledge/exception" a governed state with rationale rather than a dismissal.

### 7. NCSC Security Monitoring and Alert Fatigue

- Source: "Principle C1 Security monitoring," UK National Cyber Security Centre, https://www.ncsc.gov.uk/collection/cyber-assessment-framework/caf-objective-c-detecting-cyber-security-events/principle-c1-security-monitoring
- Finding: Effective triage requires context about threats, systems, normal behavior, runbooks, records of triage, categorization by priority, and workload levels that do not create alert fatigue.
- Decision changed: The UI is built around a short focus queue with why-this-matters evidence, runbook steps, workload routing, and audit trail. It deliberately avoids showing every signal as an equal alert.

### 8. SANS 2024 SOC Survey

- Source: "SANS 2024 SOC Survey: Facing Top Challenges in Security Operations," SANS Institute, https://www.sans.org/white-papers/sans-2024-soc-survey-facing-top-challenges-security-operations
- Finding: The survey highlights lack of automation/orchestration, budget opacity, staffing constraints, and operational maturity gaps in SOCs.
- Decision changed: The product targets lean teams that need workflow compression: deduplicate, prioritize, route, and verify. The demo includes one-click owner assignment and action-pack generation instead of only visualization.

### 9. Cloud Security Alliance State of Security Remediation 2024

- Source: "The State of Security Remediation 2024," Cloud Security Alliance, https://cloudsecurityalliance.org/artifacts/the-state-of-security-remediation-survey-report
- Finding: CSA reports only 23% of organizations have full cloud visibility, 63% consider duplicate alerts a moderate-to-significant challenge, 61% use 3-6 detection tools, and many teams spend substantial time on manual alert work.
- Decision changed: The product's differentiator is "deduplicated remediation packs" and confidence/evidence displays. The queue shows affected assets, repeated root cause, and ownership rather than raw alert counts.

### 10. Verizon 2026 DBIR Announcement

- Source: "Vulnerability exploitation top breach entry point, 2026 industry-wide DBIR finds," Verizon, https://www.verizon.com/about/news/breach-industry-wide-dbir-finds
- Finding: Verizon states that vulnerability exploitation became the top breach entry point in the 2026 DBIR announcement, with software flaws cited as 31% of breaches in its summary.
- Decision changed: The GTM narrative leads with reducing exploited-vulnerability exposure windows rather than generic posture scoring. Vulnerability exploitation becomes the board-level pain.

### 11. Microsoft Defender XDR Incident Queue

- Source: "Prioritize incidents in the Microsoft Defender portal," Microsoft Learn, https://learn.microsoft.com/en-us/defender-xdr/incident-queue
- Finding: Defender's incident queue aggregates alerts into incidents, supports filtering, shows priority reasoning, recommended actions, tags, assignment, and comments.
- Decision changed: The demo borrows the strongest operational IA pattern: a queue, a selected detail pane, priority explanation, owner/status controls, and recommended actions.

### 12. Tenable Exposure Management Documentation

- Source: "Tenable Exposure Management Platform Documentation," Tenable, https://docs.tenable.com/exposure-management.htm
- Finding: Tenable positions exposure management around visibility across modern attack surfaces, prioritization to prevent likely attacks, and communication of cyber risk.
- Decision changed: Market category is validated as exposure management, but differentiation should be workflow proof rather than only visibility. The product emphasizes owner-ready remediation and verification.

### 13. Qualys Enterprise TruRisk Management

- Source: "Enterprise TruRisk Management Overview," Qualys Docs, https://docs.qualys.com/en/etm/latest/
- Finding: Qualys describes a risk operations platform that discovers assets, aggregates risk signals, enriches with threat intelligence, adds business context, prioritizes threats, and tracks risk reduction.
- Decision changed: The product needs an information model spanning assets, findings, business entities, risk factors, remediation actions, and risk trend history. It should assume integrations with scanners, CMDB, identity, cloud, and ITSM.

### 14. Wiz Security Graph

- Source: "Wiz Security Graph: How It Works, Benefits, Use Cases," Wiz, https://www.wiz.io/lp/wiz-security-graph
- Finding: Wiz emphasizes attack-path analysis, code-to-cloud correlation, blast-radius mapping, and data security mapping.
- Decision changed: The demo includes a simple attack-path visualization and uses blast-radius and owner correlation to explain why a vulnerability rises above other work.

### 15. Axonius Asset and Action Center Documentation

- Sources:
  - "The Asset Intelligence Platform," Axonius, https://www.axonius.com/
  - "Action Center Overview," Axonius Docs, https://docs.axonius.com/docs/ec-overview
- Finding: Axonius emphasizes asset intelligence, resolving unknowns, automating enrichment/tickets/enforcement, and closing control gaps.
- Decision changed: The product should not pretend to replace source tools; it should normalize and reconcile them. Assignment, ticketing, and verification are first-class workflows.

### 16. WCAG 2.2

- Source: "What's New in WCAG 2.2," W3C Web Accessibility Initiative, https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Finding: WCAG 2.2 adds criteria around focus visibility, target size, dragging alternatives, consistent help, and accessible authentication.
- Decision changed: Dense operational UI still needs keyboard-visible focus, non-color-only status indicators, adequate button targets, readable contrast, and no drag-only interactions. The demo uses buttons, text labels, and focus styles rather than hidden hover-only controls.

### 17. MITRE ATT&CK Data and Tools

- Source: "ATT&CK Data & Tools," MITRE ATT&CK, https://attack.mitre.org/resources/attack-data-and-tools/
- Finding: ATT&CK Navigator is used to visualize defensive coverage, planning, frequency of detected techniques, and more.
- Decision changed: The product uses MITRE technique chips as context, but does not turn the whole experience into an ATT&CK matrix. Technique mapping is evidence for prioritization and reporting.

## Competitor and Category Map

- **Exposure management / risk operations:** Tenable One, Qualys Enterprise TruRisk Management, Axonius Exposures, Rapid7 Exposure Command. Strength: broad aggregation and risk scoring. Gap: teams still need explainable owner-level remediation workflows.
- **Cloud-native application protection / cloud security:** Wiz, Palo Alto Prisma Cloud, Orca Security. Strength: cloud context, attack paths, code-to-cloud graphs. Gap: non-cloud endpoint/SaaS/identity and cross-owner remediation orchestration can remain fragmented.
- **SIEM/XDR/SOC:** Microsoft Defender XDR, CrowdStrike Falcon, Splunk, Google SecOps. Strength: detection, incident queue, endpoint telemetry, response. Gap: vulnerability and exposure remediation has different owners, SLAs, and verification loops.
- **ITSM/SOAR:** ServiceNow, Jira, Cortex XSOAR. Strength: workflow automation. Gap: they do not usually decide the security priority or prove exploit/business context without upstream enrichment.

## Information Architecture Lessons

The dashboard should start with decision pressure, not summary vanity metrics:

1. **Today queue:** exposures requiring action, sorted by explainable priority.
2. **Selected exposure:** attack path, evidence, affected assets, owner, remediation steps, SLA.
3. **Business impact:** affected business service, value at risk, blast radius, risk trend.
4. **Work coordination:** assignment, status, exception rationale, ticket state, comments.
5. **Verification:** control/source freshness, retest status, residual risk, audit trail.

## Metrics and Visualizations

- **Exposure risk trend:** line/area chart over time to show risk reduction, not only counts.
- **Priority queue:** ranked table/list with score, action bucket, due date, owner, evidence.
- **Attack path:** compact node-link visualization for "internet -> vulnerable workload -> privileged identity -> sensitive data."
- **Root-cause bars:** grouped bars by cause so leaders can fund systemic fixes.
- **SLA heat:** due/overdue labels and progress bars for remediation capacity planning.
- **Confidence/evidence:** source freshness and signal chips to support trust.

## Accessibility and Responsive Considerations

- Use text plus color for severity and status.
- Preserve visible focus rings and keyboard-operable controls.
- Avoid horizontal tables on mobile; convert queue rows into stacked cards.
- Keep tap targets at least 24px and preferably 40px for primary controls.
- Keep charts supplementary; expose their values as text summaries nearby.
- Use dense but readable typography; no viewport-scaled type.

## GTM Patterns

- **Initial buyer:** CISO, VP Security, Director of Security Operations, Director of Infrastructure Security.
- **Economic buyer trigger:** board concern after exploited vulnerability news, breach involving a peer, audit finding around patch SLAs, tool consolidation, or risk reduction mandate.
- **Champion:** vulnerability management lead or security engineering manager drowning in duplicate findings and owner disputes.
- **Packaging hypothesis:** priced by asset count and integration tier; core includes ingest, prioritization, action packs, and verification; enterprise adds custom risk model, exception governance, executive reporting, and ServiceNow/Jira bidirectional sync.
- **Wedge narrative:** "Turn thousands of scanner findings into the 12 owner-ready fixes that reduce the most exploitable business risk this week."
