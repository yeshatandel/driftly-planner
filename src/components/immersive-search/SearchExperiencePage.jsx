import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronRight,
  Compass,
  Globe2,
  Grid2x2,
  House,
  Map,
  Menu,
  MoonStar,
  Mountain,
  Orbit,
  PanelTop,
  Route,
  Search,
  Sparkles,
  SunMedium,
  TentTree,
  Trees,
  Waves,
  Wind,
  X,
  Zap,
  Pin,
} from "lucide-react"

import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet.tsx"
import { useTheme } from "../../hooks/use-theme.js"
import { cn } from "../../lib/utils.js"

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const categories = [
  { label: "Oceanfront", icon: Waves, accent: "from-cyan-400/30 to-sky-500/10" },
  { label: "Desert Villas", icon: Wind, accent: "from-amber-400/30 to-orange-500/10" },
  { label: "Arctic Domes", icon: Orbit, accent: "from-slate-300/30 to-sky-300/10" },
  { label: "Sky Cabins", icon: Mountain, accent: "from-violet-400/30 to-fuchsia-500/10" },
  { label: "Jungle Retreats", icon: Trees, accent: "from-emerald-400/30 to-lime-500/10" },
  { label: "Floating Homes", icon: House, accent: "from-indigo-400/30 to-cyan-500/10" },
  { label: "Cliffside Escapes", icon: Compass, accent: "from-rose-400/30 to-amber-500/10" },
]

const collections = [
  {
    title: "Dream Escapes",
    subtitle: "Soft horizons and cinematic daylight",
    image:
      "https://images.unsplash.com/photo-1523413450415-4901b1d6f4d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Architectural Wonders",
    subtitle: "Sculptural spaces with gallery-like calm",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Remote Sanctuaries",
    subtitle: "Hidden addresses beyond the obvious",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Nature Immersion",
    subtitle: "Forest light, open air, and stillness",
    image:
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Modern Hideaways",
    subtitle: "Glass, shadow, and precision framing",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
]

const storyTags = ["Curated routes", "Private chef", "Design-led", "Secluded", "Sunset pools"]

function getPrice(value) {
  return currency.format(value || 0)
}

function pickItems(items) {
  return {
    hero: items[0],
    story: items[1],
    primary: items[2],
    secondary: items[3],
    tertiary: items[4],
    quaternary: items[5],
    featured: items[6] || items[0],
    map: items[7] || items[1],
    collection: items[8] || items[2],
  }
}

function getRelatedSearches(items, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  const related = []
  const seen = new Set()

  for (const item of items) {
    const haystacks = [item.title, item.location, item.category, item.dates].filter(Boolean)
    const matches = haystacks.some((value) => value.toLowerCase().includes(normalizedQuery))

    if (!matches) {
      continue
    }

    const key = `${item.title}::${item.location}`
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    related.push({
      id: item.id,
      title: item.title,
      location: item.location,
      category: item.category,
    })

    if (related.length >= 6) {
      break
    }
  }

  return related
}

function FloatingNavbar({ onBack, onSearchClick }) {
  const { theme, toggleTheme } = useTheme()
  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    window.history.back()
  }

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 w-[min(1220px,calc(100%-1rem))] -translate-x-1/2"
    >
      <div className="rounded-full border border-white/55 bg-white/58 px-3 py-2 shadow-[0_18px_70px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_20px_90px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-10 rounded-full" onClick={handleBack} aria-label="Back">
            <ArrowLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <img src="/Driftly.png" alt="Driftly logo" className="size-10 rounded-2xl object-cover shadow-[0_10px_30px_rgba(15,23,42,0.18)]" />
            <div className="hidden sm:block">
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">Driftly</p>
              <p className="text-sm font-medium text-foreground">Luxury search canvas</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onSearchClick}
            className="hidden flex-1 items-center gap-3 rounded-full border border-border/70 bg-background/75 px-4 py-2.5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl md:flex"
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search destination, mood, or view</span>
            <span className="ml-auto rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">Bali / 2 guests</span>
          </motion.button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
            </Button>

            <Avatar className="size-10 border border-white/40 shadow-[0_12px_30px_rgba(15,23,42,0.1)]">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Profile avatar" />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="size-10 rounded-full border-border/70 bg-background/85">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] border-l-white/10 bg-background/92 px-5 pt-5 backdrop-blur-3xl sm:w-[380px]">
                <SheetHeader className="px-0 pb-0">
                  <SheetTitle className="text-left text-xl">Driftly</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {storyTags.map((tag) => (
                    <div key={tag} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                      {tag}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function HeroFloatingCard({ item, className, delay = 0, onOpen }) {
  if (!item) return null

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotateX: 3, rotateY: -4, y: -8 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen?.(item)}
      className={cn(
        "group absolute overflow-hidden rounded-[2rem] border border-white/40 bg-white/50 text-left shadow-[0_22px_90px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8",
        className
      )}
    >
      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
          <span>{item.location}</span>
          <span>{item.rating}</span>
        </div>
        <h3 className="mt-2 text-lg font-medium leading-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-white/80">{getPrice(item.price)} per night</p>
      </div>
    </motion.button>
  )
}

function CategoryCard({ label, icon: Icon, accent, active, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative min-w-[13.75rem] overflow-hidden rounded-[1.75rem] border px-5 py-5 text-left transition-all duration-500",
        active
          ? "border-black/20 bg-black/6 text-foreground shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/12"
          : "border-white/45 bg-white/40 text-foreground/90 dark:border-white/10 dark:bg-white/6"
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100", accent)} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Explore</p>
          <h3 className="mt-2 text-lg font-medium">{label}</h3>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm">
          <Icon className="size-5" />
        </div>
      </div>
    </motion.button>
  )
}

function DiscoveryCard({ item, size = "compact", onOpen }) {
  if (!item) return null

  const sizes = {
    compact: "min-h-[16rem]",
    portrait: "min-h-[24rem]",
    landscape: "min-h-[18rem]",
    featured: "min-h-[28rem]",
  }

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01, rotateX: 3, rotateY: -2 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => onOpen?.(item)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/45 bg-white/55 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8",
        sizes[size]
      )}
    >
      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-white/65">
          <span>{item.category || "Curated"}</span>
          <span>{item.rating}</span>
        </div>
        <h3 className="mt-3 max-w-[20rem] text-xl font-medium leading-tight">{item.title}</h3>
        <p className="mt-2 text-sm text-white/80">{item.location} • {getPrice(item.price)}</p>
      </div>
      <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white/90 backdrop-blur-xl">
        View stay
      </div>
    </motion.article>
  )
}

function MapIsland({ item, mobile = false }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2.5rem] border border-white/45 bg-white/50 shadow-[0_25px_90px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8", mobile ? "h-[72vh]" : "h-full min-h-[34rem]") }>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,247,251,0.75))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.14),transparent_30%),linear-gradient(180deg,rgba(4,8,16,0.95),rgba(8,12,20,0.85))]" />
      <div className="absolute inset-0 opacity-80">
        <div className="absolute left-[10%] top-[22%] h-px w-[74%] bg-white/45 dark:bg-white/10" />
        <div className="absolute left-[15%] top-[35%] h-px w-[60%] rotate-[-18deg] bg-white/35 dark:bg-white/10" />
        <div className="absolute right-[12%] top-[15%] h-px w-[42%] rotate-[24deg] bg-white/35 dark:bg-white/10" />
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[26%] top-[30%] flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-400/15 px-3 py-2 text-xs text-cyan-50 shadow-[0_0_30px_rgba(56,189,248,0.24)] backdrop-blur-xl">
          <Pin className="size-3.5" /> Ocean view
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[18%] top-[40%] flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-400/15 px-3 py-2 text-xs text-amber-50 shadow-[0_0_30px_rgba(251,191,36,0.18)] backdrop-blur-xl">
          <Route className="size-3.5" /> Hidden route
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
  )
}

export function SearchExperiencePage({ items = [], onBack, onPropertySelect, onSearchClick }) {
  const [activeCategory, setActiveCategory] = useState(categories[0].label)
  const [mapOpen, setMapOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return items
    }

    const matches = items.filter((item) => {
      return [item.title, item.location, item.category, item.dates].some((value) => value?.toLowerCase().includes(normalizedQuery))
    })

    return matches.length > 0 ? matches : items
  }, [items, searchQuery])

  const relatedSearches = useMemo(() => getRelatedSearches(items, searchQuery), [items, searchQuery])
  const groups = useMemo(() => pickItems(filteredItems), [filteredItems])
  const heroItems = [groups.hero, groups.story, groups.primary]
  const showcaseItems = [groups.primary, groups.secondary, groups.tertiary, groups.quaternary, groups.featured, groups.map]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(252,211,77,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.14),transparent_24%),linear-gradient(180deg,#fbfaf7_0%,#f5f2ec_46%,#ffffff_100%)] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(56,189,248,0.16),transparent_24%),linear-gradient(180deg,#05070d_0%,#080c14_55%,#0b1019_100%)]">
      <FloatingNavbar onBack={onBack} onSearchClick={onSearchClick} />

      <main>
        <section className="relative min-h-[100svh] overflow-hidden pt-28">
          <div className="pointer-events-none absolute inset-0">
            <motion.div animate={{ y: [0, -18, 0], x: [0, 12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[8%] top-[12%] h-44 w-44 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-300/15" />
            <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-400/12" />
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[18%] left-[30%] h-32 w-32 rounded-full bg-white/50 blur-2xl dark:bg-white/8" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
            <div className="relative z-10 pt-8 lg:pt-16">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/55 px-4 py-2 text-xs uppercase tracking-[0.34em] text-muted-foreground shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
                <Sparkles className="size-3.5" /> Cinematic search experience
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.05 }} className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-7xl xl:text-8xl">
                Discover stays that don&apos;t feel real.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12 }} className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Curated spaces, cinematic escapes, and immersive destinations crafted for modern explorers.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.18 }} className="mt-10 space-y-4">
                <div
                  onFocusCapture={() => setSearchExpanded(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setSearchExpanded(false)
                    }
                  }}
                  className={cn(
                    "glass-panel relative flex flex-col gap-3 rounded-[2rem] border border-white/55 bg-white/62 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-white/8",
                    searchExpanded ? "scale-[1.01] shadow-[0_24px_100px_rgba(15,23,42,0.18)]" : ""
                  )}
                >
                  <div className="grid gap-3 md:grid-cols-[1.1fr_0.85fr_0.75fr_auto]">
                    <label className="rounded-[1.4rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background focus-within:bg-background">
                      <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">Destination</span>
                      <div className="mt-2 flex items-center gap-2">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <Input
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Bali, beachfront villas, cliffside escapes"
                          className="h-auto border-0 bg-transparent p-0 text-lg font-medium shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                          autoComplete="off"
                        />
                      </div>
                    </label>
                    <button type="button" className="rounded-[1.4rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background">
                      <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">Dates</span>
                      <span className="mt-2 block text-lg font-medium">Anytime</span>
                    </button>
                    <button type="button" className="rounded-[1.4rem] border border-border/60 bg-background/75 px-4 py-4 text-left transition-colors hover:bg-background">
                      <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">Travelers</span>
                      <span className="mt-2 block text-lg font-medium">2 guests</span>
                    </button>
                    <Button
                      className="rounded-[1.4rem] px-6 py-7 text-base shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
                      onClick={onSearchClick}
                    >
                      <Search className="mr-2 size-4" />
                      Explore
                    </Button>
                  </div>
                  {searchExpanded && relatedSearches.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/92 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
                    >
                      <div className="border-b border-border/60 px-4 py-3 text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                        Related searches
                      </div>
                      <div className="max-h-72 overflow-y-auto p-2">
                        {relatedSearches.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSearchQuery(item.title)}
                            className="flex w-full items-start justify-between gap-4 rounded-[1.1rem] px-4 py-3 text-left transition-colors hover:bg-foreground/5"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.location} • {item.category}
                              </p>
                            </div>
                            <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                              Search
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2">
                    {storyTags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/60 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">3D depth motion</span>
                  <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">Editorial storytelling</span>
                  <span className="rounded-full border border-border/50 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-white/5">Immersive map islands</span>
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 min-h-[32rem] lg:min-h-[42rem]">
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/35 bg-white/30 shadow-[0_24px_100px_rgba(15,23,42,0.14)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8" />
              <HeroFloatingCard item={heroItems[0]} className="left-[-1%] top-[14%] h-[16rem] w-[18rem] sm:h-[19rem] sm:w-[20rem] lg:left-[4%] lg:top-[10%] lg:h-[24rem] lg:w-[24rem]" delay={0.05} onOpen={onPropertySelect} />
              <HeroFloatingCard item={heroItems[1]} className="right-[1%] top-[6%] h-[17rem] w-[17rem] sm:h-[19rem] sm:w-[19rem] lg:right-[2%] lg:top-[4%] lg:h-[22rem] lg:w-[21rem]" delay={0.12} onOpen={onPropertySelect} />
              <HeroFloatingCard item={heroItems[2]} className="left-[20%] top-[44%] h-[17rem] w-[18rem] sm:h-[19rem] sm:w-[20rem] lg:left-[20%] lg:top-[43%] lg:h-[24rem] lg:w-[24rem]" delay={0.2} onOpen={onPropertySelect} />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[8%] right-[12%] w-[18rem] rounded-[1.75rem] border border-white/35 bg-black/35 p-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl dark:border-white/10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
                  <Globe2 className="size-3.5" /> Worldwide curation
                </div>
                <p className="mt-3 text-xl font-medium leading-tight">A cinematic canvas that surfaces rare, quiet, and beautifully designed stays.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/55 bg-white/55 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <CategoryCard
                  key={category.label}
                  {...category}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/55 bg-white/55 p-6 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.2),transparent_26%),radial-gradient(circle_at_75%_0%,rgba(56,189,248,0.2),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_75%_0%,rgba(56,189,248,0.14),transparent_22%)]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">Interactive discovery layout</p>
                    <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                      Browse like a luxury magazine, not a booking form.
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                      Cinematic imagery, layered depth, and narrative spacing turn each stay into a moment of visual storytelling.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <motion.div whileHover={{ y: -6, scale: 1.02 }} className="overflow-hidden rounded-[1.75rem] border border-white/35 bg-black/35 p-4 text-white shadow-[0_16px_60px_rgba(15,23,42,0.2)] backdrop-blur-2xl">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/70">
                          <span>Focus stay</span>
                          <BadgeCheck className="size-4" />
                        </div>
                        <p className="mt-8 text-2xl font-medium leading-tight">Architecture framed by silence and ocean light.</p>
                      </motion.div>

                      <motion.div whileHover={{ y: -6, scale: 1.02 }} className="overflow-hidden rounded-[1.75rem] border border-border/55 bg-background/75 p-4 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          <span>Magnetic motion</span>
                          <Camera className="size-4" />
                        </div>
                        <p className="mt-8 text-2xl font-medium leading-tight">Hover reveals light, shadow, and hidden context.</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: 0.05 }}
                className="lg:col-span-4"
              >
                <DiscoveryCard item={showcaseItems[0]} size="featured" onOpen={onPropertySelect} />
              </motion.div>

              <div className="grid gap-6 lg:col-span-3">
                <DiscoveryCard item={showcaseItems[1]} size="portrait" onOpen={onPropertySelect} />
                <DiscoveryCard item={showcaseItems[2]} size="compact" onOpen={onPropertySelect} />
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <DiscoveryCard item={showcaseItems[3]} size="landscape" onOpen={onPropertySelect} className="lg:col-span-7" />
              <DiscoveryCard item={showcaseItems[4]} size="portrait" onOpen={onPropertySelect} className="lg:col-span-3" />
              <DiscoveryCard item={showcaseItems[5]} size="compact" onOpen={onPropertySelect} className="lg:col-span-2" />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.18fr_0.82fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/30 bg-black/12 p-6 shadow-[0_20px_90px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/28 sm:p-8"
            >
              <img src={groups.featured?.image} alt={groups.featured?.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-transparent" />
              <div className="relative z-10 flex min-h-[28rem] flex-col justify-end text-white">
                <p className="text-xs uppercase tracking-[0.34em] text-white/75">Editorial featured stay</p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                  Escape into architecture designed for silence, comfort, and breathtaking views.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                  A full-frame editorial moment with luminous overlays and a floating booking panel that keeps the experience immersive.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button className="rounded-full bg-white px-5 py-6 text-black hover:bg-white/90">
                    Book the stay
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button variant="outline" className="rounded-full border-white/30 bg-white/10 px-5 py-6 text-white hover:bg-white/15">
                    View story
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {filteredItems.slice(0, 4).map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  onClick={() => onPropertySelect?.(item)}
                  className="flex w-full items-center gap-4 rounded-[1.8rem] border border-white/55 bg-white/55 p-3 text-left shadow-[0_16px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl transition-colors hover:bg-white/70 dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/12"
                >
                  <img src={item.image} alt={item.title} className="h-24 w-24 rounded-[1.35rem] object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-base font-medium">{item.title}</h3>
                      <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs">{item.rating}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                    <p className="mt-3 text-sm font-medium">{getPrice(item.price)} <span className="text-muted-foreground">/ night</span></p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-stretch">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65 }}
                  className="rounded-[2.5rem] border border-white/55 bg-white/55 p-6 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8"
                >
                  <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">Floating map preview</p>
                  <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    The map becomes a translucent island instead of a rectangle.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    Glowing pins, drifting labels, and atmospheric depth make location discovery feel artistic and immersive.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="rounded-full" onClick={() => setMapOpen(true)}>
                      Open immersive map
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Show curated radius
                    </Button>
                  </div>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div whileHover={{ y: -6, scale: 1.01 }} className="rounded-[2rem] border border-white/55 bg-white/55 p-5 shadow-[0_16px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8">
                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Atmosphere</p>
                    <p className="mt-4 text-2xl font-medium leading-tight">Soft whites in light mode, cinematic blacks in dark mode.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -6, scale: 1.01 }} className="rounded-[2rem] border border-white/55 bg-white/55 p-5 shadow-[0_16px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8">
                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Motion</p>
                    <p className="mt-4 text-2xl font-medium leading-tight">Parallax depth, layered transitions, and floating surfaces.</p>
                  </motion.div>
                </div>
              </div>

              <div className="hidden lg:block">
                <MapIsland item={groups.map} />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">Curated collections</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">A horizontal gallery of destinations.</h2>
              </div>
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                Swipe the gallery
                <ArrowRight className="size-4" />
              </div>
            </div>

            <div className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {collections.map((collection, index) => (
                <motion.article
                  key={collection.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative min-w-[18rem] overflow-hidden rounded-[2.3rem] border border-white/55 bg-white/55 shadow-[0_18px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 sm:min-w-[23rem]"
                >
                  <img src={collection.image} alt={collection.title} className="h-[18rem] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/65">Collection</p>
                    <h3 className="mt-3 text-2xl font-medium">{collection.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/80">{collection.subtitle}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/15 bg-[#05070d] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-white/45">Cinematic footer</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Driftly turns search into a luxury travel discovery ritual.
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

      <Sheet open={mapOpen} onOpenChange={setMapOpen}>
        <SheetContent side="bottom" className="h-[82vh] rounded-t-[2.2rem] border-white/10 bg-background/94 px-4 pt-4 backdrop-blur-3xl sm:px-6">
          <SheetHeader className="px-0 pb-0">
            <SheetTitle>Floating map preview</SheetTitle>
          </SheetHeader>
          <div className="mt-5 h-[calc(100%-4rem)]">
            <MapIsland item={groups.map} mobile />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
