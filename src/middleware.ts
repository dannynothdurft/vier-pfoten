/* 
    File: middleware.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extrahiere Cookies aus den Request-Headern
  const cookies = request.headers.get("cookie") || "";
  const user = getCookieValue(cookies, "token"); // 'token' ist der Name des Cookies
  const { pathname } = request.nextUrl;

  // Liste der Pfade, die von der Middleware-Ausführung ausgenommen sind
  const excludedPaths = ["/user/auth", "/user/profil"];

  // Wenn der Benutzer nicht eingeloggt ist und auf einen Pfad unter /user/ zugreifen möchte, der nicht ausgeschlossen ist
  if (
    !user &&
    pathname.startsWith("/user/") &&
    !isPathExcluded(pathname, excludedPaths)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Lasse die Anfrage fortsetzen, wenn der Benutzer eingeloggt ist oder die Anfrage an einen anderen Pfad geht
  return NextResponse.next();
}

// Hilfsfunktion zum Extrahieren eines Cookie-Werts
function getCookieValue(cookies: string, name: string): string | undefined {
  const cookieArr = cookies.split("; ");
  for (const cookie of cookieArr) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return undefined;
}

// Hilfsfunktion zum Überprüfen, ob ein Pfad in der Ausnahmeliste enthalten ist
function isPathExcluded(pathname: string, excludedPaths: string[]): boolean {
  return excludedPaths.some((excludedPath) =>
    pathname.startsWith(excludedPath)
  );
}

// Konfiguriere die Middleware für alle Pfade unter /user/
export const config = {
  matcher: ["/user/:path*"], // Alle Pfade unter /user/ abdecken
};
