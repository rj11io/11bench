import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clearrail | Settlement control room",
  description:
    "A seeded demo of a stablecoin settlement-risk workspace for finance operations teams.",
}

export default function ClearrailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
