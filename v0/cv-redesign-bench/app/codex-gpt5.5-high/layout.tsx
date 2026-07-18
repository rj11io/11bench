import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer CV",
  description:
    "A researched, rewritten, responsive, and print-ready two-page CV for Ricardo Jorge.",
}

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
