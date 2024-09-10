import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  stock,
}) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  // Check if the item is in the cart
  const itemInCart = cart.find((item) => item.id === id);

  // Handler functions
  const handleIncrease = () => {
    if (itemInCart) {
      setQuantity((prev) => {
        const newQuantity = prev + 1;
        updateQuantity(id, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleDecrease = () => {
    if (itemInCart && quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        updateQuantity(id, newQuantity);
        return newQuantity;
      });
    } else if (itemInCart && quantity === 1) {
      setQuantity(0);
      updateQuantity(id, 0);
    }
  };

  const handleAddToCart = () => {
    if (!itemInCart) {
      setQuantity(1);
      addToCart({
        id,
        name,
        price,
        quantity: 1,
      });
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out w-[350px]">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription className="text-gray-500 mt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">₹{price.toFixed(2)}</h3>
          {stock > 0 ? (
            <p className="text-green-500 text-sm">In Stock</p>
          ) : (
            <p className="text-red-500 text-sm">Out of Stock</p>
          )}
        </div>
        {itemInCart ? (
          <div className="flex items-center space-x-4 mt-auto">
            <Button
              onClick={handleDecrease}
              className="rounded-full"
              size={"icon"}
            >
              <Minus size={20} />
            </Button>
            <span className="text-lg font-semibold">{itemInCart.quantity}</span>
            <Button
              onClick={handleIncrease}
              className="rounded-full"
              size={"icon"}
            >
              <Plus size={20} />
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart} className="mt-auto">
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
