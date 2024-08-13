/* 
    File: user/chat/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return <div>Chat</div>;
};

export default ChatPage;
