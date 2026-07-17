# Research — Northstar Treasury Pulse

Accessed 2026-07-16. Northstar is a proposed **read-only stablecoin treasury decision desk** for finance operators at crypto-native companies. It is not a trading terminal or a wallet.

| Source | Finding | Decision changed |
|---|---|---|
| [DeFiLlama API docs](https://defillama.com/docs/api) | Public endpoints expose protocol TVL, yields and stablecoin data; data must be attributed to a provider and sampled at a declared time. | Show source / “as-of” labels and keep an adapter layer; never describe demo figures as a feed. |
| [Zapper API documentation](https://docs.zapper.xyz/) | Wallet portfolio products resolve balances, positions and transactions across chains, but coverage is provider-specific. | Model wallets, chains, assets, positions and observations separately; make coverage gaps visible. |
| [Uniswap v3 whitepaper](https://uniswap.org/whitepaper-v3.pdf) | Concentrated-liquidity positions introduce range and price exposure rather than a simple cash yield. | Don’t collapse DeFi positions into “APY”; use liquidity/range and smart-contract risk labels. |
| [Chainalysis: What is the Travel Rule?](https://www.chainalysis.com/glossary/travel-rule/) | VASP requirements, thresholds and data-sharing duties vary by jurisdiction; EU treatment is particularly broad. | The product is read-only and uses policy flags / exportable evidence, not compliance determinations. |
| [FATF Recommendation 16](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html) | Originator/beneficiary information and recordkeeping shape virtual-asset transfer operations. | Store transfer evidence/provenance fields, permission logs, and a human-review workflow. |
| [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html) | Strong authentication and phishing-resistant options reduce account compromise risk. | Require SSO/MFA and role-based read-only wallet access; never request a seed phrase or signing authority. |
| [Figma Financial Dashboard UX patterns](https://www.nngroup.com/articles/financial-dashboard-design/) | Financial dashboards work when hierarchy supports a recurring decision, comparisons are meaningful, and uncertainty is explicit. | Put cash runway and action queue first; use small multiples and clear units rather than a price-wall. |
| [Messari Crypto Theses 2025](https://messari.io/report/crypto-theses-for-2025) | Stablecoins and on-chain finance remain a core institutional/product theme, while fragmentation across venues and chains persists. | Focus product wedge on stablecoin operational concentration and deployable cash. |

## Segments and recurring decisions

* DAO/protocol treasury teams decide where stablecoin reserves should sit, when an exposure is too concentrated, and whether operating runway is protected.
* Crypto startups’ finance leads reconcile exchange, custody and on-chain balances before payroll/vendor decisions; their buyer trigger is a board, audit, treasury-policy, or runway review.
* Funds need attribution and investment reporting, but their workflow differs materially from an operating treasury.
* Active traders prioritize execution and latency; tax teams prioritize immutable transaction classification. Neither is Northstar’s initial wedge.

## Data and risk conventions

The canonical model is `Treasury → Account/Wallet → Chain → Asset → Position → Observation`. Observations carry `source`, `observedAt`, `confidence/coverage`, and valuation currency. Values are estimates: price, reserve quality, chain finality, bridge/custody exposure, liquidity, smart-contract exposure and counterparty concentration are different risks. “Yield” must show net/variable assumptions and is never a guarantee. A late source is a **stale-data state**, not a zero.

## Product/category conventions

Portfolio trackers (Zapper, DeBank), analytics (Dune), risk/data providers and treasury/custody systems each solve part of the workflow. The opening is not another universal tracker: it is a decision loop—**notice concentration → understand cash/coverage → assign review → record a policy-aware decision**—with provenance attached.

## Positioning and GTM

Positioning: “Your stablecoin runway, with the why attached.” Pricing hypothesis: free read-only demo/template; $750/month per organization for up to 5 entities; enterprise for SSO, policy exports and custom connectors. Launch via fractional CFOs, crypto accounting partners and treasury-policy workshops. Activation is linking/importing one entity and completing the first weekly review. Retention is a weekly decision brief and evidence export, not daily price checking.
