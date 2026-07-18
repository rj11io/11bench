# Research: a decision cockpit for onchain treasury teams

Access date for every source: **2026-07-16**. Product and regulatory pages can
change; dates shown in the product must therefore be treated as part of the data,
not decoration.

## Executive conclusion

The most defensible wedge is **non-custodial treasury risk and liquidity
decisioning for 5–50 person crypto-native finance teams**. The user is not asking
“what do we own?” but “can we safely meet the next obligations, and what should
we move before risk crosses policy?”

This sits between:

- wallets/custody, which secure and execute assets;
- AP/accounting systems, which record and pay obligations;
- institutional compliance systems, which screen transactions; and
- analytics warehouses, which expose raw onchain facts.

The gap is a cross-wallet, cross-chain decision layer that combines future
obligations with stablecoin, venue, chain and operational concentration, shows
freshness and confidence, and turns each breach into a reviewable action plan.
The demo product is called **Northstar**.

## Users, buyers, jobs and recurring decisions

### Primary segment: crypto-native operating companies and protocols

Typical team: CFO or Head of Finance, one finance/operations lead, and several
Safe signers. Assets are split across multiple chains and wallets; payroll,
grants, vendors and runway are often denominated in fiat while settlement may be
in stablecoins.

Recurring jobs:

1. Prove that payroll and committed spend are covered for 30/90/180 days.
2. Decide which asset, chain and account should fund a payment batch.
3. Detect excess exposure to one issuer, stablecoin, protocol, bridge, chain or
   signer set.
4. Model a depeg, market drawdown, redemption delay or unexpected outflow before
   taking action.
5. Produce a defensible, time-stamped view for executives, boards, auditors and
   signers.

Buying triggers: a fundraise; a new multi-chain deployment; a near-miss with
payroll; a stablecoin depeg; an audit; a new finance hire; or executive pressure
to replace a spreadsheet.

### Secondary segments

- Finance service firms managing several protocol clients.
- Foundations and grants programs with scheduled disbursements.
- Stablecoin payment companies managing prefunding and settlement liquidity.
- Corporate innovation teams beginning to hold or settle in stablecoins.

Large regulated institutions are a later segment: they need procurement,
custody, AML and reporting integrations beyond a first wedge. Individual traders
are not the target; their decision loop is alpha and execution rather than
operational solvency.

### Evidence

- **Request Finance — Intro**  
  https://support.request.finance/  
  The product targets companies, contractors and DAOs managing crypto and fiat
  invoices, bills, salaries and expenses, and emphasizes non-custodial operation,
  audit records and batch payments.  
  **Decision changed:** future fiat obligations and payment batches belong in
  the model; this cannot be only a wallet balance viewer.

- **Request Finance — Crypto payments resources**  
  https://www.request.finance/crypto-payments  
  Request frames treasury management around fundraising, liquidity, risk and
  wallet infrastructure, based on input from finance and operations leaders.  
  **Decision changed:** primary user is a finance operator, not a token analyst.

- **Deloitte — Corporate crypto adoption**  
  https://www.deloitte.com/us/en/insights/topics/business-strategy-growth/2q-2025-cfo-signals-survey.html  
  Deloitte’s Q2 2025 survey covered 200 North American CFOs at companies with at
  least $1B revenue; nearly a quarter expected finance use of digital currency
  within two years, with treasury and payments among the cited functions.
  **Decision changed:** stablecoin treasury is not only a DAO niche, but the
  initial product stays with crypto-native teams that have the pain today.

- **AFP — 2026 Liquidity Survey release**  
  https://www.financialprofessionals.org/about/learn-more/press-releases/Details/afp-survey-finds-stablecoins-remain-peripheral-to-liquidity-strategies-as-cash-reserves-rise  
  Corporate treasury remains cautious; interest does not equal readiness.
  **Decision changed:** GTM should sell control, visibility and auditability—not
  inevitability or speculative adoption.

## Representative products and category conventions

### Secure wallets and transaction infrastructure

- **Safe — Smart Account overview**  
  https://docs.safe.global/advanced/smart-account-overview  
  Safe uses owner thresholds, supports modules and guards, and warns that those
  extensions are security-critical.  
  **Convention:** show signer threshold, pending approvals, account type and
  module/guard state. Never ask for seed phrases or private keys.

- **Safe — Transaction Service**  
  https://docs.safe.global/core-api/api-safe-transaction-service  
  The service indexes executed/configuration events, token transfers and
  offchain signatures; it can decode interactions but decoding has its own
  cadence and source dependencies.  
  **Convention:** separate proposed, signed, executed, confirmed and decoded
  states. **Decision changed:** Northstar proposes an action packet but does not
  imply execution.

- **Safe — Guards**  
  https://docs.safe.global/advanced/smart-account-guards  
  Guards can check transactions before and after execution, but a faulty guard
  can block the account.  
  **Decision changed:** policy suggestions remain advisory in v1; enforcing a
  guard is an explicit later feature with audit and recovery requirements.

- **Fireblocks — Treasury Management**  
  https://developers.fireblocks.com/docs/treasury-management  
  Fireblocks combines a holistic view of assets across wallets/venues with
  policy controls, approvals, movement and operational risk.  
  **Convention:** operational controls are attached to workflows, not merely
  displayed as scores.

- **Fireblocks — Pricing**  
  https://www.fireblocks.com/pricing  
  The entry plan is listed at $999/month and enterprise plans start at
  $36,000/year, with policy and infrastructure bundled.  
  **Decision changed:** a read-only decision layer can enter below
  custody-infrastructure pricing and coexist with Safe/Fireblocks.

### Finance operations and accounting

- **Request Finance — What does Request cost?**  
  https://help.request.finance/en/articles/10397958-what-does-request-cost  
  Freelancers can use it free; businesses have subscriptions and a free trial.
  **Convention:** product-led evaluation plus sales-assisted business plans.

- **Request Finance — Accounting partner program**  
  https://www.request.finance/partners-program-accounting-firms  
  Request recruits accounting and law firms, offers training, referrals and
  extended trials.  
  **Decision changed:** crypto accounting firms are a high-leverage channel for
  Northstar because they feel the multi-client spreadsheet pain repeatedly.

### Compliance and monitoring

- **Chainalysis — Crypto compliance solution**  
  https://www.chainalysis.com/solution/crypto-compliance/  
  Category conventions include address screening, continuous monitoring,
  customizable rules, alerts and investigation/escalation workflows.  
  **Decision changed:** Northstar must support “review / assign / resolve” and
  should integrate a specialist provider rather than invent illicit-finance
  risk labels.

- **OpenZeppelin — Monitor**  
  https://docs.openzeppelin.com/defender/module/monitor  
  Monitoring uses named risk categories, severity, confirmation blocks, filters
  and multiple notification channels. Defender is in maintenance mode and points
  users to OpenZeppelin Monitor.  
  **Decision changed:** every alert needs category, severity, evidence,
  confirmation/freshness and state; vendor lifecycle is itself a dependency.

## Data and entity model

### Core entities

- **Organization**: reporting currency, timezone, risk policy, members.
- **Account**: chain ID, address, label, custody type, signer threshold, owners,
  Safe modules/guards, status.
- **Asset**: chain-specific contract, canonical asset, symbol, decimals, issuer,
  backing model, redemption path and regulatory metadata.
- **Balance lot**: account + chain-specific asset + block height/time + quantity.
- **Price observation**: canonical asset, quote currency, value, venue/source,
  observed time, confidence and methodology.
- **Position**: wallet balance, exchange balance, lending supply/borrow, LP,
  staking, vesting or receivable; includes liquidity tier and unwind assumptions.
- **Obligation**: amount, currency, due date, certainty, counterparty and status.
- **Transaction/proposal**: chain, account, nonce, operation, calls, signatures,
  execution/finality state, decoded intent and simulation.
- **Risk factor / policy / breach**: scope, threshold, measurement, severity,
  evidence, owner and lifecycle.
- **Scenario**: shocks, assumptions, results, author and timestamp.

### Standards and provider behavior

- **ERC-20 Token Standard**  
  https://eips.ethereum.org/EIPS/eip-20  
  `name`, `symbol` and `decimals` are optional; clients must handle `false`
  returns and should not trust metadata as identity.  
  **Decision changed:** asset identity is chain ID + contract address; symbols
  are presentation metadata. Token quantities are normalized with verified
  decimals and flagged when metadata is uncertain.

- **Dune — Data Catalog**  
  https://docs.dune.com/data-catalog/overview  
  Dune distinguishes raw, decoded and curated datasets, uses consistent
  cross-chain schemas, documents methodology and quality checks.  
  **Decision changed:** provenance is field-level: balance, price, decode and
  risk may have different sources and timestamps.

- **Dune — Data Freshness**  
  https://docs.dune.com/data-catalog/data-freshness  
  Raw, decoded and curated data update on different cadences; curated models are
  generally hourly, and chain reorg risk can intentionally delay ingestion.
  **Decision changed:** one global “last updated” label is misleading. Each
  surface shows source age and a stale threshold.

- **Allium — Data Freshness**  
  https://docs.allium.so/historical-data/overview/data-freshness  
  Historical EVM raw data is described as roughly 6–10 minutes median freshness,
  while enriched tables often update hourly or daily; reorg mitigation can add
  delay.  
  **Decision changed:** core wallet balances require a near-real-time path;
  analytical enrichments can be slower if visibly labeled.

- **Allium — Data Integration Guide**  
  https://docs.allium.so/historical-data/overview/data-integration-guide  
  Blockchain data is not strictly append-only; late records, reorgs and backfills
  mean block time and delivery time differ.  
  **Decision changed:** store observed-at, block-time, block-height and
  ingested-at separately, and rerun historical reconciliations.

## Calculations, risk and uncertainty

### Decision metrics

1. **Liquid coverage (days)** = immediately available policy-eligible assets /
   average committed cash outflow over the selected horizon.
2. **Runway (months)** = policy-adjusted liquid resources / modeled monthly net
   burn. Both numerator and burn assumptions must be inspectable.
3. **Concentration** = exposure to an issuer, canonical asset, chain, venue,
   custodian or signer set / scoped treasury NAV.
4. **Liquidity tier**: T0 transferable now; T1 redeemable within 1 day; T2 within
   7 days; T3 longer/uncertain. Tiers include operational and protocol gates, not
   only market volume.
5. **Policy-adjusted value** = quantity × price × scenario haircut × eligibility.
6. **Data confidence** is not investment safety: it reflects freshness,
   corroboration and decode completeness.

Stablecoin risk cannot be collapsed into a single “stable/unsafe” label:

- peg deviation and market depth;
- issuer and reserve quality;
- direct redemption eligibility and timing;
- chain/bridge representation;
- smart-contract and freeze/admin risk;
- venue/custody concentration;
- compliance and counterparty constraints.

### Evidence

- **Circle — Transparency & stability**  
  https://www.circle.com/transparency  
  Circle publishes reserve composition, circulation, weekly disclosures and
  monthly third-party assurance.  
  **Decision changed:** issuer disclosures are a first-class provenance object,
  but issuer statements are distinct from market-price and onchain evidence.

- **BIS — Making stablecoins stable(r)**  
  https://www.bis.org/publ/work1355.htm  
  The paper frames demandable stablecoins as exposing holders and markets to
  liquidity transformation, redemption and fire-sale risk.  
  **Decision changed:** scenario testing must include redemption delay and
  liquidity haircut, not only a price depeg.

- **FSB — Crypto-assets and Global Stablecoins**  
  https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/crypto-assets-and-global-stablecoins/  
  The FSB stresses structural vulnerabilities and interconnectedness across
  unbacked assets, stablecoins, DeFi and traditional finance.  
  **Decision changed:** correlated exposure should be grouped by issuer and
  backing, even when tokens sit on different chains or in different protocols.

- **Principles of Effective Data Visualization**  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7733875/  
  The review argues that omitting uncertainty can mislead and recommends
  explicit uncertainty forms plus clear interpretation.  
  **Decision changed:** scenarios show assumptions and ranges; estimated values
  do not masquerade as observed balances.

- **Modeling the Dashboard Provenance (IEEE VIS 2023)**  
  https://ieeevis.b-cdn.net/vis_2023/pdfs/w-visxprov-1003.pdf  
  Dashboard reliability depends on provenance metadata, which is often absent.
  **Decision changed:** every key metric has a “how calculated / sources”
  affordance and exportable evidence trail.

## Security, privacy, regulation and trust

### Trust model

- Read-only address onboarding is the default.
- Wallet signature, if offered later, proves control but does not grant custody.
- Never request or store seed phrases/private keys.
- Separate view, policy-edit, propose and execute permissions.
- Display address + chain together; require checksum validation where applicable.
- Simulate and decode proposed actions; show unknown calls and approvals
  prominently.
- No action is “safe” solely because it passes a policy rule.
- Audit log all policy edits, alert dispositions and exported reports.

### Compliance boundary

Northstar is analytics and workflow software. It does not custody, execute,
transfer, exchange or provide personalized investment advice in the v1 thesis.
That boundary must be reviewed jurisdiction by jurisdiction as integrations grow.

- **ESMA — MiCA Article 59, Authorisation**  
  https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-59-authorisation  
  Providing crypto-asset services in the EU generally requires authorization or
  another specified regulated status.  
  **Decision changed:** the product does not claim to be a CASP and does not
  execute on a user’s behalf.

- **ESMA — MiCA Article 81, Advice and portfolio management**  
  https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-81-providing-advice-crypto-assets  
  Authorized advice/portfolio management invokes suitability, disclosure and
  statement duties.  
  **Decision changed:** action cards explain policy breaches and alternatives;
  they are not personalized trade recommendations. Automated optimization is
  post-legal-review.

- **FATF — Virtual Assets**  
  https://www.fatf-gafi.org/en/topics/virtual-assets.html  
  VASPs are expected to perform preventive measures, record keeping and secure
  transmission of originator/beneficiary data under the Travel Rule.  
  **Decision changed:** counterparty screening and Travel Rule are integration
  points for regulated customers, not a home-grown checkbox.

- **W3C — Don’t rely on color alone**  
  https://www.w3.org/WAI/wcag-curric/gid3-0.htm  
  Color-only encoding excludes users and fails in non-color contexts.
  **Decision changed:** severity always uses icon, text and ordering in addition
  to color.

## Positioning, monetization and GTM

### Positioning

**For crypto finance teams that operate across wallets and chains, Northstar
turns balances and obligations into a policy-aware runway plan. Unlike wallet
dashboards or spreadsheets, it shows what is covered, what can break, why the
data is trustworthy, and what signers should review next.**

It competes first with spreadsheets and internal dashboards, not custody. It
integrates Safe, Fireblocks, accounting/AP, price and onchain data.

### Packaging hypothesis

- **Preview — free:** one organization, two read-only accounts, current exposure
  and one saved scenario.
- **Team — $349/month:** up to 10 accounts, obligations import, policies, alerts,
  scenarios, weekly report, five seats.
- **Control — $999/month:** unlimited accounts, approval workflows, audit log,
  API/export, accounting firm access and data SLA.
- Enterprise: SSO, custom retention, private data plane, compliance integrations
  and negotiated SLA.

Pricing is a hypothesis to test against willingness to pay. It deliberately sits
below infrastructure platforms while charging for recurring operational value.

### Acquisition and launch

1. Free **Treasury Stress Test**: paste public addresses and obligations CSV,
   receive a shareable, clearly time-stamped report.
2. Partner with crypto accounting/CFO firms; provide multi-client workspace and
   co-branded quarterly reviews.
3. Safe ecosystem listing and templates: payroll coverage, issuer concentration,
   signer resilience.
4. Publish anonymized benchmarks only with consent and adequate cohort size.
5. Founder-led onboarding for the first 20 teams; measure time-to-first-breach
   and action-plan completion, not dashboard visits.

### Key research-to-product decisions

| Finding | Product decision |
| --- | --- |
| Wallets secure execution but do not model future obligations | Build the home screen around coverage and runway |
| Finance suites own invoices and accounting | Integrate/import obligations; do not rebuild the ledger |
| Raw, decoded and curated onchain data have different latency | Show metric-level source age and confidence |
| Stablecoin safety is multidimensional | Model issuer, peg, redemption, chain, protocol and venue separately |
| Compliance intelligence needs attribution and specialist operations | Partner for screening; preserve evidence and alert disposition |
| Enforced guards can lock an account | Keep v1 advisory and non-custodial |
| Treasury adoption is interested but cautious | Sell control and auditability, not yield or hype |
| Dashboards often hide uncertainty and provenance | Make assumptions, timestamps and calculation details visible |

