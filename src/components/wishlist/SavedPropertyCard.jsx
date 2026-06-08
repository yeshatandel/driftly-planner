import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, MapPin, Star } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { formatINR } from "../../lib/currency.js"

export function SavedPropertyCard({ item, index, onOpenDetails, onRemove }) {
  const images = useMemo(() => item.gallery?.length ? item.gallery : [item.image], [item.gallery, item.image])
  const [activeImage, setActiveImage] = useState(0)

  const next = () => setActiveImage((current) => (current + 1) % images.length)
  const prev = () => setActiveImage((current) => (current - 1 + images.length) % images.length)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.34, delay: index * 0.03, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_20px_62px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_32px_95px_rgba(15,23,42,0.18)] dark:border-white/12 dark:bg-white/7"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          key={images[activeImage]}
          src={images[activeImage]}
          alt={item.title}
          initial={{ opacity: 0.84, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-xl">
          {item.collection}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="absolute right-3 top-3 size-10 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl hover:bg-black/55"
          aria-label="Remove from wishlist"
        >
          <Heart className="size-4 fill-current text-rose-400" />
        </Button>

        {images.length > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
            <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={prev}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={next}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> {item.location}
            </p>
            <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
          </div>
          <p className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-sm font-medium text-foreground dark:bg-white/10">
            <Star className="size-3.5 fill-amber-400 text-amber-400" /> {item.rating}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-border/60 pt-4 dark:border-white/10">
          <p className="text-base text-foreground">
            <span className="text-2xl font-semibold">{formatINR(item.price)}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </p>
          <Button variant="ghost" className="rounded-full px-4 text-sm" onClick={() => onOpenDetails(item)}>
            View
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
