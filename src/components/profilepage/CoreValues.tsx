"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StriveValues() {
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
      description:
        "A combined action from more than one participant to create cooperative action where a whole produces more than the sum of its parts.",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "#1FBFB8",
    },
    {
      letter: "T",
      title: "Trusted",
      description:
        "Ability to behave honestly and maintain high commitment to company regulations and code of ethics consistently, preserving reputation and customer satisfaction.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      color: "#E85C23",
    },
    {
      letter: "R",
      title: "Responsible & Resourceful",
      description:
        "Taking ownership of our actions and obligations while being creative and adaptable in finding solutions to challenges.",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "#1FBFB8",
    },
    {
      letter: "I",
      title: "Integrity",
      description:
        "Upstanding character traits and work ethics, including sound judgement, honesty, dependability, and loyalty in all business dealings.",
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
      color: "#E85C23",
    },
    {
      letter: "V",
      title: "Values",
      description:
        "Guiding principles and fundamental beliefs that help our team work toward common business goals, enhancing business relationships and company growth.",
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
    },
    {
      letter: "E",
      title: "Extraordinary",
      description:
        "Setting high standards, pursuing excellence, and establishing positive examples in everything we do as a company.",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "#E85C23",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="strive-section"
      className="py-20 md:py-28 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-t border-gray-800"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/10 to-transparent -z-0" />
      <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full bg-[#1FBFB8]/10 blur-3xl -z-0" />
      <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-[#E85C23]/10 blur-3xl -z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block text-[#1FBFB8] font-medium mb-3">
            OUR CORE PRINCIPLES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="relative inline-block">
              Our <span className="text-[#E85C23]">STRIVE</span> Values
              <span
                className="absolute bottom-0 left-0 w-full h-1 bg-[#E85C23]/30 -z-1"
                style={{ bottom: "5px" }}
              />
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            The principles that form the foundation in every aspect of our
            business, guiding our decisions and shaping our corporate culture.
          </p>

          <div className="mt-10 mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#1FBFB8]/20 to-[#E85C23]/20 animate-pulse" />
            </div>
            <Image
              src="/strivenobg.png"
              alt="STRIVE Illustration"
              width={320}
              height={180}
              className="mx-auto relative z-10 drop-shadow-xl"
            />
          </div>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {striveValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 group hover:border-[#1FBFB8]/30"
            >
              <div className="flex items-start space-x-5">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: `${value.color}15` }}
                >
                  {value.icon}
                </div>
                <div>
                  <div className="flex items-center mb-3">
                    <span
                      className="text-3xl font-bold mr-2 transition-colors duration-300"
                      style={{ color: value.color }}
                    >
                      {value.letter}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-block py-3 px-5 bg-[#1FBFB8]/10 rounded-full text-[#1FBFB8] font-medium">
            Guided by our values in every project we undertake
          </div>
        </div>
      </div>
    </section>
  );
}
