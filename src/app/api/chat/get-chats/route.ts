/* 
    File: chat/get-chats/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";

interface UserDocument {
  username: string;
  chats: string[];
}

export async function POST(request: any) {
  const colChat = await connectDB("chat");

  try {
    const data = await request.json();
    const ids = data.map((id: string) => new ObjectId(id));

    if (data) {
      const chats = await colChat.find({ _id: { $in: ids } }).toArray();

      if (chats && chats.length > 0) {
        return NextResponse.json({
          success: true,
          data: chats,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Du hast noch keine Chats",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Es wurden keine Daten gefunden",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
