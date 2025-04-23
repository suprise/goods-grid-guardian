
import { createContext, useContext, ReactNode, useState } from "react";
import { User, UserPermissions } from "@/lib/types";
import { mockUser } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: UserPermissions;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  
  // Determine permissions based on user role
  const getPermissions = (role: string): UserPermissions => {
    switch (role) {
      case 'admin':
        return {
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canExport: true
        };
      case 'manager':
        return {
          canCreate: true,
          canUpdate: true,
          canDelete: false,
          canExport: true
        };
      default:
        return {
          canCreate: false,
          canUpdate: false,
          canDelete: false,
          canExport: true
        };
    }
  };
  
  const permissions = user ? getPermissions(user.role) : {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canExport: false
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    // For now, we'll just set our mock user
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      permissions,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
