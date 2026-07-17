# Harbor research — path-to-owner exposure remediation

**Research completed:** 2026-07-16. URLs below were accessed on that date. This is desk research for a product concept, not a claim that the demo has these integrations or controls.

## Decision summary

Harbor is an exposure-remediation workspace for a lean security team (one to five security practitioners) supporting a 200–2,000-person cloud SaaS company. Its unit of work is a **verified exposure path**: an externally reachable entry point, a concrete privilege or workload transition, and a named crown-jewel service. It converts the small set of paths worth interrupting into an owned, time-boxed remediation plan with evidence and exceptions. The wedge is deliberately narrower than XDR, CNAPP, or an attack-surface-management platform.

## Sources and findings

| Source | Finding | Product decision changed |
| --- | --- | --- |
| [CISA, *Known Exploited Vulnerabilities Catalog*](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?page=0) | CISA describes KEV as the authoritative source for vulnerabilities exploited in the wild and says organizations should use it as an input to their prioritization framework. | A KEV signal is an explicit, prominent reason on every Harbor priority card; a KEV path starts in the urgent lane rather than being buried in a CVSS sort. |
| [CISA, *CISA Adds Three Known Exploited Vulnerabilities to Catalog*](https://www.cisa.gov/news-events/alerts/2025/04/17/cisa-adds-three-known-exploited-vulnerabilities-catalog) | CISA says the catalog is a living list and urges organizations beyond the federal scope to prioritize timely remediation. | Harbor shows a due-by commitment and remediation status rather than presenting a one-time posture score. |
| [NIST SP 800-40 Rev. 4, *Guide to Enterprise Patch Management Planning*](https://csrc.nist.gov/pubs/sp/800/40/r4/final) | Enterprise patching belongs in a risk-management process rather than an isolated scanning exercise. The guide includes vulnerability and asset importance in its planning model. | Priority uses business-service criticality and reachable path context in addition to the vulnerability, and fixes can be compensating controls, not only patches. |
| [FIRST, *EPSS User Guide*](https://www.first.org/epss/user-guide.html) | EPSS is a 0–1 estimate of exploitation activity in the next 30 days; FIRST explicitly warns it is one factor, not a risk score. | The interface labels EPSS as “exploit likelihood,” displays its source, and explains why the final path priority is higher. It never relabels EPSS as risk. |
| [FIRST, *The EPSS Model*](https://www.first.org/epss/model) | EPSS refreshes daily and is predictive, not a statement of certainty. | A “refreshed” timestamp and confidence framing are part of the score explanation; changes become an activity event, not a mysterious score change. |
| [Microsoft Learn, *Review attack paths in Microsoft Security Exposure Management*](https://learn.microsoft.com/en-us/security-exposure-management/review-attack-paths) | Current exposure-management workflows use path overview, entry points, targets, choke points, blast radius, grouping, and actionable recommendations. Value depends on accurate data and defined critical assets. | Harbor uses a concise route diagram, named target service, affected asset count, and a one-action “choke point” recommendation. It makes data freshness and confidence visible. |
| [Google Cloud, *Overview of attack exposure scores and attack paths*](https://docs.cloud.google.com/security-command-center/docs/attack-exposure-learn) | Attack-exposure scoring makes high-value-resource designation material; a non-zero score indicates a simulated public-internet path, and scores may change after simulations. High-score choke points can be more valuable to fix than a single finding. | Harbor requires a service-tier/crown-jewel tag before calling a path “critical,” foregrounds path interruption leverage, and preserves an explanation of assumptions. |
| [Microsoft Learn, *Start using Microsoft Security Exposure Management*](https://learn.microsoft.com/en-us/security-exposure-management/get-started-exposure-management) | A useful overview starts with a posture snapshot, supports scoped filtering, and lets users drill into critical assets and events. | Dashboard hierarchy is: work needing a decision, exposure trend / coverage, then the selected work item. Filters persist locally in the demo and should persist per user in production. |
| [Microsoft Learn, *Threat Response in the Defender Portal*](https://learn.microsoft.com/en-us/unified-secops/respond-threats-overview) | Treating potential attack paths like incidents enables proactive mitigation, combining a path analysis with remediation recommendations. | Harbor borrows incident-workflow discipline—owner, status, decision log, SLA, and verification—without pretending a potential path is an active incident. |
| [W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*](https://www.w3.org/TR/WCAG22/) and [*What’s New in WCAG 2.2*](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) | WCAG 2.2 adds minimum target-size, focus-not-obscured, and predictable interaction requirements relevant to dense, keyboard-driven operational software. | Cards are semantic buttons, color never carries priority alone, focus is deliberately visible, controls retain text labels, and mobile changes a side inspector into a full-width details flow. |

## Buyer and user analysis

### Primary user: the security generalist / vulnerability-program lead

This user owns a fragmented daily loop: review scanner and cloud findings; determine whether an issue is exploitable in *their* environment; locate an engineering owner; negotiate a deadline; track an exception; and prove that the risk actually fell. They do not need another raw event feed. Their pain is attention allocation and reliable handoff across security, platform, and application teams.

Harbor’s first customer profile is a cloud-native B2B SaaS company with AWS and an identity provider, a ticketing system, and an existing scanner or CNAPP. It has security pressure from enterprise customers, board review, or cyber insurance, but does not have the staffing to operate a large bespoke SIEM/SOAR program.

### Secondary users

- **Platform/SRE owner:** needs one precise change and the reason it is urgent, plus a safe way to say blocked or request an exception.
- **Engineering manager / service owner:** needs a view of open commitments by service and evidence that work was verified, not a global vulnerability backlog.
- **CISO / CTO:** needs a compact answer to “what could reach a crown jewel, who owns the interruption, and are we on time?”

### Buying trigger

An actively exploited CVE, a customer questionnaire that exposes remediation ambiguity, a board request for risk evidence, or a security team discovering that “critical” findings have no named owner prompts evaluation. Existing controls generate too much detection; Harbor sells the missing operating layer between prioritization and completed remediation.

## Category landscape and gap

The adjacent categories are vulnerability management (asset/CVE inventory and patch coordination), CNAPP/CSPM (cloud misconfigurations and workload context), CAASM/EASM (asset discovery and external exposure), and exposure management / attack-path analysis (graph-based reachable risk). Representative current experiences include Microsoft Security Exposure Management and Google Security Command Center’s attack exposure features. Their documentation validates attack paths, crown-jewel designation, score sorting, recommendations, and multi-environment context.

Harbor does **not** claim to out-graph these platforms or replace scanners. It starts after a source system produces a credible path or an analyst assembles one. The differentiation is the “decision packet”: explainable signal inputs, a recommended choke point, accountable human owner, deadline, linked work, compensating control, verification artifact, and auditable decision history in one focused operational view.

## Information architecture implications

Security operations tools are dense because the operator moves from many signals to one decision, then must retain context while taking action. The useful hierarchy is therefore:

1. A work queue that answers *what needs a decision now?*
2. A selected-path inspector that answers *why this is real here, and what single change breaks it?*
3. A commitment area that answers *who will do it, by when, and how will we know?*
4. A thin posture layer—trend, coverage, and aging—for prioritization and leadership context.

The evidence needs progressive disclosure. The first screen shows human-readable reasons (“KEV, public ingress, production payments”), not an opaque 93/100. The inspector exposes raw inputs, source freshness, confidence, and assumptions so an analyst can challenge the result. The UI must distinguish “potential attack path” from incident activity and “demo data” from live telemetry.

## Prioritization and measurement model

The priority order in Harbor is intentionally not CVSS-only:

1. Confirmed exploitation (KEV) or high exploit-likelihood (EPSS),
2. public / reachable entry point,
3. concrete route to a tagged critical service or sensitive-data store,
4. amount of path interruption (choke-point leverage),
5. service impact and remediation deadline,
6. analyst confidence and data freshness.

The product keeps these ingredients separate. EPSS contributes an exploitation likelihood; it is not converted into a fake universal risk number. The outcome metrics are more operational than “findings closed”: time from surfaced path to owner, percent of urgent paths with an acknowledged owner, time to first risk-reducing control, verification latency, overdue commitments, exception expiry, and critical-path coverage. An exposure trend is supportive context, not proof of security.

## Trust, collaboration, and remediation workflow

Trust requires showing provenance, model/scan time, scope, assumptions, and confidence. A recommendation must be inspectable, reversible where possible, and attributable to its author. Operators need to record why an item was accepted, muted, deferred, or disputed; otherwise the queue becomes another opaque alert feed.

The core collaboration loop is: source imports finding → path is deduplicated / confidence-scored → analyst accepts, downgrades, or requests evidence → analyst assigns a service owner and action → owner acknowledges / blocks / completes → security verifies with a new scan or supporting evidence → Harbor records outcome and reopens only if the route persists. Notification should be event- and commitment-based, not a stream of every scanner update.

## Accessibility and responsive observations

Dense operational interfaces need keyboard traversal that preserves row context, strong visible focus, sufficient target size, text plus shape/color for severity, concise table labels, and non-color confidence/reachability cues. On small screens, a persistent three-pane desktop layout becomes a stacked queue then detail view; horizontal tables are replaced with labeled facts. Animated risk signals should respect reduced motion. Empty states should explain whether a filtered queue is empty, data is still connecting, or there are genuinely no verified urgent paths.

## GTM implications

The practical wedge supports a land-and-expand motion: start with a read-only import of one cloud/security source and a service catalog, prove measurable ownership and remediation-cycle improvement for the top 25 paths, then add Jira/Linear and SIEM/EDR connectors. The narrative is not “we find more risk”; it is “we make the few attack routes that matter impossible to ignore—and provably owned.” A security leader can sponsor it; a security generalist can champion it; platform teams receive smaller, better-contextualized requests.
