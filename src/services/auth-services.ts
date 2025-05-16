// src/services/auth-services.ts
import { fetchApi, getAuthHeader } from "./api-services";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth";

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async loginAdmin(data: LoginRequest): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  async loginEmployee(data: LoginRequest): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/employe/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  async registerEmployee(data: RegisterRequest): Promise<AuthResponse> {
    // Validate email domain before sending request
    if (!data.email.endsWith('@bataramining.com')) {
      throw new Error('Employee registration requires a valid @bataramining.com email address');
    }
    
    return fetchApi<AuthResponse>("/auth/employe/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getCurrentUser(): Promise<User> {
    return fetchApi<{ user: User }>("/profile", {
      headers: getAuthHeader(),
    }).then((data) => data.user);
  },
  
  async getCurrentEmployee(): Promise<User> {
    return fetchApi<{ user: User }>("/employe/profile", {
      headers: getAuthHeader(),
    }).then((data) => data.user);
  },

  logout(): void {
    localStorage.removeItem("token");
  },
  
  logoutEmployee(): void {
    localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      localStorage.removeItem("employee");
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },
  
  isEmployeeLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    const employeeData = localStorage.getItem("employee");
    return !!token && !!employeeData;
  },
  
  getEmployeeData(): any {
    if (typeof window === "undefined") return null;
    const employeeData = localStorage.getItem("employee");
    return employeeData ? JSON.parse(employeeData) : null;
  },
  
  storeEmployeeData(employee: any): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("employee", JSON.stringify(employee));
    }
  }
};