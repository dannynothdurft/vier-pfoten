/* 
    File: user.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {
    incrementUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { incrementUser } = user.actions;

export default user.reducer;
