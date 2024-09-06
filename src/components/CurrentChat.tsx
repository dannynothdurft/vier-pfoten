/* 
    File: CurrentChat.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";

import React, { FC, FormEvent, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { courseMessage } from "@/utils/chat";

interface Chat {
  classifiedsTitle: string;
  msg: string;
  user1: string;
  course: string[];
  sendFrom: string;
}

interface CurrentChatProps {
  chat: Chat;
}

interface FormState {
  msg: string;
}

const CurrentChat: FC<CurrentChatProps> = ({ chat }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [cChat, setCchat] = useState(chat);
  const { user } = useSelector((state: any) => state.user);
  const [formState, setFormState] = useState<FormState>({
    msg: "",
  });

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [cChat]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      start: chat,
      sendFrom: user.username,
      msg: formState.msg,
      date: new Date().toLocaleString(),
    };
    const sendMSG = async () => {
      const response = await courseMessage(data);
      if (response.success) {
        const updatedChat = {
          ...cChat,
          course: [...cChat.course, response.data],
        };
        setCchat(updatedChat);
        setFormState({
          msg: "",
        });
      }
    };

    sendMSG();
  };
  return (
    <div className="cc-chat-ct">
      <h2>{cChat.classifiedsTitle}</h2>
      <hr />
      <p
        className={
          cChat.user1 !== user.username ? "msg msgLeft" : "msg msgRight"
        }
      >
        {cChat.msg}
      </p>
      <ul ref={containerRef}>
        {cChat.course.map((msg: any, index: any) => {
          return (
            <li
              key={index}
              className={
                msg.sendFrom !== user.username ? "CmsgLeft" : "CmsgRight"
              }
            >
              <div className="Cmsg">{msg.msg}</div>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit} className="msgBox">
        <input
          type="text"
          value={formState.msg}
          name="msg"
          onChange={handleChange}
          placeholder="Nachricht eingeben"
        />
        <button className="btn" type="submit">
          Senden
        </button>
      </form>
    </div>
  );
};

export default CurrentChat;
