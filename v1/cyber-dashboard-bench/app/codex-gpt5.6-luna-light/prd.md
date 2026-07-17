# PRD — Signalroom

## Thesis and positioning

Signalroom is an explainable exposure-triage workspace for lean security teams. It turns cross-tool cloud findings into a ranked queue with a reason, accountable owner, next best action, and closure evidence. Promise: “Every urgent exposure has a reason and a person.”

Primary user: security lead at a cloud-native company with 20–200 employees. Secondary users: platform engineer and application/data owner. JTBD: decide what matters today, route it without a meeting, and demonstrate progress to leadership. Buying trigger: a customer questionnaire, audit, near miss, or cloud finding backlog that no longer fits in spreadsheets.

## Scope

In scope: overview, ranked triage queue, severity/search filters, finding detail, explainability, owner/status, remediation action, activity, source coverage, responsive behavior, demo persistence. Out of scope: scanning, exploit execution, auto-remediation, authentication, production credentials, ticket mutation, compliance certification.

Core workflow: connect a source (future), normalize finding → enrich asset, reachability and identity context → rank → review rationale → assign owner → remediate in the system of record → ingest evidence → close. Acceptance: a user can select, filter, understand, assign/mark remediated a finding; queue count updates; no fake live integrations are implied; desktop and 375px layouts remain usable.

## Data and trust model

Finding {id, source, title, severity, asset, assetCriticality, reachability, exploitSignal, owner, status, firstSeen, dueAt, evidence, activity}. Demo data is seeded and visibly labeled. Future integrations: AWS/GCP/Azure, GitHub, Okta, Jira/Linear; read-only first, least-privilege OAuth. Risk score is explainable weighted context, never a replacement for analyst judgment.

Security requirements: SSO/SAML, SCIM, tenant isolation, encryption in transit/at rest, least-privilege connectors, RBAC (admin, analyst, owner, viewer), immutable audit log, retention controls, export/delete controls, secret rotation and regional data residency options. Every write requires actor/time and before/after state.

## Activation, metrics and GTM

Activation is reached when a team imports one source, reviews five findings, assigns three owners, and closes one. Retention: weekly queue review and evidence-backed SLA reporting. Track time-to-first-connected-source, first assignment, queue review completion, accepted-risk rate, MTTR, critical SLA breach rate, weekly active reviewers, source coverage, and false-positive feedback.

Packaging hypothesis: Free demo/self-serve up to 3 sources and 25 findings; Team $1,500/month up to 10 sources; Scale custom with SSO, SCIM, audit export and data residency. Launch with a “close the top 10 exposures in one afternoon” guided assessment, cloud engineering communities, security consultants and design partners. Narrative: context is valuable only when it produces accountable action.

Risks: noisy source data, disputed ownership, scoring distrust, connector permissions, crowded CNAPP market. Dependencies: normalization schema, asset graph, ticket API, SSO, evidence ingestion. Unknowns: willingness to pay for a decision layer, benchmark for ranking quality, ideal initial cloud. Roadmap: v1 import + Jira/Slack handoff; v1.5 attack-path graph and policy simulations; v2 bi-directional evidence and guided remediation; later benchmarked risk scoring.
