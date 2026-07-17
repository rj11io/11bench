import type { Metadata } from "next"

import TreasuryDeskClient from "./treasury-desk-client"

export const metadata: Metadata = {
  title: "Reserve Desk",
  description:
    "A read-only crypto treasury risk console for stablecoin reserves, operating wallets, and protocol sleeves.",
}

export default function Page() {
  return <TreasuryDeskClient />
}
