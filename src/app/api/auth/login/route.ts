/* 
    File: api/auth/login/route.js
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectDB } from "@/app/lib/db";

export async function POST(request: any) {
  const collection = await connectDB("user");

  try {
    const reqBody = await request.json();
    const findUser = await collection.findOne({ email: reqBody.email });

    if (findUser) {
      const passwordsMached = await bcrypt.compare(
        reqBody.password,
        findUser.hashedPassword
      );

      if (passwordsMached) {
        const dataToBeSentToFrontend = {
          _id: findUser._id,
          email: findUser.email,
          username: findUser.username,
          password: findUser.hashedPassword,
        };

        const token = jwt.sign(dataToBeSentToFrontend, "AUTH", {
          expiresIn: 60 * 60,
        });

        const response = NextResponse.json({
          success: true,
          message: "User gefunden",
          data: token,
        });

        response.cookies.set("token", token, {
          httpOnly: true,
          path: "/",
          sameSite: "None",
          secure: true,
        });

        return response;
      } else if (!passwordsMached) {
        return NextResponse.json({
          success: false,
          message: "Bitte gib ein gültiges Password ein!",
        });
      }
    } else if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "Gib als Benutzernamen eine gültige E-Mail-Adresse an!",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
