/* 
    File: currentUrl.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

export default function currentUrl() {
  return typeof window !== "undefined" ? window.location.origin : "";
}
