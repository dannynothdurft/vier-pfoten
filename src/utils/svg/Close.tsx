/* 
    File: utils/svg/Close.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import React, { FC } from "react";

interface CloseProps {
  width?: string;
  height?: string;
  Dref?: any;
}

const Close: FC<CloseProps> = ({ width = "27px", height = "27px", Dref }) => {
  return (
    <svg
      width={width}
      height={height}
      data-ref={Dref}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          id="Vector"
          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
          strokeWidth="2"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-ref={Dref}
        />
      </g>
    </svg>
  );
};

export default Close;
