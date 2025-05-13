"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/decodeToken";

type Role = "admin" | "user";

export function withGuard<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: Role[]
) {
  return function WithGuardedComponent(props: T) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || !allowedRoles.includes(decoded.role)) {
        router.replace("/unauthorized");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
