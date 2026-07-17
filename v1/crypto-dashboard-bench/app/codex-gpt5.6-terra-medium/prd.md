# PRD — Harbor

## Thesis and positioning

Harbor is a non-custodial treasury risk cockpit for crypto-native finance teams with DeFi borrowing. It converts a wallet/protocol snapshot into a policy-relative risk explanation and a reviewable action draft. It is not an execution terminal, custody provider, universal portfolio tracker, tax tool, or investment adviser.

**Promise:** Know which exposure needs an owner today, the assumptions behind that conclusion, and the smallest policy-aligned action to review.

## Users and jobs

Primary: treasury operator at a foundation/protocol with multiple addresses and collateralized borrowing. Secondary: finance lead approving risk actions; security/ops reviewer. Trigger: a volatile market, concentration breach, new borrow, governance parameter change, or upcoming weekly treasury review.

Jobs: monitor policy buffers; understand the driver and evidence; compare a bounded set of scenarios; draft a repay/add-collateral/reduce-risk action; assign/approve/record the decision. Pains: fragmented wallet data, ambiguous “health” labels, stale dashboards, and emergency actions without audit context.

## Scope and workflow

1. Connect/import public addresses in read-only mode; label them and select markets.
2. Set a team policy buffer and escalation rules.
3. View the prioritized Risk Queue, with source age and evidence status.
4. Open a position, inspect protocol values/assumptions, and run named price-shock scenarios.
5. Draft a suggested action, edit owner/amount/rationale, then send to an approval workflow or external execution system.

Demo scope: seeded data for one Aave-style ETH/USDC position; interactive normal/volatile/risk states; scenario selector; action-draft persistence. No wallet connection or transaction is made.

## Requirements and acceptance criteria

- Risk queue ranks exposures by policy buffer and explains a driver in plain language.
- Position panel displays health factor, liquidation threshold/protocol context, source timestamps, and “seeded demo” status.
- Scenario changes recalculate displayed simulated health factor/buffer and clearly say it is illustrative.
- A user can create, mark reviewed, and persist an action draft in localStorage; no signing or sending controls exist.
- Empty, volatile, and critical states are available and conveyed by text, shape and color.
- Responsive UI works at 375px and 1440px without horizontal overflow; keyboard controls have visible focus labels.

## Production data, calculations, and entity model

Inputs: chain indexer/RPC balances and events; protocol contract/indexer state; protocol/oracle values and parameters; independent market-data source for context; entity/address labels. Freshness target: chain position <60s, protocol parameters per block/event, market context <30s during active monitoring. Cache only with observed-at/source/block. On a failed or stale source, suppress computed recommendations and show “needs refresh.”

`Position = wallet + protocolMarket + suppliedAssets + borrowedAssets + parameterSnapshot + observations`. Compute protocol-specific health factor from canonical position/oracle data; calculate policy buffer as `HF − policy target`; scenario results are isolated simulations with their explicit shock assumptions. Do not blend a third-party spot price into a protocol liquidation calculation.

## Security, privacy, compliance

Read-only public-address access precedes optional integrations. Never collect seed phrases, private keys, or signing credentials. Production needs RBAC (viewer/operator/approver/admin), least-privilege API tokens, encryption, audit logs, approval evidence, session controls, export/deletion and vendor review. Transaction execution remains in the user’s established wallet/SAFE flow with human-readable simulation and explicit confirmation. This analytics product must not represent itself as custody, brokerage, advice, or a compliance guarantee; obtain counsel for VASP/Travel Rule, sanctions, privacy and local rules before launching integrations.

## Metrics, packaging and GTM

Activation: imported address, selected market, policy set, first review completed. Leading metrics: time-to-first-risk-review, percentage of alerts acknowledged with rationale, weekly active reviewing organizations, action-draft completion. Outcome metrics: policy breaches detected before the team’s escalation window and operator-reported decision confidence (not return/performance). Pricing hypothesis: Free monitor, $299/month Team, annual Enterprise. Launch with design partners managing live DeFi credit, a useful public calculator, Safe/treasury consultants, and lending-protocol ecosystem education.

## Risks and roadmap

Risks: incomplete address attribution, indexer/oracle lag, protocol upgrades, false confidence, unclear regulatory perimeter and alert fatigue. Dependencies: reliable chain/protocol data, identity/SSO, notifications and audit store. Validate willingness to pay and action handoff with ten design partners. Next: multi-market policy aggregation, Safe transaction-builder export, Slack/Jira approvals, simulation parameter import, and evidence export.
