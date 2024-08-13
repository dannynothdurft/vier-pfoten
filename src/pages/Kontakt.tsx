/* 
    File: pages/Kontakt.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import currentUrl from "@/utils/currentUrl";

interface ContactData {
  name: string;
  email: string;
  nachricht: string;
}

export default function Contact() {
  const [data, setData] = useState<ContactData>({
    name: "",
    email: "",
    nachricht: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      nachricht: data.nachricht,
    };

    try {
      toast.loading("Loading...");
      const response = await axios.post(
        `${currentUrl()}/api/mails/send-contact-form`,
        formData
      );
      toast.dismiss();
      if (response.status === 200) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          nachricht: "",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Leider ist ein Fehler aufgetretten");
    }
  };
  return (
    <div className="info-page-ct">
      <div>
        <h1>Schreib uns eine Nachricht.</h1>
        <h2>
          Hast du etwas auf der Webseite gefunden was nicht sein sollte oder
          möchtest du uns etwas fragen?
        </h2>
      </div>

      <div>
        <form action="" className="Contact-Formular" onSubmit={handleSubmit}>
          <h2>Dann sende uns eine Nachricht!</h2>
          <label>
            Name<span className="Stern">*</span>
            <input
              required
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </label>
          <label>
            E-Mail<span className="Stern">*</span>
            <input
              required
              type="text"
              placeholder="E_Mail"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </label>
          <label>
            Ihre Nachricht an mich<span className="Stern">*</span>
            <textarea
              required
              placeholder="Nachricht"
              name="nachricht"
              onChange={handleChange}
              value={data.nachricht}
            />
          </label>
          <input
            type="submit"
            value="Nachricht Senden"
            className="btn form-button"
          />
        </form>
      </div>
    </div>
  );
}
