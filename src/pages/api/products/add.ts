import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/db";
import { Product } from "../../../types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, ...productData } = req.body;

    // Validate required fields
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb(); // centralized DB

    // Insert the product
    const result = await db.collection("products").insertOne(productData);

    // Retrieve the inserted product
    const insertedProduct = await db.collection("products").findOne({ _id: result.insertedId });
    if (!insertedProduct) {
      return res.status(500).json({ error: "Failed to retrieve inserted product" });
    }

    // Map MongoDB _id to Product type
    const productWithId: Product = {
      id: insertedProduct._id.toString(),
      name: insertedProduct.name,
      price: insertedProduct.price,
      sizes: insertedProduct.sizes,
      category: insertedProduct.category,
      image: insertedProduct.image,
      description: insertedProduct.description,
    };

    res.status(201).json(productWithId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
}