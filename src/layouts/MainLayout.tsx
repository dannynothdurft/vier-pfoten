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
import { useSelector } from "react-redux";
import { EdgeStoreProvider } from "@/lib/edgestore";

import ClassfieldsForm from "@/components/ClassifiedsForm";
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

  const { classfield } = useSelector((state: any) => state.classfield);

  return (
    <body>
      <EdgeStoreProvider>
        <Toaster />
        {classfield ? <ClassfieldsForm /> : null}
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
