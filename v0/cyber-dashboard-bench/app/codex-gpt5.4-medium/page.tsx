import type { Metadata } from "next"

import { ChokepointDashboard } from "./dashboard"

export const metadata: Metadata = {
  title: "Chokepoint | Exposure Operations Demo",
  description:
    "A campaign-based exposure operations dashboard for cloud-native security teams.",
}

export default function Page() {
  return <ChokepointDashboard />
}
