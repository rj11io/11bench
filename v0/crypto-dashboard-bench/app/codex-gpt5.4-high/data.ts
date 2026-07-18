export type ScenarioId = "normal" | "bridge" | "exchange" | "drill";
export type LiquidityBucket = "instant" | "same-day" | "t+1";
export type Severity = "low" | "medium" | "high";

export type PolicyState = {
  maxVenueConcentration: number;
  maxBridgedExposure: number;
  minInstantLiquidity: number;
  maxSingleStablecoin: number;
  minRunwayDays: number;
};

export type MetricCard = {
  label: string;
  value: string;
  note: string;
  tone?: Severity;
};

export type ScenarioAlert = {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  source: string;
};

export type ActionItem = {
  id: string;
  title: string;
  amount: string;
  from: string;
  to: string;
  eta: string;
  impact: string;
};

export type Holding = {
  id: string;
  label: string;
  venue: string;
  venueType: string;
  chain: string;
  asset: string;
  assetType: string;
  amountUsd: number;
  liquidityBucket: LiquidityBucket;
  settlementMins: number;
  control: string;
  provenance: string;
  note: string;
  riskLabel: string;
};

export type EventLogItem = {
  time: string;
  severity: Severity;
  source: string;
  note: string;
};

export type ScenarioData = {
  id: ScenarioId;
  label: string;
  stage: string;
  tone: Severity;
  headline: string;
  summary: string;
  timestamp: string;
  decisionPrompt: string;
  topMetrics: MetricCard[];
  metrics: {
    treasuryUsd: number;
    instantLiquidityPct: number;
    venueConcentrationPct: number;
    bridgedExposurePct: number;
    singleStablecoinPct: number;
    runwayDays: number;
    weightedSettlementMins: number;
  };
  liquidityMix: {
    instant: number;
    "same-day": number;
    "t+1": number;
  };
  stablecoinMix: Array<{
    asset: string;
    pct: number;
    color: string;
  }>;
  latencySeries: Array<{
    label: string;
    actual: number;
    policy: number;
  }>;
  alerts: ScenarioAlert[];
  actions: ActionItem[];
  holdings: Holding[];
  eventLog: EventLogItem[];
};

export const defaultPolicies: PolicyState = {
  maxVenueConcentration: 30,
  maxBridgedExposure: 10,
  minInstantLiquidity: 40,
  maxSingleStablecoin: 50,
  minRunwayDays: 180,
};

export const provenanceNotes = [
  {
    label: "Stablecoin supply",
    live: "DeFiLlama stablecoin and chain distribution datasets",
    demo: "Seeded shares and chain placement based on the live-model shape",
  },
  {
    label: "Issuer metadata",
    live: "Circle documentation for native-chain support, contracts, and confirmations",
    demo: "Static chain support, warning notes, and settlement assumptions",
  },
  {
    label: "Wallet controls",
    live: "Safe / Fireblocks / venue APIs",
    demo: "Seeded wallet topology with explicit control descriptions",
  },
  {
    label: "Screening and compliance",
    live: "AML / sanctions provider risk scores and Travel Rule workflow state",
    demo: "Seeded severity labels and case notes; no live screening",
  },
  {
    label: "Market metadata",
    live: "CoinGecko-style market and asset reference feeds",
    demo: "Seeded asset labels only; no live price or return claims",
  },
];

export const controlPosture = [
  {
    label: "Move authority",
    value: "2-of-3 ops quorum, 3-of-5 strategic quorum",
  },
  {
    label: "Destination discipline",
    value: "86% of destinations allowlisted in the seeded workspace",
  },
  {
    label: "Screening gate",
    value: "Outgoing transfers hold for risk-screen review before release",
  },
  {
    label: "Demo limitation",
    value: "No wallet, venue, or market APIs are connected in this route",
  },
];

export const scenarios: Record<ScenarioId, ScenarioData> = {
  normal: {
    id: "normal",
    label: "Within Policy",
    stage: "Daily review",
    tone: "low",
    headline: "Operating liquidity is healthy and no active policy breach needs action.",
    summary:
      "The treasury mix is diversified across native stablecoins, wallets, and venues. The core decision is whether to leave policy thresholds unchanged or ratchet them tighter before adding new payment corridors.",
    timestamp: "Seeded snapshot · July 16, 2026 · 09:12 UTC",
    decisionPrompt:
      "Do we accept current corridor mix, or tighten the bridged-asset ceiling before expanding Base and Arbitrum flows?",
    topMetrics: [
      {
        label: "Treasury balance",
        value: "$19.2M",
        note: "Seeded cash, stablecoin, and yield sleeve exposure",
      },
      {
        label: "Instant liquidity",
        value: "57%",
        note: "Above default 40% policy floor",
        tone: "low",
      },
      {
        label: "Largest venue share",
        value: "24%",
        note: "No venue exceeds default concentration limit",
        tone: "low",
      },
      {
        label: "Largest stablecoin share",
        value: "42%",
        note: "USDC remains below concentration threshold",
        tone: "low",
      },
    ],
    metrics: {
      treasuryUsd: 19_200_000,
      instantLiquidityPct: 57,
      venueConcentrationPct: 24,
      bridgedExposurePct: 4,
      singleStablecoinPct: 42,
      runwayDays: 292,
      weightedSettlementMins: 11,
    },
    liquidityMix: {
      instant: 57,
      "same-day": 28,
      "t+1": 15,
    },
    stablecoinMix: [
      { asset: "USDC", pct: 42, color: "#7be0d1" },
      { asset: "USDT", pct: 18, color: "#5bb4ff" },
      { asset: "DAI", pct: 14, color: "#f8b85f" },
      { asset: "USDtb", pct: 14, color: "#ef7f7f" },
      { asset: "Cash rails", pct: 12, color: "#e7dfcf" },
    ],
    latencySeries: [
      { label: "Mon", actual: 12, policy: 20 },
      { label: "Tue", actual: 11, policy: 20 },
      { label: "Wed", actual: 10, policy: 20 },
      { label: "Thu", actual: 11, policy: 20 },
      { label: "Fri", actual: 12, policy: 20 },
      { label: "Sat", actual: 9, policy: 20 },
      { label: "Sun", actual: 10, policy: 20 },
    ],
    alerts: [],
    actions: [
      {
        id: "normal-1",
        title: "Pre-approve native USDC destination list for Base payroll corridor",
        amount: "$0",
        from: "Treasury policy",
        to: "Allowlist + payment ops",
        eta: "This week",
        impact: "Reduces manual review if Base payroll volume grows next month",
      },
      {
        id: "normal-2",
        title: "Tighten bridged-asset policy ceiling from 10% to 8% in draft",
        amount: "$0",
        from: "Risk committee",
        to: "Draft policy",
        eta: "Next review",
        impact: "Keeps future corridor growth native-first without blocking operations",
      },
    ],
    holdings: [
      {
        id: "n1",
        label: "Reserve mint account",
        venue: "Circle Mint",
        venueType: "Issuer rail",
        chain: "Noble",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 3_800_000,
        liquidityBucket: "instant",
        settlementMins: 1,
        control: "Read-only issuer account",
        provenance: "Native USDC mint / redeem rail",
        note: "Primary redemption anchor for native USDC liquidity.",
        riskLabel: "Low",
      },
      {
        id: "n2",
        label: "Strategic vault",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_600_000,
        liquidityBucket: "instant",
        settlementMins: 18,
        control: "3-of-5 approval",
        provenance: "Custody balance",
        note: "Main treasury reserve with high-control governance.",
        riskLabel: "Low",
      },
      {
        id: "n3",
        label: "Base ops wallet",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_900_000,
        liquidityBucket: "same-day",
        settlementMins: 16,
        control: "2-of-3 ops quorum",
        provenance: "Native USDC on Base",
        note: "Working capital for merchant settlement and refunds.",
        riskLabel: "Low",
      },
      {
        id: "n4",
        label: "Primary exchange wallet",
        venue: "Coinbase Prime",
        venueType: "Exchange",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_400_000,
        liquidityBucket: "same-day",
        settlementMins: 12,
        control: "Venue sub-account policy",
        provenance: "Exchange balance",
        note: "Fast liquidity for conversion and market-making inventory.",
        riskLabel: "Low",
      },
      {
        id: "n5",
        label: "OTC buffer",
        venue: "Kraken",
        venueType: "Exchange",
        chain: "Tron",
        asset: "USDT",
        assetType: "Native stablecoin",
        amountUsd: 3_100_000,
        liquidityBucket: "instant",
        settlementMins: 4,
        control: "Venue withdrawal whitelist",
        provenance: "Exchange balance",
        note: "Used for weekend vendor payouts in USDT corridors.",
        riskLabel: "Medium",
      },
      {
        id: "n6",
        label: "Payroll safe",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Ethereum",
        asset: "DAI",
        assetType: "Decentralized stablecoin",
        amountUsd: 1_300_000,
        liquidityBucket: "instant",
        settlementMins: 17,
        control: "2-of-3 ops quorum",
        provenance: "Multisig balance",
        note: "Maintains redundancy for payroll and emergency contractor payments.",
        riskLabel: "Low",
      },
      {
        id: "n7",
        label: "Yield sleeve",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDtb",
        assetType: "Yield sleeve",
        amountUsd: 2_700_000,
        liquidityBucket: "t+1",
        settlementMins: 1_440,
        control: "3-of-5 approval",
        provenance: "Tokenized cash-equivalent sleeve",
        note: "Earns yield on excess cash; excluded from instant coverage.",
        riskLabel: "Medium",
      },
      {
        id: "n8",
        label: "Vendor corridor wallet",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Arbitrum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_400_000,
        liquidityBucket: "same-day",
        settlementMins: 15,
        control: "Policy-gated vault account",
        provenance: "Native USDC on Arbitrum",
        note: "Supports same-day B2B payout corridor.",
        riskLabel: "Low",
      },
    ],
    eventLog: [
      {
        time: "09:12 UTC",
        severity: "low",
        source: "Policy board",
        note: "Daily controls run completed with zero open breach.",
      },
      {
        time: "08:48 UTC",
        severity: "low",
        source: "Settlement monitor",
        note: "Base and Arbitrum attestation windows remained inside target band.",
      },
      {
        time: "07:55 UTC",
        severity: "medium",
        source: "Treasury operator note",
        note: "Bridge ceiling draft scheduled for next risk committee review.",
      },
    ],
  },
  bridge: {
    id: "bridge",
    label: "Bridge Exposure",
    stage: "Incident review",
    tone: "high",
    headline:
      "A working-capital wallet has accumulated bridged USDC beyond policy and needs a native-path unwind.",
    summary:
      "The seeded incident models a corridor team parking too much liquidity in bridged USDC on Base for operational speed. The decision is whether to halt new deposits immediately or accept a short-term operational slowdown while rotating back to native USDC.",
    timestamp: "Seeded drill · July 16, 2026 · 09:12 UTC",
    decisionPrompt:
      "How much bridged exposure can remain online while payroll and merchant settlement still clear inside service-level targets?",
    topMetrics: [
      {
        label: "Treasury balance",
        value: "$19.0M",
        note: "Seeded snapshot with corridor stress applied",
      },
      {
        label: "Bridged asset share",
        value: "18%",
        note: "Above default 10% policy ceiling",
        tone: "high",
      },
      {
        label: "Instant liquidity",
        value: "46%",
        note: "Still above floor, but more fragile than normal",
        tone: "medium",
      },
      {
        label: "Largest venue share",
        value: "27%",
        note: "Still within venue concentration threshold",
        tone: "low",
      },
    ],
    metrics: {
      treasuryUsd: 19_000_000,
      instantLiquidityPct: 46,
      venueConcentrationPct: 27,
      bridgedExposurePct: 18,
      singleStablecoinPct: 48,
      runwayDays: 286,
      weightedSettlementMins: 18,
    },
    liquidityMix: {
      instant: 46,
      "same-day": 34,
      "t+1": 20,
    },
    stablecoinMix: [
      { asset: "USDC", pct: 48, color: "#7be0d1" },
      { asset: "USDT", pct: 18, color: "#5bb4ff" },
      { asset: "DAI", pct: 12, color: "#f8b85f" },
      { asset: "Bridged USDC.e", pct: 18, color: "#ef7f7f" },
      { asset: "Cash rails", pct: 4, color: "#e7dfcf" },
    ],
    latencySeries: [
      { label: "Mon", actual: 13, policy: 20 },
      { label: "Tue", actual: 14, policy: 20 },
      { label: "Wed", actual: 17, policy: 20 },
      { label: "Thu", actual: 18, policy: 20 },
      { label: "Fri", actual: 19, policy: 20 },
      { label: "Sat", actual: 18, policy: 20 },
      { label: "Sun", actual: 16, policy: 20 },
    ],
    alerts: [
      {
        id: "bridge-alert-1",
        title: "Unsupported redemption path risk",
        summary:
          "The scenario assumes corridor operators accepted bridged USDC for speed, but treasury policy requires native redemption paths for reserve assets.",
        severity: "high",
        source: "Issuer rail controls",
      },
      {
        id: "bridge-alert-2",
        title: "Base corridor is no longer fungible with issuer reserve",
        summary:
          "Operational teams can still pay out, but finance loses direct mint / redeem optionality until the position is normalized.",
        severity: "medium",
        source: "Treasury operator review",
      },
    ],
    actions: [
      {
        id: "bridge-1",
        title: "Freeze new bridged stablecoin deposits to the Base ops wallet",
        amount: "$0",
        from: "Payment ops",
        to: "Base ops wallet",
        eta: "Immediate",
        impact: "Stops the breach from expanding while native liquidity is rotated in",
      },
      {
        id: "bridge-2",
        title: "Rotate bridged USDC.e back to native USDC via approved path",
        amount: "$2.4M",
        from: "Base ops wallet",
        to: "Circle Mint / native USDC",
        eta: "< 4 hours",
        impact: "Drops bridged exposure back below the 10% policy ceiling",
      },
      {
        id: "bridge-3",
        title: "Backfill merchant wallet from Arbitrum native USDC reserve",
        amount: "$700K",
        from: "Arbitrum vendor corridor",
        to: "Base ops wallet",
        eta: "Same day",
        impact: "Preserves payout continuity while the bridged balance unwinds",
      },
    ],
    holdings: [
      {
        id: "b1",
        label: "Reserve mint account",
        venue: "Circle Mint",
        venueType: "Issuer rail",
        chain: "Noble",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 3_200_000,
        liquidityBucket: "instant",
        settlementMins: 1,
        control: "Read-only issuer account",
        provenance: "Native USDC mint / redeem rail",
        note: "Reduced while native balance is staged for Base corridor support.",
        riskLabel: "Low",
      },
      {
        id: "b2",
        label: "Strategic vault",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_400_000,
        liquidityBucket: "instant",
        settlementMins: 18,
        control: "3-of-5 approval",
        provenance: "Custody balance",
        note: "Remains the main high-control reserve.",
        riskLabel: "Low",
      },
      {
        id: "b3",
        label: "Base ops wallet",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Base",
        asset: "USDC.e",
        assetType: "Bridged stablecoin",
        amountUsd: 3_500_000,
        liquidityBucket: "same-day",
        settlementMins: 26,
        control: "2-of-3 ops quorum",
        provenance: "Bridged asset balance",
        note: "Scenario breach: too much working capital left in bridged form.",
        riskLabel: "High",
      },
      {
        id: "b4",
        label: "Primary exchange wallet",
        venue: "Coinbase Prime",
        venueType: "Exchange",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_200_000,
        liquidityBucket: "same-day",
        settlementMins: 12,
        control: "Venue sub-account policy",
        provenance: "Exchange balance",
        note: "Available for emergency conversion or withdraw.",
        riskLabel: "Medium",
      },
      {
        id: "b5",
        label: "OTC buffer",
        venue: "Kraken",
        venueType: "Exchange",
        chain: "Tron",
        asset: "USDT",
        assetType: "Native stablecoin",
        amountUsd: 3_100_000,
        liquidityBucket: "instant",
        settlementMins: 4,
        control: "Venue withdrawal whitelist",
        provenance: "Exchange balance",
        note: "Operationally useful, but not the preferred reserve asset.",
        riskLabel: "Medium",
      },
      {
        id: "b6",
        label: "Payroll safe",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Ethereum",
        asset: "DAI",
        assetType: "Decentralized stablecoin",
        amountUsd: 1_100_000,
        liquidityBucket: "instant",
        settlementMins: 17,
        control: "2-of-3 ops quorum",
        provenance: "Multisig balance",
        note: "Unaffected by the bridge incident.",
        riskLabel: "Low",
      },
      {
        id: "b7",
        label: "Yield sleeve",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDtb",
        assetType: "Yield sleeve",
        amountUsd: 2_300_000,
        liquidityBucket: "t+1",
        settlementMins: 1_440,
        control: "3-of-5 approval",
        provenance: "Tokenized cash-equivalent sleeve",
        note: "Still available, but too slow to solve the immediate issue.",
        riskLabel: "Medium",
      },
      {
        id: "b8",
        label: "Vendor corridor wallet",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Arbitrum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_200_000,
        liquidityBucket: "same-day",
        settlementMins: 15,
        control: "Policy-gated vault account",
        provenance: "Native USDC on Arbitrum",
        note: "Most practical source for rapid native backfill.",
        riskLabel: "Low",
      },
    ],
    eventLog: [
      {
        time: "09:12 UTC",
        severity: "high",
        source: "Asset provenance monitor",
        note: "Bridged stablecoin exposure crossed the draft ceiling in the Base corridor.",
      },
      {
        time: "08:57 UTC",
        severity: "medium",
        source: "Treasury operator note",
        note: "Merchant settlement team favored route speed over native redeemability during corridor spike.",
      },
      {
        time: "08:22 UTC",
        severity: "medium",
        source: "Policy board",
        note: "Venue concentration stayed within bounds, but bridge-specific exposure did not.",
      },
    ],
  },
  exchange: {
    id: "exchange",
    label: "Venue Concentration",
    stage: "Liquidity rebalance",
    tone: "high",
    headline:
      "Too much liquidity is parked on one exchange, making off-platform reserve access fragile.",
    summary:
      "The seeded scenario models aggressive weekend prefunding on a single venue. The decision is whether to tolerate slower conversion capacity by pulling funds back on-platform, or keep the venue overweight to preserve execution speed.",
    timestamp: "Seeded drill · July 16, 2026 · 09:12 UTC",
    decisionPrompt:
      "What is the minimum venue balance that still supports weekend trading and payouts without breaching treasury concentration policy?",
    topMetrics: [
      {
        label: "Treasury balance",
        value: "$18.8M",
        note: "Seeded snapshot with venue concentration stress",
      },
      {
        label: "Largest venue share",
        value: "38%",
        note: "Above default 30% policy ceiling",
        tone: "high",
      },
      {
        label: "Instant liquidity",
        value: "43%",
        note: "Healthy, but too dependent on venue withdrawal behavior",
        tone: "medium",
      },
      {
        label: "Largest stablecoin share",
        value: "46%",
        note: "Still inside single-asset threshold",
        tone: "low",
      },
    ],
    metrics: {
      treasuryUsd: 18_800_000,
      instantLiquidityPct: 43,
      venueConcentrationPct: 38,
      bridgedExposurePct: 6,
      singleStablecoinPct: 46,
      runwayDays: 280,
      weightedSettlementMins: 14,
    },
    liquidityMix: {
      instant: 43,
      "same-day": 32,
      "t+1": 25,
    },
    stablecoinMix: [
      { asset: "USDC", pct: 46, color: "#7be0d1" },
      { asset: "USDT", pct: 24, color: "#5bb4ff" },
      { asset: "DAI", pct: 12, color: "#f8b85f" },
      { asset: "USDtb", pct: 12, color: "#ef7f7f" },
      { asset: "Cash rails", pct: 6, color: "#e7dfcf" },
    ],
    latencySeries: [
      { label: "Mon", actual: 11, policy: 20 },
      { label: "Tue", actual: 12, policy: 20 },
      { label: "Wed", actual: 13, policy: 20 },
      { label: "Thu", actual: 15, policy: 20 },
      { label: "Fri", actual: 16, policy: 20 },
      { label: "Sat", actual: 15, policy: 20 },
      { label: "Sun", actual: 14, policy: 20 },
    ],
    alerts: [
      {
        id: "exchange-alert-1",
        title: "Withdrawal optionality is concentrated",
        summary:
          "A single venue now controls too much same-day liquidity, so a venue-specific freeze or delay would force treasury into slower wallet-based fallback paths.",
        severity: "high",
        source: "Venue exposure model",
      },
      {
        id: "exchange-alert-2",
        title: "Execution speed and reserve safety are now in tension",
        summary:
          "The corridor team optimized for weekend conversion speed, but the treasury reserve now depends too heavily on exchange uptime and withdrawal capacity.",
        severity: "medium",
        source: "Treasury operator review",
      },
    ],
    actions: [
      {
        id: "exchange-1",
        title: "Withdraw excess USDC from exchange into Fireblocks strategic vault",
        amount: "$1.6M",
        from: "Coinbase Prime",
        to: "Fireblocks Vault",
        eta: "< 2 hours",
        impact: "Returns largest venue share to 29%, back inside policy",
      },
      {
        id: "exchange-2",
        title: "Split weekend OTC buffer across second approved venue",
        amount: "$900K",
        from: "Kraken",
        to: "Secondary venue",
        eta: "Today",
        impact: "Preserves execution capacity while reducing single-venue dependency",
      },
      {
        id: "exchange-3",
        title: "Move merchant refund reserve from exchange to Base Safe",
        amount: "$550K",
        from: "Coinbase Prime",
        to: "Base ops wallet",
        eta: "Same day",
        impact: "Improves on-platform payout coverage without touching strategic reserves",
      },
    ],
    holdings: [
      {
        id: "e1",
        label: "Reserve mint account",
        venue: "Circle Mint",
        venueType: "Issuer rail",
        chain: "Noble",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_900_000,
        liquidityBucket: "instant",
        settlementMins: 1,
        control: "Read-only issuer account",
        provenance: "Native USDC mint / redeem rail",
        note: "Redemption anchor remains intact.",
        riskLabel: "Low",
      },
      {
        id: "e2",
        label: "Strategic vault",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_100_000,
        liquidityBucket: "instant",
        settlementMins: 18,
        control: "3-of-5 approval",
        provenance: "Custody balance",
        note: "High-control reserve remains underweight relative to venue balances.",
        riskLabel: "Medium",
      },
      {
        id: "e3",
        label: "Primary exchange wallet",
        venue: "Coinbase Prime",
        venueType: "Exchange",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 4_800_000,
        liquidityBucket: "same-day",
        settlementMins: 12,
        control: "Venue sub-account policy",
        provenance: "Exchange balance",
        note: "Main breach driver: too much balance is waiting at one venue.",
        riskLabel: "High",
      },
      {
        id: "e4",
        label: "Weekend OTC wallet",
        venue: "Kraken",
        venueType: "Exchange",
        chain: "Tron",
        asset: "USDT",
        assetType: "Native stablecoin",
        amountUsd: 2_400_000,
        liquidityBucket: "instant",
        settlementMins: 4,
        control: "Venue withdrawal whitelist",
        provenance: "Exchange balance",
        note: "Useful for payouts, but expands venue dependency further.",
        riskLabel: "Medium",
      },
      {
        id: "e5",
        label: "Base ops wallet",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_300_000,
        liquidityBucket: "same-day",
        settlementMins: 16,
        control: "2-of-3 ops quorum",
        provenance: "Native USDC on Base",
        note: "Slightly underfunded because the venue absorbed too much working capital.",
        riskLabel: "Medium",
      },
      {
        id: "e6",
        label: "Payroll safe",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Ethereum",
        asset: "DAI",
        assetType: "Decentralized stablecoin",
        amountUsd: 1_200_000,
        liquidityBucket: "instant",
        settlementMins: 17,
        control: "2-of-3 ops quorum",
        provenance: "Multisig balance",
        note: "Operational redundancy remains available.",
        riskLabel: "Low",
      },
      {
        id: "e7",
        label: "Yield sleeve",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDtb",
        assetType: "Yield sleeve",
        amountUsd: 2_300_000,
        liquidityBucket: "t+1",
        settlementMins: 1_440,
        control: "3-of-5 approval",
        provenance: "Tokenized cash-equivalent sleeve",
        note: "Not appropriate for the immediate venue rebalance.",
        riskLabel: "Medium",
      },
      {
        id: "e8",
        label: "Vendor corridor wallet",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Arbitrum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_800_000,
        liquidityBucket: "same-day",
        settlementMins: 15,
        control: "Policy-gated vault account",
        provenance: "Native USDC on Arbitrum",
        note: "Can temporarily absorb more payout volume if venue balances shrink.",
        riskLabel: "Low",
      },
    ],
    eventLog: [
      {
        time: "09:12 UTC",
        severity: "high",
        source: "Venue concentration board",
        note: "Primary exchange wallet crossed the 30% ceiling after weekend prefunding.",
      },
      {
        time: "08:41 UTC",
        severity: "medium",
        source: "Treasury operator note",
        note: "Weekend payout forecast drove excess funds onto a single conversion venue.",
      },
      {
        time: "08:04 UTC",
        severity: "medium",
        source: "Ops routing",
        note: "Merchant refund reserve was not replenished back on-platform after Monday settlement.",
      },
    ],
  },
  drill: {
    id: "drill",
    label: "Depeg Drill",
    stage: "Scenario simulation",
    tone: "high",
    headline:
      "The reserve is still solvent, but a concentrated USDC stress event would cut instant liquidity below policy.",
    summary:
      "This is a labeled simulation, not a live market event. The seeded drill asks whether treasury can keep obligations moving if a dominant reserve asset needs to be rotated while L2 and exchange liquidity stay operational but slower.",
    timestamp: "Seeded drill · July 16, 2026 · 09:12 UTC",
    decisionPrompt:
      "If USDC confidence degrades for six hours, which obligations clear from native non-USDC reserves and which must wait for committee approval?",
    topMetrics: [
      {
        label: "Treasury balance",
        value: "$18.6M",
        note: "Seeded simulation, not live marked-to-market value",
      },
      {
        label: "Largest stablecoin share",
        value: "61%",
        note: "Above default 50% single-asset policy",
        tone: "high",
      },
      {
        label: "Instant liquidity",
        value: "34%",
        note: "Below default 40% policy floor under the drill assumptions",
        tone: "high",
      },
      {
        label: "Weighted settlement",
        value: "41 min",
        note: "Slower reserve rotation assumed during the drill",
        tone: "medium",
      },
    ],
    metrics: {
      treasuryUsd: 18_600_000,
      instantLiquidityPct: 34,
      venueConcentrationPct: 29,
      bridgedExposurePct: 7,
      singleStablecoinPct: 61,
      runwayDays: 276,
      weightedSettlementMins: 41,
    },
    liquidityMix: {
      instant: 34,
      "same-day": 31,
      "t+1": 35,
    },
    stablecoinMix: [
      { asset: "USDC", pct: 61, color: "#7be0d1" },
      { asset: "USDT", pct: 16, color: "#5bb4ff" },
      { asset: "DAI", pct: 11, color: "#f8b85f" },
      { asset: "USDtb", pct: 8, color: "#ef7f7f" },
      { asset: "Cash rails", pct: 4, color: "#e7dfcf" },
    ],
    latencySeries: [
      { label: "Mon", actual: 18, policy: 20 },
      { label: "Tue", actual: 19, policy: 20 },
      { label: "Wed", actual: 24, policy: 20 },
      { label: "Thu", actual: 32, policy: 20 },
      { label: "Fri", actual: 41, policy: 20 },
      { label: "Sat", actual: 37, policy: 20 },
      { label: "Sun", actual: 29, policy: 20 },
    ],
    alerts: [
      {
        id: "drill-alert-1",
        title: "Simulation assumption: dominant reserve asset confidence shock",
        summary:
          "This drill assumes committee pauses fresh USDC exposure for several hours while treasury rotates critical obligations to secondary reserves and venue cash.",
        severity: "high",
        source: "Scenario engine",
      },
      {
        id: "drill-alert-2",
        title: "Liquidity ladder compresses under rotation pressure",
        summary:
          "Assets that are liquid in normal conditions move to same-day or T+1 when the committee demands slower approvals and reserve diversification.",
        severity: "medium",
        source: "Treasury operator review",
      },
    ],
    actions: [
      {
        id: "drill-1",
        title: "Move non-critical merchant reserve into DAI and venue cash buffer",
        amount: "$1.2M",
        from: "USDC-heavy wallets",
        to: "DAI + cash rails",
        eta: "< 6 hours",
        impact: "Reduces USDC share from 61% to 49%, back inside policy",
      },
      {
        id: "drill-2",
        title: "Temporarily raise high-risk approval quorum for new USDC transfers",
        amount: "$0",
        from: "Risk committee",
        to: "Policy board",
        eta: "Immediate",
        impact: "Stops casual expansion of the stressed reserve asset during the drill",
      },
      {
        id: "drill-3",
        title: "Prefund payroll and urgent vendor obligations from secondary reserves",
        amount: "$850K",
        from: "DAI + venue cash",
        to: "Payroll / vendor safes",
        eta: "Today",
        impact: "Maintains business continuity while the reserve mix normalizes",
      },
    ],
    holdings: [
      {
        id: "d1",
        label: "Reserve mint account",
        venue: "Circle Mint",
        venueType: "Issuer rail",
        chain: "Noble",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 4_000_000,
        liquidityBucket: "same-day",
        settlementMins: 22,
        control: "Read-only issuer account",
        provenance: "Native USDC mint / redeem rail",
        note: "Still the cleanest reserve path, but assumed slower under drill controls.",
        riskLabel: "Medium",
      },
      {
        id: "d2",
        label: "Strategic vault",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 3_400_000,
        liquidityBucket: "same-day",
        settlementMins: 39,
        control: "3-of-5 approval",
        provenance: "Custody balance",
        note: "Committee review slows access in the stress drill.",
        riskLabel: "High",
      },
      {
        id: "d3",
        label: "Base ops wallet",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 2_100_000,
        liquidityBucket: "same-day",
        settlementMins: 34,
        control: "2-of-3 ops quorum",
        provenance: "Native USDC on Base",
        note: "Operationally useful, but counted as stressed in the drill.",
        riskLabel: "High",
      },
      {
        id: "d4",
        label: "Primary exchange wallet",
        venue: "Coinbase Prime",
        venueType: "Exchange",
        chain: "Base",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_800_000,
        liquidityBucket: "instant",
        settlementMins: 18,
        control: "Venue sub-account policy",
        provenance: "Exchange balance",
        note: "Useful for rapid conversion, but not ideal as long-term reserve storage.",
        riskLabel: "Medium",
      },
      {
        id: "d5",
        label: "OTC buffer",
        venue: "Kraken",
        venueType: "Exchange",
        chain: "Tron",
        asset: "USDT",
        assetType: "Native stablecoin",
        amountUsd: 3_000_000,
        liquidityBucket: "instant",
        settlementMins: 4,
        control: "Venue withdrawal whitelist",
        provenance: "Exchange balance",
        note: "Main secondary reserve during the drill.",
        riskLabel: "Medium",
      },
      {
        id: "d6",
        label: "Payroll safe",
        venue: "Safe",
        venueType: "Multisig",
        chain: "Ethereum",
        asset: "DAI",
        assetType: "Decentralized stablecoin",
        amountUsd: 1_200_000,
        liquidityBucket: "instant",
        settlementMins: 17,
        control: "2-of-3 ops quorum",
        provenance: "Multisig balance",
        note: "Critical fallback asset for obligations that cannot wait.",
        riskLabel: "Low",
      },
      {
        id: "d7",
        label: "Yield sleeve",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Ethereum",
        asset: "USDtb",
        assetType: "Yield sleeve",
        amountUsd: 1_500_000,
        liquidityBucket: "t+1",
        settlementMins: 1_440,
        control: "3-of-5 approval",
        provenance: "Tokenized cash-equivalent sleeve",
        note: "Not counted on for same-day continuity in the drill.",
        riskLabel: "Medium",
      },
      {
        id: "d8",
        label: "Vendor corridor wallet",
        venue: "Fireblocks Vault",
        venueType: "MPC custody",
        chain: "Arbitrum",
        asset: "USDC",
        assetType: "Native stablecoin",
        amountUsd: 1_600_000,
        liquidityBucket: "same-day",
        settlementMins: 31,
        control: "Policy-gated vault account",
        provenance: "Native USDC on Arbitrum",
        note: "Still functional, but slower reserve rotation assumed in the drill.",
        riskLabel: "High",
      },
    ],
    eventLog: [
      {
        time: "09:12 UTC",
        severity: "high",
        source: "Scenario engine",
        note: "Stress drill moved dominant USDC reserve into enhanced review mode.",
      },
      {
        time: "08:47 UTC",
        severity: "medium",
        source: "Policy board",
        note: "Instant-liquidity coverage fell below the floor once strategic vault approvals slowed.",
      },
      {
        time: "08:10 UTC",
        severity: "medium",
        source: "Treasury operator note",
        note: "Secondary reserve assets can cover payroll and urgent vendor obligations, but not all growth spend.",
      },
    ],
  },
};
