import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Compass, Sparkles } from "lucide-react"

import { listings } from "../../data/listings.js"
import { Button } from "../ui/button.tsx"
import { scrollToId } from "../../lib/scroll.js"
import { formatINR } from "../../lib/currency.js"

const headlineMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const marqueeCards = [...listings, ...listings, ...listings]
const CARD_WIDTH_CLASS = "w-[clamp(16rem,78vw,20rem)] sm:w-[clamp(18rem,42vw,22rem)] lg:w-[clamp(20rem,28vw,24rem)]"

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HotelCard({ listing, index, offset, step, cardWidth, containerWidth, focusRange, isMeasured }) {
  const baseX = index * step
  const cardCenter = baseX - offset + cardWidth / 2
  const containerCenter = containerWidth / 2
  const distance = Math.abs(cardCenter - containerCenter)
  const focus = clamp(1 - distance / focusRange, 0, 1)
  const isCenter = focus > 0.82

  const scale = isCenter ? 1.2 : 0.86 + focus * 0.34
  const translateY = isCenter ? -16 : 18 - focus * 18
  const blur = isCenter ? 0 : (1 - focus) * 7.5
  const opacity = isCenter ? 1 : 0.18 + focus * 0.72
  const brightness = isCenter ? 1 : 0.46 + focus * 0.48
  const saturation = isCenter ? 1 : 0.7 + focus * 0.3
  const grayscale = isCenter ? 0 : (1 - focus) * 0.45
  const rotateY = isCenter ? 0 : (1 - focus) * (index % 2 === 0 ? -18 : 18)

  return (
    <motion.article className={`relative shrink-0 ${CARD_WIDTH_CLASS}`}>
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        animate={{
          y: translateY,
          scale,
          rotateY,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{
          opacity,
          filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturation}) grayscale(${grayscale})`,
          zIndex: Math.round(focus * 100),
          boxShadow: isCenter
            ? "0 28px 90px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.18), 0 18px 60px rgba(255, 94, 124, 0.16)"
            : "0 20px 60px rgba(0,0,0,0.24)",
          transition: isMeasured
            ? "filter 280ms ease, opacity 280ms ease, box-shadow 280ms ease"
            : "none",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0">
          <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-black/8" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/88 to-transparent" />
        </div>

        <div className="relative flex h-[32rem] flex-col justify-between p-5 sm:h-[34rem] sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/80 backdrop-blur-md">
              {listing.category}
            </div>
            <div className="rounded-full border border-white/12 bg-white/12 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <span className="text-amber-300">★</span> {listing.rating}
            </div>
          </div>

          <div className="space-y-4 rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/56">Premium hotel</p>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white sm:text-[1.6rem]">
                {listing.title}
              </h3>
              <p className="mt-2 text-sm text-white/72">{listing.location}</p>
            </div>

            <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">From</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatINR(listing.price)}<span className="text-base font-medium text-white/62"> / night</span>
                </p>
              </div>

              <Button
                variant="outline"
                className="h-11 rounded-full border-white/15 bg-white/10 px-4 text-sm text-white shadow-none backdrop-blur-xl hover:bg-white/16"
              >
                View stay
              </Button>
            </div>
          </div>
        </div>

        {isCenter && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 -bottom-2 h-10 rounded-full bg-[#ff5a5f]/30 blur-2xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [0.92, 1, 0.92] }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </motion.article>
  )
}

export function Hero({ onExploreClick }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const firstCardRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const [cardWidth, setCardWidth] = useState(320)
  const [gap, setGap] = useState(24)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isMeasured, setIsMeasured] = useState(false)

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        setContainerWidth(sectionRef.current.getBoundingClientRect().width)
      }

      if (firstCardRef.current && trackRef.current) {
        const cardRect = firstCardRef.current.getBoundingClientRect()
        const trackStyles = window.getComputedStyle(trackRef.current)
        const trackGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "24")

        setCardWidth(cardRect.width)
        setGap(trackGap)
        setIsMeasured(true)
      }
    }

    measure()
    window.addEventListener("resize", measure)

    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0)
      return undefined
    }

    let frameId = 0
    const speed = 58

    const animate = (time) => {
      const step = cardWidth + gap
      const cycleWidth = step * listings.length
      const traveled = (time * speed) / 1000
      setOffset(traveled % cycleWidth)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frameId)
  }, [cardWidth, gap, reducedMotion])

  const step = cardWidth + gap
  const focusRange = Math.max(containerWidth * 0.28, step * 1.35)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#050507] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,90,95,0.18),transparent_32%),radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(180deg,rgba(6,6,10,0.2),rgba(6,6,10,0.94))]" />
      <div className="pointer-events-none absolute top-[-8rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[#ff5a5f]/22 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-24 h-[24rem] w-[24rem] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-1/4 h-[20rem] w-[20rem] rounded-full bg-[#ff385c]/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <motion.div
          variants={headlineMotion}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/76 backdrop-blur-xl">
            <Sparkles className="size-4 text-[#ff8b94]" />
            New collection: Spring escapes
          </div>

          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Find places that feel like home.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/72 sm:text-lg lg:text-xl">
            Discover beautifully curated stays, unique experiences, and spaces designed for every kind of traveler.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              className="h-12 rounded-full bg-white px-6 text-base font-medium text-slate-950 shadow-[0_18px_60px_rgba(0,0,0,0.28)] hover:bg-white/95"
              onClick={() => {
                if (onExploreClick) {
                  onExploreClick()
                  return
                }

                scrollToId("category-bar", 96)
              }}
            >
              Explore Stays
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/14 bg-white/8 px-6 text-base text-white backdrop-blur-xl hover:bg-white/12"
            >
              <Compass className="mr-2 size-4" />
              View Destinations
            </Button>
          </div>
        </motion.div>

        <div className="relative mt-10 flex flex-1 items-end pb-4 lg:pb-8">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/88 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative w-full"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_48%)]" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-5 lg:p-6">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,rgba(255,255,255,0.02))]" />

              <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium tracking-[0.24em] text-white/70 backdrop-blur-xl">
                Featured stays
              </div>

              {/* <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/78 backdrop-blur-xl">
                Infinite marquee
              </div> */}

              <div className="relative mt-10 overflow-hidden [perspective:1800px]">
                <motion.div
                  ref={trackRef}
                  className="flex items-center gap-6 will-change-transform sm:gap-7 lg:gap-8"
                  style={{ x: -offset }}
                >
                  {marqueeCards.map((listing, index) => (
                    <div
                      key={`${listing.id}-${Math.floor(index / listings.length)}-${index}`}
                      ref={index === 0 ? firstCardRef : undefined}
                      className="py-12"
                    >
                      <HotelCard
                        listing={listing}
                        index={index}
                        offset={offset}
                        step={step}
                        cardWidth={cardWidth}
                        containerWidth={containerWidth}
                        focusRange={focusRange}
                        isMeasured={isMeasured}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Curated villas", value: "320+" },
                  { label: "Avg. rating", value: "4.96" },
                  { label: "Premium hosts", value: "98%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4 text-white/85 backdrop-blur-xl"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/48">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}