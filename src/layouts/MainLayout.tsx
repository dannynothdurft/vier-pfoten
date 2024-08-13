/* 
    File: MainLayout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode, useEffect } from "react";

import { Toaster } from "react-hot-toast";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getUserInfo } from "@/utils/auth";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <body>
      <Toaster />
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
    </body>
  );
};

export default MainLayout;
