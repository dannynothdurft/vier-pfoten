/* 
    File: api/auth/logout/route.js
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
      data: null,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
