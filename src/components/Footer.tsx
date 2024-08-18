/* 
    File: Footer.tsx
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

import { FaInstagram } from "react-icons/fa";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-section">
          <h4>Marktplatz</h4>
          <div>
            {Lang.footer.marketplace.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="footer-section">
          <h4>Service</h4>
          <div>
            {Lang.footer.service.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="footer-section">
          <h4>Unternehmen</h4>
          <div>
            {Lang.footer.company.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="footer-section">
          <h4>Social-Media</h4>
          <div>
            {Lang.footer.socialmedia.map((item, index) => {
              return (
                <Link href={item.link} key={index} target="_blank">
                  {item.title === "Instagram" ? (
                    <FaInstagram fill="#ffffff" size={25} />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
