# Research: Reserve Desk

Access date: July 16, 2026

## Decision

Build **Reserve Desk**, a read-only treasury risk console for crypto-native finance teams that manage stablecoin reserves, operating wallets, and protocol yield sleeves. The wedge is not a generic price wall or consumer portfolio tracker. It is the daily decision loop around:

- whether balances reconcile;
- whether near-term obligations are covered;
- whether a protocol sleeve should be reduced or exited;
- whether any wallet, counterparty, or address deserves compliance review;
- whether the team can produce a board-ready evidence pack without stitching together screenshots and spreadsheets.

This wedge is defensible because the market already splits into three buckets:

1. consumer portfolio dashboards,
2. enterprise treasury/accounting/custody systems,
3. market/onchain data providers.

Reserve Desk sits between them as the review layer that turns those raw feeds into a treasury posture and a decision queue.

## What I Learned

### 1) The market already expects multi-wallet aggregation, but not decision clarity

Representative products and conventions:

- MetaMask Portfolio aggregates multiple accounts and networks into a single dashboard.
- Koinly and CoinTracking emphasize performance over a selected time range, with balance reconciliation and source-choice controls.
- UNOCU and Blockpit expose customizable dashboards, wallet aggregation, and reporting-oriented widgets.

Decision changed:

- The product should aggregate multiple wallets and networks by default.
- The main differentiator should be reconciliation, provenance, and actionability, not another balance summary.

### 2) Institutional crypto tools are organized around treasury, governance, and auditability

Representative products and conventions:

- Fireblocks positions treasury management around policy controls, approval workflows, and access governance.
- Bitwave positions the category around accounting, payments, compliance workflows, ERP sync, and audit-ready reporting.
- Kaiko positions risk and valuation around auditable pricing, fair market value, best execution, and volatility/risk metrics.

Decision changed:

- Reserve Desk should remain read-only and explicitly not custody, execute trades, or imply live trading functionality.
- The core promise should be faster review and clearer evidence, not operational execution.
- The app should surface policy headroom, source freshness, and approval context as first-class information.

### 3) Crypto data models are fragmented, so the product must normalize them

Representative data models and conventions:

- CoinGecko exposes coins/tokens, exchanges, token price by contract address, market charts, onchain DEX data, and public treasury endpoints.
- DeFiLlama defines TVL, fees, and revenue, with filters such as staking, pool2, borrows, vesting, and offers.
- DeBank models protocol positions with portfolio item types such as yield, staked, locked, farming, lending, and vesting, plus asset, debt, and net values.

Decision changed:

- The product data model needs separate concepts for wallet balances, protocol positions, liabilities, and evidence sources.
- The UI should not mash protocol TVL into wallet balances; it should keep those objects distinct and label how each is used.
- Position labels like `staked`, `locked`, `lending`, and `farming` need to be visible because they affect liquidity and risk.

### 4) Balance reconciliation is a trust feature, not a cosmetic detail

Representative products and conventions:

- Koinly distinguishes reported balances from calculated balances and warns when they diverge.
- CoinTracking now supports customizable widgets and lets users choose reported or calculated balances.

Decision changed:

- Reserve Desk must show reported vs calculated balance modes.
- Any mismatch needs an explicit reason state, such as staking, missing transactions, or stale source data.
- The dashboard should make it obvious which figure is used for the summary card.

### 5) Risk and uncertainty communication must be explicit

Representative products and conventions:

- Kaiko’s portfolio and derivatives products expose volatility, drawdown, funding, open interest, and auditable pricing.
- Kaiko’s fair market value and best execution products emphasize outlier-resistant and auditable methodologies.
- Market data providers now support real-time, historical, WebSocket, and webhook delivery.

Decision changed:

- Reserve Desk should present risk as a quantified review queue, not just a red/yellow/green badge.
- The dashboard should label time ranges, basis, and freshness.
- Charts should compare values over time and show the difference between reported and reconciled views.

### 6) Wallet and security trust patterns are informational, not guarantees

Representative products and conventions:

- MetaMask’s trust signals and security alerts are explicitly informational and not guarantees of safety.
- MetaMask’s wallet model stresses self-custody, secret recovery phrase protection, and hardware-wallet use for higher-value accounts.
- OFAC guidance and FAQs explicitly discuss digital currency addresses, screening, blocked property, and sanctions compliance expectations.

Decision changed:

- Reserve Desk should treat trust indicators as review prompts, not safety guarantees.
- The UI should make it obvious that the app does not hold keys or move funds.
- Compliance signals should mention screening context and whether a wallet or counterparty needs manual review.

### 7) Regulatory framing matters even in a demo

Relevant standards and guidance:

- FATF’s 2024 update says implementation of Recommendation 15 and the Travel Rule remains uneven and highlights risks around stablecoins, DeFi, and unhosted wallets.
- OFAC FAQs and guidance reinforce that digital asset transactions are subject to sanctions compliance requirements and that address screening matters.

Decision changed:

- The product should include compliance review states for sanctions and address provenance.
- The PRD should explicitly avoid legal/tax advice claims.
- Onboarding and GTM should target finance, treasury, and compliance stakeholders rather than retail users.

### 8) The strongest GTM patterns are enterprise-led and trust-led

Representative products and conventions:

- Fireblocks and Bitwave sell through demo-led enterprise motions.
- Kaiko sells data and analytics with pricing tied to workload, coverage, or enterprise usage.
- UNOCU and similar products use early access and “request access” positioning for a narrower treasury niche.

Decision changed:

- Reserve Desk should use a design-partner motion aimed at crypto-native treasury leads, CFOs, and controllers.
- Packaging should be seat/workspace based, with higher tiers for more wallets, sources, and evidence exports.
- The launch narrative should center on “daily treasury review” and “board-pack readiness,” not market discovery.

## Source Table

| Source | URL | Accessed | Findings | Decision changed |
|---|---|---:|---|---|
| MetaMask Portfolio dashboard help | https://support.metamask.io/tl/manage-crypto/portfolio/getting-started-with-the-metamask-portfolio-dashboard/ | July 16, 2026 | Aggregates up to 10 accounts, spans multiple Ethereum-compatible networks, and is organized around a single portfolio view. | Make multi-wallet aggregation the default and keep cross-chain totals visible. |
| MetaMask security alerts help | https://support.metamask.io/configure/wallet/how-to-enable-automatic-security-checks-mobile | July 16, 2026 | Trust signals and security alerts are informational and do not guarantee safety. | Label trust as review context, not a guarantee. |
| Koinly dashboard explained | https://support.koinly.io/en/articles/9489954-dashboard-explained | July 16, 2026 | Dashboard supports custom timeframes and shows deposits, withdrawals, income, expenses, and fees. | Add time-range controls and a treasury activity breakdown instead of a single static total. |
| Koinly reported vs calculated balances | https://support.koinly.io/en/articles/9490038-xyz-balance-does-not-match-what-you-actually-have-in-the-wallet | July 16, 2026 | Reported balances are snapshots from APIs; calculated balances come from imported transaction history. | Add a reported/calculated toggle and mismatch explanation. |
| CoinTracking dashboard update | https://cointracking.freshdesk.com/en/support/solutions/articles/29000050407-what-s-new-on-your-dashboard | July 16, 2026 | New dashboard uses customizable widgets and allows reported or calculated balance sourcing. | Keep the dashboard configurable and expose the valuation basis. |
| CoinGecko API introduction | https://docs.coingecko.com/ | July 16, 2026 | Covers coins, exchanges, onchain data, public treasuries, and historical market data; offers REST, WebSocket, and webhooks. | Use CoinGecko-style identifiers and show freshness/provenance by data source. |
| CoinGecko endpoint overview | https://docs.coingecko.com/reference/endpoint-overview | July 16, 2026 | Supports coin price, market charts, onchain DEX data, and public treasury endpoints. | Include token, market, and treasury objects separately in the data model. |
| CoinGecko token price by address | https://docs.coingecko.com/reference/simple-token-price | July 16, 2026 | Token prices can be queried by contract address and include market cap, volume, and last update. | Show contract-based pricing and last-updated timestamps. |
| CoinGecko public treasury endpoints | https://docs.coingecko.com/reference/public-treasury-entity | July 16, 2026 | Public treasury data includes entity holdings and treasury history. | Add treasury-history style charts and provenance badges. |
| DeFiLlama data definitions | https://docs.llama.fi/analysts/data-definitions | July 16, 2026 | Defines TVL, fees, and revenue and maps them to onchain protocol economics. | Keep protocol TVL and revenue distinct from wallet balances. |
| DeFiLlama FAQ | https://docs.llama.fi/faqs/frequently-asked-questions | July 16, 2026 | TVL adapters are open source and often rely on onchain calls. | Surface protocol data source confidence and methodology notes. |
| DeBank PortfolioItemObject | https://docs.cloud.debank.com/en/readme/api-models/portfolioitemobject | July 16, 2026 | Encodes portfolio items as yield, staked, locked, farming, lending, vesting, and more, with asset/debt/net values and refresh timestamps. | Show position type chips and unlock/freshness metadata. |
| Fireblocks treasury management | https://www.fireblocks.com/products/treasury-management | July 16, 2026 | Treasury management centers on granular governance, transaction limits, approvals, and secure ecosystem connectivity. | Keep Reserve Desk read-only and emphasize policy headroom and approval context. |
| Fireblocks treasury playbook | https://www.fireblocks.com/report/digital-asset-treasury-playbook | July 16, 2026 | Large treasuries are fragmented across wallets and jurisdictions and need stronger governance. | Position the product around fragmented treasury review. |
| Bitwave enterprise platform | https://www.bitwave.io/ | July 16, 2026 | Enterprise crypto finance products center on accounting, payments, reconciliation, and audit-ready reporting. | Explicitly avoid becoming an accounting subledger; integrate with evidence and export flows instead. |
| Bitwave enterprises page | https://www.bitwave.io/industries/enterprises | July 16, 2026 | Enterprise positioning emphasizes audit-ready reporting, blockchain integrations, and compliance frameworks. | Package the product for finance teams and controllers. |
| Kaiko portfolio and risk management | https://www.kaiko.com/products/portfolio-and-risk-management | July 16, 2026 | Portfolio risk products focus on valuation, risk metrics, and source information. | Add risk metrics and a source trail to the dashboard. |
| Kaiko best execution pricing | https://www.kaiko.com/products/best-execution-pricing | July 16, 2026 | Best execution data is market-representative, auditable, and compliance-oriented. | Use auditable pricing language and explicit basis labels. |
| Kaiko fair market value | https://www.kaiko.com/products/fair-market-value-pricing | July 16, 2026 | FMV pricing is outlier-resistant and suitable for reporting and compliance. | Keep chart values clearly labeled as seeded/demo FMV examples. |
| Kaiko level 1 and level 2 data | https://www.kaiko.com/products/l1-l2-data | July 16, 2026 | Market data covers trades, order books, liquidity, and real-time/historical feeds. | Use liquidity and volatility as risk inputs, not just spot prices. |
| FATF 2024 virtual assets update | https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2024.html | July 16, 2026 | Travel Rule implementation remains uneven and FATF calls out stablecoins, DeFi, and unhosted wallet risks. | Include sanctions/travel-rule review states in the product. |
| OFAC virtual currency FAQs | https://ofac.treasury.gov/faqs/all-faqs | July 16, 2026 | OFAC explicitly discusses digital currency addresses and sanctions compliance obligations. | Add manual compliance review flags and blocked-address awareness. |
| OFAC sanctions compliance guidance | https://ofac.treasury.gov/recent-actions/20211015 | July 16, 2026 | Treasury published industry guidance for the virtual currency sector. | Frame compliance signals as review support, not legal advice. |
| UNOCU treasury dashboard | https://www.unocu.com/ | July 16, 2026 | Treasury dashboards increasingly combine portfolio tracking, staking, reporting, and team collaboration. | Add a focused treasury dashboard with workflow controls, not just holdings. |

## Research Summary

The category is crowded at the edges and under-served in the middle.

- Consumer tools optimize for net worth, wallet aggregation, and quick checks.
- Enterprise tools optimize for custody, accounting, governance, and compliance.
- Data vendors optimize for market data, valuations, or protocol metrics.

Reserve Desk should win by connecting those layers into one reliable review surface:

- what we hold;
- what is liquid;
- what is locked or at risk;
- what source supports each number;
- what changed since the last review;
- what needs a human decision.
