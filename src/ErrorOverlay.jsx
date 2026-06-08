import React, { useEffect, useState } from "react"

export default function ErrorOverlay() {
  const [error, setError] = useState(null)

  useEffect(() => {
    const handler = (event) => {
      const message = event?.message || (event?.reason && event.reason.message) || String(event)
      const stack = event?.error?.stack || (event?.reason && event.reason.stack) || ""
      setError({ message, stack })
    }

    window.addEventListener("error", handler)
    window.addEventListener("unhandledrejection", handler)

    return () => {
      window.removeEventListener("error", handler)
      window.removeEventListener("unhandledrejection", handler)
    }
  }, [])

  if (!error) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-black/90 border rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <strong className="text-red-600">Application Error</strong>
          <button className="text-sm" onClick={() => setError(null)}>Dismiss</button>
        </div>
        <div className="mt-2 text-sm text-black/80 dark:text-white/80">
          <div className="font-medium">{error.message}</div>
          <pre className="mt-2 text-xs whitespace-pre-wrap">{error.stack}</pre>
        </div>
      </div>
    </div>
  )
}
