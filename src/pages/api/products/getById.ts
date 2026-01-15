import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/db";
import { Product } from "../../../types/product";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid MongoDB ID" });
  }

  try {
    const db = await getDb();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productWithId: Product = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      sizes: product.sizes ?? [],
      category: product.category ?? "",
      image: product.image ?? [],
      description: product.description ?? "",
    };

    return res.status(200).json(productWithId);
  } catch (err) {
    console.error("Failed to fetch product by ID:", err);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
}
