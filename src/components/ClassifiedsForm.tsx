/* 
    File: ClassfieldsForm.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/classfieldsform.scss";
import CFconfig from "@/config/classfield.json";
import React, { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useEdgeStore } from "@/lib/edgestore";
import { useSelector, useDispatch } from "react-redux";
import { toogleClassfield } from "@/lib/redux/reducer/classfield";

import currentUrl from "@/utils/currentUrl";

interface FormState {
  animalType: string;
  breed: string;
  price: string;
  description: string;
  titel: string;
  location: string;
  username?: string;
  date: string;
  imageFile: string;
}

const ClassfieldsForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { edgestore } = useEdgeStore();
  const { classfield } = useSelector((state: any) => state.classfield);
  const { user } = useSelector((state: any) => state.user);
  const cfRef = useRef<HTMLFormElement>(null);

  // Wenn kein User eingelogt ist wird man zur login seite weitergeleitet
  useEffect(() => {
    if (!user) {
      router.push("/user/auth?action=login");
      const timer = setTimeout(() => {
        dispatch(toogleClassfield(classfield));
      }, 1);

      return () => clearTimeout(timer);
    }
  }, [user, router, dispatch, classfield]);

  // useEffect zum Hinzufügen eines Event-Listeners bei jedem Rendern des Modals
  useEffect(() => {
    // Funktion zum Überprüfen, ob ein Klick außerhalb des Modals passiert
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as HTMLElement;

      // Zugriff auf das data-ref Attribut des angeklickten Elements
      const dataRefValue = clickedNode.getAttribute("data-ref");

      if (dataRefValue === "cfRef") {
        return;
      }

      if (cfRef.current && !cfRef.current.contains(event.target as Node)) {
        dispatch(toogleClassfield(classfield));
      }
    };

    // Event-Listener hinzufügen
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup des Event-Listeners bei Unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [classfield, dispatch]);

  const [file, setFile] = useState<File>();
  const [formState, setFormState] = useState<FormState>({
    animalType: "", // Hund oder Katze
    breed: "", // Rasse
    price: "", // Preis
    description: "", // Beschreibung
    titel: "",
    location: "",
    username: user?.username,
    date: new Date().toISOString(),
    imageFile: "",
  });

  // Allgemeiner Handler für das Formular
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
      // Wenn der Tier-Typ geändert wird, setzen wir die Rasse zurück
      ...(name === "animalType" && { breed: "" }),
    }));
  };

  // Formulardaten-Handler (zum Beispiel für das Absenden des Formulars)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        if (res) {
          const updatedFormState = {
            ...formState,
            imageFile: res.url,
          };

          // Aktuellen Zustand setzen
          setFormState(updatedFormState);

          const response = await axios.post(
            `${currentUrl()}/api/classifieds/inserts`,
            updatedFormState
          );

          if (response.data.success) {
            dispatch(toogleClassfield(classfield));
          } else {
            return response;
          }
        }
      }
    } catch (error: any) {
      return error.response;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animal-form" ref={cfRef}>
      <h2>Anzeige Schalten</h2>
      <div>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
      </div>
      <div className="animaltype-ct">
        {CFconfig.animalType.map((type) => {
          return (
            <label key={type}>
              <input
                type="radio"
                value={type}
                name="animalType"
                checked={formState.animalType === type}
                onChange={handleChange}
              />
              {type}
            </label>
          );
        })}
      </div>
      {formState.animalType && (
        <div>
          <label>Rasse:</label>
          <select value={formState.breed} onChange={handleChange} name="breed">
            <option value="">Bitte wählen</option>
            {formState.animalType === "Hund"
              ? CFconfig.dogBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))
              : CFconfig.catBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
          </select>
        </div>
      )}
      <div>
        <label>Titel:</label>
        <input
          type="text"
          value={formState.titel}
          name="titel"
          onChange={handleChange}
          placeholder="Preis eingeben"
        />
      </div>
      <div>
        <label>Standort:</label>
        <input
          type="text"
          value={formState.location}
          name="location"
          onChange={handleChange}
          placeholder="Preis eingeben"
        />
      </div>
      <div>
        <label>Preis:</label>
        <input
          type="number"
          value={formState.price}
          name="price"
          onChange={handleChange}
          placeholder="Preis eingeben"
        />
      </div>
      <div>
        <label>Beschreibung:</label>
        <textarea
          value={formState.description}
          name="description"
          onChange={handleChange}
          placeholder="Beschreibung eingeben"
        />
      </div>
      <button type="submit">Absenden</button>
    </form>
  );
};

export default ClassfieldsForm;
