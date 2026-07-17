export const snapshotIds = ["normal", "volatile", "risk", "empty"] as const

export type SnapshotId = (typeof snapshotIds)[number]

export const timeRangeIds = ["7d", "30d", "90d"] as const

export type TimeRangeId = (typeof timeRangeIds)[number]

export const bucketIds = ["immediate", "same-day", "delayed", "restricted"] as const

export type LiquidityBucket = (typeof bucketIds)[number]

export const assetKinds = ["stablecoin", "btcEth", "yield", "fiat"] as const

export type AssetKind = (typeof assetKinds)[number]

export const severityIds = ["low", "medium", "high", "critical"] as const

export type Severity = (typeof severityIds)[number]

export const riskIds = ["healthy", "watch", "breach"] as const

export type RiskState = (typeof riskIds)[number]

export const stateIds = ["ok", "watch", "breach"] as const

export type PolicyState = (typeof stateIds)[number]

export type Wallet = {
  id: string
  label: string
  address: string
  chain: string
  custody: string
  role: string
  kind: AssetKind
  bucket: LiquidityBucket
  balanceUsd: number
  availableUsd: number
  riskState: RiskState
  provenance: string
  screening: string
  counterparties: string[]
  freshness: string
  lastMovement: string
  notes: string
}

export type Alert = {
  id: string
  severity: Severity
  title: string
  detail: string
  impactUsd: number
  recommendation: string
  source: string
}

export type ActionItem = {
  id: string
  title: string
  detail: string
  impact: string
  confidence: string
  eta: string
}

export type PolicyItem = {
  label: string
  value: string
  state: PolicyState
}

export type EventItem = {
  when: string
  title: string
  detail: string
  source: string
}

export type RunwayPoint = {
  label: string
  observed: number
  stressed: number
}

export type Snapshot = {
  id: SnapshotId
  label: string
  organization: string
  segment: string
  stateLabel: string
  summary: string
  updatedAt: string
  burnUsdPerMonth: number
  basePolicyScore: number
  stressRunwayDragAt100: number
  stressCapitalAt100: number
  defaultStress: number
  wallets: Wallet[]
  alerts: Alert[]
  actions: ActionItem[]
  policyStack: PolicyItem[]
  events: EventItem[]
  runwayHistory: RunwayPoint[]
  setupSteps: string[]
  demoNote: string
}

export const snapshotOptions: Array<{
  id: SnapshotId
  label: string
  helper: string
}> = [
  {
    id: "normal",
    label: "Normal",
    helper: "Northstar Labs",
  },
  {
    id: "volatile",
    label: "Volatile",
    helper: "Helio Payments",
  },
  {
    id: "risk",
    label: "Risk focus",
    helper: "Atlas Foundation",
  },
  {
    id: "empty",
    label: "Empty",
    helper: "Blank workspace",
  },
]

export const timeRangeOptions: Array<{
  id: TimeRangeId
  label: string
  helper: string
}> = [
  {
    id: "7d",
    label: "7D",
    helper: "Tightest window",
  },
  {
    id: "30d",
    label: "30D",
    helper: "Treasury cadence",
  },
  {
    id: "90d",
    label: "90D",
    helper: "Board horizon",
  },
]

export const bucketMeta: Record<
  LiquidityBucket,
  { label: string; color: string; tone: string }
> = {
  immediate: {
    label: "Immediate",
    color: "#34d399",
    tone: "text-emerald-300",
  },
  "same-day": {
    label: "Same day",
    color: "#38bdf8",
    tone: "text-sky-300",
  },
  delayed: {
    label: "Delayed",
    color: "#f59e0b",
    tone: "text-amber-300",
  },
  restricted: {
    label: "Restricted",
    color: "#fb7185",
    tone: "text-rose-300",
  },
}

export const kindMeta: Record<
  AssetKind,
  { label: string; color: string; tone: string }
> = {
  stablecoin: {
    label: "Stablecoins",
    color: "#5eead4",
    tone: "text-teal-300",
  },
  btcEth: {
    label: "BTC / ETH",
    color: "#a78bfa",
    tone: "text-violet-300",
  },
  yield: {
    label: "Yield-bearing",
    color: "#fbbf24",
    tone: "text-amber-300",
  },
  fiat: {
    label: "Fiat / off-chain",
    color: "#60a5fa",
    tone: "text-sky-300",
  },
}

export const severityMeta: Record<
  Severity,
  { label: string; color: string; tone: string }
> = {
  low: {
    label: "Low",
    color: "#94a3b8",
    tone: "text-slate-300",
  },
  medium: {
    label: "Medium",
    color: "#f59e0b",
    tone: "text-amber-300",
  },
  high: {
    label: "High",
    color: "#fb7185",
    tone: "text-rose-300",
  },
  critical: {
    label: "Critical",
    color: "#f43f5e",
    tone: "text-rose-200",
  },
}

export const snapshots: Snapshot[] = [
  {
    id: "normal",
    label: "Northstar Labs",
    organization: "Northstar Labs",
    segment: "Stablecoin treasury",
    stateLabel: "Normal operating cadence",
    summary:
      "Predictable payroll and vendor float with moderate reserve slack and two watch items.",
    updatedAt: "2026-07-16T10:42:00Z",
    burnUsdPerMonth: 406000,
    basePolicyScore: 95,
    stressRunwayDragAt100: 3.1,
    stressCapitalAt100: 1180000,
    defaultStress: 12,
    wallets: [
      {
        id: "normal-ops",
        label: "Ops Hot Wallet",
        address: "demo:0x8c4f…a11d",
        chain: "Ethereum",
        custody: "Fireblocks MPC",
        role: "Payroll and vendor float",
        kind: "stablecoin",
        bucket: "immediate",
        balanceUsd: 2100000,
        availableUsd: 2050000,
        riskState: "healthy",
        provenance: "watch-only snapshot + internal label",
        screening: "OFAC list synced 14m ago",
        counterparties: ["Circle Mint", "Vendor payouts"],
        freshness: "6m",
        lastMovement: "2h ago · inflow from mint",
        notes: "Primary payroll and vendor float.",
      },
      {
        id: "normal-payout",
        label: "Payout Vault",
        address: "demo:0x2f71…9bc4",
        chain: "Base",
        custody: "Fireblocks MPC",
        role: "Same-day settlement",
        kind: "stablecoin",
        bucket: "same-day",
        balanceUsd: 1950000,
        availableUsd: 1900000,
        riskState: "healthy",
        provenance: "watch-only snapshot + address book label",
        screening: "Beneficiary screening complete",
        counterparties: ["Payroll partner", "Circle Mint"],
        freshness: "9m",
        lastMovement: "5h ago · outbound batch queued",
        notes: "Settles vendor and contractor payouts.",
      },
      {
        id: "normal-reserve",
        label: "Reserve Cold Vault",
        address: "demo:0x61be…0d77",
        chain: "Ethereum",
        custody: "Cold vault",
        role: "Longer-horizon reserve",
        kind: "stablecoin",
        bucket: "delayed",
        balanceUsd: 2650000,
        availableUsd: 2150000,
        riskState: "watch",
        provenance: "segregated reserve wallet",
        screening: "Requires batch approval",
        counterparties: ["Circle Mint", "Reserve committee"],
        freshness: "18m",
        lastMovement: "Yesterday · reserve top-up",
        notes: "Cold reserve is intentionally slower to move.",
      },
      {
        id: "normal-yield",
        label: "Yield Buffer",
        address: "demo:0x99e4…f2a1",
        chain: "Arbitrum",
        custody: "Protocol position",
        role: "Treasury yield sleeve",
        kind: "yield",
        bucket: "delayed",
        balanceUsd: 780000,
        availableUsd: 600000,
        riskState: "watch",
        provenance: "DeFi position snapshot",
        screening: "Smart-contract check passed",
        counterparties: ["Aave", "Treasury router"],
        freshness: "21m",
        lastMovement: "Today · rebalance completed",
        notes: "Yield buffer has a longer unwind window.",
      },
      {
        id: "normal-fiat",
        label: "Fiat Sweep",
        address: "demo:bank-sweep-01",
        chain: "Off-chain",
        custody: "Bank sweep",
        role: "Operating cash",
        kind: "fiat",
        bucket: "immediate",
        balanceUsd: 520000,
        availableUsd: 520000,
        riskState: "healthy",
        provenance: "bank feed + treasury ledger",
        screening: "N/A",
        counterparties: ["Operating bank"],
        freshness: "4m",
        lastMovement: "3h ago · sweep settled",
        notes: "Off-chain buffer for same-day admin spend.",
      },
      {
        id: "normal-hedge",
        label: "BTC Hedge",
        address: "demo:bc1q8d…hedg",
        chain: "Bitcoin",
        custody: "Qualified custodian",
        role: "Macro hedge",
        kind: "btcEth",
        bucket: "same-day",
        balanceUsd: 480000,
        availableUsd: 180000,
        riskState: "healthy",
        provenance: "custody snapshot + research note",
        screening: "Allowed by policy",
        counterparties: ["Custodian vault"],
        freshness: "27m",
        lastMovement: "2d ago · hedge maintained",
        notes: "Non-operating hedge position, not part of payroll coverage.",
      },
    ],
    alerts: [
      {
        id: "normal-alert-1",
        severity: "medium",
        title: "Stablecoin concentration is 79% of total treasury",
        detail:
          "The concentration is within current policy, but it leaves the treasury sensitive to stablecoin-specific shocks.",
        impactUsd: 820000,
        recommendation:
          "Keep the cold reserve and fiat buffer diversified enough to cover a 48h stress event.",
        source: "Policy engine",
      },
      {
        id: "normal-alert-2",
        severity: "low",
        title: "Reserve Cold Vault still uses a generic label",
        detail:
          "One reserve wallet could be renamed to match the board pack naming convention.",
        impactUsd: 0,
        recommendation: "Align the label with the internal treasury taxonomy.",
        source: "Address book",
      },
    ],
    actions: [
      {
        id: "normal-action-1",
        title: "Rebalance 250k from delayed reserve into same-day buffer",
        detail:
          "Adds a small liquidity cushion before the next vendor batch and reduces the variance between same-day and delayed capital.",
        impact: "+0.6 months runway",
        confidence: "High confidence",
        eta: "5 min",
      },
      {
        id: "normal-action-2",
        title: "Retitle the reserve wallet for the board pack",
        detail:
          "Makes the labeled reserve match finance review language and reduces naming ambiguity.",
        impact: "Cleaner audit trail",
        confidence: "Certain",
        eta: "1 min",
      },
    ],
    policyStack: [
      {
        label: "MPC approvals",
        value: "2 of 3 required",
        state: "ok",
      },
      {
        label: "Allowlisted destinations",
        value: "41 approved routes",
        state: "ok",
      },
      {
        label: "OFAC sync",
        value: "Updated 14m ago",
        state: "ok",
      },
      {
        label: "Beneficiary screening",
        value: "3 counterparties pending refresh",
        state: "watch",
      },
      {
        label: "Board export",
        value: "Ready",
        state: "ok",
      },
    ],
    events: [
      {
        when: "10:42 UTC",
        title: "Snapshot synced",
        detail: "Balances and labels refreshed from watch-only sources.",
        source: "Treasury feed",
      },
      {
        when: "09:31 UTC",
        title: "USDC inflow recorded",
        detail: "Mint connected to the ops hot wallet for payroll prep.",
        source: "Onchain event",
      },
      {
        when: "Yesterday",
        title: "Vendor batch queued",
        detail: "Same-day payouts prepared with beneficiary screening complete.",
        source: "Payments ops",
      },
    ],
    runwayHistory: [
      { label: "Jun 06", observed: 16.8, stressed: 14.0 },
      { label: "Jun 13", observed: 17.1, stressed: 14.2 },
      { label: "Jun 20", observed: 17.4, stressed: 14.5 },
      { label: "Jun 27", observed: 17.7, stressed: 14.8 },
      { label: "Jul 04", observed: 17.9, stressed: 15.0 },
      { label: "Jul 11", observed: 18.1, stressed: 15.2 },
      { label: "Jul 16", observed: 18.2, stressed: 15.4 },
    ],
    setupSteps: [
      "Connect watch-only wallet snapshots.",
      "Import the treasury address book and naming policy.",
      "Set concentration and runway thresholds.",
      "Review the first board-ready treasury report.",
    ],
    demoNote: "Seeded demo data only. No live wallet, price, or transfer connection.",
  },
  {
    id: "volatile",
    label: "Helio Payments",
    organization: "Helio Payments",
    segment: "Cross-border payout treasury",
    stateLabel: "Volatile payout corridor",
    summary:
      "Higher payout cadence, more same-day movement, and a few screenings waiting on beneficiary data.",
    updatedAt: "2026-07-16T10:42:00Z",
    burnUsdPerMonth: 507000,
    basePolicyScore: 84,
    stressRunwayDragAt100: 4.2,
    stressCapitalAt100: 1580000,
    defaultStress: 32,
    wallets: [
      {
        id: "volatile-hot",
        label: "Cross-border Payout Hot",
        address: "demo:0x4e11…7af2",
        chain: "Base",
        custody: "Fireblocks MPC",
        role: "Payout prefunding",
        kind: "stablecoin",
        bucket: "immediate",
        balanceUsd: 1340000,
        availableUsd: 1300000,
        riskState: "healthy",
        provenance: "watch-only snapshot + payment corridor tag",
        screening: "Beneficiary screening complete",
        counterparties: ["Circle Mint", "LATAM payout partner"],
        freshness: "5m",
        lastMovement: "34m ago · pre-funded corridor",
        notes: "Primary rail for payout batches.",
      },
      {
        id: "volatile-omnibus",
        label: "Exchange Omnibus",
        address: "demo:sol-omnibus-01",
        chain: "Solana",
        custody: "Exchange omnibus",
        role: "Liquidity bridge",
        kind: "stablecoin",
        bucket: "same-day",
        balanceUsd: 2220000,
        availableUsd: 1540000,
        riskState: "watch",
        provenance: "exchange snapshot + internal label",
        screening: "Counterparty review due in 3 days",
        counterparties: ["Exchange", "Market maker"],
        freshness: "11m",
        lastMovement: "1h ago · withdrawal batch pending",
        notes: "Fast access, but concentration is above comfort range.",
      },
      {
        id: "volatile-escrow",
        label: "Reserve Escrow",
        address: "demo:0x88ad…c4dd",
        chain: "Ethereum",
        custody: "Custodial vault",
        role: "Reserve buffer",
        kind: "stablecoin",
        bucket: "delayed",
        balanceUsd: 1720000,
        availableUsd: 1050000,
        riskState: "watch",
        provenance: "segregated reserve snapshot",
        screening: "Needs beneficiary refresh",
        counterparties: ["Circle Mint", "Reserve committee"],
        freshness: "24m",
        lastMovement: "Yesterday · reserve sweep",
        notes: "Available capital depends on batch approvals.",
      },
      {
        id: "volatile-fiat",
        label: "Ops Float",
        address: "demo:bank-fiat-03",
        chain: "Off-chain",
        custody: "Bank sweep",
        role: "Admin spend buffer",
        kind: "fiat",
        bucket: "immediate",
        balanceUsd: 630000,
        availableUsd: 630000,
        riskState: "healthy",
        provenance: "bank feed + ledger",
        screening: "N/A",
        counterparties: ["Operating bank"],
        freshness: "3m",
        lastMovement: "2h ago · bank sweep settled",
        notes: "Admin and compliance spend buffer.",
      },
      {
        id: "volatile-hedge",
        label: "ETH Hedge",
        address: "demo:0x5fd2…9aa1",
        chain: "Ethereum",
        custody: "Qualified custodian",
        role: "Treasury hedge",
        kind: "btcEth",
        bucket: "delayed",
        balanceUsd: 310000,
        availableUsd: 120000,
        riskState: "healthy",
        provenance: "custody snapshot + strategy tag",
        screening: "Allowed by policy",
        counterparties: ["Custodian vault"],
        freshness: "19m",
        lastMovement: "3d ago · hedge rebalance",
        notes: "Hedge sleeve, not a liquidity source.",
      },
    ],
    alerts: [
      {
        id: "volatile-alert-1",
        severity: "high",
        title: "Exchange omnibus concentration is 36% of treasury",
        detail:
          "A single bridge account now holds too much of the same-day liquidity, increasing counterparty and timing risk.",
        impactUsd: 2220000,
        recommendation:
          "Move part of the bridge balance into the payout hot wallet or a second custodial lane.",
        source: "Concentration policy",
      },
      {
        id: "volatile-alert-2",
        severity: "high",
        title: "Two payout recipients still need beneficiary refresh",
        detail:
          "Pending KYC / screening data is holding two transfers in review.",
        impactUsd: 184000,
        recommendation:
          "Complete beneficiary refresh before the next large payout batch.",
        source: "Compliance queue",
      },
      {
        id: "volatile-alert-3",
        severity: "medium",
        title: "Base payout vault is below the preferred 48h buffer",
        detail:
          "The current prefund is enough for same-day execution, but it will be thin if payout volume spikes.",
        impactUsd: 250000,
        recommendation:
          "Top up the payout vault ahead of the next corridor window.",
        source: "Liquidity buffer",
      },
      {
        id: "volatile-alert-4",
        severity: "medium",
        title: "Gas volatility may delay the next sweep",
        detail:
          "The next onchain sweep could take longer than the team SLA if fee levels stay elevated.",
        impactUsd: 0,
        recommendation:
          "Move the sweep window earlier or pre-fund the payout wallet.",
        source: "Execution monitor",
      },
    ],
    actions: [
      {
        id: "volatile-action-1",
        title: "Move 400k out of the exchange omnibus",
        detail:
          "Reduces same-day concentration and restores more balance to the prefunded hot wallet.",
        impact: "Lower concentration risk",
        confidence: "High confidence",
        eta: "10 min",
      },
      {
        id: "volatile-action-2",
        title: "Complete beneficiary refresh on the two held payouts",
        detail:
          "Removes the compliance hold before the corridor opens again.",
        impact: "Clear screening queue",
        confidence: "High confidence",
        eta: "15 min",
      },
      {
        id: "volatile-action-3",
        title: "Pre-fund the payout wallet before the gas window",
        detail:
          "Restores the preferred 48h buffer and protects same-day delivery.",
        impact: "Higher payout readiness",
        confidence: "Medium confidence",
        eta: "5 min",
      },
    ],
    policyStack: [
      {
        label: "MPC approvals",
        value: "2 of 3 required",
        state: "ok",
      },
      {
        label: "Allowlisted destinations",
        value: "33 approved routes",
        state: "ok",
      },
      {
        label: "Exchange concentration",
        value: "Above threshold",
        state: "watch",
      },
      {
        label: "Beneficiary screening",
        value: "2 payout records awaiting refresh",
        state: "watch",
      },
      {
        label: "OFAC sync",
        value: "Updated 17m ago",
        state: "ok",
      },
    ],
    events: [
      {
        when: "10:18 UTC",
        title: "Payout corridor opened",
        detail: "The next batch of cross-border payouts is pre-funded.",
        source: "Payments ops",
      },
      {
        when: "08:44 UTC",
        title: "Two beneficiaries entered review",
        detail: "Screening requires fresh counterparty data before release.",
        source: "Compliance queue",
      },
      {
        when: "Yesterday",
        title: "Exchange recharge completed",
        detail: "The omnibus account was reloaded for the next corridor.",
        source: "Liquidity ops",
      },
    ],
    runwayHistory: [
      { label: "Jun 06", observed: 10.3, stressed: 8.5 },
      { label: "Jun 13", observed: 10.1, stressed: 8.2 },
      { label: "Jun 20", observed: 9.9, stressed: 8.0 },
      { label: "Jun 27", observed: 9.7, stressed: 7.8 },
      { label: "Jul 04", observed: 9.5, stressed: 7.6 },
      { label: "Jul 11", observed: 9.3, stressed: 7.4 },
      { label: "Jul 16", observed: 9.2, stressed: 7.2 },
    ],
    setupSteps: [
      "Connect the payout corridor wallets.",
      "Map beneficiaries to verified labels.",
      "Define corridor-specific concentration limits.",
      "Review the first payout risk pack.",
    ],
    demoNote: "Seeded demo data only. No live wallet, price, or transfer connection.",
  },
  {
    id: "risk",
    label: "Atlas Foundation",
    organization: "Atlas Foundation",
    segment: "Protocol treasury and reserve ops",
    stateLabel: "Risk-focused recovery mode",
    summary:
      "Low runway, a blocked sweep path, and a DeFi sleeve that needs an orderly unwind.",
    updatedAt: "2026-07-16T10:42:00Z",
    burnUsdPerMonth: 618000,
    basePolicyScore: 66,
    stressRunwayDragAt100: 4.8,
    stressCapitalAt100: 1940000,
    defaultStress: 68,
    wallets: [
      {
        id: "risk-bridge",
        label: "Treasury Bridge",
        address: "demo:0x115b…b11f",
        chain: "Ethereum",
        custody: "Exchange omnibus",
        role: "Operational bridge",
        kind: "stablecoin",
        bucket: "same-day",
        balanceUsd: 1100000,
        availableUsd: 600000,
        riskState: "breach",
        provenance: "bridge account snapshot + ops label",
        screening: "Counterparty review expired",
        counterparties: ["Exchange bridge", "OTC desk"],
        freshness: "7m",
        lastMovement: "58m ago · bridge replenishment",
        notes: "Too much of the treasury depends on this lane.",
      },
      {
        id: "risk-cold",
        label: "Cold Reserve",
        address: "demo:0xa9bf…d24f",
        chain: "Ethereum",
        custody: "Cold vault",
        role: "Reserve buffer",
        kind: "stablecoin",
        bucket: "delayed",
        balanceUsd: 980000,
        availableUsd: 520000,
        riskState: "watch",
        provenance: "segregated reserve snapshot",
        screening: "Approval pending",
        counterparties: ["Reserve committee"],
        freshness: "16m",
        lastMovement: "Yesterday · reserve sweep paused",
        notes: "The reserve is intact, but it is not ready for instant use.",
      },
      {
        id: "risk-yield",
        label: "DeFi Yield",
        address: "demo:0x77ac…22de",
        chain: "Arbitrum",
        custody: "Protocol position",
        role: "Yield sleeve",
        kind: "yield",
        bucket: "delayed",
        balanceUsd: 750000,
        availableUsd: 320000,
        riskState: "watch",
        provenance: "position snapshot + unwind note",
        screening: "Smart contract risk under review",
        counterparties: ["Aave", "Treasury router"],
        freshness: "29m",
        lastMovement: "Today · unwind ticket opened",
        notes: "Unwind requires a multi-step route and more than a day.",
      },
      {
        id: "risk-payouts",
        label: "Pending Payouts",
        address: "demo:base-payout-09",
        chain: "Base",
        custody: "Fireblocks MPC",
        role: "Near-term obligations",
        kind: "stablecoin",
        bucket: "immediate",
        balanceUsd: 540000,
        availableUsd: 450000,
        riskState: "healthy",
        provenance: "payments queue + ledger",
        screening: "Beneficiary verified",
        counterparties: ["Vendor batch", "Payroll partner"],
        freshness: "4m",
        lastMovement: "22m ago · payout batch staged",
        notes: "These obligations are fine if they can be released on time.",
      },
      {
        id: "risk-blocked",
        label: "Blocked Sweep",
        address: "demo:offchain-block-01",
        chain: "Off-chain",
        custody: "Bank sweep",
        role: "Blocked lane",
        kind: "fiat",
        bucket: "restricted",
        balanceUsd: 610000,
        availableUsd: 0,
        riskState: "breach",
        provenance: "blocked asset record",
        screening: "OFAC / legal hold",
        counterparties: ["Blocked counterparty"],
        freshness: "12m",
        lastMovement: "Paused · blocked by compliance",
        notes: "This lane is not available until the hold clears.",
      },
    ],
    alerts: [
      {
        id: "risk-alert-1",
        severity: "critical",
        title: "Blocked address is in the sweep path",
        detail:
          "A compliance hold sits on one of the treasury lanes and must be isolated before any movement resumes.",
        impactUsd: 610000,
        recommendation: "Freeze the sweep route and isolate the blocked asset.",
        source: "Compliance engine",
      },
      {
        id: "risk-alert-2",
        severity: "high",
        title: "Runway drops below 30 days under stress",
        detail:
          "The current liquid runway is thin enough that any settlement delay becomes material.",
        impactUsd: 1320000,
        recommendation: "Escalate to the board and preserve same-day liquidity.",
        source: "Runway model",
      },
      {
        id: "risk-alert-3",
        severity: "high",
        title: "Counterparty concentration is above the allowed ceiling",
        detail:
          "The operational bridge has too much of the treasury for a single lane to be comfortable.",
        impactUsd: 1100000,
        recommendation:
          "Split the bridge across at least one additional approved counterparty.",
        source: "Policy engine",
      },
      {
        id: "risk-alert-4",
        severity: "high",
        title: "DeFi unwind window exceeds 48 hours",
        detail:
          "The yield sleeve cannot be liquidated fast enough to protect all obligations under stress.",
        impactUsd: 750000,
        recommendation:
          "Start the unwind immediately and document the reserve impact.",
        source: "Treasury ops",
      },
      {
        id: "risk-alert-5",
        severity: "medium",
        title: "One beneficiary record has not been re-screened",
        detail:
          "A payout record is still using an outdated beneficiary check and needs a refresh.",
        impactUsd: 54000,
        recommendation: "Refresh beneficiary data before the next release.",
        source: "Compliance queue",
      },
      {
        id: "risk-alert-6",
        severity: "medium",
        title: "Cold reserve still requires batch approval",
        detail:
          "The reserve is available only after the next approval round, which makes it poor same-day capital.",
        impactUsd: 980000,
        recommendation: "Pre-approve a smaller emergency tranche.",
        source: "Approval workflow",
      },
    ],
    actions: [
      {
        id: "risk-action-1",
        title: "Freeze the blocked sweep lane",
        detail:
          "Separates compliance-hold capital from the rest of the treasury and removes the immediate breach risk.",
        impact: "Remove critical breach",
        confidence: "Certain",
        eta: "1 min",
      },
      {
        id: "risk-action-2",
        title: "Start the DeFi unwind now",
        detail:
          "Recovers delayed capital before the next obligations hit the runway.",
        impact: "Recover liquidity over 48h",
        confidence: "High confidence",
        eta: "15 min",
      },
      {
        id: "risk-action-3",
        title: "Prepare the board pack and escalation note",
        detail:
          "Explains the runway, blocked capital, and top concentration risks in a single pass.",
        impact: "Ready for review",
        confidence: "High confidence",
        eta: "10 min",
      },
    ],
    policyStack: [
      {
        label: "MPC approvals",
        value: "2 of 3 required",
        state: "watch",
      },
      {
        label: "Allowlisted destinations",
        value: "Below minimum coverage",
        state: "breach",
      },
      {
        label: "OFAC sync",
        value: "Updated 22m ago",
        state: "watch",
      },
      {
        label: "Blocked-asset handling",
        value: "Active hold",
        state: "breach",
      },
      {
        label: "Board export",
        value: "Needs refresh",
        state: "watch",
      },
    ],
    events: [
      {
        when: "11:02 UTC",
        title: "Blocked asset recorded",
        detail: "A sweep route now carries a compliance hold and is paused.",
        source: "Compliance engine",
      },
      {
        when: "09:15 UTC",
        title: "Cold reserve sweep paused",
        detail: "Batch approval did not clear in time for same-day release.",
        source: "Treasury ops",
      },
      {
        when: "Yesterday",
        title: "DeFi unwind ticket opened",
        detail: "The yield sleeve needs an orderly exit path before obligations hit.",
        source: "Risk ops",
      },
    ],
    runwayHistory: [
      { label: "Jun 06", observed: 4.8, stressed: 2.2 },
      { label: "Jun 13", observed: 4.6, stressed: 2.0 },
      { label: "Jun 20", observed: 4.5, stressed: 1.8 },
      { label: "Jun 27", observed: 4.3, stressed: 1.6 },
      { label: "Jul 04", observed: 4.1, stressed: 1.4 },
      { label: "Jul 11", observed: 3.9, stressed: 1.2 },
      { label: "Jul 16", observed: 3.7, stressed: 1.0 },
    ],
    setupSteps: [
      "Connect all sweep lanes and blocklists.",
      "Map beneficiary screens to every payout wallet.",
      "Define emergency reserve approval rules.",
      "Generate the first risk escalation packet.",
    ],
    demoNote: "Seeded demo data only. No live wallet, price, or transfer connection.",
  },
  {
    id: "empty",
    label: "Blank Workspace",
    organization: "Blank Workspace",
    segment: "New treasury",
    stateLabel: "Empty onboarding state",
    summary:
      "No wallets are connected yet, so the dashboard is showing the setup path rather than fake balances.",
    updatedAt: "2026-07-16T10:42:00Z",
    burnUsdPerMonth: 0,
    basePolicyScore: 0,
    stressRunwayDragAt100: 0,
    stressCapitalAt100: 0,
    defaultStress: 0,
    wallets: [],
    alerts: [],
    actions: [],
    policyStack: [
      {
        label: "Wallet snapshots",
        value: "Not connected",
        state: "watch",
      },
      {
        label: "Policies",
        value: "Not configured",
        state: "watch",
      },
      {
        label: "Screening",
        value: "Not configured",
        state: "watch",
      },
      {
        label: "Board export",
        value: "Not available yet",
        state: "watch",
      },
    ],
    events: [],
    runwayHistory: [],
    setupSteps: [
      "Connect watch-only wallets or import a treasury CSV.",
      "Create a treasury address book with labels and counterparties.",
      "Set policy thresholds for runway, concentration, and screening.",
      "Review the first seeded snapshot with the finance team.",
    ],
    demoNote: "Seeded demo data only. No live wallet, price, or transfer connection.",
  },
]

