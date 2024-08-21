/* 
    File: utils/sessionStorage.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:    Diese Datei enthält eine Funktion setSessionStorage, die es ermöglicht,
                    Daten im sessionStorage des Browsers zu speichern. Die Funktion nimmt zwei
                    Parameter entgegen: einen Schlüssel (key) und einen Wert (value).
                    Der Wert wird im sessionStorage gespeichert, entweder als einfacher String
                    oder als JSON-String, je nach Typ des Wertes.  
*/

"use client";
interface SessionProps {
  key: string;
  value: any;
}

/**
 * Beispiel: setSessionStorage({ key: "test", value: "test" });
 *
 * Speichert ein Schlüssel-Wert-Paar im sessionStorage.
 *
 * Diese Funktion speichert den übergebenen Wert im `sessionStorage` des Browsers.
 * Falls der Wert ein String oder eine Zahl ist, wird er direkt gespeichert.
 * Andernfalls wird der Wert zuerst in einen JSON-String umgewandelt, bevor er gespeichert wird.
 *
 * @param {Object} params - Ein Objekt mit den zu speichernden Daten.
 * @param {string} params.key - Der Schlüssel, unter dem der Wert im `sessionStorage` gespeichert wird.
 * @param {any} params.value - Der Wert, der im `sessionStorage` gespeichert werden soll.
 *                      Kann ein String, eine Zahl, ein Objekt oder ein anderer Datentyp sein.
 *
 * @returns {void} - Diese Funktion gibt keinen Rückgabewert zurück.
 */

const setSessionStorage = ({ key, value }: SessionProps): void => {
  if (typeof value === "string" || typeof value === "string") {
    sessionStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export default setSessionStorage;
