/* 
    File: inserate/page/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description: Diese Datei enthält das Formular zum Erstellen einer neuen Anzeige.
                 Sie verwaltet die Eingabefelder, Validierung und den Übermittlungsprozess.
*/
"use client";
import ConfigClassifields from "@/config/classifield.json";

import React, { useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

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

interface AnimalTypes {
  [key: string]: string[];
}

const NewInserate = () => {
  const { user } = useSelector((state: any) => state.user);

  const [step, setStep] = useState(1);

  const animalTypes: AnimalTypes = {
    Hund: ConfigClassifields.dogBreeds,
    Katze: ConfigClassifields.catBreeds,
  };

  const [formState, setFormState] = useState<FormState>({
    animalType: "",
    breed: "",
    price: "",
    description: "",
    titel: "",
    location: "",
    username: user?.username,
    date: new Date().toISOString(),
    imageFile: "",
  });

  const selectAnimal = (type: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      animalType: type,
      breed: "",
    }));
  };

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

  const nextStep = (value: number) => {
    setStep(value);
  };

  console.log(formState);

  if (step === 1) {
    return (
      <div>
        <h1>Animal Type</h1>
        <div>
          {ConfigClassifields.animalType.map((type) => {
            return (
              <div key={type.id} onClick={() => selectAnimal(type.animal)}>
                <Image
                  src={type.img}
                  alt={type.alt}
                  title={type.alt}
                  width="100"
                  height="100"
                />
                <p>{type.animal}</p>
              </div>
            );
          })}
          {formState.animalType && (
            <div>
              <label>Rasse:</label>
              <select
                value={formState.breed}
                onChange={handleChange}
                name="breed"
              >
                <option value="">Bitte wählen</option>
                {animalTypes[formState.animalType]?.map((breed: any) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button onClick={() => nextStep(step + 1)}>Nächste Seite</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <>
        <h1>Step 2</h1>
        <button onClick={() => nextStep(step + 1)}>Nächste Seite</button>
      </>
    );
  }

  if (step === 3) {
    return (
      <>
        <h1>Step 3</h1>
        <button onClick={() => nextStep(step + 1)}>Nächste Seite</button>
      </>
    );
  }

  if (step === 4) {
    return (
      <>
        <h1>Step 4</h1>
        <button onClick={() => nextStep(step + 1)}>Nächste Seite</button>
      </>
    );
  }

  return "Vorschau";
};

export default NewInserate;
