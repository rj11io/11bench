# Harbor research

Accessed 2026-07-16. Harbor is a proposed read-only stablecoin treasury risk desk for crypto-native finance and operations teams. No market values in the demo are current; all are labeled seeded scenarios.

## Executive synthesis

The broad dashboard market is crowded: consumer portfolio trackers aggregate balances; research terminals sell charts, labels, and query access; custody products execute controlled transactions. The sharper opportunity is the recurring decision between those layers: “Is our operating liquidity still inside policy, what changed, and what should the signers review today?”

The primary user is a finance/operations lead at a 10–150 person crypto-native company, foundation, or DAO holding $2m–$100m across stablecoins, chains, custody venues, and DeFi. The buyer is the CFO, COO, or foundation director. Their work is not maximizing trading alpha. It is preserving 12–24 months of runway, maintaining payment liquidity, and creating an evidence trail without exposing signing authority.

Harbor’s wedge is stablecoin treasury exception management:

1. Normalize read-only wallet and account positions.
2. Evaluate issuer, venue, chain, bridge, liquidity, price, and governance concentration against a policy.
3. Rank breaches by estimated dollars at risk and urgency.
4. Draft a rebalance brief with evidence, assumptions, and approvals—never execute it.

## Segments, jobs, and recurring decisions

| Segment | Recurring jobs | Typical products / substitutes | Opportunity judgment |
|---|---|---|---|
| Retail holder/trader | Net worth, P&L, discovery, tax lots | Zerion, DeBank, exchanges, CoinStats | Large audience, low willingness to pay, crowded |
| Active/pro trader | Execution, liquidity, market structure, positions | TradingView, exchange terminals, Nansen | High value but latency/execution expectations exceed offline demo |
| Research/investment team | Wallet labels, flows, protocol metrics, thesis monitoring | Nansen, Dune, Glassnode, Token Terminal | Strong incumbents; differentiated data is costly |
| Protocol operations | Treasury, runway, grants, multisig approvals, vendor payments | Safe, spreadsheets, Dune, accounting tools | Fragmented decision loop; strong fit |
| Corporate/crypto-native finance | Cash visibility, controls, close, counterparty and stablecoin exposure | Custodians, ERP, spreadsheets, portfolio tools | Buyer and urgency are clear; compliance-sensitive |
| Tax/accounting practice | Classification, cost basis, reconciliation, filings | Cryptio, Bitwave, CoinTracker | Valuable but jurisdiction-heavy and ledger-depth intensive |

**Decision changed:** focus on finance/ops, not traders. A daily/weekly exception workflow tolerates minute-level data, values provenance over animation, and has an identifiable budget owner.

## Representative products and conventions

- **Safe Smart Account Concepts** — https://docs.safe.global/advanced/smart-account-concepts  
  Safe stores owners and a signature threshold; transactions execute only after the threshold is met. Its model establishes a critical boundary between analysis, proposal, confirmation, and execution.  
  **Decision changed:** Harbor remains read-only and exports/drafts a brief for signers; it does not request keys, signatures, or approvals.

- **Safe Help: What is Safe?** — https://help.safe.global/articles/6691458597-what-is-safe  
  Safe positions multisig as a control for organizations where a single externally owned account is inappropriate.  
  **Decision changed:** custody configuration (wallet type, owners, threshold) is a first-class risk dimension alongside assets.

- **Nansen Labels & Watchlists 101** — https://academy.nansen.ai/articles/2149924-labels-and-watchlists-101  
  Labels replace raw addresses with recognizable entities and remain consistent across dashboards; watchlists support monitoring.  
  **Decision changed:** every position is grouped by human label, legal/operating entity, purpose, and venue; addresses remain available as evidence.

- **Dune Enterprise** — https://dune.com/enterprise  
  Enterprise crypto analytics sells scale, APIs/connectors, SLAs, direct data-warehouse access, and support rather than only dashboards.  
  **Decision changed:** GTM should sell a controlled workflow and auditability, with integrations and support in higher tiers—not a prettier chart.

- **CoinGecko DeFi & Onchain Analytics** — https://docs.coingecko.com/docs/defi-onchain-analytics  
  Common primitives include network + contract identity, token prices, pool reserves, volume, OHLCV, trades, and holders across many networks.  
  **Decision changed:** the entity model keys assets by chain and contract, and treats pool liquidity separately from headline market capitalization.

## Data models and calculations

Core entities:

- Organization → treasury policy → users/roles.
- Account → wallet/address or custodial account → chain/venue → custody control.
- Asset → issuer → legal token class → chain deployment/contract.
- Position → account + asset deployment + units + observed balance/block.
- Price observation → source + pair + value + timestamp + method.
- Liquidity observation → venue/pool + depth/reserves + volume + timestamp.
- Evidence item → issuer disclosure, assurance, regulatory register entry, oracle/pool observation.
- Policy rule → dimension + threshold + severity + scope.
- Finding → affected positions + measured value + rule + evidence + status.
- Action draft → proposed source/destination/amount + rationale + assumptions + reviewer state.

Key calculations:

- Position value = token units × selected USD price.
- Issuer concentration = value sharing an issuer / eligible treasury value.
- Venue concentration = value at a custody venue or protocol / eligible treasury value.
- Chain concentration = value represented on a chain / eligible treasury value.
- Liquid runway = eligible operating-liquidity value / trailing or planned monthly burn. “Eligible” is policy-controlled.
- Depeg = absolute(selected price − 1.00); show direction and observation time.
- Exit coverage = estimated executable liquidity inside a policy slippage band / position value. This is an estimate, not guaranteed capacity.
- Risk score = transparent weighted rule result, never presented as a probability of loss.

### Price, liquidity, latency, and uncertainty

- **CoinGecko Token Price by Token Addresses** — https://docs.coingecko.com/reference/onchain-simple-price  
  The endpoint exposes price, reserves, volume, price change, and last-trade timestamp. Routing may choose the “best” pool, and the source can change based on liquidity/activity.  
  **Decision changed:** show source method and last trade; do not imply that a token price is an executable quote.

- **CoinGecko Data Delivery Methods** — https://docs.coingecko.com/docs/data-delivery-methods  
  REST, streams, and webhooks fit different freshness needs; event-driven notifications are suitable for risk monitoring.  
  **Decision changed:** production architecture uses event-driven findings with scheduled reconciliation, while the demo uses a fixed snapshot.

- **Chainlink Data Feeds directory** — https://data.chain.link/feeds  
  Feeds disclose network, deviation threshold, and heartbeat. Onchain oracle answers are conditional updates, not continuous ticks.  
  **Decision changed:** every “freshness” indicator is source-specific; a green status means within the configured SLA, not “live.”

- **Circle Transparency & Stability** — https://www.circle.com/transparency  
  Circle describes reserve composition, weekly disclosures, mint/burn flows, and monthly third-party assurance.  
  **Decision changed:** issuer risk evidence must distinguish issuer statements, disclosure cadence, and independent assurance date.

The interface uses:

- explicit “Seeded demo · snapshot” labels;
- UTC timestamps and source badges;
- price confidence language (“aggregated observation,” not “truth”);
- dotted/hatched projected states, solid observed states;
- no fake precision beyond the source;
- a “data health” summary that can degrade to stale, partial, or unavailable;
- scenario controls for normal, volatile, and risk-focused conditions.

## Risk and trust model

Stablecoins combine several independent risks: issuer/redemption, reserve/counterparty, chain deployment, bridge/wrapper, smart contract, custody, venue, price/liquidity, and regulatory eligibility. A $1 mark does not collapse those dimensions.

Harbor uses policy-based severity:

- **Critical:** operational or redemption concern that may require immediate signer review.
- **High:** hard limit breached or data too stale to rely on.
- **Watch:** warning band or dependency concentration.
- **Healthy:** inside configured policy, not “safe” or “risk-free.”

Security patterns:

- read-only addresses by default; no seed phrases or private keys;
- least-privilege API integrations, secrets encrypted and separately managed;
- role separation: viewer, analyst/drafter, approver, admin;
- immutable changes to policies/findings/action briefs;
- address privacy controls and opt-in enrichment;
- phishing-resistant authentication and hardware-backed MFA for admins;
- signing remains in the custody system; Harbor deep-links or exports only after explicit review.

## Regulation, compliance, and accounting

- **EU Markets in Crypto-Assets Regulation (EUR-Lex)** — https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32023R1114  
  MiCA requires clear, fair, non-misleading information and establishes obligations for crypto-asset service providers, custody, conflicts, and transparency.  
  **Decision changed:** Harbor avoids personalized investment advice and execution in the initial scope. Recommendations are framed as policy-remediation drafts with disclosed methodology and conflicts.

- **EBA: Asset-referenced and e-money tokens (MiCA)** — https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica  
  ART and EMT issuers face authorization and supervisory requirements in the EU.  
  **Decision changed:** token eligibility is jurisdiction- and entity-specific; “regulated” is not a universal badge.

- **ESMA MiCA Interim Register** — https://www.esma.europa.eu/pl/node/201529  
  ESMA publishes registers for white papers, issuers, authorized CASPs, and non-compliant entities, while noting white papers are issuer-responsible rather than authority-approved.  
  **Decision changed:** evidence records source type and scope; a register presence cannot be shown as regulator endorsement.

- **FATF: Virtual Assets** — https://www.fatf-gafi.org/en/topics/virtual-assets.html  
  FATF emphasizes risk-based controls and the Travel Rule for originator/beneficiary data at regulated intermediaries.  
  **Decision changed:** future transfer workflows need counterparty/beneficiary and jurisdiction metadata; the demo stops before execution.

- **IFRS: Holdings of Cryptocurrencies** — https://www.ifrs.org/projects/completed-projects/2019/holdings-of-cryptocurrencies/  
  The 2019 agenda decision applied IAS 2 for holdings held for sale in ordinary business and otherwise IAS 38 for the cryptocurrency subset considered. Accounting remains fact-specific.  
  **Decision changed:** Harbor is not the accounting subledger; it preserves valuation evidence and exports, while classification and booking remain with the controller and accounting system.

## Visualization principles

The job is exception handling, so hierarchy is:

1. decision status and data health;
2. dollar exposure and policy distance;
3. ranked findings;
4. composition and runway context;
5. evidence and action detail.

Effective choices:

- bullet/progress bars for “actual versus policy limit”;
- stacked bars for exposure composition, always paired with values;
- a compact runway band instead of a decorative price chart;
- a matrix for correlated dimensions (issuer × venue);
- sortable findings with severity, dollars affected, evidence freshness, and owner;
- sparklines only when trend changes the decision;
- color plus text/icon/shape; never red/green alone.

## Positioning, monetization, acquisition, and GTM

**Positioning:** “Know what your treasury needs reviewed before your signers meet.”  
**Category:** stablecoin treasury risk operations.  
**Differentiated promise:** one explainable queue from scattered balances, market liquidity, issuer evidence, and treasury policy.

Packaging hypothesis:

- Monitor — $750/month: up to 10 accounts, daily checks, Slack/email summaries, one policy.
- Control — $2,000/month: multi-entity, custom rules, approval briefs, audit exports, 1-hour checks.
- Enterprise — annual contract: SSO/SCIM, data warehouse, private enrichment, SLA, custom retention.

Pricing is a hypothesis to test, not a market claim. Anchor value to finance hours saved, earlier exception detection, and audit preparation—not avoided losses.

Acquisition:

- design partners through crypto CFO/controller communities, Safe ecosystem partners, accounting firms, and treasury/custody consultants;
- a free “stablecoin concentration brief” using pasted public addresses;
- evidence-led content: depeg postmortem templates, stablecoin policy benchmark, month-end data checklist;
- product-led activation through read-only address import, then sales-assisted policy design.

Buying triggers include a new funding round/token sale, a near-depeg, auditor diligence, treasury handoff, new chain/venue adoption, insurer/custodian review, or board request for a risk policy.

## Open research questions

- Which stablecoin evidence attributes can be normalized without implying equivalence between legal structures?
- What liquidity estimation method is sufficiently conservative across CEX, DEX, and issuer redemption paths?
- Which recommendations cross into regulated advice in each launch jurisdiction?
- What percentage of target teams already maintain explicit issuer/venue/chain limits?
- Is the action brief more valuable as a Safe transaction-builder integration, a PDF/CSV package, or an ERP ticket?

