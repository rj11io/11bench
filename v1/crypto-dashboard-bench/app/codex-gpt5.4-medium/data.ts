export type ScenarioId = "steady" | "stress" | "incident" | "empty"
export type TabId = "command" | "exposures" | "controls"

export type Metric = {
  label: string
  value: string
  delta: string
  tone: "neutral" | "good" | "warn" | "bad"
  note: string
}

export type RiskItem = {
  id: string
  title: string
  severity: "Low" | "Moderate" | "High" | "Critical"
  detail: string
  signal: string
  impact: string
}

export type ActionItem = {
  id: string
  title: string
  owner: string
  eta: string
  effect: string
  type: "Contain" | "Rebalance" | "Verify" | "Escalate"
}

export type IssuerExposure = {
  name: string
  share: number
  reserveScore: number
  redeemability: string
  color: string
}

export type ChainExposure = {
  chain: string
  allocation: number
  settlement: string
  risk: string
}

export type VenueExposure = {
  venue: string
  type: string
  amount: string
  share: number
  status: string
}

export type FlowEvent = {
  time: string
  title: string
  note: string
  tone: "neutral" | "good" | "warn" | "bad"
}

export type PolicyDefaults = {
  maxIssuerShare: number
  minReserveScore: number
  maxVenueShare: number
}

export type Scenario = {
  id: ScenarioId
  label: string
  status: string
  banner: string
  treasuryName: string
  snapshotTime: string
  provenance: string
  summary: string
  metrics: Metric[]
  risks: RiskItem[]
  actions: ActionItem[]
  issuers: IssuerExposure[]
  chains: ChainExposure[]
  venues: VenueExposure[]
  flows: FlowEvent[]
}

export const policyDefaults: PolicyDefaults = {
  maxIssuerShare: 45,
  minReserveScore: 82,
  maxVenueShare: 28,
}

export const scenarios: Record<ScenarioId, Scenario> = {
  steady: {
    id: "steady",
    label: "Normal day",
    status: "Guarded",
    banner:
      "Demo mode. Seeded data models a treasury team reviewing stablecoin concentration, venue exposure, and redeemability risk before the U.S. session handoff.",
    treasuryName: "Northstar Labs Treasury",
    snapshotTime: "Jul 16, 2026 · 09:20 UTC",
    provenance:
      "Seeded from public category conventions: reserve-backed issuer mix, chain fragmentation, wallet + venue exposure, and policy workflows. Not live balances.",
    summary:
      "The desk is liquid, but USDC concentration and exchange float sit near policy limits.",
    metrics: [
      {
        label: "Treasury NAV",
        value: "$148.2M",
        delta: "+2.6% vs 30d avg",
        tone: "good",
        note: "Includes stablecoin, staked ETH collateral, and exchange float.",
      },
      {
        label: "Liquid in 15 min",
        value: "$96.4M",
        delta: "65.0% of NAV",
        tone: "neutral",
        note: "Immediate redeemable or transferable balance after policy holds.",
      },
      {
        label: "Issuer concentration",
        value: "43%",
        delta: "2 pts below policy",
        tone: "warn",
        note: "Largest single issuer exposure is USDC.",
      },
      {
        label: "Venue concentration",
        value: "26%",
        delta: "2 pts below policy",
        tone: "warn",
        note: "Largest venue bucket remains exchange inventory.",
      },
    ],
    risks: [
      {
        id: "steady-usdc",
        title: "USDC reserve reliance is within policy but tightening",
        severity: "Moderate",
        detail:
          "USDC remains the largest issuer bucket across operating, payroll, and DeFi wallets.",
        signal: "43% issuer share",
        impact: "A redemption or banking disruption would slow same-day treasury routing.",
      },
      {
        id: "steady-venue",
        title: "Exchange inventory has drifted above target glidepath",
        severity: "Moderate",
        detail:
          "Idle inventory on FalconX and Coinbase Prime exceeds the desk's preferred float.",
        signal: "$38.5M venue exposure",
        impact: "Raises counterparty concentration and overnight settlement dependence.",
      },
      {
        id: "steady-bridge",
        title: "Base operating wallet depends on bridged USDC for payroll automation",
        severity: "Low",
        detail:
          "Bridged liquidity is acceptable in calm conditions but is not the preferred emergency rail.",
        signal: "11% of liquid balance",
        impact: "Could impair fast reallocations if bridge throughput degrades.",
      },
    ],
    actions: [
      {
        id: "steady-rebalance",
        title: "Sweep $9M from exchange float into primary custody",
        owner: "Treasury ops",
        eta: "Today, before 14:00 UTC",
        effect: "Drops largest venue share from 26% to 20%.",
        type: "Rebalance",
      },
      {
        id: "steady-limits",
        title: "Pre-stage EURC and USDP redemption contacts",
        owner: "Finance lead",
        eta: "This week",
        effect: "Adds lower-correlation backup rails for fiat settlement windows.",
        type: "Verify",
      },
      {
        id: "steady-bridge",
        title: "Cap bridged working capital at payroll requirement only",
        owner: "Controller",
        eta: "Next cycle",
        effect: "Reduces non-native bridge reliance on Base.",
        type: "Contain",
      },
    ],
    issuers: [
      { name: "USDC", share: 43, reserveScore: 91, redeemability: "T+0/T+1", color: "#5d9bff" },
      { name: "USDT", share: 24, reserveScore: 77, redeemability: "Liquidity via venues", color: "#3fc48f" },
      { name: "USDG", share: 12, reserveScore: 84, redeemability: "Counterparty dependent", color: "#f5b85a" },
      { name: "DAI/USDS", share: 11, reserveScore: 69, redeemability: "Market exit only", color: "#ff8e7a" },
      { name: "EURC", share: 10, reserveScore: 88, redeemability: "Banking window bound", color: "#d8b4fe" },
    ],
    chains: [
      { chain: "Ethereum", allocation: 34, settlement: "Deepest liquidity", risk: "Gas + slower ops" },
      { chain: "Base", allocation: 22, settlement: "Fast working capital", risk: "Bridge dependency" },
      { chain: "Solana", allocation: 19, settlement: "Cheap transfers", risk: "Ops heterogeneity" },
      { chain: "Arbitrum", allocation: 15, settlement: "Backup DeFi route", risk: "Sequencer dependency" },
      { chain: "Off-chain venues", allocation: 10, settlement: "Instant internal netting", risk: "Counterparty lock" },
    ],
    venues: [
      { venue: "Coinbase Prime", type: "Custody + exchange", amount: "$20.4M", share: 14, status: "Within limit" },
      { venue: "FalconX", type: "Prime brokerage", amount: "$18.1M", share: 12, status: "Near limit" },
      { venue: "Fireblocks vault", type: "Primary custody", amount: "$63.8M", share: 43, status: "Anchor rail" },
      { venue: "Safe multisig", type: "Protocol ops", amount: "$29.5M", share: 20, status: "Policy governed" },
      { venue: "Operational EOAs", type: "Hot wallets", amount: "$16.4M", share: 11, status: "Reduce drift" },
    ],
    flows: [
      {
        time: "08:52 UTC",
        title: "Payroll buffer moved to Base",
        note: "$3.2M USDC transferred for Friday contractor batch.",
        tone: "neutral",
      },
      {
        time: "07:40 UTC",
        title: "Exchange float up after OTC settlement",
        note: "$6.8M USDT landed on FalconX pending next rebalance window.",
        tone: "warn",
      },
      {
        time: "06:10 UTC",
        title: "Reserve monitoring pass completed",
        note: "Issuer reserve and redemption contacts verified against latest public disclosures.",
        tone: "good",
      },
    ],
  },
  stress: {
    id: "stress",
    label: "Volatile market",
    status: "At risk",
    banner:
      "Seeded stress scenario. Stablecoin demand spikes, exchange outflows accelerate, and policy limits compress as the desk prioritizes redeemability and liquidity over yield.",
    treasuryName: "Northstar Labs Treasury",
    snapshotTime: "Jul 16, 2026 · 14:10 UTC",
    provenance:
      "Scenario injects public-category stressors: exchange concentration, liquidity crowding, and chain-specific routing strain. Still demo data.",
    summary:
      "Liquidity remains available, but two policy breaches require same-day rebalancing.",
    metrics: [
      {
        label: "Treasury NAV",
        value: "$145.7M",
        delta: "-1.7% intraday",
        tone: "warn",
        note: "NAV compression reflects ETH collateral drawdown and wider stablecoin spreads.",
      },
      {
        label: "Liquid in 15 min",
        value: "$82.3M",
        delta: "56.5% of NAV",
        tone: "warn",
        note: "Fewer venues considered immediately reliable under stress.",
      },
      {
        label: "Issuer concentration",
        value: "49%",
        delta: "4 pts above policy",
        tone: "bad",
        note: "Flight to USDC pushed concentration through the guardrail.",
      },
      {
        label: "Venue concentration",
        value: "31%",
        delta: "3 pts above policy",
        tone: "bad",
        note: "Emergency hedging left too much inventory on one venue cluster.",
      },
    ],
    risks: [
      {
        id: "stress-issuer",
        title: "Issuer concentration breach",
        severity: "High",
        detail:
          "Rapid conversion into USDC solved immediate liquidity needs but created single-issuer dependency.",
        signal: "49% in USDC",
        impact: "Treasury has less flexibility if redemption windows tighten or banking partners degrade.",
      },
      {
        id: "stress-venue",
        title: "Prime broker concentration breach",
        severity: "High",
        detail:
          "FalconX holds too much sell-side working capital after hedges executed during volatility.",
        signal: "31% on one venue cluster",
        impact: "Operational outage or settlement delay would block a large share of accessible liquidity.",
      },
      {
        id: "stress-chain",
        title: "Solana routing is cheaper but not primary for large corporate settlement",
        severity: "Moderate",
        detail:
          "The desk leans on Solana for fast transfers, but some counterparties still require Ethereum-native settlement.",
        signal: "$22.8M requires bridge or venue hop",
        impact: "Cross-chain hops introduce sequencing and operational friction in fast-moving conditions.",
      },
    ],
    actions: [
      {
        id: "stress-rotate",
        title: "Rotate $11M USDC into EURC and USDG across custody rails",
        owner: "Treasury ops",
        eta: "Within 2 hours",
        effect: "Returns issuer concentration to 41% if all fills clear.",
        type: "Rebalance",
      },
      {
        id: "stress-withdraw",
        title: "Withdraw $8M from FalconX to vault custody",
        owner: "Settlement desk",
        eta: "Immediate",
        effect: "Restores venue concentration below policy.",
        type: "Contain",
      },
      {
        id: "stress-comms",
        title: "Escalate counterparty update to CFO and controller",
        owner: "Finance lead",
        eta: "Next 30 min",
        effect: "Creates approval path for after-hours redemption if conditions worsen.",
        type: "Escalate",
      },
    ],
    issuers: [
      { name: "USDC", share: 49, reserveScore: 90, redeemability: "T+0/T+1", color: "#5d9bff" },
      { name: "USDT", share: 20, reserveScore: 76, redeemability: "Liquidity via venues", color: "#3fc48f" },
      { name: "USDG", share: 11, reserveScore: 84, redeemability: "Counterparty dependent", color: "#f5b85a" },
      { name: "DAI/USDS", share: 9, reserveScore: 66, redeemability: "Market exit only", color: "#ff8e7a" },
      { name: "EURC", share: 11, reserveScore: 88, redeemability: "Banking window bound", color: "#d8b4fe" },
    ],
    chains: [
      { chain: "Ethereum", allocation: 29, settlement: "Primary redemption rail", risk: "Higher gas under volatility" },
      { chain: "Base", allocation: 18, settlement: "Operational working capital", risk: "Bridge dependency" },
      { chain: "Solana", allocation: 24, settlement: "Fast transfer venue", risk: "Counterparty support uneven" },
      { chain: "Arbitrum", allocation: 12, settlement: "Backup route", risk: "Bridge hop for exits" },
      { chain: "Off-chain venues", allocation: 17, settlement: "Immediate trading", risk: "Concentration breach" },
    ],
    venues: [
      { venue: "Coinbase Prime", type: "Custody + exchange", amount: "$18.8M", share: 13, status: "Within limit" },
      { venue: "FalconX", type: "Prime brokerage", amount: "$25.7M", share: 18, status: "Breach combined cluster" },
      { venue: "Fireblocks vault", type: "Primary custody", amount: "$58.4M", share: 40, status: "Anchor rail" },
      { venue: "Safe multisig", type: "Protocol ops", amount: "$25.1M", share: 17, status: "Policy governed" },
      { venue: "Operational EOAs", type: "Hot wallets", amount: "$17.7M", share: 12, status: "Acceptable" },
    ],
    flows: [
      {
        time: "13:55 UTC",
        title: "Hedge cycle increased exchange float",
        note: "$7.1M returned to FalconX after OTC hedge execution.",
        tone: "bad",
      },
      {
        time: "13:22 UTC",
        title: "Treasury converted DAI/USDS into USDC",
        note: "Defensive rotation improved immediate liquidity but worsened issuer concentration.",
        tone: "warn",
      },
      {
        time: "12:48 UTC",
        title: "Backup custody rehearsal passed",
        note: "Alternative withdrawal route confirmed operational.",
        tone: "good",
      },
    ],
  },
  incident: {
    id: "incident",
    label: "Risk incident",
    status: "Critical",
    banner:
      "Seeded incident mode. One issuer is trading below internal confidence, one venue is paused, and the desk is executing containment rather than optimization.",
    treasuryName: "Northstar Labs Treasury",
    snapshotTime: "Jul 16, 2026 · 18:30 UTC",
    provenance:
      "Scenario represents a simulated depeg-and-venue-pause event for design evaluation. No live market inference.",
    summary:
      "The desk can meet 72-hour obligations, but non-core balances need active containment.",
    metrics: [
      {
        label: "Treasury NAV",
        value: "$141.3M",
        delta: "-4.8% intraday",
        tone: "bad",
        note: "NAV reflects markdowns on non-core stablecoin inventory.",
      },
      {
        label: "Liquid in 15 min",
        value: "$63.1M",
        delta: "44.7% of NAV",
        tone: "bad",
        note: "Only high-confidence liquidity included in immediate access.",
      },
      {
        label: "Issuer concentration",
        value: "52%",
        delta: "7 pts above policy",
        tone: "bad",
        note: "Containment rotation unfinished.",
      },
      {
        label: "Venue concentration",
        value: "34%",
        delta: "6 pts above policy",
        tone: "bad",
        note: "One venue cluster frozen pending settlement confirmation.",
      },
    ],
    risks: [
      {
        id: "incident-depeg",
        title: "Non-core stablecoin lost internal confidence band",
        severity: "Critical",
        detail:
          "A treasury satellite position is no longer treated as cash-equivalent until spreads normalize.",
        signal: "Reserve confidence score fell below 60",
        impact: "Balance is excluded from operating liquidity and marked for supervised exit.",
      },
      {
        id: "incident-venue",
        title: "Venue pause traps a material working-capital bucket",
        severity: "Critical",
        detail:
          "Withdrawals from one venue cluster are delayed, forcing the desk onto backup rails.",
        signal: "$15.9M temporarily inaccessible",
        impact: "Raises payment sequencing risk for the next 24 hours.",
      },
      {
        id: "incident-comms",
        title: "Board-level communication threshold crossed",
        severity: "High",
        detail:
          "Two policy breaches and one cash-equivalent downgrade trigger executive notification.",
        signal: "3 unresolved critical alerts",
        impact: "Requires crisis recordkeeping and post-incident review.",
      },
    ],
    actions: [
      {
        id: "incident-freeze",
        title: "Freeze new deployments into downgraded stablecoin",
        owner: "Controller",
        eta: "Immediate",
        effect: "Stops further exposure growth while exits are priced.",
        type: "Contain",
      },
      {
        id: "incident-draw",
        title: "Draw $12M from primary custody to meet 72-hour obligations",
        owner: "Treasury ops",
        eta: "Within 30 min",
        effect: "Protects payroll and vendor commitments without relying on paused venue funds.",
        type: "Rebalance",
      },
      {
        id: "incident-briefing",
        title: "Issue incident brief with provenance and assumptions",
        owner: "Finance lead",
        eta: "Within 1 hour",
        effect: "Aligns CFO, legal, and operations on current exposure and decision rights.",
        type: "Escalate",
      },
    ],
    issuers: [
      { name: "USDC", share: 52, reserveScore: 90, redeemability: "T+0/T+1", color: "#5d9bff" },
      { name: "USDT", share: 16, reserveScore: 74, redeemability: "Liquidity via venues", color: "#3fc48f" },
      { name: "USDG", share: 8, reserveScore: 82, redeemability: "Counterparty dependent", color: "#f5b85a" },
      { name: "DAI/USDS", share: 6, reserveScore: 64, redeemability: "Market exit only", color: "#ff8e7a" },
      { name: "Other stablecoin", share: 18, reserveScore: 54, redeemability: "Downgraded", color: "#ff5a7a" },
    ],
    chains: [
      { chain: "Ethereum", allocation: 41, settlement: "Most trusted exit", risk: "Expensive but reliable" },
      { chain: "Base", allocation: 12, settlement: "Working capital only", risk: "Non-core during incident" },
      { chain: "Solana", allocation: 17, settlement: "Fast but not universal", risk: "Counterparty mismatch" },
      { chain: "Arbitrum", allocation: 8, settlement: "Backup route", risk: "Bridge required" },
      { chain: "Off-chain venues", allocation: 22, settlement: "Partially paused", risk: "Inaccessible cash" },
    ],
    venues: [
      { venue: "Coinbase Prime", type: "Custody + exchange", amount: "$17.2M", share: 12, status: "Operational" },
      { venue: "FalconX", type: "Prime brokerage", amount: "$15.9M", share: 11, status: "Paused withdrawals" },
      { venue: "Fireblocks vault", type: "Primary custody", amount: "$61.4M", share: 43, status: "Primary source" },
      { venue: "Safe multisig", type: "Protocol ops", amount: "$26.0M", share: 18, status: "Restricted to essentials" },
      { venue: "Operational EOAs", type: "Hot wallets", amount: "$20.8M", share: 16, status: "Use sparingly" },
    ],
    flows: [
      {
        time: "18:08 UTC",
        title: "Venue cluster moved to withdrawal-delay state",
        note: "Desk marked affected funds inaccessible for immediate-liquidity calculations.",
        tone: "bad",
      },
      {
        time: "17:41 UTC",
        title: "Incident committee convened",
        note: "Treasury, finance, legal, and operations switched to containment workflow.",
        tone: "warn",
      },
      {
        time: "17:10 UTC",
        title: "Primary custody path confirmed",
        note: "Emergency drawdown route verified before vendor cutoff.",
        tone: "good",
      },
    ],
  },
  empty: {
    id: "empty",
    label: "New account",
    status: "Unconfigured",
    banner:
      "Seeded onboarding state. Use this to evaluate whether the product teaches trust boundaries, provenance, and setup requirements before any capital is connected.",
    treasuryName: "Northstar Labs Treasury",
    snapshotTime: "No treasury imported",
    provenance:
      "No wallets or venues connected in demo state. This screen is intentionally empty and does not imply live discovery.",
    summary:
      "The desk needs treasury policy, custody rails, and exposure sources configured before risk monitoring begins.",
    metrics: [
      {
        label: "Tracked wallets",
        value: "0",
        delta: "Add at least 2 custody rails",
        tone: "neutral",
        note: "Primary custody plus operational wallet recommended.",
      },
      {
        label: "Policy coverage",
        value: "0%",
        delta: "Issuer, venue, and chain limits missing",
        tone: "warn",
        note: "No thresholds means no automated risk scoring.",
      },
      {
        label: "Provenance map",
        value: "0 sources",
        delta: "Add balances, counterparties, and reserve watchlist",
        tone: "warn",
        note: "The product should not infer holdings from a partial setup.",
      },
      {
        label: "Incident playbooks",
        value: "Draft only",
        delta: "Not approved",
        tone: "neutral",
        note: "Escalation routes must be explicit before the first deployment.",
      },
    ],
    risks: [
      {
        id: "empty-policy",
        title: "No treasury policy loaded",
        severity: "High",
        detail:
          "The desk cannot distinguish acceptable working capital from risk accumulation without board-approved thresholds.",
        signal: "No issuer, venue, or chain limits",
        impact: "Monitoring would create false confidence.",
      },
      {
        id: "empty-custody",
        title: "Single-rail risk during onboarding",
        severity: "Moderate",
        detail:
          "Treasury teams often begin with one wallet or one exchange, then forget to add backup rails.",
        signal: "No failover path defined",
        impact: "A simple outage can become a liquidity event.",
      },
    ],
    actions: [
      {
        id: "empty-policy-action",
        title: "Create treasury policy with issuer, venue, and chain thresholds",
        owner: "Finance lead",
        eta: "Before first deposit",
        effect: "Enables meaningful alerting and guardrails.",
        type: "Verify",
      },
      {
        id: "empty-custody-action",
        title: "Register primary custody, hot wallet, and backup withdrawal rail",
        owner: "Treasury ops",
        eta: "Week 1",
        effect: "Creates minimum viable redundancy.",
        type: "Contain",
      },
      {
        id: "empty-contacts",
        title: "Attach issuer reserve pages and redemption contacts",
        owner: "Controller",
        eta: "Week 1",
        effect: "Improves provenance and incident response speed.",
        type: "Verify",
      },
    ],
    issuers: [],
    chains: [],
    venues: [],
    flows: [
      {
        time: "Setup",
        title: "No recent treasury activity",
        note: "The dashboard remains blank until configuration is complete.",
        tone: "neutral",
      },
    ],
  },
}

export const tabs: { id: TabId; label: string; blurb: string }[] = [
  {
    id: "command",
    label: "Command",
    blurb: "Decision loop, key risks, and next actions.",
  },
  {
    id: "exposures",
    label: "Exposures",
    blurb: "Issuer, chain, and venue composition.",
  },
  {
    id: "controls",
    label: "Controls",
    blurb: "Policy assumptions and trust boundaries.",
  },
]
