import { useState } from "react";
import Header from "../../components/app/Header";
import ProductsPage from "../../components/app/Products";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="relative min-h-screen">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="pt-32 p-6">
        <ProductsPage searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default HomePage;
