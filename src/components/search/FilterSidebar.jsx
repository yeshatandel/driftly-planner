import { motion } from "framer-motion"
import { Button } from "../ui/button.tsx"

export function FilterSidebar({ children }) {
  return (
    <aside className="hidden lg:block">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="sticky top-24 space-y-4">
        <div className="rounded-[1.6rem] border border-white/70 bg-white/74 p-4 shadow-[0_18px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8">
          <p className="text-sm font-semibold text-foreground">Filters</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</div>
          <div className="mt-3">
            <Button className="w-full rounded-full">Apply</Button>
          </div>
        </div>
      </motion.div>
    </aside>
  )
}
