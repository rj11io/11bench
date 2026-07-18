import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Harbor — Treasury risk cockpit",
  description: "A seeded, non-custodial DeFi treasury risk demo.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
