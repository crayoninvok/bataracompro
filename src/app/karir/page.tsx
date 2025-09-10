"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Search,
  Briefcase,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Loading from "@/components/CustomLoading";
import { AlertTriangle } from "lucide-react";

export default function AllJobs() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // ✅ Automatically show the modal when component loads
    setShowModal(true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero Header */}
      <section className="relative py-28 overflow-hidden border-b border-gray-800">
        {/* Background layers */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206305/IMG_8579_g4f2tm.jpg"
            alt="Mining operations"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/50"></div>
        </div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{
            transform: `translateY(${parallaxOffset * 0.1}px)`,
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#E85C23]/30"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6">
              <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Career Opportunities</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-3 bg-[#1BABA5]/30 z-0"
                  style={{ bottom: "5px" }}
                />
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join{" "}
              <span className="text-[#1fbfb8] font-medium">
                PT Batara Dharma Persada
              </span>{" "}
              and be part of our growing team of professionals
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-[#1FBFB8] underline hover:text-[#E85C23] transition"
            >
              Read Terms and Conditions
            </button>
            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
            <div className="text-center mt-6"></div>
          </div>
        </div>

        {/* Custom animations */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          @keyframes gridMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 60px 60px;
            }
          }
        `}</style>
      </section>

      {/* Recruitment Portal Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white relative inline-block">
            <span className="relative z-10">Available Positions : </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>

          {/* Portal Access Card */}
          <div className="bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#1FBFB8]/5 group">
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-[#1FBFB8]/20 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-10 h-10 text-[#1FBFB8]" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#1FBFB8] transition-colors">
                  Portal Rekrutmen PT. Batara Dharma Persada
                </h3>
                <p className="text-gray-300 max-w-xl mx-auto text-base mb-6">
                  Akses portal rekrutmen resmi kami untuk melihat semua posisi
                  yang tersedia dan melamar pekerjaan dengan mudah dan aman.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-[#E85C23]" />
                    <span>24/7 Access</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-[#E85C23]" />
                    <span>Multiple Locations</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Search className="w-4 h-4 mr-2 text-[#1FBFB8]" />
                    <span>Easy Application</span>
                  </div>
                </div>

                <a
                  href="https://bdphrdatabase.vercel.app/informasi-posisi"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-8 py-4 rounded-lg transition-colors shadow-md font-medium text-lg group"
                >
                  <span>Masuk ke Portal Rekrutmen</span>
                  <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-xs text-gray-500 mt-4">
                  Link akan membuka di tab baru
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Informasi Penting
              </h4>
              <p className="text-gray-400 text-sm">
                Untuk memastikan keamanan dan transparansi proses rekrutmen,
                semua aplikasi harus melalui portal resmi kami. Hanya lamaran
                yang diterima melalui portal ini yang akan diproses oleh tim HR
                kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 max-w-lg w-full mx-4 p-6 rounded-xl shadow-lg text-white relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>

            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#E85C23]/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-[#E85C23]" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#E85C23] text-center mb-4">
              PENGUMUMAN RESMI TERKAIT PENIPUAN REKRUTMEN
            </h2>

            <p className="text-sm text-gray-300 mb-2">
              Kami mengimbau kepada seluruh masyarakat untuk selalu berhati-hati
              terhadap upaya penipuan yang mengatasnamakan proses rekrutmen PT
              Batara Dharma Persada.
            </p>

            <p className="text-sm text-gray-300 mb-2">
              Dengan ini kami menegaskan bahwa PT Batara Dharma Persada:
            </p>

            <ul className="list-disc list-inside text-sm text-gray-300 mb-2 space-y-1">
              <li>
                Tidak pernah memungut biaya dalam bentuk apa pun selama proses
                rekrutmen.
              </li>
              <li>
                Hanya menggunakan saluran komunikasi resmi milik perusahaan.
              </li>
              <li>
                Tidak bekerja sama dengan pihak ketiga dalam bentuk pembayaran
                untuk menjanjikan pekerjaan.
              </li>
            </ul>

            <p className="text-sm text-gray-300 mb-2">
              Apabila Anda menerima pesan mencurigakan, harap segera abaikan dan
              laporkan kepada pihak yang berwenang. Untuk informasi lebih lanjut
              atau klarifikasi, silakan hubungi kontak resmi perusahaan kami.
            </p>

            <p className="text-sm text-gray-300">
              Terima kasih atas perhatian dan kerja samanya.
            </p>

            <div className="mt-4">
              <p className="text-sm font-semibold text-[#1FBFB8]">
                PT Batara Dharma Persada
              </p>
              <p className="text-sm text-gray-400">Departemen HRGA</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
