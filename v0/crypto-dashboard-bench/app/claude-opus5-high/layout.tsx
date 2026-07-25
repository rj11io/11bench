import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waterline — treasury liquidity assurance (demo)",
  description:
    "Mark value says what a crypto treasury owns. Waterline says what it can actually spend, and when. Seeded demo data throughout — nothing here is live.",
}

export default function WaterlineLayout({ children }: { children: React.ReactNode }) {
  return children
}
