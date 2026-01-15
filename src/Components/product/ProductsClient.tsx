'use client';

import { useState } from "react";
import { ProductGrid } from "./ProductGrid";
import { Product } from "../../types/product";

interface Props {
  serverProducts: Product[];
}

export function ProductsClient({ serverProducts }: Props) {
  const [products] = useState<Product[]>(serverProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(serverProducts);
  const [categories] = useState<string[]>(["All", ...Array.from(new Set(serverProducts.map(p => p.category)))]);
  const [activeTab, setActiveTab] = useState<string>("All");

  const handleTabClick = (cat: string) => {
    setActiveTab(cat);
    setFilteredProducts(cat === "All" ? products : products.filter(p => p.category === cat));
  };

  return (
    <div className="container mx-auto">
      {/* Categories */}
      <div className="pl-9 overflow-x-auto pb-3">
        <div className="flex space-x-6 pr-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabClick(cat)}
              className={`text-sm font-l whitespace-nowrap transition
                ${
                  activeTab === cat
                    ? 'bg-orange-500/80 text-white px-6 py-1 rounded-full shadow'
                    : 'text-gray-500 hover:text-gray-900 py-1'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
