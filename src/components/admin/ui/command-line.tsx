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
import React from "react"
import { SunMoon } from "lucide-react"
import { useRouter } from "next/navigation"
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

      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  const router = useRouter()
  const handelRoute = (route: string) => {
    router.push(route)
    setOpen(false)
  }


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
      <div className="text-sm absolute bottom-4 w-96 border rounded-lg px-3 py-2 border-slate-400/60 z-50 left-[23rem] hidden lg:flex justify-between items-center">
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
        open={open} onOpenChange={() => {
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
              className=" group"
              onSelect={() => handelRoute('/dashboard/main')}
            >
              <svg
                className="mr-2 group-hover:text-primary h-4 w-4"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                <path d="M15.0001 17C14.2006 17.6224 13.1504 18 12.0001 18C10.8499 18 9.79965 17.6224 9.00012 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
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
              onSelect={() => handelRoute('/dashboard/settings')}
            >
              <svg
                className="mr-2 group-hover:text-primary h-4 w-4"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                <path d="M16.3083 4.38394C15.7173 4.38394 15.4217 4.38394 15.1525 4.28405C15.1151 4.27017 15.0783 4.25491 15.042 4.23828C14.781 4.11855 14.5721 3.90959 14.1541 3.49167C13.1922 2.52977 12.7113 2.04882 12.1195 2.00447C12.04 1.99851 11.96 1.99851 11.8805 2.00447C11.2887 2.04882 10.8077 2.52977 9.84585 3.49166C9.42793 3.90959 9.21897 4.11855 8.95797 4.23828C8.92172 4.25491 8.88486 4.27017 8.84747 4.28405C8.57825 4.38394 8.28273 4.38394 7.69171 4.38394H7.58269C6.07478 4.38394 5.32083 4.38394 4.85239 4.85239C4.38394 5.32083 4.38394 6.07478 4.38394 7.58269V7.69171C4.38394 8.28273 4.38394 8.57825 4.28405 8.84747C4.27017 8.88486 4.25491 8.92172 4.23828 8.95797C4.11855 9.21897 3.90959 9.42793 3.49166 9.84585C2.52977 10.8077 2.04882 11.2887 2.00447 11.8805C1.99851 11.96 1.99851 12.04 2.00447 12.1195C2.04882 12.7113 2.52977 13.1922 3.49166 14.1541C3.90959 14.5721 4.11855 14.781 4.23828 15.042C4.25491 15.0783 4.27017 15.1151 4.28405 15.1525C4.38394 15.4217 4.38394 15.7173 4.38394 16.3083V16.4173C4.38394 17.9252 4.38394 18.6792 4.85239 19.1476C5.32083 19.6161 6.07478 19.6161 7.58269 19.6161H7.69171C8.28273 19.6161 8.57825 19.6161 8.84747 19.7159C8.88486 19.7298 8.92172 19.7451 8.95797 19.7617C9.21897 19.8815 9.42793 20.0904 9.84585 20.5083C10.8077 21.4702 11.2887 21.9512 11.8805 21.9955C11.96 22.0015 12.04 22.0015 12.1195 21.9955C12.7113 21.9512 13.1922 21.4702 14.1541 20.5083C14.5721 20.0904 14.781 19.8815 15.042 19.7617C15.0783 19.7451 15.1151 19.7298 15.1525 19.7159C15.4217 19.6161 15.7173 19.6161 16.3083 19.6161H16.4173C17.9252 19.6161 18.6792 19.6161 19.1476 19.1476C19.6161 18.6792 19.6161 17.9252 19.6161 16.4173V16.3083C19.6161 15.7173 19.6161 15.4217 19.7159 15.1525C19.7298 15.1151 19.7451 15.0783 19.7617 15.042C19.8815 14.781 20.0904 14.5721 20.5083 14.1541C21.4702 13.1922 21.9512 12.7113 21.9955 12.1195C22.0015 12.04 22.0015 11.96 21.9955 11.8805C21.9512 11.2887 21.4702 10.8077 20.5083 9.84585C20.0904 9.42793 19.8815 9.21897 19.7617 8.95797C19.7451 8.92172 19.7298 8.88486 19.7159 8.84747C19.6161 8.57825 19.6161 8.28273 19.6161 7.69171V7.58269C19.6161 6.07478 19.6161 5.32083 19.1476 4.85239C18.6792 4.38394 17.9252 4.38394 16.4173 4.38394H16.3083Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span
                className="w-full flex justify-between items-center"
              >
                Settings
                <CommandShortcut

                >⌘A
                </CommandShortcut>
              </span>
            </CommandItem>

            <CommandItem
              className=" group mt-2"
              onSelect={() => handelRoute('/dashboard/orders')}
            >
              <svg
                className="mr-2 group-hover:text-primary h-4 w-4"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                <path d="M2 13.4286V8H22V13.4286C22 17.4692 22 19.4895 20.6983 20.7447C19.3965 22 17.3014 22 13.1111 22H10.8889C6.69863 22 4.6035 22 3.30175 20.7447C2 19.4895 2 17.4692 2 13.4286Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 8L2.96154 5.69231C3.70726 3.90257 4.08013 3.0077 4.8359 2.50385C5.59167 2 6.56112 2 8.5 2H15.5C17.4389 2 18.4083 2 19.1641 2.50385C19.9199 3.0077 20.2927 3.90257 21.0385 5.69231L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                className="w-full flex justify-between items-center"
              >
                Orders
                <CommandShortcut>⌘O
                </CommandShortcut>
              </span>
            </CommandItem>
            <CommandItem
              className=" group mt-2"
              onSelect={() => handelRoute('/dashboard/products')}
            >
              <svg
                className="mr-2 group-hover:text-primary h-4 w-4"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                <path d="M5 7.66667C5 7.04669 5 6.73669 5.06815 6.48236C5.25308 5.79218 5.79218 5.25308 6.48236 5.06815C6.73669 5 7.04669 5 7.66667 5H16.3333C16.9533 5 17.2633 5 17.5176 5.06815C18.2078 5.25308 18.7469 5.79218 18.9319 6.48236C19 6.73669 19 7.04669 19 7.66667C19 8.90663 19 9.52661 18.8637 10.0353C18.4938 11.4156 17.4156 12.4938 16.0353 12.8637C15.5266 13 14.9066 13 13.6667 13H10.3333C9.09337 13 8.47339 13 7.96472 12.8637C6.58436 12.4938 5.50617 11.4156 5.1363 10.0353C5 9.52661 5 8.90663 5 7.66667Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 11C18.3716 11.5839 18.5574 11.8759 18.689 12.1897C18.8062 12.4694 18.8913 12.7615 18.9425 13.0604C19 13.3959 19 13.7419 19 14.4341V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V14.4341C5 13.7419 5 13.3959 5.0575 13.0604C5.10874 12.7615 5.1938 12.4694 5.31105 12.1897C5.44263 11.8759 5.62842 11.5839 6 11" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 20C4.32352 20 3.98528 20 3.70219 19.922C3.08287 19.7512 2.58068 19.3162 2.34157 18.7433C2.23227 18.4815 2.19862 18.1593 2.1313 17.515L2.06691 16.8986C1.98995 16.1619 1.95147 15.7936 2.1089 15.5209C2.46075 14.9115 3.25125 15.0052 3.85704 15.0052H5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M19 20C19.6765 20 20.0147 20 20.2978 19.9219C20.9171 19.751 21.4193 19.3155 21.6584 18.742C21.7677 18.4799 21.8014 18.1574 21.8687 17.5124L21.9331 16.8954C21.9955 16.2975 22.1529 15.5626 21.5709 15.1773C21.3031 15 20.9164 15 20.143 15H19" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 14.5L9 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 14.5L15 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span
                className="w-full flex justify-between items-center"
              >
                Products
                <CommandShortcut>⌘P
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
            <CommandItem
              className=" group mt-2 flex gap-2 justify-between items-center"
              onSelect={() => {
                router.back()
                setOpen(false)
              }}
            >
              <svg
              className="mr-2 group-hover:text-primary h-4 w-4"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}  fill={"none"}>
                <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="w-full flex justify-between items-center"
              >
                Back
                <CommandShortcut>⌘B
                </CommandShortcut>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
