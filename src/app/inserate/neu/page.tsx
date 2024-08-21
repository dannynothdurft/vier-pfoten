/* 
    File: inserate/page/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description: Diese Datei enthält das Formular zum Erstellen einer neuen Anzeige.
                 Sie verwaltet die Eingabefelder, Validierung und den Übermittlungsprozess.
*/

"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/styles/classifieldsform.scss";
import "@/styles/singleClassifieds.scss";
import ConfigClassifields from "@/config/classifields.json";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import React, { useState } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";

import { insertClassifieds } from "@/utils/classifieds";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";

interface SpecialItem {
  id: string;
  value: string;
}

interface FormState {
  animalType: string;
  breed: string;
  price: string;
  description: string;
  title: string;
  location: string;
  username?: string;
  date: string;
  imageFile: string[];
  special?: SpecialItem[];
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
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  if (!user) {
    router.push("/user/auth?action=login");
  }

  const [step, setStep] = useState(1);

  const animalTypes: AnimalTypes = {
    Hund: ConfigClassifields.dogBreeds,
    Katze: ConfigClassifields.catBreeds,
  };

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  const [checkedFeatures, setCheckedFeatures] = useState<CheckedFeatures>({});
  const [formState, setFormState] = useState<FormState>({
    animalType: "",
    breed: "",
    price: "",
    description: "",
    title: "",
    location: "",
    username: user?.username,
    date: new Date().toISOString(),
    imageFile: [],
  });

  const initialState: DynFormState = ConfigClassifields.specialFeatures.reduce(
    (state, inputs) => {
      state[inputs.id] = "";
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
    if (value === 5) {
      mergeState(formState, dynFormState, urls);
    }
    setStep(value);
  };

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const mergeState = (state: any, dState: any, img: any) => {
    state.imageFile = img;

    state.special = [];
    for (let key in dState) {
      if (dState[key]) {
        state.special.push({ id: [key], value: dState[key] });
      }
    }

    return formState;
  };

  const findTitleById = (id: string) => {
    for (const feature of ConfigClassifields.specialFeatures) {
      const input = feature.inputs.find((i) => i.id === id[0]);
      if (input) {
        return input.output;
      }
    }
    return "Unbekannt";
  };

  const insetClassifields = async () => {
    try {
      const response = await insertClassifieds(formState);

      if (response.success) {
        router.push("/");
      } else {
        return response;
      }
    } catch (error: any) {
      return error.response;
    }
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
                Titel:
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Preis:
                <input
                  type="text"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                />
              </label>
              <label>
                Standort:
                <input
                  type="text"
                  name="location"
                  value={formState.location}
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
            <div className="animal-type-wrapper">
              <MultiImageDropzone
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 6,
                }}
                onChange={(files) => {
                  setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                  await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                      if (addedFileState.file instanceof File) {
                        try {
                          const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            onProgressChange: async (progress) => {
                              updateFileProgress(addedFileState.key, progress);
                              if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar at 100%
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 1000)
                                );
                                updateFileProgress(
                                  addedFileState.key,
                                  "COMPLETE"
                                );
                              }
                            },
                          });
                          setUrls((prevUrls) => [...prevUrls, res.url]);
                        } catch (err) {
                          updateFileProgress(addedFileState.key, "ERROR");
                        }
                      }
                    })
                  );
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

  return (
    <div className="single-classifieds-ct">
      <button className="btn secondary center" onClick={insetClassifields}>
        Jetzt Anzeige Aufgeben
      </button>
      <div className="user-info">
        <h3>{formState.username}</h3>
        <button className="btn">Nachricht Senden</button>
      </div>
      <div>
        <Image
          src={
            formState.imageFile[0]
              ? formState.imageFile[0]
              : "/images/tile-placeholder.png"
          }
          title="Bild"
          alt="Bild"
          width="700"
          height="500"
        />
        <h1>{formState.title}</h1>
        <div className="insert-header-info">
          <p className="price">{formState.price} €</p>
          <p>{formState.location}</p>
        </div>
        <hr />
        <div className="inserat-info">
          <ul>
            <li>
              <strong>Rasse:</strong> {formState.breed}
            </li>
            {formState.special?.map((item: SpecialItem) => {
              return (
                <li key={item.id}>
                  <strong>{findTitleById(item.id)}:</strong> {item.value}
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
        <div
          className="inserat-description"
          dangerouslySetInnerHTML={{ __html: formState.description }}
        ></div>
      </div>
      <hr />
      <div className="user-info">
        <h3>{formState.username}</h3>
        <button className="btn">Nachricht Senden</button>
      </div>
      <button className="btn secondary center" onClick={insetClassifields}>
        Jetzt Anzeige Aufgeben
      </button>
    </div>
  );
};

export default NewInserate;
