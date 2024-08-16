/* 
    File: user/chat/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/chats.scss";

import { getChats } from "@/utils/chat";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import CurrentChat from "@/components/CurrentChat";

const ChatPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const [aChats, setAChats] = useState<any>([]);
  const [cChat, setCChat] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (user) {
      const timeOut = setTimeout(() => {
        const chats = async () => {
          const response = await getChats(user.chats);

          if (response?.success) {
            setAChats(response.data);
          }
        };
        chats();
      }, 1);

      return () => clearTimeout(timeOut);
    }
  }, [user]);

  const setCurrentMSG = (chat: any) => {
    setCChat(chat);
  };

  return (
    <div className="vp-chats-ct">
      <div className="chat-list">
        <h3>Chats</h3>
        <ul>
          {aChats && aChats.length > 0
            ? aChats.map((chat: any, index: any) => {
                return (
                  <li key={index} onClick={() => setCurrentMSG(chat)}>
                    <p>{chat.date}</p>
                    <p className="bold">{chat.user1}</p>
                    <p>{chat.classifiedsTitel}</p>
                    <p className="single-line">{chat.msg}</p>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <div className="chat-ct">
        <h3>Nachricht</h3>
        {cChat !== undefined ? (
          <CurrentChat chat={cChat} />
        ) : (
          "Wähle ein Chat aus"
        )}
      </div>
    </div>
  );
};

export default ChatPage;
