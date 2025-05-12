"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // adjust the import path as needed
import { ReactNode } from "react";

interface NavbarWrapperProps {
  children: ReactNode;
}

const hiddenRoutes = ["/admin/dashboard",]; // pages without Navbar

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname();
  const showNavbar = !hiddenRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
