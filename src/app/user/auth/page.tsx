/* 
    File: user/auth/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/userModal.scss";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const actionParams = useSearchParams();
  const action = actionParams.get("action");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Hier kommt später die API Kommunikation
  };

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }
    console.log("Register data:", registerData);
    // Hier kommt später die API Kommunikation
  };

  return (
    <div className="vp-auth-ct">
      <div className="vp-auth-wrapper">
        {action === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <h1>Anmelden</h1>
            <div>
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Passwort</label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Anmelden</button>
          </form>
        )}

        {action === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            <h1>Registrieren</h1>
            <div>
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Passwort</label>
              <input
                type="password"
                name="password"
                id="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Passwort bestätigen</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                checked={registerData.termsAccepted}
                onChange={handleRegisterChange}
                required
              />
              <label htmlFor="termsAccepted">
                Ich akzeptiere die <a href="#">AGB</a>
              </label>
            </div>
            <button type="submit">Registrieren</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
