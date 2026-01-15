import { Product } from "../types/product";
import { productService } from "../services/product.service";
import { ProductsClient } from "../Components/product/ProductsClient";
import { BottomNavigation } from "../Components/layout/BottomNavigation";
import HomeBanner from "@/Components/ui/HomeBanner";
import Navbar from "@/Components/layout/Navbar";

export const revalidate = 0; // SSR (no caching)

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await productService.getAll(); // SSR fetch
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  const activeNav = "home";
  return (
    <div className=" scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100">
      <Navbar/>
      <HomeBanner />
      {/* Products Client (handles filtering, categories, product grid) */}
      <ProductsClient serverProducts={products} />

      {/* Bottom Navigation */}
      <BottomNavigation activeNav={activeNav} />
    </div>
  );
}
