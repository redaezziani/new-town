import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zunder - a better way to manage your store",
  description: "delivery page"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`w-full  mt-4 flex px-4 h-fit overflow-hidden min-h-screen   relative justify-start items-start gap-6 flex-col`}>
       <div className="flex absolute">
      <Toaster />
      </div>
      {children}
    </div>
  );
}
