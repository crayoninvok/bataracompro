"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: "/tentang/profil", label: "Company Profile" },
    { href: "/tentang/visi-misi", label: "Vision & Mission" },
    { href: "/tentang/tim", label: "Our Team" },
    { href: "/tentang/projects-gallery", label: "Projects Gallery" },
  ];

  const serviceLinks = [
    { href: "/proyek", label: "Our Projects" },
    { href: "/kontak", label: "Contacts" },
    { href: "/karir", label: "Career" },
    { href: "/login-employe", label: "Employee Portal" },
  ];

  return (
    <footer className="bg-black/90 backdrop-blur-lg text-white pt-10 pb-5 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#1FBFB8] bg-black/60 p-1">
                <Image
                  src="/nobgbtrlogo.png"
                  alt="BTR Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-comfortaa font-bold text-[#1FBFB8] text-lg">
                  PT Batara Dharma Persada
                </h3>
              </div>
            </div>
            <div className="flex space-x-3 pt-1">
              <a
                href="https://www.instagram.com/batara.mining/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[#E85C23] p-1.5 rounded transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/pt-bdp/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[#E85C23] p-1.5 rounded transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-base mb-3 border-b border-gray-800 pb-2">
              Company
            </h3>
            <ul className="space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#1FBFB8] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-base mb-3 border-b border-gray-800 pb-2">
              Projects and Services
            </h3>
            <ul className="space-y-1.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#1FBFB8] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-3 border-b border-gray-800 pb-2">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-2 mt-1 flex-shrink-0 text-[#E85C23]"
                />
                <span className="text-gray-400 text-xs">
                  Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec.
                  Cakung, East Jakarta City, DKI Jakarta 13910
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={16}
                  className="mr-2 flex-shrink-0 text-[#E85C23]"
                />
                <a
                  href="tel:+62 21 38865143"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  +62 21 38865143
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-[#E85C23]" />
                <a
                  href="mailto:info@bataramining.com"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  info@bataramining.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 mt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>
            &copy; {currentYear} PT. Batara Dharma Persada. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
