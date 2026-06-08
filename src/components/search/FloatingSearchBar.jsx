import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { CalendarDays, MapPin, Users, Search as SearchIcon } from "lucide-react"
import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"

export function FloatingSearchBar({ onSearch, focus = false, onFocusDone = () => {} }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus()
      // ensure any parent transitions settle
      setTimeout(() => onFocusDone(), 120)
    }
  }, [focus, onFocusDone])

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel relative rounded-full border border-white/20 py-3 px-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin className="size-4 text-muted-foreground" />
            <Input ref={inputRef} placeholder="Where to?" className="border-0 bg-transparent px-0 text-sm" />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Dates</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2">
              <Users className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Guests</span>
            </div>
          </div>

          <div className="ml-2 flex items-center gap-2">
            <Button className="hidden rounded-full px-4 md:inline-flex" variant="outline" onClick={onSearch}>
              <SearchIcon className="mr-2 size-4" />
              Search
            </Button>
            <Button size="icon" onClick={onSearch} className="md:hidden">
              <SearchIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
