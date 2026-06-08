import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import { listings } from "../data/listings.js"
import { Navbar } from "../components/navbar/Navbar.jsx"
import { Footer } from "../components/footer/Footer.jsx"
import { CollectionCard } from "../components/wishlist/CollectionCard.jsx"
import { EmptyWishlist } from "../components/wishlist/EmptyWishlist.jsx"
import { WishlistGrid } from "../components/wishlist/WishlistGrid.jsx"
import { WishlistHero } from "../components/wishlist/WishlistHero.jsx"

const collectionNames = [
  "Beach Escapes",
  "Mountain Retreats",
  "Dream Villas",
  "Weekend Getaways",
  "Workcation Spots",
  "Romantic Stays",
]

function createSeededWishlist() {
  return listings.slice(0, 8).map((listing, index) => ({
    ...listing,
    collection: collectionNames[index % collectionNames.length],
    gallery: [
      listing.image,
      listings[(index + 1) % listings.length].image,
      listings[(index + 2) % listings.length].image,
    ],
  }))
}

export function Wishlist({ onBack, onExploreClick, onPropertySelect, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  const initialWishlist = useMemo(() => createSeededWishlist(), [])
  const [savedItems, setSavedItems] = useState(initialWishlist)
  const [activeCollection, setActiveCollection] = useState("All")

  const collections = useMemo(() => {
    const coverFallback = initialWishlist.map((item) => item.image)

    return [
      {
        name: "All",
        count: savedItems.length,
        image: coverFallback[0] || "",
      },
      ...collectionNames.map((name, index) => {
        const items = savedItems.filter((item) => item.collection === name)
        return {
          name,
          count: items.length,
          image: items[0]?.image || coverFallback[index % (coverFallback.length || 1)] || "",
        }
      }),
    ]
  }, [initialWishlist, savedItems])

  const visibleItems = useMemo(() => {
    if (activeCollection === "All") {
      return savedItems
    }

    return savedItems.filter((item) => item.collection === activeCollection)
  }, [activeCollection, savedItems])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_6%,rgba(255,221,186,0.28),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(182,208,255,0.24),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_8%,rgba(87,59,40,0.2),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(63,83,118,0.25),transparent_30%),linear-gradient(180deg,#06080d,#0b0f16)]">
      <Navbar onExploreClick={onExploreClick} onWishlistClick={() => {}} onSearchClick={onSearchClick} onProfileClick={onProfileClick} onHostClick={onHostClick} onAuthClick={onAuthClick} />

      <main>
        <WishlistHero previews={savedItems} onBack={onBack} />

        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Collections</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Curated for every mood and moment
                </h2>
              </div>
              <p className="hidden text-sm text-muted-foreground sm:block">Swipe to explore</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
            >
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.name}
                  collection={collection}
                  index={index}
                  active={activeCollection === collection.name}
                  onSelect={setActiveCollection}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {visibleItems.length > 0 ? (
          <WishlistGrid
            items={visibleItems}
            onRemove={(id) => {
              setSavedItems((current) => current.filter((item) => item.id !== id))
            }}
            onOpenDetails={onPropertySelect}
          />
        ) : (
          <EmptyWishlist onExplore={onExploreClick} />
        )}
      </main>

      <Footer />
    </div>
  )
}
