import { motion } from "framer-motion"

import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { formatINR } from "../../lib/currency.js"

export function BookingCard({ listing }) {
  const nightly = Number(listing.price)
  const nights = 5
  const cleaning = Math.round(nightly * 0.28)
  const service = Math.round(nightly * 0.14)
  const subtotal = nightly * nights
  const total = subtotal + cleaning + service

  return (
    <motion.aside
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-[2rem] border border-white/70 bg-white/78 p-5 shadow-[0_26px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8"
    >
      <div className="flex items-end justify-between">
        <p className="text-xl font-semibold text-foreground">{formatINR(nightly)} <span className="text-sm font-normal text-muted-foreground">night</span></p>
        <p className="text-xs text-muted-foreground">No charge yet</p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-border/70 bg-background/80 p-3 dark:border-white/12 dark:bg-white/5">
            <label className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Check in</label>
            <Input defaultValue="Aug 14" className="mt-1 h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/80 p-3 dark:border-white/12 dark:bg-white/5">
            <label className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Check out</label>
            <Input defaultValue="Aug 19" className="mt-1 h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/80 p-3 dark:border-white/12 dark:bg-white/5">
          <label className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Guests</label>
          <Input defaultValue="2 adults" className="mt-1 h-7 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0" />
        </div>

        <Button className="h-12 w-full rounded-full bg-[#ff385c] text-white shadow-[0_14px_40px_rgba(255,56,92,0.4)] hover:bg-[#ff2d54]">
          Reserve
        </Button>
      </div>

      <div className="mt-5 space-y-2 border-t border-border/70 pt-4 text-sm dark:border-white/10">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>{formatINR(nightly)} x {nights} nights</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Cleaning fee</span>
          <span>{formatINR(cleaning)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Service fee</span>
          <span>{formatINR(service)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4 text-sm font-semibold dark:border-white/10">
        <span>Total before taxes</span>
        <span>{formatINR(total)}</span>
      </div>
    </motion.aside>
  )
}
