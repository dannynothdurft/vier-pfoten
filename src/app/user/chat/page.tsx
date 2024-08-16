/* 
    File: user/chat/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";

import { getChats } from "@/utils/chat";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const ChatPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const [aChats, setAChats] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any | undefined>(undefined);

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
    setCurrentChat(chat);
  };

  return (
    <div>
      <div>
        <h3>Chats</h3>
        <ul>
          {aChats && aChats.length > 0
            ? aChats.map((chat: any, index: any) => {
                return (
                  <li key={index} onClick={() => setCurrentMSG(chat)}>
                    <p>{chat.date}</p>
                    <p>{chat.user1}</p>
                    <p>{chat.classifiedsTitel}</p>
                    <p>{chat.msg}</p>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <div>
        {currentChat !== undefined ? (
          <div>{currentChat.classifiedsTitel}</div>
        ) : (
          "Wähle ein Chat aus"
        )}
      </div>
    </div>
  );
};

export default ChatPage;
