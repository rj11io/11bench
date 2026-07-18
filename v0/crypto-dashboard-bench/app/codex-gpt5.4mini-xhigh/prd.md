# Product Requirements Document

## Product thesis

**ReserveScope** is a policy-aware treasury and liquidity risk cockpit for stablecoin-heavy crypto teams.

It turns fragmented wallet, custody, exchange, and onchain data into a single operational question:

> What is liquid right now, what is out of policy, how long is runway under stress, and what should treasury do next?

This is not a consumer portfolio tracker, a trading terminal, or a generic onchain analytics playground. The product is optimized for one recurring decision loop: treasury review, rebalance, payout readiness, and risk escalation.

## Category and positioning

- **Category:** Treasury intelligence and liquidity risk management for crypto-native operations.
- **Primary promise:** show liquid runway, policy breaches, and action priorities in one place.
- **Differentiator:** combines wallet provenance, liquidity readiness, stablecoin mix, and policy/compliance state instead of flattening everything into a price dashboard.
- **Positioning line:** "Know what is liquid, what is exposed, and what move to make next."

## Primary and secondary users

### Primary user

- **Treasury lead / CFO / finance ops lead** at a crypto-native company, payment company, or protocol foundation.
- **Jobs to be done:**
  - understand whether enough liquid capital exists for payroll, supplier payouts, trading buffers, or protocol ops;
  - keep wallet and counterparty concentration inside policy;
  - explain treasury posture to founders, boards, auditors, or risk reviewers;
  - react to depeg, exchange, or chain stress before a settlement failure.
- **Pains:**
  - balances are spread across wallets, custodians, exchanges, and chains;
  - nobody trusts the "real" liquid balance because some assets are delayed or restricted;
  - policy reviews happen in spreadsheets and Slack threads;
  - compliance labels and beneficiary provenance are easy to lose.

### Secondary users

- **Finance operations / controller**
  - needs wallet provenance, close-ready exports, and a clean audit trail.
- **Treasury analyst / risk analyst**
  - needs concentration, counterparty, and stress scenarios.
- **COO / operations manager**
  - needs payout readiness and approvals.

## Buying trigger

The product is most compelling when one of these happens:

- treasury starts using stablecoins for payroll, vendor payouts, or intercompany settlement;
- wallet count or chain count grows beyond what a spreadsheet can explain;
- a depeg event, exchange issue, or sanctions review makes "liquid" and "safe" diverge;
- board or audit asks for an immediate explanation of treasury posture.

## Scope

### In scope

- read-only aggregation of treasury wallets, custodians, and exchange balances;
- stablecoin, fiat, and crypto asset classification;
- liquid runway calculation and stress simulation;
- policy health and concentration views;
- wallet labeling, watchlists, and provenance;
- open alert queue with resolve/snooze state;
- audit-friendly timestamped activity feed;
- demo-safe, seeded data mode with no external dependencies.

### Explicit non-goals

- no trade execution terminal;
- no consumer portfolio tracker;
- no tax filing or realized P&L engine;
- no private-key custody or wallet creation workflow;
- no claims of live price, balance, or transaction data in the demo;
- no universal onchain search engine or analyst notebook.

## Core workflows

### 1) Daily treasury review

1. choose a treasury snapshot or organization;
2. scan liquid runway, policy score, stablecoin mix, and at-risk capital;
3. review open alerts and the latest movement feed;
4. drill into a wallet or counterparty that drives risk;
5. queue or resolve the next operational action.

### 2) Stress review

1. increase a shock assumption for depeg / withdrawal delay / settlement friction;
2. inspect how runway and capital-at-risk change;
3. compare observed versus stressed runway;
4. export or present the result as a board-ready explanation.

### 3) Empty workspace onboarding

1. start from a blank treasury profile;
2. connect watch-only wallets or import a treasury address book;
3. define policy thresholds and allowed destinations;
4. review the first computed snapshot;
5. label wallets and queue the first remediation actions.

## Functional requirements

### Snapshot and state management

- The demo must support at least four states:
  - normal;
  - volatile;
  - risk-focused;
  - empty.
- The selected snapshot, active tab, selected wallet, and resolved alerts should persist in `localStorage`.
- Switching snapshots should update charts, summary cards, alerts, wallet table content, and empty-state messaging.

### Treasury summary

- Display liquid runway in months.
- Display total balance, liquid balance, stablecoin mix, policy health, and at-risk capital.
- Show the latest simulated sync time and clear demo-data labeling.
- Surface freshness and provenance hints on the same screen as the numbers.

### Charts and comparisons

- Show runway history as a line or area chart.
- Show asset mix or liquidity readiness as a comparison chart.
- Allow switching 7D / 30D / 90D history windows.
- Differentiate observed, estimated, and simulated values.

### Alerts and actions

- Render open alerts with severity and remediation guidance.
- Allow alerts to be resolved or restored.
- Render a queue of suggested actions with queued state.
- Persist alert and queue state locally.

### Ledger drill-down

- List wallets with role, chain, custodian, bucket, balance, available amount, freshness, and risk label.
- Clicking a wallet updates a detail panel.
- Allow filtering by liquidity bucket or readiness class.
- Surface provenance, screening status, counterparties, and last movement.

### Empty state

- The empty profile must replace data tables with an onboarding checklist.
- The empty view must not imply connected balances or live activity.

## Data sources and provenance assumptions

The product assumes watch-only, read-only data sources:

- wallet / custody snapshots from Fireblocks, Coinbase Prime, Anchorage, or similar platforms;
- chain balances and transfers from RPC/indexer infrastructure;
- prices from a market data feed;
- labels and watchlists from internal address books or a provider like Nansen;
- compliance screening from OFAC lists and a transaction monitoring vendor;
- stablecoin market context from public dashboards such as DefiLlama, Dune, or Visa-style analytics.

### Freshness assumptions

- balances: 5 to 30 minutes depending on connector;
- prices: 1 to 5 minutes;
- sanctions / risk lists: daily or near-daily;
- wallet labels: manual or batch-updated;
- stress simulations: instantaneous and client-side.

### Provenance semantics

- every major metric should be tagged as `observed`, `estimated`, or `simulated`;
- values should show units and timestamps;
- the interface should distinguish current snapshot data from historical trends;
- demo data should be visibly labeled as seeded and non-live.

## Calculations

- **Total balance:** sum of wallet balances.
- **Liquid balance:** sum of balances classified as immediately movable or same-day movable.
- **Stablecoin mix:** stablecoin balance divided by total treasury balance.
- **Runway:** liquid balance divided by trailing monthly burn.
- **Stress runway:** runway after applying shock assumptions for depeg, withdrawal delay, and settlement friction.
- **At-risk capital:** balances in delayed, restricted, or concentration-breach states plus any stressed loss estimate.
- **Policy health:** weighted score based on unresolved alerts, concentration, missing labels, and screening exceptions.

## Entity model

- **Organization**
  - the treasury owner, fund, foundation, or payment company.
- **Snapshot**
  - a point-in-time state of the organization.
- **Wallet**
  - chain, custodian, role, liquidity bucket, balance, available amount, provenance, screening state.
- **Asset class**
  - stablecoin, fiat, BTC/ETH, yield-bearing, pending settlement.
- **Policy**
  - thresholds, allowlists, approval rules, and concentration limits.
- **Alert**
  - severity, source, impact, recommendation, state.
- **Action**
  - recommended next step with queue / complete state.
- **Event**
  - timestamped movement or state change.

## Wallet, security, privacy, compliance

- The product is read-only in the demo and should never imply direct wallet control.
- No seed phrases, private keys, or signing credentials are stored in the app.
- A production version should support role-based access, least-privilege permissions, and approval workflows.
- Allowlisted destinations and address-book labels should be visible and auditable.
- Compliance surface should include sanctions screening, blocked-asset handling, and transfer provenance.
- The product should explicitly note that Travel Rule, OFAC, and local legal obligations depend on the operator's jurisdiction and setup.
- Sensitive data exports should be optional, logged, and access-controlled.

## Onboarding, activation, retention

### Onboarding

- pick a treasury snapshot or connect a watch-only source;
- import or label treasury wallets;
- define a policy threshold set;
- review the first runway and risk snapshot.

### Activation

- first value is achieved when a user can answer: "how many months of runway do we have and what is the top risk?"
- the second activation moment is when at least one wallet is inspected and one alert is queued or resolved.

### Retention

- daily treasury review;
- weekly policy review;
- monthly board pack export;
- exception follow-up after depeg or payout changes.

### Success metrics

- time to first useful snapshot;
- percentage of wallets labeled;
- alert resolution time;
- weekly active treasury reviews;
- export frequency for board / audit packs;
- percent of treasuries with an identified top risk.

### Analytics events

- snapshot selected;
- tab changed;
- wallet inspected;
- alert resolved;
- action queued;
- stress slider adjusted;
- filter changed;
- export requested.

## Packaging and pricing hypothesis

This is a B2B SaaS product. Hypothesis only, not a market fact:

- **Starter:** single treasury, limited wallet count, basic runway and alerts.
- **Team:** multiple snapshots, policy thresholds, local persistence, exports, and alert queues.
- **Enterprise:** SSO, role-based permissions, multi-entity views, API exports, audit logs, and dedicated support.

Pricing should be tied to monitored treasury entities and active wallet count, not transaction volume.

## GTM narrative

The best entry point is not "better charts." It is "reduce treasury uncertainty."

Go to market with:

- a depeg and runway stress template;
- a wallet-labeling and policy setup playbook;
- customer stories around stablecoin payroll, supplier payouts, and intercompany treasury;
- partner channels through custody, stablecoin, and compliance infrastructure vendors.

Sales motion:

- founder-led outbound to finance leaders at crypto-native firms and payment companies;
- design partner pilots;
- content-led acquisition through treasury playbooks and benchmark reports;
- partner co-marketing with custody and stablecoin infrastructure vendors.

## Risks, dependencies, unknowns

- data quality can break trust if balances, labels, or screening are stale;
- compliance overreach can make the product feel like a legal promise;
- too much breadth would collapse the wedge back into a generic dashboard;
- too little operational depth would reduce the product to a report;
- real integrations with custody or indexer providers are the biggest dependency for production.

## Post-demo roadmap

1. live connectors for wallet/custody providers;
2. richer policy rules and approval workflows;
3. alert routing to Slack or email;
4. audit exports and board pack generation;
5. historical scenario comparison;
6. per-entity permissions and SSO;
7. automated treasury recommendations and rebalancing guidance.

