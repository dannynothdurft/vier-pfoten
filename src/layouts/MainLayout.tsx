/* 
    File: MainLayout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <body>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
    </body>
  );
};

export default MainLayout;
