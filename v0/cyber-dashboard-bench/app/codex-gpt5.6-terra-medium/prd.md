# Terra PRD — Exposure decisions, not more findings

## Thesis and positioning

**Terra** is an exposure-to-remediation command center for cloud-native B2B SaaS security teams. It converts corroborated signals into a bounded, explainable mitigation decision with a named owner and proof of completion. Its promise: *every urgent exposure has a defensible next action before it becomes another forgotten finding.*

Terra is positioned between vulnerability/exposure tools and work-management systems. It does not replace scanners, cloud posture tools, SIEM, EDR, or ticketing. It assembles their decision-relevant evidence and makes the remediation loop observable.

## Users, demand and JTBD

Primary user: a security engineering lead / Head of Security at a 100–1,000-person SaaS company, often coordinating platform and application teams. Secondary users: platform engineering owner, product engineering manager, and a risk/compliance leader who needs a defensible record.

When a material product exposure appears, the lead wants to decide what needs attention today, explain why to the responsible team, choose patch/mitigate/accept, and later prove the result—without manually reconciling five tools. Pain: severity-only queues, unclear service ownership, noisy duplicate findings, undocumented exceptions and stale tickets. Buying trigger: a customer security review, new cloud/security leader, board request, incident near-miss, or an urgent KEV affecting public-facing infrastructure.

## Scope and core workflow

In scope: ingest normalized synthetic/connected findings; correlate CVE, asset, internet exposure and business service; score/rank; explain evidence; create a remediation plan; assign owner and due date; track verification and append-only activity; report time-to-decision and risk reduction. The demo implements the workflow with a seeded “Atlas edge gateway” KEV exposure: open it, assign or choose mitigation, resolve it, and persist that state locally.

Out of scope: scanning, exploit validation, patch deployment, incident response command, automated risk acceptance, asset inventory authoring, and making compliance claims.

Acceptance criteria:

- An urgent exposure always exposes exploit evidence, affected service, reachability, owner, target date and recommended action.
- A user can open an exposure, select Patch / Mitigate / Accept temporarily, assign ownership and save; decisions remain after reload in the demo.
- Resolving an item changes queue/posture state and records an activity event; a safe empty “clear queue” state is reachable.
- The interface labels all values as demo data and never implies connectors are live.
- The experience is keyboard-operable and usable at 375px without horizontal document overflow.

## Data, integrations and trust

Core entities: `Exposure` (risk score, state, SLA, rationale), `Finding` (source, CVE/CWE, severity, observed time), `Asset` (cloud identifier, reachability, environment, criticality), `Service` (business owner, tier), `Evidence` (KEV, EPSS, control/telemetry), `Decision` (path, owner, due date, justification), `WorkItem` (external ticket), and append-only `Activity`.

Initial integrations: AWS Security Hub / resource inventory, Wiz or Tenable finding import, GitHub code/owner metadata, Jira tickets and CISA KEV/EPSS enrichment. Each source is timestamped, permitted by least privilege, and shown with freshness. Correlation confidence is observable. Production requires tenant isolation, encryption in transit/at rest, SSO/SAML, SCIM, RBAC (viewer, contributor, security admin, auditor), immutable audit events, export controls, configurable retention and no remediation action without a human approval. Connector access is read-only by default.

## Activation, metrics and GTM

Onboarding asks for one cloud account, a scanner and Jira; maps 10 critical services and owners; then previews the first ten corroborated exposures. Activation = one connected source + owner mapping + first decision recorded within seven days. Retention is the weekly exposure-review ritual plus Jira verification loop.

Product metrics: time to decision, urgent exposures with owner, % completed inside policy, median verification lag, queue aging, stale-source rate, overridden recommendation rate and risk score reduction. Avoid vanity counts of findings.

Pricing hypothesis: $2,000/month platform fee including 5 integrations and 25 services; growth tier by service count and workflow integrations, annual security-engineering-led sale. Launch with a design-partner cohort of SaaS companies that already own a scanner but struggle to report remediation accountability. Narrative: “Turn exploitable exposure into an owned engineering decision.”

## Risks and roadmap

Risk scores can overstate certainty; show inputs, confidence and human override. Bad ownership data breaks handoff; expose data freshness and allow correction. Jira sync and cloud correlation are dependencies. Post-demo: real ingestion/freshness, policy-as-code SLAs, service ownership graph, ticket sync, evidence snapshots, exception review and executive trend reporting. No autonomous remediation until customers validate the decision loop.
