# PRD — Relay

## Thesis and positioning

Relay is an exploited-exposure response cockpit for lean security teams that already own scanners and EDR. It turns the small set of exposures attackers are most likely to use into an explainable, accountable remediation commitment. **Promise:** “Every urgent exposure has a reason, an owner, a deadline, and proof of the decision.” It is not a scanner, SIEM, or ticketing replacement.

## Users and buying trigger

Primary user: a vulnerability-management lead/security engineer who triages findings and must persuade infrastructure owners. Secondary users: asset owners, incident responders, CISO/VP Security. Purchase is triggered when a KEV, audit finding, or board request reveals that teams cannot explain remediation priority or demonstrate follow-through.

Jobs: decide the next safe action; collect an owner commitment; use a temporary mitigation when patching is unsafe; prove the result. Pains: CVSS-based queues, incomplete ownership, context split across tools, exceptions that disappear in chat, and executive reporting that obscures risk.

## Scope and workflow

1. Ingest normalized assets, findings, KEV/exploit intelligence, EDR posture, and CMDB ownership.
2. Score a finding from exploit evidence, exposure/reachability, asset criticality, and control gaps; retain factor-level rationale.
3. Operator opens a top item, reads the attack-path explanation and evidence, chooses patch/mitigate/investigate, assigns an owner and due date, and records a note.
4. The owner updates status; closure requires a validation signal. A temporary exception has an approver, expiry, compensating control, and audit event.
5. CISO views commitments, overdue items, and exposure trend.

Non-goals: autonomous patch deployment, malware detection, a generalized GRC suite, creating an authoritative CMDB, or claiming real-time control validation in this demo.

## Requirements and acceptance criteria

- Ranked work queue shows priority, asset, owner, due date, and human-readable rationale. A user can filter urgent work and select an item. **Accept:** the top item is visibly KEV + internet-facing + critical, and all factors remain inspectable.
- Evidence drawer has recommendation, source signals, attack-path summary, and activity history. **Accept:** a user can understand why an item is ranked without leaving the view.
- Actions allow assignment, mitigation selection, acknowledge, and completion. **Accept:** status and owner update immediately; activity is appended; state survives refresh in localStorage.
- Queue has ready, empty, and elevated-attention states. **Accept:** completing all seeded urgent work displays a calm zero-urgent state and an option to restore demo data.
- Demo data is unmistakably labeled and no control claims imply live integrations.

## Data model and integration assumptions

`Finding` joins CVE/package, asset, source, exploit signals, score factors, recommendation, workflow status, owner, due date, evidence, exception, and immutable activity events. `Asset` has tier, environment, internet exposure, business service, owner, and control posture. Integrations: scanner/SBOM, EDR, cloud/attack-surface inventory, CMDB/IdP, CISA KEV, service desk. Normalization is event-driven; source timestamps and confidence accompany every signal.

## Trust, security, and permissions

Tenant isolation, SSO/SAML, SCIM, RBAC (viewer, operator, asset owner, approver, admin), field-level source provenance, tamper-evident audit export, least-privilege integration scopes, encryption in transit/at rest, retention controls, and no secrets in finding notes. Closure and exception approval are separately permissioned. Scores must show contributing factors and source freshness; customers can tune policy, but no opaque automated closure.

## Activation, metrics, and GTM

Onboard by connecting a scanner and asset source, mapping owners, selecting crown-jewel services, then reviewing five candidate paths. Activation: first accountable decision within 24 hours. Retention: weekly commitment review and monthly risk-reduction export.

Track time-to-owner, KEV exposure age, % urgent items with a commitment, on-time validated closure, exception expiry compliance, score override rate, and owner reopen rate—not “number of vulnerabilities found.” Pricing hypothesis: annual SaaS priced by internet-facing assets, with a Team tier for one business unit and Business tier for SSO, service-desk sync, and executive reporting. GTM: security engineering design partners, scanner/EDR co-sell integrations, and an “exploited exposure review” workshop.

## Risks and roadmap

Risks: weak asset identity/ownership, false reachability, and workflow rejection if it duplicates tickets. Mitigate with confidence/provenance, CMDB reconciliation, deep ticket links, and policy calibration. Post-demo: live connector framework, two-way ticket sync, exception approvals, attack-path evidence graph, exportable board narrative, then policy-guided bulk remediation. Unknowns to validate: willingness to pay for the collaboration layer, calibrating score factors by vertical, and whether asset owners adopt Relay directly.
