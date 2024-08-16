/* 
    File: get-current-classifieds/get/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";

import { connectDB } from "@/lib/db";

export async function POST(request: any) {
  const collection = await connectDB("classifields");

  try {
    const data = await request.json();
    const id = ObjectId.createFromHexString(data.id);

    if (data) {
      const classifieds = await collection.findOne({ _id: id });
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
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
