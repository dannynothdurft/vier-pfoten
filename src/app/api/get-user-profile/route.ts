/* 
    File: api/get-user-profile/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(request: Request) {
  const collection = await connectDB("user");

  try {
    const reqBody = await request.json();
    const findUser = await collection.findOne({ username: reqBody.username });

    console.log(findUser);
    if (findUser) {
      return NextResponse.json({
        success: true,
        message: "Korrekt",
        data: {
          email: findUser.email,
          username: findUser.username,
          createdAt: findUser.createdAt,
          advertisements: findUser.advertisements,
        },
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Nöp",
    });
  }
}
