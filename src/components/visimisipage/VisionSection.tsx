"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  Target,
  Award,
  Users,
  Zap,
  Globe,
  BarChart,
  Shield,
} from "lucide-react";

interface MissionItem {
  title: string;
  text: string;
  icon: React.ReactNode;
  color: "orange" | "teal";
}

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const missionItems: MissionItem[] = [
    {
      title: "Premium Service",
      text: "To deliver the best service to our customers in the Mining Service industry through consistent excellence and innovation.",
      icon: <Award className="w-6 h-6 text-orange-500" />,
      color: "orange",
    },
    {
      title: "Value Creation",
      text: "To create value and make a difference by providing distinct and beneficial products and services in Energy and Mining Business.",
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      color: "teal",
    },
    {
      title: "Human Capital",
      text: "To develop and continuously improve Human Capital for a brighter future through comprehensive training and career advancement.",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      color: "orange",
    },
    {
      title: "Optimal Efficiency",
      text: "To continuously improve company competence to reach optimal efficiency with the implementation of latest technology.",
      icon: <Zap className="w-6 h-6 text-teal-400" />,
      color: "teal",
    },
    {
      title: "Sustainable Practices",
      text: "To ensure all operations balance economic growth with environmental preservation and social responsibility.",
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      color: "orange",
    },
    {
      title: "Continuous Growth",
      text: "To expand our market reach and service offerings while maintaining the highest standards of quality and reliability.",
      icon: <BarChart className="w-6 h-6 text-teal-400" />,
      color: "teal",
    },
  ];

  const renderMissionItem = (item: MissionItem, index: number) => (
    <div
      key={index}
      className={`relative p-6 bg-[#2A2A30]/80 rounded-lg border ${
        item.color === "orange" ? "border-[#E85C23]/30" : "border-[#1FBFB8]/30"
      } hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group`}
      style={{
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="flex items-start">
        <div
          className={`w-14 h-14 ${
            item.color === "orange" ? "bg-[#E85C23]/10" : "bg-[#1FBFB8]/10"
          } rounded-lg flex items-center justify-center mr-5 flex-shrink-0`}
        >
          {item.icon}
        </div>
        <div>
          <h4
            className={`text-xl font-bold mb-3 ${
              item.color === "orange" ? "text-[#E85C23]" : "text-[#1FBFB8]"
            }`}
          >
            {item.title}
          </h4>
          <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="vision-section"
      className="py-20 md:py-28 bg-gradient-to-b from-[#1F1F23] to-[#121214] text-white relative overflow-hidden border-y border-gray-800"
    >
      {/* Background elements to match hero */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85C23]/5 rounded-full -mr-48 -mt-48 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1FBFB8]/5 rounded-full -ml-48 -mb-48 blur-xl"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E85C23]/30"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div
          className="text-center mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="relative inline-block">
              <span className="relative z-10">Our Vision & Mission</span>
              <span
                className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 -z-1"
                style={{ bottom: "5px" }}
              ></span>
            </span>
          </h1>
          <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Driving forward with clear purpose and direction, building a
            sustainable future for our stakeholders, environment, and
            communities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-16">
          {/* Vision Column */}
          <div
            className="lg:w-1/2 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: "300ms",
            }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#E85C23]/10 flex items-center justify-center mr-4">
                <Eye className="w-7 h-7 text-[#E85C23]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vision
              </h2>
            </div>
            <div className="w-24 h-1 bg-[#E85C23] mb-8" />

            <div className="p-8 bg-[#2A2A30]/80 rounded-lg border-l-4 border-[#E85C23] mb-12 shadow-xl hover:shadow-2xl transition-all duration-300">
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                "To be a{" "}
                <span className="text-[#E85C23]">
                  Leading Mining and Energy Group
                </span>{" "}
                to build a <span className="text-[#E85C23]">Better Living</span>
                ."
              </p>
            </div>

            {/* Vision Illustration */}
            <div className="h-72 mb-10 rounded-xl overflow-hidden relative shadow-lg border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-[#222228] to-[#1A1A1E]">
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

                {/* Mining landscape elements */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800/70"></div>

                {/* Simple mining equipment */}
                <div className="absolute bottom-14 right-1/3 w-36 h-16">
                  <div className="w-24 h-10 bg-yellow-700 rounded-lg opacity-80"></div>
                  <div className="w-36 h-6 bg-yellow-800 rounded-lg mt-px opacity-80"></div>
                  <div className="absolute -top-4 right-6 w-8 h-14 bg-gray-600 rounded-t-sm"></div>
                </div>

                {/* Subtle glow effects */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#E85C23]/10 rounded-full filter blur-xl"></div>
              </div>

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-start p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="group transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl text-white font-bold mb-3">
                    Building a Better Living
                  </h3>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-[#E85C23] mr-3" />
                    <p className="text-gray-200 text-sm">
                      Through leadership in Mining and Energy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {missionItems.slice(4, 6).map(renderMissionItem)}
            </div>
          </div>

          {/* Mission Column */}
          <div
            className="lg:w-1/2 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(20px)",
              transitionDelay: "500ms",
            }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#1FBFB8]/10 flex items-center justify-center mr-4">
                <Target className="w-7 h-7 text-[#1FBFB8]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Mission
              </h2>
            </div>
            <div className="w-24 h-1 bg-[#1FBFB8] mb-8" />

            {/* Mission Illustration */}
            <div className="h-72 mb-10 rounded-xl overflow-hidden relative shadow-lg border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-[#222228] to-[#1A1A1E]">
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

                {/* Simple grid lines */}
                <div className="absolute inset-0 grid grid-cols-8 gap-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-full border-r border-[#1FBFB8]/10"
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-8 gap-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full border-b border-[#1FBFB8]/10"
                    ></div>
                  ))}
                </div>

                {/* Simple circle elements */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-[#1FBFB8]/40 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-[#1FBFB8]/30 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-[#1FBFB8]/40 rounded-full"></div>

                {/* Subtle glow effects */}
                <div className="absolute top-1/3 left-1/2 w-1/3 h-px bg-[#1FBFB8]/30"></div>
                <div className="absolute top-2/3 right-1/4 w-1/4 h-px bg-[#1FBFB8]/30"></div>
                <div className="absolute bottom-1/3 left-1/4 w-1/4 h-px bg-[#1FBFB8]/30"></div>
              </div>

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-start p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="group transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl text-white font-bold mb-3">
                    Excellence in Mining Services
                  </h3>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-[#1FBFB8] mr-3" />
                    <p className="text-gray-200 text-sm">
                      Commitment to quality and innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {missionItems.slice(0, 4).map(renderMissionItem)}
            </div>
          </div>
        </div>

        {/* Bottom element */}
        <div
          className="mt-16 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "700ms",
          }}
        >
          <div className="inline-block py-3 px-5 bg-gradient-to-r from-[#E85C23]/10 to-[#1FBFB8]/10 rounded-full border border-gray-800">
            <span className="text-white font-medium">
              Building a sustainable future through excellence in mining
            </span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(75, 85, 99, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(75, 85, 99, 0.1) 1px,
              transparent 1px
            );
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
}
