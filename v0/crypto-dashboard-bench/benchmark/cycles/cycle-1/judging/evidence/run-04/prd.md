# PRD: Harbor Treasury

## 1. Product thesis

Harbor Treasury is a stablecoin treasury control tower for finance and operations teams that need to release cross-border payouts while balancing liquidity, reserve confidence, custody controls, and compliance posture.

Category: crypto treasury operations and payout risk management.

Positioning: "The operating layer between wallets and treasury decisions."

Differentiated promise: Harbor does not just show balances. It recommends the safest acceptable payout path for each release based on issuer policy, rail health, custody context, sanctions state, and liquidity availability.

## 2. Target users

Primary user:
- Treasury operations manager at a payments company, exchange, OTC desk, or global fintech.

Primary buyer:
- VP Finance, Treasurer, Head of Treasury, or COO.

Secondary users:
- Compliance reviewer.
- Controller or finance manager.
- Operations analyst monitoring payout queues.

Jobs to be done:
- Decide whether to release, hold, reroute, or rebalance a payout.
- Keep enough working capital on the right chain and issuer rail.
- Explain treasury decisions to compliance, auditors, and leadership.
- Reduce manual Slack-and-spreadsheet coordination between treasury and compliance.

Buying trigger:
- Stablecoin payout volume has grown past ad hoc operational control.
- A new geography or counterparty set introduces issuer or sanctions complexity.
- Audit, banking, or board stakeholders demand clearer governance evidence.

## 3. Scope

In scope for MVP:
- Unified treasury view across stablecoin rails, chains, and custody contexts.
- Payout queue with release recommendations.
- Reserve and policy posture by issuer.
- Rail-health comparison including ETA and fee posture.
- Exception handling for sanctions review and policy-watch corridors.
- Rebalance suggestion when operating wallets fall below target floors.
- Audit-friendly decision log export.

Out of scope:
- Live wallet connection.
- Transaction signing.
- Direct blockchain data ingestion.
- Tax reporting.
- Retail portfolio analytics.
- DeFi strategy optimization.

## 4. Core workflow

1. Operator opens the payout board.
2. Product highlights unresolved exceptions and working-capital imbalances.
3. Operator selects a payout and sees requested rail versus suggested rail.
4. Product explains the recommendation using reserve preference, sanctions status, corridor constraints, and available liquidity.
5. Operator approves a seeded release, holds for compliance, or exports the decision log.
6. Operator reviews whether a rebalance is needed after releases.

## 5. Functional requirements

### Treasury visibility

1. The system must display balances by stablecoin, chain, issuer, and custody context.
2. The system must display available operating capital separately from total balances.
3. The system must expose target minimums for operating buckets.

Acceptance criteria:
- A user can identify which wallet bucket is below target without reading documentation.
- Each bucket shows total balance, available balance, and risk posture.

### Payout release board

1. The system must list payouts with counterparty, corridor, amount, due time, and current status.
2. The system must support filtering by `all`, `ready`, `review`, and `queued`.
3. The system must persist the filter and selected payout locally in the browser.

Acceptance criteria:
- Changing the filter updates the queue immediately.
- Refreshing the page preserves filter and selection state.

### Recommendation engine, demo version

1. For each payout, the UI must show requested rail and suggested rail.
2. The UI must explain recommendation logic in plain language.
3. The UI must clearly label all recommendations as seeded demo output, not live execution logic.

Acceptance criteria:
- A reviewer can tell why a payout is held or rerouted.
- No screen implies a live market or live wallet action.

### Risk and trust communication

1. The system must show issuer reserve posture and rail-health inputs.
2. The system must distinguish between low, medium, and high policy risk.
3. The system must show unresolved exceptions in a dedicated stack.

Acceptance criteria:
- Risk information is visible without modal drilling.
- A high-scrutiny rail can still appear operationally useful, but not silently preferred.

### Compliance and auditability

1. The system must surface sanctions review as a blocking state.
2. The system must support an acknowledge/re-open pattern for alerts.
3. The system must include language appropriate for audit and governance review.

Acceptance criteria:
- A payout under review cannot look equivalent to a ready payout.
- Exception actions remain visible after refresh using local storage.

## 6. Data model

Core entities:
- `TreasuryBucket`: rail, issuer, chain, venue/custody context, total balance, available balance, target floor, settlement time, risk.
- `Payout`: counterparty, corridor, amount, due time, requested rail, suggested rail, sanctions state, reserve preference, status, note.
- `ReserveSnapshot`: issuer, stablecoin, reserve mix, attestation lag, redemption context, concentration note, policy state.
- `NetworkHealth`: rail, cost basis, ETA, health state, note.
- `Alert`: severity, title, detail, recommended action.

Calculations and assumptions:
- Available operating capital = sum of `availableNow`.
- Capital under elevated scrutiny = sum of balances in medium/high risk buckets.
- Ready-to-release volume = sum of payouts with `ready` status.
- All values in the demo are seeded examples for UX demonstration, not current market facts.

Data source assumptions for a production product:
- Custody/wallet data from institutional wallet providers or internal ledgers.
- Payout queue and counterparty metadata from internal treasury or TMS systems.
- Reserve disclosures from issuers.
- Chain health and fees from approved market/on-chain data providers.
- Sanctions and screening results from compliance vendors.

Freshness requirements:
- Every panel must display last-updated or snapshot context in production.
- Different data types may refresh on different cadences and must not be normalized into fake simultaneity.

## 7. Security, permissions, privacy, compliance

1. Role-based access:
- Treasury operator can prepare and release within policy.
- Compliance reviewer can resolve flagged beneficiaries.
- Finance leadership can view but not execute.

2. Security expectations:
- No private keys handled in the product UI.
- Integration architecture assumes external custody/signing systems.
- Every release decision must have an immutable audit trail in production.

3. Privacy:
- Counterparty and payout metadata may be commercially sensitive and require least-privilege access.

4. Compliance:
- Product must support sanctions review, beneficiary/originator data capture, and exception logging.
- Product must not claim legal compliance by itself; it supports compliance operations.

## 8. Onboarding and activation

Onboarding hypothesis:
1. Connect custody/ledger sources.
2. Define approved rails and watchlisted rails.
3. Set operating wallet target floors by corridor.
4. Import payout queue.
5. Run first release meeting from Harbor.

Activation event:
- Team completes a payout review session and exports a decision log without leaving the product.

Retention loop:
- Daily payout triage.
- Intraday liquidity check and rebalance decision.
- Weekly issuer/risk review.

## 9. Success metrics and analytics

Product metrics:
- Percentage of payout value released through policy-preferred rails.
- Time from payout creation to release decision.
- Number of manual exception escalations per 100 payouts.
- Frequency of below-target operating wallet states.
- Share of payout decisions with exported audit logs.

Go-to-market metrics:
- Time to first connected data source.
- Activation rate by invited operator teams.
- Conversion from pilot to paid deployment.

## 10. Packaging and pricing hypothesis

1. Platform subscription priced for treasury teams, not per-wallet consumers.
2. Base tier: dashboard, queue, and export.
3. Growth tier: policy workflows, approvals, corridor templates, and more seats.
4. Enterprise tier: SSO, audit exports, integration support, and custom controls.

## 11. GTM narrative

Narrative:
"Stablecoin treasury gives you 24/7 settlement, but also 24/7 responsibility. Harbor turns fragmented wallet, issuer, and chain signals into a release decision your finance team can defend."

Launch motion:
1. Design partners among PSPs, exchanges, and fintechs already using stablecoin payout corridors.
2. Sell through treasury modernization and governance language, not trading alpha.
3. Lead with operational risk reduction and audit readiness.

## 12. Risks, dependencies, unknowns

Risks:
- Buyers may prefer to extend incumbent custody platforms instead of buying a new control layer.
- Corridor acceptance varies materially by issuer and chain.
- Compliance processes can differ across jurisdictions and customer types.

Dependencies:
- Reliable custody and payout data integrations.
- Compliance screening vendors.
- Issuer transparency that is sufficiently regular to model policy confidently.

Unknowns:
- How much automation buyers will trust before requiring human review.
- Whether teams want one global policy engine or corridor-specific operating playbooks.

## 13. Post-demo roadmap

1. Policy configuration UI with thresholds and routing rules.
2. Multi-step approval chains with immutable decision history.
3. Scenario simulation for issuer depeg, chain congestion, or custody outage.
4. Treasury forecasting and prefunding recommendations.
5. ERP/TMS export and reconciliation flows.
