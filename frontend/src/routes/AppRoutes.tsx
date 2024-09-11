import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import AdminPanel from "@/pages/admin/Admin";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/auth/Signup";
import Login from "@/pages/auth/Login";
import HomePage from "@/pages/Home/HomePage";
import Success from "@/pages/Success";
import Failed from "@/pages/Faield";

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            user?.role === "admin" ? (
              <AdminPanel />
            ) : (
              <NotFound />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
