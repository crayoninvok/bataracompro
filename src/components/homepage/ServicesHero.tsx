"use client";

import React, { useEffect, useRef } from "react";
import {
  Truck,
  HardHat,
  Factory,
  Mountain,
  Shovel,
  Recycle,
} from "lucide-react";

export default function ServicesSection() {
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

    const elements = document.querySelectorAll(".reveal-service");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 lg:px-24 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-y border-gray-800"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 relative inline-block">
            <span className="relative z-10 text-white">Our Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Comprehensive mining and hauling solutions with advanced technology
            and environmental responsibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 bg-gray-900/80 p-6 rounded-lg shadow-md border border-gray-800 hover:border-[#E85C23]/50 group">
            <div className="bg-[#E85C23]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[#E85C23]/20 transition-colors">
              <Factory className="w-7 h-7 text-[#E85C23]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#E85C23] transition-colors">
              Coal Mining and Hauling
            </h3>
            <p className="text-gray-400 text-sm">
              Comprehensive coal extraction and transportation services with a
              fleet of heavy-duty trucks. We handle everything from mining
              operations to efficient delivery.
            </p>
          </div>

          {/* Service 2 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-gray-900/80 p-6 rounded-lg shadow-md border border-gray-800 hover:border-[#1FBFB8]/50 group">
            <div className="bg-[#1FBFB8]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[#1FBFB8]/20 transition-colors">
              <Mountain className="w-7 h-7 text-[#1FBFB8]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#1FBFB8] transition-colors">
              Bauxite Mining and Hauling
            </h3>
            <p className="text-gray-400 text-sm">
              Specialized bauxite extraction and transportation with advanced
              equipment and techniques for efficient mineral processing and
              delivery.
            </p>
          </div>

          {/* Service 3 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-gray-900/80 p-6 rounded-lg shadow-md border border-gray-800 hover:border-[#E85C23]/50 group">
            <div className="bg-[#E85C23]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[#E85C23]/20 transition-colors">
              <HardHat className="w-7 h-7 text-[#E85C23]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#E85C23] transition-colors">
              Nickel Mining and Hauling
            </h3>
            <p className="text-gray-400 text-sm">
              Expert nickel mining operations and transportation services with a
              focus on safety, efficiency, and environmental compliance.
            </p>
          </div>

          {/* Service 4 positioned on left */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-gray-900/80 p-6 rounded-lg shadow-md border border-gray-800 hover:border-[#E85C23]/50 group md:col-start-1 md:col-span-1">
            <div className="bg-[#E85C23]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[#E85C23]/20 transition-colors">
              <Recycle className="w-7 h-7 text-[#E85C23]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#E85C23] transition-colors">
              Land Reclamation
            </h3>
            <p className="text-gray-400 text-sm">
              Environmental restoration of mining sites through comprehensive
              reclamation services to return land to productive use and restore
              ecological balance.
            </p>
          </div>

          {/* Service 5 positioned on right */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-400 bg-gray-900/80 p-6 rounded-lg shadow-md border border-gray-800 hover:border-[#1FBFB8]/50 group md:col-start-2 md:col-span-1">
            <div className="bg-[#1FBFB8]/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[#1FBFB8]/20 transition-colors">
              <Shovel className="w-7 h-7 text-[#1FBFB8]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#1FBFB8] transition-colors">
              Top Soil Rehandling
            </h3>
            <p className="text-gray-400 text-sm">
              Careful management and relocation of topsoil during mining
              operations to preserve soil health and support future vegetation
              growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
