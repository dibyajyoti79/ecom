import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const Cart = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    try {
      const stripe = await loadStripe(
        "pk_test_51OdAKWSEiI4FOhbP0DIMppqavHmNsrQ0qxJEprD8JTsMM8XiJFe3VGziLp5kNT7mCQo5NXfHArSL1OeO7mwQkzcw00f0uJRWT0"
      );

      const payload = {
        products: cart,
      };
      const response = await fetch("/api/v1/order/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session"
        );
      }
      const { data } = await response.json();
      const result = await stripe!.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-md font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">
                      Qty: {item.quantity}
                    </span>
                    <span className="text-sm font-medium">
                      Total: ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {cart.length > 1 ? (
              <div className="mt-4 flex justify-between font-semibold text-green-600">
                <span>Extra 5% off:</span>
                <span>-₹{(totalPrice * 0.05).toFixed(2)}</span>
              </div>
            ) : (
              <div className="mt-4 flex justify-between font-semibold text-sm text-green-600">
                <span>Add one more item to get 5% off 🎉</span>
              </div>
            )}
            <hr className="mt-4" />
            <div className="mt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>
                ₹
                {cart.length > 1
                  ? (totalPrice - totalPrice * 0.05).toFixed(2)
                  : totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="py-4">
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : isAuthenticated
              ? "Proceed to Checkout"
              : "Login to Checkout"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
