# PRD — Signalbank / Stablecoin readiness desk

## 1. Thesis and positioning

Signalbank is a read-only decision workspace for crypto treasury teams managing on-chain operating cash. It answers: **“Can we keep or use this stablecoin balance for the next operating cycle, and what is the safest policy-compliant allocation if a risk signal changes?”**

It is positioned as the readiness layer between custody/exchange systems and a finance team’s cash policy. Its differentiated promise is a compact, attributable recommendation that combines issuer evidence, peg observations, chain representation, pool/venue exit capacity, and policy concentration — without presenting itself as an execution or compliance system.

## 2. Users and buying trigger

**Primary:** crypto-native finance lead responsible for runway, vendor/payment liquidity, and board explanations. **Secondary:** treasury operator who prepares a proposed allocation; controller/compliance reviewer who checks it.

Jobs: see what changed, know which exposure is material, compare a policy against the portfolio, model a conservative action, and retain an evidence record. Pains: data is fragmented, native/bridged tokens are easily confused, current quotes do not prove redemption capacity, and screenshots do not encode policy logic. Trigger: operating balances cross $1m, finance is multi-chain, or a depeg/venue/chain event turns a weekly review into an incident.

## 3. Scope and non-goals

**MVP scope:** manual CSV/address import; daily holdings snapshot; issuer/asset/chain representation normalization; composite quote and deviation; DEX and CEX route estimates; policy thresholds; alert feed; read-only scenario allocation; CSV/PDF-ready decision record; Slack/email alerts. This frontend demo implements the readiness overview, risk states, scenario controls, acknowledgement persistence, and provenance.

**Non-goals:** executing swaps/transfers, custody, key management, investment advice, guaranteed liquidity/redemption, tax accounting, or deciding legal/compliance eligibility. A risk flag is a prompt for review, not a trade recommendation.

## 4. Core workflows and acceptance criteria

### Daily readiness review

1. Finance lead opens Overview and sees total cash, policy posture, and clearly marked snapshot status.
2. They identify an alert, open the reason, inspect the constituent signal and source age.
3. They acknowledge the review; acknowledgement is attributed and time-stamped.

**Acceptance:** overview renders holdings, concentration, a peg trace, two alerts, and a source note; each sensitive metric has unit and as-of label; acknowledge state persists locally in the demo.

### Event response / scenario

1. Operator selects Normal, Peg drift, or Chain congestion scenario.
2. The product recomputes the readiness score, affected exposure, assumed exit cost, and a suggested split.
3. Operator can adjust USDC allocation with the range control and copy a text decision record.

**Acceptance:** scenario and allocation controls visibly update the recommendation, risk score, and record; copy control yields no transaction/custody claim; scenario is labelled seeded simulation.

### Production import and policy setup

1. Admin grants read-only access to a managed connector or uploads a signed CSV.
2. They map asset contract, issuer, chain, account, and representation; ambiguous assets are quarantined.
3. Admin sets per-issuer, per-chain, and per-venue limits; a reviewer approves policy publication.

**Acceptance:** no secret is retained client-side; ambiguous/native/bridged representation cannot auto-merge; all policy changes are immutable audit events.

## 5. Data, calculations, and entity model

Entities: `Organization`, `Portfolio`, `Account`, `HoldingSnapshot`, `Asset` (issuer, currency, mechanism), `TokenRepresentation` (chain ID, contract, native/bridged/canonical), `QuoteObservation`, `LiquidityRoute`, `ReserveDisclosure`, `Policy`, `PolicyLimit`, `RiskSignal`, `Scenario`, `DecisionRecord`.

Sources: on-chain balances from an RPC/indexer; canonical contract registry maintained by operations; composite quote provider such as CoinGecko; supply/chain distribution from DefiLlama; issuer disclosures from issuer sites; venue/pool depth from approved market-data sources. Store provider, endpoint/version, retrieval time, block number where available, and field-level confidence.

Calculations:

* Holding value = token balance × most recent usable quote; stale/missing quote is flagged, never zeroed.
* Peg deviation bps = `(quote / 1.0000 − 1) × 10,000`; display price and source count with it.
* Issuer/chain concentration = summed value ÷ eligible portfolio cash; compare against policy max.
* Exit capacity = conservative notional obtainable on approved routes within a configured slippage and time window; exclude unavailable or stale routes.
* Readiness = rule-based posture, not an investment grade: starts at 100, subtracts documented weighted signal bands. The UI exposes the inputs and labels it “policy posture,” not probability of loss.

Freshness defaults: price ≤60 seconds, routes ≤5 minutes, chain/indexer snapshot ≤15 minutes, issuer disclosure by its published cadence. Breach changes the state to stale/unknown. The demo uses frozen data stamped “16 Jul 2026 · 09:42 UTC.”

## 6. Security, privacy, compliance, and risk

Read-only first; no signing prompt for analytics; explicit wallet/account permission only; encrypted secrets in a server-side vault; least-privilege scopes; account and chain changes re-authorized; audit logs; organization-level RBAC; PII minimization and deletion controls. Treat injected wallet providers as untrusted per EIP-1193 security considerations.

Signalbank is not a VASP, broker, or compliance determination by default. If it later initiates transfers for customers, legal review must determine jurisdictional obligations, Travel Rule handling, sanctions screening, and record retention. Product language avoids “approved,” “safe,” or “guaranteed.”

## 7. Metrics and lifecycle

Onboarding: choose operating-cash objective → import/read-only connect → resolve representations → set policy → review first snapshot. Activation: at least one policy and one acknowledged snapshot within 7 days. Retention: weekly readiness review and alert-to-decision completion. Metrics: time to first policy, asset-resolution rate, weekly active review teams, % alerts with decision records, false-positive feedback, stale-source rate, and expansion to additional portfolios. Do not optimize clicks on risk alerts; optimize resolved, documented decisions.

## 8. GTM, packaging, and roadmap

Starter $299/month, Team $1,250/month, Enterprise annual (SSO/private data/audit/export). Launch with a stablecoin readiness assessment, treasury-operator partners, and a downloadable policy template; sales narrative: “Know whether on-chain cash is ready before the pressure event, not after.”

Dependencies: licensed/commercial data rights, reliable indexer/RPCs, canonical token registry, legal review, and alert delivery. Risks: data disagreement, false precision, issuer-status interpretation, integration security, and product being mistaken for execution advice. Post-demo: connector sandbox, rules builder, decision export, multi-approver review, provider status page, historical incident replay, and route-level execution simulation.
