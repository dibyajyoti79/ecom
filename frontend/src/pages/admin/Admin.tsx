import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Dummy data for demonstration purposes
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description:
      "Compact and stylish wireless earbuds with noise cancellation.",
    price: 2999,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Smartwatch",
    description:
      "Feature-packed smartwatch with fitness tracking and notifications.",
    price: 4999,
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more products as needed
];

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    // Implement logic to open edit modal or navigate to edit page
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
    // Implement logic to delete product from backend
  };

  const handleAddNewProduct = () => {
    // Implement logic to open add product modal or navigate to add product page
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button
          onClick={handleAddNewProduct}
          className="bg-blue-500 text-white"
        >
          Add New Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex-1 flex items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-sm font-medium">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(product)}
                  className="text-yellow-600"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
