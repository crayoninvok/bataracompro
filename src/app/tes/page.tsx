"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, ArrowRight, Truck, Building, HardHat, Factory } from "lucide-react";

export default function Operations() {
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

    const elements = document.querySelectorAll(".reveal-operation");
    elements.forEach((el) => observer.observe(el));

    // Initialize Leaflet map when the component mounts
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        setTimeout(() => {
          const mapContainer = document.getElementById('operations-map');
          
          if (mapContainer && !mapContainer.hasChildNodes()) {
            const map = L.map('operations-map').setView([-1.5, 115.0], 5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Main Office Marker
            const mainOfficeMarker = L.marker([-6.163255, 106.929148]).addTo(map);
            mainOfficeMarker.bindPopup("<b>Main Office</b><br>Jl. Agung Sedayu City Boulevard Utara No.58, East Jakarta").openPopup();
            
            // Mining Site Marker
            const miningSiteMarker = L.marker([-0.526275, 116.116552]).addTo(map);
            miningSiteMarker.bindPopup("<b>Coal Mining Site</b><br>Tabang, East Kalimantan");
            
            // Processing Plant Marker
            const plantMarker = L.marker([-1.226275, 116.516552]).addTo(map);
            plantMarker.bindPopup("<b>Processing Plant</b><br>East Kalimantan");
            
            const bounds = L.latLngBounds([
              [-6.163255, 106.929148],
              [-0.526275, 116.116552]
            ]);
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }, 1000);
      });
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-[#3A4F6D] text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50] rounded-full -mr-32 -mt-32 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF9800] rounded-full -ml-48 -mb-48 opacity-30"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Operational Sites
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Strategically located facilities supporting our mining and processing operations across Indonesia
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-operation opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10 text-[#3A4F6D]">Operational Map</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#4CAF50] opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Overview of our key operational locations and facilities
            </p>
          </div>

          <div className="reveal-operation opacity-0 translate-y-6 transition-all duration-700">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#3A4F6D]">Key Locations</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-[#3A4F6D]/20 p-3 rounded-full mr-3">
                      <Building className="w-5 h-5 text-[#3A4F6D]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-[#3A4F6D]">Main Office</h4>
                      <p className="text-gray-600 mb-2">Jakarta, Indonesia</p>
                      <p className="text-sm text-gray-500">
                        Jl. Agung Sedayu City Boulevard Utara No.58, East Jakarta City
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-[#FF9800]/20 p-3 rounded-full mr-3">
                      <HardHat className="w-5 h-5 text-[#FF9800]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-[#3A4F6D]">Mining Site</h4>
                      <p className="text-gray-600 mb-2">Tabang, East Kalimantan</p>
                      <p className="text-sm text-gray-500">
                        Primary coal extraction and mining operations
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-[#4CAF50]/20 p-3 rounded-full mr-3">
                      <Factory className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-[#3A4F6D]">Processing Plant</h4>
                      <p className="text-gray-600 mb-2">East Kalimantan</p>
                      <p className="text-sm text-gray-500">
                        Coal processing and quality control facility
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Leaflet Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ height: "500px" }}>
              <div id="operations-map" className="w-full h-full"></div>
            </div>
            
            <style jsx global>{`
              @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              
              .leaflet-popup-content {
                margin: 13px 19px;
                line-height: 1.4;
              }
              
              .leaflet-popup-content p {
                margin: 10px 0;
              }
              
              .leaflet-popup-content b {
                font-weight: bold;
                color: #333;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-[#3A4F6D] text-white">
        <div className="max-w-4xl mx-auto text-center reveal-operation opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Learn More About Our Operations?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Get in touch with our team for detailed information about our mining operations and capabilities
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-[#FF9800] text-white hover:bg-[#e68a00] px-8 py-3 rounded-md transition font-medium"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}