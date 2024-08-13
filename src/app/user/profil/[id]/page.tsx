/* 
    File: user/profil/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import getUserProfile from "@/utils/getUserProfile";

type UserProfile = {
  username: string;
  email: string;
  createdAt: string;
  advertisements?: Array<string>;
};

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      const getUserProfil = async () => {
        const response = await getUserProfile(params?.id);
        if (response?.success) {
          setProfile(response.data);
        } else {
          router.push("/");
          toast.error("Leider kein Profil gefunden");
        }
      };
      getUserProfil();
    }, 1);
    return () => clearTimeout(timer);
  }, [params?.id, router]);

  return <div>{profile?.username || "Läuft"}</div>;
};

export default ProfilePage;
