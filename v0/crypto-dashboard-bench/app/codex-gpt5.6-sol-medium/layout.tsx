import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Northstar — Treasury command",
  description:
    "A seeded demo of a policy-aware onchain treasury risk and liquidity cockpit.",
}

export default function RunLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
