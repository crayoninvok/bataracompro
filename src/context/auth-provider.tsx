"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, LoginRequest, RegisterRequest } from "@/types/auth";
import { ApiResponse } from "@/types/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  login: (credentials: LoginRequest) => Promise<ApiResponse<any>>;
  loginAdmin: (credentials: LoginRequest) => Promise<ApiResponse<any>>;
  loginEmployee: (credentials: LoginRequest) => Promise<ApiResponse<any>>;
  register: (data: RegisterRequest) => Promise<ApiResponse<any>>;
  registerEmployee: (data: RegisterRequest) => Promise<ApiResponse<any>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}