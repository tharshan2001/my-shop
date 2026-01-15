import type { NextApiResponse } from "next";
import type { NextApiRequestWithFiles } from "../../../types/next";
import { getDb } from "../../../lib/db";
import { upload } from "../../../lib/multer";
import { runMiddleware } from "../../../lib/runMiddleware";
import { Product } from "../../../types/product";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequestWithFiles,
  res: NextApiResponse<Product | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Run multer manually
    await runMiddleware(req, res, upload.array("images", 5));

    const productData = JSON.parse(req.body.product);

    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const images = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    productData.image = images;

    const db = await getDb();
    const result = await db.collection("products").insertOne(productData);

    const inserted = await db
      .collection("products")
      .findOne({ _id: result.insertedId });

    if (!inserted) {
      return res.status(500).json({ error: "Insert failed" });
    }

    const product: Product = {
      id: inserted._id.toString(),
      name: inserted.name,
      price: inserted.price,
      sizes: inserted.sizes,
      category: inserted.category,
      image: inserted.image,
      description: inserted.description,
    };

    res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}