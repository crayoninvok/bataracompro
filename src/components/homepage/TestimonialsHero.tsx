"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      quote:
        "PT. Batara Dharma Persada has been a very reliable coal transportation partner. Their monitoring system has helped us improve delivery efficiency and reduce waiting times at the mining site.",
      author: "Hendri Wijaya",
      position: "Operations Director, PT. BUMA",
      image: "/api/placeholder/80/80",
    },
    {
      quote:
        "During our partnership with Batara Dharma Persada, we have experienced a significant increase in coal transportation productivity. Their fleet is always in top condition and supported by accurate tracking technology.",
      author: "Surya Pratama",
      position: "Logistics Manager, PT. Adaro Indonesia",
      image: "/api/placeholder/80/80",
    },
    {
      quote:
        "Batara Dharma Persada's coal hauling service has helped us achieve production targets with exceptional consistency. Their fleet management system is key to optimizing our mining operations.",
      author: "Dian Kusuma",
      position: "Mine Operations Head, PT. Kaltim Prima Coal",
      image: "/api/placeholder/80/80",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".testimonial-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section py-20 px-4 md:px-8 lg:px-24 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-y border-gray-800">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E85C23]/10 to-transparent rounded-full -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mb-48"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 relative inline-block">
            <span className="relative z-10 text-white">Client Testimonials</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            What our mining partners say about our coal transportation services
          </p>
        </div>

        <div
          className={`bg-gray-900/80 border border-gray-800 rounded-lg p-6 md:p-10 shadow-lg relative transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -top-5 left-8 text-[#E85C23]">
            <Quote size={40} className="opacity-80" />
          </div>

          <div className="transition-opacity duration-500">
            <p className="text-base md:text-lg text-gray-300 mb-6 italic leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[#E85C23]">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentIndex].position}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === index ? "bg-[#E85C23] w-6" : "bg-gray-700 w-3"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}