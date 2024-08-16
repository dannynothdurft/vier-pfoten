/* 
    File: chat.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import axios from "axios";
import currentUrl from "@/utils/currentUrl";

export const startMessage = async (data: any) => {
  try {
    const response = await axios.post(
      `${currentUrl()}/api/chat/start-message`,
      data
    );

    if (response.data.success) {
      return response.data;
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const getChats = async (data: any) => {
  try {
    const response = await axios.post(
      `${currentUrl()}/api/chat/get-chats`,
      data
    );

    if (response.data.success) {
      return response.data;
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    return error.response.data.message;
  }
};
