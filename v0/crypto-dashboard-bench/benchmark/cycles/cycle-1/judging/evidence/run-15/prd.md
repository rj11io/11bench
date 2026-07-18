# Holdfast product requirements

## Document status

- Product: **Holdfast**
- Version: demo / design-partner specification
- Date: 2026-07-16
- Category: on-chain treasury readiness
- Primary market: crypto-native companies with recurring stablecoin
  obligations

## Product thesis

Finance teams cannot safely infer operating liquidity from aggregate crypto
portfolio value. Assets may be volatile, locked, thinly traded, held at a
frozen venue, stranded on an unavailable chain, or blocked by an approval
policy.

Holdfast joins positions, dependencies, obligations, and treasury policy to
answer:

1. How many days of critical payments are covered?
2. Which dependency failures break coverage?
3. What is the first uncovered obligation?
4. Which reviewable actions restore the policy target?

## Positioning

**For** finance and operations leads at crypto-native companies  
**who** manage operating funds across stablecoins, wallets, venues, chains, and
protocols,  
**Holdfast** is an on-chain treasury readiness workspace  
**that** stress-tests payment coverage and turns concentration risk into a
reviewable action plan.  
**Unlike** portfolio trackers, accounting subledgers, and custody platforms,  
**Holdfast** is an independent, read-only decision layer centred on dated
obligations rather than PnL or execution.

### Differentiated promise

> Know what is actually spendable, what can interrupt it, and what the team
> should review today.

## Users

### Primary user: finance / operations lead

Profile:

- 20–200 person crypto-native company or foundation;
- five or more wallets/venues;
- recurring payroll, contractor, vendor, grant, or tax obligations;
- material stablecoin holdings across two or more chains/providers;
- no dedicated 24/7 treasury risk desk.

Jobs:

- prepare the weekly liquidity review;
- ensure the next payroll and critical vendors are funded;
- keep concentration within policy;
- brief CFO/founders/signers;
- prepare transfer proposals without making signing mistakes;
- preserve evidence for close and audit.

Pains:

- market value looks healthy while operational cash is fragmented;
- spreadsheets go stale and double count wrapped/protocol positions;
- one number rarely explains issuer, venue, chain, signer, and liquidity risk;
- incidents force hurried transfers and manual address checks;
- different tools own balances, bills, and accounting records.

Buying triggers:

- first material stablecoin treasury;
- funding round or rapid headcount growth;
- depeg/withdrawal/bridge incident or near miss;
- new controller/CFO;
- audit or board request for a treasury policy;
- move from one Safe to multiple entities, chains, or custodians.

### Secondary users

- CFO / founder: approves policy and reads the weekly summary.
- Controller / accountant: reconciles Holdfast inputs to the subledger.
- Treasury signer: reviews plan intent and executes in the custody/multisig
  system.
- Security/compliance lead: reviews providers, permissions, sanctions flags,
  and audit history.
- Fractional CFO / accounting firm: monitors several client workspaces.

### Non-user / out-of-scope buyer

Retail traders seeking live prices, signals, tax filing, or execution are not
the target.

## Product principles

1. **Readiness before returns.**
2. **Evidence before score.**
3. **Read-only before execution.**
4. **Dated obligations before generic burn rate.**
5. **Dependency lineage before convenient aggregation.**
6. **Ranges and stale states before false precision.**
7. **Draft and review before sign and send.**

## Core decision loop

1. Sync balances, dependencies, prices, and obligations.
2. Calculate payment-ready coverage under policy.
3. Surface the first breach and explain its causes.
4. Run or inspect a relevant stress scenario.
5. Create a policy-based coverage plan.
6. Review, export, and execute outside Holdfast.
7. Confirm the resulting state on the next sync.

## Scope

### Demo scope

- seeded organisation with realistic-but-fictional balances and obligations;
- clear demo/data timestamps;
- baseline, volatility, source-outage, and empty-workspace states;
- payment-ready days and 90-day policy gap;
- holdings by asset, venue, chain, and readiness;
- action queue with explainable policy breaches;
- interactive stress lab for stablecoin depeg, venue freeze, and chain outage;
- reviewable coverage plan;
- local persistence of reviewed plan and selected scenario;
- JSON export of the demo plan;
- responsive desktop/mobile experience.

### Production MVP scope

- public wallet and Safe address ingestion;
- read-only exchange/custodian integrations;
- CSV/manual balance ingestion;
- obligation CSV plus one AP/payroll integration;
- position canonicalisation and dependency graph;
- reference price, source, timestamp, and stale handling;
- readiness policy and coverage calculation;
- issuer, venue, chain, asset, and protocol concentration policies;
- deterministic scenario library;
- plan draft/review/export;
- email/Slack alerting;
- roles, audit log, and data export.

### Non-goals

- custody or private-key storage;
- swaps, bridges, order routing, or transaction broadcast;
- automated treasury management;
- tax lot calculation or statutory reporting;
- full ERP/subledger replacement;
- retail portfolio tracking or trading signals;
- protocol-specific economic risk simulation;
- legal, tax, accounting, sanctions, or investment advice;
- proof-of-reserves assurance.

## Information architecture

- **Overview:** payment-ready headline, coverage chart, action queue, next
  obligations.
- **Exposure:** exact positions and concentration by asset/issuer/venue/chain.
- **Scenarios:** shock assumptions, affected positions, range, and first
  shortfall.
- **Plans:** proposed actions, review status, export, and history.
- **Sources:** integrations, timestamps, permissions, health, and lineage.
- **Policy:** minimum coverage, concentration caps, approved venues/assets, and
  stale thresholds.
- **Settings / Team:** roles, entities, alerts, retention, and security.

The frontend demo expresses these as one decision-oriented overview with
working drill-down controls and overlays.

## Functional requirements and acceptance criteria

### FR1 — Demo and source status

Requirements:

- Display “Seeded demo” persistently.
- Show the snapshot as-of time and reporting currency.
- Provide a source-health view with source type, age, and status.
- Never use “live”, “connected”, or “real-time” for seeded data.

Acceptance:

- A user can identify within five seconds that balances and prices are not
  live.
- Source-outage mode replaces affected confidence with a prominent warning.
- Every top-line number has an accessible explanation or nearby provenance.

### FR2 — Payment-ready coverage

Requirements:

- Display baseline payment-ready days and policy target.
- Display book runway separately.
- Identify the first uncovered obligation and amount needed to restore target.
- Explain the main constraints on readiness.

Acceptance:

- Baseline demo shows 83 payment-ready days against a 90-day policy.
- Book runway is labelled as a different measure.
- Changing to volatility mode changes the stressed coverage and explanatory
  text without changing the seeded source balances.

### FR3 — Coverage through time

Requirements:

- Plot ready liquidity against cumulative critical obligations for 90 days.
- Show a baseline and, when active, a stress path.
- Use USD units and clear period labels.
- Provide a text summary for screen readers.

Acceptance:

- The chart has no dual axis.
- Baseline/stress are distinguishable by label and line style, not colour
  alone.
- Source-outage mode suppresses false precision and explains why.

### FR4 — Action queue

Requirements:

- Rank breaches by timing and payment impact, not just market-value exposure.
- Each item shows severity, affected dependency, policy, and recommended review.
- Selecting an item updates a detail panel.

Acceptance:

- At least three distinct risk dimensions appear in seeded data.
- Users can mark an item acknowledged/reviewed locally.
- State survives a page refresh.

### FR5 — Exposure explorer

Requirements:

- Toggle grouped view by asset, venue, or chain.
- Show value, portfolio share, readiness, policy limit/status, and data age.
- Preserve canonical lineage in details.

Acceptance:

- Totals reconcile to the displayed seeded portfolio value.
- Bars start at zero.
- A breach is identifiable without relying on red/green colour.
- Mobile uses cards/rows without horizontal page overflow.

### FR6 — Stress lab

Requirements:

- Provide deterministic toggles for:
  - USDC market price -4%;
  - Coinbase Prime withdrawals unavailable for seven days;
  - Base unavailable for 48 hours.
- Explain each assumption.
- Calculate stressed ready days, estimated shortfall to 90 days, and first
  exposed obligation.
- Show a settlement-timing range.

Acceptance:

- Toggling shocks immediately updates the result.
- “Run scenario” persists the latest selection in local storage.
- The result states that it is a what-if estimate, not a forecast or advice.
- Reset restores the default scenario.

### FR7 — Coverage plan

Requirements:

- Generate a seeded, policy-based plan with exact source/destination aliases,
  asset, amount, chain, rationale, expected policy impact, and approval context.
- Plans are explicitly non-executable.
- Users can mark the plan reviewed and export JSON.

Acceptance:

- Reviewing the plan persists locally.
- Exported JSON includes demo status, as-of time, assumptions, and plan items.
- No button says “send”, “trade”, “connect wallet”, or implies execution.

### FR8 — Empty, volatile, risk, and error states

Requirements:

- Empty state: explain the minimum safe onboarding sequence.
- Volatile state: show stressed coverage and elevated risk queue.
- Risk-focused normal state: show policy gap and mitigation workflow.
- Error/source-outage state: identify stale sources and suppress affected
  confidence.

Acceptance:

- All four states are reachable from the demo-state control.
- Returning to baseline does not erase saved plan review/scenario state.

### FR9 — Responsive and accessible interaction

Requirements:

- Desktop target: 1440×900.
- Mobile target: 375×812.
- Keyboard-operable controls, visible focus, semantic buttons, labelled dialog,
  sufficient contrast, and reduced-motion support.
- No horizontal page overflow.

Acceptance:

- All interactive elements are reachable by keyboard.
- Status never relies on colour alone.
- Dialog closes by close button, backdrop, and Escape.
- Charts have accessible text alternatives.

## Data requirements

### Source classes

| Data                       | Preferred source class                |                       Freshness objective | Fallback                         |
| -------------------------- | ------------------------------------- | ----------------------------------------: | -------------------------------- |
| EVM/Solana balances        | nodes/indexer                         | under 2 min after configured confirmation | secondary indexer; mark stale    |
| Safe owners/threshold      | chain + Safe service                  |                               under 5 min | chain read                       |
| Exchange/custodian balance | read-only API                         |                               under 5 min | last observation; explicit stale |
| Price/reference rate       | governed market-data provider         |                 under 60 sec for overview | secondary provider / no value    |
| Order-book/DEX liquidity   | market-depth provider                 |                               under 5 min | conservative fixed haircut       |
| Reserve/issuer evidence    | official issuer + assurance documents |                            source cadence | retain prior document with age   |
| Obligations                | AP/payroll/ERP/CSV                    |                   daily or user-triggered | manual                           |
| Provider status            | provider status API/page              |                               under 5 min | manual incident flag             |
| Sanctions/risk flags       | licensed provider                     |                                vendor SLA | “not screened”                   |

Objectives are product targets, not claims about the demo.

### Provenance record

Every observation stores:

- provider and dataset/endpoint;
- observed-at and ingested-at timestamps;
- chain, block number, and confirmations when applicable;
- entity/account/asset identifiers;
- transformation version;
- confidence/status;
- licence/attribution requirement;
- manual editor and note for manual records.

### Freshness states

- Fresh: within configured threshold.
- Delayed: usable with warning.
- Stale: excluded from high-confidence readiness.
- Failed: no current observation; last known value is not silently used.
- Manual: user-provided as-of value.

### Seeded demo dataset

Fictional organisation: Northstar Labs.

- Reporting currency: USD.
- Snapshot: 2026-07-16 08:42 UTC.
- Total marked treasury: $4.86M.
- Baseline payment-ready coverage: 83 days.
- Policy target: 90 days.
- Book runway: 12.9 months.
- Assets: USDC, USDT, USDS, ETH, WBTC, stETH.
- Locations: Ethereum Safe, Base Ops Safe, Coinbase Prime, Kraken, Aave v3,
  Lido.
- Obligations: payroll, cloud/infrastructure, contractors, tax reserve,
  security audit.

All values are labelled seeded and do not describe a real organisation.

## Calculation requirements

### Reporting value

`market_value = units × reference_price`

The record must retain units, price, pair, source, and time.

### Readiness

`ready_value(horizon) = market_value × valuation_haircut × availability_factor`

Availability depends on:

- payment-asset/chain acceptability;
- withdrawal/redemption path;
- venue and chain status;
- signer/policy availability;
- withdrawal queue/unbonding;
- liquidity at required size;
- price/source freshness.

### Concentration

`concentration(dimension, member) = member_ready_or_market_value / relevant_total`

The numerator/denominator basis must be labelled. The overview uses market
value for portfolio concentration and ready value for coverage impact.

### Coverage

Sort critical obligations by due time. Add usable positions by their earliest
availability. The coverage day is the latest date before cumulative usable
value falls below cumulative eligible obligations.

### Scenario

A scenario applies explicit transformations:

- price haircut;
- zero/partial availability for a duration;
- added settlement delay;
- liquidity haircut;
- optional correlated dependency.

Results include:

- base and stressed ready days;
- low/high range from configured settlement window;
- unavailable and haircut amounts;
- first uncovered obligation;
- shortfall to target;
- calculation trace.

## Security, privacy, permissions, and compliance

### Security

- No seed phrase/private key collection.
- Read-only API permissions only.
- Encrypt credentials at rest and in transit.
- Workspace-level tenant isolation.
- SSO/SAML and SCIM at Scale/Enterprise.
- MFA for all privileged users.
- Secret rotation and revocation.
- Immutable audit events for source, policy, role, and plan changes.
- Dependency and incident monitoring.
- Security review before any new integration can become “trusted”.

### Roles

- Admin: sources, policy, team, exports.
- Finance manager: obligations, scenarios, plans.
- Analyst: read and annotate.
- Signer: read and review plans; no execution in product.
- Auditor: read-only evidence and history.

### Privacy

- Treat labelled wallet mappings as potentially personal/confidential.
- Default to aliases and truncated addresses.
- Role-gate full address and export access.
- Configurable retention for observations, logs, and exports.
- No employee/vendor PII written on-chain.
- Data-processing agreement and subprocessor register for production.
- Data residency option for Enterprise.

### Compliance boundary

- Holdfast is not a custodian, exchange, transfer service, broker, or portfolio
  manager in MVP.
- Plans are policy-based operational drafts, not investment advice.
- Screening output is a flag for human review, not a legal determination.
- Customers remain responsible for provider due diligence, sanctions/AML,
  accounting treatment, approvals, and execution.
- Marketing must be fair, clear, and not misleading.

## Onboarding

### Safe onboarding sequence

1. Create organisation and reporting currency.
2. Add public wallets/Safes without signing.
3. Add read-only providers or import CSVs.
4. Review canonical asset and account mapping.
5. Import next 90 days of obligations.
6. Set minimum ready days and concentration limits.
7. Review coverage and acknowledge data gaps.
8. Invite signer/auditor roles.

### Activation definition

An organisation is activated when:

- at least 80% of expected treasury value is mapped;
- the next 30 days of critical obligations are present;
- a coverage policy exists;
- the user has reviewed one breach or run one scenario.

## Analytics and success metrics

### North-star metric

**Critical obligation value covered by policy-ready liquidity over the next 90
days.**

### Product metrics

- time to first trustworthy coverage result;
- percentage of treasury value with fresh provenance;
- percentage of 30/90-day obligations mapped;
- weekly active finance workspaces;
- scenarios run per active workspace;
- breaches reviewed within 24 hours;
- plans reviewed/exported;
- number and duration of policy shortfalls;
- weekly liquidity review time saved (surveyed);
- false/stale alert rate;
- source sync failure rate.

### Business metrics

- preview-to-workspace conversion;
- activated workspace conversion;
- design-partner to paid conversion;
- net revenue retention;
- partner-sourced pipeline;
- sales cycle by company size;
- gross margin after data/licensing cost.

### Event taxonomy

- `source_added`, `source_sync_succeeded`, `source_sync_failed`
- `obligation_imported`
- `policy_created`, `policy_breached`, `policy_breach_reviewed`
- `scenario_configured`, `scenario_run`
- `plan_created`, `plan_reviewed`, `plan_exported`
- `state_viewed` with baseline/volatility/outage/empty
- `provenance_opened`

No wallet addresses, transaction hashes, or obligation PII in analytics
payloads.

## Retention loop

### Weekly

1. Monday coverage digest.
2. User reviews changed sources and obligations.
3. New or worsening breach opens the scenario.
4. User reviews/exports a coverage plan.
5. Next sync confirms whether the gap closed.

### Monthly

- reconcile source totals to subledger;
- review policy exceptions;
- export leadership/audit memo;
- attest source permission and team access.

## Packaging and pricing hypothesis

| Plan       | Monthly hypothesis | Target                | Included                                                               |
| ---------- | -----------------: | --------------------- | ---------------------------------------------------------------------- |
| Preview    |               Free | acquisition           | 3 public addresses, 30-day snapshot, no saved workspace                |
| Team       |               $399 | startups/foundations  | 15 accounts, 5 users, obligations, policy, scenarios, alerts, exports  |
| Scale      |             $1,250 | growing finance teams | 75 accounts, entities, read-only APIs, SSO, audit log, custom policies |
| Enterprise |              Quote | payments/institutions | unlimited scope, residency, custom retention, SLA, procurement         |

Validation questions:

- Is pricing driven by accounts, legal entities, or treasury complexity?
- Does Slack/email alerting materially improve willingness to pay?
- Is the free preview too easy to reproduce without obligation data?
- Which data costs must be passed through?

## GTM narrative

### Message

“Your portfolio says you have a year of runway. Can you make the next payroll if
USDC trades at $0.96, Coinbase pauses withdrawals, or Base is unavailable?
Holdfast shows the answer before an incident does.”

### Launch motion

1. Recruit 8–12 design partners through crypto CFO/controller communities.
2. Offer a free 90-day treasury readiness review using public addresses and
   customer-provided obligations.
3. Publish a stablecoin treasury policy and incident checklist.
4. Build referral partnerships with crypto accounting firms and fractional
   CFOs.
5. Integrate with one multisig, one subledger, and one AP/payroll source.
6. Convert design partners after four weekly reviews and one leadership export.

### Sales proof

The initial case study should report:

- starting data completeness;
- uncovered obligations found;
- concentration or dependency issues found;
- time to weekly review before/after;
- actions the customer chose to take;
- no claim that Holdfast prevented loss unless demonstrably true.

## Risks and mitigations

| Risk                                             | Impact            | Mitigation                                                                         |
| ------------------------------------------------ | ----------------- | ---------------------------------------------------------------------------------- |
| Incumbent custody/accounting tool adds readiness | wedge compression | independent multi-provider view; obligation/dependency graph; partner distribution |
| Bad source data produces false confidence        | severe            | stale exclusion, reconciliation, lineage, manual override log                      |
| Scenario appears predictive                      | trust/regulatory  | deterministic labels, assumptions, ranges, no probability unless validated         |
| Plan is construed as advice                      | legal/commercial  | customer-authored policy, operational language, no execution, jurisdiction review  |
| Read-only APIs still expose sensitive data       | security          | least privilege, encryption, rotation, no browser secrets                          |
| Stablecoin/venue ratings become subjective       | trust             | evidence components, no opaque score, dated source documents                       |
| Too much setup before value                      | activation        | public-address preview, CSV template, guided data-completeness meter               |
| Obligations contain sensitive PII                | privacy           | aggregate amounts by default, field minimisation, role access, retention controls  |
| Market depth data cost                           | margin            | tiered refresh, conservative fallback, provider contracts                          |
| Multi-chain canonicalisation errors              | calculation       | versioned asset registry, reconciliation, exception queue                          |

## Dependencies

- reliable balance/indexing provider;
- reference-price and liquidity provider licences;
- Safe and provider APIs;
- obligation import/API;
- entity/asset registry;
- auth, secrets management, audit log;
- legal review for launch jurisdictions;
- security programme and incident response;
- customer support for mapping/reconciliation.

## Post-demo roadmap

### Phase 1 — trustworthy read model

- address/Safe import;
- obligations CSV;
- provenance/source health;
- policy and deterministic scenarios;
- plan export.

### Phase 2 — workflow integration

- read-only exchange/custodian integrations;
- Slack/email;
- subledger reconciliation;
- AP/payroll integration;
- multi-entity and role/audit controls.

### Phase 3 — richer readiness

- size-aware exit liquidity;
- live provider/chain incident overlays;
- signer availability and transfer-window calendars;
- policy simulations and historical replay.

### Phase 4 — controlled handoff

- deep links or structured proposal export to Safe/custody systems;
- readable EIP-712 intent preview;
- destination allowlists and address verification;
- no native custody unless strategy and regulatory scope deliberately change.

## Demo release checklist

- [x] All values clearly seeded.
- [x] Core workflow covers observe → stress → plan → review/export.
- [x] Baseline, volatile, outage, and empty states are reachable.
- [x] Local persistence is limited to demo preferences/review.
- [x] No wallet connection or execution claim.
- [x] Route-scoped ESLint passes with zero warnings.
- [x] Final route-scoped TypeScript check passes.
- [x] Route-level Next production compilation and internal TypeScript phase
      pass.
- [x] Responsive CSS audit covers desktop, 860 px, and 480 px breakpoints,
      touch targets, reduced motion, and table-to-card conversion.
- [ ] Shared root build is externally blocked by an active `.next` lock and
      unrelated CSS-module errors in other run folders.
- [ ] Browser visual/console QA requires the browser-control runtime, which was
      not exposed in this session.
