import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breakline | Attack-Path Operations",
  description:
    "Demo cybersecurity product for attack-path prioritization, ownership, and remediation workflow.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
