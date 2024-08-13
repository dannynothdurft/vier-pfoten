/* 
    File: impressum/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import Impressum from "@/pages/Impressum";

export const metadata: Metadata = {
  title: "Vier Pfoten - Impressum",
  description: "Vier Pfoten - Impressum Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, Impressum"],
};

export default function ImpressumPage() {
  return <Impressum />;
}
