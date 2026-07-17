# Research — Sentryline

**Access date for all sources: 2026-07-16.** Sentryline is a focused treasury-risk workspace for crypto-native finance teams. The product thesis is grounded in primary documentation and established data-provider conventions rather than live market claims.

## Users, jobs, and recurring decisions

The useful buyer is not “everyone who owns crypto.” It is the person accountable for a multisig or treasury: a DAO finance contributor, protocol CFO/controller, or finance lead at a crypto startup. Their recurring loop is:

1. Can we meet the next 30/90 days of obligations without taking avoidable market or counterparty risk?
2. Where is cash actually held, across chains, wallets, issuers, protocols, and custodians?
3. Did a transfer, approval, bridge, or contract exposure change our risk posture?
4. What evidence can I hand to a signer, board member, auditor, or compliance reviewer?

The secondary user is a signer or reviewer who needs a concise, source-linked approval context, not a trading terminal. The buying trigger is a treasury growing beyond one wallet or one exchange, a near-miss caused by stale balances, or a monthly close that still depends on spreadsheets and screenshots.

## Category conventions and representative products

- [Dune Docs](https://docs.dune.com/) positions onchain analytics around querying, dashboards, data engineering, applications, and accounting/audit/AML use cases. Its product surface suggests that raw SQL and flexible dashboards are powerful but leave a decision layer to the customer.
- [DeFiLlama methodology](https://docs.llama.fi/) defines TVL as the value of tokens locked in protocol contracts. This is a useful convention, but TVL alone is not cash runway: it can include illiquid, volatile, or rehypothecated exposure.
- [Chainlink Data Feeds](https://data.chain.link/feeds) exposes the conventions “answer,” deviation threshold, heartbeat, network, and asset class. These are good examples of provenance and freshness metadata that should be visible alongside a number.
- [Coinbase Wallet security](https://www.coinbase.com/security/wallet-security) makes self-custody and key control explicit. A treasury dashboard should be read-only by default and should never request a seed phrase.

The opportunity is between an analyst’s flexible query tool and an exchange’s portfolio view: a small, opinionated control plane that turns balances and activity into a reviewable treasury decision.

## Data model and trust model

The minimum entity graph is: **Organization → Treasury policy → Wallet / Custodian account → Chain → Address → Asset balance → Position / protocol exposure → Transaction → Evidence / source**.

Onchain data has different clocks and confidence levels. [Dune’s data catalog](https://docs.dune.com/data-catalog/overview) describes raw, decoded, and curated layers; it says raw data typically arrives within minutes of onchain finality while curated datasets refresh hourly. [Ethereum’s proof-of-stake documentation](https://ethereum.org/developers/docs/consensus-mechanisms/pos/attack-and-defense/) explains why finality and reorgs matter to financial applications. Sentryline therefore shows “as of,” source, finality state, and an explicit demo/live label rather than implying a single real-time truth.

For a production system, balances would come from chain indexers and direct RPC reads, prices from a documented oracle or market-data vendor, and protocol metadata from protocol-supplied contracts plus a maintained registry. Calculations must preserve the raw token amount, valuation timestamp, price source, and FX denomination. “Runway” is a policy calculation, not a market fact: available stablecoin value minus reserved obligations, divided by a monthly burn assumption.

## Volatility, liquidity, and risk communication

Crypto dashboards often make nominal USD value visually dominant while hiding liquidity, concentration, bridge, smart-contract, and issuer risks. Sentryline separates:

- **Liquidity:** same-day exitability and depth, not just a price existing.
- **Counterparty:** custodian, issuer, bridge, or protocol dependency.
- **Concentration:** share of treasury in one asset, chain, venue, or contract.
- **Operational:** signer, approval, allowance, and policy exceptions.
- **Data confidence:** freshness, source quality, and finality.

Risk is communicated with text and structured badges (“review,” “watch,” “clear”), never color alone. A prominent exception should include impact, reason, evidence, and a suggested next action. In volatile states, the product should keep showing the last verified snapshot and a stale-data banner instead of animating fake ticks.

## Wallet, security, and compliance patterns

[Coinbase’s wallet security guidance](https://help.coinbase.com/en/wallet/privacy-and-security/secure-your-wallet) reinforces that recovery phrases are not accessible to the provider and that compromised self-custody can be irreversible. [Coinbase CDP security documentation](https://docs.cdp.coinbase.com/wallets/security-and-policies/security-overview) describes policy controls, secrets, passkeys/security keys, and enterprise compliance foundations. Sentryline consequently defaults to watch-only addresses, scopes permissions per workspace, logs every export and acknowledgement, and keeps all signing outside the product.

[FATF’s risk-based guidance for virtual assets and VASPs](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-rba-virtual-assets.html) calls for identifying, assessing, and mitigating risks proportionately, with relevant licensing/supervision and AML/CFT controls. The dashboard is not a compliance determination; it should expose evidence and configurable review rules, with jurisdiction-specific legal review before launch.

## Visualization and GTM decisions

Use a stacked area / line view for runway because time-to-zero is the question; use horizontal bars for concentration because comparison is the question; use a table for activity because review and evidence are the question. Units must be explicit: USD for valuation, token units for balances, days for runway, bps/percent for thresholds, and block/time for freshness.

Pricing should be workspace-based: a free single-wallet “Snapshot,” a paid “Control” tier with multisig policies, alerts, evidence exports, and 30-day history, and enterprise pricing for custom data SLAs, SSO, and audit retention. Acquisition should start with treasury health-check templates, signer-friendly weekly digests, and partnerships with crypto accounting, multisig, and audit firms. The narrative is: “Know which money is safe to spend before you sign.”

### Decisions changed by research

1. The product is treasury control, not a broad portfolio tracker, because Dune already serves flexible analysis and exchange products already serve personal holdings.
2. “Runway” is policy-based and explicitly labeled, because TVL or portfolio USD alone does not establish spendable liquidity.
3. Provenance and freshness are first-class UI, because chain data, indexed data, and oracle data have different latency and finality semantics.
4. Wallet connections are read-only in the demo and production default, because key custody and irreversible signing are separate trust boundaries.
5. A risk queue is the primary workflow, because finance teams buy decisions and evidence, not more charts.
