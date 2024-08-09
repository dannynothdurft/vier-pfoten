/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <div className="vp-navigation">
      <Link href={"/"} title="Zur Startseite" className="logo-link">
        <Image
          src={"/logos/logo_dog.svg"}
          alt="Logo Dog"
          width={50}
          height={50}
        />
        <span>Vier Pfoten</span>
      </Link>
      <input placeholder="Suche" />
      <div className="vp-nav-cta">
        <button>User</button>
        <button>Anzeige Aufgeben</button>
        <button>Alle Anzeigen</button>
      </div>
    </div>
  );
};

export default Navigation;
