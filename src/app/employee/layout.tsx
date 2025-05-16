"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import {
  Menu,
  X,
  Home,
  Newspaper,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  User,
  MessageSquare,
  Calendar,
  FileText,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function EmployeeLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isEmployee, isLoading } = useAuthContext();

  // Redirect if not an employee
  useEffect(() => {
    if (!isLoading && !isEmployee) {
      router.push('/login-employe');
    }
  }, [user, isEmployee, isLoading, router]);

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

  // Don't render content if not an employee
  if (!isEmployee) {
    return null;
  }

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/employee",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Articles",
      href: "/employee/articles",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      name: "Driver",
      href: "/employee/documents",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Documents",
      href: "/employee/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    router.push('/employee/login');
  };

  // Get employee info from context
  const employeeName = user?.name || "Employee";
  const employeeInitials = employeeName.split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-xl p-3 bg-transparent border border-black flex items-center justify-center text-white font-bold mr-2 relative overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747281330/nobgbtr_jqbwdw.png"
                  alt="Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-bold text-lg">
                BDP Employee Portal
              </span>
            </div>
            <button
              className="text-gray-400 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="mt-6 px-4">
            <div className="flex items-center">
              {user?.avatar ? (
                <div className="h-10 w-10 rounded-full relative overflow-hidden">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {employeeInitials}
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{employeeName}</p>
                <p className="text-xs text-gray-400">Employee</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <div
                  className={`mr-3 ${
                    isActive(item.href)
                      ? "text-orange-500"
                      : "text-gray-400 group-hover:text-gray-300"
                  }`}
                >
                  {item.icon}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800 mt-auto">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              className="text-gray-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center">
                {user?.avatar ? (
                  <div className="h-8 w-8 rounded-full relative overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    {employeeInitials}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}