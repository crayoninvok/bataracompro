"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";

export default function EmployeeAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isEmployee } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isEmployee) {
      router.push("/login-employe");
    }
  }, [user, isLoading, isEmployee, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authenticated content only to employees
  return isEmployee ? <>{children}</> : null;
}