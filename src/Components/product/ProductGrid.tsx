'use client';

import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  // Group products into columns for masonry effect
  const column1 = products.filter((_, index) => index % 2 === 0);
  const column2 = products.filter((_, index) => index % 2 === 1);
  const column3 = products.filter((_, index) => index % 4 === 0 || index % 4 === 2);
  const column4 = products.filter((_, index) => index % 4 === 1 || index % 4 === 3);

  return (
    <div className="px-6 mt-2 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {column1.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              // Apply alternating heights for masonry effect
              customHeight={index % 2 === 0 ? 'h-64' : 'h-48'}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {column2.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              customHeight={index % 2 === 0 ? 'h-48' : 'h-64'}
            />
          ))}
        </div>

        {/* Column 3 - Hidden on mobile */}
        <div className="hidden md:flex flex-col gap-6">
          {column3.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              customHeight={index % 2 === 0 ? 'h-48' : 'h-64'}
            />
          ))}
        </div>

        {/* Column 4 - Hidden on mobile */}
        <div className="hidden md:flex flex-col gap-6">
          {column4.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              customHeight={index % 2 === 0 ? 'h-64' : 'h-48'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};