"use client"

export function DownloadButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      Download PDF
    </button>
  )
}
