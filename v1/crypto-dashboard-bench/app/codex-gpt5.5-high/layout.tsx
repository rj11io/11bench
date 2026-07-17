import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Treasury Sentinel | Stablecoin Treasury Risk",
  description:
    "A seeded demo of a stablecoin treasury risk cockpit for finance and operations teams.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

