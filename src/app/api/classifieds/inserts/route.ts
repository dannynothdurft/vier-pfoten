/* 
    File: classifields/inserts/route.ts
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

    const classifieds = await collection.insertOne(data);

    if (classifieds) {
      return NextResponse.json({
        success: true,
        message: "Erfolgreich inseriert",
        data: data,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
