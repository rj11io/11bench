# Product Requirements Document

## Product thesis

**Treasury Sentinel** is a production-ready concept for a **stablecoin treasury risk cockpit**. It helps finance and operations teams decide whether treasury is safe to move by combining vault balances, runway, counterparty exposure, sanctions screening, and policy headroom in one place.

It is not a universal crypto super-app and it is not a trading terminal. The wedge is narrow on purpose: **safe treasury movement and exception handling**.

## Category and positioning

- Category: crypto treasury risk and operations.
- Positioning: the decision layer between custody, compliance, and finance.
- Differentiated promise: “Know if treasury is safe to move before you sign.”

## Primary user

- Crypto CFO or treasury manager at a stablecoin-heavy company, exchange, or protocol.
- JTBD:
  - understand current treasury posture
  - identify whether a transfer is blocked, watch-listed, or safe
  - avoid concentration, sanctions, or approval failures
  - keep runway visible relative to burn

## Secondary users

- Compliance lead who reviews sanctions, screening, and case queues.
- Treasury operations analyst who executes sweeps, rebalance actions, and approval workflows.
- Finance lead who needs runway and reserve concentration for planning.

## Buying trigger

- Treasury has grown across multiple wallets, chains, and venues.
- A transfer was delayed by approval rules, bridge exposure, or screening.
- The finance team needs a defensible operating view for reserves and runway.
- The company has compliance pressure, audit pressure, or stablecoin expansion plans.

## Scope

### In scope

- Treasury workspace overview by vault.
- Balance trajectory and emergency floor.
- Runway and burn monitoring.
- Counterparty exposure list.
- Alert triage by severity.
- Policy headroom and approval workflow simulation.
- Audit trail of review actions.
- Freshness and provenance labels for data classes.

### Non-goals

- No live wallet connection in the demo.
- No actual trade execution or signing.
- No consumer portfolio tracking experience.
- No tax form generation in the demo.
- No generalized market discovery or token screener.

## Core workflows

### 1. Select a vault

Users choose a treasury vault from the sidebar and immediately see:

- total value
- runway
- policy headroom
- open cases
- status

### 2. Inspect risk posture

Users review:

- value vs emergency floor
- risk trend vs threshold
- chain split
- counterparties and route risk
- open alerts by severity

### 3. Triage and resolve

Users narrow the queue with a triage filter, mark alerts reviewed, and add local audit events to simulate a real operational workflow.

### 4. Decide what to do

Users see a recommended action:

- hold posture
- tighten thresholds
- escalate to compliance
- freeze outbound transfers

## Functional requirements

- The page must support desktop and mobile layouts.
- The left rail must let users switch between seeded vaults.
- The top nav must switch between Overview, Wallets, Controls, and Audit views.
- Time range controls must change the chart window.
- Alert triage must filter visible alerts.
- Review actions must persist to localStorage.
- The demo must always label itself as seeded/non-live.

## Data sources and freshness assumptions

The production product would use:

- custody or wallet events for vault balances and approvals
- blockchain indexers for transfer paths and chain-level holdings
- market data APIs for token valuation
- screening providers for sanctions and counterparty risk
- treasury or ERP integrations for burn and runway

Freshness assumptions:

- balances: near-real-time where the source supports it
- market prices: cached minutes, not sub-second execution data
- screening: near-real-time
- curated analytics: minute to hourly depending on source type

## Calculation and entity model

### Entity model

- Workspace
- Vault
- Holding
- Chain allocation
- Counterparty
- Policy rule
- Alert
- Review event

### Key calculations

- Treasury value = sum of holdings converted to USD.
- Runway = treasury cash-like reserve divided by daily burn.
- Concentration = largest share of treasury value in a single asset, chain, or route.
- Policy headroom = distance from configured approval or amount caps.
- Risk score = composite of concentration, screening, route complexity, and runway.

### Demo caveat

All calculated values in the demo are seeded and illustrative. They must not be described as live balances, live pricing, or live screening outcomes.

## Wallet, security, privacy, permissions, compliance, and risk requirements

- Do not imply wallet connection.
- Do not imply signing, broadcasting, or execution.
- Display sanctions signals as review aids, not legal clearance.
- Show the source class and freshness of any data used.
- Separate policy settings from monitoring output.
- Preserve an audit trail of review actions.
- Avoid storing sensitive credentials in the browser.
- In production, role-based access and approval scopes should be enforced server-side.

## Onboarding and activation

### Activation definition

The user is activated when they:

- select a vault,
- understand its status,
- inspect at least one chart,
- and review or dismiss at least one alert.

### First-run experience

- Start with a clear demo banner.
- Preselect the healthiest vault.
- Surface the open alert queue immediately.
- Make the risk semantics and freshness windows explicit.

## Retention hypothesis

Users return when the product becomes the place where they:

- check treasury posture before movement,
- monitor runway daily,
- and review alerts or approvals before sign-off.

Retention should come from operational habit, not casual browsing.

## Success metrics

### Product metrics

- Vault view-to-alert interaction rate.
- Review action completion rate.
- Time to first risk insight.
- Repeat vault selection across sessions.
- Policy adjustment simulation usage.

### Business metrics

- qualified trial-to-pilot conversion
- pilot-to-paid conversion
- number of monitored vaults per workspace
- number of reviewed alerts per workspace
- expansion into additional teams or chains

## Packaging and pricing hypothesis

- Entry tier: one workspace, limited vaults, core monitoring.
- Growth tier: more vaults, more chains, more alert volume, shared audit logs.
- Enterprise tier: SSO, role-based approvals, custom screening rules, ERP/TMS integrations, API exports.

Pricing should likely be seat-based plus workspace scale or monitored-vault scale.

## Launch motion

- Design-partner pilot with crypto-native finance teams.
- Use treasury and compliance pain as the hook.
- Lead with “safe to move” language rather than “portfolio alpha.”
- Land with monitoring, expand into workflow and approvals.

## GTM narrative

Treasury teams already use multiple tools for custody, balances, screening, and approvals. Treasury Sentinel collapses the decision into one review surface that shows what is held, where it sits, what it is exposed to, and whether it is ready to move.

The narrative:

1. See the treasury.
2. See the risk.
3. See the approval gap.
4. Move only when it is safe.

## Risks, dependencies, and unknowns

- Real balance freshness depends on the wallet and chain source.
- Screening quality depends on attribution and watchlist quality.
- Treasury organizations vary widely in policy structure.
- A future integration model must handle role separation and approvals carefully.
- The product must avoid overstating compliance certainty.

## Post-demo roadmap

1. Connect read-only wallet and policy integrations.
2. Add server-side case management and approval routing.
3. Export audit packets and CFO-ready summaries.
4. Add treasury forecasting across fiat and stablecoin accounts.
5. Add ERP/TMS and accounting integrations.
6. Add permissioned sharing and SSO.

