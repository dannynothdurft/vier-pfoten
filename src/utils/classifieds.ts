/* 
    File: classifieds.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import axios from "axios";
import currentUrl from "@/utils/currentUrl";

export const getClassifieds = async (data: any) => {
  try {
    const response = await axios.post(
      `${currentUrl()}/api/classifieds/get`,
      data
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      return response;
    }
  } catch (error: any) {
    return error.response;
  }
};
