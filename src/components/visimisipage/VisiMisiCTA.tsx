"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function VisiMisiCTA() {
  return (
    <section className="py-20 bg-blue-900 text-white text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Bergabung Bersama Kami
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-blue-100">
          Dukung kami dalam mewujudkan visi dan misi perusahaan menuju masa
          depan yang lebih baik.
        </p>
        <a
          href="#kontak"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Hubungi Kami <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
