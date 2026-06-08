import { motion } from "framer-motion"
import { Compass } from "lucide-react"

import { Button } from "../ui/button.tsx"

export function EmptyWishlist({ onExplore }) {
  return (
    <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/65 bg-white/72 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-12 dark:border-white/12 dark:bg-white/8">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto inline-flex size-16 items-center justify-center rounded-3xl bg-[#ff385c]/14 text-[#ff385c] shadow-[0_14px_34px_rgba(255,56,92,0.24)]"
        >
          <Compass className="size-7" />
        </motion.div>

        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">Your next escape starts here.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Save properties you love and build your dream collection of unforgettable stays.
        </p>
        <Button className="mt-6 rounded-full bg-[#ff385c] px-7 hover:bg-[#ff2d54]" onClick={onExplore}>
          Explore Destinations
        </Button>
      </div>
    </section>
  )
}
