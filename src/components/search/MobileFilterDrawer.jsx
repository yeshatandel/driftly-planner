import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet.tsx"
import { Button } from "../ui/button.tsx"

export function MobileFilterDrawer({ children }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full px-4 py-2">Filters</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-[2rem] border-white/12 bg-background/96 backdrop-blur-2xl">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4 p-4">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
