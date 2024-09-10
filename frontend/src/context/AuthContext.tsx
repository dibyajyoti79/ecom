// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Replace with actual user type
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Replace with actual user type
  const navigate = useNavigate();

  useEffect(() => {
    // Implement logic to check if user is authenticated
    const checkAuth = async () => {
      // Replace with actual API call
      const response = await fetch("/api/auth/status");
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUser(data.user);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    // Implement login logic
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.isAuthenticated) {
      setIsAuthenticated(true);
      setUser(data.user);
      // Redirect after login
      navigate("/");
    }
  };

  const logout = () => {
    // Implement logout logic
    setIsAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
