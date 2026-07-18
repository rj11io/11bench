# Patchline Research

Access date for all sources: July 16, 2026.

## Research Goal

The strongest product opportunity is not another generic security dashboard. Modern security teams already own scanners, SIEMs, EDRs, ticket queues, and cloud posture tools. The painful gap is deciding which exposures matter now, explaining why, and mobilizing the right owner before attackers exploit the same path. Patchline is therefore scoped as a CTEM-style exposure prioritization and remediation command center for lean security teams at mid-market SaaS companies.

## Sources, Findings, and Product Decisions

### CISA Known Exploited Vulnerabilities Catalog

URL: https://www.cisa.gov/known-exploited-vulnerabilities-catalog

Finding: CISA describes KEV as an authoritative source of vulnerabilities exploited in the wild and recommends that organizations use it as an input to vulnerability-management prioritization. KEV entries include required actions and due dates for federal agencies, and CISA urges broader organizations to prioritize timely remediation.

Decision changed: Patchline treats known exploitation as a top risk driver and displays KEV evidence separately from generic severity. The demo queue puts KEV and internet exposure ahead of high-CVSS-only findings.

### FIRST Exploit Prediction Scoring System

URL: https://riskbasedprioritization.github.io/epss/Introduction_to_EPSS/

Finding: EPSS estimates the probability that a CVE will be exploited in the next 30 days and is intended to help defenders prioritize remediation tradeoffs. FIRST notes that evidence of active exploitation should supersede EPSS because EPSS is pre-threat intelligence.

Decision changed: Patchline combines EPSS with KEV, asset exposure, sensitive data, and business impact. The UI shows EPSS as one driver, not the whole score.

### NIST SP 800-40 Rev. 4, Guide to Enterprise Patch Management Planning

URL: https://csrc.nist.gov/pubs/sp/800/40/r4/final

Finding: NIST frames enterprise patch management as identifying, prioritizing, acquiring, installing, and verifying patches. It highlights the divide between business/mission owners and security/technology management and recommends operationalizing patching to reduce risk.

Decision changed: Patchline’s core workflow includes verification criteria and owner-ready handoff, not only finding display. The product promise is mobilization, not detection.

### CIS Critical Security Controls v8 Navigator

URL: https://www.cisecurity.org/controls/cis-controls-navigator/v8

Finding: CIS emphasizes accurate asset inventory, software inventory, account controls, continuous vulnerability management, and risk-based remediation. Control 7 includes a documented vulnerability management process and risk-based remediation strategy.

Decision changed: The data model includes owner, asset, service, inventory context, and exposure type. Unowned assets are visible as a risk because remediation cannot happen without accountable ownership.

### NIST Cybersecurity Framework 2.0

URL: https://www.nist.gov/cyberframework

Finding: CSF 2.0 organizes cybersecurity risk management around Govern, Identify, Protect, Detect, Respond, and Recover. NIST positions the framework as a way to understand, reduce, and communicate cybersecurity risk.

Decision changed: Patchline is positioned as an operational bridge between Identify/Govern context and Respond/Protect remediation action. Executive risk language is present but the primary user remains operational.

### Microsoft Defender XDR Incident Queue

URL: https://learn.microsoft.com/en-us/defender-xdr/incident-queue

Finding: Defender’s incident queue aggregates related alerts into incidents, uses prioritization, explains scoring factors, supports filtering, assignment, status, comments, and recommended actions.

Decision changed: Patchline borrows the proven pattern of an explainable queue plus side panel, but applies it to exposures and remediation. The demo includes filters, priority reasons, assignment, notes, and status changes.

### Splunk Enterprise Security Risk-Based Alerting

URL: https://help.splunk.com/en/splunk-enterprise-security-7/risk-based-alerting/7.3/introduction/how-risk-scores-work-in-splunk-enterprise-security

Finding: Splunk risk scores aggregate activity for assets or identities over time and use impact and confidence to calculate relative risk. Splunk also cautions that scores must be tuned to the environment.

Decision changed: Patchline must show why a score exists and avoid presenting the risk number as objective truth. The demo labels all data as seeded examples and exposes score drivers.

### Wiz Exposure Management

URL: https://www.wiz.io/solutions/exposure-management

Finding: Wiz positions exposure management around unifying findings, enriching them with business/security context, validating external exploitability, deduplicating, assigning ownership, and enabling remediation workflows.

Decision changed: The wedge must avoid competing as a broad CNAPP. Patchline focuses on customers with existing scanners that need a trusted prioritization and mobilization layer across scanner, CMDB, KEV, and ticketing inputs.

### Wiz Vulnerability Prioritization

URL: https://www.wiz.io/academy/vulnerability-management/vulnerability-prioritization

Finding: Wiz argues that high-CVSS alert floods are insufficient and that prioritization should use actual environment context such as internet exposure, identities, sensitive data, misconfigurations, and attack paths.

Decision changed: The demo’s most important visualization is not a severity pie chart; it is an attack path and ranked evidence list.

### SANS State of Automation in Security Operations Survey

URL: https://www.sans.org/white-papers/state-automation-security-operations-sans-survey

Finding: SANS reports that security teams use many tools, face engineering effort and cost barriers to automation, and commonly measure MTTD/MTTR. Vulnerability management and data enrichment are common automation areas.

Decision changed: Patchline avoids a heavy SOAR promise. It starts with low-friction enrichment, owner mapping, and ticket-ready handoff, with automation gated by human review.

### ACM Computing Surveys: Alert Fatigue in Security Operations Centres

URL: https://doi.org/10.1145/3723158

Finding: The 2025 literature review identifies alert fatigue and burnout in SOCs, reviews automation/augmentation/human-AI collaboration, and highlights the need to mitigate fatigue without removing human judgment.

Decision changed: The demo includes explainability and manual state changes rather than black-box auto-remediation. The product’s AI-like summary is framed as evidence synthesis, not autonomous control.

### Verizon 2025 Data Breach Investigations Report

URL: https://www.verizon.com/business/resources/reports/dbir/

Finding: Verizon reported growth in vulnerability exploitation as an initial access path and highlighted third-party involvement and ransomware as major breach factors.

Decision changed: Patchline’s GTM narrative leads with preventing exploit-driven breach paths on perimeter and business-critical systems, not generic compliance reporting.

### IBM Cost of a Data Breach Report 2025

URL: https://www.ibm.com/reports/data-breach

Finding: IBM reported a global average breach cost of about $4.4M and savings from extensive use of AI/security automation, while warning that ungoverned AI expands risk.

Decision changed: Patchline can justify ROI around faster identification/containment and reduced manual triage, but must keep governance/auditability explicit if using AI-generated explanations.

## Buyer and User Segments

Primary user: security engineering or vulnerability-management lead at a 250-2,500 employee SaaS company. They own vulnerability SLAs but do not control every engineering backlog.

Secondary users: application/platform owners receiving remediation work, SOC manager consuming exposure context during incidents, CISO needing credible risk reduction metrics.

Buyer: CISO, VP Security, or Director Security Engineering. Buying trigger is a failed audit, board concern after a peer breach, ransomware/KEV emergency, cyber insurance renewal, or scanner backlog that engineering no longer trusts.

## Category and Competitor Landscape

Representative categories:

- Vulnerability management: Tenable, Qualys, Rapid7.
- CNAPP/exposure management: Wiz, Palo Alto Cortex Cloud, Microsoft Defender Cloud Security Posture Management.
- SIEM/XDR/SOC operations: Microsoft Defender XDR, Splunk Enterprise Security, Palo Alto Cortex XSIAM.
- Ticketing/work management: Jira, ServiceNow.

Patchline wedge: an exposure mobilization layer for teams that already have scanners and ticketing. It is not the scanner of record, SIEM, CNAPP, or SOAR platform. It earns adoption by making the top 20 exposures defensible and owner-ready every week.

## Dashboard and IA Implications

High-quality security dashboards for this wedge need:

- A ranked queue, not a widget collage.
- Score drivers visible at the decision point.
- Evidence and confidence grouped with each exposure.
- Ownership and status controls adjacent to remediation guidance.
- Program metrics that show risk burn-down, ownership coverage, SLA pressure, and accepted risk.
- Empty and high-attention states that support triage, not drama.

## Metrics and Visualizations

Useful metrics:

- Critical open exposures.
- Internet-facing KEV count.
- Percentage of critical exposures with owners.
- Mean time to triage and remediate.
- SLA due soon/overdue.
- Risk accepted by business service.
- Validation pass rate after remediation.

Chosen visualizations:

- Ranked queue for operational prioritization.
- Driver cards for explainability.
- Attack-path chain for why context changes priority.
- Compact bar trend for high-attention exposure count.
- Owner/status controls for workflow completion.

Avoided visualizations:

- Pie charts of severity because severity alone causes false urgency.
- Large geographic maps because the selected wedge is not geo-operations.
- Decorative cyber imagery because dense operational tools need scanability.

## Accessibility and Responsive Findings

Dense security tools must remain keyboard-accessible, readable, and responsive. The implementation uses semantic buttons, labels, high-contrast status colors, visible text labels next to icons, stable card dimensions, and a single-column mobile layout. It avoids horizontal tables on mobile and keeps workflow controls adjacent to the selected exposure.

## GTM Implications

Positioning: "From scanner backlog to trusted remediation queue in one week."

Initial market: mid-market SaaS and fintech security teams that use Tenable/Qualys/Rapid7 plus Jira or ServiceNow but lack a mature CTEM program.

Motion: product-led security-engineering evaluation using read-only imports first, then Jira/ServiceNow writeback. Sell through a risk-reduction pilot: pick the top 50 internet-facing and sensitive-data exposures, prove owner mapping, cut triage time, and report validated mitigation.
