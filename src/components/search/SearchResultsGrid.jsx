import { motion } from "framer-motion"
import { PropertyCard } from "./PropertyCard.jsx"

export function SearchResultsGrid({ items = [], onOpenDetails, onToggleWishlist }) {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.04 } } }} className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {items.map((item, i) => (
            <PropertyCard key={item.id} item={item} index={i} onOpenDetails={onOpenDetails} onToggleWishlist={onToggleWishlist} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
