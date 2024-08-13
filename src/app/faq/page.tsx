/* 
    File: faq/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import type { Metadata } from "next";

import FAQ from "@/pages/FAQ";

export const metadata: Metadata = {
  title: "Vier Pfoten - FAQ",
  description: "Vier Pfoten - FAQ Seite",
  robots: "index,follow",
  keywords: ["Vier Pfoten, Danny Nothdurft, Tier Markplatz, FAQ"],
};

export default function FAQPage() {
  return <FAQ />;
}
