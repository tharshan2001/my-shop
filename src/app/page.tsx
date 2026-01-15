"use client";

import { useEffect, useState } from "react";
import { productService } from "../services/product.service";
import { ProductGrid } from "../Components/product/ProductGrid";
import { Product } from "../types/product";
import Loader from "../Components/ui/Loader";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}