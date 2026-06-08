import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MapPin, Star } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { cn } from "../../lib/utils.js"
import { formatINR } from "../../lib/currency.js"

export function ListingCard({ listing, index, onOpenDetails }) {
  const [liked, setLiked] = useState(false)
  const openDetails = () => onOpenDetails?.(listing)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      onClick={openDetails}
      className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10" />
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute top-4 right-4 size-10 rounded-full border-black/10 bg-white/85 text-slate-950 shadow-[0_8px_26px_rgba(15,23,42,0.12)] backdrop-blur-xl hover:bg-white",
            liked && "text-rose-500"
          )}
          onClick={(event) => {
            event.stopPropagation()
            setLiked((current) => !current)
          }}
          aria-label="Save listing"
        >
          <Heart className={cn("size-4 transition-all", liked && "fill-current")} />
        </Button>
        <div className="absolute left-4 bottom-4 rounded-full border border-black/10 bg-white/88 px-3 py-1 text-xs font-medium text-slate-950 shadow-[0_8px_26px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          {listing.category}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              <span>{listing.location}</span>
            </div>
            <h3 className="text-lg font-medium tracking-tight text-foreground">{listing.title}</h3>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
            <Star className="size-3.5 fill-current text-amber-500" />
            {listing.rating}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-border/60 pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Available {listing.dates}</p>
            <p className="mt-1 text-base text-foreground">
              <span className="text-2xl font-semibold">{formatINR(listing.price)}</span>
              <span className="text-muted-foreground"> / night</span>
            </p>
          </div>

          <Button
            variant="ghost"
            className="rounded-full px-4 text-sm text-muted-foreground hover:text-foreground"
            onClick={(event) => {
              event.stopPropagation()
              openDetails()
            }}
          >
            View details
          </Button>
        </div>
      </div>
    </motion.article>
  )
}