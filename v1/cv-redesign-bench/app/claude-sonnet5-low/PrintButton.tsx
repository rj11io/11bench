"use client"

import styles from "./print.module.css"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`${styles.noPrint} fixed bottom-6 right-6 z-10 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white`}
    >
      Download PDF
    </button>
  )
}
