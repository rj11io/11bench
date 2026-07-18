"use client"

export function PrintButton() {
  return (
    <button className="print:hidden rounded-full border border-neutral-900 bg-neutral-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 dark:border-white/20 dark:bg-white dark:text-neutral-950" onClick={() => window.print()}>
      Download PDF
    </button>
  )
}
