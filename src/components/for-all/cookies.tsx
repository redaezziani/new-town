'use client'
import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import useCookiesStore from "@/stores/cookies/store"
const Cookies = () => {
    const cookies = useCookiesStore((state) => state.cookies)
    const [isOpen, setIsOpen] = useState(false)
    const { updateCookies } = useCookiesStore()
    useEffect(() => {
        if (cookies === null) {
            setIsOpen(true)
        }
    }
    , [cookies])
    return (
        <AlertDialog
        open={isOpen}
        >
            <AlertDialogContent
            className="  p-4  md:mt-[21rem] md:-ml-[43rem] bg-[#d4d5f808] backdrop-blur-md   border-gray-300/45 rounded-2xl"
            >

                    <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>

                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">We use C to ensure that we give you the best experience on our website. <a href="#" className="text-blue-500 hover:underline">Read C policies</a>. </p>

                    <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
                        <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
                            Manage your preferences
                        </button>

                        <div className="flex gap-2">
                       
                        <button
                        onClick={() => {
                            updateCookies(false)
                            setIsOpen(false)
                        }
                        }
                        className=" text-xs bg-red-600 font-medium rounded-lg hover:bg-red-600/90 text-slate-50 px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                            Decline
                        </button>
                        <button
                        onClick={() => {
                            updateCookies(true)
                            setIsOpen(false)
                        }
                        }
                        className=" text-xs bg-gray-50 font-medium rounded-lg hover:bg-gray-50/90 text-slate-900 px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                            Accept
                        </button>
                        </div>

                    </div>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Cookies