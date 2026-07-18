# Research

Access date: 2026-07-16

## Selected wedge

The best wedge from the evidence is a **stablecoin treasury risk cockpit** for crypto-native finance teams. The recurring decision is not “what is the price,” but “is this treasury safe to move right now, and what has to change before we move it.”

This combines wallet and vault monitoring, counterparty screening, runway forecasting, and policy headroom. It is narrower than a generic portfolio tracker and more operational than a pure analytics dashboard.

## Source log

| Source | URL | Findings | Decision impact |
| --- | --- | --- | --- |
| Dune Docs: Data Freshness | <https://docs.dune.com/data-catalog/data-freshness> | Raw blockchain data freshness depends on chain stability; decoded data is often available within 15-60 seconds; curated tables are typically hourly. | The product must label freshness by data class and never imply a single live feed for balances, transfers, and aggregates. |
| Dune Docs: Data Trust & Reliability | <https://docs.dune.com/data-catalog/data-quality> | Dune emphasizes continuous verification, re-org handling, duplicate detection, block integrity, and monitoring across 100+ blockchains. | The UI should surface provenance and uncertainty instead of hiding it behind a single confidence number. |
| Dune Docs: Stablecoins | <https://docs.dune.com/data-catalog/curated/stablecoins/overview> | Stablecoin analysis centers on where balances are and how they got there, with normalized transfer and balance records across EVM, Solana, and Tron. | The core model should be balance + transfer path, not a generic asset list. |
| Dune Data Hub | <https://docs.dune.com/web-app/overview> | Dune’s workspace supports querying, visualizing, alerting, dashboards, and sharing across teams. | The product should feel operational and collaborative, not like a passive reporting page. |
| CoinGecko API | <https://www.coingecko.com/en/api> | CoinGecko exposes real-time and historical market data, onchain DEX data, and a cache window measured in minutes rather than seconds for most endpoints. | Price values in the demo should be explicitly “cached market data,” not execution-grade live pricing. |
| CoinGecko Trading Guide | <https://docs.coingecko.com/docs/trading> | The guidance separates spot pricing, OHLC candles, historical ranges, and DEX pool data for different use cases. | Charts should distinguish valuation, trend, and liquidity views instead of collapsing them into one chart. |
| Zerion API Quickstart | <https://developers.zerion.io/quickstart> | Zerion’s portfolio API returns wallet value, position breakdown, DeFi positions, transaction history, and alerts. | Portfolio tracking is a baseline convention; to be differentiated, the product must add treasury policy and risk semantics. |
| Zerion Recipes | <https://developers.zerion.io/recipes> | Portfolio tracking, wallet PnL, activity alerts, and DeFi position retrieval are standard workflows. | The selected wedge should not be another consumer portfolio tracker. |
| Nansen Portfolio / Labels / Watchlists | <https://nansen.ai/> and <https://academy.nansen.ai/en/help/articles/2149924-labels-and-watchlists-101> | Nansen positions itself as an onchain command center with portfolio monitoring, risk scores, labels, and watchlists. | The dashboard should support labels, watchlists, and risk queues, but the main promise should be treasury decisioning rather than market discovery. |
| Fireblocks Treasury Management | <https://developers.fireblocks.com/docs/treasury-management> | Treasury management centralizes assets across wallets and connected venues and uses governance rules and approval workflows to manage operational risk and liquidity. | The main entity model should be vault/account/policy/approval, not just wallet/address. |
| Fireblocks Policy Engine | <https://www.fireblocks.com/platforms/governance-and-policies> | Policies are a first line of defense; approval workflows and policy inspector views make authorization logic visible. | Policy headroom needs to be a first-class metric in the UI, not buried in settings. |
| Fireblocks Object Model | <https://developers.fireblocks.com/docs/object-model> | Fireblocks treats workspace, vault accounts, exchange accounts, and fiat accounts as explicit objects with security boundaries. | The demo needs explicit workspace and vault framing to feel like treasury software rather than a generic finance dashboard. |
| Chainalysis KYT | <https://www.chainalysis.com/product/kyt/> | KYT provides real-time monitoring, alerting, counterparty exposure, behavioral alerts, and case management. | Risk alerts should be actionable and tied to a review queue with state transitions. |
| Chainalysis KYT glossary | <https://www.chainalysis.com/glossary/know-your-transaction/> | KYT is continuous transaction monitoring that tracks direct and indirect exposure and generates alerts within seconds. | Risk states in the demo should separate direct exposure, indirect exposure, and approved activity. |
| OFAC FAQ 560 | <https://ofac.treasury.gov/faqs/560> | OFAC obligations apply regardless of whether a transaction is digital or fiat, and firms should use tailored, risk-based compliance programs. | The product must not imply sanctions screening is optional or purely cosmetic. |
| OFAC cyber / virtual currency guidance | <https://ofac.treasury.gov/cyber-related-sanctions> | OFAC publishes specific guidance for the virtual currency industry and related cyber sanctions risks. | The UI should treat sanctions exposure as a separate compliance dimension, not merely a risk score. |
| FinCEN virtual currency guidance | <https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering> | FinCEN distinguishes users from administrators/exchangers and applies BSA obligations to certain virtual currency businesses. | The product should be framed for a business treasury operator, not a consumer self-custody wallet. |
| IRS digital assets | <https://www.irs.gov/filing/digital-assets?pStoreID=nar> | Digital assets are treated as property for U.S. tax purposes and taxable income/gains must be reported. | The long-term product should preserve audit trails and exportable history, even though the demo does not generate tax forms. |
| Circle transparency & stability | <https://www.circle.com/transparency> | USDC reserves are disclosed weekly and the page emphasizes reserve composition, issuance/redemption, and stablecoin transparency. | Stablecoin treasury views should expose reserve provenance and freshness, not hide it behind a single balance figure. |
| Circle treasury / payments | <https://www.circle.com/use-case/payments> and <https://www.circle.com/pressroom/kyriba-and-circle-bring-usdc-capabilities-to-enterprise-treasury-unlocking-a-path-toward-more-intelligent-treasury-decisioning> | Circle positions stablecoins for treasury, near-instant settlement, and enterprise treasury workflows inside existing tools. | The GTM should target treasury teams and finance systems, not only crypto-native traders. |

## Segment and job findings

- Crypto finance teams do not only need balances. They need to answer:
  - What do we hold?
  - Where is it?
  - What is the conversion and counterparty risk if we move it?
  - How long can we operate if the market worsens?
- Onchain analytics users already expect labels, watchlists, alerts, and drill-downs.
- Institutional treasury users expect policy controls, approvals, and audit trails.
- Compliance and sanctions review are part of the operating workflow, not a separate afterthought.

## Category convention findings

- Portfolio dashboards usually show value, PnL, asset mix, chain split, and transaction history.
- Onchain intelligence platforms add labels, risk scores, and watchlists.
- Treasury systems add policy, approval routing, and venue connectivity.
- Compliance systems add sanction screening, alert triage, and case management.

## Data-model findings

- The useful unit is not just “wallet.” The useful unit is:
  - workspace
  - vault or account
  - asset
  - chain
  - counterparty
  - transfer path
  - policy rule
  - alert or case
- The product should keep these objects separate because they have different freshness, risk, and trust semantics.

## Risk and trust findings

- Prices, balances, and screening data have different latency characteristics.
- A dashboard that does not label freshness can mislead users into thinking it is more precise than it is.
- Wallet and sanctions data should be treated as signals for review, not as legal clearance.
- Stablecoin treasury users need to understand concentration, liquidity, and approval headroom before they can safely move funds.

## Visualization findings

- The best financial views for this wedge are:
  - balance trajectory with an emergency floor
  - runway forecast
  - exposure concentration by chain or counterparty
  - alert queue by severity
  - policy headroom vs limit
- Charts should be honest about uncertainty and thresholds.
- For this wedge, a wall of price tiles would add noise rather than decision value.

## Positioning and GTM findings

- A treasury cockpit can sell into finance, operations, and compliance together.
- The strongest enterprise wedge is a “decisioning layer” that fits into existing treasury workflows.
- The likely buyers are crypto-native CFOs, treasury managers, and compliance leads at stablecoin-heavy companies, exchanges, DAOs, and payment businesses.
- Monetization can be seat-based plus vault/workspace scale, with enterprise controls and alert volume as expansion levers.

