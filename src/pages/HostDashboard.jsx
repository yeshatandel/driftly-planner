import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button.tsx"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar.tsx"
import { ArrowLeft, BarChart, Calendar, ChevronLeft, ChevronRight, CreditCard, MessagesSquare, Settings, Star } from "lucide-react"

function FloatingSidebar({ active = "analytics" }) {
  const items = [
    { key: "analytics", label: "Analytics", icon: BarChart },
    { key: "bookings", label: "Bookings", icon: Calendar },
    { key: "properties", label: "Properties", icon: CreditCard },
    { key: "messages", label: "Messages", icon: MessagesSquare },
    { key: "reviews", label: "Reviews", icon: Star },
    { key: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 glass-panel rounded-3xl border border-white/10 bg-background/30 p-4 shadow-lg backdrop-blur-3xl">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" />
            <AvatarFallback>HD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Host Dashboard</p>
            <p className="text-xs text-muted-foreground">Overview</p>
          </div>
        </div>

        <nav className="mt-4 grid gap-2">
          {items.map((it) => {
            const Icon = it.icon
            const activeCls = it.key === active ? "ring-1 ring-amber-400/30 bg-amber-400/6" : "hover:bg-white/3"
            return (
              <button key={it.key} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${activeCls}`}>
                <Icon className="size-4 text-amber-400" />
                <span>{it.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

function StatCard({ title, value, delta }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl glass-panel border border-white/10 p-4 shadow-md backdrop-blur-2xl">
      <p className="text-xs uppercase text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <h3 className="text-2xl font-semibold">{value}</h3>
        <span className={`text-sm ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{delta >=0 ? `+${delta}%` : `${delta}%`}</span>
      </div>
    </motion.div>
  )
}

function MiniChart() {
  return (
    <svg viewBox="0 0 100 30" className="w-full h-12">
      <polyline points="0,20 15,14 30,10 45,8 60,6 75,4 90,3 100,2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RevenueChartsSection() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl glass-panel border border-white/10 p-4 shadow-md backdrop-blur-3xl">
        <p className="text-sm uppercase text-muted-foreground">Booking Trends</p>
        <h3 className="mt-2 text-xl font-semibold">Last 30 days</h3>
        <div className="mt-3 h-36"><MiniChart /></div>
      </div>
      <div className="rounded-3xl glass-panel border border-white/10 p-4 shadow-md backdrop-blur-3xl">
        <p className="text-sm uppercase text-muted-foreground">Revenue Growth</p>
        <h3 className="mt-2 text-xl font-semibold">Month over month</h3>
        <div className="mt-3 h-36"><MiniChart /></div>
      </div>
      <div className="rounded-3xl glass-panel border border-white/10 p-4 shadow-md backdrop-blur-3xl">
        <p className="text-sm uppercase text-muted-foreground">Occupancy</p>
        <h3 className="mt-2 text-xl font-semibold">This month</h3>
        <div className="mt-3 h-36 flex items-center justify-center">
          <div className="text-3xl font-semibold">78%</div>
        </div>
      </div>
    </section>
  )
}

function CalendarLayout() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const calendarDays = [
    { day: 29, inMonth: false, range: "Jun 29", totalRooms: 4, bookedRooms: 3, note: "Previous month carryover" },
    { day: 30, inMonth: false, range: "Jun 30", totalRooms: 4, bookedRooms: 2, note: "Checkout and deep clean" },
    { day: 1, inMonth: true, range: "Jul 1", totalRooms: 4, bookedRooms: 4, note: "All rooms occupied" },
    { day: 2, inMonth: true, range: "Jul 2", totalRooms: 4, bookedRooms: 4, note: "High demand day" },
    { day: 3, inMonth: true, range: "Jul 3", totalRooms: 4, bookedRooms: 1, note: "Owner hold for maintenance" },
    { day: 4, inMonth: true, range: "Jul 4", totalRooms: 4, bookedRooms: 4, note: "Holiday weekend sold out" },
    { day: 5, inMonth: true, range: "Jul 5", totalRooms: 4, bookedRooms: 3, note: "3 PM arrival window" },
    { day: 6, inMonth: true, range: "Jul 6", totalRooms: 4, bookedRooms: 4, note: "No availability left" },
    { day: 7, inMonth: true, range: "Jul 7", totalRooms: 4, bookedRooms: 2, note: "Two rooms still open" },
    { day: 8, inMonth: true, range: "Jul 8", totalRooms: 4, bookedRooms: 4, note: "Fully booked" },
    { day: 9, inMonth: true, range: "Jul 9", totalRooms: 4, bookedRooms: 0, note: "Blocked for maintenance" },
    { day: 10, inMonth: true, range: "Jul 10", totalRooms: 4, bookedRooms: 3, note: "One room available" },
    { day: 11, inMonth: true, range: "Jul 11", totalRooms: 4, bookedRooms: 2, note: "Morning departures" },
    { day: 12, inMonth: true, range: "Jul 12", totalRooms: 4, bookedRooms: 4, note: "Fully occupied" },
    { day: 13, inMonth: true, range: "Jul 13", totalRooms: 4, bookedRooms: 3, note: "One room available" },
    { day: 14, inMonth: true, range: "Jul 14", totalRooms: 4, bookedRooms: 0, note: "Blocked for restocking" },
    { day: 15, inMonth: true, range: "Jul 15", totalRooms: 4, bookedRooms: 4, note: "Full occupancy" },
    { day: 16, inMonth: true, range: "Jul 16", totalRooms: 4, bookedRooms: 2, note: "Two rooms open" },
    { day: 17, inMonth: true, range: "Jul 17", totalRooms: 4, bookedRooms: 4, note: "All rooms reserved" },
    { day: 18, inMonth: true, range: "Jul 18", totalRooms: 4, bookedRooms: 1, note: "Cleaning and prep" },
    { day: 19, inMonth: true, range: "Jul 19", totalRooms: 4, bookedRooms: 3, note: "One room still open" },
    { day: 20, inMonth: true, range: "Jul 20", totalRooms: 4, bookedRooms: 4, note: "No availability" },
    { day: 21, inMonth: true, range: "Jul 21", totalRooms: 4, bookedRooms: 0, note: "Blocked for repairs" },
    { day: 22, inMonth: true, range: "Jul 22", totalRooms: 4, bookedRooms: 2, note: "Two rooms open" },
    { day: 23, inMonth: true, range: "Jul 23", totalRooms: 4, bookedRooms: 4, note: "Fully booked" },
    { day: 24, inMonth: true, range: "Jul 24", totalRooms: 4, bookedRooms: 3, note: "Arrival window at 3 PM" },
    { day: 25, inMonth: true, range: "Jul 25", totalRooms: 4, bookedRooms: 2, note: "Two rooms available" },
    { day: 26, inMonth: true, range: "Jul 26", totalRooms: 4, bookedRooms: 4, note: "All rooms sold out" },
    { day: 27, inMonth: true, range: "Jul 27", totalRooms: 4, bookedRooms: 2, note: "Turnover morning" },
    { day: 28, inMonth: true, range: "Jul 28", totalRooms: 4, bookedRooms: 3, note: "One room open" },
    { day: 29, inMonth: true, range: "Jul 29", totalRooms: 4, bookedRooms: 4, note: "Sold out" },
    { day: 30, inMonth: true, range: "Jul 30", totalRooms: 4, bookedRooms: 1, note: "Clean and stage" },
    { day: 31, inMonth: true, range: "Jul 31", totalRooms: 4, bookedRooms: 3, note: "One room remains" },
    { day: 1, inMonth: false, range: "Aug 1", totalRooms: 4, bookedRooms: 4, note: "Next month booking" },
    { day: 2, inMonth: false, range: "Aug 2", totalRooms: 4, bookedRooms: 4, note: "Next month booking" },
    { day: 3, inMonth: false, range: "Aug 3", totalRooms: 4, bookedRooms: 0, note: "Next month maintenance" },
    { day: 4, inMonth: false, range: "Aug 4", totalRooms: 4, bookedRooms: 2, note: "Next month booking" },
  ]

  const defaultDay = calendarDays.find((item) => item.inMonth) ?? calendarDays[0]
  const [hoveredDay, setHoveredDay] = useState(defaultDay)

  const roomBadgeLabel = (item) => {
    const availableRooms = item.totalRooms - item.bookedRooms

    if (availableRooms <= 0) {
      return "Booked"
    }

    return "Available"
  }

  const roomBadgeStyle = (item) => {
    const availableRooms = item.totalRooms - item.bookedRooms

    if (availableRooms <= 0) {
      return "bg-rose-100 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-400/18 dark:text-rose-200 dark:ring-rose-400/30"
    }

    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/18 dark:text-emerald-200 dark:ring-emerald-400/30"
  }

  const availabilitySummary = (item) => {
    const availableRooms = Math.max(0, item.totalRooms - item.bookedRooms)

    if (availableRooms === 0) {
      return { label: "Booked", tone: "bg-rose-100 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-400/15 dark:text-rose-200 dark:ring-rose-400/30", message: "No rooms available on this date." }
    }

    return { label: "Available", tone: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/30", message: `${availableRooms} room${availableRooms === 1 ? "" : "s"} available on this date.` }
  }

  return (
    <div className="rounded-3xl border border-black/5 bg-white/78 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-3xl dark:glass-panel dark:border-white/10 dark:bg-white/5 dark:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Calendar</p>
          <h3 className="mt-2 text-xl font-semibold">July 2026</h3>
          <p className="mt-1 text-sm text-muted-foreground">Month and weekly occupancy view for all active listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/5">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" className="rounded-full bg-white/5 px-4">This month</Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/5">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-black/5 bg-white/70 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div className="min-w-[42rem]">
          <div className="grid grid-cols-7 gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            {weekdays.map((day) => (
              <div key={day} className="px-2 py-1 text-center">{day}</div>
            ))}
          </div>

          <div className="mt-3 grid min-w-full grid-cols-7 gap-2">
            {calendarDays.map((item, index) => {
              const isWeekend = index % 7 === 0 || index % 7 === 6
              const availableRooms = Math.max(0, item.totalRooms - item.bookedRooms)
              const availability = availabilitySummary(item)
              return (
                <div
                  key={`${item.range}-${index}`}
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(defaultDay)}
                  className={`min-h-28 rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 ${item.inMonth ? "border-black/5 bg-white/80 dark:border-white/10 dark:bg-background/35" : "border-black/5 bg-white/45 opacity-45 dark:border-white/5 dark:bg-white/3"} ${isWeekend ? "ring-1 ring-black/5 dark:ring-white/5" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.range.split(" ")[0]}</p>
                      <p className="mt-1 text-lg font-semibold">{item.day}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`rounded-full px-2 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${availability.tone}`}>{roomBadgeLabel(item)}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="h-2 rounded-full bg-black/5 dark:bg-white/6">
                      <div
                        className={`h-2 rounded-full ${availableRooms === 0 ? "bg-rose-400/70" : "bg-emerald-400/70"}`}
                        style={{ width: `${Math.max(15, (availableRooms / item.totalRooms) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">{availability.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Hovered date</p>
              <h4 className="mt-1 text-lg font-semibold">{hoveredDay.range}</h4>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${availabilitySummary(hoveredDay).tone}`}>{roomBadgeLabel(hoveredDay)}</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Total rooms</p>
              <p className="mt-2 text-2xl font-semibold">{hoveredDay.totalRooms}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Booked rooms</p>
              <p className="mt-2 text-2xl font-semibold">{hoveredDay.bookedRooms}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Available</p>
              <p className="mt-2 text-2xl font-semibold">{Math.max(0, hoveredDay.totalRooms - hoveredDay.bookedRooms)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Occupancy</p>
              <p className="mt-2 text-2xl font-semibold">{Math.round((hoveredDay.bookedRooms / hoveredDay.totalRooms) * 100)}%</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">{hoveredDay.note}</p>
          <p className="mt-2 text-sm font-medium text-foreground dark:text-slate-950/85">{availabilitySummary(hoveredDay).message}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Quick context</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-2xl border border-black/5 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Label</p>
              <p className="mt-1 font-medium">{roomBadgeLabel(hoveredDay)}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Room mix</p>
              <p className="mt-1 font-medium">{hoveredDay.bookedRooms} booked, {Math.max(0, hoveredDay.totalRooms - hoveredDay.bookedRooms)} open</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hover hint</p>
              <p className="mt-1 font-medium">Move across any day to inspect room availability and booking context.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-black/5 bg-white/78 p-3 shadow-[0_14px_44px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Booked nights</p>
          <p className="mt-2 text-2xl font-semibold">18</p>
          <p className="mt-1 text-sm text-emerald-300">+4 this week</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/78 p-3 shadow-[0_14px_44px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Open slots</p>
          <p className="mt-2 text-2xl font-semibold">11</p>
          <p className="mt-1 text-sm text-sky-300">Ready for bookings</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/78 p-3 shadow-[0_14px_44px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Turnovers</p>
          <p className="mt-2 text-2xl font-semibold">6</p>
          <p className="mt-1 text-sm text-amber-300">Cleaning windows</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/78 p-3 shadow-[0_14px_44px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Blocked</p>
          <p className="mt-2 text-2xl font-semibold">3</p>
          <p className="mt-1 text-sm text-rose-300">Maintenance hold</p>
        </div>
      </div>
    </div>
  )
}

function SidebarSummary() {
  const items = [
    { label: "Next check-in", value: "Jul 5, 3:00 PM" },
    { label: "Next check-out", value: "Jul 11, 11:00 AM" },
    { label: "Cleaning team", value: "Booked for Jul 11" },
    { label: "Open inquiries", value: "8 unread" },
  ]

  return (
    <div className="rounded-3xl glass-panel border border-white/10 p-5 shadow-md backdrop-blur-3xl">
      <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Today&apos;s snapshot</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HostDashboard({ onBack }) {
  const [filter] = useState("30d")

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-8 lg:py-6">
        <FloatingSidebar />

        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 shadow-md backdrop-blur-3xl">
            <div>
              {onBack ? (
                <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full bg-white/6">
                  <ArrowLeft className="size-4" />
                </Button>
              ) : null}
              <p className="mt-4 text-sm uppercase tracking-[0.28em] text-muted-foreground">Host dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Property operations and calendar control</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">A denser overview of performance, upcoming stays, and the full month calendar so you can manage availability without leaving gaps in the layout.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-white/6 px-3 py-2 text-sm">Viewing: Properties overview</div>
              <div className="rounded-2xl bg-white/6 px-3 py-2 text-sm">Filter: {filter}</div>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total revenue" value="$128,340" delta={12} />
            <StatCard title="Monthly earnings" value="$24,120" delta={6} />
            <StatCard title="Occupancy rate" value="78%" delta={3} />
            <StatCard title="New reservations" value="42" delta={8} />
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-4">
              <RevenueChartsSection />
              <CalendarLayout />
            </div>

            <div className="space-y-4">
              <SidebarSummary />

              <section className="rounded-3xl glass-panel border border-white/10 p-5 shadow-md backdrop-blur-3xl">
                <h2 className="text-lg font-semibold">Recent reservations</h2>
                <div className="mt-4 grid gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-white/8 bg-white/5 p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-12">
                          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60" />
                          <AvatarFallback>GR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Guest {i} — Oceanfront Villa</p>
                          <p className="text-sm text-muted-foreground">Jul 12 - Jul 16 • Paid</p>
                        </div>
                        <div className="text-sm text-amber-400">${120 + i * 40}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
