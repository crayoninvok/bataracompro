"use client";

import React, { useEffect, useRef } from "react";
import { Truck, HardHat, Factory, BarChart3 } from "lucide-react";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal-service');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Layanan Kami</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 dark:bg-blue-800 opacity-40 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Solusi transportasi batubara terpercaya dan terintegrasi dengan teknologi canggih
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Transportasi Batubara</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Layanan transportasi batubara dengan armada truk heavy duty yang handal untuk kebutuhan pertambangan.
            </p>
          </div>

          {/* Service 2 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md">
            <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Factory className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Manajemen Hauling</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sistem pengelolaan hauling terintegrasi untuk optimalisasi rute dan efisiensi bahan bakar.
            </p>
          </div>

          {/* Service 3 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md">
            <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Monitoring Produksi</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pantau volume produksi dan pengiriman batubara secara real-time dengan sistem pelaporan canggih.
            </p>
          </div>

          {/* Service 4 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md">
            <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <HardHat className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Solusi Pertambangan</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Layanan penunjang operasional tambang dengan standar keselamatan dan keamanan yang tinggi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}