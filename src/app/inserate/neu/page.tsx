/* 
    File: inserate/page/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description: Diese Datei enthält das Formular zum Erstellen einer neuen Anzeige.
                 Sie verwaltet die Eingabefelder, Validierung und den Übermittlungsprozess.
*/

"use client";
import "react-quill/dist/quill.snow.css";
import "@/styles/classifieldsform.scss";
import ConfigClassifields from "@/config/classifields.json";

import ReactQuill from "react-quill";

import React, { useState } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";

interface FormState {
  animalType: string;
  breed: string;
  price: string;
  description: string;
  titel: string;
  location: string;
  username?: string;
  date: string;
  imageFile: string[];
}

interface AnimalTypes {
  [key: string]: string[];
}

interface CheckedFeatures {
  [key: string]: boolean;
}

interface DynFormState {
  [key: string]: string;
}

const NewInserate = () => {
  const { user } = useSelector((state: any) => state.user);

  const [step, setStep] = useState(1);

  const animalTypes: AnimalTypes = {
    Hund: ConfigClassifields.dogBreeds,
    Katze: ConfigClassifields.catBreeds,
  };

  const [checkedFeatures, setCheckedFeatures] = useState<CheckedFeatures>({});
  const [formState, setFormState] = useState<FormState>({
    animalType: "",
    breed: "",
    price: "",
    description: "",
    titel: "",
    location: "",
    username: user?.username,
    date: new Date().toISOString(),
    imageFile: [],
  });

  const initialState: DynFormState = ConfigClassifields.specialFeatures.reduce(
    (state, inputs) => {
      state[inputs.id] = ""; // Setze den Anfangswert für jedes Eingabefeld auf einen leeren String
      return state;
    },
    {} as DynFormState
  );

  const [dynFormState, setDynFormState] = useState<DynFormState>(initialState);

  const selectAnimal = (type: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      animalType: type,
      breed: "",
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | string
  ) => {
    if (typeof e === "string") {
      setFormState((prevState: any) => ({
        ...prevState,
        description: e,
      }));
    } else {
      const { name, value } = e.target;

      // Überprüfen, ob das Eingabefeld das Preisfeld ist
      if (name === "price") {
        // Entfernen von nicht-numerischen Zeichen
        const numericValue = value.replace(/[^0-9]/g, "");
        setFormState((prevState: any) => ({
          ...prevState,
          [name]: numericValue,
        }));
      } else {
        setFormState((prevState: any) => ({
          ...prevState,
          [name]: value,
          ...(name === "animalType" && { breed: "" }),
        }));
      }
    }
  };

  const dynHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDynFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedFeatures((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const nextStep = (value: number) => {
    setStep(value);
  };

  if (step === 1) {
    return (
      <div className="classifieds-ct">
        <h1>Inserate Erstellen</h1>

        <div className="classifieds-form">
          <div className="question-ct">
            <h3>Wähle Deine Tierart aus</h3>
            <div className="animal-type-wrapper">
              {ConfigClassifields.animalType.map((type) => {
                return (
                  <div
                    className={`at-card ${
                      type.animal === formState.animalType
                        ? "active"
                        : undefined
                    }`}
                    key={type.id}
                    onClick={() => selectAnimal(type.animal)}
                  >
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
            </div>
          </div>
          {formState.animalType && (
            <div className="breed-wrapper">
              <h3>Wähle deine Rasse aus:</h3>
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
          <button className="btn" onClick={() => nextStep(step + 1)}>
            Nächste Seite
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="classifieds-ct">
        <h1>Inserate Erstellen</h1>
        <div className="classifieds-form">
          <div className="question-ct">
            <h3>Wähle die Besondere Merkmale aus</h3>
            <div className="special-features-wrapper">
              {ConfigClassifields.specialFeatures.map((feature: any) => {
                return (
                  <div key={feature.id}>
                    <div className="special-checkbox-ct">
                      <input
                        type="checkbox"
                        name={feature.id}
                        id={feature.id}
                        checked={checkedFeatures[feature.id] || false}
                        onChange={handleCheckboxChange}
                      />
                      {feature.special}
                    </div>
                    {checkedFeatures[feature.id] && (
                      <div>
                        {feature.inputs.map((input: any, index: any) => {
                          return (
                            <label key={index}>
                              {input.title}
                              <input
                                type="text"
                                name={input.id}
                                value={dynFormState[input.id] || ""}
                                onChange={dynHandleChange}
                              />
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="btn" onClick={() => nextStep(step + 1)}>
            Nächste Seite
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="classifieds-ct">
        <h1>Inserate Erstellen</h1>
        <div className="classifieds-form">
          <div className="question-ct">
            <h3>Setze deine Beschreibung</h3>
            <div className="description-wrapper">
              <label>
                Preis:
                <input
                  type="text"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                />
              </label>
              <ReactQuill
                value={formState.description}
                onChange={handleChange}
                theme="snow"
                placeholder="Schreibe hier deinen Text..."
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link"], // image & video könnten auch rein
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>
          <button className="btn" onClick={() => nextStep(step + 1)}>
            Nächste Seite
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="classifieds-ct">
        <h1>Inserate Erstellen</h1>

        <div className="classifieds-form">
          <div className="question-ct">
            <h3>Lade nun Deine Bilder hoch</h3>
            <div className="animal-type-wrapper">Mehrere Bilder</div>
          </div>
          <button className="btn" onClick={() => nextStep(step + 1)}>
            Nächste Seite
          </button>
        </div>
      </div>
    );
  }

  return "Vorschau";
};

export default NewInserate;
