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

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getCurrentUser(): Promise<User> {
    return fetchApi<{ user: User }>("/profile", {
      headers: getAuthHeader(),
    }).then((data) => data.user);
  },

  logout(): void {
    localStorage.removeItem("token");
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },
};
