"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Trophy, Users, Building } from "lucide-react";

export default function AboutCompany() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("opacity-100");
        el.classList.remove("opacity-0", "translate-y-6");
      });
    }, 300);

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

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-gray-900 py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden min-h-[500px]"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-32 -mt-32 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full -ml-48 -mb-48 opacity-40"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal opacity-0 translate-y-6 transition-all duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Tentang Perusahaan</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dibangun dengan dedikasi tinggi dan visi untuk masa depan yang lebih
            baik
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left side: Company description */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-300">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              With the faith of God the Almighty as the main pillar,{" "}
              <strong className="text-blue-700">
                PT Batara Dharma Persada
              </strong>{" "}
              (<span className="text-orange-500 font-bold">PT BATARA</span>) was
              founded in 2019 to take part in enhancing the nation&apos;s
              quality of life through human resources and value development,
              along with optimum natural resources exploitation.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              The company is designed to grow sustainably by embracing
              innovation, integrity, and a strong commitment to national
              development.
            </p>

            <div className="mt-8">
              <a
                href="/tentang/profil"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition group"
              >
                <span>Selengkapnya</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right side: Company values */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-500">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-blue-700">
                Nilai-Nilai Perusahaan
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full mr-4">
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Integritas</h4>
                    <p className="text-gray-600">
                      Kami menjunjung tinggi kejujuran dan etika dalam setiap
                      aspek bisnis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Inovasi</h4>
                    <p className="text-gray-600">
                      Terus berinovasi untuk memberikan solusi teknologi
                      terbaik.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full mr-4">
                    <Building className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Keberlanjutan</h4>
                    <p className="text-gray-600">
                      Berkomitmen pada pertumbuhan berkelanjutan dan pembangunan
                      nasional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
