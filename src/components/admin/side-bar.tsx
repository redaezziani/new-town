import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SideMenu from "./side-menu"

export function SideBar() {
  return (
    <Sheet
    >
      <SheetTrigger asChild>
       <div className="w-fit p-2 rounded-md border border-slate-300/60">
       <Menu />
       </div>
      </SheetTrigger>
      <SheetContent
      side={'right'}
      >
        <SideMenu/>
      </SheetContent>
    </Sheet>
  )
}
