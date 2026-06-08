import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button.tsx"

export function FeaturedCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b0e12] text-white shadow-[0_35px_120px_rgba(0,0,0,0.38)] sm:col-span-2 xl:col-span-2 2xl:col-span-2"
    >
      <img
        src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80"
        alt="Editorial luxury collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-black/22" />

      <div className="relative flex min-h-[20rem] flex-col justify-between p-6 sm:min-h-[24rem] sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/72">Editorial pick</p>
          <h3 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            The New Coastal Icons Collection
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/72 sm:text-base">
            A curation of cinematic villas where architecture, silence, and ocean light shape the stay.
          </p>
        </div>

        <Button className="mt-8 w-fit rounded-full bg-white text-slate-950 hover:bg-white/90">
          Explore Collection
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </motion.article>
  )
}
