/* 
    File: db.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.DATABASE_URI as string;
const client = new MongoClient(uri);

export async function connectDB(col: string) {
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection(col);

    return collection;
  } catch (error) {
    throw error;
  }
}
