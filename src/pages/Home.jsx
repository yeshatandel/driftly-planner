import { useEffect, useState } from "react"
import Lenis from "lenis"

import { PageShell } from "../components/layout/PageShell.jsx"
import { Navbar } from "../components/navbar/Navbar.jsx"
import { Hero } from "../components/hero/Hero.jsx"
import { CategoryBar } from "../components/filters/CategoryBar.jsx"
import { ListingGrid } from "../components/listings/ListingGrid.jsx"
import { Footer } from "../components/footer/Footer.jsx"

export function Home({ onExploreClick, onPropertySelect, onWishlistClick, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  const [activeCategory, setActiveCategory] = useState("Beach")

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    })

    let frameId = 0

    const animate = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <PageShell>
      <Navbar onExploreClick={onExploreClick} onWishlistClick={onWishlistClick} onSearchClick={onSearchClick} onProfileClick={onProfileClick} onHostClick={onHostClick} onAuthClick={onAuthClick} />
      <main className="pt-20">
        <Hero onExploreClick={onExploreClick} />
        <CategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <ListingGrid activeCategory={activeCategory} onPropertySelect={onPropertySelect} />
      </main>
      <Footer />
    </PageShell>
  )
}