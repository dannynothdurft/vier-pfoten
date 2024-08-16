/* 
    File: getUserProfile.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import currentUrl from "@/utils/currentUrl";
import axios from "axios";

const getUserProfile = async (data: any) => {
  try {
    const response = await axios.post(`${currentUrl()}/api/get-user-profile`, {
      username: data,
    });
    if (response.data.success) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export default getUserProfile;
