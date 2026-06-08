import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function ReviewCard({ review, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
      className="h-full rounded-[1.4rem] border border-white/75 bg-white/78 p-5 shadow-[0_18px_52px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/12 dark:bg-white/7"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={review.avatar} alt={review.name} className="size-11 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/12" />
          <div>
            <p className="text-sm font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.country}</p>
          </div>
        </div>
        <p className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {review.rating}
        </p>
      </div>

      <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-7 text-muted-foreground dark:border-white/12">{review.text}</p>
    </motion.article>
  )
}
