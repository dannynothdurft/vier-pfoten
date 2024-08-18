/* 
    File: components/HamburgerButton.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, Ref } from "react";

interface HamburgerButtonProps {
  toggle: boolean;
  onClick: () => void;
  Dref?: string;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({
  toggle,
  onClick,
  Dref,
}) => {
  return (
    <div className="hamburger-menu-btn" onClick={onClick} data-ref={Dref}>
      <div
        className={`hamburger-menu-line topline ${toggle ? "active" : ""}`}
        data-ref={Dref}
      ></div>
      <div
        className={`hamburger-menu-line middleline ${toggle ? "active" : ""}`}
        data-ref={Dref}
      ></div>
      <div
        data-ref={Dref}
        className={`hamburger-menu-line bottomline ${toggle ? "active" : ""}`}
      ></div>
    </div>
  );
};
