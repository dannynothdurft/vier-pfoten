/* 
    File: redux/reducer/index.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ReduxProps {
  children: ReactNode;
}

const Redux: FC<ReduxProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Redux;
