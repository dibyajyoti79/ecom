import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
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
        imageUrl,
      });
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xl font-bold mb-4">₹{price.toFixed(2)}</p>
        {itemInCart ? (
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleDecrease}
              className="rounded-full"
              size={"icon"}
            >
              <Minus size={20} />
            </Button>
            <span className="text-lg">{itemInCart.quantity}</span>
            <Button
              onClick={handleIncrease}
              className="rounded-full"
              size={"icon"}
            >
              <Plus size={20} />
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
