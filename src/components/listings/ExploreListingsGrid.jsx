import { motion } from "framer-motion"

import { ExploreListingCard } from "./ExploreListingCard.jsx"
import { FeaturedCard } from "./FeaturedCard.jsx"

export function ExploreListingsGrid({ listings, visibleCount, onPropertySelect }) {
  const imagePool = listings.map((listing) => listing.image)
  const visibleListings = listings.slice(0, visibleCount)

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {visibleListings.map((listing, index) => {
            const images = [
              listing.image,
              imagePool[(index + 5) % imagePool.length],
              imagePool[(index + 11) % imagePool.length],
            ]

            if (index === 4) {
              return (
                <FeaturedCard key="featured" />
              )
            }

            return (
              <ExploreListingCard
                key={listing.id}
                listing={listing}
                images={images}
                index={index}
                onOpenDetails={onPropertySelect}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
