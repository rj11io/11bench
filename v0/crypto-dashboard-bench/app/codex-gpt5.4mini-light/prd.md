# PRD: Treasury Risk Cockpit

## Product thesis

Build the best decision surface for a crypto finance team that needs to **move funds safely, explain exposure quickly, and keep treasury decisions auditable**.

This is not a consumer portfolio tracker and not a generic market terminal. The product is an **operator console** for teams that manage operational treasury across wallets, chains, and counterparties.

## Category and positioning

- Category: crypto treasury, wallet-risk, and transfer governance.
- Positioning: “See every treasury wallet, exposure, policy, and exception in one decision loop.”
- Differentiated promise:
  - fast understanding of treasury composition,
  - clear policy and risk interpretation before transfer,
  - time-aware provenance and screening,
  - audit-ready activity history.

## Primary user

### CFO / Treasury operator

Jobs to be done:

- understand available runway and stablecoin coverage;
- decide whether funds can move now or need review;
- spot concentration, depeg, or chain-specific exposure;
- explain treasury state to leadership, auditors, or compliance.

Pain points:

- balances live in multiple wallets and chains;
- pricing and labels are inconsistent across sources;
- transfers get blocked late because screening or approvals are not surfaced early;
- audit evidence is fragmented across tools.

Buying trigger:

- a treasury rebalance,
- a new wallet rollout,
- a custody/provider change,
- a compliance incident,
- or an audit / board reporting cycle.

## Secondary users

### Compliance / risk analyst

- reviews transfers, counterparties, sanctions exposure, and policy exceptions;
- needs a queue, not a chart wall.

### Finance controller / accountant

- needs exportable, timestamped records;
- wants history and provenance for valuation and reporting.

### Protocol / operations lead

- monitors working capital wallets, market-making wallets, grants wallets, or multisig vaults;
- needs quick approval routing and exception logging.

## Scope

### In scope for the demo

- treasury overview with total value, stablecoin coverage, and concentration;
- wallet inventory with custody and freshness indicators;
- asset breakdown with volatility and liquidity semantics;
- transfer review queue with screening and policy state;
- approval reasoning and risk explanation panel;
- activity timeline with seeded transaction data;
- local persistence for user-selected filters and the selected wallet.

### Out of scope

- live wallet connection;
- real signing;
- backend ingestion;
- tax lot accounting;
- real-time exchange execution;
- multi-user permission management;
- KYC onboarding.

## Core workflows

### 1. Triage treasury health

User opens the dashboard and answers:

- what is in treasury?
- which wallets are exposed?
- what changed since the last review?
- are there any stale or blocked data points?

Acceptance criteria:

- the dashboard shows total value, stablecoin ratio, and concentration;
- each wallet shows freshness and custody type;
- at least one risk or exception state is visible with a plain-language explanation.

### 2. Review a transfer request

User selects a transfer request and reviews:

- amount,
- destination label,
- screening result,
- policy check,
- required approvers,
- and recommended action.

Acceptance criteria:

- the request can be moved between `Pending`, `Escalated`, `Approved`, and `Blocked` states in the demo;
- the explanation updates with the selected state;
- the event is persisted locally.

### 3. Drill into a wallet

User opens a wallet detail panel to inspect:

- balances,
- recent transfer history,
- counterparties,
- protocol exposure,
- and relevant alerts.

Acceptance criteria:

- the selected wallet remains visible after reload;
- the panel includes provenance and freshness;
- the user can inspect wallet-specific risk.

## Requirements

### Functional

- Show a seeded but realistic treasury dataset.
- Provide wallet-level and treasury-level summaries.
- Provide filters for chain, risk level, and time window.
- Provide interactive review of a transfer request.
- Provide localStorage persistence for:
  - selected wallet,
  - selected time range,
  - risk filter,
  - transfer state changes.
- Provide drill-down from aggregate metrics to wallet detail.

### Data and calculations

- Asset values are displayed in USD using seeded values, not live prices.
- Runway is computed from stablecoin coverage and a seeded monthly burn estimate.
- Concentration is computed as the share of treasury value in the top wallet or top asset.
- Exposure breakdown groups assets into:
  - stablecoins,
  - majors,
  - staking / yield positions,
  - operational tokens,
  - idle cash.
- Risk score is a seeded composite of:
  - screening exposure,
  - custody posture,
  - transfer policy friction,
  - stale-data risk.

### Provenance and freshness

- Every key metric must show:
  - source class,
  - last refreshed time,
  - and whether the value is seeded demo data.
- The interface must never suggest live custody, live balances, or live returns.

### Security and trust

- No wallet connection is required.
- Copy must clearly state that demo data is seeded and non-authoritative.
- The UI must disclose custody mode and show that key signing is out of scope.
- The app must avoid suggesting the user has authenticated to a real account.

### Compliance

- The product should show:
  - screening status,
  - transfer exceptions,
  - wallet ownership/custody notes,
  - and audit trail snapshots.
- The product should acknowledge that crypto activity can carry sanctions, AML, accounting, and reporting obligations.

## Analytics

### Activation metrics

- first wallet selected,
- first transfer reviewed,
- first alert expanded,
- first filter applied.

### Retention metrics

- weekly return to review wallet health,
- repeated use of transfer review,
- alert resolution rate,
- export/view of audit timeline.

### Success metrics

- reduced time to approve or escalate a transfer,
- fewer transfers blocked for missing context,
- higher confidence in treasury coverage,
- fewer stale-data exceptions.

## Packaging and pricing hypothesis

- Starter: one treasury, basic wallet inventory, seeded alert rules.
- Team: multiple treasuries, transfer review queue, approval routing, exports.
- Enterprise: compliance workflows, custom policies, extended audit logs, SSO, and retention controls.

Pricing should likely be usage-based on:

- monitored wallets,
- alert volume,
- and governance modules.

## Launch motion and GTM narrative

### Launch motion

- Start with crypto-native companies and fintechs that already own treasury risk manually in spreadsheets and chat.
- Use a product-led wedge for one treasury workspace.
- Expand through compliance reviews, audit preparation, and approval workflow adoption.

### GTM narrative

- “Know what your treasury can safely move before you ask anyone to sign.”
- “One screen for balances, screening, approvals, and audit evidence.”
- “Built for operators who need to explain crypto exposure, not just display it.”

## Risks and dependencies

### Risks

- The category can slide into generic portfolio tracking if the workflow is not anchored to decisions.
- A too-broad product would compete with many better-funded generalist analytics tools.
- Risk data can be stale or incomplete without clear provenance.

### Dependencies

- reliable wallet and price enrichment;
- label/risk provider coverage;
- consistent policy rules;
- audit-friendly exports.

### Unknowns

- how much buyer appetite exists for a treasury-only product versus a custody-native bundle;
- what specific compliance integrations a target buyer expects first;
- whether stablecoin treasury teams want protocol exposure views or only liquidity and runway.

## Post-demo roadmap

1. Add multi-workspace support and role-aware views.
2. Add real data connectors for balances, approvals, and screening.
3. Add rule builder for treasury policies.
4. Add report exports for finance and compliance.
5. Add anomaly detection for outflows, depeg exposure, and counterparty drift.

