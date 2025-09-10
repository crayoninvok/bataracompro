"use client";
import {
  ExternalLink,
  Users,
  BarChart3,
  Clock,
  ChevronRight,
  Home,
  Truck, // Added missing import
} from "lucide-react";
import { useEffect, useState } from "react";

export default function EmployeePortal() {
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
            src="https://res.cloudinary.com/dvkc8sxpf/image/upload/v1757493681/IMG_8377_kiusqp.jpg"
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
                <span className="relative z-10">Employee Portal</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-3 bg-[#1BABA5]/30 z-0"
                  style={{ bottom: "5px" }}
                />
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Akses sistem database{" "}
              <span className="text-[#1fbfb8] font-medium">
                PT Batara Dharma Persada
              </span>{" "}
              - Pilih database yang ingin Anda gunakan
            </p>

            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
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

      {/* Database Cards Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-white relative inline-block">
            <span className="relative z-10">Available Databases : </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recruitment Database Card */}
            <div className="bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#1FBFB8]/5 group">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#E85C23]/20 p-3 rounded-lg mr-4">
                    <Users className="h-8 w-8 text-[#E85C23]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#1FBFB8] transition-colors">
                      Database Rekrutmen
                    </h2>
                    <p className="text-sm text-[#E85C23] font-medium">
                      Tersedia
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Akses sistem manajemen rekrutmen untuk melihat data kandidat,
                  proses seleksi, dan informasi terkait penerimaan karyawan
                  baru.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Data Kandidat & Lamaran
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Proses Interview & Seleksi
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Status Penerimaan Karyawan
                  </div>
                </div>

                <a
                  href="https://bdphrdatabase.vercel.app/"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#E85C23] hover:bg-[#d14b17] text-white px-6 py-4 rounded-lg transition-colors shadow-md font-medium text-lg group"
                >
                  <span>Masuk ke Portal Rekrutmen</span>
                  <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* FMS Database Card */}
            <div className="bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#1FBFB8]/5 group">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#1FBFB8]/20 p-3 rounded-lg mr-4">
                    <Truck className="h-8 w-8 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#1FBFB8] transition-colors">
                      Database FMS
                    </h2>
                    <p className="text-sm text-[#1FBFB8] font-medium">
                      Tersedia
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Sistem Manajemen Armada untuk pelacakan unit operasional,
                  pemantauan produksi, jadwal perawatan, dan analisis performa
                  peralatan tambang.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Pelacakan Kendaraan & Monitoring GPS
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Pemantauan Produksi & Laporan
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#1FBFB8] rounded-full mr-3"></div>
                    Jadwal Perawatan & Servis
                  </div>
                </div>

                <a
                  href="https://www.fmsbatara.com/"
                  className="inline-flex items-center justify-center w-full bg-[#1FBFB8] hover:bg-[#17a8a2] text-white px-6 py-4 rounded-lg transition-colors shadow-md font-medium text-lg group"
                >
                  <span>Masuk ke Portal FMS</span>
                  <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* KPI Database Card */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden relative">
              {/* Under Development Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[#1FBFB8]/20 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-[#1FBFB8]" />
                  </div>
                  <p className="text-xl font-semibold text-white mb-2">
                    Dalam Pengembangan
                  </p>
                  <p className="text-sm text-gray-300">Segera Hadir</p>
                </div>
              </div>

              <div className="p-8 opacity-40">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Database KPI
                    </h2>
                    <p className="text-sm text-yellow-500 font-medium">
                      Under Development
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Sistem manajemen Key Performance Indicators untuk tracking dan
                  evaluasi performa karyawan serta pencapaian target perusahaan.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Performance Metrics & Analytics
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Goal Setting & Tracking
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Employee Evaluation Reports
                  </div>
                </div>

                <button
                  disabled
                  className="inline-flex items-center justify-center w-full bg-gray-700 text-gray-400 px-6 py-4 rounded-lg font-medium text-lg cursor-not-allowed"
                >
                  <span>Coming Soon</span>
                  <Clock className="ml-3 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information & Navigation */}
          <div className="mt-12 space-y-6">
            {/* Home Button */}
            <div className="text-center">
              <a
                href="/"
                className="inline-flex items-center bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-colors shadow-md font-medium text-lg group border border-gray-600 hover:border-[#1FBFB8]/50"
              >
                <Home className="mr-3 h-5 w-5 text-[#1FBFB8] group-hover:scale-110 transition-transform" />
                <span>Kembali ke Homepage</span>
              </a>
            </div>

            {/* Information Box */}
            <div className="bg-black/40 border border-gray-800 rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">
                Akses Database Internal
              </h4>
              <p className="text-gray-400 text-sm">
                Portal ini khusus untuk karyawan internal PT. Batara Dharma
                Persada. Pastikan Anda memiliki kredensial yang valid untuk
                mengakses sistem database. Untuk bantuan teknis, hubungi IT
                Support internal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
