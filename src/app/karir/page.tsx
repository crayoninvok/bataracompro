"use client";

import React, { useEffect, useRef } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Clock, 
  MapPin, 
  FileText,
  Send
} from "lucide-react";

export default function Karir() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-career");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-blue-700 text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -mr-32 -mt-32 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full -ml-48 -mb-48 opacity-40"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Karir di PT Bahtera Putera Nusantara
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Bergabunglah dengan tim kami untuk membangun masa depan industri transportasi batubara yang lebih baik
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Mengapa Bergabung Dengan Kami</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PT Bahtera Putera Nusantara menawarkan lingkungan kerja yang dinamis dengan berbagai kesempatan untuk berkembang
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pengembangan Karir</h3>
              <p className="text-gray-600">
                Kami menyediakan program pelatihan dan pengembangan untuk membantu Anda mencapai potensi penuh dalam karir Anda.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tim yang Supportif</h3>
              <p className="text-gray-600">
                Bergabunglah dengan tim profesional yang berdedikasi dan bekerja dalam lingkungan kolaboratif yang mendukung.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Paket Kompensasi</h3>
              <p className="text-gray-600">
                Kami menawarkan paket kompensasi yang kompetitif dan berbagai tunjangan untuk kesejahteraan karyawan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Lowongan Tersedia</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Temukan posisi yang sesuai dengan keahlian dan minat Anda di PT Bahtera Putera Nusantara
            </p>
          </div>

          <div className="space-y-6">
            {/* Job 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">Site Manager - Kalimantan Timur</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Tabang, Kalimantan Timur</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Dibuka hingga 30 Juni 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Memimpin operasional site dan mengelola tim untuk memastikan kelancaran proses transportasi batubara dengan standar keselamatan dan efisiensi yang tinggi.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/karir/site-manager"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Detail Posisi</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">HSE Supervisor</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Tabang, Kalimantan Timur</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Dibuka hingga 15 Juni 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Memastikan implementasi sistem manajemen keselamatan dan kesehatan kerja (K3) serta lingkungan di seluruh area operasional perusahaan.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/karir/hse-supervisor"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Detail Posisi</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">Logistic Coordinator</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Jakarta Timur (Kantor Pusat)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Dibuka hingga 20 Juni 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Mengkoordinasikan dan mengoptimalkan proses logistik antara kantor pusat dengan site operasional untuk memastikan kelancaran rantai pasokan.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/karir/logistic-coordinator"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Detail Posisi</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <a
              href="/karir/semua-lowongan"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-md transition"
            >
              <span>Lihat Semua Lowongan</span>
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Proses Rekrutmen</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Memahami tahapan proses rekrutmen PT Bahtera Putera Nusantara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Process 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                1
              </div>
              <div className="text-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Aplikasi</h3>
              </div>
              <p className="text-gray-600 text-center">
                Kirim CV, surat lamaran, dan dokumen pendukung lainnya ke email recruitment@batara.id
              </p>
            </div>

            {/* Process 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                2
              </div>
              <div className="text-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold">Wawancara</h3>
              </div>
              <p className="text-gray-600 text-center">
                Proses wawancara dengan HR dan calon atasan untuk menilai kompetensi dan kecocokan
              </p>
            </div>

            {/* Process 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                3
              </div>
              <div className="text-center mb-4">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold">Tes & Penilaian</h3>
              </div>
              <p className="text-gray-600 text-center">
                Tes teknis dan penilaian yang relevan dengan posisi yang dilamar
              </p>
            </div>

            {/* Process 4 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                4
              </div>
              <div className="text-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold">Penempatan</h3>
              </div>
              <p className="text-gray-600 text-center">
                Penawaran kerja dan penempatan di lokasi yang sesuai dengan posisi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center reveal-career opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tidak Menemukan Posisi yang Sesuai?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Kami selalu mencari talenta berbakat. Kirimkan lamaran spontan Anda, dan kami akan menghubungi jika ada posisi yang cocok.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-xl mx-auto">
            <a
              href="mailto:recruitment@batara.id"
              className="inline-flex items-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md transition font-medium"
            >
              <Send className="mr-2" />
              <span>Kirim Lamaran Spontan</span>
            </a>
            <p className="text-sm mt-4 opacity-80">
              Kirimkan CV dan surat lamaran Anda ke <strong>recruitment@batara.id</strong> dengan subject: "Lamaran Spontan - [Nama Anda]"
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}