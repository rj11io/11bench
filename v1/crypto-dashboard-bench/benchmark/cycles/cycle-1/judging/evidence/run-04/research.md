# Research: Harbor Treasury

Access date for all sources: July 16, 2026.

## Research conclusion

The best wedge is not a general crypto portfolio dashboard. It is a stablecoin treasury control tower for finance and operations teams at payments companies, exchanges, OTC desks, and cross-border businesses that already move material value and need to decide which issuer, chain, and custody path is acceptable for each payout. The decision loop is repeated, operational, and expensive when done badly: release now, hold, reroute, or rebalance.

## Segment and jobs research

| Topic | Source | Findings | Decision changed |
| --- | --- | --- | --- |
| Institutional demand pattern | Coinbase, "2026 Institutional Investor Digital Assets Survey" https://www.coinbase.com/institutional/research-insights/research/insights-reports/2026-institutional-investor-survey-e-and-y | Survey summary says 66% cite regulatory compliance as a key custodian selection factor in 2026 and 66% cite security/key-signing protocols; 85% use or are interested in stablecoins for internal cash management and money movement. | Shifted target user away from traders toward treasury and operations buyers who care about governance and operating controls. |
| Corporate buyer language | Coinbase Institutional, "Corporate treasury management services" https://www.coinbase.com/institutional/clients/corporates | Coinbase positions the buyer as corporates managing treasury holdings, custody, trading, USDC rewards, staking, and payments from one institutional platform. | Confirmed a real buyer category with budget and an institution-facing product vocabulary. |
| Treasury operating jobs | Fireblocks Developer Docs, "Treasury Management" https://developers.fireblocks.com/docs/treasury-management | Treasury teams need a holistic asset view across wallets, exchanges, and fiat providers; governance rules, approvals, internal fund movements, and automated operations are first-class jobs. | Changed the dashboard concept from "analytics" to "operations + policy + movement visibility." |
| Why stablecoins matter to treasury | Fireblocks, "Corporate Treasury" https://www.fireblocks.com/use-case/corporate-treasury | Treasury pains include prefunding, trapped cash, cross-border settlement delays, and internal approval friction; stablecoins are pitched as T+0/T+instant alternatives integrated into treasury workflows. | Tightened the wedge to cross-border payout and treasury routing rather than passive reporting. |
| Payments infrastructure tailwind | Chainalysis, "The $100 Trillion Wealth Shift: Stablecoin Utility and the Future of Payments" https://www.chainalysis.com/blog/stablecoin-utility-future-of-payments/ | Chainalysis frames stablecoins as increasingly core payments infrastructure and ties current momentum to institutional rails, integrations, and payment-network activity. | Supported a GTM narrative focused on finance infrastructure, not crypto-native speculation. |

## Data model and provenance research

| Topic | Source | Findings | Decision changed |
| --- | --- | --- | --- |
| Wallet and portfolio entity model | Coinbase Developer Docs, "Wallets Overview" https://docs.cdp.coinbase.com/prime/concepts/wallets/wallets-overview | Prime distinguishes portfolio types and wallet types such as trading balances, custody wallets, and segregated vault wallets. Wallet identity and custody context matter operationally. | The demo entity model includes rail, chain, issuer, venue, and custody context instead of a flat token balance list. |
| On-chain freshness and latency | Dune Docs, "Data Freshness" https://docs.dune.com/data-catalog/data-freshness | Freshness varies by raw, decoded, and curated data, and is constrained by chain block cadence and reorg risk. | Added explicit non-live status and provenance language; the product spec requires freshness labels rather than pretending all data is synchronous. |
| Market quality measurement | CoinGecko, "Methodology" https://www.coingecko.com/en/methodology and "Trust Score Methodology" https://support.coingecko.com/hc/en-us/articles/36442561461657-Trust-Score-Methodology | Liquidity quality cannot rely on reported volume alone; order-book depth, spreads, regulation, incidents, cybersecurity, and proof-of-reserves matter. | Reinforced that trust/risk panels should combine multiple quality signals, not raw volume leaderboards. |
| Stablecoin reserve transparency | Circle, "Transparency & stability" https://www.circle.com/transparency | Circle publishes reserve composition and dated snapshots, including balances and issuance/redemption context. | Reserve posture became a core input to payout routing and issuer policy, not background reference text. |

## Trust, security, and compliance research

| Topic | Source | Findings | Decision changed |
| --- | --- | --- | --- |
| AML/CFT and unhosted-wallet risk | FATF, "Targeted report on Stablecoins and Unhosted Wallets - Peer-to-Peer Transactions" https://www.fatf-gafi.org/en/publications/Virtualassets/targeted-report-stablecoins-unhosted-wallets.html | FATF flags rapid stablecoin growth, unhosted-wallet misuse, and the need for stronger controls around P2P flows. | Added a compliance review state and exception logging as core workflow states. |
| Travel Rule context | FATF, "FATF updates Standards on Recommendation 16 on Payment Transparency" https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html | FATF updated payment-transparency standards in June 2025 to improve required originator/beneficiary information. | The PRD includes beneficiary data, approvals, and audit trail requirements for each release decision. |
| U.S. sanctions applicability | OFAC FAQ 1021 https://ofac.treasury.gov/faqs/1021 and FAQ 646 https://ofac.treasury.gov/faqs/646 | OFAC states sanctions rules apply to virtual currency activity and blocked digital currency requires risk-based controls and reporting. | The demo includes a sanctions-review hold state and does not let risk disappear into a generic warning banner. |
| Enterprise security pattern | Fireblocks, "What Is Fireblocks?" https://developers.fireblocks.com/docs/what-is-fireblocks | Direct custody, governance policy engines, transaction rules, and role-based approvals are treated as treasury fundamentals. | Drove the product promise toward "decision control tower" rather than wallet UX or self-custody onboarding. |

## UX and visualization implications

1. Crypto treasury users make decisions under uncertainty, so the UI should show provenance, timestamp context, and policy posture near the decision itself, not in a hidden tooltip.
2. Payout routing requires comparison across multiple axes: cost, settlement ETA, issuer/reserve comfort, corridor acceptance, and sanctions readiness.
3. A strong dashboard in this category should foreground exception handling and queue state over decorative charts.
4. Risk communication should separate "fast but watchlisted" from "slow but policy-preferred"; binary safe/unsafe language is too crude.

## Category and competitor conventions

1. Coinbase and Fireblocks both sell institutional control, custody, and workflow unification rather than consumer-style portfolio exploration.
2. Data providers like Dune and CoinGecko expose the limits of freshness and reported-liquidity quality, which means a serious product must avoid fake precision.
3. The visible category gap is between wallet/custody systems and broad analytics tools: teams still need a treasury-specific operating layer that translates risk and liquidity inputs into release decisions.

## GTM implications

1. Primary buyer: VP Finance, Treasurer, or Head of Treasury Ops at a stablecoin-heavy business.
2. Primary user: treasury operator or payments operations lead who executes releases and rebalances daily.
3. Buying trigger: expanding cross-border stablecoin volume, adding more counterparties, or formalizing governance after audit, bank, or board scrutiny.
4. Monetization pattern: SaaS platform fee with seats, policy workflows, and higher-tier integrations/export controls rather than retail subscription pricing.

## Why this wedge wins

This wedge is defensible because the product is attached to repeated operational decisions with financial, compliance, and liquidity consequences. It is more focused than a universal crypto super-app and more concrete than a general analytics dashboard. It creates a path to real workflow value, enterprise packaging, and a plausible GTM story.
