import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState, 
  useCallback 
} from "react";
import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/mock-data";
import { toast } from "sonner";

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  brandFilter: string;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setCategoryFilter: (category: string) => void;
  setBrandFilter: (brand: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  const getCategories = useCallback(() => {
    const categories = new Set(products.map(product => product.category));
    return Array.from(categories);
  }, [products]);

  const getBrands = useCallback(() => {
    const brands = new Set(products.map(product => (product as any).brand || '未知品牌'));
    return Array.from(brands);
  }, [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesBrand =
      brandFilter === 'all' ||
      ((product as any).brand || '未知品牌') === brandFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand;
  });

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newProduct: Product = {
        ...product,
        id: `${products.length + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      toast.success('Product added successfully');
      setIsLoading(false);
    }, 500);
  }, [products]);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === updatedProduct.id 
            ? { ...updatedProduct, updatedAt: new Date().toISOString() } 
            : product
        )
      );
      
      toast.success('Product updated successfully');
      setIsLoading(false);
    }, 500);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
      setIsLoading(false);
    }, 500);
  }, []);

  const getProduct = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setBrandFilter('all');
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      isLoading,
      searchTerm,
      statusFilter,
      categoryFilter,
      brandFilter,
      setSearchTerm,
      setStatusFilter,
      setCategoryFilter,
      setBrandFilter,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      resetFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
