"use client";

import React, { useEffect } from "react";
import LocationCard from "./Location";

export default function MapSection() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        setTimeout(() => {
          const mapContainer = document.getElementById("locations-map");

          if (mapContainer && !mapContainer.hasChildNodes()) {
            const headOfficeCoords: [number, number] = [-6.148536, 106.918356];
            const senyiurCoords: [number, number] = [0.526275, 116.116552];
            // Muara Pahu — 0°01'24.3"N 116°01'45.2"E
            const muaraPahuCoords: [number, number] = [0.023417, 116.029222];

            const map = L.map("locations-map").setView(senyiurCoords, 8);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const headOfficeMarker = L.marker(headOfficeCoords).addTo(map);
            headOfficeMarker
              .bindPopup(
                "<b>Head Office, PT Batara Dharma Persada</b><br>Rukan Grand Orchard Square, Jl. Terusan Klp. Hybrida Blok D22, RT.9/RW.1, Sukapura, Kec. Cilincing, Kota Adm, Daerah Khusus Ibukota Jakarta 14140"
              )
              .openPopup();

            const senyiurMarker = L.marker(senyiurCoords).addTo(map);
            senyiurMarker.bindPopup(
              "<b>Coal Hauling Site — PT Indonesia Pratama</b><br>Senyiur, East Kalimantan<br><i>Active · Contractor: PT Batara Dharma Persada</i>"
            );

            const muaraPahuMarker = L.marker(muaraPahuCoords).addTo(map);
            muaraPahuMarker.bindPopup(
              "<b>Muara Pahu Project — PT Indonesia Pratama</b><br>0°01'24.3\"N 116°01'45.2\"E<br><i>In preparation · Go-live 2nd week of July 2026</i>"
            );

            const bounds = L.latLngBounds([
              headOfficeCoords,
              senyiurCoords,
              muaraPahuCoords,
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
            Head office in Jakarta, active hauling at Senyiur, and Muara Pahu project
            preparation underway — all serving PT Indonesia Pratama under the Bayan
            Resources Group
          </p>
        </div>

        <div className="reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <div className="bg-gray-900/60 p-8 rounded-xl shadow-lg mb-10 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Project Locations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LocationCard
                type="office"
                title="Head Office"
                location="North Jakarta, Indonesia"
                address="Rukan Grand Orchard Square, Jl. Terusan Klp. Hybrida Blok D22, RT.9/RW.1, Sukapura, Kec. Cilincing, Kota Adm, Daerah Khusus Ibukota Jakarta 14140"
              />
              <LocationCard
                type="operation"
                title="Senyiur Hauling Site"
                location="Senyiur, East Kalimantan"
                address="PT Indonesia Pratama — Active coal hauling contract since 2024 (30 units)"
              />
              <LocationCard
                type="operation"
                title="Muara Pahu Project"
                location="Muara Pahu, East Kalimantan"
                address={'0°01\'24.3"N 116°01\'45.2"E — PT Indonesia Pratama, in preparation, go-live 2nd week of July 2026 (23 units)'}
              />
            </div>
          </div>

          {/* Responsive Leaflet Map */}
          <div className="relative w-full max-w-full overflow-hidden rounded-xl shadow-lg border border-gray-800 bg-gray-900/60">
            <div
              id="locations-map"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
            />
          </div>

          {/* Global Leaflet Styles */}
          <style jsx global>{`
            @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

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
              color: #1fbfb8;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
