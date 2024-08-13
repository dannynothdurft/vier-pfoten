/* 
    File: datenschutz/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import Datenschutz from "@/pages/Datenschutz";

export const metadata: Metadata = {
  title: "Vier Pfoten - Datenschutz",
  description: "Vier Pfoten - Datenschutz Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, Datenschutz"],
};

export default function DatenschutzPage() {
  return <Datenschutz />;
}
