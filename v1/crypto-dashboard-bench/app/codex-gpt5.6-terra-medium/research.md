# Research — Harbor Treasury Risk Cockpit

Accessed 2026-07-16. Harbor is a proposed non-custodial operations product; all product claims below are hypotheses unless the cited source says otherwise.

| Source | Finding | Decision changed |
|---|---|---|
| [Aave: Health Factor & Liquidations](https://aave.com/help/borrowing/liquidations) | Health factor is `(collateral value × weighted liquidation threshold) / borrow value`; below 1 is liquidatable. It moves with collateral and debt prices, and no universal safe value exists. | Make health factor and distance-to-policy-buffer the central decision metric, never label it “safe” in isolation. |
| [Aave: Toggle Collateral Status](https://aave.com/help/supplying/toggle-collateral-status) | LTV and liquidation threshold are governance-set parameters; collateral status changes require an on-chain action. | Preserve protocol/version/parameter provenance and distinguish “draft action” from a submitted transaction. |
| [Aave governance: V4 liquidation engine](https://governance.aave.com/t/overview-of-aave-v4-s-liquidation-engine/23531) | Liquidation mechanics/parameters can vary by version and market; a target health factor and liquidation bonus influence outcomes. | Never hard-code an execution recommendation as universal; show assumptions, uncertainty, and a manual approval gate. |
| [CoinGecko API introduction](https://docs.coingecko.com/) | Market data providers cover price, metadata, historical data and delivery methods, but access and endpoints can vary by plan. | A production system needs source labels, field-level freshness and an explicit “stale/unknown” state, not a single fake-live timestamp. |
| [CoinGecko endpoint overview](https://docs.coingecko.com/reference/endpoint-overview) | Some endpoint availability is plan-specific. | Keep the demo seeded; production architecture should degrade gracefully when a source/feed is unavailable. |
| [ethereum.org: security and scam prevention](https://ethereum.org/security/) | Recovery phrases/private keys are master credentials; legitimate services do not request them; hardware wallets keep keys offline. | Harbor never asks for seed phrases or private keys, requests read-only address import first, and requires clear transaction review at handoff. |
| [FATF Recommendation 16 update](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html) | FATF updated payment-transparency standards in June 2025, including the virtual-asset “Travel Rule” context. | Position as analytics and approvals, not a transfer service; enterprise integrations require jurisdictional counsel, audit trails, and vendor assessment. |

## Segments, jobs, and category conventions

Retail holders mainly need aggregation and tax history; active traders need execution latency and order/position tooling; protocol operators need market and governance monitoring. The selected buyer is a small crypto-native treasury/finance team (DAO foundation, protocol company, or venture-backed on-chain business) with several wallets and a live lending position. Their recurring decision is whether to add collateral, repay debt, reduce leverage, or intentionally accept risk before market volatility and governance changes make the choice urgent.

Representative conventions include portfolio aggregation, wallet labeling, P&L, alerting, transaction history, lending health factors, market charts, and protocol parameter views. The gap is operational context: teams often see a health factor but not an auditable, policy-relative explanation with a proposed, reviewable remedy. Harbor uses a runbook rather than another universal price screen.

## Data model and risk semantics

Core entities: organization, member/role, policy, wallet/address, chain, protocol-market, position, asset, price observation, risk parameter observation, action draft, approval, alert, and evidence snapshot. A position links supplied collateral and borrow balances to a market and the parameter/version snapshot used for calculation. Prices carry source, observed-at, quote currency, confidence/quality and stale status. Protocol facts carry block number, chain, contract/market identifier and fetched-at.

Production calculations use provider/oracle values appropriate to the protocol, not a UI market price: health factor, liquidation buffer, collateral concentration, stablecoin depeg stress, and price shock scenarios. USD conversion, rounding, missing prices, delayed blocks, liquidity depth, oracle deviation and parameter changes are visible assumptions. “At risk” means below the team’s chosen buffer; it is not a prediction of liquidation or investment advice.

## Trust, compliance, visual practice, and GTM

The product is read-only by default, supports address-first onboarding, keeps keys out of scope, and treats action creation as a human-review artifact. RBAC, immutable event logs, consented address access, encryption, data retention controls, screening/integration review and jurisdiction-specific legal advice are prerequisites for enterprise deployment. Financial displays should pair a headline with unit, time basis, source, and change driver; risk color needs text/icon redundancy and thresholds must be disclosed.

Positioning: “turn lending risk into an approved next action.” Pricing hypothesis: free single-wallet monitoring; Team at $299/month for policy/runbooks/Slack; Enterprise annual contract for SSO, audit exports and data residency. Acquire via treasury operators, Safe/DAO service providers, lending protocol partners and a public “health buffer” calculator. Activation is first wallet import + policy + runbook; retention is weekly risk review and alerts that lead to a documented decision.
