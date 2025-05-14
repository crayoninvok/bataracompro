"use client";

import React, { useEffect, useRef } from "react";
import { MapPin, Calendar, ArrowRight, Truck, Building, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Projects() {
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

    const elements = document.querySelectorAll(".reveal-project");
    elements.forEach((el) => observer.observe(el));

    // Initialize Leaflet map when the component mounts
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        setTimeout(() => {
          const mapContainer = document.getElementById('locations-map');
          
          if (mapContainer && !mapContainer.hasChildNodes()) {
            const map = L.map('locations-map').setView([-6.163255, 106.929148], 10);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add marker for Head Office
            const headOfficeMarker = L.marker([-6.163255, 106.929148]).addTo(map);
            headOfficeMarker.bindPopup("<b>Head Office, PT Batara Dharma Persada</b><br>Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, East Jakarta City, DKI Jakarta 13910").openPopup();
            
            // Add marker for Operation Site
            const operationSiteMarker = L.marker([0.526275, 116.116552]).addTo(map);
            operationSiteMarker.bindPopup("<b>Operation Site, PT Batara Dharma Persada</b><br>Tabang - East Kalimantan");
            
            // Adjust map to show both markers
            const bounds = L.latLngBounds([
              [-6.163255, 106.929148],
              [0.526275, 116.116552]
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
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero Header */}
      <section className="relative py-28 overflow-hidden border-b border-gray-800">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206305/IMG_8579_g4f2tm.jpg" 
            alt="Mining operations"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Project Sites</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0" style={{ bottom: '5px' }} />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Strategic locations across Indonesia delivering excellence in mining and hauling operations
            </p>
            
            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10 text-white">Service Area Map</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#1FBFB8]/20 z-0"></span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              PT Batara Dharma Persada operational presence across the Indonesian archipelago
            </p>
          </div>

          <div className="reveal-project opacity-0 translate-y-6 transition-all duration-700">
            <div className="bg-gray-900/60 p-8 rounded-xl shadow-lg mb-10 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white">Strategic Locations</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/40 p-6 rounded-lg border border-gray-800 hover:border-[#1FBFB8] transition-colors group">
                  <div className="flex items-start">
                    <div className="bg-[#1FBFB8]/20 p-4 rounded-lg mr-4 group-hover:bg-[#1FBFB8]/30 transition-colors">
                      <Building className="w-6 h-6 text-[#1FBFB8]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#1FBFB8] transition-colors">Head Office</h4>
                      <p className="text-gray-300 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#E85C23]" />
                        East Jakarta, Indonesia
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, East Jakarta City, DKI Jakarta 13910
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 p-6 rounded-lg border border-gray-800 hover:border-[#E85C23] transition-colors group">
                  <div className="flex items-start">
                    <div className="bg-[#E85C23]/20 p-4 rounded-lg mr-4 group-hover:bg-[#E85C23]/30 transition-colors">
                      <Truck className="w-6 h-6 text-[#E85C23]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#E85C23] transition-colors">Operation Site</h4>
                      <p className="text-gray-300 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#1FBFB8]" />
                        Tabang, East Kalimantan
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        PT. Bayan Resource Tbk - Coal Mining and Transportation Operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Leaflet Map */}
            <div className="bg-gray-900/60 rounded-xl overflow-hidden shadow-lg border border-gray-800" style={{ height: "600px" }}>
              {/* Map Container */}
              <div id="locations-map" className="w-full h-full">
                {/* Leaflet will initialize here */}
              </div>
            </div>
            
            {/* CSS for Leaflet */}
            <style jsx global>{`
              @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              
              .leaflet-container {
                background-color: #1a1a1a;
              }
              
              .leaflet-popup-content-wrapper {
                background: rgba(30, 30, 30, 0.95);
                color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(80, 80, 80, 0.3);
              }
              
              .leaflet-popup-tip {
                background: rgba(30, 30, 30, 0.95);
              }
              
              .leaflet-popup-content {
                margin: 13px 19px;
                line-height: 1.5;
              }
              
              .leaflet-popup-content p {
                margin: 8px 0;
                color: #e0e0e0;
              }
              
              .leaflet-popup-content b {
                font-weight: bold;
                color: #E85C23;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10 text-white">Project Gallery</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Images from our mining and transportation operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-project opacity-0 translate-y-6 transition-all duration-700">
            {/* Gallery Item 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-800 h-64 md:h-80">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747207936/DJI_0671_waz5wb.jpg"
                alt="Mining Operations Pitstop"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-lg font-bold text-white mb-1">Mining Operations</h3>
                <p className="text-sm text-gray-300">Tabang, East Kalimantan</p>
              </div>
            </div>
            
            {/* Gallery Item 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-800 h-64 md:h-80">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747208321/IMG_0003_t168bm.jpg"
                alt="Coal Transportation"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-lg font-bold text-white mb-1">Coal Transportation</h3>
                <p className="text-sm text-gray-300">Hauling Operations</p>
              </div>
            </div>
            
            {/* Gallery Item 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-800 h-64 md:h-80">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747208062/IMG20241231091819_mktl7d.jpg"
                alt="Equipment Fleet"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-lg font-bold text-white mb-1">Equipment Fleet</h3>
                <p className="text-sm text-gray-300">Heavy Machinery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E85C23]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto text-center reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Interested in Our Services?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Contact our team to discuss your coal transportation needs and mining solutions. We're ready to help optimize your operations.
          </p>
          <a
            href="/kontak"
            className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-8 py-4 rounded-md transition-colors shadow-lg text-lg group"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  );
}