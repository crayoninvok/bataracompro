// src/components/AuthWrapper.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-provider";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
