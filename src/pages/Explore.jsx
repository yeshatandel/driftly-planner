import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"

import { listings } from "../data/listings.js"
import { Navbar } from "../components/navbar/Navbar.jsx"
import { SearchHeader } from "../components/filters/SearchHeader.jsx"
import { ExploreCategoryBar } from "../components/filters/ExploreCategoryBar.jsx"
import { ActiveFiltersSection } from "../components/filters/ActiveFiltersSection.jsx"
import { ExploreListingsGrid } from "../components/listings/ExploreListingsGrid.jsx"
import { Footer } from "../components/footer/Footer.jsx"
import { Button } from "../components/ui/button.tsx"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet.tsx"

const CATEGORY_ALIAS = {
  Beach: ["Beach", "Amazing Pools"],
  Luxe: ["Luxe"],
  Cabins: ["Cabins"],
  Arctic: ["Arctic"],
  "Tiny Homes": ["Tiny Homes"],
  Camping: ["Camping"],
  "Amazing Pools": ["Amazing Pools"],
  Desert: ["Luxe", "Amazing Pools"],
  Islands: ["Beach", "Amazing Pools"],
  "Modern Villas": ["Luxe", "Amazing Pools"],
}

export function Explore({ onBack, onPropertySelect, onWishlistClick, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  const [activeCategory, setActiveCategory] = useState("Beach")
  const [sortBy, setSortBy] = useState("Featured")
  const [filters, setFilters] = useState(["Instant book", "Ocean view", "Free cancellation"])
  const [visibleCount, setVisibleCount] = useState(12)

  const filteredListings = useMemo(() => {
    const allowedCategories = CATEGORY_ALIAS[activeCategory] || [activeCategory]
    const base = listings.filter((listing) => allowedCategories.includes(listing.category))

    if (sortBy === "Price: low to high") {
      return [...base].sort((a, b) => a.price - b.price)
    }

    if (sortBy === "Price: high to low") {
      return [...base].sort((a, b) => b.price - a.price)
    }

    if (sortBy === "Top rated") {
      return [...base].sort((a, b) => b.rating - a.rating)
    }

    return base
  }, [activeCategory, sortBy])

  const canLoadMore = visibleCount < filteredListings.length

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,221,186,0.3),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(185,214,255,0.26),transparent_26%)] dark:bg-[radial-gradient(circle_at_12%_8%,rgba(87,59,40,0.2),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(75,87,120,0.24),transparent_26%),linear-gradient(180deg,#06080d,#0b0f16)]">
      <Navbar onWishlistClick={onWishlistClick} onSearchClick={onSearchClick} onProfileClick={onProfileClick} onHostClick={onHostClick} onAuthClick={onAuthClick} />

      <main>
        <SearchHeader onBack={onBack} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden md:block">
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" onClick={onSearchClick} className="rounded-full px-4">Search</Button>
            </div>
          </div>
        </div>
        <ExploreCategoryBar
          activeCategory={activeCategory}
          onCategoryChange={(category) => {
            setActiveCategory(category)
            setVisibleCount(12)
          }}
        />
        <ActiveFiltersSection
          total={filteredListings.length}
          filters={filters}
          onRemoveFilter={(filter) => setFilters((current) => current.filter((item) => item !== filter))}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="px-4 pb-1 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl xl:text-5xl">
              Stays designed for slow mornings and unforgettable nights.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Browse premium homes with cinematic views, elevated interiors, and editorial-grade hospitality.
            </p>
          </div>
        </motion.section>

        <ExploreListingsGrid listings={filteredListings} visibleCount={visibleCount} onPropertySelect={onPropertySelect} />

        <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/60 bg-white/72 p-6 text-center shadow-[0_20px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8">
            <p className="text-sm text-muted-foreground">Keep exploring curated destinations and private stays.</p>
            <Button className="mt-4 rounded-full px-7" disabled={!canLoadMore} onClick={() => setVisibleCount((current) => current + 8)}>
              {canLoadMore ? "Load more stays" : "All stays loaded"}
            </Button>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full px-5 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
              <SlidersHorizontal className="mr-2 size-4" />
              Filters & sort
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[66vh] rounded-t-[2rem] border-white/12 bg-background/96 backdrop-blur-2xl">
            <SheetHeader>
              <SheetTitle>Refine your stay</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFilters((current) => current.filter((item) => item !== filter))}
                  className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-left text-sm"
                >
                  Remove {filter}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Footer />
    </div>
  )
}
