import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Eye, EyeOff, Mail, Lock, UserRound, Sparkles, ShieldCheck, PlaneTakeoff, Compass, MoonStar, SunMedium, Globe2, ChevronLeft } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { useTheme } from "../../hooks/use-theme.js"
import { cn } from "../../lib/utils.js"

const travelHighlights = [
  {
    title: "Quiet luxury in the clouds",
    copy: "Glass villas, soft linen, and slow mornings above the treeline.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Architecture by the ocean",
    copy: "Cinematic stays with private decks and luminous water views.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
]

function AuthHero() {
  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,165,0.28),transparent_20%),radial-gradient(circle_at_75%_30%,rgba(122,162,255,0.22),transparent_25%),linear-gradient(180deg,#faf7f0_0%,#f3efe8_55%,#ede8dd_100%)] text-foreground lg:block dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,194,102,0.14),transparent_20%),radial-gradient(circle_at_75%_30%,rgba(88,110,255,0.18),transparent_25%),linear-gradient(180deg,#04070b_0%,#081018_52%,#0b111a_100%)] dark:text-white">
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:22px_22px] dark:opacity-20" />

      <div className="relative flex min-h-screen flex-col justify-between px-10 py-10 xl:px-14">
        <div className="flex items-center gap-3">
          <img src="/Driftly.png" alt="Driftly logo" className="size-12 rounded-2xl object-cover shadow-[0_12px_40px_rgba(15,23,42,0.16)]" />
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-muted-foreground/80">Driftly</p>
            <p className="text-sm font-medium">Luxury travel, reimagined</p>
          </div>
        </div>

        <div className="max-w-xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/40 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white/70">
            <Sparkles className="size-3.5" /> Cinematic onboarding
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.06em] text-balance xl:text-7xl">
            Discover stays that feel like a private escape.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground dark:text-white/70">
            Premium travel begins with a beautiful first impression. Driftly keeps the experience calm, editorial, and immersive from the first click.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {travelHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/45 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8"
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent" />
              <div className="relative flex min-h-[18rem] flex-col justify-end p-5 text-white">
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-white/65">Featured journey</p>
                <h2 className="mt-2 text-2xl font-medium leading-tight">{item.title}</h2>
                <p className="mt-2 text-sm text-white/78">{item.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground dark:text-white/60">
          <ShieldCheck className="size-4" /> Secure login, elegant experience, premium UI.
        </div>
      </div>
    </div>
  )
}

function SocialButton({ icon: Icon, label, className }) {
  return (
    <Button variant="outline" className={cn("rounded-full border-white/20 bg-white/10 px-4 py-5 text-sm text-foreground shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl hover:bg-white/20 dark:text-white", className)}>
      <Icon className="mr-2 size-4" />
      {label}
    </Button>
  )
}

function FloatingLabelInput({ label, type = "text", value, onChange, icon: Icon, placeholder }) {
  const [focused, setFocused] = useState(false)
  const hasValue = Boolean(value)

  return (
    <label className="group relative block">
      <div className={cn("pointer-events-none absolute left-4 top-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] transition-all duration-200", focused || hasValue ? "translate-y-0 text-muted-foreground" : "translate-y-2 text-transparent") }>
        <span>{label}</span>
      </div>
      <div className={cn("flex items-center gap-3 rounded-full border px-4 py-4 transition-all duration-300", focused ? "border-white/30 bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.08)] dark:border-white/15 dark:bg-white/8" : "border-border/60 bg-background/80 dark:border-white/10 dark:bg-white/5") }>
        {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-8 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0 dark:text-white"
        />
      </div>
    </label>
  )
}

export function AuthExperience({ mode = "login", onBack, onSwitchMode, onForgotPassword }) {
  const { theme, toggleTheme } = useTheme()
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" })
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const copy = {
    login: {
      eyebrow: "Welcome back",
      title: "Welcome back to your next escape.",
      blurb: "Sign in to continue your curated travel journey, bookings, and saved moments.",
      cta: "Log in",
      footer: "New to Driftly?",
      footerAction: "Create an account",
    },
    signup: {
      eyebrow: "Join Driftly",
      title: "Start discovering unforgettable stays.",
      blurb: "Create your account and unlock premium stays, private collections, and immersive trips.",
      cta: "Create account",
      footer: "Already have an account?",
      footerAction: "Log in",
    },
    forgot: {
      eyebrow: "Reset access",
      title: "Recover your journey.",
      blurb: "We’ll send a reset link to your email so you can get back to your next escape.",
      cta: "Send reset link",
      footer: "Remembered your password?",
      footerAction: "Back to login",
    },
  }[mode]

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fcfbf8_0%,#f4efe6_48%,#ffffff_100%)] text-foreground dark:bg-[linear-gradient(180deg,#04070b_0%,#081019_52%,#0b111a_100%)] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        <AuthHero />

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div animate={{ y: [0, -18, 0], x: [0, 12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute left-10 top-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-300/10" />
            <motion.div animate={{ y: [0, 16, 0], x: [0, -10, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute right-8 top-24 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-400/10" />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-16 left-1/4 h-28 w-28 rounded-full bg-white/55 blur-2xl dark:bg-white/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative w-full max-w-xl"
          >
            <div className="rounded-[2rem] border border-white/45 bg-white/72 p-4 shadow-[0_28px_100px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background dark:border-white/10 dark:bg-white/5">
                  <ChevronLeft className="size-4" />
                  Back
                </button>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground dark:border-white/10 dark:bg-white/5">
                  <PlaneTakeoff className="size-3.5" /> Driftly Access
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">{copy.eyebrow}</p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">{copy.title}</h1>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground dark:text-white/70">{copy.blurb}</p>
              </div>

              {submitted && mode === "forgot" ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[1.6rem] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    Reset link sent. Check your inbox for the next step.
                  </div>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <AnimatePresence mode="wait">
                  {mode === "signup" ? (
                    <motion.div key="signup-fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <FloatingLabelInput label="Full name" placeholder="Jordan Taylor" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} icon={UserRound} />
                      <FloatingLabelInput label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} icon={Mail} />
                      <FloatingLabelInput label="Password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} icon={Lock} />
                      <FloatingLabelInput label="Confirm password" type={showPassword ? "text" : "password"} placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} icon={Lock} />
                    </motion.div>
                  ) : mode === "forgot" ? (
                    <motion.div key="forgot-fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <FloatingLabelInput label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} icon={Mail} />
                    </motion.div>
                  ) : (
                    <motion.div key="login-fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <FloatingLabelInput label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} icon={Mail} />
                      <div className="relative">
                        <FloatingLabelInput label="Password" type={showPassword ? "text" : "password"} placeholder="Your password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} icon={Lock} />
                        <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {mode === "login" ? (
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground dark:text-white/65">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="size-4 rounded border-border/70 bg-transparent" />
                      Remember me
                    </label>
                    <button type="button" onClick={onForgotPassword} className="text-sm text-foreground underline decoration-white/30 underline-offset-4 hover:opacity-80 dark:text-white">Forgot password?</button>
                  </div>
                ) : null}

                <Button type="submit" className="group w-full rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#334155_45%,#111827_100%)] px-5 py-6 text-base text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)] transition-transform hover:scale-[1.01]">
                  {copy.cta}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px flex-1 bg-border/70 dark:bg-white/10" />
                Or continue with
                <span className="h-px flex-1 bg-border/70 dark:bg-white/10" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SocialButton icon={Globe2} label="Google" />
                <SocialButton icon={MoonStar} label={theme === "dark" ? "Apple" : "Apple ID"} />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground dark:text-white/65">
                <button type="button" onClick={() => onSwitchMode?.(mode === "login" ? "signup" : "login")} className="text-foreground underline decoration-white/30 underline-offset-4 hover:opacity-80 dark:text-white">
                  {copy.footerAction}
                </button>
                <button type="button" onClick={toggleTheme} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-2 text-xs uppercase tracking-[0.24em] dark:border-white/10 dark:bg-white/5">
                  {theme === "dark" ? <SunMedium className="size-3.5" /> : <MoonStar className="size-3.5" />}
                  Theme
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
