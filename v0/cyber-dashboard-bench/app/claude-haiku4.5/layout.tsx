import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AlertFlow - Triage-First Security Dashboard",
  description: "Intelligent alert triage and investigation dashboard for mid-market security teams",
}

export default function AlertFlowLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
