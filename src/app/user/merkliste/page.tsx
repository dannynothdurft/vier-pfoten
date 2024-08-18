/* 
    File: user/merkliste/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

const MerklistePage = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const getUserProfil = async () => {
  //       const response = await getUserWatchlist(params?.id);
  //       if (response?.success) {
  //         setProfile(response.data);
  //       } else {
  //         router.push("/");
  //         toast.error("Leider kein Profil gefunden");
  //       }
  //     };
  //     getUserProfil();
  //   }, 1);
  //   return () => clearTimeout(timer);
  // }, [user, router]);

  return user && user?.watchList && user?.watchList > 0 ? (
    "JA"
  ) : (
    <div>Deine Merkliste ist leer</div>
  );
};

export default MerklistePage;
