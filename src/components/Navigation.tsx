/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import Lang from "@/lang/de.json"

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LuDog } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <div className="vp-navigation">
      <Link href={"/"} title="Zur Startseite" className="logo-link">
        <Image
          src={Config.logo}
          alt="Logo Dog"
          width={50}
          height={50}
        />
        <span>{Config.company}</span>
      </Link>
      <input placeholder={Lang.navigation.searchInput} />
      <div className="vp-nav-cta">
        <button className="vp-user-button">
          <LuDog size={30} />
        </button>
        <button className="btn">
          <FaPlus /> {Lang.navigation.btnPlus}
        </button>
        <button className="btn secondary">{Lang.navigation.btnAll}</button>
      </div>
    </div>
  );
};

export default Navigation;
