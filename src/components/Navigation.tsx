/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import Lang from "@/lang/de.json";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LuDog } from "react-icons/lu";
import { FaPlus, FaSearch } from "react-icons/fa";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <div className="vp-navigation">
      <Link href={"/"} title="Zur Startseite" className="logo-link">
        <Image src={Config.logo} alt="Logo Dog" width={50} height={50} />
        <span>{Config.company}</span>
      </Link>
      <div className="vp-search">
        <FaSearch className="vp-search-icon" />
        <input
          placeholder={Lang.navigation.searchInput}
          type="search"
          className="vp-search-input-field"
        ></input>
      </div>
      <div className="vp-nav-cta">
        <button
          className="vp-user-button"
          onClick={() =>
            alert(
              "Hier ein Modal für den User, wenn nicht eingelogt kommt hier erstmal ein Modal für die Registrierung und das Login"
            )
          }
        >
          <LuDog size={30} />
        </button>
        <button
          className="btn"
          onClick={() =>
            alert(
              "Hier kommt ein Modal oder eine Seite um eine Anzeige zu inserieren"
            )
          }
        >
          <FaPlus /> {Lang.navigation.btnPlus}
        </button>
        <Link href={"/inserate"} className="btn secondary">
          {Lang.navigation.btnAll}
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
