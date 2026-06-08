import { AnimatePresence } from "framer-motion"

import { SavedPropertyCard } from "./SavedPropertyCard.jsx"

export function WishlistGrid({ items, onOpenDetails, onRemove }) {
  return (
    <section className="px-4 pb-16 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Saved properties</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">Your luxury moodboard</h2>
          </div>
          <p className="text-sm text-muted-foreground">{items.length} saved</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <SavedPropertyCard key={item.id} item={item} index={index} onOpenDetails={onOpenDetails} onRemove={onRemove} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
