/* 
    File: getUserInfo.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { store } from "@/lib/redux/store";
import { incrementUser } from "@/lib/redux/reducer/user";
import axios from "axios";
import currentUrl from "@/utils/currentUrl";

const getUserInfo = () => {
  const timer = setTimeout(async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(`${currentUrl()}/api/auth/get-user`, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        store.dispatch(incrementUser(response.data.data));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error(error);
    }
  }, 1);
  return () => clearTimeout(timer);
};

export default getUserInfo;
