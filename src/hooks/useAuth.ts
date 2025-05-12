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
          role: "ADMIN", // ✅ tambahkan ini supaya cocok dengan tipe User
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

  const logout = () => {
    const isAdmin = user?.role === "ADMIN";
    authService.logout();
    setUser(null);
    router.push(isAdmin ? "/admin/login" : "/login");
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    login,
    loginAdmin,
    register,
    logout,
  };
}
