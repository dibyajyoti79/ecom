import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductsPage = ({ searchTerm }: { searchTerm: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const reponse = await fetch("/api/v1/products");

        if (!reponse.ok) {
          const errorData = await reponse.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }
        const data = await reponse.json();
        setProducts(data.data.products);
        setDiscount(data.data.discount);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-4">
      {loading && (
        <div className="text-center w-full">
          <p className="text-gray-600 text-lg font-semibold">Loading...</p>
        </div>
      )}
      {!loading && filteredProducts?.length === 0 && (
        <div className="text-center w-full">
          <p className="text-gray-600 text-lg font-semibold">
            No products found
          </p>
        </div>
      )}
      {!loading && filteredProducts?.length > 0 && (
        <>
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              discount={discount}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
