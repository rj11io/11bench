# Research: Treasury Risk Cockpit for Crypto Finance Teams

## Product wedge

Selected wedge: **crypto treasury and wallet-risk operations for finance-heavy teams**.

Primary user: **CFO / treasury operator at a crypto-native company or a crypto-forward fintech** that holds a mix of stablecoins, ETH, and operational tokens across multiple wallets and chains.

Why this wedge:

- It has a clear recurring decision loop: fund runway, rebalance treasury, approve transfers, review counterparty risk, and explain exceptions to auditors/compliance.
- It needs more than prices and charts. The workflow depends on balances, exposure by wallet, policy approvals, provenance, sanctions/risk flags, and latency/freshness.
- Existing enterprise products emphasize custody, policy, and screening, which validates the category and gives a defensible product shape.

## Sources

### 1) FinCEN virtual currency guidance
- Title: Application of FinCEN’s Regulations to Persons Administering, Exchanging, or Using Virtual Currencies
- URL: https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering
- Access date: 2026-07-16
- Findings:
  - FinCEN treats some virtual-currency activity as money transmission when a business accepts and transmits value for others.
  - The guidance reinforces that crypto operations must think in terms of regulatory activity, not asset branding.
- Decision impact:
  - The product needs explicit compliance and risk language, not just portfolio analytics.

### 2) FinCEN travel rule / unhosted-wallet discussion
- Title: FinCEN Extends Comment Period for Rule Aimed at Closing Anti-Money Laundering Regulatory Gaps for Certain Convertible Virtual Currency and Digital Asset Transactions
- URL: https://www.fincen.gov/news/news-releases/fincen-extends-comment-period-rule-aimed-closing-anti-money-laundering
- Access date: 2026-07-16
- Findings:
  - FinCEN has publicly focused on recordkeeping and identity verification for transactions involving unhosted wallets.
  - This is a recurring compliance concern for operational treasury flows.
- Decision impact:
  - The dashboard should surface wallet type, counterparty, and exception handling for transfer review.

### 3) FinCEN special measures
- Title: Special Measures
- URL: https://www.fincen.gov/resources/statutes-and-regulations/special-measures
- Access date: 2026-07-16
- Findings:
  - FinCEN’s special-measures list includes crypto-relevant designations, including “Convertible Virtual Currency Mixing.”
  - Screening needs to be time-aware because risk status changes over time.
- Decision impact:
  - The UX must show pre-/post-designation exposure and time-bounded risk history, not just a static risk label.

### 4) Chainalysis wallet screening overview
- Title: What Is Wallet Screening? How It Works & Crypto Compliance
- URL: https://www.chainalysis.com/glossary/wallet-screening/
- Access date: 2026-07-16
- Findings:
  - Wallet screening is the on-chain counterpart to name screening.
  - It is used pre-transaction and for ongoing monitoring.
  - Common risk types include sanctions, mixers, darknet markets, scams, stolen funds, and terrorism financing.
- Decision impact:
  - The product’s main workflow should center on pre-transfer decisioning and ongoing monitoring, not passive portfolio display.

### 5) Fireblocks governance and policy engine
- Title: Governance and policy control for digital asset operations
- URL: https://www.fireblocks.com/platforms/governance-and-policies
- Access date: 2026-07-16
- Findings:
  - Policy engines enforce approval workflows, roles, transaction limits, and audit trails.
  - Teams want to see pending approvals, rule evaluation, and exceptions.
- Decision impact:
  - The demo should include policy status, approval queues, and explainability for allow/block/escalate outcomes.

### 6) Fireblocks leading practices
- Title: Digital Asset Custody and Transaction Processing Leading Practices Using Fireblocks’ MPC solution
- URL: https://www.fireblocks.com/report/digital-asset-custody-and-transaction-processing-leading-practices-using-fireblocks-mpc-solution
- Access date: 2026-07-16
- Findings:
  - Governance revolves around user roles, whitelisted addresses, approval thresholds, and clear processes before signing.
  - Teams often configure multiple rules and approvals, especially in traditional-finance settings.
- Decision impact:
  - The PRD should assume transaction controls are first-class product objects, not hidden backend details.

### 7) Ledger custodial vs non-custodial wallet guidance
- Title: What Are Custodial and Non-Custodial Wallets?
- URL: https://www.ledger.com/academy/topics/security/custodial-vs-non-custodial-wallets
- Access date: 2026-07-16
- Findings:
  - Custody model affects who controls keys, recovery, privacy, and operational responsibility.
  - Hardware signers and secure screens exist because the signing environment itself is a trust boundary.
- Decision impact:
  - The UI should disclose custody model, signer coverage, and verification status rather than implying blanket “wallet connected” trust.

### 8) Ledger Enterprise documentation
- Title: Welcome | Ledger Enterprise
- URL: https://help.enterprise.ledger.com/
- Access date: 2026-07-16
- Findings:
  - Enterprise custody products are aimed at admins, operators, and developers.
  - The category expects automation, collateral management, and security-heavy workflows.
- Decision impact:
  - The product should read as an operator console, not a consumer portfolio app.

### 9) Nansen address labels API
- Title: Address Labels | Nansen API
- URL: https://docs.nansen.ai/api/profiler/address-labels
- Access date: 2026-07-16
- Findings:
  - On-chain analytics products use labels such as ENS, behavioral labels, DeFi labels, and CEX labels.
  - Address enrichment is a normal part of the category.
- Decision impact:
  - The data model should include labels, counterparties, and multi-chain wallet identity enrichment.

### 10) Nansen portfolio and DeFi holdings docs
- Title: Portfolio | Nansen API
- URL: https://docs.nansen.ai/api/portfolio
- Access date: 2026-07-16
- Findings:
  - DeFi holdings data is structured by protocol and position type: deposits, borrows, stakings, positions, locked, rewards, farms.
  - Portfolio analytics can be decomposed by protocol exposure and asset type.
- Decision impact:
  - The treasury cockpit should model exposure by wallet, protocol, and liquidity bucket rather than only by token.

### 11) Nansen pricing and endpoint economics
- Title: Credits & Pricing Guide | Nansen API
- URL: https://docs.nansen.ai/about/credits-and-pricing-guide
- Access date: 2026-07-16
- Findings:
  - Labeled or proprietary endpoints are more expensive than foundational balance/transaction data.
  - This reflects a market pattern: raw data is cheap, enriched intelligence is premium.
- Decision impact:
  - Monetization should be usage-linked to monitored wallets, alerts, and compliance/risk modules rather than flat “dashboard seats only”.

### 12) Moralis wallet API
- Title: Wallet API
- URL: https://docs.moralis.com/data-api/evm/wallet/overview
- Access date: 2026-07-16
- Findings:
  - A single wallet view typically includes holdings, history, DeFi positions, PnL, identity, and approvals.
- Decision impact:
  - The product should combine balance, history, approvals, and risk in one workflow panel.

### 13) Moralis token balance and wallet history docs
- Title: Make Your First Request; Wallet History
- URLs:
  - https://docs.moralis.com/data-api/first-request
  - https://docs.moralis.com/data-api/evm/wallet/wallet-history
- Access date: 2026-07-16
- Findings:
  - Current token balance responses include prices, USD values, and metadata.
  - Wallet history returns decoded activity and structured transaction summaries.
- Decision impact:
  - The UI can show seeded “decoded transfer” rows and normalized USD values without pretending they are live.

### 14) CoinGecko market chart documentation
- Title: Coin Historical Chart Data within Time Range by ID
- URL: https://docs.coingecko.com/reference/coins-id-market-chart-range
- Access date: 2026-07-16
- Findings:
  - Historical market data is represented as timestamp/value series for price, market cap, and volume.
  - The API explicitly frames these series as suitable for reporting and consistent time-bucketed analysis.
- Decision impact:
  - The demo should use time-series cards for runway, treasury composition, and volatility rather than generic line charts with no semantic label.

### 15) IRS digital assets guidance
- Title: Digital assets
- URL: https://www.irs.gov/filing/digital-assets
- Access date: 2026-07-16
- Findings:
  - For U.S. tax purposes, digital assets are treated as property.
  - Stablecoins, NFTs, and crypto all fall within reporting and recordkeeping expectations.
- Decision impact:
  - The product should preserve event history and basis/lot-related assumptions in its activity model, even if the demo does not compute taxes.

### 16) SEC SAB 121 and SAB 122
- Titles:
  - Staff Accounting Bulletin No. 121
  - Staff Accounting Bulletin No. 122
- URLs:
  - https://www.sec.gov/rules-regulations/staff-guidance/staff-accounting-bulletins/staff-accounting-bulletin-121
  - https://www.sec.gov/rules-regulations/staff-guidance/staff-accounting-bulletins/staff-accounting-bulletin-122
- Access date: 2026-07-16
- Findings:
  - SEC guidance highlights safeguarding obligations, concentration risk, and disclosures around who holds keys and who bears the liability.
- Decision impact:
  - The product should make key ownership, custody status, and safeguard responsibilities visible in the wallet header.

## What the research changed

1. **Rejected a generic market dashboard**
   - The market already has many products for token discovery and price monitoring.
   - The selected wedge now focuses on a concrete operational loop: treasury movement with policy and compliance review.

2. **Elevated compliance and custody into core UX**
   - The research showed screening, policy, and custody are not edge cases; they are the product.
   - The dashboard now needs to explain why a transfer is safe, not just whether a token is up or down.

3. **Added time-aware risk semantics**
   - Because sanctions and other risk states change over time, the dashboard must show when a risk score changed and why.

4. **Shifted the data model from “portfolio” to “decision ledger”**
   - The right entities are wallets, assets, approvals, counterparties, policy rules, and exceptions.
   - Prices matter, but only as one dimension of treasury decisions.

## Category conventions observed

- Enterprise crypto ops tools expose:
  - wallet inventory,
  - balances by chain and asset,
  - approval queues,
  - risk or screening status,
  - audit trail / exportability,
  - and coverage/freshness disclaimers.
- Best-in-class products avoid implying that blockchain reads are perfectly live or universally complete.
- Risk is usually framed as:
  - address risk,
  - counterparty risk,
  - policy risk,
  - and operational risk.

## Data model implications

The demo should model these objects:

- `Wallet`
  - label, chain coverage, custody type, signer coverage, risk tier, balances, freshness.
- `Asset`
  - symbol, chain, quantity, USD value, volatility, liquidity class, concentration share.
- `PolicyRule`
  - threshold, allowed destinations, required approvers, escalation outcome.
- `TransferRequest`
  - amount, destination, wallet, reason, status, screening result, approval state.
- `Counterparty`
  - entity label, risk tags, recent exposure, provenance notes, first seen, last seen.
- `Alert`
  - policy breach, sanction screen, stale pricing, abnormal outflow, missing documentation.

## Visualization implications

- For treasury exposure: stacked allocation and concentration bars are better than a single total-value line.
- For volatility and runway: dual-axis or indexed time series is useful if labeled carefully.
- For risk and compliance: a queue of decision cards plus status chips works better than a dense heatmap.
- For provenance: every metric should carry a freshness timestamp and source badge.

## Positioning and GTM implications

- Buyer: CFO, treasury manager, and compliance operator at a crypto-native business.
- Trigger: new wallet rollout, exchange / custodian change, audit prep, or a suspicious transfer event.
- Packaging pattern:
  - base monitoring,
  - policy and approvals,
  - compliance/risk add-on,
  - enterprise audit and export layer.
- Acquisition:
  - product-led trial for one monitored treasury,
  - then sales-assisted expansion to additional wallets, teams, and approvals.

