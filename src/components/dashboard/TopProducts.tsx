
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TopProduct } from "@/lib/types";

interface TopProductsProps {
  products: TopProduct[];
}

export const TopProducts = ({ products }: TopProductsProps) => {
  // Find the maximum sales to calculate percentages
  const maxSales = Math.max(...products.map(product => product.sales));
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">
                  {product.sales} units
                </div>
              </div>
              <Progress value={(product.sales / maxSales) * 100} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Revenue: ${product.revenue.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
