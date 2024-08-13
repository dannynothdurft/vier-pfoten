/* 
    File: api/auth/get-user/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const reqBody = await request.json();
  const token = reqBody.headers.Authorization;
  try {
    const user = jwt.verify(token, "AUTH");

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Korrekt",
        data: user,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Nöp",
    });
  }
}
