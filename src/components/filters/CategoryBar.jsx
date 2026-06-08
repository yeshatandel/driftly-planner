import { motion } from "framer-motion"

import { categories } from "../../data/categories.js"
import { cn } from "../../lib/utils.js"

export function CategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <div id="category-bar" className="sticky top-16 z-40 px-4 py-4 sm:px-6 lg:top-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-panel mx-auto max-w-7xl rounded-[1.75rem] px-3 py-3"
      >
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto scroll-smooth">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.label

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => onCategoryChange(category.label)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-foreground text-background shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
                    : "text-muted-foreground hover:bg-white/80 hover:text-foreground dark:hover:bg-white/8"
                )}
              >
                <Icon className={cn("size-4 transition-transform duration-300 group-hover:scale-110", isActive && "text-background")} />
                <span>{category.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-current transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100"
                  )}
                />
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}