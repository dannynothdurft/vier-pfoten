/* 
    File: ClassfieldsForm.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/classfieldsform.scss";
import CFconfig from "@/config/classfield.json";
import React, { FC, useState } from "react";

interface FormState {
  animalType: string;
  breed: string;
  price: string;
  description: string;
}

const ClassfieldsForm: FC = () => {
  const [formState, setFormState] = useState<FormState>({
    animalType: "", // Hund oder Katze
    breed: "", // Rasse
    price: "", // Preis
    description: "", // Beschreibung
  });

  // Allgemeiner Handler für das Formular
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
      // Wenn der Tier-Typ geändert wird, setzen wir die Rasse zurück
      ...(name === "animalType" && { breed: "" }),
    }));
  };

  // Formulardaten-Handler (zum Beispiel für das Absenden des Formulars)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier könntest du die Daten verarbeiten oder an einen Server senden
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="animal-form">
      <h2>Anzeige Schalten</h2>
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
