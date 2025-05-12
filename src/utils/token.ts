// src/utils/token.ts
// Utility functions for JWT token handling

const TOKEN_KEY = "auth_token";

/**
 * Store authentication token in localStorage
 */
export const setToken = (token: string): void => {
  console.log(
    "Setting token (truncated for security):",
    token.slice(0, 10) + "..."
  );
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      const storedToken = localStorage.getItem(TOKEN_KEY);
      console.log("Token stored successfully:", !!storedToken);
    } catch (error) {
      console.error("Error setting token in localStorage:", error);
    }
  } else {
    console.warn("Cannot set token: window is not defined (server-side)");
  }
};

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      console.log("Token retrieved:", token ? "exists" : "not found");
      return token;
    } catch (error) {
      console.error("Error getting token from localStorage:", error);
      return null;
    }
  }
  console.warn("Cannot get token: window is not defined (server-side)");
  return null;
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = (): void => {
  console.log("Removing token from storage");
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(TOKEN_KEY);
      console.log("Token removed successfully");
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  } else {
    console.warn("Cannot remove token: window is not defined (server-side)");
  }
};
