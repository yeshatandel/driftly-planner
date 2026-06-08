import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Heart, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button.tsx"
import { formatINR } from "../../lib/currency.js"

export function PropertyCard({ item, index, onOpenDetails, onToggleWishlist }) {
  const images = useMemo(() => item.gallery?.length ? item.gallery : [item.image], [item.gallery, item.image])
  const [activeImage, setActiveImage] = useState(0)
  const next = () => setActiveImage((c) => (c + 1) % images.length)
  const prev = () => setActiveImage((c) => (c - 1 + images.length) % images.length)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-white/60 bg-white/78 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-white/7"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img src={images[activeImage]} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-xl">{item.collection}</div>

        <Button variant="outline" size="icon" className="absolute right-3 top-3 size-10 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl hover:bg-black/55" onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(item) }} aria-label="Toggle wishlist">
          <Heart className="size-4" />
        </Button>

        {images.length > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
            <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={(e) => { e.stopPropagation(); prev() }}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={(e) => { e.stopPropagation(); next() }}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" />{item.location}</div>
            <h3 className="text-base font-medium tracking-tight text-foreground">{item.title}</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />{item.rating}
          </div>
        </div>
      
        <div className="flex items-end justify-between gap-4 border-t border-border/60 pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Available {item.dates}</p>
            <p className="mt-1 text-sm text-foreground"><span className="text-xl font-semibold">{formatINR(item.price)}</span><span className="text-muted-foreground"> / night</span></p>
          </div>
          <Button variant="ghost" className="rounded-full px-3 text-sm" onClick={() => onOpenDetails?.(item)}>View</Button>
        </div>
      </div>
    </motion.article>
  )
}
