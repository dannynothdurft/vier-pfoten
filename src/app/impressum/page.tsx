/* 
    File: impressum/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json"
import React from "react";

export default function ImpressumPage() {
  return (
    <>
        <h1>Impressum</h1>
        <p><strong>{Config.company}</strong></p>
        <p>Geschäftsführer: {Config.ceo}</p>
        <p>{Config.street}<br />
        {Config.zip} {Config.city}</p>

        <p>Telefon: <a href={Config.telCode}>{Config.tel}</a><br />
        E-Mail: <a href={`mailto:${Config.mail}`}>{Config.mail}</a></p>

        <h2>Streitbeilegung</h2>
        <p>Wir sind bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </>
  );
}
