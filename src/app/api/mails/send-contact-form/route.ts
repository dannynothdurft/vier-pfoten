/* 
    File: api/mails/send-contact-form/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import contactForm from "@/mails/contactForm";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();

    await contactForm(reqBody, `Nachricht von ${reqBody.name}`);

    return NextResponse.json({
      success: true,
      message: "E-Mail wurde erfolgreich versendet",
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
