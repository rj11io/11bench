import type { LucideIcon } from "lucide-react"
import {
  Activity,
  AlertTriangle,
  Database,
  FileCheck2,
  Gauge,
  Layers3,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

export type ScenarioId = "normal" | "volatile" | "depeg" | "empty"
export type Status = "critical" | "warning" | "monitor" | "ok"
export type TabId = "control" | "exposure" | "stablecoins" | "evidence"

export type Metric = {
  label: string
  value: string
  detail: string
  status: Status
  icon: LucideIcon
}

export type AssetCategory =
  | "Stablecoin"
  | "Native"
  | "Governance"
  | "RWA"
  | "Protocol"

export type Asset = {
  symbol: string
  name: string
  category: AssetCategory
  amount: string
  value: number
  share: number
  price: number
  change24h: number
  liquidityDepth: number
  source: string
  status: Status
  note: string
}

export type Wallet = {
  name: string
  custody: string
  chain: string
  value: number
  liquid24h: number
  policyLimit: number
  exposure: number
  status: Status
}

export type Alert = {
  id: string
  title: string
  severity: Status
  time: string
  source: string
  summary: string
  policy: string
  decision: string
  affected: string[]
  evidence: string[]
}

export type RunbookStep = {
  id: string
  label: string
  route: string
  estimatedUsd: number
  riskReduced: number
  defaultSelected: boolean
}

export type PolicyCheck = {
  label: string
  current: string
  limit: string
  status: Status
}

export type Source = {
  label: string
  freshness: string
  provenance: string
  status: Status
}

export type SeriesPoint = {
  label: string
  runway?: number
  stress?: number
  usdc?: number
  usdt?: number
  dai?: number
  liquidity?: number
}

export type Counterparty = {
  name: string
  type: string
  share: number
  limit: number
  value: number
  status: Status
}

export type Scenario = {
  id: ScenarioId
  label: string
  shortLabel: string
  tone: string
  description: string
  asOf: string
  health: number
  metrics: Metric[]
  assets: Asset[]
  wallets: Wallet[]
  alerts: Alert[]
  runbookSteps: RunbookStep[]
  policyChecks: PolicyCheck[]
  sources: Source[]
  runway: SeriesPoint[]
  peg: SeriesPoint[]
  counterparties: Counterparty[]
}

const normalAssets: Asset[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    category: "Stablecoin",
    amount: "12.40M",
    value: 12390000,
    share: 29.6,
    price: 0.9993,
    change24h: -0.07,
    liquidityDepth: 65000000,
    source: "CoinGecko markets + issuer disclosure mirror",
    status: "monitor",
    note: "Issuer exposure below hard limit, above target band.",
  },
  {
    symbol: "ETH",
    name: "Ether",
    category: "Native",
    amount: "4,650",
    value: 16047000,
    share: 38.4,
    price: 3451,
    change24h: 1.8,
    liquidityDepth: 92000000,
    source: "CoinGecko markets + Coinbase Prime custody report",
    status: "ok",
    note: "Largest strategic reserve asset.",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    category: "Stablecoin",
    amount: "4.80M",
    value: 4801000,
    share: 11.5,
    price: 1.0002,
    change24h: 0.02,
    liquidityDepth: 74000000,
    source: "CoinGecko markets",
    status: "ok",
    note: "Used for exchange settlement only.",
  },
  {
    symbol: "DAI",
    name: "Dai",
    category: "Stablecoin",
    amount: "3.10M",
    value: 3097000,
    share: 7.4,
    price: 0.999,
    change24h: -0.03,
    liquidityDepth: 19000000,
    source: "CoinGecko markets + Dune transfer pricing caveat",
    status: "ok",
    note: "Protocol-issued stablecoin with DeFi collateral exposure.",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    category: "Native",
    amount: "72",
    value: 4542000,
    share: 10.9,
    price: 63082,
    change24h: 0.9,
    liquidityDepth: 28000000,
    source: "CoinGecko markets",
    status: "monitor",
    note: "Bridge and custodian dependency tracked separately.",
  },
  {
    symbol: "T-BILL",
    name: "Tokenized treasury fund",
    category: "RWA",
    amount: "0.92M",
    value: 920000,
    share: 2.2,
    price: 1,
    change24h: 0,
    liquidityDepth: 4600000,
    source: "Fund administrator CSV import",
    status: "ok",
    note: "Manual same-day NAV import.",
  },
]

const normalWallets: Wallet[] = [
  {
    name: "Foundation Safe",
    custody: "Safe 5 of 8",
    chain: "Ethereum",
    value: 18600000,
    liquid24h: 6200000,
    policyLimit: 45,
    exposure: 44.5,
    status: "monitor",
  },
  {
    name: "Fireblocks MPC",
    custody: "MPC warm",
    chain: "Multi-chain",
    value: 9700000,
    liquid24h: 8400000,
    policyLimit: 30,
    exposure: 23.2,
    status: "ok",
  },
  {
    name: "Coinbase Prime",
    custody: "Qualified custody",
    chain: "Off-chain + ETH",
    value: 8400000,
    liquid24h: 8000000,
    policyLimit: 25,
    exposure: 20.1,
    status: "monitor",
  },
  {
    name: "Aave V3 ops",
    custody: "Protocol position",
    chain: "Base",
    value: 3200000,
    liquid24h: 1800000,
    policyLimit: 10,
    exposure: 7.7,
    status: "ok",
  },
  {
    name: "Payroll hot wallet",
    custody: "2 of 3 signer",
    chain: "Ethereum",
    value: 1900000,
    liquid24h: 1900000,
    policyLimit: 8,
    exposure: 4.5,
    status: "ok",
  },
]

const baseSources: Source[] = [
  {
    label: "Wallet balances",
    freshness: "Snapshot 2026-07-16 09:30 UTC",
    provenance: "Seeded Safe, Fireblocks, Coinbase Prime, and protocol rows",
    status: "ok",
  },
  {
    label: "Market prices",
    freshness: "Seeded 15 minute cadence",
    provenance: "Modeled after CoinGecko market data fields",
    status: "monitor",
  },
  {
    label: "On-chain flows",
    freshness: "Seeded 45 minute warehouse delay",
    provenance: "Modeled after Dune curated transfers and labels",
    status: "monitor",
  },
  {
    label: "Policy register",
    freshness: "Manual policy v2026.07",
    provenance: "Board-approved limits imported as CSV",
    status: "ok",
  },
]

const normalRunway: SeriesPoint[] = [
  { label: "Jul", runway: 18.4, stress: 14.9, liquidity: 22.1 },
  { label: "Aug", runway: 18.1, stress: 14.3, liquidity: 21.4 },
  { label: "Sep", runway: 17.7, stress: 13.9, liquidity: 20.6 },
  { label: "Oct", runway: 17.2, stress: 13.5, liquidity: 19.8 },
  { label: "Nov", runway: 16.8, stress: 13.1, liquidity: 19.2 },
  { label: "Dec", runway: 16.3, stress: 12.7, liquidity: 18.7 },
]

const normalPeg: SeriesPoint[] = [
  { label: "00:00", usdc: 0.9997, usdt: 1.0001, dai: 0.9993 },
  { label: "04:00", usdc: 0.9995, usdt: 0.9999, dai: 0.9991 },
  { label: "08:00", usdc: 0.9993, usdt: 1.0002, dai: 0.999 },
  { label: "12:00", usdc: 0.9996, usdt: 1.0001, dai: 0.9994 },
  { label: "16:00", usdc: 0.9992, usdt: 1.0002, dai: 0.9992 },
  { label: "20:00", usdc: 0.9993, usdt: 1.0002, dai: 0.999 },
]

export const scenarios: Scenario[] = [
  {
    id: "normal",
    label: "Base operating day",
    shortLabel: "Normal",
    tone: "Policy drift, no crisis",
    description:
      "Daily control room view for a protocol treasury with two non-urgent exceptions.",
    asOf: "2026-07-16 09:30 UTC",
    health: 82,
    metrics: [
      {
        label: "Net treasury",
        value: "$41.8M",
        detail: "Seeded balances across 5 venues",
        status: "ok",
        icon: WalletCards,
      },
      {
        label: "Liquid runway",
        value: "18.4 mo",
        detail: "12 month burn, 25% market shock",
        status: "ok",
        icon: Gauge,
      },
      {
        label: "Risk budget used",
        value: "68%",
        detail: "Issuer, venue, chain, and liquidity caps",
        status: "monitor",
        icon: ShieldCheck,
      },
      {
        label: "Open exceptions",
        value: "2",
        detail: "1 policy drift, 1 signer review",
        status: "monitor",
        icon: AlertTriangle,
      },
    ],
    assets: normalAssets,
    wallets: normalWallets,
    alerts: [
      {
        id: "prime-cap",
        title: "Prime exposure approaching 25% venue cap",
        severity: "warning",
        time: "09:12 UTC",
        source: "Policy register + seeded custody report",
        summary:
          "Coinbase Prime holds 20.1% of net treasury and would cross the cap under the approved ETH-to-USDC sale.",
        policy: "No single off-chain venue may exceed 25% of net treasury.",
        decision:
          "Pre-stage a split custody rebalance before the next market sale is approved.",
        affected: ["USDC", "ETH", "Coinbase Prime", "Fireblocks MPC"],
        evidence: [
          "Seeded custody statement: Coinbase Prime $8.4M at 09:30 UTC.",
          "Board policy v2026.07: single off-chain venue cap 25%.",
          "Scenario stress: planned $2.8M ETH sale would settle to Prime by default.",
        ],
      },
      {
        id: "signer-review",
        title: "Foundation Safe signer review due in 9 days",
        severity: "monitor",
        time: "08:46 UTC",
        source: "Safe owner registry import",
        summary:
          "Two signer keys have not completed quarterly device attestation in the seeded control register.",
        policy:
          "All treasury signers must attest device custody every 90 days.",
        decision: "Schedule signer attestation before the next governance vote.",
        affected: ["Foundation Safe"],
        evidence: [
          "Seeded Safe owner registry: 2 of 8 signers due by 2026-07-25.",
          "No pending module or guard changes detected in demo data.",
        ],
      },
    ],
    runbookSteps: [
      {
        id: "split-settlement",
        label: "Route next $2.0M USDC settlement to Fireblocks MPC",
        route: "Coinbase Prime -> Fireblocks MPC",
        estimatedUsd: 2000000,
        riskReduced: 9,
        defaultSelected: true,
      },
      {
        id: "cold-buffer",
        label: "Move $1.2M operating buffer from Prime to Foundation Safe",
        route: "Coinbase Prime -> Foundation Safe",
        estimatedUsd: 1200000,
        riskReduced: 5,
        defaultSelected: false,
      },
      {
        id: "attestation",
        label: "Request signer device attestation before transaction batch",
        route: "Policy task",
        estimatedUsd: 0,
        riskReduced: 4,
        defaultSelected: true,
      },
    ],
    policyChecks: [
      {
        label: "Issuer concentration",
        current: "USDC 29.6%",
        limit: "Hard cap 35%",
        status: "monitor",
      },
      {
        label: "Off-chain venue concentration",
        current: "Prime 20.1%",
        limit: "Hard cap 25%",
        status: "warning",
      },
      {
        label: "Hot wallet balance",
        current: "4.5%",
        limit: "Hard cap 8%",
        status: "ok",
      },
      {
        label: "Liquidity within 24h",
        current: "$26.3M",
        limit: "Min $20M",
        status: "ok",
      },
    ],
    sources: baseSources,
    runway: normalRunway,
    peg: normalPeg,
    counterparties: [
      {
        name: "Circle / USDC",
        type: "Issuer",
        share: 29.6,
        limit: 35,
        value: 12390000,
        status: "monitor",
      },
      {
        name: "Coinbase Prime",
        type: "Venue",
        share: 20.1,
        limit: 25,
        value: 8400000,
        status: "warning",
      },
      {
        name: "Fireblocks MPC",
        type: "Custody",
        share: 23.2,
        limit: 30,
        value: 9700000,
        status: "ok",
      },
      {
        name: "Aave V3",
        type: "Protocol",
        share: 7.7,
        limit: 10,
        value: 3200000,
        status: "ok",
      },
    ],
  },
  {
    id: "volatile",
    label: "Volatility shock",
    shortLabel: "Volatile",
    tone: "Market drawdown and liquidity thinning",
    description:
      "Seeded stress view after a 24 hour ETH drawdown and thinner stablecoin order books.",
    asOf: "2026-07-16 09:30 UTC",
    health: 61,
    metrics: [
      {
        label: "Net treasury",
        value: "$34.5M",
        detail: "ETH and WBTC marked down in seeded shock",
        status: "warning",
        icon: WalletCards,
      },
      {
        label: "Liquid runway",
        value: "15.1 mo",
        detail: "Runway below 16 month board preference",
        status: "warning",
        icon: Gauge,
      },
      {
        label: "Risk budget used",
        value: "84%",
        detail: "Liquidity and venue stress active",
        status: "warning",
        icon: ShieldCheck,
      },
      {
        label: "Open exceptions",
        value: "5",
        detail: "2 require same-day owner review",
        status: "critical",
        icon: AlertTriangle,
      },
    ],
    assets: normalAssets.map((asset) => {
      if (asset.symbol === "ETH") {
        return {
          ...asset,
          value: 11820000,
          share: 34.3,
          price: 2542,
          change24h: -18.6,
          liquidityDepth: 41000000,
          status: "warning" as const,
          note: "Shock price reduces runway and operating buffer.",
        }
      }
      if (asset.symbol === "WBTC") {
        return {
          ...asset,
          value: 3610000,
          share: 10.5,
          price: 50139,
          change24h: -15.7,
          liquidityDepth: 12000000,
          status: "warning" as const,
        }
      }
      if (asset.category === "Stablecoin") {
        return {
          ...asset,
          liquidityDepth: Math.round(asset.liquidityDepth * 0.58),
          status: asset.symbol === "USDC" ? ("warning" as const) : asset.status,
        }
      }
      return asset
    }),
    wallets: normalWallets.map((wallet) =>
      wallet.name === "Foundation Safe"
        ? { ...wallet, value: 14200000, exposure: 41.2, status: "warning" }
        : wallet.name === "Coinbase Prime"
          ? { ...wallet, value: 7900000, exposure: 22.9, status: "warning" }
          : wallet
    ),
    alerts: [
      {
        id: "runway-shock",
        title: "Liquid runway below 16 month board preference",
        severity: "critical",
        time: "09:25 UTC",
        source: "Seeded market shock + burn model",
        summary:
          "The seeded ETH drawdown lowers liquid runway to 15.1 months and leaves less room for the next grants cycle.",
        policy: "Maintain at least 16 months of stable, liquid operating runway.",
        decision:
          "Approve a staged hedge and convert enough native asset exposure to restore runway above 16 months.",
        affected: ["ETH", "WBTC", "USDC", "Payroll hot wallet"],
        evidence: [
          "ETH -18.6% and WBTC -15.7% in seeded stress window.",
          "Stablecoin liquidity depth down 42% versus base demo state.",
          "Monthly burn model uses $1.18M operating cash plus $0.22M grants reserve.",
        ],
      },
      {
        id: "thin-books",
        title: "Stablecoin exit depth below internal execution threshold",
        severity: "warning",
        time: "09:18 UTC",
        source: "Seeded market depth model",
        summary:
          "Modeled 1% depth across tracked stablecoin venues is below the threshold required for same-day full rebalance.",
        policy: "Same-day rebalance plans must keep expected slippage below 45 bps.",
        decision: "Split execution across time windows and keep payroll reserve untouched.",
        affected: ["USDC", "USDT", "DAI"],
        evidence: [
          "Seeded depth model: $91M base depth falls to $52.8M.",
          "Treasury policy: large rebalance requires execution plan and signer quorum.",
        ],
      },
    ],
    runbookSteps: [
      {
        id: "hedge-eth",
        label: "Stage $2.4M ETH-to-USD hedge across two windows",
        route: "Foundation Safe -> Coinbase Prime RFQ",
        estimatedUsd: 2400000,
        riskReduced: 12,
        defaultSelected: true,
      },
      {
        id: "protect-payroll",
        label: "Lock 3 month payroll buffer in Fireblocks MPC",
        route: "Prime -> Fireblocks MPC",
        estimatedUsd: 3600000,
        riskReduced: 10,
        defaultSelected: true,
      },
      {
        id: "delay-grants",
        label: "Flag non-critical grants batch for finance review",
        route: "Policy task",
        estimatedUsd: 750000,
        riskReduced: 5,
        defaultSelected: false,
      },
    ],
    policyChecks: [
      {
        label: "Liquid runway",
        current: "15.1 mo",
        limit: "Min 16 mo",
        status: "critical",
      },
      {
        label: "Expected slippage",
        current: "63 bps",
        limit: "Max 45 bps",
        status: "warning",
      },
      {
        label: "Native asset exposure",
        current: "44.8%",
        limit: "Soft cap 45%",
        status: "monitor",
      },
      {
        label: "Signer readiness",
        current: "5 of 8 current",
        limit: "5 of 8 required",
        status: "ok",
      },
    ],
    sources: baseSources.map((source) =>
      source.label === "Market prices"
        ? {
            ...source,
            freshness: "Seeded 5 minute stress cadence",
            status: "warning" as const,
          }
        : source
    ),
    runway: [
      { label: "Jul", runway: 15.1, stress: 10.8, liquidity: 16.9 },
      { label: "Aug", runway: 14.7, stress: 10.4, liquidity: 16.2 },
      { label: "Sep", runway: 14.2, stress: 10.1, liquidity: 15.5 },
      { label: "Oct", runway: 13.8, stress: 9.6, liquidity: 14.8 },
      { label: "Nov", runway: 13.1, stress: 9.3, liquidity: 14.1 },
      { label: "Dec", runway: 12.7, stress: 8.9, liquidity: 13.4 },
    ],
    peg: normalPeg.map((point, index) => ({
      ...point,
      usdc: Number(((point.usdc ?? 1) - (index > 2 ? 0.0018 : 0.0007)).toFixed(4)),
      dai: Number(((point.dai ?? 1) - (index > 3 ? 0.0014 : 0.0004)).toFixed(4)),
    })),
    counterparties: [
      {
        name: "Circle / USDC",
        type: "Issuer",
        share: 35.9,
        limit: 35,
        value: 12320000,
        status: "warning",
      },
      {
        name: "Coinbase Prime",
        type: "Venue",
        share: 22.9,
        limit: 25,
        value: 7900000,
        status: "warning",
      },
      {
        name: "Fireblocks MPC",
        type: "Custody",
        share: 28.1,
        limit: 30,
        value: 9700000,
        status: "ok",
      },
      {
        name: "Aave V3",
        type: "Protocol",
        share: 9.3,
        limit: 10,
        value: 3200000,
        status: "monitor",
      },
    ],
  },
  {
    id: "depeg",
    label: "Stablecoin depeg watch",
    shortLabel: "Depeg",
    tone: "Issuer and peg stress",
    description:
      "Seeded risk view where USDC trades below the treasury policy floor and issuer exposure becomes the primary decision.",
    asOf: "2026-07-16 09:30 UTC",
    health: 48,
    metrics: [
      {
        label: "Net treasury",
        value: "$41.1M",
        detail: "USDC marked at seeded stress price",
        status: "warning",
        icon: WalletCards,
      },
      {
        label: "Stablecoin at risk",
        value: "$15.2M",
        detail: "USDC plus dependent DeFi collateral",
        status: "critical",
        icon: Database,
      },
      {
        label: "Peg deviation",
        value: "-1.82%",
        detail: "Policy floor breached below $0.985",
        status: "critical",
        icon: Activity,
      },
      {
        label: "Open exceptions",
        value: "4",
        detail: "Freeze payouts, diversify, notify signers",
        status: "critical",
        icon: AlertTriangle,
      },
    ],
    assets: normalAssets.map((asset) => {
      if (asset.symbol === "USDC") {
        return {
          ...asset,
          value: 12126000,
          price: 0.978,
          change24h: -2.12,
          share: 29.5,
          liquidityDepth: 18000000,
          status: "critical" as const,
          note: "Seeded peg breach below treasury policy floor.",
        }
      }
      if (asset.symbol === "DAI") {
        return {
          ...asset,
          price: 0.994,
          change24h: -0.61,
          liquidityDepth: 9200000,
          status: "warning" as const,
          note: "Correlated stablecoin stress in DeFi collateral.",
        }
      }
      return asset
    }),
    wallets: normalWallets.map((wallet) =>
      wallet.name === "Aave V3 ops"
        ? { ...wallet, status: "critical", exposure: 7.8 }
        : wallet.name === "Payroll hot wallet"
          ? { ...wallet, status: "warning" }
          : wallet
    ),
    alerts: [
      {
        id: "usdc-floor",
        title: "USDC below $0.985 policy floor",
        severity: "critical",
        time: "09:29 UTC",
        source: "Seeded CoinGecko-like market feed + policy register",
        summary:
          "USDC is marked at $0.978 in the seeded scenario, below the policy floor for vendor payments and treasury concentration.",
        policy:
          "Pause non-essential outflows and diversify when a major payment stablecoin trades below $0.985 for 15 minutes.",
        decision:
          "Stop USDC vendor payouts, protect payroll, and stage a diversified conversion runbook for owner approval.",
        affected: ["USDC", "DAI", "Aave V3 ops", "Payroll hot wallet"],
        evidence: [
          "Seeded price path remains below $0.985 from 08:00 to 09:30 UTC.",
          "USDC issuer exposure is 29.5% of net treasury in the demo state.",
          "Aave V3 collateral contains USDC-linked stable liquidity in seeded rows.",
        ],
      },
      {
        id: "dependent-protocol",
        title: "Dependent DeFi collateral needs withdrawal review",
        severity: "warning",
        time: "09:20 UTC",
        source: "Seeded protocol position import",
        summary:
          "Stablecoin stress affects the Aave V3 operating position and could reduce same-day liquidity.",
        policy:
          "Protocol positions with correlated stablecoin risk require finance review before new deposits.",
        decision:
          "Prepare a withdrawal plan but avoid forced execution until signer approval.",
        affected: ["Aave V3 ops", "USDC", "DAI"],
        evidence: [
          "Seeded Aave V3 position value: $3.2M.",
          "Liquidity depth model is down 72% versus base demo state.",
        ],
      },
    ],
    runbookSteps: [
      {
        id: "pause-payouts",
        label: "Pause non-essential USDC vendor payouts",
        route: "Policy task",
        estimatedUsd: 1800000,
        riskReduced: 10,
        defaultSelected: true,
      },
      {
        id: "convert-usdc",
        label: "Stage $3.0M USDC conversion into USD and USDT split",
        route: "Prime RFQ + Fireblocks settlement",
        estimatedUsd: 3000000,
        riskReduced: 15,
        defaultSelected: true,
      },
      {
        id: "withdraw-defi",
        label: "Prepare Aave V3 withdrawal transaction for owner review",
        route: "Aave V3 -> Foundation Safe",
        estimatedUsd: 1200000,
        riskReduced: 8,
        defaultSelected: false,
      },
    ],
    policyChecks: [
      {
        label: "USDC peg floor",
        current: "$0.978",
        limit: "Min $0.985",
        status: "critical",
      },
      {
        label: "Issuer concentration",
        current: "USDC 29.5%",
        limit: "Hard cap 35%",
        status: "warning",
      },
      {
        label: "Vendor payout asset",
        current: "USDC default",
        limit: "Paused under peg floor",
        status: "critical",
      },
      {
        label: "Protocol correlated risk",
        current: "$3.2M",
        limit: "Review required",
        status: "warning",
      },
    ],
    sources: baseSources.map((source) =>
      source.label === "Market prices" || source.label === "On-chain flows"
        ? {
            ...source,
            freshness: "Seeded 5 minute stress cadence",
            status: "critical" as const,
          }
        : source
    ),
    runway: [
      { label: "Jul", runway: 16.8, stress: 11.2, liquidity: 15.8 },
      { label: "Aug", runway: 16.3, stress: 10.9, liquidity: 15.1 },
      { label: "Sep", runway: 15.7, stress: 10.4, liquidity: 14.6 },
      { label: "Oct", runway: 15.2, stress: 9.9, liquidity: 13.8 },
      { label: "Nov", runway: 14.6, stress: 9.4, liquidity: 13.2 },
      { label: "Dec", runway: 14.1, stress: 9.0, liquidity: 12.5 },
    ],
    peg: [
      { label: "00:00", usdc: 0.9991, usdt: 1.0002, dai: 0.9992 },
      { label: "04:00", usdc: 0.993, usdt: 1.0005, dai: 0.997 },
      { label: "08:00", usdc: 0.982, usdt: 1.0008, dai: 0.994 },
      { label: "08:30", usdc: 0.978, usdt: 1.0007, dai: 0.9938 },
      { label: "09:00", usdc: 0.979, usdt: 1.0009, dai: 0.9942 },
      { label: "09:30", usdc: 0.978, usdt: 1.0006, dai: 0.994 },
    ],
    counterparties: [
      {
        name: "Circle / USDC",
        type: "Issuer",
        share: 29.5,
        limit: 35,
        value: 12126000,
        status: "critical",
      },
      {
        name: "Aave V3",
        type: "Protocol",
        share: 7.8,
        limit: 10,
        value: 3200000,
        status: "warning",
      },
      {
        name: "Coinbase Prime",
        type: "Venue",
        share: 20.4,
        limit: 25,
        value: 8400000,
        status: "monitor",
      },
      {
        name: "Fireblocks MPC",
        type: "Custody",
        share: 23.6,
        limit: 30,
        value: 9700000,
        status: "ok",
      },
    ],
  },
  {
    id: "empty",
    label: "New entity setup",
    shortLabel: "Empty",
    tone: "No wallets imported yet",
    description:
      "Empty onboarding state for a new legal entity before read-only wallet and custody imports are approved.",
    asOf: "2026-07-16 09:30 UTC",
    health: 0,
    metrics: [
      {
        label: "Net treasury",
        value: "$0",
        detail: "No seeded wallets in this entity",
        status: "monitor",
        icon: WalletCards,
      },
      {
        label: "Liquid runway",
        value: "n/a",
        detail: "Import balances to calculate",
        status: "monitor",
        icon: Gauge,
      },
      {
        label: "Risk budget used",
        value: "n/a",
        detail: "Policy register is waiting for entity mapping",
        status: "monitor",
        icon: ShieldCheck,
      },
      {
        label: "Open exceptions",
        value: "0",
        detail: "No active alerts before data import",
        status: "ok",
        icon: FileCheck2,
      },
    ],
    assets: [],
    wallets: [],
    alerts: [],
    runbookSteps: [],
    policyChecks: [
      {
        label: "Read-only wallets",
        current: "0 connected",
        limit: "At least 1 required",
        status: "monitor",
      },
      {
        label: "Policy register",
        current: "Template loaded",
        limit: "Board approval required",
        status: "monitor",
      },
      {
        label: "Custody evidence",
        current: "Not uploaded",
        limit: "SOC or custody attestation",
        status: "monitor",
      },
    ],
    sources: [
      {
        label: "Wallet balances",
        freshness: "Waiting for import",
        provenance: "No wallet connection is active in this demo",
        status: "monitor",
      },
      {
        label: "Policy register",
        freshness: "Template only",
        provenance: "Seeded onboarding checklist",
        status: "monitor",
      },
    ],
    runway: [],
    peg: [],
    counterparties: [],
  },
]

export const tabs: Array<{
  id: TabId
  label: string
  icon: LucideIcon
}> = [
  { id: "control", label: "Control room", icon: Gauge },
  { id: "exposure", label: "Exposure", icon: Layers3 },
  { id: "stablecoins", label: "Stablecoins", icon: Activity },
  { id: "evidence", label: "Evidence", icon: Database },
]

export const assetCategories: Array<"All" | AssetCategory> = [
  "All",
  "Stablecoin",
  "Native",
  "Governance",
  "RWA",
  "Protocol",
]

export const scenarioById = Object.fromEntries(
  scenarios.map((scenario) => [scenario.id, scenario])
) as Record<ScenarioId, Scenario>
