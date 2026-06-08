import { motion } from "framer-motion"
import { Car, ChefHat, MonitorSmartphone, Mountain, Wifi, Waves, Workflow } from "lucide-react"

const amenities = [
  { label: "Infinity Pool", icon: Waves },
  { label: "Ocean View", icon: Mountain },
  { label: "Private Chef", icon: ChefHat },
  { label: "Fast WiFi", icon: Wifi },
  { label: "Workspace", icon: Workflow },
  { label: "Smart Home", icon: MonitorSmartphone },
  { label: "Free Parking", icon: Car },
]

export function AmenitiesGrid() {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Amenities</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {amenities.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="rounded-[1.25rem] border border-white/70 bg-white/72 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/12 dark:bg-white/6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted/80 dark:bg-white/10">
                  <Icon className="size-4" />
                </div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
