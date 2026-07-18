# PRD: StableOps Radar

## Product thesis

Stablecoin use is becoming operational infrastructure, but treasury teams still manage it like a fragmented trading portfolio: custodian dashboards, wallet explorers, spreadsheets, compliance screens, and ad hoc market checks. StableOps Radar turns stablecoin balances into an auditable operating decision: fund this corridor, pause it, or rebalance before risk breaches policy.

## Category, positioning, promise

- **Category**: stablecoin treasury risk operations.
- **Primary positioning**: a control-room dashboard for treasury, payments, and risk teams that move stablecoins across chains and venues.
- **Differentiated promise**: "Know which stablecoin balances are actually usable before the cutoff, with provenance, risk semantics, and approval-safe next actions."

## Users

Primary user:

- Treasury or payments operations lead at a fintech, exchange, OTC desk, market maker, crypto payroll provider, or protocol treasury.

Secondary users:

- Risk/compliance officer reviewing sanctions, issuer, and counterparty constraints.
- CFO/controller reviewing stablecoin exposure, audit trails, and month-end evidence.
- Operations analyst responsible for funding wallets and corridors.

Buying trigger:

- A stablecoin depeg, liquidity event, sanctions concern, delayed payout batch, failed exchange top-up, auditor request, or board mandate for more formal digital-asset controls.

## Jobs to be done

- When a payout, collateral, redemption, or settlement deadline is approaching, determine which stablecoin balances can be used without breaching policy.
- When market or compliance conditions change, identify affected balances and draft a risk-off rebalance plan.
- When auditors or risk leaders ask why a transaction path was chosen, show source provenance, policy thresholds, approvals, and timestamps.

## Scope

In scope for MVP:

- Read-only treasury inventory across wallets, custodians, exchanges, and internal ledgers.
- Stablecoin-specific issuer, chain, venue, balance, availability, peg, liquidity, concentration, compliance, and operational policy views.
- Corridor policies: need, deadline, allowed rails, blocked venues, minimum depth.
- Risk threshold controls and alerting.
- Rebalance draft workflow with approval state and audit note.
- Exportable evidence pack for selected decision.

Out of scope for MVP:

- Direct transaction signing.
- Tax accounting.
- Derivatives execution.
- Consumer portfolio tracking.
- Token discovery and speculative trading recommendations.
- Legal classification advice.

## Core workflow

1. User selects a corridor, such as LATAM payouts, exchange margin top-up, or weekend redemption buffer.
2. Dashboard shows total monitored stablecoins, immediately available balance, policy-safe coverage, active alerts, and weighted risk.
3. User filters by issuer or scenario and adjusts policy thresholds.
4. Position table shows issuer, chain, venue, balance, peg, liquidity depth, settlement time, risk score, eligibility, and provenance.
5. Alert center explains exceptions and recommended actions.
6. User drafts an approval plan from eligible balances.
7. System records the draft locally in the demo; production would route to approval and transaction systems.

## Functional requirements

- The product must label all demo data as seeded and not live.
- The product must never request wallet connection, seed phrase, private key, credentials, paid API, or backend service in the demo.
- The product must show timestamps and provenance for data.
- The product must support normal, volatile, incident, and empty states.
- The product must persist risk threshold settings and acknowledged alerts locally.
- The product must calculate corridor coverage and policy-safe coverage separately.
- The product must show why a position is blocked or eligible.
- The product must show peg movement in basis points.
- The product must show liquidity depth and settlement time, not only token balance.
- The product must show issuer mix to expose concentration.

## Acceptance criteria

- At `/<ANONYMIZED_RUN>`, the user can select all seeded scenarios.
- In volatile and incident scenarios, active alerts and risk badges visibly change.
- In empty state, the UI communicates no matching records without breaking layout.
- Threshold sliders change row breach labels and persist after reload.
- Acknowledging an alert persists after reload.
- Draft approval displays a clear message that no transaction was created.
- Layout has no horizontal overflow at approximately 375x812.
- Desktop at approximately 1440x900 shows summary, controls, position health, charts, alerts, and rebalance workflow in one coherent workspace.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.

## Data sources and assumptions

Production sources:

- Custodian and exchange APIs for account balances, availability, pending transfers, policy state.
- Wallet indexers for on-chain balances and pending transactions.
- CoinGecko/CoinMarketCap-style market feeds for price, volume, market cap, and update timestamps.
- DEX/on-chain liquidity sources such as Uniswap subgraphs or GeckoTerminal-style pool data.
- DefiLlama-style datasets for TVL, stablecoins, treasuries, bridge volume, yields, hacks, and CEX transparency.
- Issuer reserve/transparency pages for Circle, Tether, Paxos/PayPal, and others.
- AML/sanctions vendors for entity labels and address risk.
- Internal ledger for business ownership, corridor demand, and accounting categories.

Demo assumptions:

- All data is seeded static data dated July 16, 2026.
- No seeded value is live, tradable, or a claim about current balances.
- Risk scores are illustrative composites for product demonstration.
- Prices and liquidity depths are intentionally plausible but synthetic.

Calculations:

- Total monitored = sum of displayed position balances.
- Immediately available = sum of available balance by displayed positions.
- Corridor coverage = immediately available / selected corridor need.
- Policy-safe coverage = available balance from positions passing corridor rail, blocked venue, and minimum liquidity checks / selected corridor need.
- Weighted risk = balance-weighted average risk score.
- Breach labels compare position metrics to current UI thresholds: peg basis points, liquidity depth, risk score.
- Issuer mix = issuer balance / total displayed balance.

Entity model:

- Organization, user, team, policy set, corridor, treasury account, account address, instrument, issuer, chain, venue, position, market observation, risk observation, alert, approval plan, audit event.

## Security, privacy, permissions

- Read-only mode by default.
- No private key, seed phrase, or signing request in analytics product.
- Source-specific OAuth/API permissions with least privilege.
- SSO/SAML and SCIM for enterprise.
- Role-based access: viewer, analyst, approver, admin.
- Policy changes and alert acknowledgments require audit events.
- Private labels and entities are tenant-private.
- Data retention controls by source type.
- Production approval plans must route to existing custody/policy systems, not bypass them.

## Compliance and risk requirements

- Show sanctions/high-risk entity exposure only as risk intelligence, not legal advice.
- Keep issuer reserve source links and last reviewed timestamps.
- Flag stale, inferred, or low-confidence data.
- Support jurisdiction-specific policy packs but avoid universal legal claims.
- Maintain Travel Rule readiness for transfer workflows by tracking originator/beneficiary metadata requirements where applicable.
- Provide audit evidence for every rebalance decision: who, what, threshold set, source timestamps, alert state, approval trail.

## Onboarding and activation

Onboarding:

1. Create tenant and invite treasury/risk users.
2. Connect read-only data sources: custodian, exchange, wallet index, internal ledger.
3. Label accounts and assign ownership.
4. Import or create corridors.
5. Configure policy thresholds and alert destinations.
6. Run a "first funding decision" simulation.

Activation event:

- User resolves or drafts action for the first policy-relevant alert with a complete evidence trail.

Retention loops:

- Daily pre-cutoff corridor readiness email.
- Weekly stablecoin concentration and reserve provenance review.
- Incident templates for depeg, liquidity, sanctions, bridge, and chain outage events.
- Month-end audit export.

## Success metrics and analytics

North-star metric:

- Policy-safe stablecoin flow monitored per month.

Product metrics:

- Corridors configured.
- Connected source coverage.
- Percent of balances with fresh provenance.
- Alerts acknowledged within SLA.
- Draft-to-approved action rate.
- Incidents detected before cutoff.
- Audit exports generated.

Business metrics:

- Qualified pipeline from treasury/risk teams.
- Time to first connected source.
- Net revenue retention by monitored volume.
- Enterprise conversion from team plans.

## Pricing and packaging hypothesis

Team:

- $1,500-$3,000/month.
- Up to 10 seats, 5 sources, seeded policy templates, Slack/email alerts, CSV evidence exports.

Enterprise:

- Annual contract based on monitored stablecoin balance and monthly flow volume.
- SSO, audit API, custom policy engine, custody/exchange connectors, AML vendor integration, SOC 2 package, support SLA.

## GTM narrative

Stablecoins are no longer only trading inventory. They are operating cash. StableOps Radar gives treasury teams the control layer they expect from traditional cash management while respecting crypto-native realities: chain risk, issuer reserves, liquidity depth, wallet labels, compliance labels, and approval policies.

Initial ICP:

- Fintechs/payment companies with recurring stablecoin payouts.
- Crypto exchanges and OTC desks with multi-venue stablecoin liquidity.
- Protocol foundations and DAOs with stablecoin runway.
- Market makers with exchange/custodian float.

Launch motion:

- Publish stablecoin treasury policy templates.
- Run design-partner pilots after a depeg/liquidity tabletop exercise.
- Partner with custody, data, and AML providers.
- Sell on reduction in failed payouts, audit friction, manual spreadsheet time, and incident response latency.

## Risks, dependencies, unknowns

Risks:

- Data provider latency or disagreement creates false confidence.
- Compliance labels can be incomplete or contested.
- Direct transaction integration increases regulatory and security burden.
- Stablecoin regulation and issuer disclosures vary by jurisdiction.
- Users may over-rely on composite risk scores.

Dependencies:

- Custodian/exchange APIs.
- Market and liquidity data providers.
- AML/sanctions vendor.
- Issuer transparency feeds.
- Internal ledger mapping quality.

Unknowns:

- Will treasury teams pay for a separate overlay if their custodian improves native treasury UX?
- Which corridor policies generalize across verticals?
- What risk-score explainability is sufficient for auditors?
- How much automation buyers will allow before requiring manual approvals?

## Post-demo roadmap

- Evidence export and audit packet view.
- Source freshness monitor.
- Policy pack builder.
- Wallet/entity label confidence model.
- Reserve-source diffing.
- Slack/Teams alert routing.
- Custodian approval handoff.
- Chain congestion and bridge risk module.
- Scenario tabletop generator.

