# Research

## Selected wedge

**ReserveScope**: a treasury and liquidity risk cockpit for stablecoin-heavy crypto teams.

The core decision loop is not "what is my portfolio worth?" It is:

1. what is liquid now versus delayed or restricted;
2. how long runway lasts under current burn and under stress;
3. which wallets, counterparties, or chains are out of policy;
4. what move should treasury make next.

That wedge is narrower than a universal crypto dashboard, but it is defensible because current enterprise crypto products cluster around custody, policy, and payment operations, while analytics products cluster around labels, wallets, and onchain data. The gap is a policy-aware layer that converts those inputs into treasury decisions.

## What changed my decision

- Generic portfolio tracking is crowded and largely consumer-led, while enterprise products emphasize governance, policy, and custody. I narrowed to treasury risk rather than a broad investor dashboard.
- Stablecoins now sit at a real operational scale, so the best wedge is the money-movement and runway problem, not a speculative price wall.
- Compliance and sanctions controls are not optional for a treasury workflow. The product must surface provenance, screening, and audit semantics directly in the UI.
- Dashboard conventions in crypto already favor wallet aggregation, chain breakdowns, watchlists, and stablecoin supply views. The design should use those conventions, but answer a more operational question.

## Source log

### 1) Treasury management and policy are the enterprise crypto center of gravity

- **Title:** Treasury Management | Fireblocks
- **URL:** https://www.fireblocks.com/products/treasury-management
- **Accessed:** 2026-07-16
- **Findings:** Fireblocks positions treasury around transaction limits, approval workflows, permissions, liquidity access, stablecoin payments, DeFi, staking, and automation. The page is explicitly about secure treasury operations, not consumer portfolio display.
- **Decision changed:** The product needs policy controls and operational workflows, not just charts.

### 2) Digital asset treasury is explicitly a liquidity/risk discipline

- **Title:** Treasury Management | Glossary | Fireblocks
- **URL:** https://www.fireblocks.com/glossary/treasury-management
- **Accessed:** 2026-07-16
- **Findings:** Fireblocks frames digital asset treasury as the crypto analog of cash, liquidity, risk, and asset management. The glossary makes the shift from bank accounts to wallets and onchain settlement explicit.
- **Decision changed:** I centered the product on runway, liquidity readiness, and risk posture.

### 3) Governance and approvals are first-class in institutional crypto

- **Title:** Governance and policy control for digital asset operations | Fireblocks
- **URL:** https://www.fireblocks.com/platforms/governance-and-policies
- **Accessed:** 2026-07-16
- **Findings:** Fireblocks emphasizes transaction policies, multi-party approval, role-based permissions, and automation. It also frames many attacks as misconfiguration problems.
- **Decision changed:** The UI must show policy health, approval state, and exception handling prominently.

### 4) Wallet security patterns are about signers, recovery, and address books

- **Title:** How to secure your Onchain Wallet | Coinbase Help
- **URL:** https://help.coinbase.com/en/prime/onchain-wallet/how-to-secure-your-onchain-wallet
- **Accessed:** 2026-07-16
- **Findings:** Coinbase Prime discusses MPC, signer redundancy, consensus, customizable transaction policies, and onchain address books. The security story is about avoiding single points of failure and limiting transfer destinations.
- **Decision changed:** The dashboard needs wallet provenance, allowlist status, and signer/policy semantics, not just balances.

### 5) Institutional wallets are segmented by purpose

- **Title:** Wallets Overview - Coinbase Developer Documentation
- **URL:** https://docs.cdp.coinbase.com/prime/concepts/wallets/wallets-overview
- **Accessed:** 2026-07-16
- **Findings:** Coinbase Prime separates trading balance wallets, custody wallets, and vault wallets. That segmentation is useful for operational clarity and risk control.
- **Decision changed:** I modeled wallets by role and liquidity bucket instead of flattening them into a single holdings list.

### 6) Self-custody products compete on quorum, simulation, and no blind signing

- **Title:** Porto | Self-custody wallet for institutions | Anchorage Digital
- **URL:** https://www.anchorage.com/platform/self-custody
- **Accessed:** 2026-07-16
- **Findings:** Anchorage highlights quorum approvals, allowlisting, transaction clarity, and smart contract risk simulation. That is the trust pattern institutions expect when moving funds.
- **Decision changed:** The demo includes explicit simulation and policy-exception views rather than a generic send flow.

### 7) Enterprise use cases are moving through stablecoins, not just spot trading

- **Title:** Circle Payments Network | Global Stablecoin Payments | Circle
- **URL:** https://www.circle.com/cpn
- **Accessed:** 2026-07-16
- **Findings:** Circle positions stablecoins as a settlement rail for banks, payment providers, VASPs, and enterprises. The page calls out treasury, payroll, and supplier payouts as primary use cases.
- **Decision changed:** The product should speak to treasury operations and payouts, not trading-only users.

### 8) Stablecoin scale is already large enough to justify a dedicated treasury surface

- **Title:** USDC | Powering global finance. Issued by Circle.
- **URL:** https://www.circle.com/usdc
- **Accessed:** 2026-07-16
- **Findings:** The page reports USDC circulation at $73.0B as of 2026-07-13 and frames the asset as a fully backed, regulated digital dollar with reserve attestations.
- **Decision changed:** Stablecoin exposure became the core asset class for the dashboard.

### 9) Stablecoins are now a broad market, not a niche token category

- **Title:** Stablecoin Market Cap Chart, Supply & Peg Data - DefiLlama
- **URL:** https://defillama.com/stablecoins
- **Accessed:** 2026-07-16
- **Findings:** DefiLlama reports total stablecoin market cap above $310B and USDT dominance around 59%. The product and category views are chain-aware and include peg and supply deltas.
- **Decision changed:** I added chain and asset-class breakdowns, plus explicit liquidity and peg semantics.

### 10) Onchain activity dashboards distinguish raw volume from adjusted activity

- **Title:** Stablecoins and the future of onchain finance | Visa
- **URL:** https://corporate.visa.com/en/solutions/crypto/stablecoins/stablecoins-and-the-future-of-onchain-finance.html
- **Accessed:** 2026-07-16
- **Findings:** Visa discusses a stablecoin analytics dashboard built with Allium, Artemis, and Castle Island Ventures. It distinguishes raw volume from adjusted transaction volume and notes that addresses are not the same as unique users.
- **Decision changed:** The design uses adjusted metrics, provenance labels, and uncertainty cues instead of pretending every address is a user.

### 11) Wallet labels and watchlists are a standard onchain workflow

- **Title:** Labels & Watchlists 101 - Nansen
- **URL:** https://academy.nansen.ai/en/help/articles/2149924-labels-and-watchlists-101
- **Accessed:** 2026-07-16
- **Findings:** Nansen treats labels and watchlists as a way to organize, name, and monitor wallets across dashboards.
- **Decision changed:** The ledger view now centers labeled wallets and watchlists instead of anonymous addresses.

### 12) Multi-wallet aggregation and transaction history are expected dashboard conventions

- **Title:** Quickstart - Zerion API
- **URL:** https://developers.zerion.io/quickstart
- **Accessed:** 2026-07-16
- **Findings:** Zerion exposes portfolio, fungible positions, DeFi positions, NFT positions, parsed transactions, webhooks, token charts, and gas prices. The API is geared toward aggregating wallets and rendering historical portfolio data.
- **Decision changed:** I included aggregate balances, chain breakdowns, and recent movement history in the demo.

### 13) Crypto analytics platforms are built around queryable, shareable dashboards

- **Title:** Data Hub Overview - Dune Docs
- **URL:** https://docs.dune.com/web-app/overview
- **Accessed:** 2026-07-16
- **Findings:** Dune positions its workspace as a place to query blockchain data, build visualizations, and share dashboards. Its product model reinforces the value of trusted, reproducible data over decorative charts.
- **Decision changed:** The product surfaces provenance, freshness, and calculation notes in every major view.

### 14) Sanctions and blocked asset handling are unavoidable controls

- **Title:** Sanctions List Service | Office of Foreign Assets Control
- **URL:** https://ofac.treasury.gov/sanctions-list-service
- **Accessed:** 2026-07-16
- **Findings:** OFAC offers up-to-date sanctions lists, downloadable datasets, and search tooling. It explicitly supports compliance workflows.
- **Decision changed:** The product shows screening status and blocked-address semantics, even in demo form.

### 15) OFAC explicitly extends sanctions obligations to virtual currency

- **Title:** 1021 | Office of Foreign Assets Control
- **URL:** https://ofac.treasury.gov/faqs/1021
- **Accessed:** 2026-07-16
- **Findings:** OFAC states that sanctions prohibitions extend to virtual currency and that firms must take risk-based steps to avoid prohibited transactions.
- **Decision changed:** Compliance needs to be visible in the dashboard, not hidden in an appendix.

### 16) Travel Rule and payment transparency remain active regulatory concerns

- **Title:** FATF updates Standards on Recommendation 16 on Payment Transparency
- **URL:** https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html
- **Accessed:** 2026-07-16
- **Findings:** FATF updated Recommendation 16 in 2025 and frames the rule around payment transparency, originator and beneficiary information, and cross-border consistency.
- **Decision changed:** The workflow includes beneficiary provenance and transfer readiness, not just balances.

### 17) Virtual asset service providers are expected to implement due diligence and reporting controls

- **Title:** Virtual Assets | FATF
- **URL:** https://www.fatf-gafi.org/en/topics/virtual-assets.html
- **Accessed:** 2026-07-16
- **Findings:** FATF says countries and VASPs need licensing/registration, due diligence, record keeping, suspicious activity reporting, and secure transmission of originator/beneficiary information.
- **Decision changed:** The product must support audit trails and permissions as first-order features.

### 18) Transaction monitoring products expose risk scores and exposure updates

- **Title:** Chainalysis KYT API Reference
- **URL:** https://kytdoc.kyt-dev.e.chainalysis.com/
- **Accessed:** 2026-07-16
- **Findings:** Chainalysis KYT is transaction monitoring with alerts, risk profiles, and exposure updates reflected in both dashboard and API.
- **Decision changed:** I added wallet risk labels, alerting, and a clear open/resolved state model.

### 19) Treasury and stablecoin infrastructure products use enterprise GTM motions

- **Title:** Intercompany Treasury Management with USDC | Circle
- **URL:** https://www.circle.com/case-studies/circle-treasury-management
- **Accessed:** 2026-07-16
- **Findings:** Circle positions treasury modernization as a case-study-led, enterprise sales motion and ties the value prop to faster internal transfers and accounting workflows.
- **Decision changed:** GTM should be direct sales plus content and partner-led distribution, not app-store growth.

