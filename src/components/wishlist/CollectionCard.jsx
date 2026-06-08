import { motion } from "framer-motion"

export function CollectionCard({ collection, index, active, onSelect }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(collection.name)}
      className="group relative h-44 min-w-[16rem] overflow-hidden rounded-3xl border border-white/70 text-left shadow-[0_20px_56px_rgba(15,23,42,0.1)] transition-all duration-300 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/12 sm:min-w-[18rem]"
    >
      <img src={collection.image} alt={collection.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-xl">
        <p className="text-sm font-medium text-white">{collection.name}</p>
        <p className="text-xs text-white/80">{collection.count} properties</p>
      </div>
      {active && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-900">Active</span>}
    </motion.button>
  )
}
