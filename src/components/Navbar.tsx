"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-container")) {
        setActiveDropdown(null);
        setAvatarDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "#",
      label: "About Us",
      dropdown: [
        { href: "/tentang/profil", label: "Company Profile" },
        { href: "/tentang/visi-misi", label: "Vision & Mission" },
        { href: "/tentang/tim", label: "Board of Director" },
      ],
    },
    { href: "/proyek", label: "Project" },
    { href: "/kontak", label: "Contact" },
    { href: "/karir", label: "Carreer" },
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const getAvatarUrl = () => {
    if (!user || !user.avatar || avatarError) {
      return "/avatar-default.png";
    }
    if (
      user.avatar.includes("cloudinary.com") ||
      user.avatar.startsWith("http")
    ) {
      return user.avatar;
    }
    return "/avatar-default.png";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-lg shadow-lg py-2 border-b border-gray-800"
          : "bg-black/60 backdrop-blur-lg py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 relative">
            <Image
              src="/nobgbtr.png"
              alt="Logo BTR"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="font-comfortaa font-bold text-[#E85C23] text-lg">
              Batara Dharma
            </h1>
            <p className="text-[#1FBFB8] font-inder text-sm">Persada</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center space-x-1 font-inder">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group dropdown-container"
              >
                {link.dropdown ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(link.label);
                    }}
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-[#E85C23] hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {link.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 ${
                      pathname === link.href
                        ? "text-[#E85C23] bg-gray-800"
                        : "text-gray-300 hover:text-[#E85C23] hover:bg-gray-800"
                    } rounded-md block transition-colors`}
                  >
                    {link.label}
                  </Link>
                )}

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute left-0 mt-1 w-56 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm ${
                          pathname === item.href
                            ? "bg-gray-800 text-[#E85C23]"
                            : "text-gray-300 hover:bg-gray-800 hover:text-[#E85C23]"
                        } transition-colors`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth section */}
          <div className="ml-8 relative dropdown-container">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvatarDropdown(!avatarDropdown);
                  }}
                  className="w-10 h-10 rounded-full border-2 border-[#E85C23] overflow-hidden shadow"
                >
                  <img
                    src={getAvatarUrl()}
                    alt={user?.name || "User Avatar"}
                    className="object-cover w-full h-full"
                    onError={() => setAvatarError(true)}
                  />
                </button>
                {avatarDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
                    <div className="py-2 px-4 border-b border-gray-800">
                      <p className="text-sm font-medium truncate text-gray-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <p className="text-xs font-medium text-[#1FBFB8] mt-1">
                          Admin
                        </p>
                      )}
                    </div>
                    <Link
                      href="/user/myprofile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-[#E85C23] transition-colors"
                      onClick={() => setAvatarDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/user/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-[#E85C23] transition-colors"
                      onClick={() => setAvatarDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setAvatarDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#E85C23] font-inder hover:bg-[#d14b17] text-white px-5 py-2 rounded-md shadow-md transition-colors"
              >
                Login or Register
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-800 transition-colors text-gray-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 pt-2 pb-4 px-4 shadow-lg">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center justify-between w-full py-2 text-gray-300"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={
                          activeDropdown === link.label
                            ? "transform rotate-180"
                            : ""
                        }
                      />
                    </button>

                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-1 border-l-2 border-[#1FBFB8] space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block py-2 text-sm ${
                              pathname === item.href
                                ? "text-[#E85C23]"
                                : "text-gray-400 hover:text-[#E85C23]"
                            } transition-colors`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 ${
                      pathname === link.href
                        ? "text-[#E85C23]"
                        : "text-gray-300 hover:text-[#E85C23]"
                    } transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile auth section */}
            {isAuthenticated ? (
              <div className="pt-4 mt-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#E85C23] overflow-hidden">
                    <img
                      src={getAvatarUrl()}
                      alt={user?.name || "User Avatar"}
                      className="object-cover w-full h-full"
                      onError={() => setAvatarError(true)}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-200">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                    {isAdmin && (
                      <p className="text-xs text-[#1FBFB8] font-medium">
                        Admin
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href="/user/myprofile"
                  className="block py-2 text-[#E85C23] hover:text-[#d14b17] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/user/dashboard"
                  className="block py-2 text-[#E85C23] hover:text-[#d14b17] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block py-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t border-gray-800">
                <Link
                  href="/login"
                  className="block w-full py-2 px-3 text-center bg-[#E85C23] hover:bg-[#d14b17] text-white rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login or Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}