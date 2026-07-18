# Tideguard research

**Research date / access date:** 2026-07-16  
**Product wedge selected:** Stablecoin treasury resilience for crypto-native finance and operations teams.

## Executive conclusion

The best opportunity is not another portfolio tracker. It is a decision system for the person responsible for keeping a crypto-native company solvent and operational when assets, chains, counterparties, or signers fail.

The primary user is a finance or operations lead at a 20–250 person crypto company, foundation, protocol team, or DAO managing roughly $1M–$50M across Safe accounts, custodians, exchanges, DeFi positions, and banks. Their recurring decisions are:

1. Can payroll, vendors, and taxes be paid on time?
2. How much runway remains if a stablecoin depegs, a bridge is unavailable, ETH falls, or a custodian freezes?
3. Where is exposure concentrated by issuer, chain, protocol, custody model, and signer set?
4. What should be moved, diversified, or governed before the next payment cycle?
5. What evidence can finance, the board, auditors, and approvers trust?

The selected product, **Tideguard**, turns balances and forecasts into a risk-adjusted runway, explains the failure surfaces behind it, and produces a prioritized control plan. It is deliberately read-only in the first release and hands execution to existing custody and multisig systems.

## Segments, jobs, and buying triggers

### Segment map

| Segment | Recurring job | Existing workaround | Buying trigger | Fit |
|---|---|---|---|---|
| Individual investor / trader | Monitor P&L, allocation, opportunities | Exchange and wallet dashboards | Market volatility | Low: crowded, weak willingness to pay |
| Active DeFi participant | Track positions, rewards, health factors | Portfolio aggregators and protocol UIs | Liquidation or exploit risk | Medium: useful but fragmented consumer buyer |
| Crypto fund / trading desk | Exposure, execution, attribution, risk limits | OMS, custodians, institutional data terminals | New strategy, LP reporting | Medium: valuable but integration-heavy |
| Protocol / DAO treasury | Preserve runway, execute grants/payroll, govern signers | Safe, spreadsheets, Dune, chat approvals | Depeg, signer turnover, budget cycle | High |
| Crypto startup finance team | Pay globally, reconcile, forecast runway, manage custody | ERP + spreadsheets + wallets + payment tools | Audit, board meeting, stablecoin adoption | **Highest** |
| Enterprise digital-asset team | Policy, custody, compliance, accounting | Fireblocks, Bitwave, ERP, internal controls | New program or regulatory approval | High value, slower enterprise motion |
| Tax / accounting practice | Reconcile and report crypto activity | Crypto subledger platforms | Month/quarter close | Strong category, but not the chosen risk wedge |

### Jobs-to-be-done

- **Before a payment run:** “Tell me whether immediately accessible, policy-compliant funds cover the next 30/90 days.”
- **Before a board meeting:** “Show base and stressed runway with assumptions a director can understand.”
- **After a risk event:** “Identify the exact wallets, assets, and obligations affected before we move funds.”
- **During normal operations:** “Keep issuer, chain, protocol, counterparty, and signer concentration inside policy.”
- **For audit and review:** “Show where every balance, price, label, forecast, and risk assessment came from and how fresh it is.”

### Evidence shaping the segment choice

- Request Finance describes a combined workflow spanning invoices, bills, salaries, expenses, batch payments, and audit records. This shows finance teams already buy operational crypto tooling rather than only analytics.
- Its November 2025 transparency report states that platform activity was primarily stablecoin-powered business payments. The exact numbers are vendor-reported and not used as market-size claims here; the directional signal is that stablecoin operations are a recurring business workflow.
- The Artemis / Castle Island / Dragonfly study characterizes payment flows bottom-up rather than treating all on-chain transfers as economic payments. That distinction changed the product away from “total transfer volume” vanity metrics and toward explicit obligations and payment coverage.
- Coinshift’s treasury product was being sunset by March 2026. That is not proof of demand failure, but it is a caution against building a broad, wallet-gated treasury suite. Tideguard therefore starts with a narrow read-only resilience workflow that complements systems of record.

## Representative products and category conventions

### Safe

Safe is the control and execution layer for many on-chain organizations. Its model of owners, a threshold, proposed transactions, off-chain signature collection, and final execution establishes core conventions:

- show signer threshold as `m of n`;
- distinguish proposed, confirmed, executable, and executed states;
- preserve an auditable approval trail;
- do not collapse “wallet balance” and “available to one operator” into the same concept.

**Product decision changed:** Tideguard does not pretend to replace custody or signing. It monitors control quality and exports an action packet to the execution system.

### Fireblocks

Fireblocks positions treasury around policy controls, approval workflows, permissions, transaction simulation, custody, counterparty connectivity, and automation.

**Product decision changed:** policy coverage is a first-class object. A risk is not resolved merely because a user viewed it; it is resolved when an exposure is within an approved limit or an accountable action is complete.

### Bitwave

Bitwave emphasizes audit-ready accounting, configurable pricing, missing-price handling, and visible methodology. Its documentation exposes price source, resolution, rule, and failures.

**Product decision changed:** every value in Tideguard carries an as-of time and source class. Missing or stale inputs reduce confidence and must never silently become zero.

### Nansen

Nansen’s portfolio model combines wallet balances with protocol positions and uses labels to turn opaque addresses into recognizable entities.

**Product decision changed:** the entity model separates accounts, positions, assets, protocols, and labels. Custom organization labels are displayed beside shortened addresses, never instead of them.

### L2BEAT

L2BEAT separates risk dimensions and shows the mechanism behind each status, including validation, liveness, governance, upgradeability, and exit windows. It also explicitly marks incomplete research.

**Product decision changed:** Tideguard avoids a single unexplained “crypto risk score.” It gives an overall policy status only as a summary of visible, independently inspectable risk surfaces.

### Request Finance and Coinshift

Both establish treasury conventions around payroll, vendors, batch payments, roles, and multisig workflows.

**Product decision changed:** the dashboard’s north-star unit is months of operations and obligation coverage, not token returns.

## Data models

### Core entities

- **Organization:** reporting currency, jurisdiction, fiscal calendar, policies.
- **Workspace:** a scoped set of accounts, forecasts, team roles, and saved scenarios.
- **Account:** address or external account ID; chain; custody type; owner/threshold configuration; labels.
- **Asset:** canonical asset identity; contract per chain; issuer; peg currency; native/bridged representation.
- **Position:** quantity at an account or protocol; liquidity horizon; lock/withdrawal conditions; valuation.
- **Protocol exposure:** protocol, version, chain, contract, position type, withdrawal path, governance/upgrade metadata.
- **Counterparty:** issuer, custodian, exchange, bank, bridge operator, payment provider.
- **Obligation:** amount, currency, due date, confidence, category, payee class, source.
- **Price observation:** asset, quote currency, value, methodology, timestamp, source set, confidence.
- **Risk factor:** surface, mechanism, affected positions, severity, likelihood band, evidence, last reviewed.
- **Policy:** metric, scope, threshold, exception, owner, review cadence.
- **Scenario:** shocks, unavailable surfaces, expense change, created-by, timestamp.
- **Action:** recommended control, affected amount, expected effect, owner, approval requirement, status.

### Balance and position rules

- Sum native wallet balances and protocol positions separately before presenting a consolidated total.
- Identify debts and net them only in views explicitly labeled “net value”; never hide gross assets or debt.
- Treat bridged assets as separate representations even when they share a ticker.
- A token symbol is not a stable identity. Chain ID + contract address + token standard is the minimum on-chain identity.
- Preserve block number / ledger cursor for reproducibility.
- Account for pending transactions separately from confirmed balances.
- Classify liquidity as same-day, 1–7 days, 8–30 days, or over 30 days using operational withdrawal assumptions, not only market volume.

## Valuation, freshness, provenance, and uncertainty

Coin Metrics documents reference rates using multiple constituent markets and robust aggregation methods, with different publication frequencies. This supports a hierarchy:

1. approved institutional reference rate;
2. robust aggregated market price;
3. directly observable liquid market;
4. protocol-derived or redemption value;
5. manual price with named owner and expiration;
6. unavailable.

Rules:

- Show reporting currency and price timestamp adjacent to value.
- Stablecoins are marked to observable price for risk views; an accounting view may optionally apply an approved $1 policy, but must disclose it.
- A stale price is not silently reused. The value remains visible with a stale badge and excluded from high-confidence coverage if beyond policy.
- Illiquid or unpriced assets appear at their last supported value with a confidence qualifier, not as cash-equivalent runway.
- Data freshness is evaluated per input. “Portfolio updated” is insufficient when balances, prices, signer status, and forecasts have different clocks.
- On-chain finality and indexer latency are distinct. Store observed block, block time, indexed time, and confirmation policy.

## Risk model

Tideguard evaluates six independent surfaces:

1. **Market / peg:** price deviation, volatility, redemption confidence.
2. **Liquidity:** executable depth, withdrawal delays, lockups, gas/native-token availability.
3. **Issuer / counterparty:** reserve model, redemption terms, attestation recency, custody or exchange dependency.
4. **Chain / bridge:** canonical versus bridged representation, bridge validation, upgrade authority, pause and exit mechanisms.
5. **Protocol / contract:** audits are evidence, not guarantees; include admin, upgrade, oracle, collateral, and withdrawal dependencies.
6. **Operational control:** signer threshold, single points of failure, stale signers, allowlists, limits, and pending transactions.

Ethereum.org explicitly lists smart-contract, systemic, and counterparty risks for bridges. L2BEAT’s frameworks show why these dimensions should remain inspectable rather than compressed into one grade.

### Risk and uncertainty language

- **Critical:** an observed condition can block near-term obligations or violate a hard policy.
- **Attention:** the exposure is inside current operating capacity but outside a target or nearing a threshold.
- **Monitor:** no breach; evidence is aging or the buffer is narrowing.
- **Within policy:** current evidence supports the configured limit.
- **Unknown:** evidence is missing or too stale. Unknown is never rendered as green.

Tideguard uses “could,” “under this scenario,” and “based on the configured assumptions.” It does not predict a depeg, exploit, or loss probability.

## Stablecoin and reserve communication

Circle states that USDC is designed to be redeemable 1:1 and that it publishes monthly reserve attestations. Chainlink distinguishes periodic attestations from continuous proof-of-reserve mechanisms and describes circuit breakers based on reserve data.

**Product decisions changed:**

- distinguish issuer claim, attestation date, on-chain proof feed, and observed market price;
- never label an attestation “real-time reserves”;
- show stablecoin exposure by issuer and by representation/chain;
- scenario shocks are user-configured stresses, not forecasts;
- avoid claiming “cash equivalent” without the organization’s accounting policy and jurisdictional review.

## Wallet and security trust patterns

- Default onboarding is read-only address entry, CSV import, or scoped API connection.
- Tideguard never requests a seed phrase or private key.
- Connecting a wallet for identity, if added later, is separate from granting transaction authority.
- Any future execution flow must use clear, human-readable transaction effects, destination verification, simulation, and the existing custody approval path.
- Ethereum.org recommends reading transaction messages before signing and emphasizes irreversibility.
- Safe’s threshold model and Fireblocks’ policy engine support separation of duties and approval tiers.
- WalletConnect Verify describes verified, invalid, and unknown domain states but warns that domain verification is not bulletproof. Tideguard therefore treats it as one signal, not a guarantee.

## Regulatory, accounting, and compliance considerations

- MiCA is fully applicable in the EU and covers issuers, asset-referenced tokens, e-money tokens, and crypto-asset service providers. ESMA states that advice and portfolio management trigger suitability obligations. Tideguard avoids personalized investment recommendations in the first release and presents configurable treasury policy analysis.
- A read-only analytics tool must not imply custody, execution, exchange, transfer, or regulated advisory services. Jurisdictional review is required before adding any of those features.
- FATF’s Travel Rule applies to VASPs and financial institutions handling virtual-asset transfers. The 2025 update shows broad but incomplete implementation. If Tideguard later orchestrates transfers, counterparty and originator/beneficiary data handling becomes a material dependency.
- FASB ASU 2023-08 requires fair-value measurement for certain in-scope crypto assets, but not every asset or stablecoin automatically qualifies. Tideguard exposes accounting-policy configuration and does not present the risk valuation as the general ledger.
- Public blockchains make addresses and transactions visible. Organization labels, salary forecasts, counterparties, and internal policies are private business data. They require tenant isolation, least-privilege roles, encryption, retention controls, and an audit log.

## Visualization findings

Effective crypto treasury visualization should answer “what decision changes?”:

- Use a large but qualified runway metric paired with its stressed comparator.
- Show obligations and accessible liquidity on the same time axis.
- Use stacked bars for composition and concentration; do not use a rainbow donut as the only exact comparison.
- Use explicit dollar amounts and percentages together for risk exposure.
- Use direct labels and short addresses with copy affordances.
- Keep risk color semantic and redundant with icon/text.
- Show scenario inputs beside outputs so users can audit causality.
- Use bands or ranges for uncertainty; avoid falsely precise probability charts.
- Keep price return charts secondary because they are not the primary job.

## Positioning, monetization, acquisition, and GTM

### Position

**“Know how long your treasury can operate when crypto infrastructure fails.”**

Category: treasury resilience and control, between portfolio aggregation and enterprise custody/accounting.

Differentiation:

- obligation-aware rather than balance-only;
- risk-adjusted liquidity rather than mark-to-market wealth;
- transparent mechanisms rather than an opaque score;
- action packets that fit Safe / custody workflows rather than replacing them.

### Pricing hypothesis

Comparable enterprise finance products commonly use sales-led custom pricing, while smaller finance tools use fixed plans and free trials. Tideguard should combine both:

- **Observe — free:** one workspace, three addresses, current exposure snapshot, one saved scenario.
- **Control — $499/month:** 25 accounts, forecasts, policies, alerts, board brief, five seats.
- **Scale — $1,500/month:** 100 accounts, SSO, audit log, accounting/custody connectors, custom policy packs.
- **Enterprise — custom:** private deployment, data residency, SLA, advanced roles, procurement/security review.

Pricing is a hypothesis to test, not a market claim.

### Acquisition

1. Free, shareable “treasury stress check” using read-only addresses.
2. Partnerships with fractional CFOs, crypto accounting firms, Safe ecosystem providers, and payment platforms.
3. Incident-driven content: depeg and bridge postmortems translated into treasury controls.
4. Board-ready quarterly resilience benchmark using anonymized opt-in cohorts.
5. Targeted outbound to companies already using stablecoin payroll/AP or multiple Safe accounts.

### Activation and retention

- Activation occurs when the user connects/imports accounts, adds 90 days of obligations, runs a board stress, and assigns one control action.
- Retention comes from weekly exposure monitoring, monthly payment cycles, policy breaches, signer changes, and board/finance reporting.

## Sources

All sources accessed 2026-07-16.

1. **Safe Docs — Smart Account Concepts**  
   https://docs.safe.global/advanced/smart-account-concepts  
   Finding: accounts have owners, a configurable threshold, signature verification, and explicit transaction flow.  
   Decision: represent signer configuration and execution readiness as first-class risk inputs.

2. **Safe Docs — Safe Transaction Service API**  
   https://docs.safe.global/core-api/transaction-service-overview  
   Finding: the service tracks transactions, proposals, pending signatures, and confirmations.  
   Decision: future integrations can be read-only first and hand action packets to Safe.

3. **Safe Docs — Running the Safe Transaction Service**  
   https://docs.safe.global/core-api/api-safe-transaction-service  
   Finding: signatures can be collected off-chain until a threshold is met; decoded contract data can depend on external ABI sources and refresh jobs.  
   Decision: surface signature progress and decoding provenance/freshness.

4. **Fireblocks — Treasury Management**  
   https://www.fireblocks.com/products/treasury-management  
   Finding: institutional treasury workflows combine custody, granular policy, permissions, counterparties, automation, and transaction simulation.  
   Decision: Tideguard complements rather than replaces execution infrastructure.

5. **Fireblocks Developer Docs — What Is Fireblocks?**  
   https://developers.fireblocks.com/docs/what-is-fireblocks  
   Finding: policy rules can block, approve, or require signers by destination and workflow.  
   Decision: controls need explicit scope, condition, and required approval.

6. **Bitwave — Digital Asset Accounting Software**  
   https://www.bitwave.io/solutions/digital-asset-accounting-software  
   Finding: accounting buyers expect audit-ready records, reconciliation, rules, and ERP integration.  
   Decision: retain calculation lineage and treat accounting export as a roadmap integration.

7. **Bitwave Docs — Pricing Guide**  
   https://docs.bitwave.io/docs/pricing-guide  
   Finding: price methodology, source, timestamp, manual overrides, and failures are inspectable.  
   Decision: every valuation must expose source and failure state.

8. **Nansen API — Portfolio**  
   https://docs.nansen.ai/api/portfolio  
   Finding: complete portfolio value combines wallet balances and DeFi positions; protocol position types and debt are separate.  
   Decision: use a normalized position model, not token-balance-only aggregation.

9. **Nansen Academy — Labels & Watchlists 101**  
   https://academy.nansen.ai/articles/2149924-labels-and-watchlists-101  
   Finding: wallet labels reduce address ambiguity and follow a wallet across dashboards.  
   Decision: support organization labels while retaining raw address identity.

10. **Coin Metrics — Prices Methodology**  
    https://gitbook-docs.coinmetrics.io/market-data/methodologies/coin-metrics-prices-methodology  
    Finding: transparent reference rates use defined markets, frequencies, robust aggregation, exclusion rules, and publication timing.  
    Decision: distinguish methodology and observation time from display refresh time.

11. **DeFiLlama — Methodology**  
    https://docs.llama.fi/  
    Finding: protocol metrics depend on category definitions and token pricing sources.  
    Decision: disclose metric definitions and avoid treating TVL as liquid treasury value.

12. **Ethereum.org — Bridges**  
    https://ethereum.org/developers/docs/bridges/  
    Finding: bridges add smart-contract, systemic, counterparty, and open-ended operational risk; designs make different trust trade-offs.  
    Decision: bridged representations receive a separate liquidity and failure-path analysis.

13. **L2BEAT — Risk Rosette Framework**  
    https://forum.l2beat.com/t/the-risk-rosette-framework/292  
    Finding: risk dimensions are reviewed independently and mechanisms are described behind red/yellow/green summaries.  
    Decision: use inspectable surfaces and never let an aggregate status hide unknowns.

14. **Circle Docs — What Is USDC?**  
    https://developers.circle.com/stablecoins/what-is-usdc  
    Finding: Circle describes backing and redeemability and publishes monthly attestations.  
    Decision: show issuer claims, market observations, and attestation recency as different evidence.

15. **Chainlink — Proof of Reserve**  
    https://chain.link/proof-of-reserve  
    Finding: reserve data can be published on-chain and used for circuit breakers; continuous feeds differ from periodic reports.  
    Decision: model proof/attestation type and freshness, not a boolean “backed.”

16. **Ethereum.org — Security and Scam Prevention**  
    https://ethereum.org/security/  
    Finding: recovery phrases/private keys must never be shared, transactions are irreversible, and messages should be reviewed before signing.  
    Decision: read-only onboarding and explicit non-custodial copy are mandatory.

17. **WalletConnect Docs — Verify API**  
    https://docs.walletconnect.network/wallet-sdk/web/verify  
    Finding: domain verification can be valid, invalid, or unknown and is not bulletproof.  
    Decision: show unknown explicitly and never equate verification with safety.

18. **Ethereum Foundation — Clear Signing: Making Transaction Approvals Safer on Ethereum**  
    https://blog.ethereum.org/2026/05/12/clear-signing-announcement  
    Finding: human-readable, structured transaction effects are a security control against blind signing.  
    Decision: future execution handoffs must describe what moves, from where, to whom, and under which authority.

19. **FATF — 2025 Targeted Update on Virtual Assets and VASPs**  
    https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2025.html  
    Finding: Travel Rule adoption expanded but remains incomplete; stablecoin and DeFi risks remain supervisory priorities.  
    Decision: jurisdiction and provider status must be configurable; do not claim universal compliance.

20. **European Commission — Crypto-assets / MiCA**  
    https://finance.ec.europa.eu/digital-finance/crypto-assets_en  
    Finding: MiCA introduces organizational, operational, prudential, disclosure, and authorization requirements across issuers and service providers.  
    Decision: keep V1 analytics-only and require legal review before advice, custody, transfer, or execution.

21. **ESMA — MiCA Article 81**  
    https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-81-providing-advice-crypto-assets  
    Finding: crypto advice and portfolio management carry suitability and disclosure duties.  
    Decision: recommendations are framed as user-configured policy controls, not personalized investment advice.

22. **FASB — ASU 2023-08 announcement**  
    https://fasb.org/news-and-meetings/in-the-news/media-advisory-12-13-23-397718  
    Finding: certain in-scope crypto assets must be measured at fair value with changes in net income.  
    Decision: risk valuation is separate from ledger policy, with export/integration deferred.

23. **Artemis / Castle Island Ventures / Dragonfly — Stablecoin Payments from the Ground Up**  
    https://castleisland.vc/wp-content/uploads/2025/06/artemis-stablecoin-payments-from-the-ground-up-2025.pdf  
    Finding: bottom-up provider data distinguishes economic payment categories from raw transfer volume.  
    Decision: model obligations and payment categories; do not use total on-chain volume as product proof.

24. **Request Finance — Intro**  
    https://support.request.finance/  
    Finding: business users manage bills, salaries, expenses, batch payments, and audit records in one operating workflow.  
    Decision: orient Tideguard around the payment calendar and roles used by finance teams.

25. **Request Finance — November 2025 transparency report**  
    https://www.request.finance/post/request-finance-in-numbers-november-2025  
    Finding: vendor-reported activity is largely stablecoin business payments.  
    Decision: stablecoin operating liquidity is a credible focused entry point, while reported numbers are not reused as independent market facts.

26. **Coinshift Docs — Overview**  
    https://docs.coinshift.xyz/business/about-us/overview  
    Finding: treasury users value mass payments, payroll, multisig integration, insight, and transparency.  
    Decision: Tideguard focuses upstream of execution on the “is this safe and funded?” decision.

27. **Coinshift product notice**  
    https://beta.coinshift.xyz/  
    Finding: Coinshift Business was scheduled to sunset by 2026-03-31.  
    Decision: avoid an undifferentiated treasury super-app and minimize workflow replacement cost.

