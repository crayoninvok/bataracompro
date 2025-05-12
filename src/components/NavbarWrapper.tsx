// src/components/NavbarWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Check if current route is admin route
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render navbar on admin routes
  if (isAdminRoute) {
    return null;
  }

  // Don't render until mounted
  if (!mounted) {
    return <div className="h-16 md:h-20"></div>;
  }

  return <Navbar />;
}
