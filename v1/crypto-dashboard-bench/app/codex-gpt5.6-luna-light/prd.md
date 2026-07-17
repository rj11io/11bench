# Cairn product requirements

## Thesis and positioning

Cairn is a read-only treasury intelligence cockpit for small crypto teams. “Know what changed, what is exposed, and whether you can pay—before you sign.” It combines portfolio reconciliation, policy-aware liquidity, and explainable review items in one daily operating loop.

Primary user: treasury/finance operator. Secondary: CFO/board (read-only report) and security lead (review queue). Buying trigger: a larger treasury, first payroll/vendor run, a near-miss, or a request for board-grade reporting.

## Scope and non-goals

In scope: watch-only vaults; seeded snapshot mode; NAV, allocation, runway, chain and counterparty exposure; review queue; payment readiness check; report preview; provenance and freshness states; responsive UI; local preference persistence.

Non-goals: custody, wallet connection, signing, swaps, tax filing, investment advice, guaranteed prices, automated remediation, or live financial data in this demo.

## Core workflows and acceptance criteria

1. **Morning brief:** select a vault, inspect NAV change, then open a review item. Acceptance: user sees time window, units, source, seeded/live status, and a plain-language reason.
2. **Can we pay?:** enter a payment amount and chain, compare to policy floor and liquid balance. Acceptance: result is one of Ready / Review / Blocked with calculation and no transaction execution.
3. **Prepare report:** filter a time window and open report preview. Acceptance: report includes snapshot time, allocation, risk notes, and data caveats.
4. **Investigate:** switch between overview and risk queue; select an item for detail. Acceptance: selected item explains impact, evidence, next safe action, and confidence.

## Data, calculations, and provenance

Position = units × price observation. NAV = Σ position values. Liquid balance is only positions marked liquid by policy. Runway days = liquid balance ÷ average daily operating outflow. Payment readiness subtracts proposed payment from liquid balance and compares to `policyFloor`. Demo observations are fictional seeded fixtures with a snapshot timestamp, provider labels, and confidence values. Production dependencies: chain indexer, market-data provider, accounting ledger, Safe transaction service, and an immutable observation store.

## Trust, privacy, compliance

Read-only addresses only; never collect seed phrases or private keys. Explicit permission scopes, address verification, encrypted secrets, audit log, retention controls, and export/delete controls are required for production. Flag jurisdiction, money-transmission, custody, sanctions, and securities questions for counsel; product language must remain operational and non-advisory. Every alert must expose evidence and allow dismissal with reason.

## Activation, retention, analytics, GTM

Activation = add one watch-only vault, set a runway floor, and export/share the first brief. Track `vault_created`, `policy_set`, `review_opened`, `payment_check_completed`, `report_exported`, and `alert_dismissed`; never log private data. Weekly report sharing is the acquisition loop; partner with crypto accounting firms and Safe implementers.

Packaging hypothesis: Free one vault / 7-day history; Core $99/mo one vault / 90-day history / alerts; Team $299/mo five vaults / exports / roles; Enterprise custom. Validate willingness-to-pay with 10 treasury interviews and report-sharing conversion before building execution.

## Risks, dependencies, roadmap

Risks: stale indexes, token identity ambiguity, price-source disagreement, false-positive alerts, regulatory scope creep, and key-management expectations. Unknowns: minimum viable historical depth, best policy presets, and whether CFOs prefer PDF or a share link. Post-demo: wallet/indexer connectors, multi-source reconciliation, historical anomaly detection, role-based approvals, exports, and a counsel-reviewed compliance pack.
