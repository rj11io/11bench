"use client"

import { Printer } from "lucide-react"

import styles from "./cv.module.css"

export function DownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={styles.downloadBtn}
      aria-label="Download this CV as a PDF using your browser's print dialog"
    >
      <Printer aria-hidden className={styles.downloadIcon} />
      <span>Download PDF</span>
    </button>
  )
}
