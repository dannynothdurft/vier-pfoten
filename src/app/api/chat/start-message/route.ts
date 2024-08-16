/* 
    File: chat/start-message/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import { UpdateFilter } from "mongodb";
import { connectDB } from "@/lib/db";
import newMessage from "@/mails/newMessage";

interface UserDocument {
  username: string;
  chats: string[];
}

export async function POST(request: any) {
  const colUser = await connectDB("user");
  const colChat = await connectDB("chat");

  try {
    const data = await request.json();
    const setChat = await colChat.insertOne(data);
    const getMailUser = await colUser.findOne({ username: data.user2 });

    console.log(getMailUser);

    if (setChat.acknowledged) {
      const user1 = await colUser.updateOne(
        { username: data.user1 },
        {
          $push: {
            chats: setChat.insertedId.toString(),
          } as UpdateFilter<UserDocument>,
        }
      );

      const user2 = await colUser.updateOne(
        { username: data.user2 },
        {
          $push: {
            chats: setChat.insertedId.toString(),
          } as UpdateFilter<UserDocument>,
        }
      );

      if (user1.modifiedCount > 0 && user2.modifiedCount > 0) {
        const dataMail = {
          email: getMailUser?.email,
          msg: data.msg,
        };
        await newMessage(dataMail, `Nachricht von ${data.user1}`);

        return NextResponse.json({
          success: true,
          message: "Erfolgreich gesendet",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Nachricht konnte nicht zugeordet werden",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Nachricht konnte nicht versendet werden",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
