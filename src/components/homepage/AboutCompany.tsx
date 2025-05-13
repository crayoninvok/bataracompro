"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Trophy, Users, Building, Shield } from "lucide-react";
import Image from "next/image";

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
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85C23]/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1FBFB8]/10 rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal opacity-0 translate-y-6 transition-all duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-[#5B5B5F]">About the Company</span>
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built with great dedication and a vision for a better future
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Company description */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-300">
            <div className="mb-8 flex items-center justify-center md:justify-start">
              <div className="w-16 h-16 rounded-full border-2 border-[#E85C23] bg-white p-1 shadow-md">
                <Image
                  src="/btr.png"
                  alt="Logo BTR"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              With the faith of God the Almighty as the main pillar,{" "}
              <strong className="text-[#5B5B5F] font-bold">
                PT Batara Dharma Persada
              </strong>{" "}
              (<span className="text-[#E85C23] font-bold">PT BATARA</span>)
              founded in 2024, focuses on improving the nation's quality of life
              through resource optimization and human development.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              The company supports medium-scale miners in Indonesia's coal,
              bauxite, and nickel sectors with efficient, safe, and
              environmentally responsible mining practices.
            </p>

            <div className="mt-10">
              <a
                href="/about/profile"
                className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#E85C23]/20 hover:shadow-[#E85C23]/40 group"
              >
                <span>Learn More</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right side: Company values */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-500">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E85C23]/5 to-[#1FBFB8]/5 rounded-full -mr-16 -mt-16"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-[#5B5B5F] relative z-10">
                Our Core Values
              </h3>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#E85C23]/10 p-3 rounded-full mr-4">
                    <Trophy className="w-6 h-6 text-[#E85C23]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#5B5B5F]">Integrity</h4>
                    <p className="text-gray-600">
                      We uphold honesty and ethics in every aspect of our business operations and relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#1FBFB8]/10 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#5B5B5F]">Innovation</h4>
                    <p className="text-gray-600">
                      Continuously improving and innovating to provide the best technological solutions for our clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#E85C23]/10 p-3 rounded-full mr-4">
                    <Building className="w-6 h-6 text-[#E85C23]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#5B5B5F]">Sustainability</h4>
                    <p className="text-gray-600">
                      Committed to sustainable growth and balancing economic development with environmental responsibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#1FBFB8]/10 p-3 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#5B5B5F]">Safety</h4>
                    <p className="text-gray-600">
                      Prioritizing the safety and wellbeing of our team, partners, and the communities we serve.
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