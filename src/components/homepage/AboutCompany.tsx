import React from "react";

export default function AboutCompany() {
  return (
    <section className="bg-white text-black py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Tentang Perusahaan
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          With the faith of God the Almighty as the main pillar,{" "}
          <strong>PT Bahtera Putera Nusantara</strong> (PT BATARA) was founded
          in 2019 to take part in enhancing the nation’s quality of life through
          human resources and value development, along with optimum natural
          resources exploitation. The company is designed to grow sustainably by
          embracing innovation, integrity, and a strong commitment to national
          development.
        </p>
        {/* Optional: See more button */}
        <div className="mt-6">
          <a
            href="/tentang/profil"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Selengkapnya
          </a>
        </div>
      </div>
    </section>
  );
}
