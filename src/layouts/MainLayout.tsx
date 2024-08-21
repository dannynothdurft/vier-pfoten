/* 
    File: MainLayout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getUserInfo } from "@/utils/auth";

import setSessionStorage from "@/utils/sessionStorage";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  setSessionStorage({ key: "test", value: "test" });
  return (
    <body>
      <EdgeStoreProvider>
        <Toaster />
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </EdgeStoreProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  );
};

export default MainLayout;
