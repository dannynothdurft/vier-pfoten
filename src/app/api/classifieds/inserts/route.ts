/* 
    File: classifields/inserts/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";

import { UpdateFilter } from "mongodb";

import { connectDB } from "@/lib/db";

interface UserDocument {
  username: string;
  advertisements: string[];
}

export async function POST(request: any) {
  const colClassifields = await connectDB("classifields");
  const colUser = await connectDB("user");

  try {
    const data = await request.json();

    // Inserat in der classifieds-Sammlung speichern
    const classifieds = await colClassifields.insertOne(data);

    if (classifieds) {
      const id = classifieds.insertedId.toString();
      // User anhand von data.username finden und aktualisieren
      const updatedUser = await colUser.updateOne(
        { username: data.username }, // Finde den User anhand des Benutzernamens
        {
          $push: { advertisements: id } as UpdateFilter<UserDocument>,
        } // Füge die ID des neuen Inserats zum advertisements-Array hinzu
      );

      if (updatedUser.modifiedCount > 0) {
        // Überprüfe, ob der User erfolgreich aktualisiert wurde
        return NextResponse.json({
          success: true,
          message: "Erfolgreich inseriert",
          data: data,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "User konnte nicht aktualisiert werden",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Inserat konnte nicht erstellt werden",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
