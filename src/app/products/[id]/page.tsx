"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loader from "../../../Components/ui/Loader";
import { productService } from "../../../services/product.service";
import { Product } from "../../../types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function fetchProduct() {
      try {
        const data = await productService.getById(id!);
        if (isMounted) setProduct(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Product not found");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!id) return <p className="text-gray-500">Invalid Product ID</p>;
  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p className="text-gray-500">Product not found</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 relative h-96 md:h-[500px] w-full rounded-md overflow-hidden">
        {product.image && product.image.length > 0 ? (
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description || "No description available."}</p>
        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>

        <div className="mb-4">
          <span className="font-semibold mr-2">Sizes:</span>
          {product.sizes && product.sizes.length > 0 ? product.sizes.join(", ") : "N/A"}
        </div>

        <div className="mb-4">
          <span className="font-semibold mr-2">Category:</span>
          {product.category || "N/A"}
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
