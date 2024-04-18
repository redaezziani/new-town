"use client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import React, { useEffect } from "react"
import { Bot, Fingerprint, LayoutDashboard, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const [themes, setThemes] = React.useState("light")
  const [search, setSearch] = React.useState("")
  const { setTheme } = useTheme()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])




  const handleTheme = () => {
    if (themes === "light") {
      setThemes("dark")
      setTheme("dark")
    } else {
      setThemes("light")
      setTheme("light")
    };
  }
  return (
    <div>
      <div className="text-sm absolute bottom-4 w-96 border rounded px-3 py-2 border-slate-300/40 z-50 left-96 flex justify-between items-center">
        <input
          value={search}
          onChange={() => setOpen(true)}
          placeholder="Search..."
          className="w-full  focus:outline-none bg-transparent text-slate-900 dark:text-slate-50"
        />
        <svg
        onClick={() => setOpen(true)}
        className="cursor-pointer text-slate-300 "
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
      </div>
      <CommandDialog
        open={open} onOpenChange={()=>{
          if (open) {
            setSearch("")
          }
          setOpen(!open)
        }

        }>
        <CommandInput
          placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            className=" mt-2"
            heading="Suggestions">
            <CommandItem
              className=" group mt-2"
            >
              <Fingerprint className="mr-2 group-hover:text-primary h-2 w-2" />
              <span
                className="w-full flex justify-between items-center"
              >
                Auth
                <CommandShortcut>⌘A
                </CommandShortcut>
              </span>
            </CommandItem>
            <CommandItem
              className=" group"
            >
              <LayoutDashboard className="mr-2 group-hover:text-primary h-2 w-2" />
              <span
                className="w-full flex justify-between items-center"
              >
                Dashboard
                <CommandShortcut>⌘D
                </CommandShortcut>
              </span>
            </CommandItem>
            <CommandItem
              className=" group mt-2"
            >
              <Bot className="mr-2 group-hover:text-primary h-4 w-4" />
              <span
                className="w-full flex justify-between items-center"
              >
                Chat Bot
                <CommandShortcut>⌘B
                </CommandShortcut>
              </span>
            </CommandItem>
            <CommandItem
              className=" group mt-2"
              onSelect={handleTheme}
            >
              <SunMoon className="mr-2 group-hover:text-primary h-4 w-4" />
              <span
                className="w-full flex justify-between items-center"
              >
                Theme
                <CommandShortcut>⌘T
                </CommandShortcut>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
