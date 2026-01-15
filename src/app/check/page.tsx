'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Settings,
  Home,
} from 'lucide-react';

/* -------------------- Types -------------------- */

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  height: string;
};

type ProductCardProps = {
  product: Product;
};

type NavButtonProps = {
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

/* -------------------- Page -------------------- */

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeNav, setActiveNav] = useState<string>('Home');

  const categories: string[] = ['All', 'Men', 'Women', 'Kids', 'Other'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Tagerine Shirt',
      price: '$240.32',
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      category: 'Tagerine Shirt',
      height: 'h-64',
    },
    {
      id: 2,
      name: 'Leather Coart',
      price: '$325.36',
      image:
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      category: 'Leather Coart',
      height: 'h-48',
    },
    {
      id: 3,
      name: 'Tagerine Shirt',
      price: '$126.47',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      category: 'Tagerine Shirt',
      height: 'h-48',
    },
    {
      id: 4,
      name: 'Leather Coart',
      price: '$257.85',
      image:
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=800&q=80',
      category: 'Leather Coart',
      height: 'h-64',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center mb-6">
          <button className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <div className="grid grid-cols-2 gap-1 w-6 h-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full border-2 border-gray-800"
                />
              ))}
            </div>
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://i.pravatar.cc/100?img=33"
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-gray-400 text-sm mt-1">
          Best trendy collection!
        </p>
      </header>

      {/* Categories */}
      <div className="pl-6 py-4 overflow-x-auto">
        <div className="flex space-x-6 pr-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-sm font-medium whitespace-nowrap transition
                ${
                  activeTab === cat
                    ? 'bg-orange-500 text-white px-6 py-2 rounded-full shadow'
                    : 'text-gray-500 hover:text-gray-900 py-2'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="px-6 mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-6">
            <ProductCard product={products[0]} />
            <ProductCard product={products[2]} />
          </div>

          <div className="flex flex-col gap-6">
            <ProductCard product={products[1]} />
            <ProductCard product={products[3]} />
          </div>

          <div className="hidden md:flex flex-col gap-6">
            <ProductCard product={products[1]} />
            <ProductCard product={products[0]} />
          </div>

          <div className="hidden md:flex flex-col gap-6">
            <ProductCard product={products[2]} />
            <ProductCard product={products[3]} />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t py-4 px-8 shadow z-20">
        <div className="flex justify-between max-w-4xl mx-auto">
          <NavButton
            icon={<Home size={24} />}
            label="Home"
            isActive={activeNav === 'Home'}
            onClick={() => setActiveNav('Home')}
          />

          <NavButton
            icon={<Search size={24} />}
            label="Search"
            isActive={activeNav === 'Search'}
            onClick={() => setActiveNav('Search')}
          />

          <NavButton
            icon={<ShoppingBag size={24} />}
            label="Cart"
            isActive={activeNav === 'Cart'}
            onClick={() => setActiveNav('Cart')}
          />

          <NavButton
            icon={<Settings size={24} />}
            label="Settings"
            isActive={activeNav === 'Settings'}
            onClick={() => setActiveNav('Settings')}
          />
        </div>
      </nav>
    </div>
  );
}

/* -------------------- Components -------------------- */

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div
        className={`relative rounded-2xl overflow-hidden bg-gray-100 mb-3 ${product.height}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <button className="absolute bottom-3 right-3 bg-black text-white p-2.5 rounded-full">
          <ShoppingBag size={16} fill="white" />
        </button>
      </div>

      <h3 className="text-lg font-bold">{product.price}</h3>
      <p className="text-gray-500 text-sm">{product.category}</p>
    </div>
  );
};

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition
        ${
          isActive
            ? 'text-orange-500'
            : 'text-gray-400 hover:text-gray-600'
        }`}
    >
      {isActive
        ? React.cloneElement(icon, { fill: 'currentColor' })
        : icon}
      <span className="text-[10px] font-medium">{label}</span>
      {isActive && (
        <div className="w-1 h-1 bg-orange-500 rounded-full" />
      )}
    </button>
  );
};