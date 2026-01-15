import clientPromise from "../lib/mongodb";
import { Product } from "../types/product";

// Import JSON using require — ts-node handles this
const products: Omit<Product, 'id'>[] = require("../data/products.json");

async function seed() {
  try {
    const client = await clientPromise;
    const db = client.db("shop");

    await db.collection("products").deleteMany({});
    await db.collection("products").insertMany(products);

    console.log("✅ Products seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  } finally {
    process.exit();
  }
}

seed();