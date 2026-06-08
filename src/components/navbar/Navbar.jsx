import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Globe,
  Heart,
  LayoutGrid,
  LogOut,
  Menu,
  MoonStar,
  Search,
  Settings2,
  SunMedium,
  UserCircle2,
} from "lucide-react"

import { useScroll } from "../../hooks/use-scroll.js"
import { useTheme } from "../../hooks/use-theme.js"
import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.tsx"
import { cn } from "../../lib/utils.js"

const navLinks = ["Stays", "Collections", "Destinations"]
export function Navbar({ onWishlistClick, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  const scrolled = useScroll()
  const { theme, toggleTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)

  const profileInitial = useMemo(() => (theme === "dark" ? "DR" : "DL"), [theme])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/70 transition-all duration-300",
        scrolled ? "bg-background/78 shadow-[0_12px_50px_rgba(15,23,42,0.07)]" : "bg-background/35"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/Driftly.png" alt="Driftly logo" className="h-10 w-10 rounded-2xl object-cover shadow-[0_10px_30px_rgba(15,23,42,0.18)]" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-[0.24em] uppercase text-foreground">Driftly</p>
            <p className="text-xs text-muted-foreground">Stay somewhere unforgettable.</p>
          </div>
        </div>

        <motion.div
          className="hidden flex-1 min-w-0 items-center justify-center md:flex"
          animate={{ scale: searchFocused ? 1.015 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className={cn(
              "glass-panel flex w-full max-w-[540px] min-w-0 items-center gap-3 rounded-full px-5 py-2.5 transition-all duration-300",
              searchFocused ? "shadow-[0_20px_60px_rgba(15,23,42,0.12)]" : "shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            )}
            onFocusCapture={() => setSearchFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setSearchFocused(false)
              }
            }}
          >
            <div className="flex w-full min-w-0 items-center gap-3">
              <Input
                aria-label="Search"
                placeholder="Location · Any week · Add guests"
                className="h-10 min-w-0 flex-1 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
              />
              <Button size="icon" className="shrink-0 rounded-full bg-foreground text-background p-2" onClick={onSearchClick} aria-label="Search">
                <Search className="size-4 text-current" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="ml-auto flex-shrink-0 flex items-center gap-1 sm:gap-2 min-w-0">
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" className="rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => onAuthClick?.("login") }>
              Sign in
            </Button>
            <Button className="rounded-full px-4 text-sm font-medium shadow-[0_14px_40px_rgba(15,23,42,0.14)]" onClick={() => onAuthClick?.("signup") }>
              Join now
            </Button>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Button key={item} variant="ghost" className="rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">
                {item}
              </Button>
            ))}
          </div>

          <Button variant="ghost" className="hidden rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex" onClick={() => onHostClick?.()}>
            Become a Host
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="hidden rounded-full text-muted-foreground hover:text-foreground sm:inline-flex" aria-label="Language selector">
            <Globe className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden h-11 gap-2 rounded-full border-border/80 bg-background/80 px-2 pl-3 pr-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] md:inline-flex">
                <Menu className="size-4 text-foreground" />
                <Avatar className="size-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Profile avatar" />
                  <AvatarFallback>{profileInitial}</AvatarFallback>
                </Avatar>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-3xl border-border/70 p-2 shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
              <DropdownMenuLabel className="px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Account</DropdownMenuLabel>
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5" onSelect={() => onProfileClick?.() }>
                <UserCircle2 className="size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5" onSelect={() => onProfileClick?.() }>
                <LayoutGrid className="size-4" />
                Trips dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5" onSelect={() => onWishlistClick?.() }>
                <Heart className="size-4" />
                Wishlists
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5" onSelect={() => toggleTheme() }>
                {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
                {theme === "dark" ? "Switch to light" : "Switch to dark"}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5">
                <Settings2 className="size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl px-3 py-2.5 text-destructive focus:text-destructive">
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-11 rounded-full border-border/80 bg-background/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)] md:hidden">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] border-l-border/60 bg-background/92 px-5 pt-5 sm:w-[390px]">
              <SheetHeader className="px-0 pb-0">
                <SheetTitle className="text-left text-xl">Driftly</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div className="glass-panel flex items-center gap-2 rounded-3xl px-4 py-3">
                  <Search className="size-4 text-muted-foreground" />
                  <Input className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" placeholder="Search stays" />
                  <Button size="icon" className="rounded-full bg-foreground text-background p-2" onClick={onSearchClick} aria-label="Search">
                    <Search className="size-4 text-current" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between rounded-2xl px-4 py-6 text-base" onClick={() => onAuthClick?.("login") }>
                    Sign in
                    <ChevronDown className="size-4 opacity-0" />
                  </Button>
                  <Button className="w-full rounded-2xl py-6 text-base" onClick={() => onAuthClick?.("signup") }>
                    Join now
                  </Button>
                  {navLinks.map((item) => (
                    <Button key={item} variant="ghost" className="w-full justify-start rounded-2xl px-4 py-6 text-base">
                      {item}
                    </Button>
                  ))}
                </div>

                <Button variant="outline" className="w-full rounded-2xl py-6 text-base" onClick={onWishlistClick}>
                  <Heart className="mr-2 size-4" />
                  Wishlists
                </Button>

                <Button className="w-full rounded-2xl py-6 text-base">Become a Host</Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-2xl py-6" onClick={toggleTheme}>
                    {theme === "dark" ? <SunMedium className="mr-2 size-4" /> : <MoonStar className="mr-2 size-4" />}
                    Theme
                  </Button>
                  <Button variant="outline" className="rounded-2xl py-6">
                    <Globe className="mr-2 size-4" />
                    Language
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}