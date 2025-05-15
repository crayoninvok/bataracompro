"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function OurUnits() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747206106/IMG_0002_rjugv5.jpg",
      title: "Volvo Truck Double Trailer",
      subtitle: "High Capacity Coal Transportation"
    },
    {
      image: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747206072/IMG_8463_yqdams.jpg",
      title: "Trailer",
      subtitle: "Efficient All-Terrain Performance"
    },
    {
      image: "https://res.cloudinary.com/dysmj8esf/image/upload/v1747206132/WhatsApp_Image_2025-01-18_at_12.26.37_aeoan3.jpg",
      title: "Coal Hauling Operations",
      subtitle: "Safe and Reliable Delivery"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("units-section");
    if (section) observer.observe(section);

    // Auto slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      if (section) observer.unobserve(section);
      clearInterval(slideInterval);
    };
  }, [slides.length]);
  
  return (
    <section id="units-section" className="py-16 md:py-24 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-t border-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1FBFB8]/10 to-transparent -z-0" />
      <div className="absolute top-1/3 left-0 w-1/3 h-full bg-gradient-to-r from-[#E85C23]/10 to-transparent -z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Image column */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 group h-[300px] md:h-[400px]">
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image 
                    src={slide.image} 
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-medium text-lg">{slide.title}</p>
                    <div className="flex items-center mt-2">
                      <span className="w-8 h-0.5 bg-[#1FBFB8] mr-2" />
                      <span className="text-white/80 text-sm">{slide.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Slide indicators */}
              <div className="absolute bottom-3 right-3 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      currentSlide === index ? "bg-[#1FBFB8]" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Content column */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}>
            <div className="max-w-lg">
              <span className="inline-block text-[#1FBFB8] font-medium mb-3">
                OUR TRANSPORTATION UNITS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Advanced <span className="text-[#E85C23]">Coal Hauling</span> Solutions
              </h2>
              
              <div className="space-y-5 text-gray-300 mb-8">
                <p className="leading-relaxed">
                  Our fleet features state-of-the-art Volvo trucks equipped with double trailers, 
                  maximizing coal transportation efficiency while maintaining the highest safety standards.
                </p>
                <p className="leading-relaxed">
                  These powerful units are specifically designed for the demanding conditions of mining operations,
                  offering superior reliability, reduced environmental impact, and exceptional hauling capacity.
                </p>
              </div>
              
              {/* Key features */}
              <div className="space-y-4 mb-8">
                {[
                  "Up to 200-ton coal capacity per trip",
                  "Fuel-efficient Volvo engine technology",
                  "Advanced safety and monitoring systems",
                  "Reduced carbon footprint per ton transported"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#E85C23]/20 flex items-center justify-center mr-3">
                      <ChevronRight className="w-4 h-4 text-[#E85C23]" />
                    </div>
                    <p className="text-gray-200">{feature}</p>
                  </div>
                ))}
              </div>
              
              <Link
                href="/kontak"
                className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-6 py-3 rounded-md font-medium transition-all duration-300 group"
              >
                Discuss Your Transportation Needs
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}