/* 
    File: api/chat/course-message/route.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { NextResponse } from "next/server";
import { UpdateFilter, ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";
import newMessage from "@/mails/newMessage";

interface UserDocument {
  data: string;
  msg: string;
  sendFrom: string;
}

export async function POST(request: any) {
  const colChat = await connectDB("chat");
  const colUser = await connectDB("user");

  try {
    const data = await request.json();
    const id = ObjectId.createFromHexString(data.start._id);

    const getMailUser = await colUser.findOne({
      username:
        data.start.user1 === data.sendFrom
          ? data.start.user2
          : data.start.user1,
    });

    const setMsg = {
      date: data.date,
      msg: data.msg,
      sendFrom: data.sendFrom,
    };

    const updateChat = await colChat.updateOne(
      { _id: id },
      {
        $push: {
          course: setMsg,
        } as UpdateFilter<UserDocument>,
      }
    );
    if (updateChat.modifiedCount > 0) {
      const dataMail = {
        email: getMailUser?.email,
        msg: data.msg,
      };
      await newMessage(dataMail, `Nachricht von ${data.sendFrom}`);

      return NextResponse.json({
        success: true,
        message: "Nachricht wurde versendet",
        data: setMsg,
      });
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
