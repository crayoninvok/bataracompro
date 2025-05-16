import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-services";
import { ApiResponse } from "@/types/api";
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadUser = async () => {
      if (!authService.isLoggedIn()) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err: any) {
        console.error("Failed to load user:", err);
        if (err.status === 401) {
          authService.logout();
        }
        setError(err.message || "Failed to authenticate");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);

      if (response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }

      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Login failed");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.loginAdmin(credentials);
      localStorage.setItem("token", response.token);

      if (response.admin) {
        setUser({
          ...response.admin,
          role: "ADMIN",
        });
      }

      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Admin login failed");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const loginEmployee = async (
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate email domain
      if (!credentials.email.endsWith('@bataramining.com')) {
        throw new Error('Please use your @bataramining.com email address');
      }
      
      const response = await authService.loginEmployee(credentials);
      localStorage.setItem("token", response.token);

      if (response.employee) {
        setUser({
          ...response.employee,
          role: "EMPLOYEE",
        });
        // Store employee data separately for employee-specific functions
        authService.storeEmployeeData(response.employee);
      }

      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Employee login failed");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    data: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Registration failed");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const registerEmployee = async (
    data: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!data.email.endsWith('@bataramining.com')) {
        throw new Error('Employee registration requires a valid @bataramining.com email address');
      }
      
      const response = await authService.registerEmployee(data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Employee registration failed");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    const isAdmin = user?.role === "ADMIN";
    const isEmployee = user?.role === "EMPLOYEE";
    
    if (isEmployee) {
      authService.logoutEmployee();
    } else {
      authService.logout();
    }
    
    setUser(null);
    
    if (isAdmin) {
      window.location.assign("/login-admin");
    } else if (isEmployee) {
      window.location.assign("/employee/login");
    } else {
      window.location.assign("/login");
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isEmployee: user?.role === "EMPLOYEE",
    login,
    loginAdmin,
    loginEmployee,
    register,
    registerEmployee,
    logout,
  };
}