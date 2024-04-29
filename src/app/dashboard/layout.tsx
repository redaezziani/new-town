import { PathLine } from "@/components/admin/path-line";
import SearchBar from "@/components/admin/search-bar";
import { SideBar } from "@/components/admin/side-bar";
import SideMenu from "@/components/admin/side-menu";
import { ModeToggle } from "@/components/ui/mode";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link";

export const metadata: Metadata = {
  title: "zunder",
  description: "track your orders and manage your store"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` h-screen  relative w-full grid grid-cols-11 overflow-x-hidden  `}>
        <div className="w-full  top-0 z-50  sticky bg-slate-50/50 dark:bg-slate-800/30 border border-slate-300/60 dark:border-slate-300/25 border-fix border-l  left-0 col-span-2 h-full hidden lg:flex justify-start items-start gap-3 flex-col ">
          <div className="w-full px-5 flex z-50 relative justify-between items-center h-20">
          <Link
          href={"/"}
          className="flex justify-start items-center gap-2">
            <svg 
              className="text-slate-900 dark:text-slate-50"
            width="40" height="40" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.32961 43.2093C0 56.0745 0 72.3843 0 105.004C0 137.623 0 153.933 5.32961 166.798C12.4341 183.948 26.0596 197.574 43.2093 204.678C56.0745 210.008 72.3843 210.008 105.004 210.008C137.623 210.008 153.933 210.008 166.798 204.678C183.948 197.574 197.574 183.948 204.678 166.798C209.454 155.269 209.95 140.974 210.002 114.653H131.113L89.679 172.547L97.6252 114.653H59.0292L114.653 37.4608L107.274 94.2197H209.999C209.935 68.6209 209.385 54.5717 204.678 43.2093C197.574 26.0596 183.948 12.4341 166.798 5.32961C153.933 0 137.623 0 105.004 0C72.3843 0 56.0745 0 43.2093 5.32961C26.0596 12.4341 12.4341 26.0596 5.32961 43.2093Z"
                fill="currentColor"
              />
            </svg>
          <h2
          className=" font-bold"
          >
           Zunder 
          </h2>
          </Link>
            <ModeToggle/>
          </div>
          <SideMenu />
        </div>
      <div className="w-full overflow-hidden h-fit  min-h-screen flex relative justify-start items-start gap-3 flex-col col-span-11 lg:col-span-9 ">
      <div className=" absolute ">
        <Toaster />
      </div>
        <SearchBar />
        <PathLine />
        {children}
      </div>
      <div className=" flex z-50 lg:hidden fixed right-4 top-3">
      <SideBar />
      </div>
    </div>
  );
}
