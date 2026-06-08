import { cn } from "../../lib/utils.js"

export function PageShell({ className, children }) {
  return (
    <div className={cn("relative isolate min-h-screen overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),transparent_46%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_46%)]" />
      <div className="pointer-events-none absolute top-24 left-[-10rem] -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-[-8rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.16),transparent_68%)] blur-3xl" />
      {children}
    </div>
  )
}