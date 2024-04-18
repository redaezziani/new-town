import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react";
const roboto = Roboto({
  subsets: ['latin'],
  weight: "400"
});

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
    
      <div className={`${roboto.className}  min-h-screen    w-full   flex justify-start items-center flex-col relative gap-2 `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
          <Toaster />
        </ThemeProvider>
      </div>
  );
}
