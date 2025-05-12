// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "ADMIN" | "USER";
  isVerify?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
  admin?: {
    id: string;
    email: string;
    name: string;
  };
}
