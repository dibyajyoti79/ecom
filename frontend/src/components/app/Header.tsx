// src/components/Header.tsx
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import the CartContext
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const { cart } = useCart(); // Get the cart context
  const { isAuthenticated, user, logout } = useAuth(); // Get the auth context
  const navigate = useNavigate();

  const cartItemCount = cart.length;

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger>
              <div className="relative cursor-pointer">
                <ShoppingCart className="text-gray-500" size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>

          {!isAuthenticated ? (
            <User
              className="text-gray-500 cursor-pointer"
              size={24}
              onClick={handleSignIn}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/username?username=${user?.name}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-3">
                {user?.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Manage
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
