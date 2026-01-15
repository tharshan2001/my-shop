import clientPromise from "./mongodb";
import { Db } from "mongodb";

let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db; // return cached DB

  const client = await clientPromise;
  db = client.db("shop"); // centralized database name
  return db;
}