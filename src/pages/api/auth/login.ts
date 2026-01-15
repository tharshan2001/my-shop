import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { comparePassword } from "../../../lib/password";
import { signToken } from "../../../lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const client = await clientPromise;
  const users = client.db("shop").collection("users");

  const user = await users.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id.toString(), email });
  res.json({ token });
}