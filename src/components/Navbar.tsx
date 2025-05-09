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
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    {
      href: "#",
      label: "Tentang Kami",
      dropdown: [
        { href: "/tentang/profil", label: "Profil Perusahaan" },
        { href: "/tentang/visi-misi", label: "Visi & Misi" },
        { href: "/tentang/tim", label: "Tim Kami" },
      ],
    },
    { href: "/proyek", label: "Proyek" },
    { href: "/kontak", label: "Kontak" },
    { href: "/karir", label: "Karir" },
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-white/80 backdrop-blur-sm py-4"}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500 bg-white p-1 shadow-sm">
            <Image src="/btr.png" alt="Logo BTR" width={64} height={64} className="object-contain w-full h-full" />
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
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  <button onClick={() => toggleDropdown(link.label)} className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition">
                    {link.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <Link href={link.href} className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md block transition">
                    {link.label}
                  </Link>
                )}

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {link.dropdown.map((item) => (
                      <Link key={item.href} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth section */}
          <div className="ml-8 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAvatarDropdown(!avatarDropdown)}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden shadow"
                >
                  <Image
                    src={user.avatar || "/avatar-default.png"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </button>
                {avatarDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profil Saya
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded hover:bg-gray-100 transition">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Optional: mobile dropdown here if needed */}
    </nav>
  );
}
