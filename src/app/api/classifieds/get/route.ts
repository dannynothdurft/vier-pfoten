/* 
    File: api/classifields/get/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

export async function POST(request: any) {
  const collection = await connectDB("classifields");

  try {
    const data = await request.json();

    if (data.count === "all") {
      const classifieds = await collection.find().toArray();
      const classfieldsPagination = await collection
        .find()
        .sort({ _id: -1 })
        .limit(9)
        .toArray();

      if (classifieds && classifieds.length > 0) {
        return NextResponse.json({
          success: true,
          length: classifieds.length,
          data: classfieldsPagination,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Keine Inserate gefunden",
          data: [],
        });
      }
    } else if (typeof data === "number" && data > 0) {
      // Die neuesten n Inserate zurückgeben
      const classifieds = await collection
        .find()
        .sort({ _id: -1 }) // Sortieren nach _id in absteigender Reihenfolge (neueste zuerst)
        .limit(data) // Anzahl der zurückgegebenen Dokumente begrenzen
        .toArray();

      if (classifieds && classifieds.length > 0) {
        return NextResponse.json({
          success: true,
          data: classifieds,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Keine Inserate gefunden",
          data: [],
        });
      }
    } else {
      return NextResponse.json(
        {
          message:
            "Ungültige Anfrage. Bitte geben Sie 'all' oder eine gültige Zahl an.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
