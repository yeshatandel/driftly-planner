import React, { useEffect, useRef, useState } from "react"
import { Button } from "../components/ui/button.tsx"
import { MapPin, SunMedium, MoonStar, ArrowLeft, Settings } from "lucide-react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"

const profileStory = {
  name: "Jordan D.",
  handle: "@jordand",
  location: "San Francisco, California",
  quote: "Collecting sunsets and stories around the world.",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  cover:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
  memberSince: "2021",
}

const dreamDestinations = [
  { name: "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80" },
  { name: "Patagonia", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kyoto", image: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1200&q=80" },
]

export default function UserDashboard({ onBack }) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-black dark:bg-[#05070d] dark:text-white">
      {/* Hero (Twitter-like) */}
      <header className="relative">
        <div className="absolute left-4 top-4 z-30">
          <Button variant="ghost" size="icon" onClick={() => onBack?.()} aria-label="Back">
            <ArrowLeft className="size-4" />
          </Button>
        </div>
        <div
          className="w-full h-44 sm:h-56 md:h-72 bg-center bg-cover"
          style={{ backgroundImage: `url(${profileStory.cover})` }}
          aria-hidden
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 flex items-end gap-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 bg-gray-100">
              <img src={profileStory.avatar} alt={profileStory.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold">{profileStory.name}</h1>
              <div className="text-sm text-black/70 dark:text-white/75">{profileStory.handle}</div>
              <p className="mt-2 text-sm text-black dark:text-white">{profileStory.quote}</p>

              <div className="mt-3 flex items-center gap-3 text-sm text-black/60 dark:text-white/70">
                <span className="inline-flex items-center gap-2"><MapPin className="size-4" />{profileStory.location}</span>
                <span>•</span>
                <span>Member since {profileStory.memberSince}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="hidden sm:inline-flex rounded-full bg-black text-white px-4 py-2">Follow</Button>
              <Button variant="outline" className="hidden sm:inline-flex rounded-full px-4 py-2">Message</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced profile sections */}
      <div className="fixed right-6 top-24 z-40">
        <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} aria-label="Settings">
          <Settings className="size-4" />
        </Button>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DigitalPassport />
            <MemoryTimeline />
            <DreamDestinations />
            <SavedCollections />
            <ReviewsJourney />
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <PersonalTravelStory />
            <div className="rounded-xl overflow-hidden border bg-white/60 dark:bg-black/40 p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold">Profile Actions</h3>
              <div className="mt-3 flex flex-col gap-3">
                <Button className="w-full">Share my passport</Button>
                <Button variant="outline" className="w-full">Download PDF</Button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SettingsSlideOver open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <footer className="border-t border-black/10 bg-[#f6f1e8] dark:bg-[#05070d] px-4 py-12">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <div className="text-sm text-black/70 dark:text-white/80">Luxury profile footer</div>
            <div className="text-lg font-semibold">A personal passport for a traveler.</div>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-black text-white px-4 py-3">View public profile</Button>
            <Button variant="outline" className="rounded-full px-4 py-3">Edit story</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

    function DigitalPassport() {
      const stamps = [
        { place: "Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
        { place: "Iceland", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
        { place: "Tokyo", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80" },
        { place: "Swiss Alps", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
      ]

      return (
        <section className="rounded-2xl p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Digital Passport</h2>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">A curated, collectible record of your travels.</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-black/60 dark:text-white/70">Countries</div>
              <div className="text-2xl font-bold">32</div>
            </div>
          </div>

          <motion.div className="mt-6 flex gap-4 overflow-x-auto py-2" whileHover={{ scale: 1.02 }}>
            {stamps.map((s, i) => (
              <motion.div key={s.place} className="relative w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden border shadow-lg bg-white" whileTap={{ scale: 0.98 }} whileHover={{ rotate: (i % 2 ? -3 : 3), y: -6 }}>
                <img src={s.img} alt={s.place} className="w-full h-full object-cover" />
                <div className="absolute left-2 top-2 bg-white/80 text-xs px-2 py-1 rounded-full font-semibold">{s.place}</div>
                <div className="absolute right-2 bottom-2 bg-black text-white text-xs px-2 py-1 rounded">Stamp</div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )
    }

    function MemoryTimeline() {
      const trips = [
        { title: "Bali", date: "Mar 2025", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", blurb: "Surf, rice terraces, and quiet mornings.", favorite: "Sunrise at Uluwatu" },
        { title: "Iceland", date: "Jan 2024", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", blurb: "Glaciers and midnight skies.", favorite: "Bathing in a hidden hot spring" },
        { title: "Swiss Alps", date: "Dec 2023", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", blurb: "Snowy ridgelines and chalet evenings.", favorite: "Peak sunrise" },
      ]

      return (
        <section className="rounded-2xl p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border">
          <h2 className="text-xl font-semibold">Memory Timeline</h2>
          <div className="mt-6 space-y-8">
            {trips.map((trip, idx) => (
              <div key={trip.title} className="grid grid-cols-9 items-center gap-4">
                <div className={`col-span-4 ${idx % 2 === 0 ? "order-1" : "order-2 lg:order-1 lg:col-start-6"}`}>
                  <motion.div className="rounded-lg overflow-hidden shadow-lg" initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <img src={trip.image} alt={trip.title} className="w-full h-56 object-cover" />
                    <div className="p-4 bg-white/80 dark:bg-black/50">
                      <div className="text-sm text-black/60 dark:text-white/70">{trip.date}</div>
                      <h3 className="mt-1 font-semibold">{trip.title}</h3>
                      <p className="mt-2 text-sm text-black/70 dark:text-white/70">{trip.blurb}</p>
                      <div className="mt-3 text-sm italic">Favorite: {trip.favorite}</div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-span-1 hidden lg:flex items-center justify-center">
                  <div className="w-1 h-full bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 rounded" />
                  <div className="-mt-2 w-6 h-6 rounded-full bg-white border shadow" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    }

    function DreamDestinations() {
      const cards = [
        { name: "Santorini", img: dreamDestinations[0].image },
        { name: "Patagonia", img: dreamDestinations[1].image },
        { name: "Kyoto", img: dreamDestinations[2].image },
        { name: "Amalfi Coast", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80" },
      ]

      return (
        <section className="rounded-2xl p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border">
          <h2 className="text-xl font-semibold">Places Calling My Name</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">Dream destinations, presented like postcards.</p>

          <div className="mt-6 relative h-64">
            {cards.map((c, i) => (
              <motion.div key={c.name} className="absolute rounded-lg overflow-hidden shadow-xl border bg-white" style={{ left: `${i * 12}%`, top: `${i % 2 ? 6 : 0}%`, width: "40%" }} whileHover={{ scale: 1.04, zIndex: 50 }} transition={{ type: "spring", stiffness: 200 }}>
                <img src={c.img} alt={c.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-black/60 dark:text-white/70">Postcard vibes</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )
    }

    function SavedCollections() {
      const cols = [
        { title: "Rainy Morning Cabins", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", count: 12 },
        { title: "Architecture Worth Traveling For", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80", count: 24 },
        { title: "Oceanfront Escapes", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", count: 15 },
      ]

      return (
        <section className="rounded-2xl p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border">
          <h2 className="text-xl font-semibold">Saved Collections</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cols.map((c) => (
              <motion.div key={c.title} className="rounded-lg overflow-hidden relative" whileHover={{ scale: 1.02 }}>
                <img src={c.img} alt={c.title} className="w-full h-48 object-cover" />
                <div className="absolute left-4 bottom-4 text-white">
                  <div className="font-semibold text-lg">{c.title}</div>
                  <div className="text-sm">{c.count} stays</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )
    }

    function ReviewsJourney() {
      const reviews = [
        { rating: 5, text: "The sunrise from the villa felt unreal.", location: "Bali" },
        { rating: 5, text: "A hidden gem with the warmest hospitality.", location: "Iceland" },
      ]

      return (
        <section className="rounded-2xl p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border">
          <h2 className="text-xl font-semibold">Reviews Journey</h2>
          <div className="mt-4 space-y-4">
            {reviews.map((r, i) => (
              <motion.blockquote key={i} className="p-4 rounded-lg shadow-md bg-amber-50 dark:bg-black/30 italic" whileInView={{ y: 0, opacity: 1 }} initial={{ y: 12, opacity: 0 }} viewport={{ once: true }}>
                <div className="text-sm">{"★".repeat(r.rating)}</div>
                <p className="mt-2 font-serif text-lg">{r.text}</p>
                <div className="mt-2 text-sm text-black/60 dark:text-white/70">— {r.location}</div>
              </motion.blockquote>
            ))}
          </div>
        </section>
      )
    }

    function PersonalTravelStory() {
      const countries = useMotionValue(0)
      const nights = useMotionValue(0)
      const places = useMotionValue(0)
      const experiences = useMotionValue(0)

      useEffect(() => {
        const animate = () => {
          countries.set(32)
          nights.set(148)
          places.set(87)
          experiences.set(14)
        }

        animate()
      }, [])

      return (
        <div className="rounded-2xl p-6 bg-gradient-to-br from-white/80 to-amber-50 dark:from-black/60 dark:to-black/30 border">
          <h3 className="text-lg font-semibold">My Travel Story</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Stat label="Countries" value={countries} />
            <Stat label="Nights" value={nights} />
            <Stat label="Saved Places" value={places} />
            <Stat label="Experiences" value={experiences} />
          </div>
        </div>
      )
    }

    function Stat({ label, value }) {
      const [display, setDisplay] = useState(0)
      useEffect(() => {
        const unsubscribe = value.onChange((v) => setDisplay(Math.round(v)))
        return unsubscribe
      }, [value])

      return (
        <div className="rounded-lg p-4 bg-white/60 dark:bg-black/30 backdrop-blur-sm text-center">
          <div className="text-3xl font-bold">{display}</div>
          <div className="text-sm text-black/60 dark:text-white/70">{label}</div>
        </div>
      )
    }

    function SettingsSlideOver({ open, onClose }) {
      return (
        <motion.div initial={{ x: 300, opacity: 0 }} animate={open ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }} transition={{ type: "spring" }} className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50`}> 
          <div className="h-full p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md border-l">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Settings</h3>
              <Button variant="ghost" size="icon" onClick={onClose}><ArrowLeft /></Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-sm">Appearance</div>
              <div className="flex gap-2">
                <Button variant="outline">Light</Button>
                <Button variant="outline">Dark</Button>
              </div>

              <div className="mt-4 text-sm">Account</div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost">Manage subscriptions</Button>
                <Button variant="ghost">Privacy</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }
