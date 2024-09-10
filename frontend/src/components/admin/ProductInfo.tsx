import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";

interface ProductInfoProps {
  product?: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
  fetchProducts: () => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

const ProductInfo = ({
  product,
  fetchProducts,
  setIsDialogOpen,
}: ProductInfoProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isEdit = product !== undefined;

  useEffect(() => {
    if (isEdit && product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    }
  }, [product, isEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "" || description === "" || price === "" || stock === "") {
      toast.error("All fields are required");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    if (isNaN(Number(stock)) || Number(stock) < 0) {
      toast.error("Stock must be a non-negative number");
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      };

      let response;
      if (isEdit) {
        response = await fetch(`/api/v1/products/${product?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch("/api/v1/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      toast.success(
        isEdit ? "Product updated successfully!" : "Product added successfully!"
      );
      fetchProducts();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter product stock"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating Product..."
                : "Adding Product..."
              : isEdit
              ? "Update Product"
              : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductInfo;
