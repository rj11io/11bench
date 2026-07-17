"use client"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        document.querySelector<HTMLElement>("[data-cv-scope]")?.setAttribute(
          "data-cv-print",
          "true"
        )
        window.print()
      }}
      className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-transparent print:hidden"
    >
      Download PDF
    </button>
  )
}
