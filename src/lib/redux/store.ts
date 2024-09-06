/* 
    File: redux/store.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

("use strict");

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducer/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
