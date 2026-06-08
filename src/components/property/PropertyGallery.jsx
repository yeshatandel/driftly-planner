import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Grid2x2, Images } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { WishlistButton } from "../listings/WishlistButton.jsx"

export function PropertyGallery({ listing, imagePool = [], onBack }) {
  const images = useMemo(() => {
    const fallback = imagePool.length ? imagePool : [listing.image]
    return [
      listing.image,
      fallback[1 % fallback.length],
      fallback[2 % fallback.length],
      fallback[3 % fallback.length],
      fallback[4 % fallback.length],
    ]
  }, [listing.image, imagePool])

  const [activeImage, setActiveImage] = useState(0)

  const prevImage = () => setActiveImage((current) => (current - 1 + images.length) % images.length)
  const nextImage = () => setActiveImage((current) => (current + 1) % images.length)

  return (
    <section className="px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative hidden gap-3 md:grid md:grid-cols-[2fr_1fr] lg:gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="absolute left-5 top-5 z-20 rounded-full border-[#ff385c]/80 bg-[#ff385c] text-white shadow-[0_12px_38px_rgba(255,56,92,0.45)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff2d54] hover:shadow-[0_16px_48px_rgba(255,56,92,0.5)]"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>

          <motion.div whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-[2rem]">
            <img src={images[0]} alt={listing.title} className="h-[34rem] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {images.slice(1).map((image, index) => (
              <motion.div key={`${image}-${index}`} whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-[1.5rem]">
                <img src={image} alt={`${listing.title} ${index + 2}`} className="h-[16.75rem] w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          <div className="absolute left-5 top-[4.4rem] z-20">
            <WishlistButton />
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
            {images.length} photos
          </div>
          <Button variant="outline" className="absolute bottom-5 right-5 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl hover:bg-black/55">
            <Grid2x2 className="mr-2 size-4" />
            View all photos
          </Button>
        </div>

        <div className="relative md:hidden">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <motion.img
              key={images[activeImage]}
              src={images[activeImage]}
              alt={`${listing.title} ${activeImage + 1}`}
              initial={{ opacity: 0.65, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-[24rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-black/8" />

            <Button
              size="sm"
              variant="outline"
              onClick={onBack}
              className="absolute left-3 top-3 z-20 rounded-full border-[#ff385c]/80 bg-[#ff385c] text-white shadow-[0_10px_32px_rgba(255,56,92,0.42)] backdrop-blur-xl hover:bg-[#ff2d54]"
            >
              <ArrowLeft className="mr-1.5 size-3.5" />
              Back
            </Button>

            <div className="absolute left-3 top-[3.3rem] z-20">
              <WishlistButton />
            </div>
            <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-xl">
              {activeImage + 1}/{images.length}
            </div>

            <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
              <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={prevImage}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl">
                <Images className="mr-2 size-4" />
                View all photos
              </Button>
              <Button size="icon" variant="outline" className="size-8 rounded-full border-white/20 bg-black/35 text-white backdrop-blur-xl" onClick={nextImage}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
