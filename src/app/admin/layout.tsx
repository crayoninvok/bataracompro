"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-provider";
import { Home, Briefcase, LogOut, Menu, X, User } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, isAuthenticated, isLoading, logout } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // Check auth when component mounts
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!isLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Auth guard
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Kamu akan keluar dari akun admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1", // indigo
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        title: "Berhasil Logout",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Mobile header */}
      <div className="bg-indigo-600 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-xl font-bold text-white">
            Admin Dashboard
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex h-screen md:h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-indigo-800 pt-16 transition-transform duration-300 md:static md:translate-x-0 md:pt-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-center border-b border-indigo-700 p-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-indigo-200">{user?.email}</p>
              <p className="mt-1 text-xs font-medium text-indigo-100">Admin</p>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-5 px-2">
            <Link
              href="/admin/dashboard"
              className={`group mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/admin/dashboard"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/jobs/create"
              className={`group mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/admin/jobs/create"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Post New Job
            </Link>
            <Link
              href="/profile"
              className="group mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-700"
            >
              <User className="mr-3 h-5 w-5" />
              My Profile
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 w-full border-t border-indigo-700 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Page content */}
          {children}
        </div>
      </div>
    </div>
  );
}
