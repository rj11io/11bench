# PRD — Cairn Treasury Control Room

## 1. Product thesis and positioning

**Category:** crypto treasury intelligence and risk operations.

**Thesis:** protocol and DAO finance teams do not need another place to watch token prices. They need a trustworthy, repeatable way to turn mixed wallets, venues, cashflows, and policy thresholds into a decision-ready treasury brief.

**Positioning:** Cairn is the read-only treasury control room for crypto-native finance teams. It surfaces runway, liquidity, policy drift, and evidence in one review loop.

**Differentiated promise:** “What changed, what is exposed, and what should we review next?” Every decision card pairs a policy / runway consequence with source, age, and evidence.

**Product boundary:** Cairn observes, calculates, simulates, and reports. It does not custody assets, request private keys, execute trades, or give individualized investment advice.

## 2. Users and buying trigger

### Primary user

Protocol / DAO finance lead at a 3–20 person organization managing `$2M–$50M` in mixed assets across Safes, EOAs, exchanges, and DeFi positions. They own the monthly treasury review and often produce the board, governance, or signer brief themselves.

**Jobs:**

- Know how many months of committed operating spend are covered by liquid reserves.
- Detect concentration, venue, issuer, unlock, and stale-data risk before the weekly review.
- Compare a base plan with a defined stress scenario.
- Prepare a concise, reproducible pack for signers, delegates, auditors, or a finance committee.

**Pains:** spreadsheet reconciliation, unclear data age, symbol ambiguity, silent venue concentration, unclear ownership of follow-up, and no shared explanation for “why this number changed.”

### Secondary users

- Crypto startup CFO / ops lead: cares about payroll, grant vesting, and reserve policy.
- Multisig signer / committee member: cares about policy compliance, source evidence, and pending actions.
- Treasury advisor / accountant: cares about repeatable snapshots, exports, and client-level access.

**Buying trigger:** a large token unlock, a market drawdown, a new funding round, a pending treasury proposal, an audit / board request, or a team realizing its spreadsheet is stale.

## 3. Scope

### Demo scope implemented in this run

- Seeded, clearly labeled demo workspace for “Northstar Protocol Treasury.”
- Overview control room with NAV, deployable capital, runway, policy coverage, exposure, risk queue, and evidence ledger.
- Positions view with search, location / chain context, and asset drill-down.
- Flows view with monthly burn, recurring outflows, and inflow / outflow context.
- Policies view with editable-looking but read-only threshold cards and current exceptions.
- Reports view with a prepared weekly pulse preview.
- Scenario controls for Base, ETH −30%, and volatile token −50% stress.
- Time range controls for 30D / 90D / 180D.
- Alert details, acknowledge action, mark reviewed action, and local persistence.
- “Read-only demo” notice on all wallet-related affordances; no wallet provider, API, or credentials required.

### Production v1 scope

- Public address, xpub where safe and appropriate, CSV, and read-only venue onboarding.
- Provider adapters for market pricing, RPC / explorer balances, Dune / indexed data, Safe transaction metadata, and manual cashflows.
- Daily snapshots, freshness monitoring, token identity review, and source-level audit logs.
- Policy builder for reserve floors, concentration caps, venue limits, monthly outflow caps, and approvers.
- Alert workflow with owner, state, evidence, notes, and export.
- Scenario packs with configurable price shocks, haircuts, unlocks, and cashflow changes.
- PDF / CSV / shareable weekly pulse reports with immutable snapshot references.

### Non-goals

- Trading, swaps, rebalancing, or transaction signing in v1.
- Seed phrase, private key, or unrestricted API-key ingestion.
- Tax filing, tax advice, or securities / investment recommendations.
- Universal DeFi protocol coverage on day one.
- A social feed, token discovery screener, or retail price-alert product.

## 4. Core workflows

### A. Morning / weekly treasury review

1. User opens the Overview and sees “as of” time, data coverage, and seed / live state.
2. User scans deployable capital, runway, policy coverage, and decision queue.
3. User opens the highest-severity card and reads the evidence and stale / uncertain inputs.
4. User switches scenario to test whether the issue survives an ETH or volatile-token drawdown.
5. User acknowledges or assigns the alert, then marks the workspace reviewed.

### B. Investigate a position

1. User moves to Positions, searches an asset or selects a row.
2. Cairn shows asset, chain, custody location, amount, value, allocation, source age, and policy contribution.
3. User opens source evidence: wallet / Safe / venue identity, observed block, market snapshot, and classification state.

### C. Prepare a decision brief

1. User opens Reports and previews the weekly pulse.
2. The brief includes snapshot timestamp, NAV, liquid capital, runway, policy exceptions, scenario result, and unresolved data gaps.
3. User exports or shares a read-only report. Production exports must include source and calculation version.

## 5. Requirements and acceptance criteria

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| R1 | Make live / demo state unambiguous | Seeded values are labeled in the header, sidebar, and data ledger; no button claims it connected a wallet. |
| R2 | Show decision-ready summary | Overview shows NAV, deployable capital, runway, policy coverage, and decision queue above the fold at desktop width. |
| R3 | Explain risk | Each alert has severity, a concrete policy or runway consequence, and a source / evidence trail. |
| R4 | Stress the decision | Base, ETH −30%, and token −50% change runway / capital outputs and the chart; stress copy says it is a scenario, not a forecast. |
| R5 | Preserve provenance | Position, chart, and alert surfaces show source, observed / retrieved timestamp, and confidence or coverage where applicable. |
| R6 | Support review workflow | User can open an alert, acknowledge it, and mark the workspace reviewed; state persists in `localStorage`. |
| R7 | Support investigation | Positions view supports search and row drill-down with chain, custody, allocation, and data age. |
| R8 | Avoid unsafe permissions | Onboarding / connection affordance only explains the demo is read-only; no credentials, signing, or external service is invoked. |
| R9 | Be usable on mobile | At 375×812, no horizontal page overflow; sidebar collapses, grids stack, controls wrap, and tables become readable cards. |
| R10 | Be resilient | Empty / error / stale states have clear labels and recovery or review guidance; loading state can be represented without fake live values. |

## 6. Data sources and assumptions

### Production source strategy

| Data | Initial source | Freshness assumption | Provenance / fallback |
| --- | --- | --- | --- |
| Spot / historical price | CoinGecko REST; WebSocket only when a real live use case needs it | scheduled snapshots, provider timestamp retained | fallback to last known with stale badge; never silently use a different asset id |
| Wallet balances / transfers | chain RPC / explorer or indexed provider | chain-dependent; block number retained | retry / compare source; classify unsupported tokens separately |
| Safe metadata / pending transactions | Safe Transaction Service | service indexing and decoder schedules are retained | show Safe address, threshold, confirmations, and last index time |
| Derived on-chain analytics | Dune / provider adapters | raw / decoded / curated schedule stored per dataset | evidence includes query / dataset id and age |
| Cashflows / budgets | CSV or manual review | monthly or user-defined cadence | source marked manual; owner and review date required |

### Demo data

The route uses a static, seeded snapshot with fictitious Northstar Protocol values as of `2026-07-16 14:32 UTC`. The values are intentionally realistic enough to exercise units and risk states, but are not live market data, not a recommendation, and not a performance claim.

## 7. Entity model and calculations

Core entities: `Asset`, `Wallet`, `Position`, `MarketSnapshot`, `Cashflow`, `TreasuryPolicy`, `RiskObservation`, `Snapshot`, `Report`.

Calculation rules:

- `covered_nav = sum(recognized_position.quantity × price)`.
- `deployable_capital = approved_liquid_positions − near_term_outflows − policy_reserve_floor`.
- `runway_months = deployable_capital / monthly_net_burn`.
- `stress_runway_months = stress_deployable_capital / monthly_net_burn`.
- `concentration = position_value / covered_nav` or an explicit bucket such as volatile tokens / venue.
- `policy_coverage = policies_without_exception / policies_evaluated`.
- `data_coverage = value_with_current_source / covered_nav`.

All calculations must display unit, timestamp, inputs changed by the scenario, and an “estimated / modelled” qualifier where appropriate.

## 8. Trust, privacy, permissions, compliance, and risk

- **Read-only first:** accept public addresses, xpubs only when the integration supports them safely, CSVs, and read-only venue permissions.
- **No secret collection:** never ask for seed phrases, private keys, signing messages, or unlimited spend permissions.
- **Connection scope:** show address, chain, venue, last sync, permissions, and revoke action.
- **Custody boundary:** Cairn does not hold assets; Safe or a qualified custodian remains the execution / custody layer.
- **Privacy:** minimize address metadata, encrypt at rest in production, tenant-isolate, support deletion and export, and default to redacted report links.
- **Compliance:** no personalized recommendation or custody claim; jurisdictional product review before launch; legal review for EU MiCA / UK financial promotions; AML / sanctions workflows only if product scope later becomes a regulated service.
- **Risk semantics:** “action” means “requires human review,” not “sell,” “buy,” or “safe.” Stablecoin / issuer, counterparty, smart contract, bridge, liquidity, price, and data-quality risks are separate labels.

## 9. Onboarding, activation, retention, analytics

### Onboarding

1. Choose workspace type: protocol, startup, advisor.
2. Add first read-only source: public address, CSV, or demo workspace.
3. Set monthly burn, reserve floor, and concentration cap.
4. Review first snapshot and confirm source coverage.
5. Invite signer / finance reviewer or export a pulse.

### Activation event

An account is activated when it has at least two sources, one cashflow assumption, one policy, and a reviewed first alert within seven days.

### Retention loop

Daily or weekly snapshot → exception queue → scenario check → review / assign → pulse report → next snapshot.

### Metrics

- activation rate and time to first reviewed alert;
- source coverage and stale-value rate;
- weekly active finance reviewers;
- percent of workspaces with a policy and cashflow model;
- alert acknowledge / resolve time;
- weekly pulse creation and share rate;
- 30 / 90-day workspace retention;
- paid conversion by wallet count, seats, and report usage;
- support tickets for token identity, stale data, permissions, or reconciliation.

## 10. Packaging, launch, and GTM hypothesis

| Tier | Hypothesis | Included |
| --- | --- | --- |
| Free | acquisition | 1 workspace, 5 public addresses, 30-day history, pulse preview |
| Team — `$299 / month` | core team | 10 wallets / venues, 5 seats, policies, daily snapshots, exports |
| Treasury — `$799 / month` | serious protocol treasury | 50 wallets / venues, 15 seats, scenario packs, multiple Safes, monthly reports |
| Advisor / enterprise | custom | SSO, retention, data residency, white-label reports, service-level support |

Launch with 10 design partners, manually review their first data model, and ship the weekly Treasury Pulse as a useful artifact before asking for paid conversion. Acquisition channels: Safe / governance communities, DAO finance operators, protocol ops communities, accountants, auditors, and security consultants. The launch story is “faster, more defensible treasury reviews,” not performance or alpha.

## 11. Risks, dependencies, unknowns, roadmap

### Risks

- price / liquidity source disagreement can create false confidence;
- token identity and spam assets can distort NAV;
- address data is sensitive even when public;
- policy assumptions can be stale or politically disputed;
- jurisdictional scope can change if Cairn later executes, gives advice, or handles client assets;
- provider outages or chain reorgs can create misleading “last known” values.

### Dependencies

provider contracts and redistribution rights; token metadata quality; Safe / chain coverage; encrypted tenancy and audit log; export renderer; legal / privacy review; support playbooks for reconciliation.

### Unknowns to validate

- whether treasury leads prefer daily or weekly snapshots;
- which policy templates cover the first 80% of cases;
- willingness to pay for reports vs alerts vs source coverage;
- required support for vesting schedules, grants, and off-chain liabilities;
- whether multisig signers want an in-product request or only a linked Safe view.

### Post-demo roadmap

1. Address / CSV onboarding, source coverage and token review.
2. Cashflow imports, policy builder, daily snapshots and pulse export.
3. Safe / venue read-only adapters, alert ownership, historical diffing.
4. Scenario templates for unlocks, stablecoin depeg, liquidity haircuts, and budget changes.
5. Advisor workspaces, audit exports, SSO, retention controls.
6. Only after trust and compliance review: optional proposal context and deep links to external execution surfaces; never silently sign.

