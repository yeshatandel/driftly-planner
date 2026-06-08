import { useMemo } from "react"
import { motion } from "framer-motion"
import { BadgeCheck, BedDouble, Bath, CheckCheck, Clock3, Share2, ShieldCheck, Sparkles, Star, Users, Waves, UtensilsCrossed, Coffee, Mountain } from "lucide-react"

import { listings } from "../data/listings.js"
import { Navbar } from "../components/navbar/Navbar.jsx"
import { Footer } from "../components/footer/Footer.jsx"
import { Button } from "../components/ui/button.tsx"
import { PropertyGallery } from "../components/property/PropertyGallery.jsx"
import { BookingCard } from "../components/property/BookingCard.jsx"
import { AmenitiesGrid } from "../components/property/AmenitiesGrid.jsx"
import { HostCard } from "../components/property/HostCard.jsx"
import { ReviewCard } from "../components/property/ReviewCard.jsx"
import { SimilarProperties } from "../components/property/SimilarProperties.jsx"
import { formatINR } from "../lib/currency.js"

const reviews = [
  {
    name: "Lina",
    country: "Sweden",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    text: "The views are unreal and the interiors feel like a design magazine. Every detail was intentional.",
  },
  {
    name: "Marco",
    country: "Italy",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Sunset dinners by the pool and mornings with open ocean light. One of our favorite stays ever.",
  },
  {
    name: "Anika",
    country: "India",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    text: "Seamless check-in, warm host communication, and a space that felt private, calming, and luxurious.",
  },
]

const nearbyPlaces = [
  { title: "Coral Bay Beach", icon: Waves, time: "8 min drive" },
  { title: "Atelier Restaurant", icon: UtensilsCrossed, time: "6 min drive" },
  { title: "Sunline Cafe", icon: Coffee, time: "4 min drive" },
  { title: "Ridgeline Trail", icon: Mountain, time: "15 min drive" },
]

export function PropertyDetails({ listing, onPropertySelect, onBack, onWishlistClick, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  const selectedListing = listing || listings[0]
  const imagePool = useMemo(() => listings.map((item) => item.image), [])
  const similarListings = useMemo(
    () => listings.filter((item) => item.id !== selectedListing.id).slice(0, 8),
    [selectedListing.id]
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_6%,rgba(255,221,186,0.3),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(186,205,255,0.24),transparent_28%)] dark:bg-[radial-gradient(circle_at_12%_8%,rgba(87,59,40,0.22),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(70,93,128,0.2),transparent_28%),linear-gradient(180deg,#06080d,#0b0f15)]">
      <Navbar onExploreClick={onBack} onWishlistClick={onWishlistClick} onSearchClick={onSearchClick} onProfileClick={onProfileClick} onHostClick={onHostClick} onAuthClick={onAuthClick} />

      <main>
        <PropertyGallery listing={selectedListing} imagePool={imagePool} onBack={onBack} />

        <section className="px-4 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl xl:text-5xl">
                  {selectedListing.title}
                </h1>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {selectedListing.location} · <span className="font-medium text-foreground">{selectedListing.rating}</span> · 142 reviews
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs dark:border-white/12 dark:bg-white/6">
                    <BadgeCheck className="size-3.5" /> Verified host
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs dark:border-white/12 dark:bg-white/6">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" /> Guest favorite
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-full">Share <Share2 className="ml-2 size-4" /></Button>
                <Button variant="outline" className="rounded-full">Save</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] xl:grid-cols-[minmax(0,1fr)_29rem]">
            <div className="space-y-10">
              <section className="rounded-[2rem] border border-white/70 bg-white/74 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8">
                <div className="grid gap-3 sm:grid-cols-3">
                  <article className="rounded-[1.2rem] bg-muted/65 p-4 dark:bg-white/8">
                    <p className="inline-flex items-center gap-2 text-sm font-medium"><Users className="size-4" /> 4 guests</p>
                  </article>
                  <article className="rounded-[1.2rem] bg-muted/65 p-4 dark:bg-white/8">
                    <p className="inline-flex items-center gap-2 text-sm font-medium"><BedDouble className="size-4" /> 2 bedrooms</p>
                  </article>
                  <article className="rounded-[1.2rem] bg-muted/65 p-4 dark:bg-white/8">
                    <p className="inline-flex items-center gap-2 text-sm font-medium"><Bath className="size-4" /> 2 bathrooms</p>
                  </article>
                </div>

                <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-base">
                  Experience panoramic ocean views, minimalist interiors, and private luxury living designed for unforgettable escapes. Every room frames natural light, while textures and tones create a cinematic calm throughout the stay.
                </p>
              </section>

              <AmenitiesGrid />

              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b0e14] text-white shadow-[0_34px_110px_rgba(0,0,0,0.38)]"
              >
                <img
                  src={imagePool[6 % imagePool.length]}
                  alt="Luxury experience"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/46 to-black/18" />

                <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/70">Experience</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                      Slow mornings, golden-hour swims, and private chef evenings.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/74 sm:text-base">
                      Wake up to endless ocean views, unwind beside the infinity pool, and step into curated luxury designed for modern travelers who value privacy and atmosphere.
                    </p>
                  </div>
                </div>
              </motion.section>

              <HostCard />

              <section>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Guest reviews</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {reviews.map((review, index) => (
                    <ReviewCard key={`${review.name}-${index}`} review={review} index={index} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Nearby places</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {nearbyPlaces.map((place) => {
                    const Icon = place.icon
                    return (
                      <article
                        key={place.title}
                        className="rounded-[1.25rem] border border-white/70 bg-white/72 p-4 shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/12 dark:bg-white/6"
                      >
                        <div className="flex items-center justify-between">
                          <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                            <Icon className="size-4" /> {place.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{place.time}</p>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>

              <SimilarProperties listings={similarListings} onPropertySelect={onPropertySelect} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <BookingCard listing={selectedListing} />

                <section className="rounded-[1.6rem] border border-white/70 bg-white/74 p-4 shadow-[0_18px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Stay details</p>
                  <div className="mt-3 space-y-2">
                    <p className="inline-flex items-center gap-2 text-sm text-foreground">
                      <ShieldCheck className="size-4" /> Dedicated host support
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-foreground">
                      <Clock3 className="size-4" /> Check-in after 2:00 PM
                    </p>
                  </div>
                </section>

                <section className="rounded-[1.6rem] border border-white/70 bg-white/74 p-4 shadow-[0_18px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8">
                  <p className="text-sm font-semibold text-foreground">Need something curated?</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Our concierge can arrange airport pickup, a private chef, and local experiences before arrival.
                  </p>
                  <Button variant="outline" className="mt-3 w-full rounded-full">Chat with concierge</Button>
                </section>

                <section className="rounded-[1.6rem] border border-white/70 bg-white/74 p-4 shadow-[0_18px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Things to know</p>
                  <div className="mt-3 space-y-2">
                    <p className="inline-flex items-center gap-2 text-sm text-foreground">
                      <CheckCheck className="size-4" /> Free cancellation for 48 hours
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-foreground">
                      <CheckCheck className="size-4" /> Self check-in with smart lock
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-foreground">
                      <CheckCheck className="size-4" /> Quiet hours after 10:00 PM
                    </p>
                  </div>
                </section>

                <section className="rounded-[1.6rem] border border-white/70 bg-white/74 p-4 shadow-[0_18px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/8">
                  <p className="text-sm font-semibold text-foreground">Why guests love this stay</p>
                  <div className="mt-3 space-y-2">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="size-4 text-amber-500" /> Panoramic ocean-facing living room
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="size-4 text-amber-500" /> Designer interiors with natural light
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="size-4 text-amber-500" /> Highly rated host communication
                    </p>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/92 px-4 py-3 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{formatINR(selectedListing.price)}</span> / night
          </p>
          <Button className="rounded-full bg-[#ff385c] px-6 hover:bg-[#ff2d54]">Reserve</Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
