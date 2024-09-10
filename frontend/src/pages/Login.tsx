import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Login = ({ switchToSignUp }: { switchToSignUp: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      // Replace with your login API call
      console.log({ email, password });
      // Navigate to home page or dashboard
      // navigate("/dashboard");
      // await login(formData.username, formData.password);
      // Redirect to the original location or home
      const redirectPath = (location.state as any)?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 border rounded shadow-md bg-white">
        <h2 className="text-2xl mb-6 text-center font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <button
              onClick={switchToSignUp}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
