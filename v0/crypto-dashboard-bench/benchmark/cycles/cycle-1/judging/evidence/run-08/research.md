# StableOps Research

Access date for all sources: July 16, 2026.

## Selected wedge

StableOps is a stablecoin treasury operations dashboard for finance teams that already have cross-border payable volume and are deciding whether, when, and on which rail to settle stablecoin payments. I chose this over a generic market dashboard because the recurring job is clearer: approve today's settlement batch while balancing speed, liquidity, issuer risk, counterparty policy, compliance exceptions, and reconciliation evidence.

## Sources, findings, and decisions changed

1. Chainalysis, "The 2025 Global Crypto Adoption Index"  
   URL: https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/  
   Finding: Chainalysis added an institutional activity lens and describes stablecoins as central to cross-border payments and institutional activity. It also emphasizes methodology limits around tracked venues.  
   Decision changed: The product targets operational finance teams rather than retail traders, and the UI labels provenance and coverage limits instead of presenting a universal truth.

2. Chainalysis, "From ETFs to Treasuries: How The U.S. Is Shaping Digital Finance"  
   URL: https://www.chainalysis.com/blog/north-america-crypto-adoption-2025/  
   Finding: North America has investment-led volatility, while stablecoin transfers reached records during the period Chainalysis studied.  
   Decision changed: Add a volatile-market scenario and separate stablecoin operating exposure from speculative portfolio analytics.

3. Fireblocks, "State of Stablecoins 2025"  
   URL: https://www.fireblocks.com/report/state-of-stablecoins  
   Finding: The survey positions stablecoins as payments, treasury, liquidity, and cross-border infrastructure for banks, fintechs, and payment providers.  
   Decision changed: The PRD centers on settlement readiness and treasury controls, not asset discovery.

4. Fireblocks, "Stablecoins in Treasury: Why CFOs Should Care"  
   URL: https://www.fireblocks.com/blog/stablecoins-treasury-why-cfos-should-care-2025  
   Finding: CFO value propositions include faster movement, faster reconciliation, visibility into capital flows, and cross-border billing without some local banking complexity.  
   Decision changed: The core workflow is "prepare approval packet" with reconciliation context, not "send crypto."

5. Coinbase, "The State of Crypto: The Future of Money Is Here"  
   URL: https://www.coinbase.com/blog/the-state-of-crypto-the-future-of-money-is-here  
   Finding: Coinbase frames 2025 stablecoin adoption around Fortune 500 and SMB business interest.  
   Decision changed: Primary user is a mid-market finance lead with SMB-like operating constraints but enough volume to justify software.

6. Circle, "Transparency & stability"  
   URL: https://www.circle.com/transparency  
   Finding: Circle publishes reserve composition, mint/burn flows, and monthly assurance reports; it stresses 1:1 redeemability and reserve segregation.  
   Decision changed: The UI includes issuer and reserve provenance language and treats issuer quality as a first-class rail attribute.

7. Circle Developers, "What is USDC?"  
   URL: https://developers.circle.com/stablecoins/what-is-usdc  
   Finding: USDC exists across multiple chains, is backed by cash and cash-equivalent assets, and CCTP supports movement across networks.  
   Decision changed: The entity model separates stablecoin, issuer, and chain; "USDC on Base" and "USDC on Ethereum" are different route options.

8. European Banking Authority, "Asset-referenced and e-money tokens (MiCA)"  
   URL: https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica  
   Finding: EU ART and EMT issuers require authorization and are subject to reserve, liquidity, conflict, and stress-testing technical standards.  
   Decision changed: EUR rails and EU counterparties get explicit policy review states instead of being treated like USD stablecoin flows.

9. Congress.gov, "S.1582 - GENIUS Act"  
   URL: https://www.congress.gov/bill/119th-congress/senate-bill/1582  
   Finding: The bill framework requires permitted payment stablecoin issuers, one-to-one reserves, reserve disclosures, redemption policy, and BSA/AML obligations.  
   Decision changed: PRD requirements include AML/sanctions screening, permissioning, reserve disclosures, and no marketing of the product as yield or investment advice.

10. TRM Labs, "TRM's New Crypto Crime Report Shows Illicit Flows Hit a Record USD 158B in 2025"  
    URL: https://www.trmlabs.com/resources/blog/trms-new-crypto-crime-report-shows-illicit-flows-hit-a-record-usd-158b-in-2025  
    Finding: TRM reports illicit flows as a minority share of attributed activity but warns that absolute illicit volumes and liquidity-relative risk matter.  
    Decision changed: Risk communication uses absolute blocked events and approval holds, not just low percentages.

11. DeFiLlama documentation, "stablecoins: Data from DeFiLlama's stablecoins dashboard"  
    URL: https://defillama-curl.readthedocs.io/en/latest/defillama.html  
    Finding: Stablecoin data can include chain circulating supply, historical market cap, stablecoin prices, peg type, peg mechanism, and price source.  
    Decision changed: Data model includes chain, issuer, peg deviation, spread, route capacity, freshness, and provenance.

12. DeFiLlama, "Downloads"  
    URL: https://defillama.com/downloads  
    Finding: Stablecoin and stablecoin-by-chain datasets are conventional category primitives, alongside RWA, TVL, yields, bridges, CEX, and security datasets.  
    Decision changed: The demo chart compares route capacity and exposure; it avoids unsupported claims about live wallet balances.

## Segments and recurring decisions

- CFO / controller at a cross-border SaaS, marketplace, importer, or services company: decide whether stablecoin settlement is cheaper and faster than bank wires while preserving controls.
- Treasury operations manager: maintain liquidity across issuers, chains, exchanges, custodians, and bank accounts.
- Compliance analyst: resolve wallet ownership, sanctions, travel-rule, and counterparty policy exceptions.
- Protocol or crypto-native finance team: manage stablecoin runway, vendor payouts, and multisig approval packets.

The strongest buyer trigger is recurring cross-border payment pain: slow wires, unclear fees, local banking friction, or counterparties asking for stablecoins. The strongest retention loop is the daily or weekly settlement close.

## Category conventions

Representative adjacent products include Fireblocks for custody and payments operations, Circle for USDC infrastructure, Chainalysis/TRM for blockchain intelligence and compliance, DeFiLlama for open market datasets, Dune/Nansen for on-chain analytics, and enterprise treasury tools for approval controls. Category conventions include freshness timestamps, source labels, chain/entity separation, risk severity badges, audit trails, and clear warnings when data is incomplete.

## Data model implications

Core entities: organization, treasury account, stablecoin, issuer, chain, wallet, counterparty, invoice, settlement rail, batch, policy rule, compliance alert, quote, transaction, reconciliation record, and evidence artifact. Key calculated fields: available balance, 24h route capacity, peg deviation in basis points, spread in basis points, network fee, settlement ETA, exposure by issuer, exposure by chain, exception count, and liquidity after batch.

## Risk, trust, and uncertainty

Crypto dashboards must communicate:

- Volatility: spread and peg deviation can move before approval.
- Liquidity: capacity differs by issuer, chain, venue, and counterparty region.
- Provenance: on-chain data, issuer attestations, compliance vendors, custody ledgers, and internal ERP data have different freshness and coverage.
- Latency: "last updated" is required on prices, balances, screening, and bank ledger data.
- Regulatory status: stablecoin issuer status, MiCA/GENIUS-style reserve and authorization requirements, AML/sanctions obligations, and local licensing constraints should alter workflow state.

## GTM patterns

The most defensible launch motion is finance-led, not crypto-native hype: "close cross-border payables with stablecoin controls your auditor can understand." Initial ICP is mid-market companies with monthly international payable volume above $500k and counterparties already requesting USDC/USDT. Acquisition channels: CFO communities, payment provider partnerships, custodian marketplaces, stablecoin issuer ecosystems, and compliance vendor integrations. Packaging should start with a paid operations tier priced by monthly settlement volume plus seats, with enterprise add-ons for policy engine, ERP integration, SSO, and custom compliance workflows.
