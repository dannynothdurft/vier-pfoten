/* 
    File: agb/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import AGB from "@/pages/AGB";

export const metadata: Metadata = {
  title: "Vier Pfoten - AGB",
  description: "Vier Pfoten - AGB Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, AGB"],
};

export default function AGBPage() {
  return <AGB />;
}
