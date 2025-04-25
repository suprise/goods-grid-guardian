import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductForm } from "@/components/products/ProductForm";
import { Product } from "@/lib/types";
import { useProducts } from "@/contexts/ProductContext";
import { useAuth } from "@/contexts/AuthContext";

const ProductsPage = () => {
  const { 
    filteredProducts, 
    searchTerm,
    statusFilter,
    categoryFilter,
    brandFilter,
    stockFilter,
    setSearchTerm,
    setStatusFilter,
    setCategoryFilter,
    setBrandFilter,
    setStockFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    resetFilters
  } = useProducts();
  
  const { permissions } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  
  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };
  
  const handleSubmit = (productData: Partial<Product>) => {
    if (selectedProduct) {
      updateProduct({
        ...selectedProduct,
        ...productData
      } as Product);
    } else {
      addProduct(productData as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
    }
    setIsFormOpen(false);
  };
  
  return (
    <Layout title="Products">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">
            Manage your products inventory
          </p>
        </div>
        
        {permissions.canCreate && (
          <Button onClick={handleAddProduct} className="flex items-center gap-1">
            <Plus size={18} />
            Add Product
          </Button>
        )}
      </div>
      
      <ProductFilters
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onBrandChange={setBrandFilter}
        onStockChange={setStockFilter}
        onReset={resetFilters}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        brandFilter={brandFilter}
        stockFilter={stockFilter}
      />
      
      <ProductTable 
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={deleteProduct}
      />
      
      <ProductForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default ProductsPage;
