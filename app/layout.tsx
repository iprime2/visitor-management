import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cron from "node-cron";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/providers/Provider";
import FeedbackModal from "@/components/modal/FeedbackModal";
import { updateOutTime } from "@/lib/updateOutTimeCornJob";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visitor Management",
  description: "This is a visitor management application",
};

cron.schedule("*/5 * * * *", () => {
  updateOutTime();
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <Toaster />
        <FeedbackModal />
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
