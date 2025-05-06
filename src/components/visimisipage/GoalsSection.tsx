"use client";

import React from "react";

export default function GoalsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Tujuan Kami</h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          Tujuan kami adalah menciptakan dampak positif yang berkelanjutan bagi klien, komunitas, dan lingkungan melalui layanan logistik yang unggul.
        </p>
        <ul className="list-disc list-inside text-left max-w-2xl mx-auto text-gray-700">
          <li>Meningkatkan kepuasan pelanggan dengan layanan tepat waktu dan aman</li>
          <li>Mendorong inovasi dalam sistem manajemen logistik</li>
          <li>Mewujudkan pertumbuhan bisnis yang inklusif dan berkelanjutan</li>
        </ul>
      </div>
    </section>
  );
}
