import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clearline · Exposure desk",
  description: "A demo exposure-management desk for explainable vulnerability remediation.",
}

export default function ClearlineLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
