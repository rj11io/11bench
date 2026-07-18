import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tideguard — Treasury resilience",
  description:
    "A seeded product demo for stress-testing crypto-native operating treasury.",
}

export default function TideguardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

