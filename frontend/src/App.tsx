// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Ensure Router is imported
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      {" "}
      {/* Router wraps everything */}
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
