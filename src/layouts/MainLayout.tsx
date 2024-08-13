/* 
    File: MainLayout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode, useEffect } from "react";
import axios from "axios";

import currentUrl from "@/lib/currentUrl";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("user");
        console.log(token);
        const response = await axios.post(`${currentUrl()}/api/auth/get-user`, {
          headers: { Authorization: token },
        });
        if (response.data.success) {
          console.log(response.data.data);
          return response.data.data;
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error(error);
      }
    }, 1);
    return () => clearTimeout(timer);
  }, []);

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
