import { motion } from "framer-motion"
import { Building2, Compass, Home, Mountain, Snowflake, Sparkles, Sun, Tent, Waves } from "lucide-react"

import { cn } from "../../lib/utils.js"

const categories = [
  { label: "Beach", icon: Waves },
  { label: "Luxe", icon: Sparkles },
  { label: "Cabins", icon: Home },
  { label: "Arctic", icon: Snowflake },
  { label: "Tiny Homes", icon: Home },
  { label: "Camping", icon: Tent },
  { label: "Amazing Pools", icon: Mountain },
  { label: "Desert", icon: Sun },
  { label: "Islands", icon: Compass },
  { label: "Modern Villas", icon: Building2 },
]

export function ExploreCategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <div className="sticky top-20 z-40 px-4 py-3 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/60 bg-white/72 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/12 dark:bg-[#0c0f14]/72"
      >
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.label

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => onCategoryChange(category.label)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-sm transition-colors duration-300",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                )}
              >
                <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                <span>{category.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-current transition-transform duration-300",
                    isActive ? "scale-x-100" : "group-hover:scale-x-100"
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
