'use server'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Plus } from "lucide-react"

export async function CreateItem() {
      // const response = await fetch('http://localhost:3000/api/manga/asq/web-sites');
      // const data = await response.json();
      // const webSites = data.data;   
  return (
    <Sheet
    >
      <SheetTrigger asChild>
      <Button
              className="flex items-center gap-2"
              size={'sm'}
             
            >
                create new {' '} <Plus size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
      className="w-full flex flex-col gap-4 justify-start items-start"
      >
       {/* <CreateManga webSites={webSites} />*/}
      </SheetContent>
    </Sheet>
  )
}
