import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sentinel Treasury | Stablecoin Risk Desk",
  description:
    "A demo stablecoin treasury risk cockpit for crypto finance and operations teams.",
}

export default function RunLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
