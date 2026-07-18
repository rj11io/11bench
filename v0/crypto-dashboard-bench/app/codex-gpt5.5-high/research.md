# Research: Stablecoin Treasury Risk Cockpit

Access date for all sources: 2026-07-16.

## Selected wedge

Build a treasury decision cockpit for finance and operations teams at stablecoin-native companies: payment processors, market makers, protocols, foundations, and Web3 SaaS businesses that hold operating cash across wallets, exchanges, custodians, chains, and stablecoin issuers.

The product is not a general portfolio tracker. It answers a recurring finance question: "Can we safely fund the next 7-30 days of payouts, payroll, grants, and market operations without taking avoidable depeg, chain, custody, counterparty, compliance, or liquidity risk?"

## Source log and findings

1. Fireblocks, "State of Stablecoins 2025", https://www.fireblocks.com/report/state-of-stablecoins
   - Finding: Stablecoins are moving from pilots to payment infrastructure. Fireblocks reports that in 2024 stablecoins accounted for nearly half of transaction volume on its platform, 90% of surveyed firms are taking action, faster settlement is the top cited benefit, and infrastructure readiness is high.
   - Decision changed: Focused the product on operational execution readiness rather than speculative trading. The core job became daily liquidity/risk review before payouts.

2. Chainalysis, "The Chainalysis 2025 Global Adoption Index", https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/
   - Finding: Chainalysis added an institutional activity sub-index, showing crypto is not only retail-led. Stablecoin activity is central to cross-border payments and institutional flows; APAC and Latin America grew rapidly in on-chain value received.
   - Decision changed: Primary user is a business finance/ops owner, not a retail trader. GTM should start with teams serving cross-border corridors.

3. Fireblocks, "Treasury Management", https://www.fireblocks.com/products/treasury-management
   - Finding: Enterprise treasury products emphasize secure storage, policy controls, approvals, connectivity to exchanges/counterparties, automated operations, and DeFi access.
   - Decision changed: The demo must include governance and suggested actions, not only balances.

4. Safe, "Multisig Wallet for Secure Onchain Asset Management", https://www.safe.global/wallet
   - Finding: Safe positions multisig, simulation, spending limits, roles, multichain treasury, transaction builder, and open-source self-custody as trust patterns for organizations.
   - Decision changed: Wallet trust model should be read-only first, with explicit permissions and no transaction-signing in the demo.

5. Cryptio, "Stablecoins Use Case", https://cryptio.co/use-cases/stablecoins
   - Finding: Stablecoin issuers and finance teams need independent token supply tracking, reconciliation, audit-ready controls, source attribution, principal market valuation, and ERP/report exports.
   - Decision changed: The product must show evidence packs, data lineage, and accounting-ready exports as part of the workflow.

6. TRES Finance, "Crypto Accounting and Web3 Treasury", https://tres.finance/
   - Finding: Web3 finance platforms sell reconciliation, reporting, proof-of-funds, alerts, multi-source data, and audit readiness across networks, exchanges, and banking sources.
   - Decision changed: Positioning should avoid broad accounting replacement and instead wedge into forward-looking treasury risk decisions.

7. CoinGecko API, "Endpoint Overview", https://docs.coingecko.com/reference/endpoint-overview
   - Finding: Market data models include assets, token prices by contract address, coin markets, tickers, exchange data, historical price/volume/market cap, and on-chain DEX data.
   - Decision changed: Entity model needs separate asset, token contract, venue, price source, and timestamp objects.

8. DeFiLlama, "Downloads", https://defillama.com/downloads
   - Finding: Public crypto data conventions include stablecoins, stablecoin by chain, RWA, TVL, yields, hacks, treasuries, bridges, CEX transparency, and ETF/DAT datasets.
   - Decision changed: Add stablecoin supply, bridge/chain exposure, and historical exploit risk as risk context rather than raw chart clutter.

9. Dune Docs, "Data Catalog", https://docs.dune.com/data-catalog/overview
   - Finding: On-chain analytics data is layered as raw, decoded, and curated; Dune emphasizes transparent methodology, data quality checks, raw data within minutes of finality, and curated hourly refresh.
   - Decision changed: Every dashboard metric should carry freshness and provenance labels. Demo data must identify when it is a curated estimate.

10. Kaiko, "Raw order book snapshot + market depth, bid/ask spread & price slippage", https://docs.kaiko.com/rest-api/data-feeds/level-1-and-level-2-data/level-2-aggregations/raw-order-book-snapshot/raw-order-book-snapshot-+-market-depth-bid-ask-spread-and-price-slippage
    - Finding: Liquidity is better represented by order book depth, spread, and slippage than by volume alone. Null values can mean insufficient depth.
    - Decision changed: The product uses "exit capacity" and "slippage to move $1m" rather than only 24h volume.

11. Coin Metrics, "Market Data Overview", https://docs.coinmetrics.io/market-data/market-data-overview
    - Finding: Institutional market data separates markets, assets, pairs, exchanges, order books, funding, liquidations, open interest, and reference rates.
    - Decision changed: Calculations should keep market venue data separate from asset exposure and stablecoin issuer exposure.

12. Coin Metrics, "FAQs", https://docs.coinmetrics.io/resources/faqs
    - Finding: Reference rates can be designed to resist exchange-level outliers; null liquidity metrics should be transparent rather than hidden.
    - Decision changed: The UI must distinguish "not enough data" from "low risk" and include confidence states.

13. Kaiko, "The Crypto Data Problem", https://www.kaiko.com/news/the-crypto-data-problem
    - Finding: Crypto market data is fragmented across many venues; quality depends on collection, normalization, standards, outlier management, QA, and source ranking.
    - Decision changed: The product promise cannot be "the price". It should be "decision-grade evidence with source confidence."

14. EIP-4361, "Sign-In with Ethereum", https://eips.ethereum.org/EIPS/eip-4361
    - Finding: SIWE requires domain binding, address binding, nonce, issued-at time, chain ID, human-readable statement, and replay/phishing protections.
    - Decision changed: Wallet onboarding must show exact read permissions and use SIWE only for authentication, not custody or trade authorization.

15. OFAC, "Publication of Sanctions Compliance Guidance for the Virtual Currency Industry and Updated Frequently Asked Questions", https://ofac.treasury.gov/recent-actions/20211015
    - Finding: OFAC published virtual-currency sanctions compliance guidance and emphasizes sanctions obligations, licensing/enforcement, and best practices.
    - Decision changed: Compliance alerts should be first-class, but the product should not claim to clear transactions. It flags screening status, source, and required review.

16. U.S. Treasury, "Treasury Releases 2023 DeFi Illicit Finance Risk Assessment", https://home.treasury.gov/news/press-releases/jy1391
    - Finding: Treasury identifies illicit finance risks in DeFi, including non-compliance with AML/CFT and sanctions obligations, poor cybersecurity, and laundering risks.
    - Decision changed: DeFi and bridge exposures receive protocol and counterparty risk flags, not only yield/return metrics.

17. Congress.gov, "S.1582 - GENIUS Act", https://www.congress.gov/bill/119th-congress/senate-bill/1582/text
    - Finding: The GENIUS Act became Public Law 119-27 on 2025-07-18. It requires permitted stablecoin issuers to publish monthly reserve composition and monthly certifications/examinations.
    - Decision changed: U.S. stablecoin issuer risk should track reserve report age, permitted issuer status, and legal/jurisdictional basis.

18. U.S. Treasury, "Treasury Seeks Public Comment on Implementation of the GENIUS Act", https://home.treasury.gov/news/press-releases/sb0254
    - Finding: Treasury implementation focuses on consumer protection, illicit finance risk, and financial stability risk. The ANPRM itself did not implement new requirements.
    - Decision changed: Compliance text in the product must distinguish current obligations, implementation status, and internal policy thresholds.

19. ESMA, "ESMA and the European Commission publish guidance on non-MiCA compliant ARTs and EMTs (stablecoins)", https://www.esma.europa.eu/press-news/esma-news/esma-and-european-commission-publish-guidance-non-mica-compliant-arts-and-emts
    - Finding: EU CASPs were expected to comply with MiCA requirements for non-compliant ARTs and EMTs no later than end of Q1 2025.
    - Decision changed: EU entity views need stablecoin compliance status by jurisdiction.

20. European Banking Authority, "Asset-referenced and e-money tokens (MiCA)", https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica
    - Finding: Issuers of ARTs and EMTs must hold authorization for activities in the EU; requirements are set by MiCAR and EBA technical standards/guidelines.
    - Decision changed: The product should model stablecoin issuer authorization separately from token price stability.

21. SEC, "Statement on the Custody of Crypto Asset Securities by Broker-Dealers", https://www.sec.gov/newsroom/speeches-statements/trading-markets-121725-statement-custody-crypto-asset-securities-broker-dealers
    - Finding: SEC staff discussed possession/control, DLT network assessment, material security/operational problems, private key protection, and disruption planning for broker-dealer custody of crypto asset securities.
    - Decision changed: Custody risk scoring should include network characteristics, key-control posture, and business-continuity evidence.

## User and buyer segments

- Stablecoin payment companies: need enough USDC/USDT/EURC on the right chain and venue before batch settlement.
- Web3 finance teams and controllers: need month-end evidence, valuation, wallet reconciliation, and approval trails.
- Protocol/foundation operations teams: need runway, grant/payroll funding, signer policy visibility, and asset concentration risk.
- Market makers/OTC desks: need venue liquidity, counterparty exposure, and emergency rebalancing plans.
- Regulated fintech/compliance teams: need watchlists, sanctions screening status, jurisdiction flags, and custody evidence.

Primary user chosen: Head of Finance or Treasury Operations at a Series B-C stablecoin payment processor with $5m-$100m in monthly on-chain flow.

Buyer: CFO/COO. Influencers: controller, compliance lead, engineering/data lead, wallet admins.

Recurring decisions:

- Can we run the next payout batch without underfunding a rail?
- Which chain/issuer/venue exposure should we reduce before the next close?
- Which wallet, exchange, or bridge exposure needs manual review?
- What evidence can we attach to an approval memo or auditor request?
- Should we pause a payout corridor, rebalance inventory, or ask for extra approvals?

## Representative products and category conventions

- Fireblocks and Safe define the operational/custody layer: wallet security, approvals, policy controls, transaction simulation, signer roles, and multichain treasury.
- Cryptio, TRES, and Kryptos define the finance back-office layer: data ingestion, reconciliation, accounting, proofs, exports, and audit readiness.
- Dune, DeFiLlama, CoinGecko, Coin Metrics, and Kaiko define data conventions: chain, asset, token contract, venue, reference rate, order book, liquidity, stablecoin supply, TVL, bridge volume, and provenance.

Gap: existing tools often split "operate wallets", "close the books", and "analyze on-chain data". The wedge is a decision layer that turns those sources into an approval-ready treasury action memo.

## Data models

Core entities:

- Organization: legal entities, policies, base currency, jurisdictions.
- Wallet/account: address, chain, owner, custody type, signer threshold, labels, entity mapping.
- Asset: symbol, canonical asset ID, issuer, peg, token contracts, decimals, jurisdiction, reserve-report status.
- Position: wallet/account, asset, units, USD/EUR value, source, block height, valuation timestamp.
- Venue: exchange, OTC desk, custodian, DeFi protocol, bridge, bank rail, counterparty.
- Liquidity route: from asset/chain to target asset/chain, route steps, expected settlement time, depth, spread, slippage, withdrawal limit.
- Risk signal: type, severity, confidence, source, first seen, owner, resolution status.
- Treasury obligation: payout batch, payroll, grant, invoice, tax, market-making float, due date, currency, chain/rail.
- Action memo: suggested rebalance/pause/approve action, assumptions, approvers, evidence, audit trail.

Calculations:

- Operating runway = eligible liquid stablecoin balance / daily net outflow forecast.
- Corridor coverage = same-chain same-asset available balance / obligations due in selected window.
- Concentration = percent of liquid treasury by issuer, chain, wallet, venue, and custodian.
- Depeg stress = value impact under selected bps deviation by stablecoin issuer.
- Exit capacity = min(order-book depth after slippage cap, venue withdrawal limit, bridge route cap, policy limit).
- Evidence confidence = weighted data completeness across wallet balance, valuation source, liquidity source, compliance screening, and reserve report age.

## Volatility, liquidity, provenance, latency, and uncertainty communication

Design requirements from research:

- Show time and source on every metric: block height, API source, report date, or "seeded demo".
- Separate "bad" from "unknown"; unknown confidence must be visually distinct.
- Use bps and absolute dollars for depeg risk because finance users decide in money, not only percentages.
- Liquidity needs spread, depth, slippage, withdrawal limits, and bridge timing. 24h volume alone is not sufficient.
- Show stress scenarios in plain-language operational terms: "Payroll rail underfunded by $480k after 75 bps depeg".
- Use monotone status colors with redundant labels/icons for accessibility.

## Wallet/security trust patterns

- Read-only by default: address import, CSV upload, custodian statement import, or data warehouse connection.
- SIWE for authentication where wallet auth is used; domain, nonce, issued-at, and chain ID must be visible.
- No signing, transfers, or approvals in the analytics product unless a future transaction builder integration is explicitly added.
- All wallet labels, entity mappings, and memos are organization-private.
- Sanctions/compliance status is a review aid, not legal clearance.
- Export includes source hashes, timestamps, report versions, user, and decision rationale.

## Regulatory and compliance concerns

- U.S. stablecoin framework under the GENIUS Act affects issuer reserve reporting, issuer status, monthly certifications, and misleading insurance/legal-tender claims.
- Treasury implementation remained in rulemaking/comment process in 2025; product copy must not overstate final rules beyond law and current guidance.
- EU MiCA affects ART/EMT authorization and CASP support for compliant/non-compliant stablecoins.
- OFAC sanctions obligations and Treasury DeFi risk assessment make sanctions screening, protocol exposure, and audit trail essential.
- SEC custody statements are relevant for broker-dealers and advisers; the product should avoid custody claims and state that it is a monitoring/workflow layer.

## Visualization patterns

- Top-line decision bar: runway, underfunded corridors, high-severity signals, and evidence confidence.
- Exposure matrix: rows by issuer/chain, columns by amount, concentration, depeg stress, reserve report age, and jurisdiction.
- Liquidity route table: route, available capacity, slippage, ETA, venue limit, confidence.
- Risk timeline: first seen, affected asset/wallet/route, owner, status.
- Scenario controls: base, volatile market, depeg stress, bridge incident.
- Action memo panel: computed recommendation, editable notes, evidence checklist, approval state.

## Positioning, monetization, acquisition, and GTM

Positioning: "The decision cockpit for stablecoin treasury operations - know what to fund, pause, rebalance, and evidence before money moves."

Differentiation:

- Forward-looking operational risk rather than after-the-fact accounting only.
- Evidence-linked action memos rather than generic alerts.
- Stablecoin-specific issuer, chain, liquidity, compliance, and reserve-report semantics.

Packaging hypothesis:

- Starter: $1,500/month for up to 25 wallets, one entity, CSV/imports, weekly evidence reports.
- Growth: $5,000/month for 250 wallets, 5 entities, data warehouse export, alert routing, custom policies.
- Enterprise: $15,000+/month for unlimited wallets, SSO, SOC evidence pack, custom risk models, premium data connectors.

Acquisition:

- Start with payment processors and protocol foundations that already use Safe, Fireblocks, Cryptio/TRES, or data warehouses.
- Partner with CFO/accounting communities, stablecoin infrastructure providers, and audit/advisory firms.
- Lead magnet: "Stablecoin Treasury Risk Review" generated from read-only wallet and CSV uploads.

GTM narrative:

"Stablecoins made settlement faster. Finance teams now need the same speed for controls. Treasury Sentinel turns fragmented balances, market depth, reserve reports, and compliance signals into a same-day decision memo: fund, pause, rebalance, or escalate."

