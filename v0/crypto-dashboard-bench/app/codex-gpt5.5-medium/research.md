# Research: StableOps Radar

Access date for all sources: July 16, 2026.

## Product wedge selected

**Stablecoin treasury risk operations for fintechs, exchanges, payment companies, and crypto-native finance teams.** The dashboard is not a general portfolio tracker. It answers a recurring operating question: "Can we fund today's stablecoin corridor with the right issuer, chain, wallet, custodian, liquidity, compliance, and approval posture?"

This wedge was selected because stablecoins have strong institutional utility, but operators still make fragmented decisions across custodians, wallets, market data, sanctions tooling, issuer transparency pages, and spreadsheets. The product buyer is a treasury, risk, or payments operations lead who needs auditability and fast exception handling more than trader-style charting.

## Segments, jobs, and recurring decisions

| Segment | Jobs | Recurring decisions | Research basis | Decision changed |
| --- | --- | --- | --- | --- |
| Fintech/payment treasury teams | Maintain settlement float, route payouts, minimize idle balances | Which stablecoin/rail should fund a corridor? How much buffer is enough? | EY-Parthenon/Coinbase 2026 survey says institutional focus is shifting from access to application; 45% of firms use or hold stablecoins and 41% are interested; top use cases include T+0 settlement, cash movement, 24/7 trading, collateral, and trading out of risk. https://www.ey.com/en_us/financial-services/institutional-digital-assets-survey | Build around treasury operations and stablecoin corridors, not investor PnL. |
| Institutional investors and asset managers | Allocate exposure within governance limits | What vehicle/custodian/rail meets board, auditor, and liquidity expectations? | EY survey reports 73% plan increased digital-asset allocations in 2026, 81% prefer registered spot vehicles for spot exposure, and 61% use a multi-custodian model. | Include multi-venue/custodian model and compliance framing. |
| Crypto exchanges, OTC desks, market makers | Maintain collateral, margin, and transfer readiness | Which venues can be topped up quickly without depeg or AML risk? | Fireblocks positions treasury management around policy controls, approval workflows, exchange/counterparty connectivity, automated operations, DeFi/staking access, and transaction simulation. https://www.fireblocks.com/products/treasury-management | Add approval workflow and "no live transaction" trust language. |
| Protocol/DAO treasuries | Keep runway, diversify stablecoin exposure, manage DeFi risk | How concentrated is treasury risk by issuer, chain, protocol, and liquidity venue? | DefiLlama exposes datasets for stablecoins, TVL, yields, hacks, protocol treasuries, bridges, CEX transparency, and token unlocks. https://defillama.com/downloads | Entity model includes issuer, chain, venue, balance, liquidity, and risk provenance. |

## Representative products and conventions

- **Fireblocks Treasury Management** emphasizes policy controls, authorization workflows, role permissions, automated operations, MPC custody, and institutional counterparty connectivity. This supports a product convention: treasury dashboards must show permissions, approval state, operational controls, and not just holdings. Source: https://www.fireblocks.com/products/treasury-management
- **Nansen Labels & Watchlists** shows that wallet labels, watchlists, and behavioral tags turn raw addresses into operational entities. Source: https://academy.nansen.ai/en/help/articles/2149924-labels-and-watchlists-101
- **Arkham Private Labels / Entity model** groups multiple addresses into private entities and distinguishes labels from entities. Source: https://info.arkm.com/announcements/private-labels-dashboard-is-live
- **Dune vs Nansen positioning** shows the split between custom analytics/SQL depth and curated wallet/entity signals. Source: https://dune.com/alternatives/dune-vs-nansen
- **DefiLlama** is a category convention for open DeFi datasets: TVL, stablecoins, yields, volumes, fees, treasuries, bridges, and hacks. Source: https://defillama.com/downloads

Decision changed: the demo uses labeled treasury positions and corridor policy checks rather than anonymous token price panels.

## Data models

Core entities for the product:

- **Organization**: legal entity, jurisdictions, policy set, billing seat group.
- **Treasury account**: custodian account, exchange account, wallet, or contract account.
- **Address/account identifier**: chain namespace, address, checksum/format validation, ownership label, confidence.
- **Stablecoin instrument**: issuer, symbol, contract address, chain, decimals, reserve reporting source, redemption terms.
- **Position**: account, instrument, chain, balance, available balance, pending deposits/withdrawals, updated timestamp.
- **Venue/rail**: exchange, custodian, L2, L1, payment corridor, counterparty, settlement SLA.
- **Market observation**: price, depth, spread, volume, oracle source, block time, last updated, confidence.
- **Risk observation**: peg deviation, liquidity depth, issuer reserve status, sanctions exposure, concentration, bridge risk, exploit history, operational permission state.
- **Decision plan**: corridor need, deadline, allowed rails, proposed sources, approvals, audit notes.

Relevant source findings:

- CoinMarketCap's quotes endpoint includes price, volume, market cap, TVL, supply, market-pair, and last-updated fields, with a 60-second cache/update frequency for latest quotes. Source: https://coinmarketcap.com/api/documentation/pro-api-reference/cryptocurrency
- CoinGecko exposes coins, global market data, exchange/derivative data, onchain DEX pools, and onchain trades. Source: https://www.coingecko.com/en/api and https://docs.coingecko.com/reference/endpoint-overview
- Uniswap v3 subgraph entities model factory, token, pool, tick, day/hour data, TVL, volume, fees, price, liquidity, and untracked values. Source: https://developers.uniswap.org/docs/ecosystem/subgraphs/concepts/v3/entities
- ERC-55 documents Ethereum mixed-case checksum addresses and explains the mistyped-address detection benefit. Source: https://eips.ethereum.org/EIPS/eip-55
- CAIP-2 specifies chain IDs as `namespace:reference`, useful for cross-chain account modeling. Source: https://eip.tools/caip/2

Decision changed: every demo row shows provenance and timestamp; the data model separates live price freshness from ledger balance freshness and liquidity model freshness.

## Risk, volatility, liquidity, provenance, latency, uncertainty

Stablecoin treasury UX must communicate:

- **Peg risk**: deviation from $1 in basis points, not only a green/red price.
- **Liquidity risk**: executable depth by venue/chain/corridor, not aggregate market cap.
- **Concentration risk**: issuer, chain, venue, custodian, and counterparty concentration.
- **Compliance risk**: sanctions exposure, high-risk counterparties, jurisdictional constraints, travel-rule needs.
- **Operational risk**: approval status, hot-wallet limits, settlement time, chain congestion, bridge dependency.
- **Provenance**: source type and timestamp for every balance, market observation, and risk label.
- **Uncertainty**: stale, inferred, untracked, or low-confidence values must be labeled; demo data must never imply live status.

The Chainalysis 2026 Crypto Crime Report shows why stablecoin operations need explicit compliance/risk controls: illicit addresses received at least $154B in 2025, sanctioned-entity volume drove much of the increase, and stablecoins accounted for 84% of illicit transaction volume. Source: https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/

The Chainalysis sanctions analysis reports a 694% surge in value received by sanctioned entities in 2025 and describes ruble-backed stablecoin A7A5 and sanctioned exchanges as examples of stablecoin-based sanctions evasion infrastructure. Source: https://www.chainalysis.com/blog/crypto-sanctions-2026/

Decision changed: risk alerts in the demo combine peg, liquidity, and compliance drift instead of treating depeg as the only stablecoin risk.

## Wallet/security trust patterns

Required trust patterns:

- Read-only onboarding first; no private keys, seed phrases, or transaction signing in the analytics surface.
- Explicit permission scopes by source: custodian report, exchange API, wallet index, market data, sanctions provider.
- MPC/custody and policy engines integrate as sources of approval state, not as hidden transaction systems.
- Human approval workflow for rebalances; simulation before submission in a production product.
- Private labels and entities should be customer-private by default.
- Avoid wallet-connection dark patterns; do not imply balances or prices are live if seeded.

Fireblocks' public materials reinforce institutional expectations around MPC custody, granular transaction policy, approval workflows, automated treasury operations, and transaction simulation. Source: https://www.fireblocks.com/products/treasury-management

Arkham's private labels page states custom entities/private labels are visible only in the user's personal instance unless shared. Source: https://info.arkm.com/announcements/private-labels-dashboard-is-live

Decision changed: the demo is explicitly read-only and the "Draft approval" action stores only local demo state.

## Regulatory and compliance concerns

- **AML/CFT and Travel Rule**: FATF updated Recommendation 16 payment transparency requirements in June 2025; the Travel Rule context for virtual assets requires better originator/beneficiary information to detect financial crime. Source: https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html
- **Virtual asset regulation**: FATF's 2025 targeted update urges stronger global action for virtual assets and VASPs and reports progress but continued gaps in implementation. Source: https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2025.html
- **US crypto securities interpretation**: SEC interpretive release S7-2026-09 addresses application of federal securities laws to certain crypto assets and transactions; the product must avoid legal classification claims. Source: https://www.sec.gov/rules-regulations/2026/03/s7-2026-09
- **Stablecoin reserve transparency**: Circle's transparency page publishes reserve composition, issuance/redemption, weekly reserve disclosure, and monthly third-party assurance. Source: https://www.circle.com/transparency
- **Tether reserves**: Tether's Q1 2026 attestation announcement reports BDO attestation, token-related liabilities, excess reserves, and short-duration/high-quality reserve instruments. Source: https://tether.io/news/tether-posts-1-04b-q1-2026-profit-despite-highly-volatile-global-markets-reaches-all-time-highs-8-23b-reserve-buffer-and-maintains-u-s-treasury-heavy-backing/

Decision changed: PRD requires issuer reserve provenance and compliance disclaimers; the demo labels all values seeded.

## Visualization conventions

Effective visualizations for this wedge:

- Corridor coverage cards: immediately answer "can we fund this?"
- Position table with risk badges and provenance: audit-friendly scanning beats decorative price charts.
- Issuer mix bar: concentration is a first-order stablecoin risk.
- Flow forecast: inflow/outflow/buffer over hours shows operational runway.
- Alert cards sorted by severity: exception-first workflow.
- Threshold sliders: lets risk teams see how policy changes affect eligibility.

Avoid:

- Large unlabeled candlestick walls.
- Single-hue dashboards that obscure severity.
- "Live" language when data is simulated or stale.
- Return/PnL emphasis for payment/treasury workflows.

## Positioning, monetization, acquisition, and GTM

Positioning:

> "Stablecoin treasury control for teams that move money onchain: see which balances are usable, which rails are risky, and what approval-safe action to take before the cutoff."

Competitive alternatives:

- Spreadsheets and internal BI over custodian exports.
- Custodian consoles such as Fireblocks.
- On-chain intelligence platforms such as Nansen/Arkham.
- Data workbenches such as Dune.
- General portfolio trackers.

Differentiation:

- Decision loop, not raw analytics.
- Stablecoin-specific risk semantics: peg, reserves, executable liquidity, sanctions labels, custody approvals, and corridor deadlines.
- Source provenance and auditability by default.
- Read-only first, with transaction system integration later.

Monetization hypothesis:

- Team plan: $1,500-$3,000/month for 3-10 seats, seeded sources, alerts, exports.
- Enterprise: annual contract by monitored AUM/flow volume, SSO, audit logs, custom policy engine, custody/exchange connectors, AML vendor integrations.
- GTM entry: sell to fintech treasury/payment ops teams running stablecoin payout, collateral, or settlement workflows.

Acquisition:

- Content and benchmarks around "stablecoin treasury policy templates."
- Integrations with custodians, payment processors, and risk providers.
- Incident-response playbooks for depeg, chain outage, sanctions event, and liquidity compression.

