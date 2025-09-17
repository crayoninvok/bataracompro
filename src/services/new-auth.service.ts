import { fetchApi } from "./api-services";
import { ApiError } from "@/types/api";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  role?: string;
  department?: string;
}

interface LoginResponse {
  token: string;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    department: string;
    avatar?: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    department: string;
    avatar?: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  console.log("🔄 Auth service: Starting login...");
  console.log("📧 Email:", email);
  
  try {
    const response = await fetchApi<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log("✅ Auth service: Login response received:", response);

    if (response.token) {
      localStorage.setItem("token", response.token);
      console.log("🔑 Token stored in localStorage");
    }

    if (response.user) {
      console.log("👤 User data received:", response.user.name);
    }

    return response;
  } catch (error) {
    console.error("❌ Auth service: Login error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Login failed");
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
  avatar: string,
  role: string,
  department: string
): Promise<RegisterResponse> {
  const payload: AuthPayload = {
    email,
    password,
    name,
    avatar,
    role,
    department,
  };

  try {
    const response = await fetchApi<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 400) {
      throw new Error("User already exists or invalid input");
    } else if (apiError.status === 403) {
      throw new Error("Admin access required");
    } else {
      throw new Error(apiError.message || "Failed to register");
    }
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    console.log("🚪 Token removed from localStorage");
  }
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return token !== null && token.length > 0;
}

export async function getCurrentUser() {
  console.log("🔄 Auth service: Fetching current user...");
  try {
    const response = await fetchApi<{
      message: string;
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
        department: string;
        avatar?: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>("/auth/me", {
      method: "GET",
    });

    console.log("✅ Auth service: Current user fetched:", response.user.name);
    return response;
  } catch (error) {
    console.error("❌ Auth service: Get current user error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to fetch user data");
  }
}