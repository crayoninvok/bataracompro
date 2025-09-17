import { fetchApi } from "./api-services";
import { ApiError } from "@/types/api";

interface UpdateUserPayload {
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  role?: string;
  department?: string;
}

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

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetchApi<{ message: string; users: User[] }>("/users", {
      method: "GET",
    });

    return response.users;
  } catch (error) {
    console.error("❌ User service: Get all users error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to fetch users");
  }
}

export async function getUserById(userId: string): Promise<User> {
  try {
    const response = await fetchApi<{ message: string; user: User }>(
      `/users/${userId}`,
      {
        method: "GET",
      }
    );

    return response.user;
  } catch (error) {
    console.error("❌ User service: Get user by ID error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to fetch user by ID");
  }
}

export async function updateUserProfile(payload: UpdateUserPayload): Promise<User> {
  try {
    const response = await fetchApi<{ message: string; user: User }>(
      "/users/profile",
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );

    return response.user;
  } catch (error) {
    console.error("❌ User service: Update profile error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to update profile");
  }
}

export async function updateUserByAdmin(
  userId: string,
  payload: UpdateUserPayload
): Promise<User> {
  try {
    const response = await fetchApi<{ message: string; user: User }>(
      `/users/profile/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );

    return response.user;
  } catch (error) {
    console.error("❌ User service: Update user by admin error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to update user");
  }
}

export async function createUser(payload: UpdateUserPayload): Promise<User> {
  try {
    const response = await fetchApi<{ message: string; user: User }>(
      "/users/create",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    return response.user;
  } catch (error) {
    console.error("❌ User service: Create user error:", error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || "Failed to create user");
  }
}
