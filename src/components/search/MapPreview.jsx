import { motion } from "framer-motion"

export function MapPreview() {
  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 h-[48rem] w-[26rem] rounded-[1.6rem] border border-white/60 bg-white/72 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8">
        <p className="text-sm text-muted-foreground">Map preview (placeholder)</p>
        <div className="mt-4 h-full w-full rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#071122] dark:to-[#0f1724]" />
      </div>
    </div>
  )
}
