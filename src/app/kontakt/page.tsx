/* 
    File: kontakt/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import Contact from "@/pages/Kontakt";

export const metadata: Metadata = {
  title: "Vier Pfoten - Kontakt",
  description: "Vier Pfoten - Kontakt Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, Kontakt"],
};

export default function ContactPage() {
  return <Contact />;
}
