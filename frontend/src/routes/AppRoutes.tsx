// src/routes/AppRoutes.tsx
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import ProductsPage from "@/pages/Home/Products";
import AdminPanel from "@/pages/admin/Admin";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            user?.isAdmin ? (
              <AdminPanel />
            ) : (
              <NotFound />
            )
          ) : (
            <Navigate to="/auth" state={{ from: redirectPath }} />
          )
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
