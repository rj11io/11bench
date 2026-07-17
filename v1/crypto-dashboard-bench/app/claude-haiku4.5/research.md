# Research — Yield Scout DeFi Opportunity Discovery

**Research date:** 2026-07-16  
**Selected wedge:** a yield discovery and risk dashboard for retail DeFi liquidity providers deciding where to deploy capital across protocols and chains.  
**Primary user:** retail DeFi user managing positions across 2–10 active protocols (small yield farmer, liquidity provider, active DeFi explorer).

## Executive finding

DeFi yields are advertised as percentages, but the gap between temporary incentive yields and sustainable protocol fees is invisible to most users. A retail LP faces a repeated decision: **"Should I move capital here, and is this yield real or temporary?"** That requires comparing base yields across protocols, calculating the actual impact of impermanent loss and gas costs, and assessing protocol risk without requiring SQL knowledge or auditor credentials.

Yield Scout is positioned as a **non-technical yield research tool**: it answers whether a yield opportunity is worth capital allocation by decomposing APY into sustainable components, estimating IL and gas impact, and surfacing protocol risk signals (team history, audits, hacks timeline, governance concentration). It is complementary to protocol analytics platforms and trading UIs; it does not execute swaps, manage wallets, or make trading recommendations.

## Users, jobs, and recurring decisions

| Segment | Job | Recurring decision | Current workaround / pain |
| --- | --- | --- | --- |
| Retail yield farmer (2–10 positions) | Find yield above inflation while managing risk and gas | Which pool should I add liquidity to? Is this 50% APY sustainable? | Bookmark 5 tabs, cross-check DefiLlama and Discord; miss gas cost math entirely |
| Active LP rebalancing | Optimize capital allocation as yields shift and risk changes | Should I move this $5k to Curve or Aave? How much IL will I lose? | Manual spreadsheet calculation, outdated assumptions about gas costs |
| DeFi explorer on new chain | Assess protocol maturity and risk before first deposit | Can I trust this 200% APY on Arbitrum? Has the team launched before? | Read Discord (bias), assume audit = safety, miss team and launch history |
| Small DAO contributor | Monitor treasury and competitive yield opportunities | Where can we safely park our stablecoin allocation? | Spotchecks, reliance on core team, vulnerable to rug-pull or exploit |

The buying trigger is usually entering a new chain, seeing an outsized yield claim, or recovering from a rug pull / exploit. Retention comes from weekly rebalancing checks, a monthly risk review, and alerts when yields collapse.

## Representative products and category conventions

- **DefiLlama** (defillama.com): the dominant protocol TVL aggregator with 7,000+ protocols tracked, yield pool rankings, and a hacks timeline showing protocol team incident response. This sets the convention of comparing TVL, yield percentages, and trust signals via past behavior. The gap: DefiLlama shows yields but does not calculate impermanent loss impact or gas optimization. [DefiLlama Documentation](https://defillama.com) (accessed 2026-07-16).

- **Dune Analytics** (dune.com): a collaborative analytics platform for custom on-chain queries, dashboards, and SQL-based behavior analysis. This validates on-chain data sourcing and the value of transparent metric calculation. The gap: requires SQL expertise; most retail users cannot build custom comparisons. [Dune Docs](https://docs.dune.com) (accessed 2026-07-16).

- **Curve Analytics** (curve.fi): a protocol-specific analytics and governance dashboard. This shows the convention of protocol-native dashboards with detailed metrics, but does not provide cross-protocol comparison or risk assessment for end users. [Curve Interface](https://curve.fi) (accessed 2026-07-16).

- **Yearn Finance** (yearn.finance): an optimizer platform that compares yields across protocols and automatically rebalances. This validates that users want comparison and rebalancing, but also shows that an opaque "best yield" black box is insufficient for risk-aware allocators. [Yearn Vaults](https://yearn.finance/vaults) (accessed 2026-07-16).

- **1inch Analytics** (1inch.io): a swap-optimization and routing platform. This shows strong UI/UX for multi-chain routing and cost visualization. The gap: 1inch optimizes execution, not capital allocation decisions. [1inch Interface](https://1inch.io) (accessed 2026-07-16).

These sources changed the product requirement: provide transparent, gas-aware, multi-chain yield comparison with explicit impermanent loss impact and protocol risk signals—without requiring SQL or claiming to predict yields.

## Data and domain model

The dashboard needs separate entities for yield discovery:

- **Protocol** → **Chain** → **Pool** (or vault or strategy). A protocol may span multiple chains; a pool is a specific market pair and fee tier.
- **Yield observation** = base yield (protocol fees), reward yield (token emissions), total APY, period (current day, 7-day average, 30-day average), source, timestamp, confidence.
- **Impermanent loss scenario** = token pair, pool price range, fee tier, historical volatility, and estimated IL per holding period (24h, 7d, 30d).
- **Gas cost impact** = network, gas price, token pair, pool size (for swap cost), deposit and withdrawal cost, net yield after gas.
- **Protocol risk signal** = audit history (count, auditor, severity findings), team history (founder previous exits, team size, GitHub activity), hacks timeline (incident date, severity, resolution), governance concentration (top voting power %), TVL concentration (top liquidity %), and smart contract risk summary.
- **User portfolio position** = protocol, chain, pool, units, entry price, unrealized IL, duration, and rebalancing age.

For the demo, seeded data uses real protocols and chains (Ethereum, Arbitrum, Optimism) with anonymized or clearly labeled demo portfolio positions. Yield and price data are historical snapshots from 2026-07-15 and labeled **DEMO DATA — not live**. Numbers reflect approximate real market conditions on that date but should not be interpreted as current or a performance claim.

## Risk, uncertainty, provenance, and latency

Yield data is not equally authoritative. On-chain fee data is ledger-observable; reward yields depend on incentive programs that change daily; impermanent loss is a mathematical consequence of price volatility but varies by position duration; protocol risk is multi-dimensional and cannot be reduced to a single score.

Key communication patterns:

- Show **yield components** (base vs. reward) and the time window (current, 7d avg, 30d avg) next to every yield number.
- Distinguish **observed** (historical fee yields, past IL), **derived** (projected IL, gas impact), and **assumed** (protocol incentive sustainability).
- Show a stale-data warning when a yield source is more than 6 hours old; never animate or represent demo data as live.
- Label each **protocol risk signal** with source and recency: "GitHub activity: 12 commits in last 30 days (as of 2026-07-14)", "Audits: 2 by Trail of Bits and CertiK (2024–2025)".
- Make risk severity semantic: red = critical (active exploit, team exit), amber = caution (governance risk, high concentration, unaudited), blue = informational (pool is new, low liquidity). Never use green to imply safety or guaranteed yield.
- Display impermanent loss as a scenario range, not a prediction. "If ETH volatility remains 45%, IL could be 5–12% over 30 days."
- Gas costs are shown as a percentage of yield for small positions; the UI warns when gas exceeds 30% of expected return.

## Wallet, security, privacy, and data permissions

The demo uses read-only Etherscan and DefiLlama APIs with no private keys, wallet connections, or authentication required. In a production product, users would be able to:

- Import a read-only wallet address or CSV of positions to see personalized IL and gas impact.
- Set price alerts and yield alerts without storing private keys.
- Export portfolio snapshots and transaction history for tax reporting.

The product does not require metamask, custody, or a blockchain wallet. It does not recommend specific trades or promise yield outcomes; all yield claims are attributed to source and timestamp.

## Visualization and interaction findings

Effective DeFi dashboards prioritize **comparison with context**. The first screen should answer: best current yields (with risk), my portfolio (with IL and gas impact), and protocol risk summary. A yield table should decompose APY into components, show historical stability, and allow filtering by chain, risk level, and position size. IL and gas cost should be calculated per position, not as generic numbers.

The selected design uses a yield comparison table with sortable columns, an IL calculator, protocol risk cards with signal summaries, and a portfolio view showing unrealized IL and gas impact. It avoids speculative candlesticks and avoids any implication that past yields predict future yields.

## Positioning, monetization, and GTM

**Positioning:** "Yield Scout shows you which yields are real and which are temporary—with the gas math and risk signals attached. No SQL, no guessing."

The wedge sits between protocol analytics (for everyone) and yield optimization platforms (for serious farmers). It can acquire through DeFi educator communities, yield farming Discord channels, DAO treasuries, and risk-aware retail communities. A read-only dashboard with public-address import demonstrates value without API keys or paid data.

Packaging hypothesis: Free tier with yield comparison and protocol risk lookup for 5 protocols; Scout Plus at $9/month for portfolio tracking, IL estimation, gas simulation, and yield alerts for 50+ protocols; Scout Pro at $29/month with multi-chain rebalancing analysis and institutional risk reports. The initial GTM narrative is "find yields that last, not yields that evaporate." Success is a free-tier user converting to paid after their first rebalancing decision, combined with retention through weekly alerts and monthly risk reviews.

