/* 
    File: MainLayout.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode, useEffect } from "react";
import axios from "axios";

import Redux from "@/lib/redux";
import { useDispatch } from "react-redux";
import { incrementUser } from "@/lib/redux/reducer/user";
import currentUrl from "@/lib/currentUrl";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("user");
        console.log(token);
        const response = await axios.post(`${currentUrl()}/api/auth/get-user`, {
          headers: { Authorization: token },
        });
        if (response.data.success) {
          dispatch(incrementUser(response.data.data));
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
    <Redux>
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </Redux>
  );
};

export default MainLayout;
