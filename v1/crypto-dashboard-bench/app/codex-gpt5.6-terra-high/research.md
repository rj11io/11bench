# Research — Signalbank

**Research date:** 2026-07-16. Signalbank is a stablecoin-operations decision product for finance and crypto treasury teams. It is not a trading terminal, wallet, or portfolio tracker.

## Users, jobs, and decision loop

| Segment | Recurring job | Decision cadence | Product consequence |
|---|---|---|---|
| Crypto-native finance lead (primary) | Keep operating cash available without taking unpriced issuer, chain, or venue risk | Daily; immediately during a peg or venue event | A short, explainable “hold / split / move” recommendation is more valuable than a broad portfolio view. |
| Treasury operator (secondary) | Prepare a transfer/rebalance with policy evidence and approvals | Weekly and incident-driven | Show network, venue, concentration, and liquidity constraints before a proposed move. |
| Controller / compliance reviewer | Demonstrate why an asset and route were permitted | Month-end and exception review | Preserve source timestamps, methodology, thresholds, and an exportable decision record. |

The high-frequency loop is: **notice a change → understand exposure and exit capacity → decide a permitted allocation → record the rationale → re-check**. Generic dashboards mostly stop at “notice.”

## Category conventions and market inputs

* [DefiLlama Downloads](https://defillama.com/downloads) (accessed 2026-07-16) describes stablecoin datasets with circulating supply, price, and chain distribution. Its stablecoin data model supports a portfolio-independent view of issuer/chain concentration. **Decision:** model a stablecoin as an issuer asset with chain-specific representations; never collapse bridged and native assets silently.
* [DefiLlama API / stablecoin endpoints](https://www.npmjs.com/package/%40defillama/api) (accessed 2026-07-16) documents current prices, circulating amounts, chain circulation, and historical chain data. **Decision:** production ingestion needs separate source timestamps for price, supply, and chain distribution, rather than a single “updated” label.
* [CoinGecko — Coins List with Market Data](https://docs.coingecko.com/reference/coins-markets) (accessed 2026-07-16) exposes current price, market cap, volume, 24h high/low, and `last_updated`. **Decision:** market price is an observed quote, not redemption proof; the UI labels it “composite quote” and treats freshness as first-class.
* [Circle Transparency & Stability](https://www.circle.com/transparency) (accessed 2026-07-16) describes USDC reserve disclosures, weekly reserve information, and monthly third-party assurance; it also distinguishes reserve assets from operating funds. **Decision:** issuer-reserve confidence belongs beside, not inside, a peg-price metric; the product must identify the disclosure period and its limits.
* [Tether Transparency](https://tether.to/transparency/?tab=reports) (accessed 2026-07-16) publishes reserve reports and says they are quarterly. **Decision:** issuer evidence receives its own age/staleness state, and comparisons must not imply equivalent attestation cadence or scope.

Representative products organize around one of: aggregate market discovery (CoinGecko), chain/protocol metrics (DefiLlama), wallet portfolio aggregation, or institutional custody/execution. Signalbank’s wedge is the gap between these views: **cash readiness across issuer + chain + exit venue, with policy-specific decision support.**

## Data, risk, uncertainty, and visualization research

* [Ethereum EIP-1193 — Provider API](https://eips.ethereum.org/EIPS/eip-1193) (accessed 2026-07-16) specifies event-driven wallet connectivity and recommends that accounts not be exposed by default; providers should be treated as potentially adversarial page objects. **Decision:** Signalbank is read-only by default, requests only explicit address permission if connected in production, and never asks for a signing or transaction permission to analyze risk. The demo has no wallet connection.
* [FATF Updated Guidance for a Risk-Based Approach to Virtual Assets and VASPs](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Updated-Guidance-VA-VASP.pdf) (accessed 2026-07-16) addresses VA/VASP risk assessment, travel-rule controls, and higher-risk techniques. [FATF Recommendation 16 update](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html) says the updated payment-transparency changes take effect by the end of 2030. **Decision:** a future transfer workspace needs beneficiary/VASP metadata, sanctions screening and jurisdiction-aware rules; this demo is analysis only and carries no compliance approval claim.
* Stablecoin risk is multi-dimensional: price deviation is only one signal. A treasury can be exposed to issuer redemption/attestation quality, chain outages and bridge representation, pool depth/slippage, exchange availability, counterparty concentration, and operational permissions. **Decision:** use a decomposed risk score and an explicit “what changed” alert instead of a deceptively precise single health number.

Financial visualization implications:

1. A one-day peg trace should use dollars to four decimals and a visible $1 reference line; percent change alone hides material deviations.
2. Concentration is most legible as a compact composition bar plus a policy limit, not a pie chart.
3. A decision recommendation should disclose constraints, assumptions, and confidence rather than color-code it as an automatic instruction.
4. Each tile must declare its source class and as-of time. “Live” is reserved for a verified streaming integration, never demo data.

## Positioning, monetization, and GTM hypothesis

**Positioning:** “The readiness desk for on-chain operating cash.” Signalbank helps a finance lead explain whether stablecoin cash can meet a payout, payroll, or settlement obligation under an issuer, chain, or venue stress event.

**Initial ICP:** 10–100 person crypto-native companies, foundations, and DAOs with $1m–$50m in multi-chain stablecoin operating balances and no dedicated treasury-risk platform. They already use spreadsheets, block explorers, exchanges, and custody dashboards.

**Acquisition:** a free, shareable “stablecoin readiness snapshot” generated from a manually entered address or CSV (no signing); content around issuer/chain representation and exit-liquidity checklists; partnerships with treasury consultants and custody/accounting operators. Conversion trigger: a policy threshold breach or a repeatable month-end evidence workflow.

**Packaging hypothesis:** Starter $299/month for 3 entities / daily snapshots; Team $1,250/month for policy controls, alert routing and CSV exports; Enterprise annual contract for SSO, audit export, private RPC/data connectors, and configured compliance workflow. Validate willingness-to-pay by testing whether teams adopt a weekly readiness review before charging for monitoring.

## Sources and changed decisions

All sources above were accessed 2026-07-16. No source is used to claim the seeded figures in the demo are current facts. The research specifically changed the product from a generic “crypto dashboard” to a policy-aware stablecoin readiness decision loop; added per-signal provenance and disclosure age; prohibited implied execution; and made issuer, chain representation, and exit route separate inputs to the risk posture.
