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
      return response.data;
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.log(error.response);
    return error.response.data.message;
  }
};

export const paginationClassifieds = async (data: any) => {
  try {
    const response = await axios.post(
      `${currentUrl()}/api/classifieds/get-from-pagination`,
      data
    );

    if (response.data.success) {
      return response.data;
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.log(error.response);
    return error.response.data.message;
  }
};

export const getUserClassifieds = async (data: any) => {
  try {
    const response = await axios.post(
      `${currentUrl()}/api/classifieds/get-user-classifieds`,
      data
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.log(error.response);
    return error.response.data.message;
  }
};
