"use client";

import React, { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  subtitle?: string; // ← optional subtitle
  coverImage: string;
}

export default function ProjectGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const projects: Project[] = [
    {
      id: 1,
      title: "Coal Hauling Project - Tabang, Kalimantan",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747703546/DJI_0621_xjr19d.jpg",
    },
    {
      id: 2,
      title: "Coal Hauling Units",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747208062/IMG20241231091819_mktl7d.jpg",
    },
    {
      id: 3,
      title: "Units Pitstop",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747207936/DJI_0671_waz5wb.jpg",
    },
    {
      id: 4,
      title: "Ribbon Cutting Ceremony",
      subtitle: "Site: PT Indonesia Pratama",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747703578/IMG_8654_a27fgn.jpg",
    },
    {
      id: 5,
      title: "Our Site Teams",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747703497/DJI_0609_hxxr67.jpg",
    },
    {
      id: 6,
      title: "Unit Maintenance",
      coverImage:
        "https://res.cloudinary.com/dysmj8esf/image/upload/v1747208043/IMG_8386_cpqgnd.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false); // simulate loading finish
    }, 1000);

    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollPosition * 0.3;

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg text-white">
      {/* Header Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden border-b border-gray-800">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{
            transform: `translateY(${parallaxOffset * 0.1}px)`,
            animation: "gridMove 20s linear infinite",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#E85C23]/30"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6">
              <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Project Gallery</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0"
                  style={{ bottom: "5px" }}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore our{" "}
              <span className="text-[#1FBFB8] font-medium">
                ongoing and completed projects
              </span>{" "}
              across Indonesia's diverse mining operations.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section with Skeleton */}
      <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl h-64 bg-gray-800/50 animate-pulse border border-gray-700"
                >
                  <div className="h-48 bg-gray-700/60" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-600/60 rounded" />
                    <div className="h-3 w-1/2 bg-gray-600/50 rounded" />
                  </div>
                </div>
              ))
            : projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl overflow-hidden bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 shadow-md hover:shadow-[#1FBFB8]/20 transition-all"
                >
                  <div
                    className="relative h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.coverImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold leading-snug">
                        {project.title}
                        {project.subtitle && (
                          <div className="text-sm font-normal text-gray-100">
                            {project.subtitle}
                          </div>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Animations */}
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
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }
      `}</style>
    </main>
  );
}
