import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Compass,
  Globe2,
  Heart,
  LayoutGrid,
  Layers3,
  MapPinned,
  Menu,
  MoonStar,
  Mountain,
  Orbit,
  PanelTop,
  Pin,
  Search,
  Sparkles,
  SunMedium,
  Trees,
  Waves,
  Wind,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx"
import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet.tsx"
import { useScroll } from "../../hooks/use-scroll.js"
import { useTheme } from "../../hooks/use-theme.js"
import { cn } from "../../lib/utils.js"

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const discoveryCategories = [
  { label: "Oceanfront", icon: Waves, accent: "from-cyan-400/40 to-sky-500/0" },
  { label: "Cliffside Villas", icon: Compass, accent: "from-rose-400/35 to-orange-500/0" },
  { label: "Arctic Domes", icon: Orbit, accent: "from-slate-300/35 to-sky-300/0" },
  { label: "Desert Retreats", icon: Wind, accent: "from-amber-400/35 to-amber-500/0" },
  { label: "Jungle Escapes", icon: Trees, accent: "from-emerald-400/35 to-lime-500/0" },
  { label: "Floating Homes", icon: Layers3, accent: "from-indigo-400/35 to-cyan-400/0" },
  { label: "Sky Cabins", icon: Mountain, accent: "from-violet-400/35 to-fuchsia-500/0" },
  { label: "Modern Sanctuaries", icon: PanelTop, accent: "from-white/40 to-slate-500/0" },
]

const editorialMoments = [
  {
    title: "Places Above the Clouds",
    eyebrow: "Altitude rituals",
    copy: "Architecture, light, and silence meet in luminous places where the horizon feels suspended.",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Spaces Designed for Silence",
    eyebrow: "Quiet luxury",
    copy: "Soft timber, deep shadows, and slow interiors created for recovery, focus, and emotional reset.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Homes Hidden in Nature",
    eyebrow: "Remote calm",
    copy: "Tucked into forests, ridgelines, and coastlines, these escapes feel discovered rather than booked.",
    image:
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Architecture Worth Traveling For",
    eyebrow: "Statement stays",
    copy: "Sculptural geometry and cinematic interiors turn each property into a destination in itself.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  },
]

const experienceStrip = [
  {
    title: "Weekend Escapes",
    subtitle: "Fast flights, long views, slow mornings.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Remote Work Sanctuaries",
    subtitle: "Silence, signal, and space to think.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rainy Morning Cabins",
    subtitle: "Rain on glass, warm lamps, late coffee.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sunset Villas",
    subtitle: "Golden hour, terraces, and salt air.",
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80",
  },
]

const collectionCards = [
  {
    title: "Dream Escapes",
    subtitle: "Soft horizons and cinematic daylight.",
    image:
      "https://images.unsplash.com/photo-1523413450415-4901b1d6f4d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Nature Immersion",
    subtitle: "Forest edges, coastal mist, and stillness.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Architectural Wonders",
    subtitle: "Gallery-like calm with sculpted light.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Hidden Sanctuaries",
    subtitle: "Rare stays that feel privately discovered.",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Minimal Living",
    subtitle: "Precision, restraint, and warm materiality.",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1400&q=80",
  },
]

const searchPrompts = ["Bali cliffside", "Alpine glass cabin", "Desert pool villa", "Forest hideaway", "Overwater suite"]

function formatPrice(price) {
  return currency.format(price || 0)
}

function pickFeature(items, index) {
  return items[index] || items[0]
}

function buildRelatedSearches(items, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return items.slice(0, 6)
  }

  const results = []

  for (const item of items) {
    const fields = [item.title, item.location, item.category, item.dates].filter(Boolean)
    if (!fields.some((field) => field.toLowerCase().includes(normalizedQuery))) {
      continue
    }

    results.push(item)
    if (results.length === 6) {
      break
    }
  }

  return results.length > 0 ? results : items.slice(0, 6)
}

function buildHighlightedItems(items, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return items.slice(0, 8)
  }

  const matches = items.filter((item) => {
    return [item.title, item.location, item.category, item.dates].some((field) => field?.toLowerCase().includes(normalizedQuery))
  })

  return matches.length > 0 ? matches : items.slice(0, 8)
}

function GlassCard({ item, size = "compact", onOpen }) {
  if (!item) {
    return null
  }

  const heights = {
    compact: "min-h-[18rem]",
    portrait: "min-h-[24rem]",
    landscape: "min-h-[20rem]",
    feature: "min-h-[29rem]",
  }

  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.015, rotateX: 3, rotateY: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen?.(item)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/45 bg-white/50 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8",
        heights[size]
      )}
    >
      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.82))]" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white/75">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] backdrop-blur-xl">
          {item.category || "Curated"}
        </span>
        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs backdrop-blur-xl">{item.rating}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/55">
          <span>{item.location}</span>
          <span>{item.dates}</span>
        </div>
        <h3 className="mt-3 max-w-xl text-2xl font-medium leading-tight sm:text-3xl">{item.title}</h3>
        <p className="mt-3 text-sm text-white/78">{formatPrice(item.price)} per night</p>
      </div>
      <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-white/90 backdrop-blur-xl">
        View stay
      </div>
    </motion.article>
  )
}

function FloatingGlassNavbar({ onBack, onSearchClick, searchQuery, setSearchQuery, suggestions, onPickSuggestion, onProfileClick, onAuthClick }) {
  const { theme, toggleTheme } = useTheme()
  const scrolled = useScroll(12)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1240px] rounded-full border border-white/45 bg-white/55 px-3 py-2 shadow-[0_18px_70px_rgba(15,23,42,0.12)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-white/8",
          scrolled ? "shadow-[0_24px_90px_rgba(15,23,42,0.18)]" : ""
        )}
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back" className="size-11 rounded-full text-muted-foreground hover:text-foreground">
            <ChevronDown className="size-4 rotate-90" />
          </Button>

          <div className="flex items-center gap-2 pr-2">
            <img src="/Driftly.png" alt="Driftly logo" className="size-10 rounded-2xl object-cover shadow-[0_10px_30px_rgba(15,23,42,0.18)]" />
            <div className="hidden sm:block">
              <p className="text-[0.62rem] uppercase tracking-[0.38em] text-muted-foreground">Driftly</p>
              <p className="text-sm font-medium text-foreground/90">Cinematic discovery engine</p>
            </div>
          </div>

          <motion.div
            onFocusCapture={() => setSearchOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setSearchOpen(false)
              }
            }}
            className="relative hidden min-w-0 flex-1 md:block"
          >
            <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/75 px-4 py-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
              <Search className="size-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search destinations, moods, or views"
                className="h-8 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                autoComplete="off"
              />
              <div className="hidden items-center gap-2 lg:flex">
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">Bali</span>
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">2 guests</span>
              </div>
            </div>

            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-[calc(100%+0.75rem)] overflow-hidden rounded-[1.6rem] border border-border/60 bg-background/95 shadow-[0_25px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 text-[0.68rem] uppercase tracking-[0.34em] text-muted-foreground">
                    <span>{searchQuery.trim() ? "Related searches" : "Trending searches"}</span>
                    <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => setSearchOpen(false)}>
                      Close
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setSearchQuery(item.title)
                          onPickSuggestion?.(item)
                        }}
                        className="flex w-full items-start justify-between gap-4 rounded-[1.1rem] px-4 py-3 text-left transition-colors hover:bg-foreground/5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.location} • {item.category}</p>
                        </div>
                        <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                          Search
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="size-11 rounded-full text-muted-foreground hover:text-foreground">
              {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
            </Button>

            <Button variant="ghost" size="icon" className="hidden size-11 rounded-full text-muted-foreground hover:text-foreground sm:inline-flex" aria-label="Explore menu">
              <Globe2 className="size-4" />
            </Button>

            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" className="rounded-full px-4 text-sm text-muted-foreground hover:text-foreground" onClick={() => onAuthClick?.("login")}>Sign in</Button>
              <Button className="rounded-full px-4 text-sm shadow-[0_14px_40px_rgba(15,23,42,0.14)]" onClick={() => onAuthClick?.("signup")}>Join now</Button>
            </div>

            <DropdownMenuShell onSearchClick={onSearchClick} onProfileClick={onProfileClick} onAuthClick={onAuthClick} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function DropdownMenuShell({ onSearchClick, onProfileClick, onAuthClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-11 rounded-full border-border/70 bg-background/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] border-l-border/60 bg-background/92 px-5 pt-5 backdrop-blur-3xl sm:w-[390px]">
        <SheetHeader className="px-0 pb-0">
          <SheetTitle className="text-left text-xl">Driftly</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full justify-between rounded-2xl py-6 text-base" onClick={() => onAuthClick?.("login")}>
            Sign in
            <ChevronDown className="size-4 opacity-0" />
          </Button>
          <Button className="w-full rounded-2xl py-6 text-base" onClick={() => onAuthClick?.("signup")}>
            Join now
          </Button>
          {onProfileClick ? (
            <Button variant="ghost" className="w-full justify-start rounded-2xl py-4 text-base" onClick={() => { onProfileClick(); setMenuOpen(false); }}>
              Profile
            </Button>
          ) : null}
          <Button variant="outline" className="w-full justify-between rounded-2xl py-6 text-base" onClick={onSearchClick}>
            Start searching
            <Search className="size-4" />
          </Button>
          {searchPrompts.map((prompt) => (
            <div key={prompt} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
              {prompt}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function CinematicHeroSearch({ searchQuery, setSearchQuery, suggestions, onPickSuggestion, onSearchClick, onPropertySelect, heroItems }) {
  const [heroOpen, setHeroOpen] = useState(false)

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={{ x: [0, 24, 0], y: [0, -16, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[5%] top-[12%] h-56 w-56 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-300/15" />
        <motion.div animate={{ x: [0, -18, 0], y: [0, 22, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[7%] top-[18%] h-64 w-64 rounded-full bg-sky-300/18 blur-3xl dark:bg-sky-400/12" />
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[14%] left-[28%] h-32 w-32 rounded-full bg-white/55 blur-2xl dark:bg-white/8" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="relative z-10 pt-4 sm:pt-10 lg:pt-16">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/55 px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-muted-foreground shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
            <Sparkles className="size-3.5" /> Cinematic search experience
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.05 }} className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-7xl xl:text-8xl">
            Discover stays that don&apos;t feel real.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12 }} className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Curated escapes, breathtaking architecture, and cinematic destinations designed for modern explorers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-10 space-y-4">
            <div
              onFocusCapture={() => setHeroOpen(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setHeroOpen(false)
                }
              }}
              className={cn(
                "relative overflow-hidden rounded-[2.2rem] border border-white/55 bg-white/62 p-4 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-white/8",
                heroOpen ? "scale-[1.01] shadow-[0_26px_110px_rgba(15,23,42,0.18)]" : ""
              )}
            >
              <div className="grid gap-3 md:grid-cols-[1.12fr_0.88fr_0.74fr_auto]">
                <label className="rounded-[1.6rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background focus-within:bg-background">
                  <span className="block text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Destination</span>
                  <div className="mt-2 flex items-center gap-2">
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Bali, cliffside villas, hidden sanctuaries"
                      className="h-auto border-0 bg-transparent p-0 text-lg font-medium shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                      autoComplete="off"
                    />
                  </div>
                </label>

                <button type="button" className="rounded-[1.6rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background">
                  <span className="block text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Mood</span>
                  <span className="mt-2 block text-lg font-medium">Quiet luxury</span>
                </button>

                <button type="button" className="rounded-[1.6rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background">
                  <span className="block text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Guests</span>
                  <span className="mt-2 block text-lg font-medium">2 travelers</span>
                </button>

                <Button className="rounded-[1.6rem] px-6 py-7 text-base shadow-[0_18px_40px_rgba(15,23,42,0.16)]" onClick={onSearchClick}>
                  <Search className="mr-2 size-4" />
                  Explore
                </Button>
              </div>

              <AnimatePresence>
                {heroOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/92 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
                  >
                    <div className="border-b border-border/60 px-4 py-3 text-[0.68rem] uppercase tracking-[0.34em] text-muted-foreground">
                      {searchQuery.trim() ? "Related searches" : "Trending searches"}
                    </div>
                    <div className="grid gap-2 p-2">
                      {suggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setSearchQuery(item.title)
                            onPickSuggestion?.(item)
                          }}
                          className="flex items-start justify-between gap-4 rounded-[1.1rem] px-4 py-3 text-left transition-colors hover:bg-foreground/5"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{item.location} • {item.category}</p>
                          </div>
                          <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">Search</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {searchPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setSearchQuery(prompt)}
                    className="rounded-full border border-border/60 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-background"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">Parallax depth</span>
              <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">Editorial storytelling</span>
              <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">Ambient motion</span>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 min-h-[32rem] lg:min-h-[44rem]">
          <div className="absolute inset-0 rounded-[2.8rem] border border-white/35 bg-white/30 shadow-[0_24px_100px_rgba(15,23,42,0.14)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8" />
          <HeroCollage heroItems={heroItems} onPropertySelect={onPropertySelect} />
        </div>
      </div>
    </section>
  )
}

function HeroCollage({ heroItems, onPropertySelect }) {
  return (
    <div className="grid h-full gap-4 p-4 sm:grid-cols-2 sm:grid-rows-[minmax(0,1fr)_minmax(14rem,0.82fr)] sm:p-6">
      <motion.article
        whileHover={{ y: -8, scale: 1.01 }}
        onClick={() => onPropertySelect?.(heroItems[0])}
        className="group relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/45 shadow-[0_20px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:row-span-2"
      >
        <img src={heroItems[0]?.image} alt={heroItems[0]?.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/65">Featured stay</p>
          <h3 className="mt-2 text-2xl font-medium">{heroItems[0]?.title}</h3>
          <p className="mt-1 text-sm text-white/75">{heroItems[0]?.location} • {formatPrice(heroItems[0]?.price)}</p>
        </div>
      </motion.article>

      <motion.article
        whileHover={{ y: -8, scale: 1.01 }}
        onClick={() => onPropertySelect?.(heroItems[1])}
        className="group relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/45 shadow-[0_20px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8"
      >
        <img src={heroItems[1]?.image} alt={heroItems[1]?.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/65">Featured context</p>
          <h3 className="mt-2 text-xl font-medium">{heroItems[1]?.title}</h3>
        </div>
      </motion.article>

      <motion.article
        whileHover={{ y: -8, scale: 1.01 }}
        onClick={() => onPropertySelect?.(heroItems[2])}
        className="group relative overflow-hidden rounded-[2rem] border border-white/35 bg-black/35 shadow-[0_20px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 sm:min-h-[14rem]"
      >
        <img src={heroItems[2]?.image} alt={heroItems[2]?.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/65">Atmospheric pin</p>
          <h3 className="mt-2 text-lg font-medium">{heroItems[2]?.location}</h3>
          <p className="mt-1 text-sm text-white/75">{formatPrice(heroItems[2]?.price)} per night</p>
        </div>
      </motion.article>
    </div>
  )
}

function FloatingDestinationCategories({ selectedCategory, onSelect }) {
  return (
    <section className="relative z-20 mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/55 bg-white/55 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {discoveryCategories.map((category, index) => (
            <CategoryRibbonCard
              key={category.label}
              category={category}
              active={selectedCategory === category.label}
              onClick={() => onSelect(category.label)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryRibbonCard({ category, active, onClick, index }) {
  const Icon = category.icon

  return (
    <motion.button
      type="button"
      whileHover={{ y: -7, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative min-w-[14rem] overflow-hidden rounded-[1.8rem] border px-5 py-5 text-left transition-all duration-500",
        active
          ? "border-black/20 bg-black/6 text-foreground shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/12"
          : "border-white/45 bg-white/40 text-foreground/90 dark:border-white/10 dark:bg-white/6"
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100", category.accent)} />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">Explore</p>
          <h3 className="mt-2 text-lg font-medium">{category.label}</h3>
        </div>
        <div className={cn("flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm", active ? "ring-1 ring-black/10 dark:ring-white/10" : "") }>
          <Icon className="size-5" />
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.35, x: active ? 0 : -4 }}
        transition={{ duration: 0.3 }}
        className="relative mt-4 h-px w-full bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />
      <span className="relative mt-3 block text-xs uppercase tracking-[0.26em] text-muted-foreground">
        Ribbon {String(index + 1).padStart(2, "0")}
      </span>
    </motion.button>
  )
}

function EditorialDiscoverySections({ items, onPropertySelect }) {
  const sections = editorialMoments.map((moment, index) => ({
    ...moment,
    item: items[index % items.length],
    reverse: index % 2 === 1,
  }))

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-8 lg:space-y-12">
        {sections.map((section, index) => (
          <motion.article
            key={section.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: index * 0.06 }}
            className={cn(
              "grid gap-5 rounded-[2.5rem] border border-white/55 bg-white/50 p-4 shadow-[0_18px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:p-6 lg:grid-cols-[0.92fr_1.08fr]",
              section.reverse ? "lg:grid-cols-[1.08fr_0.92fr]" : ""
            )}
          >
            <div className={cn("flex flex-col justify-between rounded-[2rem] border border-border/55 bg-background/70 p-6 sm:p-8", section.reverse ? "lg:order-2" : "") }>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">{section.eyebrow}</p>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{section.title}</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{section.copy}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="rounded-full">
                  Explore story
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button variant="outline" className="rounded-full">
                  Save mood
                </Button>
              </div>
            </div>

            <div className={cn("relative min-h-[24rem] overflow-hidden rounded-[2.2rem] border border-white/35 bg-white/40 shadow-[0_20px_80px_rgba(15,23,42,0.12)]", section.reverse ? "lg:order-1" : "") }>
              <img src={section.image} alt={section.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.28em] text-white/65">
                  <span>Editorial spread</span>
                  <span>0{index + 1}</span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-medium sm:text-3xl">{section.item?.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{section.item?.location} • {formatPrice(section.item?.price)}</p>
                  </div>
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15" onClick={() => onPropertySelect?.(section.item)}>
                    Open
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function AsymmetricalPropertyShowcase({ items, onPropertySelect }) {
  const primary = pickFeature(items, 0)
  const secondary = pickFeature(items, 1)
  const tertiary = pickFeature(items, 2)
  const quaternary = pickFeature(items, 3)
  const quinary = pickFeature(items, 4)
  const senary = pickFeature(items, 5)

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Asymmetrical property showcase</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">A layered selection of cinematic stays.</h2>
          </div>
          {/* <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right sm:text-base">
            A staggered composition replaces rigid cards with drifting panels, oversized hero moments, and compact discovery tiles.
          </p> */}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <GlassCard item={primary} size="feature" onOpen={onPropertySelect} />
          </div>
          <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2 lg:grid-rows-2">
            <GlassCard item={secondary} size="portrait" onOpen={onPropertySelect} />
            <GlassCard item={tertiary} size="portrait" onOpen={onPropertySelect} />
            <GlassCard item={quaternary} size="compact" onOpen={onPropertySelect} />
            <GlassCard item={quinary} size="compact" onOpen={onPropertySelect} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <GlassCard item={senary} size="landscape" onOpen={onPropertySelect} />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingInteractiveMap({ item, onOpenMobile }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2.5rem] border border-white/55 bg-white/55 p-6 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:p-8">
          <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Floating interactive map</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">The map becomes atmosphere instead of a rectangle.</h2>
          {/* <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Glowing markers, translucent panels, and animated route lines give location discovery a futuristic, gallery-like feel.
          </p> */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-full" onClick={onOpenMobile}>
              Open immersive map
              <MapPinned className="ml-2 size-4" />
            </Button>
            <Button variant="outline" className="rounded-full">
              Show dreamy radius
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/35 bg-white/35 shadow-[0_24px_100px_rgba(15,23,42,0.14)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,247,251,0.76))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.15),transparent_30%),linear-gradient(180deg,rgba(4,8,16,0.96),rgba(8,12,20,0.86))]" />
          <div className="absolute inset-0 opacity-80">
            <div className="absolute left-[12%] top-[22%] h-px w-[70%] bg-white/45 dark:bg-white/10" />
            <div className="absolute left-[18%] top-[34%] h-px w-[55%] rotate-[-18deg] bg-white/35 dark:bg-white/10" />
            <div className="absolute right-[10%] top-[14%] h-px w-[40%] rotate-[24deg] bg-white/35 dark:bg-white/10" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[24%] top-[28%] flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-400/15 px-3 py-2 text-xs text-cyan-50 shadow-[0_0_30px_rgba(56,189,248,0.24)] backdrop-blur-xl">
              <Pin className="size-3.5" /> Ocean view
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[16%] top-[40%] flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-400/15 px-3 py-2 text-xs text-amber-50 shadow-[0_0_30px_rgba(251,191,36,0.18)] backdrop-blur-xl">
              <Compass className="size-3.5" /> Hidden route
            </motion.div>
            <motion.div animate={{ x: [0, 12, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[22%] left-[16%] rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs text-white shadow-[0_0_30px_rgba(255,255,255,0.15)] backdrop-blur-xl">
              {item?.location || "Bali"}
            </motion.div>
          </div>
          <div className="absolute inset-0 flex items-end p-5">
            <div className="w-full rounded-[1.6rem] border border-white/20 bg-black/30 p-4 text-white backdrop-blur-2xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/60">
                <span>Floating map</span>
                <span>{item?.rating || "4.97"}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/70">Near your selected mood</p>
                  <h3 className="text-xl font-medium">Island fragments, glowing routes.</h3>
                </div>
                <Button className="rounded-full bg-white text-black hover:bg-white/90">
                  Open map
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CuratedExperienceStrip({ items, onOpen }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Curated experience strip</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Horizontal stories for different ways to travel.</h2>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            Swipe the gallery
            <ArrowRight className="size-4" />
          </div>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onOpen?.(item)}
              className="group relative min-w-[18rem] overflow-hidden rounded-[2.2rem] border border-white/55 bg-white/55 shadow-[0_18px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:min-w-[24rem]"
            >
              <img src={item.image} alt={item.title} className="h-[18rem] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/65">Experience</p>
                <h3 className="mt-3 text-2xl font-medium">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/80">{item.location} • {formatPrice(item.price)}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImmersiveCollections({ onOpen }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Immersive collections</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Luxurious collections presented like a campaign.</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collectionCards.map((collection, index) => (
            <motion.article
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={cn(
                "group relative overflow-hidden rounded-[2.6rem] border border-white/55 bg-white/55 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8",
                index === 0 ? "md:col-span-2 xl:col-span-1" : ""
              )}
            >
              <img src={collection.image} alt={collection.title} className="h-[20rem] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/65">Collection</p>
                <h3 className="mt-3 text-2xl font-medium">{collection.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/82">{collection.subtitle}</p>
                <Button variant="outline" className="mt-5 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15" onClick={onOpen}>
                  View collection
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LuxuryFooter() {
  return (
    <footer className="relative border-t border-white/15 bg-[#05070d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.34em] text-white/45">Luxury footer</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Driftly turns discovery into an editorial travel ritual.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button className="rounded-full bg-white px-5 py-6 text-black hover:bg-white/90">
            Start exploring
          </Button>
          <Button variant="outline" className="rounded-full border-white/20 bg-white/5 px-5 py-6 text-white hover:bg-white/10">
            View collections
          </Button>
        </div>
      </div>
    </footer>
  )
}

function MobileMapSheet({ open, onOpenChange, item }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[82vh] rounded-t-[2.2rem] border-white/10 bg-background/94 px-4 pt-4 backdrop-blur-3xl sm:px-6">
        <SheetHeader className="px-0 pb-0">
          <SheetTitle>Floating map preview</SheetTitle>
        </SheetHeader>
        <div className="mt-5 h-[calc(100%-4rem)]">
          <div className="relative h-full overflow-hidden rounded-[2.4rem] border border-white/35 bg-white/35 shadow-[0_24px_100px_rgba(15,23,42,0.14)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,247,251,0.76))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.15),transparent_30%),linear-gradient(180deg,rgba(4,8,16,0.96),rgba(8,12,20,0.86))]" />
            <div className="absolute inset-0 flex items-end p-5">
              <div className="w-full rounded-[1.6rem] border border-white/20 bg-black/30 p-4 text-white backdrop-blur-2xl">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/60">
                  <span>Floating map</span>
                  <span>{item?.rating || "4.97"}</span>
                </div>
                <p className="mt-4 text-lg font-medium">{item?.title || "Curated destination"}</p>
                <p className="mt-2 text-sm text-white/70">{item?.location || "A cinematic destination"}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SearchDiscoveryPage({ items = [], onBack, onPropertySelect, onSearchClick, onProfileClick, onAuthClick }) {
  const [activeCategory, setActiveCategory] = useState(discoveryCategories[0].label)
  const [searchQuery, setSearchQuery] = useState("")
  const [mapOpen, setMapOpen] = useState(false)

  const suggestions = useMemo(() => buildRelatedSearches(items, searchQuery), [items, searchQuery])
  const highlightedItems = useMemo(() => buildHighlightedItems(items, searchQuery), [items, searchQuery])
  const heroItems = useMemo(() => [pickFeature(highlightedItems, 0), pickFeature(highlightedItems, 1), pickFeature(highlightedItems, 2)], [highlightedItems])
  const editorialItems = useMemo(() => highlightedItems.slice(0, 4), [highlightedItems])
  const showcaseItems = useMemo(() => highlightedItems.slice(0, 6), [highlightedItems])
  const mapItem = highlightedItems[7] || highlightedItems[1] || items[0]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(252,211,77,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.14),transparent_24%),linear-gradient(180deg,#fbfaf7_0%,#f5f2ec_48%,#ffffff_100%)] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(56,189,248,0.16),transparent_24%),linear-gradient(180deg,#05070d_0%,#080c14_55%,#0b1019_100%)]">
      <FloatingGlassNavbar
        onBack={onBack}
        onSearchClick={onSearchClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        onPickSuggestion={onPropertySelect}
        onProfileClick={onProfileClick}
        onAuthClick={onAuthClick}
      />

      <main>
        <CinematicHeroSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          suggestions={suggestions}
          onPickSuggestion={onPropertySelect}
          onSearchClick={onSearchClick}
          onPropertySelect={onPropertySelect}
          heroItems={heroItems}
        />

        <FloatingDestinationCategories selectedCategory={activeCategory} onSelect={setActiveCategory} />

        <EditorialDiscoverySections items={editorialItems} onPropertySelect={onPropertySelect} />

        <AsymmetricalPropertyShowcase items={showcaseItems} onPropertySelect={onPropertySelect} />

        <FloatingInteractiveMap item={mapItem} onOpenMobile={() => setMapOpen(true)} />

        <CuratedExperienceStrip items={editorialItems} onOpen={onPropertySelect} />

        <ImmersiveCollections onOpen={onSearchClick} />
      </main>

      <LuxuryFooter />

      <MobileMapSheet open={mapOpen} onOpenChange={setMapOpen} item={mapItem} />
    </div>
  )
}

export { SearchDiscoveryPage as SearchExperiencePage }
