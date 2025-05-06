"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function CTASection() {
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

    const elements = document.querySelectorAll(".reveal-cta");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Contact Info */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Butuh solusi transportasi batubara yang andal?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PT. Batara Dharma Persada siap menjadi mitra terpercaya untuk
              kebutuhan transportasi batubara Anda. Hubungi kami untuk
              konsultasi dan penawaran khusus.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p className="font-bold">+62 21 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-bold">info@bataradharma.co.id</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4 mt-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kantor Pusat</p>
                  <p className="font-bold">
                    Jl. Mega Kuningan Barat, Jakarta Selatan 12950
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Area Operasional:</h4>
              <p className="text-gray-700">
                Kalimantan Timur, Kalimantan Selatan, Kalimantan Tengah, dan
                Sumatra Selatan
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700 delay-200">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Nama lengkap Anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Nama perusahaan Anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Alamat email Anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Nomor telepon Anda"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Kebutuhan Anda
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Jelaskan kebutuhan transportasi batubara yang Anda perlukan"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md transition group"
                >
                  <span>Kirim Permintaan</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
