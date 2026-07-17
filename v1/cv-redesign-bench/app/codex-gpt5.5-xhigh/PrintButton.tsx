"use client"

import { Download } from "lucide-react"

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.print()}
      aria-label="Download PDF by opening the browser print dialog"
    >
      <Download aria-hidden="true" size={18} strokeWidth={2.2} />
      <span>Download PDF</span>
    </button>
  )
}
