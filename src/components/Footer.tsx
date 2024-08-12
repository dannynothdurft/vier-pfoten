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

import { FaInstagram } from "react-icons/fa";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      <div className="footer-section">
        <h4>Marktplatz</h4>
        <div>
          <Link href={"/"}>FAQ</Link>
        </div>
      </div>
      <div className="footer-section">
        <h4>Service</h4>
        <div>
          <Link href={"/"}>Kontakt</Link>
        </div>
      </div>
      <div className="footer-section">
        <h4>Unternehmen</h4>
        <div>
          <Link href={"/"}>Über Uns</Link>
        </div>
      </div>
      <div className="footer-section">
        <h4>Social-Media</h4>
        <div>
          <Link href={"https://www.instagram.com/tiny_invest/"}>
            <FaInstagram fill="#ffffff" size={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
