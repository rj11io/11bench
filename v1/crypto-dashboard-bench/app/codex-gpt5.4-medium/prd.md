# PRD: Sentinel Treasury

## 1. Product thesis

Sentinel Treasury is a **stablecoin treasury risk cockpit** for crypto-native finance teams. It helps operators decide whether treasury cash-equivalents remain safe, liquid, policy-compliant, and ready for operational obligations across issuers, chains, wallets, and venues.

### Category

Crypto treasury and risk operations software.

### Positioning

Not a portfolio tracker.
Not a custody wallet.
Not a compliance system of record.

Sentinel is the layer that turns fragmented crypto treasury exposure into a daily operating decision:

**"Are we still inside policy, and what should we do now?"**

### Differentiated promise

Sentinel translates crypto-specific cash risk into finance-readable operating controls:

- issuer concentration
- reserve transparency quality
- venue/counterparty concentration
- chain and bridge fragmentation
- redeemability confidence
- action-oriented incident workflows

## 2. Users

### Primary user

Treasury operator, controller, or finance lead at:

- crypto-native fintechs
- exchanges and brokers
- market makers
- DAO foundations
- stablecoin-heavy payment or settlement teams

### Secondary users

- CFO / VP Finance
- legal and compliance lead
- operations lead
- security/custody admin

### Jobs to be done

- Know what portion of treasury is truly liquid now.
- Detect when one issuer, venue, or chain is becoming too large.
- Understand whether "cash" is actually redeemable, transferable, or trapped.
- Respond to volatility or incident states with a documented action plan.
- Explain treasury posture to leadership without requiring them to parse on-chain detail.

### Pains

- Treasury sits across wallets, exchanges, chains, and protocols.
- Stablecoins are not risk-equivalent.
- Wallet connection, token approvals, and custody controls are easy to confuse.
- Market hours are 24/7, but treasury teams still need explicit operating policies.
- Existing tools are often either too custody-centric or too investor-centric.

### Buying trigger

The likely trigger is not "we need prettier charts." It is one of:

- treasury balances become material enough that informal spreadsheets stop being acceptable;
- finance leadership demands auditable treasury controls;
- a prior depeg, venue outage, or sanctions scare exposes current process weakness;
- the company starts using stablecoins for payroll, vendor payments, or settlement.

## 3. Product scope

### In-scope for v1

- multivariate treasury overview using seeded demo data
- scenario-based monitoring: normal, volatile, incident, onboarding empty state
- issuer exposure analysis
- chain allocation analysis
- venue/counterparty concentration analysis
- policy thresholds and breach detection
- action queue with local persistence
- explicit provenance and demo/live disclaimers
- trust-boundary guidance about permissions and approvals

### Non-goals

- live wallet connection
- live balances or real-time price feeds
- trading execution
- redemption execution
- compliance screening integrations
- accounting exports
- generalized portfolio analytics for retail users

## 4. Core workflow

### Primary workflow

1. Open the command view.
2. Review treasury health metrics and current scenario banner.
3. Inspect unresolved risks ranked by severity.
4. Review recommended rebalance/containment actions.
5. Drill into exposures by issuer, venue, and chain.
6. Adjust internal thresholds to model policy posture.
7. Mark actions and acknowledgements, with state persisting locally.

### Acceptance criteria

- User can switch between at least four states: normal, stress, incident, empty.
- User can view top-line metrics, risks, actions, and event tape without scrolling horizontally on mobile.
- User can inspect issuer, chain, and venue exposures separately.
- User can change policy thresholds and immediately see resulting breach counts.
- User can acknowledge risks and complete actions; state persists in `localStorage`.
- Product clearly communicates that data is seeded demo data and not live.

## 5. Functional requirements

### Dashboard summary

- Show 4 top metrics only.
- Each metric includes a number, directional context, and a short interpretation.
- Metrics must favor risk and liquidity, not speculative return.

### Risk queue

- Each risk includes severity, signal, description, and impact.
- Risks can be acknowledged.
- Unacknowledged high-severity items count toward a visible queue score.

### Action queue

- Actions include owner, ETA, action type, and expected effect.
- Actions can be marked complete.
- Completion contributes to a visible progress indicator.

### Exposure drill-down

- Issuer view shows concentration share, reserve confidence proxy, and redeemability semantics.
- Chain view shows allocation, operational role, and chain-specific risk note.
- Venue view shows share, role, amount, and status text.

### Policy controls

- Controls expose:
  - max issuer share
  - minimum reserve score
  - max venue share
- Changes recalculate breach counts immediately.

### Provenance and trust communication

- Every page state must show that balances are seeded.
- Product must explicitly say that liquidity labels are internal confidence, not guarantees.
- Product must distinguish wallet connection from token approvals.

## 6. Data sources and freshness assumptions

### Demo assumptions

The demo uses seeded data only.

It models how production data would be derived from:

- custody balances
- venue balances
- wallet balances
- on-chain stablecoin positions
- issuer reserve/transparency pages
- chain liquidity and stablecoin distribution datasets
- internal policy rules

### Production data source assumptions

- issuer reserve/provenance: public issuer disclosure pages such as Circle transparency pages
- stablecoin/chain context: public datasets such as DefiLlama
- wallet and venue balances: custody/venue APIs and internal treasury systems
- compliance context: screening and internal policy systems

### Freshness assumptions

- custody and venue balances: near real-time to hourly in production
- reserve transparency: as published by issuers; often daily to weekly depending on issuer
- chain and market context: hourly or better
- compliance status: event-driven plus periodic refresh

### Calculations

- issuer concentration = issuer notional / total treasury NAV
- venue concentration = venue notional / total treasury NAV
- liquid in 15 min = balances internally classified as immediately transferable or redeemable under current confidence assumptions
- reserve score = internal qualitative/quantitative score derived from reserve disclosure quality, attestation cadence, redeemability path, and incident flags

## 7. Entity model

- Treasury
- Asset
- Issuer
- Chain
- Wallet
- Venue / Counterparty
- Exposure snapshot
- Policy rule
- Risk alert
- Action item
- Flow event
- Provenance source

## 8. Security, privacy, permissions, and compliance requirements

### Wallet and permissions

- Product must never imply that a simple wallet connection means spend permissions were granted.
- Token approvals and wallet connections must be treated as separate risk concepts.
- High-risk actions in production would require explicit operator confirmation and role checks.

### Privacy

- Demo stores only local UI state in browser `localStorage`.
- No credentials, wallet secrets, or third-party access tokens are required.

### Permissions

- Production product would require role-based access:
  - viewer
  - operator
  - approver
  - admin

### Compliance

- Must support auditability of policy changes and incident acknowledgements.
- Must support sanctions/compliance-aware workflows in production.
- Must preserve provenance and timestamping for treasury decisions.
- Must never overstate certainty or live monitoring coverage.

## 9. Onboarding and activation

### Onboarding hypothesis

Activation occurs when a treasury team:

1. configures policy thresholds,
2. maps primary custody plus at least one backup rail,
3. sees its first actionable exposure breach or passes its first daily review with confidence.

### Empty-state goals

- Teach the user what inputs are required.
- Make trust boundaries explicit before any capital is connected.
- Show that "no data" is safer than fake confidence.

## 10. Retention loop

The retention loop is daily or event-driven:

1. open Sentinel during treasury review;
2. verify liquidity posture;
3. resolve or acknowledge exceptions;
4. document action taken;
5. return during volatility, settlement windows, and close processes.

## 11. Success metrics and analytics

### Product metrics

- weekly active treasury workspaces
- daily command-view opens per workspace
- risk acknowledgement completion rate
- action completion rate
- time from breach detection to acknowledgement
- time from breach detection to contained state

### Commercial metrics

- demo-to-pilot conversion rate
- pilot-to-paid conversion rate
- average seats per workspace
- expansion into compliance/finance viewers

## 12. Packaging and pricing hypothesis

### Packaging

- Core: treasury visibility and policy monitoring
- Pro: multi-entity workspaces, role-based approvals, audit logs
- Enterprise: SSO, API access, compliance integrations, custom reporting

### Pricing hypothesis

- annual SaaS contract
- priced by legal entity/workspace plus seats
- enterprise feature gates for audit/compliance workflow

This aligns better with treasury buyers than retail subscription models.

## 13. GTM narrative

### Launch story

"Your stablecoins are not one cash bucket. They carry issuer, venue, chain, and permissions risk. Sentinel tells your finance team what is actually safe, liquid, and inside policy before the next incident tests it."

### Initial motion

- founder-led and product-led demos to crypto-native finance teams
- sell into treasury, controller, and finance leadership
- target companies already using stablecoins for operations, not only trading

### Early acquisition channels

- crypto CFO/controller communities
- treasury and custody partners
- compliance and finance webinars
- incident/postmortem-driven content marketing

## 14. Risks, dependencies, and unknowns

### Risks

- Buyers may expect execution, not just visibility.
- Reserve quality scoring can become opinionated unless provenance is transparent.
- Treasury workflows vary significantly by organization maturity.

### Dependencies

- production-grade custody and venue integrations
- stable reference data for issuers and chains
- clear compliance design for role-based workflows

### Unknowns

- which treasury teams will buy first: exchanges, DAOs, fintechs, or market makers
- whether reserve transparency scoring should be configurable or system-defined
- how much workflow execution to include before expanding into full treasury ops

## 15. Post-demo roadmap

1. Multi-workspace support for funds, subsidiaries, or protocol entities.
2. Read-only wallet and venue imports.
3. Alert routing to Slack/email.
4. Historical posture timeline and incident replay.
5. Approval-aware policy engine.
6. Audit log exports.
7. Counterparty screening overlays.
8. Recommended rebalance simulation using liquidity constraints.
