import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chokepoint",
  description:
    "Attack-path remediation workspace demo for lean cloud security teams.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
