
import { 
  createContext,
  useContext, 
  ReactNode, 
  useState, 
  useCallback, 
  useEffect 
} from "react";
import { Product } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// ProductContextType 不变
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
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper function to map database response to Product type
const mapDbProductToProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category,
    price: dbProduct.price,
    stock: dbProduct.stock,
    status: dbProduct.status as 'active' | 'inactive',
    sku: dbProduct.sku,
    description: dbProduct.description || '',
    image: dbProduct.image || '',
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at
  };
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  // 初始化加载数据库商品
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Error loading products");
        setProducts([]);
      } else {
        // Map the database response to our Product type
        setProducts(data.map(mapDbProductToProduct));
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // CRUD 操作
  const addProduct = useCallback(
    async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();

      if (error) {
        toast.error("Failed to add product");
      } else if (data) {
        setProducts(prev => [mapDbProductToProduct(data), ...prev]);
        toast.success("Product added successfully");
      }
      setIsLoading(false);
    },
    []
  );

  const updateProduct = useCallback(
    async (updatedProduct: Product) => {
      setIsLoading(true);
      
      // Convert from Product type to DB schema (removing properties not in DB)
      const dbProduct = {
        id: updatedProduct.id,
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        status: updatedProduct.status,
        sku: updatedProduct.sku,
        description: updatedProduct.description,
        image: updatedProduct.image,
      };
      
      const { data, error } = await supabase
        .from("products")
        .update(dbProduct)
        .eq("id", updatedProduct.id)
        .select()
        .single();

      if (error) {
        toast.error("Failed to update product");
      } else if (data) {
        setProducts(prev =>
          prev.map(product => 
            product.id === updatedProduct.id ? mapDbProductToProduct(data) : product
          )
        );
        toast.success("Product updated successfully");
      }
      setIsLoading(false);
    },
    []
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setIsLoading(true);
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Failed to delete product");
      } else {
        setProducts(prev => prev.filter(product => product.id !== id));
        toast.success("Product deleted successfully");
      }
      setIsLoading(false);
    },
    []
  );

  const getProduct = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setBrandFilter('all');
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || ((product as any).brand || '未知品牌') === brandFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand;
  });

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
