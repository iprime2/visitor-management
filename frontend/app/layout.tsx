import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import cron from "node-cron";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/providers/Provider";
import FeedbackModal from "@/components/modal/FeedbackModal";
import FileUploadModal from "@/components/modal/FileUploadModal";

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
        <FeedbackModal />
        <FileUploadModal />
        <body className={roboto.className}>{children}</body>
      </Provider>
    </html>
  );
}
