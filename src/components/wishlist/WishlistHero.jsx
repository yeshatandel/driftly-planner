import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { Button } from "../ui/button.tsx"

export function WishlistHero({ previews = [], onBack }) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-14 h-64 w-64 rounded-full bg-[#ff8a9f]/25 blur-[110px] dark:bg-[#ff4f74]/20" />
        <div className="absolute right-[-5rem] top-8 h-72 w-72 rounded-full bg-[#8dbbff]/20 blur-[120px] dark:bg-[#4f7bff]/18" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Button
          variant="outline"
          onClick={onBack}
          className="absolute left-4 top-4 z-20 rounded-full border-[#ff385c]/80 bg-[#ff385c] px-5 text-white shadow-[0_12px_38px_rgba(255,56,92,0.45)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff2d54] hover:shadow-[0_16px_48px_rgba(255,56,92,0.5)]"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        <div className="overflow-hidden rounded-[2rem] border border-white/65 bg-white/65 p-7 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-10 dark:border-white/12 dark:bg-white/8">
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Places you’ll want to return to.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Save breathtaking stays, hidden gems, and unforgettable experiences for your next adventure.
          </p>

          {previews.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {previews.slice(0, 3).map((preview, index) => (
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-3xl"
                >
                  <img src={preview.image} alt={preview.title} className="h-40 w-full object-cover sm:h-44" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/8 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-sm font-medium text-white">{preview.title}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
