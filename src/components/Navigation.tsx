/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import Lang from "@/lang/de.json";

import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaPlus, FaSearch } from "react-icons/fa";

import UserModal from "./UserModal";
import ClassfieldsForm from "./ClassifiedsForm";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const [userModal, setUserModal] = useState(false);
  const [classfield, setClassfield] = useState(false);

  const toggleUserModal = () => {
    setUserModal(!userModal);
  };

  const toggleClassfield = () => {
    setClassfield(!classfield);
  };

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
          onClick={toggleUserModal}
          data-ref="modalRef"
        >
          <Image
            src={"/logos/icon.svg"}
            alt="Hunde Icon"
            title="Hunde Icon"
            width={35}
            height={35}
            data-ref="modalRef"
          />
        </button>
        <button className="btn" onClick={toggleClassfield}>
          <FaPlus /> {Lang.navigation.btnPlus}
        </button>
        <Link href={"/inserate"} className="btn secondary">
          {Lang.navigation.btnAll}
        </Link>
      </div>
      {userModal ? <UserModal toggleUserModal={toggleUserModal} /> : null}
      {classfield ? <ClassfieldsForm /> : null}
    </div>
  );
};

export default Navigation;
