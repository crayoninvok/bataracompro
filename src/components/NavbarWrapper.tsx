"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // adjust the import path as needed
import { ReactNode } from "react";

interface NavbarWrapperProps {
  children: ReactNode;
}

// Hide Navbar on these route prefixes
const hiddenRoutePrefixes = [
  "/admin/dashboard",
  "/admin/jobs/applications",
  "/admin/jobs/create",
  "/admin/jobs/edit",
  "/admin/applicants",
  "/admin/applications",
  "/admin/settings",
  "/admin/article",
  "/admin/driver",
  "/login-admin",
  "/dashboard-emp"
];

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname();

  // Check if current route starts with any of the hiddenRoutePrefixes
  const showNavbar = !hiddenRoutePrefixes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
