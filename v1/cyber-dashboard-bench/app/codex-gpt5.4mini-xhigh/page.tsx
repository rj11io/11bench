import type { Metadata } from "next"

import { ExposureDesk } from "./exposure-desk"
import { seedWorkspace } from "./data"

export const metadata: Metadata = {
  title: "Exposure Desk",
  description:
    "A cybersecurity exposure-management dashboard focused on weekly prioritization and remediation planning.",
}

export default function Page() {
  return <ExposureDesk initialWorkspace={seedWorkspace} />
}
