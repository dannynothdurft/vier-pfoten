/* 
    File: Footer.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      <div>Firma</div>
      <div>Rechtliches</div>
      <div>Support</div>
      <div>Social</div>
      <div>Test aus dem IPad</div>
    </footer>
  );
};

export default Footer;
