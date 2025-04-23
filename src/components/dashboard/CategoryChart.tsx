
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { SalesByCategory } from "@/lib/types";

interface CategoryChartProps {
  data: SalesByCategory[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
  // Colors for the pie chart
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--primary)/80)',
    'hsl(var(--primary)/60)',
    'hsl(var(--primary)/40)',
    'hsl(var(--primary)/20)',
    'hsl(var(--info))',
    'hsl(var(--info)/80)',
    'hsl(var(--success))',
    'hsl(var(--success)/80)',
  ];
  
  // Calculate total sales
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
                nameKey="category"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="hsl(var(--foreground))"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: '12px',
                }}
              />
              <Tooltip
                formatter={(value) => [`${value} units (${((value as number / totalSales) * 100).toFixed(1)}%)`, 'Sales']}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
