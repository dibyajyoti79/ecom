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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const reponse = await fetch("/api/v1/product/get-all");

        if (!reponse.ok) {
          const errorData = await reponse.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }
        const data = await reponse.json();
        setProducts(data.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-6">
      {filteredProducts?.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
