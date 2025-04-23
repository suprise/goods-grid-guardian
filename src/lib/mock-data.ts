
import { Product, SalesData, TopProduct, SalesByCategory, User } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 15,
    status: 'active',
    createdAt: '2025-02-15T08:30:00Z',
    updatedAt: '2025-04-10T14:20:00Z',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    sku: 'LAP-PRO-001'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 199.99,
    stock: 42,
    status: 'active',
    createdAt: '2025-01-20T10:15:00Z',
    updatedAt: '2025-03-25T16:45:00Z',
    description: 'Noise-cancelling wireless headphones with 30h battery life',
    sku: 'WH-NC-002'
  },
  {
    id: '3',
    name: 'Smart Watch',
    category: 'Wearables',
    price: 249.99,
    stock: 8,
    status: 'active',
    createdAt: '2025-03-05T09:20:00Z',
    updatedAt: '2025-04-15T11:30:00Z',
    description: 'Fitness tracker with heart rate monitor and GPS',
    sku: 'SW-FIT-003'
  },
  {
    id: '4',
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 349.99,
    stock: 22,
    status: 'active',
    createdAt: '2025-02-28T13:40:00Z',
    updatedAt: '2025-04-12T09:15:00Z',
    description: 'Adjustable office chair with lumbar support',
    sku: 'FRN-CHR-004'
  },
  {
    id: '5',
    name: 'Smartphone X',
    category: 'Electronics',
    price: 899.99,
    stock: 30,
    status: 'active',
    createdAt: '2025-01-10T11:25:00Z',
    updatedAt: '2025-03-30T15:50:00Z',
    description: '6.7-inch smartphone with triple camera setup',
    sku: 'SPH-X-005'
  },
  {
    id: '6',
    name: 'Wireless Keyboard',
    category: 'Computer Accessories',
    price: 89.99,
    stock: 0,
    status: 'inactive',
    createdAt: '2025-02-20T14:10:00Z',
    updatedAt: '2025-04-05T10:30:00Z',
    description: 'Compact wireless keyboard with backlight',
    sku: 'KB-WL-006'
  },
  {
    id: '7',
    name: 'Coffee Maker',
    category: 'Kitchen Appliances',
    price: 129.99,
    stock: 18,
    status: 'active',
    createdAt: '2025-03-12T08:45:00Z',
    updatedAt: '2025-04-18T13:20:00Z',
    description: 'Programmable coffee maker with 12-cup capacity',
    sku: 'KA-CM-007'
  },
  {
    id: '8',
    name: 'Portable Speaker',
    category: 'Audio',
    price: 79.99,
    stock: 25,
    status: 'active',
    createdAt: '2025-01-25T15:30:00Z',
    updatedAt: '2025-03-22T12:10:00Z',
    description: 'Waterproof portable Bluetooth speaker',
    sku: 'SPK-BT-008'
  },
  {
    id: '9',
    name: 'Gaming Console',
    category: 'Electronics',
    price: 499.99,
    stock: 5,
    status: 'active',
    createdAt: '2025-03-01T16:20:00Z',
    updatedAt: '2025-04-08T09:45:00Z',
    description: 'Next-gen gaming console with 1TB storage',
    sku: 'GMC-PRO-009'
  },
  {
    id: '10',
    name: 'Desk Lamp',
    category: 'Lighting',
    price: 49.99,
    stock: 0,
    status: 'inactive',
    createdAt: '2025-02-10T12:15:00Z',
    updatedAt: '2025-03-15T14:30:00Z',
    description: 'Adjustable LED desk lamp with USB charging port',
    sku: 'LGT-DSK-010'
  }
];

export const mockSalesData: SalesData[] = [
  { date: '2025-04-16', revenue: 4250.75, orders: 12 },
  { date: '2025-04-17', revenue: 3890.50, orders: 10 },
  { date: '2025-04-18', revenue: 5120.25, orders: 15 },
  { date: '2025-04-19', revenue: 6320.80, orders: 18 },
  { date: '2025-04-20', revenue: 4780.30, orders: 13 },
  { date: '2025-04-21', revenue: 5340.90, orders: 16 },
  { date: '2025-04-22', revenue: 4890.40, orders: 14 },
  { date: '2025-04-23', revenue: 6120.60, orders: 17 }
];

export const mockTopProducts: TopProduct[] = [
  { id: '1', name: 'Laptop Pro', sales: 28, revenue: 36399.72 },
  { id: '5', name: 'Smartphone X', sales: 24, revenue: 21599.76 },
  { id: '3', name: 'Smart Watch', sales: 18, revenue: 4499.82 },
  { id: '2', name: 'Wireless Headphones', sales: 15, revenue: 2999.85 },
  { id: '9', name: 'Gaming Console', sales: 12, revenue: 5999.88 }
];

export const mockSalesByCategory: SalesByCategory[] = [
  { category: 'Electronics', sales: 64 },
  { category: 'Audio', sales: 23 },
  { category: 'Wearables', sales: 18 },
  { category: 'Furniture', sales: 8 },
  { category: 'Kitchen Appliances', sales: 12 }
];

export const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};
