# Research — Cairn Treasury Control Room

**Access date for all sources below:** 2026-07-16. This is product research for a demo and a production hypothesis; it is not investment, legal, tax, or custody advice.

## Executive decision

The strongest wedge is a **read-only treasury control room for protocol / DAO finance leads**. The recurring job is not “see my coins”; it is “know whether we can fund the next 6–18 months, understand what changed, and prepare a defensible decision for signers or a finance committee.”

Cairn therefore focuses on one decision loop:

> Observe treasury state → detect policy or liquidity drift → stress the decision → share an evidence-backed brief.

This is narrower than a universal portfolio tracker and more defensible than a generic on-chain analytics wall. It combines portfolio accounting conventions with explicit policy, runway, data freshness, and evidence semantics.

## Users, jobs, and recurring decisions

| Segment | Job to be done | Recurring decision | Trigger / buyer signal |
| --- | --- | --- | --- |
| Protocol / DAO finance lead (primary) | Keep spendable capital above a policy floor and explain treasury health to a multisig or governance group | Rebalance stable reserves, reduce concentration, approve or defer an outflow | Token drawdown, unlock, grant cycle, payroll date, monthly reporting |
| Crypto startup CFO / operations lead (secondary) | Translate mixed wallets, exchange balances, and token grants into runway | How much can be sold, hedged, or reserved without breaking the plan? | Fundraise, payroll risk, exchange / custodian change, audit request |
| Multisig signer / investment committee member | Review a proposed action with enough context to sign safely | Is this request within policy and supported by current evidence? | Pending Safe transaction, exception alert, governance vote |
| Treasury advisor / accountant | Reconcile holdings and produce a repeatable monthly brief | Which balances are missing, stale, or unsupported by provenance? | New client onboarding, quarter-end, audit / board pack |

The primary user is a lean team member who already uses Safe, spreadsheets, block explorers, a market-data provider, and chat. Their pain is the handoff between those tools: balances are visible, but the decision context is not.

## Representative products and category conventions

### Portfolio and accounting

- **rotki** establishes a strong baseline for self-custody-friendly portfolio software: aggregate balances across chains, exchanges, and manual entries; filter by chain; show location, price, amount, value, and percent of net value; save snapshots locally; and flag unrecognized assets. This changed Cairn’s design toward an explicit location / custody column, snapshot timestamps, unknown states, and a provenance ledger instead of a single “balance” number.
- **CoinTracker** shows the consumer and accountant expectation: unified portfolio value, transaction history, daily updates, performance by asset, reports, and a paid tier for complex workflows and support. This changed packaging toward a monthly product with a report / shareable brief, but Cairn does not make tax claims or pretend to be a tax system.

### On-chain intelligence

- **Nansen** exposes current balances, historical balances, transactions, labels, counterparties, and derived portfolio metrics. The category convention is to begin with an address / entity and progressively drill into behavior. Cairn adopts address-level evidence and transaction drill-down, but moves the “so what?” up a level: policy exceptions and runway impact first.
- **Dune** makes the pipeline distinction explicit: raw blockchain data, decoded data, curated tables, and community data have different freshness and reliability characteristics. Decoded data is generally 15–60 seconds after raw ingestion, while curated data is typically scheduled hourly, and some chain datasets run on longer schedules. This changed Cairn’s UI to show “as of,” source, age, and confidence on every decision-relevant number.

### Treasury and safety rails

- **TreasureCorp** positions treasury intelligence around asset allocation, revenue, runway, governance, scenario analysis, proposal impact, and reporting. This validates the product category but also raises the bar: a treasury dashboard must connect projections to concrete decisions, not simply repeat a portfolio chart.
- **Built By DAO** publishes a treasury model with explicit per-proposal, daily, monthly, and reserve-floor limits. This changed Cairn’s risk language from vague “health scores” to named policies such as “stable reserve floor,” “max volatile concentration,” and “monthly outflow limit.”
- **Safe** documents modules for whitelists, rate limits, spending caps, allowances, and recurring transactions, plus a Transaction Service for off-chain signatures and confirmations. This changed the demo’s trust posture: it is an observability and preparation layer, not an execution surface; production integrations should stay read-only unless a separate approval flow is deliberately added.

## Data model and provenance

The minimum production entity model is:

| Entity | Key fields | Why it matters |
| --- | --- | --- |
| `Asset` | canonical id, symbol, chain, contract, decimals, classification | Avoid symbol collisions and ambiguous token identity |
| `Position` | wallet / venue, asset, quantity, value, custody type, block, observed_at | Make location and observation time first-class |
| `MarketSnapshot` | asset, price, volume, liquidity, source, source_timestamp, retrieved_at | Separate market time from product time; support stale / thin-market states |
| `Wallet` | address, chain, label, signer / Safe metadata, read_only_scope | Never require a private key; distinguish EOA, Safe, exchange, and manual entries |
| `Cashflow` | period, asset / fiat, inflow or outflow, category, recurrence, source, confidence | Runway is a cashflow model, not just a price chart |
| `TreasuryPolicy` | stable floor, reserve floor, concentration cap, monthly outflow cap, approver | Convert “risk” into inspectable rules |
| `RiskObservation` | type, severity, evidence ids, observed_at, status, owner | Every alert should be explainable and dismissible with an audit trail |
| `Snapshot` | generated_at, inputs, calculation version, notes | Make board / governance reporting reproducible |

### Calculation assumptions

- **Net asset value:** sum of `quantity × market_snapshot.price` for recognized positions. Unsupported tokens are shown separately and excluded from “covered NAV” until classified.
- **Liquid capital:** cash-like assets and approved venues, optionally plus a liquidity haircut for assets that meet a configured volume / depth threshold. A production UI must show the haircut, not hide it.
- **Runway:** `liquid capital / expected monthly net burn`. Base, upside, and stress cases use separate cashflow assumptions. A runway number is a model output, not a promise.
- **Concentration:** largest position or policy bucket divided by covered NAV. Stablecoin issuer and venue concentration should be separate dimensions.
- **Stress:** price shocks, unlock / vesting events, scheduled outflows, and liquidity haircuts are scenario inputs. Outputs must show which inputs changed.
- **Freshness:** label a value with source timestamp and retrieval timestamp. “Live” means an actual live feed; seeded demo values are never called live.

## Volatility, liquidity, uncertainty, and visualization

Crypto dashboards overuse green/red 24-hour change as a proxy for risk. That is insufficient for treasury decisions because price volatility, liquidation depth, counterparty exposure, smart-contract risk, stablecoin risk, and data freshness are different axes.

Cairn uses:

- a **line chart** for NAV / runway history with explicit time ranges and “seeded scenario” labeling;
- a **stacked exposure bar** for part-to-whole allocation, paired with a sortable table for exact values;
- **threshold markers** for reserve floors and concentration caps;
- **stress comparison** for Base, ETH −30%, and volatile-token −50% scenarios;
- **risk states** of `clear`, `watch`, and `action` with text labels, icons, and color redundancy;
- **source / age chips** at the point of use rather than a footnote detached from the number;
- compact money formatting (`$4.84M`, `$342k / mo`) with a clear USD unit, and precise amounts only in drill-down.

The visual system must never imply portfolio profit, execution certainty, or live connectivity. It should make uncertainty legible: `estimated`, `stale`, `unclassified`, and `policy-derived` are valid states.

## Wallet, security, privacy, and compliance

Ethereum’s account model makes the trust boundary clear: private keys authorize transactions; a wallet is an interface to an account. Ethereum’s security guidance says recovery phrases and private keys must never be shared and recommends hardware wallets and bounded spend permissions. Cairn must therefore:

1. accept public addresses, xpubs where appropriate, CSVs, and read-only APIs only;
2. never ask for a seed phrase, private key, or unrestricted exchange key;
3. show the scope of every connected source and let an owner revoke it;
4. separate observation from execution, with no “rebalance now” button that silently signs;
5. preserve a source-level audit trail, data deletion controls, and exportability;
6. flag unsupported, unverified, thin-liquidity, or stale assets instead of guessing.

Regulation is jurisdiction- and activity-dependent. EU MiCA requires crypto-asset service providers to act honestly, provide clear risk information, manage conflicts, safeguard data, and keep records; UK FCA guidance brings cryptoasset financial promotions within the financial promotions regime and continues to describe crypto as high risk. FATF emphasizes risk identification, mitigation, and Travel Rule compliance for relevant VASPs. Cairn should remain an analytics / reporting product, avoid custody or execution in the initial scope, avoid personalized investment recommendations, and route legal / tax / AML questions to qualified professionals.

## Positioning, monetization, and GTM

**Positioning:** “Cairn is the read-only treasury control room that turns scattered wallets, market data, and policy rules into a decision-ready brief.”

**Differentiated promise:** every alert answers three questions in one place: what changed, which policy or runway assumption it threatens, and what evidence a signer should inspect.

**Monetization hypothesis:**

- Free: one workspace, five public addresses, 30-day snapshots, and a weekly pulse preview.
- Team: `$299 / month` hypothesis for 10 wallets, policy rules, daily snapshots, exports, and 5 seats.
- Treasury: `$799 / month` hypothesis for 50 wallets, multiple Safes / venues, scenario packs, monthly reporting, and 15 seats.
- Advisor / enterprise: custom pricing for white-label reports, SSO, retention controls, and data residency.

These are hypotheses to test with willingness-to-pay interviews; they are not market facts.

**Launch motion:** recruit 10 protocol foundations, DAO finance leads, and treasury advisors as design partners. Start with public addresses and CSV import, ship a weekly “Treasury Pulse” report as the acquisition artifact, and build integrations only after measuring which source combinations create activation. Partner distribution should target Safe / governance communities, protocol ops newsletters, crypto accounting firms, and risk / security consultants.

**GTM narrative:** “Know your runway before the market makes the decision for you.” The proof point is not a higher return; it is a faster, more defensible treasury review with fewer stale or unexplained numbers.

## Sources and decisions changed

| Source | URL | Finding | Decision changed |
| --- | --- | --- | --- |
| CoinGecko API — Introduction | https://docs.coingecko.com/ | Market data, historical data, on-chain data, and multiple delivery methods are separate product surfaces. | Use provider adapters; do not collapse spot, on-chain, and historical data into one freshness claim. |
| CoinGecko API — Data Delivery Methods | https://docs.coingecko.com/docs/data-delivery-methods | REST suits scheduled portfolio valuation; WebSocket suits true live dashboards; webhooks are event-driven. | Demo uses seeded snapshots; production defaults to scheduled snapshots unless a real streaming contract exists. |
| CoinGecko API — Portfolio Tracking | https://docs.coingecko.com/docs/portfolio-tracking | Portfolio workflows need spot price, historical snapshots, cost basis, multi-currency, and charts. | Add timestamped valuation and time-range controls; keep cost basis out of the first treasury wedge. |
| CoinGecko API — Compliance & Reporting | https://docs.coingecko.com/docs/compliance-reporting | Historical data is timestamped; `last_updated_at` is an audit timestamp; OHLC can support volatility reporting. | Show source timestamp and distinguish market snapshot from retrieval time. |
| Dune Docs — Data Freshness | https://docs.dune.com/data-catalog/data-freshness | Raw, decoded, curated, and community data have different update schedules; decoded data can take 15–60 seconds and curated data is commonly hourly. | Add source / age / confidence semantics and avoid “real-time” copy for derived data. |
| rotki Docs — Dashboard | https://docs.rotki.com/usage-guides/portfolio/dashboard.html | Aggregated holdings use location, price, amount, value, and percent of net value; snapshots and errors are visible. | Use a table as the exact source of truth beneath summary visualizations. |
| rotki Docs — Tracking Accounts | https://docs.rotki.com/latest/usage-guides/portfolio/accounts.html | Chain filters, xpub read-only discovery, ENS labels, and aggregated/per-chain views are common. | Support public / read-only onboarding language and address-level drill-down. |
| Nansen API — Overview | https://docs.nansen.ai/api/overview | Wallet profiler flows from current balances to historical balances, transactions, labels, and counterparties. | Make evidence drill-down address-centric and show entity labels as context, not as “alpha.” |
| TreasureCorp — Treasury product | https://www.treasurecorp.io/ | Treasury products combine allocation, revenue, runway, scenario analysis, governance, and reporting. | Choose treasury decision intelligence as the wedge and make scenario / report workflows core. |
| Built By DAO — Treasury | https://docs.builtbydao.com/governance/treasury | Treasury policies can be expressed as reserve floors and per-proposal / daily / monthly limits. | Use named policy thresholds and exception states rather than an unexplained health score. |
| Safe Docs — Modules | https://docs.safe.global/advanced/smart-account-modules | Whitelists, rate limits, spending caps, allowances, and recurring transactions are safety primitives; modules are security-sensitive. | Keep demo read-only and show policy context before execution would ever be considered. |
| Safe Docs — Transaction Service | https://docs.safe.global/core-api/api-safe-transaction-service | Safe supports off-chain signature collection and confirmation tracking; decoding has its own periodic freshness. | Add pending-action / signer context to the information architecture, without pretending to sign. |
| ethereum.org — Accounts | https://ethereum.org/developers/docs/accounts | Private keys authorize actions; accounts and wallets are distinct. | Never request credentials; represent custody and address scope explicitly. |
| ethereum.org — Security | https://ethereum.org/security/ | Never share seed phrases; hardware wallets and bounded spend limits reduce risk. | Use read-only, hardware-safe, limited-permission defaults and visible safety copy. |
| FATF — Targeted Update on VAs / VASPs | https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2024.html | Relevant providers need risk identification, mitigation, and continued Travel Rule work. | Keep AML / compliance claims scoped; support evidence export rather than claiming compliance. |
| EUR-Lex — MiCA Regulation (EU) 2023/1114 | https://eur-lex.europa.eu/eli/reg/2023/1114/oj | CASPs face conduct, risk, data, recordkeeping, custody, and client-information obligations. | Keep Cairn outside custody / execution in v1 and state jurisdictional limits. |
| FCA — Cryptoasset financial promotions | https://www.fca.org.uk/firms/cryptoasset-financial-promotions-and-fiat-crypto-ramp-services | UK cryptoasset promotions are regulated; partnering with unregistered firms can create risk. | Avoid return promises and review GTM copy with counsel before UK consumer marketing. |
| CoinTracker — Enterprise pricing | https://support.cointracker.io/hc/en-us/articles/29048156908305-CoinTracker-Enterprise-plan-pricing | Complex crypto workflows monetize on seats, transaction scale, reporting, integrations, support, and account management. | Use seat / wallet / reporting tiers instead of a token-value fee. |

