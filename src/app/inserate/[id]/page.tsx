/* 
    File: inserate/[id]/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/singleClassifieds.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { getCurrentClassifieds } from "@/utils/classifieds";

const SingleClassifieds = () => {
  const params = useParams();
  const router = useRouter();
  const [currentClassifieds, setCurrentClassifieds] = useState<any>(undefined);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const gSC = async () => {
        const response = await getCurrentClassifieds(params?.id);

        if (response?.success) {
          if (response.data) {
            setCurrentClassifieds(response.data);
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      };
      gSC();
    }, 1);
    return () => clearTimeout(timeOut);
  }, [params, router]);

  return currentClassifieds ? (
    <div className="single-classifieds-ct">
      <div>
        <Image
          src={
            currentClassifieds.imageFile
              ? currentClassifieds.imageFile
              : "/images/tile-placeholder.png"
          }
          title="Bild"
          alt="Bild"
          width={700}
          height={500}
        />
        <h1>{currentClassifieds.titel}</h1>
        <hr />
        <div>
          <h2>Beschreibung</h2>
          <p>{currentClassifieds.description}</p>
        </div>
      </div>
      <div>
        <h3>{currentClassifieds.username}</h3>
        <p>{currentClassifieds.price} €</p>
        <p>{currentClassifieds.location}</p>
      </div>
    </div>
  ) : (
    "Nein"
  );
};

export default SingleClassifieds;
