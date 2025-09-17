"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function StriveValues() {
  const [isVisible, setIsVisible] = useState(false);
  // Fix: Explicitly type activeCard as number | null
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("strive-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const striveValues = [
    {
      letter: "S",
      title: "Synergy",
      description: "We believe synergy is the key to success. We create opportunities through strong collaboration between teams, partners, customers and stakeholders.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[#1FBFB8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "#1FBFB8",
      benefits: ["Enhanced teamwork", "Shared expertise", "Collective growth"]
    },
    {
      letter: "T",
      title: "Trusted",
      description: "We behave honestly and maintain high commitment to company regulations and ethical codes consistently, preserving reputation and ensuring customer satisfaction.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[#E85C23]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      color: "#E85C23",
      benefits: ["Client confidence", "Consistent delivery", "Long-term partnerships"]
    },
    {
      letter: "R",
      title: "Responsible & Resourceful",
      description: "We take ownership of our actions and obligations while being creative and adaptable in finding solutions to challenges.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[#1FBFB8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "#1FBFB8",
      benefits: ["Innovative solutions", "Adaptive approach", "Sustainable practices"]
    },
    {
      letter: "I",
      title: "Integrity",
      description: "We uphold outstanding character traits and work ethics, including transparency, honesty, dependability, and loyalty in all business dealings.",
      icon: (
        <div className="w-8 h-8 bg-[#E85C23]/20 rounded-lg flex items-center justify-center">
          <Image
            src="/bow.png"
            alt="Bow Icon"
            width={24}
            height={24}
            className="object-contain filter brightness-125"
          />
        </div>
      ),
      color: "#E85C23",
      benefits: ["Ethical leadership", "Transparent operations", "Moral excellence"]
    },
    {
      letter: "V",
      title: "Values",
      description: "We embrace guiding principles and fundamental beliefs that help our team work toward common business goals, enhancing all business dealings.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[#1FBFB8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      color: "#1FBFB8",
      benefits: ["Unified direction", "Clear principles", "Consistent culture"]
    },
    {
      letter: "E",
      title: "Extraordinary",
      description: "We set high standards, pursue excellence and establish positive examples in everything we do as a company.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[#E85C23]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "#E85C23",
      benefits: ["Superior results", "Industry leadership", "Continuous improvement"]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section
      id="strive-section"
      className="py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/15 via-[#E85C23]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/15 via-[#1FBFB8]/5 to-transparent" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#1FBFB8]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#E85C23]/8 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 border border-[#1FBFB8]/30 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 left-16 w-6 h-6 border border-[#E85C23]/30 rotate-12 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#1FBFB8]" />
            <span className="inline-block text-[#1FBFB8] font-semibold tracking-wider uppercase text-sm">
              Our Core Principles
            </span>
            <Sparkles className="w-5 h-5 text-[#1FBFB8]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our{" "}
            <span className="relative">
              <span className="text-[#1FBFB8] relative z-10">Quality</span>
              <span className="absolute bottom-0 left-0 w-full h-4 bg-[#1FBFB8]/30 -z-1" />
            </span>{" "}
            Policy
          </h2>
          
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            The foundational principles that guide every aspect of our business, 
            shaping our corporate culture and driving our commitment to excellence.
          </p>
          
          {/* Enhanced STRIVE logo section */}
          <motion.div 
            className="relative mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#1FBFB8]/20 via-[#E85C23]/20 to-[#1FBFB8]/20 animate-pulse" />
            </div>
            <div className="relative z-10">
              <Image
                src="/strivenobg.png"
                alt="STRIVE Methodology"
                width={400}
                height={220}
                className="mx-auto drop-shadow-2xl filter brightness-110"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced cards grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {striveValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group cursor-pointer"
            >
              <motion.div
                variants={cardHoverVariants}
                className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700 h-full relative overflow-hidden transition-all duration-500"
                style={{
                  borderColor: activeCard === index ? value.color + '50' : undefined,
                  boxShadow: activeCard === index ? `0 20px 60px ${value.color}25` : undefined
                }}
              >
                {/* Card glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${value.color}10 0%, transparent 70%)`
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start space-x-6 mb-6">
                    {/* Enhanced icon container */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg"
                      style={{ 
                        backgroundColor: `${value.color}20`,
                        border: `2px solid ${value.color}30`
                      }}
                    >
                      {value.icon}
                    </div>
                    
                    {/* Letter and title */}
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span
                          className="text-4xl font-bold mr-3 transition-all duration-300 group-hover:scale-110"
                          style={{ color: value.color }}
                        >
                          {value.letter}
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                          {value.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {value.description}
                  </p>
                  
                  {/* Benefits list */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Benefits</h4>
                    {value.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: value.color }}
                        />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hover arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight 
                    className="w-5 h-5 transition-colors duration-300" 
                    style={{ color: value.color }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced footer */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 py-3 px-6 lg:py-4 lg:px-8 bg-gradient-to-r from-[#1FBFB8]/20 to-[#E85C23]/20 backdrop-blur-sm rounded-full border border-gray-600/50">
            <div className="w-2 h-2 bg-[#1FBFB8] rounded-full animate-pulse" />
            <span className="text-white font-semibold text-sm lg:text-base">
              Guided by our values in every project we undertake
            </span>
            <div className="w-2 h-2 bg-[#E85C23] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}