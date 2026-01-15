import Link from "next/link";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <Link
        href={`/product/${product.id}`}
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}