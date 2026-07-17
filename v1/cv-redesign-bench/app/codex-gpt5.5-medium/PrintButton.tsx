"use client"

import { Printer } from "lucide-react"

import styles from "./cv.module.css"

export function PrintButton() {
  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
      aria-label="Download PDF by opening the browser print dialog"
      title="Download PDF"
    >
      <Printer aria-hidden="true" size={16} strokeWidth={2} />
      <span>Download PDF</span>
    </button>
  )
}
