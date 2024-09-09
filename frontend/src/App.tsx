import { CartProvider } from "./context/CartContext";
import Products from "./pages/Home/Products";

function App() {
  return (
    <CartProvider>
      <Products />
    </CartProvider>
  );
}

export default App;
