/* 
    File: CurrentChat.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";

import React, { FC } from "react";

interface Chat {
  classifiedsTitel: string;
}

interface CurrentChatProps {
  chat: Chat;
}

const CurrentChat: FC<CurrentChatProps> = ({ chat }) => {
  return <div>{chat.classifiedsTitel}</div>;
};

export default CurrentChat;
