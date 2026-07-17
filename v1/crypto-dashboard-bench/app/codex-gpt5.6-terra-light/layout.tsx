import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Northstar / Treasury pulse",
  description: "A seeded, decision-support demo for stablecoin treasury teams.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
