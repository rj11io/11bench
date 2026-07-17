import type { Metadata } from "next"

import { TreasuryDashboard } from "./dashboard"

export const metadata: Metadata = {
  title: "ReserveScope | Treasury risk cockpit",
  description:
    "Policy-aware treasury and liquidity risk cockpit for stablecoin-heavy crypto teams.",
}

export default function Page() {
  return <TreasuryDashboard />
}

