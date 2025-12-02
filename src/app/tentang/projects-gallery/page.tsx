"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  coverImage: string;
  description?: string;
}

export default function ProjectGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Coal Hauling Project - Tabang, Kalimantan",
      description: "Large-scale coal transportation operations in the heart of Kalimantan's mining region, featuring state-of-the-art hauling equipment and logistics coordination.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764664767/DJI_0621_fbwnzz.jpg",
    },
    {
      id: 2,
      title: "Coal Hauling Units",
      description: "Our fleet of specialized coal hauling vehicles designed for maximum efficiency and safety in challenging mining environments.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764664824/IMG_8466_gcbbvh.jpg",
    },
    {
      id: 3,
      title: "Units Pitstop",
      description: "Strategic maintenance and refueling stations ensuring continuous operations and optimal performance of our mining equipment.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764664909/DJI_0671_zfsnl4.jpg",
    },
    {
      id: 4,
      title: "Ribbon Cutting Ceremony",
      subtitle: "Site: PT Indonesia Pratama",
      description: "Official inauguration of our new mining operations facility, marking a significant milestone in our expansion across Indonesia.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764665276/IMG_8653_sjven5.jpg",
    },
    {
      id: 5,
      title: "Our Site Teams",
      description: "Dedicated professionals who ensure safety, efficiency, and excellence in all our mining operations across various project sites.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764665343/IMG_8583_ik3j3s.jpg",
    },
    {
      id: 6,
      title: "Unit Maintenance",
      description: "Comprehensive maintenance operations ensuring our equipment operates at peak performance with minimal downtime.",
      coverImage: "https://res.cloudinary.com/dg1chwpuo/image/upload/v1764665588/IMG_8386_uhg6co.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false);
    }, 1000);

    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(projects.findIndex(p => p.id === project.id));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: number) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentImageIndex(newIndex);
      setSelectedProject(projects[newIndex]);
    }
  };

  const parallaxOffset = scrollPosition * 0.3;

  return (
    <>
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

        {/* Gallery Section */}
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
                    className="rounded-xl overflow-hidden bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 shadow-md hover:shadow-[#1FBFB8]/20 transition-all duration-300 cursor-pointer group"
                    onClick={() => openModal(project)}
                  >
                    <div
                      className="relative h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.coverImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                      
                      {/* Zoom Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold leading-snug">
                          {project.title}
                          {project.subtitle && (
                            <div className="text-sm font-normal text-gray-100 mt-1">
                              {project.subtitle}
                            </div>
                          )}
                        </h3>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#1FBFB8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {currentImageIndex > 0 && (
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {currentImageIndex < projects.length - 1 && (
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="flex-1 relative">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
              </div>

              {/* Content Section */}
              <div className="lg:w-96 p-6 lg:p-8 flex flex-col justify-center bg-gray-900/95 backdrop-blur-sm">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.subtitle && (
                      <p className="text-[#1FBFB8] font-medium mt-2">
                        {selectedProject.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {selectedProject.description && (
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  )}

                  {/* Project Counter */}
                  <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
                    <span>Project {currentImageIndex + 1} of {projects.length}</span>
                    <span className="text-[#E85C23]">Click arrows to navigate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}