import { motion } from "framer-motion"
import { Globe, Heart, LayoutGrid, Mail } from "lucide-react"

const footerColumns = [
  {
    title: "Explore",
    links: ["Stays", "Experiences", "Collections"],
  },
  {
    title: "Services",
    links: ["Theme tweak", "Support", "Contact us"],
  },
  {
    title: "About us",
    links: ["Affiliates", "Resources", "Company"],
  },
]

const socialLinks = [
  { label: "Email", icon: Mail },
  { label: "Explore", icon: Globe },
  { label: "Wishlist", icon: Heart },
  { label: "Dashboard", icon: LayoutGrid },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 border-t border-white/10 bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:gap-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src="/Driftly.png" alt="Driftly logo" className="h-10 w-10 rounded-2xl object-cover border border-white/10" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Driftly</p>
                <p className="text-xs text-white/55">Stay somewhere unforgettable.</p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/62">
              Minimal stays, honest details, and places that feel calm instead of overdesigned.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-white/58">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors duration-200 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/12 pt-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/72 transition-colors duration-200 hover:border-white/30 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

            <p className="text-xs text-white/50">© 2026 Driftly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer