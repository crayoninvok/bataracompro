"use client";

import { usePathname } from "next/navigation";
import NavbarWrapper from "./NavbarWrapper";
import Footer from "./Footer";
import { ReactNode } from "react";

interface MaintenanceLayoutProps {
  children: ReactNode;
}

// Routes that show maintenance page (hide navbar and footer)
const maintenanceRoutes = [
  "/",
  "/karir",
  "/kontak",
  "/proyek",
  "/newsletter",
  "/tentang/profil",
  "/tentang/visi-misi",
  "/tentang/tim",
  "/tentang/ourteam",
  "/tentang/projects-gallery"
];

export default function MaintenanceLayout({ children }: MaintenanceLayoutProps) {
  const pathname = usePathname();
  const isMaintenanceMode = maintenanceRoutes.includes(pathname);

  if (isMaintenanceMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <NavbarWrapper>
        <main className="flex-1">{children}</main>
      </NavbarWrapper>
      <Footer />
    </div>
  );
}

