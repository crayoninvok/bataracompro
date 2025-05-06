"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      quote: "PT. Batara Dharma Persada telah menjadi mitra transportasi batubara yang sangat andal. Sistem monitoring mereka membantu kami meningkatkan efisiensi pengiriman dan mengurangi waktu tunggu di lokasi tambang.",
      author: "Hendri Wijaya",
      position: "Operations Director, PT. BUMA",
      image: "/api/placeholder/80/80" // Replace with actual customer image path
    },
    {
      quote: "Selama bermitra dengan Batara Dharma Persada, kami mengalami peningkatan signifikan dalam produktivitas transportasi batubara. Armada mereka selalu dalam kondisi prima dan didukung teknologi tracking yang akurat.",
      author: "Surya Pratama",
      position: "Logistics Manager, PT. Adaro Indonesia",
      image: "/api/placeholder/80/80" // Replace with actual customer image path
    },
    {
      quote: "Layanan hauling batubara dari Batara Dharma Persada telah membantu kami mencapai target produksi dengan konsistensi yang luar biasa. Sistem manajemen fleet mereka menjadi kunci dalam mengoptimalkan operasional tambang kami.",
      author: "Dian Kusuma",
      position: "Mine Operations Head, PT. Kaltim Prima Coal",
      image: "/api/placeholder/80/80" // Replace with actual customer image path
    }
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

    const section = document.querySelector('.testimonial-section');
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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section py-24 px-4 md:px-8 lg:px-24 bg-blue-50 dark:bg-blue-950/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full -ml-32 -mt-32 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 dark:bg-orange-900/20 rounded-full -mr-48 -mb-48 opacity-50"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Testimonial Klien</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 dark:bg-orange-600 opacity-40 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Apa kata mitra pertambangan kami tentang layanan transportasi batubara kami
          </p>
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-md relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute -top-6 left-10 text-orange-500 dark:text-orange-400">
            <Quote size={48} className="opacity-80" />
          </div>
          
          <div className="transition-opacity duration-500">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-gray-200 dark:border-gray-700">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonials[currentIndex].author}</h4>
                <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 flex space-x-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-blue-600 dark:bg-blue-400 w-4' 
                    : 'bg-gray-300 dark:bg-gray-600'
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