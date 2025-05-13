"use client";

import React, { useEffect, useRef } from "react";
import { Truck, HardHat, Factory, Mountain, Shovel, Recycle } from "lucide-react";

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
      className="py-24 px-4 md:px-8 lg:px-24 bg-gray-50 text-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85C23]/5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1FBFB8]/5 rounded-full -ml-48 -mb-48"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-[#5B5B5F]">Our Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive mining and hauling solutions with advanced technology and environmental responsibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#E85C23]/20 group">
            <div className="bg-[#E85C23]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#E85C23]/20 transition-colors">
              <Factory className="w-8 h-8 text-[#E85C23]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#E85C23] transition-colors">Coal Mining and Hauling</h3>
            <p className="text-gray-600">
              Comprehensive coal extraction and transportation services with a fleet of heavy-duty trucks. We handle everything from mining operations to efficient delivery.
            </p>
          </div>

          {/* Service 2 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#1FBFB8]/20 group">
            <div className="bg-[#1FBFB8]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#1FBFB8]/20 transition-colors">
              <Mountain className="w-8 h-8 text-[#1FBFB8]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#1FBFB8] transition-colors">Bauxite Mining and Hauling</h3>
            <p className="text-gray-600">
              Specialized bauxite extraction and transportation with advanced equipment and techniques for efficient mineral processing and delivery.
            </p>
          </div>

          {/* Service 3 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#E85C23]/20 group">
            <div className="bg-[#E85C23]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#E85C23]/20 transition-colors">
              <HardHat className="w-8 h-8 text-[#E85C23]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#E85C23] transition-colors">Nickel Mining and Hauling</h3>
            <p className="text-gray-600">
              Expert nickel mining operations and transportation services with a focus on safety, efficiency, and environmental compliance.
            </p>
          </div>

          {/* Service 4 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#1FBFB8]/20 group">
            <div className="bg-[#1FBFB8]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#1FBFB8]/20 transition-colors">
              <Shovel className="w-8 h-8 text-[#1FBFB8]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#1FBFB8] transition-colors">Top Soil Rehandling</h3>
            <p className="text-gray-600">
              Careful management and relocation of topsoil during mining operations to preserve soil health and support future vegetation growth.
            </p>
          </div>

          {/* Service 5 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-400 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#E85C23]/20 group">
            <div className="bg-[#E85C23]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#E85C23]/20 transition-colors">
              <Recycle className="w-8 h-8 text-[#E85C23]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#E85C23] transition-colors">Land Reclamation</h3>
            <p className="text-gray-600">
              Environmental restoration of mining sites through comprehensive reclamation services to return land to productive use and restore ecological balance.
            </p>
          </div>

          {/* Service 6 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-500 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#1FBFB8]/20 group">
            <div className="bg-[#1FBFB8]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#1FBFB8]/20 transition-colors">
              <Truck className="w-8 h-8 text-[#1FBFB8]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#5B5B5F] group-hover:text-[#1FBFB8] transition-colors">Integrated Hauling Solutions</h3>
            <p className="text-gray-600">
              Comprehensive hauling management with route optimization, real-time tracking, and preventive maintenance to ensure efficient and reliable mineral transportation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}