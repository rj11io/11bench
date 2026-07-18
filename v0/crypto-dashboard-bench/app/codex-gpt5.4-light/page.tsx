import { TreasuryDemo } from "./treasury-demo"
import {
  demoAlerts,
  demoNetworkHealth,
  demoPayouts,
  demoReserves,
  demoTreasuryBuckets,
} from "./treasury-data"

export default function Page() {
  return (
    <TreasuryDemo
      alerts={demoAlerts}
      networkHealth={demoNetworkHealth}
      payouts={demoPayouts}
      reserves={demoReserves}
      treasuryBuckets={demoTreasuryBuckets}
    />
  )
}
