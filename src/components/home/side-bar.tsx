
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
         <div className="flex gap-3 justify-start items-center">
         <Link href="/auth/signin">
              <button
                className=" hover:scale-105 group bg-[#d4d5f813] text-slate-50 border border-slate-300/20 px-4 py-2 rounded-full backdrop-blur-sm flex justify-center items-center gap-1"
              >
                <p>
                  تسجيل الدخول
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                  <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
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
