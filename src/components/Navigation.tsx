/* 
    File: Navigation.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import Lang from "@/lang/de.json";

import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

import { FaPlus, FaSearch } from "react-icons/fa";

import UserModal from "./UserModal";

import Logo from "@/utils/svg/Logo";
import { HamburgerButton } from "./HamburgerButton";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const mobileMenu = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [userModal, setUserModal] = useState(false);

  // useState und ArrowFunktion für HamburgerMenu
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHMBTM = useCallback(() => {
    setToggle((prevToogle) => !prevToogle);
  }, []);

  const toggleUserModal = useCallback(() => {
    setUserModal((prevToogle) => !prevToogle);
  }, []);

  // auto close mobile menu und User Modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as HTMLElement;
      const dataRefValue = clickedNode.getAttribute("data-ref");

      if (dataRefValue === "modalRef" || dataRefValue === "mobileMenu") {
        if (dataRefValue === "mobileMenu") {
          setUserModal(false);
        }
        return;
      }

      if (
        mobileMenu.current &&
        !mobileMenu.current.contains(event.target as Node)
      ) {
        toggleHMBTM();
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleUserModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleHMBTM, toggleUserModal]);

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
              <Logo width="40" height="40" Dref="modalRef" />
            </button>
            <Link href={"/inserate/neu"} className="btn" onClick={toggleHMBTM}>
              <FaPlus /> {Lang.navigation.btnPlus}
            </Link>
            <Link
              href={"/inserate"}
              className="btn secondary"
              onClick={toggleHMBTM}
            >
              {Lang.navigation.btnAll}
            </Link>
          </div>
        </div>
      ) : (
        <div className="dektop-menu">
          <div className="vp-search">
            <FaSearch className="vp-search-icon" />
            <input
              placeholder={Lang.navigation.searchInput}
              type="search"
              className="vp-search-input-field"
            ></input>
          </div>
          <div className="vp-nav-cta">
            <Link href={"/inserate/neu"} className="btn">
              <FaPlus /> {Lang.navigation.btnPlus}
            </Link>
            <Link href={"/inserate"} className="btn secondary">
              {Lang.navigation.btnAll}
            </Link>
          </div>
          <button
            className="vp-user-button"
            onClick={toggleUserModal}
            data-ref="modalRef"
          >
            <Logo Dref="modalRef" />
          </button>
        </div>
      )}

      {userModal ? (
        <UserModal toggleUserModal={toggleUserModal} modalRef={modalRef} />
      ) : null}
    </div>
  );
};

export default Navigation;
