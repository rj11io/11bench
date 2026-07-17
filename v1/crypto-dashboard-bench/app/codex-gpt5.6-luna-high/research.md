# Research — Cairn Treasury Control

**Research date:** 2026-07-16  
**Selected wedge:** a treasury control plane for crypto-native companies that hold stablecoins and digital assets across wallets, custodians, exchanges, and chains.  
**Primary user:** finance/treasury lead at a 20–250 person crypto-native company (payments, infrastructure, or protocol operations).

## Executive finding

The most defensible opportunity is not another price board. A treasury lead has to answer a repeated operational question: **“What can we safely release today, and what needs a human decision before it moves?”** That requires a normalized view across wallet purpose, custody, liquidity, policy limits, counterparties, approvals, and accounting state. Market prices are only one input.

Cairn is therefore positioned as a read-only-first **daily control plane**: it calculates spendable liquidity and policy exceptions from connected data, explains the calculation, and creates a review trail. It is complementary to a custody system, exchange, accounting subledger, and on-chain analytics platform; it does not sign or broadcast transactions in the demo or in the first product release.

## Users, jobs, and recurring decisions

| Segment | Job | Recurring decision | Current workaround / pain |
| --- | --- | --- | --- |
| Finance / treasury lead | Protect operating cash while funding vendors, payroll, and liquidity | Which wallets and assets are actually spendable inside policy? | Spreadsheets plus several tabs; “total balance” hides locked, pending, or policy-constrained funds |
| Controller / accounting owner | Close and explain the digital-asset subledger | Does the on-chain/custodian position reconcile to the books, at the right valuation time? | Manual exports, address mapping, and follow-up in chat |
| Security / operations owner | Prevent an unauthorized or unsafe movement | Is this transfer within a known route, signer quorum, and exposure limit? | Custody-product policy screens without a finance-level rollup |
| CFO / founder (secondary) | Make a capital allocation call with confidence | How many weeks of operating coverage do we have under a stress scenario? | Point-in-time balances, not a decision narrative |

The buying trigger is usually a new chain, payment rail, custody provider, audit, financing event, or near-miss that makes “we have a wallet dashboard” feel insufficient. Retention comes from a daily review, a weekly liquidity committee, and a month-end evidence package.

## Representative products and category conventions

- **Fireblocks Treasury Management**: a custody and operations platform that describes a holistic view across wallets, connected venues, and fiat providers, with policy controls and movement tracking. This sets the category convention of vaults, hot/warm/cold segmentation, approvals, counterparties, and a security-first operating model. It changed the decision to keep Cairn read-only-first and complementary rather than pretending to replace execution or custody. [Treasury Management — Fireblocks Developer Docs](https://developers.fireblocks.com/docs/treasury-management) (accessed 2026-07-16).
- **CoinTracker Enterprise**: a crypto subledger focused on holdings, transaction tracking, reconciliation, and ERP connections. This validates address/account mapping and reconciliation as a buyer-visible workflow, but also leaves room for a pre-accounting “can we spend this?” layer. [What is CoinTracker Enterprise?](https://support.cointracker.io/hc/en-us/articles/29047987043345-What-is-CoinTracker-Enterprise) (accessed 2026-07-16).
- **Dune Data Hub**: a collaborative environment for querying blockchain data, building visualizations, and sharing dashboards. This is the analyst convention: flexible queries and public/peer insight. Cairn should be more opinionated and operational: a small entity model, explicit provenance, and next actions over exploration. [Data Hub Overview — Dune Docs](https://docs.dune.com/web-app/overview) (accessed 2026-07-16).
- **Coinbase Exchange APIs**: public market data is available without authentication, with REST candle data and WebSocket feeds for real-time trades/books; historical candles may be incomplete and should not be polled as real-time data. This changed the product requirement for source, timestamp, freshness, and confidence labels on valuation. [Exchange APIs — Coinbase Developer Documentation](https://docs.cdp.coinbase.com/exchange/introduction/welcome) and [Get product candles](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-candles) (accessed 2026-07-16).

## Data and domain model

The dashboard needs separate entities, not a single “portfolio” number:

- **Organization** → **Policy** (asset floors, hot-wallet caps, approval thresholds, permitted networks).
- **Wallet / venue account** → **network** → **address or custodial account**. A wallet is an interface to an account, not the account itself; an Ethereum account may be externally owned or a contract account. [Ethereum accounts](https://ethereum.org/developers/docs/accounts) (accessed 2026-07-16).
- **Asset holding** = asset, network, units, valuation source, valued-at timestamp, custody state, purpose, restriction, and confidence.
- **Movement** = transaction hash or venue reference, from/to, asset, amount, network, fee, block/finality state, approval state, counterparty, and accounting label.
- **Liquidity bucket** = spendable, pending, reserved, staked/locked, or restricted. “Spendable” is a policy calculation, not a raw balance.
- **Exception** = rule, observed value, threshold, severity, owner, created-at, and review state.

For the demo, seeded data uses fictional organization “Northstar Labs” and is labeled **DEMO DATA — not connected**. Numbers are illustrative and are not current market data or a performance claim.

## Risk, uncertainty, provenance, and latency

Crypto data is not equally authoritative. On-chain balances are ledger observations at a block; custodial balances are provider records; prices are an external valuation; accounting values are a policy output. The interface should show all four layers rather than implying they are interchangeable.

Key communication patterns:

- Show **as-of time**, source, network, and sync state beside every aggregate.
- Distinguish **observed** (on-chain/custodian), **derived** (spendable, runway), and **assumed** (forecast burn, stress shock).
- Show a stale-data warning when a source is beyond its freshness SLA; never animate or call seeded values live.
- Use “pending / not final” for unconfirmed movements. Ethereum transactions are signed instructions that update network state and require validation; a submitted request is not the same as settled state. [Transactions — ethereum.org](https://ethereum.org/developers/docs/transactions) (accessed 2026-07-16).
- Make risk severity semantic: red = policy breach or potentially blocked movement, amber = review needed / data uncertainty, blue = informational. Never use green to imply safety or guaranteed yield.
- Display volatility and liquidity as scenario inputs, not predictions. A 10% or 20% shock in the demo is a labeled what-if, not a forecast.

## Wallet, security, privacy, and regulatory signals

Private keys authorize actions; a connected read-only wallet address should never require a seed phrase or private key. WalletConnect’s guidance treats a wallet connection as a session proposal that the user approves or rejects, which supports explicit connection scopes and an easy disconnect state. [Best Practices for Wallets — WalletConnect Docs](https://docs.walletconnect.network/wallet-sdk/best-practices) (accessed 2026-07-16). The demo therefore uses a clearly labeled “Connect read-only source” affordance and no wallet extension.

Security requirements should include least privilege, MFA/SSO, role separation, immutable audit logs, address allowlists, approval quorum, encryption, tenant isolation, and a way to revoke a source. Cairn must not custody keys or create a signing surface.

Compliance is jurisdiction- and activity-specific, so the product should provide evidence and controls rather than legal conclusions. U.S. sanctions obligations can apply to virtual-currency transactions and OFAC recommends a tailored, risk-based compliance program including sanctions screening. [OFAC FAQ 560](https://ofac.treasury.gov/faqs/560) (accessed 2026-07-16). MiCA creates EU requirements for offerors, issuers, and crypto-asset service providers, with different treatment for e-money tokens, asset-referenced tokens, and other crypto-assets. [Regulation (EU) 2023/1114 — EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114) (accessed 2026-07-16). FATF’s 2025 Recommendation 16 update reinforces payment-message transparency in cross-border payments. [FATF updates Recommendation 16](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html) (accessed 2026-07-16). FASB’s ASU 2023-08 is relevant for U.S. GAAP reporters because qualifying crypto assets are measured at fair value with disclosure requirements. [FASB issues ASU 2023-08](https://fasb.org/news-and-meetings/in-the-news/media-advisory-12-13-23-397718) (accessed 2026-07-16).

These sources changed the PRD: make review evidence, provenance, address ownership, and exportable audit records first-class; keep sanctions/compliance as workflow integrations and attestations, not an unqualified “risk score.”

## Visualization and interaction findings

Effective financial interfaces prioritize comparison and exception handling. A single headline number should be decomposed into buckets, with a time series for direction, a compact table for exactness, and a drill-down for proof. The first screen should answer: total, spendable, runway, largest exception, and next action. Dollar values need a currency code and as-of time; token amounts need units; percentages need denominators; time ranges need clear boundaries.

The selected design uses a coverage band (spendable cash vs. 30-day burn), a wallet-level liquidity table, a small scenario chart, policy progress bars, and a review queue. It avoids candlesticks and decorative price charts because the daily job is control and release, not trading.

## Positioning, monetization, and GTM

**Positioning:** “Cairn is the morning control plane for crypto treasury teams. See what is spendable, what is locked, and what needs a decision — with the evidence attached.”

The wedge sits between custody execution and accounting close. It can acquire through treasury consultants, crypto accounting firms, custody providers, and stablecoin payment operators; a self-serve sandbox with CSV/public-address ingestion demonstrates value before any sensitive integration.

Packaging hypothesis: Starter at €499/month for one entity, up to 10 sources, daily sync, and review queue; Growth at €1,500/month for multi-chain sync, policy packs, exports, and Slack/email alerts; Enterprise with SSO, custom retention, data residency, and support. Pricing is a hypothesis to test, not a market fact. The initial GTM narrative is “close the gap between wallet visibility and finance-grade control.” Success is a paid pilot that shortens the daily treasury review, reduces unresolved reconciliation items, and produces evidence for a board/audit request.

