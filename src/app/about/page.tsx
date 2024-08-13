/* 
    File: about/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import About from "@/pages/About";

export const metadata: Metadata = {
  title: "Vier Pfoten - Über Uns",
  description: "Vier Pfoten - Über Uns Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, Über Uns, About"],
};

export default function AboutPage() {
  return <About />;
}
