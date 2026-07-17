# PRD: Treasury Sentinel

## Product thesis

Stablecoin-native companies do not need another crypto price dashboard. They need a finance-grade cockpit that turns fragmented wallets, venues, stablecoin issuers, chain liquidity, and compliance signals into a daily funding decision.

Treasury Sentinel helps finance and operations teams decide whether to fund, pause, rebalance, or escalate the next payout window, with evidence that can be attached to an approval memo or audit request.

Category: stablecoin treasury risk and liquidity operations.

Positioning: "The decision cockpit for stablecoin treasury operations."

Differentiated promise: "Know what to fund, pause, rebalance, and evidence before money moves."

## Primary and secondary users

Primary user: Head of Finance / Treasury Operations at a stablecoin payment processor with multi-chain operating balances and recurring payout obligations.

Secondary users:

- CFO/COO: wants risk posture, runway, board-ready controls, and policy exceptions.
- Controller: wants valuation source, entity mapping, month-end evidence, and exports.
- Compliance lead: wants screening status, sanctions flags, jurisdiction exposure, and review trails.
- Wallet admin: wants read-only wallet coverage, signer policy visibility, and pending action status.
- Data/engineering lead: wants clean source lineage and warehouse/API integration.

Buying trigger:

- Business volume crosses a threshold where spreadsheet tracking becomes unsafe.
- A depeg, bridge incident, exchange freeze, or audit request exposes gaps.
- The company expands into a new region or stablecoin corridor.
- Leadership requires controls before launching 24/7 stablecoin payouts.

## Jobs to be done

- When preparing the next payout batch, I need to know whether each corridor has enough same-chain liquidity so that I can pay on time without emergency transfers.
- When stablecoin or venue risk changes, I need to see affected balances and routes so that I can rebalance before risk becomes loss.
- When an approver asks why we moved funds, I need a timestamped evidence memo so that the decision is auditable.
- When accounting closes the month, I need positions, valuations, source confidence, and exceptions in a form that can be reconciled.

## Scope

In scope for demo:

- Seeded organization, entities, wallets, stablecoin positions, routes, obligations, and risk signals.
- Scenario controls for base, volatile, depeg, and bridge incident states.
- Exposure dashboard by stablecoin issuer, chain, wallet, venue, and risk type.
- Payout readiness workflow for a 7-day and 30-day window.
- Suggested rebalance/pause actions with evidence checklist.
- Approval memo state persisted in localStorage.
- Empty, normal, volatile, and high-risk views.
- Clear "seeded demo data - not live" labels.

Production MVP scope:

- Read-only wallet import by address, Safe, Fireblocks, custodian statement, CSV, or data warehouse.
- Stablecoin issuer and token metadata registry.
- Balance ingestion with block height and timestamp.
- Market data integration for reference price, depth, spread, slippage, and venue limits.
- Compliance status import from customer provider or partner connector.
- Policy engine for concentration, runway, reserve-report age, stale data, unsupported chain, and high-risk route rules.
- Memo export to PDF/CSV/warehouse.

Non-goals:

- No trading, transfers, wallet signing, custody, yield optimization, tax filing, or investment advice.
- No claim to provide legal compliance clearance.
- No live wallet/API requirement for the benchmark demo.
- No universal token discovery feed or retail portfolio tracking.

## Core workflow

1. Treasury Ops opens the dashboard before the daily payout run.
2. They select an entity, obligation window, and risk scenario.
3. The dashboard shows runway, underfunded corridors, high-severity signals, and evidence confidence.
4. They inspect exposure by issuer, chain, venue, and route.
5. They review suggested actions such as "Move $750k USDC from Ethereum custody to Polygon payout wallet" or "Pause Arbitrum bridge route pending review."
6. They add notes, mark action owner/status, and export/share the memo.
7. The memo becomes the audit trail for the decision.

## Requirements and acceptance criteria

### R1 - Demo data and live-status clarity

Requirement: The product must never imply live market, wallet, transaction, or balance data in the demo.

Acceptance:

- A persistent "seeded demo data" badge is visible.
- Every table/chart has freshness and provenance text.
- No button says "connect live wallet" or "execute trade".
- Copy uses "simulated", "demo", or "would" for actions.

### R2 - Payout readiness

Requirement: User can evaluate whether obligations due in 7 or 30 days are funded under a selected scenario.

Acceptance:

- Window control changes coverage numbers and action recommendations.
- Underfunded rail count is visible.
- A route can show "not enough depth", "stale source", or "compliance review" separately.

### R3 - Stablecoin risk model

Requirement: Product must model stablecoin risk by issuer, chain, reserve report age, peg stress, and jurisdiction.

Acceptance:

- Exposure table shows issuer, asset, chain, amount, percent of liquid treasury, stress impact, report age, and status.
- Scenario changes stress impact and severity labels.
- U.S. and EU status are represented as attributes, not marketing claims.

### R4 - Liquidity route model

Requirement: Product must show whether funds can be moved through realistic routes.

Acceptance:

- Route table includes source, destination, capacity, slippage, ETA, venue/bridge limit, confidence, and risk.
- At least one route is normal, one is volatile, one requires review, and one has insufficient data.

### R5 - Evidence-linked action memo

Requirement: User can create a decision memo from suggested actions.

Acceptance:

- Memo includes recommendation, impacted amount, assumptions, evidence items, and owner/status.
- Notes and approval state persist across refresh with localStorage.
- User can reset demo state.

### R6 - Responsive and accessible UX

Requirement: Works at about 1440x900 and remains usable at about 375x812.

Acceptance:

- No horizontal overflow.
- Controls remain reachable on mobile.
- Tables collapse to cards or remain scroll-safe inside contained regions.
- Status colors have text labels and icon support.
- Buttons have visible focus states.

## Data sources and assumptions

Production source types:

- Wallet balances: chain RPC/indexer, Safe/Fireblocks/custodian APIs, internal wallet registry.
- Market price: CoinGecko/Coin Metrics/Kaiko-style reference rates with source and timestamp.
- Liquidity: order book depth, spread, slippage, withdrawal limits, bridge capacity, OTC desk quotes.
- Stablecoin metadata: issuer disclosures, reserve report URL/date, jurisdiction, token contract registry.
- On-chain context: Dune/DeFiLlama-style decoded or curated chain/protocol datasets.
- Compliance: customer screening vendor, OFAC SDN/consolidated list status, internal review results.
- Obligations: ERP/TMS/CSV import, payout batch file, invoices, payroll, grants, vendor schedule.

Demo assumptions:

- All numbers are seeded and fictional but plausible for a mid-market stablecoin payment company.
- Prices, balances, stress impacts, report ages, routes, and risk signals are not live.
- Freshness labels are part of the product design, not actual API calls.

## Calculations

- Eligible liquid balance: balance minus frozen/restricted/unmapped funds and policy reserve.
- Corridor coverage: eligible same-chain balance divided by obligations for the selected window.
- Runway days: eligible treasury divided by trailing average daily outflow.
- Peg stress impact: stablecoin exposure times scenario bps deviation.
- Liquidity capacity: minimum of order book depth at allowed slippage, venue withdrawal limit, bridge cap, and policy limit.
- Evidence confidence: weighted score across source freshness, balance coverage, valuation source, liquidity source, risk screening, and reserve-report recency.
- Concentration alert: exposure above policy threshold for issuer, chain, venue, or custodian.

## Entity model

- Organization
- LegalEntity
- WalletAccount
- CustodyProvider
- Chain
- Asset
- TokenContract
- StablecoinIssuer
- Position
- Obligation
- LiquidityRoute
- Venue
- RiskSignal
- Policy
- ActionRecommendation
- EvidenceItem
- Memo
- User
- Approval

## Wallet, security, privacy, and permissions

- Read-only import is the default.
- Any wallet authentication uses SIWE semantics with domain binding, nonce, chain ID, issued-at time, and human-readable statement.
- Private keys, seed phrases, and signing requests are never requested.
- Wallet labels and entity mappings are private customer data.
- Role permissions: viewer, analyst, treasury operator, approver, admin.
- Actions in MVP are recommendations only; execution remains in the customer's custody/workflow system.
- Audit log captures data version, user, timestamp, changed fields, and memo status.

## Compliance and risk requirements

- Clearly distinguish risk screening from legal clearance.
- Support U.S. stablecoin issuer fields: permitted issuer status, reserve report date, monthly certification status where available.
- Support EU MiCA fields: ART/EMT authorization status and CASP support status where available.
- OFAC/sanctions result must include source, timestamp, and whether it is unresolved, reviewed, or cleared by customer policy.
- DeFi/bridge routes must show protocol exposure and cyber/operational risk status.
- Product copy must avoid investment advice and yield recommendations.

## Onboarding and activation

Onboarding:

1. Import organization and legal entities.
2. Add read-only wallets and venues by address, CSV, Safe/Fireblocks/custodian export, or warehouse table.
3. Map wallets to entities and purposes.
4. Import obligations/payout schedule.
5. Set policies: reserve runway, concentration, stale data, route limits, compliance review triggers.
6. Generate first "7-day payout readiness" memo.

Activation event: first memo with at least 80% balance coverage, at least one obligation source, and one approver assigned.

Retention loops:

- Daily payout readiness digest.
- Weekly risk posture report.
- Month-end evidence pack.
- Policy exception inbox.
- New reserve report or compliance-status change notifications.

## Metrics and analytics

North-star metric: approved payout/risk memos generated per active finance team per month.

Activation:

- Time to first wallet coverage > 80%.
- Time to first 7-day memo.
- Percent of wallets/entities mapped.

Engagement:

- Weekly active finance users.
- Alerts reviewed within SLA.
- Memo export/share count.
- Policies configured per organization.

Business value:

- Manual spreadsheet hours replaced.
- Underfunded payout windows caught before execution.
- Unreviewed high-risk exposure reduced.
- Month-end evidence prep time reduced.

## Packaging and pricing hypothesis

- Starter, $1,500/month: one entity, 25 wallets, CSV/address import, weekly memo, standard policies.
- Growth, $5,000/month: five entities, 250 wallets, Safe/Fireblocks/custodian imports, alert routing, warehouse export, custom policies.
- Enterprise, $15,000+/month: unlimited entities/wallets, SSO, premium market data connectors, custom risk model, dedicated implementation, compliance/audit evidence package.

## Launch motion

Beachhead: stablecoin payment processors and protocol foundations with multi-chain payout obligations.

Channels:

- CFO/controller communities in Web3.
- Partnerships with custody, accounting, and audit/advisory firms.
- Content: "Stablecoin treasury readiness checklist" and "depeg rehearsal template".
- Product-led demo from CSV/address import: produce a sample risk memo in under 15 minutes.

Launch narrative:

"Stablecoins made money move 24/7. Treasury controls still run on weekly spreadsheets. Treasury Sentinel gives finance teams a daily evidence-backed answer before funds move: fund, pause, rebalance, or escalate."

## Risks, dependencies, and unknowns

Risks:

- Data gaps or stale vendor feeds can create false confidence.
- Compliance interpretation varies by jurisdiction.
- Premium market/liquidity data can be expensive.
- Teams may expect execution, but MVP is monitoring and decision support.
- Wallet labeling/entity mapping is operationally messy.

Dependencies:

- Reliable chain/indexer coverage.
- Stablecoin issuer metadata and reserve-report ingestion.
- Market data for slippage/depth.
- Customer obligation source.
- Screening/compliance provider integration or import.

Unknowns:

- Which buyer owns budget: finance, operations, compliance, or custody admin?
- How much users will pay without execution integration?
- Whether stablecoin-specific wedge should expand to broader token treasury after activation.
- Which connectors are must-have for first 10 customers.

## Post-demo roadmap

1. Import wizard for wallets, CSV obligations, and policy thresholds.
2. PDF evidence export with source links and hashes.
3. Alert routing to Slack/email/ticketing.
4. Warehouse sync and API.
5. Premium market data connector for execution-quality liquidity.
6. Compliance vendor integration.
7. Safe/Fireblocks action deep links that prefill but do not execute transfers.
8. Accounting package export for month-end.

