# PRD — Cairn Treasury Control

## Product thesis and positioning

Crypto-native finance teams do not need more surfaces that show balances. They need a defensible answer to “what can move?” across wallets, venues, networks, asset restrictions, approvals, and accounting state. Cairn is a **read-only treasury control plane** that turns fragmented digital-asset records into a daily spendability decision, exception queue, and evidence trail.

**Differentiated promise:** in under five minutes, a treasury lead can see spendable liquidity, coverage against a configured burn plan, the rule behind every warning, and the source/time behind every material number.

**Category:** treasury / risk operations for crypto-native companies.  
**Primary user:** Head of Treasury, Finance Lead, or Controller at a crypto-native operating company.  
**Secondary users:** CFO/founder, security/ops lead, accounting partner, auditor (read/export only).

## Jobs, pains, buying trigger

- “Before releasing a vendor or payroll transfer, prove the source wallet is funded, permitted, and inside policy.”
- “Before the weekly finance review, understand coverage without counting restricted or pending assets.”
- “At month end, reconcile on-chain/venue observations and produce a traceable evidence pack.”

Pain is fragmented source truth, manual address labeling, hidden locked balances, unclear freshness, and approval evidence living in chat. The buying trigger is a new chain/venue, a custody or compliance review, a finance hire, an audit, or a near-miss.

## Scope and non-goals

### MVP scope

1. Organization setup with base currency, burn plan, policy thresholds, roles, and data-status banner.
2. Source registry for public addresses, custodians, exchanges, and CSV snapshots; read-only permission model.
3. Normalized wallet/venue/asset/movement model with source, timestamp, network, and confidence metadata.
4. Overview: spendable liquidity, 30-day coverage, runway weeks, policy exceptions, and decision queue.
5. Liquidity map: wallet/venue table with spendable/reserved/pending/locked buckets and drill-down.
6. Review queue: assign/acknowledge exceptions, add a memo, preserve reviewer/time in an audit log.
7. Reconciliation view: observed vs. expected holdings, unmatched movements, and exportable evidence CSV/PDF in a later slice.
8. Scenario mode: apply an explicit price shock or burn-rate change to derived coverage without altering observed data.

### Non-goals

No custody, key storage, signing, transaction broadcast, execution routing, yield recommendation, legal advice, tax filing, or investment performance promise. No “live” claims in the demo. No universal on-chain discovery product.

## Critical workflow and acceptance criteria

### Morning control review

1. User opens Overview and sees a demo/live status, last synced times, and “as-of” labels.
2. User reads Spendable liquidity and 30-day coverage; the UI shows the formula and bucket exclusions on demand.
3. User filters the liquidity map by network or asset and opens a wallet row to inspect purpose, custody, policy, and source.
4. User opens a high-severity exception, reads the evidence and suggested next action, then marks it reviewed and adds a memo.
5. The item moves out of the open queue, with reviewer and timestamp retained locally for the demo.
6. User switches to Scenario, chooses a labeled shock, and sees only derived coverage/runway change; observed balances retain their as-of state.

**Acceptance criteria:** no sensitive wallet credential is requested; seeded values are visibly demo data; every aggregate has currency/unit and timestamp; pending and locked balances are excluded from spendable; severity uses text and color; the workflow is usable with keyboard and at 375px wide; refresh retains review state through `localStorage`; no horizontal overflow.

## Data sources, freshness, provenance, calculations

MVP adapters: public chain indexer/RPC for confirmed balances and transactions, custody/exchange read APIs or CSV for venue records, market-data provider for valuation, and an internal policy/config service. Each observation stores `source`, `source_record_id`, `network`, `block_or_snapshot_time`, `ingested_at`, `freshness_sla`, and `confidence`.

Derived calculations:

- `gross_value = Σ(units × valuation_price)` by asset and source snapshot.
- `spendable_value = gross_value - pending_value - locked_value - reserved_value - policy_excluded_value`.
- `coverage_days = spendable_value / forecast_daily_burn`.
- `runway_weeks = coverage_days / 7`.
- `safe_release = max(0, spendable_stable_value - required_floor - next_30d_burn - pending_outflows)`.
- Stress mode applies a named shock to volatile assets and/or burn rate; it is never presented as a forecast.

Valuation is marked “observed price, source/time” and may be stale or incomplete. On-chain finality differs by network; pending is never silently treated as settled. Reconciliation compares normalized observations to expected labels and accounting records; it does not overwrite source truth.

## Entity model

`Organization` → `User`, `Role`, `Policy`, `Source` → `WalletOrVenue` → `NetworkAccount` → `Holding` and `Movement`. `Holding` has purpose, custody state, restriction, units, valuation, and bucket. `Movement` has transaction/reference, from/to, asset, amount, fee, status, approval state, counterparty, labels, and evidence. `Exception` references one or more observations and a policy rule. `Review` records actor, action, memo, timestamp, and previous state.

## Trust, privacy, permissions, compliance

- Start with read-only public addresses and provider APIs; never ask for a seed phrase or private key.
- Roles: Viewer, Reviewer, Operator, Admin; signing is explicitly out of scope.
- MFA/SSO, least privilege, tenant isolation, encryption at rest/in transit, retention controls, source revocation, and immutable audit logs are release requirements.
- Screen destinations and counterparties through a configurable compliance provider; expose provider result, timestamp, and unresolved state rather than a proprietary legal conclusion.
- Support address ownership evidence and labels, chain/network identity, and approval quorum. Treat third-party custodian balances as provider observations, not proof of solvency.
- Provide data export/delete controls, DPA, subprocessor list, incident response, and region-specific review for MiCA, sanctions, and accounting obligations. Product copy must say “not legal, tax, or investment advice.”

## Onboarding, activation, retention, analytics

Onboarding: create org → choose base currency/burn plan → add one read-only public address or upload demo CSV → confirm source label/purpose → see first coverage calculation → resolve one exception. Activation is “first reviewed exception plus a saved policy” within the first session.

Retention loops: morning review queue, weekly coverage scenario, monthly reconciliation/evidence export, and policy drift alerts.

Metrics: time-to-first-snapshot; activation rate; weekly active treasury reviewers; review completion rate; median exception age; % of holdings with source/purpose labels; reconciliation match rate; stale-source rate; evidence export rate; pilot-to-paid conversion; expansion from one entity to multi-entity.

## Packaging, launch, and GTM

Pricing hypothesis: Starter €499/month (one entity, 10 sources, daily refresh); Growth €1,500/month (multi-chain, policy packs, alerts, exports); Enterprise custom (SSO, retention, data residency, support). Validate willingness to pay through five design-partner pilots before committing.

Launch with a read-only sandbox, a “Treasury control checklist” lead magnet, accounting/custody implementation partners, and a live teardown of a fictional treasury. The narrative: **“Wallet visibility is not control. Cairn shows the evidence behind what can move.”**

## Risks, dependencies, unknowns, roadmap

Risks: provider outages or stale data; address attribution errors; chain finality variance; false-positive compliance signals; customers expecting execution; regulated users interpreting derived coverage as advice; sensitive financial metadata exposure. Mitigations are freshness states, explicit source lineage, review gates, role separation, conservative defaults, and legal/security review.

Dependencies: chain/indexer adapters, market valuation provider, custodian/exchange connectors, accounting export contract, compliance screening provider, SSO/audit-log infrastructure, and product security review.

Unknowns to test: minimum useful source coverage; burn-plan accuracy; whether controllers or treasury leads own the budget; acceptable freshness SLA by source; which evidence export format unlocks a paid pilot.

Post-demo roadmap: alerts and scheduled review packs → multi-entity consolidation → accounting/ERP mappings → policy simulation and approval routing → optional execution integrations behind customer-owned custody and explicit permissions.

