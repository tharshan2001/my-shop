"use client";

import Link from "next/link";
import Image from "next/image";
import ShoppingBagsIcon from "../ui/ShoppingBagsIcon";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  customHeight?: string;
}

export function ProductCard({ product, customHeight = "h-64" }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart:", product.id);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="cursor-pointer relative">
        <div className={`relative rounded-2xl overflow-hidden bg-gray-100 mb-3 ${customHeight}`}>
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute right-5 bottom-[65px] z-10 transform translate-y-1/2 bg-black text-white p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <ShoppingBagsIcon size={16} />
        </button>

        <h3 className="text-lg font-bold text-gray-900 leading-tight mt-3">
          ${product.price.toFixed(2)}
        </h3>
        <p className="text-gray-500 text-sm mt-0.5">{product.name}</p>
      </div>
    </Link>
  );
}
