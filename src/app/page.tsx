/* 
    File: page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Lang from "@/lang/de.json"
import React from "react";

export default function Home() {
  return (
    <>
      <section className="vp-home-header">
        <h1>{Lang.homepage.titel}</h1>
      </section>
    </>
  );
}
