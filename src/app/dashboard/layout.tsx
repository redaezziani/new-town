import { PathLine } from "@/components/admin/path-line";
import SearchBar from "@/components/admin/search-bar";
import { SideBar } from "@/components/admin/side-bar";
import SideMenu from "@/components/admin/side-menu";
import { ModeToggle } from "@/components/ui/mode";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce-Store",
  description: "Next js E-commerce store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-screen relative w-full grid grid-cols-9 overflow-x-hidden  `}>
        <div className="w-full px-5 z-50  sticky border border-slate-300/60 dark:border-slate-300/25 border-fix border-l  top-0 left-0 col-span-2 h-screen hidden lg:flex justify-start items-start gap-3 flex-col ">
          <div className="w-full flex z-50 relative justify-between items-center h-20">
            <div className="flex justify-start items-center gap-2">
          <img src="/logo/my-brand.png" alt="logo" className="w-16 aspect-square h-auto object-cover"/>
          <h2
          className="bg-gradient-to-t text-3xl font-bold from-red-600 via-red-500 to-red-600 inline-block text-transparent bg-clip-text"
          >
           Squid 
          </h2>
            </div>
            <ModeToggle/>
          </div>
          <SideMenu />
        </div>
      <div className="w-full bg-muted min-h-screen flex relative justify-start items-start gap-3 flex-col col-span-9 lg:col-span-7 ">
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
