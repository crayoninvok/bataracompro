"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Building, Award } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutCompany() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/8 via-[#E85C23]/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/8 via-[#1FBFB8]/4 to-transparent" />
        
        {/* Animated floating orbs */}
        <motion.div 
          className="absolute top-20 right-32 w-64 h-64 rounded-full bg-[#E85C23]/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-[#1FBFB8]/5 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Subtle geometric patterns */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1FBFB8]/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 border border-[#E85C23]/20 rotate-12 animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Enhanced section header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
            <Building className="w-5 h-5 text-[#1FBFB8]" />
            <span className="text-[#1FBFB8] font-semibold tracking-wider uppercase text-sm">
              Company Overview
            </span>
            <Building className="w-5 h-5 text-[#1FBFB8]" />
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            About{" "}
            <span className="relative">
              <span className="text-[#1FBFB8] relative z-10">the Company</span>
              <span className="absolute bottom-0 left-0 w-full h-4 bg-[#1FBFB8]/30 -z-1" />
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Built with great dedication and a vision for a better future through 
            sustainable development and innovation
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left side: Enhanced company description */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Enhanced logo section */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start mb-8"
            >
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl border-2 border-[#1FBFB8]/50 bg-black/60 backdrop-blur-sm p-3 shadow-2xl group-hover:border-[#1FBFB8]/80 transition-all duration-300">
                  <Image
                    src="/nobgbtrlogo.png"
                    alt="Logo BTR"
                    width={88}
                    height={88}
                    className="object-contain w-full h-full filter brightness-110 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#E85C23] rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-3 h-3 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Enhanced description with card background */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  With the faith of God the Almighty as the main pillar,{" "}
                  <span className="text-white font-bold bg-gradient-to-r from-[#1FBFB8] to-[#E85C23] bg-clip-text text-transparent">
                    PT Batara Dharma Persada
                  </span>{" "}
                  (<span className="text-[#1FBFB8] font-bold">PT BATARA</span>)
                  founded in 2024, focuses on improving the nation's quality of life
                  through resource optimization and human development.
                </p>
                
                {/* Visual separator */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#1FBFB8] to-[#E85C23] rounded-full mb-6" />
                
                <p className="text-lg leading-relaxed text-gray-300">
                  The company supports medium-scale miners in Indonesia's{" "}
                  <span className="text-[#E85C23] font-semibold">coal</span>,{" "}
                  <span className="text-[#1FBFB8] font-semibold">bauxite</span>, and{" "}
                  <span className="text-[#E85C23] font-semibold">nickel</span> sectors 
                  with efficient, safe, and environmentally responsible mining practices.
                </p>
              </div>
            </motion.div>

            {/* Enhanced call-to-action */}
            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="/tentang/profil"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#1FBFB8] to-[#1FBFB8]/90 hover:from-[#E85C23] hover:to-[#E85C23]/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 transform"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1FBFB8]/20 to-[#E85C23]/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side: Enhanced image section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative group"
          >
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 group-hover:border-[#1FBFB8]/30 transition-all duration-500">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206305/IMG_8579_g4f2tm.jpg"
                alt="About PT Batara Dharma Persada"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Top badge */}
              <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#1FBFB8]/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1FBFB8] rounded-full animate-pulse" />
                  <span className="text-white text-sm font-semibold">Est. 2024</span>
                </div>
              </div>

              {/* Bottom information panel */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                  <h3 className="text-white font-bold text-lg mb-2">Mining Excellence</h3>
                  <p className="text-gray-300 text-sm">Sustainable resource extraction with environmental responsibility</p>
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#E85C23]/30 rotate-45 animate-spin-slow" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#1FBFB8]/20 rounded-full animate-pulse" />
          </motion.div>
        </div>
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