'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  AlertCircle,
  TrendingUp,
  Shield,
  Activity,
  GitBranch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// Demo data for yield pools
const DEMO_POOLS = [
  {
    id: 'aave-eth-usdc',
    protocol: 'Aave',
    chain: 'Ethereum',
    pool: 'USDC/ETH',
    baseApy: 8.5,
    rewardApy: 0,
    totalApy: 8.5,
    tvl: 125300000,
    volume7d: 45200000,
    volatility: 28,
    riskLevel: 'blue',
    team: {
      size: 25,
      commits30d: 48,
      pastLaunches: ['Aave Protocol (2020)', 'Aave V2 (2021)', 'Aave V3 (2022)'],
    },
    audits: [
      { auditor: 'Trail of Bits', date: '2025-05-10', severity: 'Low' },
      { auditor: 'CertiK', date: '2025-01-15', severity: 'Medium' },
    ],
    hacks: [
      {
        date: '2023-10-15',
        severity: 'Medium',
        summary: 'Flash loan attack - $18M recovered',
      },
    ],
    governance: { topVoting: 45, quorum: 80, proposals: 20 },
  },
  {
    id: 'curve-eth-steth',
    protocol: 'Curve',
    chain: 'Ethereum',
    pool: 'stETH/ETH',
    baseApy: 4.2,
    rewardApy: 6.1,
    totalApy: 10.3,
    tvl: 89500000,
    volume7d: 123400000,
    volatility: 12,
    riskLevel: 'blue',
    team: {
      size: 18,
      commits30d: 32,
      pastLaunches: ['Curve Protocol (2020)'],
    },
    audits: [
      { auditor: 'Trail of Bits', date: '2024-08-20', severity: 'Low' },
    ],
    hacks: [],
    governance: { topVoting: 52, quorum: 60, proposals: 15 },
  },
  {
    id: 'uniswap-arb-usdc-eth',
    protocol: 'Uniswap V3',
    chain: 'Arbitrum',
    pool: 'USDC/ETH (0.01%)',
    baseApy: 12.5,
    rewardApy: 0,
    totalApy: 12.5,
    tvl: 45200000,
    volume7d: 32100000,
    volatility: 35,
    riskLevel: 'blue',
    team: {
      size: 30,
      commits30d: 67,
      pastLaunches: ['Uniswap (2018)', 'Uniswap V3 (2021)'],
    },
    audits: [
      { auditor: 'OpenZeppelin', date: '2024-12-05', severity: 'Low' },
    ],
    hacks: [],
    governance: { topVoting: 38, quorum: 75, proposals: 28 },
  },
  {
    id: 'balancer-opt-stable',
    protocol: 'Balancer',
    chain: 'Optimism',
    pool: 'USDC/USDT/DAI',
    baseApy: 3.8,
    rewardApy: 11.2,
    totalApy: 15.0,
    tvl: 28300000,
    volume7d: 18500000,
    volatility: 8,
    riskLevel: 'amber',
    team: {
      size: 12,
      commits30d: 19,
      pastLaunches: ['Balancer Protocol (2020)'],
    },
    audits: [
      { auditor: 'CertiK', date: '2024-06-10', severity: 'Low' },
    ],
    hacks: [
      {
        date: '2022-07-28',
        severity: 'Critical',
        summary: 'Composability vulnerability - fixed',
      },
    ],
    governance: { topVoting: 68, quorum: 70, proposals: 12 },
  },
  {
    id: 'lido-eth-stake',
    protocol: 'Lido',
    chain: 'Ethereum',
    pool: 'stETH Staking',
    baseApy: 3.5,
    rewardApy: 0,
    totalApy: 3.5,
    tvl: 12500000000,
    volume7d: 245000000,
    volatility: 2,
    riskLevel: 'amber',
    team: {
      size: 35,
      commits30d: 89,
      pastLaunches: ['Lido (2020)'],
    },
    audits: [
      { auditor: 'Trail of Bits', date: '2025-03-01', severity: 'Low' },
      { auditor: 'OpenZeppelin', date: '2024-11-15', severity: 'Low' },
    ],
    hacks: [],
    governance: { topVoting: 42, quorum: 85, proposals: 35 },
  },
  {
    id: 'yearn-eth-strat',
    protocol: 'Yearn Finance',
    chain: 'Ethereum',
    pool: 'ETH Strategy',
    baseApy: 7.2,
    rewardApy: 2.1,
    totalApy: 9.3,
    tvl: 156700000,
    volume7d: 89200000,
    volatility: 42,
    riskLevel: 'amber',
    team: {
      size: 22,
      commits30d: 54,
      pastLaunches: ['Yearn (2020)'],
    },
    audits: [
      { auditor: 'Trail of Bits', date: '2025-02-20', severity: 'Medium' },
    ],
    hacks: [
      {
        date: '2021-02-04',
        severity: 'High',
        summary: 'Vyper compiler bug - $11M recovered',
      },
    ],
    governance: { topVoting: 35, quorum: 90, proposals: 42 },
  },
  {
    id: 'gmx-arb-glp',
    protocol: 'GMX',
    chain: 'Arbitrum',
    pool: 'GLP (Index)',
    baseApy: 18.5,
    rewardApy: 12.3,
    totalApy: 30.8,
    tvl: 89200000,
    volume7d: 2450000000,
    volatility: 58,
    riskLevel: 'red',
    team: {
      size: 8,
      commits30d: 11,
      pastLaunches: ['GMX (2021)'],
    },
    audits: [
      { auditor: 'CertiK', date: '2024-04-15', severity: 'Medium' },
    ],
    hacks: [
      {
        date: '2023-09-02',
        severity: 'Critical',
        summary: 'Oracle manipulation - $26M recovered',
      },
    ],
    governance: { topVoting: 72, quorum: 50, proposals: 8 },
  },
]

const CHAINS = ['Ethereum', 'Arbitrum', 'Optimism']
const RISK_LEVELS = [
  { value: 'blue', label: 'Low Risk', color: 'bg-blue-500' },
  { value: 'amber', label: 'Caution', color: 'bg-amber-500' },
  { value: 'red', label: 'Critical Risk', color: 'bg-red-500' },
]

function formatCurrency(num: number): string {
  if (num >= 1000000000)
    return `$${(num / 1000000000).toFixed(1)}B`
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
  return `$${num.toFixed(0)}`
}

function getRiskBg(level: string): string {
  switch (level) {
    case 'blue':
      return 'bg-blue-500/10'
    case 'amber':
      return 'bg-amber-500/10'
    case 'red':
      return 'bg-red-500/10'
    default:
      return 'bg-gray-500/10'
  }
}

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

type Tab = 'discover' | 'tools' | 'about'

export default function YieldScout() {
  const [tab, setTab] = useState<Tab>('discover')
  const [selectedChain, setSelectedChain] = useState<string | null>(null)
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'totalApy',
    direction: 'desc',
  })
  const [selectedProtocol, setSelectedProtocol] =
    useState<(typeof DEMO_POOLS)[0] | null>(null)
  const [showILCalc, setShowILCalc] = useState(false)
  const [showGasCalc, setShowGasCalc] = useState(false)
  const [ilInputs, setIlInputs] = useState({
    poolId: '',
    days: '7',
  })
  const [gasInputs, setGasInputs] = useState({
    chain: 'Ethereum',
    positionSize: '5000',
    action: 'both',
  })

  const filteredPools = useMemo(() => {
    return DEMO_POOLS.filter((pool) => {
      if (selectedChain && pool.chain !== selectedChain) return false
      if (selectedRisk && pool.riskLevel !== selectedRisk) return false
      return true
    })
  }, [selectedChain, selectedRisk])

  const sortedPools = useMemo(() => {
    const sorted = [...filteredPools].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof typeof a]
      const bVal = b[sortConfig.key as keyof typeof b]

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })
    return sorted
  }, [filteredPools, sortConfig])

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  const calculateIL = useCallback((volatility: number, days: number) => {
    const annualVol = volatility / 100
    const periodVol = annualVol * Math.sqrt(days / 365)
    const priceRatio = 1 + periodVol
    const il = (2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1) * 100
    return -Math.abs(il)
  }, [])

  const calculateGasCost = useCallback((
    positionSize: number,
    chain: string,
  ) => {
    let gasPrice = 25 // gwei
    if (chain === 'Arbitrum') gasPrice = 0.5
    if (chain === 'Optimism') gasPrice = 1.5

    const ethPrice = 2400
    const gasUnitCost = gasPrice * 21000 * (ethPrice / 1e9)
    return gasUnitCost * 2
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Yield Scout
              </h1>
            </div>
            <div className="text-xs text-slate-500">
              DEMO DATA — Not live prices
            </div>
          </div>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            <button
              onClick={() => setTab('discover')}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                tab === 'discover'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setTab('tools')}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                tab === 'tools'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => setTab('about')}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                tab === 'about'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {tab === 'discover' && (
          <>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Chain
                  </label>
                  <select
                    value={selectedChain || ''}
                    onChange={(e) =>
                      setSelectedChain(e.target.value || null)
                    }
                    className="rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="">All Chains</option>
                    {CHAINS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Risk Level
                  </label>
                  <select
                    value={selectedRisk || ''}
                    onChange={(e) =>
                      setSelectedRisk(e.target.value || null)
                    }
                    className="rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="">All Levels</option>
                    {RISK_LEVELS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {sortedPools.length} pools found
              </div>
            </div>

            {/* Yield table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    {[
                      { key: 'protocol', label: 'Protocol' },
                      { key: 'chain', label: 'Chain' },
                      { key: 'pool', label: 'Pool' },
                      { key: 'totalApy', label: 'APY' },
                      { key: 'tvl', label: 'TVL' },
                      { key: 'volume7d', label: 'Volume (7d)' },
                      { key: 'volatility', label: 'Volatility' },
                      { key: 'riskLevel', label: 'Risk' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          {sortConfig.key === col.key && (
                            <span className="text-xs">
                              {sortConfig.direction === 'asc' ? '▲' : '▼'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPools.map((pool) => (
                    <tr
                      key={pool.id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                        <button
                          onClick={() => setSelectedProtocol(pool)}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {pool.protocol}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {pool.chain}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {pool.pool}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">
                        <div>{pool.totalApy.toFixed(1)}%</div>
                        <div className="text-xs text-slate-500">
                          {pool.baseApy.toFixed(1)}% base,{' '}
                          {pool.rewardApy.toFixed(1)}% reward
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {formatCurrency(pool.tvl)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {formatCurrency(pool.volume7d)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {pool.volatility === 2
                          ? 'Low'
                          : pool.volatility < 30
                            ? 'Med'
                            : 'High'}
                        {' '}
                        ({pool.volatility}%)
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${getRiskBg(pool.riskLevel)}`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${
                              pool.riskLevel === 'blue'
                                ? 'bg-blue-500'
                                : pool.riskLevel === 'amber'
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                            }`}
                          />
                          {RISK_LEVELS.find(
                            (r) => r.value === pool.riskLevel,
                          )?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIlInputs({ poolId: pool.id, days: '7' })
                            setShowILCalc(true)
                          }}
                          className="text-xs"
                        >
                          IL Calc
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'tools' && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* IL Calculator Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Impermanent Loss Calculator
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select Pool
                  </label>
                  <select
                    value={ilInputs.poolId}
                    onChange={(e) =>
                      setIlInputs({ ...ilInputs, poolId: e.target.value })
                    }
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="">Choose a pool...</option>
                    {DEMO_POOLS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.protocol} {p.pool}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Holding Period (days)
                  </label>
                  <input
                    type="number"
                    value={ilInputs.days}
                    onChange={(e) =>
                      setIlInputs({ ...ilInputs, days: e.target.value })
                    }
                    min="1"
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <Button
                  onClick={() => setShowILCalc(true)}
                  className="w-full"
                >
                  Calculate IL
                </Button>
              </div>
            </div>

            {/* Gas Impact Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Gas Impact Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Chain
                  </label>
                  <select
                    value={gasInputs.chain}
                    onChange={(e) =>
                      setGasInputs({ ...gasInputs, chain: e.target.value })
                    }
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {CHAINS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Position Size ($)
                  </label>
                  <input
                    type="number"
                    value={gasInputs.positionSize}
                    onChange={(e) =>
                      setGasInputs({
                        ...gasInputs,
                        positionSize: e.target.value,
                      })
                    }
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <Button
                  onClick={() => setShowGasCalc(true)}
                  className="w-full"
                >
                  Analyze Gas Cost
                </Button>
              </div>
            </div>
          </div>
        )}

        {tab === 'about' && (
          <div className="max-w-3xl rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              About Yield Scout
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Yield Scout helps DeFi liquidity providers compare yields across
                protocols and chains, with transparent breakdowns of sustainable
                vs. temporary yields, impermanent loss impact, and gas costs.
              </p>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Data Sources
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>
                  Yield data: Protocol fee revenues and emission schedules
                </li>
                <li>TVL & volume: On-chain observations and DefiLlama</li>
                <li>Audits & team: Public GitHub and audit firm reports</li>
                <li>Risk signals: Protocol hacks timeline</li>
              </ul>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Demo Data
              </h3>
              <p className="text-sm">
                This dashboard displays demo data as of 2026-07-15. All pools
                shown are real protocols and chains, but yields and prices are
                not live or current. This is a research tool, not a trading
                platform.
              </p>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Disclaimer
              </h3>
              <p className="text-sm">
                Not investment advice. Yields change. Audits do not guarantee
                safety. Smart contract risks are real. Govern responsibly.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Protocol Detail Modal */}
      <Dialog open={!!selectedProtocol} onOpenChange={() => setSelectedProtocol(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {selectedProtocol && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {selectedProtocol.protocol} Risk & Team
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Team Card */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <GitBranch className="h-4 w-4" />
                    Team & Activity
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Core Team:
                      </span>{' '}
                      {selectedProtocol.team.size} developers
                    </p>
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        GitHub Activity:
                      </span>{' '}
                      {selectedProtocol.team.commits30d} commits in last 30 days
                    </p>
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Track Record:
                      </span>
                    </p>
                    <ul className="ml-4 list-disc space-y-1">
                      {selectedProtocol.team.pastLaunches.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Audits Card */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Security Audits
                  </h4>
                  {selectedProtocol.audits.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProtocol.audits.map((audit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 rounded bg-white p-2 dark:bg-slate-950"
                        >
                          <span className="mt-0.5 text-green-600 dark:text-green-400">
                            ✓
                          </span>
                          <div className="text-sm">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {audit.auditor}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {new Date(audit.date).toLocaleDateString()} -{' '}
                              {audit.severity} findings
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      No audits on record.
                    </p>
                  )}
                </div>

                {/* Hacks Timeline */}
                {selectedProtocol.hacks.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-900 dark:text-red-200">
                      <AlertCircle className="h-4 w-4" />
                      Incident History
                    </h4>
                    <div className="space-y-2">
                      {selectedProtocol.hacks.map((hack, idx) => (
                        <div
                          key={idx}
                          className="rounded bg-white p-2 dark:bg-slate-950"
                        >
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {new Date(hack.date).toLocaleDateString()} —{' '}
                            {hack.severity} Severity
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {hack.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Governance */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <Activity className="h-4 w-4" />
                    Governance
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Top Voting Power:
                      </span>{' '}
                      {selectedProtocol.governance.topVoting}%
                    </p>
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Quorum Required:
                      </span>{' '}
                      {selectedProtocol.governance.quorum}%
                    </p>
                    <p>
                      <span className="font-medium text-slate-900 dark:text-white">
                        Active Proposals:
                      </span>{' '}
                      {selectedProtocol.governance.proposals}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* IL Calculator Modal */}
      <Dialog open={showILCalc} onOpenChange={setShowILCalc}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Impermanent Loss Estimate</DialogTitle>
          </DialogHeader>
          {ilInputs.poolId && (
            (() => {
              const pool = DEMO_POOLS.find((p) => p.id === ilInputs.poolId)
              if (!pool) return null

              const days = parseInt(ilInputs.days) || 7
              const il = calculateIL(pool.volatility, days)
              const annualFee = 0.003
              const feeOffset =
                (annualFee * days) / 365
              const netReturn = il + feeOffset * 100

              return (
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {pool.protocol} {pool.pool}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Holding period: {days} days
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Estimated IL:
                      </span>
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {il.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Fee Offset:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        +{(feeOffset * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Net Return (IL + Fees):
                      </span>
                      <span
                        className={`font-semibold ${
                          netReturn > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {netReturn > 0 ? '+' : ''}
                        {netReturn.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
                    <p className="text-xs text-blue-900 dark:text-blue-200">
                      <span className="font-semibold">Note:</span> This estimate
                      is based on historical {pool.volatility}% volatility. Actual
                      IL depends on actual price movements during your holding
                      period.
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowILCalc(false)}
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              )
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* Gas Calculator Modal */}
      <Dialog open={showGasCalc} onOpenChange={setShowGasCalc}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gas Cost Impact</DialogTitle>
          </DialogHeader>
          {(() => {
            const positionSize = parseFloat(gasInputs.positionSize) || 0
            const gasCost = calculateGasCost(positionSize, gasInputs.chain)
            const expectedYield = positionSize * 0.12
            const gasPercent = (gasCost / expectedYield) * 100

            return (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {gasInputs.chain}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Position size: ${positionSize.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Est. Gas Cost (deposit + withdraw):
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${gasCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Expected Annual Yield (12%):
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${expectedYield.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className={`flex justify-between rounded border p-3 ${
                      gasPercent > 30
                        ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'
                        : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Gas as % of Yield:
                    </span>
                    <span
                      className={`font-semibold ${
                        gasPercent > 30
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {gasPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {gasPercent > 30 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                    <p className="text-xs text-amber-900 dark:text-amber-200">
                      <span className="font-semibold">⚠️ Warning:</span> Gas costs
                      exceed 30% of expected yield. Consider increasing position
                      size or deploying on a cheaper network.
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => setShowGasCalc(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
