import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import cron from "node-cron";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/providers/Provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
      <Provider>
        <Toaster />
        <body className={roboto.className}>{children}</body>
      </Provider>
    </html>
  );
}
