# Clearrail research — stablecoin settlement decisioning

**Research date:** 16 July 2026. This document distinguishes documented product facts from the seeded scenario used in the demo. It does not use current price, chain, volume, or reserve data in the application.

## Research synthesis and product decision

The strongest wedge is not a general crypto dashboard. It is a **settlement-control workspace for finance and operations teams that pay or rebalance with stablecoins across chains**. Its recurring decision is: _can we safely fund this payment on time, through which approved rail, and what needs an operator's attention first?_

The job has an unusually useful shape for software: a controller has to reconcile inventory, route liquidity/finality, recipient controls, issuer/token risk, and an evidence trail before authorizing a payment. Existing tools tend to specialize: wallet policy/signing, issuer transfers, chain analytics, or market data. Clearrail is the decision layer that composes their evidence into a payment readiness call. It intentionally does not custody, trade, screen, sign, or transmit money.

## Sources, findings, and decision changes

| Source                                                                   | URL                                                                                                                        | Accessed   | Finding used                                                                                                                                                                | Decision changed                                                                                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Circle, “USDC”                                                           | https://www.circle.com/usdc                                                                                                | 2026-07-16 | Circle describes USDC as backed by highly liquid cash and cash-equivalent assets, redeemable 1:1, and available on many networks; the exact network list changes over time. | Model an issuer/token separately from a chain representation. Never label an app balance or price as live merely because a known asset is shown. |
| Circle, “Transparency & stability”                                       | https://www.circle.com/transparency                                                                                        | 2026-07-16 | Reserve composition, circulation, disclosures, and assurance are evidence with their own dates and cadence.                                                                 | Treat “reserve evidence age” as a first-class, dated signal—not a generic green trust badge.                                                     |
| Circle Docs, “CCTP Technical Guide”                                      | https://developers.circle.com/cctp/references/technical-guide                                                              | 2026-07-16 | CCTP describes confirmed versus finalized finality thresholds, transfer fees, and attestation state.                                                                        | A route card must show method and finality class; ETA is an estimate and should not be represented as a guarantee.                               |
| Circle Docs, “Troubleshoot CCTP Transfers”                               | https://developers.circle.com/cctp/howtos/troubleshoot-transfers                                                           | 2026-07-16 | A cross-chain transfer has burn, attestation, and mint stages, each with distinct failure modes.                                                                            | The product’s incident model uses stage-level status and evidence rather than a single vague “transfer failed” state.                            |
| European Banking Authority, “Asset-referenced and e-money tokens (MiCA)” | https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica                                   | 2026-07-16 | MiCA sets authorization and related requirements for ART and EMT issuers in the EU.                                                                                         | Surface jurisdiction/authorization as an evidence field with a source and review date; do not make legal-compliance assertions in a UI badge.    |
| FATF, “Virtual Assets”                                                   | https://www.fatf-gafi.org/en/topics/virtual-assets.html                                                                    | 2026-07-16 | FATF describes AML/CFT expectations, including collecting/transmitting originator and beneficiary information for relevant transfers.                                       | Planning requires recipient/VASP and travel-rule readiness checks before an operator marks a plan ready.                                         |
| FATF, “Update Recommendation 16 on Payment Transparency”                 | https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html | 2026-07-16 | Updated payment-transparency standards are phased and jurisdictional implementation varies.                                                                                 | The PRD scopes Clearrail as a workflow/evidence system, not a legal determination engine.                                                        |
| Chainalysis, “2026 Crypto Crime Report Introduction”                     | https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/                                                    | 2026-07-16 | The report describes a changing on-chain illicit-risk environment and caveats its figures as identified-address lower bounds.                                               | Risk providers must be displayed with coverage, as-of, and uncertainty; no “safe address” implication.                                           |
| Chainalysis, “2025 Crypto Crime Trends”                                  | https://www.chainalysis.com/blog/2025-crypto-crime-report-introduction/                                                    | 2026-07-16 | Stablecoins are used for cross-border payments and trade, while risk attribution has incomplete visibility.                                                                 | The primary buyer is a payment/treasury operator, and the product uses “risk review needed” rather than binary clean/unsafe claims.              |
| EBA, “The EBA’s supervisory role under MiCA”                             | https://www.eba.europa.eu/activities/direct-supervision-and-oversight/ebas-supervisory-role-under-mica                     | 2026-07-16 | The EBA describes issuer and CASP reporting/supervisory responsibilities under MiCA.                                                                                        | Preserve decision evidence and timestamps for an internal audit trail; do not position the product as a compliance substitute.                   |

## Users, buyers, and recurring decisions

| Segment                                                              | Buyer / operator                       | Recurrent job                                                                        | Why the status quo breaks                                                                             |
| -------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Crypto-native global payroll, marketplace, or vendor-payment company | CFO/Head of Finance; treasury ops lead | Fund a vendor/payout run in the right asset and chain before cutoff.                 | Cash is fragmented by wallet/chain, issuer evidence lives elsewhere, and escalations happen in chat.  |
| Exchange, on/off-ramp, or payment-service operations                 | Head of Payments; settlement manager   | Manage settlement inventory, delayed transfers, recipient readiness, and exceptions. | A single route crosses custody, chain, issuer, and compliance tools; nobody has one decision record.  |
| DAO or protocol operations team                                      | Treasury manager; multisig signer      | Maintain approved working capital and react to a depeg/liquidity/bridge condition.   | Portfolio tools show holdings, but rarely translate signals into a safe route and accountable action. |
| Enterprise with a regulated crypto partner                           | Finance controller; compliance lead    | Demonstrate who decided what, from which evidence, under a policy.                   | Spreadsheets create stale, non-auditable snapshots; teams overclaim certainty from dashboard labels.  |

Primary user: an EU/UK-based treasury operations lead responsible for a stablecoin payment run. Secondary user: a finance controller who sets policy/approvals and reviews the exportable audit trail. The day-one buying trigger is a missed or manually escalated cross-chain settlement, not abstract interest in analytics.

## Product/category conventions to keep—and reject

- Keep the operational conventions from wallet/custody and payment tooling: approval gates, named policy status, time-stamped events, role separation, and an immutable decision record.
- Keep the market-data convention that each number has a unit, time window, source, and as-of timestamp. Data latency itself is meaningful.
- Keep on-chain investigation’s provenance mindset: entity label, provider, confidence/coverage, and last refresh should travel with a risk signal.
- Reject a universal “total portfolio P&L” home page. It is a poor first screen for a time-bound payment decision.
- Reject red/green certainty. A no-data state, low-confidence label, stale feed, and estimated ETA are all different states and must not collapse into “safe.”

## Domain/data model and risk communication

The relevant entities are: workspace; legal entity; policy; wallet/account; chain; asset representation (token + contract + chain); issuer; balance/inventory snapshot; counterparty/beneficiary; route; route leg; quote; payment plan; approval; transfer event; evidence item; risk signal; and incident.

An amount is not enough. A balance snapshot needs asset contract, chain, wallet/custodian, block or provider snapshot time, native/bridged status, valuation currency and quote time. A route needs source/destination, method/provider, method version, fee quote, finality target, capacity/allowance, ETA distribution or estimate, and freshness. A compliance signal needs the provider, exact screening scope, evaluation time, policy version, and an explicit “not legal advice / incomplete coverage” caveat.

Risk semantics should separate:

- **Issuer/reserve risk:** evidence cadence and scope, not a promise about redemption.
- **Asset representation risk:** native vs. wrapped/bridged, contract provenance, and issuer relationship.
- **Network and route risk:** congestion, finality requirement, smart-contract or intermediary dependency, capacity, and time sensitivity.
- **Counterparty/compliance risk:** recipient verification, jurisdiction policy, screening result freshness, and review status.
- **Operational risk:** concentration, low gas inventory, stale data, missing approver, duplicate destination, and cutoff breach.

The demo uses a deliberately fictional workspace and fabricated but plausible operational values. It says “seeded scenario” next to the timestamp; this is a trust feature, not small print.

## Positioning, monetization, and GTM hypothesis

**Positioning:** “The control room for a stablecoin settlement decision—evidence, route choice, and accountable handoff before funds move.” It is not a wallet, exchange, payment processor, or compliance determination.

Land through a 30-day, read-only “payment readiness audit” for a team with three settlement corridors and one recurring payment run. Initial connectors are custody/read-only wallet exports, a stablecoin/issuer evidence feed, a route/chain-status feed, and the buyer’s compliance case-management system. The user imports/reads data; Clearrail generates a daily readiness brief and an exception queue. Expand to policy templates, approval export, route telemetry, and audit integrations.

Pricing hypothesis: $1,500/month for a small operations workspace, $5,000/month for multi-entity policy/audit workflows, plus implementation and enterprise SSO/integration tiers. The value metric is managed active settlement corridors—not assets under custody. Acquisition begins with treasury-ops design partners, stablecoin payment implementation agencies, and custody/issuer ecosystem referrals. Key activation: first approved route plan backed by fresh evidence within 14 days. Retention: weekly payment-run use plus incident postmortems.

## Research limits and validation plan

This desk research does not prove willingness to pay, exact data-provider coverage, legal applicability, route SLAs, or which stablecoin/chain pairs dominate a target customer. Before beta: interview 12 operators; shadow three payment runs; map their current artifacts and escalation time; test whether a daily readiness brief gets opened; and validate each integration’s data contract, refresh SLA, and licensing. Legal counsel and local compliance owners must determine obligations for the customer’s jurisdictions and services.
