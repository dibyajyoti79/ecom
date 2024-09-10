import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ProductTable } from "./ProductTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductInfo from "@/components/admin/ProductInfo";
import toast from "react-hot-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/v1/products");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`/api/v1/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      fetchProducts();
    } catch (error: any) {
      toast.error(error.message);
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedProduct(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4">
            <Button onClick={() => handleEdit(row.original)}>Edit</Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 relative min-h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4">
        <Button onClick={handleAddNewProduct}>Add New Product</Button>

        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault(); // Prevent closing on outside click
            }}
          >
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Edit Product" : "Add a New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductInfo
              product={selectedProduct || undefined}
              fetchProducts={fetchProducts}
              setIsDialogOpen={setIsDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mx-auto my-4">
        <ProductTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default AdminPanel;
