# PRD: Reserve Desk

## Product Thesis

Reserve Desk is a read-only treasury risk console for crypto-native finance teams. It turns wallets, protocol positions, and market feeds into a daily review loop that answers four questions quickly:

1. Are the balances real and reconciled?
2. Do we have enough liquid coverage for near-term obligations?
3. Which protocol, wallet, or counterparty deserves attention?
4. Can we produce a board-ready evidence pack without spreadsheet archaeology?

The differentiated promise is not execution, custody, or tax filing. It is faster, better-grounded treasury judgment with explicit provenance and risk semantics.

## Category and Positioning

- Category: crypto treasury risk management and operational visibility.
- Positioning: the control tower for stablecoin reserves, operating wallets, and yield sleeves.
- Differentiated promise: every number in the dashboard carries a basis, freshness stamp, and review state.

## Primary User

Primary user:

- Treasury lead, controller, or finance ops lead at a crypto-native company or stablecoin issuer.

Secondary users:

- CFO or finance director.
- Compliance lead.
- Protocol ops lead or treasury committee member.

## Jobs To Be Done

Primary JTBD:

- Review treasury posture each day and decide whether to rebalance, hold, escalate, or export evidence.

Secondary JTBD:

- Reconcile reported and calculated balances.
- Monitor yield sleeves and protocol exposure.
- Spot liquidity, volatility, and counterparty risk before the monthly close or board meeting.
- Keep sanctions and provenance concerns visible without turning the app into a forensics tool.

## Buying Trigger

Typical trigger events:

- treasury assets are fragmented across wallets, custodians, and protocols;
- reported and calculated balances do not match cleanly;
- near-term obligations are rising and coverage is unclear;
- a protocol sleeve or bridge position has become too concentrated;
- the board asks for a daily or weekly pack and the team is rebuilding it manually;
- compliance wants a more explicit sanctions review trail.

## Scope

### In Scope

- Multi-wallet treasury overview.
- Reported vs calculated balance mode.
- Treasury coverage and runway metrics.
- Protocol exposure by type, value, APY, and lock/freshness status.
- Risk queue for stale data, balance mismatch, concentration, and sanctions review.
- Source provenance and freshness table.
- Board-pack snapshot generation.
- Local persistence of filters and review states.

### Out of Scope

- Custody.
- Trading or settlement execution.
- Live wallet connection or private key handling.
- Tax return generation.
- Legal advice or regulatory determinations.
- Full AML/fraud forensics.

## Core Workflow

1. Open the dashboard and see the current treasury posture.
2. Choose a scenario view or balance basis if needed.
3. Review the open risk items.
4. Drill into wallet balances and protocol positions.
5. Mark an item as reviewed or acknowledge a source issue.
6. Generate a board pack snapshot with the current basis, freshness, and risk summary.

## Functional Requirements

### Dashboard

- Show a treasury summary card with selected basis, liquidity coverage, risk score, and open items.
- Show a chart of reported vs calculated value over a selected time range.
- Show a compact decision queue with the most important unresolved items.
- Keep the layout usable at desktop and mobile widths.

### Wallets

- Show each wallet with chain, custody type, policy headroom, freshness, and balance basis.
- Display reported and calculated balances side by side.
- Highlight mismatches above a configured threshold.
- Allow search filtering by wallet name, chain, custody type, or tag.

### Protocols

- Show protocol exposure as a separate object from wallet balances.
- Surface position type, APY, TVL, and exit or unlock context.
- Rank protocol sleeves by risk contribution.

### Risk and Compliance

- Surface stale sources, balance mismatch, concentration risk, and sanctions review prompts.
- Allow a user to mark an alert as reviewed locally.
- Make clear that informational signals are not safety guarantees.

### Evidence and Reporting

- Show all active data sources with method, freshness, and what they power.
- Provide a board pack snapshot with basis, timestamp, open items, and evidence references.
- Expose the demo as seeded data, not live data.

## Data Sources

Primary source classes:

- Price feed: contract-address pricing and market data.
- Market/liquidity feed: liquidity and volatility context.
- Wallet feed: reported balances from a connected or simulated source.
- Ledger/reconciliation feed: calculated balances from transaction history.
- Protocol feed: TVL, APY, and position metadata.
- Compliance feed: sanctions or watchlist review context.

Assumptions:

- All external data is read-only.
- Freshness is displayed per source.
- The demo uses seeded data only, with no backend dependencies.

## Entity Model

- Workspace: the operating treasury being reviewed.
- Wallet: a custody or operating account with a reported and calculated balance.
- Protocol position: a yield, lending, staking, or liquidity sleeve associated with a wallet or strategy.
- Liability: near-term operational obligations used to calculate coverage.
- Source: the upstream feed used for pricing, balances, or compliance context.
- Alert: a review item tied to a wallet, protocol, or source.
- Board pack snapshot: a time-stamped export of the current review state.

## Calculations

- Treasury value: sum of selected balances under the chosen basis.
- Liquid coverage: liquid USD available divided by near-term obligations.
- Balance gap: reported minus calculated balance.
- Protocol concentration: protocol sleeve value divided by total treasury value.
- Risk score: weighted score derived from freshness, mismatch size, concentration, and compliance flags.

All calculations must be labeled as demo calculations derived from seeded data.

## Security, Privacy, and Compliance

- Do not request wallet credentials, seed phrases, or private keys.
- Do not imply custody or control over funds.
- Make read-only posture obvious in the UI and documentation.
- Treat sanctions and compliance indicators as review prompts, not legal determinations.
- Avoid storing any sensitive data beyond local demo preferences and review state.
- If the app mentions screening, make it clear that screening is limited to the seeded demo data.

## Onboarding and Activation

Activation moment:

- the user sees the current posture, finds at least one actionable item, and can explain the basis for the main number.

Onboarding steps:

- select the treasury scenario;
- choose reported or calculated basis;
- review the first alert;
- open the board-pack snapshot.

## Retention Mechanics

- Daily review state persists in localStorage.
- Reviewed alerts remain muted until reset.
- Search and scenario controls persist so the user can reopen the same review context.
- The dashboard makes it obvious when the source set is stale or a balance mismatch is unresolved.

## Success Metrics

Product metrics:

- time to first meaningful review;
- number of alerts reviewed per session;
- number of board-pack exports;
- number of times reported/calculated mode is switched;
- percentage of sessions with at least one drill-down into wallets or protocols.

Business metrics:

- demo-to-pilot conversion;
- workspace expansion from treasury to compliance or finance;
- weekly active treasurers per workspace.

## Packaging and Pricing Hypothesis

Hypothesis:

- Starter: 1 workspace, limited wallets, basic reporting, monthly subscription.
- Pro: more wallets, more sources, board-pack export, custom alerts.
- Enterprise: multiple workspaces, policy packs, SSO, audit trail, custom data retention.

The likely buyer is not retail. It is a finance team that will pay to reduce manual review time and improve decision quality.

## Launch Motion

- Design-partner launch with 5 to 10 crypto-native finance teams.
- Pair each design partner with a daily review workflow and a board-pack outcome.
- Publish a category narrative around “treasury posture, not just portfolio value.”
- Use trust-led content: balance reconciliation, coverage, source freshness, and compliance review.

## Risks and Unknowns

- The wedge may overlap with accounting software if the product drifts too far into reporting.
- Users may expect execution or custody if the language is not disciplined.
- Sanctions and compliance language can become misleading if it sounds like a guarantee.
- Data provenance must stay explicit or the dashboard loses trust.
- The product needs a sharper path from review to action in a real implementation.

## Post-Demo Roadmap

1. Connector layer for real read-only wallet, exchange, and protocol feeds.
2. User-specific saved views and alert policies.
3. Evidence export to PDF/CSV/board-pack templates.
4. Role-based review and approval history.
5. More advanced pricing and liquidity confidence scoring.
6. Source-level lineage and anomaly detection.
7. Compliance review queues and counterparty screening hooks.
