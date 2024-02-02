import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visitor Management",
  description: "This is a visitor management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={inter.className}>
        <div className="flex w-full h-screen">
          <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
            <Sidebar />
          </div>
          <main className="w-full md:pl-60">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
