import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/db";
import { Product } from "../../../types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | Product | { error: string }>
) {
  const db = await getDb();

  if (req.method === "GET") {
    const products = await db.collection("products").find().toArray();
    const formatted = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      sizes: p.sizes,
      category: p.category,
      image: p.image,
      description: p.description,
    }));
    return res.status(200).json(formatted);
  }

  if (req.method === "POST") {
    const { name, price, sizes, category, image, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Missing fields" });

    const result = await db.collection("products").insertOne({ name, price, sizes, category, image, description });
    const newProduct: Product = {
      id: result.insertedId.toString(),
      name,
      price,
      sizes,
      category,
      image,
      description,
    };
    return res.status(201).json(newProduct);
  }

  res.status(405).json({ error: "Method not allowed" });
}