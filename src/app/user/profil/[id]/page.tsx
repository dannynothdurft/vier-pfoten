/* 
    File: user/profil/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/profile.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { FaLocationDot, FaGlobe } from "react-icons/fa6";

import getUserProfile from "@/utils/getUserProfile";
import { getUserClassifieds } from "@/utils/classifieds";
import Tile from "@/components/Tile";

type UserProfile = {
  username: string;
  email: string;
  createdAt: string;
  advertisements?: Array<string>;
  city?: string;
  webseite?: string;
  headerImage?: string;
  profileImage?: string;
};

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [uClassifieds, setUClassifieds] = useState<any>(undefined);

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

  useEffect(() => {
    if (profile?.advertisements && profile?.advertisements?.length > 0) {
      const guc = async () => {
        const userClassifieds = await getUserClassifieds(
          profile?.advertisements
        );
        setUClassifieds(userClassifieds);
      };
      guc();
    }
  }, [profile?.advertisements]);

  console.log(uClassifieds);

  return profile ? (
    <div className="profile-page-ct">
      <div className="profile-header-wrapper">
        <Image
          className="profile-header-image"
          src={"/images/vier-pfoten-header.jpg"}
          title="Placeholder"
          alt="Placeholder"
          width={1200}
          height={300}
        />
      </div>
      <div className="profile-body">
        <div className="profile-info-ct">
          <Image
            className="profile-image"
            src={"/images/vier-pfoten-header.jpg"}
            title="Placeholder"
            alt="Placeholder"
            width={100}
            height={100}
          />
          <h2>{profile?.username}</h2>
          <hr />
          <h4>Information</h4>
          <div>
            <ul>
              <li>
                <FaGlobe />{" "}
                {profile?.webseite && profile?.webseite
                  ? profile?.webseite
                  : "Deine Webseite"}
              </li>
              <li>
                <FaLocationDot />{" "}
                {profile?.city && profile?.city ? profile?.city : "Deine Stadt"}
              </li>
              <li></li>
              <li>
                Mitglied seit:{" "}
                <span className="profile-date">
                  {profile &&
                    new Date(profile?.createdAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-content-ct">
          <div className="content-classifieds-ct">
            <h3>Aktuelle Anzeigen</h3>
            <section className="vp-advertisement-tiles">
              {uClassifieds ? (
                uClassifieds.map((item: any, index: any) => {
                  return <Tile key={index} classifieds={item} />;
                })
              ) : (
                <p>Es sind keine Anzeigen veröffentlicht</p>
              )}
            </section>
          </div>
          <div className="content-classifieds-ct">Weis noch nicht</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="profile-page-ct">
      <div className="profile-header-wrapper">
        <Image
          className="profile-header-image"
          src={"/images/vier-pfoten-header.jpg"}
          title="Placeholder"
          alt="Placeholder"
          width={1200}
          height={300}
        />
      </div>
      <div className="profile-body">
        <div className="profile-info-ct nocontent">
          <Image
            className="profile-image"
            src={"/images/vier-pfoten-header.jpg"}
            title="Placeholder"
            alt="Placeholder"
            width={100}
            height={100}
          />
        </div>
        <div className="profile-content-ct nocontent"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
