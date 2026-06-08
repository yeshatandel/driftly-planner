import { motion } from "framer-motion"
import { Button } from "../ui/button.tsx"

export function SearchSummary({ location = "Bali", total = 128, filters = [], onClearFilter, onSortChange }) {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm text-muted-foreground">{total} stays in {location}</h3>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Curated results for your trip</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 sm:flex">
              {filters.map((f) => (
                <button key={f} onClick={() => onClearFilter?.(f)} className="rounded-full bg-white/6 px-3 py-1 text-sm text-muted-foreground">{f} ✕</button>
              ))}
            </div>
            <Button variant="outline" className="rounded-full">Sort</Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
