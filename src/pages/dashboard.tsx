
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { 
  TrendingUp, 
  ShoppingBag, 
  BarChart3, 
  DollarSign
} from "lucide-react";
import { 
  mockSalesData, 
  mockTopProducts, 
  mockSalesByCategory
} from "@/lib/mock-data";

const DashboardPage = () => {
  // Calculate total revenue from sales data
  const totalRevenue = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
  
  // Calculate total orders from sales data
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  
  // Calculate average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calculate revenue growth (comparing last two days)
  const revenueGrowth = mockSalesData.length >= 2 
    ? ((mockSalesData[mockSalesData.length - 1].revenue / mockSalesData[mockSalesData.length - 2].revenue) - 1) * 100
    : 0;
    
  // Calculate orders growth (comparing last two days)
  const ordersGrowth = mockSalesData.length >= 2 
    ? ((mockSalesData[mockSalesData.length - 1].orders / mockSalesData[mockSalesData.length - 2].orders) - 1) * 100
    : 0;
  
  return (
    <Layout title="Dashboard">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Sales Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your store's performance
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend={{ value: parseFloat(revenueGrowth.toFixed(1)), isPositive: revenueGrowth > 0 }}
          description="vs yesterday"
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders.toString()}
          icon={<ShoppingBag className="h-5 w-5 text-primary" />}
          trend={{ value: parseFloat(ordersGrowth.toFixed(1)), isPositive: ordersGrowth > 0 }}
          description="vs yesterday"
        />
        <StatCard 
          title="Avg. Order Value" 
          value={`$${averageOrderValue.toFixed(2)}`}
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          description="per order"
        />
        <StatCard 
          title="Conversion Rate" 
          value="24.8%"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          trend={{ value: 2.1, isPositive: true }}
          description="vs last week"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <SalesChart data={mockSalesData} />
        <CategoryChart data={mockSalesByCategory} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts products={mockTopProducts} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
