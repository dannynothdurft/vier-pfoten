/* 
    File: classifields/get-from-paginete/route.ts
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

    console.log(data);

    if (data.from && data.to) {
      const classfieldsPagination = await collection
        .find()
        .sort({ _id: -1 })
        .skip(data.from - 1)
        .limit(data.to)
        .toArray();

      if (classfieldsPagination && classfieldsPagination.length > 0) {
        return NextResponse.json({
          success: true,
          data: classfieldsPagination,
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
