# Research — Helm Treasury

Access date for all sources: July 16, 2026.

## Selected wedge

I evaluated broad crypto dashboard categories against one question: which user has a recurring, high-stakes decision loop that benefits from a trust-heavy, provenance-aware interface without needing a backend for the demo?

The selected wedge is a **stablecoin treasury risk cockpit** for the treasury lead or finance-ops manager at a crypto-native company or stablecoin payment operator. The product focuses on one repeated job:

> “Are we still inside treasury policy, and what must move now if a chain, issuer, venue, or liquidity condition degrades?”

This is narrower and more defensible than a generic portfolio dashboard:

- It has a real buyer with budget authority.
- It forces honest communication around latency, asset provenance, venue dependency, and permissions.
- It supports a demoable workflow using seeded holdings, policy thresholds, and rebalance plans.
- It aligns with current stablecoin payment and treasury infrastructure narratives rather than speculative trading UX.

## Research log

| Topic | Source | Findings | Decision changed |
| --- | --- | --- | --- |
| Crypto demand segments | [Chainalysis, *The 2025 Geography of Crypto Report*](https://www.chainalysis.com/reports/2025-geo-crypto-report/) | Chainalysis highlights distinct demand drivers by region, including remittances, investment/savings, and the growing role of stablecoins in commerce and inflation hedging. It also explicitly calls out retail vs. institutional differences. | Moved away from a retail “all-in-one portfolio” concept toward a business workflow where stablecoins are infrastructure, not just speculative assets. |
| Stablecoin scale and signal quality | [Visa Onchain Analytics Dashboard, Overview](https://www.visaonchainanalytics.com/) and [Transactions](https://www.visaonchainanalytics.com/transactions) | Visa’s public dashboard frames stablecoins as public-blockchain payment infrastructure, not just trading chips. It distinguishes raw from adjusted activity because blockchain data contains noise. It also emphasizes substantial weekend transaction volume, reinforcing 24/7 treasury operations. | Added explicit provenance and “signal vs. noise” behavior to the product. The UI needed to separate operationally useful metrics from noisy raw activity. |
| Stablecoin network shift | [Visa Onchain Analytics Dashboard, Insights](https://visaonchainanalytics.com/insights) | Visa says adjusted stablecoin volume grew 58% and adjusted transactions 35% over the prior 12 months as of August 31. It also notes growing L2 transaction share and smaller transaction sizes on Base, Optimism, and Arbitrum. | Confirmed that the dashboard should treat chain choice as a treasury risk/input variable, not just a cosmetic tag. The product surfaces chain exposure and settlement assumptions explicitly. |
| Treasury buyer validation | [Circle press release: Kyriba & Circle Bring USDC Capabilities to Enterprise Treasury](https://www.circle.com/pressroom/kyriba-and-circle-bring-usdc-capabilities-to-enterprise-treasury-unlocking-a-path-toward-more-intelligent-treasury-decisioning) | Circle and Kyriba position USDC inside familiar treasury workflows around intercompany liquidity, 24/7 liquidity access, and policy-driven decisions. | Strengthened the decision to design for finance teams, not onchain analysts. The product had to feel like treasury software that happens to use crypto rails. |
| Category conventions | [Fireblocks Treasury Management](https://www.fireblocks.com/products/treasury-management) | Fireblocks describes the category around holistic asset visibility, policy controls, approval workflows, user permissions, exchange/DeFi connectivity, and operational risk. | The dashboard needed more than balances. I added venue concentration, policy thresholds, action lists, and control context. |
| Treasury pains | [Fireblocks, *Payments Blueprint: Corporate Treasury Optimization for PSPs and B2B Payment Providers*](https://www.fireblocks.com/report/payments-blueprint-corporate-treasury-psp-b2b) | Fireblocks frames treasury’s core pain as capital moving too slowly, sitting idle too long, and costing too much to manage. | Added liquidity-bucket and weighted-settlement thinking. The demo focuses on operational access to funds, not just nominal balances. |
| Security and governance | [Fireblocks Governance and Policies Engine](https://www.fireblocks.com/platforms/governance-and-policies) and [Set Policies developer docs](https://developers.fireblocks.com/docs/set-transaction-authorization-policy) | Fireblocks argues policy misconfiguration is a major source of attack surface and stresses granular transaction policies, approval workflows, and rule ordering. | The product differentiator became policy-led treasury, not “track everything.” The demo includes editable thresholds, visible breach logic, and recommended moves. |
| AML / compliance workflow | [Fireblocks AML policies overview](https://developers.fireblocks.com/docs/define-aml-policies) | AML tooling returns risk information and alerting, but the treasury operator remains responsible for compliance decisions and reporting. | Avoided pretending the product automates legal responsibility. The dashboard proposes actions and risk states but does not imply autonomous execution or compliance absolution. |
| Wallet trust patterns | [Safe Modules documentation](https://docs.safe.global/advanced/smart-account-modules) | Safe documents daily allowances, recurring modules, and controls that layer restrictions without changing the underlying account’s guarantees. | Added explicit control posture in the UI: quorums, allowlists, and rule-based permissions are first-class product information. |
| Native vs. bridged asset risk | [Circle docs, Supported chains and currencies](https://developers.circle.com/circle-mint/references/supported-chains-and-currencies) and [USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses) | Circle warns not to send unsupported assets such as USDT or bridged USDC to Circle Mint addresses. Circle also publishes native contract references by chain and warns that mainnet tokens have real financial value. | This changed the product wedge materially. A bridged-asset incident became one of the demo’s core scenarios because provenance is a treasury decision, not just a token label. |
| Settlement latency semantics | [Circle Gateway supported blockchains](https://developers.circle.com/gateway/references/supported-blockchains) | Circle lists chain-specific confirmation expectations and average time to attestation. For example, several Ethereum-based environments are shown in a ~13–19 minute band, while some other chains are much faster. | The interface needed units and timing semantics. I added weighted settlement minutes and liquidity buckets instead of ambiguous “available” labels. |
| Stablecoin distribution model | [DefiLlama downloads](https://defillama.com/downloads) | DefiLlama offers stablecoin datasets with circulating supply, price, chain distribution, and stablecoins-by-chain breakdowns. | In the PRD, live data assumptions use a chain-distribution model rather than flat per-asset balances. In the demo, chain placement is called out in the exposure matrix. |
| Market/reference data model | [CoinGecko API endpoint overview](https://docs.coingecko.com/reference/endpoint-overview) | CoinGecko’s reference model is useful for coins, prices, supply, tickers, and historical charts; it is strong for asset metadata but not sufficient alone for custody, provenance, or policy state. | Avoided building a pure market-data dashboard. Coin and stablecoin reference data became support inputs, not the product itself. |
| Regulatory posture | [FATF virtual assets topic page](https://www.fatf-gafi.org/en/topics/virtual-assets.html) and the linked July 9, 2024 targeted update | FATF continues to track implementation of Recommendation 15 and Travel Rule obligations. Global compliance is still a live issue, not a solved feature. | The product includes compliance/risk framing but avoids pretending a dashboard alone “makes the company compliant.” |
| Custody and safeguarding rules | [ESMA MiCA Article 70](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-70-safekeeping-clients-crypto-assets), [Article 75](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-75-providing-custody-and), and [Article 81](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-81-providing-advice-crypto-assets) | MiCA emphasizes safeguarding client rights, segregation of holdings, custody policy, and warnings about fluctuation, full or partial loss, and illiquidity. | Drove the product language around segregation, custody context, and explicit risk labels. The UI avoids softening liquidity and loss risk. |
| Visualization practice | [Datawrapper Academy: What to consider when creating line charts](https://www.datawrapper.de/academy/what-to-consider-when-creating-line-charts) and [Range highlights and reference lines](https://www.datawrapper.de/academy/range-highlights-and-lines) | Line charts should be used for change over time, while comparisons across categories should use bars or tables. Reference lines and ranges should be visually quiet and contextual. | The implementation uses a line chart only for settlement latency over time, while categorical comparisons use stacked bars, cards, and a venue × chain matrix. |

## Synthesis

### User and buyer segments considered

1. **Retail / prosumer portfolio trackers**
   - Strong competition.
   - Easy to devolve into a wall of prices and PnL.
   - Harder to demonstrate differentiated trust communication without live integrations.

2. **Onchain intelligence / whale tracking**
   - Compelling for traders, but the core user is less obviously a budget owner.
   - The demo would skew toward charts and labels, not production treasury controls.

3. **Protocol operations / DAO treasury**
   - Interesting, but procurement and GTM are less standardized.
   - Better as a future expansion than the initial wedge.

4. **Stablecoin treasury and payments operations**
   - Clear buyer.
   - Clear pains: concentration, custody, venue dependency, latency, and policy drift.
   - Strong source support from Circle, Fireblocks, Visa, FATF, and MiCA.

### Why this wedge wins

The best opportunity is not “better crypto prices.” It is **better operational judgment for stablecoin reserves**.

Crypto-native companies and payment operators now face treasury questions that look familiar to finance teams but with extra dimensions:

- native vs. bridged provenance;
- chain-specific latency and confirmation behavior;
- exchange and custody dependence;
- 24/7 liquidity expectations;
- wallet permissions and approval quorums;
- AML / Travel Rule / safeguarding responsibility.

Those are exactly the conditions where a good dashboard can create outsized value because the hard part is not data volume, it is **decision clarity under operational and regulatory uncertainty**.

## Product implications

### Product principles

- **Policy first:** every major view answers whether the treasury is still inside policy.
- **Operational liquidity over nominal balance:** liquidity buckets matter more than a single total.
- **Provenance is product, not metadata:** native, bridged, venue-held, and yield-sleeve assets should never look equivalent.
- **Explicit demo honesty:** the UI must repeatedly say seeded/demo, not live.
- **No fake automation:** recommend, route, and explain; do not imply hidden transaction signing or automatic compliance.

### GTM implications

- Buyer motion is likely founder-led and design-partner heavy at first.
- The initial ICP is not every crypto user; it is treasury-heavy operators already moving stablecoins across multiple wallets and venues.
- The commercial story is operational risk reduction and treasury clarity, not “alpha.”
- Integration partnerships matter: custody, issuer rails, TMS/ERP, compliance, and exchange connectivity.

## Source quality notes

- Fireblocks, Circle, Safe, and CoinGecko sources are partly vendor-authored. I used them primarily for product conventions, data semantics, and buyer narratives, not as independent proof of market size.
- Visa’s dashboard is especially helpful because it exposes methodology and avoids treating all stablecoin activity as equally meaningful.
- Regulatory sources (FATF, ESMA/MiCA) were used directly because they shape risk communication requirements.

## Decisions locked for the demo

- Product name: **Helm Treasury**
- Category: **Stablecoin treasury risk cockpit**
- Primary user: **Treasury lead / finance ops manager**
- Demo workflow: **review policy posture, inspect exposure, drill a risk scenario, and choose a rebalance plan**
- Core scenarios: **normal operations, bridged-asset breach, exchange concentration breach, and a labeled depeg drill**
