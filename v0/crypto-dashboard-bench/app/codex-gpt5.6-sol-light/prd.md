# Harbor — product requirements

## 1. Product thesis

Harbor is a B2B stablecoin treasury risk desk for crypto-native finance and operations teams. It turns read-only balances, market/liquidity observations, issuer evidence, custody configuration, and an organization’s treasury policy into a ranked daily review queue and an approval-ready action brief.

**Category:** treasury risk operations, between portfolio visibility and custody execution.  
**Positioning:** Know what your treasury needs reviewed before your signers meet.  
**Promise:** Every exception is quantified, sourced, policy-linked, and convertible into a reviewable draft without putting keys or execution inside Harbor.

The product wins by shortening a recurring decision loop:

`observe → evaluate policy → explain exception → draft response → review externally → resolve`

## 2. Users and buying trigger

### Primary

Finance/treasury lead at a 10–150 person crypto company, foundation, or DAO with $2m–$100m in digital-asset operating liquidity.

Jobs:

- preserve runway and payment capacity;
- keep issuer, venue, chain, and protocol concentration inside policy;
- know whether a price/liquidity change is actionable;
- prepare signer and board review with evidence;
- answer auditor/controller questions reproducibly.

Pains:

- balances, liquidity, issuer disclosures, multisig controls, and policy live in different tools;
- headline price hides exit capacity and correlated exposure;
- spreadsheets go stale and lack ownership/history;
- alerts generate noise without a decision or next step;
- “portfolio recommendations” often omit provenance and governance.

### Secondary

- Controller: valuation evidence, cutoff, exports, change history.
- COO/CFO/foundation director: risk posture, runway, approvals.
- Multisig signer: concise rationale, amount, destination, assumptions.
- External accountant/auditor: scoped evidence and historical snapshots.

### Buyer and triggers

Economic buyer: CFO, COO, foundation director. Champions: treasury lead/controller.

Triggers: funding/token proceeds, prior depeg or venue incident, audit/board request, personnel handoff, new custody venue, formal treasury policy, or treasury exceeding $2m.

## 3. Scope and non-goals

### MVP scope

- read-only public address and supported custody/account ingestion;
- normalized stablecoin positions across EVM/Solana plus offchain venues;
- policy builder for issuer, venue, chain, asset, protocol, price, liquidity, and runway thresholds;
- data health and provenance;
- ranked exception queue;
- scenario/stress view;
- action brief drafting, comments, acknowledgement, assignment, and export;
- immutable policy/finding/action audit log;
- notifications and scheduled executive digest.

### Demo scope

One seeded organization, five accounts, four stablecoin exposures, three chains, one exchange, and one DeFi position. Three scenarios demonstrate healthy, volatile, and risk-focused states. Users can:

- switch scenarios;
- filter findings;
- open a finding;
- compare actual exposure to policy;
- draft/adjust a remediation amount;
- mark a brief ready for review;
- persist scenario, filters, and brief state in localStorage.

### Non-goals

- transaction signing, custody, swapping, routing, or execution;
- yield optimization or performance promises;
- tax lot engine or accounting subledger;
- universal token research;
- consumer portfolio tracking;
- compliance determination, legal advice, or personalized investment advice;
- claiming that register presence, assurance, or price stability means “safe.”

## 4. Core workflows and acceptance criteria

### A. Connect read-only sources

1. User adds address/account with chain, label, entity, purpose, and owner.
2. Harbor verifies format and identifies supported assets.
3. User sees permissions and data scope before saving.
4. Initial snapshot records block/time/source.

Acceptance:

- Harbor never requests a seed phrase/private key.
- Every balance has account, chain, asset contract, source, and observation time.
- Unsupported/partial data is explicit and excluded from calculations by default.

### B. Configure policy

1. Start from a template.
2. Set hard limits and warning bands by dimension.
3. Define eligible runway assets and burn assumption.
4. Assign finding owners and escalation routes.
5. Two-person approval for production policy changes.

Acceptance:

- Rule units and denominator are visible.
- Simulated impact is shown before activation.
- Version, author, approver, and effective time are recorded.

### C. Review daily posture

1. Land on status summary: breaches, dollars affected, runway, and data health.
2. Review ranked findings.
3. Inspect affected positions, rule math, evidence, and uncertainty.
4. Acknowledge, assign, snooze with reason, or draft response.

Acceptance:

- Findings sort first by severity, then dollars affected, then age.
- Each finding answers: what changed, why it matters, measured value vs limit, affected positions, source freshness, and suggested decision.
- Healthy means “inside policy,” never “risk-free.”

### D. Draft action brief

1. Select a finding.
2. Harbor proposes a non-executable policy-remediation draft.
3. User adjusts amount/destination and adds rationale.
4. User marks ready for signer review.
5. Export/deep-link is generated for an external custody workflow.

Acceptance:

- The brief is visibly a draft and cannot execute.
- Before/after policy values recalculate.
- Pricing/slippage assumptions and expiry are visible.
- Reviewer state persists.
- All changes are recorded.

## 5. Functional requirements

### Dashboard

- Snapshot banner with demo/live status, UTC timestamp, and data health.
- KPIs: eligible treasury, runway, policy breaches, estimated exit coverage.
- Exposure stack by issuer/asset and a policy-distance view.
- Findings queue with severity, title, affected value, policy metric, evidence age, owner, and status.
- Scenario selector: Normal, Volatile, Risk review.

### Finding detail

- explanation and recommended decision;
- actual, warning, hard limit, and dollar amount to remediate;
- affected accounts/positions;
- issuer, market, chain, custody, and regulatory evidence;
- calculation formula and excluded values;
- history/timeline.

### Brief composer

- source and destination asset/account;
- editable amount bounded by affected position;
- expected post-action exposure;
- non-binding price/slippage observation;
- rationale, owner, reviewer status, and expiry;
- copy/export simulation.

### States

- Normal: no hard breach, watch items remain visible.
- Volatile: price/liquidity deterioration with fresh evidence.
- Risk review: hard issuer concentration breach plus stale issuer evidence.
- Empty: no accounts, guided read-only import.
- Partial: one source unavailable; affected calculations marked incomplete.
- Error: retain last known snapshot with clear timestamp and retry.

## 6. Data and calculation contract

Production candidate sources:

- balances/transactions: chain RPC/indexer and custody APIs;
- identity: chain ID + token contract + verified metadata;
- price/liquidity: multiple market providers, oracle feeds, DEX pool observations;
- issuer: official disclosures, assurance documents, terms/redemption information;
- regulatory: official jurisdiction registers;
- custody controls: Safe/custodian account metadata where permissioned;
- burn: approved plan or accounting-system import.

Freshness targets:

- balances: ≤5 minutes for active chains, daily reconciliation;
- market price/liquidity: ≤2 minutes in business-as-usual, event-driven during deviation;
- custody config: ≤15 minutes;
- issuer evidence: cadence-aware; flagged stale after policy-defined due date;
- regulatory records: daily;
- burn plan: monthly owner confirmation.

Provenance fields: provider, source URL/identifier, methodology, observed_at, ingested_at, block number where relevant, confidence/status, terms/license, and raw evidence hash.

Rules:

- Never blend sources silently.
- Last-known values are marked stale and excluded from “healthy” assertions.
- Stablecoin wrappers/bridged assets are distinct deployments with parent exposure links.
- Internal transfers do not alter aggregate value.
- Estimated exit coverage uses configured slippage bands and is not a quote.
- Risk score is a prioritization rubric, not probability, rating, or guarantee.

## 7. Security, privacy, permissions, compliance

- Read-only by default; no signing keys or seed phrases accepted.
- OAuth/API scopes minimized and documented; revocation available.
- Encryption in transit/at rest; secret isolation; tenant separation.
- Roles: viewer, analyst, policy approver, admin; optional external auditor.
- SSO/SCIM and phishing-resistant MFA in enterprise.
- Policy changes require maker/checker; exports and acknowledgements logged.
- Address labels and counterparties treated as sensitive organizational data.
- Configurable retention and deletion; no model training on customer data by default.
- Vendor risk review, incident response, backup/recovery, and audit program required before production.
- Sanctions/Travel Rule data may be displayed from approved providers but Harbor does not make final compliance determinations.
- Legal review per jurisdiction to keep initial product outside custody/execution and define the boundary between policy analytics and regulated advice.
- Marketing must be fair, clear, non-misleading; disclose methodology, limitations, conflicts, and demo/estimated states.

## 8. Onboarding, activation, retention

Onboarding:

1. Create organization and choose jurisdiction/reporting currency.
2. Add two read-only treasury accounts.
3. Confirm labels and ownership.
4. Choose policy template and monthly burn.
5. Review initial findings with a Harbor specialist.
6. Invite one reviewer and schedule digest.

Activation event: within 30 minutes, a team connects ≥2 accounts, activates a policy, and resolves/assigns its first finding.

Retention loops:

- daily exception digest;
- weekly signer brief;
- monthly policy/burn attestation;
- quarter-end evidence pack;
- incident/depeg scenario review.

## 9. Metrics and analytics

North star: weekly policy decisions completed with complete evidence.

Product metrics:

- time to first complete snapshot;
- account and treasury coverage;
- findings viewed → assigned → resolved;
- median time from breach to acknowledgement;
- action briefs marked ready and exported;
- percentage of findings with complete/fresh evidence;
- policy confirmation rate;
- weekly active organizations and 90-day retention.

Quality/guardrail metrics:

- false-positive and missed-finding review rate;
- stale-source minutes;
- balance reconciliation differences;
- calculation restatements;
- permission/security events;
- recommendations overridden and reason;
- support escalations per organization.

Analytics events exclude raw addresses and balances where unnecessary; use tenant-scoped identifiers and consented operational telemetry.

## 10. Packaging and GTM

Hypothesis:

- Monitor — $750/month, 10 accounts, daily updates, one policy, digest.
- Control — $2,000/month, multi-entity, hourly checks, custom rules, briefs, audit exports.
- Enterprise — annual, SSO/SCIM, private data routes, warehouse, SLA, custom retention.

Launch:

- 8–12 design partners with $5m+ stablecoin treasuries;
- founder-led policy workshop and historical incident replay;
- free public-address concentration brief as lead magnet;
- partnerships with crypto accounting firms, Safe specialists, custodians, and fractional CFOs;
- publish a non-promotional stablecoin policy template and evidence methodology.

Narrative: “A portfolio view tells you what you own. Harbor tells your finance team what needs a decision, why, and what the signers should review.”

Success for pilot: 80% treasury coverage, first useful finding in week one, weekly finance usage, ≥2 signer briefs/month, and explicit willingness to pay. No avoided-loss claims.

## 11. Risks, dependencies, unknowns

- Source outages, chain reorganizations, token metadata spoofing, and provider methodology changes.
- False confidence from incomplete liquidity or issuer evidence.
- Regulatory boundary of recommendations and exports.
- Difficulty comparing legal/redemption structures across stablecoins.
- Customer policy maturity may be low; onboarding becomes consulting-heavy.
- Alert fatigue if thresholds are not calibrated.
- Public-address privacy and counterparty inference concerns.
- Integration dependence on custodians/indexers and their commercial terms.

Mitigations: multi-source reconciliation, conservative defaults, visible exclusions, no execution, evidence review, rule backtesting, customer-specific jurisdiction settings, and human approval.

## 12. Post-demo roadmap

1. Read-only Safe and custody connectors; policy templates; digest.
2. Historical replay and rule calibration.
3. Evidence ingestion with analyst verification.
4. Accounting exports and immutable period snapshots.
5. External signer brief/deep links.
6. Multi-entity and jurisdiction eligibility.
7. Scenario library: depeg, venue freeze, bridge impairment, chain outage.
8. API/warehouse and insurer/auditor evidence rooms.

