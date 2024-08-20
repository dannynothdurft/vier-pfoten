/*
    File: components/chatModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:    In dieser Datei wird der Eröffnungschat bereitgestellt.
                    Diese Datei wird auf der Seite /inserate/[id] gerendert.
*/

"use client";
import "@/styles/chatmodal.scss";
import chatModalConfig from "@/config/chatmodal.json";

// importe von React und Next
import React, { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// importe npm package manager
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// importe Funktionen & Utils
import { startMessage } from "@/utils/chat";
import SpeechBubble from "@/utils/svg/SpeechBubble";
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
  const chatModal = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatModal.current &&
        !chatModal.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setState]);

  function handleButtonClick() {
    setState(false);
    enableScroll();
  }

  /**
   * Ersetzt Platzhalter im Text durch React-Link-Komponenten.
   * @param text - Der Eingabetext mit Platzhaltern.
   * @returns Ein Array von Textteilen und React- / Next.js-Komponenten.
   */
  const replacePlaceholders = (text: string) => {
    const regex = /\{link\}(.*?)\{href\/(.*?)\}(.*?)\{\/link\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const [_, linkTextBefore, linkUrl, linkTextAfter] = match;
      console.log("linkTextBefore: ", linkTextBefore);
      console.log("linkTextAfter: ", linkTextAfter);
      parts.push(
        <Link key={parts.length} href={`/${linkUrl}`}>
          {linkTextBefore}
          {linkTextAfter}
        </Link>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-ct" ref={chatModal}>
        <div className="chat-modal-header">
          <h2>{chatModalConfig.modalTitle}</h2>
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
            {chatModalConfig.msgLabel}
            <textarea value={msg} name="msg" onChange={handleChange} />
          </label>
          <button className="btn" onClick={handleSubmit}>
            <SpeechBubble />
            {chatModalConfig.msgSubmit}
          </button>
        </div>
        <div className="chat-modal-footer">
          <p className="legal-text">
            {replacePlaceholders(chatModalConfig.legalTextFirst)}
          </p>
          <p className="legal-text">
            {replacePlaceholders(chatModalConfig.legalTextSecond)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
