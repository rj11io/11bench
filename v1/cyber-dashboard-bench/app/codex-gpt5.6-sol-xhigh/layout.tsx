import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breakline — Exposure Remediation Command",
  description:
    "A seeded product demo for turning cloud attack paths into explainable, verifiable remediation missions.",
}

export default function BreaklineLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

