import { motion } from "framer-motion"
import { ArrowLeft, CalendarDays, MapPin, SlidersHorizontal, Users } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"

export function SearchHeader({ onBack }) {
  return (
    <section className="px-4 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl"
      >
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="absolute left-4 top-4 z-20 rounded-full border-[#ff385c]/80 bg-[#ff385c] px-4 text-white shadow-[0_12px_38px_rgba(255,56,92,0.45)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff2d54] hover:shadow-[0_16px_48px_rgba(255,56,92,0.5)]"
          >
            <ArrowLeft className="mr-2 size-4" />
          </Button>
        )}

        <div className="rounded-[2rem] border border-white/60 bg-white/70 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <div className="group md:ml-12 lg:ml-14 rounded-full border border-border/70 bg-background/80 px-4 py-3 transition-colors duration-300 hover:border-foreground/30 dark:border-white/12 dark:bg-white/6">
              <label htmlFor="location" className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Location</label>
              <div className="mt-1 flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <Input id="location" defaultValue="Goa, India" className="h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
              </div>
            </div>

            <div className="group rounded-full border border-border/70 bg-background/80 px-4 py-3 transition-colors duration-300 hover:border-foreground/30 dark:border-white/12 dark:bg-white/6">
              <label htmlFor="checkin" className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Check in</label>
              <div className="mt-1 flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                <Input id="checkin" defaultValue="Aug 12" className="h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
              </div>
            </div>

            <div className="group rounded-full border border-border/70 bg-background/80 px-4 py-3 transition-colors duration-300 hover:border-foreground/30 dark:border-white/12 dark:bg-white/6">
              <label htmlFor="checkout" className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Check out</label>
              <div className="mt-1 flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                <Input id="checkout" defaultValue="Aug 17" className="h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
              </div>
            </div>

            <div className="group rounded-full border border-border/70 bg-background/80 px-4 py-3 transition-colors duration-300 hover:border-foreground/30 dark:border-white/12 dark:bg-white/6">
              <label htmlFor="guests" className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guests</label>
              <div className="mt-1 flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <Input id="guests" defaultValue="2 guests" className="h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
              </div>
            </div>

            <Button className="h-14 rounded-full px-6 text-sm shadow-[0_16px_40px_rgba(15,23,42,0.2)]">
              <SlidersHorizontal className="mr-2 size-4" />
              Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
