import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patchbay — remediation operations for lean security teams",
  description:
    "Product demo: one evidence-ranked queue of deduplicated, owner-routed, deadline-tracked security fixes. Every priority shows its receipts. All data is fictional.",
}

export default function PatchbayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
