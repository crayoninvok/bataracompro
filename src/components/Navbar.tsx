"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const { user, logout } = useAuth();
  
  // Debug user avatar
  useEffect(() => {
    if (user) {
      console.log("User avatar URL:", user.avatar);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "#",
      label: "About Us",
      dropdown: [
        { href: "/tentang/profil", label: "Company Profile" },
        { href: "/tentang/visi-misi", label: "Vision & Mission" },
        { href: "/tentang/tim", label: "Our Team" },
      ],
    },
    { href: "/proyek", label: "Project" },
    { href: "/kontak", label: "Contact" },
    { href: "/karir", label: "Carreer" },
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  // Get avatar URL, handling Cloudinary URLs correctly
  const getAvatarUrl = () => {
    if (!user || !user.avatar || avatarError) {
      return "/avatar-default.png";
    }
    
    // If avatar already looks like a Cloudinary URL, use it directly
    if (user.avatar.includes('cloudinary.com') || user.avatar.startsWith('http')) {
      return user.avatar;
    }
    
    // If avatar is just a Cloudinary public ID or partial path, construct the full URL
    // Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name
    return `/avatar-default.png`;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if clicking outside the dropdown areas
      if (!(e.target as HTMLElement).closest('.dropdown-container')) {
        setActiveDropdown(null);
        setAvatarDropdown(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500 bg-white p-1 shadow-sm">
            <Image
              src="/btr.png"
              alt="Logo BTR"
              width={64}
              height={64}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-blue-900 text-lg">Batara Dharma</h1>
            <p className="text-blue-600 text-xs">Persada</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group dropdown-container">
                {link.dropdown ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(link.label);
                    }}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                  >
                    {link.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md block transition"
                  >
                    {link.label}
                  </Link>
                )}

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvatarDropdown(!avatarDropdown);
                  }}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden shadow"
                >
                  {/* Use regular img tag instead of Next.js Image for Cloudinary URLs */}
                  <img
                    src={getAvatarUrl()}
                    alt={user.name || "User Avatar"}
                    className="object-cover w-full h-full"
                    onError={() => setAvatarError(true)}
                  />
                </button>
                {avatarDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <div className="py-2 px-4 border-b">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setAvatarDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition"
              >
                Login or Register
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t pt-2 pb-4 px-4 shadow-lg">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center justify-between w-full py-2 text-gray-700"
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={16} className={activeDropdown === link.label ? "transform rotate-180" : ""} />
                    </button>
                    
                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-1 border-l-2 border-blue-300 space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-2 text-sm text-gray-600 hover:text-blue-600"
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
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile auth section */}
            {user ? (
              <div className="pt-4 mt-4 border-t">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden">
                    <img
                      src={getAvatarUrl()}
                      alt={user.name || "User Avatar"}
                      className="object-cover w-full h-full"
                      onError={() => setAvatarError(true)}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block py-2 text-blue-600 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t">
                <Link
                  href="/login"
                  className="block w-full py-2 px-3 text-center bg-blue-600 text-white rounded-md"
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