"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/auth-provider";
import {
  Home,
  Briefcase,
  LogOut,
  Menu,
  X,
  User,
  BarChart3,
  Users,
  Settings,
  RefreshCcw,
  FileText,
} from "lucide-react";
import Swal from "sweetalert2";
import CustomLoading from "@/components/homepage/CustomLoading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, isAuthenticated, isLoading, logout } =
    useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // Check auth when component mounts
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login-admin");
    } else if (!isLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // Loading state
  if (isLoading) {
    return <CustomLoading />;
  }

  // Auth guard
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E85C23",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Mobile header */}
      <div className="bg-[#E85C23] px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold text-white flex items-center"
          >
            <Image
              src="/nobgbtrlogo.png"
              alt="PT BATARA Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            Admin Portal
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)] md:h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-300 md:static md:translate-x-0 md:pt-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-center border-b border-gray-800 p-4 bg-black/40">
            <Link href="/admin/dashboard" className="flex items-center">
              <div className="w-10 h-10 rounded-full border border-[#E85C23]/30 bg-black/30 p-1 mr-3">
                <Image
                  src="/nobgbtrlogo.png"
                  alt="PT BATARA Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">BDP Admin</h1>
                <p className="text-xs text-gray-400">
                  Post Job, Article & Software{" "}
                </p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#E85C23]/20 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
                <div className="mt-1 flex items-center">
                  <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="ml-1 text-xs font-medium text-gray-300">
                    Administrator
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="px-3 py-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Main
            </p>
            <nav className="space-y-1">
              <Link
                href="/admin/dashboard"
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === "/admin/dashboard"
                    ? "bg-[#E85C23]/10 text-[#E85C23]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/admin/jobs/create"
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === "/admin/jobs/create"
                    ? "bg-[#E85C23]/10 text-[#E85C23]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Post New Job
              </Link>

              <p className="mt-6 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Management
              </p>
              <Link
                href="/admin/applications"
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname.startsWith("/admin/applications")
                    ? "bg-[#E85C23]/10 text-[#E85C23]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Applications
              </Link>
              <Link
                href="/admin/articles"
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname.startsWith("/admin/article")
                    ? "bg-[#E85C23]/10 text-[#E85C23]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                Article
              </Link>
              <Link
                href="/admin/driver"
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname.startsWith("/admin/driver")
                    ? "bg-[#E85C23]/10 text-[#E85C23]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <RefreshCcw className="mr-3 h-5 w-5" />
                Driver
              </Link>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-800">
                {pathname === "/admin/dashboard" && "Dashboard"}
                {pathname === "/admin/jobs/create" && "Create New Job"}
                {pathname.startsWith("/admin/jobs/edit") && "Edit Job"}
                {pathname.startsWith("/admin/jobs/applications") &&
                  "Job Applications"}
                {pathname === "/admin/applications" && "All Applications"}
                {pathname === "/admin/profile" && "My Profile"}
                {pathname === "/admin/settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full">
                  <span className="sr-only">Notifications</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>
              </div>

              <div className="h-6 border-l border-gray-200"></div>

              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-[#E85C23]/20 flex items-center justify-center text-[#E85C23]">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Content area */}
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
    </div>
  );
}
