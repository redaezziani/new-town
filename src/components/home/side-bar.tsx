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
import Link from "next/link"

export function SideBar() {
  return (
    <Sheet
    >
      <SheetTrigger asChild>
         <div className="flex gap-3 justify-start items-center">
         <Link href="/auth/signin">
           <Button
            className=" bg-slate-900 hover:bg-slate-900/90 px-8 text-slate-50"
            >
            Sign in
          </Button>
          </Link>
          <div className="w-fit p-2 rounded-md border border-slate-300/60">
       <Menu
       className="w-6 h-6 text-slate-900 dark:text-slate-50"
       />
       </div>
        </div>
       
      </SheetTrigger>
      <SheetContent
      side={'left'}
      >
        
      </SheetContent>
    </Sheet>
  )
}
