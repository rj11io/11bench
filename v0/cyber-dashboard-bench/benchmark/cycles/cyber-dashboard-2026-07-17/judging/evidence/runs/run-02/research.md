# Research: Strata Exposure Ops

Access date for all sources: July 16, 2026.

## Selected wedge

Build an exposure-operations dashboard for cloud-native security teams at mid-market and lower-enterprise companies. The product focuses on attack-path choke points, business-aware prioritization, and remediation campaign orchestration. It is not a generic SIEM or executive vanity dashboard.

## Research log

| Topic | Source | Findings | Decision changed |
| --- | --- | --- | --- |
| Exploit-driven prioritization | CISA, "CISA Adds Four Known Exploited Vulnerabilities to Catalog" https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3d53a4a | CISA explicitly pushes organizations to prioritize KEV remediation because actively exploited vulnerabilities are frequent attack vectors. | Prioritization model must elevate exploit evidence above raw severity. The UI needs a visible KEV signal and due-date pressure. |
| CVE volume and triage pressure | NIST, "NIST Updates NVD Operations to Address Record CVE Growth" https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth | NIST reported CVE submissions grew 263% from 2020 to 2025 and shifted to risk-based enrichment, prioritizing KEV and critical software. | Reinforced that a findings-count dashboard is the wrong product. The demo should compress volume into a small set of defended actions. |
| Criticality-based prioritization | NIST IR 8179, "Criticality Analysis Process Model: Prioritizing Systems and Components" https://csrc.nist.gov/pubs/ir/8179/final | NIST frames protection as a finite-resource problem and recommends explicit criticality analysis tied to mission impact. | Added business criticality to the data model and score. Every exposure needs asset tier and business service context. |
| Incident handling expectations | NIST SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management" https://csrc.nist.gov/pubs/sp/800/61/r3/final | Incident response should be integrated with broader risk management, preparation, lessons learned, and coordination. | The product should bridge pre-incident exposure reduction and response readiness, not just surface issues. Added audit notes and campaign verification concepts. |
| Alert fatigue mechanics | Tariq et al., "Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities" https://doi.org/10.1145/3723158 | Alert fatigue is driven by alert volume, velocity, veracity, and variety; triage depends on contextual enrichment and prioritization. | The dashboard needs explainable ranking, clustering, and low-noise states instead of long unstructured queues. |
| Practical noise controls | Google Cloud Docs, "Configure alert suppression" https://docs.cloud.google.com/chronicle/docs/investigation/alert-suppression | Mature SecOps tools reduce duplicate and low-value alerts through throttling, exclusions, and suppressions. | Added workflow states for snoozed/dismissed items and made "suppressed by control" part of rationale so trust stays intact. |
| Remediation workflow reality | Tenable Docs, "Manage the Remediation Lifecycle" https://docs.tenable.com/exposure-management/Content/getting-started/manage-remediation-lifecycle.htm | Operators patch solutions, not individual CVEs; they group findings, create Jira/ServiceNow tickets, assign owners, and verify fixes. | Core workflow became "launch remediation campaign from grouped choke point" instead of per-alert handling. |
| Campaign-based operationalization | Tenable Docs, "Initiatives" https://docs.tenable.com/vulnerability-management/Content/exposure-response/initiatives.htm | Exposure work becomes measurable when findings are turned into initiatives with owners, SLAs, and progress tracking. | The product differentiator became remediation mobilization, not just prioritization. Added campaign rail and progress metrics. |
| Attack-path information architecture | Microsoft Learn, "Overview of attack paths" https://learn.microsoft.com/en-us/security-exposure-management/work-attack-paths-overview | Useful attack-path dashboards summarize paths, choke points, critical assets, and blast radius; path counts fluctuate with environment state. | Added top-line posture cards for attack paths, choke points, and protected crown jewels. Also included a "snapshot freshness" trust indicator. |
| Exposure-management market direction | Palo Alto Networks, "Exposure Management - Administrator Guide - Cortex XDR" https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-5.x-Documentation/Exposure-Management | Modern exposure products normalize third-party scanner data, deduplicate, prioritize, and use fix-oriented case grouping. | Confirmed that the right wedge is a system of action over normalized exposure data, not another scanner console. |
| Add-on / platform GTM pattern | Microsoft Learn, "Integration and Licensing for Microsoft Security Exposure Management" https://learn.microsoft.com/en-us/security-exposure-management/integration-licensing | Exposure management is sold as a platform-adjacent capability with deep integrations and consumption-based external connectors. | GTM should target land-and-expand via existing vuln/cloud/identity tools, with pricing tied to asset tiers and connector scope. |
| Flexible adoption pattern | Tenable press release, "Tenable Accelerates Exposure Management Adoption with New Flexible Pricing for the AI Era" https://tenablenetworksecurity.gcs-web.com/news-releases/news-release-details/tenable-accelerates-exposure-management-adoption-new-flexible | Vendor positioning emphasizes starting where the customer is, predictable spend, and expansion across attack surfaces. | Packaging hypothesis: start with cloud + identity connectors for a named asset band, then expand to broader attack surface modules. |
| Risk communication metrics | Tenable, "Exposure management solutions" https://www.tenable.com/exposure-management | Vendors emphasize business-aligned risk metrics, attack-path visualization, predictive prioritization, and AI-assisted remediation. | Added outcome metrics that combine exposure age, blast radius, and business service impact rather than raw vulnerability totals. |
| Collaboration and auditability | Splunk Docs, "Create, sort, and filter notes in Splunk SOAR (Cloud)" https://docs.splunk.com/Documentation/SOAR/current/User/Notes and "Enable and download audit trail logs in Splunk SOAR (Cloud)" https://docs.splunk.com/Documentation/SOAR/current/Admin/Audit | Security workflows need notes, evidence capture, and audit logs around who changed what and when. | Added activity log, explicit owner fields, and comment history to the core object model. |
| Dense data accessibility | W3C WAI, "Tables Tutorial" https://www.w3.org/WAI/tutorials/tables/ and "Technique H51" https://www.w3.org/WAI/WCAG21/Techniques/html/H51 | Data-heavy dashboards need real table semantics and explicit header associations, not div-based fake grids. | The implementation should use native tables for tabular content and preserve readable card order on mobile. |
| Motion and page navigation accessibility | Next.js Docs, "Accessibility" https://nextjs.org/docs and local repo copy at `node_modules/next/dist/docs/03-architecture/accessibility.md` | Next.js route announcements rely on descriptive titles and headings; animations should respect `prefers-reduced-motion`. | Route-local layout gets a clear title. Visual motion should be subtle and degrade cleanly. |

## Synthesis

### Buyer and user segment

The strongest wedge is not a 24/7 SOC console. It is a product for security engineering or exposure management teams that inherit fragmented findings from vulnerability scanners, cloud security posture tools, identity systems, and external attack surface tools but lack a single operational surface to decide what to fix first and prove risk reduction.

### Painful workflow

The recurring pain is not absence of findings. It is overproduction of findings without business context, exploit context, clear ownership, or grouped remediation actions. Teams waste time arguing about severity while attackers exploit reachable paths.

### Category fit

The category is exposure management with a narrower promise: attack-path remediation operations. The differentiator is not another score. It is turning prioritized choke points into accountable campaigns with visible blast-radius reduction.

### Information architecture implications

The dashboard should:

1. Start with posture compression: paths, choke points, crown-jewel risk, SLA pressure.
2. Move into a prioritized queue of remediation candidates with explainable ranking.
3. Provide a detail view that shows the path, affected assets, rationale, and recommended fix package.
4. Let the user launch or track a remediation campaign without leaving the context.

### Metrics that matter

- Choke points open
- Critical assets exposed
- KEV-linked exposures open
- Exposure age and SLA breach risk
- Blast radius reduced per campaign
- Median days to contain path risk
- Campaign completion rate and verification rate

### GTM implication

The most credible launch motion is sales-led but fast-to-value: ingest from a small connector set, surface a first-week prioritized backlog, and prove that one campaign closes multiple attack paths. This is easier to sell than an abstract "risk platform."
