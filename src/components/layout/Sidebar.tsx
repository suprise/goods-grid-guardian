
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package,
  ChevronLeft,
  ChevronRight,
  Settings,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, title: "Dashboard", path: "/dashboard" },
    { icon: Package, title: "Products", path: "/products" },
    { icon: ShoppingCart, title: "Orders", path: "/" },
    { icon: Settings, title: "Settings", path: "/settings" }
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar transition-all duration-300 h-screen flex flex-col border-r",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-primary">Inventory Pro</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          className={cn("ml-auto")} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                collapsed ? "justify-center" : "",
                isActive 
                  ? "bg-primary text-white" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            A
          </div>
          {!collapsed && <span className="ml-3 font-medium">Admin User</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
