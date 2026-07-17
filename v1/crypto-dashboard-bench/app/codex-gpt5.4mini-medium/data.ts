export type ViewId = "overview" | "wallets" | "controls" | "audit"
export type TimeRange = "24h" | "7d" | "30d"
export type TriageLevel = "all" | "watch" | "critical"

export type Alert = {
  id: string
  severity: "info" | "watch" | "critical"
  title: string
  detail: string
  timestamp: string
  source: string
  action: string
}

export type Counterparty = {
  name: string
  category: string
  exposureUsd: number
  risk: "Low" | "Medium" | "High"
  lastTouch: string
  note: string
}

export type Holding = {
  asset: string
  chain: string
  amount: string
  usd: number
  issuer: string
  provenance: string
  risk: "Low" | "Medium" | "High"
}

export type Activity = {
  id: string
  time: string
  actor: string
  action: string
  outcome: string
}

export type TreasuryVault = {
  id: string
  name: string
  legalEntity: string
  status: "Healthy" | "Watch" | "Escalated"
  summary: string
  decision: string
  totalValueUsd: number
  dailyBurnUsd: number
  runwayDays: number
  cashLikePct: number
  policyHeadroomPct: number
  concentrationPct: number
  riskIndex: number
  lastSweep: string
  updatedAt: string
  sourceNote: string
  chainSplit: { chain: string; value: number; color: string }[]
  holdings: Holding[]
  counterparties: Counterparty[]
  alerts: Alert[]
  activity: Activity[]
  balanceSeries: { label: string; value: number; floor: number }[]
  riskSeries: { label: string; score: number; threshold: number }[]
}

export const viewTabs: { id: ViewId; label: string; description: string }[] = [
  {
    id: "overview",
    label: "Overview",
    description: "Runway, concentration, and alert context in one screen.",
  },
  {
    id: "wallets",
    label: "Wallets",
    description: "Vault balances, counterparties, and chain split.",
  },
  {
    id: "controls",
    label: "Controls",
    description: "Sensitivity, approvals, and review actions.",
  },
  {
    id: "audit",
    label: "Audit",
    description: "Recent decisions and provenance notes.",
  },
]

export const timeRanges: { id: TimeRange; label: string; window: string }[] = [
  { id: "24h", label: "24h", window: "Intraday" },
  { id: "7d", label: "7d", window: "7-day" },
  { id: "30d", label: "30d", window: "30-day" },
]

export const triageLevels: { id: TriageLevel; label: string; hint: string }[] = [
  { id: "all", label: "All", hint: "show every seeded alert" },
  { id: "watch", label: "Watch", hint: "hide informational noise" },
  { id: "critical", label: "Critical", hint: "show only urgent issues" },
]

export const provenanceCards = [
  {
    label: "Balances",
    detail:
      "Dune-style chain views for balances and transfers. Freshness varies by table type, so the UI labels price, chain, and curated data separately.",
  },
  {
    label: "Prices",
    detail:
      "CoinGecko-style market data with a 1 to 5 minute cache window and explicit historical charting so the demo never implies sub-second live pricing.",
  },
  {
    label: "Screening",
    detail:
      "Chainalysis/OFAC-style transaction monitoring and sanctions review to surface direct or indirect exposure before movement is approved.",
  },
  {
    label: "Controls",
    detail:
      "Fireblocks-style vaults, policy rules, and approval chains so treasury headroom is visible before any transfer is treated as safe.",
  },
]

const atlas: TreasuryVault = {
  id: "atlas",
  name: "Atlas Treasury",
  legalEntity: "Northstar Markets LLC",
  status: "Healthy",
  summary:
    "Primary operating reserve with a high cash-like mix and low open exception rate.",
  decision: "Hold current posture and keep auto-sweep enabled.",
  totalValueUsd: 128_400_000,
  dailyBurnUsd: 2_400_000,
  runwayDays: 54,
  cashLikePct: 84,
  policyHeadroomPct: 71,
  concentrationPct: 23,
  riskIndex: 24,
  lastSweep: "Today 08:10 UTC",
  updatedAt: "2026-07-16 09:05 UTC",
  sourceNote:
    "Demo values were seeded to mirror a low-friction treasury with mostly stablecoin exposure and a small reserve basket.",
  chainSplit: [
    { chain: "Ethereum", value: 62_100_000, color: "#4ade80" },
    { chain: "Base", value: 33_800_000, color: "#38bdf8" },
    { chain: "Arbitrum", value: 18_900_000, color: "#c4b5fd" },
    { chain: "Solana", value: 13_600_000, color: "#f59e0b" },
  ],
  holdings: [
    {
      asset: "USDC",
      chain: "Ethereum",
      amount: "61,240,000",
      usd: 61_240_000,
      issuer: "Circle",
      provenance: "Treasury reserve",
      risk: "Low",
    },
    {
      asset: "USDC",
      chain: "Base",
      amount: "27,110,000",
      usd: 27_110_000,
      issuer: "Circle",
      provenance: "Ops sweep",
      risk: "Low",
    },
    {
      asset: "USDT",
      chain: "Ethereum",
      amount: "11,350,000",
      usd: 11_350_000,
      issuer: "Tether",
      provenance: "Liquidity buffer",
      risk: "Medium",
    },
    {
      asset: "ETH",
      chain: "Ethereum",
      amount: "3,820",
      usd: 11_340_000,
      issuer: "Market reserve",
      provenance: "Hedging sleeve",
      risk: "Medium",
    },
    {
      asset: "BTC",
      chain: "Solana",
      amount: "190",
      usd: 17_360_000,
      issuer: "Reserve sleeve",
      provenance: "Long-duration treasury",
      risk: "Medium",
    },
  ],
  counterparties: [
    {
      name: "Circle Mint",
      category: "Issuer",
      exposureUsd: 43_200_000,
      risk: "Low",
      lastTouch: "2h ago",
      note: "Primary stablecoin mint and redemption path.",
    },
    {
      name: "Fireblocks Network",
      category: "Custody rail",
      exposureUsd: 33_800_000,
      risk: "Low",
      lastTouch: "17m ago",
      note: "Internal sweep route with policy checks enforced.",
    },
    {
      name: "Coinbase Prime",
      category: "Venue",
      exposureUsd: 21_500_000,
      risk: "Low",
      lastTouch: "1d ago",
      note: "Rebalance venue for reserve management.",
    },
    {
      name: "Kraken OTC",
      category: "Liquidity desk",
      exposureUsd: 10_400_000,
      risk: "Medium",
      lastTouch: "3d ago",
      note: "Used for larger conversions and hedging fills.",
    },
  ],
  alerts: [
    {
      id: "atlas-1",
      severity: "watch",
      title: "Manual review threshold hit once during the last sweep",
      detail:
        "The move stayed inside policy, but it crossed the 10M review threshold and was paused for 11 minutes.",
      timestamp: "Today 08:21 UTC",
      source: "Policy engine",
      action: "Review the threshold or keep the pause in place.",
    },
    {
      id: "atlas-2",
      severity: "info",
      title: "Reserve mix remained above cash-like target",
      detail:
        "Stablecoin coverage stayed above the 80% target after the ETH hedge rebalance.",
      timestamp: "Today 07:50 UTC",
      source: "Balance monitor",
      action: "No action required.",
    },
  ],
  activity: [
    {
      id: "atlas-a1",
      time: "08:10 UTC",
      actor: "Treasury bot",
      action: "Sweep executed from ops wallet",
      outcome: "Completed after 2 approvals.",
    },
    {
      id: "atlas-a2",
      time: "07:48 UTC",
      actor: "Finance lead",
      action: "Updated burn forecast",
      outcome: "Runway model recalculated at 54 days.",
    },
    {
      id: "atlas-a3",
      time: "Yesterday",
      actor: "Compliance",
      action: "Sanctions watchlist refreshed",
      outcome: "No matches on current watchlist.",
    },
  ],
  balanceSeries: [
    { label: "Jul 1", value: 119.2, floor: 111.8 },
    { label: "Jul 4", value: 120.8, floor: 111.8 },
    { label: "Jul 7", value: 122.9, floor: 112.1 },
    { label: "Jul 10", value: 124.1, floor: 112.1 },
    { label: "Jul 12", value: 126.8, floor: 112.6 },
    { label: "Jul 14", value: 127.5, floor: 112.6 },
    { label: "Jul 15", value: 128.1, floor: 112.9 },
    { label: "Jul 16", value: 128.4, floor: 113.0 },
  ],
  riskSeries: [
    { label: "Jul 1", score: 31, threshold: 64 },
    { label: "Jul 4", score: 30, threshold: 64 },
    { label: "Jul 7", score: 29, threshold: 64 },
    { label: "Jul 10", score: 28, threshold: 64 },
    { label: "Jul 12", score: 27, threshold: 64 },
    { label: "Jul 14", score: 26, threshold: 64 },
    { label: "Jul 15", score: 25, threshold: 64 },
    { label: "Jul 16", score: 24, threshold: 64 },
  ],
}

const meridian: TreasuryVault = {
  id: "meridian",
  name: "Meridian Ops",
  legalEntity: "Meridian Protocol Ltd.",
  status: "Watch",
  summary:
    "Liquidity is still usable, but bridge exposure and burn rate need attention before the next rebalance.",
  decision: "Tighten transfer thresholds and review bridge routes.",
  totalValueUsd: 42_800_000,
  dailyBurnUsd: 2_000_000,
  runwayDays: 18,
  cashLikePct: 67,
  policyHeadroomPct: 43,
  concentrationPct: 37,
  riskIndex: 61,
  lastSweep: "Today 06:35 UTC",
  updatedAt: "2026-07-16 08:58 UTC",
  sourceNote:
    "Seeded as a mid-risk operating treasury with a heavier bridge and exchange footprint than the healthy baseline.",
  chainSplit: [
    { chain: "Ethereum", value: 18_300_000, color: "#4ade80" },
    { chain: "Base", value: 9_700_000, color: "#38bdf8" },
    { chain: "Solana", value: 6_100_000, color: "#f59e0b" },
    { chain: "Polygon", value: 8_700_000, color: "#fb7185" },
  ],
  holdings: [
    {
      asset: "USDC",
      chain: "Base",
      amount: "20,300,000",
      usd: 20_300_000,
      issuer: "Circle",
      provenance: "Daily operating reserve",
      risk: "Low",
    },
    {
      asset: "USDT",
      chain: "Ethereum",
      amount: "7,220,000",
      usd: 7_220_000,
      issuer: "Tether",
      provenance: "Liquidity buffer",
      risk: "Medium",
    },
    {
      asset: "ETH",
      chain: "Ethereum",
      amount: "2,710",
      usd: 8_070_000,
      issuer: "Market reserve",
      provenance: "Hedge sleeve",
      risk: "Medium",
    },
    {
      asset: "SOL",
      chain: "Solana",
      amount: "18,500",
      usd: 3_790_000,
      issuer: "Treasury reserve",
      provenance: "Lending collateral",
      risk: "High",
    },
    {
      asset: "stETH",
      chain: "Ethereum",
      amount: "1,330",
      usd: 3_420_000,
      issuer: "Lido",
      provenance: "Yield sleeve",
      risk: "Medium",
    },
  ],
  counterparties: [
    {
      name: "Wintermute",
      category: "Liquidity desk",
      exposureUsd: 9_200_000,
      risk: "Medium",
      lastTouch: "45m ago",
      note: "Execution partner for reserve rotations.",
    },
    {
      name: "Binance",
      category: "Venue",
      exposureUsd: 8_600_000,
      risk: "High",
      lastTouch: "2h ago",
      note: "High counterparty concentration on this vault.",
    },
    {
      name: "Anchorage",
      category: "Custody",
      exposureUsd: 7_400_000,
      risk: "Medium",
      lastTouch: "6h ago",
      note: "Cold storage transfer route pending approval.",
    },
    {
      name: "Stargate bridge",
      category: "Bridge",
      exposureUsd: 6_100_000,
      risk: "High",
      lastTouch: "1d ago",
      note: "Bridge route remains on watch because of layered hops.",
    },
  ],
  alerts: [
    {
      id: "meridian-1",
      severity: "critical",
      title: "Indirect exposure traced through bridge path",
      detail:
        "A route touching a high-risk cluster is still within policy but should be reviewed before the next send.",
      timestamp: "Today 06:41 UTC",
      source: "KYT monitor",
      action: "Escalate to compliance and hold transfers.",
    },
    {
      id: "meridian-2",
      severity: "watch",
      title: "USDT concentration is above the internal target",
      detail:
        "The vault has 17 percentage points more USDT than the treasury policy calls for.",
      timestamp: "Today 06:18 UTC",
      source: "Allocation monitor",
      action: "Plan a partial rebalance to cash-like assets.",
    },
    {
      id: "meridian-3",
      severity: "watch",
      title: "Burn rate moved up 22% versus the prior 14-day average",
      detail:
        "The runway estimate fell from 23 days to 18 days after the product rollout in the APAC region.",
      timestamp: "Today 05:50 UTC",
      source: "Forecast engine",
      action: "Refresh the weekly burn plan.",
    },
    {
      id: "meridian-4",
      severity: "info",
      title: "One approval remains open for the next sweep",
      detail:
        "The transaction is queued and waiting on the second signer.",
      timestamp: "Today 05:31 UTC",
      source: "Approval queue",
      action: "Keep monitoring the pending signer.",
    },
  ],
  activity: [
    {
      id: "meridian-a1",
      time: "06:35 UTC",
      actor: "Treasury manager",
      action: "Created draft rebalance policy",
      outcome: "Limits tightened for bridge destinations.",
    },
    {
      id: "meridian-a2",
      time: "06:12 UTC",
      actor: "Risk desk",
      action: "Reviewed counterparty exposure",
      outcome: "Flagged Binance and Stargate as the highest concentration.",
    },
    {
      id: "meridian-a3",
      time: "Yesterday",
      actor: "Operations",
      action: "Updated burn forecast inputs",
      outcome: "Forecast now assumes 2.0M daily burn.",
    },
  ],
  balanceSeries: [
    { label: "Jul 1", value: 47.6, floor: 39.8 },
    { label: "Jul 4", value: 46.9, floor: 39.8 },
    { label: "Jul 7", value: 45.8, floor: 40.2 },
    { label: "Jul 10", value: 44.9, floor: 40.2 },
    { label: "Jul 12", value: 44.1, floor: 40.5 },
    { label: "Jul 14", value: 43.4, floor: 40.5 },
    { label: "Jul 15", value: 42.9, floor: 40.9 },
    { label: "Jul 16", value: 42.8, floor: 40.9 },
  ],
  riskSeries: [
    { label: "Jul 1", score: 49, threshold: 58 },
    { label: "Jul 4", score: 51, threshold: 58 },
    { label: "Jul 7", score: 54, threshold: 58 },
    { label: "Jul 10", score: 56, threshold: 58 },
    { label: "Jul 12", score: 58, threshold: 58 },
    { label: "Jul 14", score: 59, threshold: 58 },
    { label: "Jul 15", score: 60, threshold: 58 },
    { label: "Jul 16", score: 61, threshold: 58 },
  ],
}

const harbor: TreasuryVault = {
  id: "harbor",
  name: "Harbor Recovery",
  legalEntity: "Harbor Realtime Holdings",
  status: "Escalated",
  summary:
    "Concentration is high, runway is short, and a sanctions review is still open.",
  decision: "Freeze outbound transfers until the review is closed.",
  totalValueUsd: 9_200_000,
  dailyBurnUsd: 1_600_000,
  runwayDays: 6,
  cashLikePct: 41,
  policyHeadroomPct: 19,
  concentrationPct: 71,
  riskIndex: 86,
  lastSweep: "Yesterday 23:14 UTC",
  updatedAt: "2026-07-16 08:52 UTC",
  sourceNote:
    "Seeded as a stressed vault with layered bridge routes, limited runway, and a clear escalation path.",
  chainSplit: [
    { chain: "Ethereum", value: 2_100_000, color: "#4ade80" },
    { chain: "Tron", value: 3_400_000, color: "#38bdf8" },
    { chain: "Polygon", value: 1_600_000, color: "#f59e0b" },
    { chain: "BSC", value: 2_100_000, color: "#fb7185" },
  ],
  holdings: [
    {
      asset: "USDC",
      chain: "Ethereum",
      amount: "3,120,000",
      usd: 3_120_000,
      issuer: "Circle",
      provenance: "Emergency buffer",
      risk: "Low",
    },
    {
      asset: "USDT",
      chain: "Tron",
      amount: "1,910,000",
      usd: 1_910_000,
      issuer: "Tether",
      provenance: "High-velocity operations",
      risk: "Medium",
    },
    {
      asset: "DAI",
      chain: "Polygon",
      amount: "720,000",
      usd: 720_000,
      issuer: "Maker",
      provenance: "Legacy reserve",
      risk: "Medium",
    },
    {
      asset: "MATIC",
      chain: "Polygon",
      amount: "1,400,000",
      usd: 770_000,
      issuer: "Network reserve",
      provenance: "Collateralized route",
      risk: "High",
    },
    {
      asset: "ETH",
      chain: "BSC",
      amount: "380",
      usd: 680_000,
      issuer: "Market reserve",
      provenance: "Small hedge sleeve",
      risk: "High",
    },
  ],
  counterparties: [
    {
      name: "Unknown OTC desk",
      category: "Liquidity desk",
      exposureUsd: 2_700_000,
      risk: "High",
      lastTouch: "32m ago",
      note: "No verified entity label on the current path.",
    },
    {
      name: "Tornado-linked hop",
      category: "Hop cluster",
      exposureUsd: 1_400_000,
      risk: "High",
      lastTouch: "3h ago",
      note: "Screening route requires escalation before release.",
    },
    {
      name: "Bridge router",
      category: "Bridge",
      exposureUsd: 2_200_000,
      risk: "High",
      lastTouch: "5h ago",
      note: "Layered hop count is above the accepted policy limit.",
    },
    {
      name: "Regional exchange",
      category: "Venue",
      exposureUsd: 1_900_000,
      risk: "Medium",
      lastTouch: "1d ago",
      note: "Used for an earlier conversion and now on enhanced due diligence.",
    },
  ],
  alerts: [
    {
      id: "harbor-1",
      severity: "critical",
      title: "Sanctions screen returned an unresolved match",
      detail:
        "A wallet in the outbound route is close enough to the watchlist cluster to require manual review.",
      timestamp: "Today 04:22 UTC",
      source: "OFAC screen",
      action: "Freeze transfers until the case is closed.",
    },
    {
      id: "harbor-2",
      severity: "critical",
      title: "Runway fell below the 7-day emergency policy",
      detail:
        "The current burn rate leaves less than one week of coverage if no rebalance occurs.",
      timestamp: "Today 03:58 UTC",
      source: "Forecast engine",
      action: "Escalate to finance leadership immediately.",
    },
    {
      id: "harbor-3",
      severity: "critical",
      title: "Outbound destination remains above the transfer limit",
      detail:
        "The next send would exceed the current approval and amount cap.",
      timestamp: "Today 03:44 UTC",
      source: "Policy engine",
      action: "Require a new policy draft before any movement.",
    },
    {
      id: "harbor-4",
      severity: "watch",
      title: "Stablecoin concentration sits at 71% in a single operating wallet",
      detail:
        "The wallet is operationally simple but policy-wise too concentrated for the current controls.",
      timestamp: "Today 03:16 UTC",
      source: "Allocation monitor",
      action: "Split the wallet into segregated vaults.",
    },
    {
      id: "harbor-5",
      severity: "watch",
      title: "Bridge path includes three distinct hops",
      detail:
        "The route is operationally valid but carries more latency and screening overhead than preferred.",
      timestamp: "Today 02:48 UTC",
      source: "Routing monitor",
      action: "Prefer an internal sweep route.",
    },
    {
      id: "harbor-6",
      severity: "info",
      title: "Enhanced due diligence file is still attached",
      detail:
        "The last analyst note remains open for the OTC route.",
      timestamp: "Yesterday",
      source: "Case log",
      action: "Archive after sign-off.",
    },
  ],
  activity: [
    {
      id: "harbor-a1",
      time: "Today 03:59 UTC",
      actor: "Compliance desk",
      action: "Opened escalation case",
      outcome: "Outbound sends placed in hold status.",
    },
    {
      id: "harbor-a2",
      time: "Yesterday 23:14 UTC",
      actor: "Treasury bot",
      action: "Paused auto-sweep",
      outcome: "Manual approval required for all movements.",
    },
    {
      id: "harbor-a3",
      time: "Yesterday",
      actor: "Ops lead",
      action: "Attached incident memo",
      outcome: "Memo notes sanctions review and bridge exposure.",
    },
  ],
  balanceSeries: [
    { label: "Jul 1", value: 12.4, floor: 10.2 },
    { label: "Jul 4", value: 11.8, floor: 10.2 },
    { label: "Jul 7", value: 11.1, floor: 10.5 },
    { label: "Jul 10", value: 10.4, floor: 10.5 },
    { label: "Jul 12", value: 10.0, floor: 10.6 },
    { label: "Jul 14", value: 9.7, floor: 10.6 },
    { label: "Jul 15", value: 9.4, floor: 10.7 },
    { label: "Jul 16", value: 9.2, floor: 10.7 },
  ],
  riskSeries: [
    { label: "Jul 1", score: 73, threshold: 54 },
    { label: "Jul 4", score: 75, threshold: 54 },
    { label: "Jul 7", score: 78, threshold: 54 },
    { label: "Jul 10", score: 81, threshold: 54 },
    { label: "Jul 12", score: 83, threshold: 54 },
    { label: "Jul 14", score: 84, threshold: 54 },
    { label: "Jul 15", score: 85, threshold: 54 },
    { label: "Jul 16", score: 86, threshold: 54 },
  ],
}

export const vaults: TreasuryVault[] = [atlas, meridian, harbor]

export function getVaultById(vaultId: string) {
  return vaults.find((vault) => vault.id === vaultId) ?? vaults[0]
}

