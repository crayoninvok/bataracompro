// MapSection.jsx
"use client";

import React, { useEffect } from "react";
import { MapPin, Building, Truck } from "lucide-react";

export default function MapSection() {
  useEffect(() => {
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
            operationSiteMarker.bindPopup("<b>Operation Site, PT Indonesia Pratama</b><br>Tabang - East Kalimantan");
            
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
  }, []);

  return (
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
              <LocationCard 
                type="office"
                title="Head Office"
                location="East Jakarta, Indonesia"
                address="Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, East Jakarta City, DKI Jakarta 13910"
              />
              
              <LocationCard 
                type="operation"
                title="Operation Site"
                location="Tabang, East Kalimantan"
                address="PT. Indonesia Pratama - Coal Mining and Transportation Operations"
              />
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
  );
}

// Import the LocationCard component
import LocationCard from './Location';