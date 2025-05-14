"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Users, Briefcase, Award, ChevronRight } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="about-section" className="py-20 md:py-28 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-t border-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/10 to-transparent -z-0" />
      <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full bg-[#1FBFB8]/10 blur-3xl -z-0" />
      <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-[#E85C23]/10 blur-3xl -z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
          {/* Image Column */}
          <div
            className={`lg:w-1/2 transition-all duration-700 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747204272/IMG_8480_sc9mlm.jpg"
                alt="PT. Batara Dharma Persada Office"
                width={640}
                height={480}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium text-lg">
                  PT. Batara Dharma Persada Headquarters
                </p>
                <div className="flex items-center mt-2">
                  <span className="w-8 h-0.5 bg-[#E85C23] mr-2" />
                  <span className="text-white/80 text-sm">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div
            className={`lg:w-1/2 transition-all duration-700 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="max-w-lg">
              <span className="inline-block text-[#E85C23] font-medium mb-3">
                OUR COMPANY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Committed to Excellence in <span className="text-[#E85C23]">Mining Operations</span>
              </h2>
              
              <div className="space-y-5 text-gray-300 mb-8">
                <p className="leading-relaxed">
                  Founded in 2024 with divine guidance as our foundation, PT Batara Dharma Persada 
                  is dedicated to elevating Indonesia's quality of life through strategic resource 
                  management and human capital development.
                </p>
                <p className="leading-relaxed">
                  We specialize in providing comprehensive mining solutions for medium-scale operations 
                  in coal, bauxite, and nickel sectors, implementing industry-best practices that 
                  prioritize safety, environmental responsibility, and operational efficiency.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { icon: Calendar, value: "2024", label: "Established", color: "#E85C23" },
                  { icon: Users, value: "150+", label: "Employees", color: "#1FBFB8" },
                  { icon: Briefcase, value: "2", label: "Active Projects", color: "#E85C23" },
                  { icon: Award, value: "10+ Years", label: "Collective Experience", color: "#1FBFB8" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div 
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center`}
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/about"
                className="inline-flex items-center group text-[#E85C23] font-medium hover:text-[#d14b17] transition-colors"
              >
                Learn more about our company
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}