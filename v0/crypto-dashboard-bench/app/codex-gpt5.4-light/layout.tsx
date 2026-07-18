import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Harbor Treasury | Stablecoin Control Tower Demo",
  description:
    "A seeded demo for operating stablecoin treasury, payout routing, and reserve-aware risk controls.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
