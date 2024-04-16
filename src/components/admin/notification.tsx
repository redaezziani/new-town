'use client';
import { Bell } from "lucide-react"

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AnimatePresence } from "framer-motion";
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

export function NotificationCard() {
   
    const [open, setOpen] = React.useState(false);
    const toggle = () => {
        setOpen(!open);
}
  return (
    <Sheet
    >
      <SheetTrigger asChild>
      <div className="flex border h-10 w-10 border-slate-300/30 rounded-full  relative justify-center items-center flex-col gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
    <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
      </div>
      </SheetTrigger>
      <SheetContent
      className="w-full flex mt-4 flex-col gap-4 justify-start items-start"
      >
        
        <AnimatePresence>
           
            </AnimatePresence>
      </SheetContent>
    </Sheet>

  )
}
