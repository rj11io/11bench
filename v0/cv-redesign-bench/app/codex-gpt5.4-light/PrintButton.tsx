"use client"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-full border border-black/15 bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black print:hidden"
    >
      Download PDF
    </button>
  )
}
