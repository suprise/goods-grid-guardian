
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";

interface ProductFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onReset: () => void;
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  brandFilter: string;
}

export const ProductFilters = ({
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onBrandChange,
  onReset,
  searchTerm,
  statusFilter,
  categoryFilter,
  brandFilter,
}: ProductFiltersProps) => {
  const { products } = useProducts();
  
  // Get unique categories
  const categories = useCallback(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories);
  }, [products]);
  // Get unique brands
  const brands = useCallback(() => {
    const uniqueBrands = new Set(products.map(product => (product as any).brand || '未知品牌'));
    return Array.from(uniqueBrands);
  }, [products]);
  
  const hasActiveFilters =
    searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || brandFilter !== 'all';

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-[150px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Categories</SelectItem>
            {categories().map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <Select value={brandFilter} onValueChange={onBrandChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Brands</SelectItem>
            {brands().map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <X size={14} />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
