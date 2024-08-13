/* 
    File: layout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import "@/styles/globals.scss";
import type { Metadata, Viewport } from "next";

import Redux from "@/lib/redux";

import MainLayout from "@/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Vier Pfoten",
  description: "Dein Marktplatz für dein nächsten Haustier",
  robots: "index,follow",
  manifest: "/manifest.json",
  authors: [{ name: "Danny Nothdurft" }],
  creator: "Danny Nothdurft",
  publisher: "Danny Nothdurft",
  generator: "Danny Nothdurft",
  applicationName: "Vier Pfoten",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz"],
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/android-chrome-512.png",
    apple: "/favicons/apple-touch-icon.png",
    other: {
      rel: "/favicons/android-chrome-512.png",
      url: "/favicons/android-chrome-512.png",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <Redux>
        <MainLayout>{children}</MainLayout>
      </Redux>
    </html>
  );
}
