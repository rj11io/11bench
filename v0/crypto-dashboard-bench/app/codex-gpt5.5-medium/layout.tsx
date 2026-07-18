import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "StableOps Radar | Crypto Treasury Risk Dashboard",
  description:
    "A seeded demo of a stablecoin treasury operations dashboard for monitoring liquidity, depeg, chain, and counterparty risk.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
