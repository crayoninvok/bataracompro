// src/components/profile/ProfileCTA.tsx
import React from "react";
import Link from "next/link";

export default function ProfileCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tertarik Bekerja Sama Dengan Kami?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk mendiskusikan kebutuhan transportasi batubara
              perusahaan Anda dan dapatkan solusi terbaik
            </p>
            <Link
              href="/kontak"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
