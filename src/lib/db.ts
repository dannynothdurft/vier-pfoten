import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.DATABASE_URI as string;
const client = new MongoClient(uri);

export async function connectDB(col: string) {
  await client.connect();
  const database = client.db();
  const collection = database.collection(col);

  return collection;
}
