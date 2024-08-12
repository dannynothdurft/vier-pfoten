/* 
    File: auth/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/userModal.scss";
import React from "react";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const actionParams = useSearchParams();
  const action = actionParams.get("action");

  return (
    <div>
      {action === "login" && <h1>Anmelden</h1>}
      {action === "register" && <h1>Registrieren</h1>}
      <p>Was geht</p>
    </div>
  );
};

export default Auth;
