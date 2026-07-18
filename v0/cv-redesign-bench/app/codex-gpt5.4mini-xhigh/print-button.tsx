"use client"

import { Printer } from "lucide-react"

import styles from "./resume.module.css"

export function PrintButton() {
  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
    >
      <Printer aria-hidden="true" size={16} strokeWidth={1.9} />
      <span>Download PDF</span>
    </button>
  )
}
