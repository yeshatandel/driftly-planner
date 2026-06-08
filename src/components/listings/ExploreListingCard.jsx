import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { formatINR } from "../../lib/currency.js"
import { WishlistButton } from "./WishlistButton.jsx"

export function ExploreListingCard({ listing, images, index, onOpenDetails }) {
  const [activeImage, setActiveImage] = useState(0)
  const imageSet = useMemo(() => images.slice(0, 3), [images])
  const openDetails = () => onOpenDetails?.(listing)

  const goPrev = () => setActiveImage((current) => (current - 1 + imageSet.length) % imageSet.length)
  const goNext = () => setActiveImage((current) => (current + 1) % imageSet.length)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onClick={openDetails}
      className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/75 shadow-[0_24px_70px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_36px_110px_rgba(15,23,42,0.16)] dark:border-white/12 dark:bg-white/6"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          key={imageSet[activeImage]}
          src={imageSet[activeImage]}
          alt={listing.title}
          initial={{ opacity: 0.55, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

        <div className="absolute left-3 top-3 rounded-full border border-white/18 bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xl">
          {listing.category}
        </div>

        <div className="absolute right-3 top-3" onClick={(event) => event.stopPropagation()}>
          <WishlistButton />
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
            {listing.dates}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xl">
            <Star className="size-3.5 fill-amber-300 text-amber-300" />
            {listing.rating}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-1.5 pb-2">
          {imageSet.map((image, imageIndex) => (
            <span
              key={`${image}-${imageIndex}`}
              className={`h-1.5 rounded-full transition-all ${imageIndex === activeImage ? "w-5 bg-white" : "w-1.5 bg-white/55"}`}
            />
          ))}
        </div>

        <div className="absolute inset-y-0 left-2 hidden items-center md:flex">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="size-8 rounded-full border-white/25 bg-black/25 text-white backdrop-blur-xl hover:bg-black/45"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-2 hidden items-center md:flex">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="size-8 rounded-full border-white/25 bg-black/25 text-white backdrop-blur-xl hover:bg-black/45"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{listing.title}</h3>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {listing.location}
            </p>
          </div>
          <p className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">{listing.category}</p>
        </div>

        <div className="flex items-end justify-between border-t border-border/60 pt-3 dark:border-white/12">
          <p className="text-sm text-muted-foreground">from <span className="text-lg font-semibold text-foreground">{formatINR(listing.price)}</span> / night</p>
          <Button
            variant="ghost"
            className="rounded-full px-3 text-sm"
            onClick={(event) => {
              event.stopPropagation()
              openDetails()
            }}
          >
            View
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
