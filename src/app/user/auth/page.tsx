/* 
    File: user/auth/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/userModal.scss";
import Config from "@/config.json";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import axios from "axios";

import currentUrl from "@/lib/currentUrl";

const Auth = () => {
  const actionParams = useSearchParams();
  const action = actionParams.get("action");

  const [alerts, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
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

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Login data:", loginData);

    setAlert(false);
    try {
      const response = await axios.post(`${currentUrl()}/api/auth/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        localStorage.setItem("user", response.data.data);
      } else {
        setAlertContent(response.data.message);
        setAlert(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setAlertContent(errorMessage);
        setAlert(true);
      } else {
        console.error("Ein unerwarteter Fehler ist aufgetreten", error);
      }
    }
  };

  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();

    setAlert(false);
    try {
      const response = await axios.post(`${currentUrl()}/api/auth/register`, {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        passwordRepeat: registerData.confirmPassword,
        termsAccepted: registerData.termsAccepted,
      });

      if (response.data.success) {
        try {
          const response = await axios.post(`${currentUrl()}/api/auth/login`, {
            email: registerData.email,
            password: registerData.password,
          });

          if (response.data.success) {
            localStorage.setItem("user", response.data.data);
          }
        } catch (error) {}
      } else {
        setAlertContent(response.data.message);
        setAlert(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setAlertContent(errorMessage);
        setAlert(true);
      } else {
        console.error("Ein unerwarteter Fehler ist aufgetreten", error);
      }
    }
  };

  return (
    <div className="vp-auth-ct">
      <div className="vp-auth-wrapper">
        {action === "login" && (
          <form onSubmit={handleLoginSubmit}>
            {alerts ? <div className="alert-danger">{alertContent}</div> : null}
            <Image
              src={Config.logo}
              width={90}
              height={90}
              alt="Vier Pfoten Logo"
              title="Vier Pfoten Logo"
            />

            <h2>Anmelden</h2>

            <label>
              E-Mail
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </label>

            <label>
              Passwort
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </label>

            <button type="submit">Anmelden</button>
          </form>
        )}

        {action === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            {alerts ? <div className="alert-danger">{alertContent}</div> : null}
            <Image
              src={Config.logo}
              width={90}
              height={90}
              alt="Vier Pfoten Logo"
              title="Vier Pfoten Logo"
            />
            <h2>Registrieren</h2>

            <label>
              Nutzername
              <input
                type="text"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label>
              E-Mail
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label>
              Passwort
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label>
              Passwort bestätigen
              <input
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label className="line">
              <a href="#">Ich akzeptiere die AGB</a>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={registerData.termsAccepted}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <button type="submit">Registrieren</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
