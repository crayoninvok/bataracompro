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
      className="bg-black/80 backdrop-blur-lg text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden min-h-[500px] border-y border-gray-800"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E85C23]/10 to-transparent rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal opacity-0 translate-y-6 transition-all duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">About the Company</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Built with great dedication and a vision for a better future
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Company description */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-300">
            <div className="mb-6 flex items-center justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full border-2 border-[#E85C23] bg-black/40 p-1 shadow-md">
                <Image
                  src="/nobgbtrlogo.png"
                  alt="Logo BTR"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
              With the faith of God the Almighty as the main pillar,{" "}
              <strong className="text-white font-bold">
                PT Batara Dharma Persada
              </strong>{" "}
              (<span className="text-[#E85C23] font-bold">PT BATARA</span>)
              founded in 2024, focuses on improving the nation's quality of life
              through resource optimization and human development.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
              The company supports medium-scale miners in Indonesia's coal,
              bauxite, and nickel sectors with efficient, safe, and
              environmentally responsible mining practices.
            </p>

            <div className="mt-8">
              <a
                href="/about/profile"
                className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-6 py-2 rounded-md transition-all duration-300 shadow-md group"
              >
                <span>Learn More</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </div>
          </div>

          {/* Right side: Company values */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-1000 delay-500">
            <div className="bg-gray-900/80 p-8 rounded-lg shadow-lg border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E85C23]/5 to-[#1FBFB8]/5 rounded-full -mr-16 -mt-16"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-white relative z-10">
                Our Core Values
              </h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#E85C23]/10 p-3 rounded-lg mr-4">
                    <Trophy className="w-5 h-5 text-[#E85C23]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1 text-white">Integrity</h4>
                    <p className="text-gray-400 text-sm">
                      We uphold honesty and ethics in every aspect of our business operations and relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#1FBFB8]/10 p-3 rounded-lg mr-4">
                    <Users className="w-5 h-5 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1 text-white">Innovation</h4>
                    <p className="text-gray-400 text-sm">
                      Continuously improving and innovating to provide the best technological solutions for our clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#E85C23]/10 p-3 rounded-lg mr-4">
                    <Building className="w-5 h-5 text-[#E85C23]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1 text-white">Sustainability</h4>
                    <p className="text-gray-400 text-sm">
                      Committed to sustainable growth and balancing economic development with environmental responsibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#1FBFB8]/10 p-3 rounded-lg mr-4">
                    <Shield className="w-5 h-5 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-white">Safety</h4>
                    <p className="text-gray-400">
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