"use client";

import React from "react";
import { Gem, Users, Target } from "lucide-react";

const values = [
  {
    icon: <Gem className="w-6 h-6 text-blue-600" />,
    title: "Integritas",
    description:
      "Menjunjung tinggi kejujuran dan transparansi dalam semua aspek operasional.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Kolaborasi",
    description:
      "Bekerja sama dengan semua pihak untuk mencapai hasil terbaik.",
  },
  {
    icon: <Target className="w-6 h-6 text-blue-600" />,
    title: "Komitmen",
    description:
      "Fokus terhadap hasil dan tanggung jawab terhadap misi perusahaan.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
          Nilai Perusahaan
        </h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div key={i} className="p-6 bg-blue-50 rounded-lg shadow text-left">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
