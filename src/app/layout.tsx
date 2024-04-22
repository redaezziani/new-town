import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { EdgeStoreProvider } from "@/lib/edgestore";
const roboto = Inter({
  subsets: ['latin'],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Zunder - a better way to manage your store",
  description: "track your orders and manage your store"
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}  min-h-screen    w-full   flex justify-start items-center flex-col relative gap-2 `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
           <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Toaster />
         
        </ThemeProvider>
      </body>
    </html>
  );
}
