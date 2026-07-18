# Cairn research

Accessed 2026-07-16. Research is intentionally focused on crypto treasury operators who need a safe daily decision loop, not on active trading.

## Users, jobs, and recurring decisions

**Primary segment:** a 2–15 person DAO, crypto-native startup, or protocol foundation with $250k–$20m in digital assets across 3–30 wallets. The operator is usually a finance/ops lead; they are accountable for payroll runway, vendor payments, governance reporting, and avoiding a preventable signing or liquidity mistake.

**Jobs:** reconcile wallet balances; explain the day’s NAV change; identify concentration and stablecoin/depeg exposure; decide whether a payment can be made without breaching a runway floor; create an evidence-backed weekly report; investigate an unfamiliar approval or contract interaction.

**Secondary users:** a CFO or board member who wants read-only confidence, and a security lead who needs signer/allowance review.

## Representative products and conventions

- [CoinGecko API documentation](https://docs.coingecko.com/reference/introduction) (accessed 2026-07-16): broad market data is API-shaped, with explicit endpoint/rate-limit concerns. Decision changed: market prices in the demo are labeled seeded and must show timestamp/source rather than imply a live feed.
- [Safe product documentation](https://help.safe.global/en/articles/40827-what-is-a-safe) (accessed 2026-07-16): multisig ownership is a core operational primitive for teams. Decision changed: the product treats signer posture and proposed transactions as first-class risk context, without connecting a wallet.
- [Zerion portfolio tracker](https://zerion.io/) (accessed 2026-07-16): consumer portfolio products establish the convention of unified wallet views, token-level performance, and watch-only access. Decision changed: Cairn starts from a unified read-only “vault” and narrows to decisions.
- [Coinbase Prime](https://www.coinbase.com/prime) (accessed 2026-07-16): institutional products package custody, trading, and reporting around controlled workflows. Decision changed: the wedge is reporting + risk triage for the underserved smaller treasury, not custody or execution.

## Data and risk model

The entity model is `Workspace → Vault → Wallet → Chain → Asset → Position`, with `Observation` (value, timestamp, provider, confidence) and `Event` (transfer, approval, signer change, payment proposal). NAV is the sum of position units × a price observation; exposure is grouped by asset, chain, counterparty, and liquidity bucket. “Liquid” is a policy classification, not a promise that an asset can be sold at the displayed price.

Important communication conventions: show currency and unit, time window, last updated time, provider, and whether a value is estimated. Volatile assets need change bands and scenario language; thin liquidity needs a warning distinct from price volatility; bridge/counterparty exposure needs provenance. The demo uses a static snapshot with believable but fictional numbers and a visible “Seeded demo” badge.

## Security, privacy, and compliance

- [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) (accessed 2026-07-16) defines a human-readable, domain-bound message format. Decision changed: Cairn never requests a signature in the demo and the onboarding copy explicitly says no private keys or signing.
- [OWASP Web3 Application Security Risks](https://owasp.org/www-project-web3-security/) (accessed 2026-07-16): smart-contract and wallet flows require threat-aware UX. Decision changed: suspicious approvals and signer drift are “review” items, not opaque scores.
- [SEC Investor Bulletin: Crypto Asset Securities](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-asset) (accessed 2026-07-16): crypto assets can carry substantial volatility and investor-protection gaps. Decision changed: avoid investment advice, guaranteed returns, or “safe” labels; use operational risk language and require jurisdictional counsel before launch.

## Visualization and GTM decisions

A compact NAV line with a zero baseline is more useful than decorative candlesticks for a treasury operator; stacked allocation shows concentration; “days of runway” converts volatility into a decision. Tooltips/drill-downs should preserve the raw unit and observation time. Cairn’s acquisition motion is a free read-only weekly report, shared with a CFO or multisig group; paid tiers add alert policies, exports, and historical evidence. Monetization hypothesis: $99/month for one vault, $299/month for up to five, enterprise annual pricing for retention and audit controls.

## What the research changed

The research ruled out a universal dashboard, live trading, and wallet execution. It led to: one decision-centric home screen; read-only by default; provenance on every material number; explicit confidence and policy thresholds; a payment-readiness workflow; and a report-oriented GTM wedge.
