/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import Lang from "@/lang/de.json";

import React, { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toogleClassfield } from "@/lib/redux/reducer/classfield";

import UserModal from "./UserModal";

import Logo from "@/utils/svg/Logo";
import { HamburgerButton } from "./HamburgerButton";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const mobileMenu = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { classfield } = useSelector((state: any) => state.classfield);
  const [userModal, setUserModal] = useState(false);

  // useState und ArrowFunktion für HamburgerMenu
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHMBTM = () => {
    setToggle(!toggle);
  };

  const toggleUserModal = () => {
    setUserModal(!userModal);
  };

  const switchClassfield = () => {
    dispatch(toogleClassfield(classfield));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as HTMLElement;

      const dataRefValue = clickedNode.getAttribute("data-ref");
      console.log(dataRefValue);
      if (dataRefValue === "mobileMenu") {
        return;
      }

      if (
        mobileMenu.current &&
        !mobileMenu.current.contains(event.target as Node)
      ) {
        toggleHMBTM();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleHMBTM]);

  return (
    <div className="vp-navigation">
      <Link href={"/"} title="Zur Startseite" className="logo-link">
        <Logo width="28" height="28" />
        <span>{Config.company}</span>
      </Link>
      <HamburgerButton
        onClick={toggleHMBTM}
        toggle={toggle}
        Dref="mobileMenu"
      />
      {toggle ? (
        <div className="mobile-menu" ref={mobileMenu}>
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
              <Logo width="40" height="40" data-ref="modalRef" />
            </button>
            <button className="btn" onClick={switchClassfield} data-ref="cfRef">
              <FaPlus data-ref="cfRef" /> {Lang.navigation.btnPlus}
            </button>
            <Link href={"/inserate"} className="btn secondary">
              {Lang.navigation.btnAll}
            </Link>
          </div>
        </div>
      ) : null}
      {/* <div className="vp-search">
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
        <button className="btn" onClick={switchClassfield} data-ref="cfRef">
          <FaPlus data-ref="cfRef" /> {Lang.navigation.btnPlus}
        </button>
        <Link href={"/inserate"} className="btn secondary">
          {Lang.navigation.btnAll}
        </Link>
      </div>
      {userModal ? <UserModal toggleUserModal={toggleUserModal} /> : null} */}
    </div>
  );
};

export default Navigation;
