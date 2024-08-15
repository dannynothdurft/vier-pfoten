/* 
    File: classfield.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import { createSlice } from "@reduxjs/toolkit";

export const classfield = createSlice({
  name: "classfield",
  initialState: {
    classfield: false,
  },
  reducers: {
    toogleClassfield(state) {
      console.log(state);
      state.classfield = !state.classfield;
    },
  },
});

export const { toogleClassfield } = classfield.actions;

export default classfield.reducer;
