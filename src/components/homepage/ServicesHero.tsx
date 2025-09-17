"use client";

import React, { useEffect, useRef, useState } from "react";
import { Recycle, Shovel, Wrench, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: "/svg/coals.svg",
      title: "Coal Mining and Hauling",
      description:
        "Comprehensive coal extraction and transportation services with a fleet of heavy-duty trucks. We handle everything from mining operations to efficient delivery.",
      color: "#E85C23",
      features: [
        "Heavy-duty fleet",
        "Efficient extraction",
        "Safe transportation",
        "Quality control",
      ],
      bgPattern: "coal",
    },
    {
      id: 2,
      icon: "/svg/rocks.svg",
      title: "Bauxite Mining and Hauling",
      description:
        "Specialized bauxite extraction and transportation with advanced equipment and techniques for efficient mineral processing and delivery.",
      color: "#1FBFB8",
      features: [
        "Advanced equipment",
        "Mineral processing",
        "Efficient delivery",
        "Quality assurance",
      ],
      bgPattern: "bauxite",
    },
    {
      id: 3,
      icon: "/svg/stone.svg",
      title: "Nickel Mining and Hauling",
      description:
        "Expert nickel mining operations and transportation services with a focus on safety, efficiency, and environmental compliance.",
      color: "#A0AEB5",
      features: [
        "Expert operations",
        "Safety focused",
        "Environmental compliance",
        "Efficient transport",
      ],
      bgPattern: "nickel",
    },
    {
      id: 4,
      icon: "/svg/reclamation.svg",
      title: "Land Reclamation",
      description:
        "Environmental restoration of mining sites through comprehensive reclamation services to return land to productive use and restore ecological balance.",
      color: "#E85C23",
      features: [
        "Environmental restoration",
        "Ecological balance",
        "Productive reuse",
        "Comprehensive service",
      ],
      bgPattern: "reclamation",
    },
    {
      id: 5,
      icon: "/svg/shovel.svg",
      title: "Top Soil Rehandling",
      description:
        "Careful management and relocation of topsoil during mining operations to preserve soil health and support future vegetation growth.",
      color: "#1FBFB8",
      features: [
        "Soil preservation",
        "Careful management",
        "Vegetation support",
        "Health maintenance",
      ],
      bgPattern: "topsoil",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      scale: 1.03,
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/8 via-[#E85C23]/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/8 via-[#1FBFB8]/4 to-transparent" />

        {/* Animated floating orbs */}
        <motion.div
          className="absolute top-32 right-20 w-72 h-72 rounded-full bg-[#E85C23]/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 left-16 w-96 h-96 rounded-full bg-[#1FBFB8]/5 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
        />

        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-1/5 w-3 h-3 border border-[#1FBFB8]/20 rotate-45 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#E85C23]/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-2/3 right-1/5 w-1 h-16 bg-gradient-to-b from-[#1FBFB8]/20 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Enhanced section header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Wrench className="w-5 h-5 text-[#1FBFB8]" />
            <span className="text-[#1FBFB8] font-semibold tracking-wider uppercase text-sm">
              Our Expertise
            </span>
            <Wrench className="w-5 h-5 text-[#1FBFB8]" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Our{" "}
            <span className="relative">
              <span className="text-[#E85C23] relative z-10">Services</span>
              <span className="absolute bottom-0 left-0 w-full h-4 bg-[#E85C23]/30 -z-1" />
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive mining and hauling solutions powered by advanced
            technology, environmental responsibility, and decades of industry
            expertise
          </motion.p>
        </motion.div>

        {/* Enhanced services grid */}
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group cursor-pointer h-full"
            >
              <motion.div
                variants={cardHoverVariants}
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50 h-full relative overflow-hidden transition-all duration-500"
                style={{
                  borderColor:
                    activeCard === index ? service.color + "40" : undefined,
                  boxShadow:
                    activeCard === index
                      ? `0 25px 50px ${service.color}15`
                      : undefined,
                }}
              >
                {/* Card glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${service.color}08 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon and title section */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-6">
                      {/* Enhanced icon container */}
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          backgroundColor: `${service.color}15`,
                          border: `2px solid ${service.color}25`,
                        }}
                      >
                        <img
                          src={service.icon}
                          alt={`${service.title} Icon`}
                          className="w-8 h-8 object-contain filter brightness-125 group-hover:brightness-150 transition-all duration-300"
                        />
                      </div>

                      {/* Service number badge */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                        style={{ backgroundColor: service.color }}
                      >
                        {service.id}
                      </div>
                    </div>

                    <h3
                      className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight group-hover:transition-colors duration-300"
                      style={{
                        color: activeCard === index ? service.color : undefined,
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 flex-grow text-sm lg:text-base">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          <span className="text-gray-300 text-xs lg:text-sm truncate">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background pattern overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div
                    className="w-full h-full rounded-full blur-2xl"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced footer section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 py-4 px-8 bg-gradient-to-r from-[#1FBFB8]/20 to-[#E85C23]/20 backdrop-blur-sm rounded-full border border-gray-600/50">
            <Sparkles className="w-5 h-5 text-[#1FBFB8]" />
            <span className="text-white font-semibold text-sm lg:text-base">
              Delivering excellence across all mining sectors
            </span>
            <Sparkles className="w-5 h-5 text-[#E85C23]" />
          </div>

          <motion.p
            className="mt-6 text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            From extraction to restoration, we provide comprehensive solutions
            that prioritize safety, efficiency, and environmental stewardship in
            every project we undertake.
          </motion.p>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
