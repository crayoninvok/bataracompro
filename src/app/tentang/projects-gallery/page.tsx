"use client";

import React, { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  coverImage: string;
}

export default function ProjectGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Coal Hauling Project - Tabang, Kalimantan",
      coverImage: "/projects/coal-transport-1.jpg",
    },
    {
      id: 2,
      title: "Mining Equipment Supply",
      coverImage: "/projects/equipment-1.jpg",
    },
    {
      id: 3,
      title: "Overburden Removal Project",
      coverImage: "/projects/overburden-1.jpg",
    },
    {
      id: 4,
      title: "Coal Hauling Road Construction",
      coverImage: "/projects/road-1.jpg",
    },
    {
      id: 5,
      title: "Mine Site Development",
      coverImage: "/projects/site-development-1.jpg",
    },
    {
      id: 6,
      title: "Port Facility Transportation",
      coverImage: "/projects/port-transport-1.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollPosition * 0.3;

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg text-white">
      {/* Page Header */}
      <section className="relative py-20 border-b border-gray-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{ animation: "gridMove 20s linear infinite", transform: `translateY(${parallaxOffset * 0.1}px)` }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Project Gallery</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0" style={{ bottom: "5px" }} />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery Section Only */}
      <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
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
                  <h3 className="text-lg font-bold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
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
