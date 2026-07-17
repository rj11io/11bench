# PRD — Sentryline Treasury Control

## Product thesis and positioning

Sentryline is a read-only treasury-risk workspace for crypto-native finance teams. It turns multisig balances, stablecoin runway, counterparty concentration, and recent onchain activity into a weekly decision loop. Positioning: **the signer-ready control plane between raw onchain analytics and the spreadsheet close**. Differentiated promise: every important number has a time, source, confidence, and next action attached.

## Users and buying trigger

Primary: DAO finance leads, protocol CFOs/controllers, and crypto-startup finance managers managing 3–30 wallets or custodial accounts. Jobs: forecast spendable runway, enforce treasury policy, review exceptions, reconcile movements, and prepare evidence. Pain: fragmented chain views, stale prices, hidden counterparty dependencies, and approvals without context. Trigger: crossing a meaningful treasury size, adding a chain/venue, monthly close pain, or a near-miss.

Secondary: multisig signers, auditors, and advisors who need a scoped read-only review. They consume a brief, inspect evidence, and acknowledge exceptions.

## Scope

In: watch-only onboarding, treasury overview, runway policy, exposure breakdown, risk queue, activity/evidence table, saved filters, acknowledgement state, export-ready review surface, and seeded demo mode.

Out: signing transactions, custody, trading, personalized financial advice, tax filing, AML verdicts, guaranteed prices, automatic remediation, and arbitrary SQL authoring.

## Core workflows and requirements

1. **Weekly treasury review:** open Overview → see “safe to spend” runway → inspect the top risk exception → drill into evidence → acknowledge or leave open.
2. **Exposure review:** switch to Exposure → filter by asset/venue/chain → compare share and liquidity → open the largest concentration.
3. **Movement review:** switch to Activity → filter “Needs review” → inspect transaction hash, block/finality, source, and policy reason.
4. **Onboarding:** choose “Watch-only demo” or paste an address in production; never ask for private keys or seed phrases.

Acceptance criteria: a reviewer can identify spendable runway in under 30 seconds; each risk row has a severity, rationale, source, and action; demo data is visibly seeded; values show USD/token units and “as of”; the volatile state shows a stale-data banner; mobile has no horizontal overflow; acknowledgement persists locally.

## Data, calculations, and provenance

Production sources: direct RPC/indexer for balances and transaction state; oracle/market provider for prices; maintained address/contract registry for labels; optional accounting integration for obligations and burn. Each reading stores `source`, `retrievedAt`, `blockNumber`, `finality`, `rawAmount`, `decimals`, and `valuationPrice`.

Entity model: workspace, policy, account, chain, asset, balance, valuation, protocol exposure, transaction, alert, evidence, acknowledgement. Stablecoin runway = eligible stablecoin value − reserved obligations. Runway days = spendable value ÷ average monthly burn × 30.4. The demo uses plausible seeded fixtures, not live prices or balances.

## Trust, privacy, permissions, and compliance

Read-only by default; address ownership is not inferred. Explicitly distinguish a wallet label from a verified entity. Encrypt addresses and workspace data at rest; least-privilege roles (owner, editor, reviewer, viewer); immutable audit events for exports, policy changes, and acknowledgements; configurable retention; no seed phrase or signing capability. Surface provider outages, stale snapshots, reorg/finality state, and missing labels. The product supports evidence review but does not determine AML status or legal/regulatory obligations; launch requires jurisdiction-specific counsel and vendor DPAs.

## Onboarding, activation, retention, and analytics

Activation = first policy saved plus first risk acknowledged or first export. Retention = weekly review completed for four consecutive weeks. Track workspace created, addresses added, source freshness viewed, risk opened, alert acknowledged, filter saved, report exported, and invitation accepted. Avoid collecting unnecessary personal data. Success targets for an initial pilot: 80% of invited workspaces complete a first review, median first-review time under 10 minutes, and 50% weekly active review rate after month one.

## Packaging and GTM

Snapshot: free, one workspace, two watch-only addresses, 7-day history. Control: $299/workspace/month hypothesis, 30 addresses, policies, alerts, evidence export, 90-day history. Scale: $999/month hypothesis, 150 addresses, SSO, custom sources, retention controls, and support. Validate price against avoided close time and signer confidence, not asset value.

Launch motion: concierge design partners from crypto accounting/audit firms; publish a treasury health-check template; offer a signer-friendly weekly digest; use anonymized case studies; partner with multisig and accounting ecosystems. GTM line: “Before the next signature, know what is safe to spend, what moved, and what needs a second look.”

## Risks, dependencies, unknowns, roadmap

Risks: source disagreement, oracle latency, chain reorgs, address mislabeling, false-positive risk alerts, policy variance by jurisdiction, and users mistaking demo data for live data. Dependencies: indexer/RPC providers, market-data SLA, address registry, auth/SSO, audit-log storage, legal review. Unknowns: best default burn model, how teams define eligible stablecoins, acceptable false-positive rate, and demand for accounting integrations.

Post-demo: multi-chain connector health, policy builder, CSV/accounting import, Slack/email digests, saved evidence packs, source comparison, alert routing, and a full audit-log API.
