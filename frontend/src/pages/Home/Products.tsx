import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import the CartContext
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description:
      "Compact and stylish wireless earbuds with noise cancellation.",
    price: 2999,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Smartwatch",
    description:
      "Feature-packed smartwatch with fitness tracking and notifications.",
    price: 4999,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with rich sound and long battery life.",
    price: 1999,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "4K Action Camera",
    description:
      "Capture stunning 4K videos and photos with this action camera.",
    price: 7499,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Gaming Headset",
    description:
      "High-performance gaming headset with surround sound and noise-cancelling mic.",
    price: 3599,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { cart } = useCart(); // Get the cart context
  const { isAuthenticated } = useAuth(); // Get the cart context
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchProducts = async () => {
      try {
        const data = dummyProducts; // Use dummy data
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);
  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const cartItemCount = cart.length;
  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <Input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger>
                <div className="relative cursor-pointer">
                  <ShoppingCart className="text-gray-500" size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Cart Items</SheetTitle>
                </SheetHeader>
                <Cart />
              </SheetContent>
            </Sheet>

            {!isAuthenticated && (
              <User
                className="text-gray-500 cursor-pointer"
                size={24}
                onClick={handleSignIn}
              />
            )}
          </div>
        </div>
      </header>

      {/* Content with Padding */}
      <main className="pt-32 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
