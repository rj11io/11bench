"use client"

type DownloadPdfButtonProps = {
  className?: string
}

export function DownloadPdfButton({ className }: DownloadPdfButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
      aria-label="Download this CV as a PDF"
    >
      <span aria-hidden="true">↓</span>
      <span>Download PDF</span>
    </button>
  )
}
