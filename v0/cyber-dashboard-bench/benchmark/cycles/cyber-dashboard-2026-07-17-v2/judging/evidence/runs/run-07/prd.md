# PRD — Terra Exposure Command

## Thesis and positioning

Terra is an **exposure remediation command** for regulated, mid-market organizations that already own scanning and asset tools but cannot reliably turn high-risk findings into accountable fixes. Its promise: *every priority is explainable, owned, and auditable.* Unlike a vulnerability scanner, Terra prioritizes confirmed exploitation, external reachability, business service tier, and available mitigation; it does not claim to detect every vulnerability.

Primary user: vulnerability management lead / lean SecOps manager. Secondary users: infrastructure and application service owners; CISO/risk leader as weekly consumer. Buying trigger: a KEV-related near miss, audit finding, cyber-insurance renewal, or inability to show remediation ownership.

## Jobs, scope, and non-goals

The lead needs to identify the small set of exposures worth interrupting a team for, hand one to the correct owner with proof, monitor the commitment, and produce an auditable decision trail. Owners need a specific asset, rationale, due date, and remediation path—not a raw CVE export.

MVP scope: ingest normalized findings and asset context; calculate/explain priority; show daily queue; assign and track remediation; record risk acceptance; send tickets and export reporting. Non-goals: endpoint detection, active blocking, vulnerability scanning, exploit validation, patch deployment, or autonomous risk acceptance.

## Core workflow and requirements

1. Lead opens Command and sees the highest-consequence decision. Acceptance: top item is backed by at least two named signals and a visible score explanation.
2. Lead opens an exposure brief. Acceptance: asset, CVE, reachability, service tier, evidence provenance/time, proposed owner, and due date are visible.
3. Lead assigns/starts remediation or records a time-bounded accepted risk. Acceptance: action records actor, timestamp, rationale, owner, target date, and changes the queue status.
4. Owner receives a linked ticket and updates evidence. Acceptance: ticket state maps back to Terra without silent overwrites; conflicts surface for review.

Demo implementation: selection, filtering, assignment-to-in-progress, risk acceptance, and analyst notes work in-browser and persist via `localStorage`. The footer clearly says all content is fictional. There is no live integration or real security control.

## Model and integrations

`Exposure`: ID, CVE, finding source, detection time, exploit/KEV state, affected asset, remediation, status, evidence, score/version. `Asset`: canonical ID, hostname, internet reachability, environment, service, business tier, owner, CMDB confidence. `Decision`: assigned/accepted/resolved state, actor, rationale, target date, ticket reference, immutable audit event.

Initial connectors: scanner (Tenable/Qualys/Rapid7), EASM, CMDB, Jira/ServiceNow, SSO/SCIM, CISA KEV and threat intelligence. Syncs are idempotent and provenance-tagged. The scoring policy is versioned: KEV, exposed service, crown-jewel route, and compensating controls are visible inputs; it must never be presented as a probability of breach.

## Trust, security, and permissions

SSO with SAML/OIDC; SCIM groups; least-privilege roles: Viewer, Analyst, Remediation Owner, Risk Approver, Admin. Enforce tenant isolation, encryption in transit/at rest, connector-secret vaulting, signed webhook validation, retention controls, and export logging. Risk acceptance requires an approver, expiry, rationale, and an immutable audit event. Evidence must retain source and observed-at time. Production must distinguish unavailable/stale source data from a clean finding set.

## Activation, measures, GTM

Onboarding maps scanner assets to services/owners, verifies a “first KEV path,” then creates the first ticket. Activation = one connected source, 80% of critical assets mapped to an owner, and one remediation action within seven days. Track time to acknowledge, median/95th time to fix KEVs, overdue commitments, owner coverage, re-open rate, and accepted-risk expiry rate—not raw alert volume.

Packaging hypothesis: Essentials (scanner + KEV prioritization), Command (CMDB/ticket integrations, SLA and reporting), and Regulated (SSO/SCIM, audit export, dedicated retention). Start founder-led with insurance brokers, IR firms, and MSSP referral partners. Narrative: “You do not need another scanner; you need a defensible way to decide what gets fixed today.”

## Risks and roadmap

Key risks: poor CMDB ownership, connector quality, contentious business-tier data, and score over-trust. Mitigate with confidence labels, manual overrides with audit, source freshness indicators, and transparent policy versioning. Next: ticket bi-directional sync, exception-expiry campaigns, service-path graph, owner nudges, weekly executive packet, then remediation-window forecasting. Validate willingness to pay and the required connector set before claiming platform breadth.
