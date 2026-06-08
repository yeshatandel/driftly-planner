import { motion } from "framer-motion"

import { listings } from "../../data/listings.js"
import { ListingCard } from "./ListingCard.jsx"

export function ListingGrid({ activeCategory, onPropertySelect }) {
  const filteredListings = listings.filter((listing) => listing.category === activeCategory)

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">Handpicked stays</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {activeCategory} stays with a calmer, more editorial feel.
            </h2>
          </div>
          {/* <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-right sm:text-base">
            Showing {filteredListings.length} curated stays for the selected category, with softer shadows and a smoother layout rhythm across device sizes.
          </p> */}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {filteredListings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} onOpenDetails={onPropertySelect} />
          ))}
        </motion.div>

        {filteredListings.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-white/70 bg-white/72 p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">No stays found</p>
            <p className="mt-3 text-lg text-foreground">We do not have any listings for this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}