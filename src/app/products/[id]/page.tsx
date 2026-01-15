import { productService } from "../../../services/product.service";
import { Product } from "../../../types/product";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../Components/ui/Loader";

export default function ProductDetailPage() {
    
  const params = useParams();
  if (!params) return <div>Loading...</div>;
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Product not found");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <div className="mb-4">
          <span className="font-semibold mr-2">Sizes:</span>
          {product.sizes.join(", ")}
        </div>
        <div className="mb-4">
          <span className="font-semibold mr-2">Category:</span>
          {product.category}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}