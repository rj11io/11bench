# Research: Helm Treasury

Date: July 16, 2026  
Route: `/codex-gpt5.4-xhigh`  
Selected wedge: a treasury risk control tower for crypto-native finance teams and DAO treasuries managing multi-chain stablecoin-heavy balances.

## Decision Summary

The best opportunity is not another broad crypto portfolio homepage. It is a focused operating surface for treasury operators who already have wallets, signers, custody, and basic balance visibility, but still lack a policy-aware answer to one recurring question:

`Can we safely fund the next week, month, and quarter without violating concentration, liquidity, or counterparty risk limits?`

That wedge is defensible because:

- Stablecoin balances are now large enough and fragmented enough that issuer, chain, and venue concentration are treasury problems, not just trader problems.
- Existing products cluster into execution/security layers, portfolio analytics, or accounting back office. The gap is decision support between those systems.
- The buyer has a real operating loop: review liquidity, stress exposures, route a rebalance, and document why it was safe.

## Why This User

### Primary user

Head of Treasury or Treasury Operations Lead at a crypto-native company, foundation, or DAO with:

- more than one chain in use;
- a Safe-style multisig or equivalent governance workflow;
- meaningful stablecoin balances used for payroll, grants, market making, or vendor settlement;
- some yield or lending exposure in DeFi.

### Economic buyer

CFO, COO, Head of Finance, or treasury committee chair.

### Why not the other segments first

- Retail portfolio users already have many free or low-cost products and weaker willingness to pay.
- Pure on-chain analysts want discovery and entity intelligence, not treasury policy workflows.
- Back-office accounting buyers care more about books, cost basis, and audit exports than same-day rebalance decisions.
- Trading desks need execution speed, venue routing, and PnL first; treasury policy is adjacent but not the daily command center.

## Segment And Job Map

| Segment | Core recurring decision | Tooling they already have | Why Helm wins or loses |
| --- | --- | --- | --- |
| Retail portfolio tracker | What do I own and how did it perform? | Zerion, DeBank, exchange apps | Loses. Too crowded and too price-centric. |
| On-chain analyst | Which wallets or entities matter? | Nansen, Arkham, Dune | Loses as primary beachhead. Great adjacent data source. |
| Crypto treasury team | Can I meet obligations without concentration or liquidity surprises? | Safe, spreadsheets, custody portals, ad hoc dashboards | Wins. This is the clearest control-tower gap. |
| DAO treasury committee | Should we approve this rebalance or keep reserves where they are? | Safe, board decks, forum posts | Wins. Governance and policy communication matter. |
| Digital asset accountant | Can I reconcile and close the month? | Cryptio, ERP, spreadsheets | Partial fit, but not the demo wedge. |
| Stablecoin issuer or bank pilot | How do we launch safely under policy controls? | Internal systems, compliance tooling | Long-term enterprise expansion, not the first product surface. |

## Category Conventions That Matter

Across current products, several conventions repeat:

- Portfolio tools group exposure by token, protocol, chain, and address.
- Wallet/custody products emphasize multisig, approval thresholds, transaction simulation, and guardrails.
- Treasury products sell governance, auditability, reconciliation, and policy controls.
- DeFi risk products surface liquidation thresholds, health factors, and venue-specific exit risk.

The implication is straightforward: the UI should feel familiar in how it groups data, but novel in what it helps the operator decide. Helm should not compete with a wallet on transaction execution or with a portfolio tracker on price novelty. It should turn familiar holdings views into treasury actions.

## Data Model Research

The data model needs to unify five layers:

1. Wallet and account structure  
   Safe accounts, watch-only addresses, custodial omnibus accounts, and legal entities.

2. Token and position structure  
   ERC-20 balances, stablecoin issuer identity, chain identity, and DeFi positions such as ERC-4626 vault shares.

3. Liquidity and obligation structure  
   Settlement window, exit haircut, payroll due date, grant commitments, or market-making float requirements.

4. Policy structure  
   Concentration limits, minimum T+0 runway, protocol caps, signer thresholds, sanctions/counterparty rules.

5. Provenance and freshness structure  
   Block height, source system, confirmation state, price timestamp, reserve attestation cadence, and compliance-screen refresh time.

That model supports a better treasury question than simple net worth:

`What is liquid now, what is merely visible, and what stays safe under stress?`

## Risk, Provenance, And Trust Communication

Crypto treasury interfaces fail when they collapse every number into the same visual confidence level. The research strongly supports separating:

- on-chain balances that are block-confirmed;
- market prices that are timestamped but still third-party estimates;
- reserve claims that may be attested weekly or monthly rather than live;
- protocol risk parameters that can change through governance;
- screening outcomes that can expire and need rechecks.

That led to four UI rules for Helm:

- Every important number gets an as-of timestamp or freshness label.
- “Attested,” “verified,” “screened,” and “estimated” are different states, not synonyms.
- Scenario mode must be explicit and non-ambiguous.
- Demo data must be labeled as seeded, not live.

## Security And Compliance Research Implications

The wallet/security research points toward a watch-only, overlay-first product:

- Treasury teams already use Safe, Fireblocks, or similar systems for approvals and custody.
- They still need simulation, sign-off context, and policy explanations before signers approve.
- Regulatory expectations around sanctions, AML/CFT, and stablecoin oversight make counterparty screening and audit trails mandatory, especially for institution-facing deployments.

That means Helm v1 should:

- avoid key custody;
- avoid being the transaction executor;
- generate decision-ready action packages and exports back into the execution layer;
- keep immutable logs of who reviewed and queued a policy change.

## GTM Implications

The wedge naturally supports an enterprise or high-value team motion:

- beachhead buyers are treasury-heavy protocol teams, foundations, and crypto-native finance orgs with enough operational complexity to feel pain immediately;
- distribution should ride existing systems of record and execution, especially Safe ecosystems, treasury advisors, auditors, and finance communities;
- the GTM story is stronger when framed around stablecoin and treasury risk preparedness rather than “dashboarding.”

The cleanest launch narrative is:

`Know whether your stablecoin treasury still meets policy before the first signer approves the next rebalance.`

## Product Decision

Build `Helm Treasury`, a scenario-aware treasury risk cockpit that helps finance leads and treasury committees:

- see concentration by issuer, chain, venue, and wallet;
- understand same-day versus delayed liquidity;
- detect policy breaches under normal and stress states;
- queue recommended rebalances with signer implications;
- understand provenance, latency, and screening confidence for each number.

## Source Log

| Source title | URL | Accessed | Finding | Decision changed |
| --- | --- | --- | --- | --- |
| Stablecoins by Chain - Market Cap & Supply - DefiLlama | https://defillama.com/stablecoins/chains | July 16, 2026 | Total stablecoin market cap displayed at about `$307.523b`, with large balances spread across Ethereum, Tron, Solana, Base, and other chains. | The product must be multi-chain by default and expose issuer plus chain concentration together. |
| Treasury Management \| Glossary \| Fireblocks | https://www.fireblocks.com/glossary/treasury-management | July 16, 2026 | Fireblocks explicitly names corporate treasuries, Web3 teams, DAO treasuries, trading firms, and financial institutions as digital asset treasury users, and frames the category as foundational risk management. | Chose treasury operators and DAO finance teams as the primary buyer instead of retail or research users. |
| Multisig Wallet for Secure Onchain Asset Management \| Safe{Wallet} | https://www.safe.global/wallet | July 16, 2026 | Safe positions itself as secure self-custody and on-chain treasury management with multisig, transaction simulation, and treasury workflows. | Helm should layer on top of an existing wallet/governance stack, not replace it. |
| Fireblocks Governance and Policies Engine | https://www.fireblocks.com/platforms/governance-and-policies | July 16, 2026 | Fireblocks states policy controls are a first line of defense and links many incidents to misconfiguration rather than infrastructure failure. | Policy breaches, limits, and signer requirements became first-class UI objects. |
| Nansen Portfolio 101 | https://academy.nansen.ai/articles/8816201-nansen-portfolio-101 | July 16, 2026 | Nansen’s portfolio conventions include token, protocol, chain, and address allocation views. | The explorer should use familiar grouping modes, then connect them to treasury decisions. |
| Running the Safe Transaction Service - Safe Docs | https://docs.safe.global/core-api/api-safe-transaction-service | July 16, 2026 | Safe documents event/tracing-based indexing, off-chain signature collection, and reorg handling. | Provenance needs confirmation-state and signer workflow semantics, not just raw balances. |
| Transparency & Stability \| Circle | https://www.circle.com/transparency | July 16, 2026 | Circle discloses weekly reserve holdings plus monthly third-party assurance, and notes the majority of the USDC reserve sits in the Circle Reserve Fund. | Reserve-backed assets need explicit attestation cadence and off-chain provenance labels. |
| Proof of Reserve \| Chainlink | https://chain.link/proof-of-reserve | July 16, 2026 | Chainlink frames proof of reserve as automated, tamper-proof reserve monitoring with circuit-breaker style safeguards. | Added reserve verification and circuit-breaker semantics to the product concept. |
| ERC-20: Token Standard | https://eips.ethereum.org/EIPS/eip-20 | July 16, 2026 | ERC-20 establishes the token interface reused across wallets and applications. | Token balances and contract IDs are modeled as the atomic holding unit. |
| ERC-4626: Tokenized Vaults | https://eips.ethereum.org/EIPS/eip-4626 | July 16, 2026 | ERC-4626 separates vault shares from underlying assets and calls out fees, slippage, and `totalAssets`. | Vault shares must not be presented as equivalent to instantly liquid base stablecoins. |
| Health Factor & Liquidations \| Aave | https://aave.com/help/borrowing/liquidations | July 16, 2026 | Aave documents the health factor formula and states positions below `1` risk liquidation. | DeFi lending exposure should surface liquidation sensitivity, not just mark-to-market value. |
| Coin Price by IDs, Symbols, or Names - CoinGecko API | https://docs.coingecko.com/reference/simple-price | July 16, 2026 | CoinGecko exposes `include_last_updated_at` and market-cap / volume fields in its simple price API. | Helm should surface explicit price timestamps and staleness metadata for all derived values. |
| Targeted report on Stablecoins and Unhosted Wallets - Peer-to-Peer Transactions \| FATF | https://www.fatf-gafi.org/en/publications/Virtualassets/targeted-report-stablecoins-unhosted-wallets.html | July 16, 2026 | FATF highlights stablecoin growth, P2P and unhosted-wallet monitoring risk, and control expectations. | Counterparty and sanctions provenance must sit inside the core dashboard, not in a settings page. |
| Treasury Continues Campaign to Combat Ransomware... \| U.S. Treasury | https://home.treasury.gov/news/press-releases/jy0410 | July 16, 2026 | Treasury states OFAC sanctions compliance applies to the virtual currency industry in the same manner as traditional financial institutions. | Added sanctions-aware policy rows and screening freshness to the product requirements. |
| Application of FinCEN’s Regulations to Certain Business Models Involving Convertible Virtual Currencies \| FinCEN | https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models | July 16, 2026 | FinCEN’s guidance applies to money services business models involving convertible virtual currencies. | Kept v1 as monitoring and decision support, not transaction intermediation. |
| Commission seeks feedback on the functioning of EU crypto-assets rules - Finance | https://finance.ec.europa.eu/news/commission-seeks-feedback-functioning-eu-crypto-assets-rules-2026-05-20_en | July 16, 2026 | The Commission notes MiCA established a harmonized EU framework covering stablecoins, issuers, and service providers. | Permissions, audit exports, and policy evidence are necessary for institutional readiness. |
| From Strategy to Scale: Implementing Stablecoin Programs and Measuring What Matters \| Chainalysis | https://www.chainalysis.com/blog/implementing-stablecoin-programs/ | July 16, 2026 | Chainalysis argues successful stablecoin programs start with narrow pilot scope and a built-in control stack. | Reinforced the decision to build a focused treasury risk wedge instead of a crypto super-app. |
| What to consider when creating line charts \| Datawrapper Academy | https://www.datawrapper.de/academy/what-to-consider-when-creating-line-charts | July 16, 2026 | Line charts are best for change over time; bars or columns are better for categorical comparisons. | Chose a line chart for runway history and ranked bars for exposure comparisons. |
