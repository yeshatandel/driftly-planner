import { motion } from "framer-motion"

import { Button } from "../ui/button.tsx"

export function HostCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-[2rem] border border-white/70 bg-white/74 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=280&q=80"
            alt="Host avatar"
            className="size-14 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hosted by Aanya</h3>
            <p className="text-sm text-muted-foreground">Superhost · 7 years hosting · 99% response rate</p>
          </div>
        </div>

        <Button className="rounded-full px-5">Contact host</Button>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        I love helping travelers discover quiet corners, good local food, and the kind of stays that feel deeply personal.
      </p>
    </motion.section>
  )
}
