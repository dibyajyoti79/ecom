import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext"; // Import the CartContext

const Cart = () => {
  const { cart } = useCart(); // Get the cart context

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
            <hr className="mt-4" />
            <div className="mt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="py-4">
        <Button className="w-full">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
