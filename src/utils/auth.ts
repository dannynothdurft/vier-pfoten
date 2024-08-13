/* 
    File: auth.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/
import { store } from "@/lib/redux/store";
import { incrementUser } from "@/lib/redux/reducer/user";
import axios from "axios";
import currentUrl from "@/utils/currentUrl";

export const userRegister = async (data: any) => {
  try {
    const response = await axios.post(`${currentUrl()}/api/auth/register`, {
      username: data.username,
      email: data.email,
      password: data.password,
      passwordRepeat: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    });

    if (response.data.success) {
      const response = await userLogin({
        email: data.email,
        password: data.password,
      });

      if (response?.data.success) {
        return response;
      }
    } else {
      return response;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const userLogin = async (data: any) => {
  try {
    const response = await axios.post(`${currentUrl()}/api/auth/login`, {
      email: data.email,
      password: data.password,
    });

    if (response.data.success) {
      localStorage.setItem("user", response.data.data);
      getUserInfo();
      return response;
    }
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const userLogout = async () => {
  try {
    const response = await axios.post(`${currentUrl()}/api/auth/logout`);
    if (response.data.success) {
      localStorage.removeItem("user");
      store.dispatch(incrementUser(undefined));
    } else {
      console.error(response.data.message);
    }
  } catch (error: any) {
    console.error(error.response.data.message);
  }
};

export const getUserInfo = async () => {
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
};
