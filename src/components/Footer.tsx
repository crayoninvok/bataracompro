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
    { href: "/tentang/profil", label: "Profil Perusahaan" },
    { href: "/tentang/visi-misi", label: "Visi & Misi" },
    { href: "/tentang/tim", label: "Tim Kami" },
    { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  ];

  const serviceLinks = [
    { href: "/layanan/konstruksi", label: "Konstruksi" },
    { href: "/layanan/konsultasi", label: "Konsultasi" },
    { href: "/layanan/pengembangan", label: "Pengembangan" },
    { href: "/proyek", label: "Proyek Kami" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white p-1">
                <Image
                  src="/btr.png"
                  alt="Logo BTR"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">Batara Dharma</h3>
                <p className="text-blue-300">Persada</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              PT. Batara Dharma Persada adalah perusahaan yang bergerak di
              bidang jasa konstruksi, konsultasi dan pengembangan dengan standar
              kualitas terbaik.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-blue-700 pb-2">
              Perusahaan
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-blue-700 pb-2">
              Layanan Kami
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-blue-700 pb-2">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-300"
                />
                <span className="text-gray-300 text-sm">
                  Jl. Raya Bekasi No. 123, Bekasi Timur, Jawa Barat 17113
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-blue-300" />
                <a
                  href="tel:+6221xxxxxxxx"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  +62-21-XXXX-XXXX
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-blue-300" />
                <a
                  href="mailto:info@bataradharma.co.id"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  info@bataradharma.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-blue-700 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} PT. Batara Dharma Persada. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
