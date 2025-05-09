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
      className="py-24 px-4 md:px-8 lg:px-24 bg-gray-50 text-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Our Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted coal transportation solutions integrated with advanced
            technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Coal Transportation</h3>
            <p className="text-gray-600">
              Reliable coal transportation service with a fleet of heavy-duty
              trucks for mining needs.
            </p>
          </div>

          {/* Service 2 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md">
            <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Factory className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hauling Management</h3>
            <p className="text-gray-600">
              An integrated hauling management system for route optimization and
              fuel efficiency.
            </p>
          </div>

          {/* Service 3 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Production Monitoring</h3>
            <p className="text-gray-600">
              Monitor coal production and delivery volume in real-time with an
              advanced reporting system.
            </p>
          </div>

          {/* Service 4 */}
          <div className="reveal-service opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md">
            <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <HardHat className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mining Solutions</h3>
            <p className="text-gray-600">
              Support services for mining operations with high safety and
              security standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
