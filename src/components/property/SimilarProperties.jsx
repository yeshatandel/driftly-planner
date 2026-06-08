import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button.tsx"
import { formatINR } from "../../lib/currency.js"

export function SimilarProperties({ listings, onPropertySelect }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Similar properties</h2>
        <Button variant="ghost" className="rounded-full">View all <ArrowRight className="ml-2 size-4" /></Button>
      </div>

      <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
        {listings.map((listing) => (
          <button
            key={listing.id}
            type="button"
            onClick={() => onPropertySelect?.(listing)}
            className="group min-w-[17rem] rounded-[1.4rem] border border-white/70 bg-white/72 p-2 text-left shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-white/12 dark:bg-white/6"
          >
            <div className="relative overflow-hidden rounded-[1rem]">
              <img src={listing.image} alt={listing.title} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="p-2">
              <p className="line-clamp-1 text-sm font-semibold text-foreground">{listing.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{listing.location}</p>
              <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{formatINR(listing.price)}</span> / night</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
