"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, ArrowRight, Truck, Building } from "lucide-react";

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
    // This runs only in the browser, not during server-side rendering
    if (typeof window !== 'undefined') {
      // Dynamically import leaflet when in the browser
      import('leaflet').then(L => {
        // Wait for the DOM to be ready
        setTimeout(() => {
          // Initialize the map if the container exists
          const mapContainer = document.getElementById('locations-map');
          
          if (mapContainer && !mapContainer.hasChildNodes()) {
            // Create a map instance
            const map = L.map('locations-map').setView([-6.163255, 106.929148], 10);
            
            // Add the OpenStreetMap tiles
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
        }, 1000); // Delay to ensure DOM is ready
      });
    }

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
            Our Project Sites
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Reaching strategic locations to provide the best coal transportation services in Indonesia
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Service Area Map</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              View the distribution of PT Batara Dharma Persada operational sites across Indonesia
            </p>
          </div>

          <div className="reveal-project opacity-0 translate-y-6 transition-all duration-700">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-xl font-bold mb-4">Strategic Locations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Head Office</h4>
                      <p className="text-gray-600 mb-2">East Jakarta, Indonesia</p>
                      <p className="text-sm text-gray-500">
                        Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, East Jakarta City, DKI Jakarta 13910
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-3">
                      <Truck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Operation Site</h4>
                      <p className="text-gray-600 mb-2">Tabang, East Kalimantan</p>
                      <p className="text-sm text-gray-500">
                        PT. Bayan Resource Tbk
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Leaflet Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ height: "500px" }}>
              {/* Map Container */}
              <div id="locations-map" className="w-full h-full">
                {/* Leaflet will initialize here */}
              </div>
            </div>
            
            {/* CSS for Leaflet */}
            <style jsx global>{`
              @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              
              /* Make sure the popups are styled correctly */
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
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in Our Services?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Contact our team to discuss your coal transportation needs and mining solutions
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md transition font-medium"
          >
            <span>Contact Us</span>
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
