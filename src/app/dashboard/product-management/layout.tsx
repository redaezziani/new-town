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
    <div className={`w-full  mt-4 flex px-4 min-h-screen bg-muted  relative justify-start items-start gap-6 flex-col`}>
      {children}
    </div>
  );
}
