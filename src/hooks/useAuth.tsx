"use client";
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  login,
  register,
  logout,
  getAuthToken,
  isAuthenticated,
  getCurrentUser,
} from "@/services/new-auth.service";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    avatar: string,
    role: string,
    department: string
  ) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ FIXED: Better initialization
  useEffect(() => {
    if (!isMounted) return;

    const initializeAuth = async () => {
      console.log('🔄 Initializing auth...');
      setIsLoading(true);
      
      const storedToken = getAuthToken();
      console.log('🔑 Stored token exists:', !!storedToken);
      
      if (storedToken) {
        setToken(storedToken);
        
        try {
          console.log('👤 Fetching current user...');
          const response = await getCurrentUser();
          setUser(response.user);
          console.log('✅ User data fetched successfully:', response.user.name);
        } catch (error) {
          console.error('❌ Failed to fetch user data:', error);
          setUser(null);
          setToken(null);
          logout();
        }
      } else {
        console.log('ℹ️ No token found, user not authenticated');
        setUser(null);
        setToken(null);
      }
      
      console.log('✅ Auth initialization complete');
      setIsLoading(false);
    };

    initializeAuth();
  }, [isMounted]);

  // ✅ FIXED: Simplified login handler
  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('🔄 Starting login process...');
      
      const response = await login(email, password);

      // Set both token and user from the login response
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        console.log('✅ Login successful:', response.user.name);
        
        // Navigate to dashboard
        console.log('🚀 Redirecting to dashboard...');
        router.push("/dashboard-emp");
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setToken(null);
      setUser(null);
      logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleRegister = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      avatar: string,
      role: string,
      department: string
    ) => {
      try {
        setIsLoading(true);
        console.log('🔄 Starting registration process...');
        
        const response = await register(
          email,
          password,
          name,
          avatar,
          role,
          department
        );

        if (response.user) {
          console.log('👤 User registered successfully:', response.user.name);
          // Note: Registration doesn't auto-login, so don't set auth state
        }
      } catch (error) {
        console.error('❌ Registration error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    console.log('🚪 Logging out...');
    logout();
    setUser(null);
    setToken(null);
    console.log('✅ Auth state cleared');
    router.push("/login-web");
  }, [router]);

  const refreshAuth = useCallback(async () => {
    if (!isMounted) {
      console.log('⏳ Component not mounted yet, skipping refresh');
      return;
    }

    console.log('🔄 Refreshing auth state...');
    const storedToken = getAuthToken();
    
    if (storedToken) {
      setToken(storedToken);
      
      try {
        const response = await getCurrentUser();
        setUser(response.user);
        console.log('✅ Auth refreshed successfully:', response.user.name);
      } catch (error) {
        console.error('❌ Failed to refresh auth:', error);
        setUser(null);
        setToken(null);
        logout();
      }
    } else {
      setUser(null);
      setToken(null);
      console.log('ℹ️ No token found during refresh');
    }
  }, [isMounted]);

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: isMounted ? (token !== null && user !== null) : false,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshAuth,
  };

  // Debug logging
  useEffect(() => {
    if (isMounted) {
      console.log('🔍 Auth State Update:', {
        hasUser: !!user,
        userName: user?.name,
        userRole: user?.role,
        hasToken: !!token,
        isLoading,
        isAuthenticated: token !== null && user !== null,
        isAdmin,
      });
    }
  }, [user, token, isLoading, isAdmin, isMounted]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function useAuthToken(): string | null {
  const { token } = useAuth();
  return token;
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

// ============================================================================
// 6. FRONTEND - API Services (api-services.ts) - Make sure this exists
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiError {
  message: string;
  status: number;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      const error: ApiError = {
        message: errorData.message || `HTTP ${response.status}`,
        status: response.status,
      };
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && 'status' in error) {
      throw error;
    }
    
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
    throw apiError;
  }
}