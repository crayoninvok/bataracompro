"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    {
      href: "#",
      label: "Layanan",
      dropdown: [
        { href: "/layanan/konstruksi", label: "Konstruksi" },
        { href: "/layanan/konsultasi", label: "Konsultasi" },
        { href: "/layanan/pengembangan", label: "Pengembangan" },
      ],
    },
    { href: "/proyek", label: "Proyek" },
    { href: "/kontak", label: "Kontak" },
  ];

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

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
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500 bg-white p-1 shadow-sm hover:shadow-md transition-all">
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
          <div className="flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                  >
                    {link.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all block"
                  >
                    {link.label}
                  </Link>
                )}

                {link.dropdown && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ml-8">
            <Link
              href="/kontak"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full h-0"
        }`}
      >
        {isOpen && (
          <div className="bg-white shadow-inner px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-1 space-y-1 border-l-2 border-blue-200">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
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
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-2 mt-3 border-t border-gray-200">
              <Link
                href="/kontak"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
