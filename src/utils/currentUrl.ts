/* 
    File: currentUrl.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:  Diese Datei enthält eine Funktion `currentUrl`, die die Basis-URL der
                  aktuellen Seite im Browser zurückgibt. Die Funktion überprüft, ob sie
                  auf der Client-Seite (im Browser) läuft, um Fehler beim Server-Side-Rendering zu vermeiden.
*/

/**
 * Gibt die Basis-URL der aktuellen Seite zurück.
 *
 * Diese Funktion überprüft, ob der Code auf der Client-Seite ausgeführt wird, indem sie
 * die Existenz von `window` überprüft. Falls `window` definiert ist, wird die Basis-URL
 * der aktuellen Seite durch Zugriff auf `window.location.origin` zurückgegeben.
 * Andernfalls wird ein leerer String zurückgegeben, um Fehler beim Server-Side-Rendering zu vermeiden.
 *
 * @returns {string} - Die Basis-URL der aktuellen Seite oder ein leerer String, wenn der Code
 *                     nicht im Browser ausgeführt wird.
 */
export default function currentUrl(): string {
  return typeof window !== "undefined" ? window.location.origin : "";
}
