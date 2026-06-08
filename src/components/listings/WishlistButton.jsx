import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

import { cn } from "../../lib/utils.js"

export function WishlistButton() {
  const [liked, setLiked] = useState(false)

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setLiked((current) => !current)}
      aria-label="Save listing"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/88 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-colors",
        liked && "text-rose-500"
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
    </motion.button>
  )
}
