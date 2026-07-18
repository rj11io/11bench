# Research: Treasury Risk Control Room

Run folder: `app/codex-gpt5.5-xhigh`  
Access date for all sources: July 16, 2026  
Selected product wedge: a read-only treasury risk control room for protocol foundations and crypto-native companies.

## Executive decision

The highest quality opportunity is not another broad portfolio tracker or market chart wall. The defensible wedge is treasury risk operations for teams that already hold meaningful on-chain assets, stablecoins, and custody accounts, and need a daily decision loop: "What requires owner approval today, what evidence supports it, and what action reduces treasury risk without pretending the product controls funds?"

Primary user: head of treasury, finance lead, or operations lead at a protocol foundation, DAO-adjacent legal entity, market maker treasury, or crypto-native company.

Why this wedge:

- Institutional crypto participation is moving from access to operating discipline: liquidity, position sizing, custody, governance, and risk controls.
- Existing products split the job across custody consoles, Safe, on-chain data warehouses, market APIs, accounting tools, and compliance products.
- Stablecoins and tokenized cash are operational assets, but they carry issuer, peg, redemption, venue, sanctions, and data-latency risk.
- Buyers have budget when the product helps board reporting, signer approvals, audit readiness, and loss prevention.

## Source ledger

| Source | URL | Finding | Decision changed |
|---|---|---|---|
| Coinbase and EY-Parthenon, "2026 Institutional Investor Digital Assets Survey" | https://www.coinbase.com/institutional/research-insights/research/insights-reports/2026-institutional-investor-survey-e-and-y | Surveyed 351 institutional decision makers. It emphasizes stronger governance, risk management, liquidity, position sizing, custody security, stablecoin usage, and regulated access. | Selected an institutional/protocol treasury risk product instead of a retail portfolio app. |
| Coinbase Developer Documentation, "Prime Overview" | https://docs.cdp.coinbase.com/prime/concepts/overview | Prime APIs cover institutional trading, custody, staking, balances, transactions, stablecoins, and monitoring/reporting. | Treated custody/prime systems as upstream systems of record; avoided pretending the demo executes trades or custody moves. |
| Fireblocks Developer Docs, "Key Features and Capabilities" | https://developers.fireblocks.com/docs/capabilities | Fireblocks models policy rules, RBAC, MPC wallets, admin quorum, Travel Rule, approvals, and transaction controls. | Made policy exceptions and approval runbooks central to the workflow. |
| Fireblocks Developer Docs, "Set Policies" | https://developers.fireblocks.com/docs/set-transaction-authorization-policy | Transaction authorization policies can allow, block, or require additional approval based on source, destination, asset, amount, and action. | Required the product to show why a recommendation maps to a policy condition. |
| Safe Docs, "How do Safe Smart Accounts work?" | https://docs.safe.global/advanced/smart-account-overview | Safe accounts use multi-signature thresholds; modules and guards are security critical. | Included signer readiness, guard/module provenance, and "do not sign from dashboard" trust semantics. |
| Dune Docs, "Token Transfers" | https://docs.dune.com/data-catalog/curated/token-transfers/evm/token-transfers | Curated transfers provide cross-chain movement, but transfer events can include mints, burns, flash loans, and misleading activity; USD values depend on external pricing. | Product shows provenance and caveats instead of treating raw transfers as unqualified signal. |
| Dune, "Data Catalog" | https://docs.dune.com/data-catalog/overview | Dune organizes raw, decoded, and curated datasets across chains, including labels, balances, prices, stablecoins, CEX flows, bridges, lending, staking, and gas. | Entity model includes data lineage and source class, not just balances. |
| DefiLlama, "Downloads" | https://defillama.com/downloads | Datasets include protocol treasuries, stablecoins, yields, hacks, token unlocks, CEX transparency, bridges, fees, and revenue. | Added protocol, security, bridge, treasury, and CEX exposure as data domains. |
| CoinGecko API, "Endpoint Overview" | https://docs.coingecko.com/reference/endpoint-overview | Market data endpoints include prices, coins, tickers across CEX/DEX, OHLC, markets, on-chain pools, and public treasury. | Used market pricing as a reference layer with freshness and confidence labels. |
| Coin Metrics, "API Conventions" | https://docs.coinmetrics.io/access-our-data/api | API conventions emphasize catalog, time-series, UTC timestamps, pagination, rate limits, and null semantics. | Product requires UTC timestamps, source freshness, empty states, and unknown/null handling. |
| Chainalysis, "2026 Crypto Crime Report Introduction" | https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/ | 2025 illicit activity and sanctions evasion rose materially; stablecoins dominate illicit transaction volume by value in their report. | Added sanctions/KYT as a risk dimension and required "risk-based controls" language. |
| Congress.gov, "S.1582 - GENIUS Act" | https://www.congress.gov/bill/119th-congress/senate-bill/1582 | Became Public Law 119-27 on July 18, 2025. Permitted issuers must maintain one-to-one reserves, disclose redemption policy and reserves monthly, and are subject to BSA for AML purposes. | Stablecoin rows include reserve/disclosure/compliance provenance rather than treating all $1 tokens equally. |
| Federal Reserve, "Stablecoins in 2025: Developments and Financial Stability Implications" | https://www.federalreserve.gov/econres/notes/feds-notes/stablecoins-in-2025-developments-and-financial-stability-implications-20260408.html | Stablecoin market cap grew by more than 50% since early 2025, with risks from complex intermediation chains, vertical integration, and wallet partnerships. | Added counterparty dependency and issuer concentration views. |
| BIS Bulletin No. 108, "Stablecoin growth - policy challenges and approaches" | https://www.bis.org/publ/bisbull108.htm | Stablecoins' links with traditional finance are growing; tailored regulation is needed because "same risks, same regulation" has limits. | Dashboard treats stablecoins as risk-bearing operational assets with peg, redemption, and linkage semantics. |
| Financial Stability Board, "High-level Recommendations for Global Stablecoin Arrangements" | https://www.fsb.org/2023/07/high-level-recommendations-for-the-regulation-supervision-and-oversight-of-global-stablecoin-arrangements-final-report/ | Recommends risk management, data reporting, disclosures, redemption rights, prudential requirements, recovery, and resolution for stablecoin arrangements. | Product requirements include disclosure, redemption, source access, and recovery-plan evidence fields. |
| OFAC FAQ 1021, virtual currency sanctions | https://ofac.treasury.gov/faqs/1021 | OFAC sanctions obligations apply regardless of whether a transaction is denominated in fiat or virtual currency; firms should use risk-based steps. | Added compliance alerts and prohibited the product from presenting risky flows as merely financial optimization. |
| FinCEN, "Application of FinCEN's Regulations to Persons Administering, Exchanging, or Using Virtual Currencies" | https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering | Administrators and exchangers that accept and transmit convertible virtual currency can be money transmitters under BSA rules; mere users are distinct. | Product scope is read-only decision support, not custody, transmission, or exchange execution. |
| SEC, "SEC Clarifies the Application of Federal Securities Laws to Crypto Assets" | https://www.sec.gov/newsroom/press-releases/2026-30-sec-clarifies-application-federal-securities-laws-crypto-assets | SEC/CFTC interpretation provides taxonomy for digital commodities, collectibles, tools, stablecoins, and digital securities. | Entity model includes token classification and jurisdictional assumptions; demo avoids investment recommendations. |
| Zerion, "Crypto Wallet for Solana, Ethereum, DeFi" | https://zerion.io/ | Consumer wallet conventions emphasize cross-chain portfolio tracking, DeFi positions, swaps, bridges, and wallet activity. | Rejected retail wallet super-app scope; borrowed layered portfolio clarity but removed transaction signing. |
| rotki, "What is rotki?" | https://docs.rotki.com/ | Privacy-first, self-hosted portfolio/accounting product that tracks exchanges, blockchains, PnL, and tax reporting. | Differentiated away from tax/accounting and toward team policy workflows. |

## User and buyer segments

Crypto dashboard buyers and users segment into:

- Retail holders and power users: need portfolio, tax, DeFi tracking, token discovery, swaps, and security warnings. They use products like wallet apps, portfolio trackers, and tax tools.
- Active traders and funds: need execution, market depth, order routing, exposure, leverage, liquidation, basis, and risk. They use prime brokerage, OMS/EMS, market data, and risk engines.
- Protocol teams and foundations: need runway, grants/liabilities, token vesting, stablecoin operations, custody policy, signer approvals, treasury reporting, and governance evidence.
- Stablecoin/payment operators: need reserve, redemption, issuer, sanctions, settlement, wallet, and liquidity monitoring.
- Compliance/investigations teams: need address attribution, sanctions screening, KYT, entity graphs, and audit trails.
- Controllers/tax/accounting teams: need cost basis, realized/unrealized PnL, entity books, exchange imports, and audit exports.

The selected buyer is the protocol/foundation treasury operator because the job is recurring, high stakes, cross-functional, and underserved by a single focused product. The buying trigger is a board/audit request, a depeg/venue scare, a governance signer incident, or growth from informal spreadsheet treasury to multi-entity operations.

## Category conventions and gaps

Representative category patterns:

- Wallet/portfolio products: unified balances, DeFi positions, transactions, NFTs, swaps, bridge routes, and wallet security education.
- Prime/custody products: balances, custody accounts, trading, staking, stablecoin settlement, activity reporting, permissions, and policy approvals.
- On-chain analytics: flexible SQL, curated tables, dashboards, labels, flows, wallet activity, CEX flows, lending, bridges, prices, and transfers.
- Compliance/KYT: sanctions, illicit exposure, entity attribution, alerts, case management.
- Accounting/tax: cost basis, PnL, transactions, exchange imports, entity reporting, tax exports.

Gap: finance leads have to reconcile "what should we do today?" across these systems. The most valuable dashboard is a decision queue with provenance, policy thresholds, and an approval packet, not a universal charting canvas.

## Data model implications

Core entities:

- Legal entity: operating company, foundation, DAO service entity, grants entity.
- Account/wallet: Safe, Fireblocks vault, Prime portfolio, exchange subaccount, hot wallet, protocol position.
- Asset: token, stablecoin, native asset, wrapped asset, RWA/tokenized fund, claim, LP token.
- Price observation: asset, source, timestamp, venue class, bid/ask or reference price, confidence, null semantics.
- Balance observation: account, asset, amount, USD value, block/time, source, confidence, reconciliation status.
- Transfer/event: chain, tx hash, log index, from/to, label, token, amount, USD value, classification, caveat.
- Counterparty/dependency: issuer, custodian, venue, protocol, bridge, oracle, bank partner, fund administrator.
- Policy: threshold, scope, unit, action, evidence required, owner group, severity.
- Alert: breach, source facts, affected entities, policy, recommended decision, runbook status.
- Runbook: steps, estimated size, source/destination, signer group, expected risk reduction, note, approval state.

Freshness assumptions:

- Market prices: 5 to 15 minute target for decision support; stale labels after 20 minutes.
- On-chain warehouse data: 15 to 60 minute latency depending on chain and pipeline; finality and decoding caveats shown.
- Custody/prime balances: API or CSV import at least hourly during business-critical windows.
- Manual reserve/NAV evidence: same-day or daily import with reviewer name and timestamp.

## Risk, uncertainty, and trust semantics

The UI must show:

- Demo/live status: all seeded demo data is explicitly labeled; no wallet is connected.
- Provenance: every high-risk recommendation links to source rows and caveats.
- Freshness: UTC timestamps, stale states, and missing-source states.
- Unit clarity: USD values, token amounts, percentages, basis points, months runway, and price floors.
- Risk separation: market price, liquidity depth, issuer concentration, custody/venue concentration, protocol exposure, signer readiness, sanctions/KYT status, and data uncertainty are separate risk dimensions.
- No false control: the product can prepare a runbook but must not imply it signs, transfers, trades, blocks, freezes, or custodies assets.

## Visualization findings

Effective crypto-finance visuals for this wedge:

- Priority queue for exceptions instead of an undifferentiated dashboard.
- Runway bands in months under base and stress assumptions.
- Peg band line chart with policy floor references for stablecoins.
- Counterparty limit bars showing current share against policy cap.
- Asset and wallet tables with source, freshness, and status.
- Evidence panel with affected entities and row-level assumptions.
- Empty state that explains which import or policy mapping is missing.

Avoid:

- Unlabeled price tickers.
- Overprecise live-feeling prices.
- Raw transfer volume without caveats.
- "AI score" without evidence.
- Green/red returns as the primary frame for treasury decisions.

## Positioning, monetization, and GTM

Positioning: "Approval-ready crypto treasury risk control for protocol finance teams."

Differentiated promise: turn fragmented custody, wallet, market, stablecoin, and on-chain data into a daily policy queue with evidence and signer-ready runbooks.

Packaging hypothesis:

- Starter: $1,500/month for up to 5 wallets, CSV imports, seeded policy templates, and board report export.
- Growth: $4,000/month for 25 wallets/accounts, Safe/Fireblocks/Prime read-only integrations, custom policies, and audit evidence.
- Enterprise: $10,000+/month for multi-entity controls, SSO, compliance/KYT integration, data warehouse sync, approval workflow, and SLA.

GTM:

- Start with protocol foundations, market makers, DeFi treasuries, and crypto-native finance teams.
- Acquire via treasury post-mortems, depeg response templates, board-report templates, Safe/Fireblocks ecosystems, accounting partners, and DAO operations communities.
- Land with read-only reporting, expand into policy automation, compliance evidence, and audit exports.

## Decision tradeoffs

Rejected:

- Retail portfolio intelligence: crowded, lower willingness to pay, too broad.
- Pure trading terminal: requires live execution, backend, and regulated venue integrations outside the demo scope.
- Tax/accounting suite: important but not the sharpest frontend/product differentiation for this benchmark.
- Generic on-chain analytics: powerful but already served by flexible query and dashboard products.

Chosen:

- Treasury risk control room, because it combines current market need, clear buyer, recurring workflow, rigorous risk communication, and a feasible high-fidelity demo without live connections.
