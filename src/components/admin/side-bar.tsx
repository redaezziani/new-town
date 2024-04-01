import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
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
      side={'left'}
      >
        <SideMenu/>
      </SheetContent>
    </Sheet>
  )
}
