import type { Metadata } from "next";
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
    <div className={`w-full  mt-4 flex px-4 h-fit overflow-hidden min-h-screen   relative justify-start items-start gap-6 flex-col`}>
      {children}
    </div>
  );
}
