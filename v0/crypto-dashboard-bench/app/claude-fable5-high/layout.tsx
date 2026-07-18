import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Glidepath — treasury runway console (demo)",
  description:
    "Demo of Glidepath: runway, policy checks, stress tests, and rebalance proposals for crypto-native organizations. Seeded data only — nothing is live.",
}

export default function GlidepathLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
