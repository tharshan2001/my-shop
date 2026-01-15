import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/password";
import { signToken } from "../../../lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const client = await clientPromise;
  const users = client.db("shop").collection("users");

  const existing = await users.findOne({ email });
  if (existing)
    return res.status(409).json({ message: "User already exists" });

  const hashed = await hashPassword(password);
  const result = await users.insertOne({ email, password: hashed });

  const token = signToken({ id: result.insertedId.toString(), email });
  res.status(201).json({ token });
}