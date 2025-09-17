"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  FileText,
  Users,
  Clock,
  Activity,
  Briefcase,
  Award,
  Target,
  BarChart3,
  Home,
  FolderOpen,
  MessageSquare,
  CheckSquare,
  UserCheck,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  NewspaperIcon,
  PersonStandingIcon,
  TruckElectric,
} from "lucide-react";

// Import the authentication hooks
import { useAuth } from "@/hooks/useAuth";

// Types
interface LayoutProps {
  children: React.ReactNode;
}

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: string | number;
  adminOnly?: boolean;
}

// Sidebar navigation items - now with admin-only items
const navigationItems: SidebarItemProps[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard-emp",
    isActive: true,
  },

  {
    icon: NewspaperIcon,
    label: "News & Updates",
    href: "/dashboard-emp/newsupdate",
  },

  {
    icon: PersonStandingIcon,
    label: "Recruitment",
    href: "/dashboard-emp/recruitment",
  },
  {
    icon: TruckElectric,
    label: "FMS",
    href: "/dashboard-emp/fms",
  },
  {
    icon: Shield,
    label: "Admin Panel",
    href: "/dashboard-emp/admin-user",
    adminOnly: true,
  },
  {
    icon: UserCheck,
    label: "Profile",
    href: "/dashboard-emp/profile",
  },
];

const SidebarItem: React.FC<
  SidebarItemProps & {
    isCollapsed: boolean;
    onClick: () => void;
    isVisible: boolean;
  }
> = ({
  icon: Icon,
  label,
  isActive,
  badge,
  isCollapsed,
  onClick,
  isVisible,
  adminOnly,
}) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-l-2 border-cyan-500"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }
        ${isCollapsed ? "justify-center" : "justify-start"}
      `}
    >
      <div className="flex items-center">
        <Icon
          className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"} flex-shrink-0`}
        />
        {adminOnly && !isCollapsed && (
          <Shield className="w-3 h-3 ml-1 text-orange-400" />
        )}
      </div>
      {!isCollapsed && (
        <>
          <span className="font-medium text-sm">{label}</span>
          {badge && (
            <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );
};

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-400" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

export default function DashboardEmpLayout({
  children,
}: LayoutProps): JSX.Element {
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("/dashboard-emp");

  // Handle authentication redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login-web");
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
        setIsCollapsed(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleNavItemClick = (href: string) => {
    setActiveItem(href);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    // Navigate to the route
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    console.log("⏳ Dashboard still loading auth state...");
    return <LoadingSpinner />;
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    console.log("🚫 Not authenticated, should redirect...");
    return <LoadingSpinner />;
  }

  // Filter navigation items based on user role
  const visibleNavigationItems = navigationItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      {/* Sidebar */}
      <div
        className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed && !isMobile ? "w-16" : "w-64"}
        bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 
        backdrop-blur-xl border-r border-gray-700/50 
        transition-all duration-300 ease-in-out
        flex flex-col
        ${isMobile ? "h-screen" : "h-screen sticky top-0"}
      `}
      >
        {/* Sidebar Header */}
        <div
          className={`flex-shrink-0 p-4 border-b border-gray-700/50 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">BATARA</h1>
                  <p className="text-xs text-gray-400">Employee Portal</p>
                </div>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="flex-shrink-0 p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  {isAdmin && (
                    <span title="Administrator">
                      <Shield className="w-3 h-3 text-orange-400" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.department}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable section */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {visibleNavigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              isActive={activeItem === item.href}
              isCollapsed={isCollapsed}
              isVisible={!item.adminOnly || isAdmin}
              onClick={() => handleNavItemClick(item.href)}
            />
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 p-3 border-t border-gray-700/50 space-y-1">
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/dashboard-emp/settings"
            isCollapsed={isCollapsed}
            isVisible={true}
            onClick={() => handleNavItemClick("/dashboard-emp/settings")}
          />
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
              text-gray-400 hover:text-red-400 hover:bg-red-500/10
              ${isCollapsed ? "justify-center" : "justify-start"}
            `}
          >
            <LogOut
              className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"} flex-shrink-0`}
            />
            {!isCollapsed && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="flex-shrink-0 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Employee Dashboard</h1>
                  {isAdmin && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Welcome back, {user.name} •{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700/50">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
              </button>

              {/* Quick Actions */}
              <button
                onClick={() => router.push("/dashboard-emp/settings")}
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700/50"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-3 py-2 transition-colors border border-gray-700/50 cursor-pointer"
                onClick={() => router.push("/dashboard-emp/profile")}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {user.name}
                </span>
                {isAdmin && (
                  <Shield className="w-3 h-3 text-orange-400 hidden sm:block" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
