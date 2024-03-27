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
          <svg
          className="w-10 h-10 text-primary dark:text-primary-dark"
          height="512px" id="Layer_1" version="1.1"
          viewBox="0 0 512 512" width="512px">
            <g><g><polygon  fill="#2563eb" points="290.4,145 227,96 290.6,198.2   "/></g><g><path fill="#2563eb" d="M329,96v79.6V259h-36.4l-63.2-98.6l1.7,98.6H191V152l-37.3-29.3c1,1.2,2,2.4,2.9,3.7c10,13.9,15,30.5,15,50.5    c0,49.2-30.6,82.1-76.9,82.1H32v0.4L231.6,416H480V214.1L329,96z"/></g><g><path fill="#2563eb" d="M129.9,178.1c0-29-14.2-45.1-39.7-45.1H71v89h19C116,222,129.9,206.6,129.9,178.1z"/></g></g></svg>
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
