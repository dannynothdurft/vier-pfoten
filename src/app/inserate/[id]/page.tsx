/* 
    File: inserate/[id]/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/singleClassifieds.scss";
import ConfigClassifields from "@/config/classifields.json";
import React, { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useSelector } from "react-redux";

import { getCurrentClassifieds } from "@/utils/classifieds";
import ChatModal from "@/components/ChatModal";

const SingleClassifieds = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const [currentClassifieds, setCurrentClassifieds] = useState<any>(undefined);
  const [openMsg, setOpenMsg] = useState(false);

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

  const findTitleById = (id: string) => {
    for (const feature of ConfigClassifields.specialFeatures) {
      const input = feature.inputs.find((i) => i.id === id[0]);
      if (input) {
        return input.output;
      }
    }
    return "Unbekannt";
  };

  const sendMessage = () => {
    if (user) {
      if (user.username !== currentClassifieds.username) {
        setOpenMsg(true);
      } else if (user.username == currentClassifieds.username) {
        alert("Du kannst dir nicht selbst schreiben");
      }
    } else {
      alert("Du musst eingelogt sein");
    }
  };

  return currentClassifieds ? (
    <>
      {openMsg && (
        <ChatModal classifieds={currentClassifieds} setState={setOpenMsg} />
      )}
      <div className="single-classifieds-ct">
        <div className="user-info">
          <h3>{currentClassifieds.username}</h3>
          <button className="btn" onClick={sendMessage}>
            Nachricht Senden
          </button>
        </div>
        <div>
          <Image
            src={
              currentClassifieds.imageFile[0]
                ? currentClassifieds.imageFile[0]
                : "/images/tile-placeholder.png"
            }
            title="Bild"
            alt="Bild"
            width={700}
            height={500}
          />
          <h1>{currentClassifieds.title}</h1>
          <div className="insert-header-info">
            <p className="price">{currentClassifieds.price} €</p>
            <p>{currentClassifieds.location}</p>
          </div>
          <hr />
          <div className="inserat-info">
            <ul>
              <li>
                <strong>Rasse:</strong> {currentClassifieds.breed}
              </li>
              {currentClassifieds.special?.map((item: any) => {
                return (
                  <li key={item.id}>
                    <strong>{findTitleById(item.id)}:</strong> {item.value}
                  </li>
                );
              })}
            </ul>
          </div>
          <hr />
          <div
            className="inserat-description"
            dangerouslySetInnerHTML={{ __html: currentClassifieds.description }}
          ></div>
        </div>
        <hr />
        <div className="user-info">
          <h3>{currentClassifieds.username}</h3>
          <button className="btn">Nachricht Senden</button>
        </div>
      </div>
    </>
  ) : (
    "Nein"
  );
};

export default SingleClassifieds;
