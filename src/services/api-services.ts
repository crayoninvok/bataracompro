// src/services/api.ts
import { ApiError } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message || "Something went wrong",
        status: response.status,
      } as ApiError;
    }

    return data as T;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export function getAuthHeader(): Record<string, string> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
}
