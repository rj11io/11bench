# Holdfast research

Access date for all web sources: **2026-07-16**.

## Executive conclusion

The strongest product wedge is not another portfolio tracker. It is a
**payment-readiness and concentration-risk control plane for crypto-native
companies**.

The primary user is a finance or operations lead at a 20–200 person company
whose operating cash is split across stablecoins, bank accounts, exchanges,
custodians, multisigs, chains, and DeFi positions. Their recurring question is
not “what is the portfolio worth?” It is:

> Can we make payroll and critical vendor payments on time if a stablecoin
> depegs, a venue freezes withdrawals, or a chain/bridge is unavailable?

Existing products validate adjacent demand:

- custody platforms aggregate venues and control transfers;
- crypto accounting products reconcile and close the books;
- portfolio products show balances, PnL, and multichain exposure;
- on-chain analytics products expose raw/curated data and alerts;
- protocol risk products publish stress metrics.

The gap is an independent, read-only decision layer that converts those inputs
into **payment-ready days, stressed shortfall, concentration breaches, and a
reviewable mitigation plan**. Holdfast therefore avoids custody and execution
in v1. This makes the promise narrower, easier to trust, and useful alongside
Safe, Fireblocks, Coinshift, Request Finance, and crypto subledgers.

## Research method and limits

This review prioritised official product documentation, standards, regulators,
central banks, accounting standard setters, and established data providers.
Vendor claims are treated as evidence of category conventions and positioning,
not independently verified market share or product performance.

The demo contains no live market facts. All balances, prices, obligations,
wallets, entities, scenarios, and timestamps in the interface are explicitly
labelled as seeded demo data.

## User and buyer segments

| Segment                             | Recurring job                                  |      Typical decision cadence | Primary pain                                      | Buying trigger                                  | Fit for Holdfast                                 |
| ----------------------------------- | ---------------------------------------------- | ----------------------------: | ------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Retail / prosumer investor          | Track net worth and PnL                        |                         Daily | fragmented wallets and protocols                  | portfolio size or tax season                    | Low: crowded, price-sensitive                    |
| Active trader / fund analyst        | Find signals and manage positions              |                      Intraday | market noise, execution latency                   | alpha opportunity or drawdown                   | Low: demands live feeds/execution                |
| Protocol risk / governance team     | Protect lending or liquidity markets           | Continuous / governance cycle | parameter risk and tail events                    | market listing or incident                      | Medium, but specialised modelling is crowded     |
| DAO / foundation treasury           | Preserve runway and fund programmes            |              Weekly / monthly | multisigs, volatile assets, contributor approvals | major grant, runway concern, signer incident    | High                                             |
| Crypto-native company finance / ops | Pay payroll/vendors and close books            |    Daily / weekly / month-end | cash fragmented by asset, chain and venue         | funding round, audit, near miss, new controller | **Highest**                                      |
| Payments / exchange treasury        | Fund corridors and manage settlement liquidity |                      Intraday | large scale, regulatory and execution complexity  | corridor expansion or liquidity incident        | High value, but enterprise integration-heavy     |
| Corporate digital-asset treasury    | Govern board-approved holdings                 |           Monthly / quarterly | accounting, custody, policy, disclosure           | first crypto allocation                         | Medium; sales cycle and policy burden are longer |
| Accountant / tax team               | Reconcile and report activity                  |    Month-end / filing periods | cost basis, classifications, missing records      | close or audit                                  | Adjacent; better served by subledgers            |

### Why the primary segment wins

Crypto finance teams already use multiple product categories:

- Coinshift describes treasury professionals as finance teams, CFOs,
  controllers, and ops leads, and combines payments, accounting, and asset
  management.
- Request Finance covers accounts payable, payroll, accounting, expenses, and
  crypto/fiat payments.
- CoinTracker Enterprise connects wallets, exchanges, custodians, and ERPs for
  reconciliation and audit readiness.
- Fireblocks frames treasury management as a holistic view across wallets,
  connected venues, and fiat providers to manage operational risk and
  liquidity.

Those workflows imply a user who has records and rails but still needs to make
cross-system liquidity decisions. A finance/ops buyer also has a measurable
outcome: fewer uncovered obligations, faster weekly review, less concentration,
and fewer last-minute transfers.

## Representative products and category conventions

| Category / examples                                     | Convention                                                                                         | Strength                                | Gap that changed the product decision                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| Institutional custody and treasury — Fireblocks         | unified assets across wallets/venues; policy controls; transfer workflows; security posture        | execution and governance                | Holdfast should be an independent read-only risk layer, not another custodian            |
| Multisig treasury — Safe, Coinshift                     | owner thresholds, proposer/approver separation, batch payments, roles, historical balances         | self-custody team operations            | plans must preserve approval context and never imply a single-click transfer             |
| Finance operations — Request Finance                    | bills, payroll, expenses, accounting records, role-based access                                    | obligation records and payment workflow | obligations are first-class entities, not a manually inferred burn rate                  |
| Crypto accounting — CoinTracker Enterprise              | broad integrations, transaction categorisation, subledger-to-ERP sync, period close                | accounting completeness                 | Holdfast should link to book values but not duplicate reconciliation or tax lots         |
| Portfolio intelligence — Zerion, Nansen                 | multichain aggregation, asset pages, PnL, concentration, alerts                                    | fast portfolio comprehension            | “portfolio value” is table stakes; readiness and stress must be the home-screen headline |
| Open on-chain analytics — Dune                          | parameterised queries, source inspection, filters, refresh schedules, sharing                      | transparency and flexibility            | provenance and freshness need to be visible at metric level                              |
| Protocol risk — Gauntlet, Chaos Labs                    | top-line risk metrics, stress scenarios, liquidity depth, withdrawal availability, recommendations | decision-oriented risk framing          | show scenario impact and assumptions, not a wall of raw metrics                          |
| Market data — CoinGecko, Coin Metrics, Kaiko, Chainlink | reference-rate methodologies, timestamps, update policies, market depth/slippage                   | pricing and liquidity evidence          | price and liquidity need separate sources, confidence, and stale states                  |

### Category design patterns worth retaining

1. A top-level summary with progressive drill-down.
2. Global scope filters for wallet, entity, chain, asset, and time.
3. Human labels paired with canonical addresses and transaction hashes.
4. Clear ownership/threshold information for multisig accounts.
5. Tables for exact balances and charts for trends or scenarios.
6. Saved alerts routed to the team’s existing channel.
7. Exportable records for close, audit, and approval.
8. Read-only onboarding before any signing request.

### Patterns to avoid

1. One blended “risk score” with no decomposition.
2. Green/red alone as the semantic system.
3. Treating all stablecoins as cash at $1 without redemption, issuer, and
   liquidity distinctions.
4. Calling block data “real time” without chain, confirmation, and pipeline
   timestamps.
5. Mixing book value, market value, and immediately spendable value.
6. Recommending a transfer without showing source, destination, chain, approval
   threshold, and assumptions.
7. Hiding data outages behind the last known number.

## Data and entity model research

### Core entities

The product needs a graph, not a flat list of tokens:

- **Organisation / legal entity** — reporting currency, jurisdiction, policy.
- **Account** — bank account, exchange account, custodian vault, EOA, Safe, or
  protocol position.
- **Wallet address** — chain-specific address, human label, owner, sensitivity.
- **Asset** — canonical asset and chain-specific contract/wrapper.
- **Issuer / reserve model** — e.g. fiat-backed issuer, crypto-collateralised
  protocol, native asset.
- **Venue / custodian / protocol** — who controls redemption or withdrawal.
- **Chain / bridge** — settlement domain and dependency.
- **Position lot** — units, account, asset contract, valuation source, block.
- **Obligation** — amount, currency, due date, criticality, acceptable payment
  assets/chains, beneficiary class.
- **Price observation** — source, pair, value, timestamp, methodology.
- **Liquidity observation** — executable size, venue/pool, slippage, timestamp.
- **Policy** — concentration caps, minimum ready days, approved venues, stale
  thresholds.
- **Scenario** — shock, affected dependency, duration, haircut, recovery
  assumption.
- **Plan item** — proposed action, rationale, policy impact, reviewer status,
  required approvals.

### Canonicalisation implications

A “USDC balance” can represent multiple contracts on multiple networks, native
USDC or bridged variants, held directly or as a protocol claim. The system must
preserve:

- token contract and chain;
- wrapper/bridge lineage;
- issuer relationship;
- venue or smart-contract control;
- withdrawal/redemption path;
- latest confirmed block and observation time.

Aggregation is a presentation operation, not a loss of lineage.

### Freshness and finality

Dune documents a multi-stage pipeline: raw blockchain data depends on block
production and reorganisation risk; decoded data may follow ingestion by
seconds; curated tables can update on scheduled cycles. This changed the design
from one global “last updated” label to **per-source and per-metric freshness**.

The product should track:

- source observation time;
- ingestion time;
- chain and block height;
- confirmation/finality policy;
- transformation version;
- stale-after threshold;
- fallback source, if any;
- whether the displayed value is observed, derived, estimated, or manual.

No risk calculation should silently mix a current price with an hours-old
balance or a month-old reserve attestation.

### Price and market-value model

Market value:

`units × selected reference price`

For production:

- use a robust reference rate for accounting/overview;
- preserve source venue constituents and method;
- show a price timestamp;
- quarantine obvious outliers;
- disclose fallback behaviour;
- never silently force a stablecoin to exactly 1.00.

Coin Metrics describes rules-based reference-rate methodologies and controls
for outliers and constituent market quality. CoinGecko documents different
freshness by plan and endpoint. Chainlink feeds expose heartbeat/deviation
parameters. These sources support the decision to show **method and age**, not
only provider logos.

### Liquidity and readiness model

Market value is not payment-ready value.

For each position, Holdfast derives:

`ready_value = market_value × price_haircut × availability_factor`

where availability is determined by the selected horizon:

- **Now** — spendable from an approved payment account with required signers
  available; no swap/bridge/withdrawal needed.
- **≤1 business day** — normal withdrawal/redemption or approved internal
  transfer.
- **2–7 days** — delayed withdrawal, unbonding, review, or settlement.
- **Conditional / unavailable** — frozen venue, halted chain, missing signer,
  policy block, unpriced asset, or insufficient exit liquidity.

Kaiko’s market-depth and slippage definitions reinforce that liquidity must be
measured at an order size, not inferred from reported volume. Gauntlet’s risk
work similarly combines market depth, tracking error, withdrawals, and
concentration.

### Coverage calculation

For horizon `H`:

`payment_ready_days = max d such that cumulative_ready_cash(d) >= cumulative_critical_obligations(d)`

The production calculation should:

1. normalise obligations to reporting currency;
2. respect acceptable settlement assets/chains;
3. apply position-specific availability dates and haircuts;
4. include known fees and conservative slippage;
5. prevent double counting wrapped, staked, pledged, or custodied claims;
6. produce the first uncovered obligation and shortfall;
7. retain an explanation trace.

The demo uses deterministic seeded inputs and labels the output as an estimate.

## Volatility, liquidity, risk, provenance, and uncertainty

### Risk dimensions

| Risk                      | Observable evidence                                                   | Dashboard treatment                                 |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| Price / depeg             | reference rates, market dispersion, issuer redemption terms           | price, deviation from peg, haircut, scenario        |
| Exit liquidity            | depth and expected slippage at required size                          | executable value by horizon, not generic 24h volume |
| Issuer / reserve          | reserve model, disclosures, assurance age, redemption access          | issuer concentration and evidence age               |
| Venue / counterparty      | custody structure, withdrawal status, jurisdiction, limits            | venue concentration and freeze scenario             |
| Chain / bridge            | finality, sequencer/validator status, bridge lineage                  | chain dependency and outage scenario                |
| Smart contract / protocol | audits, admin controls, withdrawal queue, utilisation                 | conditional availability and protocol dependency    |
| Operational               | signer threshold, signer availability, policy rules, address controls | approval path and “ready” gating                    |
| Data quality              | source health, reorgs, stale feeds, missing metadata                  | explicit stale/error state and confidence           |
| Compliance                | sanctions exposure, provider authorisation, jurisdiction              | review flags; never a legal determination           |

### Stablecoin semantics

Circle states USDC is backed by highly liquid cash and cash-equivalent assets,
redeemable 1:1, with weekly reserve disclosure and monthly third-party
assurance. Tether publishes circulation information and quarterly reserve
reports with independent assurance. Those are materially different evidence
cadences and reserve descriptions, and neither eliminates market, access,
jurisdiction, or operational risk for a particular holder.

The ECB notes that stablecoins can face run risk and that reserve liquidity,
redemption safeguards, disclosure, and concentration matter. Therefore:

- stablecoins remain separate assets and issuers;
- “peg” is a target, not a guaranteed market price;
- reserve evidence has an as-of date;
- direct redemption eligibility differs from secondary-market exit;
- the interface avoids calling stablecoins “cash” without a qualifier.

### Uncertainty communication

The scenario engine is not a forecast. It is a deterministic what-if model.
Every result must display:

- shock assumptions;
- affected positions;
- unavailable amount and haircut;
- settlement-delay range;
- confidence / data-quality note;
- first uncovered obligation;
- “not investment, legal, or execution advice”.

ONS guidance recommends shaded ranges where uncertainty changes
interpretation and advises against charting data when uncertainty is too high.
The product therefore uses a plain-language range such as “58 days; modelled
range 53–63 based on settlement timing” and suppresses a false-precision chart
when key sources are stale.

## Wallet, security, privacy, and compliance patterns

### Read-only by default

The initial product does not request private keys, seed phrases, signing
permissions, or transfer authority. Onboarding accepts:

- public wallet/Safe addresses;
- read-only exchange/custodian API credentials;
- CSV/manual balances with as-of timestamps;
- payable exports from an AP system or ERP.

Secrets should be encrypted, scoped to read-only endpoints, rotatable, and
never exposed to the browser after setup.

### Multisig and approval context

Safe documents owners, confirmation thresholds, proposers, modules, and
transaction guards. A treasury plan must therefore:

- identify the originating account and its threshold;
- distinguish proposer from signer;
- show any policy/guard constraint;
- preserve the exact intended asset, chain, amount, and destination;
- remain non-executable in Holdfast v1.

If execution is added later, EIP-712-style readable structured signing and
domain separation are minimum UX expectations, but EIP-712 itself does not
provide replay protection.

### Phishing and connection trust

WalletConnect’s Verify API explicitly treats domain verification as a useful
signal, not a bulletproof guarantee. Holdfast should similarly avoid a
misleading “verified = safe” badge. Connection and source trust should show
states such as:

- domain match;
- known/unknown integration;
- permission scope;
- last successful sync;
- source health;
- residual warning.

### Privacy

Public wallet addresses and transaction-level identifiers can become personal
data when linked to an identifiable individual. EDPB/CNIL blockchain guidance
supports data minimisation and privacy-by-design. Product requirements:

- collect only addresses needed for the organisation;
- use aliases in routine views and reveal full addresses on demand;
- restrict exports by role;
- log access to sensitive wallet mappings;
- define retention and deletion for off-chain metadata;
- never write employee/vendor identity or invoice detail to a public chain.

### Compliance boundary

Holdfast is analytics software, not a custodian, exchange, transfer service, or
portfolio manager in v1. It does not execute orders or provide personalised
investment advice. That boundary is commercially and legally important.

Still, customers may need:

- sanctioned-address and risky-counterparty screening before execution;
- record retention and review workflows;
- provider authorisation/jurisdiction metadata;
- clear warnings that analytics are not legal determinations.

OFAC states sanctions obligations apply to virtual-currency transactions and
supports risk-based controls. FATF highlights transaction patterns, geography,
anonymity-enhancing technologies, source of funds, and sender/recipient
profiles as red-flag dimensions. MiCA requires authorised providers for covered
crypto-asset services in the EU and fair, clear, non-misleading risk
communication. These findings changed the plan from “automated rebalance” to
**draft, review, and export only**.

### Accounting

FASB ASU 2023-08 requires qualifying crypto assets in scope to be measured at
fair value with changes in net income and includes specific disclosures.
IFRS’s crypto holdings agenda decision applies IAS 2 when held for sale in the
ordinary course of business and otherwise IAS 38 for the considered
cryptocurrency subset. Accounting treatment depends on asset and jurisdiction.

Holdfast therefore stores book-value source and accounting classification but
does not present its operational readiness metric as a GAAP/IFRS balance-sheet
classification.

## Effective financial and crypto visualisation

Design decisions from the research:

1. **Lead with the decision.** “83 payment-ready days / 90-day policy” is more
   useful than total portfolio value.
2. **Separate stock, flow, and scenario.** Holdings are a stock; obligations
   are dated flows; scenario impact is an estimate.
3. **Use a line/area chart for coverage through time**, a sorted table or bars
   for concentration, and a timeline for obligations.
4. **Avoid dual axes** and decorative candlesticks where the job is liquidity
   planning.
5. **Start magnitude bars at zero** and keep comparison scales consistent.
6. **Show exact values in tables**, with units and reporting currency.
7. **Annotate targets and breaches** directly.
8. **Use labels/icons as well as colour** for status, following WCAG guidance.
9. **Keep provenance near the number**: source, block/as-of time, calculation.
10. **Make stale data visually interrupt the workflow**, rather than merely
    greying a timestamp.

## Wedge selection

### Options considered

| Wedge                                                        | Attractiveness                                     | Why not selected                                                           |
| ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------- |
| Universal portfolio intelligence                             | large audience                                     | crowded; weak willingness to pay; easily becomes a price wall              |
| On-chain discovery / smart money                             | engaging demo                                      | live-data dependent and competes on proprietary labels/speed               |
| Crypto accounting / tax                                      | strong pain                                        | regulation-heavy and difficult to demonstrate credibly without a subledger |
| Protocol risk                                                | high value                                         | requires protocol-specific simulation and governance expertise             |
| Institutional custody / execution                            | high ACV                                           | security, integration, and regulatory scope too broad for the wedge        |
| Corporate Bitcoin treasury analytics                         | timely                                             | narrow asset model but longer enterprise sale and board/reporting focus    |
| Stablecoin payment readiness for crypto-native finance teams | frequent, measurable, adjacent to existing systems | **Selected**                                                               |

### Product thesis

Crypto finance teams overestimate liquidity when they look at aggregate market
value. Holdfast shows what is actually usable for dated obligations, how that
changes under dependency failures, and which small set of actions restores
policy coverage.

### Differentiated promise

> From fragmented balances to a board- and operator-readable answer:
> “Are the next 90 days covered, what breaks that coverage, and what should the
> team review today?”

The differentiator is the joined model of:

`positions × dependency graph × obligations × policy × stress scenario`

## Positioning, packaging, monetisation, and GTM

### Positioning

- Category: **on-chain treasury readiness**
- Against portfolio trackers: dated obligations and payment readiness, not net
  worth/PnL.
- Against accounting tools: forward-looking operations, not period close.
- Against custodians: independent read-only oversight across providers.
- Against consultants/spreadsheets: continuous evidence, scenarios, and an
  audit trail.

### Pricing hypothesis

Pricing is a hypothesis to validate, not a market fact:

- **Preview — free:** paste up to three public addresses; 30-day coverage
  snapshot; no saved workspace.
- **Team — $399/month:** 15 accounts, five users, obligations import, policies,
  scenarios, email/Slack alerts, plan export.
- **Scale — $1,250/month:** 75 accounts, multiple entities, read-only API
  integrations, SSO, audit log, custom policies, priority support.
- **Enterprise — quote:** unlimited scope, data residency, custom retention,
  procurement/security review, SLA.

The price anchors against avoided finance time, incident risk, and adjacent
data/software spend—not a percentage of assets and not transaction volume.

### Acquisition and launch motion

1. **Address-to-risk report:** a no-login public-wallet scan produces a
   shareable concentration and 30-day readiness preview after the user adds
   obligations manually.
2. **Finance templates:** publish a stablecoin treasury policy template,
   weekly liquidity review checklist, and incident runbook.
3. **Partner channel:** crypto accounting firms, fractional CFOs, Safe
   integrators, and AP/payroll platforms.
4. **Event-led demand:** content and outreach around depegs, withdrawal
   incidents, audits, funding rounds, and month-end close.
5. **Design partners:** 8–12 crypto-native companies with 5+ wallets and
   recurring stablecoin payables.

### Activation and retention hypothesis

- Activation: connect/import at least 80% of treasury value, add the next 30
  days of critical obligations, and resolve or acknowledge one policy breach.
- Weekly retention loop: source sync → coverage change → alert → scenario →
  reviewed plan → evidence log.
- Monthly retention loop: close reconciliation, policy attestation, and board
  / leadership liquidity memo.

## Source register and decision impact

1. **Fireblocks — “Treasury Management”**  
   https://developers.fireblocks.com/docs/treasury-management  
   Finding: institutional treasury spans wallets, exchanges, DeFi, fiat
   providers, operational risk, and liquidity.  
   Decision changed: make the account model provider-agnostic and cross-venue.

2. **Fireblocks — “The New Frontier of Crypto Security”**  
   https://www.fireblocks.com/blog/new-frontier-crypto-security-threats-institutions  
   Finding: institutional risk includes phishing, API, insider, supply-chain,
   and multi-chain threats.  
   Decision changed: read-only integration, least privilege, and source-health
   visibility are product requirements.

3. **Safe Docs — “Smart Account Concepts”**  
   https://docs.safe.global/advanced/smart-account-concepts  
   Finding: owners, thresholds, signatures, modules, and guards determine
   whether a transaction can execute.  
   Decision changed: readiness includes approval availability; plans expose
   thresholds.

4. **Safe Help — “Proposers”**  
   https://help.safe.global/articles/1671337645-proposers  
   Finding: teams separate transaction preparation from approval.  
   Decision changed: Holdfast drafts and exports; signers approve elsewhere.

5. **EIP-712 — “Typed structured data hashing and signing”**  
   https://eips.ethereum.org/EIPS/eip-712  
   Finding: structured, domain-separated messages are more interpretable, but
   replay protection is outside the standard.  
   Decision changed: future execution requires human-readable intent plus
   separate replay controls.

6. **WalletConnect — “Verify API”**  
   https://docs.walletconnect.network/wallet-sdk/web/verify  
   Finding: domain risk checks reduce phishing risk but are not guarantees.  
   Decision changed: no absolute “safe/verified” claim.

7. **Coinshift — “Overview”**  
   https://docs.coinshift.xyz/business/about-us/overview  
   Finding: treasury users expect unified multichain balances, roles, proposals,
   cash-flow tracking, and exports.  
   Decision changed: exact tables, account roles, and plan export are table
   stakes.

8. **Request Finance — “What can I do with Request?”**  
   https://help.request.finance/en/articles/8643029-what-can-i-do-with-request  
   Finding: bills, payroll, expenses, and accounting are established crypto
   finance workflows.  
   Decision changed: model dated obligations rather than extrapolating a burn
   rate from transactions.

9. **CoinTracker — “What is CoinTracker Enterprise?”**  
   https://support.cointracker.io/hc/en-us/articles/29047987043345-What-is-CoinTracker-Enterprise  
   Finding: organisations need wallet/exchange aggregation, reconciliation,
   and ERP sync.  
   Decision changed: integrate with subledgers; do not rebuild cost basis.

10. **Zerion — “Understanding Portfolio Tracking”**  
    https://help.zerion.io/en/articles/13831023-understanding-portfolio-tracking-in-zerion  
    Finding: multichain aggregation, asset drill-down, activity, and timeframe
    controls are familiar portfolio conventions.  
    Decision changed: retain familiar drill-down but change the headline from
    PnL to readiness.

11. **Nansen API — “Address Labels”**  
    https://docs.nansen.ai/api/profiler/address-labels  
    Finding: entity and behavioural labels are derived data with coverage and
    access constraints.  
    Decision changed: labels need provenance and must not replace addresses.

12. **Dune — “Data Freshness”**  
    https://docs.dune.com/data-catalog/data-freshness  
    Finding: raw, decoded, curated, and third-party data refresh at different
    speeds and face reorg considerations.  
    Decision changed: per-metric timestamps and stale thresholds.

13. **Dune — “Data Trust & Reliability”**  
    https://docs.dune.com/data-catalog/data-quality  
    Finding: data quality requires ingestion, gap, duplicate, block-integrity,
    and reorg controls.  
    Decision changed: source health is a first-class state, not a footnote.

14. **CoinGecko API — “Plans & Pricing”**  
    https://www.coingecko.com/en/api/pricing  
    Finding: freshness, licensing, rate limits, attribution, and SLAs vary by
    plan.  
    Decision changed: data licensing/cost and attribution are production
    dependencies.

15. **Coin Metrics — “FAQs / Prices”**  
    https://docs.coinmetrics.io/resources/faqs  
    Finding: robust reference rates use governed market selection,
    outlier-resistant methods, monitoring, and review.  
    Decision changed: use a reference price with methodology, not a single
    exchange last trade.

16. **Kaiko — “Raw order book snapshot + market depth, bid/ask spread &
    price slippage”**  
    https://docs.kaiko.com/rest-api/data-feeds/level-1-and-level-2-data/level-2-aggregations/raw-order-book-snapshot/raw-order-book-snapshot-%2B-market-depth-bid-ask-spread-and-price-slippage  
    Finding: executable liquidity depends on order size; spread and slippage
    matter.  
    Decision changed: readiness haircuts are size-specific.

17. **Chainlink — “Decentralized Data Feeds”**  
    https://data.chain.link/feeds  
    Finding: feeds expose deviation and heartbeat parameters by market/network.  
    Decision changed: source freshness thresholds must be feed-specific.

18. **Gauntlet — “Liquid Restaking Token Market Risk Framework”**  
    https://www.gauntlet.xyz/resources/liquid-restaking-token-lrt-market-risk-framework  
    Finding: external liquidity, withdrawals, volatility, and DeFi dependency
    jointly determine risk.  
    Decision changed: availability is multi-factor, not only price volatility.

19. **Chaos Labs — “Stress Testing Aave’s Supply Cap Parameter”**  
    https://chaoslabs.xyz/resources/chaos_labs_aave_v0_supply_caps.pdf  
    Finding: explicit severe-depeg scenarios expose tail sensitivity and model
    assumptions.  
    Decision changed: scenario presets show shock magnitude and affected
    dependencies.

20. **Circle — “Transparency & Stability”**  
    https://www.circle.com/transparency  
    Finding: reserve composition, disclosure cadence, assurance, and
    redemption claims are available evidence with as-of dates.  
    Decision changed: issuer evidence age appears separately from market price.

21. **Tether — “Transparency”**  
    https://tether.to/transparency/?tab=reports  
    Finding: circulation and reserve reporting have their own cadence and
    assurance framework.  
    Decision changed: stablecoin evidence is issuer-specific.

22. **European Central Bank — “Stablecoins’ role in crypto and beyond:
    functions, risks and policy”**  
    https://www.ecb.europa.eu/press/financial-stability-publications/macroprudential-bulletin/html/ecb.mpbu202207_2~836f682ed7.en.html  
    Finding: collateral, liquidity, confidence, redemption, and contagion can
    undermine a peg.  
    Decision changed: stablecoins are not displayed as risk-free cash.

23. **FASB — “Accounting Standards Update 2023-08”**  
    https://storage.fasb.org/ASU%202023-08.pdf  
    Finding: qualifying in-scope crypto assets use fair value with specific
    presentation/disclosure requirements.  
    Decision changed: retain accounting basis/source but keep operational
    readiness separate.

24. **IFRS Interpretations Committee — “Holdings of Cryptocurrencies”**  
    https://www.ifrs.org/projects/completed-projects/2019/holdings-of-cryptocurrencies/tad-holdings-of-cryptocurrencies/  
    Finding: the considered holdings fall under IAS 2 in specified
    held-for-sale circumstances and otherwise IAS 38.  
    Decision changed: no universal “cash equivalent” accounting label.

25. **EUR-Lex — “Regulation (EU) 2023/1114 (MiCA)”**  
    https://eur-lex.europa.eu/eli/reg/2023/1114/oj  
    Finding: covered crypto services require authorisation and risk
    communications must be fair, clear, and not misleading.  
    Decision changed: analytics-only boundary and prominent limitations.

26. **OFAC — “Sanctions Compliance Guidance for the Virtual Currency
    Industry”**  
    https://ofac.treasury.gov/system/files/126/virtual_currency_guidance_brochure.pdf  
    Finding: sanctions obligations apply to virtual currency and warrant
    risk-based controls.  
    Decision changed: compliance flags are part of review, but not automated
    legal conclusions.

27. **FATF — “Virtual Assets Red Flag Indicators”**  
    https://www.fatf-gafi.org/en/publications/Methodsandtrends/Virtual-assets-red-flag-indicators.html  
    Finding: geography, anonymity, patterns, size, profiles, and source of funds
    are relevant risk dimensions.  
    Decision changed: counterparty review needs explainable flags and context.

28. **EDPB — “Guidelines on processing of personal data through blockchain
    technologies”**  
    https://www.edpb.europa.eu/documents/guideline/guidelines-on-processing-of-personal-data-through-blockchain-technologies_en  
    Finding: blockchain-linked data requires privacy-by-design analysis.  
    Decision changed: alias addresses, minimise identity mappings, role-gate
    exports.

29. **OCC / Federal Reserve / FDIC — “Crypto-Asset Safekeeping by Banking
    Organizations”**  
    https://www.occ.treas.gov/news-issuances/news-releases/2025/nr-ia-2025-68a.pdf  
    Finding: existing safe-and-sound risk-management principles apply to
    crypto-asset safekeeping.  
    Decision changed: custodian/control structure is part of counterparty risk.

30. **ONS — “Showing uncertainty in charts”**  
    https://service-manual.ons.gov.uk/data-visualisation/guidance/showing-uncertainty-in-charts  
    Finding: use ranges when uncertainty changes interpretation; avoid
    misleading charts when uncertainty is too high.  
    Decision changed: scenario ranges and a dedicated data-outage state.

31. **ONS — “Choosing a chart type”**  
    https://service-manual.ons.gov.uk/data-visualisation/chart-types/choosing-a-chart-type  
    Finding: use familiar charts and split complex comparisons into simpler
    views.  
    Decision changed: one coverage chart plus exact exposure tables.

32. **W3C WAI — “Designing for Web Accessibility”**  
    https://www.w3.org/WAI/tips/designing/  
    Finding: colour cannot be the only carrier of meaning.  
    Decision changed: statuses pair colour with icons and text.

## Unknowns to validate with design partners

1. Whether the highest-value obligation source is AP/payroll integration,
   bank/ERP import, or a simple forecast CSV.
2. The right “payment-ready” policy horizon: 30, 60, 90, or customer-defined.
3. Whether teams prefer deterministic scenarios or probabilistic loss models.
4. How much issuer/custodian evidence should be maintained by Holdfast versus a
   risk-data partner.
5. Which integrations can reliably provide read-only withdrawal availability
   and account restrictions.
6. Whether customers will pay for independent oversight if their custody
   platform adds similar analytics.
7. The legal boundary between generic policy-based planning and regulated
   advice in each launch jurisdiction.
