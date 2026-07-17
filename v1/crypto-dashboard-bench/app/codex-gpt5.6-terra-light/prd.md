# PRD — Northstar Treasury Pulse

## Thesis

Northstar is a read-only, policy-aware dashboard for a crypto company finance lead managing stablecoin runway across custodians, exchanges and wallets. It answers one recurring question: **“Is our next 90 days of operating cash sufficiently protected, and what requires a documented decision?”** Its differentiated promise is evidence-linked action—not an undifferentiated portfolio total.

## Users, job and trigger

Primary: finance/treasury lead at a 10–150-person crypto company. Secondary: CFO, controller, outside accountant and security reviewer. Job: assess deployable stablecoin cash, concentration and operational runway before weekly treasury review. Pains: fragmented addresses/venues, stale exports, unclear cash availability, silent policy breaches. Trigger: board pack, payroll, volatility incident, audit, or new custody/DeFi deployment.

## Scope and non-goals

MVP imports read-only balances/positions, normalizes USD estimates, surfaces a review queue, lets a permitted operator acknowledge/assign a finding, and produces a weekly snapshot. Non-goals: trading, custody, signing, advice, tax filing, sanctions screening, live prices, or a compliance conclusion.

## Core workflow and acceptance criteria

1. Operator views total protected runway, policy posture and an evidence timestamp.
2. Operator selects an alert to see concentration, risk rationale and source caveat.
3. Operator marks it reviewed or opens the volatile scenario; that local decision state persists.

Acceptance: demo labels every figure seeded; normal, volatile, focus, and empty states are reachable; no wallet connection is claimed; controls are keyboard usable; “reviewed” persists after reload; mobile has no horizontal overflow.

## Data, calculations and entities

Entities: Organization, Treasury, Account, Wallet, Chain, Asset, Position, Observation, Policy, Finding, Review. Connectors may include custody/exchange exports, wallet indexers, price providers and protocol data. Every observation records source, observed time, unit and coverage. `runway months = deployable stablecoin USD / trailing 30-day operating cash burn`; demo burn is $238k and is shown as an assumption. “Protected cash” excludes assets under a risk hold; this is a policy view, not legal advice. Production needs reconciliation states, FX conventions, idempotent ingest and price fallback logic.

## Security, privacy and compliance

Use OAuth/API keys scoped read-only, encrypt secrets, rotate credentials, isolate tenants, log data access, support SSO/MFA/RBAC and never collect seed phrases. Wallet addresses may be personal data in context; minimize retention and offer export/deletion controls. Policy flags help human review; they do not make AML, sanctions, Travel Rule, investment, custody or regulatory determinations. Obtain jurisdiction-specific counsel before product launch.

## Onboarding, metrics and GTM

Onboarding: create entity → import sample/CSV or authorize a read-only source → map accounts → choose a cash policy → finish first review. Activation: first entity + one reviewed finding within 24h. Retention: weekly active reviewer, review completion, stale-data resolution, recurring snapshot exports. Metrics: time-to-first-review, coverage %, protected runway change, alert-to-decision time; never optimize for assets “traded.” Pricing: free assessment, $750/month Team, enterprise controls/connectors. GTM: accountant/fractional-CFO partners and a “stablecoin runway review” content loop.

## Risks / roadmap

Risks: incomplete chain coverage, price disagreement, false precision, legal interpretation, connector failure and alert fatigue. Dependencies: licensed data sources, custody/exchange connector permissions and security review. Roadmap: CSV import and policy templates → verified connectors/reconciliation → approval evidence/board export → role-based alerts and custom controls.
