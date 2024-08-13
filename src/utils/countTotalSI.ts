/* 
    File: countTotalSI.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use server";
import { connectDB } from "@/lib/db";

export default async function countTotalSI(coll: string) {
  const collection = await connectDB(coll);

  try {
    const totalCount = await collection.countDocuments();
    return totalCount;
  } catch (error) {
    console.info(error);
  }
}
