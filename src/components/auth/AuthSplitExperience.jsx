import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronLeft, Eye, EyeOff, Globe2, Lock, Mail, MoonStar, PlaneTakeoff, ShieldCheck, Sparkles, SunMedium, UserRound } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { useTheme } from "../../hooks/use-theme.js"
import { cn } from "../../lib/utils.js"

const authContent = {
  login: {
    title: "Welcome back to your next escape.",
    blurb: "Sign in to view bookings, saved stays, and curated trip plans in one calm place.",
    cta: "Sign in",
    switchLabel: "Create account",
    switchCopy: "New here? Tap the image to start registration.",
    switchAction: "Continue to registration",
    imageTitle: "A softer way to book",
    imageCopy: "Explore cinematic stays, private retreats, and trips that feel considered from the first click.",
    imageTag: "Guest access",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  register: {
    title: "Create your Driftly account.",
    blurb: "Set up your profile to save favourites, manage bookings, and move faster at checkout.",
    cta: "Create account",
    switchLabel: "Back to sign in",
    switchCopy: "Already have an account? Tap the image to return.",
    switchAction: "Return to sign in",
    imageTitle: "Start with the view",
    imageCopy: "Build your travel passport around homes that feel intentional, warm, and quietly luxurious.",
    imageTag: "Members club",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9?auto=format&fit=crop&w=1400&q=80",
  },
}

function FloatingLabelInput({ label, type = "text", value, onChange, icon: Icon, placeholder }) {
  const [focused, setFocused] = useState(false)
  const hasValue = Boolean(value)

  return (
    <label className="group relative block">
      <div
        className={cn(
          "pointer-events-none absolute left-4 top-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] transition-all duration-200",
          focused || hasValue ? "translate-y-0 text-muted-foreground" : "translate-y-2 text-transparent",
        )}
      >
        <span>{label}</span>
      </div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border px-4 py-4 transition-all duration-300",
          focused
            ? "border-white/30 bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.08)] dark:border-white/15 dark:bg-white/8"
            : "border-border/60 bg-background/80 dark:border-white/10 dark:bg-white/5",
        )}
      >
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

function SocialButton({ icon: Icon, label, className }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "rounded-full border-white/20 bg-white/10 px-4 py-5 text-sm text-foreground shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl hover:bg-white/20 dark:text-white",
        className,
      )}
    >
      <Icon className="mr-2 size-4" />
      {label}
    </Button>
  )
}

function SidePanel({ mode, onSwitch, onBack }) {
  const content = authContent[mode]
  const action = mode === "login" ? onSwitch : onBack

  return (
    <button
      type="button"
      onClick={action}
      aria-label={content.switchAction}
      className="group relative min-h-[24rem] overflow-hidden text-left lg:min-h-screen"
    >
      <img src={content.image} alt={content.imageTitle} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,15,0.16)_0%,rgba(7,10,15,0.48)_58%,rgba(7,10,15,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_80%_25%,rgba(249,115,22,0.18),transparent_22%)] opacity-80" />

      <div className="relative flex h-full min-h-[24rem] flex-col justify-between p-6 sm:p-8 lg:min-h-screen lg:p-10 xl:p-14">
        <div className="flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <img src="/Driftly.png" alt="Driftly logo" className="size-12 rounded-2xl object-cover shadow-[0_12px_40px_rgba(15,23,42,0.2)]" />
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-white/70">Driftly</p>
              <p className="text-sm font-medium text-white/90">Luxury travel, reimagined</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-white/75 backdrop-blur-xl md:inline-flex">
            {mode === "login" ? <Sparkles className="size-3.5" /> : <PlaneTakeoff className="size-3.5" />}
            {content.imageTag}
          </div>
        </div>

        <div className="max-w-xl space-y-5 text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/75 backdrop-blur-2xl">
            {mode === "login" ? <ShieldCheck className="size-3.5" /> : <Sparkles className="size-3.5" />}
            {mode === "login" ? "Tap to continue" : "Tap to go back"}
          </p>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl xl:text-6xl">{content.imageTitle}</h2>
          <p className="max-w-xl text-base leading-8 text-white/78 sm:text-lg">{content.imageCopy}</p>
        </div>

        <div className="flex items-end justify-between gap-4 text-sm text-white/74">
          <div className="max-w-sm space-y-2">
            <p className="font-medium text-white/90">{content.switchAction}</p>
            <p className="leading-6 text-white/70">{content.switchCopy}</p>
          </div>
          <div className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-5" />
          </div>
        </div>
      </div>
    </button>
  )
}

function FormPanel({
  mode,
  content,
  theme,
  toggleTheme,
  form,
  setForm,
  rememberMe,
  setRememberMe,
  showPassword,
  setShowPassword,
  submitted,
  handleSubmit,
  onBack,
  onSwitchMode,
  onForgotPassword,
}) {
  const isLogin = mode === "login"

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack()
      return
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back()
    }
  }

  return (
    <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:min-h-screen lg:px-8">
      <div className="pointer-events-none absolute inset-0">
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
        <div className="rounded-[2rem] border border-white/45 bg-white/76 p-4 shadow-[0_28px_100px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/8 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background dark:border-white/10 dark:bg-white/5">
              <ChevronLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground dark:border-white/10 dark:bg-white/5">
              <PlaneTakeoff className="size-3.5" />
              Driftly Access
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">{isLogin ? "Welcome back" : "Join Driftly"}</p>
            <h1 className="max-w-lg text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">{content.title}</h1>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground dark:text-white/70">{content.blurb}</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[1.6rem] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                {isLogin ? "Signed in locally. Connect this form to your auth provider when ready." : "Account details captured. Finish the onboarding flow to start booking."}
              </div>
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login-fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                  <FloatingLabelInput label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} icon={Mail} />
                  <div className="relative">
                    <FloatingLabelInput label="Password" type={showPassword ? "text" : "password"} placeholder="Your password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} icon={Lock} />
                    <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="register-fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                  <FloatingLabelInput label="Full name" placeholder="Jordan Taylor" value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} icon={UserRound} />
                  <FloatingLabelInput label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} icon={Mail} />
                  <FloatingLabelInput label="Password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} icon={Lock} />
                  <FloatingLabelInput label="Confirm password" type={showPassword ? "text" : "password"} placeholder="Repeat your password" value={form.confirmPassword} onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))} icon={Lock} />
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin ? (
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-muted-foreground dark:text-white/65">
                  <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="size-4 rounded border-border/70 bg-transparent" />
                  Remember me
                </label>
                <button type="button" onClick={onForgotPassword} className="text-sm text-foreground underline decoration-white/30 underline-offset-4 hover:opacity-80 dark:text-white">
                  Forgot password?
                </button>
              </div>
            ) : (
              <label className="flex items-start gap-3 rounded-[1.5rem] border border-border/60 bg-background/50 px-4 py-3 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-border/70 bg-transparent" />
                <span>I agree to Driftly&apos;s terms and understand this page is ready for live auth wiring.</span>
              </label>
            )}

            <Button type="submit" className="group w-full rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#334155_45%,#111827_100%)] px-5 py-6 text-base text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)] transition-transform hover:scale-[1.01]">
              {content.cta}
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
            <div className="space-y-1">
              <p>{isLogin ? "Need a new account?" : "Already a member?"}</p>
              <button type="button" onClick={() => onSwitchMode?.(isLogin ? "register" : "login")} className="text-foreground underline decoration-white/30 underline-offset-4 hover:opacity-80 dark:text-white">
                {content.switchLabel}
              </button>
            </div>
            <button type="button" onClick={toggleTheme} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-2 text-xs uppercase tracking-[0.24em] dark:border-white/10 dark:bg-white/5">
              {theme === "dark" ? <SunMedium className="size-3.5" /> : <MoonStar className="size-3.5" />}
              Theme
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function AuthSplitExperience({ mode = "login", onBack, onSwitchMode, onForgotPassword }) {
  const { theme, toggleTheme } = useTheme()
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" })
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const content = authContent[mode]
  const isLogin = mode === "login"

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fcfbf8_0%,#f4efe6_48%,#ffffff_100%)] text-foreground dark:bg-[linear-gradient(180deg,#04070b_0%,#081019_52%,#0b111a_100%)] dark:text-white">
      <div className="relative grid min-h-screen lg:grid-cols-2">
        {isLogin ? (
          <>
            <FormPanel
              mode={mode}
              content={content}
              theme={theme}
              toggleTheme={toggleTheme}
              form={form}
              setForm={setForm}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              submitted={submitted}
              handleSubmit={handleSubmit}
              onBack={onBack}
              onSwitchMode={onSwitchMode}
              onForgotPassword={onForgotPassword}
            />
            <SidePanel mode={mode} onSwitch={() => onSwitchMode?.("register")} onBack={onBack} />
          </>
        ) : (
          <>
            <SidePanel mode={mode} onSwitch={() => onSwitchMode?.("login")} onBack={onBack} />
            <FormPanel
              mode={mode}
              content={content}
              theme={theme}
              toggleTheme={toggleTheme}
              form={form}
              setForm={setForm}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              submitted={submitted}
              handleSubmit={handleSubmit}
              onBack={onBack}
              onSwitchMode={onSwitchMode}
              onForgotPassword={onForgotPassword}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AuthSplitExperience