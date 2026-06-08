import { motion } from "framer-motion"
import { ArrowUpDown, X } from "lucide-react"

import { Button } from "../ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx"

export function ActiveFiltersSection({ total, filters, onRemoveFilter, sortBy, onSortChange }) {
  return (
    <section className="px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/60 bg-white/72 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm font-medium text-foreground">{total} stays found</p>
            {filters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onRemoveFilter(filter)}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground dark:border-white/12 dark:bg-white/6"
              >
                {filter}
                <X className="size-3.5" />
              </motion.button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between rounded-full border-border/70 bg-background/80 sm:w-auto dark:border-white/12 dark:bg-white/6">
                <span className="inline-flex items-center gap-2">
                  <ArrowUpDown className="size-4" />
                  Sort: {sortBy}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl">
              {[
                "Featured",
                "Top rated",
                "Price: low to high",
                "Price: high to low",
              ].map((option) => (
                <DropdownMenuItem key={option} onClick={() => onSortChange(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}
