// src/components/profile/AboutSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Users, Briefcase } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="about-section" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/truck1.png" // Replace with actual image
                alt="PT. Batara Dharma Persada Office"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">
                  Kantor PT. Batara Dharma Persada
                </p>
              </div>
            </div>
          </div>

          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
              About PT. Batara Dharma Persada
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-6" />
            <p className="text-gray-700 mb-4 leading-relaxed">
              With the faith of God the Almighty as the main pillar, PT Batara
              Dharma Persada was founded in 2024 to take a part to enhance
              nation’s quality of the life through human resources and value
              development along with optimum natural resources exploitation. The
              company is designed to complement mining industry in Indonesia,
              especially in coal, bauxite and nickel mining operation.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              With the decentralization of government in mining, so that many
              Mining Business Permits are issued on a medium-to-small scale, PT
              Batara Dharma Persada is present to ll the gap of medium-scale
              miners with the right mining techniques and patterns, not only
              efcient, optimum recovery, but very concerned about safety and
              the environment by applying Good Mining Practice.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Didirikan</p>
                  <p className="text-gray-600">2024</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Karyawan</p>
                  <p className="text-gray-600">150+</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Proyek</p>
                  <p className="text-gray-600">50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
