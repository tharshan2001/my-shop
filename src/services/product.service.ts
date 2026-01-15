import { Product } from "../types/product";

// Base URL for the API (from env). Must include protocol and host, e.g., http://localhost:3000
const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/api/products";

export const productService = {
  // Fetch all products
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/getAll`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  // Fetch a product by ID
  async getById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/getById?id=${encodeURIComponent(id)}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error("Product not found");
      throw new Error("Failed to fetch product");
    }
    return res.json();
  },

  // Add a new product
  async add(product: Omit<Product, "id">): Promise<Product> {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to add product");
    return res.json();
  },
};
