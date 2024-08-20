/*
    File: components/chatModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:    In dieser Datei wird der Eröffnungschat bereitgestellt.
                    Diese Datei wird auf der Seite /inserate/[id] gerendert.
*/

"use client";
import "@/styles/chatmodal.scss";
//import "@/config";

// importe von React und Next
import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// importe npm package manager
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// importe Funktionen & Utils
import { startMessage } from "@/utils/chat";
import Close from "@/utils/svg/Close";

// importe Components

interface ChatModalProps {
  classifieds: Classifieds;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Classifieds {
  _id: string;
  username: string;
  title: string;
  description: string;
  price: number;
  imageFile: string[];
}

const ChatModal: FC<ChatModalProps> = ({ classifieds, setState }) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const [msg, setMsg] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      classifiedsID: classifieds._id,
      classifiedsTitle: classifieds.title,
      user1: user.username,
      user2: classifieds.username,
      msg: msg,
      date: new Date().toLocaleString(),
      readStatus: false,
    };

    console.log(data);

    const sendMSG = async () => {
      const response = await startMessage(data);
      if (response.success) {
        setState(false);
        toast.success(response.message);
      }
    };

    sendMSG();
  };

  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "";
  }

  useEffect(() => {
    //! Scrollen deaktivieren, wenn die Komponente gemountet wird
    disableScroll();

    //! Cleanup: Scrollen wieder aktivieren, wenn die Komponente unmontiert wird
    return () => {
      enableScroll();
    };
  }, []);

  function handleButtonClick() {
    setState(false);
    enableScroll();
  }

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-ct">
        <div className="chat-modal-header">
          <h2>Nachricht senden</h2>
          <button onClick={handleButtonClick}>
            <Close />
          </button>
        </div>
        <div className="chat-modal-info">
          <div className="image-wrapper">
            <Image
              src={
                classifieds.imageFile.length > 0
                  ? classifieds.imageFile[0]
                  : "/images/tile-placeholder.png"
              }
              alt={classifieds.title}
              title={classifieds.title}
              width={50}
              height={50}
            />
          </div>
          <div className="info-wrapper">
            <p className="info-username">{classifieds.username}</p>
            <p className="info-classifieds-title">{classifieds.title}</p>
          </div>
        </div>
        <div className="chat-modal-body">
          <label>
            Nachricht
            <textarea value={msg} name="msg" onChange={handleChange} />
          </label>
          <button className="btn" onClick={handleSubmit}>
            Nachricht senden
          </button>
        </div>
        <div className="chat-modal-footer">
          <p className="legal-text">
            Deine Daten werden dem Anbieter übermittelt.{" "}
            <Link href={"/datenschutz"}>Weitere Infos</Link>
          </p>
          <p className="legal-text">
            Wir überprüfen Nachrichten auf Verstöße gegen unsere
            Nutzungsbedingungen.{" "}
            <Link href={"/datenschutz"}>Weitere Infos</Link> findest du in
            unserer <Link href={"/datenschutz"}>Datenschutzerklärung</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
